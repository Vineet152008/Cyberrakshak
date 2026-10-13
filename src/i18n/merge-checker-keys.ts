import fs from 'fs';
import path from 'path';

const checkerTranslations = {
  en: {
    checker: {
      badge: "Rule-Based Offline Analysis",
      title: "Client-Side Message Checker",
      subtitle: "Paste a suspicious SMS, WhatsApp text, or email to inspect for common deception cues before you tap, call, or reply.",
      privacyNote: "100% Client-Side Inspection: Your text is analyzed strictly inside your web browser. Nothing is sent to any server.",
      neverPasteWarningTitle: "Never Paste Sensitive Credentials",
      neverPasteWarningBody: "Never paste active bank OTPs, UPI PINs, net-banking passwords, or 16-digit debit/credit card numbers into this tool or any website.",
      inputLabel: "Paste Message Text to Inspect",
      inputPlaceholder: "Paste suspicious SMS, WhatsApp message, or email here...\nExample: 'Dear customer, your electricity will be disconnected tonight at 9:30 PM. Call officer at 98765-XXXXX to avoid disconnection.'",
      charCount: "{{count}} characters",
      clearInputButton: "Clear Text",
      sampleButtonsTitle: "Or try an authentic fictional sample:",
      sampleEn: "Electricity Bill Threat (English)",
      sampleHi: "बिजली बिल धमकी (हिन्दी)",
      sampleMr: "महावितरण वीज नोटीस (मराठी)",
      sampleHinglish: "Bijli Disconnection (Hinglish)",
      sampleSafe: "Legitimate Bank Alert (Safe)",
      analyzeButton: "Inspect Message",
      resultsTitle: "Analysis Results & Detected Cues",
      disclaimerNotice: "Guidance Notice: This rule-based check provides educational guidance, not a certified verdict of safety. Cyber fraudsters continuously modify wording, use new numbers, and evade known filters. A message with zero detected cues may still be malicious.",
      safeResultTitle: "No Common Red Flags Detected in Rules",
      safeResultDesc: "While this message does not trigger common known deception rules, always exercise caution. Never share OTPs, PINs, or install APKs requested by strangers.",
      warningResultTitle: "Potential Deception Cues Detected ({{count}})",
      warningResultDesc: "This message contains patterns frequently employed in fraudulent communications in India.",
      severityCritical: "Critical Risk Cue",
      severityHigh: "High Risk Cue",
      severityMedium: "Moderate Risk Cue",
      categoryUrgency: "Artificial Urgency & Disconnection Threat",
      categoryImpersonation: "Authority or Law Enforcement Impersonation",
      categoryLinkApk: "Unverified Link or Third-Party APK",
      categoryFinancialUpi: "UPI PIN / Lottery / Financial Trap",
      categorySecrecy: "Coercive Secrecy Demand",
      rules: {
        rule_urgency_disconnection: {
          title: "Artificial Urgency & Threat of Disconnection",
          explanation: "Legitimate utility providers do not send sudden SMS threats to cut off electricity within hours. Utility disconnections require formal legal notices with weeks of advance written warning.",
          guidance: "Do not call the mobile number in the message. Check your official electricity bill on your state power board portal or app."
        },
        rule_authority_impersonation: {
          title: "Law Enforcement / Police / Telecom Impersonation",
          explanation: "Government bodies, police, CBI, and telecom authorities never issue arrest warrants or conduct official investigations over WhatsApp, Skype, or video calls.",
          guidance: "Hang up immediately. Legitimate law enforcement will send in-person summons, never video interrogations."
        },
        rule_unverified_link_apk: {
          title: "Suspicious Link or Unverified APK File",
          explanation: "Fraudsters use shortened links or fake websites ending in unusual domains to install screen-sharing software (AnyDesk, TeamViewer) or malicious Android APKs to steal OTPs.",
          guidance: "Never tap unknown links or install APK files sent via WhatsApp or SMS. Install apps only from official app stores."
        },
        rule_upi_pin_trap: {
          title: "UPI PIN Deception / Fake Lottery / Collect Request",
          explanation: "Entering your UPI PIN ALWAYS debits money from your account. You NEVER need to enter a UPI PIN to receive money or refunds.",
          guidance: "Reject any UPI collect request. Never enter your UPI PIN unless you are actively paying for a verified purchase."
        },
        rule_secrecy_demand: {
          title: "Coercive Demand for Secrecy",
          explanation: "Demanding that you keep the call or situation secret from family, friends, or police is the hallmark of extortion and digital arrest frauds.",
          guidance: "Immediately disconnect and confide in a trusted family member or call the 112 emergency helpline if threatened."
        }
      },
      nextStepsTitle: "Recommended Next Steps",
      step1: "Do not tap any links or dial numbers provided in the message.",
      step2: "If financial fraud occurred, immediately call the National Cyber Helpline at 1930.",
      step3: "Report the suspicious sender number on the official Government of India Chakshu facility (sancharsaathi.gov.in)."
    }
  },
  hi: {
    checker: {
      badge: "नियम-आधारित ऑफलाइन विश्लेषण",
      title: "मैसेज चेकर (धोखाधड़ी पहचान)",
      subtitle: "संदेहास्पद एसएमएस, व्हाट्सएप संदेश या ईमेल को यहाँ पेस्ट करें और क्लिक करने या कॉल करने से पहले छुपे हुए लाल झंडों की जांच करें।",
      privacyNote: "100% ब्राउज़र-आधारित जांच: आपका संदेश केवल आपके वेब ब्राउज़र में जाँचा जाता है। किसी भी सर्वर पर कोई डेटा नहीं भेजा जाता।",
      neverPasteWarningTitle: "संवेदनशील बैंक विवरण कभी न डालें",
      neverPasteWarningBody: "इस टूल या किसी भी वेबसाइट पर कभी भी अपना वास्तविक बैंक ओटीपी, यूपीआई पिन, नेट-बैंकिंग पासवर्ड या 16-अंकीय कार्ड नंबर पेस्ट न करें।",
      inputLabel: "जांच के लिए संदेश यहाँ पेस्ट करें",
      inputPlaceholder: "संदेहास्पद एसएमएस, व्हाट्सएप संदेश यहाँ पेस्ट करें...\nउदाहरण: 'प्रिय ग्राहक, आपका बिजली कनेक्शन आज रात 9:30 बजे काट दिया जाएगा। तुरंत कॉल करें: 98765-XXXXX'",
      charCount: "{{count}} अक्षर",
      clearInputButton: "संदेश साफ करें",
      sampleButtonsTitle: "या वास्तविक काल्पनिक उदाहरण चुनकर देखें:",
      sampleEn: "बिजली बिल धमकी (अंग्रेजी)",
      sampleHi: "बिजली बिल धमकी (हिन्दी)",
      sampleMr: "वीज नोटीस (मराठी)",
      sampleHinglish: "बिजली डिस्कनेक्शन (हिंग्लिश)",
      sampleSafe: "अधिकृत बैंक अलर्ट (सुरक्षित)",
      analyzeButton: "संदेश की जांच करें",
      resultsTitle: "विश्लेषण परिणाम व पहचाने गए संकेत",
      disclaimerNotice: "महत्वपूर्ण मार्गदर्शन: यह जांच केवल शैक्षिक मार्गदर्शन है, पूर्ण सुरक्षा का प्रमाण पत्र नहीं। धोखेबाज निरंतर नए शब्द और तरीके बदलते रहते हैं। शून्य संकेत मिलने पर भी संदेश फर्जी हो सकता है।",
      safeResultTitle: "नियमों में कोई सामान्य लाल झंडा नहीं मिला",
      safeResultDesc: "यद्यपि इस संदेश में ज्ञात धोखाधड़ी नियम सक्रिय नहीं हुए हैं, फिर भी सतर्क रहें। किसी अजनबी के कहने पर कभी ओटीपी, पिन या एपीके साझा न करें।",
      warningResultTitle: "संभावित धोखाधड़ी के संकेत मिले ({{count}})",
      warningResultDesc: "इस संदेश में भारत में साइबर धोखाधड़ी में आमतौर पर इस्तेमाल किए जाने वाले शब्द और पैटर्न पाए गए हैं।",
      severityCritical: "गंभीर जोखिम संकेत",
      severityHigh: "उच्च जोखिम संकेत",
      severityMedium: "मध्यम जोखिम संकेत",
      categoryUrgency: "झूठी तात्कालिकता व कनेक्शन काटने की धमकी",
      categoryImpersonation: "पुलिस या सरकारी अधिकारी होने का ढोंग",
      categoryLinkApk: "अवैध लिंक या अनधिकृत एपीके फाइल",
      categoryFinancialUpi: "यूपीआई पिन जाल / लॉटरी / पैसे का प्रलोभन",
      categorySecrecy: "बात गुप्त रखने का जबरन दबाव",
      rules: {
        rule_urgency_disconnection: {
          title: "झूठी तात्कालिकता व कनेक्शन काटने की धमकी",
          explanation: "सरकारी या निजी बिजली कंपनियां कभी भी कुछ घंटों में बिजली काटने का एसएमएस नहीं भेजतीं। आधिकारिक प्रक्रिया में हफ्तों पहले लिखित सूचना दी जाती है।",
          guidance: "संदेश में दिए गए मोबाइल नंबर पर कभी कॉल न करें। अपने राज्य के बिजली बोर्ड की आधिकारिक वेबसाइट या ऐप पर बिल जांचें।"
        },
        rule_authority_impersonation: {
          title: "पुलिस, सीबीआई या दूरसंचार अधिकारी का ढोंग",
          explanation: "पुलिस, सीबीआई, न्यायालय या सरकारी एजेंसियां कभी भी व्हाट्सएप या वीडियो कॉल पर गिरफ्तारी वारंट जारी नहीं करतीं।",
          guidance: "तुरंत कॉल काट दें। वास्तविक पुलिस जांच कानूनी प्रक्रिया और प्रत्यक्ष नोटिस से होती है, वीडियो कॉल से नहीं।"
        },
        rule_unverified_link_apk: {
          title: "संदेहास्पद लिंक या अनधिकृत एपीके फाइल",
          explanation: "धोखेबाज फर्जी लिंक या एपीके फाइलों द्वारा स्क्रीन-शेयरिंग ऐप्स (AnyDesk, TeamViewer) इंस्टॉल करवाकर ओटीपी चुरा लेते हैं।",
          guidance: "व्हाट्सएप या एसएमएस पर आए किसी भी लिंक को न छुएं और अज्ञात एपीके कभी इंस्टॉल न करें।"
        },
        rule_upi_pin_trap: {
          title: "यूपीआई पिन धोखा / फर्जी लॉटरी जाल",
          explanation: "यूपीआई पिन डालने से आपके खाते से हमेशा पैसे कटते हैं। पैसे या रिफंड प्राप्त करने के लिए कभी पिन डालने की आवश्यकता नहीं होती।",
          guidance: "पैसे पाने का कोई भी यूपीआई रिक्वेस्ट तुरंत अस्वीकार करें। केवल भुगतान करते समय ही अपना पिन दर्ज करें।"
        },
        rule_secrecy_demand: {
          title: "बात छिपाने व गुप्त रखने का जबरन दबाव",
          explanation: "परिवार, दोस्तों या पुलिस से बात छिपाने का दबाव बनाना साइबर वसूली और 'डिजिटल अरेस्ट' का प्रमुख लक्षण है।",
          guidance: "तुरंत कॉल काटें, परिवार के सदस्यों को बताएं और किसी भी भय की स्थिति में हेल्पलाइन 112 या 1930 पर संपर्क करें।"
        }
      },
      nextStepsTitle: "अनुशंसित अगले कदम",
      step1: "संदेश में दिए गए किसी भी लिंक पर क्लिक न करें और न ही दिए नंबर पर कॉल करें।",
      step2: "यदि वित्तीय नुकसान हुआ हो, तो तुरंत राष्ट्रीय साइबर हेल्पलाइन 1930 पर कॉल करें।",
      step3: "संदेहास्पद मोबाइल नंबर की रिपोर्ट भारत सरकार की चक्षु (Chakshu) सुविधा पर करें (sancharsaathi.gov.in)।"
    }
  },
  mr: {
    checker: {
      badge: "नियम-आधारित ऑफलाइन तपासणी",
      title: "मेसेज चेकर (फसवणूक तपासणी)",
      subtitle: "संशयास्पद एसएमएस, व्हॉट्सॲप मेसेज किंवा ईमेल येथे पेस्ट करा आणि क्लिक करण्यापूर्वी किंवा कॉल करण्यापूर्वी फसवणुकीचे संकेत तपासा.",
      privacyNote: "100% ब्राउझर-आधारित तपासणी: तुमचा मेसेज फक्त तुमच्या वेब ब्राउझरमध्ये तपासला जातो. कोणत्याही सर्व्हरवर डेटा पाठवला जात नाही.",
      neverPasteWarningTitle: "गोपनीय बँक माहिती कधीही पेस्ट करू नका",
      neverPasteWarningBody: "या टूलमध्ये किंवा कोणत्याही वेबसाइटवर तुमचा बँक ओटीपी, यूपीआय पिन, नेट-बँकिंग पासवर्ड किंवा कार्ड नंबर कधीही टाकू नका.",
      inputLabel: "तपासणीसाठी मेसेज येथे पेस्ट करा",
      inputPlaceholder: "संशयास्पद एसएमएस किंवा व्हॉट्सॲप मेसेज येथे पेस्ट करा...\nउदा: 'प्रिय ग्राहक, तुमचे वीज बिल अपडेट न झाल्यामुळे आज रात्री 9:30 वाजता वीज खंडित केली जाईल. संपर्क: 98765-XXXXX'",
      charCount: "{{count}} अक्षरे",
      clearInputButton: "मेसेज पुसून टाका",
      sampleButtonsTitle: "किंवा अधिकृत काल्पनिक नमुना निवडून पाहा:",
      sampleEn: "वीज बिल धमकी (इंग्रजी)",
      sampleHi: "वीज बिल धमकी (हिन्दी)",
      sampleMr: "वीज बिल नोटीस (मराठी)",
      sampleHinglish: "वीज डिस्कनेक्शन (हिंग्लिश)",
      sampleSafe: "अधिकृत बँक अलर्ट (सुरक्षित)",
      analyzeButton: "मेसेज तपासा",
      resultsTitle: "तपासणी निष्कर्ष आणि आढळलेले संकेत",
      disclaimerNotice: "महत्त्वाची सूचना: ही तपासणी केवळ मार्गदर्शनासाठी आहे, पूर्ण सुरक्षिततेची हमी नाही. सायबर गुन्हेगार सातत्याने नवीन पद्धती वापरतात. शून्य संकेत आढळले तरी मेसेज धोकादायक असू शकतो.",
      safeResultTitle: "नियमांमध्ये कोणतेही सामान्य धोक्याचे संकेत आढळले नाहीत",
      safeResultDesc: "या मेसेजमध्ये ज्ञात फसवणुकीचे संकेत आढळले नसले तरी सावध राहा. अनोळखी व्यक्तीच्या सांगण्यावरून ओटीपी किंवा पिन कधीही देऊ नका.",
      warningResultTitle: "संभाव्य फसवणुकीचे संकेत आढळले ({{count}})",
      warningResultDesc: "या मेसेजमध्ये भारतात सायबर गुन्ह्यांमध्ये वारंवार वापरले जाणारे शब्द व नमुने आढळले आहेत.",
      severityCritical: "गंभीर धोक्याचा संकेत",
      severityHigh: "उच्च धोक्याचा संकेत",
      severityMedium: "मध्यम धोक्याचा संकेत",
      categoryUrgency: "खोटी घाई व वीज खंडित करण्याची धमकी",
      categoryImpersonation: "पोलीस किंवा सरकारी अधिकारी असल्याचे सोंग",
      categoryLinkApk: "संशयास्पद लिंक किंवा अनधिकृत एपीके फाइल",
      categoryFinancialUpi: "यूपीआय पिन फसवणूक / लॉटरी / पैशांचे आमिष",
      categorySecrecy: "गोपनीयतेची जबरदस्ती",
      rules: {
        rule_urgency_disconnection: {
          title: "खोटी घाई व वीज पुरवठा खंडित करण्याची धमकी",
          explanation: "महावितरण किंवा अधिकृत वीज कंपन्या कधीही काही तासांत वीज कापण्याचा एसएमएस पाठवत नाहीत. अधिकृत प्रक्रियेत आधी लेखी नोटीस दिली जाते.",
          guidance: "मेसेजमधील मोबाइल नंबरवर फोन करू नका. अधिकृत महावितरण ॲप किंवा पोर्टलवर बिल तपासा."
        },
        rule_authority_impersonation: {
          title: "पोलीस, सीबीआय किंवा दूरसंचार अधिकारी असल्याचे सोंग",
          explanation: "पोलीस, सीबीआय किंवा सरकारी यंत्रणा कधीही व्हॉट्सॲप किंवा व्हिडिओ कॉलवर अटक वॉरंट देत नाहीत.",
          guidance: "त्वरित कॉल बंद करा. खरी पोलीस कारवाई कायदेशीर प्रक्रियेने आणि प्रत्यक्ष होते, व्हिडिओ कॉलवर नाही."
        },
        rule_unverified_link_apk: {
          title: "संशयास्पद लिंक किंवा अनधिकृत एपीके फाइल",
          explanation: "गुन्हेगार बनावट लिंक्स आणि एपीके फाइल्सद्वारे स्क्रीन-शेअरिंग ॲप्स (AnyDesk, TeamViewer) इन्स्टॉल करवून ओटीपी चोरतात.",
          guidance: "व्हॉट्सॲप किंवा एसएमएसवरील कोणत्याही लिंकवर क्लिक करू नका आणि अनोळखी एपीके कधीही इन्स्टॉल करू नका."
        },
        rule_upi_pin_trap: {
          title: "यूपीआय पिन फसवणूक / बनावट लॉटरी आमिष",
          explanation: "यूपीआय पिन टाकल्याने तुमच्या खात्यातून नेहमी पैसे कापले जातात. पैसे मिळवण्यासाठी कधीही पिन टाकण्याची गरज नसते.",
          guidance: "पैसे मिळवण्याची कोणतीही यूपीआय विनंती नाकारा. फक्त स्वतः पैसे पाठवतानाच पिन टाका."
        },
        rule_secrecy_demand: {
          title: "गोपनीयतेची सक्ती व कुटुंबीयांपासून लपवण्याचा दबाव",
          explanation: "कुटुंबाला किंवा पोलिसांना न सांगण्याची सक्ती करणे हे सायबर खंडणी आणि 'डिजिटल अरेस्ट'चे ठळक लक्षण आहे.",
          guidance: "त्वरित संपर्क तोडा, कुटुंबीयांना सांगा आणि भीती वाटल्यास 112 किंवा 1930 हेल्पलाइनवर संपर्क साधा."
        }
      },
      nextStepsTitle: "पुढील उपाययोजना",
      step1: "मेसेजमधील कोणत्याही लिंकवर क्लिक करू नका किंवा दिलेल्या नंबरवर कॉल करू नका.",
      step2: "आर्थिक फसवणूक झाली असल्यास तत्काळ राष्ट्रीय सायबर हेल्पलाइन 1930 वर कॉल करा.",
      step3: "संशयास्पद नंबरची नोंद भारत सरकारच्या चक्षु (Chakshu) सुविधेवर करा (sancharsaathi.gov.in)."
    }
  }
};

