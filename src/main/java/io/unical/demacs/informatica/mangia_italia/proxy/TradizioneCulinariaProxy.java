package io.unical.demacs.informatica.mangia_italia.proxy;

import io.unical.demacs.informatica.mangia_italia.DAOImpl.TradizioneCulinariaDAOImpl; // Importa il tuo DAOImpl
import io.unical.demacs.informatica.mangia_italia.model.TradizioneCulinariaModel;


public class TradizioneCulinariaProxy extends TradizioneCulinariaModel {
    // Riferimento al DAO per recuperare dati "lazy" se necessario
    private final TradizioneCulinariaDAOImpl tradizioneCulinariaDAO;

    // Costruttore per creare un proxy con dati "eager" e un riferimento al DAO
    public TradizioneCulinariaProxy(Integer id, String titolo, String testo, String regione, Integer likes, String urlRicettaDettaglio, String img, TradizioneCulinariaDAOImpl tradizioneCulinariaDAO) {
        // Chiama il costruttore della superclasse (TradizioneCulinariaModel)
        super(id, titolo, testo, regione, likes, urlRicettaDettaglio, img);
        this.tradizioneCulinariaDAO = tradizioneCulinariaDAO;
    }

}
