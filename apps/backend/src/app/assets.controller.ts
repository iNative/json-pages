import { Controller, Get, Param, Res, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { existsSync } from 'fs';
import * as path from 'path';

@Controller('assets')
export class AssetsController {
  
  @Get(':tenantId/*assetPath')
  async getAsset(
    @Param('tenantId') tenantId: string,
    @Param('assetPath') assetPath: string | string[],
    @Res() res: Response
  ) {
    if (!tenantId || !assetPath) {
        throw new NotFoundException('Parametri mancanti');
    }

    let pathString = '';
    if (Array.isArray(assetPath)) {
        pathString = assetPath.join('/');
    } else {
        pathString = assetPath.toString();
    }

    const safeTenant = tenantId.replace(/[^a-zA-Z0-9-_]/g, '');
    const safePath = pathString.replace(/\.\./g, '');

    // 👇 FIX: Aggiunto 'tenants' al percorso per matchare la struttura reale
    const fullPath = path.join(process.cwd(), 'data-store', 'tenants', safeTenant, 'assets', safePath);

    console.log(`📂 [Assets] Cerca: ${fullPath}`);

    if (!existsSync(fullPath)) {
      console.warn(`❌ [Assets] 404: ${fullPath}`);
      throw new NotFoundException(`Asset non trovato: ${safePath}`);
    }

    return res.sendFile(fullPath);
  }
}