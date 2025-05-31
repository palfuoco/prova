import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
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
  profiloMenuVisible = false;

  utenteCorrente: Utente | null = null;

  constructor(private utenteService: UtenteService, private ricetteService: RicetteService, private elementRef: ElementRef) {}

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

  toggleProfiloMenu(): void {
    this.profiloMenuVisible = !this.profiloMenuVisible;
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

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside && this.profiloMenuVisible) {
      this.profiloMenuVisible = false;
    }
  }



}
