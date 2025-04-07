export interface Ricetta {
  id: number;
  nome: string;
  descrizione: string,
  ingredienti: string;
  tempoPreparazione: number
  regione: string,
  difficolta: string,
  tipo: string,
  descrizionePreparazione: string,
  img: string,
  dose: number
}
