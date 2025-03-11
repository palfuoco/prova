package io.unical.demacs.informatica.mangia_italia.DAOImpl;

import io.unical.demacs.informatica.mangia_italia.DAO;
import io.unical.demacs.informatica.mangia_italia.mapper.RicettaRowMapper;
import io.unical.demacs.informatica.mangia_italia.model.RicettaModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class RicettaDAOImpl implements DAO<RicettaModel, Integer> {
    private static final String SELECT_QUERY = "SELECT * FROM ricetta WHERE id=?";
    private static final String SELECT_QUERY_BY_TIPO = "SELECT * FROM ricetta WHERE tipo =?";
    private static final String SELECT_ALL_QUERY = "SELECT * FROM ricetta";
    private static final String INSERT_QUERY = "INSERT INTO ricetta (nome, descrizione, ingredienti, tempo_preparazione, provincia, regione, difficolta, tipo, descrizione_preparazione, img) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    private static final String UPDATE_QUERY = "UPDATE ricetta SET id=?, nome=?, descrizione=?, ingreidenti=?, tempo_preparazione=?, provincia=?, regione=?, difficolta=?, tipo=?, descrizione_preparazione=?, img=? WHERE id=?";
    private static final String DELETE_QUERY = "DELETE FROM ricetta WHERE id=?";

    @Autowired
    private final JdbcTemplate jdbcTemplate = null;

    @Override
    public RicettaModel get(Integer id) {
        return jdbcTemplate.queryForObject(SELECT_QUERY, new Object[]{id}, new RicettaRowMapper());
    }

    public List<RicettaModel> getByTipo(String tipo) {
        return jdbcTemplate.query(SELECT_QUERY_BY_TIPO, new Object[]{tipo}, new RicettaRowMapper());
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
                ricettaModel.getProvincia(),
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
                ricettaModel.getProvincia(),
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
