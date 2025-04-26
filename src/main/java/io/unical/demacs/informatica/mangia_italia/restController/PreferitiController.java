package io.unical.demacs.informatica.mangia_italia.restController;

import io.unical.demacs.informatica.mangia_italia.DAOImpl.PreferitiDAOImpl;
import io.unical.demacs.informatica.mangia_italia.model.PreferitiModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/preferiti")
public class PreferitiController {
    private final PreferitiDAOImpl preferitiDAO;

    public PreferitiController(PreferitiDAOImpl preferitiDAO) {
        this.preferitiDAO = preferitiDAO;
    }

    @GetMapping("/all")
    public ResponseEntity<List<PreferitiModel>> getAllPreferiti() {
        return ResponseEntity.ok().header("Content-Type","application/json").body(preferitiDAO.getAll());
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<List<PreferitiModel>> getAllByUtente(@PathVariable String email) {
        return ResponseEntity.ok().header("Content-Type","application/json").body(preferitiDAO.getByEmail(email));
    }

    @PostMapping
    public ResponseEntity<String> savePreferito(@RequestBody PreferitiModel preferito) {
        preferitiDAO.save(preferito);
        return ResponseEntity.ok("Preferito aggiunto con successo.");
    }

    @DeleteMapping("/delete/{emailUtente}/{idRicetta}")
    public ResponseEntity<String> deletePreferito(
            @PathVariable String emailUtente,
            @PathVariable int idRicetta) {
        preferitiDAO.delete(emailUtente, idRicetta);
        return ResponseEntity.ok("Preferito eliminato con successo.");
    }


}
