import { Injectable, NotFoundException, Logger, Scope, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PageDefinition } from '@json-pages/shared-data';
import * as fs from 'fs/promises';
import * as path from 'path';
import { TenantService } from '../tenant/tenant.service';

@Injectable({ scope: Scope.REQUEST })
export class PageRepository {
  private readonly logger = new Logger(PageRepository.name);

  constructor(private readonly tenantService: TenantService) {}

  async findBySlug(slug: string): Promise<PageDefinition> {
    const safeSlug = slug.replace(/[^a-zA-Z0-9-_]/g, '');
    if (!safeSlug) throw new BadRequestException('Slug invalido');

    // Dinamico: /data-store/{tenant}/pages/{slug}.json
    const filePath = path.join(this.tenantService.basePath, 'pages', `${safeSlug}.json`);

    try {
      await fs.access(filePath);
      const data = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(data) as PageDefinition;
    } catch (error) {
      this.logger.warn(`Pagina '${slug}' non trovata per tenant '${this.tenantService.tenantId}'`);
      throw new NotFoundException(`Pagina non trovata`);
    }
  }
}