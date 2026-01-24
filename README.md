# JsonPages |  Multi-Tenant CMS Architecture
**Version:** 0.7.0 (Dev Preview)
**Commit Ref:** #07 - Styling Pipeline & Context Stabilization

## 1. Project Overview
JsonPages is a decoupled, multi-tenant Content Management System designed for high scalability and separation of concerns. It leverages a **Monorepo** architecture (Nx) to unify a NestJS backend core with a dynamic React frontend.

The system operates on a **"Zero-DB"** philosophy for content, utilizing a structured JSON file system (`data-store`) to drive configuration, routing, styling, and content rendering.

### Key Architectural Features
* **Core:** NestJS (API Gateway, Static Asset Server, Proxy).
* **Client:** React + Vite (SPA, Dynamic Block Rendering).
* **Multi-Tenancy:** Resolved via Hostname and `X-Site-ID` headers.
* **Styling:** Tenant-specific CSS injection (TailwindCSS) with runtime loading.
* **Data Source:** File-system based JSON repository.

---

## 2. Environment Setup

### Prerequisites
* Node.js (LTS recommended)
* NPM or Yarn
* Nx CLI (`npm install -g nx`)

### Installation
```bash
npm install
```

### Development Execution
The system requires both the backend API and the frontend client to run simultaneously.

**1. Start Backend API (Port 3000)**
```bash
nx serve backend
```

**2. Start Frontend Client (Port 4200)**
```bash
nx serve public-site
```

---

## 3. Styling Workflow (Manual Pipeline)
**Note:** As of Commit #07, the CSS build process is **not yet automated** in the CI/CD pipeline. Styles must be compiled manually when changes are made to the tenant's `input.css`.

**Command to generate Tenant CSS:**
```bash
npx @tailwindcss/cli -i data-store/tenants/default/input.css -o data-store/tenants/default/assets/css/style.css
```
*Execute this command in the project root whenever `input.css` or React components are modified.*

---

## 4. Architecture & Data Flow

### Tenant Resolution
1.  **Browser:** User requests `localhost` (or mapped domain).
2.  **Frontend (`TenantContext`):** Queries `/api/system/resolve?hostname=...`.
3.  **Backend:** Maps hostname to a `tenantId` (e.g., `default`).
4.  **Frontend:** Stores `tenantId` and attaches `X-Site-ID: default` to all subsequent API calls.

### Page Rendering Strategy
1.  **Frontend (`usePage`):** Fetches content from `/api/pages/{slug}`.
2.  **Dynamic Rendering:** The `BlockRenderer` component iterates over the JSON `blocks` array.
3.  **Component Mapping:** JSON types (e.g., `hero`, `grid`, `code`) are mapped to React components at runtime.

---

## 5. Current Status & Technical Debt (Commit #07)

### ✅ Functional Modules
* **Backend Routing:** API endpoints for Page, Config, and Asset retrieval are stable.
* **Asset Injection:** `Shell.tsx` successfully injects tenant-specific CSS (`style.css`) via `useThemeLoader`.
* **JSON Parsing:** React DevTools source-map errors isolated; data flow confirmed via console logs.
* **Component Library:** Hero, Grid, Text, and Code blocks are implemented.

### ⚠️ Critical Technical Debt (Backlog)
The following issues are identified and scheduled for immediate refactoring:

1.  **SPA Routing Violation:**
    * **Issue:** The `Header` component currently uses standard HTML `<a>` tags.
    * **Impact:** Causes full page reloads, destroying application state and context on navigation.
    * **Fix:** Migration to `react-router-dom/Link` required.

2.  **Security Vulnerability (XSS):**
    * **Issue:** `TextBlock.tsx` utilizes `dangerouslySetInnerHTML` without input sanitization.
    * **Impact:** High risk of Cross-Site Scripting via compromised JSON files.
    * **Fix:** Implementation of `dompurify` library is mandatory.

3.  **Layout Redundancy:**
    * **Issue:** Footer is rendered statically in `Shell.tsx` AND dynamically via JSON blocks.
    * **Fix:** Removal of hardcoded Footer to establish JSON as the Single Source of Truth (SSoT).

4.  **Build Automation:**
    * **Issue:** Lack of `npm run build:css` script.
    * **Fix:** Integration of Tailwind CLI command into `project.json` targets.

---

## 6. Directory Structure (Data Store)

The `data-store` serves as the database for the application.

```text
data-store/
├── system/
│   └── domains.json         # Hostname -> TenantId mapping
└── tenants/
    └── [tenant-id]/
        ├── assets/          # Static files (Images, compiled CSS)
        ├── config/          # Site-wide settings (Menu, Theme, Site info)
        ├── pages/           # Page definitions (Home, About, etc.)
        ├── input.css        # Tailwind source file
        └── tailwind.config.js
```