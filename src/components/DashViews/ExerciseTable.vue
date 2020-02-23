<template>
    <v-container
            fluid
            grid-list-xl
    >
        <v-card
                :color="color"
                dark
        >
            <material-card
                    :color="color"
                    text="Exercise overview"
                    title="Exercise Table"
            >
                <v-text-field
                        append-icon="search"
                        hide-details
                        label="Search"
                        single-line
                        v-model="search"
                ></v-text-field>

            </material-card>
        </v-card>
        <v-card
                :color="color"
                dark
        >
            <v-data-table

                    :headers="headers"
                    :items="exerciseList"
                    :rows-per-page-items="rowsAmount"
                    :search="search"
                    class="elevation-1"
                    v-if="!isMobile"

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
                    <tr @click="props.expanded = !props.expanded, getExercise(props.item.id)">
                        <td>{{ props.item.id }}</td>
                        <td>{{ props.item.name }}</td>
                        <td>{{ props.item.courseUrl }}</td>
                        <td>{{ props.item.totalCommits }}</td>
                        <td>{{ props.item.totalTestsRan }}</td>
                        <td>{{ props.item.totalTestsPassed }}</td>
                        <td>{{ props.item.totalDiagnosticErrors }}</td>
                        <td>{{ props.item.differentStudents }}</td>
                        <td>{{ props.item.commitsStyleOK }}</td>
                    </tr>
                </template>

                <v-spacer></v-spacer>

                <template v-if="!isMobile" v-slot:expand="props">

                    <v-container fluid ma-0 pa-4>

                        <v-window
                                class="elevation-1 "
                        >
                            <v-window-item>

                                <material-card
                                        :color="color"
                                        text="Student data regarding the exercise only"
                                        title="Students who attempted the exercise"
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
                                            :items="fullExercise.students"
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
                                            <tr @click="props.expanded = !props.expanded, getStudent(props.item)">
                                                <td>{{ props.item.id }}</td>
                                                <td>{{ props.item.uniid }}</td>
                                                <td>{{ props.item.latestSubmission }}</td>
                                                <td>{{ props.item.totalCommits }}</td>
                                                <td>{{ props.item.totalTestsRan }}</td>
                                                <td>{{ props.item.totalTestsPassed }}</td>
                                                <td>{{ props.item.totalDiagnosticErrors }}</td>
                                                <td>{{ props.item.highestPercent }}</td>
                                                <td>{{ props.item.commitsStyleOK }}</td>
                                            </tr>
                                        </template>

                                        <v-spacer></v-spacer>

                                        <template v-scroll v-slot:expand="props">

                                            <v-container fluid ma-0 pa-4>

                                                <v-window class="elevation-1">
                                                    <v-window-item>

                                                        <v-data-table

                                                                :headers="comparableHeaders"
                                                                :hide-actions="true"
                                                                :items="[studentData, averageData, medianData, overallStudentData]"
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

                                                    </v-window-item>
                                                </v-window>

                                            </v-container>
                                        </template>
                                    </v-data-table>
                                </material-card>
                            </v-window-item>
                        </v-window>

                    </v-container>

                </template>

            </v-data-table>

            <v-data-iterator
                    :items="exerciseList"
                    :pagination.sync="pagination"
                    :rows-per-page-items="rowsPerPageItems"
                    item-key="name"
                    :search="search"
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
                                    <v-list-tile-content class="align-end">{{ props.item.id }}</v-list-tile-content>
                                </v-list-tile>
                                <v-list-tile>
                                    <v-list-tile-content>name:</v-list-tile-content>
                                    <v-list-tile-content class="align-end">{{ props.item.name }}</v-list-tile-content>
                                </v-list-tile>
                                <v-list-tile>
                                    <v-list-tile-content>courseUrl:</v-list-tile-content>
                                    <v-list-tile-content class="align-end">{{ props.item.courseUrl }}
                                    </v-list-tile-content>
                                </v-list-tile>
                                <v-list-tile>
                                    <v-list-tile-content>totalCommits:</v-list-tile-content>
                                    <v-list-tile-content class="align-end">{{ props.item.totalCommits }}
                                    </v-list-tile-content>
                                </v-list-tile>
                                <v-list-tile>
                                    <v-list-tile-content>totalTestsRan:</v-list-tile-content>
                                    <v-list-tile-content class="align-end">{{ props.item.totalTestsRan }}
                                    </v-list-tile-content>
                                </v-list-tile>
                                <v-list-tile>
                                    <v-list-tile-content>totalTestsPassed:</v-list-tile-content>
                                    <v-list-tile-content class="align-end">{{ props.item.totalTestsPassed }}
                                    </v-list-tile-content>
                                </v-list-tile>
                                <v-list-tile>
                                    <v-list-tile-content>totalDiagnosticErrors:</v-list-tile-content>
                                    <v-list-tile-content class="align-end">{{ props.item.totalDiagnosticErrors }}
                                    </v-list-tile-content>
                                </v-list-tile>
                                <v-list-tile>
                                    <v-list-tile-content>differentStudents:</v-list-tile-content>
                                    <v-list-tile-content class="align-end">{{ props.item.differentStudents }}
                                    </v-list-tile-content>
                                </v-list-tile>
                                <v-list-tile>
                                    <v-list-tile-content>commitsStyleOK:</v-list-tile-content>
                                    <v-list-tile-content class="align-end">{{ props.item.commitsStyleOK }}
                                    </v-list-tile-content>
                                </v-list-tile>
                            </v-list>
                        </v-card>
                    </v-flex>
                </template>
            </v-data-iterator>

        </v-card>
        <!--        Footer hides otherwise-->
        <br><br><br><br>
    </v-container>


