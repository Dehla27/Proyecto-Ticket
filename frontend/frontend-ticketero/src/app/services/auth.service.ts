import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

// --- Interfaces ---
export interface LoginRequest {
  username: string;  // debe coincidir con lo que espera tu backend (puede ser 'email')
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
  private apiUrl = 'http://localhost:8080/api/auth'; // Ajusta si tu backend usa otro prefijo

  // Inicia sesión con las credenciales
  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials);
  }

  // Guarda el token JWT localmente
  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Obtiene el token
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Cierra sesión
  logout(): void {
    localStorage.removeItem('authToken');
  }
}
