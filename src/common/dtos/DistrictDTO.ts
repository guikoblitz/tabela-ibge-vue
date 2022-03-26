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

  'regiao-imediata': RegiaoImediata;
}

interface Microrregiao {
  id: number;

  nome: string;

  mesorregiao: Mesorregiao;
}

interface Mesorregiao {
  id: number;

  nome: string;

  UF: StateDTO;
}

interface RegiaoImediata {
  id: number;

  nome: string;

  'regiao-intermediaria': RegiaoIntermediaria;
}

interface RegiaoIntermediaria {
  id: number;

  nome: string;

  UF: StateDTO;
}
