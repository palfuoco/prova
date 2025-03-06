import { Component, ElementRef, ViewChild } from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-button-carousel',
  templateUrl: './button-carousel.component.html',
  standalone: true,
  imports: [
    NgForOf
  ],
  styleUrls: ['./button-carousel.component.css']
})
export class ButtonCarouselComponent {
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;

  buttons = ['Calabria','Sardegna', 'Sicilia', 'Campania', 'Basilicata', 'Lazio', 'Umbria', 'Lombardia', 'Marche', 'Piemonte', 'Abruzzo', 'Trentino Alto-Adige', 'Veneto', 'Toscana', 'Liguria', 'Emilia Romagna', "Valle d'Aosta", 'Molise', 'Puglia', 'Friuli Venezia Giulia'];

  scrollLeft() {
    this.scrollContainer.nativeElement.scrollLeft -= 100;
  }

  scrollRight() {
    this.scrollContainer.nativeElement.scrollLeft += 100;
  }
}
