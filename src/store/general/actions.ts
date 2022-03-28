import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { StateInitialInterface } from './state';

const actions: ActionTree<StateInitialInterface, StateInterface> = {
  pushSelectedCity({ commit }, city) {
    commit('PUSH_SELECTED_CITY', city);
  },

  dropSelectedCity({ commit }, city) {
    commit('DROP_SELECTED_CITY', city);
  },

  setSelectedCities({ commit }, cities) {
    commit('SET_SELECTED_CITIES', cities);
  },
};

export default actions;
