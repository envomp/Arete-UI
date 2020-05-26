// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// Components
import './components'
// Plugins
import './plugins'
// Sync router with store
import {sync} from 'vuex-router-sync'
// Application imports
import App from './App'
import i18n from '@/i18n'
import router from '@/router'
import store from '@/store'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import axios from 'axios'
import vuetify from './plugins/vuetify';


Vue.prototype.$http = axios;
// Sets the default url used by all of this axios instance's requests
axios.defaults.headers.get['Accept'] = 'application/json';
axios.defaults.baseURL = process.env.BACKEND || "http://localhost:8001/services/arete/api/admin/";

console.log(axios.defaults.baseURL);
console.log(JSON.stringify(process.env, null, 2));

const token = localStorage.getItem('token');
if (token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
}

// Sync store with router
sync(store, router);


Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    vuetify,
    i18n,
    router,
    store,
    render: h => h(App)
}).$mount('#app');
