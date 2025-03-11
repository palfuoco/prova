package io.unical.demacs.informatica.mangia_italia.DAOImpl;

import io.unical.demacs.informatica.mangia_italia.DAO;
import io.unical.demacs.informatica.mangia_italia.model.UtenteModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UtenteDAOImpl implements DAO<UtenteModel, String> {
    private static final String SELECT_QUERY = "SELECT * FROM utente WHERE email=?";
    private static final String SELECT_ALL_QUERY = "SELECT * FROM utente";
    private static final String INSERT_QUERY = "INSERT INTO utente (email, nickname, password, regione_di_residenza) VALUES (?, ?, ?, ?)";
    private static final String UPDATE_QUERY = "UPDATE utente SET email=?, nickname=?, password=? WHERE email=?";
    private static final String DELETE_QUERY = "DELETE FROM utente WHERE email=?";

    @Autowired
    private final JdbcTemplate jdbcTemplate = null;

    @Override
    public UtenteModel get(String email) {
        return jdbcTemplate.queryForObject(SELECT_QUERY, new Object[]{email}, new BeanPropertyRowMapper<>(UtenteModel.class));
    }

    @Override
    public List<UtenteModel> getAll() {
        return jdbcTemplate.query(SELECT_ALL_QUERY, new BeanPropertyRowMapper<>(UtenteModel.class));
    }

    @Override
    public void save(UtenteModel utenteModel) {
        jdbcTemplate.update(INSERT_QUERY,
                utenteModel.getEmail(),
                utenteModel.getNickname(),
                utenteModel.getPassword(),
                utenteModel.getRegioneDiResidenza());

    }

    @Override
    public void update(UtenteModel utenteModel) {
        jdbcTemplate.update(UPDATE_QUERY,
                utenteModel.getEmail(),
                utenteModel.getNickname(),
                utenteModel.getPassword(),
                utenteModel.getRegioneDiResidenza()
        );

    }

    @Override
    public void delete(String email) {
        jdbcTemplate.update(DELETE_QUERY, email);
    }
}
