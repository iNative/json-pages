import { Global, Module } from '@nestjs/common';
import { TenantService } from './tenant.service';

@Global() // 👈 Global: così non dobbiamo importarlo in ogni singolo modulo
@Module({
  providers: [TenantService],
  exports: [TenantService],
})
export class TenantModule {}