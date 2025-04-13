import { Component, EventEmitter, Input, Output } from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-finestra-login',
  imports: [
    NgClass
  ],
  templateUrl: './finestra-login.component.html',
  styleUrl: './finestra-login.component.css'
})
export class FinestraLoginComponent {
  @Input() visible: boolean = false;
  @Output() closed = new EventEmitter<void>();

  closeLogin() {
    this.closed.emit();
  }
}
