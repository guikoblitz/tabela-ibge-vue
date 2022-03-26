export interface StateDTO {
  id: number;

  nome: string;

  regiao: RegiaoDTO;

  sigla: string;
}

interface RegiaoDTO {
  id: number;

  nome: string;

  sigla: string;
}
