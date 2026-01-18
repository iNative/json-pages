#!/bin/bash

# --- CONFIGURAZIONE ---
DEST_DIR="$HOME/zipped-json-pages"
TEMP_LIST="$DEST_DIR/temp_file_list.txt"

# 1. VERIFICA E PREPARAZIONE
if ! command -v zip &> /dev/null; then
    echo "❌ Errore: installa zip (sudo apt install zip)"
    exit 1
fi

if [ -d "$DEST_DIR" ]; then rm -rf "$DEST_DIR"; fi
mkdir -p "$DEST_DIR"

echo "🎯 Selezione chirurgica dei file in base alla tua lista..."

# 2. GENERAZIONE LISTA FILE (Whitelist approach)

# A. FILE DI ROOT (Gruppo 3)
# Cerchiamo solo questi file specifici nella root
find . -maxdepth 1 -type f \( \
    -name "eslint.config.mjs" -o \
    -name "jest.config.ts" -o \
    -name "jest.preset.js" -o \
    -name "nx.json" -o \
    -name "package.json" -o \
    -name "tsconfig.base.json" \
\) > "$TEMP_LIST"

# B. CARTELLE APPS E LIBS (Gruppo 1 e 2)
# Cerchiamo dentro apps e libs, ma puliamo via la spazzatura
find apps libs -type f \
    -not -name "*:Zone.Identifier" \
    -not -name ".DS_Store" \
    -not -path "*/node_modules/*" \
    -not -path "*/dist/*" \
    -not -path "*/.angular/*" \
    -not -path "*/.nx/*" \
    >> "$TEMP_LIST"

# 3. ORDINAMENTO E CONTEGGIO
# Ordiniamo la lista per avere gli zip sensati
sort -o "$TEMP_LIST" "$TEMP_LIST"

TOTAL_FILES=$(wc -l < "$TEMP_LIST")
echo "📄 File selezionati: $TOTAL_FILES"

if [ "$TOTAL_FILES" -eq 0 ]; then
    echo "⚠️ Nessun file trovato! Sei nella cartella giusta?"
    exit 1
fi

# 4. CREAZIONE ZIP (Max 10 file per archivio)
split -l 10 -d "$TEMP_LIST" "$DEST_DIR/chunk_"

count=0
for chunk in "$DEST_DIR"/chunk_*; do
    suffix=$(printf "%02d" $((count + 1)))
    zip_name="json-pages-part-${suffix}.zip"
    
    # Crea lo zip
    cat "$chunk" | zip -q "$DEST_DIR/$zip_name" -@
    
    # Stampa info utile per te (primo e ultimo file dello zip)
    first_file=$(head -n 1 "$chunk")
    last_file=$(tail -n 1 "$chunk")
    echo "   📦 $zip_name (da $first_file... a ...$last_file)"
    
    ((count++))
done

# PULIZIA
rm "$TEMP_LIST" "$DEST_DIR"/chunk_*

echo "---"
echo "✅ Operazione completata."
echo "📂 $count archivi creati in $DEST_DIR"
