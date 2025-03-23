import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { RicettarioComponent } from './app/pages/ricettario/ricettario.component';
import { provideHttpClient } from '@angular/common/http';
import {HomeComponent} from './app/pages/home/home.component';

bootstrapApplication(HomeComponent, {
  ...appConfig,
  providers: [...(appConfig.providers || []), provideHttpClient()]
}).catch((err) => console.error(err));

