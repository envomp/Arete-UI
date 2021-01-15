<template>
	<v-container
		fluid
		grid-list-xl
	>
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

		<v-layout wrap>

			<v-flex
				:color="color"
				lg6
				md6
				sm12
				style="padding-right: 8px"
				xs12
			>
				<material-card
					:color="color"
					:title="items[0].title"
				>

					<v-card-text class="grey darken-3 text--primary">
						<v-footer class="pa-3">
							<v-spacer></v-spacer>
							<div>
								images:
								<a :class="color + '--text footer-links'" href="https://hub.docker.com/repositories/">docker
									hub</a>
							</div>
						</v-footer>

						<v-spacer></v-spacer>

						<form>
							<v-text-field

								v-model="image_name"
								:color="color"
								clearable
								dark
								hint="Make sure it ends with '-tester'"
								label="Image name"
								primary

							></v-text-field>

							<v-btn :color="color"
							       class="mx-0"
							       outline
							       @click="updateImage()">Submit
							</v-btn>
						</form>
					</v-card-text>

				</material-card>
			</v-flex>

			<v-flex
				:color="color"
				lg6
				md6
				sm12
				style="padding-left: 8px"
				xs12

			>
				<material-card
					:color="color"
					:title="items[1].title"
				>

					<v-card-text class="grey darken-3 text--primary">
						<v-footer class="pa-3">
							<v-spacer></v-spacer>
							<div>
								tests:
								<a :class="color + '--text footer-links'" href="https://gitlab.cs.ttu.ee/">gitlab</a>
							</div>
						</v-footer>

						<v-spacer></v-spacer>

						<form>
							<v-text-field

								v-model="tester_name"
								:color="color"
								clearable
								dark
								data-vv-name="name"
								hint="Make sure git repository is provided"
								label="Tester repository"
								primary

							></v-text-field>

							<v-btn :color="color"
							       class="mx-0"
							       outline
							       @click="updateTester()">update
							</v-btn>
						</form>
					</v-card-text>
				</material-card>
			</v-flex>

		</v-layout>


		<material-card
			:color="color"
			:title="items[2].title"
		>
			<v-footer class="pa-3">
				<v-spacer></v-spacer>
				<div>
					docs:
					<a :class="color + '--text footer-links'"
					   href="https://ained.pages.taltech.ee/it-doc/arete/index.html">gitlab pages</a>
				</div>
			</v-footer>

			<v-spacer></v-spacer>

			<v-container fluid grid-list-md>
				<v-layout
					wrap
				>
					<v-flex
						d-flex
						fluid
						md6
						sm6
						style="padding-right: 8px"
						xs12
					>

						<form ref="form">

							<v-text-field

								v-model="programming_language"
								:color="color"
								:rules="rules"
								clearable
								dark
								hint="java, python, prolog..."
								label="Testing language"
								primary

							></v-text-field>

							<v-text-field

								v-model="student_repository"
								:color="color"
								:rules="rules"
								clearable
								dark
								hint="gitlab or github url"
								label="Student repository"
								primary

							></v-text-field>

							<v-text-field

								v-model="tester_repository"
								:color="color"
								:rules="rules"
								clearable
								dark
								hint="gitlab or github url"
								label="Tester repository"
								primary

							></v-text-field>

							<v-text-field

								v-model="slug"
								:color="color"
								clearable
								dark
								hint="You can predefine target exercise. EX01_IdCode for example"
								label="Exercise"
								primary

							></v-text-field>

							<v-text-field

								v-model="git_hash"
								:color="color"
								clearable
								dark
								hint="You can predefine target git hash"
								label="Hash"
								primary

							></v-text-field>

							<v-text-field

								v-model="uniid"
								:color="color"
								clearable
								dark
								hint="You can prefine target uniid. envomp for example"
								label="UNI-ID"
								primary

							></v-text-field>
						</form>
					</v-flex>

					<v-flex
						d-flex
						fluid
						md6
						sm6
						style="padding-left: 8px"
						xs12
					>
						<form>

							<v-text-field

								v-model="docker_timeout"
								:color="color"
								clearable
								dark
								hint="You can predefine docker timeout in seconds"
								label="Docker Timeout"
								primary

							></v-text-field>

							<v-text-field

								v-model="priority"
								:color="color"
								clearable
								dark
								hint="You can predefine target priority (1 - 10)"
								label="Priority"
								primary

							></v-text-field>

							<v-select
								v-model="testing_mode"
								:color="color"
								:items="testing_modes"
								dark
								label="Testing mode"
								outline
							></v-select>

							<v-select
								v-model="system_extra"
								:items="system_extra_options"
								chips
								label="System extra"
								multiple
							></v-select>

						</form>
					</v-flex>

				</v-layout>
				<v-btn :color="color"
				       class="mx-0"
				       outline
				       @click="submitSubmission()">Submit
				</v-btn>

				<v-btn :color="color"
				       class="mx-0"
				       outline
				       @click="clearSubmission()">clear
				</v-btn>
			</v-container>

		</material-card>


		<material-card
			:color="color"
			text="Latest submissions"
			title="Submission Table"
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
			id="submissionDataTable"
			:color="color"
			:headers="computedHeaders"
			:items="SubmissionList"
			:rows-per-page-items="rowsAmount"
			:search="search.length < 3 ? '': search"
			class="elevation-1"
			style="table-layout:fixed; width: 100% !important;"
			v-bind:pagination.sync="pagination"
		>

			<template
				slot="headerCell"
				slot-scope="{ header }"
			>
                <span
	                v-bind:class="'subheading font-weight-light text-' + color"
	                v-bind:style="{ 'color': color }"
	                v-text="header.text"
                />
			</template>

			<template
				v-slot:items="props"
			>
				<tr @click="props.expanded = !props.expanded, getSubmission(props.item.hash, props.item.timestamp)">
					<td v-if="!isMobile && !isVerySmall">{{ props.item.id }}</td>
					<td>{{ props.item.uniid }}</td>
					<td v-if="!isMobile">{{ props.item.slug }}</td>
					<td v-if="!isMobile">{{ props.item.hash }}</td>
					<td v-if="!isMobile && !isVerySmall && !isSmall">{{ props.item.timestamp }}</td>
					<td v-if="!isMobile && !isVerySmall">{{ props.item.testingPlatform }}</td>
					<td v-if="!isMobile && !isVerySmall && !isSmall">{{ props.item.root }}</td>
					<td>{{ props.item.failed }}</td>
				</tr>
			</template>

			<v-spacer></v-spacer>

			<template v-slot:expand="props">
				<v-container :class="!isMobile ? 'pa-4' : 'pa-0'" fluid ma-0>
					<v-progress-linear :color="color" :indeterminate="true" v-if="submissionLoading">
					</v-progress-linear>

					<v-window v-else style="background: rgba(0,0,0,0.3)">
						<v-tabs
							:id="'submissionTab'"
							:slider-color="color"
							color="grey darken-4"
							dark
							vertical
						>
							<v-tab ripple>
								<v-icon left>mdi-message-text-outline</v-icon>
								Docker
							</v-tab>

							<v-tab ripple>
								<v-icon left>mdi-comment-plus-outline</v-icon>
								Extra
							</v-tab>

							<v-tab v-if="!isMobile" ripple>
								<v-icon left>mdi-lock-open</v-icon>
								Out
							</v-tab>

							<v-tab ripple>
								<v-btn :color="color"
								       class="mx-0"
								       outline
								       @click="retestJob(fullSubmission)">retest
								</v-btn>
							</v-tab>

							<v-tab-item :key="'tab_item_1'">
								<v-card flat>
									<div class="consoleOutput scale-down"
									     v-html="fullSubmission.consoleOutput"></div>
								</v-card>
							</v-tab-item>

							<v-tab-item :key="'tab_item_2'">
								<v-card class="mx-auto consoleOutput" max-height="500" max-width="80vw"
								        outlined raised>
												<pre style="max-height: 500px;overflow: auto">{{
														fullSubmission || pretty
													}}</pre>
								</v-card>
							</v-tab-item>

							<v-tab-item v-if="!isMobile" :key="'tab_item_3'">
								<v-card flat>
									<div class="consoleOutput scale-down" v-html="fullSubmission.output"></div>
								</v-card>
							</v-tab-item>

							<v-spacer></v-spacer>
						</v-tabs>
					</v-window>
				</v-container>
			</template>
		</v-data-table>
		<br><br><br><br>
	</v-container>

