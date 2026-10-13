/**
 * Key Parity and Translation Integrity Verification Utility
 * 
 * 1. Checks 100% key parity across 'en', 'hi', and 'mr'.
 * 2. Reports key counts per namespace.
 * 3. Checks placeholder match between en and hi/mr.
 * 4. Flags any values in 'hi' or 'mr' that are identical copies of 'en',
 *    excluding universal identifiers, phone numbers, and URLs.
 * 5. Exits with process.exit(1) on failure so that 'npm run check:i18n' fails.
 */
import en from './locales/en.json';
import hi from './locales/hi.json';
import mr from './locales/mr.json';

type JsonObj = Record<string, unknown>;

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

// Whitelist of terms that are legitimately identical across English, Hindi, and Marathi
const WHITELIST_IDENTICAL = new Set([
  'CyberRakshak',
  '1930',
  '112',
  '1912',
  '14440',
  'https://cybercrime.gov.in',
  'https://sancharsaathi.gov.in/sfc/',
  'https://sachet.rbi.org.in',
  'https://cms.rbi.org.in',
  'https://www.cert-in.org.in',
  'https://urjavidyut-bill-update.fictional',
  'https://quicktrack-redelivery.fictional',
  'https://ind-post-redelivery.fictional',
  'cybercrime.gov.in',
  'RBI Sachet Portal',
  'DoT Sanchar Saathi / Chakshu',
  'VIP Wealth Club 24',
  'critical',
  'high',
  'medium',
  'English',
  'हिन्दी',
  'मराठी',
]);

export function verifyTranslationIntegrity(): {
  success: boolean;
  totalKeys: number;
  namespaceCounts: Record<string, number>;
  missingInHi: string[];
  missingInMr: string[];
  untranslatedInHi: string[];
  untranslatedInMr: string[];
  placeholderMismatches: string[];
} {
  const enMap = extractEntries(en as JsonObj);
  const hiMap = extractEntries(hi as JsonObj);
  const mrMap = extractEntries(mr as JsonObj);

  const enKeys = Array.from(enMap.keys()).sort();

  // Namespace counts
  const namespaceCounts: Record<string, number> = {};
  for (const k of enKeys) {
    const ns = k.split('.')[0];
    namespaceCounts[ns] = (namespaceCounts[ns] || 0) + 1;
  }

  const missingInHi = enKeys.filter((k) => !hiMap.has(k));
  const missingInMr = enKeys.filter((k) => !mrMap.has(k));

  const untranslatedInHi: string[] = [];
  const untranslatedInMr: string[] = [];
  const placeholderMismatches: string[] = [];

  for (const [key, enVal] of enMap.entries()) {
    const enTrim = enVal.trim();
    if (WHITELIST_IDENTICAL.has(enTrim)) continue;
    // Skip if value is purely numbers, phone numbers, or symbols
    if (/^\+?[0-9\s.,/:-]+$/.test(enTrim)) continue;

    const hiVal = hiMap.get(key);
    if (hiVal) {
      if (hiVal.trim() === enTrim) {
        untranslatedInHi.push(`${key} -> "${enVal}"`);
      }
      // Placeholder validation
      const enHolders = extractPlaceholders(enTrim);
      const hiHolders = extractPlaceholders(hiVal);
      if (enHolders.join(',') !== hiHolders.join(',')) {
        placeholderMismatches.push(`[hi] ${key}: en=[${enHolders.join(',')}] vs hi=[${hiHolders.join(',')}]`);
      }
    }

    const mrVal = mrMap.get(key);
    if (mrVal) {
      if (mrVal.trim() === enTrim) {
        untranslatedInMr.push(`${key} -> "${enVal}"`);
      }
      // Placeholder validation
      const enHolders = extractPlaceholders(enTrim);
      const mrHolders = extractPlaceholders(mrVal);
      if (enHolders.join(',') !== mrHolders.join(',')) {
        placeholderMismatches.push(`[mr] ${key}: en=[${enHolders.join(',')}] vs mr=[${mrHolders.join(',')}]`);
      }
    }
  }

  const hasMissing = missingInHi.length > 0 || missingInMr.length > 0;
  const hasUntranslated = untranslatedInHi.length > 0 || untranslatedInMr.length > 0;
  const hasPlaceholderIssues = placeholderMismatches.length > 0;
  const success = !hasMissing && !hasUntranslated && !hasPlaceholderIssues;

  console.log(`\n========================================`);
  console.log(`--- CyberRakshak i18n Verification ---`);
  console.log(`Total Keys per Language: ${enKeys.length}`);
  console.log(`Key breakdown by namespace:`);
  for (const [ns, count] of Object.entries(namespaceCounts)) {
    console.log(`  - ${ns}: ${count} keys`);
  }

  if (hasMissing) {
    console.error(`❌ Missing keys found!`);
    if (missingInHi.length > 0) console.error(`Missing in Hindi (${missingInHi.length}):`, missingInHi);
    if (missingInMr.length > 0) console.error(`Missing in Marathi (${missingInMr.length}):`, missingInMr);
  }

  if (hasUntranslated) {
    console.error(`❌ Untranslated English copies detected in vernacular locales!`);
    if (untranslatedInHi.length > 0) console.error(`Untranslated in Hindi (${untranslatedInHi.length}):`, untranslatedInHi);
    if (untranslatedInMr.length > 0) console.error(`Untranslated in Marathi (${untranslatedInMr.length}):`, untranslatedInMr);
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
    untranslatedInHi,
    untranslatedInMr,
    placeholderMismatches,
  };
}

// Auto-run when executed directly via tsx
if (import.meta.url === `file://${process.argv[1]}`) {
  const result = verifyTranslationIntegrity();
  if (!result.success) {
    process.exit(1);
  }
}
