import { Controller, Get, Param } from '@nestjs/common';
import { PageRepository } from './repository/page.repository';
@Controller('pages')
export class PageController {
  constructor(private readonly pageRepo: PageRepository) {}
  @Get(':slug')
  async getPage(@Param('slug') slug: string) { return this.pageRepo.findBySlug(slug); }
}