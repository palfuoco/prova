package io.unical.demacs.informatica.mangia_italia.mapper;

import io.unical.demacs.informatica.mangia_italia.DAOImpl.PreferitiDAOImpl;
import io.unical.demacs.informatica.mangia_italia.model.PreferitiModel;
import io.unical.demacs.informatica.mangia_italia.model.RicettaModel;
import io.unical.demacs.informatica.mangia_italia.model.UtenteModel;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class PreferitiRowMapper implements RowMapper<PreferitiModel> {
    @Override
    public PreferitiModel mapRow(ResultSet rs, int rowNum) throws SQLException {
        UtenteModel utenteModel = new UtenteModel();
        utenteModel.setEmail(rs.getString("email"));

        RicettaModel ricettaModel = new RicettaModel();
        ricettaModel.setId(rs.getInt("id"));
        ricettaModel.setNome(rs.getString("nome"));


        PreferitiModel preferitiModel = new PreferitiModel();
        preferitiModel.setUtente(utenteModel);
        preferitiModel.setRicetta(ricettaModel);

        return preferitiModel;
    }
}
