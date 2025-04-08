import { Routes } from '@angular/router';
import {RicettarioComponent} from './pages/ricettario/ricettario.component';
import {HomeComponent} from './pages/home/home.component';
import {LoginComponent} from './pages/login/login.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'ricettario', component: RicettarioComponent},
  {path: 'login', component: LoginComponent}
];
