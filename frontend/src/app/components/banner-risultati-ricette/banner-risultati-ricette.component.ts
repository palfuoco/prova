import {Component, HostListener} from '@angular/core';
import {ButtonCarouselComponent} from '../button-carousel/button-carousel.component';
import {MapComponent} from '../map/map.component';
import {NgIf} from '@angular/common';
import {RicetteService} from '../../service/ricette.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-banner-risultati-ricette',
  imports: [ButtonCarouselComponent, MapComponent, NgIf, FormsModule],
  templateUrl: './banner-risultati-ricette.component.html',
  standalone: true,
  styleUrl: './banner-risultati-ricette.component.css'
})
export class BannerRisultatiRicetteComponent {
  showMap: boolean = false;
  numRicetteTrovate: number = 0;
  selectedTipo: string = "";
  selectedTempo: number = 0;

  constructor(private ricetteService: RicetteService) {
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
    }
  }


}
