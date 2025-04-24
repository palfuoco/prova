package io.unical.demacs.informatica.mangia_italia.DAOImpl;



import io.unical.demacs.informatica.mangia_italia.DAO;
import io.unical.demacs.informatica.mangia_italia.mapper.UtenteLazyRowMapper;
import io.unical.demacs.informatica.mangia_italia.model.UtenteModel;
import io.unical.demacs.informatica.mangia_italia.proxy.UtenteProxy;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UtenteDAOImpl implements DAO<UtenteModel, String> {

    private static final String SELECT_USER = "SELECT * FROM utente WHERE nickname=? AND password=?";
    private static final String INSERT_QUERY = "INSERT INTO utente (email, nickname, password, regione_di_residenza) VALUES (?, ?, ?, ?)";
    private static final String UPDATE_QUERY = "UPDATE utente SET email=?, nickname=?, password=?, regione_di_residenza=? WHERE email=?";
    private static final String DELETE_QUERY = "DELETE FROM utente WHERE email=?";

    private final JdbcTemplate jdbcTemplate;

    // Iniezione tramite costruttore
    public UtenteDAOImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<UtenteProxy> getAutenticazione(String nickname, String password) {
        try {
            System.out.println("Tentativo di autenticazione per utente: " + nickname);
            return jdbcTemplate.query(SELECT_USER, new Object[]{nickname, password}, new UtenteLazyRowMapper(this));
        } catch (Exception e) {
            System.out.println("non ha trovato");
            return null;
        }
    }

    @Override
    public UtenteModel get(String key) {
        return null;
    }

    @Override
    public List<UtenteModel> getAll() {
        return List.of();
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
                utenteModel.getRegioneDiResidenza(),
                utenteModel.getEmail());
    }

    @Override
    public void delete(String email) {
        jdbcTemplate.update(DELETE_QUERY, email);
    }
}
