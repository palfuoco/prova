import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiService } from '../apiService';
import { Utente } from '../model/utente';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {
  private apiUrl = 'http://localhost:8080/api/utenti';

  private utenteSubject = new BehaviorSubject<Utente | null>(null);
  utente$ = this.utenteSubject.asObservable();

  constructor(private apiService: ApiService<Utente>) {}

  autenticaUtente(nickname: string, password: string): Observable<Utente[]> {
    const credenziali = `${nickname}/${password}`;
    return this.apiService.getByAny(this.apiUrl + "/autenticazione", credenziali);
  }

  getUtenteCorrente(): Utente | null {
    return this.utenteSubject.value;
  }

  logout(): void {
    this.utenteSubject.next(null);
  }
}
