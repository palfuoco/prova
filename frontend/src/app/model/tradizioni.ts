export interface TradizioneCulinaria {
  id?: number; // L'ID è opzionale perché potrebbe essere null per le nuove entità prima del salvataggio
  titolo: string;
  testo: string;
  regione: string;
  likes: number;
  urlRicettaDettaglio: string; // URL o ID per la pagina di dettaglio della ricetta associata
  img: string; // Campo per l'URL o il nome del file dell'immagine associata alla tradizione
  isLiked?: boolean; // NUOVA PROPRIETÀ: per tenere traccia dello stato del like nel frontend
}
