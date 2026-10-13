import { test, expect } from '@playwright/test';

const ROUTES = [
  '/',
  '/scam-lab',
  '/emergency-assist',
  '/message-checker',
  '/academy',
  '/toolkit',
];

const LOCALES = ['en', 'hi', 'mr'] as const;

for (const lang of LOCALES) {
  for (const route of ROUTES) {
    const fullPath = lang === 'en' ? route : `/${lang}${route === '/' ? '' : route}`;

    test(`Smoke test ${fullPath} at 360px [Locale: ${lang}]`, async ({ page }) => {
      // 1. Set viewport to 360px
      await page.setViewportSize({ width: 360, height: 640 });

      // Track missing keys or console errors
      const missingKeys: string[] = [];
      page.on('console', (msg) => {
        const text = msg.text();
        if (text.includes('[MISSING I18N KEY]')) {
          missingKeys.push(text);
        }
      });

      // 2. Navigate to route
      await page.goto(fullPath, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);

      // 3. Fail on horizontal scroll at 360px
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth + 1;
      });
      expect(hasHorizontalScroll, `Horizontal scroll detected on ${fullPath} at 360px`).toBe(false);

      // 4. Fail on missing i18n keys
      const trackedMissing = await page.evaluate(() => {
        return (window as unknown as { __MISSING_I18N_KEYS__?: string[] }).__MISSING_I18N_KEYS__ || [];
      });
      expect(
        [...missingKeys, ...trackedMissing],
        `Missing i18n keys found on ${fullPath}`
      ).toEqual([]);

      // 5. Fail on Latin-only text on Hindi or Marathi pages
      if (lang === 'hi' || lang === 'mr') {
        const bodyText = await page.evaluate(() => document.body.innerText || '');
        const hasDevanagari = /[\u0900-\u097F]/.test(bodyText);
        expect(
          hasDevanagari,
          `Expected Devanagari script on ${fullPath} for locale ${lang}, but found Latin-only text`
        ).toBe(true);

        // Verify <html lang> attribute is properly set
        const htmlLang = await page.evaluate(() => document.documentElement.lang);
        expect(htmlLang).toBe(lang);
      }
    });
  }
}
