import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KioskoService } from '../services/kiosko.service';

@Component({
  selector: 'app-kiosko',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kiosko.component.html',
  styleUrls: ['./kiosko.component.css']
})

export class KioskoComponent {

  ticket: any = null;

  constructor() {}

  // Método que llaman tus botones del HTML (ej: (click)="generarTicket('Cajas')")
  generarTurno(servicio: string) {
    console.log('Generando turno para:', servicio);
    
    // Simulamos la creación del ticket
    this.ticket = {
      numero: 'A-' + Math.floor(Math.random() * 100),
      servicio: servicio,
      fecha: new Date()
    };

    // Opcional: Limpiar el mensaje después de 5 segundos
    setTimeout(() => {
      this.ticket = null;
    }, 5000);
  }
}


 /* generarTurno() {
    // 🔹 Simulación mientras el backend no está listo
    const numero = Math.floor(Math.random() * 900 + 100); // genera de 100 a 999
    this.ticket = 'T-' + numero;

    console.log('Ticket generado:', this.ticket);
  }
  */
