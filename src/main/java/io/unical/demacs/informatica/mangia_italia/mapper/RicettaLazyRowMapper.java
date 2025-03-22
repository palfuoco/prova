package io.unical.demacs.informatica.mangia_italia.mapper;

import io.unical.demacs.informatica.mangia_italia.DAOImpl.RicettaDAOImpl;
import io.unical.demacs.informatica.mangia_italia.proxy.RicettaProxy;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class RicettaLazyRowMapper implements RowMapper<RicettaProxy> {
    private final RicettaDAOImpl ricettaDAO;

    public RicettaLazyRowMapper(RicettaDAOImpl ricettaDAO) {
        this.ricettaDAO = ricettaDAO;
    }

    @Override
    public RicettaProxy mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new RicettaProxy(
                rs.getInt("id"),
                rs.getString("nome"),
                rs.getString("ingredienti"),
                rs.getString("descrizione"),
                rs.getString("difficolta"),
                rs.getByte("tempo_preparazione"),
                rs.getString("img"),
                rs.getString("tipo"),
                ricettaDAO
        );
    }
}
