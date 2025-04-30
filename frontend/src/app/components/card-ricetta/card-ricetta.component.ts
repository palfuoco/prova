import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Ricetta} from '../../model/ricetta';
import {PreferitiService} from '../../service/preferiti.service';

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


  constructor(private preferitiService: PreferitiService) {}

  addPreferito(email: string, idRicetta: number) : void {
    this.preferitiService.addPreferito(email,idRicetta).subscribe({
      next: res => {
        console.log('✅ Preferito salvato:', res);
      },
      error: err => {
        console.error('❌ Errore nel salvataggio del preferito:', err);
      }
    })
  }
}
