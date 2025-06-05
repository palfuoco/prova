import { Component, OnInit } from '@angular/core';
import { TradizioneCulinaria } from '../../model/tradizioni';
// Percorso corretto per ApiService (direttamente in app/)
import { ApiService } from '../../apiService';
import { CommonModule } from '@angular/common'; // Per direttive come *ngIf e *ngFor
import { TradizioniCulinarieComponent } from '../../components/tradizioni-culinarie/tradizioni-culinarie.component'; // Importa il componente della card
import { HttpErrorResponse } from '@angular/common/http';
import {FooterComponent} from '../../components/footer/footer.component';
import {HeaderComponent} from '../../components/header/header.component'; // Importa HttpErrorResponse per una tipizzazione più specifica dell'errore

@Component({
  selector: 'app-tradizioni',
  standalone: true,
  // Rimosso FooterComponent e HeaderComponent da qui, dato che risiedono in app.component.html
  imports: [CommonModule, TradizioniCulinarieComponent, FooterComponent, HeaderComponent],
  templateUrl: './tradizioni.component.html',
  styleUrls: ['./tradizioni.component.css']
})
export class TradizioniComponent implements OnInit {
  tradizioni: TradizioneCulinaria[] = [];
  errorMessage: string | null = null;
  private tradizioniApiUrl = 'http://localhost:8080/api/tradizioni';

  // Per tenere traccia dei like dell'utente (ID delle tradizioni a cui è stato messo "Mi piace")
  likedTraditions: Set<number> = new Set<number>();

  // Inietta ApiService tipizzato con TradizioneCulinaria
  constructor(private apiService: ApiService<TradizioneCulinaria>) { }

  ngOnInit(): void {
    this.loadLikedTraditions(); // Carica i like salvati all'avvio
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
   * Recupera tutte le tradizioni culinarie tramite il servizio generico ApiService.
   * Aggiorna lo stato dei like per ciascuna tradizione.
   */
  getAllTradizioni(): void {
    this.apiService.getAll(`${this.tradizioniApiUrl}/all`)
      .subscribe({
        next: (data: TradizioneCulinaria[]) => { // Tipizzato 'data'
          this.tradizioni = data.map((tradizione: TradizioneCulinaria) => { // Tipizzato 'tradizione'
            // Aggiungi una proprietà 'isLiked' a ciascun oggetto tradizione
            // basandoti sullo stato locale dei like. Utile per il template.
            return { ...tradizione, isLiked: this.isTraditionLiked(tradizione.id) };
          });
          this.errorMessage = null;
        },
        error: (error: HttpErrorResponse) => { // Tipizzato 'error'
          console.error('Errore nel recupero delle tradizioni:', error);
          this.errorMessage = 'Impossibile caricare le tradizioni culinarie. Riprova più tardi.';
          // Puoi aggiungere logica per distinguere diversi tipi di errore (es. 404, 500)
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
   * Permette un solo like per utente per tradizione, salvando lo stato nel localStorage.
   * @param id L'ID della tradizione a cui aggiungere un like.
   */
  onLikeClicked(id: number): void {
    if (id !== undefined && !this.isTraditionLiked(id)) { // Permetti il like solo se non è già stato messo
      this.apiService.update(this.tradizioniApiUrl, id + '/like', {} as TradizioneCulinaria)
        .subscribe({
          next: () => {
            const index = this.tradizioni.findIndex(t => t.id === id);
            if (index !== -1) {
              this.tradizioni[index].likes = (this.tradizioni[index].likes || 0) + 1;
              // Aggiorna lo stato locale e salva nel localStorage
              this.likedTraditions.add(id);
              this.saveLikedTraditions();
              // Aggiorna anche la proprietà isLiked dell'oggetto nel modello locale
              this.tradizioni[index].isLiked = true;
            }
          },
          error: (error: HttpErrorResponse) => { // Tipizzato 'error'
            console.error('Errore nell\'aggiunta del like:', error);
            this.errorMessage = 'Non è stato possibile aggiungere il like.';
            if (error.status === 404) {
              this.errorMessage = 'Tradizione non trovata per aggiungere il like.';
            } else {
              this.errorMessage = 'Si è verificato un errore durante l\'aggiunta del like. Riprova.';
            }
          }
        });
    } else if (this.isTraditionLiked(id)) {
      console.log(`Tradizione ${id} già piaciuta da questo utente.`);
      // Puoi aggiungere una piccola notifica all'utente qui, es. tramite un servizio Toast.
    }
  }
}
