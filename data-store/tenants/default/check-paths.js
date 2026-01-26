const path = require('path');
const fs = require('fs');

console.log("--- DIAGNOSI PERCORSI ---");
console.log("1. Cartella Corrente (__dirname):");
console.log("   " + __dirname);

// Calcoliamo il percorso risalendo di 3 livelli
const targetPath = path.resolve(__dirname, '../../../libs/ui/src');

console.log("\n2. Percorso Calcolato per libs/ui:");
console.log("   " + targetPath);

console.log("\n3. Verifica Esistenza:");
if (fs.existsSync(targetPath)) {
    console.log("   ✅ CARTELLA TROVATA!");
    
    // Proviamo a leggere cosa c'è dentro per essere sicuri
    try {
        const files = fs.readdirSync(targetPath);
        console.log("   📂 Contenuto trovato:", files);
        
        // Cerchiamo un file specifico per confermare
        const buttonPath = path.join(targetPath, 'components/ui/button.tsx');
        if (fs.existsSync(buttonPath)) {
             console.log("   ✅ Button.tsx trovato in posizione corretta.");
        } else {
             console.log("   ⚠️ Cartella c'è, ma button.tsx no. Controlla sottocartelle.");
        }
    } catch (e) {
        console.log("   ⚠️ Trovata ma non leggibile:", e.message);
    }
} else {
    console.log("   ❌ CARTELLA NON TROVATA.");
    console.log("   Suggerimento: Controlla se 'libs' è davvero a 3 livelli sopra.");
}
console.log("-------------------------");