import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from '@/store/store';
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import AudioVisual from 'vue-audio-visual';

Vue.use(AudioVisual);

library.add(fas);
Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.component('font-awesome-icon', FontAwesomeIcon);

// Yasi -This is the switch for offline vs online - ultimatly this will be set the
// query string - it is used gate the data fetch in app.ts
Vue.$offline = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#avtest-app');
