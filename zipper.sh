#!/bin/bash

# --- CONFIGURAZIONE ---
DEST_DIR="$HOME/zipped-json-pages"
TEMP_LIST="$DEST_DIR/temp_file_list.txt"

# 1. VERIFICA PRESENZA ZIP
# Controlla se il comando zip esiste
if ! command -v zip &> /dev/null; then
    echo "❌ Errore: Il programma 'zip' non è installato."
    echo "👉 Per favore installalo eseguendo: sudo apt install zip"
    exit 1
fi

# 2. PREPARAZIONE CARTELLA DESTINAZIONE
echo "🧹 Pulisco la cartella di destinazione..."
if [ -d "$DEST_DIR" ]; then
    rm -rf "$DEST_DIR"
fi
mkdir -p "$DEST_DIR"

# 3. RICERCA FILE (CON ESCLUSIONE ALLA FONTE)
echo "🔍 Scansione file (ignorando node_modules, .git, dist)..."

# Spiegazione comando find:
# .        -> Cerca qui
# -type d  -> Se trovi una cartella...
# (...)    -> ...che si chiama node_modules OPPURE .git OPPURE dist OPPURE tmp...
# -prune   -> ...TAGLIALA VIA (non entrarci nemmeno)
# -o       -> ALTRIMENTI
# -type f  -> Se è un file...
# -print   -> ...aggiungilo alla lista.
find . \
    -type d \( -name "node_modules" -o -name ".git" -o -name "dist" -o -name "tmp" \) -prune \
    -o -type f -not -name "*.zip" -not -name "zipper_v2.sh" -print \
    | sort > "$TEMP_LIST"

# Conta file reali trovati
TOTAL_FILES=$(wc -l < "$TEMP_LIST")
if [ "$TOTAL_FILES" -eq 0 ]; then
    echo "⚠️ Nessun file trovato da archiviare!"
    exit 0
fi

echo "📄 Trovati $TOTAL_FILES file validi."

# 4. SUDDIVISIONE IN BLOCCHI DA 10
split -l 10 -d "$TEMP_LIST" "$DEST_DIR/chunk_"

# 5. CREAZIONE ARCHIVI ZIP
echo "📦 Creazione archivi zip..."
count=0
for chunk in "$DEST_DIR"/chunk_*; do
    # Calcola nome: part-01, part-02...
    suffix=$(printf "%02d" $((count + 1)))
    zip_name="json-pages-part-${suffix}.zip"
    
    # Crea lo zip leggendo la lista dal chunk
    # -q = silenzioso
    cat "$chunk" | zip -q "$DEST_DIR/$zip_name" -@
    
    echo "   ✅ Creato: $zip_name"
    ((count++))
done

# 6. PULIZIA FINALE
rm "$TEMP_LIST" "$DEST_DIR"/chunk_*

echo "---"
echo "🎉 Finito! Trovi i tuoi $count archivi in:"
echo "📂 $DEST_DIR"