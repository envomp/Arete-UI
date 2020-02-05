<template>
    <v-menu
            :close-on-content-click="false"
            bottom
            left
            max-width="300"
            min-width="300"
            nudge-left="12"
            offset-x
            transition="slide-y-transition"
    >
        <v-btn
                class="elevation-0"
                color="grey"
                dark
                fab
                fixed
                slot="activator"
                style="top: 96px;"
                top
        >
            <v-icon>mdi-settings</v-icon>
        </v-btn>
        <v-card>
            <v-container grid-list-xl>
                <v-layout wrap>
                    <v-flex xs12>
                        <div class="text-xs-center body-2 text-uppercase ">Sidebar Filters</div>

                        <v-layout justify-center>
                            <v-avatar
                                    :class="[c === color ? 'color-active color-' + c: 'color-' + c]"
                                    :key="c"
                                    @click="setColor(c)"
                                    size="23"

                                    v-for="c in colors"
                            />
                        </v-layout>
                        <v-divider class="mt-3"/>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-menu>
</template>

<script>
    // Utilities
    import {mapMutations, mapState} from 'vuex'

    export default {
        data: () => ({
            colors: [
                'primary',
                'info',
                'success',
                'warning',
                'danger',
                'general'
            ]
        }),

        computed: {
            ...mapState('app', ['color']),
            color() {
                this.$store.state.app.color = localStorage.color; // Keep stuff in localStorage, so no need for request every refrest
                return this.$store.state.app.color;
            }
        },

        methods: {
            ...mapMutations('app', ['setImage']),
            setColor(color) {
                localStorage.color = color;
                this.$store.state.app.color = color;
                let username = localStorage.username;
                let token = localStorage.token;
                this.$http.put('/user', {username, token, color})
                    .then(() => {
                    })
                    .catch(error => console.log(error))
            }
        }
    }
</script>

<style lang="scss">
    .v-avatar,
    .v-responsive {
        cursor: pointer;
    }
</style>
