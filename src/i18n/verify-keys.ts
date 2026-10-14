import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

type JsonObj = Record<string, unknown>;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LOCALES_DIR = path.join(__dirname, 'locales');
const LANGUAGES = ['en', 'hi', 'mr'] as const;

function extractEntries(obj: JsonObj, prefix = ''): Map<string, string> {
  const map = new Map<string, string>();
  for (const key of Object.keys(obj)) {
    const fullPath = prefix ? `${prefix}.${key}` : key;
    const value = obj[key];
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      const sub = extractEntries(value as JsonObj, fullPath);
      sub.forEach((v, k) => map.set(k, v));
    } else if (typeof value === 'string') {
      map.set(fullPath, value);
    }
  }
  return map;
}

function extractPlaceholders(str: string): string[] {
  const matches = str.match(/\{\{([a-zA-Z0-9_]+)\}\}/g);
  return matches ? matches.sort() : [];
}

const WHITELIST_IDENTICAL = new Set([
  'CyberRakshak',
  '1930',
  '112',
  '1912',
  '14440',
  '24x7',
  'https://cybercrime.gov.in',
  'https://sancharsaathi.gov.in/sfc/',
  'https://sachet.rbi.org.in',
  'https://cms.rbi.org.in',
  'https://www.cert-in.org.in',
  'https://urjavidyut-bill-update.fictional',
  'https://quicktrack-redelivery.fictional',
  'https://ind-post-redelivery.fictional',
  'cybercrime.gov.in',
  'sancharsaathi.gov.in',
  'sachet.rbi.org.in',
  'RBI Sachet Portal',
  'DoT Sanchar Saathi / Chakshu',
  'VIP Wealth Club 24',
  'critical',
  'high',
  'medium',
  'low',
  'unclear',
  'English',
  'हिन्दी',
  'मराठी',
  'en',
  'hi',
  'mr',
  'AnyDesk',
  'QuickSupport',
  'TeamViewer',
  'APK',
  'UPI',
  'QR',
  'SEBI',
  'RBI',
  'CBI',
  'ED',
  'NIA',
  'SMS',
  'WhatsApp',
  'Telegram',
  'Google',
  'YouTube',
  'Chakshu',
  'Sachet',
  'CERT-In',
  'BijliUpdate.apk',
  '01',
  '02',
  '03',
  '04',
  '05',
  'min',
  '₹',
]);

