
### 🌟 La Stella Polare

Costruire una piattaforma **Headless CMS File-Based** dove il codice non viene toccato per cambiare contenuti o aspetto, ma si modificano solo file JSON.

---

### 🗺️ FASE 1: Scaffolding & Architettura Dati (✅ COMPLETATA)

* **Obiettivo:** Creare il contenitore e lo schema dati.
* **Stato:**
* ✅ Monorepo Nx inizializzato (`apps/frontend`, `apps/backend`).
* ✅ Struttura Dati su disco creata:
```text
apps/backend/data/
├── config/        (Dominio "Setup")
│   ├── menu.json
│   ├── site.json
│   └── theme.json
└── content/       (Dominio "Editor")
    └── items.json

```


* ✅ Fix infrastruttura Frontend: Risolto problema `zone.js` e configurato Proxy (`proxy.conf.json`).



---

### 🏗️ FASE 2: Backend Core (Separation of Concerns) (🚧 IN CORSO)

* **Obiettivo:** Un backend agnostico con domini separati.
* **Stato:**
* ✅ **Service:** `AppService` legge i file JSON.
* ⚠️ **Refactoring Necessario:** Attualmente usiamo `AppController` per tutto. Dobbiamo separare i domini.
* 🚧 **Repository:** `json-file.repository.ts` è pronto ma non ancora collegato.


* **Prossimi Step (Giorno 2):**
1. **ConfigController:** Spostare la logica di `/api/config/*` in un controller dedicato (Setup Domain).
2. **ContentController:** Creare il controller per `/api/content/:collection` (Editor Domain) usando il Repository Pattern.



---

### 🎨 FASE 3: Frontend "Themable" (L'Astrazione Visiva) (🚧 IN CORSO)

* **Obiettivo:** La UI si adatta dinamicamente al JSON ricevuto **prima** di mostrarsi.
* **Stato:**
* ✅ Componenti UI base (`CardComponent`) creati.
* ✅ Servizio `ConfigService` pronto.


* **Prossimi Step (Giorno 2):**
1. **APP_INITIALIZER:** Caricare `theme.json` e `site.json` *prima* dell'avvio di Angular per evitare flash grafici.
2. **GridListComponent:** Creare un componente contenitore generico (non solo la Card singola) per listare qualsiasi collezione.
3. **Routing Dinamico:** Generare le rotte e il menu leggendo `/api/config/menu`.



---

### 🛠️ FASE 4: I Due Admin (Setup & Editor) (📅 DA FARE)

* **Obiettivo:** Interfacce di gestione separate.
* **Azioni Future:**
1. **Admin EDITOR:** Dashboard per gestire le collezioni `content` (CRUD su `items.json`).
2. **Admin SETUP:** Form per modificare i file `config` (Tema e Identità).



---

### 📜 FASE 5: Master Log "Interactive Console" (📅 DA FARE)

* **Obiettivo:** Script per automatizzare la creazione di nuove collezioni e il setup.

---
