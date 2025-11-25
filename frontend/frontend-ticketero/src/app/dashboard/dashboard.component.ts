import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user';
import { AuthService } from '../services/auth.service';
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
  isEditing: boolean = false;

  // Formulario
  userForm: any = {
    id: null,
    nombre: '',
    apellido: '',
    correo: '',
    password: '',
    idRol: 2, // Por defecto Operador
    active: true
  };

  ngOnInit() {
    this.currentUser = localStorage.getItem('username'); // Tu código original
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe({
      next: (data) => this.users = data,
      error: (e) => console.error('Error cargando usuarios', e)
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
        alert('Usuario actualizado');
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
  
  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    window.location.reload(); // O usar Router para redirigir
  }
}
