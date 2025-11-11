import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  username: string | null = '';

  ngOnInit() {
    // Si guardaste el token en localStorage, aquí puedes leer datos del usuario
    this.username = localStorage.getItem('username');
  }
}

