package io.unical.demacs.informatica.mangia_italia.DAOImpl;



import io.unical.demacs.informatica.mangia_italia.mapper.RecensioneRowMapper;
import io.unical.demacs.informatica.mangia_italia.model.RecensioneModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@Repository
public class RecensioneDAOImp {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final String INSERT_REVIEW =
            "INSERT INTO recensione (voto, commento, data_pubblicazione, email_utente, id_ricetta) VALUES (?, ?, ?, ?, ?)";

    private static final String SELECT_BY_RICETTA =
            "SELECT * FROM recensione WHERE id_ricetta = ? ORDER BY data_pubblicazione DESC";

    public void saveRecensione(RecensioneModel recensione) {
        jdbcTemplate.update(
                INSERT_REVIEW,
                recensione.getVoto(),
                recensione.getCommento(),
                Date.valueOf(LocalDate.now()),
                recensione.getUtente().getEmail(),
                recensione.getRicetta().getId()

        );

    }

    public List<RecensioneModel> getRecensioniByRicetta(int ricettaId) {
        return jdbcTemplate.query(SELECT_BY_RICETTA, new Object[]{ricettaId}, new RecensioneRowMapper());
    }
}
