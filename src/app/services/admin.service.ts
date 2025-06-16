import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curriculo } from '../models/curriculo';
import { DistribuicaoDashboard } from '../models/distribuicao-dashboard';
import { Page } from '../models/page';
import { environment } from '../../environments/environment';
import { mapBackendStatus, CurriculoStatus } from '../utils/status-mapper.util';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AdminService {
  constructor(private http: HttpClient) {}

  getDistribuicaoEscolaridade(): Observable<DistribuicaoDashboard> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.get<DistribuicaoDashboard>(`${environment.apiUrl}/admin/relatorios/escolaridade`, { headers });
  }

  getDistribuicaoStatus(): Observable<DistribuicaoDashboard> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.get<DistribuicaoDashboard>(`${environment.apiUrl}/admin/relatorios/situacao`, { headers });
  }

  getTodosCurriculos(page: number = 0, size: number = 10): Observable<Page<Curriculo>> {
  const token = sessionStorage.getItem('token');
  const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  return this.http.get<Page<Curriculo>>(
    `${environment.apiUrl}/admin/relatorios/candidatos?page=${page}&size=${size}`,
    { headers }
  ).pipe(
    map((page: Page<Curriculo>) => ({
      ...page,
      content: page.content.map((c: Curriculo) => ({
        ...c,
        status: mapBackendStatus(c.status) ?? 'analise'
      }))
    }))
  );
}

  aprovarCurriculo(id: number): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.put(`${environment.apiUrl}/admin/relatorios/candidatos/${id}/aprovar`, {}, { headers });
  }

  reprovarCurriculo(id: number): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.put(`${environment.apiUrl}/admin/relatorios/candidatos/${id}/reprovar`, {}, { headers });
  }
}
