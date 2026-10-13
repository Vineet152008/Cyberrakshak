# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke.spec.ts >> Smoke test / at 360px [Locale: en]
- Location: tests/smoke.spec.ts:18:5

# Error details

```
Error: Horizontal scroll detected on / at 360px

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
      - generic [ref=e48]:
        - generic [ref=e49]:
          - generic [ref=e50]: Cyber-Fraud Awareness for Indian Citizens
          - heading "Think before you tap." [level=1] [ref=e53]
          - paragraph [ref=e54]: Interactive, safe scam simulations designed for first-time smartphone users, families, and senior citizens. Learn to identify deception before your money is at risk.
          - generic [ref=e55]:
            - link [ref=e56] [cursor=pointer]:
              - /url: /scam-lab
              - button "Enter Scam Lab" [ref=e57]
            - link [ref=e61] [cursor=pointer]:
              - /url: /emergency-assist
              - button "I've Been Scammed — What Now?" [ref=e62]
          - generic [ref=e68]:
            - generic [ref=e69]: Zero login or real banking data required
            - generic [aria-hidden] [ref=e74]: ·
            - generic [ref=e75]: Analysis runs entirely inside your browser
        - generic "Interactive CyberRakshak Shield of Protection" [ref=e81]
      - main [ref=e99]:
        - region [ref=e100]:
          - generic [ref=e101]:
            - text: Core Protection Modules
            - heading "Learn by Experiencing, Not Just Reading" [level=2] [ref=e102]
            - paragraph [ref=e103]: Three focused instruments engineered to build instinctive scam recognition and emergency response readiness.
          - generic [ref=e104]:
            - generic [ref=e106]:
              - generic [ref=e107]:
                - generic [ref=e108]:
                  - generic [ref=e109]: Hands-on Simulation
                  - generic [aria-hidden] [ref=e110]: ·
                  - generic [ref=e111]: 5 min exercise
                - heading "Scam Lab Sandbox" [level=3] [ref=e117]
                - paragraph [ref=e118]: Practice detecting hidden red flags using our signature Spotlight Flashlight and realistic SMS & WhatsApp simulations.
              - link "Enter Scam Lab" [ref=e120] [cursor=pointer]:
                - /url: /scam-lab
            - generic [ref=e125]:
              - generic [ref=e126]:
                - generic [ref=e127]:
                  - generic [ref=e128]: Immediate Incident Protocol
                  - generic [aria-hidden] [ref=e129]: ·
                  - generic [ref=e130]: First 5 minutes
                - heading "Emergency Assist" [level=3] [ref=e138]
                - paragraph [ref=e139]: Guided response steps for financial fraud, account hacking, or blackmail. Includes 1930 hotlines and evidence checklist.
              - link "View Incident Protocol" [ref=e141] [cursor=pointer]:
                - /url: /emergency-assist
            - generic [ref=e146]:
              - generic [ref=e147]:
                - generic [ref=e148]:
                  - generic [ref=e149]: Client-Side Scanner
                  - generic [aria-hidden] [ref=e150]: ·
                  - generic [ref=e151]: Instant analysis
                - heading "Message Checker" [level=3] [ref=e157]
                - paragraph [ref=e158]: Paste suspicious messages to analyze artificial urgency, fraudulent UPI collect traps, and impersonation keywords.
              - link "Inspect Suspicious Message" [ref=e160] [cursor=pointer]:
                - /url: /message-checker
        - region [ref=e164]:
          - generic [ref=e165]:
            - generic [ref=e166]:
              - text: Common Scam Types
              - heading "Common Fraud Types" [level=2] [ref=e167]
              - paragraph [ref=e168]: Tap any scam below to see how it works, read a safe fictional sample, and learn what to do right now.
            - generic [ref=e169]:
              - generic [ref=e170]: Critical
              - generic [aria-hidden] [ref=e173]: /
              - generic [ref=e174]: High
              - generic [aria-hidden] [ref=e177]: /
              - generic [ref=e178]: Medium
          - generic [ref=e181]:
            - generic [ref=e182]:
              - img "Interactive Threat Radar with 8 Indian fraud categories" [ref=e184]:
                - 'button "Select scam: UPI Collect Scam, risk level: critical" [ref=e194] [cursor=pointer]':
                  - generic: UPI Collect Scam
                - 'button "Select scam: Digital Arrest Scam, risk level: critical" [ref=e198] [cursor=pointer]':
                  - generic: Digital Arrest Scam
                - 'button "Select scam: Electricity KYC Scam, risk level: high" [ref=e201] [cursor=pointer]':
                  - generic: Electricity KYC Scam
                - 'button "Select scam: Part-Time Task Scam, risk level: high" [ref=e204] [cursor=pointer]':
                  - generic: Part-Time Task Scam
                - 'button "Select scam: Fake Loan Apps, risk level: critical" [ref=e207] [cursor=pointer]':
                  - generic: Fake Loan Apps
                - 'button "Select scam: Fake Investment Groups, risk level: high" [ref=e210] [cursor=pointer]':
                  - generic: Fake Investment Groups
                - 'button "Select scam: Parcel Delivery Scam, risk level: medium" [ref=e213] [cursor=pointer]':
                  - generic: Parcel Delivery Scam
                - 'button "Select scam: Video Call Blackmail, risk level: critical" [ref=e216] [cursor=pointer]':
                  - generic: Video Call Blackmail
              - generic [ref=e219]:
                - generic [ref=e220]: "Tip: Click or tap any threat node above to view safety guidance."
                - generic [ref=e221]: 8 Categories Monitored
            - generic [ref=e222]:
              - generic [ref=e223]:
                - generic [ref=e224]:
                  - generic [ref=e225]: Scam Guide
                  - generic [aria-hidden] [ref=e226]: ·
                  - generic [ref=e227]: CRITICAL RISK
                  - generic [aria-hidden] [ref=e228]: ·
                  - generic [ref=e229]: SMS
                - heading "UPI Collect Request Fraud" [level=3] [ref=e230]
                - paragraph [ref=e231]: Scammers send a 'Receive Money' QR code or UPI collect request. Entering your PIN transfers money OUT of your account.
                - generic [ref=e236]:
                  - generic [ref=e237]: Golden Rule of Defense
                  - generic [ref=e238]: UPI PIN is only required to SEND money, NEVER to receive money.
                - generic [ref=e239]:
                  - generic [ref=e240]: Common manipulative phrases
                  - generic [ref=e241]: "\"Enter your PIN to claim payment\" / \"Scan this QR code to receive government cashback\""
              - generic [ref=e242]:
                - button "View Full Breakdown" [ref=e243] [cursor=pointer]
                - link "Practice this in Scam Lab" [ref=e247] [cursor=pointer]:
                  - /url: /scam-lab?category=upi_collect
        - region [ref=e253]:
          - generic [ref=e254]:
            - generic [ref=e255]:
              - text: Common Scam Types
              - heading "8 Most Common Cyber-Frauds in India" [level=2] [ref=e256]
              - paragraph [ref=e257]: Fictional simulations based on typical calls received at the 1930 National Cyber Helpline.
            - link "Practice in Scam Lab" [ref=e258] [cursor=pointer]:
              - /url: /scam-lab
          - generic [ref=e262]:
            - generic [ref=e264] [cursor=pointer]:
              - generic [ref=e265]:
                - generic [ref=e266]:
                  - generic [ref=e267]: CRITICAL
                  - generic [aria-hidden] [ref=e268]: ·
                  - generic [ref=e269]: SMS
                - heading "UPI Collect Scam" [level=3] [ref=e270]
                - paragraph [ref=e271]: Scammers send a 'Receive Money' QR code or UPI collect request. Entering your PIN transfers money OUT of your account.
              - generic [ref=e272]:
                - generic [ref=e273]: How it works
                - generic [ref=e274]: View Guide →
            - generic [ref=e276] [cursor=pointer]:
              - generic [ref=e277]:
                - generic [ref=e278]:
                  - generic [ref=e279]: CRITICAL
                  - generic [aria-hidden] [ref=e280]: ·
                  - generic [ref=e281]: WhatsApp
                - heading "Digital Arrest Scam" [level=3] [ref=e282]
                - paragraph [ref=e283]: Imposters posing as Police, Customs, or CBI call on video claiming your Aadhaar is linked to illegal parcels and demanding fund transfers.
              - generic [ref=e284]:
                - generic [ref=e285]: How it works
                - generic [ref=e286]: View Guide →
            - generic [ref=e288] [cursor=pointer]:
              - generic [ref=e289]:
                - generic [ref=e290]:
                  - generic [ref=e291]: HIGH
                  - generic [aria-hidden] [ref=e292]: ·
                  - generic [ref=e293]: SMS
                - heading "Electricity KYC Scam" [level=3] [ref=e294]
                - paragraph [ref=e295]: Urgent SMS claiming power or mobile service will be cut off tonight unless you call a personal mobile number or download an app.
              - generic [ref=e296]:
                - generic [ref=e297]: How it works
                - generic [ref=e298]: View Guide →
            - generic [ref=e300] [cursor=pointer]:
              - generic [ref=e301]:
                - generic [ref=e302]:
                  - generic [ref=e303]: HIGH
                  - generic [aria-hidden] [ref=e304]: ·
                  - generic [ref=e305]: WhatsApp
                - heading "Part-Time Task Scam" [level=3] [ref=e306]
                - paragraph [ref=e307]: Promises easy daily income for liking videos, followed by demands to deposit money into Telegram 'prepaid tasks' where savings get trapped.
              - generic [ref=e308]:
                - generic [ref=e309]: How it works
                - generic [ref=e310]: View Guide →
            - generic [ref=e312] [cursor=pointer]:
              - generic [ref=e313]:
                - generic [ref=e314]:
                  - generic [ref=e315]: CRITICAL
                  - generic [aria-hidden] [ref=e316]: ·
                  - generic [ref=e317]: App Store
                - heading "Fake Loan Apps" [level=3] [ref=e318]
                - paragraph [ref=e319]: Apps offering instant loans without documents that steal your contacts and photo gallery to harass and extort you.
              - generic [ref=e320]:
                - generic [ref=e321]: How it works
                - generic [ref=e322]: View Guide →
            - generic [ref=e324] [cursor=pointer]:
              - generic [ref=e325]:
                - generic [ref=e326]:
                  - generic [ref=e327]: HIGH
                  - generic [aria-hidden] [ref=e328]: ·
                  - generic [ref=e329]: WhatsApp
                - heading "Fake Investment Groups" [level=3] [ref=e330]
                - paragraph [ref=e331]: Fake WhatsApp/Telegram groups showing fake profits to trick you into transferring your savings to unverified accounts.
              - generic [ref=e332]:
                - generic [ref=e333]: How it works
                - generic [ref=e334]: View Guide →
            - generic [ref=e336] [cursor=pointer]:
              - generic [ref=e337]:
                - generic [ref=e338]:
                  - generic [ref=e339]: MEDIUM
                  - generic [aria-hidden] [ref=e340]: ·
                  - generic [ref=e341]: SMS
                - heading "Parcel Delivery Scam" [level=3] [ref=e342]
                - paragraph [ref=e343]: SMS claiming an undelivered parcel from India Post or courier with a link to pay ₹5 or share an OTP for redelivery.
              - generic [ref=e344]:
                - generic [ref=e345]: How it works
                - generic [ref=e346]: View Guide →
            - generic [ref=e348] [cursor=pointer]:
              - generic [ref=e349]:
                - generic [ref=e350]:
                  - generic [ref=e351]: CRITICAL
                  - generic [aria-hidden] [ref=e352]: ·
                  - generic [ref=e353]: WhatsApp
                - heading "Video Call Blackmail" [level=3] [ref=e354]
                - paragraph [ref=e355]: Unknown video calls that capture your face and threaten to send fabricated screenshots to your family unless ransom is paid.
              - generic [ref=e356]:
                - generic [ref=e357]: How it works
                - generic [ref=e358]: View Guide →
        - region [ref=e359]:
          - generic [ref=e360]:
            - generic [ref=e361]: Victim Reassurance
            - heading "Fell for a scam? You are not to blame." [level=2] [ref=e365]
            - paragraph [ref=e366]: Cyber criminals manipulate psychology, urgency, and fear. Acting quickly can help banks freeze the accounts before stolen funds are withdrawn.
            - generic [ref=e367]:
              - link "Call 1930 Toll Free Now" [ref=e368] [cursor=pointer]:
                - /url: tel:1930
              - link "What to do right now (Step-by-Step)" [ref=e374] [cursor=pointer]:
                - /url: /emergency-assist
    - contentinfo [ref=e378]:
      - generic [ref=e379]:
        - generic [ref=e380]:
          - generic [ref=e381]:
            - generic [ref=e382]: CyberRakshak
            - paragraph [ref=e386]: Empowering Indian citizens, families, and seniors to recognize cyber deception safely through hands-on educational simulations.
            - generic [ref=e387]: 100% Client-Side. No personal banking credentials collected.
          - generic [ref=e392]:
            - generic [ref=e393]: Verified Government & Regulatory Portals
            - list [ref=e394]:
              - listitem [ref=e395]:
                - link "National Cyber Crime Reporting Portal" [ref=e396] [cursor=pointer]:
                  - /url: https://cybercrime.gov.in
              - listitem [ref=e402]:
                - link "Chakshu (DoT Sanchar Saathi)" [ref=e403] [cursor=pointer]:
                  - /url: https://sancharsaathi.gov.in/sfc/
              - listitem [ref=e409]:
                - link "RBI Sachet Portal" [ref=e410] [cursor=pointer]:
                  - /url: https://sachet.rbi.org.in
              - listitem [ref=e416]:
                - link "RBI Complaint Management System (CMS)" [ref=e417] [cursor=pointer]:
                  - /url: https://cms.rbi.org.in
          - generic [ref=e423]:
            - generic [ref=e424]: Emergency Helplines
            - generic [ref=e425]:
              - generic [ref=e426]:
                - generic [ref=e427]: "National Cyber Helpline:"
                - link "1930 (Toll Free, 24x7)" [ref=e428] [cursor=pointer]:
                  - /url: tel:1930
              - generic [ref=e429]:
                - generic [ref=e430]: "National Emergency:"
                - link "112 (Police / Emergency)" [ref=e431] [cursor=pointer]:
                  - /url: tel:112
              - generic [ref=e432]:
                - generic [ref=e433]: "RBI Ombudsman:"
                - link "14440" [ref=e434] [cursor=pointer]:
                  - /url: tel:14440
        - generic [ref=e435]:
          - generic [ref=e436]: Trust & Safety Disclaimer
          - paragraph [ref=e437]: CyberRakshak is an independent, non-commercial public education initiative built for Indian citizens. All scam simulations and sender details shown are fictional for training purposes. We never ask for your real OTPs, bank credentials, or UPI PINs. If you have lost money to fraud, report immediately to the National Cyber Crime Portal or call 1930.
        - generic [ref=e438]:
          - generic [ref=e439]: © 2026 CyberRakshak Public Awareness Initiative. MIT Licensed educational resource.
          - generic [ref=e440]:
            - generic [ref=e441]: Built with zero tracking
            - generic [aria-hidden] [ref=e442]: •
            - generic [ref=e443]: WCAG 2.1 AA Compliant
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
     |                                                                                         ^ Error: Horizontal scroll detected on / at 360px
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