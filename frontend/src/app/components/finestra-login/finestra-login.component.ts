import { Component, EventEmitter, Input, Output } from '@angular/core';
import {NgClass} from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {ApiService} from '../../apiService';
import {Ricetta} from '../../model/ricetta';
import {RicetteService} from '../../service/ricette.service';

@Component({
  selector: 'app-finestra-login',
  imports: [
    NgClass,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './finestra-login.component.html',
  styleUrl: './finestra-login.component.css'
})
export class FinestraLoginComponent {
  @Input() visible: boolean = false;
  @Output() closed = new EventEmitter<void>();
  private apiUrl = 'http://localhost:8080/api/ricette';


  closeLogin(): void {
    this.closed.emit();
  }

  submit(): void {

  }
}
