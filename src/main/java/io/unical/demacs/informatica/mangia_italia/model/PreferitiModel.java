package io.unical.demacs.informatica.mangia_italia.model;

public class PreferitiModel {
    private UtenteModel utente;
    private RicettaModel ricetta;

    public PreferitiModel() {}

    public PreferitiModel(UtenteModel utente, RicettaModel ricetta) {
        this.utente = utente;
        this.ricetta = ricetta;
    }

    public UtenteModel getUtente() {
        return utente;
    }

    public void setUtente(UtenteModel utente) {
        this.utente = utente;
    }

    public RicettaModel getRicetta() {
        return ricetta;
    }

    public void setRicetta(RicettaModel ricetta) {
        this.ricetta = ricetta;
    }
}
