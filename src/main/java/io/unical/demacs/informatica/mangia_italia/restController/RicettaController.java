package io.unical.demacs.informatica.mangia_italia.restController;

import io.unical.demacs.informatica.mangia_italia.DAOImpl.RicettaDAOImpl;
import io.unical.demacs.informatica.mangia_italia.model.RicettaModel;
import io.unical.demacs.informatica.mangia_italia.proxy.RicettaProxy;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/ricette")
public class RicettaController {
    private final RicettaDAOImpl ricettaDAO;

    public RicettaController(RicettaDAOImpl ricettaDAO) {
        this.ricettaDAO = ricettaDAO;
    }

    @GetMapping("/all")
    public ResponseEntity<List<RicettaProxy>> getAllRicetta() {
        List<RicettaProxy> ricette = ricettaDAO.getAllLazy();
        return ResponseEntity.ok().header("Content-Type", "application/json").body(ricette);
    }

    @PostMapping
    public void createRicetta(@RequestBody RicettaModel ricettaModel) {
        ricettaDAO.save(ricettaModel);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RicettaModel> getRicettaById(@PathVariable int id) {
        return ResponseEntity.ok().header("Content-Type","application/json").body(ricettaDAO.get(id));
    }

    @GetMapping("/portata/{tipo}")
    public ResponseEntity<List<RicettaProxy>> getRicettaByTipo(@PathVariable String tipo) {
        return ResponseEntity.ok().header("Content-Type","application/json").body(ricettaDAO.getByTipoLazy(tipo));
    }

    @GetMapping("/tempo_preparazione/{tempoPreparazione}")
    public ResponseEntity<List<RicettaProxy>> getRicettaByTempoPreparazione(@PathVariable Integer tempoPreparazione) {
        return ResponseEntity.ok().header("Content-Type","application/json").body(ricettaDAO.getByTempoPreparazioneLazy(tempoPreparazione));
    }

    @GetMapping("/regioni")
    public ResponseEntity<List<RicettaProxy>> getRicetteByRegioni(@RequestParam List<String> regioni) {
        return ResponseEntity.ok()
                .header("Content-Type", "application/json")
                .body(ricettaDAO.getByRegioniLazy(regioni.toArray(new String[0])));
    }

    @GetMapping("/regione")
    public ResponseEntity<List<RicettaProxy>> getRicetteByRegione(@PathVariable String regione) {
        return ResponseEntity.ok()
                .header("Content-Type", "application/json")
                .body(ricettaDAO.getByRegioneLazy(regione));
    }

    @DeleteMapping("/{id}")
    public void deleteRicetta(@PathVariable int id) {
        ricettaDAO.delete(id);
    }
}
