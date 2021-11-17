import Vue from 'vue';
import Vuex from 'vuex';
import { RootState, UserState, User } from './types';
import { Module } from 'vuex';
import { GetterTree, MutationTree } from 'vuex';

Vue.use(Vuex);

export const state: User = {
  username: 'Kenny',
  email: 'mail.com',
  uid: '100',
  loggedIn: false,
  events: [],
};

export const getters: GetterTree<User, RootState> = {
  getUsername (user): string {
    return user.username;
  },
  getUserEvents (user): Array<Object> {
    return user.events;
  },
  getUserID (user): string {
    return user.uid;
  },
};

export const mutations: MutationTree<User> = {
  setUsername (user, payload: string) {
    user.username = payload;
  },
  setUserEmail (user, payload: string) {
    user.email = payload;
  },
};

export const user: Module<User, RootState> = {
  state,
  getters,
  mutations,
};


