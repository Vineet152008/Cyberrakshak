import fs from 'fs';
import path from 'path';

const localesDir = path.resolve('src/i18n/locales');

// Define the exact keys in English, Hindi, and Marathi
const commonAdditions = {
  en: {
    emergencyBannerLabel: "National Cyber-Fraud Emergency Assistance",
    opensInNewTab: "(opens in a new tab)",
    calmModeTitle: "Calm Mode",
    calmModeOn: "Calm Mode is ON",
    calmModeOff: "Turn on Calm Mode",
    calmModeDesc: "Removes motion, glows, and animations to keep the screen quiet and easy to read.",
  },
  hi: {
    emergencyBannerLabel: "राष्ट्रीय साइबर धोखाधड़ी आपातकालीन सहायता",
    opensInNewTab: "(नई टैब में खुलता है)",
    calmModeTitle: "शांत मोड",
    calmModeOn: "शांत मोड सक्रिय है",
    calmModeOff: "शांत मोड चालू करें",
    calmModeDesc: "स्क्रीन को शांत और पढ़ने में आसान रखने के लिए मोशन और एनिमेशन हटाता है।",
  },
  mr: {
    emergencyBannerLabel: "राष्ट्रीय सायबर फसवणूक आपत्कालीन सहाय्य",
    opensInNewTab: "(नवीन टॅबमध्ये उघडते)",
    calmModeTitle: "शांत मोड",
    calmModeOn: "शांत मोड चालू आहे",
    calmModeOff: "शांत मोड चालू करा",
    calmModeDesc: "स्क्रीन शांत आणि वाचण्यास सुलभ ठेवण्यासाठी मोशन आणि ॲनिमेशन काढून टाकते.",
  }
};

const homeQuickActionAdditions = {
  en: {
    scamLabTitle: "Scam Lab Sandbox",
    scamLabKicker: "Hands-on Simulation",
    scamLabDesc: "Practice detecting hidden red flags using our signature Spotlight Flashlight and realistic SMS & WhatsApp simulations.",
    scamLabCta: "Practice in Scam Lab",
    emergencyTitle: "Emergency Assist",
    emergencyKicker: "Helpline 1930 Protocol",
    emergencyDesc: "Guided response steps if you suspect fraud, a hacked account, or extortion. Call 1930 and gather evidence.",
    emergencyCta: "Call 1930 (Toll-Free, 24x7)",
    checkerTitle: "Message Checker",
    checkerKicker: "Rule-Based Offline Analysis",
    checkerDesc: "Paste suspicious SMS, WhatsApp message, or email to inspect for common deception cues before you tap, call, or reply.",
    checkerCta: "Inspect Message",
  },
  hi: {
    scamLabTitle: "स्कैम लैब सैंडबॉक्स",
    scamLabKicker: "व्यावहारिक सिमुलेशन",
    scamLabDesc: "स्पॉटलाइट फ्लैशलाइट और वास्तविक एसएमएस व व्हाट्सएप सिमुलेशन का उपयोग करके छिपे हुए लाल झंडों को पहचानने का अभ्यास करें।",
    scamLabCta: "स्कैम लैब में अभ्यास करें",
    emergencyTitle: "आपातकालीन सहायता",
    emergencyKicker: "हेल्पलाइन 1930 प्रोटोकॉल",
    emergencyDesc: "धोखाधड़ी, हैक किए गए खाते या जबरन वसूली की स्थिति में कदम-दर-कदम मार्गदर्शन। 1930 पर कॉल करें और साक्ष्य एकत्रित करें।",
    emergencyCta: "1930 पर कॉल करें (टोल-फ्री, 24x7)",
    checkerTitle: "मैसेज चेकर (धोखाधड़ी पहचान)",
    checkerKicker: "नियम-आधारित ऑफलाइन विश्लेषण",
    checkerDesc: "संदेहास्पद एसएमएस, व्हाट्सएप संदेश या ईमेल को यहाँ पेस्ट करें और क्लिक करने या कॉल करने से पहले छुपे हुए संकेतों की जांच करें।",
    checkerCta: "संदेश की जांच करें",
  },
  mr: {
    scamLabTitle: "स्कॅम लॅब सँडबॉक्स",
    scamLabKicker: "प्रत्यक्ष सराव सिमुलेशन",
    scamLabDesc: "स्पॉटलाइट फ्लॅशलाइट आणि वास्तविक एसएमएस व व्हॉट्सॲप सिमुलेशनद्वारे लपलेले फसवणुकीचे संकेत शोधण्याचा सराव करा.",
    scamLabCta: "स्कॅम लॅबमध्ये सराव करा",
    emergencyTitle: "आपत्कालीन सहाय्य",
    emergencyKicker: "हेल्पलाइन 1930 प्रोटोकॉल",
    emergencyDesc: "फसवणूक, हॅक झालेले खाते किंवा खंडणीच्या प्रसंगी पाऊल-दर-पाऊल मार्गदर्शन. 1930 वर कॉल करा आणि पुरावे गोळा करा.",
    emergencyCta: "1930 वर कॉल करा (टोल-फ्री, 24x7)",
    checkerTitle: "मेसेज चेकर (फसवणूक तपासणी)",
    checkerKicker: "नियम-आधारित ऑफलाइन तपासणी",
    checkerDesc: "संशयास्पद एसएमएस, व्हॉट्सॲप मेसेज किंवा ईमेल येथे पेस्ट करा आणि क्लिक करण्यापूर्वी किंवा कॉल करण्यापूर्वी फसवणुकीचे संकेत तपासा.",
    checkerCta: "मेसेज तपासा",
  }
};

for (const lang of ['en', 'hi', 'mr'] as const) {
  const filePath = path.join(localesDir, `${lang}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  data.common = { ...data.common, ...commonAdditions[lang] };
  data.home = {
    ...data.home,
    quickAction: {
      ...data.home.quickAction,
      ...homeQuickActionAdditions[lang]
    }
  };

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

console.log('Successfully updated en.json, hi.json, mr.json with layout common & quickAction keys.');
