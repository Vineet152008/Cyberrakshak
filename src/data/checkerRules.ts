/**
 * Pure Rule Definitions and Analysis Engine for Client-Side Message Checker (Step 5)
 *
 * SPECIFICATION RULES:
 * 1. Per-language patterns for English (en), Hindi (hi), Marathi (mr), and Hinglish (hi-Latn).
 * 2. Input text MUST undergo Unicode NFC normalization prior to pattern matching.
 * 3. NO reliance on `\b` word boundary for Devanagari:
 *    Devanagari characters (U+0900–U+097F) are treated as \W by standard JS \b,
 *    causing \b to fail or split matras/viramas. We use non-Devanagari character boundaries:
 *    boundary = (?:^|[^\\p{L}\\p{M}\\p{N}]) ... (?:$|[^\\p{L}\\p{M}\\p{N}]) with /u flag,
 *    or punctuation/whitespace delimiter sets.
 * 4. Results explicitly state: "guidance, not a verdict of safety".
 * 5. 100% Client-Side.
 */

export type CheckerSeverity = 'critical' | 'high' | 'medium';

export type CheckerCategory =
  | 'urgency'
  | 'impersonation'
  | 'link_apk'
  | 'financial_upi'
  | 'secrecy';

export interface CheckerRuleDefinition {
  id: string;
  category: CheckerCategory;
  severity: CheckerSeverity;
  // Patterns per language
  patterns: {
    en: RegExp[];
    hi: RegExp[];
    mr: RegExp[];
    hinglish: RegExp[];
  };
}

export interface MatchedCue {
  ruleId: string;
  category: CheckerCategory;
  severity: CheckerSeverity;
  matchedText: string;
  startIndex: number;
  endIndex: number;
}

export interface CheckerAnalysisResult {
  hasMatches: boolean;
  overallSeverity: CheckerSeverity | 'none';
  matchedCues: MatchedCue[];
  totalMatches: number;
  highlightedSegments: Array<{ text: string; isFlagged: boolean; ruleId?: string }>;
}

