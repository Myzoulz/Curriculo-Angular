export interface Competencia {
  descricao: string;
  nivel: string;
}

export interface Curriculo {
  id?: number;
  nome: string;
  dataNascimento: string;
  telefone: string;
  escolaridade: string;
  funcao: string;
  competencias: Competencia[];
}
