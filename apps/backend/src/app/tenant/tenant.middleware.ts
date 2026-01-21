import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TenantService } from './tenant.service';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  private readonly logger = new Logger(TenantMiddleware.name);

  constructor(private readonly tenantService: TenantService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const headerValue = req.headers['x-site-id'] as string;
    
    // 👇 MODIFICA QUI: Fallback su 'default'
    const tenantId = headerValue || 'default'; 
    
    this.tenantService.setTenant(tenantId);
    
    // Log ridotto per pulizia
    if (!req.url.includes('assets')) {
        this.logger.log(`Tenant: ${tenantId} | Path: ${req.url}`);
    }
    
    next();
  }
}