<template>
    <v-container
            fluid
            grid-list-xl
    >

        <v-timeline align-top dense>
            <v-timeline-item
                    :color="color"
                    :icon="item.icon"
                    :key="i"
                    fill-dot
                    v-for="(item, i) in items"
            >
                <v-card
                        :color="color"
                        dark
                >
                    <v-card-title class="title">{{item.title}}</v-card-title>
                    <v-card-text class="grey darken-3 text--primary">

                        <form v-if="i===0">

                            <v-text-field

                                    :color="color"
                                    autofocus
                                    clearable
                                    dark
                                    hint="Make sure it ends with '-tester'"
                                    label="Image name"
                                    primary
                                    v-model="image_name"

                            ></v-text-field>

                            <v-btn :color="color"
                                   @click="updateImage()"
                                   class="mx-0"
                                   outline>Submit
                            </v-btn>

                        </form>

                        <form v-if="i===1">

                            <v-text-field

                                    :color="color"
                                    autofocus
                                    clearable
                                    dark
                                    data-vv-name="name"
                                    hint="Make sure git repository is provided"
                                    label="Tester name"
                                    primary
                                    v-model="tester_name"

                            ></v-text-field>

                            <v-btn :color="color"
                                   @click="updateTester()"
                                   class="mx-0"
                                   outline>update
                            </v-btn>

                        </form>

                        <v-container grid-list-xl v-if="i===2">
                            <v-layout
                                    wrap
                            >
                                <v-flex
                                        md6
                                >
                                    <form ref="form">

                                        <v-text-field

                                                :color="color"
                                                :rules="rules"
                                                autofocus
                                                clearable
                                                dark
                                                hint="java, python, prolog..."
                                                label="Testing language"
                                                primary
                                                v-model="programming_language"

                                        ></v-text-field>

                                        <v-text-field

                                                :color="color"
                                                :rules="rules"
                                                autofocus
                                                clearable
                                                dark
                                                hint="gitlab or github url"
                                                label="Student repository"
                                                primary
                                                v-model="student_repository"

                                        ></v-text-field>

                                        <v-text-field

                                                :color="color"
                                                :rules="rules"
                                                autofocus
                                                clearable
                                                dark
                                                hint="gitlab or github url"
                                                label="Tester repository"
                                                primary
                                                v-model="tester_repository"

                                        ></v-text-field>

                                        <v-text-field

                                                :color="color"
                                                autofocus
                                                clearable
                                                dark
                                                hint="You can predefine target exercise. EX01_IdCode for example"
                                                label="Exercise"
                                                primary
                                                v-model="slug"

                                        ></v-text-field>

                                        <v-text-field

                                                :color="color"
                                                autofocus
                                                clearable
                                                dark
                                                hint="You can predefine target git hash."
                                                label="Hash"
                                                primary
                                                v-model="git_hash"

                                        ></v-text-field>

                                        <v-text-field

                                                :color="color"
                                                autofocus
                                                clearable
                                                dark
                                                hint="You can prefine target uniid. envomp for example"
                                                label="UNI-ID"
                                                primary
                                                v-model="uniid"

                                        ></v-text-field>
                                    </form>
                                </v-flex>

                                <v-flex
                                        md6
                                >
                                    <form>


                                        <v-text-field

                                                :color="color"
                                                autofocus
                                                clearable
                                                dark
                                                hint="You can predefine docker timeout in seconds."
                                                label="Docker Timeout"
                                                primary
                                                v-model="docker_timeout"

                                        ></v-text-field>

                                        <v-text-field

                                                :color="color"
                                                autofocus
                                                clearable
                                                dark
                                                hint="You can predefine target priority (1 - 10)."
                                                label="Priority"
                                                primary
                                                v-model="priority"

                                        ></v-text-field>

                                        <v-select
                                                :color="color"
                                                :items="testing_modes"
                                                dark
                                                label="Testing mode"
                                                outline
                                                v-model="testing_mode"
                                        ></v-select>

                                        <v-layout
                                                pa-5
                                                wrap
                                        >

                                            <v-checkbox :color="color" dark label="anonymous" v-model="system_extra"
                                                        value="anonymous"></v-checkbox>
                                            <v-checkbox :color="color" dark label="noOverride" v-model="system_extra"
                                                        value="noOverride"></v-checkbox>
                                            <v-checkbox :color="color" dark label="noMail" v-model="system_extra"
                                                        value="noMail"></v-checkbox>
                                            <v-checkbox :color="color" dark label="noFiles" v-model="system_extra"
                                                        value="noFiles"></v-checkbox>
                                            <v-checkbox :color="color" dark label="noTesterFiles" v-model="system_extra"
                                                        value="noTesterFiles"></v-checkbox>
                                            <v-checkbox :color="color" dark label="noStudentFiles"
                                                        v-model="system_extra"
                                                        value="noStudentFiles"></v-checkbox>
                                            <v-checkbox :color="color" dark label="noStd" v-model="system_extra"
                                                        value="noStd"></v-checkbox>
                                            <v-checkbox :color="color" dark label="noFeedback" v-model="system_extra"
                                                        value="noFeedback"></v-checkbox>
                                            <v-checkbox :color="color" dark label="minimalFeedback"
                                                        v-model="system_extra"
                                                        value="minimalFeedback"></v-checkbox>
                                        </v-layout>

                                    </form>
                                </v-flex>

                            </v-layout>
                            <v-btn :color="color"
                                   @click="submitSubmission()"
                                   class="mx-0"
                                   outline>Submit
                            </v-btn>

                            <v-btn :color="color"
                                   @click="clearSubmission()"
                                   class="mx-0"
                                   outline>clear
                            </v-btn>
                        </v-container>

                        <form v-if="i===3">

                            <pre style="color: black">{{ activeSubmissions || pretty }}</pre>

                            <v-btn :color="color"
                                   @click="getActiveSubmissions()"
                                   class="mx-0"
                                   outline>refresh
                            </v-btn>

                        </form>

                    </v-card-text>

                    <v-snackbar
                            :timeout="timeout"
                            top
                            v-model="snackbar"
                    >
                        {{ snackbar_text }}
                        <v-btn
                                :color="color"
                                @click="snackbar = false"
                                flat
                        >
                            Close
                        </v-btn>
                    </v-snackbar>
                </v-card>
            </v-timeline-item>
        </v-timeline>

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

                <v-container fluid ma-0 pa-4>

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
            snackbar: false,
            timeout: 5000,
            snackbar_text: '',

            image_name: '',
            tester_name: '',

            testing_modes: [
                'Sync',
                'Async'
            ],

            testing_mode: null,
            programming_language: '',
            student_repository: '',
            tester_repository: '',
            slug: '',
            git_hash: '',
            uniid: '',
            docker_timeout: '',
            priority: '',
            system_extra: ['noFiles'],

            items: [
                {
                    title: 'Update image',
                    icon: 'mdi-cloud-download',
                },
                {
                    title: 'Update tests',
                    icon: 'mdi-file-multiple',
                },
                {
                    title: 'Create submission',
                    icon: 'mdi-share',
                },
                {
                    title: 'Currently active submissions',
                    icon: 'mdi-run',
                }
            ],

            // Charon like
            SubmissionList: [],
            fullSubmission: [],
            activeSubmissions: [],

            filters: {
                pretty: function (value) {
                    return JSON.stringify(JSON.parse(value), null, 2);
                }
            },

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

            rules() {
                const rules = [];

                const rule =
                    v => (v || '').length > 0 ||
                        `This field is required!`;

                rules.push(rule);

                const rule2 =
                    v => (v || '').indexOf(' ') < 0 ||
                        'No spaces are allowed';

                rules.push(rule2);

                return rules;
            },
        },

        // called when page is created before dom
        created() {
            this.getSubmissions();
        },

        watch: {
            tester_repository: 'validateField',
            student_repository: 'validateField',
            programming_language: 'validateField',
        },

        methods: {
            validateField() {

            },

            getActiveSubmissions() {
                this.$http.get('/submissions/active')
                    .then(response => {
                        this.activeSubmissions = response.data;
                    })
                    .catch(error => console.log(error))
            },

            updateImage() {
                if (!this.image_name.endsWith("-tester")) {
                    this.snackbar_text = "Testing language should end with '-tester'";
                    this.snackbar = true;
                    return;
                }
            },

            updateTester() {

            },

            submitSubmission() {

                const jsonData = {};
                if (this.programming_language !== '') {
                    jsonData['testingPlatform'] = this.programming_language;
                }
                if (this.student_repository !== '') {
                    jsonData['gitStudentRepo'] = this.student_repository;
                }
                if (this.tester_repository !== '') {
                    jsonData['gitTestSource'] = this.tester_repository;
                }
                if (this.slug !== '') {
                    jsonData['gitStudentRepo'] = [this.slug];
                }
                if (this.git_hash !== '') {
                    jsonData['hash'] = this.git_hash;
                }
                if (this.uniid !== '') {
                    jsonData['uniid'] = this.uniid;
                }
                if (this.docker_timeout !== '') {

                    jsonData['dockerTimeout'] = this.docker_timeout;
                }
                if (this.priority !== '') {
                    jsonData['priority'] = this.priority;
                }

                jsonData['systemExtra'] = this.system_extra;


                if (this.testing_mode === "Async") {

                    this.$http.post('/:testAsync', jsonData)
                        .then(response => {
                            this.snackbar_text = response.data;
                            this.snackbar = true;
                        })
                        .catch(error => {
                                this.snackbar_text = error;
                                this.snackbar = true;
                            }
                        )

                } else if (this.testing_mode === "Sync") {

                    this.$http.post('/:testSync', jsonData)
                        .then(response => {
                            this.snackbar_text = response.data;
                            this.snackbar = true;
                        })
                        .catch(error => {
                                this.snackbar_text = error;
                                this.snackbar = true;
                            }
                        )

                } else {
                    this.snackbar_text = "Testing mode is not provided";
                    this.snackbar = true;
                }
            },

            clearSubmission() {

            },

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