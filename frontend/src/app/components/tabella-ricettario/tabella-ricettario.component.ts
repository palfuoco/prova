import {AfterViewInit, Component, OnInit} from '@angular/core';
import { NgForOf } from '@angular/common';
import {ApiService} from '../../apiService';
import {RicetteService} from '../../service/ricette.service';
import {CardRicettaComponent} from '../card-ricetta/card-ricetta.component';
import {Ricetta} from '../../model/ricetta';


@Component({
  selector: 'app-tabella-ricettario',
  standalone: true,
  imports: [NgForOf, CardRicettaComponent],
  templateUrl: './tabella-ricettario.component.html',
  styleUrls: ['./tabella-ricettario.component.css']
})
export class TabellaRicettarioComponent implements OnInit {
  public ricette: Ricetta[] = [];

  constructor(private ricetteService: RicetteService) {}

  ngOnInit() {
    this.ricetteService.ricette$.subscribe((data) => {
      this.ricette = data;
    });

    this.ricetteService.showAll();
  }
}
