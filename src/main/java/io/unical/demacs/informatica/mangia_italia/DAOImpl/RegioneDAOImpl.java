package io.unical.demacs.informatica.mangia_italia.DAOImpl;

import io.unical.demacs.informatica.mangia_italia.DAO;
import io.unical.demacs.informatica.mangia_italia.mapper.RegioneRowMapper;
import io.unical.demacs.informatica.mangia_italia.model.RegioneModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class RegioneDAOImpl implements DAO<RegioneModel,String> {
    private static final String SELECT_QUERY = "SELECT * FROM regione WHERE nome=?";
    private static final String SELECT_ALL_QUERY = "SELECT * FROM regione";
    private static final String INSERT_QUERY = "INSERT INTO regione (nome, latitudine, longitudine) VALUES (?, ?, ?)";
    private static final String UPDATE_QUERY = "UPDATE regione SET nome = ?, latitudine = ?, longitudine = ? WHERE nome = ?";
    private static final String DELETE_QUERY = "DELETE FROM regione WHERE nome=?";
    private static final String SELECT_NUM_RICETTE = "SELECT rg.*, COUNT(rc.id) AS numero_ricette FROM regione AS rg JOIN ricetta AS rc ON rg.nome = rc.regione GROUP BY rg.nome";

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public RegioneModel get(String nome) {
        return jdbcTemplate.queryForObject(SELECT_QUERY, new Object[]{nome}, new RegioneRowMapper());
    }

    @Override
    public List<RegioneModel> getAll() {
        return jdbcTemplate.query(SELECT_ALL_QUERY, new RegioneRowMapper());
    }

    public List<RegioneModel> getNumRicette() {
        return jdbcTemplate.query(SELECT_NUM_RICETTE,new RegioneRowMapper());
    }

    @Override
    public void save(RegioneModel regioneModel) {
        jdbcTemplate.update(INSERT_QUERY,
                regioneModel.getNome(),
                regioneModel.getLatitudine(),
                regioneModel.getLongitudine());

    }

    @Override
    public void update(RegioneModel regioneModel) {
        jdbcTemplate.update(UPDATE_QUERY,
                regioneModel.getNome(),
                regioneModel.getLatitudine(),
                regioneModel.getLongitudine(),
                regioneModel.getNome());
    }

    @Override
    public void delete(String nome) {
        jdbcTemplate.update(DELETE_QUERY, nome);
    }
}
