<template>
    <v-toolbar dark flat id="core-toolbar">

        <div v-if="!hide">
            <v-icon @click="toggleUserOverride" class="toolbar-items" color v-if="userOverride">mdi-chevron-double-left</v-icon>
            <v-icon @click="toggleUserOverride" class="toolbar-items" color v-else>mdi-chevron-double-right</v-icon>
        </div>

        <v-toolbar-title>
            {{ title }}
        </v-toolbar-title>

        <v-spacer/>
        <v-toolbar-items>
            <v-flex align-center layout py-2 v-ripple="{ class: `${color}--text` }">

                <router-link
                        :key="color"
                        class="toolbar-items"
                        to="/"
                >
                    <v-icon>mdi-home</v-icon>
                </router-link>

                <v-icon @click="logout" class="toolbar-items" color>mdi-power</v-icon>

            </v-flex>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
    import {mapGetters, mapMutations, mapState} from "vuex";

    export default {
        data: () => ({
            notifications: [],
            title: "Automated testing service",
        }),

        computed: {
            ...mapState('app', ['color', 'userOverride', 'hide']),
            ...mapGetters(["authorized"]),
            userOverride() {
                return this.$store.state.app.userOverride;
            },

            hide() {
                return this.$store.state.app.hide;
            },

            color() {
                return this.$store.state.app.color;
            }
        },

        watch: {
            $route(val) {
                this.title = val.meta.name;
            }
        },
        mounted() {
            this.onResponsiveInverted();
            window.addEventListener('resize', this.onResponsiveInverted)
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.onResponsiveInverted)
        },

        methods: {
            ...mapMutations("app", ["toggleUserOverride", "setHide"]),

            onResponsiveInverted() {
                this.setHide(window.innerWidth === screen.width);
            },

            setHide(hide) {
                this.$store.state.app.hide = hide;
            },

            logout: function () {
                this.$store.dispatch("logout").then(() => {
                    location.reload();
                });
            },

            toggleUserOverride() {
                this.$store.state.app.userOverride = !this.$store.state.app.userOverride;
            },
        }
    };
</script>

<style>
    #core-toolbar a {
        text-decoration: none;
    }
</style>
