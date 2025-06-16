import { CurriculoStatus } from '../utils/status-mapper.util';

export interface StatusResponse {
  status: CurriculoStatus | string;
}
