import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-banner-avviso',
  imports: [
  ],
  templateUrl: './banner-avviso.component.html',
  styleUrl: './banner-avviso.component.css',
  standalone: true
})
export class BannerAvvisoComponent {
  @Input() messaggio: string = 'Attenzione: devi essere autenticato per compiere questa azione.';
  @Output() chiuso = new EventEmitter<void>();

  chiudi() {
    this.chiuso.emit();
  }
}
