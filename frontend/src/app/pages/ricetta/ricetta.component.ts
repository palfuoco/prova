import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {HeaderComponent} from '../../components/header/header.component';
import {FooterComponent} from '../../components/footer/footer.component';
import{ DettagliRicettaComponent } from '../../components/dettagli-ricetta/dettagli-ricetta.component';
import {SpazioRecensioneComponent } from '../../components/spazio-recensione/spazio-recensione.component' ;
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-ricetta',
  imports: [HeaderComponent, FooterComponent, DettagliRicettaComponent, SpazioRecensioneComponent, NgIf],
  templateUrl: './ricetta.component.html',
  styleUrl: './ricetta.component.css',
  standalone: true
})


export class RicettaComponent {
  idRicetta: number = 0;

  onIdRicettaLoaded(id: number) {
    this.idRicetta = id;
  }
  constructor(private titleService: Title) {
    this.titleService.setTitle('Procedimento - Mangia Italia');

  }
}
