//import { Component } from '@angular/core';
import { Component, inject, OnInit, Output, EventEmitter} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import {ApiService} from '../../apiService';
import {Ricetta} from '../../model/ricetta';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-dettagli-ricetta',
  imports: [CommonModule, NgIf],
  templateUrl: './dettagli-ricetta.component.html',
  styleUrl: './dettagli-ricetta.component.css',
  standalone: true
})
export class DettagliRicettaComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private apiService = inject(ApiService<Ricetta>);

  public ricetta?: Ricetta;

  passaggiPreparazione: string[] = [];




  @Output() idRicettaLoaded = new EventEmitter<number>();
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apiService.getByValue('http://localhost:8080/api/ricette', +id).subscribe((data) => {
        console.log(data)
        this.ricetta = data;


        // Ora che abbiamo i dati, possiamo lavorare sulla descrizione
        const descrizione = this.ricetta?.descrizionePreparazione;
        this.idRicettaLoaded.emit(+id);

        if (descrizione) {
          // Procedi con la divisione dei passaggi
          this.passaggiPreparazione = descrizione
            .split(/[0-9]+\.[ ]?/)  // Regola la regex a seconda della formattazione
            .filter(s => s.trim() !== '');  // Rimuovi eventuali passaggi vuoti
        }


      });
    }
  }

}
