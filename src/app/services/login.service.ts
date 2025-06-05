import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.type';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiURL: string = "http://localhost:8080/auth"

  constructor(private httpClient: HttpClient) { }

  login(email: string, senha: string){
    return this.httpClient.post<LoginResponse>(this.apiURL + "/login", { email, senha }).pipe(
      tap((value) => {
        sessionStorage.setItem('token', value.token);
        sessionStorage.setItem('username', value.name);
      })
    )
  }

  register(cpf: number, email: string, senha: string){
    return this.httpClient.post<LoginResponse>(this.apiURL + "/register", {
      cpf, email, senha }).pipe(
      tap((value) => {
        sessionStorage.setItem('token', value.token);
        sessionStorage.setItem('username', value.name);
      })
    )
  }
}
