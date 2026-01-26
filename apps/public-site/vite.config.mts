/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import * as path from 'path'; // 👈 Import necessario
export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/public-site',
  resolve: {
    alias: {
      // 👈 Mapping esplicito per Vite
      '@tenants': path.resolve(__dirname, '../../data-store/tenants'),
    },
  },
  server: {
    port: 4200,
    host: 'localhost',
    proxy: {
      // 👇 MANTENIAMO SOLO QUESTA REGOLA
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      // Rimosso blocco '/assets' per evitare conflitti e redirect errati
    },
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [react(), nxViteTsPaths()],

  build: {
    outDir: '../../dist/apps/public-site',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});