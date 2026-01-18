import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class ConfigService {
  private readonly logger = new Logger(ConfigService.name);
  // Percorso assoluto basato sulla root del monorepo
  private readonly configPath = path.join(process.cwd(), 'apps/backend/data/config');

  async getTheme() {
    return this.readConfigFile('theme.json');
  }

  async getMenu() {
    return this.readConfigFile('menu.json');
  }

  async getSite() {
    return this.readConfigFile('site.json');
  }

  private async readConfigFile(filename: string) {
    const filePath = path.join(this.configPath, filename);
    try {
      // Verifica esistenza
      await fs.access(filePath);
      const fileContent = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(fileContent);
    } catch (error) {
      this.logger.error(`Errore lettura config ${filename}: ${error.message}`);
      // Ritorniamo un oggetto vuoto o lanciamo eccezione a seconda della severità
      // Per ora oggetto vuoto per non rompere il frontend
      return {}; 
    }
  }
}