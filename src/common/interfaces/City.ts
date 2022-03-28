import { State } from './State';

export interface City {
  id: string;

  name: string;

  microRegion: Microregion;

  immediateRegion: ImmediateRegion;

  selected: boolean;
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
