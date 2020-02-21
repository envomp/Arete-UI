<template>

    <v-navigation-drawer
            :clipped="!isMobile"
            :mini-variant="small"
            :persistent="!isMobile"
            :temporary="isMobile"
            app
            id="app-drawer"
            mobile-break-point="1263"
            v-model="drawer"
            width="260"
    >

        <v-layout
                class="fill-height"
                column
        >

            <v-list-tile
                    @click.stop="toggleSmall()"
                    avatar
                    class="v-list-item"
                    id="logo"
            >
                <v-list-tile-action>
                    <v-avatar
                    >
                        <v-img
                                :src="logo"
                                contain
                        />
                    </v-avatar>
                </v-list-tile-action>

                <v-card-title class="headline">Arete</v-card-title>
            </v-list-tile>

            <v-divider/>

            <v-list-tile
                    :active-class="color"
                    :key="i"
                    :to="link.to"
                    avatar
                    class="v-list-item"
                    v-for="(link, i) in links"
            >
                <v-list-tile-action>
                    <v-icon>{{ link.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-title
                        v-text="link.text"
                />
            </v-list-tile>
        </v-layout>

    </v-navigation-drawer>
</template>

<script>
    // Utilities
    import {mapMutations, mapState} from 'vuex'

    export default {
        name: 'Drawer',
        data: () => ({
            logo: require('@/assets/img/logo.png'),
            links: [
                {
                    to: '/',
                    icon: 'mdi-view-dashboard',
                    text: 'Dashboard'
                },
                {
                    to: '/dashboard/submissions',
                    icon: 'mdi-calendar-today',
                    text: 'Submissions'
                },
                {
                    to: '/dashboard/courses',
                    icon: 'mdi-source-fork',
                    text: 'Courses'
                },
                {
                    to: '/dashboard/exercises',
                    icon: 'mdi-source-pull',
                    text: 'Exercises'
                },
                {
                    to: '/dashboard/students',
                    icon: 'mdi-code-braces',
                    text: 'Students'
                }
            ],
        }),

        computed: {
            ...mapState('app', ['color', 'drawer', 'small', 'isMobile']),

            drawer: {
                get() {
                    return this.$store.state.app.drawer
                },
                set(val) {
                    this.setDrawer(val)
                }
            },

            items() {
                return this.$t('Layout.View.items')
            },

        },
        methods: {
            ...mapMutations('app', ['setDrawer', 'toggleDrawer']),

            toggleSmall() {
                this.$store.state.app.small = !this.$store.state.app.small;
            },

            setDrawer(val) {
                this.$store.state.app.drawer = val;
            },

            toggleDrawer() {
                this.$store.state.app.drawer = !this.$store.state.app.drawer;
            }
        }
    }
</script>

<style lang="scss">
    #app-drawer {
        .v-list__tile {
            border-radius: 4px;

            &--buy {
                margin-top: auto;
                margin-bottom: 17px;
            }
        }

        .v-image__image--contain {
            top: 9px;
            height: 60%;
        }

        .search-input {
            margin-bottom: 30px !important;
            padding-left: 15px;
            padding-right: 15px;
        }
    }

    #logo {
        height: 70px;
    }
</style>
