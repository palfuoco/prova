import {Component, Input, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Ricetta} from '../../model/ricetta';
import {PreferitiService} from '../../service/preferiti.service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-card-ricetta',
  imports: [RouterLink, NgClass],
  templateUrl: './card-ricetta.component.html',
  standalone: true,
  styleUrl: './card-ricetta.component.css'
})
export class CardRicettaComponent implements OnInit{
  path_img: string = "assets/img_ricette/";
  @Input() ricetta!: Ricetta;

  isFavorite: boolean = false;
  emailUtente: string = 'lucacaputo180743@gmail.com';


  constructor(private preferitiService: PreferitiService) {}

  ngOnInit() {
    this.preferitiService.isPreferito(this.emailUtente, this.ricetta.id)
      .subscribe((result: boolean) => {
        this.isFavorite = result;
      });
  }

  togglePreferito(): void {
    if (this.isFavorite) {
      this.preferitiService.deletePreferito(this.emailUtente, this.ricetta.id).subscribe(() => {
        this.isFavorite = false;
      });
    } else {
      this.preferitiService.addPreferito(this.emailUtente, this.ricetta.id).subscribe(() => {
        this.isFavorite = true;
      });
    }
  }

}
