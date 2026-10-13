# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke.spec.ts >> Smoke test /mr/toolkit at 360px [Locale: mr]
- Location: tests/smoke.spec.ts:18:5

# Error details

```
Error: Horizontal scroll detected on /mr/toolkit at 360px

expect(received).toBe(expected) // Object.is equality

Expected: false
Received: true
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - link "Skip to main content" [ref=e3] [cursor=pointer]:
    - /url: "#main-content"
  - generic [ref=e4]:
    - complementary "National Cyber-Fraud Emergency Assistance" [ref=e5]:
      - generic [ref=e6]:
        - generic [ref=e7]: Suspect fraud or money debited from your account?
        - generic [ref=e10]:
          - link "Call 1930 (Toll-Free, 24x7)" [ref=e11] [cursor=pointer]:
            - /url: tel:1930
          - generic [aria-hidden] [ref=e17]: "|"
          - link "cybercrime.gov.in (opens in a new tab)" [ref=e18] [cursor=pointer]:
            - /url: https://cybercrime.gov.in
            - generic [ref=e19]: cybercrime.gov.in
            - generic [ref=e24]: (opens in a new tab)
          - generic [aria-hidden] [ref=e25]: "|"
          - link "Step-by-step guidance →" [ref=e26] [cursor=pointer]:
            - /url: /emergency-assist
    - banner [ref=e27]:
      - generic [ref=e28]:
        - link "CyberRakshak" [ref=e29] [cursor=pointer]:
          - /url: /
        - generic [ref=e34]:
          - combobox "Select Language" [ref=e39] [cursor=pointer]:
            - option "EN (English)" [selected]
            - option "HI (हिंदी)"
            - option "MR (मराठी)"
          - button "Toggle Calm Mode (Removes all motion & glows for high clarity)" [ref=e40] [cursor=pointer]
          - button "Toggle navigation menu" [ref=e43]
    - contentinfo [ref=e45]:
      - generic [ref=e46]:
        - generic [ref=e47]:
          - generic [ref=e48]:
            - generic [ref=e49]: CyberRakshak
            - paragraph [ref=e53]: Empowering Indian citizens, families, and seniors to recognize cyber deception safely through hands-on educational simulations.
            - generic [ref=e54]: 100% Client-Side. No personal banking credentials collected.
          - generic [ref=e59]:
            - generic [ref=e60]: Verified Government & Regulatory Portals
            - list [ref=e61]:
              - listitem [ref=e62]:
                - link "National Cyber Crime Reporting Portal" [ref=e63] [cursor=pointer]:
                  - /url: https://cybercrime.gov.in
              - listitem [ref=e69]:
                - link "Chakshu (DoT Sanchar Saathi)" [ref=e70] [cursor=pointer]:
                  - /url: https://sancharsaathi.gov.in/sfc/
              - listitem [ref=e76]:
                - link "RBI Sachet Portal" [ref=e77] [cursor=pointer]:
                  - /url: https://sachet.rbi.org.in
              - listitem [ref=e83]:
                - link "RBI Complaint Management System (CMS)" [ref=e84] [cursor=pointer]:
                  - /url: https://cms.rbi.org.in
          - generic [ref=e90]:
            - generic [ref=e91]: Emergency Helplines
            - generic [ref=e92]:
              - generic [ref=e93]:
                - generic [ref=e94]: "National Cyber Helpline:"
                - link "1930 (Toll Free, 24x7)" [ref=e95] [cursor=pointer]:
                  - /url: tel:1930
              - generic [ref=e96]:
                - generic [ref=e97]: "National Emergency:"
                - link "112 (Police / Emergency)" [ref=e98] [cursor=pointer]:
                  - /url: tel:112
              - generic [ref=e99]:
                - generic [ref=e100]: "RBI Ombudsman:"
                - link "14440" [ref=e101] [cursor=pointer]:
                  - /url: tel:14440
        - generic [ref=e102]:
          - generic [ref=e103]: Trust & Safety Disclaimer
          - paragraph [ref=e104]: CyberRakshak is an independent, non-commercial public education initiative built for Indian citizens. All scam simulations and sender details shown are fictional for training purposes. We never ask for your real OTPs, bank credentials, or UPI PINs. If you have lost money to fraud, report immediately to the National Cyber Crime Portal or call 1930.
        - generic [ref=e105]:
          - generic [ref=e106]: © 2026 CyberRakshak Public Awareness Initiative. MIT Licensed educational resource.
          - generic [ref=e107]:
            - generic [ref=e108]: Built with zero tracking
            - generic [aria-hidden] [ref=e109]: •
            - generic [ref=e110]: WCAG 2.1 AA Compliant
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | const ROUTES = [
  4  |   '/',
  5  |   '/scam-lab',
  6  |   '/emergency-assist',
  7  |   '/message-checker',
  8  |   '/academy',
  9  |   '/toolkit',
  10 | ];
  11 | 
  12 | const LOCALES = ['en', 'hi', 'mr'] as const;
  13 | 
  14 | for (const lang of LOCALES) {
  15 |   for (const route of ROUTES) {
  16 |     const fullPath = lang === 'en' ? route : `/${lang}${route === '/' ? '' : route}`;
  17 | 
  18 |     test(`Smoke test ${fullPath} at 360px [Locale: ${lang}]`, async ({ page }) => {
  19 |       // 1. Set viewport to 360px
  20 |       await page.setViewportSize({ width: 360, height: 640 });
  21 | 
  22 |       // Track missing keys or console errors
  23 |       const missingKeys: string[] = [];
  24 |       page.on('console', (msg) => {
  25 |         const text = msg.text();
  26 |         if (text.includes('[MISSING I18N KEY]')) {
  27 |           missingKeys.push(text);
  28 |         }
  29 |       });
  30 | 
  31 |       // 2. Navigate to route
  32 |       await page.goto(fullPath, { waitUntil: 'domcontentloaded' });
  33 |       await page.waitForTimeout(500);
  34 | 
  35 |       // 3. Fail on horizontal scroll at 360px
  36 |       const hasHorizontalScroll = await page.evaluate(() => {
  37 |         return document.documentElement.scrollWidth > window.innerWidth + 1;
  38 |       });
> 39 |       expect(hasHorizontalScroll, `Horizontal scroll detected on ${fullPath} at 360px`).toBe(false);
     |                                                                                         ^ Error: Horizontal scroll detected on /mr/toolkit at 360px
  40 | 
  41 |       // 4. Fail on missing i18n keys
  42 |       const trackedMissing = await page.evaluate(() => {
  43 |         return (window as unknown as { __MISSING_I18N_KEYS__?: string[] }).__MISSING_I18N_KEYS__ || [];
  44 |       });
  45 |       expect(
  46 |         [...missingKeys, ...trackedMissing],
  47 |         `Missing i18n keys found on ${fullPath}`
  48 |       ).toEqual([]);
  49 | 
  50 |       // 5. Fail on Latin-only text on Hindi or Marathi pages
  51 |       if (lang === 'hi' || lang === 'mr') {
  52 |         const bodyText = await page.evaluate(() => document.body.innerText || '');
  53 |         const hasDevanagari = /[\u0900-\u097F]/.test(bodyText);
  54 |         expect(
  55 |           hasDevanagari,
  56 |           `Expected Devanagari script on ${fullPath} for locale ${lang}, but found Latin-only text`
  57 |         ).toBe(true);
  58 | 
  59 |         // Verify <html lang> attribute is properly set
  60 |         const htmlLang = await page.evaluate(() => document.documentElement.lang);
  61 |         expect(htmlLang).toBe(lang);
  62 |       }
  63 |     });
  64 |   }
  65 | }
  66 | 
```