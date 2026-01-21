import { Injectable, Scope, Logger } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

@Injectable({ scope: Scope.REQUEST })
export class TenantService {
  private readonly logger = new Logger(TenantService.name);
  private _tenantId: string = 'default'; // Default fallback

  // 👇 MODIFICA QUI: Aggiunto 'tenants' al percorso base
  private readonly rootDataStore = path.join(process.cwd(), 'data-store', 'tenants');

  setTenant(tenantId: string) {
    this._tenantId = tenantId;
  }

  get tenantId(): string {
    return this._tenantId;
  }

  get basePath(): string {
    const fullPath = path.join(this.rootDataStore, this._tenantId);
    
    // Verifica silenziosa per performance, logga solo se serve debug
    // const exists = fs.existsSync(fullPath); 
    
    return fullPath;
  }
}