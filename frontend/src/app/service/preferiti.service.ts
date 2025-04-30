import {Injectable} from '@angular/core';
import {ApiService} from '../apiService';
import {Preferiti} from '../model/preferiti';
import {map, Observable} from 'rxjs';
import {Ricetta} from '../model/ricetta';

@Injectable({ providedIn: 'root' })
export class PreferitiService {
  private apiUrl = 'http://localhost:8080/api/preferiti';

  constructor(private apiService: ApiService<Preferiti>) {}

  getPreferitiRicette(email: string): Observable<Ricetta[]> {
    return this.apiService.getByAny(this.apiUrl + "/email", email).pipe(
      map((data: any[]) => data.map(p => p.ricetta))
    );
  }

  addPreferito(email: string, ricettaId: number): Observable<any> {
    return this.apiService.create(this.apiUrl + "/save", {
      utente: { email },
      ricetta: { id: ricettaId }
    });
  }


  deletePreferito(email: string, ricettaId: number): Observable<any> {
    return this.apiService.delete(`${this.apiUrl}/delete/${email}/${ricettaId}`);
  }
}
