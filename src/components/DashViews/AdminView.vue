<template>
	<v-container fluid grid-list-xl>
		<v-snackbar
			v-model="snackbar"
			:timeout="timeout"
			top
		>
			{{ snackbar_text }}
			<v-btn
				:color="color"
				flat
				@click="snackbar = false"
			>
				Close
			</v-btn>
		</v-snackbar>

		<material-card :color="color" text="Registered users" title="User Table">
			<v-text-field
				v-model="search"
				:color="color"
				append-icon="search"
				label="Search"
				single-line
			></v-text-field>

			<v-spacer></v-spacer>

			<v-dialog v-model="dialog" max-width="500px">
				<template v-slot:activator="{ on }">
					<v-btn v-on="on" :color="color" class="mb-2" dark>New Item</v-btn>
				</template>
				<v-card>
					<v-card-title>
						<span class="headline">new item</span>
					</v-card-title>

					<v-card-text>
						<v-container grid-list-md>
							<v-layout wrap>
								<v-flex md4 sm6 xs12>
									<v-text-field v-model="editedItem.username" label="Username"></v-text-field>
								</v-flex>
								<v-flex md4 sm6 xs12>
									<v-text-field v-model="editedItem.password" label="Password / token"></v-text-field>
								</v-flex>
								<v-flex md4 sm6 xs12>
									<v-select
										v-model="editedItem.role"
										:items="roles"
										label="Role"
									></v-select>
								</v-flex>
							</v-layout>
						</v-container>
					</v-card-text>

					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn :color="color" flat @click="close">Cancel</v-btn>
						<v-btn :color="color" flat @click="save">Create</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</material-card>

		<v-data-table
			id="topAdminTable"
			:color="color"
			:headers="headers"
			:items="userList"
			:search="search"
			class="elevation-1">

			<template slot="headerCell" slot-scope="{ header }">
				<span v-bind:class="'subheading font-weight-light text-' + color" v-text="header.text"/>
			</template>

			<template v-slot:items="props">
				<tr>
					<td>{{ props.item.id }}</td>
					<td>{{ props.item.roles }}</td>
					<td>{{ props.item.username }}</td>
					<td>
						<v-icon small @click="deleteItem(props.item)">
							delete
						</v-icon>
					</td>
				</tr>
			</template>

		</v-data-table>
		<!--        Footer hides otherwise-->
		<br><br><br><br>
	</v-container>
</template>

<script>
import {mapState} from "vuex";

export default {
	name: "AdminView",

	data: () => ({

		snackbar: false,
		snackbar_text: '',
		timeout: 5000,

		dialog: false,
		editedItem: {
			username: '',
			password: '',
			role: 'USER'
		},
		userList: [],
		search: '',
		headers: [
			{text: 'id', align: 'left', value: 'id'},
			{text: 'roles', value: 'roles'},
			{text: 'username', value: 'username'},
			{text: 'actions', value: 'actions', sortable: false},
		],

		roles: [
			'USER',
			'DEVELOPER',
			'TESTER',
			'HOOK'
		],
	}),

	computed: {
		...mapState('app', ['color']),
	},

	created() {
		this.getUsers();
	},

	methods: {

		deleteItem(item) {
			const index = this.userList.indexOf(item)
			if (confirm('Are you sure you want to delete this item?')) {
				this.$http.delete('/user', {data: {username: item.username}})
					.then(response => {
						this.userList.splice(index, 1)
						this.snackbar_text = 'Deleted user successfully:' + item.username;
						this.snackbar = true;
					})
					.catch(error => {
						this.snackbar_text = error;
						this.snackbar = true;
					})
			}
		},

		getUsers() {
			this.$http.get('/user/all')
				.then(response => {
					this.userList = response.data
					this.userList.forEach(user => {
						user.roles = user.roles.join(", ");
					})
				})
				.catch(error => {
					this.snackbar_text = error;
					this.snackbar = true;
				})
		},

		close() {
			this.dialog = false
		},

		save() {
			this.$http.post('/user/any', this.editedItem)
				.then(response => {
					const user = response.data;
					user.roles = user.roles.join(", ");
					this.userList.push(user)
					this.snackbar_text = 'Added user successfully:' + this.editedItem.username;
					this.snackbar = true;
				})
				.catch(error => {
					this.snackbar_text = error;
					this.snackbar = true;
				})
			this.close()
		}
	}
}
</script>

<style scoped>

</style>