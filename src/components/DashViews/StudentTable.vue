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
                :headers="headers"
                :items="studentsList"
                :rows-per-page-items="rowsAmount"
                :search="search"
                class="elevation-1"
                v-if="!isMobile">

            <template
                    slot="headerCell"
                    slot-scope="{ header }">
                <span
                        v-bind:class="'subheading font-weight-light text-' + color"
                        v-text="header.text"/>
            </template>

            <template v-slot:items="props">
                <tr @click="() => {{!props.expanded ? getStudent(props.item) : null ; props.expanded = !props.expanded}}">
                    <td>{{ props.item.id }}</td>
                    <td>{{ props.item.uniid }}</td>
                    <td>{{ props.item.totalCommits }}</td>
                    <td>{{ props.item.totalTestsRan }}</td>
                    <td>{{ props.item.totalTestsPassed }}</td>
                    <td>{{ props.item.totalDiagnosticErrors }}</td>
                    <td>{{ props.item.differentSlugs }}</td>
                    <td>{{ props.item.differentCourses }}</td>
                    <td>{{ props.item.commitsStyleOK }}</td>
                    <td>{{ props.item.averageGrade }}</td>
                    <td>{{ props.item.medianGrade }}</td>
                </tr>
            </template>

            <v-spacer></v-spacer>

            <template v-slot:expand="props">

                <v-container fluid grid-list-xl ma-0 pa-4>

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
                                                    :chart-data="timestampsChart.chartData"
                                                    :chart-id="'timestamp-bar-chartDashboard'"
                                                    :extra-options="timestampsChart.extraOptions"
                                                    :key="'timestampsChartDashboard'"
                                                    style="height: 400px">
                                            </line-chart>
                                        </div>
                                    </v-window>
                                </material-card>

                                <v-progress-linear :color="color" :indeterminate="true" v-else></v-progress-linear>

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
                                            <bar-chart :chart-data="diagnosticErrorChart.chartData"
                                                       :extra-options="diagnosticErrorChart.extraOptions"
                                                       :gradient-stops="diagnosticErrorChart.gradientStops"
                                                       chart-id="blue-bar-chart"
                                                       style="height: 100%">
                                            </bar-chart>
                                        </div>
                                    </v-window>
                                </material-card>

                                <v-progress-linear :color="color" :indeterminate="true" v-else></v-progress-linear>

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
                                            <bar-chart :chart-data="codeErrorChart.chartData"
                                                       :extra-options="codeErrorChart.extraOptions"
                                                       :gradient-stops="codeErrorChart.gradientStops"
                                                       chart-id="blue-bar-chart"
                                                       style="height: 100%">
                                            </bar-chart>
                                        </div>
                                    </v-window>
                                </material-card>

                                <v-progress-linear :color="color" :indeterminate="true" v-else></v-progress-linear>

                            </v-flex>

                            <v-flex
                                    lg12
                                    md12
                                    sm12
                                    xs12>
                                <v-data-table

                                        :headers="comparableHeaders"
                                        :hide-actions="true"
                                        :items="[studentData, averageData, medianData]"
                                        class="elevation-1"

                                >
                                    <template
                                            slot="headerCell"
                                            slot-scope="{ header }"
                                            v-if="!isMobile"
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

                    <v-progress-linear :color="color" :indeterminate="true" v-else></v-progress-linear>

                </v-container>

            </template>
        </v-data-table>

        <v-data-iterator
                :color="color"
                :items="studentsList"
                :pagination.sync="pagination"
                :rows-per-page-items="rowsPerPageItems"
                :search="search"
                item-key="uniid"
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
                            <h4>{{ props.item.uniid }}</h4>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-list dense v-if="props.expanded">
                            <v-list-tile>
                                <v-list-tile-content>id:</v-list-tile-content>
                                <v-list-tile-content class="align-end">{{ props.item.id }}</v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile>
                                <v-list-tile-content>uniid:</v-list-tile-content>
                                <v-list-tile-content class="align-end">{{ props.item.uniid }}</v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile>
                                <v-list-tile-content>lastTested:</v-list-tile-content>
                                <v-list-tile-content class="align-end">{{ props.item.lastTested }}
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
                                <v-list-tile-content>differentCourses:</v-list-tile-content>
                                <v-list-tile-content class="align-end">{{ props.item.differentCourses }}
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile>
                                <v-list-tile-content>differentSlugs:</v-list-tile-content>
                                <v-list-tile-content class="align-end">{{ props.item.differentSlugs }}
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile>
                                <v-list-tile-content>commitsStyleOK:</v-list-tile-content>
                                <v-list-tile-content class="align-end">{{ props.item.commitsStyleOK }}
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile>
                                <v-list-tile-content>averageGrade:</v-list-tile-content>
                                <v-list-tile-content class="align-end">{{ props.item.averageGrade }}
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile>
                                <v-list-tile-content>medianGrade:</v-list-tile-content>
                                <v-list-tile-content class="align-end">{{ props.item.medianGrade }}
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

            timestampsChart: {
                extraOptions: chartConfigs.lineChartOptions,
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

            codeErrorChart: {
                extraOptions: chartConfigs.invertedBarChartOptions,
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

            diagnosticErrorChart: {
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

            studentsList: [],
            fullStudent: [],

            rowsPerPageItems: [4, 8, 12, 24],
            pagination: {
                rowsPerPage: 8
            },

            rowsAmount: [15, 20, 25, {"text": "$vuetify.dataIterator.rowsPerPageAll", "value": -1}],
            search: '',
            headers: [
                {text: 'id', align: 'left', value: 'id'},
                {text: 'uniid', value: 'uniid'},
                {text: 'totalCommits', value: 'totalCommits'},
                {text: 'totalTestsRan', value: 'totalTestsRan'},
                {text: 'totalTestsPassed', value: 'totalTestsPassed'},
                {text: 'totalDiagnosticErrors', value: 'totalDiagnosticErrors'},
                {text: 'differentSlugs', value: 'differentSlugs'},
                {text: 'differentCourses', value: 'differentCourses'},
                {text: 'commitsStyleOK', value: 'commitsStyleOK'},
                {text: 'averageGrade', value: 'averageGrade'},
                {text: 'medianGrade', value: 'medianGrade'},
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

        computed: {
            ...mapState('app', ['color', 'isMobile']),
        },

        // called when page is created before dom
        created() {
            this.getStudents();
        },

        methods: {

            convert(t) {
                const dt = new Date(t);
                const hr = dt.getUTCHours();
                const m = dt.getUTCMinutes() > 30 ? '30' : '00';

                return hr + ':' + m.substr(-2)
            },

            generateDiagnosticErrorChart() {
                let diagnosticHeaders = [];
                let diagnosticList = [];

                for (let i = 0; i < this.fullStudent.diagnosticCodeErrors.length; i++) {

                    diagnosticHeaders.push(this.fullStudent.diagnosticCodeErrors[i].errorType);
                    diagnosticList.push(this.fullStudent.diagnosticCodeErrors[i].repetitions);

                }

                this.diagnosticErrorChart.chartData.labels = diagnosticHeaders;
                this.diagnosticErrorChart.chartData.datasets[0].data = diagnosticList;
            },

            generateErrorChart() {
                let testCodeHeaders = [];
                let testCodeList = [];

                for (let i = 0; i < this.fullStudent.testCodeErrors.length; i++) {

                    testCodeHeaders.push(this.fullStudent.testCodeErrors[i].errorType);
                    testCodeList.push(this.fullStudent.testCodeErrors[i].repetitions);

                }

                this.codeErrorChart.chartData.labels = testCodeHeaders;
                this.codeErrorChart.chartData.datasets[0].data = testCodeList;
            },

            generateTimestampChartData() {
                let timestamps = {};
                let timestampList = [];

                for (let i = 0; i < this.fullStudent.timestamps.length; i++) {

                    const timeString = this.convert(this.fullStudent.timestamps[i]);
                    if (timestamps[timeString]) {
                        timestamps[timeString] += 1;
                    } else {
                        timestamps[timeString] = 1;
                    }
                }

                for (let i = 0; i < this.timestampsChart.chartData.labels.length; i++) {
                    if (timestamps[this.timestampsChart.chartData.labels[i]]) {
                        timestampList.push(timestamps[this.timestampsChart.chartData.labels[i]]);
                    } else {
                        timestampList.push(0);
                    }

                }
                this.timestampsChart.chartData.datasets[0].data = timestampList;
            },

            getStudent(student) {
                this.isTimelineComplete = false;
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
                        ];

                        this.generateTimestampChartData();
                        this.generateDiagnosticErrorChart();
                        this.generateErrorChart();

                        this.isTimelineComplete = true;
                    })
                    .catch(error => console.log(error))
            },

            getStudents() {
                this.$http.get('/students')
                    .then(response => {
                        this.studentsList = response.data;
                        this.studentsList.map(x => x.averageGrade = Math.round(x.averageGrade * 100) / 100);
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