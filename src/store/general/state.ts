import { City } from 'src/common/interfaces/City';

export interface StateInitialInterface {
  selectedCities: City[];
}

function state(): StateInitialInterface {
  return {
    selectedCities: [],
  };
}

export default state;
