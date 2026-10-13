# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke.spec.ts >> Smoke test /emergency-assist at 360px [Locale: en]
- Location: tests/smoke.spec.ts:18:5

# Error details

```
Error: Horizontal scroll detected on /emergency-assist at 360px

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
      - status [ref=e47]
      - generic [ref=e48]:
        - generic [ref=e49]:
          - generic [ref=e50]: National Citizen Helpline (24x7, Toll-Free in India)
          - 'heading "Step 1: Call 1930 Cyber Fraud Helpline" [level=2] [ref=e51]'
          - paragraph [ref=e52]: Follow these steps in order. Calling quickly helps banks coordinate, though halting a transfer cannot be guaranteed.
        - link "Call 1930 (Toll-Free, 24x7)" [ref=e53] [cursor=pointer]:
          - /url: tel:1930
      - generic [ref=e59]:
        - generic [ref=e60]:
          - generic [ref=e61]: Calm Mode
          - paragraph [ref=e65]: Removes motion, glows, and animations to keep the screen quiet and easy to read.
        - generic [ref=e66]:
          - group "Language selection" [ref=e67]:
            - button "English" [pressed] [ref=e68] [cursor=pointer]
            - button "हिन्दी" [ref=e69] [cursor=pointer]
            - button "मराठी" [ref=e70] [cursor=pointer]
          - button "Turn on Calm Mode" [ref=e71] [cursor=pointer]
      - generic [ref=e75]:
        - heading "What To Do Right Now" [level=1] [ref=e76]
        - paragraph [ref=e77]: You are not to blame. Scams succeed through deception and psychological manipulation. Taking prompt steps can help limit the damage.
      - paragraph [ref=e82]: "Notice regarding fund recovery: Calling 1930 and reporting promptly can help authorities and banks coordinate to freeze accounts, but no tool, website, or helpline can promise or guarantee that lost funds will be recovered. CyberRakshak does not process reports or hold any authority."
      - generic [ref=e83]:
        - generic [ref=e84]: Select Incident Category (Use Arrow Keys to Navigate)
        - tablist "Incident category selection" [ref=e85]:
          - tab "Financial Fraud (Money Sent)" [selected] [ref=e86] [cursor=pointer]
          - tab "Hacked Account or Phone" [ref=e87] [cursor=pointer]
          - tab "Blackmail or Extortion" [ref=e88] [cursor=pointer]
      - tabpanel "Financial Fraud (Money Sent)" [ref=e89]:
        - generic [ref=e90]:
          - heading "If Money Was Debited From Your Account" [level=2] [ref=e91]
          - paragraph [ref=e92]: Follow these steps in order. Calling quickly helps banks coordinate, though halting a transfer cannot be guaranteed.
        - generic [ref=e93]:
          - generic [ref=e94]:
            - generic [ref=e95]:
              - generic [ref=e96]: "1"
              - 'heading "Step 1: Call 1930 Cyber Fraud Helpline" [level=3] [ref=e97]'
            - generic [ref=e98]: National Citizen Helpline (24x7, Toll-Free in India)
            - paragraph [ref=e99]: "Call 1930 immediately from your phone. Give the operator: (1) Your bank name, account number or UPI ID, (2) The transaction amount and 12-digit reference number, and (3) The recipient's phone number or UPI handle. The operator registers an alert with the recipient bank."
            - generic [ref=e100]: Keep your transaction SMS or payment receipt open while you speak with the operator.
            - link "Call 1930 (Toll-Free, 24x7)" [ref=e105] [cursor=pointer]:
              - /url: tel:1930
          - generic [ref=e111]:
            - generic [ref=e112]:
              - generic [ref=e113]: "2"
              - 'heading "Step 2: Submit a Report at cybercrime.gov.in" [level=3] [ref=e114]'
            - generic [ref=e115]: Official Central Cyber Crime Portal
            - paragraph [ref=e116]: Visit cybercrime.gov.in and click 'Report Financial Fraud'. Fill in the incident details and upload screenshots of the payment receipt. You will receive an official Acknowledgement Number.
            - generic [ref=e117]: "Helpful tip: You can also call your bank while the portal form is loading or while waiting on hold."
            - link "Open cybercrime.gov.in (opens in a new tab)" [ref=e122] [cursor=pointer]:
              - /url: https://cybercrime.gov.in
              - generic [ref=e123]: Open cybercrime.gov.in
              - generic [ref=e128]: (opens in a new tab)
          - generic [ref=e129]:
            - generic [ref=e130]:
              - generic [ref=e131]: "3"
              - 'heading "Step 3: Call Your Bank Using the Number on Your Card" [level=3] [ref=e132]'
            - generic [ref=e133]: Look at the back of your debit/credit card or open your official bank app
            - paragraph [ref=e134]: "Contact your bank's official customer service. Ask the representative to: (1) Block your debit or credit card, (2) Freeze net banking access, and (3) Deregister UPI from that account."
            - generic [ref=e135]: "CRITICAL: Never look up bank customer care numbers on Google search or social media. Scammers post fake helpline numbers to mislead victims. Only dial the phone number printed on the back of your physical card or bank passbook."
            - generic [ref=e139]:
              - generic [ref=e140]: How to Reach Your Bank Safely
              - paragraph [ref=e144]: Turn over your ATM/Debit card and dial the customer service phone number printed on the back. If your card is not with you, open your bank’s official mobile app or look at the first page of your physical bank passbook.
              - paragraph [ref=e145]: Never search online search engines for bank customer care numbers.
          - generic [ref=e146]:
            - generic [ref=e147]:
              - generic [ref=e148]: "4"
              - 'heading "Step 4: Save Evidence on Your Device" [level=3] [ref=e149]'
            - generic [ref=e150]: Do not delete SMS messages, payment receipts, or chat logs
            - paragraph [ref=e151]: Take clear screenshots of the transaction message, UPI receipt, and scammer's chat messages. Note down the 12-digit transaction reference number and exact timestamp.
            - generic [ref=e152]: Keep these screenshots saved locally on your phone so you can provide them to your bank or the cyber cell if asked.
        - generic [ref=e156]:
          - generic [ref=e157]:
            - heading "Were your phone, WhatsApp, or passwords also compromised?" [level=4] [ref=e158]
            - paragraph [ref=e159]: If the scammer took over your social media, phone SIM, or email account, take defensive steps immediately.
          - button "Go to Hacked Account Guide" [ref=e160] [cursor=pointer]
      - generic [ref=e164]:
        - generic [ref=e165]: Department of Telecommunications (DoT) Sanchar Saathi
        - heading "Report the Fraudulent Mobile Number on Chakshu" [level=3] [ref=e166]
        - paragraph [ref=e167]:
          - text: You can report the scammer's phone number, SMS sender name, or WhatsApp account on the official Government of India
          - strong [ref=e168]: Chakshu
          - text: facility to help telecom authorities investigate suspicious communications.
        - link "Report on Chakshu (sancharsaathi.gov.in) (opens in a new tab)" [ref=e170] [cursor=pointer]:
          - /url: https://sancharsaathi.gov.in/sfc/
          - generic [ref=e171]: Report on Chakshu (sancharsaathi.gov.in)
          - generic [ref=e176]: (opens in a new tab)
      - region [ref=e177]:
        - generic [ref=e178]:
          - generic [ref=e179]:
            - generic [ref=e180]: Stored only in this browser on your device. Never sent to any server.
            - heading "Private Evidence Checklist" [level=2] [ref=e185]
          - generic [ref=e186]: 100% Private (localStorage only • Zero tracking)
        - generic [ref=e190]:
          - strong [ref=e191]: Safety and Privacy Rule
          - paragraph [ref=e192]: Never type real OTPs, UPI PINs, bank passwords, or debit/credit card numbers into this checklist, into notes, or on any unverified website. Analysis and checklists run only inside your browser.
        - paragraph [ref=e193]: Check each item off on your device. Everything stays in your browser.
        - group "Evidence collection checklist" [ref=e194]:
          - generic [ref=e195] [cursor=pointer]:
            - 'checkbox "12-Digit Transaction Reference (UTR Number) Where to find: Found in your bank account statement SMS or inside your UPI payment app receipt (GPay, PhonePe, Paytm, BHIM). Why it matters: This is the primary identifier banks and 1930 operators use to locate the payment." [ref=e196]'
            - generic [ref=e197]:
              - generic [ref=e198]: 12-Digit Transaction Reference (UTR Number)
              - generic [ref=e199]:
                - strong [ref=e200]: "Where to find:"
                - text: Found in your bank account statement SMS or inside your UPI payment app receipt (GPay, PhonePe, Paytm, BHIM).
              - generic [ref=e201]:
                - strong [ref=e202]: "Why it matters:"
                - text: This is the primary identifier banks and 1930 operators use to locate the payment.
          - generic [ref=e203] [cursor=pointer]:
            - 'checkbox "Scammer''s Phone Number or UPI ID Where to find: Copy from your phone call history, WhatsApp chat header, or payment app transaction details. Why it matters: Helps authorities identify the recipient account handle." [ref=e204]'
            - generic [ref=e205]:
              - generic [ref=e206]: Scammer's Phone Number or UPI ID
              - generic [ref=e207]:
                - strong [ref=e208]: "Where to find:"
                - text: Copy from your phone call history, WhatsApp chat header, or payment app transaction details.
              - generic [ref=e209]:
                - strong [ref=e210]: "Why it matters:"
                - text: Helps authorities identify the recipient account handle.
          - generic [ref=e211] [cursor=pointer]:
            - 'checkbox "Screenshot of Payment Confirmation Where to find: Take a full screen capture showing the timestamp, amount, and recipient name. Why it matters: Serves as visual verification of the transaction." [ref=e212]'
            - generic [ref=e213]:
              - generic [ref=e214]: Screenshot of Payment Confirmation
              - generic [ref=e215]:
                - strong [ref=e216]: "Where to find:"
                - text: Take a full screen capture showing the timestamp, amount, and recipient name.
              - generic [ref=e217]:
                - strong [ref=e218]: "Why it matters:"
                - text: Serves as visual verification of the transaction.
          - generic [ref=e219] [cursor=pointer]:
            - 'checkbox "Screenshots of Threat, SMS, or Chat Messages Where to find: Capture the full conversation thread before blocking or deleting. Why it matters: Documents the deception or intimidation method used." [ref=e220]'
            - generic [ref=e221]:
              - generic [ref=e222]: Screenshots of Threat, SMS, or Chat Messages
              - generic [ref=e223]:
                - strong [ref=e224]: "Where to find:"
                - text: Capture the full conversation thread before blocking or deleting.
              - generic [ref=e225]:
                - strong [ref=e226]: "Why it matters:"
                - text: Documents the deception or intimidation method used.
          - generic [ref=e227] [cursor=pointer]:
            - 'checkbox "Acknowledgement Number from cybercrime.gov.in Where to find: Received on screen, via SMS, and email after submitting your complaint on the national portal. Why it matters: Required by banks when filing formal dispute paperwork." [ref=e228]'
            - generic [ref=e229]:
              - generic [ref=e230]: Acknowledgement Number from cybercrime.gov.in
              - generic [ref=e231]:
                - strong [ref=e232]: "Where to find:"
                - text: Received on screen, via SMS, and email after submitting your complaint on the national portal.
              - generic [ref=e233]:
                - strong [ref=e234]: "Why it matters:"
                - text: Required by banks when filing formal dispute paperwork.
        - generic [ref=e235]:
          - generic [ref=e236]: Notes for speaking with the 1930 operator (Saved only in this browser)
          - textbox "Notes for speaking with the 1930 operator (Saved only in this browser)" [ref=e237]:
            - /placeholder: Type reference numbers or phone numbers here to keep them in front of you while speaking with the operator...
          - generic [ref=e238]: Never type sensitive PINs, OTPs, or passwords here.
        - generic [ref=e243]:
          - generic [ref=e244]: "Shared device tip: If you are using a shared or public computer, click 'Clear Saved Checklist' before closing this window."
          - button "Clear Saved Checklist and Notes" [ref=e246] [cursor=pointer]
    - contentinfo [ref=e251]:
      - generic [ref=e252]:
        - generic [ref=e253]:
          - generic [ref=e254]:
            - generic [ref=e255]: CyberRakshak
            - paragraph [ref=e259]: Empowering Indian citizens, families, and seniors to recognize cyber deception safely through hands-on educational simulations.
            - generic [ref=e260]: 100% Client-Side. No personal banking credentials collected.
          - generic [ref=e265]:
            - generic [ref=e266]: Verified Government & Regulatory Portals
            - list [ref=e267]:
              - listitem [ref=e268]:
                - link "National Cyber Crime Reporting Portal" [ref=e269] [cursor=pointer]:
                  - /url: https://cybercrime.gov.in
              - listitem [ref=e275]:
                - link "Chakshu (DoT Sanchar Saathi)" [ref=e276] [cursor=pointer]:
                  - /url: https://sancharsaathi.gov.in/sfc/
              - listitem [ref=e282]:
                - link "RBI Sachet Portal" [ref=e283] [cursor=pointer]:
                  - /url: https://sachet.rbi.org.in
              - listitem [ref=e289]:
                - link "RBI Complaint Management System (CMS)" [ref=e290] [cursor=pointer]:
                  - /url: https://cms.rbi.org.in
          - generic [ref=e296]:
            - generic [ref=e297]: Emergency Helplines
            - generic [ref=e298]:
              - generic [ref=e299]:
                - generic [ref=e300]: "National Cyber Helpline:"
                - link "1930 (Toll Free, 24x7)" [ref=e301] [cursor=pointer]:
                  - /url: tel:1930
              - generic [ref=e302]:
                - generic [ref=e303]: "National Emergency:"
                - link "112 (Police / Emergency)" [ref=e304] [cursor=pointer]:
                  - /url: tel:112
              - generic [ref=e305]:
                - generic [ref=e306]: "RBI Ombudsman:"
                - link "14440" [ref=e307] [cursor=pointer]:
                  - /url: tel:14440
        - generic [ref=e308]:
          - generic [ref=e309]: Trust & Safety Disclaimer
          - paragraph [ref=e310]: CyberRakshak is an independent, non-commercial public education initiative built for Indian citizens. All scam simulations and sender details shown are fictional for training purposes. We never ask for your real OTPs, bank credentials, or UPI PINs. If you have lost money to fraud, report immediately to the National Cyber Crime Portal or call 1930.
        - generic [ref=e311]:
          - generic [ref=e312]: © 2026 CyberRakshak Public Awareness Initiative. MIT Licensed educational resource.
          - generic [ref=e313]:
            - generic [ref=e314]: Built with zero tracking
            - generic [aria-hidden] [ref=e315]: •
            - generic [ref=e316]: WCAG 2.1 AA Compliant
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
     |                                                                                         ^ Error: Horizontal scroll detected on /emergency-assist at 360px
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