export const CHECKER_RULES: CheckerRuleDefinition[] = [
  {
    id: 'rule_urgency_disconnection',
    category: 'urgency',
    severity: 'high',
    patterns: {
      en: [
        /\b(?:electricity|power|bijli|bill|connection)\s+(?:will\s+be\s+)?(?:cut|disconnect(?:ed)?)\b/i,
        /\b(?:cut|disconnect(?:ed)?)\s+tonight\b/i,
        /\bwithin\s+(?:24|12|2|1)\s*hours?\b/i,
        /\b(?:immediate(?:ly)?|urgent)\s+(?:action|verification|payment|notice)\b/i,
        /\baccount\s+(?:will\s+be\s+)?(?:blocked|suspended|terminated)\s+(?:today|tonight)\b/i,
      ],
      // Devanagari Hindi (NO \b: using whitespace/punctuation/start-end boundaries with Unicode \p)
      hi: [
        /(?:^|[^\p{L}\p{M}])(बिजली\s*(?:कट|काट|कटेगी|कनेक्शन\s*काट|गुल))(?:$|[^\p{L}\p{M}])/iu,
        /(?:^|[^\p{L}\p{M}])(कनेक्शन\s*(?:काट|कट|बंद))(?:$|[^\p{L}\p{M}])/iu,
        /(?:^|[^\p{L}\p{M}])(आज\s*रात\s*(?:\d{1,2}[:.]\d{2})?\s*(?:बजे)?\s*(?:काट|कट|बंद))(?:$|[^\p{L}\p{M}])/iu,
        /(?:^|[^\p{L}\p{M}])(अति\s*आवश्यक(?:\s*सूचना)?)(?:$|[^\p{L}\p{M}])/iu,
        /(?:^|[^\p{L}\p{M}])((?:खाता|खाते)\s*(?:बंद|ब्लॉक|निलंबित))(?:$|[^\p{L}\p{M}])/iu,
        /(?:^|[^\p{L}\p{M}])(तुरंत\s*(?:कॉल|संपर्क|भुगतान))(?:$|[^\p{L}\p{M}])/iu,
      ],
      // Devanagari Marathi (NO \b)
      mr: [
        /(?:^|[^\p{L}\p{M}])(वीज\s*(?:पुरवठा\s*)?(?:खंडित|कापली|बंद|तोडला))(?:$|[^\p{L}\p{M}])/iu,
        /(?:^|[^\p{L}\p{M}])(कनेक्शन\s*(?:तोडले|बंद|कापले))(?:$|[^\p{L}\p{M}])/iu,
        /(?:^|[^\p{L}\p{M}])(आज\s*रात्री\s*(?:\d{1,2}[:.]\d{2})?\s*(?:वाजता)?\s*(?:खंडित|कापली))(?:$|[^\p{L}\p{M}])/iu,
        /(?:^|[^\p{L}\p{M}])(अति\s*महत्त्वाचे|तातडीने)(?:$|[^\p{L}\p{M}])/iu,
        /(?:^|[^\p{L}\p{M}])((?:खाते|अकाउंट)\s*(?:बंद|ब्लॉक|निलंबित))(?:$|[^\p{L}\p{M}])/iu,
        /(?:^|[^\p{L}\p{M}])(तातडीने\s*(?:संपर्क|कॉल|पैसे))(?:$|[^\p{L}\p{M}])/iu,
      ],
      // Hinglish (Latin representation of Hindi/Marathi phrases)
      hinglish: [
        /\b(?:bijli|electricity)\s+(?:cut|disconnect|kat\s+jayegi)\b/i,
        /\baaj\s+raat\s+(?:\d{1,2}[:.]\d{2})?\s*(?:baje)?\s*(?:cut|disconnect)\b/i,
        /\b(?:connection|line)\s+(?:cut|disconnect|kat|band)\b/i,
        /\bturant\s+(?:call|sampark|contact|update|karein?)\b/i,
        /\baccount\s+(?:block|band)\s+ho\s+(?:jayega|gaya)\b/i,
        /\bprevious\s+month\s+bill\s+update\s+nahi\s+hua\b/i,
      ],
    },
  },
  {
    id: 'rule_authority_impersonation',
    category: 'impersonation',
    severity: 'critical',
    patterns: {
      en: [
        /\bdigital\s+arrest\b/i,
        /\barrest\s+warrant\b/i,
        /\b(?:cbi|crime\s+branch|narcotics|customs|telecom\s+department)\s+(?:investigation|notice|officer)\b/i,
        /\billegal\s+(?:sim\s+cards?|parcel|consignment|drugs)\b/i,
        /\bmoney\s+laundering\s+(?:case|charges?)\b/i,
        /\bvideo\s+(?:call|interrogation|verification)\s+(?:required|mandatory)\b/i,
      ],
      hi: [
        /(?:^|[^\p{L}\p{M}])(डिजिटल\s*अरेस्ट)(?:$|[^\p{L}\p{M}])/iu,
        /(?:^|[^\p{L}\p{M}])(गिरफ्तारी\s*वारंट)(?:$|[^\p{L}\p{M}])/iu,
        /(?:^|[^\p{L}\p{M}])((?:सीबीआई|क्राइम\s*ब्रांच|नार्कोटिक्स|कस्टम्स|दूरसंचार\s*विभाग))(?:$|[^\p{L}\p{M}])/iu,
        /(?:^|[^\p{L}\p{M}])(अवैध\s*(?:सिम|पार्सल|ड्रग्स|दवाएं))(?:$|[^\p{L}\p{M}])/iu,
        /(?:^|[^\p{L}\p{M}])(मनी\s*लॉन्ड्रिंग)(?:$|[^\p{L}\p{M}])/iu,
        /(?:^|[^\p{L}\p{M}])(वीडियो\s*कॉल\s*(?:पूछताछ|जांच|सत्यापन))(?:$|[^\p{L}\p{M}])/iu,
      ],
      mr: [
        /(?:^|[^\p{L}\p{M}])(डिजिटल\s*अरेस्ट)(?:$|[^\p{L}\p{M}])/iu,
        /(?:^|[^\p{L}\p{M}])(अटक\s*वॉरंट)(?:$|[^\p{L}\p{M}])/iu,
        /(?:^|[^\p{L}\p{M}])((?:सीबीआय|गुन्हे\s*शाखा|नार्कोटिक्स|कस्टम्स|दूरसंचार\s*विभाग))(?:$|[^\p{L}\p{M}])/iu,
        /(?:^|[^\p{L}\p{M}])(बेकायदेशीर\s*(?:सिम|पार्सल|औषधे))(?:$|[^\p{L}\p{M}])/iu,
        /(?:^|[^\p{L}\p{M}])(मनी\s*लाँड्रिंग)(?:$|[^\p{L}\p{M}])/iu,
        /(?:^|[^\p{L}\p{M}])(व्हिडिओ\s*कॉल\s*(?:चौकशी|तपास))(?:$|[^\p{L}\p{M}])/iu,
      ],
      hinglish: [
        /\bdigital\s+arrest\b/i,
        /\barrest\s+warrant\b/i,
        /\b(?:police|cbi|customs|telecom)\s+(?:warrant|notice|case)\b/i,
        /\billegal\s+sim\s+(?:mila|nikla|linked)\b/i,
        /\bparcel\s+(?:seized|me\s+drugs)\b/i,
        /\bmoney\s+laundering\b/i,
        /\bvideo\s+call\s+pe\s+(?:stay|aao|judna)\b/i,
      ],
    },
  },
  {
    id: 'rule_unverified_link_apk',
    category: 'link_apk',
    severity: 'critical',
    patterns: {
      en: [
        /\b(?:download|install)\s+(?:the\s+)?(?:apk|app|file)\b/i,
        /\b(?:anydesk|teamviewer|rustdesk|quicksupport)\b/i,
        /https?:\/\/[^\s]+(?:\.apk|\.top|\.xyz|\.club|\.vip|\.live|\.su|\.ru|\.fictional)\b/i,
        /\b(?:bit\.ly|tinyurl\.com|is\.gd|t\.co|cutt\.ly|rb\.gy)\/[^\s]+/i,
        /\bclick\s+(?:here|on\s+link)\s+to\s+(?:update|verify|avoid|claim)\b/i,
      ],
      hi: [
        /(?:^|[^\p{L}\p{M}])(एपीके\s*(?:डाउनलोड|फाइल))(?:$|[^\p{L}\p{M}])/iu,
        /(?:^|[^\p{L}\p{M}])(ऐप\s*(?:डाउनलोड|इंस्टॉल|इन्स्टॉल))(?:$|[^\p{L}\p{M}])/iu,
        /(?:^|[^\p{L}\p{M}])(लिंक\s*पर\s*(?:क्लिक|टैप))(?:$|[^\p{L}\p{M}])/iu,
        /(?:^|[^\p{L}\p{M}])(एनीडेस्क|टीमव्यूअर|रस्टडेस्क)(?:$|[^\p{L}\p{M}])/iu,
      ],
      mr: [
        /(?:^|[^\p{L}\p{M}])(एपीके\s*(?:डाउनलोड|फाइल))(?:$|[^\p{L}\p{M}])/iu,
        /(?:^|[^\p{L}\p{M}])(ॲप\s*(?:डाउनलोड|इन्स्टॉल))(?:$|[^\p{L}\p{M}])/iu,
        /(?:^|[^\p{L}\p{M}])(लिंकवर\s*(?:क्लिक|टॅप))(?:$|[^\p{L}\p{M}])/iu,
        /(?:^|[^\p{L}\p{M}])(एनीडेस्क|टीमव्ह्यूअर)(?:$|[^\p{L}\p{M}])/iu,
      ],
      hinglish: [
        /\b(?:apk|app)\s+download\s+(?:karein?|karo)\b/i,
        /\blink\s+pe\s+(?:click|tap)\s+karein?\b/i,
        /\b(?:anydesk|teamviewer|rustdesk)\s+install\s+karein?\b/i,
        /\bapp\s+install\s+karke\s+bill\s+update\b/i,
      ],
    },
  },
  {
    id: 'rule_upi_pin_trap',
    category: 'financial_upi',
    severity: 'critical',
    patterns: {
      en: [
        /\benter\s+(?:upi\s+)?pin\s+to\s+receive\b/i,
        /\baccept\s+(?:collect\s+request|payment)\s+to\s+receive\b/i,
        /\b(?:part[- ]time\s+job|work\s+from\s+home)\s+(?:₹|rs\.?)\s*\d+/i,
        /\b(?:daily|guaranteed)\s+returns?\s+(?:₹|rs\.?|%)\b/i,
        /\b(?:lottery|lucky\s+draw|cashback)\s+winner\b/i,
        /\bdeposit\s+(?:₹|rs\.?)\s*\d+\s+to\s+release\b/i,
      ],
      hi: [
        /(?:^|[^\p{L}\p{M}])(पैसे\s*पाने\s*के\s*लिए\s*(?:यूपीआई\s*)?पिन)(?:$|[^\p{L}\p{M}])/iu,
        /(?:^|[^\p{L}\p{M}])(रिफंड\s*पाने\s*के\s*लिए\s*पिन)(?:$|[^\p{L}\p{M}])/iu,
        /(?:^|[^\p{L}\p{M}])(लॉटरी\s*(?:जीत|विजेता|इनाम))(?:$|[^\p{L}\p{M}])/iu,
        /(?:^|[^\p{L}\p{M}])(पार्ट\s*टाइम\s*जॉब|घर\s*बैठे\s*कमाई)(?:$|[^\p{L}\p{M}])/iu,
        /(?:^|[^\p{L}\p{M}])(रोजाना\s*कमाई\s*(?:₹|रु\.?)?\s*\d+)(?:$|[^\p{L}\p{M}])/iu,
      ],
      mr: [
        /(?:^|[^\p{L}\p{M}])(पैसे\s*मिळवण्यासाठी\s*(?:यूपीआय\s*)?पिन)(?:$|[^\p{L}\p{M}])/iu,
        /(?:^|[^\p{L}\p{M}])(परतावा\s*मिळवण्यासाठी\s*पिन)(?:$|[^\p{L}\p{M}])/iu,
        /(?:^|[^\p{L}\p{M}])(लॉटरी\s*(?:लागली|विजेता|बक्षीस))(?:$|[^\p{L}\p{M}])/iu,
        /(?:^|[^\p{L}\p{M}])(पार्ट\s*टाईम\s*जॉब|घरी\s*बसून\s*कमाई)(?:$|[^\p{L}\p{M}])/iu,
        /(?:^|[^\p{L}\p{M}])(दररोज\s*कमाई\s*(?:₹|रु\.?)?\s*\d+)(?:$|[^\p{L}\p{M}])/iu,
      ],
      hinglish: [
        /\bupi\s+pin\s+(?:daalein?|enter\s+karein?)\s+paise\s+receive\b/i,
        /\bpin\s+daaloge\s+to\s+paise\s+(?:aayenge|milenge)\b/i,
        /\bpart\s*time\s*job\s+(?:₹|rs\.?)\s*\d+/i,
        /\bdaily\s+(?:earning|income)\s+(?:₹|rs\.?)\s*\d+/i,
        /\blottery\s+(?:lagi|jeeti|winner)\b/i,
        /\btask\s+complete\s+karke\s+paise\b/i,
      ],
    },
  },
  {
    id: 'rule_secrecy_demand',
    category: 'secrecy',
    severity: 'high',
    patterns: {
      en: [
        /\bdo\s+not\s+(?:tell|inform|share\s+with)\s+(?:anyone|family|police|lawyer)\b/i,
        /\bkeep\s+(?:this\s+)?(?:strictly\s+)?confidential\b/i,
        /\bmaintain\s+(?:strict\s+)?secrecy\b/i,
        /\bstay\s+on\s+(?:skype|video\s+call)\s+continuously\b/i,
        /\bdo\s+not\s+disconnect\s+(?:the\s+call)?\b/i,
      ],
      hi: [
        /(?:^|[^\p{L}\p{M}])(किसी\s*को\s*(?:मत\s*बताना|न\s*बताएं|नहीं\s*बताना))(?:$|[^\p{L}\p{M}])/iu,
        /(?:^|[^\p{L}\p{M}])(परिवार\s*या\s*पुलिस\s*से\s*(?:मत\s*कहना|छिपाकर))(?:$|[^\p{L}\p{M}])/iu,
        /(?:^|[^\p{L}\p{M}])(गोपनीय\s*रखें|सीक्रेट\s*रखें)(?:$|[^\p{L}\p{M}])/iu,
        /(?:^|[^\p{L}\p{M}])(वीडियो\s*कॉल\s*(?:काटना\s*मत|बंद\s*मत\s*करना))(?:$|[^\p{L}\p{M}])/iu,
      ],
      mr: [
        /(?:^|[^\p{L}\p{M}])(कोणालाही\s*(?:सांगू\s*नका|बोलू\s*नका))(?:$|[^\p{L}\p{M}])/iu,
        /(?:^|[^\p{L}\p{M}])(कुटुंबाला\s*किंवा\s*पोलिसांना\s*सांगू\s*नका)(?:$|[^\p{L}\p{M}])/iu,
        /(?:^|[^\p{L}\p{M}])(गोपनीय\s*ठेवा)(?:$|[^\p{L}\p{M}])/iu,
        /(?:^|[^\p{L}\p{M}])(व्हिडिओ\s*कॉल\s*(?:बंद\s*करू\s*नका|कट\s*करू\s*नका))(?:$|[^\p{L}\p{M}])/iu,
      ],
      hinglish: [
        /\bkisi\s+ko\s+mat\s+batana\b/i,
        /\bfamily\s+ya\s+police\s+ko\s+mat\s+bolna\b/i,
        /\bsecret\s+rakhna\b/i,
        /\bcall\s+disconnect\s+mat\s+karna\b/i,
      ],
    },
  },
];

