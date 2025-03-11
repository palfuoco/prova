import { Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import {ApiService} from '../../apiService';

export interface Ricetta {
  id: number;
  nome: string;
  descrizione: string,
  ingredienti: string;
  tempoPreparazione: number
  provincia: string,
  regione: string,
  difficolta: string,
  tipo: string,
  descrizionePreparazione: string,
  img: string;
}

@Component({
  selector: 'app-tabella-ricettario',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './tabella-ricettario.component.html',
  styleUrls: ['./tabella-ricettario.component.css']
})
export class TabellaRicettarioComponent implements OnInit {
  path_img: string = "assets/img_ricette/";
  ricette: Ricetta[] = [];
  private apiUrl = 'http://localhost:8080/api/ricette';

  constructor(private apiService: ApiService<Ricetta>) {}

  ngOnInit(): void {
    this.apiService.getAll(this.apiUrl + "/all").subscribe((data) => {
      this.ricette = data;
    });
  }

  showRicetteByTipo(tipo: string): void {
    this.apiService.getByAny(this.apiUrl + "/portata",tipo).subscribe((data) => {
      this.ricette = data;
    })
  }
}
