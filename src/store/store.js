import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  firstPlayer: '1st Player',
  secondPlayer: '2nd Player',
  firstPlayerNumber: '',
  secondPlayerNumber: '',
  winCounterFirstPlayer: 0,
  winCounterSecondPlayer: 0,
};

const getters = {

};

const mutations = {

};

const actions = {
};

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});

export default store;
