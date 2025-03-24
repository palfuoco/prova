import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterModule} from '@angular/router';

@Component({
    selector: 'app-header',
    imports: [RouterModule, RouterLink, RouterLinkActive],
    templateUrl: './header.component.html',
    standalone: true,
    styleUrl: './header.component.css'
})
export class HeaderComponent {

}
