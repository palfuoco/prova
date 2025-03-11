import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { RicettarioComponent } from './app/pages/ricettario/ricettario.component';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(RicettarioComponent, {
  ...appConfig,
  providers: [...(appConfig.providers || []), provideHttpClient()]
}).catch((err) => console.error(err));

