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

                :expand="expand"
                :headers="headers"
                :items="SubmissionList"
                :rows-per-page-items="rowsAmount"
                :search="search"
                class="elevation-1"

        >

            <template
                    slot="headerCell"
                    slot-scope="{ header }"
            >
                <span
                        v-bind:class="'subheading font-weight-light text-' + color"
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
                    <td>{{ props.item.course }}</td>
                </tr>
            </template>

            <v-spacer></v-spacer>

            <template v-slot:expand="props">

                <v-container>
                    <v-layout row wrap>
                        <v-flex>
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
                                                        color="grey darken-4"
                                                        dark
                                                        slider-color="blue lighten-4"
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
                                                            <div id="consoleOutput"
                                                                 v-html="job.consoleOutput"></div>
                                                        </v-card>
                                                    </v-tab-item>

                                                    <v-tab-item>
                                                        <v-card flat>
                                                            <div
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
                        </v-flex>

                    </v-layout>
                </v-container>

            </template>

        </v-data-table>

        <!--        Footer hides otherwise-->
        <br><br><br><br>
    </v-container>


</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: 'Dashboard',
        data: () => ({

            // Charon like
            expand: false,
            active: null,
            window: 0,
            SubmissionList: [],
            fullSubmission: [],
            rowsAmount: [15, 20, 25, {"text": "$vuetify.dataIterator.rowsPerPageAll", "value": -1}],
            dialog: false,
            search: '',
            headers: [
                {text: 'id', align: 'left', value: 'id'},
                {text: 'uniid', value: 'uniid'},
                {text: 'hash', value: 'hash', sortable: false},
                {text: 'timestamp', value: 'timestamp'},
                {text: 'testingPlatform', value: 'testingPlatform'},
                {text: 'course', value: 'course'},

            ],
            editedIndex: -1,
            defaultItem: {},
        }),

        computed: {
            ...mapState('app', ['color']),
        },

        watch: {
            dialog(val) {
                val || this.close()
            }
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

            close() {
                this.dialog = false;
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem);
                    this.editedIndex = -1
                }, 300)
            },

            createFileView(i) {
                let message = "";

                message += "Failed: " + this.fullSubmission[i]['failed'] + "<br><br>";
                message += "Commit message: " + this.fullSubmission[i]['commitMessage'] + "<br><br>";
                message += "Return url: " + this.fullSubmission[i]['returnUrl'] + "<br><br>";
                message += "Docker extra: " + this.fullSubmission[i]['dockerExtra'] + "<br><br>";
                message += "System extra: " + this.fullSubmission[i]['systemExtra'] + "<br><br>";
                message += "Priority: " + this.fullSubmission[i]['priority'] + "<br><br>";
                message += "Git student repository: " + this.fullSubmission[i]['gitStudentRepo'] + "<br><br>";
                message += "Git test repository: " + this.fullSubmission[i]['gitTestSource'] + "<br><br>";
                message += "Student files: " + this.fullSubmission[i]['source'] + "<br><br>";
                message += "Test files: " + this.fullSubmission[i]['testSource'] + "<br><br>";

                return message;
            }

        }
    }
</script>

<style scoped>

    #output {

        max-height: 50em;
        overflow: auto;

    }

    #consoleOutput {

        max-height: 50em;
        overflow: auto;
        white-space: normal;

        /*white-space: initial;*/

    }

</style>