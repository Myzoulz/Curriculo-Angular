import { Escolaridade } from '../types/escolaridade.type';
import { CurriculoStatus } from '../utils/status-mapper.util';
import { Competencia } from './competencia';

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
