import {Component, Input, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Ricetta} from '../../model/ricetta';
import {PreferitiService} from '../../service/preferiti.service';
import {NgClass, NgIf} from '@angular/common';
import {BannerAvvisoComponent} from '../banner-avviso/banner-avviso.component';
import {UtenteService} from '../../service/utente.service';

@Component({
  selector: 'app-card-ricetta',
  imports: [RouterLink, NgClass, BannerAvvisoComponent, NgIf],
  templateUrl: './card-ricetta.component.html',
  standalone: true,
  styleUrl: './card-ricetta.component.css'
})
export class CardRicettaComponent implements OnInit{
  path_img: string = "assets/img_ricette/";
  @Input() ricetta!: Ricetta;

  isFavorite: boolean = false;
  mostraBanner = false;
  heartAnimating:boolean = false;


  constructor(private preferitiService: PreferitiService, private utenteService: UtenteService) {}

  ngOnInit() {
    const email = this.utenteService.getUtenteCorrente()?.email;
    if (!email) return;

    this.preferitiService.isPreferito(email, this.ricetta.id)
      .subscribe((result: boolean) => {
        this.isFavorite = result;
      });
  }



  getEmailUtente(): string | null {
    const email: string | undefined = this.utenteService.getUtenteCorrente()?.email;
    if (!email) {
      return null;
    }
    return email;
  }

  togglePreferito(): void {
    const email: string | null = this.getEmailUtente();
    if (email == null) {
      this.mostraBanner = true;
      return;
    }

    this.heartAnimating = true;
    setTimeout(() => this.heartAnimating = false, 400);

    if (this.isFavorite) {
      this.preferitiService.deletePreferito(email, this.ricetta.id).subscribe(() => {
        this.isFavorite = false;
      });
    } else {
      this.preferitiService.addPreferito(email, this.ricetta.id).subscribe(() => {
        this.isFavorite = true;
      });
    }

    this.preferitiService.refreshLista();
  }


}
