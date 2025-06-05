import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TradizioneCulinaria } from '../../model/tradizioni'; // Percorso corretto al modello
import { CommonModule } from '@angular/common'; // Per direttive come *ngIf
import { RouterLink } from '@angular/router'; // Per [routerLink]

@Component({
  selector: 'app-tradizioni-culinarie',
  standalone: true, // Rendi il componente standalone
  imports: [CommonModule, RouterLink], // Importa i moduli necessari
  templateUrl: './tradizioni-culinarie.component.html',
  styleUrls: ['./tradizioni-culinarie.component.css']
})
export class TradizioniCulinarieComponent {
  // @Input per ricevere l'oggetto tradizione da un componente padre
  @Input() tradizione!: TradizioneCulinaria;
  // Nuovo @Input per ricevere lo stato "isLiked"
  @Input() isLiked: boolean = false;

  // @Output per emettere un evento quando il pulsante "Like" viene cliccato
  @Output() likeClicked = new EventEmitter<number>();

  // Costruisce il percorso completo dell'immagine, assumendo che siano in assets/img_ricette/
  getImagePath(imageName: string): string {
    // Il backend restituisce solo il nome del file (es: "pizza_margherita.jpg")
    // Dobbiamo costruire il percorso completo.
    return `assets/img_ricette/${imageName}`;
  }

  // Emette l'ID della tradizione quando il pulsante like viene cliccato, solo se non è già piaciuto
  onLike(): void {
    if (this.tradizione.id !== undefined && !this.isLiked) { // Emetti solo se non è già piaciuto
      this.likeClicked.emit(this.tradizione.id);
    }
  }
}
