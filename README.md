# JsonPages - Federated Multi-Tenant CMS Architecture

**Version:** 0.2.0 (Federated UI Release)
**Author:** Guido Filippo Serio
**License:** Proprietary

---

## 📋 Executive Summary

This release (v0.2.0) elevates the platform from a data-driven CMS to a **Federated Frontend Architecture**.
We have successfully shifted the paradigm: the core application now acts as a runtime engine, while the individual Tenants have evolved into "User Land" silos capable of defining their own React components. This structure is supported by a centralized Design System (`libs/ui`) and a cutting-edge **Native Tailwind v4** styling pipeline, eliminating the technical debt of legacy build configurations.

---

## 🏗 Architectural Upgrades

### 1. Federated "Silo" Architecture (User Land)
**Objective:** Empower Tenants to own their frontend implementation while sharing the core runtime.

* **Pre-Release State:** Tenants were passive directories containing only JSON data. All React logic was hardcoded in the `public-site` app.
* **Current State:**
    * **Active Silos:** The `data-store/tenants` directory now hosts executable React code (e.g., `NxWelcome.tsx`).
    * **Federation:** The Core App consumes these tenant-specific components dynamically.
    * **Benefit:** Custom business logic and unique layouts can be deployed for a specific tenant without polluting the main application codebase.

### 2. Centralized Shared UI Library
**Objective:** Enforce design consistency across all tenants via a reusable primitive layer.

* **Pre-Release State:** UI components were scattered within the application folders.
* **Current State:**
    * **`@json-pages/ui`:** A dedicated Nx library hosting Shadcn/Tailwind primitives (Buttons, Cards, Navigation).
    * **Agnostic Design:** These components are pure and logic-free, ready to be composed by the Tenant Silos.

### 3. Native Tailwind v4 Implementation
**Objective:** Removal of "Brittle Configs" and complex build scripts.

* **Pre-Release State:** Reliance on fragile `postcss.config.js` logic, `fs` file system hacks, and relative path guessing to style external libraries.
* **Current State:**
    * **Pure CSS Configuration:** Replaced JavaScript configs with native v4 directives.
    * **`@source` Directive:** Explicitly links the CSS engine to the Shared UI library from within the stylesheet.
    * **`@theme` Directive:** Maps Shadcn variables to Tailwind classes natively.
    * **Result:** Zero-configuration style inheritance. Styles work seamlessly in Core, Library, and Tenant Silos.

### 4. Single Source of Truth (SSOT)
**Objective:** Total decoupling of Layout (Shell) from Content.

* **State:** `Shell.tsx` remains a "pure" container. The page JSON file serves as the absolute **Single Source of Truth**, determining whether headers, footers, or custom blocks are rendered.

---

## 🛡 Security & Performance

### Client-Side Routing (SPA)
* **Soft Navigation:** Usage of `<Link>` ensures instant transitions without document reloads, preserving the Tenant Context.
* **Active States:** Automatic handling of CSS classes for navigation menus.

### Security Layer (XSS Prevention)
* **Sanitization:** Integration of **DOMPurify** via a centralized `security.ts` utility.
* **Safety:** `TextBlock` and `HtmlBlock` components automatically strip malicious scripts (`onerror`, `onclick`) while preserving safe HTML.

---

## 🛠 Operational Guide

### Prerequisites
* **Runtime:** Node.js (LTS Version)
* **Monorepo Tool:** Nx v22.3.3

### Development Startup

#### 1. Backend Service
Manages tenant resolution and static assets.

```bash
nx serve backend
```
#### 2. Public Site (Frontend)
The runtime engine that renders the federated tenant components.

```bash
nx serve public-site
```