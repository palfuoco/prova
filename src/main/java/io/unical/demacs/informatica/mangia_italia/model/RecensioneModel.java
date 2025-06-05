package io.unical.demacs.informatica.mangia_italia.model;





import java.time.LocalDate;

public class RecensioneModel {
    private Integer id;
    private RicettaModel ricetta;
    private UtenteModel utente;
    private String commento;
    private Integer voto;
    private LocalDate data_pubblicazione;

    public RecensioneModel() {}

    public RecensioneModel(Integer id, RicettaModel ricetta, UtenteModel utente, String testo, Integer voto, LocalDate data) {
        this.id = id;
        this.ricetta = ricetta;
        this.utente = utente;
        this.commento = testo;
        this.voto = voto;
        this.data_pubblicazione = data;
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public Integer getVoto() {
        return voto;
    }
    public void setVoto(Integer voto) {this.voto = voto; }

    public UtenteModel getUtente() { return utente; }
    public void setUtente(UtenteModel utente) { this.utente = utente; }

    public String getCommento() { return commento; }
    public void setCommento(String commento) { this.commento = commento; }

    public RicettaModel getRicetta() { return ricetta; }
    public void setRicetta(RicettaModel ricetta) { this.ricetta = ricetta; }

    public LocalDate getData_pubblicazione() { return data_pubblicazione; }
    public void setData_pubblicazione(LocalDate data_pubblicazione) { this.data_pubblicazione = data_pubblicazione; }

}
