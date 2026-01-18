#!/bin/bash

# --- CONFIGURAZIONE ---
DEST_DIR="$HOME/zipped-json-pages"
TEMP_LIST="$DEST_DIR/temp_file_list.txt"

# 1. VERIFICA PRESENZA ZIP
if ! command -v zip &> /dev/null; then
    echo "❌ Errore: 'zip' non installato. Esegui: sudo apt install zip"
    exit 1
fi

# 2. PREPARAZIONE CARTELLA
if [ -d "$DEST_DIR" ]; then rm -rf "$DEST_DIR"; fi
mkdir -p "$DEST_DIR"

# 3. RICERCA FILE (Ora esclude anche .nx, .vscode e file nascosti indesiderati)
echo "🔍 Scansione file..."

# NOTA SULLE ESCLUSIONI:
# -prune: taglia via intere cartelle (.git, node_modules, .nx, .vscode, dist, tmp)
# -not -name: esclude file specifici (Zone.Identifier, file che iniziano con punto, lo script stesso)
find . \
    -type d \( -name "node_modules" -o -name ".git" -o -name "dist" -o -name "tmp" -o -name ".nx" -o -name ".vscode" \) -prune \
    -o -type f \
    -not -name "*.zip" \
    -not -name "zipper_v3.sh" \
    -not -name "*:Zone.Identifier" \
    -print \
    | sort > "$TEMP_LIST"

# 4. CONTROLLO NUMERO FILE
TOTAL_FILES=$(wc -l < "$TEMP_LIST")
echo "📄 Trovati $TOTAL_FILES file (esclusi nascosti, cache e system files)."

if [ "$TOTAL_FILES" -eq 0 ]; then
    echo "⚠️ Nessun file trovato!"
    exit 0
fi

# 5. CREAZIONE ZIP
split -l 10 -d "$TEMP_LIST" "$DEST_DIR/chunk_"

count=0
for chunk in "$DEST_DIR"/chunk_*; do
    suffix=$(printf "%02d" $((count + 1)))
    zip_name="json-pages-part-${suffix}.zip"
    
    cat "$chunk" | zip -q "$DEST_DIR/$zip_name" -@
    echo "   ✅ $zip_name creato"
    ((count++))
done

# PULIZIA
rm "$TEMP_LIST" "$DEST_DIR"/chunk_*

echo "---"
echo "🎉 Finito: $count archivi creati in $DEST_DIR"
