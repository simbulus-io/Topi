import Vue from 'vue';
import Vuex from 'vuex';
import { StoreOptions } from 'vuex';
import { RootState } from '@/store/types';
import { user } from './user';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    version: 'v1.0',
    name: 'Kenny',
  },

  modules: {
    user,
  },
};

export default new Vuex.Store<RootState>(store);
