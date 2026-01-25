Ho analizzato riga per riga il codice fornito nell'archivio `zip-json-pages0.1.0-10.zip` (e precedenti) incrociandolo con le tue specifiche.

Ecco l'analisi della simulazione e le criticità rilevate rispetto agli standard **Enterprise Grade** e alle tue direttive.

### 🔍 Simulazione Runtime

1. **Avvio Applicazione:**
* L'utente lancia `nx serve backend` e `nx serve public-site`.
* Frontend parte su `localhost:4200`. Backend su `localhost:3000`.
* **CSS Loading:** `Shell.tsx` blocca il rendering finché `useThemeLoader` non inietta `<link href="/api/assets/default/css/style.css">`.
* **Fetch Config:** `ConfigContext` chiama `/api/config/site` e `/api/config/menu`.


2. **Rendering Pagina (Home):**
* Router intercetta `/`. Renderizza `DynamicPage`.
* `DynamicPage` chiama `/api/pages/home`.
* Il JSON `home.json` viene iterato da `BlockRenderer`.



### 🚨 Incongruenze e Criticità Rilevate

#### 1. Architettura Footer: Conflitto "Single Source of Truth" (Critico)

Hai specificato che il JSON della pagina è la "Single Source of Truth" e che la Shell inietta i componenti. Tuttavia, nel codice attuale c'è una **duplicazione strutturale**.

* **Evidenza A (`Shell.tsx`):** La Shell renderizza staticamente il componente `<Footer />` alla fine del layout, fuori dalle rotte.
* **Evidenza B (`home.json`):** Il JSON contiene un blocco esplicito `{"type": "footer", ...}`.
* **Evidenza C (`BlockRenderer.tsx`):** Il renderer gestisce il caso `'footer'` e renderizza *nuovamente* il componente.
* **Risultato Simulazione:** L'utente vedrà **due footer**. Uno (statico) derivante dalla Shell e uno (dinamico) derivante dal contenuto della pagina. Questo vìola il principio SSOT del JSON.

#### 2. Routing Client-Side vs Hard Navigation (Critico)

Hai richiesto che il cambio pagina avvenga "lato client". Il codice attuale forza un ricaricamento completo della pagina (Hard Navigation).

* **File:** `apps/public-site/src/app/components/ui/Header.tsx`
* **Codice:**
```tsx
<a href={item.path} ... >{item.label}</a>

```


* **Analisi:** L'uso del tag HTML standard `<a>` invece del componente `<Link>` di `react-router-dom` causa una nuova richiesta HTTP al server per ogni click nel menu.
* **Impatto:**
* Perdita dello stato dell'applicazione (es. `TenantContext`).
* Il CSS (`style.css`) viene scaricato e re-iniettato ad ogni cambio pagina (flickering).
* L'esperienza "Single Page Application" è rotta.



#### 3. Gestione CSS / Tailwind (Processo Manuale)

Hai indicato il comando manuale: `npx @tailwindcss/cli -i ... -o ...`.

* **Incongruenza:** Il file `tailwind.config.js` è posizionato in `data-store/tenants/default/`. Tuttavia, questo file fa riferimento a percorsi relativi (`../../../apps/public-site...`).
* **Rischio:** Se un altro sviluppatore (o la CI/CD) esegue il comando da una root diversa o senza aver installato le dipendenze locali specifiche, la generazione fallisce. Non esiste uno script nel `package.json` o un target in `project.json` che standardizzi questa operazione, rendendo la build fragile e dipendente dall'ambiente locale.

#### 4. Sanitizzazione (Sicurezza)

Hai specificato "Sanitizzazione: nessuna".

* **File:** `apps/public-site/src/app/blocks/TextBlock.tsx`
* **Codice:** `dangerouslySetInnerHTML={{ __html: data.content }}`
* **Analisi:** Confermo che il codice rispetta la direttiva di non sanitizzare.
* **Nota Enterprise:** In un contesto Enterprise reale, questo è un vettore di attacco XSS (Cross-Site Scripting) se il JSON nel `data-store` viene compromesso o modificato da un utente malintenzionato. Essendo un "Code Integrity Protocol", segnalo il rischio pur mantenendo l'implementazione richiesta.

