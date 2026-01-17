import { ApplicationConfig, APP_INITIALIZER, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { ConfigService } from './services/config.service';

// Factory function: Avvia il caricamento config
export function initializeApp(configService: ConfigService) {
  return () => configService.loadConfig();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), // o provideBrowserGlobalErrorListeners
    provideRouter(appRoutes),
    provideHttpClient(),
    // --- BLOCCO INITIALIZER ---
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigService],
      multi: true
    }
    // --------------------------
  ],
};