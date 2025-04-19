import { Component, EventEmitter, Input, Output } from '@angular/core';
import {NgClass} from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {ApiService} from '../../apiService';
import {Ricetta} from '../../model/ricetta';
import {RicetteService} from '../../service/ricette.service';
import {Utente} from '../../model/utente';
import {UtenteService} from '../../service/utente.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-finestra-login',
  imports: [
    NgClass,
    RouterLink,
    RouterLinkActive,
    FormsModule
  ],
  templateUrl: './finestra-login.component.html',
  styleUrl: './finestra-login.component.css'
})
export class FinestraLoginComponent {
  @Input() visible: boolean = false;
  @Output() closed = new EventEmitter<void>();
  public nickname: String="";
  protected password: String="";
  public utente: Utente | null =null;
  public erroreLogin: boolean = false;

  constructor(private utenteService: UtenteService) {}

  closeLogin(): void {
    this.closed.emit();
  }

  submit(): void {
    this.utenteService.autenticaUtente(this.nickname, this.password).subscribe({
      next: (data) => {
        if (data && data.length>0) {
          this.utente = data[0];
          this.erroreLogin = false;
          this.closeLogin();
        } else {
          this.erroreLogin = true;
        }
      },
      error: (err) => {
        console.error("Errore durante l'autenticazione:", err);
        this.erroreLogin = true;
      }
    });
  }
}
