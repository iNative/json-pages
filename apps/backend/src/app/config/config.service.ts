import { Injectable, Logger, Scope } from '@nestjs/common'; // Import Scope
import * as fs from 'fs/promises';
import * as path from 'path';
import { TenantService } from '../tenant/tenant.service';

@Injectable({ scope: Scope.REQUEST })
export class ConfigService {
  private readonly logger = new Logger(ConfigService.name);
  
  constructor(private readonly tenantService: TenantService) {}

  private get configPath(): string {
    // Dinamico: /data-store/{tenant}/config
    return path.join(this.tenantService.basePath, 'config');
  }

  async getTheme() { return this.readConfigFile('theme.json'); }
  async getMenu() { return this.readConfigFile('menu.json'); }
  async getSite() { return this.readConfigFile('site.json'); }

  private async readConfigFile(filename: string) {
    const filePath = path.join(this.configPath, filename);
    try {
      await fs.access(filePath);
      const fileContent = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(fileContent);
    } catch (error) {
      this.logger.warn(`Config ${filename} mancante per ${this.tenantService.tenantId}`);
      return {}; 
    }
  }
}