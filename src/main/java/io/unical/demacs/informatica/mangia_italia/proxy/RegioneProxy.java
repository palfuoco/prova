package io.unical.demacs.informatica.mangia_italia.proxy;

import io.unical.demacs.informatica.mangia_italia.DAOImpl.RegioneDAOImpl;
import io.unical.demacs.informatica.mangia_italia.model.RegioneModel;

public class RegioneProxy extends RegioneModel {
    private final RegioneDAOImpl regioneDAO;


    public RegioneProxy(String nome, RegioneDAOImpl regioneDAO) {
        this.setNome(nome);
        this.regioneDAO = regioneDAO;
    }
}
