package io.unical.demacs.informatica.mangia_italia.DAOImpl;

import io.unical.demacs.informatica.mangia_italia.DAO;
import io.unical.demacs.informatica.mangia_italia.mapper.TradizioneCulinariaRowMapper;
import io.unical.demacs.informatica.mangia_italia.mapper.TradizioneCulinariaLazyRowMapper;
import io.unical.demacs.informatica.mangia_italia.model.TradizioneCulinariaModel;
import io.unical.demacs.informatica.mangia_italia.proxy.TradizioneCulinariaProxy;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;


@Repository // Indica a Spring che questa classe è un componente di repository
public class TradizioneCulinariaDAOImpl implements DAO<TradizioneCulinariaModel, Integer> {

    // --- Query SQL ---
    // Questi nomi di colonne e tabelle DEVONO corrispondere al tuo database!
    private static final String SELECT_QUERY_LAZY = "SELECT id, titolo, testo, regione, likes, url_ricetta_dettaglio, img FROM tradizione_culinaria ORDER BY titolo";
    private static final String SELECT_QUERY = "SELECT id, titolo, testo, regione, likes, url_ricetta_dettaglio, img FROM tradizione_culinaria WHERE id=?";
    private static final String SELECT_ALL_QUERY = "SELECT id, titolo, testo, regione, likes, url_ricetta_dettaglio, img FROM tradizione_culinaria ORDER BY titolo";
    // Nota: l'ID viene gestito automaticamente dal DB (es. SERIAL o AUTO_INCREMENT), quindi non lo passiamo nell'INSERT
    private static final String INSERT_QUERY = "INSERT INTO tradizione_culinaria (titolo, testo, regione, likes, url_ricetta_dettaglio, img) VALUES (?, ?, ?, ?, ?, ?)";
    private static final String UPDATE_QUERY = "UPDATE tradizione_culinaria SET titolo=?, testo=?, regione=?, likes=?, url_ricetta_dettaglio=?, img=? WHERE id = ?";
    private static final String DELETE_QUERY = "DELETE FROM tradizione_culinaria WHERE id=?";
    private static final String SELECT_BY_REGIONE_QUERY = "SELECT id, titolo, testo, regione, likes, url_ricetta_dettaglio, img FROM tradizione_culinaria WHERE regione = ? ORDER BY titolo";
    private static final String SEARCH_QUERY_BY_TITOLO = "SELECT id, titolo, testo, regione, likes, url_ricetta_dettaglio, img FROM tradizione_culinaria WHERE LOWER(titolo) LIKE LOWER(?) ORDER BY titolo";
    private static final String UPDATE_LIKES_QUERY = "UPDATE tradizione_culinaria SET likes = likes + 1 WHERE id = ?";


    @Autowired
    private JdbcTemplate jdbcTemplate; // Rimosso 'final = null;' per permettere l'iniezione da Spring

    // Metodo per recuperare tutte le tradizioni in formato "lazy" (con proxy)
    public List<TradizioneCulinariaProxy> getAllLazy() {
        return jdbcTemplate.query(SELECT_QUERY_LAZY, new TradizioneCulinariaLazyRowMapper(this));
    }

    @Override
    public TradizioneCulinariaModel get(Integer id) {
        return jdbcTemplate.queryForObject(SELECT_QUERY, new Object[]{id}, new TradizioneCulinariaRowMapper());
    }

    @Override
    public List<TradizioneCulinariaModel> getAll() {
        return jdbcTemplate.query(SELECT_ALL_QUERY, new TradizioneCulinariaRowMapper());
    }

    @Override
    public void save(TradizioneCulinariaModel tradizioneModel) {
        // Inserimento di una nuova tradizione
        jdbcTemplate.update(INSERT_QUERY,
                tradizioneModel.getTitolo(),
                tradizioneModel.getTesto(),
                tradizioneModel.getRegione(),
                tradizioneModel.getLikes() != null ? tradizioneModel.getLikes() : 0, // Assicura che likes non sia null
                tradizioneModel.getUrlRicettaDettaglio(),
                tradizioneModel.getImg());
    }

    @Override
    public void update(TradizioneCulinariaModel tradizioneModel) {
        // Aggiornamento di una tradizione esistente
        jdbcTemplate.update(UPDATE_QUERY,
                tradizioneModel.getTitolo(),
                tradizioneModel.getTesto(),
                tradizioneModel.getRegione(),
                tradizioneModel.getLikes() != null ? tradizioneModel.getLikes() : 0, // Assicura che likes non sia null
                tradizioneModel.getUrlRicettaDettaglio(),
                tradizioneModel.getImg(),
                tradizioneModel.getId()); // ID per la clausola WHERE
    }

    @Override
    public void delete(Integer id) {
        jdbcTemplate.update(DELETE_QUERY, id);
    }

    // --- Metodi aggiuntivi specifici per TradizioneCulinaria, simili a RicettaDAOImpl ---

    public List<TradizioneCulinariaProxy> getByRegioneLazy(String regione) {
        return jdbcTemplate.query(SELECT_BY_REGIONE_QUERY, new Object[]{regione}, new TradizioneCulinariaLazyRowMapper(this));
    }

    public List<TradizioneCulinariaProxy> searchByTitoloLazy(String titolo) {
        String searchTerm = "%" + titolo + "%";
        return jdbcTemplate.query(SEARCH_QUERY_BY_TITOLO, new Object[]{searchTerm}, new TradizioneCulinariaLazyRowMapper(this));
    }

    // Metodo per incrementare i likes
    public void incrementLikes(Integer id) {
        jdbcTemplate.update(UPDATE_LIKES_QUERY, id);
    }

    // Metodo per getByRegioniLazy (se avrai bisogno di filtrare per più regioni contemporaneamente)
    public List<TradizioneCulinariaProxy> getByRegioniLazy(String[] regioni) {
        if (regioni == null || regioni.length == 0) {
            return new ArrayList<>();
        }
        String placeholders = String.join(",", Collections.nCopies(regioni.length, "?"));
        String query = "SELECT id, titolo, testo, regione, likes, url_ricetta_dettaglio, img FROM tradizione_culinaria WHERE regione IN (" + placeholders + ") ORDER BY titolo";
        Object[] params = Arrays.copyOf(regioni, regioni.length, Object[].class);
        return jdbcTemplate.query(query, params, new TradizioneCulinariaLazyRowMapper(this));
    }
}