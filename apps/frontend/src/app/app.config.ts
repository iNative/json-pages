import { ApplicationConfig, APP_INITIALIZER, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { appRoutes } from './app.routes';
import { tenantInterceptor } from './interceptors/tenant.interceptor';
import { environment } from '../environments/environment'; // L'App PUÒ importare environment

// 👇 Importa dalla LIB
import { ConfigService, TenantService, API_URL } from '@json-pages/data-access';

export function initTenant(tenantService: TenantService) {
  return () => tenantService.initialize();
}

export function initConfig(configService: ConfigService) {
  return () => configService.loadConfig();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([tenantInterceptor])),
    
    // 👇 FORNIAMO IL VALORE AL TOKEN
    { provide: API_URL, useValue: environment.apiUrl },

    {
      provide: APP_INITIALIZER,
      useFactory: initTenant,
      deps: [TenantService],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [ConfigService],
      multi: true
    }
  ],
};