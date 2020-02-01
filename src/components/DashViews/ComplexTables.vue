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
                            title="CRUD Table"

                    >
                        <v-dialog max-width="500px" v-model="dialog">
                            <template v-slot:activator="{ on }">
                                <v-btn class="mb-2" color="general" dark v-on="on">New Item</v-btn>
                            </template>
                            <v-card>
                                <v-card-text>
                                    <v-container grid-list-md>
                                        <v-layout wrap>
                                            <v-flex md4 sm6 xs12>
                                                <v-text-field label="Dessert name"
                                                              v-model="editedItem.name"></v-text-field>
                                            </v-flex>
                                            <v-flex md4 sm6 xs12>
                                                <v-text-field label="Calories"
                                                              v-model="editedItem.calories"></v-text-field>
                                            </v-flex>
                                            <v-flex md4 sm6 xs12>
                                                <v-text-field label="Fat (g)" v-model="editedItem.fat"></v-text-field>
                                            </v-flex>
                                            <v-flex md4 sm6 xs12>
                                                <v-text-field label="Carbs (g)"
                                                              v-model="editedItem.carbs"></v-text-field>
                                            </v-flex>
                                            <v-flex md4 sm6 xs12>
                                                <v-text-field label="Protein (g)"
                                                              v-model="editedItem.protein"></v-text-field>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn @click="close" color="blue darken-1" flat>Cancel</v-btn>
                                    <v-btn @click="save" color="blue darken-1" flat>Save</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>

                        <v-data-table
                                :headers="headers"
                                :items="desserts"
                                class="elevation-1"

                        >
                            <!-- change table header color(or other properties) -->
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
                                <td>{{ props.item.name }}</td>
                                <td class="">{{ props.item.calories }}</td>
                                <td class="">{{ props.item.fat }}</td>
                                <td class="">{{ props.item.carbs }}</td>
                                <td class="">{{ props.item.protein }}</td>
                                <td class="justify-center ">
                                    <v-icon
                                            @click="editItem(props.item)"
                                            class="mr-2"
                                            medium
                                    >
                                        edit
                                    </v-icon>
                                    <v-icon
                                            @click="deleteItem(props.item)"
                                            medium
                                    >
                                        restore
                                    </v-icon>
                                    <v-icon
                                            @click="deleteItem(props.item)"
                                            medium
                                    >
                                        delete
                                    </v-icon>
                                </td>
                            </template>
                            <template v-slot:no-data>
                                <v-btn @click="initialize" color="primary">Reset</v-btn>
                            </template>
                        </v-data-table>
                    </material-card>
                </div>
            </v-flex>

            <!-- inline edit table -->
            <v-flex md12>
                <div>
                    <material-card
                            color="general"
                            text="Such a classic table pt.2: revenge of the crud"
                            title="Inline Edit Table(Fat & Protein)"

                    >

                        <v-data-table
                                :headers="headers"
                                :items="desserts"
                                class="elevation-1"
                        >
                            <!-- change table header color(or other properties) -->
                            <template
                                    slot="headerCell"
                                    slot-scope="{ header }"
                            >
                <span
                        class="subheading font-weight-light text-general text--darken-3"
                        v-text="header.text"
                />
                            </template>
                            <!-- inline editing data table -->
                            <template v-slot:items="props">
                                <td>
                                    <v-edit-dialog
                                            :return-value.sync="props.item.name"
                                            @cancel="cancel"
                                            @close="close"
                                            @open="open"
                                            @save="save"
                                            lazy
                                    > {{ props.item.name }}
                                        <template v-slot:input>
                                            <v-text-field
                                                    :rules="[max25chars]"
                                                    counter
                                                    label="Edit"
                                                    single-line
                                                    v-model="props.item.name"
                                            ></v-text-field>
                                        </template>
                                    </v-edit-dialog>
                                </td>
                                <td class="t">{{ props.item.calories }}</td>
                                <td class="text-xs-right">
                                    <v-edit-dialog
                                            :return-value.sync="props.item.fat"
                                            @cancel="cancelInline"
                                            @close="closeInline"
                                            @open="openInline"
                                            @save="saveInline"
                                            large
                                            lazy
                                            persistent
                                    >
                                        <div>{{ props.item.fat }}</div>
                                        <template v-slot:input>
                                            <div class="mt-3 title">Update Fat</div>
                                        </template>
                                        <template v-slot:input>
                                            <v-text-field
                                                    :rules="[max25chars]"
                                                    autofocus
                                                    counter
                                                    label="Edit"
                                                    single-line
                                                    v-model="props.item.fat"
                                            ></v-text-field>
                                        </template>
                                    </v-edit-dialog>
                                </td>
                                <td class="">{{ props.item.carbs }}</td>
                                <td class="text-xs-right">
                                    <v-edit-dialog
                                            :return-value.sync="props.item.protein"
                                            @cancel="cancelInline"
                                            @close="closeInline"
                                            @open="openInline"
                                            @save="saveInline"
                                            large
                                            lazy
                                            persistent
                                    >
                                        <div>{{ props.item.protein }}</div>
                                        <template v-slot:input>
                                            <div class="mt-3 title">Update Protein</div>
                                        </template>
                                        <template v-slot:input>
                                            <v-text-field
                                                    :rules="[max25chars]"
                                                    autofocus
                                                    counter
                                                    label="Edit"
                                                    single-line
                                                    v-model="props.item.protein"
                                            ></v-text-field>
                                        </template>
                                    </v-edit-dialog>
                                </td>
                            </template>
                        </v-data-table>
                        <v-snackbar :color="snackColor" :timeout="3000" v-model="snack">
                            {{ snackText }}
                            <v-btn @click="snack = false" flat>Close</v-btn>
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
            // data above is for inline edit
            dialog: false,
            headers: [
                {
                    text: 'Dessert (100g serving)',
                    align: 'left',
                    sortable: false,
                    value: 'name'
                },
                {text: 'Calories', value: 'calories'},
                {text: 'Fat (g)', value: 'fat'},
                {text: 'Carbs (g)', value: 'carbs'},
                {text: 'Protein (g)', value: 'protein'},
                {text: 'Actions', value: 'name', sortable: false}
            ],
            desserts: [],
            editedIndex: -1,
            editedItem: {
                name: '',
                calories: 0,
                fat: 0,
                carbs: 0,
                protein: 0
            },
            defaultItem: {
                name: '',
                calories: 0,
                fat: 0,
                carbs: 0,
                protein: 0
            }
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

        created() {
            this.initialize()
        },

        methods: {
            initialize() {
                this.desserts = [
                    {
                        name: 'Frozen Yogurt',
                        calories: 159,
                        fat: 6.0,
                        carbs: 24,
                        protein: 4.0
                    },
                    {
                        name: 'Ice cream sandwich',
                        calories: 237,
                        fat: 9.0,
                        carbs: 37,
                        protein: 4.3
                    },
                    {
                        name: 'Eclair',
                        calories: 262,
                        fat: 16.0,
                        carbs: 23,
                        protein: 6.0
                    },
                    {
                        name: 'Cupcake',
                        calories: 305,
                        fat: 3.7,
                        carbs: 67,
                        protein: 4.3
                    },
                    {
                        name: 'Gingerbread',
                        calories: 356,
                        fat: 16.0,
                        carbs: 49,
                        protein: 3.9
                    },
                    {
                        name: 'Jelly bean',
                        calories: 375,
                        fat: 0.0,
                        carbs: 94,
                        protein: 0.0
                    },
                    {
                        name: 'Lollipop',
                        calories: 392,
                        fat: 0.2,
                        carbs: 98,
                        protein: 0
                    },
                    {
                        name: 'Honeycomb',
                        calories: 408,
                        fat: 3.2,
                        carbs: 87,
                        protein: 6.5
                    },
                    {
                        name: 'Donut',
                        calories: 452,
                        fat: 25.0,
                        carbs: 51,
                        protein: 4.9
                    },
                    {
                        name: 'KitKat',
                        calories: 518,
                        fat: 26.0,
                        carbs: 65,
                        protein: 7
                    }
                ]
            },

            editItem(item) {
                this.editedIndex = this.desserts.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem(item) {
                const index = this.desserts.indexOf(item)
                confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
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
                    Object.assign(this.desserts[this.editedIndex], this.editedItem)
                } else {
                    this.desserts.push(this.editedItem)
                }
                this.close()
            },
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