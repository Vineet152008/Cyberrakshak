import fs from 'fs';
import path from 'path';

const localesDir = path.resolve('src/i18n/locales');

const academyAdditions = {
  en: {
    uncompleted: "Uncompleted",
    verifiedBy: "Verified by {{issuer}}",
    percentComplete: "{{percent}}% Complete",
    categoryUpi: "UPI & QR",
    categoryArrest: "Digital Arrest",
    categorySeniors: "Senior Defense",
  },
  hi: {
    uncompleted: "अपूर्ण",
    verifiedBy: "{{issuer}} द्वारा सत्यापित",
    percentComplete: "{{percent}}% पूर्ण",
    categoryUpi: "यूपीआई एवं क्यूआर",
    categoryArrest: "डिजिटल अरेस्ट",
    categorySeniors: "वरिष्ठ सुरक्षा",
  },
  mr: {
    uncompleted: "अपूर्ण",
    verifiedBy: "{{issuer}} द्वारे प्रमाणित",
    percentComplete: "{{percent}}% पूर्ण",
    categoryUpi: "यूपीआय आणि क्यूआर",
    categoryArrest: "डिजिटल अरेस्ट",
    categorySeniors: "ज्येष्ठ सुरक्षा",
  },
};

const toolkitAdditions = {
  en: {
    percentHardened: "{{percent}}% Hardened",
    call1930Immediately: "Call 1930 Immediately",
    reportChakshu: "Report on Chakshu Portal",
    copiedNotice: "Safety guide summary copied to clipboard!",
    pocketWordmark: "CYBERRAKSHAK CITIZEN SAFETY PROTOCOL",
    pocketCardHeading: "Household Cyber-Fraud Emergency Guide",
    pocketCardSub: "Keep near telephone or refrigerator for seniors and family members",
    pocketCyberFraud: "Cyber Financial Fraud",
    pocketPoliceEmergency: "Police Emergency",
    pocketElectricityBoard: "Electricity Board",
    pocketTollFree: "24x7 Toll Free",
    pocketAllStates: "All States",
    pocketBillVerification: "Bill Verification",
    pocketFourRulesHeading: "Four Non-Negotiable Citizen Defense Rules",
    rule1Bold: "Never enter a UPI PIN to receive money.",
    rule1Text: "PIN is strictly for debiting your account.",
    rule2Bold: "No police officer interrogates on WhatsApp video calls.",
    rule2Text: "'Digital arrest' is 100% fake.",
    rule3Bold: "Never install APKs or AnyDesk/QuickSupport",
    rule3Text: "upon unsolicited caller requests.",
    rule4Bold: "If money was debited, call 1930 immediately",
    rule4Text: "to freeze beneficiary accounts.",
  },
  hi: {
    percentHardened: "{{percent}}% सुरक्षित",
    call1930Immediately: "तुरंत 1930 पर कॉल करें",
    reportChakshu: "चक्षु पोर्टल पर रिपोर्ट करें",
    copiedNotice: "सुरक्षा मार्गदर्शिका क्लिपबोर्ड पर कॉपी हो गई!",
    pocketWordmark: "साइबर रक्षक नागरिक सुरक्षा प्रोटोकॉल",
    pocketCardHeading: "पारिवारिक साइबर धोखाधड़ी आपातकालीन गाइड",
    pocketCardSub: "वरिष्ठ नागरिकों और परिजनों के लिए फोन या फ्रिज के पास रखें",
    pocketCyberFraud: "साइबर वित्तीय धोखाधड़ी",
    pocketPoliceEmergency: "पुलिस आपातकालीन",
    pocketElectricityBoard: "बिजली बोर्ड",
    pocketTollFree: "24x7 टोल फ्री",
    pocketAllStates: "सभी राज्य",
    pocketBillVerification: "बिल सत्यापन",
    pocketFourRulesHeading: "नागरिक सुरक्षा के चार अनिवार्य नियम",
    rule1Bold: "पैसे पाने के लिए कभी यूपीआई पिन न डालें।",
    rule1Text: "पिन केवल आपके खाते से पैसे काटने के लिए होता है।",
    rule2Bold: "कोई भी पुलिस अधिकारी व्हाट्सएप वीडियो कॉल पर पूछताछ नहीं करता।",
    rule2Text: "'डिजिटल अरेस्ट' 100% फर्जी है।",
    rule3Bold: "कभी भी एपीके या AnyDesk/QuickSupport इंस्टॉल न करें",
    rule3Text: "अपरिचित कॉलर के कहने पर।",
    rule4Bold: "पैसे कटने पर तुरंत 1930 डायल करें",
    rule4Text: "ताकि अपराधी का बैंक खाता फ्रीज हो सके।",
  },
  mr: {
    percentHardened: "{{percent}}% सुरक्षित",
    call1930Immediately: "त्वरित 1930 वर कॉल करा",
    reportChakshu: "चक्षु पोर्टलवर नोंदवा",
    copiedNotice: "सुरक्षा मार्गदर्शक क्लिपबोर्डवर कॉपी झाला!",
    pocketWordmark: "सायबर रक्षक नागरिक सुरक्षा प्रोटोकॉल",
    pocketCardHeading: "कौटुंबिक सायबर फसवणूक आपत्कालीन मार्गदर्शक",
    pocketCardSub: "ज्येष्ठ नागरिक आणि कुटुंबासाठी फोन किंवा फ्रीजजवळ ठेवा",
    pocketCyberFraud: "सायबर आर्थिक फसवणूक",
    pocketPoliceEmergency: "पोलीस आपत्कालीन",
    pocketElectricityBoard: "वीज मंडळ",
    pocketTollFree: "24x7 टोल फ्री",
    pocketAllStates: "सर्व राज्ये",
    pocketBillVerification: "बिल पडताळणी",
    pocketFourRulesHeading: "नागरिक संरक्षणाचे चार अत्यावश्यक नियम",
    rule1Bold: "पैसे मिळवण्यासाठी कधीही यूपीआय पिन टाकू नका.",
    rule1Text: "पिन फक्त तुमच्या खात्यातून पैसे कापण्यासाठी असतो.",
    rule2Bold: "कोणताही पोलीस अधिकारी व्हॉट्सॲप व्हिडिओ कॉलवर चौकशी करत नाही.",
    rule2Text: "'डिजिटल अरेस्ट' 100% बनावट आहे.",
    rule3Bold: "कधीही एपीके किंवा AnyDesk/QuickSupport इन्स्टॉल करू नका",
    rule3Text: "अनोळखी व्यक्तीच्या सांगण्यावरून.",
    rule4Bold: "पैसे कापल्यास त्वरित 1930 डायल करा",
    rule4Text: "जेणेकरून गुन्हेगाराचे बँक खाते गोठवता येईल.",
  },
};

for (const lang of ['en', 'hi', 'mr'] as const) {
  const filePath = path.join(localesDir, `${lang}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  data.academy = { ...data.academy, ...academyAdditions[lang] };
  data.toolkit = { ...data.toolkit, ...toolkitAdditions[lang] };

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

console.log('Appended academy and toolkit supplementary keys across all locales.');
