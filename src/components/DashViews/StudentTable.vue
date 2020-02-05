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
                :items="studentsList"
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
                <tr @click="props.expanded = !props.expanded, getStudent(props.item.uniid)">
                    <td>{{ props.item.id }}</td>
                    <td>{{ props.item.uniid }}</td>
                    <td>{{ props.item.gitRepo }}</td>
                </tr>
            </template>

            <v-spacer></v-spacer>

            <template v-slot:expand="props">

                <v-container>
                    <v-layout row wrap>
                        <v-flex>
                            <v-expansion-panel popout>
                                <v-expansion-panel-content
                                        v-for="job in fullStudent"
                                >
                                    <template v-slot:header>
                                        <div>{{job.slug}}</div>
                                    </template>

                                    <v-window>

                                        <v-tab-item
                                                v-for="(job, index) in fullStudent"
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
            studentsList: [],
            fullStudent: [],
            rowsAmount: [15, 20, 25, {"text": "$vuetify.dataIterator.rowsPerPageAll", "value": -1}],
            dialog: false,
            search: '',
            headers: [
                {text: 'id', align: 'left', value: 'id'},
                {text: 'uniid', value: 'uniid'},
                {text: 'gitRepo', value: 'gitRepo', sortable: false},
                {text: 'firstTested', value: 'firstTested'},
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
            this.getStudents();
        },

        methods: {
            getStudent(uniid) {
                this.$http.get('/student/' + uniid)
                    .then(response => {
                        this.fullStudent = response.data;
                    })
                    .catch(error => console.log(error))
            },

            getStudents() {
                this.$http.get('/students')
                    .then(response => {
                        this.studentsList = response.data
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

                message += "Failed: " + this.fullStudent[i]['failed'] + "<br><br>";
                message += "Commit message: " + this.fullStudent[i]['commitMessage'] + "<br><br>";
                message += "Return url: " + this.fullStudent[i]['returnUrl'] + "<br><br>";
                message += "Docker extra: " + this.fullStudent[i]['dockerExtra'] + "<br><br>";
                message += "System extra: " + this.fullStudent[i]['systemExtra'] + "<br><br>";
                message += "Priority: " + this.fullStudent[i]['priority'] + "<br><br>";
                message += "Git student repository: " + this.fullStudent[i]['gitStudentRepo'] + "<br><br>";
                message += "Git test repository: " + this.fullStudent[i]['gitTestSource'] + "<br><br>";
                message += "Student files: " + this.fullStudent[i]['source'] + "<br><br>";
                message += "Test files: " + this.fullStudent[i]['testSource'] + "<br><br>";

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