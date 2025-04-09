import { Component } from '@angular/core';
import {HeaderComponent} from '../../components/header/header.component';
import {FooterComponent} from '../../components/footer/footer.component';
import {CarouselHomeComponent} from '../../components/carousel-home/carousel-home.component';
import {RigaRegioneComponent} from '../../components/riga-regione/riga-regione.component';
import { Title } from '@angular/platform-browser';
import {RigaVelociComponent} from '../../components/riga-veloci/riga-veloci.component';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, FooterComponent, CarouselHomeComponent, RigaRegioneComponent, RigaVelociComponent],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle('Home - Mangia Italia');
  }
}
