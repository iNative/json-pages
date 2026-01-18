#!/bin/bash

# ==========================================
# 🛠️ CONFIGURAZIONE UTENTE
# ==========================================

# Cartella di destinazione per gli zip
DEST_DIR="$HOME/zipped-custom-pages"

# LISTA DEI TARGET: Inserisci qui file o cartelle che vuoi includere.
# Puoi mettere percorsi specifici (es. "apps/backend/src") o file singoli.
TARGETS=(
    "package.json"
    "nx.json"
    "tsconfig.base.json"
    "apps/backend/src"       # Include tutto il sorgente backend
    "apps/backend/data"      # Include i JSON dati
    "apps/frontend/src"      # Include tutto il sorgente frontend
    "libs/ui/src"            # Include la lib UI
    "libs/data-access/src"   # Include la lib data-access
    "libs/shared-data/src"   # Include la lib shared
    # Aggiungi qui altri percorsi se necessario
)

# ==========================================
# ⚙️ LOGICA DELLO SCRIPT (Non toccare sotto)
# ==========================================

TEMP_LIST="$DEST_DIR/temp_raw_list.txt"
CLEAN_LIST="$DEST_DIR/final_list.txt"

# 1. Verifica prerequisiti
if ! command -v zip &> /dev/null; then
    echo "❌ Errore: 'zip' non trovato. Installalo con: sudo apt install zip"
    exit 1
fi

# 2. Pulizia e preparazione
if [ -d "$DEST_DIR" ]; then rm -rf "$DEST_DIR"; fi
mkdir -p "$DEST_DIR"
touch "$TEMP_LIST"

echo "🎯 Avvio raccolta file basata sulla tua lista personalizzata..."

# 3. Scansione dei Target
for item in "${TARGETS[@]}"; do
    if [ -f "$item" ]; then
        # Se è un file singolo, lo aggiungiamo
        echo "   📄 Aggiungo file: $item"
        echo "$item" >> "$TEMP_LIST"
    elif [ -d "$item" ]; then
        # Se è una cartella, cerchiamo ricorsivamente (escludendo junk)
        echo "   dati 📂 Scansiono cartella: $item"
        find "$item" -type f \
            -not -path "*/node_modules/*" \
            -not -path "*/dist/*" \
            -not -path "*/.angular/*" \
            -not -path "*/.nx/*" \
            -not -path "*/.git/*" \
            -not -name ".DS_Store" \
            -not -name "*:Zone.Identifier" \
            >> "$TEMP_LIST"
    else
        echo "   ⚠️ ATTENZIONE: Il percorso '$item' non esiste, lo salto."
    fi
done

# 4. Ordinamento e Rimozione Duplicati
sort -u "$TEMP_LIST" > "$CLEAN_LIST"
TOTAL_FILES=$(wc -l < "$CLEAN_LIST")

echo "------------------------------------------------"
echo "✅ Totale file unici trovati: $TOTAL_FILES"

if [ "$TOTAL_FILES" -eq 0 ]; then
    echo "❌ Nessun file trovato. Controlla la lista TARGETS."
    exit 1
fi

# 5. Creazione degli Zip (Chunk da 10)
split -l 10 -d "$CLEAN_LIST" "$DEST_DIR/chunk_"

count=0
echo "📦 Creazione archivi (Max 10 file ciascuno)..."

for chunk in "$DEST_DIR"/chunk_*; do
    # Genera nome progressivo (part-01.zip, part-02.zip...)
    suffix=$(printf "%02d" $((count + 1)))
    zip_name="custom-part-${suffix}.zip"
    
    # Crea lo zip leggendo la lista dal chunk corrente
    cat "$chunk" | zip -q "$DEST_DIR/$zip_name" -@
    
    # Info per l'utente
    first=$(head -n 1 "$chunk")
    last=$(tail -n 1 "$chunk")
    echo "   -> $zip_name (Contiene da: $first ...)"
    
    ((count++))
done

# 6. Pulizia finale
rm "$TEMP_LIST" "$CLEAN_LIST" "$DEST_DIR"/chunk_*

echo "------------------------------------------------"
echo "🎉 Fatto! $count archivi creati in: $DEST_DIR"