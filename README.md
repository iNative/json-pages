# JsonPages - Enterprise Multi-Tenant CMS Architecture

**Version:** 0.1.0 (Enterprise Release)
**Author:** Guido Filippo Serio
**License:** Proprietary

---

## 📋 Executive Summary

This release (v0.1.0) marks a pivotal transition towards a fully **Data-Driven** and **Secure-by-Design** architecture.
The update eradicates technical debt associated with hardcoded structural components, introduces a robust, parallelized CSS build pipeline, and mitigates critical security vulnerabilities (XSS). The entire stack now strictly adheres to "Zero Assumptions" and "Enterprise Grade" (No Workarounds) protocols.

---

## 🏗 Architectural Upgrades

### 1. Single Source of Truth (SSOT) Implementation
**Objective:** Total decoupling of Layout (Shell) from Content.

* **Pre-Release State:** Header and Footer components were hardcoded within `Shell.tsx`, creating discrepancies with the data defined in page JSON files and limiting flexibility for Landing Pages or alternative layouts.
* **Current State:**
    * `Shell.tsx` is now a "pure" container (agnostic to content structure).
    * Header and Footer are treated as **dynamic blocks** (`type: 'header'`, `type: 'footer'`) handled via `BlockRenderer`.
    * The page JSON file serves as the absolute **Single Source of Truth** for the rendered structure.

### 2. Client-Side Routing & SPA Performance
**Objective:** Elimination of "Hard Navigations" to preserve application state.

* **Pre-Release State:** Usage of standard HTML `<a>` tags caused full page refreshes (Flickering), resetting the `TenantContext` and forcing CSS asset re-downloads on every interaction.
* **Current State:**
    * Pervasive implementation of `<Link>` and `<NavLink>` (React Router DOM).
    * **Soft Navigation:** Instant transitions without document reload.
    * **State Persistence:** Tenant context and configuration remain active during navigation.
    * **Active States:** Automatic handling of CSS classes for active menu items via router logic.

### 3. Automated & Robust CSS Pipeline
**Objective:** Automation of Tailwind v4 compilation and resolution of "Brittle Code".

* **Pre-Release State:** Dependency on manual CLI commands and fragile relative paths (`../../../apps...`) within `tailwind.config.js`.
* **Current State:**
    * **Path Hardening:** Tailwind configuration updated to use `process.cwd()`, making the build independent of the execution directory.
    * **Global Build Orchestrator:** New Node.js script `tools/scripts/build-tenants-css.js` manages massive compilation.
        * **Idempotency:** Builds occur only for tenants missing generated CSS.
        * **Parallelism:** Concurrent execution to optimize startup time.
        * **Fault Tolerance:** "Best Effort" approach (a failure in one tenant does not halt the pipeline).
        * **Logging:** Detailed output to file (`logs/css-build.log`) for audit purposes.

### 4. Security Layer (XSS Prevention)
**Objective:** Risk mitigation for Cross-Site Scripting on injected content.

* **Pre-Release State:** Direct use of `dangerouslySetInnerHTML` on raw JSON data.
* **Current State:**
    * Integration of **DOMPurify** library.
    * Creation of a centralized utility `security.ts` for input sanitization.
    * `TextBlock` and `HtmlBlock` components now automatically filter malicious scripts and dangerous attributes (e.g., `onerror`, `onclick`) while maintaining safe HTML formatting.

---

## 🛠 Operational Guide

### Prerequisites
* **Runtime:** Node.js (LTS Version)
* **Monorepo Tool:** Nx v22.3.3

### Development Startup
The architecture requires the parallel execution of the Backend (API/Assets) and Frontend (Public Site).

#### 1. Backend Service
Manages tenant resolution, static asset serving, and configuration APIs.

```bash
nx serve backend
```

#### 2. Public Site (Frontend)
Automatically triggers the CSS orchestration and launches the Vite development server.

```bash
nx serve public-site
```
*Note: Upon launch, the system checks for the existence of `style.css` for every tenant. If missing, it is generated automatically before the server starts.*

---

## 🔍 Code Integrity Protocols

This project strictly adheres to the following development protocols:

1.  **"Zero Assumptions" Protocol:**
    Every code modification is preceded by static analysis and verification of the current source. No refactoring is based on memory or unverified theoretical standards.

2.  **"No Workarounds" Protocol:**
    * Strict prohibition of `--force` or `--legacy-peer-deps`.
    * Strict prohibition of unjustified `any` types.
    * Every error (Build/Lint) is resolved at the Root Cause.

---

**End of Documentation**