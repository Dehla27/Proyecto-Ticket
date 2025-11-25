// src/app/services/user.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserResponse, CreateUserRequest, UpdateUserRequest } from '../models/user'; // Ajusta la ruta
import { map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private http = inject(HttpClient);
  
  //Endpoints
  private apiUrl = 'http://localhost:8080/api/users';
  private authUrl = 'http://localhost:8080/api/auth';

  constructor() { }

  // LISTAR (GET)
  getAllUsers(): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(this.apiUrl);
  }

  // CREAR (Create) - Ojo: Usa el endpoint de AuthController
  createUser(user: CreateUserRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.authUrl}/register`, user);
  }

  // ACTUALIZAR (Update)
  updateUser(id: number, user: UpdateUserRequest): Observable<UserResponse> {
    return this.http.put<UserResponse>(`${this.apiUrl}/${id}`, user);
  }

  // BORRAR (Delete)
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  //Método auxiliar para obtener el usuario logueado actualmente
  getCurrentUser(): Observable<UserResponse | undefined> {
    const email = localStorage.getItem('currentUserEmail');
    
    if (!email) {
      return of(undefined); // No hay usuario guardado
    }

    //Consumir el endpoint y buscamos el correo
    return this.getAllUsers().pipe(
      map((users: UserResponse[]) => users.find(u => u.correo === email))
    );
  }

  // Método para verificar si es Admin (devuelve true/false)
  isAdmin(): Observable<boolean> {
    return this.getCurrentUser().pipe(
      map(user => {
        if (!user) return false;
        // IMPORTANTE: Ajusta 'ADMINISTRADOR' al nombre exacto que tengas en tu base de datos (tabla 'rol')
        // Puede ser 'ADMIN', 'ROLE_ADMIN', 'Administrador', etc.
        return user.rolNombre?.toUpperCase() === 'ADMINISTRADOR'; 
      })
    );
  }

  logout() {
    // Borramos el token y el email del usuario para cerrar sesión
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUserEmail');
  }
}