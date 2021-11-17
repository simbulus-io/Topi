import Vue from 'vue';
import Vuex from 'vuex';
import { RootState, UserState, User } from './types';
import { Module } from 'vuex';
import { GetterTree, MutationTree } from 'vuex';

Vue.use(Vuex);

export const state: User = {
  username: 'KennyUser',
  email: 'mail.com',
  uid: '100',
  loggedIn: false,
  events: [],
};

export const getters: GetterTree<User, RootState> = {
  getUsername (): string {
    return state.username;
  },
  getUserEvents (): Array<Object> {
    return state.events;
  },
  getUserID (): string {
    return state.uid;
  },
};

export const mutations: MutationTree<User> = {
  setUsername (state, payload: string) {
    state.username = payload;
  },
  setUserEmail (state, payload: string) {
    state.email = payload;
  },
};

export const user: Module<User, RootState> = {
  state,
  getters,
  mutations,
};


