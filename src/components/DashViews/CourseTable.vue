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
                id="topCourseTable"
                :headers="headers"
                :items="courseList"
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
                <tr @click="() => {{!props.expanded ? getCourse(props.item.id) : null ; props.expanded = !props.expanded}}">
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

            <template v-if="!isMobile" v-slot:expand="props2">

                <v-container fluid ma-0 pa-4>

                    <v-window
                            class="elevation-1 "
                            v-if="!isGraphLoading"
                    >
                        <v-window-item>

                            <v-tabs
                                    :slider-color="color"
                                    color="grey darken-4"
                            >

                                <v-tab :key="'timestampChartTab' + props2.item.id"
                                       ripple>
                                    <v-icon left>mdi-chart-line</v-icon>
                                    Timestamps chart
                                </v-tab>

                                <v-tab :key="'testErrorsChartTab' + props2.item.id"
                                       ripple
                                >
                                    <v-icon left>mdi-chart-bar</v-icon>
                                    Test errors chart
                                </v-tab>

                                <v-tab :key="'diagnosticErrorsChartTab' + props2.item.id"
                                       ripple>
                                    <v-icon left>mdi-chart-histogram</v-icon>
                                    Diagnostic errors chart
                                </v-tab>

                                <v-tab-item>
                                    <v-card flat>
                                        <v-flex>
                                            <v-window type="chart">

                                                <div class="chart-area">
                                                    <line-chart
                                                            :chart-data="timestampsChart.chartData"
                                                            :chart-id="'timestamp-bar-chart' + props2.item.id"
                                                            :extra-options="timestampsChart.extraOptions"
                                                            :key="'timestampsChart' + props2.item.id"
                                                            style="height: 400px">
                                                    </line-chart>
                                                </div>

                                            </v-window>
                                        </v-flex>
                                    </v-card>
                                </v-tab-item>

                                <v-tab-item>

                                    <v-card flat>
                                        <v-flex>
                                            <v-window type="chart">

                                                <div class="chart-area">
                                                    <bar-chart
                                                            :chart-data="testErrorsChart.chartData"
                                                            :chart-id="'test-bar-chart' + props2.item.id"
                                                            :extra-options="testErrorsChart.extraOptions"
                                                            :key="'testErrorsChart' + props2.item.id"
                                                            style="height: 400px">
                                                    </bar-chart>
                                                </div>

                                            </v-window>
                                        </v-flex>
                                    </v-card>

                                </v-tab-item>

                                <v-tab-item>
                                    <v-card flat>
                                        <v-flex>
                                            <v-window type="chart">

                                                <div class="chart-area">
                                                    <bar-chart
                                                            :chart-data="diagnosticErrorsChart.chartData"
                                                            :chart-id="'diagnostic-bar-chart' + props2.item.id"
                                                            :extra-options="diagnosticErrorsChart.extraOptions"
                                                            :key="'diagnosticErrorsChart' + props2.item.id"
                                                            style="height: 400px">
                                                    </bar-chart>
                                                </div>

                                            </v-window>
                                        </v-flex>
                                    </v-card>
                                </v-tab-item>

                                <v-spacer></v-spacer>

                            </v-tabs>

                            <v-window
                                    class="elevation-1"
                            >

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
                                </material-card>

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
                                            v-slot:items="props3"
                                    >
                                        <tr @click="() => {{!props3.expanded ? getStudent(props3.item) : null ; props3.expanded = !props3.expanded}}">
                                            <td>{{ props3.item.id }}</td>
                                            <td>{{ props3.item.uniid }}</td>
                                            <td>{{ props3.item.latestSubmission }}</td>
                                            <td>{{ props3.item.totalCommits }}</td>
                                            <td>{{ props3.item.totalTestsRan }}</td>
                                            <td>{{ props3.item.totalTestsPassed }}</td>
                                            <td>{{ props3.item.totalDiagnosticErrors }}</td>
                                            <td>{{ props3.item.differentSlugs }}</td>
                                            <td>{{ props3.item.commitsStyleOK }}</td>
                                        </tr>
                                    </template>

                                    <template v-slot:expand="props">

                                        <v-container fluid ma-0 pa-4>

                                            <v-window
                                                    class="elevation-1 "
                                                    v-if="isTimelineComplete">

                                                <v-layout wrap>

                                                    <v-flex
                                                            lg4
                                                            md12
                                                            sm12
                                                            xs12>
                                                        <material-card
                                                                :color="color"
                                                                title="Submission frequency"
                                                                v-if="isTimelineComplete"
                                                        >
                                                            <v-window type="chart">
                                                                <div class="chart-area">
                                                                    <line-chart
                                                                            :chart-data="studentTimestampsChart.chartData"
                                                                            :chart-id="'studentTimestampsChart' + props.id"
                                                                            :extra-options="studentTimestampsChart.extraOptions"
                                                                            :key="'studentTimestampsChart' + props.id"
                                                                            style="height: 400px">
                                                                    </line-chart>
                                                                </div>
                                                            </v-window>
                                                        </material-card>

                                                        <v-progress-linear :color="color" :indeterminate="true"
                                                                           v-else></v-progress-linear>

                                                    </v-flex>

                                                    <v-flex
                                                            lg4
                                                            md6
                                                            sm6
                                                            xs12>
                                                        <material-card
                                                                :color="color"
                                                                title="Diagnostic errors"
                                                                v-if="isTimelineComplete"
                                                        >
                                                            <v-window type="chart">
                                                                <div class="chart-area">
                                                                    <bar-chart
                                                                            :chart-data="studentDiagnosticErrorChart.chartData"
                                                                            :chart-id="'studentDiagnosticErrorChart' + props.id"
                                                                            :extra-options="studentDiagnosticErrorChart.extraOptions"
                                                                            :gradient-stops="studentDiagnosticErrorChart.gradientStops"
                                                                            :key="'studentDiagnosticErrorChart' + props.id"
                                                                            style="height: 100%">
                                                                    </bar-chart>
                                                                </div>
                                                            </v-window>
                                                        </material-card>

                                                        <v-progress-linear :color="color" :indeterminate="true"
                                                                           v-else></v-progress-linear>

                                                    </v-flex>

                                                    <v-flex
                                                            lg4
                                                            md6
                                                            sm6
                                                            xs12>
                                                        <material-card
                                                                :color="color"
                                                                title="Code errors"
                                                                v-if="isTimelineComplete"
                                                        >
                                                            <v-window type="chart">
                                                                <div class="chart-area">
                                                                    <bar-chart
                                                                            :chart-data="studentCodeErrorChart.chartData"
                                                                            :chart-id="'studentCodeErrorChart' + props.id"
                                                                            :extra-options="studentCodeErrorChart.extraOptions"
                                                                            :gradient-stops="studentCodeErrorChart.gradientStops"
                                                                            :key="'studentCodeErrorChart' + props.id"
                                                                            style="height: 100%">
                                                                    </bar-chart>
                                                                </div>
                                                            </v-window>
                                                        </material-card>

                                                        <v-progress-linear :color="color" :indeterminate="true"
                                                                           v-else></v-progress-linear>

                                                    </v-flex>

                                                    <v-flex
                                                            lg12
                                                            md12
                                                            sm12
                                                            xs12>

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

                                                    </v-flex>

                                                </v-layout>

                                            </v-window>

                                            <v-progress-linear :color="color" :indeterminate="true"
                                                               v-else></v-progress-linear>

                                        </v-container>

                                    </template>

                                </v-data-table>

                            </v-window>

                        </v-window-item>

                    </v-window>

                    <v-progress-linear :color="color" :indeterminate="true" v-else></v-progress-linear>

                </v-container>

            </template>

        </v-data-table>

        <v-data-iterator
                :items="courseList"
                :pagination.sync="pagination"
                :rows-per-page-items="rowsPerPageItems"
                :search="search"
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
                                <v-list-tile-content class="align-end">{{ props.item.id }}</v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile>
                                <v-list-tile-content>name:</v-list-tile-content>
                                <v-list-tile-content class="align-end">{{ props.item.name }}</v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile>
                                <v-list-tile-content>totalCommits:</v-list-tile-content>
                                <v-list-tile-content class="align-end">{{ props.item.totalCommits }}
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile>
                                <v-list-tile-content>totalTestsRun:</v-list-tile-content>
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

        <!--        Footer hides otherwise-->
        <br><br><br><br>
    </v-container>


