import { Inject, Injectable } from '@nestjs/common';
// Importiamo l'interfaccia e il token
import { CONTENT_REPOSITORY, IContentRepository } from './repository/content.repository.interface';
import { ContentItem } from '@json-pages/shared-data';

@Injectable()
export class ContentService {
  constructor(
    @Inject(CONTENT_REPOSITORY) private readonly repository: IContentRepository
  ) {}

  // Passiamo sempre 'collection' come primo argomento
  findAll(collection: string) {
    return this.repository.findAll(collection);
  }

  findOne(collection: string, id: string) {
    return this.repository.findById(collection, id);
  }

  create(collection: string, item: ContentItem) {
    return this.repository.create(collection, item);
  }

  update(collection: string, id: string, item: ContentItem) {
    return this.repository.update(collection, id, item);
  }

  remove(collection: string, id: string) {
    return this.repository.delete(collection, id);
  }
}