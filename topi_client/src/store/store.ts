import Vue from 'vue';
import Vuex from 'vuex';
import { StoreOptions } from 'vuex';
import { RootState } from './types';
import { user } from './user';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    version: 'v1.0',
    name: 'Kenny',
    meetingId: '101010101010',
  },

  modules: {
    user,
  },
};

export default new Vuex.Store<RootState>(store);
