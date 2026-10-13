import fs from 'fs';
import path from 'path';

const emergencyExtAdditions = {
  en: {
    selectCategoryAria: "Select Incident Category (Use Arrow Keys to Navigate)",
    extortionReassuranceTitle: "Important Reassurance: This is not your fault.",
    extortionReassuranceBody: "Criminals specialize in manufacturing fear and urgency. Do not blame yourself. Thousands of citizens face these intimidations daily. Help and legal protection are available.",
    extortionCall1930: "Call 1930 (If money was already sent)",
    extortionCall112: "Call 112 (If in physical danger)",
    extortionReportPortal: "Report Threats at cybercrime.gov.in",
    reachBankSafelyTitle: "How to Reach Your Bank Safely",
    reachBankSafelyBody: "Turn over your ATM/Debit card and dial the customer service phone number printed on the back. If your card is not with you, open your bank’s official mobile app or look at the first page of your physical bank passbook.",
    reachBankSafelyWarning: "Never search online search engines for bank customer care numbers.",
    crossLinkAccountTitle: "Were your phone, WhatsApp, or passwords also compromised?",
    crossLinkAccountBody: "If the scammer took over your social media, phone SIM, or email account, take defensive steps immediately.",
    crossLinkAccountButton: "Go to Hacked Account Guide",
    crossLinkFinancialTitle: "Did the attacker also transfer money or debit your bank account?",
    crossLinkFinancialBody: "If unauthorized financial transactions occurred, alert the 1930 helpline and your bank right away.",
    crossLinkFinancialButton: "Go to Financial Fraud Guide",
    dotSancharSaathi: "Department of Telecommunications (DoT) Sanchar Saathi"
  },
  hi: {
    selectCategoryAria: "घटना श्रेणी चुनें (नेविगेट करने के लिए तीर कुंजियों का उपयोग करें)",
    extortionReassuranceTitle: "महत्वपूर्ण संबल: यह आपकी गलती नहीं है।",
    extortionReassuranceBody: "अपराधी भय और जल्दबाजी पैदा करने में माहिर होते हैं। स्वयं को दोष न दें। हजारों नागरिक प्रतिदिन इस भय का सामना करते हैं। सहायता और कानूनी सुरक्षा उपलब्ध है।",
    extortionCall1930: "1930 पर कॉल करें (यदि पैसे पहले ही भेज दिए हैं)",
    extortionCall112: "112 पर कॉल करें (यदि शारीरिक खतरे में हों)",
    extortionReportPortal: "cybercrime.gov.in पर धमकियों की रिपोर्ट करें",
    reachBankSafelyTitle: "अपने बैंक से सुरक्षित रूप से संपर्क कैसे करें",
    reachBankSafelyBody: "अपने एटीएम/डेबिट कार्ड को पलटें और पीछे छपे ग्राहक सेवा नंबर पर कॉल करें। यदि कार्ड पास नहीं है, तो बैंक के आधिकारिक ऐप या बैंक पासबुक के पहले पन्ने पर देखें।",
    reachBankSafelyWarning: "इंटरनेट सर्च इंजन पर कभी भी बैंक ग्राहक सेवा नंबर न खोजें।",
    crossLinkAccountTitle: "क्या आपका फोन, व्हाट्सएप या पासवर्ड भी हैक हुआ है?",
    crossLinkAccountBody: "यदि धोखेबाज ने आपका सोशल मीडिया, फोन सिम या ईमेल खाता अपने कब्जे में ले लिया है, तो तुरंत सुरक्षा कदम उठाएं।",
    crossLinkAccountButton: "हैक खाता गाइड पर जाएं",
    crossLinkFinancialTitle: "क्या हमलावर ने पैसे भी ट्रांसफर किए या आपके खाते से पैसे कटे?",
    crossLinkFinancialBody: "यदि अनधिकृत वित्तीय लेनदेन हुआ है, तो तुरंत 1930 हेल्पलाइन और अपने बैंक को सूचित करें।",
    crossLinkFinancialButton: "वित्तीय धोखाधड़ी गाइड पर जाएं",
    dotSancharSaathi: "दूरसंचार विभाग (DoT) संचार साथी"
  },
  mr: {
    selectCategoryAria: "घटनेचा प्रकार निवडा (नेव्हिगेट करण्यासाठी बाण कळा वापरा)",
    extortionReassuranceTitle: "महत्त्वाचा आधार: ही तुमची चूक नाही.",
    extortionReassuranceBody: "गुन्हेगार भीती आणि घाई निर्माण करण्यात निष्णात असतात. स्वतःला दोष देऊ नका. दररोज हजारो नागरिक अशा धमक्यांना सामोरे जातात. मदत आणि कायदेशीर संरक्षण उपलब्ध आहे.",
    extortionCall1930: "1930 वर कॉल करा (जर पैसे आधीच पाठवले असतील)",
    extortionCall112: "112 वर कॉल करा (शारीरिक धोक्यात असल्यास)",
    extortionReportPortal: "cybercrime.gov.in वर धमक्यांची नोंद करा",
    reachBankSafelyTitle: "तुमच्या बँकेशी सुरक्षितपणे कसा संपर्क साधावा",
    reachBankSafelyBody: "तुमचे एटीएम/डेबिट कार्ड उलटा आणि मागच्या बाजूला असलेला अधिकृत कस्टमर केअर नंबर डायल करा. कार्ड सोबत नसल्यास बँकेचे अधिकृत ॲप किंवा पासबुकचे पहिले पान पाहा.",
    reachBankSafelyWarning: "इंटरनेट सर्च इंजिनवर बँकेचे कस्टमर केअर नंबर कधीही शोधू नका.",
    crossLinkAccountTitle: "तुमचा फोन, व्हॉट्सॲप किंवा पासवर्डही हॅक झाला आहे का?",
    crossLinkAccountBody: "जर गुन्हेगाराने तुमचे सोशल मीडिया, सिम किंवा ईमेल खाते ताब्यात घेतले असेल तर तातडीने संरक्षणात्मक पावले उचला.",
    crossLinkAccountButton: "हॅक खाते मार्गदर्शकाकडे जा",
    crossLinkFinancialTitle: "हल्लेखोराने पैसेही ट्रान्सफर केले किंवा खात्यातून पैसे कापले का?",
    crossLinkFinancialBody: "अनधिकृत आर्थिक व्यवहार झाले असल्यास त्वरित 1930 हेल्पलाइन आणि बँकेला कळवा.",
    crossLinkFinancialButton: "आर्थिक फसवणूक मार्गदर्शकाकडे जा",
    dotSancharSaathi: "दूरसंचार विभाग (DoT) संचार साथी"
  }
};

const localesDir = path.resolve('src/i18n/locales');
for (const lang of ['en', 'hi', 'mr'] as const) {
  const filePath = path.join(localesDir, `${lang}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  data.emergency = { ...data.emergency, ...emergencyExtAdditions[lang] };
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}
console.log('Added emergency extension keys successfully.');
