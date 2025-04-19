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

    @PostMapping("/autenticazione")
    public ResponseEntity<?> autenticazione(@RequestBody UtenteModel loginRequest) {
        String nickname = loginRequest.getNickname();
        String password = loginRequest.getPassword();

        UtenteProxy utente = utenteDAO.getAutenticazione(nickname, password);
        if (utente != null) {
            return ResponseEntity.ok().header("Content-Type", "application/json").body(utente);
        } else {
            return ResponseEntity.status(401).body("Credenziali non valide");
        }
    }

    @PostMapping
    public void createUtente(@RequestBody UtenteModel utenteModel) {
        utenteDAO.save(utenteModel);
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