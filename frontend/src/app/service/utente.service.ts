import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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

  autenticaUtente(nickname: String, password: String): Observable<Utente[]> {
    const credenziali = `${nickname}/${password}`;
    return this.apiService.getByAny(this.apiUrl, credenziali);
  }

  /**
   * Recupera l'utente corrente dallo stato locale.
   */
  getUtenteCorrente(): Utente | null {
    return this.utenteSubject.value;
  }

  /**
   * Effettua il logout azzerando lo stato.
   */
  logout(): void {
    this.utenteSubject.next(null);
  }
}
