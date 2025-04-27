import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { SocialAuthServiceConfig } from '@abacritt/angularx-social-login';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('435504857710-3j63c8cmf76aerq0muc5u36avnqbi108.apps.googleusercontent.com', {
              scopes: 'email profile'
            })
          }
        ],
        onError: (err) => {
          console.error('Errore login con Google:', err);
        }
      } as SocialAuthServiceConfig
    }
  ]
};
