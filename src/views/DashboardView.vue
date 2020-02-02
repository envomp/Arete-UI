<template>
    <v-content>
        <v-app
                dark
                id="dashboard-view">
            <core-filter/>

            <core-toolbar/>

<!--            List left-->
            <core-drawer/>

<!--            Page content-->
            <v-fade-transition mode="out-in">
                <router-view/>
            </v-fade-transition>

            <core-footer v-if="$route.meta.name !== 'Maps'"/>

        </v-app>
    </v-content>
</template>

<script>
    export default {
        name: 'DashboardView',
        metaInfo() {
            return {
                title: 'Arete'
            }
        }
    }
</script>

<style>

</style>
