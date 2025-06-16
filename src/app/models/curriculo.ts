import { Escolaridade } from '../types/escolaridade.type';
import { NivelCompetencia } from '../types/nivel-competencia.type';
import { CurriculoStatus } from '../utils/status-mapper.util';

export interface Competencia {
  descricao: string;
  nivel: NivelCompetencia;
}

export interface Curriculo {
  status: CurriculoStatus;
  id?: number;
  nome: string;
  dataNascimento: string;
  telefone: number;
  email?: string;
  escolaridade: Escolaridade;
  funcao: string;
  competencias: Competencia[];
}
