import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from './components/Home.vue';
Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/audio',
    name: 'Audio Test',
    component: () => import(/* webpackChunkName: "about" */ './components/AudioTest.vue'),
  },
  {
    path: '/video',
    name: 'Video Test',
    component: () => import(/* webpackChunkName: "about" */ './components/VideoTest.vue'),
  },
  {
    path: '/overview',
    name: 'Overview',
    component: () => import(/* webpackChunkName: "about" */ './components/Overview.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
