const { join } = require('path');

module.exports = {
  plugins: {
    // 👇 MODIFICA QUI: Usiamo il package specifico
    '@tailwindcss/postcss': {
      config: join(__dirname, 'tailwind.config.js'),
    },
    autoprefixer: {},
  },
};