import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario';
import { Curriculo } from '../models/curriculo';
import { environment } from '../../environments/environment';
import { mapBackendStatus, CurriculoStatus } from '../utils/status-mapper.util';
import { StatusResponse } from '../models/status-response';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  getUsuario(): Observable<Usuario> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Usuario>(`${environment.apiUrl}/user`, { headers });
  }
}
