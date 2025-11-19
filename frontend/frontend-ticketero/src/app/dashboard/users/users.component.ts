import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  users: any[] = [];

  selectedUser: any = null; // para editar

  constructor() {}

  ngOnInit() {
    // más adelante aquí llamaremos al backend
    this.loadUsers();
  }

  loadUsers() {
    // SIMULACIÓN POR AHORA
    this.users = [
      { id: 1, nombre: 'Ana', correo: 'ana@mail.com', rol: 'Admin' },
      { id: 2, nombre: 'Luis', correo: 'luis@mail.com', rol: 'Empleado' }
    ];
  }

  nuevoUsuario() {
    this.selectedUser = { id: 0, nombre: '', correo: '', rol: '' };
  }

  editarUsuario(user: any) {
    this.selectedUser = {...user};
  }

  guardarUsuario() {
    if (this.selectedUser.id === 0) {
      // crear
      this.selectedUser.id = this.users.length + 1;
      this.users.push({...this.selectedUser});
    } else {
      // actualizar
      const index = this.users.findIndex(u => u.id === this.selectedUser.id);
      this.users[index] = {...this.selectedUser};
    }

    this.selectedUser = null;
  }

  cancelar() {
    this.selectedUser = null;
  }
}
