import { Controller, Get, Query } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';

@Controller('system')
export class SystemController {
  
  @Get('resolve')
  async resolveTenant(@Query('hostname') hostname: string) {
    const domainsPath = path.join(process.cwd(), 'data-store', 'system', 'domains.json');
    try {
      const data = await fs.readFile(domainsPath, 'utf-8');
      const domains = JSON.parse(data);
      
      // Logica "Dev Override" via query string gestita dal frontend, 
      // qui ci occupiamo del mapping puro.
      const tenantId = domains[hostname] || 'landing';
      
      return { tenantId };
    } catch (e) {
      console.error("Errore critico domains.json", e);
      return { tenantId: 'landing' };
    }
  }
}