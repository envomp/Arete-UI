<template>
    <v-container fill-height fluid>
        <v-layout align-center justify-center>
            <v-flex md4 sm8 xs12>
                <v-card
                        class="elevation-12">
                    <v-toolbar
                            color="primary">
                        <v-toolbar-title>Arete</v-toolbar-title>
                        <v-spacer/>
                    </v-toolbar>
                    <v-card-text>
                        <v-form>
	                        <v-footer class="pa-3">
		                        <v-spacer></v-spacer>
		                        <div>
			                        For access contact a teacher of a programming subject
		                        </div>
	                        </v-footer>

	                        <v-divider></v-divider>

                            <v-text-field
                                    :rules="[() => !!username || 'This field is required']"
                                    label="Login"
                                    placeholder="admin"
                                    prepend-icon="mdi-account"
                                    ref="username"
                                    required
                                    v-model="username"
                            />
                            <v-text-field
                                    :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                                    :rules="[() => !!password || 'This field is required']"
                                    :type="showPassword ? 'text' : 'password'"
                                    @click:append="showPassword = !showPassword"
                                    @keydown.enter="login"
                                    counter
                                    label="Password"
                                    placeholder="*********"
                                    prepend-icon="mdi-lock"
                                    ref="password"
                                    required
                                    v-model="password"
                            />
                        </v-form>
                    </v-card-text>
                    <v-divider class="mt-5"/>
                    <v-card-actions>
                        <v-spacer/>
                        <v-btn
                                @click="login"
                                align-center
                                color="primary"
                                justify-center>Login
                        </v-btn>
                    </v-card-actions>
                    <v-snackbar
                            :color="color"
                            :top='true'
                            v-model="snackbar"
                    >
                        {{ errorMessages }}
                        <v-btn
                                @click="snackbar = false"
                                dark
                                flat
                        >
                            Close
                        </v-btn>
                    </v-snackbar>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data: function () {
            return {
                username: '',
                password: '',
                errorMessages: 'Incorrect login info',
                snackbar: false,
                color: 'general',
                showPassword: false
            }
        },

        // Sends action to Vuex that will log you in and redirect to the dash otherwise, error
        methods: {
            login: function () {
                let username = this.username;
                let password = this.password;
                this.$store.dispatch('login', {username, password})
                    .then(response => {
                        localStorage.color = response.data.color;
                        localStorage.username = response.data.username;
                        this.$router.push('/dashboard')
                    })
                    .catch(err => {
                            console.log(err);
                            this.snackbar = true
                        }
                    )
            }
        },
        metaInfo() {
            return {
                title: 'Login'
            }
        }
    }
</script>

<style scoped>

</style>