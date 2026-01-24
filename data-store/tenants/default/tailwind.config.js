const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // 👈 SCANSIONE CROSS-PROJECT:
    // Risaliamo dal data-store fino all'app pubblica per leggere le classi usate nei file React
    join(__dirname, '../../../apps/public-site/src/**/*.{ts,tsx,html,js,jsx}')
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1000px", "xl": "1000px", "lg": "1000px" }
    },
    extend: {
      colors: {
        // Mappatura "Business Identity" (sostituisce il vecchio theme.json)
        // I valori esadecimali sono presi dal tuo vecchio theme.json
        
        // Backgrounds
        "site-bg": "#f4f4f9",      // Sfondo chiaro per differenziare dal vecchio dark mode
        "site-card": "#ffffff",    // Card bianche
        "site-code": "#1e1e1e",

        // Text
        "site-text": "#333333",        // Testo scuro
        "site-text-sec": "#666666",    // Testo secondario
        
        // Brand Colors
        "site-accent": "#003366",      // Primary Color del tenant
        "site-border": "#e0e0e0",      // Bordo leggero

        // Mappature Shadcn richieste dai componenti (Button, Badge, etc)
        border: "#e0e0e0",
        background: "#f4f4f9",
        foreground: "#333333",
        primary: {
          DEFAULT: "#003366",
          foreground: "#ffffff"
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#333333"
        },
        muted: {
          DEFAULT: "#f4f4f9",
          foreground: "#666666"
        }
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'], // Font specificato nel vecchio theme.json
        mono: ['monospace'],
      }
    },
  },
  plugins: [],
};