import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TradizioneCulinaria } from '../../model/tradizioni'; // Percorso corretto al modello
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tradizioni-culinarie',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tradizioni-culinarie.component.html',
  styleUrls: ['./tradizioni-culinarie.component.css']
})
export class TradizioniCulinarieComponent {
  @Input() tradizione!: TradizioneCulinaria;
  @Input() isLiked: boolean = false; // Input per lo stato del like

  @Output() likeClicked = new EventEmitter<number>();

  getImagePath(imageName: string): string {
    return `assets/img_ricette/${imageName}`;
  }

  onLike(): void {
    if (this.tradizione.id !== undefined) { // L'emissione avviene sempre, la logica di toggle è nel padre
      this.likeClicked.emit(this.tradizione.id);
    }
  }
}
