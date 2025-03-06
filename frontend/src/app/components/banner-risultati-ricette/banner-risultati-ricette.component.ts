import { Component } from '@angular/core';
import {ButtonCarouselComponent} from '../button-carousel/button-carousel.component';
import {MapComponent} from '../map/map.component';

@Component({
  selector: 'app-banner-risultati-ricette',
  imports: [ButtonCarouselComponent, MapComponent],
  templateUrl: './banner-risultati-ricette.component.html',
  standalone: true,
  styleUrl: './banner-risultati-ricette.component.css'
})
export class BannerRisultatiRicetteComponent {

}
