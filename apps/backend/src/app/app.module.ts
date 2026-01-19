import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContentModule } from './content.module';
import { ConfigModule } from './config/config.module';
import { TenantModule } from './tenant/tenant.module';
import { TenantMiddleware } from './tenant/tenant.middleware';
import { PageController } from './page.controller';
import { PageRepository } from './repository/page.repository';
import { AssetsController } from './assets.controller';
import { SystemController } from './system.controller'; // ✅ Import presente

@Module({
  imports: [
    TenantModule,
    ContentModule, 
    ConfigModule 
  ],
  // 👇 AGGIUNTO SystemController ALLA LISTA
  controllers: [AppController, PageController, AssetsController, SystemController], 
  providers: [AppService, PageRepository],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TenantMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}