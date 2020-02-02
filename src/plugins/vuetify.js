import Vue from 'vue'
import Vuetify from 'vuetify/lib';
import theme from './theme'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

// This is here just in case you prefer to have all your plugins in a folder like this, otherwise its currently unused
Vue.use(Vuetify);


export default new Vuetify({
    dark: true, // it's decide your project
    themes: theme,
    icons: {
        iconfont: 'mdi',
    },
});

