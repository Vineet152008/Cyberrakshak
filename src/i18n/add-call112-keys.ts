import fs from 'fs';
import path from 'path';

const localesDir = path.resolve('src/i18n/locales');

const additions = {
  en: {
    emergency: {
      call112Button: "112 (Police / Emergency)",
    },
    home: {
      footerCall1930: "1930 (Toll Free, 24x7)",
      footerCall112: "112 (Police / Emergency)",
    },
    common: {
      call1930: "1930 (Toll Free, 24x7)",
      call112: "112 (Police / Emergency)",
    }
  },
  hi: {
    emergency: {
      call112Button: "112 (पुलिस / आपातकालीन)",
    },
    home: {
      footerCall1930: "1930 (टोल-फ्री, 24x7)",
      footerCall112: "112 (पुलिस / आपातकालीन)",
    },
    common: {
      call1930: "1930 (टोल-फ्री, 24x7)",
      call112: "112 (पुलिस / आपातकालीन)",
    }
  },
  mr: {
    emergency: {
      call112Button: "112 (पोलीस / आपत्कालीन)",
    },
    home: {
      footerCall1930: "1930 (टोल-फ्री, 24x7)",
      footerCall112: "112 (पोलीस / आपत्कालीन)",
    },
    common: {
      call1930: "1930 (टोल-फ्री, 24x7)",
      call112: "112 (पोलीस / आपत्कालीन)",
    }
  }
};

for (const lang of ['en', 'hi', 'mr'] as const) {
  const filePath = path.join(localesDir, `${lang}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  data.emergency = { ...data.emergency, ...additions[lang].emergency };
  data.home = { ...data.home, ...additions[lang].home };
  data.common = { ...data.common, ...additions[lang].common };

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

console.log('Added call112Button and footer helpline keys across all locales.');
