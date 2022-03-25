import { State } from './State';

export interface District {
  id: string;

  nome: string;

  municipio: Municipio;
}

export interface Municipio {
  id: string;

  nome: string;

  microrregiao: Microrregiao;

  regiaoImediata: RegiaoImediata;
}

export interface Microrregiao {
  id: number;

  nome: string;

  mesorregiao: Mesorregiao;
}

export interface Mesorregiao {
  id: number;

  nome: string;

  uf: State;
}

export interface RegiaoImediata {
  id: number;

  nome: string;

  regiaoIntermediaria: RegiaoIntermediaria;
}

export interface RegiaoIntermediaria {
  id: number;

  nome: string;

  uf: State;
}
