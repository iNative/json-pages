import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { IContentRepository } from './content.repository.interface';
import { ContentItem } from '@json-pages/shared-data';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class JsonFileRepository implements IContentRepository {
  // Percorso assoluto basato sulla root del progetto
  private readonly basePath = path.join(process.cwd(), 'apps/backend/data/content');

  private getFilePath(collection: string): string {
    return path.join(this.basePath, `${collection}.json`);
  }

  async findAll(collection: string): Promise<ContentItem[]> {
    try {
      const filePath = this.getFilePath(collection);
      // Verifica se il file esiste per evitare crash brutali
      try {
        await fs.access(filePath);
      } catch {
        console.warn(`File non trovato: ${filePath}. Ritorno array vuoto.`);
        return [];
      }

      const data = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(data) as ContentItem[];
    } catch (error) {
      console.error(`Errore lettura ${collection}:`, error);
      throw new InternalServerErrorException(`Errore lettura dati per ${collection}`);
    }
  }

  async findById(collection: string, id: string): Promise<ContentItem | null> {
    const items = await this.findAll(collection);
    return items.find((item) => item.id === id) || null;
  }

  async create(collection: string, item: ContentItem): Promise<void> {
    const items = await this.findAll(collection);
    items.push(item);
    await this.saveFile(collection, items);
  }

  async update(collection: string, id: string, item: ContentItem): Promise<void> {
    const items = await this.findAll(collection);
    const index = items.findIndex((i) => i.id === id);
    if (index === -1) throw new NotFoundException(`Item ${id} not found`);
    items[index] = item;
    await this.saveFile(collection, items);
  }

  async delete(collection: string, id: string): Promise<void> {
    const items = await this.findAll(collection);
    const newItems = items.filter((i) => i.id !== id);
    await this.saveFile(collection, newItems);
  }

  private async saveFile(collection: string, data: ContentItem[]): Promise<void> {
    await fs.writeFile(this.getFilePath(collection), JSON.stringify(data, null, 2));
  }
}