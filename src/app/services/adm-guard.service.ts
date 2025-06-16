import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AdmGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = sessionStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.roles && payload.roles.includes('ADMIN')) {
      return true;
    }
    this.router.navigate(['/home']);
    return false;
  }
}