</template>

<script>
    import {mapState} from "vuex";

    export default {
        data: () => ({

            // Charon like
            exerciseList: [],
            fullExercise: [],
            student: [],

            rowsPerPageItems: [4, 8, 12, 24],
            pagination: {
                rowsPerPage: 8
            },

            rowsAmount: [15, 20, 25, {"text": "$vuetify.dataIterator.rowsPerPageAll", "value": -1}],
            search: '',
            subSearch: '',
            headers: [
                {text: 'id', align: 'left', value: 'id'},
                {text: 'name', value: 'name'},
                {text: 'courseUrl', value: 'courseUrl'},
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
                {text: 'totalTestsPassed', value: 'totalTestsPassed'},
                {text: 'totalDiagnosticErrors', value: 'totalDiagnosticErrors'},
                {text: 'highestPercent (%)', value: 'highestPercent'},
                {text: 'commitsStyleOK', value: 'commitsStyleOK'},
            ],

            comparableHeaders: [
                {text: 'student', align: 'left', value: 'student', sortable: false},
                {text: 'totalCommits', value: 'totalCommits', sortable: false},
                {text: 'totalTestsRan', value: 'totalTestsRan', sortable: false},
                {text: 'totalTestsPassed', value: 'totalTestsPassed', sortable: false},
                {text: 'totalDiagnosticErrors', value: 'totalDiagnosticErrors', sortable: false},
                {text: 'highestPercent (%)', value: 'highestPercent', sortable: false},
                {text: 'styleOkPerCommit (%)', value: 'commitsStyleOK', sortable: false},
            ],

            studentData: [],

            averageData: [],

            medianData: [],

            overallStudentData: [],

        }),

        computed: {
            ...mapState('app', ['color', 'isMobile']),
        },

        // called when page is created before dom
        created() {
            this.getExercises();
        },

        methods: {
            getStudent(student) {
                this.$http.get('/slug/student/' + student.id)
                    .then(response => {
                        this.student = response.data;
                        this.studentData = [
                            "Selected",
                            student.totalCommits,
                            student.totalTestsRan,
                            student.totalTestsPassed,
                            student.totalDiagnosticErrors,
                            student.highestPercent,
                            (student.commitsStyleOK / student.totalCommits) * 100
                        ];

                        this.overallStudentData = [
                            "Selected Overall",
                            this.student.totalCommits,
                            this.student.totalTestsRan,
                            this.student.totalTestsPassed,
                            this.student.totalDiagnosticErrors,
                            "...",
                            (this.student.commitsStyleOK / this.student.totalCommits) * 100
                        ]
                    })
                    .catch(error => console.log(error))
            },

            getExercise(id) {
                this.$http.get('/slug/' + id)
                    .then(response => {
                        this.fullExercise = response.data;
                        this.calculateAverage();
                        this.calculateMedian();
                    })
                    .catch(error => console.log(error))
            },

            getExercises() {
                this.$http.get('/slugs')
                    .then(response => {
                        this.exerciseList = response.data
                    })
                    .catch(error => console.log(error))
            },

            calculateAverage() {
                let avgCommits = 0;
                let avgTestsRan = 0;
                let avgTestsPassed = 0;
                let avgDiagnosticErrors = 0;
                let avgPercent = 0;
                let avgStyleOK = 0;
                let count = 0;

                for (var student in this.fullExercise.students) {
                    avgCommits += this.fullExercise.students[student].totalCommits;
                    avgTestsRan += this.fullExercise.students[student].totalTestsRan;
                    avgTestsPassed += this.fullExercise.students[student].totalTestsPassed;
                    avgDiagnosticErrors += this.fullExercise.students[student].totalDiagnosticErrors;
                    avgPercent += this.fullExercise.students[student].highestPercent;
                    avgStyleOK += this.fullExercise.students[student].commitsStyleOK / this.fullExercise.students[student].totalCommits;
                    count++;
                }
                this.averageData = [
                    "Average",
                    avgCommits / count,
                    avgTestsRan / count,
                    avgTestsPassed / count,
                    avgDiagnosticErrors / count,
                    avgPercent / count,
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
                let avgStyleOK = [];

                for (var student in this.fullExercise.students) {
                    avgCommits.push(this.fullExercise.students[student].totalCommits);
                    avgTestsRan.push(this.fullExercise.students[student].totalTestsRan);
                    avgTestsPassed.push(this.fullExercise.students[student].totalTestsPassed);
                    avgDiagnosticErrors.push(this.fullExercise.students[student].totalDiagnosticErrors);
                    avgSlugs.push(this.fullExercise.students[student].highestPercent);
                    avgStyleOK.push(this.fullExercise.students[student].commitsStyleOK / this.fullExercise.students[student].totalCommits);
                }

                this.medianData = [
                    "Median",
                    this.median(avgCommits),
                    this.median(avgTestsRan),
                    this.median(avgTestsPassed),
                    this.median(avgDiagnosticErrors),
                    this.median(avgSlugs),
                    this.median(avgStyleOK) * 100
                ];

            }

        }
    }
</script>

<style scoped>

</style>