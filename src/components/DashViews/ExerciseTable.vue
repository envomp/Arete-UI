<template>
	<v-container
		fluid
		grid-list-xl
	>

		<material-card
			:color="color"
			text="Exercise overview"
			title="Exercise Table"
		>
			<v-text-field
				v-model="search"
				:color="color"
				append-icon="search"
				hide-details
				label="Search"
				single-line
			></v-text-field>

		</material-card>


		<v-data-table
			v-if="!isMobile"
			:color="color"
			:headers="headers"
			:items="exerciseList"
			:rows-per-page-items="rowsAmount"
			:search="search"
			class="elevation-1">

			<template
				slot="headerCell"
				slot-scope="{ header }">
                <span
	                v-bind:class="'subheading font-weight-light text-' + color"
	                v-text="header.text"/>
			</template>

			<template v-slot:items="props">
				<tr>
					<td>{{ props.item.id }}</td>
					<td>{{ props.item.name }}</td>
					<td>{{ props.item.courseUrl }}</td>
					<td>{{ props.item.totalCommits }}</td>
					<td>{{ props.item.totalTestsRan }}</td>
					<td>{{ props.item.totalTestsPassed }}</td>
					<td>{{ props.item.totalDiagnosticErrors }}</td>
					<td>{{ props.item.commitsStyleOK }}</td>
				</tr>
			</template>

		</v-data-table>

		<v-data-iterator
			v-else
			:color="color"
			:items="exerciseList"
			:pagination.sync="pagination"
			:rows-per-page-items="rowsPerPageItems"
			:search="search"
			item-key="name"
			row
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
						<v-list v-if="props.expanded" dense>
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

export default {

	data: () => ({

		exerciseList: [],

		rowsPerPageItems: [4, 8, 12, 24],
		pagination: {
			rowsPerPage: 8
		},

		rowsAmount: [15, 20, 25, {"text": "$vuetify.dataIterator.rowsPerPageAll", "value": -1}],
		search: '',

		headers: [
			{text: 'id', align: 'left', value: 'id'},
			{text: 'name', value: 'name'},
			{text: 'courseUrl', value: 'courseUrl'},
			{text: 'totalCommits', value: 'totalCommits'},
			{text: 'totalTestsRan', value: 'totalTestsRan'},
			{text: 'totalTestsPassed', value: 'totalDiagnosticErrors'},
			{text: 'totalDiagnosticErrors', value: 'totalDiagnosticErrors'},
			{text: 'commitsStyleOK', value: 'commitsStyleOK'},
		],

	}),

	computed: {
		...mapState('app', ['color', 'isMobile']),
	},

	// called when page is created before dom
	created() {
		this.getExercises();
	},

	methods: {

		convert(t) {
			const dt = new Date(t);
			const hr = dt.getUTCHours();
			const m = dt.getUTCMinutes() > 30 ? '30' : '00';

			return hr + ':' + m.substr(-2)
		},

		getExercises() {
			this.$http.get('/exercise/all')
				.then(response => {
					this.exerciseList = response.data
				})
				.catch(error => console.log(error))
		},

	}
}
</script>

<style scoped>

</style>