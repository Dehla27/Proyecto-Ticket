import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user';
import { UserResponse, CreateUserRequest, UpdateUserRequest } from '../models/user';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  private userService = inject(UserService);

  // Estado
  users: UserResponse[] = [];
  currentUser: string | null = '';

  //Variables para el control de acceso
  isAdmin: boolean = false; //¿Es administrador?
  isLoading: boolean = true; //¿Estamos cargando datos?

  // Formulario
  isEditing = false;
  userForm: any = {
    id: null,
    nombre: '',
    apellido: '',
    correo: '',
    password: '',
    idRol: 2,
    active: true
  };

  ngOnInit() {
    //Recupera el usuario guardado en el Login
    this.currentUser = localStorage.getItem('username');
    this.loadUsers();
  }

  loadUsers() {
    this.isLoading = true; //Iniciamos carga
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;

        // --- VALIDACIÓN DE ROL ---
        // Buscamos al usuario actual en la lista para ver su rol
        const myProfile = this.users.find(u => u.correo === this.currentUser);
        
        if (myProfile && myProfile.rolNombre.toUpperCase() === 'ADMINISTRADOR') {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }
        
        this.isLoading = false; // Terminamos carga
      },
      error: (err) => {
        console.error('Error cargando usuarios', err);
        this.isLoading = false;
      }
    });
  }

  onSubmit() {
    if (this.isEditing) {
      this.update();
    } else {
      this.create();
    }
  }

  create() {
    // Mapear formulario a RegisterRequest del backend
    const request: CreateUserRequest = {
      nombre: this.userForm.nombre,
      apellido: this.userForm.apellido,
      correo: this.userForm.correo,
      contraseña: this.userForm.password,
      idRol: Number(this.userForm.idRol)
    };

    this.userService.createUser(request).subscribe({
      next: () => {
        alert('Usuario creado exitosamente');
        this.resetForm();
        this.loadUsers();
      },
      error: (err) => alert('Error al crear: ' + err.message)
    });
  }

  update() {
    // Mapear formulario a UpdateUserRequest del backend
    const request: UpdateUserRequest = {
      nombre: this.userForm.nombre,
      apellido: this.userForm.apellido,
      email: this.userForm.correo,
      idRol: Number(this.userForm.idRol),
      active: this.userForm.active
    };

    this.userService.updateUser(this.userForm.id, request).subscribe({
      next: () => {
        alert('Usuario actualizado correctamente');
        this.resetForm();
        this.loadUsers();
      },
      error: (err) => alert('Error al actualizar: ' + err.message)
    });
  }

  editUser(user: UserResponse) {
    this.isEditing = true;
    // Convertimos rolNombre a idRol (Asumiendo 1=ADMINISTRADOR, 2=OPERADOR según tu lógica)
    const roleId = user.rolNombre === 'ADMINISTRADOR' ? 1 : 2; 

    this.userForm = {
      id: user.id,
      nombre: user.nombre,
      apellido: user.apellido,
      correo: user.correo,
      contraseña: '', // No mostramos la contraseña
      idRol: roleId,
      active: user.active
    };
  }

  deleteUser(id: number) {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => this.loadUsers(),
        error: (err) => alert('Error al eliminar: ' + err.message)
      });
    }
  }

  resetForm() {
    this.isEditing = false;
    this.userForm = { id: null, nombre: '', apellido: '', correo: '', contraseña: '', idRol: 2, active: true };
  }
}
