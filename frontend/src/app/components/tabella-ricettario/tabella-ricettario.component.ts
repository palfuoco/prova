import { Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import {ApiService} from '../../apiService';
import {RicetteService} from './tabella-ricettario.service';
import {CardRicettaComponent, Ricetta} from '../card-ricetta/card-ricetta.component';


@Component({
  selector: 'app-tabella-ricettario',
  standalone: true,
  imports: [NgForOf, CardRicettaComponent],
  templateUrl: './tabella-ricettario.component.html',
  styleUrls: ['./tabella-ricettario.component.css']
})
export class TabellaRicettarioComponent implements OnInit {
  public ricette: Ricetta[] = [];
  private apiUrl = 'http://localhost:8080/api/ricette';

  constructor(private apiService: ApiService<Ricetta>, private ricetteService: RicetteService) {}

  ngOnInit(): void {
    this.apiService.getAll(this.apiUrl + "/all").subscribe((data) => {
      this.ricette = data;
      this.ricetteService.updateNumRicette(this.ricette.length);
    });
  }

  showRicetteByTipo(tipo: string): void {
    this.apiService.getByAny(this.apiUrl + "/portata",tipo).subscribe((data) => {
      this.ricette = data;
      this.ricetteService.updateNumRicette(this.ricette.length);
    });
  }

  showRicettaByTempoPreparazione(tempoPreparazione:number):void {
    this.apiService.getByAny(this.apiUrl + "/tempo_preparazione", tempoPreparazione).subscribe((data) => {
      this.ricette = data;
      this.ricetteService.updateNumRicette(this.ricette.length);
    });
  }
}
