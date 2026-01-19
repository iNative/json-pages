import { Injectable, Scope, Logger } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

@Injectable({ scope: Scope.REQUEST })
export class TenantService {
  private readonly logger = new Logger(TenantService.name);
  private _tenantId: string = 'trinacria'; 
  
  // Usiamo process.cwd() che di solito è la root del workspace
  private readonly rootDataStore = path.join(process.cwd(), 'data-store');

  setTenant(tenantId: string) {
    this._tenantId = tenantId;
  }

  get tenantId(): string {
    return this._tenantId;
  }

  get basePath(): string {
    const fullPath = path.join(this.rootDataStore, this._tenantId);
    
    // 👇 LOG DI DIAGNOSTICA (Verifica esistenza cartella)
    const exists = fs.existsSync(fullPath);
    this.logger.log(`📂 [TenantService] BasePath: ${fullPath}`);
    this.logger.log(`   Esiste su disco? ${exists ? '✅ SÌ' : '❌ NO (Controlla path!)'}`);

    return fullPath;
  }
}