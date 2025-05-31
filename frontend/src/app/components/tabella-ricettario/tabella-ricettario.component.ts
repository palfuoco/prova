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
export class TabellaRicettarioComponent implements OnInit, AfterViewInit {
  public ricette: Ricetta[] = [];

  alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  private suppressActiveUpdate = false;
  activeLetter: string = '';

  constructor(private ricetteService: RicetteService) {}

  ngOnInit() {
    this.ricetteService.ricette$.subscribe((data) => {
      this.ricette = data;
    });

    this.ricetteService.showAll();
  }

  ngAfterViewInit() {
    window.addEventListener('scroll', this.updateActiveLetter.bind(this));
  }


  scrollToLetter(letter: string, event: Event): void {
    event.preventDefault();

    const element = document.getElementById('letter-' + letter);
    if (element) {
      this.suppressActiveUpdate = true;
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.activeLetter = letter;

      setTimeout(() => {
        this.suppressActiveUpdate = false;
      }, 600);
    }
  }


  updateActiveLetter(): void {
    if (this.suppressActiveUpdate) return;

    const headings = this.alphabet
      .map(letter => ({
        letter,
        el: document.getElementById('letter-' + letter)
      }))
      .filter(obj => obj.el !== null);

    for (let i = headings.length - 1; i >= 0; i--) {
      const { letter, el } = headings[i]!;
      const rect = el!.getBoundingClientRect();
      if (rect.top <= 120) {
        this.activeLetter = letter;
        break;
      }
    }
  }




}