#### 5. Asset Serving (Backend Performance)

* **File:** `apps/backend/src/app/assets.controller.ts`
* **Analisi:** L'uso di `res.sendFile` all'interno di un controller NestJS è funzionale ma non ottimizzato per "Enterprise Grade" ad alto traffico (non gestisce caching headers, ETag, compressione in modo nativo come farebbe `ServeStaticModule` o un reverse proxy tipo Nginx).
* **Path Traversal:** La regex `.replace(/\.\./g, '')` è una protezione debole. Sebbene sufficiente per una demo, in produzione non garantisce sicurezza robusta contro manipolazioni del path (es. `....//`).

---

**Prossimo passo:**
Attendo istruzioni su quale di queste criticità vuoi affrontare per prima o se procedere con una correzione massiva per allineare il codice agli obiettivi dichiarati (SPA reale e Footer SSOT).


Ricevuto. Procedo con la suddivisione degli obiettivi in sotto-obiettivi operativi, mantenendo rigorosamente i protocolli **Code Integrity** (lavoro solo su ciò che vedo) ed **Enterprise Grade** (soluzioni robuste e verificabili).

Ecco il piano d'azione dettagliato:

---

### 1. 🦶 Obiettivo: Architettura Footer (Risoluzione Conflitto SSOT)

**Contesto:** Attualmente il Footer è duplicato: è hardcoded nella `Shell.tsx` (statico) e presente nel JSON `home.json` (renderizzato dinamicamente).
**Scopo:** Rendere il JSON l'unica fonte di verità.

* **1.1. Rimozione Footer Statico**
* **Azione:** Rimuovere il componente `<Footer />` hardcoded all'interno di `apps/public-site/src/app/Shell.tsx`.
* **Verifica:** Ispezione visiva del codice di `Shell.tsx`. Il file non deve più importare né renderizzare `<Footer />` al di fuori del routing.


* **1.2. Refactoring Componente Footer (Dumb Component)**
* **Azione:** Modificare `apps/public-site/src/app/components/ui/Footer.tsx` affinché accetti i dati tramite `props` (passati dal `BlockRenderer`) invece di dipendere esclusivamente dall'hook interno `useFooter` per i contenuti testuali. L'hook può rimanere per dati globali (es. config sito), ma il contenuto specifico deve venire dal blocco JSON.
* **Verifica:** Test unitario o verifica manuale: passando un oggetto `data` diverso tramite props, il footer deve renderizzare quel testo e non quello di default.


* **1.3. Validazione BlockRenderer**
* **Azione:** Verificare che `apps/public-site/src/app/components/BlockRenderer.tsx` gestisca correttamente il caso `type: 'footer'` e passi i dati corretti al componente rifattorizzato.
* **Verifica:** Avvio applicazione (`nx serve`). Nella Home Page deve apparire **un solo** footer (quello definito in `home.json`).



---

### 2. ⚡ Obiettivo: Routing Client-Side (SPA Reale)

**Contesto:** L'uso di tag `<a>` nel componente `Header` causa il ricaricamento completo della pagina (Hard Navigation), rompendo lo stato dell'applicazione e il contesto del Tenant.
**Scopo:** Abilitare la navigazione fluida (Soft Navigation).

* **2.1. Sostituzione Anchor Tags**
* **Azione:** In `apps/public-site/src/app/components/ui/Header.tsx`, sostituire tutti i tag HTML `<a>` (navigazione interna) con il componente `<Link>` o `<NavLink>` di `react-router-dom`.
* **Verifica:** `grep` sul file `Header.tsx`: non devono essere presenti tag `<a href="...">` per percorsi interni (che iniziano con `/`).


