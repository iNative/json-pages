/*Questo script agisce come orchestratore:

    Scansiona data-store/tenants.

    Verifica se style.css esiste già per ogni tenant.

    Lancia processi paralleli per compilare solo i mancanti.

    Logga esiti ed errori su logs/css-build.log.
*/
// FILE: tools/scripts/build-tenants-css.js
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// ⚙️ CONFIGURAZIONE
const WORKSPACE_ROOT = process.cwd();
const TENANTS_DIR = path.join(WORKSPACE_ROOT, 'data-store/tenants');
const LOG_DIR = path.join(WORKSPACE_ROOT, 'logs');
const LOG_FILE = path.join(LOG_DIR, 'css-build.log');

// Assicuriamoci che la directory dei log esista
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

// Funzione di Logging su File
const logToFile = (message) => {
  const timestamp = new Date().toISOString();
  const logLine = `[${timestamp}] ${message}\n`;
  // Scrittura sincrona per evitare race conditions sul file di log
  fs.appendFileSync(LOG_FILE, logLine);
  // Output anche su console per feedback immediato
  console.log(message);
};

// Funzione Core per il Build di un singolo Tenant
const buildTenantCss = (tenantId) => {
  return new Promise((resolve) => {
    const tenantPath = path.join(TENANTS_DIR, tenantId);
    
    // Path specifici del tenant
    const inputFile = path.join(tenantPath, 'input.css');
    const outputDir = path.join(tenantPath, 'assets', 'css');
    const outputFile = path.join(outputDir, 'style.css');
    const configFile = path.join(tenantPath, 'tailwind.config.js');

    // 1. Verifica esistenza file input
    if (!fs.existsSync(inputFile)) {
      logToFile(`⚠️  SKIP [${tenantId}]: input.css non trovato.`);
      return resolve('skipped_no_input');
    }

    // 2. CHECK INCREMENTALE: Se l'output esiste, saltiamo (Idempotenza)
    if (fs.existsSync(outputFile)) {
      logToFile(`⏭️  SKIP [${tenantId}]: style.css già esistente.`);
      return resolve('skipped_existing');
    }

    // 3. Creazione cartella output se manca
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    logToFile(`🚀 BUILD [${tenantId}]: Avvio compilazione...`);

    // 4. Esecuzione Tailwind CLI
    // Nota: Usiamo paths assoluti per robustezza
    const command = `npx @tailwindcss/cli -i "${inputFile}" -o "${outputFile}" --config "${configFile}"`;

    exec(command, { cwd: WORKSPACE_ROOT }, (error, stdout, stderr) => {
      if (error) {
        // FAULT TOLERANCE: Logghiamo l'errore ma non rompiamo il processo principale (resolve, non reject)
        logToFile(`❌ ERROR [${tenantId}]: Fallito. \n${stderr || error.message}`);
        return resolve('error');
      }
      
      logToFile(`✅ SUCCESS [${tenantId}]: CSS generato.`);
      resolve('success');
    });
  });
};

// MAIN EXECUTION
const run = async () => {
  logToFile('=== GLOBAL CSS BUILD START ===');
  
  try {
    const tenants = fs.readdirSync(TENANTS_DIR, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    logToFile(`🔍 Trovati ${tenants.length} tenants. Avvio elaborazione parallela...`);

    // CONCORRENZA PARALLELA: Lanciamo tutte le Promise insieme
    const results = await Promise.all(tenants.map(tenant => buildTenantCss(tenant)));

    // Statistiche Finali
    const summary = results.reduce((acc, status) => {
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    logToFile(`=== REPORT FINALE ===`);
    logToFile(`✅ Generati: ${summary.success || 0}`);
    logToFile(`⏭️  Saltati: ${(summary.skipped_existing || 0) + (summary.skipped_no_input || 0)}`);
    logToFile(`❌ Errori: ${summary.error || 0}`);
    logToFile('=== GLOBAL CSS BUILD END ===');

  } catch (e) {
    logToFile(`❌ CRITICAL ERROR: ${e.message}`);
    process.exit(1);
  }
};

run();