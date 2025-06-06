import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser'; // Per impostare il titolo della pagina
import { HeaderComponent } from '../../components/header/header.component'; // Esempio: aggiungi il tuo HeaderComponent
import { FooterComponent } from '../../components/footer/footer.component'; // Esempio: aggiungi il tuo FooterComponent
import { TradizioniGridComponent } from '../../components/tradizioni-grid/tradizioni-grid.component'; // Importa il nuovo componente della griglia

@Component({
  selector: 'app-tradizioni',
  standalone: true,
  // Ora importa HeaderComponent, FooterComponent e TradizioniGridComponent
  imports: [HeaderComponent, FooterComponent, TradizioniGridComponent],
  templateUrl: './tradizioni.component.html',
  styleUrls: ['./tradizioni.component.css'] // Questo CSS sarà vuoto o minimale
})
export class TradizioniComponent implements OnInit {
  constructor(private titleService: Title) {
    this.titleService.setTitle('Tradizioni Culinarie - Mangia Italia');
  }

  ngOnInit(): void {
  }
}
