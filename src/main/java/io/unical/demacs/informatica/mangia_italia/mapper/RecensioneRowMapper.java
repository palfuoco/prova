package io.unical.demacs.informatica.mangia_italia.mapper;




import io.unical.demacs.informatica.mangia_italia.model.RecensioneModel;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class RecensioneRowMapper implements RowMapper<RecensioneModel> {
    @Override
    public RecensioneModel mapRow(ResultSet rs, int rowNum) throws SQLException {
        RecensioneModel recensione = new RecensioneModel();
        recensione.setId(rs.getInt("id"));
        recensione.setId_ricetta(rs.getInt("id_ricetta"));
        recensione.setEmail_utente(rs.getString("email_utente"));
        recensione.setCommento(rs.getString("commento"));
        recensione.setVoto(rs.getInt("voto"));
        recensione.setData_pubblicazione(rs.getDate("data_pubblicazione").toLocalDate());
        return recensione;
    }

}
