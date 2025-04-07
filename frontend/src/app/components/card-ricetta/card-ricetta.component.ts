import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Ricetta} from '../../model/ricetta';

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
