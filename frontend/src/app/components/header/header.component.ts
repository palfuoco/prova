import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterModule} from '@angular/router';
import {FinestraLoginComponent} from '../finestra-login/finestra-login.component';

@Component({
    selector: 'app-header',
  imports: [RouterModule, RouterLink, RouterLinkActive, FinestraLoginComponent],
    templateUrl: './header.component.html',
    standalone: true,
    styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLoginVisible = false;

  showLogin() {
    this.isLoginVisible = true;
  }
}
