import { ContentItem } from '@json-pages/shared-data'; // Assicurati che l'alias nel tsconfig.base.json coincida. Se l'IDE si lamenta, usa il percorso relativo ../../../../../libs/shared-data/src

export interface IContentRepository {
  findAll(collection: string): Promise<ContentItem[]>;
  findById(collection: string, id: string): Promise<ContentItem | null>;
  create(collection: string, item: ContentItem): Promise<void>;
  update(collection: string, id: string, item: ContentItem): Promise<void>;
  delete(collection: string, id: string): Promise<void>;
}

export const CONTENT_REPOSITORY = 'CONTENT_REPOSITORY';