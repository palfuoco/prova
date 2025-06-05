

export interface Recensione {
    id: number;
    voto: number;
    commento: string;
    data_pubblicazione: string;
    utente: { email: string };
    ricetta: {id: number};
}
