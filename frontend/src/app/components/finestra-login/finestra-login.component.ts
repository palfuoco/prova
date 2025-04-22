import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Utente } from '../../model/utente';
import { UtenteService } from '../../service/utente.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-finestra-login',
  imports: [
    NgClass,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    NgIf
  ],
  templateUrl: './finestra-login.component.html',
  styleUrl: './finestra-login.component.css'
})
export class FinestraLoginComponent {
  @Input() visible: boolean = false;
  @Output() closed = new EventEmitter<void>();
  @Output() registrazioneRichiesta = new EventEmitter<void>();
  public nickname: string = "";
  public password: string = "";
  public erroreLogin: boolean = false;
  public noLogin: boolean = false;

  constructor(private utenteService: UtenteService) {}

  closeLogin(): void {
    this.closed.emit();
  }

  vaiARegistrazione(): void {
    this.registrazioneRichiesta.emit();
  }

  submit(): void {
    this.utenteService.autenticaUtente(this.nickname, this.password).subscribe({
      next: (utenti) => {
        if (utenti && utenti.length > 0) {
          this.erroreLogin = false;
          this.noLogin=false;
          this.utenteService['utenteSubject'].next(utenti[0]); // aggiorno l'utente corrente
          this.closeLogin(); // chiudo la finestra
        } else {
          this.noLogin = true;
        }
      },
      error: (err) => {
        console.error("Errore durante l'autenticazione:", err);
        this.erroreLogin = true;
      }
    });
  }
}
