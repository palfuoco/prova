package io.unical.demacs.informatica.mangia_italia.restController;

import io.unical.demacs.informatica.mangia_italia.DAOImpl.UtenteDAOImpl;
import io.unical.demacs.informatica.mangia_italia.model.UtenteModel;
import io.unical.demacs.informatica.mangia_italia.proxy.UtenteProxy;
import io.unical.demacs.informatica.mangia_italia.mapper.UtenteLazyRowMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/utenti")
public class UtenteController {

    private final UtenteDAOImpl utenteDAO;

    public UtenteController(UtenteDAOImpl utenteDAO) {
        this.utenteDAO = utenteDAO;
    }

    @GetMapping("/autenticazione")
    public ResponseEntity<?> autenticazione(@RequestParam String nickname, @RequestParam String password) {
        List<UtenteProxy> utente = utenteDAO.getAutenticazione(nickname, password);
        if (utente != null && !utente.isEmpty()) {
            return ResponseEntity.ok().body(utente);
        } else {
            return ResponseEntity.status(401).body("Credenziali non valide");
        }
    }

    @GetMapping("registrazione")
    public ResponseEntity<?> registrazione(@RequestParam String email, @RequestParam String nickname, @RequestParam String password, @RequestParam String regione) {
        try {
            UtenteModel utente=new UtenteModel(email, nickname, password, regione);
            utenteDAO.save(utente);
            return ResponseEntity.ok("Utente registrato con successo!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Errore durante la registrazione");
        }
    }

    @PutMapping
    public void updateUtente(@RequestBody UtenteModel utenteModel) {
        utenteDAO.update(utenteModel);
    }

    @DeleteMapping("/{email}")
    public void deleteUtente(@PathVariable String email) {
        utenteDAO.delete(email);
    }
}