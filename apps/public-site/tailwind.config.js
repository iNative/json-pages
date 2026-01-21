const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    join(__dirname, '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1000px", "xl": "1000px", "lg": "1000px" } // Max-width 1000px come da CSS .container
    },
    extend: {
      colors: {
        "site-bg": "var(--bg-color)",
        "site-card": "var(--card-bg)",
        "site-text": "var(--text-primary)",
        "site-text-sec": "var(--text-secondary)",
        "site-accent": "var(--accent)",
        "site-border": "#30363d", // Valore hardcoded per sicurezza
        "site-code": "var(--code-bg)",
        border: "var(--border)",
        background: "var(--bg-color)",
        foreground: "var(--text-primary)",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
};