import { Component } from '@angular/core';
import {HeaderComponent} from '../../components/header/header.component';
import {FooterComponent} from '../../components/footer/footer.component';
import {CarouselHomeComponent} from '../../components/carousel-home/carousel-home.component';
import {RigaRegioneComponent} from '../../components/riga-regione/riga-regione.component';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, FooterComponent, CarouselHomeComponent, RigaRegioneComponent],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
