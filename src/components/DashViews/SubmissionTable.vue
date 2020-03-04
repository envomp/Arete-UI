<template>
    <v-container
            fluid
            grid-list-xl
    >
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

        <v-layout wrap>

            <v-flex
                    :color="color"
                    lg6
                    md6
                    sm12
                    style="padding-right: 8px"
                    xs12
            >
                <material-card
                        :color="color"
                        :title="items[0].title"
                >

                    <v-card-text class="grey darken-3 text--primary">
                        <form>
                            <v-text-field

                                    :color="color"
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
                    </v-card-text>

                </material-card>
            </v-flex>

            <v-flex
                    :color="color"
                    lg6
                    md6
                    sm12
                    style="padding-left: 8px"
                    xs12

            >
                <material-card
                        :color="color"
                        :title="items[1].title"
                >

                    <v-card-text class="grey darken-3 text--primary">
                        <form>

                            <v-text-field

                                    :color="color"
                                    clearable
                                    dark
                                    data-vv-name="name"
                                    hint="Make sure git repository is provided"
                                    label="Tester repository"
                                    primary
                                    v-model="tester_name"

                            ></v-text-field>

                            <v-btn :color="color"
                                   @click="updateTester()"
                                   class="mx-0"
                                   outline>update
                            </v-btn>

                        </form>
                    </v-card-text>
                </material-card>
            </v-flex>

        </v-layout>


        <material-card
                :color="color"
                :title="items[2].title"
        >

            <v-container fluid grid-list-md>
                <v-layout
                        wrap
                >
                    <v-flex
                            d-flex
                            fluid
                            md6
                            sm6
                            style="padding-right: 8px"
                            xs12
                    >
                        <form ref="form">

                            <v-text-field

                                    :color="color"
                                    :rules="rules"
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
                                    clearable
                                    dark
                                    hint="gitlab or github url"
                                    label="Tester repository"
                                    primary
                                    v-model="tester_repository"

                            ></v-text-field>

                            <v-text-field

                                    :color="color"
                                    clearable
                                    dark
                                    hint="You can predefine target exercise. EX01_IdCode for example"
                                    label="Exercise"
                                    primary
                                    v-model="slug"

                            ></v-text-field>

                            <v-text-field

                                    :color="color"
                                    clearable
                                    dark
                                    hint="You can predefine target git hash."
                                    label="Hash"
                                    primary
                                    v-model="git_hash"

                            ></v-text-field>

                            <v-text-field

                                    :color="color"
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
                            d-flex
                            fluid
                            md6
                            sm6
                            style="padding-left: 8px"
                            xs12
                    >
                        <form>


                            <v-text-field

                                    :color="color"
                                    clearable
                                    dark
                                    hint="You can predefine docker timeout in seconds."
                                    label="Docker Timeout"
                                    primary
                                    v-model="docker_timeout"

                            ></v-text-field>

                            <v-text-field

                                    :color="color"
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
                                <v-checkbox :color="color" dark label="noOverride"
                                            v-model="system_extra"
                                            value="noOverride"></v-checkbox>
                                <v-checkbox :color="color" dark label="noMail" v-model="system_extra"
                                            value="noMail"></v-checkbox>
                                <v-checkbox :color="color" dark label="noFiles" v-model="system_extra"
                                            value="noFiles"></v-checkbox>
                                <v-checkbox :color="color" dark label="noTesterFiles"
                                            v-model="system_extra"
                                            value="noTesterFiles"></v-checkbox>
                                <v-checkbox :color="color" dark label="noStudentFiles"
                                            v-model="system_extra"
                                            value="noStudentFiles"></v-checkbox>
                                <v-checkbox :color="color" dark label="noStd" v-model="system_extra"
                                            value="noStd"></v-checkbox>
                                <v-checkbox :color="color" dark label="noFeedback"
                                            v-model="system_extra"
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

        </material-card>


        <material-card
                :color="color"
                :title="items[3].title"
        >

            <v-card-text class="grey darken-3 text--primary">
                <form>

                    <pre style="color: black">{{ activeSubmissions || pretty }}</pre>

                    <v-btn :color="color"
                           @click="getActiveSubmissions()"
                           class="mx-0"
                           outline>refresh
                    </v-btn>

                </form>
            </v-card-text>
        </material-card>


        <material-card
                :color="color"
                text="Latest submissions"
                title="Submission Table"
        >
            <v-text-field
                    :color="color"
                    append-icon="search"
                    hide-details
                    label="Search"
                    single-line
                    v-model="search"
            ></v-text-field>

        </material-card>


        <v-data-table
                :color="color"
                :headers="computedHeaders"
                :items="SubmissionList"
                :rows-per-page-items="rowsAmount"
                :search="search"
                class="elevation-1"
                id="submissionDataTable"
                style="table-layout:fixed; width: 100% !important;"
                v-bind:pagination.sync="pagination"
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
                    <td v-if="!isMobile && !isVerySmall">{{ props.item.id }}</td>
                    <td v-if="!isMobile">{{ props.item.uniid }}</td>
                    <td>{{ props.item.hash }}</td>
                    <td v-if="!isMobile && !isVerySmall && !isSmall">{{ props.item.timestamp }}</td>
                    <td v-if="!isMobile && !isVerySmall">{{ props.item.testingPlatform }}</td>
                    <td v-if="!isMobile && !isVerySmall && !isSmall">{{ props.item.root }}</td>
                </tr>
            </template>

            <v-spacer></v-spacer>

            <template v-slot:expand="props">

                <v-container :class="!isMobile ? 'pa-4' : 'pa-0'" fluid ma-0>

                    <v-expansion-panel popout>
                        <v-expansion-panel-content
                                v-bind:key="'upperTab' + index"
                                v-for="(job, index) in fullSubmission">

                            <template v-slot:header>
                                <div>{{job.slug}}</div>
                            </template>

                            <v-window>

                                <v-tab-item
                                        v-bind:key="'lowerTab' + index"
                                        v-for="(job, index) in fullSubmission">

                                    <v-tabs
                                            :id="'submissionTab' + index"
                                            :slider-color="color"
                                            color="grey darken-4"
                                            dark
                                            vertical
                                    >
                                        <v-tab ripple>
                                            <v-icon left>mdi-message-text-outline</v-icon>
                                            Docker
                                        </v-tab>

                                        <v-tab ripple>
                                            <v-icon left>mdi-comment-plus-outline</v-icon>
                                            Extra
                                        </v-tab>

                                        <v-tab ripple v-if="!isMobile">
                                            <v-icon left>mdi-lock-open</v-icon>
                                            Out
                                        </v-tab>

                                        <v-tab ripple>
                                            <v-icon left>mdi-lock</v-icon>
                                            Full Out
                                        </v-tab>

                                        <v-tab-item :key="'tab_item_1' + index">
                                            <v-card flat>
                                                <div class="consoleOutput scale-down"
                                                     v-html="job.consoleOutput"></div>
                                            </v-card>
                                        </v-tab-item>

                                        <v-tab-item :key="'tab_item_2' + index">
                                            <v-card flat>
                                                <div class="consoleOutput scale-down"
                                                     v-html="createFileView(index)"></div>
                                            </v-card>
                                        </v-tab-item>

                                        <v-tab-item :key="'tab_item_3' + index" v-if="!isMobile">
                                            <v-card flat>
                                                <div class="consoleOutput scale-down" v-html="job.output"></div>
                                            </v-card>
                                        </v-tab-item>

                                        <v-tab-item :key="'tab_item_4' + index">

                                            <v-card flat>

                                                <v-data-table
                                                        :headers="testSuiteHeaders"
                                                        :hide-actions="true"
                                                        :items="fullSubmission[index]['testSuites']"
                                                        class="elevation-1"
                                                        v-if="!isMobile"
                                                >
                                                    <template
                                                            slot="headerCell"
                                                            slot-scope="{ header }">
                                                        <span
                                                                v-bind:class="'subheading font-weight-light text-' + color"
                                                                v-text="header.text"/>
                                                    </template>

                                                    <template v-slot:items="propsSlugs">
                                                        <tr @click="() => {{propsSlugs.expanded = !propsSlugs.expanded; setExpandedJob(index)}}">
                                                            <td>{{ propsSlugs.item.id }}</td>
                                                            <td>{{ propsSlugs.item.name }}</td>
                                                            <td>{{ propsSlugs.item.file }}</td>
                                                            <td>{{ propsSlugs.item.startDate }}</td>
                                                            <td>{{ propsSlugs.item.endDate }}</td>
                                                            <td>{{ propsSlugs.item.weight }}</td>
                                                            <td>{{ propsSlugs.item.passedCount }}</td>
                                                            <td>{{ propsSlugs.item.grade}}</td>
                                                        </tr>
                                                    </template>

                                                    <v-spacer></v-spacer>

                                                    <template v-if="!isMobile" v-slot:expand="propsJobs">

                                                        <v-container fluid ma-0 pa-4>

                                                            <v-window
                                                                    class="elevation-1 ">
                                                                <v-window-item>

                                                                    <v-window class="elevation-1">
                                                                        <material-card
                                                                                :color="color"
                                                                                text="Tests ran"
                                                                                title="All test ran regarding this test context">

                                                                            <v-text-field
                                                                                    :color="color"
                                                                                    append-icon="search"
                                                                                    hide-details
                                                                                    label="Search"
                                                                                    single-line
                                                                                    v-model="subSearch"
                                                                            ></v-text-field>
                                                                        </material-card>

                                                                        <v-data-table

                                                                                :color="color"
                                                                                :headers="unitTestHeaders"
                                                                                :items="fullSubmission[index]['testSuites'][getExpandedJob()].unitTests"
                                                                                :rows-per-page-items="rowsAmount"
                                                                                :search="subSearch"
                                                                                class="elevation-1">

                                                                            <template
                                                                                    slot="headerCell"
                                                                                    slot-scope="{ header }">
                                                                                <span
                                                                                        v-bind:class="'subheading font-weight-light text-' + color"
                                                                                        v-text="header.text"/>
                                                                            </template>

                                                                            <template
                                                                                    v-slot:items="props3">
                                                                                <tr>
                                                                                    <td>{{props3.item.id}}</td>
                                                                                    <td>{{props3.item.name}}</td>
                                                                                    <td>{{props3.item.status}}</td>
                                                                                    <td>{{props3.item.weight}}</td>
                                                                                    <td>{{props3.item.exceptionClass}}
                                                                                    </td>
                                                                                    <td>
                                                                                        {{props3.item.exceptionMessage}}
                                                                                    </td>
                                                                                </tr>
                                                                            </template>

                                                                            <v-spacer></v-spacer>

                                                                        </v-data-table>

                                                                    </v-window>

                                                                </v-window-item>

                                                            </v-window>

                                                        </v-container>

                                                    </template>

                                                </v-data-table>
                                                <v-data-iterator
                                                        :color="color"
                                                        :items="fullSubmission[index]['testSuites']"
                                                        :pagination.sync="pagination"
                                                        :rows-per-page-items="rowsPerPageItems"
                                                        :search="subSearch"
                                                        item-key="name"
                                                        row
                                                        v-else
                                                        wrap
                                                >
                                                    <template v-slot:item="props">
                                                        <v-flex
                                                                lg3
                                                                md4
                                                                sm6
                                                                xs12
                                                        >
                                                            <v-card
                                                                    @click="props.expanded = !props.expanded"
                                                            >
                                                                <v-card-title>
                                                                    <h4>{{ props.item.name }}</h4>
                                                                </v-card-title>
                                                                <v-divider></v-divider>
                                                                <v-list dense v-if="props.expanded">
                                                                    <v-list-tile>
                                                                        <v-list-tile-content>id:</v-list-tile-content>
                                                                        <v-list-tile-content class="align-end">{{
                                                                            props.item.id }}
                                                                        </v-list-tile-content>
                                                                    </v-list-tile>
                                                                    <v-list-tile>
                                                                        <v-list-tile-content>name:</v-list-tile-content>
                                                                        <v-list-tile-content class="align-end">{{
                                                                            props.item.name }}
                                                                        </v-list-tile-content>
                                                                    </v-list-tile>
                                                                    <v-list-tile>
                                                                        <v-list-tile-content>file:</v-list-tile-content>
                                                                        <v-list-tile-content class="align-end">{{
                                                                            props.item.file }}
                                                                        </v-list-tile-content>
                                                                    </v-list-tile>
                                                                    <v-list-tile>
                                                                        <v-list-tile-content>startDate:
                                                                        </v-list-tile-content>
                                                                        <v-list-tile-content class="align-end">{{
                                                                            props.item.startDate }}
                                                                        </v-list-tile-content>
                                                                    </v-list-tile>
                                                                    <v-list-tile>
                                                                        <v-list-tile-content>weight:
                                                                        </v-list-tile-content>
                                                                        <v-list-tile-content class="align-end">{{
                                                                            props.item.weight }}
                                                                        </v-list-tile-content>
                                                                    </v-list-tile>
                                                                    <v-list-tile>
                                                                        <v-list-tile-content>passedCount:
                                                                        </v-list-tile-content>
                                                                        <v-list-tile-content class="align-end">{{
                                                                            props.item.passedCount }}
                                                                        </v-list-tile-content>
                                                                    </v-list-tile>
                                                                    <v-list-tile>
                                                                        <v-list-tile-content>grade (%):
                                                                        </v-list-tile-content>
                                                                        <v-list-tile-content class="align-end">{{
                                                                            props.item.grade }}
                                                                        </v-list-tile-content>
                                                                    </v-list-tile>
                                                                </v-list>
                                                            </v-card>
                                                        </v-flex>
                                                    </template>
                                                </v-data-iterator>

                                            </v-card>
                                        </v-tab-item>
                                        <v-spacer></v-spacer>
                                    </v-tabs>
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
    import ChartCard from "../material/ChartCard";
    import StatsCard from "../material/StatsCard";

    export default {
        name: 'Dashboard',
        components: {StatsCard, ChartCard},
        data: () => ({

            snackbar: false,
            timeout: 5000,
            rowsPerPageItems: [4, 8, 12, 24],
            snackbar_text: '',

            image_name: '',
            tester_name: '',

            subSearch: '',

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
            pagination: {'sortBy': 'id', 'descending': true, 'rowsPerPage': 15},

            headers: [
                {text: 'id', align: 'left', value: 'id'},
                {text: 'uniid', value: 'uniid'},
                {text: 'hash', value: 'hash', sortable: false},
                {text: 'timestamp', value: 'timestamp'},
                {text: 'testingPlatform', value: 'testingPlatform'},
                {text: 'root', value: 'root'},
            ],

            headersSmall: [
                {text: 'id', align: 'left', value: 'id'},
                {text: 'uniid', value: 'uniid'},
                {text: 'hash', value: 'hash', sortable: false},
                {text: 'testingPlatform', value: 'testingPlatform'},
            ],

            headersVerySmall: [
                {text: 'uniid', value: 'uniid'},
                {text: 'hash', value: 'hash', sortable: false},
            ],

            headersMobile: [
                {text: 'hash', value: 'hash', sortable: false},
            ],

            testSuiteHeaders: [
                {text: 'id', align: 'left', value: 'id', sortable: true},
                {text: 'name', align: 'left', value: 'name', sortable: true},
                {text: 'file', value: 'file', sortable: true},
                {text: 'startDate', value: 'startDate', sortable: true},
                {text: 'endDate', value: 'endDate', sortable: true},
                {text: 'weight', value: 'weight', sortable: true},
                {text: 'passedCount', value: 'passedCount', sortable: true},
                {text: 'grade (%)', value: 'grade', sortable: true},
            ],

            unitTestHeaders: [
                {text: 'id', align: 'left', value: 'id', sortable: true},
                {text: 'name', align: 'left', value: 'name', sortable: true},
                {text: 'status', value: 'status', sortable: true},
                {text: 'weight', value: 'weight', sortable: true},
                {text: 'exceptionClass', value: 'exceptionClass', sortable: true},
                {text: 'exceptionMessage', value: 'exceptionMessage', sortable: true},
            ],

        }),

        computed: {
            ...mapState('app', ['color', 'hide', 'isMobile', 'small', 'isSmall', 'isVerySmall']),

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

            computedHeaders() {

                if (this.isMobile) {
                    return this.headersMobile;
                } else if (this.isVerySmall) {
                    return this.headersVerySmall;
                } else if (this.isSmall) {
                    return this.headersSmall;
                } else {
                    return this.headers;
                }
            },
        },

        // called when page is created before dom
        created() {
            this.getSubmissions();
        },

        methods: {
            setExpandedJob(index) {
                this.expandedJob = index;
            },

            getExpandedJob() {
                return this.expandedJob;
            },

            getActiveSubmissions() {
                this.$http.get('/submissions/active')
                    .then(response => {
                        this.activeSubmissions = response.data;
                    })
                    .catch(error => console.log(error))
            },

            updateImage() {
                if (this.image_name === '') {
                    this.snackbar_text = "Image name is needed";
                    this.snackbar = true;
                    return;
                }

                if (!this.image_name.endsWith("-tester")) {
                    this.snackbar_text = "Image name needs to end with '-tester'";
                    this.snackbar = true;
                    return;
                }

                this.snackbar_text = "Updating image";
                this.snackbar = true;

                this.$http.put('/image:update/' + this.image_name)
                    .then(response => {
                        this.snackbar_text = "New image has been pulled";
                        this.snackbar = true;
                    })
                    .catch(error => {
                            this.snackbar_text = error;
                            this.snackbar = true;
                        }
                    )
            },

            updateTester() {
                if (this.tester_name === '') {
                    this.snackbar_text = "Tester repo is needed";
                    this.snackbar = true;
                    return;
                }


                this.snackbar_text = "Updating tests";
                this.snackbar = true;

                const regex = /\.[a-zA-Z]+\//gm;
                const namespace = this.tester_name.replace(".git", "").split(regex);
                this.$http.put('/test:update', {
                    "project": {
                        "url": this.tester_name,
                        "path_with_namespace": namespace[namespace.length - 1]
                    }
                })
                    .then(response => {
                        this.snackbar_text = "Updated tests successfully";
                        this.snackbar = true;
                    })
                    .catch(error => {
                            this.snackbar_text = error;
                            this.snackbar = true;
                        }
                    )
            },

            submitSubmission() {

                if (this.programming_language === '') {
                    this.snackbar_text = "Programming language is needed";
                    this.snackbar = true;
                    return;
                }

                if (this.gitStudentRepo === '') {
                    this.snackbar_text = "Student repository is needed";
                    this.snackbar = true;
                    return;
                }

                if (this.tester_repository === '') {
                    this.snackbar_text = "Tester repository is needed";
                    this.snackbar = true;
                    return;
                }

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
                    this.snackbar_text = 'Submission successful';
                    this.snackbar = true;

                    this.$http.post('/:testAsync', jsonData)
                        .then(response => {
                            this.snackbar_text = 'Submission successful';
                            this.snackbar = true;
                        })
                        .catch(error => {
                                this.snackbar_text = error;
                                this.snackbar = true;
                            }
                        )

                } else if (this.testing_mode === "Sync") {
                    this.snackbar_text = 'Submission sent';
                    this.snackbar = true;

                    this.$http.post('/:testSync', jsonData)
                        .then(response => {
                            this.snackbar_text = 'Check submissions table';
                            this.snackbar = true;
                            this.getSubmissions();
                            this.$forceUpdate();
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
                this.testing_mode = null;
                this.programming_language = '';
                this.student_repository = '';
                this.tester_repository = '';
                this.slug = '';
                this.git_hash = '';
                this.uniid = '';
                this.docker_timeout = '';
                this.priority = '';
                this.system_extra = ['noFiles'];
            },

            getSubmission(hash) {
                this.$http.get('/submission/' + hash)
                    .then(response => {
                        this.fullSubmission = response.data;
                        for (let i = 0; i < this.fullSubmission.length; i++) {
                            for (let j = 0; j < this.fullSubmission[i].testSuites.length; i++) {

                                this.fullSubmission[i].testSuites[j].id = j;

                                for (let k = 0; k < this.fullSubmission[i].testSuites[j].unitTests.length; k++) {
                                    this.fullSubmission[i].testSuites[j].unitTests[k].id = k;
                                }

                            }
                        }
                    })
                    .catch(error => console.log(error))
            },

            getSubmissions() {
                this.$http.get('/submissions')
                    .then(response => {
                        response.data.reverse();
                        this.SubmissionList = response.data.filter((thing, index, self) =>
                            index === self.findIndex((t) => (
                                t.hash === thing.hash && t.name === thing.name
                            ))
                        );

                    })
                    .catch(error => console.log(error))
            },

            createFileView(i) {
                let message = "";

                message += "Failed: " + this.fullSubmission[i]['failed'] + "<br>";
                message += "Commit message: " + this.fullSubmission[i]['commitMessage'] + "<br>";
                message += "Docker extra: " + this.fullSubmission[i]['dockerExtra'] + "<br>";
                message += "System extra: " + this.fullSubmission[i]['systemExtra'] + "<br>";
                message += "Priority: " + this.fullSubmission[i]['priority'] + "<br>";
                message += "Git student repository: " + this.fullSubmission[i]['gitStudentRepo'] + "<br>";
                message += "Git test repository: " + this.fullSubmission[i]['gitTestRepo'] + "<br>";
                return message;
            }

        },
    }
</script>

<style scoped>

</style>