import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, of} from 'rxjs';
import { ApiService } from '../apiService';
import { Utente } from '../model/utente';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {
  private apiUrl = 'http://localhost:8080/api/utenti';

  private utenteSubject = new BehaviorSubject<Utente | null>(null);
  utente$ = this.utenteSubject.asObservable();

  constructor(private apiService: ApiService<Utente>) {
    const utenteSalvato = localStorage.getItem('utente');
    if (utenteSalvato) {
      const utente = JSON.parse(utenteSalvato);
      this.utenteSubject.next(utente);
    }
  }

  autenticaUtente(email: string, password: string): Observable<boolean> {
    const url = `${this.apiUrl}/autenticazione?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
    return this.apiService.getAll(url).pipe(
      map((data) => {
        if (data.length > 0) {
          this.setUtenteCorrente(data[0]);
          return true;
        } else {
          this.logout();
          return false;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.logout();
          return of(false);
        }
        throw error;
      })
    );
  }

  getUtenteCorrente(): Utente | null {
    return this.utenteSubject.value;
  }

  setUtenteCorrente(utente: Utente): void {
    this.utenteSubject.next(utente);
    localStorage.setItem('utente', JSON.stringify(utente));
  }
  registraUtente(utente: Utente): Observable<HttpResponse<string>> {
    const url = `${this.apiUrl}/registrazione?email=${encodeURIComponent(utente.email)}&nickname=${encodeURIComponent(utente.nickname)}&password=${encodeURIComponent(utente.password)}&regione=${encodeURIComponent(utente.regioneDiResidenza)}`;
    return this.apiService.http.get(url, { observe: 'response' , responseType: 'text'});
  }

  logout(): void {
    this.utenteSubject.next(null);
    localStorage.removeItem('utente');
  }
}
