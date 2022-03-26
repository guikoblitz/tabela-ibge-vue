import { StateDTO } from './StateDTO';

export interface DistrictDTO {
  id: string;

  nome: string;

  municipio: Municipio;
}

interface Municipio {
  id: string;

  nome: string;

  microrregiao: Microrregiao;

  regiaoImediata: RegiaoImediata;
}

interface Microrregiao {
  id: number;

  nome: string;

  mesorregiao: Mesorregiao;
}

interface Mesorregiao {
  id: number;

  nome: string;

  uf: StateDTO;
}

interface RegiaoImediata {
  id: number;

  nome: string;

  regiaoIntermediaria: RegiaoIntermediaria;
}

interface RegiaoIntermediaria {
  id: number;

  nome: string;

  uf: StateDTO;
}
