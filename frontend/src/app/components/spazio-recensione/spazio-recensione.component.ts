import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Recensione } from '../../model/recensione';
import { RecensioniService } from '../../service/recensioni.service';
import { UtenteService } from '../../service/utente.service';


@Component({
  standalone: true,
  selector: 'app-spazio-recensione',
  imports: [FormsModule, CommonModule],
  templateUrl: './spazio-recensione.component.html',
  styleUrl: './spazio-recensione.component.css'
})
export class SpazioRecensioneComponent implements OnInit {
  @Input() id_ricetta!: number;
  hoverVoto: number = 0;



  recensioni: Recensione[] = [];
  mostraTutte: boolean = false;

  nuovaRecensione = {
    voto: 0,
    commento: '',
  };

  constructor(
    private recensioniService: RecensioniService,
    private utenteService: UtenteService
  ) {}


  ngOnInit(): void {
    this.caricaRecensioni();
  }

  caricaRecensioni(): void {
    this.recensioniService.getRecensioniByRicettaId(this.id_ricetta).subscribe(data => {
      this.recensioni = data;
      console.log("Recensioni caricate:", this.recensioni);
    });
  }

  setVoto(voto: number): void {
    this.nuovaRecensione.voto = voto;
  }



  inviaRecensione(): void {
    if (this.nuovaRecensione.voto === 0 || !this.nuovaRecensione.commento.trim()) {
      alert("Per favore inserisci un voto e un commento.");
      return;
    }



    const utente = this.utenteService.getUtenteCorrente();
    if (!utente) {
      alert("Devi essere loggato per inviare una recensione.");
      return;
    }

    const oggi = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"

    const recensione: Recensione = {
      id: 0,
      voto: this.nuovaRecensione.voto,
      commento: this.nuovaRecensione.commento,
      data_pubblicazione: oggi,
      utente: {
        email: utente.email
      },
      ricetta: {
        id: this.id_ricetta
      }
    };
     console.log("ciao");
     console.log(utente.email);
     console.log(this.nuovaRecensione.commento);
     console.log(recensione)
    console.log("Oggetto inviato:", {
      voto: recensione.voto,
      commento: recensione.commento,
      data_pubblicazione: new Date().toISOString().split("T")[0],
      email_utente: utente.email,// o come lo gestisci
      id_ricetta: this.id_ricetta
    });

    this.recensioniService.addRecensione(this.id_ricetta, recensione).subscribe(() => {
      console.log("Recensione inviata:", recensione);
      this.nuovaRecensione = { voto: 0, commento: '' };
      this.caricaRecensioni();
    });
  }



  get recensioniMostrate(): Recensione[] {
    return this.mostraTutte ? this.recensioni : this.recensioni.slice(0, 3);
  }

  toggleMostraTutte(): void {
    this.mostraTutte = !this.mostraTutte;
  }


}
