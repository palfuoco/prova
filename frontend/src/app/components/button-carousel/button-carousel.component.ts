import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-button-carousel',
  templateUrl: './button-carousel.component.html',
  styleUrls: ['./button-carousel.component.css'],
  standalone: true,
  imports: [
    NgForOf
  ]
})
export class ButtonCarouselComponent implements AfterViewInit {
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;

  buttons = ['Calabria','Sardegna', 'Sicilia', 'Campania', 'Basilicata', 'Lazio', 'Umbria', 'Lombardia', 'Marche', 'Piemonte', 'Abruzzo', 'Trentino Alto-Adige', 'Veneto', 'Toscana', 'Liguria', 'Emilia Romagna', "Valle d'Aosta", 'Molise', 'Puglia', 'Friuli Venezia Giulia'];

  ngAfterViewInit() {
    const container = this.scrollContainer.nativeElement;

    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    container.addEventListener('mousedown', (e: MouseEvent) => {
      isDown = true;
      container.classList.add('active');
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });

    container.addEventListener('mouseleave', () => {
      isDown = false;
      container.classList.remove('active');
    });

    container.addEventListener('mouseup', () => {
      isDown = false;
      container.classList.remove('active');
    });

    container.addEventListener('mousemove', (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5;
      container.scrollLeft = scrollLeft - walk;
    });

    let touchStartX = 0;
    container.addEventListener('touchstart', (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      scrollLeft = container.scrollLeft;
    });

    container.addEventListener('touchmove', (e: TouchEvent) => {
      const touchX = e.touches[0].clientX;
      const walk = (touchX - touchStartX) * 1.5;
      container.scrollLeft = scrollLeft - walk;
    });
  }


}
