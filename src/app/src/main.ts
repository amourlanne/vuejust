import Vue from 'vue';
import Vuelidate from 'vuelidate';
import VueCookies from 'vue-cookies';

import Vuetable from "vuetable-2/src/components/Vuetable";
import VuetablePagination from "vuetable-2/src/components/VuetablePagination";
import VuetablePaginationInfo from "vuetable-2/src/components/VuetablePaginationInfo";

import App from './App.vue';
import router from './router';
import store from './store';
import i18n from '@/translation';
import axios from 'axios';
import * as config from '../../config.json';
import 'bootstrap';
import '@fortawesome/fontawesome-free/js/all';

import './assets/scss/index.scss';

Vue.config.productionTip = false;

declare global {
  interface Window {
    $cookies: any;
  }
}
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.VUE_APP_API;
axios.interceptors.response.use(
  config => config,
  error => {
    if (error.response && (error.response.status == 401 || error.response.status == 403)) {
      const { cookie } = config;
      window.$cookies.remove(cookie['token'].payload.name);
      router.push({ name: 'login' });
      // TODO: set locale params
    }
    return Promise.reject(error);
  },
);

Vue.use(Vuelidate);
Vue.use(VueCookies);

Vue.component("vuetable", Vuetable);
Vue.component("vuetable-pagination", VuetablePagination);
Vue.component("vuetable-pagination-info", VuetablePaginationInfo);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
