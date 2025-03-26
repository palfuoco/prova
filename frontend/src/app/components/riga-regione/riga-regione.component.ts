import {Component, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import {CardRicettaComponent, Ricetta} from '../card-ricetta/card-ricetta.component';

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

  ngOnInit(): void {
    this.regione=this.regioni[Math.floor(Math.random() * this.regioni.length)];
  }
}
