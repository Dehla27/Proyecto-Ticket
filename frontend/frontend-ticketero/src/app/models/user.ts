// esto llama al backend

export interface UserResponse {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  rolNombre: string; // El backend devuelve 'rolNombre', no el objeto rol completo
  active: boolean;
}

export interface CreateUserRequest {
  nombre: string;
  apellido: string;
  correo: string;
  contraseña: string;
  idRol: number; // Necesitarás saber los IDs de los roles (ej: 1=Admin, 2=User)
}

export interface UpdateUserRequest {
  nombre?: string;
  apellido?: string;
  email?: string;
  idRol?: number;
  active?: boolean;
}