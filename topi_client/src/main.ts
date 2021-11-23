import App from './App.vue';
import router from './router';
import store from './store/store';
import Vue from 'vue';
import VueSimpleAlert from 'vue-simple-alert';
import Vuex from 'vuex';

Vue.use(Vuex);
Vue.config.productionTip = false;
Vue.use(VueSimpleAlert);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');



