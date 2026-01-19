import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TenantService } from './tenant.service';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  private readonly logger = new Logger(TenantMiddleware.name);

  constructor(private readonly tenantService: TenantService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const headerValue = req.headers['x-site-id'] as string;
    
    // Logica di fallback
    const tenantId = headerValue || 'trinacria';
    
    // Imposta il servizio
    this.tenantService.setTenant(tenantId);
    
    // 👇 LOG DI DIAGNOSTICA (Cosa sta succedendo?)
    this.logger.warn(`🔍 [Middleware] Richiesta: ${req.originalUrl}`);
    this.logger.warn(`   Header 'x-site-id': ${headerValue ? headerValue : 'NON PRESENTE'}`);
    this.logger.warn(`   Tenant Deciso: '${tenantId}'`);
    
    next();
  }
}