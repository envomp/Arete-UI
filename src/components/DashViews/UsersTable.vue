<template>
    <v-container
            fill-height
            fluid
            grid-list-xl
    >
        <v-layout
                justify-center
                wrap
        >
            <v-flex
                    md12
            >
                <div>
                    <material-card
                            color="general"
                            text="Such a classic table"
                            title="Usernames Table"
                    >
                        <v-spacer></v-spacer>
                        <v-text-field
                                append-icon="search"
                                hide-details
                                label="Search"
                                single-line
                                v-model="search">
                        </v-text-field>
                        <v-dialog
                                max-width="500px"
                                v-model="dialog">
                            <template v-slot:activator="{ on }">
                                <v-btn
                                        class="mb-2"
                                        color="general"
                                        dark
                                        v-on="on">New Item
                                </v-btn>
                            </template>

                            <v-card>
                                <v-card-text>
                                    <v-container grid-list-md>
                                        <v-layout wrap>
                                            <v-flex
                                                    md4
                                                    sm6
                                                    xs12>
                                                <v-text-field
                                                        label="Username"
                                                        v-model="editedItem.username"/>
                                            </v-flex>
                                            <v-flex
                                                    md4
                                                    sm6
                                                    xs12>
                                                <v-text-field
                                                        label="Password"
                                                        v-model="editedItem.password"/>
                                            </v-flex>
                                            <v-flex
                                                    md4
                                                    sm6
                                                    xs12>
                                                <v-text-field
                                                        label="Email"
                                                        v-model="editedItem.email"/>
                                            </v-flex>
                                            <v-flex
                                                    md4
                                                    sm6
                                                    xs12>
                                                <v-checkbox :label="`IsAdmin`" v-model="checkboxAdmin"></v-checkbox>

                                            </v-flex>
                                            <v-flex
                                                    md4
                                                    sm6
                                                    xs12>
                                                <v-checkbox :label="`IsActive`" v-model="checkboxActive"></v-checkbox>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer/>
                                    <v-btn
                                            @click="close"
                                            color="blue darken-1"
                                            flat>Cancel
                                    </v-btn>
                                    <v-btn
                                            @click="save"
                                            color="blue darken-1"
                                            flat>Save
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>

                        <v-data-table
                                :headers="headers"
                                :items="UserList"
                                :rows-per-page-items="rowsAmount"
                                :search="search"
                                class="elevation-1"
                        >
                            <!-- change table header background and text color(or other properties) -->
                            <template
                                    slot="headerCell"
                                    slot-scope="{ header }"
                            >
                <span
                        class="subheading font-weight-light text-general text--darken-3"
                        v-text="header.text"
                />
                            </template>
                            <template v-slot:items="props">
                                <td>{{ props.item.id }}</td>
                                <td class="justify-center ">
                                    <v-icon
                                            @click="editItem(props.item)"
                                            class="mr-2"
                                            medium>edit
                                    </v-icon>
                                    <v-icon
                                            @click="deleteItem(props.item)"
                                            medium>delete
                                    </v-icon>
                                </td>
                                <td>
                                    <v-edit-dialog
                                            :return-value.sync="props.item.username"
                                            @cancel="cancelInline"
                                            @close="closeInline"
                                            @open="openInline"
                                            @save="saveInline"
                                            large
                                            lazy
                                            persistent
                                    >
                                        <div>{{ props.item.username }}</div>
                                        <template v-slot:input>
                                            <v-text-field
                                                    :rules="[max25chars]"
                                                    autofocus
                                                    counter
                                                    label="Edit"
                                                    single-line
                                                    v-model="props.item.username"
                                            />
                                        </template>
                                    </v-edit-dialog>
                                </td>

                                <td>
                                    <v-edit-dialog
                                            :return-value.sync="props.item.email"
                                            @cancel="cancelInline"
                                            @close="closeInline"
                                            @open="openInline"
                                            @save="save"
                                            large
                                            lazy
                                            persistent
                                    >
                                        <div>{{ props.item.email }}</div>
                                        <template v-slot:input>
                                            <v-text-field
                                                    :rules="[max25chars]"
                                                    autofocus
                                                    counter
                                                    label="Edit"
                                                    single-line
                                                    v-model="props.item.email"
                                            />
                                        </template>
                                    </v-edit-dialog>
                                </td>
                                <td class="">{{ props.item.isAdmin }}</td>
                                <td class="">{{ props.item.isActive }}</td>
                                <td class="">{{ props.item.lastSeen }}</td>
                                <td v-show=false>{{ props.item.password }}</td>
                            </template>
                        </v-data-table>
                        <v-snackbar
                                :color="snackColor"
                                :timeout="3000"
                                v-model="snack">
                            {{ snackText }}
                            <v-btn
                                    @click="snack = false"
                                    flat>Close
                            </v-btn>
                        </v-snackbar>
                    </material-card>
                </div>
            </v-flex>


        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data: () => ({
            snack: false,
            snackColor: '',
            snackText: '',
            max25chars: v => v.length <= 25 || 'Input too long!',
            pagination: {},
            UserList: [],
            checkboxAdmin: true,
            checkboxActive: true,
            rowsAmount: [15, 20, 25, {"text": "$vuetify.dataIterator.rowsPerPageAll", "value": -1}],
            dialog: false,
            search: '',
            headers: [
                {text: 'Id', align: 'left', value: 'id'},
                {text: '-----Actions-----', value: 'actions', sortable: false},
                {text: 'username', value: 'username'},
                {text: 'email', value: 'email'},
                {text: 'isAdmin', value: 'isAdmin'},
                {text: 'isActive', value: 'isActive'},
                {text: 'lastSeen', value: 'lastSeen'},
                {text: 'password', value: 'password'},


            ],
            editedIndex: -1,
            editedItem: {
                username: '',
                password: '',
                email: '',
                isAdmin: true,
                isActive: true,
            },
            defaultItem: {}
        }),

        computed: {
            formTitle() {
                return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
            }
        },

        watch: {
            dialog(val) {
                val || this.close()
            }
        },
        // called when page is created before dom
        created() {
            this.getusernames()
            // this.$store.dispatch('autoRefreshToken')
            // .then(response => console.log(response))
            // .catch(error => console.log(error))
        },

        methods: {
            getusernames() {
                this.$http.get('/users')
                    .then(response => {
                        this.UserList = response.data.Users
                    })
                    .catch(error => console.log(error))
            },


            // object.assign fills in the empty object with the properties of item
            editItem(item, dbox = true) {
                this.editedIndex = this.UserList.indexOf(item)
                item.isAdmin = this.checkboxAdmin
                item.isActive = this.checkboxActive
                this.editedItem = Object.assign({}, item)
                this.dialog = dbox
            },

            callTableAction(item, endpoint, method) {
                let tableItem = this.editedItem
                this.$store.dispatch('updateTableItem', {endpoint, tableItem, method})
                    .then((response) => this.saveInline())
                    .catch(error => {
                        console.log(error)
                        this.cancelInline
                    })
            },

            deleteItem(item) {
                const index = this.UserList.indexOf(item)
                confirm('Are you sure you want to delete this item?') && this.UserList.splice(index, 1)
                this.editedItem = Object.assign({}, item)
                let endpoint = `users/delete/${this.editedItem.username}`
                let method = 'delete'
                this.callTableAction(item, endpoint, method);
            },

            close() {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },

            save() {
                if (this.editedIndex > -1) {
                    Object.assign(this.UserList[this.editedIndex], this.editedItem)
                    let tableItem = this.editedItem
                    let endpoint = `users/update/${this.editedItem.username}`
                    let method = 'patch'
                    this.$store.dispatch('updateTableItem', {endpoint, tableItem, method})
                        .then((response) => this.saveInline())
                        .catch(error => {
                            console.log(error)
                            this.cancelInline
                        })
                } else {
                    let tableItem = this.editedItem
                    this.UserList.push(this.editedItem)
                    let endpoint = `users/new-user`
                    let method = 'post'
                    this.$store.dispatch('updateTableItem', {endpoint, tableItem, method})
                        .then((response) => console.log('new user'))
                        .catch(error => {
                            console.log(error)
                            this.cancelInline
                        })

                }
                this.close()
            },
            //toasts/snackbar messages for actions
            saveInline() {
                this.snack = true
                this.snackColor = 'success'
                this.snackText = 'Data saved'
            },
            cancelInline() {
                this.snack = true
                this.snackColor = 'error'
                this.snackText = 'Canceled'
            },
            reset() {
                this.snack = true
                this.snackColor = 'success'
                this.snackText = 'Data reset to default'
            },
            openInline() {
                this.snack = true
                this.snackColor = 'info'
                this.snackText = 'Dialog opened'
            },
            closeInline() {
                console.log('Dialog closed')
            }
        }
    }
</script>

<style>
    table.v-table thead tr {
        color: red !important;
    }

    tbody tr:nth-of-type(odd) {
        background-color: rgba(0, 0, 0, .05);
    }
</style>
