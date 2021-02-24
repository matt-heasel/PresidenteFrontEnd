import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: '',
    uuid: '',
    pin: '',
    hand: [],
  },
  mutations: {
    ADD_GAME_PIN(state, pin) {
      state.pin = pin;
    },
    GENERIC_STORE_UPDATE(state, payload) {
      state[payload.property] = payload.value;
    },
  },
  actions: {
    gamePin({ commit }, pin) {
      commit('ADD_GAME_PIN', pin);
    },
    genericStoreUpdate({ commit }, payload) {
      commit('GENERIC_STORE_UPDATE', payload);
    },
  },
  modules: {
  },
});
