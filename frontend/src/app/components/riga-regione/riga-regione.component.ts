import {Component, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import {ApiService} from '../../apiService';
import {CardRicettaComponent} from '../card-ricetta/card-ricetta.component';
import {Ricetta} from '../../model/ricetta';
import {RicetteService} from '../../service/ricette.service';

@Component({
  selector: 'app-riga-regione',
  imports: [NgForOf, CardRicettaComponent],
  templateUrl: './riga-regione.component.html',
  standalone: true,
  styleUrl: './riga-regione.component.css'
})
export class RigaRegioneComponent implements OnInit {
  public regioni: String[] = ['Calabria','Sardegna', 'Sicilia', 'Campania', 'Basilicata', 'Lazio', 'Umbria', 'Lombardia', 'Marche', 'Piemonte', 'Abruzzo', 'Trentino Alto-Adige', 'Veneto', 'Toscana', 'Liguria', 'Emilia Romagna', "Valle d'Aosta", 'Molise', 'Puglia', 'Friuli Venezia Giulia'];
  public regione: String="";
  public ricette: Ricetta[] = []
  private apiUrl = 'http://localhost:8080/api/ricette';

  constructor(private apiService: ApiService<Ricetta>, private ricetteService: RicetteService) {}

  ngOnInit(): void {
    this.regione=this.regioni[Math.floor(Math.random() * this.regioni.length)];
    this.apiService.getByAny(this.apiUrl + "/regione",this.regione).subscribe((data) => {
      this.ricette = data;
      this.ricetteService.updateNumRicette(this.ricette.length);
    })
  }
}
