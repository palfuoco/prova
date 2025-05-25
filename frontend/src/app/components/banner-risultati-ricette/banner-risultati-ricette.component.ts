import {Component, HostListener} from '@angular/core';
import {MapComponent} from '../map/map.component';
import {NgForOf, NgIf} from '@angular/common';
import {RicetteService} from '../../service/ricette.service';
import {FormsModule} from '@angular/forms';
import {PreferitiService} from '../../service/preferiti.service';
import {Ricetta} from '../../model/ricetta';
import {RouterLink, RouterModule} from '@angular/router';
import {UtenteService} from '../../service/utente.service';
import {BannerAvvisoComponent} from '../banner-avviso/banner-avviso.component';

@Component({
  selector: 'app-banner-risultati-ricette',
  imports: [MapComponent, NgIf, FormsModule, NgForOf, RouterLink, BannerAvvisoComponent, RouterModule],
  templateUrl: './banner-risultati-ricette.component.html',
  standalone: true,
  styleUrl: './banner-risultati-ricette.component.css'
})
export class BannerRisultatiRicetteComponent {
  showMap: boolean = false;
  numRicetteTrovate: number = 0;
  selectedTipo: string = "";
  selectedTempo: number = 0;

  mostraBanner = false;

  ricettePreferite: Ricetta[] = [];
  preferitiOpen = false;

  constructor(private ricetteService: RicetteService, private preferitiService: PreferitiService, private utenteService: UtenteService) {
    this.ricetteService.numRicette$.subscribe((num) => {
      this.numRicetteTrovate = num;
    });
    this.mostraBanner = false;
  }

  toggleMap(event: Event) {
    event.preventDefault();
    this.showMap = !this.showMap;
  }

  onTipoChange(): void {
    if (this.selectedTipo) {
      this.ricetteService.showRicetteByTipo(this.selectedTipo);
    }
  }

  onTempoChange(): void {
    if (this.selectedTempo) {
      this.ricetteService.showRicettaByTempoPreparazione(this.selectedTempo);
    }
  }

  resetFiltri(): void {
    this.selectedTipo = '';
    this.selectedTempo = 0;
    this.ricetteService.showAll();
  }

  filtraOpen = false;

  toggleFiltraDropdown() {
    this.filtraOpen = !this.filtraOpen;
  }

  @HostListener('document:click', ['$event'])
  closeDropdownOnClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.custom-dropdown')) {
      this.filtraOpen = false;
      this.preferitiOpen = false;
    }
  }

  togglePreferitiDropdown(): void {
    const email: string | null = this.getEmailUtente();

    if (!email) {
      this.mostraBanner = true;
      return;
    }

    this.preferitiOpen = !this.preferitiOpen;
    this.filtraOpen = false;

    if (this.preferitiOpen) {
      this.getAllPreferiti();
    }
  }



  getEmailUtente(): string | null {
    const email: string | undefined = this.utenteService.getUtenteCorrente()?.email;
    if (!email) {
      return null;
    }
    return email;
  }

  removePreferito(idRicetta: number): void {
    const email: string | null = this.getEmailUtente();
    if (!email) {
      this.mostraBanner = true;
      return;
    }

    this.preferitiService.deletePreferito(email, idRicetta).subscribe(() => {
      this.getAllPreferiti();
      this.ricettePreferite = this.ricettePreferite.filter(r => r.id !== idRicetta);
      window.location.reload();
    });
    this.preferitiService.refreshLista();
  }

  getAllPreferiti(): void {
    const email: string | null = this.getEmailUtente();
    if (!email) {
      // NON mostrare subito il banner. Solo log.
      console.warn('Utente non autenticato, impossibile caricare preferiti');
      return;
    }

    this.preferitiService.getPreferitiRicette(email).subscribe((ricette: Ricetta[]) => {
      this.ricettePreferite = ricette;
    });
  }



}
