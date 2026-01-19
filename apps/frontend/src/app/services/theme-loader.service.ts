import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TenantService, API_URL } from '@json-pages/data-access'; 

@Injectable({ providedIn: 'root' })
export class ThemeLoaderService {
  constructor(
      @Inject(DOCUMENT) private document: Document,
      private tenantService: TenantService
  ) {}

  loadTenantTheme() {
    const tenantId = this.tenantService.tenantId;
    // Poiché siamo nella stessa app, possiamo usare window.location.origin o ricostruire l'url.
    // Ma l'approccio migliore ora che abbiamo spostato i servizi è chiedere al TenantService il basePath se lo avesse, 
    // oppure ricostruirlo come facevamo prima.
    // FIX: Usiamo l'approccio standard ricostruendo l'URL assets
    const apiUrl = 'http://localhost:3000/api'; // O usa inject(API_URL) se lo hai iniettato qui, ma per semplicità:
    const baseUrl = `${apiUrl}/assets/${tenantId}`;

    console.log(`🎨 [ThemeLoader] Caricamento tema per: ${tenantId}`);

    // 1. CSS
    this.loadStyle(`${baseUrl}/css/theme.css`);
    this.loadStyle(`${baseUrl}/css/user.css`);

    // 2. JS (L'ORDINE È CRUCIALE)
    // Prima jQuery
    this.loadScript(`${baseUrl}/js/jquery.min.js`);
    // Poi Popper (spesso richiesto da Bootstrap 4)
    this.loadScript(`${baseUrl}/js/popper.min.js`);
    // Poi Bootstrap
    this.loadScript(`${baseUrl}/js/bootstrap.js`);
    // Poi Plugin vari (AOS è quello che dava errore "init")
    this.loadScript(`${baseUrl}/js/aos.js`); 
    // Infine il tema che usa tutti i precedenti
    this.loadScript(`${baseUrl}/js/theme.js`);
  }

  private loadStyle(url: string) {
    const link = this.document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    this.document.head.appendChild(link);
  }

  private loadScript(url: string) {
    const script = this.document.createElement('script');
    script.src = url;
    script.defer = true;
    script.async = false; // Mantiene l'ordine di esecuzione sequenziale
    this.document.body.appendChild(script);
  }
}