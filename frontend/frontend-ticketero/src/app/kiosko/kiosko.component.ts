import { Component } from '@angular/core';
//import { CommonModule } from '@angular/common';
import { KioskoService } from '../services/kiosko.service';

@Component({
  selector: 'app-kiosko',
  templateUrl: './kiosko.component.html',
  styleUrls: ['./kiosko.component.css']
})
export class KioskoComponent {

  ticket: string | null = null;

  generarTurno() {
    // 🔹 Simulación mientras el backend no está listo
    const numero = Math.floor(Math.random() * 900 + 100); // genera de 100 a 999
    this.ticket = 'T-' + numero;

    console.log('Ticket generado:', this.ticket);
  }
  /*constructor(private kioskoService: KioskoService) {}

  generarTicket() {
    this.kioskoService.crearTicket().subscribe({
      next: (data) => {
        this.message = `Tu ticket es: ${data.numero}`;
      },
      error: () => {
        this.message = 'Error al generar ticket';
      }
    });*/
  }