/**
 * Normalizes input text using Unicode NFC form and analyzes it across all language rules.
 */
export function analyzeMessageText(rawText: string): CheckerAnalysisResult {
  if (!rawText || !rawText.trim()) {
    return {
      hasMatches: false,
      overallSeverity: 'none',
      matchedCues: [],
      totalMatches: 0,
      highlightedSegments: [],
    };
  }

  // CRITICAL REQUIREMENT: Unicode NFC Normalization
  const normalizedText = rawText.normalize('NFC');

  const matches: MatchedCue[] = [];

  for (const rule of CHECKER_RULES) {
    const allRegexes = [
      ...rule.patterns.en,
      ...rule.patterns.hi,
      ...rule.patterns.mr,
      ...rule.patterns.hinglish,
    ];

    for (const regex of allRegexes) {
      // Global matcher loop
      const flags = regex.flags.includes('g') ? regex.flags : `${regex.flags}g`;
      const searchRegex = new RegExp(regex.source, flags);

      let match: RegExpExecArray | null;
      while ((match = searchRegex.exec(normalizedText)) !== null) {
        // If pattern had a capture group for inner word (Devanagari lookaround replacement), use it
        const targetString = match[1] || match[0];
        const startIndex = match[1] ? match.index + match[0].indexOf(match[1]) : match.index;
        const endIndex = startIndex + targetString.length;

        // Deduplicate overlapping matches for this rule
        const alreadyFound = matches.some(
          (m) => m.ruleId === rule.id && Math.abs(m.startIndex - startIndex) < 3
        );

        if (!alreadyFound && targetString.trim()) {
          matches.push({
            ruleId: rule.id,
            category: rule.category,
            severity: rule.severity,
            matchedText: targetString.trim(),
            startIndex,
            endIndex,
          });
        }
      }
    }
  }

  // Sort matches by startIndex
  matches.sort((a, b) => a.startIndex - b.startIndex);

  // Compute overall severity
  let overallSeverity: CheckerSeverity | 'none' = 'none';
  if (matches.length > 0) {
    if (matches.some((m) => m.severity === 'critical')) {
      overallSeverity = 'critical';
    } else if (matches.some((m) => m.severity === 'high')) {
      overallSeverity = 'high';
    } else {
      overallSeverity = 'medium';
    }
  }

  // Build segmented text for inline highlighting
  const segments: Array<{ text: string; isFlagged: boolean; ruleId?: string }> = [];
  let currentIndex = 0;

  for (const m of matches) {
    if (m.startIndex > currentIndex) {
      segments.push({
        text: normalizedText.slice(currentIndex, m.startIndex),
        isFlagged: false,
      });
    }

    if (m.endIndex > currentIndex) {
      const matchStart = Math.max(currentIndex, m.startIndex);
      segments.push({
        text: normalizedText.slice(matchStart, m.endIndex),
        isFlagged: true,
        ruleId: m.ruleId,
      });
      currentIndex = m.endIndex;
    }
  }

  if (currentIndex < normalizedText.length) {
    segments.push({
      text: normalizedText.slice(currentIndex),
      isFlagged: false,
    });
  }

  return {
    hasMatches: matches.length > 0,
    overallSeverity,
    matchedCues: matches,
    totalMatches: matches.length,
    highlightedSegments: segments,
  };
}

