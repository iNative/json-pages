import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContentModule } from './content.module';
import { ConfigModule } from './config/config.module'; // <--- Importante

@Module({
  imports: [
    ContentModule, 
    ConfigModule // <--- Aggiunto
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}