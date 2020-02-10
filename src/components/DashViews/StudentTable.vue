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
                <tr @click="props.expanded = !props.expanded, getStudent(props.item.id)">
                    <td>{{ props.item.id }}</td>
                    <td>{{ props.item.uniid }}</td>
                    <td>{{ props.item.lastTested }}</td>
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
                            <v-window>

                                <v-card flat id="fullStudentCourse">
                                    <div v-html="fullStudent"></div>
                                </v-card>

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
                {text: 'commitsStyleOK', value: 'commitsStyleOK'},
            ],
        }),

        computed: {
            ...mapState('app', ['color']),
        },

        // called when page is created before dom
        created() {
            this.getStudents();
        },

        methods: {
            getStudent(id) {
                this.$http.get('/student/' + id)
                    .then(response => {
                        this.fullStudent = response.data;
                    })
                    .catch(error => console.log(error))
            },

            getStudents() {
                this.$http.get('/students')
                    .then(response => {
                        this.studentsList = response.data
                    })
                    .catch(error => console.log(error))
            },

        }
    }
</script>

<style scoped>


</style>