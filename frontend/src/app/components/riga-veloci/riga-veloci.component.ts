import {Component, OnInit} from '@angular/core';
import {CardRicettaComponent} from '../card-ricetta/card-ricetta.component';
import {NgForOf} from '@angular/common';
import {ApiService} from '../../apiService';
import {Ricetta} from '../../model/ricetta';
import {RicetteService} from '../../service/ricette.service';

@Component({
  selector: 'app-riga-veloci',
  imports: [
    CardRicettaComponent,
    NgForOf
  ],
  templateUrl: './riga-veloci.component.html',
  styleUrl: './riga-veloci.component.css'
})
export class RigaVelociComponent  implements OnInit{
  public tempo: number=15;
  public ricette: Ricetta[] = []

  constructor(private ricetteService: RicetteService) {}

  ngOnInit(): void {
    this.ricetteService.ricette$.subscribe((data) => {
      this.ricette = data;
    });
    this.ricetteService.showRicettaByTempoPreparazione(this.tempo);
  }
}
