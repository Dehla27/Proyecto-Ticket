import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('authToken');

  // Si hay token, lo agrega al header
  const authReq = token
    ? req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      })
    : req;

  // Maneja el flujo normal y los errores
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        console.warn('⚠️ Token inválido o expirado, cerrando sesión...');
        localStorage.removeItem('authToken');
        router.navigate(['/login']); // 👈 redirige automáticamente al login
      }
      return throwError(() => error);
    })
  );
};
