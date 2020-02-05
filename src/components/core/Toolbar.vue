<template>
    <v-toolbar dark flat id="core-toolbar">
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
            responsive: false,
            responsiveInput: false
        }),

        computed: {
            ...mapState('app', ['color']),
            ...mapGetters(["authorized"])
        },

        watch: {
            $route(val) {
                this.title = val.meta.name;
            }
        },

        mounted() {
            this.onResponsiveInverted();
            window.addEventListener("resize", this.onResponsiveInverted);
        },
        beforeDestroy() {
            window.removeEventListener("resize", this.onResponsiveInverted);
        },

        methods: {
            ...mapMutations("app", ["setDrawer", "toggleDrawer"]),

            onResponsiveInverted() {
                if (window.innerWidth < 991) {
                    this.responsive = true;
                    this.responsiveInput = false;
                } else {
                    this.responsive = false;
                    this.responsiveInput = true;
                }
            },
            logout: function () {
                this.$store.dispatch("logout").then(() => {
                    location.reload();
                });
            }
        }
    };
</script>

<style>
    #core-toolbar a {
        text-decoration: none;
    }
</style>