</template>

<script>

// Utilities
import {mapState} from 'vuex'
import ChartCard from "../material/ChartCard";
import StatsCard from "../material/StatsCard";

export default {
	name: 'Dashboard',
	components: {StatsCard, ChartCard},
	data: () => ({

		snackbar: false,
		timeout: 5000,
		rowsPerPageItems: [4, 8, 12, 24],
		snackbar_text: '',

		image_name: '',
		tester_name: '',

		subSearch: '',

		testing_modes: [
			'Sync',
			'Async'
		],

		system_extra_options: [
			'anonymous', 'allowAppending', 'giveTestRunnerControl', 'overrideContentRoot', 'overrideTestRoot',
			'overrideExtra', 'overrideTestingPlatform', 'noOverall', 'skipCopyingTests', 'skipCopyingStudent',
			'skipCopying', 'noMail', 'noFiles', 'noTesterFiles', 'noStudentFiles', 'noStd', 'noStyle',
			'allowExternalMail', 'noOverride', 'noFeedback', 'minimalFeedback'
		],

		testing_mode: null,
		programming_language: '',
		student_repository: '',
		tester_repository: '',
		slug: '',
		git_hash: '',
		uniid: '',
		docker_timeout: '',
		priority: '',
		system_extra: ['noFiles'],

		items: [
			{
				title: 'Update image',
				icon: 'mdi-cloud-download',
			},
			{
				title: 'Update tests',
				icon: 'mdi-file-multiple',
			},
			{
				title: 'Create submission',
				icon: 'mdi-share',
			}
		],

		// Charon like
		SubmissionList: [],
		fullSubmission: null,
		submissionLoading: true,

		filters: {
			pretty: function (value) {
				return JSON.stringify(JSON.parse(value), null, 2);
			}
		},

		rowsAmount: [15, 20, 25, {"text": "$vuetify.dataIterator.rowsPerPageAll", "value": -1}],
		search: '',
		pagination: {'sortBy': 'id', 'descending': true, 'rowsPerPage': 15},

		headers: [
			{text: 'id', align: 'left', value: 'id'},
			{text: 'uniid', value: 'uniid'},
			{text: 'slug', value: 'slug'},
			{text: 'hash', value: 'hash', sortable: false},
			{text: 'timestamp', value: 'timestamp'},
			{text: 'testingPlatform', value: 'testingPlatform'},
			{text: 'root', value: 'root'},
			{text: 'failed', value: 'failed'}
		],

		headersSmall: [
			{text: 'id', align: 'left', value: 'id'},
			{text: 'uniid', value: 'uniid'},
			{text: 'slug', value: 'slug'},
			{text: 'hash', value: 'hash', sortable: false},
			{text: 'testingPlatform', value: 'testingPlatform'},
			{text: 'failed', value: 'failed'}
		],

		headersVerySmall: [
			{text: 'uniid', value: 'uniid'},
			{text: 'hash', value: 'hash', sortable: false},
			{text: 'failed', value: 'failed'}
		],

		headersMobile: [
			{text: 'uniid', value: 'uniid'},
			{text: 'failed', value: 'failed'}
		],

		testSuiteHeaders: [
			{text: 'id', align: 'left', value: 'id', sortable: true},
			{text: 'name', align: 'left', value: 'name', sortable: true},
			{text: 'file', value: 'file', sortable: true},
			{text: 'startDate', value: 'startDate', sortable: true},
			{text: 'endDate', value: 'endDate', sortable: true},
			{text: 'weight', value: 'weight', sortable: true},
			{text: 'passedCount', value: 'passedCount', sortable: true},
			{text: 'grade (%)', value: 'grade', sortable: true},
		],

		unitTestHeaders: [
			{text: 'id', align: 'left', value: 'id', sortable: true},
			{text: 'name', align: 'left', value: 'name', sortable: true},
			{text: 'status', value: 'status', sortable: true},
			{text: 'weight', value: 'weight', sortable: true},
			{text: 'exceptionClass', value: 'exceptionClass', sortable: true},
			{text: 'exceptionMessage', value: 'exceptionMessage', sortable: true},
		],

	}),

	computed: {
		...mapState('app', ['color', 'hide', 'isMobile', 'small', 'isSmall', 'isVerySmall']),

		rules() {
			const rules = [];

			const rule =
				v => (v || '').length > 0 ||
					`This field is required!`;

			rules.push(rule);

			const rule2 =
				v => (v || '').indexOf(' ') < 0 ||
					'No spaces are allowed';

			rules.push(rule2);

			return rules;
		},

		computedHeaders() {

			if (this.isMobile) {
				return this.headersMobile;
			} else if (this.isVerySmall) {
				return this.headersVerySmall;
			} else if (this.isSmall) {
				return this.headersSmall;
			} else {
				return this.headers;
			}
		},
	},

	// called when page is created before dom
	created() {
		this.getSubmissions();
	},

	methods: {

		retestJob(job) {
			const jsonData = {};
			jsonData['returnUrl'] = "https://www.neti.ee";
			jsonData['testingPlatform'] = job.testingPlatform;
			jsonData['gitStudentRepo'] = job.gitStudentRepo;
			jsonData['gitTestRepo'] = job.gitTestRepo;
			jsonData['hash'] = job.hash;
			jsonData['uniid'] = job.uniid;
			jsonData['slugs'] = [job.slug];
			jsonData['dockerTimeout'] = job.dockerTimeout;
			jsonData['priority'] = job.priority;
			jsonData['systemExtra'] = job.systemExtra;
			jsonData['dockerExtra'] = job.dockerExtra.join();
			jsonData['returnExtra'] = {};
			this.snackbar_text = 'Submission successful';
			this.snackbar = true;

			this.$http.post('/submission/:testSync', jsonData)
				.then(response => {
					this.snackbar_text = 'Job tested successfully';
					this.snackbar = true;
					this.getSubmissions();
				})
				.catch(error => {
						this.snackbar_text = error;
						this.snackbar = true;
					}
				)


		},

		updateImage() {
			if (this.image_name === '') {
				this.snackbar_text = "Image name is needed";
				this.snackbar = true;
				return;
			}

			if (!this.image_name.endsWith("-tester")) {
				this.snackbar_text = "Image name needs to end with '-tester'";
				this.snackbar = true;
				return;
			}

			this.snackbar_text = "Updating image";
			this.snackbar = true;

			this.$http.put('/course/' + this.image_name)
				.then(response => {
					this.snackbar_text = "New image has been pulled";
					this.snackbar = true;
				})
				.catch(error => {
						this.snackbar_text = error;
						this.snackbar = true;
					}
				)
		},

		updateTester() {
			if (this.tester_name === '') {
				this.snackbar_text = "Tester repo is needed";
				this.snackbar = true;
				return;
			}


			this.snackbar_text = "Updating tests";
			this.snackbar = true;

			const regex = /\.[a-zA-Z]+\//gm;
			const namespace = this.tester_name.replace(".git", "").split(regex);
			this.$http.put('/exercise/', {
				"project": {
					"url": this.tester_name,
					"path_with_namespace": namespace[namespace.length - 1]
				}
			})
				.then(response => {
					this.snackbar_text = "Updated tests successfully";
					this.snackbar = true;
				})
				.catch(error => {
						this.snackbar_text = error;
						this.snackbar = true;
					}
				)
		},

		submitSubmission() {

			if (this.programming_language === '') {
				this.snackbar_text = "Programming language is needed";
				this.snackbar = true;
				return;
			}

			if (this.gitStudentRepo === '') {
				this.snackbar_text = "Student repository is needed";
				this.snackbar = true;
				return;
			}

			if (this.tester_repository === '') {
				this.snackbar_text = "Tester repository is needed";
				this.snackbar = true;
				return;
			}

			const jsonData = {};
			if (this.programming_language !== '') {
				jsonData['testingPlatform'] = this.programming_language;
			}
			if (this.student_repository !== '') {
				jsonData['gitStudentRepo'] = this.student_repository;
			}
			if (this.tester_repository !== '') {
				jsonData['gitTestRepo'] = this.tester_repository;
			}
			if (this.slug !== '') {
				jsonData['slugs'] = [this.slug];
			}
			if (this.git_hash !== '') {
				jsonData['hash'] = this.git_hash;
			}
			if (this.uniid !== '') {
				jsonData['uniid'] = this.uniid;
			}
			if (this.docker_timeout !== '') {

				jsonData['dockerTimeout'] = this.docker_timeout;
			}
			if (this.priority !== '') {
				jsonData['priority'] = this.priority;
			}

			jsonData['systemExtra'] = this.system_extra;

			if (this.testing_mode === "Async") {
				this.snackbar_text = 'Submission successful';
				this.snackbar = true;

				this.$http.post('/submission/:testAsync', jsonData)
					.then(response => {
						this.snackbar_text = 'Job ran successfully';
						this.snackbar = true;
					})
					.catch(error => {
							this.snackbar_text = error;
							this.snackbar = true;
						}
					)

			} else if (this.testing_mode === "Sync") {
				this.snackbar_text = 'Submission sent';
				this.snackbar = true;

				this.$http.post('/submission/:testSync', jsonData)
					.then(response => {
						this.snackbar_text = 'Check submissions table';
						this.snackbar = true;
						this.getSubmissions();
						this.$forceUpdate();
					})
					.catch(error => {
							this.snackbar_text = error;
							this.snackbar = true;
						}
					)

			} else {
				this.snackbar_text = "Testing mode is not provided";
				this.snackbar = true;
			}
		},

		clearSubmission() {
			this.testing_mode = null;
			this.programming_language = '';
			this.student_repository = '';
			this.tester_repository = '';
			this.slug = '';
			this.git_hash = '';
			this.uniid = '';
			this.docker_timeout = '';
			this.priority = '';
			this.system_extra = ['noFiles'];
		},

		getSubmission(hash, timestamp) {
			this.submissionLoading = true

			this.$http.get('/submission/' + hash + "/" + timestamp)
				.then(response => {
					console.log(response.data)
					this.fullSubmission = response.data;
					this.submissionLoading = false;
				})
				.catch(error => console.log(error))
		},

		getSubmissions() {
			this.$http.get('/submission/all')
				.then(response => {
					const data = response.data;
					data.reverse();
					this.SubmissionList = data;
				})
				.catch(error => console.log(error))
		}

	},
}
</script>

<style scoped>
pre {
	outline: 1px solid #ccc;
	padding: 5px;
	margin: 5px;
}
</style>