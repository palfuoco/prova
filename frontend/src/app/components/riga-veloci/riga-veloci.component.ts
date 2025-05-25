import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CardRicettaComponent} from '../card-ricetta/card-ricetta.component';
import {NgForOf, NgIf} from '@angular/common';
import {ApiService} from '../../apiService';
import {Ricetta} from '../../model/ricetta';
import {RicetteService} from '../../service/ricette.service';

@Component({
  selector: 'app-riga-veloci',
  imports: [
    CardRicettaComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './riga-veloci.component.html',
  styleUrl: './riga-veloci.component.css'
})
export class RigaVelociComponent  implements OnInit{
  public tempo: number=15;
  public ricette: Ricetta[] = []

  @ViewChild('fastRicetteContainer') fastRicetteContainer!: ElementRef;

  constructor(private ricetteService: RicetteService) {}

  ngOnInit(): void {
    this.ricetteService.ricette$.subscribe((data) => {
      this.ricette = data;
    });
    this.ricetteService.showRicettaByTempoPreparazione(this.tempo);
  }

  scrollFastLeft(): void {
    this.fastRicetteContainer.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollFastRight(): void {
    this.fastRicetteContainer.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }
}
