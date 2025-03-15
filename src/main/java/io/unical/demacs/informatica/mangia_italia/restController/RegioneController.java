package io.unical.demacs.informatica.mangia_italia.restController;

import io.unical.demacs.informatica.mangia_italia.DAOImpl.RegioneDAOImpl;
import io.unical.demacs.informatica.mangia_italia.model.RegioneModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/regioni")
public class RegioneController {
    private final RegioneDAOImpl regioneDAO;

    public RegioneController(RegioneDAOImpl regioneDAO) {
        this.regioneDAO = regioneDAO;
    }

    @GetMapping("/all")
    public ResponseEntity<List<RegioneModel>> getAllRegioni() {
        List<RegioneModel> regioni = regioneDAO.getAll();
        return ResponseEntity.ok().header("Content-Type","application/json").body(regioni);
    }

    @GetMapping("/num_ricette")
    public ResponseEntity<List<RegioneModel>> getNumRicetteRegioni() {
        return ResponseEntity.ok().header("Content-Type","application/json").body(regioneDAO.getNumRicette());
    }

}

