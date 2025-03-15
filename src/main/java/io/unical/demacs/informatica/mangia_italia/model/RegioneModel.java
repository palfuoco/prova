package io.unical.demacs.informatica.mangia_italia.model;

public class RegioneModel {
    private String nome;
    private double latitudine;
    private double longitudine;
    private int numeroRicette;

    public RegioneModel() {}

    public RegioneModel(String nome, double latitudine, double longitudine, int numeroRicette) {
        this.nome = nome;
        this.latitudine = latitudine;
        this.longitudine = longitudine;
        this.numeroRicette = numeroRicette;
    }

    public int getNumeroRicette() {
        return numeroRicette;
    }

    public void setNumeroRicette(int numeroRicette) {
        this.numeroRicette = numeroRicette;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public double getLatitudine() {
        return latitudine;
    }

    public void setLatitudine(double lat) {
        this.latitudine = lat;
    }

    public double getLongitudine() {
        return longitudine;
    }

    public void setLongitudine(double longitudine) {
        this.longitudine = longitudine;
    }
}
