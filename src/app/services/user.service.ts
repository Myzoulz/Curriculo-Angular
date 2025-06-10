import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario';
import { Curriculo } from '../models/curriculo';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  getUsuario(): Observable<Usuario> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Usuario>("http://localhost:8080/user", { headers });
  }

  enviarCurriculo(curriculo: Curriculo) {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post('http://localhost:8080/curriculos', curriculo, { headers });
  }

  getStatusCurriculo(): Observable<'enviado' | 'analise' | 'aprovado' | 'reprovado' | null> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<{ status: string }>('http://localhost:8080/curriculos/status', { headers })
      .pipe(map((res: { status: string }) => res.status as 'enviado' | 'analise' | 'aprovado' | 'reprovado' | null));
  }

  getMeuCurriculo(): Observable<Curriculo> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Curriculo>('http://localhost:8080/curriculos/meu', { headers });
  }

  getCurriculoPorId(id: number): Observable<Curriculo> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Curriculo>(`http://localhost:8080/curriculos/${id}`, { headers });
  }

  atualizarCurriculo(curriculo: Curriculo) {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.put(`http://localhost:8080/curriculos/${curriculo.id}`, curriculo, { headers });
  }
}
