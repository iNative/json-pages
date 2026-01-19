import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { API_URL } from '../tokens'; // 👈 Importiamo il token locale

@Injectable({ providedIn: 'root' })
export class TenantService {
  private http = inject(HttpClient);
  // 👇 Iniettiamo l'URL invece di importare environment.ts
  private apiUrl = inject(API_URL); 
  
  private _tenantId: string = 'landing'; 

  get tenantId(): string { return this._tenantId; }

  async initialize(): Promise<void> {
    const hostname = window.location.hostname;
    
    // DEV MODE Check
    if (hostname.includes('localhost')) {
        const urlParams = new URLSearchParams(window.location.search);
        const override = urlParams.get('tenant');
        if (override) {
            this._tenantId = override;
            return;
        }
    }

    try {
      // Usa this.apiUrl iniettato
      const res = await firstValueFrom(
        this.http.get<{ tenantId: string }>(`${this.apiUrl}/system/resolve?hostname=${hostname}`)
      );
      this._tenantId = res.tenantId;
    } catch (err) {
      console.error('Fallback to landing', err);
      this._tenantId = 'landing';
    }
  }
}