import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recensione } from '../model/recensione';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RecensioniService {
    private baseUrl = 'http://localhost:8080/api/recensioni';

    constructor(private http: HttpClient) {}

    // Recupera tutte le recensioni per una data ricetta
    getRecensioniByRicettaId(idRicetta: number): Observable<Recensione[]> {
        return this.http.get<Recensione[]>(`${this.baseUrl}/ricetta/${idRicetta}`);
    }

// POST: aggiornata per combaciare col nuovo endpoint Java
    addRecensione(idRicetta: number, recensione: Recensione): Observable<Recensione> {
        return this.http.post<Recensione>(`${this.baseUrl}/ricetta/${idRicetta}`, recensione);
    }
}
