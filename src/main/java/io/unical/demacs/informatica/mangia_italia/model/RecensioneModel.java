package io.unical.demacs.informatica.mangia_italia.model;





import java.time.LocalDate;

public class RecensioneModel {
    private Integer id;
    private Integer id_ricetta;
    private String email_utente;
    private String commento;
    private Integer voto;
    private LocalDate data_pubblicazione;

    public RecensioneModel() {}

    public RecensioneModel(Integer id, Integer ricettaId, String email, String testo, Integer voto, LocalDate data) {
        this.id = id;
        this.id_ricetta = ricettaId;
        this.email_utente = email;
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

    public String getEmail_utente() { return email_utente; }
    public void setEmail_utente(String email_utente) { this.email_utente = email_utente; }

    public String getCommento() { return commento; }
    public void setCommento(String commento) { this.commento = commento; }

    public Integer getId_ricetta() { return id_ricetta; }
    public void setId_ricetta(Integer id_ricetta) { this.id_ricetta = id_ricetta; }

    public LocalDate getData_pubblicazione() { return data_pubblicazione; }
    public void setData_pubblicazione(LocalDate data_pubblicazione) { this.data_pubblicazione = data_pubblicazione; }

}
