import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Base initial bundles (common navigation, branding, footer, home hero/radar/atlas)
import commonEn from './locales/common/en.json';
import commonHi from './locales/common/hi.json';
import commonMr from './locales/common/mr.json';
import homeEn from './locales/home/en.json';
import homeHi from './locales/home/hi.json';
import homeMr from './locales/home/mr.json';

const detectInitialLanguage = (): string => {
  if (typeof window === 'undefined') return 'en';
  try {
    const saved = localStorage.getItem('cyberrakshak_lang');
    if (saved && ['en', 'hi', 'mr'].includes(saved)) {
      return saved;
    }
    const navLangs = navigator.languages || [navigator.language || ''];
    for (const l of navLangs) {
      const lower = l.toLowerCase();
      if (lower.startsWith('hi')) return 'hi';
      if (lower.startsWith('mr')) return 'mr';
    }
  } catch {
    // LocalStorage or navigator restriction resilience
  }
  return 'en';
};

const initialLang = detectInitialLanguage();

export const updateDocumentLocale = (lng: string) => {
  if (typeof document === 'undefined') return;
  document.documentElement.lang = lng;

  const titles: Record<string, string> = {
    en: 'CyberRakshak — Cyber-Fraud Awareness & Citizen Safety',
    hi: 'साइबर रक्षक — साइबर धोखाधड़ी जागरूकता एवं नागरिक सुरक्षा',
    mr: 'सायबर रक्षक — सायबर फसवणूक जनजागृती आणि नागरिक सुरक्षा',
  };

  const descriptions: Record<string, string> = {
    en: 'Independent cyber safety companion for Indian citizens to recognize deception, practice spotting scams, and know immediate emergency steps (Helpline 1930).',
    hi: 'भारतीय नागरिकों के लिए स्वतंत्र साइबर सुरक्षा साथी - धोखाधड़ी पहचानना, अभ्यास करना और तुरंत आपातकालीन कदम (हेल्पलाइन 1930)।',
    mr: 'भारतीय नागरिकांसाठी स्वतंत्र सायबर सुरक्षा मार्गदर्शक - फसवणूक ओळखणे, सराव करणे आणि त्वरित आपत्कालीन पावले (हेल्पलाइन 1930).',
  };

  if (titles[lng]) {
    document.title = titles[lng];
  }
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && descriptions[lng]) {
    metaDesc.setAttribute('content', descriptions[lng]);
  }
};

