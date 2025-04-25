import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { FinestraLoginComponent } from '../finestra-login/finestra-login.component';
import { UtenteService } from '../../service/utente.service';
import { Utente } from '../../model/utente';
import {NgIf} from '@angular/common';
import {FinestraRegisterComponent} from '../finestra-register/finestra-register.component';

@Component({
    selector: 'app-header',
  imports: [RouterModule, RouterLink, RouterLinkActive, FinestraLoginComponent, NgIf, FinestraRegisterComponent],
    templateUrl: './header.component.html',
    standalone: true,
    styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  isLoginVisible = false;
  isRegistrazioneVisible = false;

  utenteCorrente: Utente | null = null;

  constructor(private utenteService: UtenteService) {}

  ngOnInit(): void {
    this.utenteService.utente$.subscribe(utente => {
      if (utente) {
        this.utenteCorrente = utente;
      }
    });
  }

  showLogin() {
    this.isRegistrazioneVisible = false;
    this.isLoginVisible = true;
  }

  showRegistrazione() {
    this.isLoginVisible = false;
    this.isRegistrazioneVisible = true;
  }
}
