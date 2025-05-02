import {Injectable} from '@angular/core';
import {ApiService} from '../apiService';
import {Preferiti} from '../model/preferiti';
import {BehaviorSubject, map, Observable, of} from 'rxjs';
import {Ricetta} from '../model/ricetta';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PreferitiService {
  private apiUrl = 'http://localhost:8080/api/preferiti';

  constructor(private apiService: ApiService<Preferiti>, private http: HttpClient) {}
  private listaAggiornata = new BehaviorSubject<void>(undefined);

  getPreferitiRicette(email: string): Observable<Ricetta[]> {
    return this.apiService.getByAny(this.apiUrl + "/email", email).pipe(
      map((data: any[]) => data.map(p => p.ricetta))
    );
  }

  isPreferito(email: string, idRicetta: number): Observable<boolean> {
    return this.apiService.getByTwoValues(this.apiUrl + "/check", email, idRicetta);
  }

  addPreferito(email: string, ricettaId: number): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/save`, {
      utente: { email },
      ricetta: { id: ricettaId }
    }, {
      responseType: 'text' as 'json'
    });
  }



  deletePreferito(email: string, ricettaId: number): Observable<any> {
    return this.apiService.delete(`${this.apiUrl}/delete/${email}/${ricettaId}`);
  }

  refreshLista(): void {
    this.listaAggiornata.next();
  }

  onListaAggiornata(): Observable<void> {
    return this.listaAggiornata.asObservable();
  }
}
