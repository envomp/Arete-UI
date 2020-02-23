<template>
    <v-container
            fluid
            grid-list-xl
    >
        <v-layout wrap>

            <v-flex
                    lg3
                    md6
                    sm6
                    xs12
            >
                <material-stats-card
                        color="green"
                        icon="mdi-store"
                        sub-icon="mdi-calendar"
                        sub-text="Last 24 Hours"
                        title="Revenue"
                        value="$34,245"
                />
            </v-flex>

            <!--            Used Space-->
            <v-flex
                    lg3
                    md6
                    sm6
                    xs12
            >
                <material-stats-card
                        color="orange"
                        icon="mdi-content-copy"
                        small-value="GB"
                        sub-icon="mdi-alert"
                        sub-icon-color="error"
                        sub-text="Get More Space..."
                        sub-text-color="text-primary"
                        title="Used Space"
                        value="49/50"
                />
            </v-flex>

            <!--            Fixed issues-->
            <v-flex
                    lg3
                    md6
                    sm6
                    xs12
            >
                <material-stats-card
                        color="red"
                        icon="mdi-information-outline"
                        sub-icon="mdi-tag"
                        sub-text="Tracked from Github"
                        title="Fixed Issues"
                        value="75"
                />
            </v-flex>

            <!--            Followers-->
            <v-flex
                    lg3
                    md6
                    sm6
                    xs12
            >
                <material-stats-card
                        color="info"
                        icon="mdi-twitter"
                        sub-icon="mdi-update"
                        sub-text="Just Updated"
                        title="Followers"
                        value="+245"
                />
            </v-flex>


            <v-flex
                    lg3
                    md6
                    sm6
                    xs12
            >
                <v-window type="chart">
                    <template slot="header">
                        <div class="row">
                            <div class="col-sm-6">
                                <h5 class="card-category">{{$t('dashboard.totalShipments')}}</h5>
                                <h2 class="card-title">{{$t('dashboard.performance')}}</h2>
                            </div>
                            <div class="col-sm-6">
                                <div
                                        class="btn-group btn-group-toggle"
                                        data-toggle="buttons">
                                    <label :class="{active: bigLineChart.activeIndex === index}"
                                           :id="index"
                                           class="btn btn-sm btn-primary btn-simple"
                                           v-for="(option, index) in bigLineChartCategories">
                                        <input :checked="bigLineChart.activeIndex === index"
                                               @click="initBigChart(index)"
                                               autocomplete="off" name="options"
                                               type="radio">
                                        {{option}}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </template>
                    <div class="chart-area">
                        <line-chart :chart-data="bigLineChart.chartData"
                                    :extra-options="bigLineChart.extraOptions"
                                    :gradient-colors="bigLineChart.gradientColors"
                                    :gradient-stops="bigLineChart.gradientStops"
                                    chart-id="big-line-chart"
                                    ref="bigChart"
                                    style="height: 100%">
                        </line-chart>
                    </div>
                </v-window>
            </v-flex>

            <v-flex
                    lg3
                    md6
                    sm6
                    xs12
            >
                <v-window type="chart">
                    <template slot="header">
                        <h5 class="card-category">{{$t('dashboard.totalShipments')}}</h5>
                        <h3 class="card-title"><i class="tim-icons icon-bell-55 text-primary "></i> 763,215</h3>
                    </template>
                    <div class="chart-area">
                        <line-chart :chart-data="purpleLineChart.chartData"
                                    :extra-options="purpleLineChart.extraOptions"
                                    :gradient-colors="purpleLineChart.gradientColors"
                                    :gradient-stops="purpleLineChart.gradientStops"
                                    chart-id="purple-line-chart"
                                    style="height: 100%">
                        </line-chart>
                    </div>
                </v-window>
            </v-flex>

            <v-flex
                    lg3
                    md6
                    sm6
                    xs12
            >
                <v-window type="chart">
                    <template slot="header">
                        <h5 class="card-category">{{$t('dashboard.dailySales')}}</h5>
                        <h3 class="card-title"><i class="tim-icons icon-delivery-fast text-info "></i> 3,500€</h3>
                    </template>
                    <div class="chart-area">
                        <bar-chart :chart-data="blueBarChart.chartData"
                                   :extra-options="blueBarChart.extraOptions"
                                   :gradient-stops="blueBarChart.gradientStops"
                                   chart-id="blue-bar-chart"
                                   style="height: 100%">
                        </bar-chart>
                    </div>
                </v-window>
            </v-flex>

            <v-flex
                    lg3
                    md6
                    sm6
                    xs12
            >
                <v-window type="chart">
                    <template slot="header">
                        <h5 class="card-category">{{$t('dashboard.completedTasks')}}</h5>
                        <h3 class="card-title"><i class="tim-icons icon-send text-success "></i> 12,100K</h3>
                    </template>
                    <div class="chart-area">
                        <line-chart :chart-data="greenLineChart.chartData"
                                    :extra-options="greenLineChart.extraOptions"
                                    :gradient-stops="greenLineChart.gradientStops"
                                    chart-id="green-line-chart"
                                    style="height: 100%">
                        </line-chart>
                    </div>
                </v-window>
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

    export default {
        components: {
            LineChart,
            BarChart,
            GraphStyle
        },
        name: 'Dashboard',
        data() {
            return {

                dailySalesChart: {
                    data: {

                        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
                        series: [
                            [12, 17, 7, 17, 23, 18, 38]
                        ],
                    },
                    options: {
                        lineSmooth: this.$chartist.Interpolation.cardinal({
                            tension: 0
                        }),
                        low: 0,
                        high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
                        chartPadding: {
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0
                        }
                    }
                },
                dataCompletedTasksChart: {
                    data: {
                        labels: ['12am', '3pm', '6pm', '9pm', '12pm', '3am', '6am', '9am'],
                        series: [
                            [230, 750, 450, 300, 280, 240, 200, 190]
                        ]
                    },
                    options: {
                        lineSmooth: this.$chartist.Interpolation.cardinal({
                            tension: 0
                        }),
                        low: 0,
                        high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
                        chartPadding: {
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0
                        }
                    }
                },
                emailsSubscriptionChart: {
                    data: {
                        labels: ['Ja', 'Fe', 'Ma', 'Ap', 'Mai', 'Ju', 'Jul', 'Au', 'Se', 'Oc', 'No', 'De'],
                        series: [
                            [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

                        ]
                    },
                    options: {
                        axisX: {
                            showGrid: false
                        },
                        low: 0,
                        high: 1000,
                        chartPadding: {
                            top: 0,
                            right: 5,
                            bottom: 0,
                            left: 0
                        }
                    },
                    responsiveOptions: [
                        ['screen and (max-width: 768x)', {
                            seriesBarDistance: 5,
                            axisX: {
                                labelInterpolationFnc: function (value) {
                                    return value[0]
                                }
                            }
                        }]
                    ]
                },

                bigLineChart: {
                    allData: [
                        [100, 70, 90, 70, 85, 60, 75, 60, 90, 80, 110, 100],
                        [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120],
                        [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130]
                    ],
                    activeIndex: 0,
                    chartData: null,
                    extraOptions: chartConfigs.purpleChartOptions,
                    gradientColors: GraphStyle.primaryGradient,
                    gradientStops: [1, 0.4, 0],
                    categories: []
                },
                purpleLineChart: {
                    extraOptions: chartConfigs.purpleChartOptions,
                    chartData: {
                        labels: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
                        datasets: [{
                            label: "Data",
                            fill: true,
                            borderColor: GraphStyle.primary,
                            borderWidth: 2,
                            borderDash: [],
                            borderDashOffset: 0.0,
                            pointBackgroundColor: GraphStyle.primary,
                            pointBorderColor: 'rgba(255,255,255,0)',
                            pointHoverBackgroundColor: GraphStyle.primary,
                            pointBorderWidth: 20,
                            pointHoverRadius: 4,
                            pointHoverBorderWidth: 15,
                            pointRadius: 4,
                            data: [80, 100, 70, 80, 120, 80],
                        }]
                    },
                    gradientColors: GraphStyle.primaryGradient,
                    gradientStops: [1, 0.2, 0],
                },
                greenLineChart: {
                    extraOptions: chartConfigs.greenChartOptions,
                    chartData: {
                        labels: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV'],
                        datasets: [{
                            label: "My First dataset",
                            fill: true,
                            borderColor: GraphStyle.danger,
                            borderWidth: 2,
                            borderDash: [],
                            borderDashOffset: 0.0,
                            pointBackgroundColor: GraphStyle.danger,
                            pointBorderColor: 'rgba(255,255,255,0)',
                            pointHoverBackgroundColor: GraphStyle.danger,
                            pointBorderWidth: 20,
                            pointHoverRadius: 4,
                            pointHoverBorderWidth: 15,
                            pointRadius: 4,
                            data: [90, 27, 60, 12, 80],
                        }]
                    },
                    gradientColors: ['rgba(66,134,121,0.15)', 'rgba(66,134,121,0.0)', 'rgba(66,134,121,0)'],
                    gradientStops: [1, 0.4, 0],
                },
                blueBarChart: {
                    extraOptions: chartConfigs.barChartOptions,
                    chartData: {
                        labels: ['USA', 'GER', 'AUS', 'UK', 'RO', 'BR'],
                        datasets: [{
                            label: "Countries",
                            fill: true,
                            borderColor: GraphStyle.info,
                            borderWidth: 2,
                            borderDash: [],
                            borderDashOffset: 0.0,
                            data: [53, 20, 10, 80, 100, 45],
                        }]
                    },
                    gradientColors: GraphStyle.primaryGradient,
                    gradientStops: [1, 0.4, 0],
                },

                logs: "",
                testerLogs: "",
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
            this.getLogs();
            this.getTesterLogs();
            this.getState();
            this.getTesterState();
        },

        methods: {

            initBigChart(index) {
                let chartData = {
                    datasets: [{
                        fill: true,
                        borderColor: GraphStyle.primary,
                        borderWidth: 2,
                        borderDash: [],
                        borderDashOffset: 0.0,
                        pointBackgroundColor: GraphStyle.primary,
                        pointBorderColor: 'rgba(255,255,255,0)',
                        pointHoverBackgroundColor: GraphStyle.primary,
                        pointBorderWidth: 20,
                        pointHoverRadius: 4,
                        pointHoverBorderWidth: 15,
                        pointRadius: 4,
                        data: this.bigLineChart.allData[index]
                    }],
                    labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
                };
                this.$refs.bigChart.updateGradients(chartData);
                this.bigLineChart.chartData = chartData;
                this.bigLineChart.activeIndex = index;
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

        mounted() {
            this.initBigChart(0);
        }
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