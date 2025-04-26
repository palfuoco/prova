import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Utente } from '../../model/utente';
import { UtenteService } from '../../service/utente.service';
import { FormsModule } from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-finestra-login',
  imports: [
    NgClass,
    FormsModule,
    NgIf
  ],
  templateUrl: './finestra-login.component.html',
  styleUrl: './finestra-login.component.css',
  standalone: true
})
export class FinestraLoginComponent {
  @Input() visible: boolean = false;
  @Output() closed = new EventEmitter<void>();
  @Output() registrazioneRichiesta = new EventEmitter<void>();
  public nickname: string = "";
  public password: string = "";
  public utente: Utente| null = null;
  public erroreLogin: boolean = false;

  constructor(private utenteService: UtenteService) {}

  closeLogin(): void {
    this.closed.emit();
  }

  vaiARegistrazione(): void {
    this.registrazioneRichiesta.emit();
  }

  submit(): void {
    this.utenteService.autenticaUtente(this.nickname, this.password);

    this.utenteService.utente$.subscribe((data) => {
      this.utente = data;
      if (this.utente) {
        this.erroreLogin = false;
        this.closeLogin();
      } else {
        this.erroreLogin = true;
      }
    });
  }
}
