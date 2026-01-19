import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
// 👇 Importa dalla lib
import { TenantService } from '@json-pages/data-access'; 

export const tenantInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('/assets/') || req.url.includes('/system/resolve')) {
    return next(req);
  }
  const tenantService = inject(TenantService);
  const tenantReq = req.clone({
    setHeaders: { 'X-Site-ID': tenantService.tenantId }
  });
  return next(tenantReq);
};