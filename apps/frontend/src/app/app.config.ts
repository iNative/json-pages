import { ApplicationConfig, APP_INITIALIZER, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { ConfigService } from '@json-pages/data-access';

// 👇 Assicurati di importare appRoutes da QUESTO file locale
import { appRoutes } from './app.routes'; 

export function initializeApp(configService: ConfigService) {
  return () => configService.loadConfig();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    
    // 👇 QUI PASSIAMO LA MAPPA AL MOTORE
    provideRouter(appRoutes, withComponentInputBinding()),
    
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigService],
      multi: true
    }
  ],
};