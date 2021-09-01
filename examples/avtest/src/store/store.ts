import Vue from 'vue';
import Vuex from 'vuex';
import { avtest } from '@/store/avtest';
import { RootState } from '@/store/types';

Vue.use(Vuex);

export const root_state: RootState = {
  version: '1.0',
};

export default new Vuex.Store<RootState>({
  state: root_state,
  modules: {
    avtest,
  },
});
