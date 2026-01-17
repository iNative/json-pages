import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentItem } from '@json-pages/shared-data';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  // Esempio chiamata: GET /api/content/items
  @Get(':collection')
  findAll(@Param('collection') collection: string) {
    return this.contentService.findAll(collection);
  }

  // Esempio chiamata: GET /api/content/items/1
  @Get(':collection/:id')
  findOne(@Param('collection') collection: string, @Param('id') id: string) {
    return this.contentService.findOne(collection, id);
  }

  @Post(':collection')
  create(@Param('collection') collection: string, @Body() contentItem: ContentItem) {
    // Forziamo la collection dentro l'item per coerenza
    contentItem.collection = collection;
    return this.contentService.create(collection, contentItem);
  }

  @Patch(':collection/:id')
  update(
    @Param('collection') collection: string,
    @Param('id') id: string,
    @Body() contentItem: ContentItem
  ) {
    return this.contentService.update(collection, id, contentItem);
  }

  @Delete(':collection/:id')
  remove(@Param('collection') collection: string, @Param('id') id: string) {
    return this.contentService.remove(collection, id);
  }
}