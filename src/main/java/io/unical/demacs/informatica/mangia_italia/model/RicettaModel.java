package io.unical.demacs.informatica.mangia_italia.model;

public class RicettaModel {
    private Integer id;
    private String nome;
    private String descrizione;
    private String ingredienti;
    private Byte tempoPreparazione;
    private String regione;
    private String difficolta;
    private String tipo;
    private String descrizionePreparazione;
    private String img;

    public RicettaModel() {}

    public RicettaModel(Integer id, String nome, String descrizione, String ingredienti, Byte tempoPreparazione, String regione, String difficolta, String tipo, String descrizionePreparazione, String img) {
        this.id = id;
        this.nome = nome;
        this.descrizione = descrizione;
        this.ingredienti = ingredienti;
        this.tempoPreparazione = tempoPreparazione;
        this.regione = regione;
        this.difficolta = difficolta;
        this.tipo = tipo;
        this.descrizionePreparazione = descrizionePreparazione;
        this.img = img;
    }

    public Integer getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescrizione() {
        return descrizione;
    }

    public void setDescrizione(String descrizione) {
        this.descrizione = descrizione;
    }

    public String getIngredienti() {
        return ingredienti;
    }

    public void setIngredienti(String ingredienti) {
        this.ingredienti = ingredienti;
    }

    public Byte getTempoPreparazione() {
        return tempoPreparazione;
    }

    public void setTempoPreparazione(Byte tempoPreparazione) {
        this.tempoPreparazione = tempoPreparazione;
    }

    public String getRegione() {
        return regione;
    }

    public void setRegione(String regione) {
        this.regione = regione;
    }

    public String getDifficolta() {
        return difficolta;
    }

    public void setDifficolta(String difficolta) {
        this.difficolta = difficolta;
    }

    public String getTipo() {
        return this.tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getDescrizionePreparazione() {
        return descrizionePreparazione;
    }

    public void setDescrizionePreparazione(String descrizionePreparazione) {
        this.descrizionePreparazione = descrizionePreparazione;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }
}
