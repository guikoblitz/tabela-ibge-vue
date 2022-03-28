import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { StateInitialInterface } from './state';

const getters: GetterTree<StateInitialInterface, StateInterface> = {
  someAction(/* context */) {
    // your code
  },
};

export default getters;
