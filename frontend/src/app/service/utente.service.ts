import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiService } from '../apiService';
import { Utente } from '../model/utente';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {
  private apiUrl = 'http://localhost:8080/api/utenti';

  private utenteSubject = new BehaviorSubject<Utente | null>(null); // 👈 uno solo, non un array
  utente$ = this.utenteSubject.asObservable();

  constructor(private apiService: ApiService<Utente>) {}

  autenticaUtente(nickname: string, password: string): void {
    const url = `${this.apiUrl}/autenticazione?nickname=${encodeURIComponent(nickname)}&password=${encodeURIComponent(password)}`;
    this.apiService.getAll(url).subscribe((data) => {
      if (data.length > 0) {
        this.utenteSubject.next(data[0]); // 👈 prendi il primo utente
      } else {
        this.utenteSubject.next(null); // 👈 nessun utente trovato
      }
    });
  }

  getUtenteCorrente(): Utente | null {
    return this.utenteSubject.value;
  }

  setUtenteCorrente(utente: Utente): void {
    this.utenteSubject.next(utente);
  }

  logout(): void {
    this.utenteSubject.next(null);
  }
}
