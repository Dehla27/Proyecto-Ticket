import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service'; //

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService); // Inyectamos para usar el logout
  const token = localStorage.getItem('authToken');

  let request = req;

  if (token) {
    request = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      // Si el backend devuelve 401 (No autorizado) o 403 (Prohibido/Token expirado)
      if (error.status === 401 || error.status === 403) {
        console.warn('Token vencido o inválido. Cerrando sesión...');
        
        // 1. Borramos el token sucio
        authService.logout(); 
        
        // 2. Redirigimos al login
        router.navigate(['/login']);
      }
      
      // Propagamos el error para que el componente también se entere si es necesario
      return throwError(() => error);
    })
  );
};