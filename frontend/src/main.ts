import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import {RicettarioComponent} from './app/pages/ricettario/ricettario.component';

bootstrapApplication(RicettarioComponent, appConfig)
  .catch((err) => console.error(err));
