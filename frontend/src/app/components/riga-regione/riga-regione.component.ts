import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {ApiService} from '../../apiService';
import {CardRicettaComponent} from '../card-ricetta/card-ricetta.component';
import {Ricetta} from '../../model/ricetta';
import {RicetteService} from '../../service/ricette.service';
import {UtenteService} from '../../service/utente.service';

@Component({
  selector: 'app-riga-regione',
  imports: [NgForOf, CardRicettaComponent, NgIf],
  templateUrl: './riga-regione.component.html',
  standalone: true,
  styleUrl: './riga-regione.component.css'
})
export class RigaRegioneComponent implements OnInit {
  public regioni: String[] = ['Calabria', 'Sardegna', 'Sicilia', 'Campania', 'Basilicata', 'Lazio', 'Umbria', 'Lombardia', 'Marche', 'Piemonte', 'Abruzzo', 'Trentino Alto-Adige', 'Veneto', 'Toscana', 'Liguria', 'Emilia Romagna', "Valle d'Aosta", 'Molise', 'Puglia', 'Friuli Venezia Giulia'];
  public regione: String = "";
  public ricette: Ricetta[] = []
  private apiUrl = 'http://localhost:8080/api/ricette';

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  constructor(private apiService: ApiService<Ricetta>, private ricetteService: RicetteService, private utenteService: UtenteService) {
  }


  ngOnInit(): void {
    this.utenteService.utente$.subscribe((utente) => {
      if (!utente || utente.regioneDiResidenza=='') {
        this.regione = this.regioni[Math.floor(Math.random() * this.regioni.length)];

        this.apiService.getByAny(this.apiUrl + "/regione", this.regione).subscribe((data) => {
          this.ricette = data;
          this.ricetteService.updateNumRicette(this.ricette.length);
        });
      } else {
        this.regione = "da dove provieni";
        this.apiService.getByAny(this.apiUrl + "/regione", utente.regioneDiResidenza).subscribe((data) => {
          this.ricette = data;
          this.ricetteService.updateNumRicette(this.ricette.length);
        });
      }
    });
  }

  scrollLeft(): void {
    this.scrollContainer.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight(): void {
    this.scrollContainer.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }
}
