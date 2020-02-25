<template>
    <v-container
            fluid
            grid-list-xl
    >
        <v-layout wrap>

            <v-flex
                    lg6
                    md12
                    sm12
                    xs12
            >
                <material-card
                        :color="color"
                        title="Submission activity (last 500 jobs)"
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
                    lg3
                    md6
                    sm6
                    xs12
            >
                <material-card
                        :color="color"
                        title="Course activity (last 500 jobs)"
                        v-if="isTimelineComplete"
                >
                    <v-window type="chart">
                        <div class="chart-area">
                            <bar-chart :chart-data="courseFrequencyChart.chartData"
                                       :extra-options="courseFrequencyChart.extraOptions"
                                       :gradient-stops="courseFrequencyChart.gradientStops"
                                       chart-id="blue-bar-chart"
                                       style="height: 100%">
                            </bar-chart>
                        </div>
                    </v-window>
                </material-card>


                <v-progress-linear :color="color" :indeterminate="true" v-else></v-progress-linear>

            </v-flex>

            <v-flex
                    lg3
                    md6
                    sm6
                    xs12
            >
                <material-card
                        :color="color"
                        title="Exercise activity (last 500 jobs)"
                        v-if="isTimelineComplete"
                >
                    <v-window type="chart">
                        <div class="chart-area">
                            <bar-chart :chart-data="slugFrequencyChart.chartData"
                                       :extra-options="slugFrequencyChart.extraOptions"
                                       :gradient-stops="slugFrequencyChart.gradientStops"
                                       chart-id="blue-bar-chart"
                                       style="height: 100%">
                            </bar-chart>
                        </div>
                    </v-window>
                </material-card>

                <v-progress-linear :color="color" :indeterminate="true" v-else></v-progress-linear>

            </v-flex>

            <v-spacer></v-spacer>

            <v-flex
                    lg3
                    md6
                    sm6
                    xs12
            >
                <material-stats-card
                        :color="color"
                        :value="testerState.systemCpuLoad ? testerState.systemCpuLoad.toFixed(2).toString() : '0'"
                        icon="mdi-clock-fast"
                        sub-icon="mdi-alert"
                        sub-text="Critical status"
                        title="Tester CPU usage"
                        v-if="testerState.systemCpuLoad > 0.8"
                />
                <material-stats-card
                        :color="color"
                        :value="testerState.systemCpuLoad ? testerState.systemCpuLoad.toFixed(2).toString() : '0'"
                        icon="mdi-clock-fast"
                        sub-icon="mdi-check"
                        sub-text="Normal status"
                        title="Tester CPU usage (%)"
                        v-else
                />

            </v-flex>

            <v-flex
                    lg3
                    md6
                    sm6
                    xs12
            >
                <material-stats-card
                        :color="color"
                        :value="state.systemCpuLoad ? state.systemCpuLoad.toFixed(2).toString() : '0'"
                        icon="mdi-clock"
                        sub-icon="mdi-alert"
                        sub-text="Critical status"
                        title="Backend CPU usage (%)"
                        v-if="state.systemCpuLoad > 0.8"
                />
                <material-stats-card
                        :color="color"
                        :value="state.systemCpuLoad ? state.systemCpuLoad.toFixed(2).toString() : '0'"
                        icon="mdi-clock"
                        sub-icon="mdi-check"
                        sub-text="Normal status"
                        title="Backend CPU usage (%)"
                        v-else
                />
            </v-flex>

            <v-flex
                    lg3
                    md6
                    sm6
                    xs12
            >
                <material-stats-card
                        :color="color"
                        :value="testerState.systemDiskSpaceUsed && testerState.systemDiskSpaceTotal ? (testerState.systemDiskSpaceUsed / (1024 ** 3)).toFixed(2).toString() + '/' + (testerState.systemDiskSpaceTotal / (1024 ** 3)).toFixed(2).toString() + ' GB' : '0'"
                        icon="mdi-folder-multiple-outline"
                        sub-icon="mdi-alert"
                        sub-text="Critical status"
                        title="Tester Disk Space"
                        v-if="testerState.systemDiskSpaceUsed / testerState.systemDiskSpaceTotal > 0.8"
                />
                <material-stats-card
                        :color="color"
                        :value="testerState.systemDiskSpaceUsed && testerState.systemDiskSpaceTotal ? (testerState.systemDiskSpaceUsed / (1024 ** 3)).toFixed(2).toString() + '/' + (testerState.systemDiskSpaceTotal / (1024 ** 3)).toFixed(2).toString() + ' GB' : '0'"
                        icon="mdi-folder-multiple-outline"
                        sub-icon="mdi-check"
                        sub-text="Normal status"
                        title="Tester Disk Space"
                        v-else
                />
            </v-flex>

            <v-flex
                    lg3
                    md6
                    sm6
                    xs12
            >
                <material-stats-card
                        :color="color"
                        :value="state.systemDiskSpaceUsed && state.systemDiskSpaceTotal ? (state.systemDiskSpaceUsed / (1024 ** 3)).toFixed(2).toString() + '/' + (state.systemDiskSpaceTotal / (1024 ** 3)).toFixed(2).toString() + ' GB' : '0'"
                        icon="mdi-folder-multiple"
                        sub-icon="mdi-alert"
                        sub-text="Critical status"
                        title="Backend Disk Space"
                        v-if="state.systemDiskSpaceUsed / state.systemDiskSpaceTotal > 0.8"
                />
                <material-stats-card
                        :color="color"
                        :value="state.systemDiskSpaceUsed && state.systemDiskSpaceTotal ? (state.systemDiskSpaceUsed / (1024 ** 3)).toFixed(2).toString() + '/' + (state.systemDiskSpaceTotal / (1024 ** 3)).toFixed(2).toString() + ' GB' : '0'"
                        icon="mdi-folder-multiple"
                        sub-icon="mdi-check"
                        sub-text="Normal status"
                        title="Backend Disk Space"
                        v-else
                />
            </v-flex>

        </v-layout>

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
        name: 'Dashboard',
        data() {
            return {

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

                slugFrequencyChart: {
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

                courseFrequencyChart: {
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

                logs: "",
                testerLogs: "",

                isTimelineComplete: false,

                SubmissionList: [],
                state: {},
                testerState: {},
            }
        },

        computed: {
            ...mapState('app', ['color']),

            bigLineChartCategories() {
                return this.$t('dashboard.chartCategories');
            }
        },

        watch: {
            dialog(val) {
                val || this.close()
            }
        },
        // called when page is created before dom
        created() {
            this.isTimelineComplete = false;
            this.getState();
            this.getTesterState();
            this.getLogs();
            this.getTesterLogs();

            this.getSubmissions();
        },

        methods: {

            getSubmissions() {
                this.$http.get('/submissions')
                    .then(response => {
                        response.data.reverse();
                        this.SubmissionList = response.data.filter((thing, index, self) =>
                            index === self.findIndex((t) => (
                                t.hash === thing.hash && t.name === thing.name
                            ))
                        );
                        this.generateTimestampChartData();
                        this.isTimelineComplete = true;

                    })
                    .catch(error => console.log(error))
            },

            convert(t) {
                const dt = new Date(t);
                const hr = dt.getUTCHours();
                const m = dt.getUTCMinutes() > 30 ? '30' : '00';

                return hr + ':' + m.substr(-2)
            },

            generateTimestampChartData() {
                let timestamps = {};
                let timestampList = [];

                let courses = {};
                let courseHeaders = [];
                let courseList = [];

                let slugs = {};
                let slugHeaders = [];
                let slugList = [];

                for (let i = 0; i < this.SubmissionList.length; i++) {

                    const timeString = this.convert(this.SubmissionList[i].timestamp);
                    if (timestamps[timeString]) {
                        timestamps[timeString] += 1;
                    } else {
                        timestamps[timeString] = 1;
                    }

                    if (courses[this.SubmissionList[i].root]) {
                        courses[this.SubmissionList[i].root] += 1;
                    } else {
                        courseHeaders.push(this.SubmissionList[i].root);
                        courses[this.SubmissionList[i].root] = 1;
                    }

                    if (slugs[this.SubmissionList[i].slug]) {
                        slugs[this.SubmissionList[i].slug] += 1;
                    } else {
                        slugHeaders.push(this.SubmissionList[i].slug);
                        slugs[this.SubmissionList[i].slug] = 1;
                    }

                }

                for (let i = 0; i < courseHeaders.length; i++) {
                    courseList.push(courses[courseHeaders[i]])
                }

                for (let i = 0; i < slugHeaders.length; i++) {
                    slugList.push(slugs[slugHeaders[i]])
                }

                for (let i = 0; i < this.timestampsChart.chartData.labels.length; i++) {
                    if (timestamps[this.timestampsChart.chartData.labels[i]]) {
                        timestampList.push(timestamps[this.timestampsChart.chartData.labels[i]]);
                    } else {
                        timestampList.push(0);
                    }

                }


                this.courseFrequencyChart.chartData.labels = courseHeaders;
                this.courseFrequencyChart.chartData.datasets[0].data = courseList;

                this.slugFrequencyChart.chartData.labels = slugHeaders;
                this.slugFrequencyChart.chartData.datasets[0].data = slugList;

                this.timestampsChart.chartData.datasets[0].data = timestampList;
            },

            getLogs() {
                this.$http.get('/logs')
                    .then(response => {
                        this.logs = response.data;
                    })
                    .catch(error => console.log(error))
            },

            getTesterLogs() {
                this.$http.get('/logs/tester')
                    .then(response => {
                        this.testerLogs = response.data;
                    })
                    .catch(error => console.log(error))
            },

            getState() {
                this.$http.get('/state')
                    .then(response => {
                        this.state = response.data;
                    })
                    .catch(error => console.log(error))
            },

            getTesterState() {
                this.$http.get('/state/tester')
                    .then(response => {
                        this.testerState = response.data;
                    })
                    .catch(error => console.log(error))
            }
        },

    }

</script>

<style scoped>
    table.v-table thead tr {
        color: red !important;
    }

    tbody tr:nth-of-type(odd) {
        background-color: rgba(0, 0, 0, .05);
    }

</style>