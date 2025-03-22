import { Component } from '@angular/core';
import {HeaderComponent} from '../../components/header/header.component';
import {
  BannerRisultatiRicetteComponent
} from '../../components/banner-risultati-ricette/banner-risultati-ricette.component';
import {TabellaRicettarioComponent} from '../../components/tabella-ricettario/tabella-ricettario.component';
import {FooterComponent} from '../../components/footer/footer.component';

@Component({
  selector: 'app-ricettario',
  standalone: true,
  imports: [HeaderComponent, BannerRisultatiRicetteComponent, TabellaRicettarioComponent, FooterComponent],
  templateUrl: './ricettario.component.html',
  styleUrls: ['./ricettario.component.css']
})
export class RicettarioComponent {

}
