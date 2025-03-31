import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';

export interface Ricetta {
  id: number;
  nome: string;
  descrizione: string,
  ingredienti: string;
  tempoPreparazione: number
  regione: string,
  difficolta: string,
  tipo: string,
  descrizionePreparazione: string,
  img: string;
  dose: number;
}

@Component({
  selector: 'app-card-ricetta',
  imports: [RouterLink],
  templateUrl: './card-ricetta.component.html',
  standalone: true,
  styleUrl: './card-ricetta.component.css'
})
export class CardRicettaComponent{
  path_img: string = "assets/img_ricette/";
  @Input() ricetta!: Ricetta;
}
