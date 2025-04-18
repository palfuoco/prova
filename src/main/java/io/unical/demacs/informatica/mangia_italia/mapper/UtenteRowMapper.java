package io.unical.demacs.informatica.mangia_italia.mapper;

import io.unical.demacs.informatica.mangia_italia.model.UtenteModel;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UtenteRowMapper implements RowMapper<UtenteModel> {
    @Override
    public UtenteModel mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new UtenteModel(
                rs.getString("email"),
                rs.getString("nickname"),
                rs.getString("password"),
                rs.getString("regione_di_residenza")
        );
    }
}
