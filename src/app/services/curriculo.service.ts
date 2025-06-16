import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(`${environment.apiUrl}/curriculos`, curriculo, { headers });
  }

  getStatusCurriculo(): Observable<CurriculoStatus | null> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<StatusResponse>(`${environment.apiUrl}/curriculos/status`, { headers })
      .pipe(
        map((res: StatusResponse) => mapBackendStatus(res.status))
      );
  }

  getMeuCurriculo(): Observable<Curriculo> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Curriculo>(`${environment.apiUrl}/curriculos/meu`, { headers });
  }

  getCurriculoPorId(id: number): Observable<Curriculo> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Curriculo>(`${environment.apiUrl}/${id}`, { headers });
  }

  atualizarCurriculo(curriculo: Curriculo) {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.put(`${environment.apiUrl}/curriculos/${curriculo.id}`, curriculo, { headers });
  }
}
