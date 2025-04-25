package io.unical.demacs.informatica.mangia_italia.restController;



import io.unical.demacs.informatica.mangia_italia.DAOImpl.RecensioneDAOImp;
import io.unical.demacs.informatica.mangia_italia.model.RecensioneModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/recensioni")
public class RecensioneController {

    private final RecensioneDAOImp recensioneDAO;

    public RecensioneController(RecensioneDAOImp recensioneDao) {
        this.recensioneDAO = recensioneDao;

    }


    @PostMapping("/ricetta/{id}")
    public void createReview(@PathVariable int id, @RequestBody RecensioneModel recensione) {
        recensione.setId_ricetta(id);
        recensioneDAO.saveRecensione(recensione);
    }

    @GetMapping("/ricetta/{id}")
    public ResponseEntity<List<RecensioneModel>> getRecensioniByRicetta(@PathVariable int id) {
        return ResponseEntity.ok(recensioneDAO.getRecensioniByRicetta(id));
    }
}

