package io.unical.demacs.informatica.mangia_italia.DAOImpl;

import io.unical.demacs.informatica.mangia_italia.DAO;
import io.unical.demacs.informatica.mangia_italia.mapper.UtenteRowMapper;
import io.unical.demacs.informatica.mangia_italia.model.UtenteModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.security.crypto.bcrypt.BCrypt;

import java.util.List;

@Repository
public class UtenteDAOImpl implements DAO<UtenteModel, String> {
    private static final String SELECT_USER = "SELECT * FROM utente WHERE nickname=?";
    private static final String INSERT_QUERY = "INSERT INTO utente (email, nickname, password, regione_di_residenza) VALUES (?, ?, ?, ?)";
    private static final String UPDATE_QUERY = "UPDATE utente SET email=?, nickname=?, password=? WHERE email=?";
    private static final String DELETE_QUERY = "DELETE FROM utente WHERE email=?";

    @Autowired
    private final JdbcTemplate jdbcTemplate = null;

    public List<UtenteModel> getAutenticazione(String nickname, String password) {
        try {
            List<UtenteModel> utenti = jdbcTemplate.query(
                    SELECT_USER,
                    new Object[]{nickname},
                    new UtenteRowMapper()
            );
            for (UtenteModel utente : utenti) {
                String encryptedPassword = utente.getPassword();
                if (encryptedPassword != null && !encryptedPassword.isEmpty()
                        && BCrypt.checkpw(password, encryptedPassword)) {
                    return List.of(utente);
                }
            }
            return null;
        } catch (Exception e) {
            System.out.println("Errore durante l'autenticazione: " + e.getMessage());
            return null;
        }
    }

    @Override
    public UtenteModel get(String key) {
        return null;
    }

    @Override
    public List<UtenteModel> getAll() {
        return List.of(); /*mmmmh vediamo le password di tutti quelli registrati*/
    }

    @Override
    public void save(UtenteModel utenteModel) {
        String plainPassword = utenteModel.getPassword();
        String encryptedPassword = (plainPassword != null && !plainPassword.isEmpty())
                ? BCrypt.hashpw(plainPassword, BCrypt.gensalt())
                : "";
        jdbcTemplate.update(INSERT_QUERY,
                utenteModel.getEmail(),
                utenteModel.getNickname(),
                encryptedPassword,
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
