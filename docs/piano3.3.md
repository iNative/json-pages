

### 📊 Check della Realtà: Piano vs Codice

| Obiettivo Giorno 1 | Stato nel Codice Indicizzato | Analisi / Azione Richiesta |
| --- | --- | --- |
| **Backend: Repository** | ✅ **Implementato & Collegato.**<br>

<br>In `content.module.ts` vedo che `JsonFileRepository` è già fornito come `CONTENT_REPOSITORY`. | **Nessuna azione.** Il pattern Repository funziona. |
| **Backend: ContentController** | ✅ **Esiste.**<br>

<br>Il file `content.controller.ts` gestisce già le chiamate generiche `/api/content/:collection`. | **Nessuna azione.** È pronto. |
| **Backend: ConfigController** | ⚠️ **Mancante (Debito Tecnico).**<br>

<br>Le rotte `/api/config/*` sono ancora "ospitate" impropriamente dentro `AppController`. | **DA FARE.** Dobbiamo estrarre la logica di config in un controller dedicato. |
| **Frontend: APP_INITIALIZER** | ✅ **Implementato.**<br>

<br>In `app.config.ts` c'è la factory `initializeApp` e in `config.service.ts` c'è la logica di caricamento e `applyTheme`. | **Nessuna azione.** Il tema viene caricato all'avvio. |
| **Frontend: GridListComponent** | ❌ **Assente.**<br>

<br>`app.html` fa un loop manuale (`*ngFor`) sulle card. Manca l'astrazione della griglia. | **DA FARE.** Dobbiamo creare questo componente per pulire la root. |
| **Frontend: Routing** | ❌ **Vuoto.**<br>

<br>`app.routes.ts` è un array vuoto `[]`. Il menu non genera navigazione reale. | **DA FARE.** Dobbiamo generare le rotte dinamicamente leggendo `menu.json`. |

---

### 🚀 Piano d'Azione Aggiornato (v3.3)

Basandomi su questa analisi, ecco il nuovo piano operativo sequenziale per completare l'infrastruttura Core.

#### 1. Refactoring Backend (Pulizia Architetturale)

Il backend funziona, ma `AppController` sa troppe cose.

* **Azione:** Creare `ConfigModule`, `ConfigService` e `ConfigController`.
* **Risultato:** Spostare le chiamate `/config/theme`, `/config/site` e `/config/menu` fuori da `AppController`. `AppModule` rimarrà pulitissimo.

#### 2. Frontend: Astrazione "Grid List"

Attualmente `app.html` contiene logica di visualizzazione diretta. Se domani vogliamo cambiare layout (es. da griglia a lista), non vogliamo toccare `app.html`.

* **Azione:** Creare `libs/ui/src/lib/grid-list`.
* **Risultato:** `app.html` diventerà minimale: `<app-grid-list [collection]="'items'"></app-grid-list>`.

#### 3. Frontend: Dynamic Routing (Il passo finale dell'Headless)

Il sito deve navigare basandosi solo su `menu.json`.

* **Azione:** Configurare il router Angular per leggere la config e mappare i path (es. `/atleti`) al componente `GridListComponent` filtrato per quella collezione.

#### 4. Data Expansion (Verifica del sistema)

* **Azione:** Creare `regate.json` e vedere se il sistema lo visualizza senza toccare codice.

---

### Qual è il prossimo passo?

Ti consiglio caldamente di iniziare dal **Punto 1 (Refactoring Backend)**. Avere un backend pulito con domini separati (`Content` vs `Config`) renderà molto più facile gestire la complessità quando implementeremo l'area Admin.

**Vuoi che proceda a generare il codice per il nuovo `ConfigController` e relativo modulo?**