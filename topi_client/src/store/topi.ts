import { Module } from 'vuex';
import { RootState } from '@/store/types';

const namespaced = true;

// Team -This pattern lets you devine a typed state object. Vuex was implemented
// in javascript so its intrinsically untyped. My bet is that there will be a
// rewrite of Vuex in the near future with type support until then we have to
// plug in our own typing and do some explicit casting in the compontents
export interface User {
  name: string;
  uid: string;
}

export interface TopiState {
  users: User[];
}

const default_state: TopiState = {
  users: [],
};

export const avtest: Module<TopiState, RootState> = {
  namespaced,
  // This is the default state
  // state: default_state,
  state: default_state,
  getters: {
  },
  // These respond to commit and are by nature synchronus
  mutations: {
  },
  // These respond to dispatch and are by nature async
  actions: {
  },
};

