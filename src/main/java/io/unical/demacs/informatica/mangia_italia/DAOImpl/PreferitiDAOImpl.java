package io.unical.demacs.informatica.mangia_italia.DAOImpl;

import io.unical.demacs.informatica.mangia_italia.DAO;
import io.unical.demacs.informatica.mangia_italia.mapper.PreferitiRowMapper;
import io.unical.demacs.informatica.mangia_italia.model.PreferitiModel;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PreferitiDAOImpl implements DAO<PreferitiModel,String> {
    private final JdbcTemplate jdbcTemplate;
    private final String SELECT_ALL = "SELECT * FROM preferiti";
    private final String SELECT_BY_EMAIL = "SELECT * FROM preferiti WHERE email_utente = ?";
    private final String INSERT_QUERY = "INSERT INTO preferiti(email_utente,id_ricetta) VALUES(?,?)";
    private static final String UPDATE_QUERY = "UPDATE preferiti SET id_ricetta = ? WHERE email_utente = ?";
    private static final String DELETE_QUERY = "DELETE preferiti WHERE email_utente = ? AND id_ricetta = ?";

    public PreferitiDAOImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public PreferitiModel get(String email) {
        return null;
    }


    public List<PreferitiModel> getByEmail(String email) {
        return jdbcTemplate.query(SELECT_BY_EMAIL, new PreferitiRowMapper(), email);
    }

    @Override
    public List<PreferitiModel> getAll() {
        return jdbcTemplate.query(SELECT_ALL, new PreferitiRowMapper());
    }

    @Override
    public void save(PreferitiModel preferitiModel) {
        jdbcTemplate.update(INSERT_QUERY,
                preferitiModel.getUtente().getEmail(),
                preferitiModel.getRicetta().getId());
    }

    @Override
    public void update(PreferitiModel preferitiModel) {
        jdbcTemplate.update(UPDATE_QUERY,
                preferitiModel.getRicetta().getId(),
                preferitiModel.getUtente().getEmail());

    }

    @Override
    public void delete(String key) {
        jdbcTemplate.update(DELETE_QUERY, key);
    }

    public void delete(String email_utente, Integer id_ricetta) {
        jdbcTemplate.update(DELETE_QUERY, email_utente, id_ricetta);
    }
}
