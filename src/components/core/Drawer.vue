<template>
    <v-navigation-drawer
            app
            dark
            floating
            id="app-drawer"
            mobile-break-point="991"
            persistent
            v-model="inputValue"
            width="260"
    >
        <v-img
                :src="image"
                height="100%"
        >
            <v-layout
                    class="fill-height"
                    column
                    tag="v-list"
            >
                <v-list-tile avatar>
                    <v-list-tile-avatar
                            color="grey"
                    >
                        <v-img
                                :src="logo"
                                contain
                                height="64"
                        />
                    </v-list-tile-avatar>
                    <v-list-tile-title class="title">
                        Vuetify Admin Dash
                    </v-list-tile-title>
                </v-list-tile>
                <v-divider/>
                <v-list-tile
                        v-if="responsive"
                >
                    <v-text-field
                            class="purple-input search-input"
                            color="purple"
                            label="Search..."
                    />
                </v-list-tile>
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
        </v-img>
    </v-navigation-drawer>
</template>

<script>
  // Utilities
  import {mapMutations, mapState} from 'vuex'

  export default {
        data: () => ({
            logo: require('@/assets/img/redditicon.png'),
            links: [
                {
                    to: '/',
                    icon: 'mdi-view-dashboard',
                    text: 'Dashboard'
                },
                {
                    to: '/dashboard/user-profile',
                    icon: 'mdi-account',
                    text: 'User Profile'
                },
                {
                    to: '/dashboard/table-list',
                    icon: 'mdi-clipboard-outline',
                    text: 'Table List'
                },
                {
                    to: '/dashboard/user-tables',
                    icon: 'mdi-table-edit',
                    text: 'Users Table'
                },
                {
                    to: '/dashboard/typography',
                    icon: 'mdi-format-font',
                    text: 'Typography'
                },
                {
                    to: '/dashboard/icons',
                    icon: 'mdi-chart-bubble',
                    text: 'Icons'
                },
                {
                    to: '/dashboard/maps',
                    icon: 'mdi-map-marker',
                    text: 'Maps'
                },
                {
                    to: '/dashboard/notifications',
                    icon: 'mdi-bell',
                    text: 'Notifications'
                },
            ],
            responsive: false
        }),
        computed: {
            ...mapState('app', ['image', 'color']),
            inputValue: {
                get() {
                    return this.$store.state.app.drawer
                },
                set(val) {
                    this.setDrawer(val)
                }
            },
            items() {
                return this.$t('Layout.View.items')
            }
        },
        mounted() {
            this.onResponsiveInverted()
            window.addEventListener('resize', this.onResponsiveInverted)
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.onResponsiveInverted)
        },
        methods: {
            ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
            onResponsiveInverted() {
                if (window.innerWidth < 991) {
                    this.responsive = true
                } else {
                    this.responsive = false
                }
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
</style>