// Core cross-cutting keys guaranteed to be present across root layouts
const coreFallbacks = {
  en: {
    emergency: {
      badge: "Citizen Helpline 1930",
      opensInNewTab: "(opens in a new tab)",
      calmModeOff: "Turn on Calm Mode",
      calmModeOn: "Calm Mode is ON",
      calmModeTitle: "Calm Mode",
      pageSubtitle: "Clear, step-by-step guidance if you suspect fraud, a hacked account, or extortion. Take a deep breath — we will walk through what you can do.",
      call1930Button: "Call 1930 (Toll-Free, 24x7)",
      call112Button: "112 (Police / Emergency)",
      chakshuButton: "Report Number on Chakshu",
    },
    scamLab: {
      meta: {
        subtitle: "Practice detecting hidden red flags using our signature Spotlight Flashlight and realistic SMS & WhatsApp simulations.",
      },
    },
    checker: {
      badge: "Rule-Based Offline Analysis",
      subtitle: "Paste a suspicious SMS, WhatsApp text, or email to inspect for common deception cues before you tap, call, or reply.",
      analyzeButton: "Inspect Message",
    },
    academy: {
      closeModal: "Close",
    },
    toolkit: {
      triageSelectPrompt: "What is the caller or sender claiming?",
      triageActionTitle: "Immediate Action Required",
    },
  },
  hi: {
    emergency: {
      badge: "नागरिक हेल्पलाइन 1930",
      opensInNewTab: "(नई टैब में खुलता है)",
      calmModeOff: "शांत मोड चालू करें",
      calmModeOn: "शांत मोड सक्रिय है",
      calmModeTitle: "शांत मोड",
      pageSubtitle: "धोखाधड़ी, हैक किए गए खाते या जबरन वसूली की स्थिति में कदम-दर-कदम स्पष्ट मार्गदर्शन। गहरी सांस लें - हम आपकी सहायता करेंगे।",
      call1930Button: "1930 पर कॉल करें (टोल-फ्री, 24x7)",
      call112Button: "112 (पुलिस / आपातकालीन)",
      chakshuButton: "चक्षु पर नंबर रिपोर्ट करें",
    },
    scamLab: {
      meta: {
        subtitle: "स्पॉटलाइट फ्लैशलाइट और वास्तविक एसएमएस व व्हाट्सएप सिमुलेशन का उपयोग करके छिपे हुए लाल झंडों को पहचानने का अभ्यास करें।",
      },
    },
    checker: {
      badge: "नियम-आधारित ऑफलाइन विश्लेषण",
      subtitle: "संदेहास्पद एसएमएस, व्हाट्सएप संदेश या ईमेल को यहाँ पेस्ट करें और क्लिक करने या कॉल करने से पहले छुपे हुए लाल झंडों की जांच करें।",
      analyzeButton: "संदेश की जांच करें",
    },
    academy: {
      closeModal: "बंद करें",
    },
    toolkit: {
      triageSelectPrompt: "फोन करने वाला या संदेश भेजने वाला क्या दावा कर रहा है?",
      triageActionTitle: "तत्काल आवश्यक कदम",
    },
  },
  mr: {
    emergency: {
      badge: "नागरिक हेल्पलाइन 1930",
      opensInNewTab: "(नवीन टॅबमध्ये उघडते)",
      calmModeOff: "शांत मोड चालू करा",
      calmModeOn: "शांत मोड चालू आहे",
      calmModeTitle: "शांत मोड",
      pageSubtitle: "फसवणूक, हॅक झालेले खाते किंवा खंडणीच्या प्रसंगी पाऊल-दर-पाऊल स्पष्ट मार्गदर्शन. शांत राहा - आम्ही मदत करू.",
      call1930Button: "1930 वर कॉल करा (टोल-फ्री, 24x7)",
      call112Button: "112 (पोलीस / आपत्कालीन)",
      chakshuButton: "चक्षुवर नंबर नोंदवा",
    },
    scamLab: {
      meta: {
        subtitle: "स्पॉटलाइट फ्लॅशलाइट आणि वास्तविक एसएमएस व व्हॉट्सॲप सिमुलेशनद्वारे लपलेले फसवणुकीचे संकेत शोधण्याचा सराव करा.",
      },
    },
    checker: {
      badge: "नियम-आधारित ऑफलाइन तपासणी",
      subtitle: "संशयास्पद एसएमएस, व्हॉट्सॲप मेसेज किंवा ईमेल येथे पेस्ट करा आणि क्लिक करण्यापूर्वी किंवा कॉल करण्यापूर्वी फसवणुकीचे संकेत तपासा.",
      analyzeButton: "मेसेज तपासा",
    },
    academy: {
      closeModal: "बंद करा",
    },
    toolkit: {
      triageSelectPrompt: "फोन करणारा किंवा मेसेज पाठवणारा काय दावा करत आहे?",
      triageActionTitle: "तातडीने आवश्यक कृती",
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          ...commonEn,
          ...homeEn,
          ...coreFallbacks.en,
        },
      },
      hi: {
        translation: {
          ...commonHi,
          ...homeHi,
          ...coreFallbacks.hi,
        },
      },
      mr: {
        translation: {
          ...commonMr,
          ...homeMr,
          ...coreFallbacks.mr,
        },
      },
    },
    lng: initialLang,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    saveMissing: import.meta.env?.DEV ?? false,
    missingKeyHandler: (lngs, ns, key) => {
      const errMsg = `[MISSING I18N KEY] Language: ${lngs.join(',')} | Namespace: ${ns} | Key: ${key}`;
      if (import.meta.env?.DEV) {
        console.error(errMsg);
        if (typeof window !== 'undefined') {
          const win = window as unknown as { __MISSING_I18N_KEYS__?: string[] };
          win.__MISSING_I18N_KEYS__ = win.__MISSING_I18N_KEYS__ || [];
          win.__MISSING_I18N_KEYS__.push(key);
        }
      }
    },
  });

// Apply document locale attributes on initialization and language change
updateDocumentLocale(initialLang);

i18n.on('languageChanged', (lng) => {
  try {
    localStorage.setItem('cyberrakshak_lang', lng);
  } catch {
    // Resilience
  }
  updateDocumentLocale(lng);
});

export default i18n;
