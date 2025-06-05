import { Routes } from '@angular/router';
import { RicettarioComponent } from './pages/ricettario/ricettario.component';
import { HomeComponent } from './pages/home/home.component';
import { RicettaComponent } from './pages/ricetta/ricetta.component';
import { TradizioniComponent } from './pages/tradizioni/tradizioni.component';

export const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'ricettario', component: RicettarioComponent },
  { path: 'dettagli/:id', component: RicettaComponent },
  { path: 'tradizioni', component: TradizioniComponent },

];
