const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ✅ ENTERPRISE FIX: Uso process.cwd() per ancorare il path alla root del Workspace.
    // Questo elimina la fragilità dei percorsi relativi (es. ../../../).
    join(process.cwd(), 'apps/public-site/src/**/*.{ts,tsx,html,js,jsx}')
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1000px", "xl": "1000px", "lg": "1000px" }
    },
    extend: {
      colors: {
        // ... (Mantieni i colori esistenti invariati)
        "site-bg": "#f4f4f9",
        "site-card": "#ffffff",
        "site-code": "#1e1e1e",
        "site-text": "#333333",
        "site-text-sec": "#666666",
        "site-accent": "#003366",
        "site-border": "#e0e0e0",
        border: "#e0e0e0",
        background: "#f4f4f9",
        foreground: "#333333",
        primary: { DEFAULT: "#003366", foreground: "#ffffff" },
        card: { DEFAULT: "#ffffff", foreground: "#333333" },
        muted: { DEFAULT: "#f4f4f9", foreground: "#666666" }
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        mono: ['monospace'],
      }
    },
  },
  plugins: [],
};