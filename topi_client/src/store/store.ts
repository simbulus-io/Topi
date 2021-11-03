import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: String,
    events: Array
  },

  // Update state 
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    }
  },

  // async funcs.
  actions: {
  },

  getters: {
    getUser(state) {
      return state.user
    },

    getEvents(state) {
      return state.events
    }
  },

  modules: {
  },

});
