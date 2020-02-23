<template>

    <router-view/>

</template>

<style lang="scss">
    @import "@/styles/index.scss";

</style>
<script>
    import {mapMutations} from "vuex";

    // checks to see if auth jwt token is valid or has expired, if it gets back 401 error log out
    export default {
        name: 'App',
        created: function () {
            this.$http.interceptors.response.use((response) => {
                return response;
            }, (error) => {
                if (401 === error.response.status) {
                    if (this.$store.getters.authorized) {
                        this.$store.dispatch('refreshtoken')
                    } else {
                        return Promise.reject(error);
                    }

                } else {
                    return Promise.reject(error);
                }
            });
        },

        mounted() {
            this.$store.state.app.isMobile = window.innerWidth < 600;
            this.$store.state.app.isVerySmall = window.innerWidth < 960;
            this.$store.state.app.isSmall = window.innerWidth < 1264;

            window.addEventListener('resize', this.onResponsiveInverted)
        },

        beforeDestroy() {
            window.removeEventListener('resize', this.onResponsiveInverted)
        },

        methods: {
            onResponsiveInverted() {
                let lastMobile = this.$store.state.app.isMobile;
                let lastSmall = this.$store.state.app.isSmall;
                console.log( window.innerWidth);
                this.$store.state.app.isMobile = window.innerWidth < 600;
                this.$store.state.app.isVerySmall = window.innerWidth < 930;
                this.$store.state.app.isSmall = window.innerWidth < 1260;

                if (!lastMobile && this.$store.state.app.isMobile) {
                    this.$store.state.app.drawer = false;
                }

                if (!lastSmall && this.$store.state.app.isSmall) {
                    this.$store.state.app.small = true;
                }

                if (lastMobile && !this.$store.state.app.isMobile) {
                    this.$store.state.app.small = true;
                    this.$store.state.app.drawer = true;
                }

            },
        },
    };
</script>
