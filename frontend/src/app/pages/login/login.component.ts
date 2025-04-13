import { Component } from '@angular/core';
import {HeaderComponent} from "../../components/header/header.component";
import {FooterComponent} from '../../components/footer/footer.component';
import {Title} from '@angular/platform-browser';
import {FinestraLoginComponent} from '../../components/finestra-login/finestra-login.component';

@Component({
  selector: 'app-login',
  imports: [
    HeaderComponent,
    FooterComponent,
    FinestraLoginComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle('Login - Mangia Italia');
  }
}
