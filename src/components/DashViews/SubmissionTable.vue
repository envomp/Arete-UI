<template>
    <v-container
            fluid
            grid-list-xl
    >

        <material-card
                :color="color"
                text="Latest submissions"
                title="Submission Table"
        >
            <v-text-field
                    append-icon="search"
                    hide-details
                    label="Search"
                    single-line
                    v-model="search"
            ></v-text-field>

        </material-card>
        <v-data-table

                :headers="headers"
                :items="SubmissionList"
                :rows-per-page-items="rowsAmount"
                :search="search"
                class="elevation-1"
                id="submissionDataTable"

        >

            <template
                    slot="headerCell"
                    slot-scope="{ header }"
            >
                <span
                        v-bind:class="'subheading font-weight-light text-' + color"
                        v-bind:style="{ 'color': color }"
                        v-text="header.text"
                />
            </template>

            <template
                    v-slot:items="props"
            >
                <tr @click="props.expanded = !props.expanded, getSubmission(props.item.hash)">
                    <td>{{ props.item.id }}</td>
                    <td>{{ props.item.uniid }}</td>
                    <td>{{ props.item.hash }}</td>
                    <td>{{ props.item.timestamp }}</td>
                    <td>{{ props.item.testingPlatform }}</td>
                    <td>{{ props.item.root }}</td>
                </tr>
            </template>

            <v-spacer></v-spacer>

            <template v-slot:expand="props">

                <v-container fluid ma-0 pa-4 >

                    <v-expansion-panel popout>
                        <v-expansion-panel-content
                                v-for="job in fullSubmission"
                        >
                            <template v-slot:header>
                                <div>{{job.slug}}</div>
                            </template>

                            <v-window>

                                <v-tab-item
                                        v-for="(job, index) in fullSubmission"
                                >

                                    <v-card
                                            :elevation="24"
                                    >

                                        <v-tabs
                                                :id="'submissionTab' + index"
                                                :slider-color="color"
                                                color="grey darken-4"
                                                dark
                                        >
                                            <v-tab ripple>
                                                <v-icon left>mdi-account</v-icon>
                                                Student Output
                                            </v-tab>

                                            <v-tab ripple>
                                                <v-icon left>mdi-lock</v-icon>
                                                Console logs
                                            </v-tab>

                                            <v-tab ripple>
                                                <v-icon left>mdi-archive</v-icon>
                                                Content
                                            </v-tab>

                                            <v-tab-item>
                                                <v-card flat>
                                                    <div id="output" v-html="job.output"></div>
                                                </v-card>
                                            </v-tab-item>

                                            <v-tab-item>
                                                <v-card flat>
                                                    <div class="consoleOutput"
                                                         v-html="job.consoleOutput"></div>
                                                </v-card>
                                            </v-tab-item>

                                            <v-tab-item>
                                                <v-card flat>
                                                    <div class="consoleOutput"
                                                         v-html="createFileView(index)"></div>
                                                </v-card>
                                            </v-tab-item>

                                            <v-spacer></v-spacer>

                                        </v-tabs>
                                    </v-card>

                                </v-tab-item>

                            </v-window>

                        </v-expansion-panel-content>
                    </v-expansion-panel>

                </v-container>

            </template>

        </v-data-table>

        <br><br><br><br>
    </v-container>


</template>

<script>

    // Utilities
    import {mapState} from 'vuex'

    export default {
        name: 'Dashboard',
        data: () => ({

            // Charon like
            SubmissionList: [],
            fullSubmission: [],
            rowsAmount: [15, 20, 25, {"text": "$vuetify.dataIterator.rowsPerPageAll", "value": -1}],
            search: '',
            headers: [
                {text: 'id', align: 'left', value: 'id'},
                {text: 'uniid', value: 'uniid'},
                {text: 'hash', value: 'hash', sortable: false},
                {text: 'timestamp', value: 'timestamp'},
                {text: 'testingPlatform', value: 'testingPlatform'},
                {text: 'root', value: 'root'},

            ],
        }),

        computed: {
            ...mapState('app', ['color']),
        },

        // called when page is created before dom
        created() {
            this.getSubmissions();
        },

        methods: {
            getSubmission(hash) {
                this.$http.get('/submission/' + hash)
                    .then(response => {
                        this.fullSubmission = response.data;
                    })
                    .catch(error => console.log(error))
            },

            getSubmissions() {
                this.$http.get('/submissions')
                    .then(response => {
                        this.SubmissionList = response.data
                    })
                    .catch(error => console.log(error))
            },

            createFileView(i) {
                let message = "";

                message += "Failed: " + this.fullSubmission[i]['failed'] + "<br><br>";
                message += "Commit message: " + this.fullSubmission[i]['commitMessage'] + "<br><br>";
                message += "Docker extra: " + this.fullSubmission[i]['dockerExtra'] + "<br><br>";
                message += "System extra: " + this.fullSubmission[i]['systemExtra'] + "<br><br>";
                message += "Priority: " + this.fullSubmission[i]['priority'] + "<br><br>";
                message += "Git student repository: " + this.fullSubmission[i]['gitStudentRepo'] + "<br><br>";
                message += "Git test repository: " + this.fullSubmission[i]['gitTestRepo'] + "<br><br>";
                message += "Student files: " + this.fullSubmission[i]['source'] + "<br><br>";

                return message;
            }

        },
    }
</script>

<style scoped>

    #output {

        max-height: 50em;
        overflow: auto;

    }

</style>