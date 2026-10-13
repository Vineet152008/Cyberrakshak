# CyberRakshak (साइबर रक्षक)

**A Cyber-Fraud Awareness and Citizen Safety Platform for Indian Citizens.**

Designed for first-time smartphone users, families, and senior citizens to recognize deceptive patterns safely, practice spotting red flags in interactive simulations, and receive step-by-step guidance during emergencies.

---

## ⚠️ Important Translation Notice
> **Notice regarding Hindi (हिन्दी) & Marathi (मराठी) Translations:**
> The Hindi (`hi`) and Marathi (`mr`) translations for Emergency Assist and educational content are machine-assisted translations and **require native speaker review and verification by cyber-legal authorities** before production deployment.

---

## Architecture & Design Principles

1. **Aesthetic:** Midnight Cyber-Intelligence
   - Deep navy background (`#070B14`, `#0D1322`)
   - Champagne gold brand accent (`#C9A96E`)
   - Restrained cyan indicator (`#38BDF8`)
   - Emergency rose callout (`#BE123C`)
   - High-contrast typography: Cormorant Garamond display serif, Inter body sans, Noto Serif Devanagari (Devanagari headings), Noto Sans Devanagari (Devanagari body).

2. **Accessibility & WCAG AA/AAA Compliance:**
   - Body text >= 16px throughout.
   - Interactive touch targets >= 44px x 44px.
   - All color pairs strictly verified for WCAG AA/AAA contrast:
     - Crisp text (`#F8FAFC`) on Midnight (`#070B14`): **19.3 : 1** (WCAG AAA)
     - Secondary silver (`#CBD5E1`) on Midnight (`#070B14`): **13.6 : 1** (WCAG AAA)
     - Gold brand (`#C9A96E`) on Midnight (`#070B14`): **8.87 : 1** (WCAG AAA)
     - Emergency button text (`#FFFFFF`) on Rose (`#BE123C`): **~6.31 : 1** (WCAG AA normal, AAA large)
   - WAI-ARIA compliant tab patterns with full keyboard navigation (ArrowLeft, ArrowRight, Home, End).
   - Dynamic `aria-live="polite"` feedback on state changes.
   - Respects `prefers-reduced-motion` and includes a persistent **Calm Mode** that disables all animations, glows, and spotlights.

3. **Client-Side Privacy Protection:**
   - Zero telemetry, tracking, or analytics scripts.
   - No cookies, external analytics SDKs, or remote tracking.
   - Evidence checklists, simulation progress, and private notes run strictly inside the user's browser, with an explicit confirmation step to wipe all local data at any time.

4. **Emergency Grounding:**
   - Direct integration with India's National Cyber Crime Helpline **1930** (24x7 toll-free).
   - Direct links to the Ministry of Home Affairs portal **cybercrime.gov.in** and DoT **Chakshu** facility (`sancharsaathi.gov.in/sfc`).
   - Clear disclaimer that halting bank transfers or recovering money cannot be guaranteed, setting realistic expectations while urging prompt reporting.
