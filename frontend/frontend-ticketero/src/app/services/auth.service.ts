import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// --- Interfaces ---
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  username: string;
}

// --- Servicio de autenticación ---
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  //URL del backend
  private apiUrl = 'http://localhost:8080/api/auth/login';

  constructor() {}

  // Inicia sesión con las credenciales
  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, credentials);
  }

  // Guarda el token JWT localmente
  saveToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  // Obtiene el token
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Cierra sesión
  logout() {
    localStorage.removeItem('authToken');
  }
}
