package io.unical.demacs.informatica.mangia_italia.DAOImpl;

import io.unical.demacs.informatica.mangia_italia.DAO;
import io.unical.demacs.informatica.mangia_italia.mapper.RicettaLazyRowMapper;
import io.unical.demacs.informatica.mangia_italia.mapper.RicettaRowMapper;
import io.unical.demacs.informatica.mangia_italia.model.RicettaModel;
import io.unical.demacs.informatica.mangia_italia.proxy.RicettaProxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class RicettaDAOImpl implements DAO<RicettaModel, Integer> {
    private static final String SELECT_QUERY_LAZY = "SELECT id, nome, ingredienti, descrizione, difficolta, tempo_preparazione, img, tipo FROM ricetta";
    private static final String SELECT_QUERY = "SELECT * FROM ricetta WHERE id=?";
    private static final String SELECT_QUERY_BY_TIPO = "SELECT id, nome, ingredienti, descrizione, difficolta, tempo_preparazione, img, tipo FROM ricetta WHERE tipo =?";
    private static final String SELECT_QUERY_BY_TEMPO = "SELECT id, nome, ingredienti, descrizione, difficolta, tempo_preparazione, img, tipo FROM ricetta WHERE tempo_preparazione <= ?";
    private static final String SELECT_QUERY_BY_REGIONE = "SELECT id, nome, ingredienti, descrizione, difficolta, tempo_preparazione, img, tipo FROM ricetta WHERE regione = ?";
    private static final String SELECT_ALL_QUERY = "SELECT * FROM ricetta";
    private static final String INSERT_QUERY = "INSERT INTO ricetta (nome, descrizione, ingredienti, tempo_preparazione, regione, difficolta, tipo, descrizione_preparazione, img) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    private static final String UPDATE_QUERY = "UPDATE ricetta SET id=?, nome=?, descrizione=?, ingreidenti=?, tempo_preparazione=?, regione=?, difficolta=?, tipo=?, descrizione_preparazione=?, img=? WHERE id=?";
    private static final String DELETE_QUERY = "DELETE FROM ricetta WHERE id=?";

    @Autowired
    private final JdbcTemplate jdbcTemplate = null;

    public List<RicettaProxy> getAllLazy() {
        return jdbcTemplate.query(SELECT_QUERY_LAZY, new RicettaLazyRowMapper(this));
    }


    @Override
    public RicettaModel get(Integer id) {
        return jdbcTemplate.queryForObject(SELECT_QUERY, new Object[]{id}, new RicettaRowMapper());
    }

    public List<RicettaProxy> getByTipoLazy(String tipo) {
        return jdbcTemplate.query(SELECT_QUERY_BY_TIPO, new Object[]{tipo}, new RicettaLazyRowMapper(this));
    }

    public List<RicettaProxy> getByTempoPreparazioneLazy(Integer tempoPreparazione) {
        return jdbcTemplate.query(SELECT_QUERY_BY_TEMPO, new Object[]{tempoPreparazione}, new RicettaLazyRowMapper(this));
    }

    public List<RicettaProxy> getByRegioneLazy(String regione) {
        return jdbcTemplate.query(SELECT_QUERY_BY_REGIONE, new Object[]{regione}, new RicettaLazyRowMapper(this));
    }


    @Override
    public List<RicettaModel> getAll() {
        return jdbcTemplate.query(SELECT_ALL_QUERY, new RicettaRowMapper());
    }

    @Override
    public void save(RicettaModel ricettaModel) {
        jdbcTemplate.update(INSERT_QUERY,
                ricettaModel.getNome(),
                ricettaModel.getDescrizione(),
                ricettaModel.getIngredienti(),
                ricettaModel.getTempoPreparazione(),
                ricettaModel.getRegione(),
                ricettaModel.getDifficolta(),
                ricettaModel.getTipo(),
                ricettaModel.getDescrizionePreparazione(),
                ricettaModel.getImg());
    }

    @Override
    public void update(RicettaModel ricettaModel) {
        jdbcTemplate.update(UPDATE_QUERY,
                ricettaModel.getId(),
                ricettaModel.getNome(),
                ricettaModel.getDescrizione(),
                ricettaModel.getIngredienti(),
                ricettaModel.getTempoPreparazione(),
                ricettaModel.getRegione(),
                ricettaModel.getDifficolta(),
                ricettaModel.getTipo(),
                ricettaModel.getDescrizionePreparazione(),
                ricettaModel.getImg(),
                ricettaModel.getId());

    }

    @Override
    public void delete(Integer id) {
        jdbcTemplate.update(DELETE_QUERY, id);
    }
}
