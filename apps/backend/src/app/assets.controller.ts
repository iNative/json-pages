import { Controller, Get, Param, Res, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { existsSync } from 'fs';
import * as path from 'path';

@Controller('assets')
export class AssetsController {
  
  @Get(':tenantId/*assetPath')
  async getAsset(
    @Param('tenantId') tenantId: string,
    @Param('assetPath') assetPath: string | string[], // 👈 Accettiamo anche array
    @Res() res: Response
  ) {
    // 1. Validazione
    if (!tenantId || !assetPath) {
        throw new NotFoundException('Parametri mancanti');
    }

    // 2. Normalizzazione (Array -> Stringa)
    // Se è un array ['css', 'theme.css'], diventa 'css/theme.css'
    let pathString = '';
    if (Array.isArray(assetPath)) {
        pathString = assetPath.join('/');
    } else {
        pathString = assetPath.toString();
    }

    // 3. Sanificazione
    const safeTenant = tenantId.replace(/[^a-zA-Z0-9-_]/g, '');
    const safePath = pathString.replace(/\.\./g, ''); // Stop directory traversal

    // 4. Risoluzione Percorso
    const fullPath = path.join(process.cwd(), 'data-store', safeTenant, 'assets', safePath);

    // Debug: vediamo cosa sta cercando
    console.log(`📂 [Assets] Cerca: ${fullPath}`);

    // 5. Verifica Esistenza
    if (!existsSync(fullPath)) {
      console.warn(`❌ [Assets] 404: ${fullPath}`);
      throw new NotFoundException(`Asset non trovato: ${safePath}`);
    }

    // 6. Invio File
    return res.sendFile(fullPath);
  }
}