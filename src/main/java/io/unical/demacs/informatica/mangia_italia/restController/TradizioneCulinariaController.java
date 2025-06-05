package io.unical.demacs.informatica.mangia_italia.restController; // !!! ASSICURATI CHE QUESTO PACKAGE SIA ESATTAMENTE IL TUO !!!

import io.unical.demacs.informatica.mangia_italia.DAOImpl.TradizioneCulinariaDAOImpl;
import io.unical.demacs.informatica.mangia_italia.model.TradizioneCulinariaModel;
import io.unical.demacs.informatica.mangia_italia.proxy.TradizioneCulinariaProxy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Rest Controller per la gestione delle Tradizioni Culinarie.
 * Espone API RESTful per operazioni CRUD e specifiche come i likes.
 */
@RestController // Indica che questa classe è un controller REST
@CrossOrigin(origins = "http://localhost:4200") // Permette richieste dal frontend Angular (modifica la porta se diversa)
@RequestMapping("/api/tradizioni") // Definisce il percorso base per tutte le API di questo controller
public class TradizioneCulinariaController {

    private final TradizioneCulinariaDAOImpl tradizioneCulinariaDAO;

    // Costruttore con iniezione di dipendenza del DAO
    public TradizioneCulinariaController(TradizioneCulinariaDAOImpl tradizioneCulinariaDAO) {
        this.tradizioneCulinariaDAO = tradizioneCulinariaDAO;
    }

    /**
     * Recupera tutte le tradizioni culinarie in formato "lazy" (proxy).
     * GET /api/tradizioni/all
     * @return Una lista di TradizioneCulinariaProxy.
     */
    @GetMapping("/all")
    public ResponseEntity<List<TradizioneCulinariaProxy>> getAllTradizioni() {
        List<TradizioneCulinariaProxy> tradizioni = tradizioneCulinariaDAO.getAllLazy();
        return ResponseEntity.ok().header("Content-Type", "application/json").body(tradizioni);
    }

    /**
     * Recupera una singola tradizione culinaria per ID.
     * GET /api/tradizioni/{id}
     * @param id L'ID della tradizione da recuperare.
     * @return La TradizioneCulinariaModel corrispondente o NOT_FOUND.
     */
    @GetMapping("/{id:[0-9]+}") // Regex per assicurarsi che l'ID sia numerico
    public ResponseEntity<TradizioneCulinariaModel> getTradizioneById(@PathVariable Integer id) {
        TradizioneCulinariaModel tradizione = tradizioneCulinariaDAO.get(id);
        if (tradizione != null) {
            return ResponseEntity.ok().header("Content-Type", "application/json").body(tradizione);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Crea una nuova tradizione culinaria.
     * POST /api/tradizioni
     * @param tradizioneModel Il modello della tradizione da salvare.
     * @return La tradizione creata con l'ID generato.
     */
    @PostMapping
    public ResponseEntity<TradizioneCulinariaModel> createTradizione(@RequestBody TradizioneCulinariaModel tradizioneModel) {
        tradizioneCulinariaDAO.save(tradizioneModel);
        // Nota: Il metodo save del DAO non restituisce l'oggetto con l'ID generato
        // In una vera applicazione, potresti voler recuperare l'ID generato dal DB
        // tramite una QueryForGeneratedKeys o un metodo save modificato nel DAO.
        // Per ora, restituiamo il modello inviato.
        return new ResponseEntity<>(tradizioneModel, HttpStatus.CREATED);
    }

    /**
     * Incrementa il contatore dei likes per una tradizione specifica.
     * PUT /api/tradizioni/{id}/like
     * @param id L'ID della tradizione a cui aggiungere un like.
     * @return La tradizione aggiornata o NOT_FOUND.
     */
    @PutMapping("/{id:[0-9]+}/like")
    public ResponseEntity<Void> addLikeToTradizione(@PathVariable Integer id) {
        try {
            tradizioneCulinariaDAO.incrementLikes(id);
            return new ResponseEntity<>(HttpStatus.OK); // O HttpStatus.NO_CONTENT
        } catch (Exception e) {
            // Qui potresti voler gestire in modo più specifico se l'ID non esiste
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Recupera tradizioni culinarie per regione.
     * GET /api/tradizioni/regione/{regione}
     * @param regione La regione per cui cercare le tradizioni.
     * @return Una lista di TradizioneCulinariaProxy per la regione specificata.
     */
    @GetMapping("/regione/{regione}")
    public ResponseEntity<List<TradizioneCulinariaProxy>> getTradizioniByRegione(@PathVariable String regione) {
        List<TradizioneCulinariaProxy> tradizioni = tradizioneCulinariaDAO.getByRegioneLazy(regione);
        return ResponseEntity.ok().header("Content-Type", "application/json").body(tradizioni);
    }

    /**
     * Cerca tradizioni culinarie per titolo (ricerca parziale).
     * GET /api/tradizioni/search?titolo=query
     * @param titolo La stringa di ricerca per il titolo.
     * @return Una lista di TradizioneCulinariaProxy che corrispondono al titolo.
     */
    @GetMapping("/search")
    public ResponseEntity<List<TradizioneCulinariaProxy>> searchTradizioniByTitolo(@RequestParam String titolo) {
        List<TradizioneCulinariaProxy> tradizioni = tradizioneCulinariaDAO.searchByTitoloLazy(titolo);
        return ResponseEntity.ok().header("Content-Type", "application/json").body(tradizioni);
    }

    /**
     * Cancella una tradizione culinaria per ID.
     * DELETE /api/tradizioni/{id}
     * @param id L'ID della tradizione da cancellare.
     */
    @DeleteMapping("/{id:[0-9]+}")
    public ResponseEntity<Void> deleteTradizione(@PathVariable Integer id) {
        try {
            tradizioneCulinariaDAO.delete(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204 No Content per cancellazione riuscita
        } catch (Exception e) {
            // Gestione errori più robusta per database
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Puoi aggiungere anche un metodo PUT per l'aggiornamento completo se necessario.
    // @PutMapping("/{id:[0-9]+}")
    // public ResponseEntity<TradizioneCulinariaModel> updateTradizione(@PathVariable Integer id, @RequestBody TradizioneCulinariaModel tradizioneModel) {
    //     // Assicurati che l'ID nel corpo della richiesta corrisponda all'ID del percorso
    //     tradizioneModel.setId(id);
    //     tradizioneCulinariaDAO.update(tradizioneModel);
    //     return new ResponseEntity<>(tradizioneModel, HttpStatus.OK);
    // }
}
