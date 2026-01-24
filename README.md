# JsonPages Monorepo

Welcome to **JsonPages**. This repository houses a robust, "Tenant-First" CMS architecture designed to serve multiple sites from a single codebase.

We are currently in an exciting phase of architectural evolution, shifting our public-facing frontend to a high-performance **React** application while leveraging our solid **NestJS** backend.

---

## 🚀 Current Release Status: The "React Migration"

**Date:** January 20, 2026

In this release, we have successfully established the new foundation for the public frontend. The architecture has evolved from a single Angular application to a specialized separation of concerns:

* **`apps/public-site` (New):** A React + Vite application acting as the dynamic public CMS.
* **`apps/frontend` (Legacy):** The original Angular application, now designated to become the future Admin Panel.
* **`apps/backend`:** The NestJS core that serves data, configuration, and assets.

### ✨ Key Features Implemented

We have moved beyond a simple "Hello World" to a fully functional, data-driven engine.

1.  **Multi-Tenant "Brain" (Context API)**
    * The application resolves the Tenant ID (e.g., `trinacria`, `demo`) *before* the UI renders.
    * Implemented via `TenantProvider` connecting to `/api/system/resolve`.

2.  **Dynamic Theme Engine**
    * Styles (CSS) and Scripts (Bootstrap, jQuery) are injected dynamically based on the active tenant.
    * This ensures each site retains its unique visual identity without code duplication.

3.  **Data-Driven Layout (The Shell)**
    * **Header & Footer:** Completely dynamic, rendering logos, menus, and contact info based on `site.json` and `menu.json` configurations.
    * **Pattern:** We utilize a "Logic via Custom Hooks" pattern (e.g., `useHeader`, `useFooter`) to keep our UI components pure and testable.

4.  **Dynamic Page Builder (The Engine)**
    * **Routing:** `react-router-dom` handles dynamic slugs (`/`, `/about`, `/news`).
    * **Block Renderer:** A smart component that reads page definitions (JSON) and renders the appropriate UI blocks on the fly.
    * **Available Blocks:**
        * `HeroBlock`: First component to test the block-render engine.
       
       

---

## 🛠️ Tech Stack

We believe in using the right tool for the job:

* **Monorepo Tool:** Nx (v22.3.3)
* **Backend:** NestJS
* **Frontend:** React 19 + Vite (SCSS Modules)
* **Routing:** React Router v6
* **Type Safety:** TypeScript (Shared interfaces via `libs/shared-data`)

---

## 🏃‍♂️ Getting Started

To run the full stack locally, you will need **two terminal instances**.

### 1. Start the Backend
The backend serves the API and the static assets (images, CSS). It listens on port **3000**.

```bash
nx serve backend
```

### 2. Start the Public Site
The React frontend connects to the backend via a configured Proxy. It listens on port **4200**.

```bash
nx serve public-site
```

> **Tip:** You can simulate different tenants locally by adding a query parameter:
> `http://localhost:4200/?tenant=demo`

---

## 📂 Project Structure

Here is a quick map to help you navigate the codebase:

| Path | Description |
| :--- | :--- |
| **`apps/backend`** | NestJS Application. Handles `api/system`, `api/content`, and serves Assets. |
| **`apps/public-site`** | **(Focus)** The new React Frontend. Contains the Page Builder engine. |
| **`apps/frontend`** | Angular Application (Legacy/Admin). |
| **`libs/shared-data`** | TypeScript interfaces shared between BE and FE (DTOs, Block definitions). |
| **`data-store/`** | The JSON files acting as our database (Tenant configurations and content). |

---

## 🔮 What's Next?

With the core engine in place, our roadmap focuses on:
1.  **Styling:** Add a Tailwind pipeline to each tenant.
2.  **Content Expansion:** Adding more specialized UI Blocks (Galleries, Forms).
3.  **CMS:** add a React Tenant CMS app to the workspace to edit tenat's content and style. {"userType":"editor"}
4.  **NgAdmin:** Refactoring the Angular app to manage users. {"userType":"admin"}
5.  **Testing:** Expanding E2E coverage with Cypress.

---

*Crafted with care by Guido Filippo Serio.*
