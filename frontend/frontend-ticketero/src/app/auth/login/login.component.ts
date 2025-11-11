import { Component } from '@angular/core';
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
export class LoginComponent {
  username = '';
  password = '';
  message = '';

  constructor(private authService: AuthService) {}
  
  onLogin(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      this.message = 'Por favor, completa todos los campos.';
      return;
    }

    this.authService.login({ username: this.username, password: this.password }).
      subscribe({
        next: (response: LoginResponse) => {
          console.log('Login exitoso:', response);
          this.authService.saveToken(response.token);
          this.message = `Bienvenido, ${response.username}`;
          alert(this.message);
        },
        error: (err) => {
          console.error('Error en el login:', err);
          if (err.status === 401){
            this.message = 'Credenciales incorrectas.';
          } else if(err.status === 0){
            this.message = 'Error de conexión con el servidor.';
          } else {
            this.message = 'Error inesperado.';
          }
          alert(this.message);
        }
      });
  }
}
