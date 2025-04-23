import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UtenteService } from '../../service/utente.service';
import { Utente } from '../../model/utente';

@Component({
  selector: 'app-finestra-register',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    FormsModule
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
  public utente: Utente[] | null = null;

  public erroreRegistrazione: boolean = false;
  public successoRegistrazione: boolean = false;

  constructor(private utenteService: UtenteService) {}

  closeRegistrazione(): void {
    this.closed.emit();
  }

  vaiALogin(): void {
    this.loginRichiesto.emit();
  }

  register(): void {
    const nuovoUtente: Utente = {
      email: this.email,
      nickname: this.nickname,
      password: this.password,
      regioneDiResidenza: this.regione
    };

    this.utenteService.registraUtente(nuovoUtente);
    this.utenteService.utente$.subscribe((data) => {
      this.utente = data;

      if (this.utente) {
        this.erroreRegistrazione = false;
        this.successoRegistrazione = true;
      } else {
        this.erroreRegistrazione = true;
        this.successoRegistrazione = false;
      }
    });
  }
}
