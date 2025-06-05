export interface TradizioneCulinaria {
  id?: number;
  titolo: string;
  testo: string;
  regione: string;
  likes: number;
  urlRicettaDettaglio: string;
  img: string;
  isLiked?: boolean;
}
