package io.unical.demacs.informatica.mangia_italia.mapper;

import io.unical.demacs.informatica.mangia_italia.model.RicettaModel;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class RicettaRowMapper implements RowMapper<RicettaModel> {

    @Override
    public RicettaModel mapRow(ResultSet rs, int rowNum) throws SQLException {
        RicettaModel ricetta = new RicettaModel();
        ricetta.setId(rs.getInt("id"));
        ricetta.setNome(rs.getString("nome"));
        ricetta.setDescrizione(rs.getString("descrizione"));
        ricetta.setIngredienti(rs.getString("ingredienti"));
        ricetta.setTempoPreparazione(rs.getByte("tempo_preparazione"));
        ricetta.setRegione(rs.getString("regione"));
        ricetta.setDifficolta(rs.getString("difficolta"));
        ricetta.setTipo(rs.getString("tipo"));
        ricetta.setDescrizionePreparazione(rs.getString("descrizione_preparazione"));
        ricetta.setImg(rs.getString("img"));
        return ricetta;
    }
}
