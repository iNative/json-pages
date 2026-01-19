import { Injectable, InternalServerErrorException, Inject, Scope } from '@nestjs/common'; // Importa Scope e Inject
import { IContentRepository } from './content.repository.interface';
import { ContentItem } from '@json-pages/shared-data';
import * as fs from 'fs/promises';
import * as path from 'path';
import { TenantService } from '../tenant/tenant.service'; // Importa il TenantService

@Injectable({ scope: Scope.REQUEST }) // 👈 Repository Scoped perché dipende dal Tenant
export class JsonFileRepository implements IContentRepository {
  
  constructor(private readonly tenantService: TenantService) {}

  private getBasePath(): string {
    // Dinamico: /data-store/{tenant}/content
    return path.join(this.tenantService.basePath, 'content');
  }

  private getFilePath(collection: string): string {
    return path.join(this.getBasePath(), `${collection}.json`);
  }

  async findAll(collection: string): Promise<ContentItem[]> {
    try {
      const filePath = this.getFilePath(collection);
      try {
        await fs.access(filePath);
      } catch {
        // Se il file non esiste, ritorno array vuoto senza errore
        return [];
      }
      const data = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(data) as ContentItem[];
    } catch (error) {
      console.error(`Errore lettura ${collection} per tenant ${this.tenantService.tenantId}:`, error);
      throw new InternalServerErrorException(`Errore dati tenant`);
    }
  }

  // ... (Gli altri metodi findById, create, update, delete rimangono uguali nella logica, 
  // useranno automaticamente findAll/saveFile che usano getFilePath aggiornato)
  
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
    if (index !== -1) {
       items[index] = item;
       await this.saveFile(collection, items);
    }
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