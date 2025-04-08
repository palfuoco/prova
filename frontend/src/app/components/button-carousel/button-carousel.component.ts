import { AfterViewInit, Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import {NgForOf} from '@angular/common';
import {ApiService} from '../../apiService';
import {Regione} from '../../model/regione';

@Component({
  selector: 'app-button-carousel',
  templateUrl: './button-carousel.component.html',
  styleUrls: ['./button-carousel.component.css'],
  standalone: true,
  imports: [
    NgForOf
  ]
})
export class ButtonCarouselComponent implements AfterViewInit, OnInit {
  constructor(private apiService: ApiService<Regione>) {}
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;
  private apiUrl: string = "http://localhost:8080/api/regioni";
  public buttonPremuti: string[] = [];

  public regioni: Regione[] = [];

  ngOnInit(): void {
    this.apiService.getAll(this.apiUrl + "/all_lazy").subscribe((data) => {
      this.regioni = data;
    });
  }

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
