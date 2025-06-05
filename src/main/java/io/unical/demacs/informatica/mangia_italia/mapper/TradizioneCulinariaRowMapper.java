package io.unical.demacs.informatica.mangia_italia.mapper;

import io.unical.demacs.informatica.mangia_italia.model.TradizioneCulinariaModel;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class TradizioneCulinariaRowMapper implements RowMapper<TradizioneCulinariaModel> {

    @Override
    public TradizioneCulinariaModel mapRow(ResultSet rs, int rowNum) throws SQLException {
        TradizioneCulinariaModel tradizione = new TradizioneCulinariaModel();
        tradizione.setId(rs.getInt("id")); // Assumiamo che 'id' sia una colonna INT
        tradizione.setTitolo(rs.getString("titolo"));
        tradizione.setTesto(rs.getString("testo"));
        tradizione.setRegione(rs.getString("regione"));
        tradizione.setLikes(rs.getInt("likes")); // Assumiamo che 'likes' sia una colonna INT
        tradizione.setUrlRicettaDettaglio(rs.getString("url_ricetta_dettaglio"));
        tradizione.setImg(rs.getString("img")); // Mappa il campo 'img'
        return tradizione;
    }
}
