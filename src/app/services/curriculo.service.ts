import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Curriculo } from '../models/curriculo';
import { environment } from '../../environments/environment';
import { mapBackendStatus, CurriculoStatus } from '../utils/status-mapper.util';
import { StatusResponse } from '../models/status-response';

@Injectable({ providedIn: 'root' })
export class CurriculoService {
  constructor(private http: HttpClient) {}

  enviarCurriculo(curriculo: Curriculo) {
    return this.http.post(`${environment.apiUrl}/curriculos`, curriculo);
  }

  getStatusCurriculo(): Observable<CurriculoStatus> {
    return this.http
      .get<StatusResponse>(`${environment.apiUrl}/curriculos/status`)
      .pipe(map((res: StatusResponse) => mapBackendStatus(res.status)));
  }

  getMeuCurriculo(): Observable<Curriculo> {
    return this.http.get<Curriculo>(`${environment.apiUrl}/curriculos/meu`);
  }

  getCurriculoPorId(id: number): Observable<Curriculo> {
    return this.http.get<Curriculo>(`${environment.apiUrl}/${id}`);
  }

  atualizarCurriculo(curriculo: Curriculo) {
    return this.http.put(
      `${environment.apiUrl}/curriculos/${curriculo.id}`,
      curriculo
    );
  }
}
