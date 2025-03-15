import { Component } from '@angular/core';
import {ButtonCarouselComponent} from '../button-carousel/button-carousel.component';
import {MapComponent} from '../map/map.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-banner-risultati-ricette',
  imports: [ButtonCarouselComponent, MapComponent, NgIf],
  templateUrl: './banner-risultati-ricette.component.html',
  standalone: true,
  styleUrl: './banner-risultati-ricette.component.css'
})
export class BannerRisultatiRicetteComponent {
  showMap: boolean = false;

  toggleMap(event: Event) {
    event.preventDefault();
    this.showMap = !this.showMap;
  }

}
