import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  username = '';
  password = '';

  onLogin(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched(); // marca los campos para mostrar errores
      return;
    }

    if (this.username === 'admin' && this.password === '1234') {
      alert('Inicio de sesión exitoso');
    } else {
      alert('Credenciales incorrectas');
    }
  }
}
