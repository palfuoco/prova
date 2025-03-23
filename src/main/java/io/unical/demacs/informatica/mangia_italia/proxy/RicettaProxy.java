package io.unical.demacs.informatica.mangia_italia.proxy;

import io.unical.demacs.informatica.mangia_italia.DAOImpl.RicettaDAOImpl;
import io.unical.demacs.informatica.mangia_italia.model.RicettaModel;

public class RicettaProxy extends RicettaModel {
    private final RicettaDAOImpl ricettaDAO;

    public RicettaProxy(Integer id, String nome, String ingredienti, String descrizione, String difficolta,Byte tempoPreparazione,String img,String tipo, RicettaDAOImpl ricettaDAO) {
        this.setId(id);
        this.setNome(nome);
        this.setIngredienti(ingredienti);
        this.setDescrizione(descrizione);
        this.setDifficolta(difficolta);
        this.setTempoPreparazione(tempoPreparazione);
        this.setImg(img);
        this.setTipo(tipo);
        this.ricettaDAO = ricettaDAO;
    }
}
