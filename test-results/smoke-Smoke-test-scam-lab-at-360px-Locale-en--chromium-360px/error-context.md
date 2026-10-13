# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke.spec.ts >> Smoke test /scam-lab at 360px [Locale: en]
- Location: tests/smoke.spec.ts:18:5

# Error details

```
Error: Horizontal scroll detected on /scam-lab at 360px

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
    - generic [ref=e46]:
      - generic [ref=e47]:
        - generic [ref=e48]:
          - generic [ref=e49]: Interactive Deconstruction Lab
          - generic [ref=e54]: Partial (4 of 8 scenarios)
        - 'heading "Scam Lab: Deconstruct & Defend" [level=1] [ref=e55]'
        - paragraph [ref=e56]: Learn to recognize deception by interacting with realistic simulated messages safely. Practice spotting manipulation cues with the flashlight reveal, test your choices in branching simulations, and measure your instinct with scenario quizzes.
        - generic [ref=e57]:
          - generic [ref=e58]: Scam Lab is currently in active development. Scenarios 1 to 4 are fully functional; scenarios 5 to 8 are being calibrated with community reports.
          - generic [ref=e62]: Private browser-based simulator. Your answers, revealed flags, and scores stay strictly inside this browser on your device and are never transmitted to any external server.
      - tablist "Scam Lab Mode Selection" [ref=e67]:
        - tab "Flashlight Reveal" [selected] [ref=e68] [cursor=pointer]
        - tab "Decision Simulator" [ref=e73] [cursor=pointer]
        - tab "Red-Flag Mastery Quiz" [ref=e77] [cursor=pointer]
      - generic [ref=e82]:
        - generic [ref=e83]: "Choose Scenario:"
        - generic [ref=e84]:
          - button "SMS Utility KYC Impersonation Electricity Bill & Urgent Power Disconnection Threat" [pressed] [ref=e85] [cursor=pointer]:
            - generic [ref=e86]: SMS
            - generic [ref=e91]:
              - generic [ref=e92]: Utility KYC Impersonation
              - generic [ref=e93]: Electricity Bill & Urgent Power Disconnection Threat
          - button "SMS Logistics & Courier Impersonation Parcel Failed Delivery / ₹5 Address Update Scam" [ref=e94] [cursor=pointer]:
            - generic [ref=e95]: SMS
            - generic [ref=e102]:
              - generic [ref=e103]: Logistics & Courier Impersonation
              - generic [ref=e104]: Parcel Failed Delivery / ₹5 Address Update Scam
          - button "UPI Modal UPI Collect & QR Code Fraud Fake Refund / UPI Reverse Payment Collect Request" [ref=e105] [cursor=pointer]:
            - generic [ref=e106]: UPI Modal
            - generic [ref=e113]:
              - generic [ref=e114]: UPI Collect & QR Code Fraud
              - generic [ref=e115]: Fake Refund / UPI Reverse Payment Collect Request
          - button "Video Call Digital Arrest & Impersonation Digital Arrest / Fake Law Enforcement Video Call Notice" [ref=e116] [cursor=pointer]:
            - generic [ref=e117]: Video Call
            - generic [ref=e124]:
              - generic [ref=e125]: Digital Arrest & Impersonation
              - generic [ref=e126]: Digital Arrest / Fake Law Enforcement Video Call Notice
      - generic [ref=e128]:
        - status [ref=e129]
        - generic [ref=e130]:
          - generic [ref=e131]:
            - generic [ref=e132]:
              - generic [ref=e133]: Utility KYC Impersonation
              - generic [ref=e134]: SMS
            - heading "Electricity Bill & Urgent Power Disconnection Threat" [level=2] [ref=e135]
          - generic [ref=e136]:
            - generic [ref=e137]: Found 0 of 3 deception cues
            - button "Reveal All Red Flags" [ref=e142] [cursor=pointer]
        - generic [ref=e147]:
          - generic [ref=e148]: Tap or hover over parts of the message to uncover hidden psychological hooks and deceptive patterns.
          - generic [ref=e149]: "Keyboard: Press Tab to navigate between message segments. Press Enter or Space to inspect red flag details."
        - generic [ref=e150]:
          - generic [ref=e151]:
            - generic [ref=e152]:
              - generic [ref=e153]: SMS
              - generic [ref=e154]:
                - generic [ref=e155]: UrjaVidyut Power (Fictional)
                - generic [ref=e156]: SMS Alert
            - generic [ref=e157]: Today, 8:15 PM
          - generic [ref=e158]:
            - paragraph [ref=e159]: Dear Consumer, your electricity power supply will be disconnected tonight at 9:30 PM from the local power sub-station because your previous month bill was not updated.
            - button "Power will be cut in 75 minutes unless verified immediately." [ref=e160] [cursor=pointer]
            - button "Please contact our power officer immediately at 98765-43210." [ref=e167] [cursor=pointer]
            - button "Or update KYC online at https://urjavidyut-bill-update.fictional to avoid immediate blackout." [ref=e174] [cursor=pointer]
            - paragraph [ref=e181]: Discom Operations Central Command (Automated Alert)
    - contentinfo [ref=e182]:
      - generic [ref=e183]:
        - generic [ref=e184]:
          - generic [ref=e185]:
            - generic [ref=e186]: CyberRakshak
            - paragraph [ref=e190]: Empowering Indian citizens, families, and seniors to recognize cyber deception safely through hands-on educational simulations.
            - generic [ref=e191]: 100% Client-Side. No personal banking credentials collected.
          - generic [ref=e196]:
            - generic [ref=e197]: Verified Government & Regulatory Portals
            - list [ref=e198]:
              - listitem [ref=e199]:
                - link "National Cyber Crime Reporting Portal" [ref=e200] [cursor=pointer]:
                  - /url: https://cybercrime.gov.in
              - listitem [ref=e206]:
                - link "Chakshu (DoT Sanchar Saathi)" [ref=e207] [cursor=pointer]:
                  - /url: https://sancharsaathi.gov.in/sfc/
              - listitem [ref=e213]:
                - link "RBI Sachet Portal" [ref=e214] [cursor=pointer]:
                  - /url: https://sachet.rbi.org.in
              - listitem [ref=e220]:
                - link "RBI Complaint Management System (CMS)" [ref=e221] [cursor=pointer]:
                  - /url: https://cms.rbi.org.in
          - generic [ref=e227]:
            - generic [ref=e228]: Emergency Helplines
            - generic [ref=e229]:
              - generic [ref=e230]:
                - generic [ref=e231]: "National Cyber Helpline:"
                - link "1930 (Toll Free, 24x7)" [ref=e232] [cursor=pointer]:
                  - /url: tel:1930
              - generic [ref=e233]:
                - generic [ref=e234]: "National Emergency:"
                - link "112 (Police / Emergency)" [ref=e235] [cursor=pointer]:
                  - /url: tel:112
              - generic [ref=e236]:
                - generic [ref=e237]: "RBI Ombudsman:"
                - link "14440" [ref=e238] [cursor=pointer]:
                  - /url: tel:14440
        - generic [ref=e239]:
          - generic [ref=e240]: Trust & Safety Disclaimer
          - paragraph [ref=e241]: CyberRakshak is an independent, non-commercial public education initiative built for Indian citizens. All scam simulations and sender details shown are fictional for training purposes. We never ask for your real OTPs, bank credentials, or UPI PINs. If you have lost money to fraud, report immediately to the National Cyber Crime Portal or call 1930.
        - generic [ref=e242]:
          - generic [ref=e243]: © 2026 CyberRakshak Public Awareness Initiative. MIT Licensed educational resource.
          - generic [ref=e244]:
            - generic [ref=e245]: Built with zero tracking
            - generic [aria-hidden] [ref=e246]: •
            - generic [ref=e247]: WCAG 2.1 AA Compliant
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
     |                                                                                         ^ Error: Horizontal scroll detected on /scam-lab at 360px
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