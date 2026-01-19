import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ThemeConfig, SiteConfig, MenuItem } from '@json-pages/shared-data'; 
import { tap } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private http = inject(HttpClient);
  
  // Signal di stato
  loading = signal<boolean>(true);

  theme: ThemeConfig | null = null;
  site: SiteConfig | null = null;
  menu: MenuItem[] = [];

  async loadConfig(): Promise<void> {
    this.loading.set(true);
    
    try {
      const [theme, site, menu] = await Promise.all([
        firstValueFrom(this.http.get<ThemeConfig>('/api/config/theme')),
        firstValueFrom(this.http.get<SiteConfig>('/api/config/site')),
        firstValueFrom(this.http.get<MenuItem[]>('/api/config/menu').pipe(
            tap({ error: () => console.warn('Menu non trovato, uso array vuoto') })
        )).catch(() => []) 
      ]);

      this.theme = theme;
      this.site = site;
      this.menu = menu || [];
      
      this.applyTheme(theme);
      console.log('✅ [System] Configurazione Caricata');

    } catch (error) {
      console.error('❌ [System] Errore critico caricamento config:', error);
    } finally {
      this.loading.set(false);
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