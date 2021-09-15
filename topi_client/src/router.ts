import Another from './components/Another.vue';
import Home from './components/Home.vue';
import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'AboutMines',
    component: () => import('./components/AboutMines.vue'),
  },
  {
    path: '/another',
    name: 'Another',
    component: () => import('./components/Another.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;