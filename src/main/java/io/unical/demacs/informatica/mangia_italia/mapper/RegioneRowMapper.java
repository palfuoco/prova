package io.unical.demacs.informatica.mangia_italia.mapper;

import io.unical.demacs.informatica.mangia_italia.model.RegioneModel;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class RegioneRowMapper implements RowMapper<RegioneModel> {

    @Override
    public RegioneModel mapRow(ResultSet rs, int rowNum) throws SQLException {
        RegioneModel regioneModel = new RegioneModel();
        regioneModel.setNome(rs.getString("nome"));
        regioneModel.setLatitudine(rs.getDouble("latitudine"));
        regioneModel.setLongitudine(rs.getDouble("longitudine"));
        regioneModel.setNumeroRicette(rs.getInt("numero_ricette"));

        return regioneModel;
    }
}
