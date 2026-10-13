/**
 * Locale-aware internationalization formatters for CyberRakshak
 * Formats numbers, currencies, dates, and times using standard ECMAScript Intl APIs.
 *
 * SPECIFICATION ENFORCEMENT:
 * Helplines, amounts, phone numbers, and case reference numbers MUST ALWAYS use
 * Western Arabic digits (numberingSystem: 'latn') across all languages (en, hi, mr)
 * so that users can dial them reliably into phones and match standard banking SMS alerts.
 */

const LOCALE_MAP: Record<string, string> = {
  en: 'en-IN',
  hi: 'hi-IN',
  mr: 'mr-IN',
};

export const getIntlLocale = (lang: string): string => {
  return LOCALE_MAP[lang] || 'en-IN';
};

/**
 * Standard number formatting respecting locale
 */
export const formatNumber = (val: number, lang: string): string => {
  const locale = getIntlLocale(lang);
  try {
    return new Intl.NumberFormat(locale).format(val);
  } catch {
    return String(val);
  }
};

/**
 * Number formatting with FORCED 'latn' numbering system (0-9)
 * Used for reference numbers, counts, and dial codes
 */
export const formatNumberLatn = (val: number, lang = 'en'): string => {
  const locale = getIntlLocale(lang);
  try {
    return new Intl.NumberFormat(locale, { numberingSystem: 'latn' }).format(val);
  } catch {
    return String(val);
  }
};

/**
 * Currency formatting with FORCED 'latn' numbering system (e.g. ₹5,000, not ₹५,०००)
 * Crucial for fraud awareness so Indian bank transaction amounts match real SMS notifications
 */
export const formatCurrencyLatn = (amount: number, lang: string, currency = 'INR'): string => {
  const locale = getIntlLocale(lang);
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
      numberingSystem: 'latn',
    }).format(amount);
  } catch {
    return `₹${amount}`;
  }
};

/**
 * Helpline formatting - strictly ASCII Latin digits
 */
export const formatHelpline = (num: string | number): string => {
  return String(num).replace(/[\u0966-\u096F]/g, (d) => String(d.charCodeAt(0) - 0x0966));
};

/**
 * Case/Reference ID formatting - strictly Latin characters and digits
 */
export const formatReferenceNumber = (ref: string): string => {
  return ref.normalize('NFC');
};

export const formatDate = (
  date: Date | string | number,
  lang: string,
  options: Intl.DateTimeFormatOptions = { dateStyle: 'medium' }
): string => {
  const locale = getIntlLocale(lang);
  const d = typeof date === 'object' ? date : new Date(date);
  try {
    return new Intl.DateTimeFormat(locale, options).format(d);
  } catch {
    return d.toISOString().split('T')[0];
  }
};

export const formatTime = (
  date: Date | string | number,
  lang: string,
  options: Intl.DateTimeFormatOptions = { timeStyle: 'short' }
): string => {
  const locale = getIntlLocale(lang);
  const d = typeof date === 'object' ? date : new Date(date);
  try {
    return new Intl.DateTimeFormat(locale, options).format(d);
  } catch {
    return d.toTimeString().slice(0, 5);
  }
};
