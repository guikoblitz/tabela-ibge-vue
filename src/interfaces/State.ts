export interface State {
  id: number;

  nome: string;

  regiao: Regiao;

  sigla: string;
}

export interface Regiao {
  id: number;

  nome: string;

  sigla: string;
}