/**
 * Authentic fictional samples across languages (English, Hindi, Marathi, Hinglish, Safe)
 */
export const SAMPLE_MESSAGES = {
  en: `Urgent Notice: Dear Electricity Consumer, your power supply will be disconnected tonight at 9:30 PM due to previous month bill non-update. Call electricity officer immediately at 98765-XXXXX or download the update apk: ind-power-bill.fictional to avoid power cut.`,

  hi: `अति आवश्यक सूचना: प्रिय विद्युत उपभोक्ता, पिछले माह का बिजली बिल अपडेट न होने के कारण आपका बिजली कनेक्शन आज रात 9:30 बजे काट दिया जाएगा। तुरंत हमारे विद्युत अधिकारी से संपर्क करें: 98765-XXXXX या ऐप डाउनलोड करें: ind-power-bill.fictional`,

  mr: `अति महत्त्वाचे: महावितरण ग्राहकांसाठी महत्त्वाची सूचना: मागील महिन्याचे वीज बिल अपडेट न झाल्यामुळे आज रात्री 9:30 वाजता आपला वीज पुरवठा खंडित केला जाईल. कनेक्शन बंद होणे टाळण्यासाठी तातडीने संपर्क करा: 98765-XXXXX किंवा ॲप डाउनलोड करा: ind-power-bill.fictional`,

  hinglish: `Urgent: Aapka bijli connection aaj raat 9:30 baje cut kar diya jayega. Previous month bill update nahi hua hai. Power disconnection se bachne ke liye turant call karein: 98765-XXXXX ya apk download karein: ind-power-bill.fictional`,

  safe: `Your account XX4102 was debited by INR 1,250.00 on 14-Oct at DMart Grocery Store via UPI Ref 429810239102. Available balance: INR 24,190.40. If not done by you, SMS BLOCK to 56767.`,
};
