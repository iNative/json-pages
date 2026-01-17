
### Step 1: Creazione "Database" (Cartelle e File JSON)

Dobbiamo creare la cartella `data` fuori da `src` (per evitare che ogni modifica ai dati faccia riavviare il server di sviluppo).

Esegui questo comando nel terminale per generare la struttura delle directory:

```bash
mkdir -p apps/backend/data/{content,config}

```

Ora popoliamo i file JSON iniziali. Copia il contenuto di seguito nei rispettivi file. Qui stiamo facendo la magia: **traduciamo i dati "Canottieri" nello schema "Astratto"**.

#### 1. `apps/backend/data/config/site.json`

(Identità del sito)

```json
{
  "title": "Canottieri Trinacria",
  "description": "Società canottieri storica dal 1900",
  "logoUrl": "/assets/logo-trinacria.png",
  "socials": {
    "facebook": "https://facebook.com/...",
    "instagram": "https://instagram.com/..."
  }
}

```

#### 2. `apps/backend/data/config/theme.json`

(Configurazione grafica - qui definiamo i colori sociali)

```json
{
  "primaryColor": "#003366",
  "secondaryColor": "#FFCC00",
  "fontFamily": "Roboto, sans-serif",
  "layout": "standard"
}

```

#### 3. `apps/backend/data/config/menu.json`

(Navigazione dinamica)

```json
[
  { "label": "Home", "path": "/" },
  { "label": "Chi Siamo", "path": "/chi-siamo" },
  { "label": "Atleti", "path": "/atleti" },
  { "label": "Risultati", "path": "/news" }
]

```

#### 4. `apps/backend/data/content/items.json`

(Questa è la generalizzazione degli "Atleti". Nota come usiamo campi generici).

```json
[
  {
    "id": "1",
    "collection": "atleti",
    "title": "Giuseppe Rossi",
    "subtitle": "Categoria Senior",
    "image": "/assets/atleti/rossi.jpg",
    "body": "Campione regionale 2023...",
    "tags": ["senior", "campione"]
  },
  {
    "id": "2",
    "collection": "atleti",
    "title": "Maria Bianchi",
    "subtitle": "Categoria Junior",
    "image": "/assets/atleti/bianchi.jpg",
    "body": "Promessa del canottaggio...",
    "tags": ["junior"]
  }
]

```

---

### Step 2: Definizione del "Contratto" (Shared Types)

Ora sfruttiamo la cartella `libs/shared-data` per definire le interfacce TypeScript. Questo garantisce che Backend e Frontend parlino la stessa lingua.

Modifica il file: `libs/shared-data/src/lib/shared-data.ts`
Sostituisci tutto il contenuto con questo:

```typescript
// --- CONFIG INTERFACES ---

export interface SiteConfig {
  title: string;
  description: string;
  logoUrl: string;
  socials?: Record<string, string>;
}

export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  layout: 'standard' | 'sidebar' | 'minimal';
}

export interface MenuItem {
  label: string;
  path: string;
  children?: MenuItem[];
}

// --- CONTENT INTERFACES ---

export interface ContentItem {
  id: string;
  collection: string; // es. 'atleti', 'regate', 'sponsor'
  title: string;
  subtitle?: string;
  image?: string;
  body?: string;
  tags?: string[];
  metadata?: Record<string, any>; // Per dati extra specifici
}

// --- API RESPONSE WRAPPER ---
// Standardizziamo le risposte del backend
export interface ApiResponse<T> {
  data: T;
  timestamp: string;
}

```
