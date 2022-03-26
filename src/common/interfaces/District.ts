import { State } from './State';

export interface District {
  id: string;

  name: string;

  city: City;
}

interface City {
  id: string;

  name: string;

  microregion: Microregion;

  immediateRegion: ImmediateRegion;
}

interface Microregion {
  id: number;

  name: string;

  mesoRegion: MesoRegion;
}

interface MesoRegion {
  id: number;

  name: string;

  uf: State;
}

interface ImmediateRegion {
  id: number;

  name: string;

  intermediateRegion: IntermediateRegion;
}

interface IntermediateRegion {
  id: number;

  name: string;

  uf: State;
}
