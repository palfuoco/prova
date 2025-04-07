package io.unical.demacs.informatica.mangia_italia.mapper;

import io.unical.demacs.informatica.mangia_italia.DAOImpl.RegioneDAOImpl;
import io.unical.demacs.informatica.mangia_italia.proxy.RegioneProxy;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class RegioneLazyRowMapper implements RowMapper<RegioneProxy> {
    private final RegioneDAOImpl regioneDAO;

    public RegioneLazyRowMapper(RegioneDAOImpl regioneDAO) {
        this.regioneDAO = regioneDAO;
    }

    @Override
    public RegioneProxy mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new RegioneProxy(
                rs.getString("nome"),
                regioneDAO
        );
    }
}
