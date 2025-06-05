package io.unical.demacs.informatica.mangia_italia.mapper;

import io.unical.demacs.informatica.mangia_italia.DAOImpl.TradizioneCulinariaDAOImpl;
import io.unical.demacs.informatica.mangia_italia.proxy.TradizioneCulinariaProxy;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class TradizioneCulinariaLazyRowMapper implements RowMapper<TradizioneCulinariaProxy> {
    private final TradizioneCulinariaDAOImpl tradizioneCulinariaDAO;

    public TradizioneCulinariaLazyRowMapper(TradizioneCulinariaDAOImpl tradizioneCulinariaDAO) {
        this.tradizioneCulinariaDAO = tradizioneCulinariaDAO;
    }

    @Override
    public TradizioneCulinariaProxy mapRow(ResultSet rs, int rowNum) throws SQLException {
        // Mappa i campi base per creare un oggetto Proxy
        return new TradizioneCulinariaProxy(
                rs.getInt("id"),
                rs.getString("titolo"),
                rs.getString("testo"), // Nota: il testo viene caricato eager qui, ma il proxy è pronto per logiche lazy
                rs.getString("regione"),
                rs.getInt("likes"),
                rs.getString("url_ricetta_dettaglio"),
                rs.getString("img"),
                tradizioneCulinariaDAO // Passa il DAO al proxy
        );
    }
}
