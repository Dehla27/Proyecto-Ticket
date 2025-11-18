// src/app/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user';
import { UserResponse, CreateUserRequest, UpdateUserRequest } from '../models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
  // NOTA: No usamos 'standalone: true' ni 'imports' aquí porque es un componente clásico.
})
export class DashboardComponent implements OnInit {
  
  // --- Variables de Control de Acceso y Estado ---
  isAdmin: boolean = false;   // Determina si mostramos el panel de admin
  isLoading: boolean = true;  // Para mostrar "Cargando..." mientras verificamos el rol
  currentUser: string | null = '';

  // --- Variables para el CRUD de Usuarios ---
  users: UserResponse[] = []; // Lista de usuarios traída del backend
  isEditing: boolean = false; // Bandera para saber si estamos editando o creando

  // Objeto que conecta con los inputs del formulario
  userForm: any = {
    id: null,
    nombre: '',
    apellido: '',
    correo: '',
    contraseña: '',
    idRol: 1, // Valor por defecto (ej: 1 para Admin, 2 para Operador)
    active: true
  };

  constructor(
    private userService: UserService, 
    private router: Router
  ) {}

  ngOnInit() {
    // Recuperamos el email guardado en el login para mostrarlo en la cabecera
    this.currentUser = localStorage.getItem('currentUserEmail');
    
    // Iniciamos la verificación de permisos
    this.checkPermissions();
  }

  // --- PASO 3: Lógica de Protección de Rutas ---
  checkPermissions() {
    this.isLoading = true;
    this.userService.isAdmin().subscribe({
      next: (isAdmin) => {
        this.isAdmin = isAdmin;
        this.isLoading = false;

        if (isAdmin) {
          // Solo si es admin, cargamos la lista de usuarios
          this.loadUsers();
        } else {
          console.warn('Usuario no administrador. Acceso a CRUD restringido.');
        }
      },
      error: (err) => {
        console.error('Error verificando permisos:', err);
        this.isLoading = false;
        this.isAdmin = false; // Por seguridad, denegamos si hay error
      }
    });
  }

  // --- Lógica del CRUD ---

  loadUsers() {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => console.error('Error al cargar usuarios', err)
    });
  }

  onSubmit() {
    if (this.isEditing) {
      this.updateUser();
    } else {
      this.createUser();
    }
  }

  createUser() {
    const newUser: CreateUserRequest = {
      nombre: this.userForm.nombre,
      apellido: this.userForm.apellido,
      correo: this.userForm.correo,
      contraseña: this.userForm.contraseña,
      idRol: +this.userForm.idRol // El '+' convierte el string del select a número
    };

    this.userService.createUser(newUser).subscribe({
      next: () => {
        alert('Usuario creado con éxito');
        this.loadUsers(); // Recargamos la tabla
        this.resetForm(); // Limpiamos el formulario
      },
      error: (err) => alert('Error al crear usuario: ' + (err.error?.message || err.message))
    });
  }

  updateUser() {
    const updatedData: UpdateUserRequest = {
      nombre: this.userForm.nombre,
      apellido: this.userForm.apellido,
      email: this.userForm.correo,
      active: this.userForm.active,
      idRol: +this.userForm.idRol
    };

    this.userService.updateUser(this.userForm.id, updatedData).subscribe({
      next: () => {
        alert('Usuario actualizado correctamente');
        this.loadUsers();
        this.resetForm();
      },
      error: (err) => alert('Error al actualizar: ' + (err.error?.message || err.message))
    });
  }

  editUser(user: UserResponse) {
    this.isEditing = true;
    // Rellenamos el formulario con los datos del usuario seleccionado
    this.userForm = {
      id: user.id,
      nombre: user.nombre,
      apellido: user.apellido,
      correo: user.correo,
      contraseña: '', // La contraseña no se edita aquí directamente por seguridad
      idRol: 1, // TODO: Aquí deberías asignar el ID real basado en user.rolNombre si es necesario
      active: user.active
    };
  }

  deleteUser(id: number) {
    if(confirm('¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.loadUsers(); // Recargamos la tabla para que desaparezca el usuario
        },
        error: (err) => alert('Error al eliminar el usuario.')
      });
    }
  }

  resetForm() {
    this.isEditing = false;
    this.userForm = { 
      id: null, 
      nombre: '', 
      apellido: '', 
      correo: '', 
      contraseña: '', 
      idRol: 1, 
      active: true 
    };
  }

  logout() {
    this.userService.logout(); // Asegúrate de que este método limpie el localStorage en el servicio
    this.router.navigate(['/login']);
  }
}