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
    console.log(payload);
    const selectedCityIndex = state.selectedCities.findIndex((city) => city.id === payload.id);
    console.log(selectedCityIndex);
    if (selectedCityIndex !== -1) {
      state.selectedCities.splice(selectedCityIndex, 1);
    }
    console.log(state.selectedCities);
    storage.set('selectedCities', lodash.cloneDeep(state.selectedCities));
  },

  SET_SELECTED_CITIES(state, payload) {
    state.selectedCities = payload;
  },
};

export default mutation;
