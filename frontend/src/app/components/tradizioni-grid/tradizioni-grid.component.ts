import { Component, OnInit } from '@angular/core';
import { TradizioneCulinaria } from '../../model/tradizioni'; // Percorso al modello
import { ApiService } from '../../apiService'; // Percorso al tuo ApiService
import { CommonModule } from '@angular/common'; // Per direttive come *ngIf e *ngFor
import { TradizioniCulinarieComponent } from '../tradizioni-culinarie/tradizioni-culinarie.component'; // Importa il componente Card

@Component({
  selector: 'app-tradizioni-grid', // Nuovo selettore per questo componente
  standalone: true,
  // Importa i moduli e i componenti necessari per la griglia e le singole card
  imports: [CommonModule, TradizioniCulinarieComponent],
  templateUrl: './tradizioni-grid.component.html',
  styleUrls: ['./tradizioni-grid.component.css']
})
export class TradizioniGridComponent implements OnInit {
  tradizioni: TradizioneCulinaria[] = [];
  errorMessage: string | null = null;
  private tradizioniApiUrl = 'http://localhost:8080/api/tradizioni';

  likedTraditions: Set<number> = new Set<number>();

  constructor(private apiService: ApiService<TradizioneCulinaria>) { }

  ngOnInit(): void {
    this.loadLikedTraditions();
    this.getAllTradizioni();
  }

  /**
   * Carica gli ID delle tradizioni a cui l'utente ha già messo "Mi piace" dal localStorage.
   */
  private loadLikedTraditions(): void {
    const liked = localStorage.getItem('likedTraditions');
    if (liked) {
      this.likedTraditions = new Set(JSON.parse(liked));
    }
  }

  /**
   * Salva gli ID delle tradizioni a cui l'utente ha messo "Mi piace" nel localStorage.
   */
  private saveLikedTraditions(): void {
    localStorage.setItem('likedTraditions', JSON.stringify(Array.from(this.likedTraditions)));
  }

  /**
   * Controlla se una tradizione è stata già piaciuta dall'utente.
   * @param id L'ID della tradizione da controllare.
   * @returns Vero se la tradizione è stata piaciuta, altrimenti falso.
   */
  isTraditionLiked(id: number | undefined): boolean {
    return id !== undefined && this.likedTraditions.has(id);
  }

  /**
   * Recupera tutte le tradizioni culinarie tramite il servizio generico.
   */
  getAllTradizioni(): void {
    this.apiService.getAll(`${this.tradizioniApiUrl}/all`)
      .subscribe({
        next: (data) => {
          // Mappa i dati per includere lo stato 'isLiked' basato sul localStorage
          this.tradizioni = data.map(tradizione => ({
            ...tradizione,
            isLiked: this.isTraditionLiked(tradizione.id)
          }));
          this.errorMessage = null;
        },
        error: (error) => {
          console.error('Errore nel recupero delle tradizioni:', error);
          this.errorMessage = 'Impossibile caricare le tradizioni culinarie. Riprova più tardi.';
          if (error.status === 404) {
            this.errorMessage = 'Nessuna tradizione trovata.';
          } else {
            this.errorMessage = 'Si è verificato un errore durante il caricamento. Riprova.';
          }
        }
      });
  }

  /**
   * Gestisce il click sul pulsante "Like" per una tradizione specifica.
   * Implementa una logica di toggle per il "Mi piace" a livello di frontend.
   * @param id L'ID della tradizione a cui aggiungere/togliere un like.
   */
  onLikeClicked(id: number): void {
    const index = this.tradizioni.findIndex(t => t.id === id);
    if (index === -1) {
      console.warn('Tradizione non trovata per ID:', id);
      return;
    }

    const tradizione = this.tradizioni[index];

    if (tradizione.isLiked) {
      // Se già piaciuto, "toglie" il like (simulato sul frontend)
      tradizione.likes = Math.max(0, (tradizione.likes || 0) - 1);
      this.likedTraditions.delete(id);
      this.saveLikedTraditions();
      tradizione.isLiked = false;
      console.log(`Tradizione ${id} tolto il like (simulato).`);
      // Qui non chiamiamo il backend perché l'endpoint attuale è solo per incrementare.
    } else {
      // Se non piaciuto, aggiunge il like (e lo invia al backend)
      this.apiService.update(this.tradizioniApiUrl, id + '/like', {} as TradizioneCulinaria)
        .subscribe({
          next: () => {
            tradizione.likes = (tradizione.likes || 0) + 1; // Incrementa dopo successo del backend
            this.likedTraditions.add(id);
            this.saveLikedTraditions();
            tradizione.isLiked = true;
            console.log(`Tradizione ${id} like aggiunto.`);
          },
          error: (error) => {
            console.error('Errore nell\'aggiunta del like:', error);
            this.errorMessage = 'Non è stato possibile aggiungere il like.';
            if (error.status === 404) {
              this.errorMessage = 'Tradizione non trovata per aggiungere il like.';
            } else {
              this.errorMessage = 'Si è verificato un errore durante l\'aggiunta del like. Riprova.';
            }
          }
        });
    }
  }
}
