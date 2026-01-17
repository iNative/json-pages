import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('config/theme')
  async getTheme() {
    return this.appService.getThemeConfig();
  }

  @Get('config/menu')
  async getMenu() {
    return this.appService.getMenuConfig();
  }

  // AGGIUNTO: Endpoint per site.json
  @Get('config/site')
  async getSite() {
    return this.appService.getSiteConfig();
  }

  @Get()
  getData() {
    return this.appService.getData();
  }
}