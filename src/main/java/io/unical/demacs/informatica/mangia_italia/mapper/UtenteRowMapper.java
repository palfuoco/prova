package io.unical.demacs.informatica.mangia_italia.mapper;

import io.unical.demacs.informatica.mangia_italia.DAOImpl.UtenteDAOImpl;
import io.unical.demacs.informatica.mangia_italia.proxy.UtenteProxy;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UtenteRowMapper implements RowMapper<UtenteProxy> {
    private final UtenteDAOImpl utenteDAO;

    public UtenteRowMapper(UtenteDAOImpl utenteDAO) {
        this.utenteDAO = utenteDAO;
    }

    @Override
    public UtenteProxy mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new UtenteProxy(
                rs.getString("nickname"),
                rs.getString("password"),
                rs.getString("email"),
                rs.getString("regione_di_residenza"),
                utenteDAO
        );
    }
}