// Also add common missing strings for Home, Emergency, and Nav to prevent ESLint literal errors
const commonAdditions = {
  en: {
    nav: {
      langLabel: "Language / भाषा:"
    },
    emergency: {
      chakshuHeading: "Report Suspicious Calls & SMS on Chakshu",
      chakshuDesc: "You can report fraudulent phone numbers, spoofed SMS headers, or suspicious WhatsApp accounts on the official Government of India Chakshu facility (sancharsaathi.gov.in) to help authorities investigate.",
      privateLocalNote: "100% Private (Saved only on this device)",
      whereToFindLabel: "Where to find:",
      whyItMattersLabel: "Why it matters:",
      evidenceNotesLabel: "Notes for speaking with the 1930 operator (Saved only in this browser)",
      notesPlaceholder: "Type reference numbers or phone numbers here to keep them in front of you while speaking with the operator...",
      neverTypeSensitiveNote: "Never type sensitive PINs, OTPs, or passwords here."
    },
    home: {
      guaranteeNoLogin: "Zero login or real banking data required",
      guaranteeInBrowser: "Analysis runs entirely inside your browser",
      flagshipBadge: "Interactive Safety Instruments",
      flagshipTitle: "Learn by Experiencing, Not Just Reading",
      flagshipSubtitle: "Three focused instruments engineered to build instinctive scam recognition and emergency response readiness.",
      radarTip: "Tip: Click or tap any threat node above to view safety guidance.",
      radarMonitored: "8 Categories Monitored",
      radarScamGuide: "Scam Guide",
      radarBreakdownTitle: "Scam Breakdown & Safety Guide",
      radarFictionalExample: "Fictional Example ({{channel}})",
      radarFromPrefix: "From: {{sender}}",
      emergencyBannerDebited: "Suspect fraud or money debited from your account?",
      emergencyBannerPrompt: "Acting promptly gives banks the best opportunity to coordinate.",
      emergencyBannerCall: "Call 1930 (Toll-Free, 24x7)",
      emergencyBannerPortal: "cybercrime.gov.in",
      emergencyBannerNewTab: "(opens in new tab)",
      emergencyBannerStepByStep: "Step-by-step guidance →",
      footerTagline: "Empowering Indian citizens, families, and seniors to recognize cyber deception safely through hands-on educational simulations.",
      footerZeroBanking: "100% Client-Side. No personal banking credentials collected.",
      footerPortalsHeading: "Verified Government & Regulatory Portals",
      footerHelplinesHeading: "Emergency Helplines",
      footerNationalCyber: "National Cyber Helpline:",
      footerNationalEmergency: "National Emergency:",
      footerRbiOmbudsman: "RBI Ombudsman:",
      footerCopyright: "© {{year}} CyberRakshak Public Awareness Initiative. MIT Licensed educational resource.",
      footerZeroTracking: "Built with zero tracking",
      footerWcag: "WCAG 2.1 AA Compliant",
      atlasBadge: "Common Scam Types",
      atlasTitle: "8 Most Common Cyber-Frauds in India",
      atlasSubtitle: "Fictional simulations based on typical calls received at the 1930 National Cyber Helpline.",
      atlasPracticeCta: "Practice in Scam Lab",
      atlasHowItWorks: "How it works",
      atlasViewGuide: "View Guide →",
      reassuranceBadge: "Victim Reassurance",
      reassuranceTitle: "Fell for a scam? You are not to blame.",
      reassuranceText: "Cyber criminals manipulate psychology, urgency, and fear. Acting quickly can help banks freeze the accounts before stolen funds are withdrawn.",
      reassuranceCall1930: "Call 1930 Toll Free Now",
      reassuranceWhatToDo: "What to do right now (Step-by-Step)",
      returnToHome: "← Return to Home"
    },
    scamLabMeta: {
      simulatorPromptSubtitle: "Select what you would do. Your choice will reveal the real-world consequence.",
      quizNextQuestion: "Next Question"
    }
  },
  hi: {
    nav: {
      langLabel: "भाषा / Language:"
    },
    emergency: {
      chakshuHeading: "चक्षु (Chakshu) पर फर्जी कॉल व एसएमएस की रिपोर्ट करें",
      chakshuDesc: "आप संदिग्ध फोन नंबर, फर्जी एसएमएस सेंडर या व्हाट्सएप अकाउंट की रिपोर्ट भारत सरकार के आधिकारिक चक्षु पोर्टल (sancharsaathi.gov.in) पर कर सकते हैं।",
      privateLocalNote: "100% निजी (केवल इस डिवाइस पर सुरक्षित)",
      whereToFindLabel: "कहाँ मिलेगा:",
      whyItMattersLabel: "यह क्यों महत्वपूर्ण है:",
      evidenceNotesLabel: "1930 ऑपरेटर से बात करने के लिए त्वरित नोट्स (केवल आपके ब्राउज़र में)",
      notesPlaceholder: "ऑपरेटर से बात करते समय सामने रखने के लिए संदर्भ संख्या या फोन नंबर यहाँ लिखें...",
      neverTypeSensitiveNote: "यहाँ कभी भी संवेदनशील पिन, ओटीपी या पासवर्ड न लिखें।"
    },
    home: {
      guaranteeNoLogin: "शून्य लॉगिन या वास्तविक बैंकिंग डेटा आवश्यक",
      guaranteeInBrowser: "विश्लेषण पूरी तरह से आपके ब्राउज़र में चलता है",
      flagshipBadge: "इंटरैक्टिव सुरक्षा उपकरण",
      flagshipTitle: "पढ़ने के साथ-साथ अनुभव करके सीखें",
      flagshipSubtitle: "नागरिकों में सतर्कता और त्वरित आपातकालीन प्रतिक्रिया विकसित करने के लिए तीन केंद्रित साधन।",
      radarTip: "सुझाव: सुरक्षा मार्गदर्शन देखने के लिए ऊपर किसी भी खतरे के नोड पर क्लिक करें।",
      radarMonitored: "8 श्रेणियों की निगरानी",
      radarScamGuide: "धोखाधड़ी गाइड",
      radarBreakdownTitle: "धोखाधड़ी विश्लेषण व सुरक्षा गाइड",
      radarFictionalExample: "काल्पनिक उदाहरण ({{channel}})",
      radarFromPrefix: "प्रेषक: {{sender}}",
      emergencyBannerDebited: "धोखाधड़ी या खाते से पैसे कटने की आशंका है?",
      emergencyBannerPrompt: "तुरंत कदम उठाने से बैंकों को खातों को रोकने का सबसे अच्छा अवसर मिलता है।",
      emergencyBannerCall: "1930 पर कॉल करें (टोल-फ्री, 24x7)",
      emergencyBannerPortal: "cybercrime.gov.in",
      emergencyBannerNewTab: "(नई टैब में खुलता है)",
      emergencyBannerStepByStep: "कदम-दर-कदम मार्गदर्शन →",
      footerTagline: "भारतीय नागरिकों, परिवारों और बुजुर्गों को व्यावहारिक सिमुलेशन के माध्यम से साइबर धोखे से सुरक्षित रहने में सक्षम बनाना।",
      footerZeroBanking: "100% क्लाइंट-साइड। कोई व्यक्तिगत बैंकिंग क्रेडेंशियल एकत्र नहीं किए जाते।",
      footerPortalsHeading: "सत्यापित सरकारी व नियामक पोर्टल",
      footerHelplinesHeading: "आपातकालीन हेल्पलाइन",
      footerNationalCyber: "राष्ट्रीय साइबर हेल्पलाइन:",
      footerNationalEmergency: "राष्ट्रीय आपातकाल:",
      footerRbiOmbudsman: "आरबीआई लोकपाल:",
      footerCopyright: "© {{year}} साइबर रक्षक नागरिक जागरूकता पहल। शैक्षणिक संसाधन।",
      footerZeroTracking: "शून्य ट्रैकिंग के साथ निर्मित",
      footerWcag: "WCAG 2.1 AA अनुरूप",
      atlasBadge: "सामान्य धोखाधड़ी के प्रकार",
      atlasTitle: "भारत में 8 सबसे आम साइबर धोखाधड़ी",
      atlasSubtitle: "1930 राष्ट्रीय साइबर हेल्पलाइन पर दर्ज सामान्य मामलों पर आधारित काल्पनिक सिमुलेशन।",
      atlasPracticeCta: "स्कैम लैब में अभ्यास करें",
      atlasHowItWorks: "यह कैसे काम करता है",
      atlasViewGuide: "गाइड देखें →",
      reassuranceBadge: "पीड़ित संबल",
      reassuranceTitle: "धोखाधड़ी के शिकार हुए? आप दोषी नहीं हैं।",
      reassuranceText: "साइबर अपराधी मनोविज्ञान, जल्दबाजी और भय का दुरुपयोग करते हैं। तुरंत कार्रवाई करने से बैंक पैसे रुकवाने में मदद कर सकते हैं।",
      reassuranceCall1930: "1930 टोल-फ्री पर तुरंत कॉल करें",
      reassuranceWhatToDo: "अभी क्या करें (कदम-दर-कदम)",
      returnToHome: "← होम पर वापस जाएं"
    },
    scamLabMeta: {
      simulatorPromptSubtitle: "आप क्या करेंगे चुनें। आपकी पसंद वास्तविक परिणाम दिखाएगी।",
      quizNextQuestion: "अगला प्रश्न"
    }
  },
  mr: {
    nav: {
      langLabel: "भाषा / Language:"
    },
    emergency: {
      chakshuHeading: "चक्षु (Chakshu) वर संशयास्पद कॉल्स व एसएमएस नोंदवा",
      chakshuDesc: "तुम्ही संशयास्पद फोन नंबर, बनावट एसएमएस किंवा व्हॉट्सॲप खात्यांची नोंद भारत सरकारच्या अधिकृत चक्षु पोर्टलवर (sancharsaathi.gov.in) करू शकता.",
      privateLocalNote: "100% खाजगी (फक्त या डिव्हाइसवर जतन)",
      whereToFindLabel: "कुठे शोधायचे:",
      whyItMattersLabel: "हे का महत्त्वाचे आहे:",
      evidenceNotesLabel: "1930 ऑपरेटरशी बोलण्यासाठी महत्त्वाच्या नोंदी (फक्त तुमच्या ब्राउझरमध्ये)",
      notesPlaceholder: "ऑपरेटरशी बोलताना समोर ठेवण्यासाठी संदर्भ क्रमांक किंवा फोन नंबर येथे लिहा...",
      neverTypeSensitiveNote: "येथे कधीही संवेदनशील पिन, ओटीपी किंवा पासवर्ड लिहू नका."
    },
    home: {
      guaranteeNoLogin: "शून्य लॉगिन किंवा खरी बँक माहिती आवश्यक नाही",
      guaranteeInBrowser: "तपासणी पूर्णपणे तुमच्या ब्राउझरमध्ये होते",
      flagshipBadge: "परस्परसंवादी सुरक्षा साधने",
      flagshipTitle: "केवळ वाचून नाही, प्रत्यक्ष अनुभवून शिका",
      flagshipSubtitle: "नागरिकांमध्ये फसवणूक ओळखण्याची क्षमता आणि आपत्कालीन तयारी निर्माण करण्यासाठी तीन साधने.",
      radarTip: "टीप: सुरक्षा मार्गदर्शन पाहण्यासाठी वरील कोणत्याही घटकावर क्लिक करा.",
      radarMonitored: "8 श्रेणींचे निरीक्षण",
      radarScamGuide: "फसवणूक मार्गदर्शक",
      radarBreakdownTitle: "फसवणूक विश्लेषण आणि सुरक्षा मार्गदर्शक",
      radarFictionalExample: "काल्पनिक उदाहरण ({{channel}})",
      radarFromPrefix: "प्रेषक: {{sender}}",
      emergencyBannerDebited: "फसवणूक किंवा खात्यातून पैसे कापले गेल्याची शंका आहे?",
      emergencyBannerPrompt: "त्वरित हालचाल केल्याने बँकांना खाती रोखण्याची उत्तम संधी मिळते.",
      emergencyBannerCall: "1930 वर कॉल करा (टोल-फ्री, 24x7)",
      emergencyBannerPortal: "cybercrime.gov.in",
      emergencyBannerNewTab: "(नवीन टॅबमध्ये उघडते)",
      emergencyBannerStepByStep: "पाऊल-दर-पाऊल मार्गदर्शन →",
      footerTagline: "भारतीय नागरिक, कुटुंबे आणि ज्येष्ठ नागरिकांना शैक्षणिक सिमुलेशनद्वारे सायबर फसवणुकीपासून सुरक्षित करणे.",
      footerZeroBanking: "100% क्लायंट-साइड. कोणतीही वैयक्तिक बँक माहिती संकलित केली जात नाही.",
      footerPortalsHeading: "अधिकृत सरकारी आणि नियामक पोर्टल्स",
      footerHelplinesHeading: "आपत्कालीन हेल्पलाइन",
      footerNationalCyber: "राष्ट्रीय सायबर हेल्पलाइन:",
      footerNationalEmergency: "राष्ट्रीय आपत्कालीन:",
      footerRbiOmbudsman: "आरबीआय लोकपाल:",
      footerCopyright: "© {{year}} सायबर रक्षक सार्वजनिक जनजागृती उपक्रम. शैक्षणिक साधन.",
      footerZeroTracking: "शून्य ट्रॅकिंगसह तयार केलेले",
      footerWcag: "WCAG 2.1 AA सुसंगत",
      atlasBadge: "सामान्य फसवणुकीचे प्रकार",
      atlasTitle: "भारतातील 8 सर्वात सामान्य सायबर फसवणुकीचे प्रकार",
      atlasSubtitle: "1930 राष्ट्रीय सायबर हेल्पलाइनवरील सामान्य तक्रारींवर आधारित काल्पनिक सिमुलेशन.",
      atlasPracticeCta: "स्कॅम लॅबमध्ये सराव करा",
      atlasHowItWorks: "हे कसे काम करते",
      atlasViewGuide: "मार्गदर्शक पाहा →",
      reassuranceBadge: "आधार व मार्गदर्शन",
      reassuranceTitle: "फसवणूक झाली? तुम्ही दोषी नाही.",
      reassuranceText: "सायबर गुन्हेगार भीती आणि घाईचा गैरफायदा घेतात. वेळेत पावले उचलल्यास बँकांना पैसे रोखण्यात मदत होऊ शकते.",
      reassuranceCall1930: "1930 टोल-फ्री वर त्वरित कॉल करा",
      reassuranceWhatToDo: "आता काय करावे (पाऊल-दर-पाऊल)",
      returnToHome: "← होमवर परत जा"
    },
    scamLabMeta: {
      simulatorPromptSubtitle: "तुम्ही काय कराल ते निवडा. तुमची निवड वास्तविक परिणाम दाखवेल.",
      quizNextQuestion: "पुढील प्रश्न"
    }
  }
};

const localesDir = path.resolve('src/i18n/locales');

for (const lang of ['en', 'hi', 'mr'] as const) {
  const filePath = path.join(localesDir, `${lang}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  // Merge checker
  data.checker = checkerTranslations[lang].checker;

  // Merge common additions
  const additions = commonAdditions[lang];
  for (const [topKey, subObj] of Object.entries(additions)) {
    data[topKey] = { ...data[topKey], ...subObj };
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

console.log('Successfully updated en.json, hi.json, and mr.json with checker & common keys.');