</template>

<script>
    import {mapState} from "vuex";
    import GraphStyle from '@/components/charts/ChartStyle'
    import LineChart from '@/components/charts/LineChart';
    import BarChart from '@/components/charts/BarChart';
    import * as chartConfigs from '@/components/charts/config';
    import {codeToHEX} from '@/utils/colorUtils'

    export default {
        components: {
            LineChart,
            BarChart,
            GraphStyle
        },

        data: () => ({

            studentTimestampsChart: {
                extraOptions: chartConfigs.purpleChartOptions,
                chartData: {
                    labels: ['0:00', '0:30', '1:00', '1:30', '2:00', '2:30', '3:00', '3:30', '4:00', '4:30', '5:00', '5:30', '6:00', '6:30', '7:00', '7:30', '8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'],
                    datasets: [{
                        label: "Time",
                        fill: true,
                        borderColor: codeToHEX(),
                        borderWidth: 2,
                        borderDash: [],
                        borderDashOffset: 0.0,
                        pointBackgroundColor: codeToHEX(),
                        pointBorderColor: 'rgba(255,255,255,0)',
                        pointHoverBackgroundColor: codeToHEX(),
                        pointBorderWidth: 20,
                        pointHoverRadius: 4,
                        pointHoverBorderWidth: 15,
                        pointRadius: 4,
                        data: [1, 1, 1, 1, 1],
                    }]
                },
                gradientColors: GraphStyle.primaryGradient,
                gradientStops: [1, 0.2, 0],
            },

            studentCodeErrorChart: {
                extraOptions: chartConfigs.barChartOptions,
                chartData: {
                    labels: [],
                    datasets: [{
                        label: "amount",
                        fill: true,
                        borderColor: codeToHEX(),
                        borderWidth: 2,
                        borderDash: [],
                        borderDashOffset: 0.0,
                        data: [],
                    }]
                },
                gradientColors: GraphStyle.primaryGradient,
                gradientStops: [1, 0.4, 0],
            },

            studentDiagnosticErrorChart: {
                extraOptions: chartConfigs.barChartOptions,
                chartData: {
                    labels: [],
                    datasets: [{
                        label: "amount",
                        fill: true,
                        borderColor: codeToHEX(),
                        borderWidth: 2,
                        borderDash: [],
                        borderDashOffset: 0.0,
                        data: [],
                    }]
                },
                gradientColors: GraphStyle.primaryGradient,
                gradientStops: [1, 0.4, 0],
            },

            isTimelineComplete: false,

            courseList: [],
            fullCourse: [],
            student: [],

            rowsPerPageItems: [4, 8, 12, 24],
            pagination: {
                rowsPerPage: 8
            },

            isGraphLoading: true,

            search: '',
            rowsAmount: [15, 20, 25, {"text": "$vuetify.dataIterator.rowsPerPageAll", "value": -1}],
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
                {text: 'totalTestsPassed', value: 'totalTestsPassed'},
                {text: 'totalDiagnosticErrors', value: 'totalDiagnosticErrors'},
                {text: 'differentSlugs', value: 'differentSlugs'},
                {text: 'commitsStyleOK', value: 'commitsStyleOK'},
            ],

            comparableHeaders: [
                {text: 'student', align: 'left', value: 'student', sortable: false},
                {text: 'totalCommits', value: 'totalCommits', sortable: false},
                {text: 'totalTestsRan', value: 'totalTestsRan', sortable: false},
                {text: 'totalTestsPassed', value: 'totalTestsPassed', sortable: false},
                {text: 'totalDiagnosticErrors', value: 'totalDiagnosticErrors', sortable: false},
                {text: 'differentSlugs', value: 'differentSlugs', sortable: false},
                {text: 'styleOkPerCommit (%)', value: 'commitsStyleOK', sortable: false},
            ],

            studentData: [],

            averageData: [],

            medianData: [],

            overallStudentData: [],

            diagnosticErrorsChart: {
                extraOptions: chartConfigs.barChartOptions,
                chartData: {
                    labels: [],
                    datasets: [{
                        label: "Repetitions",
                        fill: true,
                        borderColor: codeToHEX(),
                        borderWidth: 2,
                        borderDash: [],
                        borderDashOffset: 0.0,
                        data: [],
                    }]
                },
            },

            testErrorsChart: {
                extraOptions: chartConfigs.barChartOptions,
                chartData: {
                    labels: [],
                    datasets: [{
                        label: "Repetitions",
                        fill: true,
                        borderColor: codeToHEX(),
                        borderWidth: 2,
                        borderDash: [],
                        borderDashOffset: 0.0,
                        data: [],
                    }]
                },
            },

            timestampsChart: {
                extraOptions: chartConfigs.purpleChartOptions,
                chartData: {
                    labels: ['0:00', '0:30', '1:00', '1:30', '2:00', '2:30', '3:00', '3:30', '4:00', '4:30', '5:00', '5:30', '6:00', '6:30', '7:00', '7:30', '8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'],
                    datasets: [{
                        label: "Time",
                        fill: true,
                        borderColor: codeToHEX(),
                        borderWidth: 2,
                        borderDash: [],
                        borderDashOffset: 0.0,
                        pointBackgroundColor: codeToHEX(),
                        pointBorderColor: 'rgba(255,255,255,0)',
                        pointHoverBackgroundColor: codeToHEX(),
                        pointBorderWidth: 20,
                        pointHoverRadius: 4,
                        pointHoverBorderWidth: 15,
                        pointRadius: 4,
                        data: [1, 1, 1, 1, 1],
                    }]
                },
                gradientColors: GraphStyle.primaryGradient,
                gradientStops: [1, 0.2, 0],
            },


        }),

        computed: {
            ...mapState('app', ['color', 'isMobile', 'isVerySmall']),
        },

        // called when page is created before dom
        created() {
            this.getCourses();
        },

        methods: {

            generateStudentDiagnosticErrorChart() {
                let diagnosticHeaders = [];
                let diagnosticList = [];

                for (let i = 0; i < this.student.diagnosticCodeErrors.length; i++) {
                    diagnosticHeaders.push(this.student.diagnosticCodeErrors[i].errorType);
                    diagnosticList.push(this.student.diagnosticCodeErrors[i].repetitions);
                }

                this.studentDiagnosticErrorChart.chartData.labels = diagnosticHeaders;
                this.studentDiagnosticErrorChart.chartData.datasets[0].data = diagnosticList;
            },

            generateStudentErrorChart() {
                let testCodeHeaders = [];
                let testCodeList = [];

                for (let i = 0; i < this.student.testCodeErrors.length; i++) {
                    testCodeHeaders.push(this.student.testCodeErrors[i].errorType);
                    testCodeList.push(this.student.testCodeErrors[i].repetitions);
                }

                this.studentCodeErrorChart.chartData.labels = testCodeHeaders;
                this.studentCodeErrorChart.chartData.datasets[0].data = testCodeList;
            },

            generateStudentTimestampChartData() {
                let timestamps = {};
                let timestampList = [];

                for (let i = 0; i < this.student.timestamps.length; i++) {

                    const timeString = this.convert(this.student.timestamps[i]);
                    if (timestamps[timeString]) {
                        timestamps[timeString] += 1;
                    } else {
                        timestamps[timeString] = 1;
                    }
                }

                for (let i = 0; i < this.studentTimestampsChart.chartData.labels.length; i++) {
                    if (timestamps[this.studentTimestampsChart.chartData.labels[i]]) {
                        timestampList.push(timestamps[this.studentTimestampsChart.chartData.labels[i]]);
                    } else {
                        timestampList.push(0);
                    }

                }
                this.studentTimestampsChart.chartData.datasets[0].data = timestampList;
            },

            getStudent(student) {
                this.isTimelineComplete = false;

                this.$http.get('/course/student/' + student.id)
                    .then(response => {
                        this.student = response.data;
                        this.studentData = [
                            "Selected",
                            student.totalCommits,
                            student.totalTestsRan,
                            student.totalTestsPassed,
                            student.totalDiagnosticErrors,
                            student.differentSlugs,
                            (student.commitsStyleOK / student.totalCommits) * 100
                        ];

                        this.overallStudentData = [
                            "Selected Overall",
                            this.student.totalCommits,
                            this.student.totalTestsRan,
                            this.student.totalTestsPassed,
                            this.student.totalDiagnosticErrors,
                            this.student.differentSlugs,
                            (this.student.commitsStyleOK / this.student.totalCommits) * 100
                        ];

                        this.generateStudentDiagnosticErrorChart();
                        this.generateStudentErrorChart();
                        this.generateStudentTimestampChartData();

                        this.isTimelineComplete = true;
                    })
                    .catch(error => console.log(error));
            },

            convert(t) {
                const dt = new Date(t);
                const hr = dt.getUTCHours();
                const m = dt.getUTCMinutes() > 30 ? '30' : '00';

                return hr + ':' + m.substr(-2)
            },

            generateDiagnosticChartData() {
                let diagnosticErrorMessages = [];
                let diagnosticErrorRepetitions = [];

                for (let i = 0; i < this.fullCourse.diagnosticCodeErrors.length; i++) {
                    diagnosticErrorMessages.push(this.fullCourse.diagnosticCodeErrors[i].errorType);
                    diagnosticErrorRepetitions.push(this.fullCourse.diagnosticCodeErrors[i].repetitions);
                }

                this.diagnosticErrorsChart.chartData.labels = diagnosticErrorMessages;
                this.diagnosticErrorsChart.chartData.datasets[0].data = diagnosticErrorRepetitions;
            },

            generateErrorChartData: function () {
                let testErrorMessages = [];
                let testErrorRepetitions = [];

                for (let i = 0; i < this.fullCourse.testCodeErrors.length; i++) {
                    testErrorMessages.push(this.fullCourse.testCodeErrors[i].errorType);
                    testErrorRepetitions.push(this.fullCourse.testCodeErrors[i].repetitions);
                }

                this.testErrorsChart.chartData.labels = testErrorMessages;
                this.testErrorsChart.chartData.datasets[0].data = testErrorRepetitions;
            },

            generateTimestampChartData: function () {
                let timestamps = {};
                let timestampList = [];

                for (let i = 0; i < this.fullCourse.students.length; i++) {
                    for (let j = 0; j < this.fullCourse.students[i].timestamps.length; j++) {

                        const timeString = this.convert(this.fullCourse.students[i].timestamps[j]);

                        if (timestamps[timeString]) {
                            timestamps[timeString] += 1;
                        } else {
                            timestamps[timeString] = 1;
                        }

                    }
                }

                for (let i = 0; i < this.timestampsChart.chartData.labels.length; i++) {
                    const label = timestamps[this.timestampsChart.chartData.labels[i]];
                    if (label) {
                        timestampList.push(label);
                    } else {
                        timestampList.push(0);
                    }
                }

                this.timestampsChart.chartData.datasets[0].data = timestampList;
            },

            getCourse(id) {
                this.isGraphLoading = true;
                this.$http.get('/course/' + id)
                    .then(response => {
                        this.fullCourse = response.data;

                        this.generateDiagnosticChartData();
                        this.generateErrorChartData();
                        this.generateTimestampChartData();

                        this.calculateAverage();
                        this.calculateMedian();
                        this.isGraphLoading = false;
                    })
                    .catch(error => console.log(error)).finally(() => {
                });
            },

            getCourses() {
                this.$http.get('/courses')
                    .then(response => {
                        this.courseList = response.data
                    })
                    .catch(error => console.log(error))
            },

            calculateAverage() {
                let avgCommits = 0;
                let avgTestsRan = 0;
                let avgTestsPassed = 0;
                let avgDiagnosticErrors = 0;
                let avgSlugs = 0;
                let avgStyleOK = 0;
                let count = 0;

                for (var student in this.fullCourse.students) {
                    avgCommits += this.fullCourse.students[student].totalCommits;
                    avgTestsRan += this.fullCourse.students[student].totalTestsRan;
                    avgTestsPassed += this.fullCourse.students[student].totalTestsPassed;
                    avgDiagnosticErrors += this.fullCourse.students[student].totalDiagnosticErrors;
                    avgSlugs += this.fullCourse.students[student].slugs.length;
                    avgStyleOK += this.fullCourse.students[student].commitsStyleOK / this.fullCourse.students[student].totalCommits;
                    count++;
                }
                this.averageData = [
                    "Average",
                    avgCommits / count,
                    avgTestsRan / count,
                    avgTestsPassed / count,
                    avgDiagnosticErrors / count,
                    avgSlugs / count,
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

                for (var student in this.fullCourse.students) {
                    avgCommits.push(this.fullCourse.students[student].totalCommits);
                    avgTestsRan.push(this.fullCourse.students[student].totalTestsRan);
                    avgTestsPassed.push(this.fullCourse.students[student].totalTestsPassed);
                    avgDiagnosticErrors.push(this.fullCourse.students[student].totalDiagnosticErrors);
                    avgSlugs.push(this.fullCourse.students[student].slugs.length);
                    avgStyleOK.push(this.fullCourse.students[student].commitsStyleOK / this.fullCourse.students[student].totalCommits);
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