import { Component, EventEmitter, Input, Output } from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UtenteService } from '../../service/utente.service';
import { Utente } from '../../model/utente';

@Component({
  selector: 'app-finestra-register',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    FormsModule,
    NgForOf
  ],
  templateUrl: './finestra-register.component.html',
  styleUrl: './finestra-register.component.css'
})
export class FinestraRegisterComponent {
  @Input() visible: boolean = false;
  @Output() closed = new EventEmitter<void>();
  @Output() loginRichiesto = new EventEmitter<void>();

  public email: string = "";
  public nickname: string = "";
  public password: string = "";
  public regione: string = "";

  public regioni: string[] = [
    'Calabria', 'Sardegna', 'Sicilia', 'Campania', 'Basilicata', 'Lazio', 'Umbria',
    'Lombardia', 'Marche', 'Piemonte', 'Abruzzo', 'Trentino Alto-Adige', 'Veneto',
    'Toscana', 'Liguria', 'Emilia Romagna', "Valle d'Aosta", 'Molise', 'Puglia',
    'Friuli Venezia Giulia'
  ];

  public erroreRegistrazione: boolean = false;
  public successoRegistrazione: boolean = false;
  public erroreEmail: boolean = false;

  constructor(private utenteService: UtenteService) {}

  closeRegistrazione(): void {
    this.resetErrori();
    this.closed.emit();
  }

  vaiALogin(): void {
    this.resetErrori();
    this.loginRichiesto.emit();
  }

  register(): void {
    this.resetErrori();

    const emailValida = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValida.test(this.email)) {
      this.erroreEmail=true;
      return;
    }

    const nuovoUtente: Utente = {
      email: this.email,
      nickname: this.nickname,
      password: this.password,
      regioneDiResidenza: this.regione
    };

    this.utenteService.registraUtente(nuovoUtente).subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.erroreRegistrazione = false;
          this.successoRegistrazione = true;
          this.email="";
          this.nickname="";
          this.password="";
          this.regione="";
        }
      },
      error: (error) => {
        this.erroreRegistrazione = true;
        this.successoRegistrazione = false;
      }
    });
  }

  resetErrori(): void{
    this.erroreRegistrazione = false;
    this.successoRegistrazione = false;
    this.erroreEmail = false;
  }
}
