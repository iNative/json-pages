import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ThemeConfig, SiteConfig } from '@json-pages/shared-data'; // La nostra lib condivisa
import { tap } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private http = inject(HttpClient);
  
  // Stato locale della configurazione accessibile dai componenti
  theme: ThemeConfig | null = null;
  site: SiteConfig | null = null;

  // Carica le configurazioni (promessa per APP_INITIALIZER)
  async loadConfig(): Promise<void> {
    try {
      // 1. Scarica il TEMA (Colori, Font)
      const theme$ = this.http.get<ThemeConfig>('/api/config/theme').pipe(
        tap(theme => this.applyTheme(theme))
      );
      this.theme = await firstValueFrom(theme$);

      // 2. Scarica INFO SITO (Titolo, Logo)
      const site$ = this.http.get<SiteConfig>('/api/config/site');
      this.site = await firstValueFrom(site$);

      console.log('✅ [System] Configurazione Piattaforma Caricata');
    } catch (error) {
      console.error('❌ [System] Errore caricamento config:', error);
    }
  }

  // Applica le variabili CSS al DOM (Il cuore del Theming)
  private applyTheme(theme: ThemeConfig): void {
    const root = document.documentElement;
    // Sovrascrive le variabili CSS globali
    root.style.setProperty('--primary-color', theme.primaryColor);
    root.style.setProperty('--secondary-color', theme.secondaryColor);
    root.style.setProperty('--font-family', theme.fontFamily);
    
    // Aggiunge classe layout al body (es. 'layout-standard')
    document.body.classList.add(`layout-${theme.layout}`);
  }
}