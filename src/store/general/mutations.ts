import { MutationTree } from 'vuex';
import { StateInitialInterface } from './state';
import lodash from 'lodash';
import Storage from '../../util/LocalStorageUtil';
const storage = new Storage();

const mutation: MutationTree<StateInitialInterface> = {
  PUSH_SELECTED_CITY(state, payload) {
    const selectedCity = state.selectedCities.find((city) => city.id === payload.id);
    if (!selectedCity) {
      state.selectedCities.push(payload);
    }
    storage.set('selectedCities', lodash.cloneDeep(state.selectedCities));
  },

  DROP_SELECTED_CITY(state, payload) {
    const updatedArray = state.selectedCities.filter((city) => city.id !== payload.id);
    console.log(updatedArray);
    state.selectedCities.push(payload);
    storage.set('selectedCities', lodash.cloneDeep(state.selectedCities));
  },

  SET_SELECTED_CITIES(state, payload) {
    state.selectedCities = payload;
  },
};

export default mutation;
