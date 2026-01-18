import { Controller, Get } from '@nestjs/common';
import { ConfigService } from './config.service';

@Controller('config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Get('theme')
  getTheme() {
    return this.configService.getTheme();
  }

  @Get('menu')
  getMenu() {
    return this.configService.getMenu();
  }

  @Get('site')
  getSite() {
    return this.configService.getSite();
  }
}