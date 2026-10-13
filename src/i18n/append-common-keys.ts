import fs from 'fs';
import path from 'path';

const additions = {
  en: {
    common: {
      loading: "Loading CyberRakshak module...",
      skipToMain: "Skip to main content",
      errorTitle: "Application Encountered an Issue",
      errorDesc: "Your session progress remains saved locally. Refresh to restart the current interactive module.",
      errorReload: "Reload CyberRakshak"
    },
    nav: {
      langEn: "English",
      langHi: "हिन्दी",
      langMr: "मराठी"
    }
  },
  hi: {
    common: {
      loading: "साइबर रक्षक मॉड्यूल लोड हो रहा है...",
      skipToMain: "मुख्य सामग्री पर जाएं",
      errorTitle: "एप्लिकेशन में कोई समस्या आई",
      errorDesc: "आपकी प्रगति डिवाइस पर सुरक्षित है। मॉड्यूल को पुनः आरंभ करने के लिए रीफ्रेश करें।",
      errorReload: "साइबर रक्षक पुनः लोड करें"
    },
    nav: {
      langEn: "English",
      langHi: "हिन्दी",
      langMr: "मराठी"
    }
  },
  mr: {
    common: {
      loading: "सायबर रक्षक मॉड्यूल लोड होत आहे...",
      skipToMain: "मुख्य मजकुराकडे जा",
      errorTitle: "ॲप्लिकेशनमध्ये तांत्रिक अडचण आली",
      errorDesc: "तुमची प्रगती या उपकरणावर जतन आहे. मॉड्यूल पुन्हा सुरू करण्यासाठी रीफ्रेश करा.",
      errorReload: "सायबर रक्षक पुन्हा लोड करा"
    },
    nav: {
      langEn: "English",
      langHi: "हिन्दी",
      langMr: "मराठी"
    }
  }
};

const localesDir = path.resolve('src/i18n/locales');
for (const lang of ['en', 'hi', 'mr'] as const) {
  const filePath = path.join(localesDir, `${lang}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  data.common = { ...data.common, ...additions[lang].common };
  data.nav = { ...data.nav, ...additions[lang].nav };
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}
console.log('Appended common error & nav keys successfully.');