* **2.2. Preloading e Active State**
* **Azione:** Implementare la logica per evidenziare la voce di menu attiva (Active Class) utilizzando le funzionalità di Router DOM.
* **Verifica:** Navigando tra "Home" e un'altra pagina, la voce di menu corrispondente deve cambiare stile senza refresh del browser.


* **2.3. Verifica Persistenza Context**
* **Azione:** Testare la navigazione.
* **Verifica:** Aprire i DevTools (Console). Al click su una voce di menu:
1. Il pannello "Network" **non** deve mostrare una nuova richiesta per il documento principale (`localhost`).
2. Il log "🌍 Tenant Attivo..." nel `TenantContext` **non** deve ricomparire (dimostrando che il contesto non è stato resettato).





---

### 3. 🎨 Obiettivo: Gestione CSS / Tailwind (Automazione)

**Contesto:** La generazione del CSS dipende da un comando manuale fragile e posizionato fuori dagli standard Nx.
**Scopo:** Integrare la generazione del CSS nel ciclo di vita di Nx (`build` e `serve`).

* **3.1. Standardizzazione Configurazione**
* **Azione:** Aggiornare `data-store/tenants/default/tailwind.config.js` per assicurarsi che i percorsi (globs) siano relativi alla root del workspace o correttamente risolvibili dal processo di build, indipendentemente dalla CWD (Current Working Directory).
* **Verifica:** Esecuzione del comando di build da una directory diversa dalla root per confermare la robustezza dei path.


* **3.2. Creazione Target Nx**
* **Azione:** Modificare `apps/public-site/project.json` aggiungendo un target `build-css` che esegua il comando `@tailwindcss/cli` specifico (come da tue note).
* **Verifica:** Eseguire `nx run public-site:build-css`. Deve generare correttamente il file `style.css` in `data-store/tenants/default/assets/css/`.


* **3.3. Integrazione Watch Mode**
* **Azione:** Configurare il `serve` affinché esegua il `build-css` in modalità watch in parallelo all'applicazione React.
* **Verifica:** Modificare una classe Tailwind in `Shell.tsx` (es. `bg-red-500`). Salvare. Il browser deve aggiornarsi automaticamente con il nuovo stile senza dover rilanciare comandi manuali.



---

### 4. 🛡️ Obiettivo: Sanitizzazione (Sicurezza)

**Contesto:** Il componente `TextBlock` usa `dangerouslySetInnerHTML` direttamente sui dati del JSON, esponendo l'app a rischi XSS (Cross-Site Scripting).
**Scopo:** Sanitizzare l'HTML in ingresso mantenendo la flessibilità di formattazione.

* **4.1. Installazione Libreria Sanitizzazione**
* **Azione:** Aggiungere `dompurify` (e `@types/dompurify`) alle dipendenze del progetto.
* **Verifica:** Presenza dei pacchetti in `package.json` e assenza di errori di build o linting legati all'importazione.


* **4.2. Implementazione Utility di Sicurezza**
* **Azione:** Creare una utility centralizzata (es. in `libs/shared-data` o utils locali) che configuri `dompurify` per permettere solo i tag sicuri (es. formattazione testo) e rimuovere script/iframe.
* **Verifica:** Creare un test unitario: input `<img src=x onerror=alert(1)>` -> output `<img src="x">` (o rimosso, a seconda della config).


* **4.3. Integrazione nel Rendering**
* **Azione:** Modificare `apps/public-site/src/app/blocks/TextBlock.tsx` per passare il contenuto attraverso la funzione di sanitizzazione prima di passarlo a `dangerouslySetInnerHTML`.
* **Verifica:** Modificare `home.json` inserendo `<script>console.log("XSS")</script>` nel contenuto di un blocco testo. Caricare la pagina e verificare che nella console del browser **non** appaia il log "XSS".



---

Attendo conferma per procedere con l'esecuzione del codice per il primo obiettivo (Architettura Footer).