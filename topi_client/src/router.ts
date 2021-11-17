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
    path: '/login',
    name: 'Login',
    component: () => import('./components/views/auth/login.vue'),
  },
  {
    path: '/forgot',
    name: 'Forgot',
    component: () => import ('./components/views/auth/forgot.vue'),
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: () => import('./components/views/calendar.vue'),
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
  {
    path: '/register',
    name: 'Registration',
    component: () => import ('./components/views/auth/register.vue'),
  },
  {
    path: '/meeting',
    name: 'Meeting',
    component: () => import ('./components/views/meeting.vue'),
  },
];

const router = new VueRouter({
  mode:'history',
  routes,
});

export default router;
