import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  // Percorso specifico per le configurazioni
  private readonly configPath = path.join(process.cwd(), 'apps/backend/data/config');

  async getThemeConfig() {
    return this.readConfigFile('theme.json');
  }

  async getMenuConfig() {
    return this.readConfigFile('menu.json');
  }

  // AGGIUNTO: Gestione di site.json
  async getSiteConfig() {
    return this.readConfigFile('site.json');
  }

  getData() {
    return { message: 'API is ready' };
  }

  // Metodo helper per leggere i file
  private async readConfigFile(filename: string) {
    const filePath = path.join(this.configPath, filename);
    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(fileContent);
    } catch (error) {
      this.logger.error(`Non riesco a trovare o leggere: ${filename}`, error);
      return {}; // Ritorna oggetto vuoto se fallisce
    }
  }
}