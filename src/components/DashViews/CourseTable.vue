<template>
    <v-container
            fluid
            grid-list-xl
    >

        <material-card
                :color="color"
                text="Course overview"
                title="Course Table"
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
                :items="courseList"
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
                <tr @click="props.expanded = !props.expanded, getCourse(props.item.id)">
                    <td>{{ props.item.id }}</td>
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.totalCommits }}</td>
                    <td>{{ props.item.totalTestsRan }}</td>
                    <td>{{ props.item.totalTestsPassed }}</td>
                    <td>{{ props.item.totalDiagnosticErrors }}</td>
                    <td>{{ props.item.differentStudents }}</td>
                    <td>{{ props.item.commitsStyleOK }}</td>
                </tr>
            </template>

            <v-spacer></v-spacer>

            <template v-slot:expand="props">

                <v-container>
                    <v-layout row wrap>
                        <v-flex>

                            <v-window
                                    class="elevation-1"
                            >
                                <v-window-item>

                                    <material-card
                                            :color="color"
                                            text="Student data regarding the course only"
                                            title="Students taking the course"
                                    >
                                        <v-text-field
                                                append-icon="search"
                                                hide-details
                                                label="Search"
                                                single-line
                                                v-model="subSearch"
                                        ></v-text-field>

                                        <v-data-table

                                                :headers="subHeaders"
                                                :items="fullCourse.students"
                                                :rows-per-page-items="rowsAmount"
                                                :search="subSearch"
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
                                                <tr @click="props.expanded = !props.expanded">
                                                    <td>{{ props.item.id }}</td>
                                                    <td>{{ props.item.student.uniid }}</td>
                                                    <td>{{ props.item.latestSubmission }}</td>
                                                    <td>{{ props.item.totalCommits }}</td>
                                                    <td>{{ props.item.totalTestsRan }}</td>
                                                    <td>{{ props.item.totalTestsPassed }}</td>
                                                    <td>{{ props.item.totalDiagnosticErrors }}</td>
                                                    <td>{{ props.item.differentSlugs }}</td>
                                                    <td>{{ props.item.commitsStyleOK }}</td>
                                                </tr>
                                            </template>

                                            <v-spacer></v-spacer>

                                            <template v-slot:expand="props">

                                                <v-container>
                                                    <v-layout row wrap>
                                                        <v-flex>

                                                            <v-window
                                                                    class="elevation-1"
                                                            >
                                                                <v-window-item>

                                                                    <v-card flat id="fullStudentCourse">
                                                                        <div v-html="props.item.student"></div>
                                                                    </v-card>

                                                                </v-window-item>
                                                            </v-window>

                                                        </v-flex>
                                                    </v-layout>
                                                </v-container>

                                            </template>

                                        </v-data-table>

                                    </material-card>
                                </v-window-item>
                            </v-window>
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
        data: () => ({

            courseList: [],
            fullCourse: [],
            rowsAmount: [15, 20, 25, {"text": "$vuetify.dataIterator.rowsPerPageAll", "value": -1}],
            search: '',
            subSearch: '',
            headers: [
                {text: 'id', align: 'left', value: 'id'},
                {text: 'name', value: 'name'},
                {text: 'totalCommits', value: 'totalCommits'},
                {text: 'totalTestsRan', value: 'totalTestsRan'},
                {text: 'totalTestsPassed', value: 'totalDiagnosticErrors'},
                {text: 'totalDiagnosticErrors', value: 'totalDiagnosticErrors'},
                {text: 'differentStudents', value: 'differentStudents'},
                {text: 'commitsStyleOK', value: 'commitsStyleOK'},
            ],
            subHeaders: [
                {text: 'id', align: 'left', value: 'id'},
                {text: 'uniid', value: 'uniid'},
                {text: 'latestSubmission', value: 'latestSubmission'},
                {text: 'totalCommits', value: 'totalCommits'},
                {text: 'totalTestsRan', value: 'totalTestsRan'},
                {text: 'totalTestsPassed', value: 'totalDiagnosticErrors'},
                {text: 'totalDiagnosticErrors', value: 'totalDiagnosticErrors'},
                {text: 'differentSlugs', value: 'differentSlugs'},
                {text: 'commitsStyleOK', value: 'commitsStyleOK'},
            ]
        }),

        computed: {
            ...mapState('app', ['color']),
        },

        // called when page is created before dom
        created() {
            this.getCourses();
        },

        methods: {
            getCourse(id) {
                this.$http.get('/course/' + id)
                    .then(response => {
                        this.fullCourse = response.data;
                    })
                    .catch(error => console.log(error))
            },

            getCourses() {
                this.$http.get('/courses')
                    .then(response => {
                        this.courseList = response.data
                    })
                    .catch(error => console.log(error))
            },

        }
    }
</script>

<style scoped>

    #fullCourse {

        max-height: 50em;
        overflow: auto;
        white-space: normal;

    }

</style>