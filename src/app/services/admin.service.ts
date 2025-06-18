import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curriculo } from '../models/curriculo';
import { DistribuicaoDashboard } from '../models/distribuicao-dashboard';
import { Page } from '../models/page';
import { environment } from '../../environments/environment';
import { mapBackendStatus} from '../utils/status-mapper.util';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AdminService {
  constructor(private http: HttpClient) {}

  getDistribuicaoEscolaridade(): Observable<DistribuicaoDashboard> {
    return this.http.get<DistribuicaoDashboard>(
      `${environment.apiUrl}/admin/relatorios/escolaridade`
    );
  }

  getDistribuicaoStatus(): Observable<DistribuicaoDashboard> {
    return this.http.get<DistribuicaoDashboard>(
      `${environment.apiUrl}/admin/relatorios/situacao`
    );
  }

  getTodosCurriculos(
    page: number = 0,
    size: number = 10
  ): Observable<Page<Curriculo>> {
    return this.http
      .get<Page<Curriculo>>(
        `${environment.apiUrl}/admin/relatorios/candidatos?page=${page}&size=${size}`
      )
      .pipe(
        map((page: Page<Curriculo>) => ({
          ...page,
          content: page.content.map((c: Curriculo) => ({
            ...c,
            status: mapBackendStatus(c.status) ?? 'analise',
          })),
        }))
      );
  }

  aprovarCurriculo(id: number): Observable<any> {
    return this.http.put(
      `${environment.apiUrl}/admin/relatorios/candidatos/${id}/aprovar`,
      {}
    );
  }

  reprovarCurriculo(id: number): Observable<any> {
    return this.http.put(
      `${environment.apiUrl}/admin/relatorios/candidatos/${id}/reprovar`,
      {}
    );
  }
}
