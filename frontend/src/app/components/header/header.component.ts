import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { FinestraLoginComponent } from '../finestra-login/finestra-login.component';
import { UtenteService } from '../../service/utente.service';
import { Utente } from '../../model/utente';
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {FinestraRegisterComponent} from '../finestra-register/finestra-register.component';
import {RicetteService} from '../../service/ricette.service';
import {debounceTime, distinctUntilChanged, Subject, switchMap} from 'rxjs';

@Component({
    selector: 'app-header',
  imports: [RouterModule, RouterLink, RouterLinkActive, FinestraLoginComponent, NgIf, FinestraRegisterComponent, NgForOf],
    templateUrl: './header.component.html',
    standalone: true,
    styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  isLoginVisible = false;
  isRegistrazioneVisible = false;
  ricetteCercate: any[] = [];
  path_img: string = "assets/img_ricette/";
  private searchTerms = new Subject<string>();

  utenteCorrente: Utente | null = null;

  constructor(private utenteService: UtenteService, private ricetteService: RicetteService) {}

  ngOnInit(): void {
    this.utenteService.utente$.subscribe(utente => {
      if (utente) {
        this.utenteCorrente = utente;
      }
    });

    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) =>
        this.ricetteService.searchRicetteByNome(term)
      )
    ).subscribe(results => this.ricetteCercate = results);
  }

  showLogin() {
    this.isRegistrazioneVisible = false;
    this.isLoginVisible = true;
  }

  showRegistrazione() {
    this.isLoginVisible = false;
    this.isRegistrazioneVisible = true;
  }

  logout(): void {
    this.utenteService.logout();
    this.utenteCorrente = null;
  }

  searchRicetta(term: string): void {
    this.searchTerms.next(term);
  }

  getInitials(nickname: string): string {
    if (!nickname) return '';
    return nickname.slice(0, 2).toUpperCase();
  }


}
