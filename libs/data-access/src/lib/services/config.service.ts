import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Nota: Importiamo le interfacce dalla shared-data
import { ThemeConfig, SiteConfig, MenuItem } from '@json-pages/shared-data'; 
import { tap } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private http = inject(HttpClient);
  
  theme: ThemeConfig | null = null;
  site: SiteConfig | null = null;
  menu: MenuItem[] = []; // <--- FIX: Aggiunta proprietà mancante

  async loadConfig(): Promise<void> {
    try {
      const theme$ = this.http.get<ThemeConfig>('/api/config/theme').pipe(
        tap(theme => this.applyTheme(theme))
      );
      this.theme = await firstValueFrom(theme$);

      const site$ = this.http.get<SiteConfig>('/api/config/site');
      this.site = await firstValueFrom(site$);

      // <--- FIX: Caricamento Menu
      const menu$ = this.http.get<MenuItem[]>('/api/config/menu');
      this.menu = await firstValueFrom(menu$) || [];

      console.log('✅ [System] Configurazione Caricata');
    } catch (error) {
      console.error('❌ [System] Errore caricamento config:', error);
    }
  }

  private applyTheme(theme: ThemeConfig): void {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', theme.primaryColor);
    root.style.setProperty('--secondary-color', theme.secondaryColor);
    root.style.setProperty('--font-family', theme.fontFamily);
    document.body.classList.add(`layout-${theme.layout}`);
  }
}