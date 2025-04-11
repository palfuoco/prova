import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {ApiService} from '../apiService';
import {Ricetta} from '../model/ricetta';

@Injectable({
  providedIn: 'root'
})
export class RicetteService {
  private apiUrl = 'http://localhost:8080/api/ricette';
  private numRicetteSource = new BehaviorSubject<number>(0);
  numRicette$ = this.numRicetteSource.asObservable();

  private ricetteSubject = new BehaviorSubject<Ricetta[]>([]);
  ricette$ = this.ricetteSubject.asObservable();

  constructor(private apiService: ApiService<Ricetta>) {}

  updateNumRicette(count: number) {
    this.numRicetteSource.next(count);
  }

  showRicetteByTipo(tipo: string): void {
    this.apiService.getByAny(this.apiUrl + "/portata",tipo).subscribe((data) => {
      this.ricetteSubject.next(data);
      this.updateNumRicette(data.length);
    });
  }

  showRicettaByTempoPreparazione(tempoPreparazione:number):void {
    this.apiService.getByAny(this.apiUrl + "/tempo_preparazione", tempoPreparazione).subscribe((data) => {
      this.ricetteSubject.next(data);
      this.updateNumRicette(data.length);
    });
  }

  showRicettaByRegioni(regioni:string[]):void {
    const params = regioni.map(r => `regioni=${encodeURIComponent(r)}`).join('&');
    const url = `${this.apiUrl}/regioni?${params}`;

    this.apiService.getAll(url).subscribe(data => {
      this.ricetteSubject.next(data);
      this.updateNumRicette(data.length);
    });
  }

  showRicettaByRegione(regione:String):void{
    this.apiService.getByAny(this.apiUrl + "/regione", regione).subscribe((data) => {
      this.ricetteSubject.next(data);
      this.updateNumRicette(data.length);
    });
  }

  showAll():void {
    this.apiService.getAll(this.apiUrl + "/all").subscribe((data) => {
      this.ricetteSubject.next(data);
      this.updateNumRicette(data.length);
    });
  }
}
