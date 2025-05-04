import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { Utente } from '../../model/utente';
import { UtenteService } from '../../service/utente.service';
import { FormsModule } from '@angular/forms';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
  GoogleSigninButtonDirective
} from '@abacritt/angularx-social-login';


@Component({
  selector: 'app-finestra-login',
  imports: [
    NgClass,
    FormsModule,
    NgIf,
    GoogleSigninButtonDirective,
  ],
  templateUrl: './finestra-login.component.html',
  styleUrl: './finestra-login.component.css',
  standalone: true
})
export class FinestraLoginComponent {
  @Input() visible: boolean = false;
  @Output() closed = new EventEmitter<void>();
  @Output() registrazioneRichiesta = new EventEmitter<void>();
  public email: string = "";
  public password: string = "";
  public utente: Utente | null = null;
  public erroreLogin: boolean = false;
  public erroreGenerico: boolean = false;

  constructor(private utenteService: UtenteService, private socialAuthService: SocialAuthService) {
    this.socialAuthService.authState.subscribe((user: SocialUser) => {
      if (user) {
        console.log('Login Google avvenuto con successo', user);
        const utenteGoogle: Utente = {
          email: user.email,
          nickname: user.name,
          password: '',
          regioneDiResidenza: ''
        };
        this.utenteService.registraUtente(utenteGoogle);
        this.utenteService.setUtenteCorrente(utenteGoogle);
        this.closeLogin();
      }
    });
  }

  closeLogin(): void {
    this.resetErrori();
    this.closed.emit();
  }

  vaiARegistrazione(): void {
    this.resetErrori();
    this.registrazioneRichiesta.emit();
  }

  submit(): void {
    this.resetErrori();

    try {
      this.utenteService.autenticaUtente(this.email, this.password).subscribe((success) => {
        if (success) {
          this.utente = this.utenteService.getUtenteCorrente();
          this.closeLogin();
        } else {
          this.erroreLogin = true;
        }
      });
    } catch (e) {
      this.erroreGenerico = true;
    }
  }

  signInWithGoogle(): void {
    this.resetErrori();
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(() => {
        console.log('Richiesta login Google inviata');
      })
      .catch((error) => {
        console.error('Errore login con Google', error);
      });
  }

  resetErrori(): void {
    this.erroreLogin = false;
    this.erroreGenerico = false;
  }
}
