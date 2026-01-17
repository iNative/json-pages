import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
// Nota i percorsi di import che puntano alla cartella ./repository
import { JsonFileRepository } from './repository/json-file.repository';
import { CONTENT_REPOSITORY } from './repository/content.repository.interface';

@Module({
  controllers: [ContentController],
  providers: [
    ContentService,
    {
      provide: CONTENT_REPOSITORY, // TOKEN
      useClass: JsonFileRepository, // IMPLEMENTAZIONE REALE
    },
  ],
})
export class ContentModule {}