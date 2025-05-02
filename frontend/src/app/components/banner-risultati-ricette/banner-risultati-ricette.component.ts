import {Component, HostListener} from '@angular/core';
import {ButtonCarouselComponent} from '../button-carousel/button-carousel.component';
import {MapComponent} from '../map/map.component';
import {NgForOf, NgIf} from '@angular/common';
import {RicetteService} from '../../service/ricette.service';
import {FormsModule} from '@angular/forms';
import {PreferitiService} from '../../service/preferiti.service';
import {Ricetta} from '../../model/ricetta';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-banner-risultati-ricette',
  imports: [MapComponent, NgIf, FormsModule, NgForOf, RouterLink],
  templateUrl: './banner-risultati-ricette.component.html',
  standalone: true,
  styleUrl: './banner-risultati-ricette.component.css'
})
export class BannerRisultatiRicetteComponent {
  showMap: boolean = false;
  numRicetteTrovate: number = 0;
  selectedTipo: string = "";
  selectedTempo: number = 0;

  constructor(private ricetteService: RicetteService, private preferitiService: PreferitiService) {
    this.ricetteService.numRicette$.subscribe((num) => {
      this.numRicetteTrovate = num;
    });
  }

  toggleMap(event: Event) {
    event.preventDefault();
    this.showMap = !this.showMap;
  }

  onTipoChange(): void {
    if (this.selectedTipo) {
      this.ricetteService.showRicetteByTipo(this.selectedTipo);
    }
  }

  onTempoChange(): void {
    if (this.selectedTempo) {
      this.ricetteService.showRicettaByTempoPreparazione(this.selectedTempo);
    }
  }

  resetFiltri(): void {
    this.selectedTipo = '';
    this.selectedTempo = 0;
    this.ricetteService.showAll();
  }

  filtraOpen = false;

  toggleFiltraDropdown() {
    this.filtraOpen = !this.filtraOpen;
  }

  @HostListener('document:click', ['$event'])
  closeDropdownOnClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.custom-dropdown')) {
      this.filtraOpen = false;
      this.filtraOpen = false;
    }
  }

  ricettePreferite: Ricetta[] = [];
  emailUtente: string = 'lucacaputo180743@gmail.com'; // TODO: prendi da login/auth
  preferitiOpen = false;

  togglePreferitiDropdown(): void {
    this.preferitiOpen = !this.preferitiOpen;
    this.filtraOpen = false;

    if (this.preferitiOpen) {
      this.getAllPreferiti()
    }
  }

  removePreferito(idRicetta: number): void {
    this.preferitiService.deletePreferito(this.emailUtente, idRicetta).subscribe(() => {
      this.getAllPreferiti(); // aggiorna subito la lista
    });
  }

  getAllPreferiti():void {
    this.preferitiService.getPreferitiRicette(this.emailUtente).subscribe((ricette: Ricetta[]) => {
      this.ricettePreferite = ricette;
    });
  }




}