export function verifyTranslationIntegrity(): {
  success: boolean;
  totalKeys: number;
  namespaceCounts: Record<string, number>;
  missingInHi: string[];
  missingInMr: string[];
  extraInHi: string[];
  extraInMr: string[];
  untranslatedInHi: string[];
  untranslatedInMr: string[];
  placeholderMismatches: string[];
} {
  const namespaces = fs
    .readdirSync(LOCALES_DIR, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)
    .sort();

  const langMaps: Record<'en' | 'hi' | 'mr', Map<string, string>> = {
    en: new Map(),
    hi: new Map(),
    mr: new Map(),
  };

  const namespaceCounts: Record<string, number> = {};

  for (const ns of namespaces) {
    const nsDir = path.join(LOCALES_DIR, ns);
    for (const lang of LANGUAGES) {
      const filePath = path.join(nsDir, `${lang}.json`);
      if (!fs.existsSync(filePath)) {
        console.error(`❌ Missing locale file: ${filePath}`);
        continue;
      }
      const raw = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(raw) as JsonObj;
      const entries = extractEntries(parsed);

      if (lang === 'en') {
        let nsCount = 0;
        entries.forEach((v, k) => {
          langMaps.en.set(k, v);
          nsCount++;
        });
        namespaceCounts[ns] = nsCount;
      } else {
        entries.forEach((v, k) => {
          langMaps[lang].set(k, v);
        });
      }
    }
  }

  const enMap = langMaps.en;
  const hiMap = langMaps.hi;
  const mrMap = langMaps.mr;

  const enKeys = Array.from(enMap.keys()).sort();
  const hiKeys = Array.from(hiMap.keys()).sort();
  const mrKeys = Array.from(mrMap.keys()).sort();

  const enKeySet = new Set(enKeys);
  const hiKeySet = new Set(hiKeys);
  const mrKeySet = new Set(mrKeys);

  const missingInHi = enKeys.filter((k) => !hiKeySet.has(k));
  const missingInMr = enKeys.filter((k) => !mrKeySet.has(k));

  const extraInHi = hiKeys.filter((k) => !enKeySet.has(k));
  const extraInMr = mrKeys.filter((k) => !enKeySet.has(k));

  const untranslatedInHi: string[] = [];
  const untranslatedInMr: string[] = [];
  const placeholderMismatches: string[] = [];

  for (const [key, enVal] of enMap.entries()) {
    const enTrim = enVal.trim();

    const isIdenticalAllowed =
      WHITELIST_IDENTICAL.has(enTrim) ||
      /^[\d\s.,/:\-()%+#|!→←•—"']+$/.test(enTrim) ||
      enTrim.startsWith('http://') ||
      enTrim.startsWith('https://') ||
      enTrim.includes('.gov.in') ||
      enTrim.includes('.fictional');

    const hiVal = hiMap.get(key);
    if (hiVal) {
      if (!isIdenticalAllowed && hiVal.trim() === enTrim) {
        untranslatedInHi.push(`${key} -> "${enVal}"`);
      }
      const enHolders = extractPlaceholders(enTrim);
      const hiHolders = extractPlaceholders(hiVal);
      if (enHolders.join(',') !== hiHolders.join(',')) {
        placeholderMismatches.push(
          `[hi] ${key}: en=[${enHolders.join(',')}] vs hi=[${hiHolders.join(',')}]`
        );
      }
    }

    const mrVal = mrMap.get(key);
    if (mrVal) {
      if (!isIdenticalAllowed && mrVal.trim() === enTrim) {
        untranslatedInMr.push(`${key} -> "${enVal}"`);
      }
      const enHolders = extractPlaceholders(enTrim);
      const mrHolders = extractPlaceholders(mrVal);
      if (enHolders.join(',') !== mrHolders.join(',')) {
        placeholderMismatches.push(
          `[mr] ${key}: en=[${enHolders.join(',')}] vs mr=[${mrHolders.join(',')}]`
        );
      }
    }
  }

  const hasMissing = missingInHi.length > 0 || missingInMr.length > 0;
  const hasExtra = extraInHi.length > 0 || extraInMr.length > 0;
  const hasUntranslated = untranslatedInHi.length > 0 || untranslatedInMr.length > 0;
  const hasPlaceholderIssues = placeholderMismatches.length > 0;
  const success = !hasMissing && !hasExtra && !hasUntranslated && !hasPlaceholderIssues;

  console.log(`\n========================================`);
  console.log(`--- CyberRakshak i18n Verification ---`);
  console.log(`Total Keys per Language: ${enKeys.length}`);
  console.log(`Key breakdown by namespace file:`);
  for (const [ns, count] of Object.entries(namespaceCounts)) {
    console.log(`  - ${ns}: ${count} keys`);
  }

  if (hasMissing) {
    console.error(`❌ Missing keys found!`);
    if (missingInHi.length > 0) console.error(`Missing in Hindi (${missingInHi.length}):`, missingInHi);
    if (missingInMr.length > 0) console.error(`Missing in Marathi (${missingInMr.length}):`, missingInMr);
  }

  if (hasExtra) {
    console.error(`❌ Extra keys found!`);
    if (extraInHi.length > 0) console.error(`Extra in Hindi (${extraInHi.length}):`, extraInHi);
    if (extraInMr.length > 0) console.error(`Extra in Marathi (${extraInMr.length}):`, extraInMr);
  }

  if (hasUntranslated) {
    console.error(`❌ Untranslated English copies detected in vernacular locales!`);
    if (untranslatedInHi.length > 0)
      console.error(`Untranslated in Hindi (${untranslatedInHi.length}):`, untranslatedInHi);
    if (untranslatedInMr.length > 0)
      console.error(`Untranslated in Marathi (${untranslatedInMr.length}):`, untranslatedInMr);
  }

  if (hasPlaceholderIssues) {
    console.error(`❌ Placeholder mismatches found:`, placeholderMismatches);
  }

  if (success) {
    console.log(`✅ 100% Key Parity verified across English, Hindi, and Marathi.`);
    console.log(`✅ All ${enKeys.length} strings are properly localized.`);
    console.log(`✅ All placeholder variables match identically.`);
  }
  console.log(`========================================\n`);

  return {
    success,
    totalKeys: enKeys.length,
    namespaceCounts,
    missingInHi,
    missingInMr,
    extraInHi,
    extraInMr,
    untranslatedInHi,
    untranslatedInMr,
    placeholderMismatches,
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const result = verifyTranslationIntegrity();
  if (!result.success) {
    process.exit(1);
  }
}
