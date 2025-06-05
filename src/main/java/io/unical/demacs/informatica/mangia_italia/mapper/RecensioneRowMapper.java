package io.unical.demacs.informatica.mangia_italia.mapper;




import io.unical.demacs.informatica.mangia_italia.model.RecensioneModel;
import io.unical.demacs.informatica.mangia_italia.model.RicettaModel;
import io.unical.demacs.informatica.mangia_italia.model.UtenteModel;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class RecensioneRowMapper implements RowMapper<RecensioneModel> {
    @Override
    public RecensioneModel mapRow(ResultSet rs, int rowNum) throws SQLException {
        RecensioneModel recensione = new RecensioneModel();
        recensione.setId(rs.getInt("id"));


        RicettaModel ricetta = new RicettaModel();
        recensione.setRicetta(ricetta);
        ricetta.setId(rs.getInt("id_ricetta"));



        UtenteModel utente = new UtenteModel();
        recensione.setUtente(utente);
        utente.setEmail(rs.getString("email_utente"));


        recensione.setCommento(rs.getString("commento"));
        recensione.setVoto(rs.getInt("voto"));
        recensione.setData_pubblicazione(rs.getDate("data_pubblicazione").toLocalDate());
        return recensione;
    }

}
