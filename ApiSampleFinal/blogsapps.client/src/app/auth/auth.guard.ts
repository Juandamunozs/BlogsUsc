import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const userRole = localStorage.getItem('rol');
    console.log('El rol es: ', userRole);

    if (userRole) {
      return true; 
    } else {
      this.router.navigate(['/Login']);
      console.log('No tienes permisos para acceder a esta página');
      return false; 
    }
  }
}