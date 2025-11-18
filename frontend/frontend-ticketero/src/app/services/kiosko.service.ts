import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KioskoService {

  private apiUrl = 'http://localhost:8080/api/tickets';

  constructor(private http: HttpClient) {}

  crearTicket(): Observable<any> {
    return this.http.post(`${this.apiUrl}/crear`, {});
  }
}
