# JsonPages Platform (Enterprise Edition v4.1)

A Headless, Multi-Tenant CMS Platform based on JSON files, built with **Nx**, **Angular (Standalone)**, and **NestJS**.
The system supports dynamic page rendering, runtime custom themes, and multi-domain management without recompilation.

---

## 🚀 Architecture

The project follows a **Monorepo Enterprise** architecture:

- **Frontend (`apps/frontend`)**: A "dumb" Angular application that delegates logic to libraries. It uses sequential bootstrapping (Tenant Resolution -> Config Loading).
- **Backend (`apps/backend`)**: NestJS API acting as a "File System Proxy". It manages domain resolution via `SystemController` and serves protected static assets via `AssetsController`.
- **Libs**:
  - `libs/data-access`: Contains HTTP services (`TenantService`, `ConfigService`, `ContentService`) and Injection Tokens (`API_URL`).
  - `libs/ui`: Presentation components (`Header`, `Footer`, `DynamicPage`, `GridWrapper`).
  - `libs/shared-data`: Shared TypeScript interfaces (DTOs, Entities, Config Types).
- **Data Store (`data-store/`)**: The file-system-based "Database". Each folder represents an isolated tenant.

---

## 🛠️ Prerequisites

- Node.js (v18+)
- Nx CLI (`npm install -g nx`)

## 📦 Installation

```bash
npm install
```

## ▶️ Running Development

You must run the backend and frontend in two separate terminals.

**Terminal 1: Backend (Port 3000)**
```bash
nx serve backend
```

**Terminal 2: Frontend (Port 4200)**
```bash
nx serve frontend
```

Open your browser at: `http://localhost:4200`

---

## 🌍 Multi-Tenancy Logic

The system resolves which site to display based on the Hostname or query parameters.

### 1. Domain Mapping
The file `data-store/system/domains.json` maps hostnames to data folders.

```json
{
  "localhost": "trinacria",
  "[www.example-client.com](https://www.example-client.com)": "client-1",
  "demo.local": "landing"
}
```

### 2. Development Override
You can force a specific tenant locally using the `tenant` parameter:
`http://localhost:4200/?tenant=trinacria`

---

## 📂 Data Store Structure

Each client has a dedicated folder in `data-store/{tenantId}/`:

```text
data-store/
├── system/
│   └── domains.json       # Global domain registry
└── trinacria/             # Tenant ID
    ├── assets/            # Static files (img, css, js)
    │   ├── css/theme.css  # Specific styles
    │   └── js/theme.js    # Specific scripts
    ├── config/
    │   ├── site.json      # Meta info (Title, Logo)
    │   ├── theme.json     # CSS Variables (Colors, Fonts)
    │   └── menu.json      # Navigation structure
    ├── content/           # Data collections (e.g., athletes.json, news.json)
    └── pages/             # Page Definitions (e.g., home.json)
```

---

## 🎨 Theme Loader System

The frontend does not have hardcoded CSS. Upon initialization:
1. `TenantService` (in `libs/data-access`) queries the backend for the tenant ID.
2. `ThemeLoaderService` dynamically injects the following into the `<head>`/`<body>`:
   - `assets/{tenant}/css/theme.css`
   - `assets/{tenant}/js/jquery.min.js`
   - `assets/{tenant}/js/bootstrap.js`
   - `assets/{tenant}/js/theme.js` (Loaded last to ensure dependencies exist).

---

## 🐛 Common Troubleshooting


**1. "init is not a function" Error (theme.js)**
- This indicates that JS dependencies (e.g., `aos.js`) were not loaded before `theme.js` executed.
- Check the loading order in `ThemeLoaderService`.

---

## 📜 License

Proprietary / Internal Use Only.
