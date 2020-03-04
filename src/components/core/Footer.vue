<template>
    <v-footer
            absolute
            height="82"
            id="core-footer"
    >
        <div class="footer-items">
      <span
              :key="link.name"
              v-for="link in links"
      >
        <a
                :class="color + '--text footer-links'"
                :href="link.Link">{{ link.name }}
        </a>
      </span>
        </div>

    </v-footer>
</template>

<script>
    // Utilities
    import {mapState} from 'vuex'

    export default {
        data: () => ({
                links: [
                    {name: 'Home', Link: '/dashboard'},
                    {name: 'GitHub', Link: 'https://github.com/envomp'},
                ]
            }
        ),

        computed: {
            ...mapState('app', ['color']),
        },
    }
</script>

<style>
    #core-footer {
        z-index: 0;
    }

</style>
