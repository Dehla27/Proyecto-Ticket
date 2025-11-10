import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService, LoginResponse } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  username = '';
  password = '';

  private authService = inject(AuthService);

  onLogin(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    this.authService.login({ username: this.username, password: this.password })
      .subscribe({
        next: (response: LoginResponse) => {
          console.log('Login exitoso:', response);
          this.authService.saveToken(response.token);
          alert('Inicio de sesión exitoso. Token guardado.');
        },
        error: (err) => {
          console.error('Error en el login:', err);
          alert('Credenciales incorrectas o error del servidor.');
        }
      });
  }
}
