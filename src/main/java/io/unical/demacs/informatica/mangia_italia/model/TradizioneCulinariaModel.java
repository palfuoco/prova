package io.unical.demacs.informatica.mangia_italia.model;

import java.util.Objects;


public class TradizioneCulinariaModel {
    private Integer id;
    private String titolo;
    private String testo;
    private String regione;
    private Integer likes;
    private String urlRicettaDettaglio;
    private String img;


    public TradizioneCulinariaModel() {
    }

    public TradizioneCulinariaModel(Integer id, String titolo, String testo, String regione, Integer likes, String urlRicettaDettaglio, String img) {
        this.id = id;
        this.titolo = titolo;
        this.testo = testo;
        this.regione = regione;
        this.likes = likes;
        this.urlRicettaDettaglio = urlRicettaDettaglio;
        this.img = img;
    }

    public TradizioneCulinariaModel(String titolo, String testo, String regione, String urlRicettaDettaglio, String img) {
        this.titolo = titolo;
        this.testo = testo;
        this.regione = regione;
        this.likes = 0; // Inizializza i likes a 0
        this.urlRicettaDettaglio = urlRicettaDettaglio;
        this.img = img;
    }

    // Getters
    public Integer getId() {
        return id;
    }

    public String getTitolo() {
        return titolo;
    }

    public String getTesto() {
        return testo;
    }

    public String getRegione() {
        return regione;
    }

    public Integer getLikes() {
        return likes;
    }

    public String getUrlRicettaDettaglio() {
        return urlRicettaDettaglio;
    }

    public String getImg() {
        return img;
    }

    // Setters
    public void setId(Integer id) {
        this.id = id;
    }

    public void setTitolo(String titolo) {
        this.titolo = titolo;
    }

    public void setTesto(String testo) {
        this.testo = testo;
    }

    public void setRegione(String regione) {
        this.regione = regione;
    }

    public void setLikes(Integer likes) {
        this.likes = likes;
    }

    public void setUrlRicettaDettaglio(String urlRicettaDettaglio) {
        this.urlRicettaDettaglio = urlRicettaDettaglio;
    }

    public void setImg(String img) {
        this.img = img;
    }

    //equals(), hashCode(), toString()

}