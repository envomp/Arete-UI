<template>
    <v-container
            fluid
            grid-list-xl
    >

        <material-card
                :color="color"
                text="Student overview"
                title="Student Table"
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
                <tr @click="props.expanded = !props.expanded, getStudent(props.item)">
                    <td>{{ props.item.id }}</td>
                    <td>{{ props.item.uniid }}</td>
                    <td>{{ props.item.lastTested }}</td>
                    <td>{{ props.item.totalCommits }}</td>
                    <td>{{ props.item.totalTestsRan }}</td>
                    <td>{{ props.item.totalTestsPassed }}</td>
                    <td>{{ props.item.totalDiagnosticErrors }}</td>
                    <td>{{ props.item.differentSlugs }}</td>
                    <td>{{ props.item.differentCourses }}</td>
                    <td>{{ props.item.commitsStyleOK }}</td>
                </tr>
            </template>

            <v-spacer></v-spacer>

            <template v-slot:expand="props">

                <v-container fluid ma-0 pa-4>

                    <v-window>

                        <v-data-table

                                :headers="comparableHeaders"
                                :hide-actions="true"
                                :items="[studentData, averageData, medianData]"
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
                                <tr>
                                    <td>{{ props.item[0] }}</td>
                                    <td>{{ props.item[1] }}</td>
                                    <td>{{ props.item[2] }}</td>
                                    <td>{{ props.item[3] }}</td>
                                    <td>{{ props.item[4] }}</td>
                                    <td>{{ props.item[5] }}</td>
                                    <td>{{ props.item[6] }}</td>
                                    <td>{{ props.item[7] }}</td>
                                    <td>{{ props.item[8] }}</td>
                                </tr>
                            </template>

                        </v-data-table>

                    </v-window>

                </v-container>

            </template>
        </v-data-table>

        <!--        Footer hides otherwise-->
        <br><br><br><br>
    </v-container>


</template>

<script>
    import {mapState} from "vuex";
    import {GChart} from "vue-google-charts";

    export default {
        data: () => ({

            studentsList: [],
            fullStudent: [],
            rowsAmount: [15, 20, 25, {"text": "$vuetify.dataIterator.rowsPerPageAll", "value": -1}],
            search: '',
            headers: [
                {text: 'id', align: 'left', value: 'id'},
                {text: 'uniid', value: 'uniid'},
                {text: 'lastTested', value: 'lastTested'},
                {text: 'totalCommits', value: 'totalCommits'},
                {text: 'totalTestsRan', value: 'totalTestsRan'},
                {text: 'totalTestsPassed', value: 'totalDiagnosticErrors'},
                {text: 'totalDiagnosticErrors', value: 'totalDiagnosticErrors'},
                {text: 'differentSlugs', value: 'differentSlugs'},
                {text: 'differentCourses', value: 'differentCourses'},
                {text: 'commitsStyleOK', value: 'commitsStyleOK'},
            ],

            comparableHeaders: [
                {text: 'student', align: 'left', value: 'student', sortable: false},
                {text: 'totalCommits', value: 'totalCommits', sortable: false},
                {text: 'totalTestsRan', value: 'totalTestsRan', sortable: false},
                {text: 'totalTestsPassed', value: 'totalTestsPassed', sortable: false},
                {text: 'totalDiagnosticErrors', value: 'totalDiagnosticErrors', sortable: false},
                {text: 'differentSlugs', value: 'differentSlugs', sortable: false},
                {text: 'differentCourses', value: 'differentCourses', sortable: false},
                {text: 'styleOkPerCommit (%)', value: 'commitsStyleOK', sortable: false},
            ],

            studentData: [],

            averageData: [],

            medianData: [],
        }),

        components: {
            GChart
        },

        computed: {
            ...mapState('app', ['color']),
        },

        // called when page is created before dom
        created() {
            this.getStudents();
        },

        methods: {
            getStudent(student) {
                this.$http.get('/student/' + student.id)
                    .then(response => {
                        this.fullStudent = response.data;
                        this.studentData = [
                            "Selected",
                            student.totalCommits,
                            student.totalTestsRan,
                            student.totalTestsPassed,
                            student.totalDiagnosticErrors,
                            student.differentSlugs,
                            student.differentCourses,
                            (student.commitsStyleOK / student.totalCommits) * 100
                        ]
                    })
                    .catch(error => console.log(error))
            },

            getStudents() {
                this.$http.get('/students')
                    .then(response => {
                        this.studentsList = response.data;
                        this.calculateAverage();
                        this.calculateMedian();
                    })
                    .catch(error => console.log(error))
            },

            calculateAverage() {
                let avgCommits = 0;
                let avgTestsRan = 0;
                let avgTestsPassed = 0;
                let avgDiagnosticErrors = 0;
                let avgSlugs = 0;
                let avgCourses = 0;
                let avgStyleOK = 0;
                let count = 0;

                for (var student in this.studentsList) {
                    avgCommits += this.studentsList[student].totalCommits;
                    avgTestsRan += this.studentsList[student].totalTestsRan;
                    avgTestsPassed += this.studentsList[student].totalTestsPassed;
                    avgDiagnosticErrors += this.studentsList[student].totalDiagnosticErrors;
                    avgSlugs += this.studentsList[student].differentSlugs;
                    avgCourses += this.studentsList[student].differentCourses;
                    avgStyleOK += (this.studentsList[student].commitsStyleOK / this.studentsList[student].totalCommits);
                    count++;
                }
                this.averageData = [
                    "Average",
                    avgCommits / count,
                    avgTestsRan / count,
                    avgTestsPassed / count,
                    avgDiagnosticErrors / count,
                    avgSlugs / count,
                    avgCourses / count,
                    (avgStyleOK / count) * 100
                ];

            },

            median(values) {
                if (values.length === 0) return 0;

                values.sort(function (a, b) {
                    return a - b;
                });

                var half = Math.floor(values.length / 2);

                if (values.length % 2)
                    return values[half];

                return (values[half - 1] + values[half]) / 2.0;
            },

            calculateMedian() {
                let avgCommits = [];
                let avgTestsRan = [];
                let avgTestsPassed = [];
                let avgDiagnosticErrors = [];
                let avgSlugs = [];
                let avgCourses = [];
                let avgStyleOK = [];

                for (var student in this.studentsList) {
                    avgCommits.push(this.studentsList[student].totalCommits);
                    avgTestsRan.push(this.studentsList[student].totalTestsRan);
                    avgTestsPassed.push(this.studentsList[student].totalTestsPassed);
                    avgDiagnosticErrors.push(this.studentsList[student].totalDiagnosticErrors);
                    avgSlugs.push(this.studentsList[student].differentSlugs);
                    avgCourses.push(this.studentsList[student].differentCourses);
                    avgStyleOK.push(this.studentsList[student].commitsStyleOK / this.studentsList[student].totalCommits);
                }

                this.medianData = [
                    "Median",
                    this.median(avgCommits),
                    this.median(avgTestsRan),
                    this.median(avgTestsPassed),
                    this.median(avgDiagnosticErrors),
                    this.median(avgSlugs),
                    this.median(avgCourses),
                    this.median(avgStyleOK) * 100
                ];

            }

        }
    }
</script>

<style scoped>


</style>