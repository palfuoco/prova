import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiService } from '../apiService';
import { Utente } from '../model/utente';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {
  private apiUrl = 'http://localhost:8080/api/utenti';

  private utenteSubject = new BehaviorSubject<Utente[] | null>([]);
  utente$ = this.utenteSubject.asObservable();

  constructor(private apiService: ApiService<Utente>) {}

  autenticaUtente(nickname: string, password: string): void {
    const url = `${this.apiUrl}/autenticazione?nickname=${encodeURIComponent(nickname)}&password=${encodeURIComponent(password)}`;
    this.apiService.getAll(url).subscribe((data) => {
      this.utenteSubject.next(data);
    });
  }

  registraUtente(utente: Utente): void {
    const url = `${this.apiUrl}/registrazione?email=${encodeURIComponent(utente.email)}&nickname=${encodeURIComponent(utente.nickname)}&password=${encodeURIComponent(utente.password)}&regione=${encodeURIComponent(utente.regioneDiResidenza)}`;
    this.apiService.getAll(url).subscribe((data)=> {
      this.utenteSubject.next(data);
    });
  }

  getUtenteCorrente(): Utente[] | null {
    return this.utenteSubject.value;
  }

  logout(): void {
    this.utenteSubject.next(null);
  }
}
