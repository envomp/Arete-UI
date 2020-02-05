<template>
    <v-container
            fluid
            grid-list-xl
    >
        <v-layout wrap>

            <!--            Graph 1-->
            <v-flex
                    lg4
                    md12
                    sm12
            >
                <material-chart-card
                        :data="dailySalesChart.data"
                        :options="dailySalesChart.options"
                        color="warning"
                        type="Line"
                >
                    <h4 class="title font-weight-light">Daily StackOverflow Visits</h4>
                    <p class="category d-inline-flex font-weight-light">
                        <v-icon
                                color="green"
                                small
                        >
                            mdi-arrow-up
                        </v-icon>
                        <span class="green--text">55%</span>&nbsp;
                        increase in today's visits
                    </p>

                    <template slot="actions">
                        <v-icon
                                class="mr-2"
                                small
                        >
                            mdi-clock-outline
                        </v-icon>
                        <span class="caption grey-lighten-1--text font-weight-light">updated 4 minutes ago</span>
                    </template>
                </material-chart-card>
            </v-flex>

            <!--            Graph 2-->
            <v-flex
                    lg4
                    md12
                    sm12
            >

                <material-chart-card
                        :data="emailsSubscriptionChart.data"
                        :options="emailsSubscriptionChart.options"
                        :responsive-options="emailsSubscriptionChart.responsiveOptions"
                        color="red"
                        type="Bar"
                >
                    <h4 class="title font-weight-light">Emails telling you your code sucks</h4>
                    <p class="category d-inline-flex font-weight-light">Last Campaign Performance</p>

                    <template slot="actions">
                        <v-icon
                                class="mr-2"
                                small
                        >
                            mdi-clock-outline
                        </v-icon>
                        <span class="caption blue-grey--text font-weight-light">updated 10 minutes ago</span>
                    </template>
                </material-chart-card>


            </v-flex>

            <!--            Graph 3-->
            <v-flex
                    lg4
                    md12
                    sm12
            >
                <material-chart-card
                        :data="dataCompletedTasksChart.data"
                        :options="dataCompletedTasksChart.options"
                        color="indigo"
                        type="Line"
                >
                    <h3 class="title font-weight-light">Completed Tasks</h3>
                    <p class="category d-inline-flex font-weight-light">Last Last Campaign Performance</p>

                    <template slot="actions">
                        <v-icon
                                class="mr-2"
                                small
                        >
                            mdi-clock-outline
                        </v-icon>
                        <span class="caption grey--text font-weight-light">campaign sent 26 minutes ago</span>
                    </template>
                </material-chart-card>
            </v-flex>

            <!--            Revenue-->
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

        </v-layout>

        <br><br><br><br>
    </v-container>


</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: 'Dashboard',
        data() {
            return {
                dailySalesChart: {
                    data: {
                        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
                        series: [
                            [12, 17, 7, 17, 23, 18, 38]
                        ]
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
            }
        },

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
            this.getGraphData();
        },

        methods: {
            getGraphData(hash) {
                this.$http.get('/submission/' + hash)
                    .then(response => {
                        this.fullSubmission = response.data;
                    })
                    .catch(error => console.log(error))
            }

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