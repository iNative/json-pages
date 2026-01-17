# JsonPages Platform

### Architecture Roadmap v3.0 | Target: Abstract Headless CMS

---

## 🟦 PHASE 1: Scaffolding & Data Structure

**Tag:** `DevOps`

> *Creare il contenitore monorepo e definire lo schema dati "bifronte" per supportare l'astrazione.*

* Esecuzione `ngNest-init.sh` per generare struttura Angular + NestJS.
* Implementazione struttura "File-Based DB":

```text
backend/data/
├── content/       <-- Domain: Admin EDITOR (Items, Posts)
│   ├── items.json
│   └── posts.json
└── config/        <-- Domain: Admin SETUP (Theme, Identity)
    ├── site.json  (Title, Logo, Meta)
    ├── theme.json (Colors, Fonts, Layout)
    └── menu.json  (Navigation Structure)

```

---

## 🟦 PHASE 2: Backend Core & Generics

**Tag:** `NestJS`

> *Costruire un motore agnostico che non conosce il dominio "Canottieri", ma solo "Collezioni" e "Configurazioni".*

* **Repository Pattern:** Interfaccia `IDataRepository` con metodi generici (read/write).
* **Service:** `JsonFsService` (Implementazione `fs` node).
* **Controllers:**
* `ContentController` (API per `/content/*`)
* `ConfigController` (API per `/config/*`)



---

## 🟧 PHASE 3: Frontend "Themable"

**Tag:** `Angular`

> *UI astratta che si "disegna" leggendo la configurazione JSON.*

* **Config Service:** `APP_INITIALIZER` carica `theme.json` e inietta variabili CSS.
* **Componenti Generici:** Trasformare *AtletaComponent* in `CardComponent`.
* **Routing Dinamico:** Menu generato da `menu.json`.

---

## 🟧 PHASE 4: Dual Admin Suite

**Tag:** `Angular`

> *Separazione netta tra gestione contenuti quotidiana e setup piattaforma.*

* **Admin EDITOR:** Dashboard per gestire le collezioni in `content/`.
* **Admin SETUP:** Pannello per modificare `theme.json` (colori) e `site.json` (identità).

---

## 🟩 PHASE 5: Interactive Console

**Tag:** `Bash/CLI`

> *Unificare operazioni, documentazione e onboarding nel terminale.*

* Tool: `jp-console.sh`
* **[TOUR]:** Spiega architettura (Content vs Config).
* **[RUN]:** Avvio automatizzato.
* **[SCAFFOLD]:** Generatore di nuovi file JSON vuoti.

---

### STATUS: **READY TO INIT**

*Awaiting execution of ngNest-init.sh*

---

### Prossimo step suggerito

Visto che abbiamo appena configurato il repo Git, vuoi che crei questo file direttamente nel tuo sistema con un comando, oppure procediamo con la creazione dello script `ngNest-init.sh` menzionato nella Fase 1?