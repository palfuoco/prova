package io.unical.demacs.informatica.mangia_italia.proxy;

import io.unical.demacs.informatica.mangia_italia.DAOImpl.RicettaDAOImpl;
import io.unical.demacs.informatica.mangia_italia.DAOImpl.UtenteDAOImpl;
import io.unical.demacs.informatica.mangia_italia.model.UtenteModel;

public class UtenteProxy extends UtenteModel {
    private final UtenteDAOImpl utenteDAO;

    public UtenteProxy(String nickname, String password, UtenteDAOImpl utenteDAO) {
        this.setNickname(nickname);
        this.setPassword(password);
        this.utenteDAO=utenteDAO;
    }
}
