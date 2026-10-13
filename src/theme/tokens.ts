/**
 * CyberRakshak Design System Tokens
 * 
 * Aesthetic: Midnight Cyber-Intelligence
 * Palette: Near-black navy (#070B14), Champagne Gold (#C9A96E), Muted Silver (#94A3B8), Restrained Cyan (#38BDF8)
 * Display Serif: Cormorant Garamond
 * Body Sans: Inter
 */

export const THEME_COLORS = {
  // Midnight Navy Palette
  navy: {
    base: '#070B14',      // 60% neutral canvas
    surface: '#0D1322',   // 30% structural surfaces
    elevated: '#131B2E',  // Card elevated level
    hover: '#1A243D',
    border: 'rgba(201, 169, 110, 0.18)',
    borderSubtle: 'rgba(255, 255, 255, 0.08)',
  },

  // Champagne Gold Accent (10% high-intent focal points)
  gold: {
    primary: '#C9A96E',
    light: '#E4D1A8',
    dark: '#9E7E45',
    subtle: 'rgba(201, 169, 110, 0.12)',
    border: 'rgba(201, 169, 110, 0.35)',
    glow: 'rgba(201, 169, 110, 0.25)',
  },

  // Restrained Cyan Accent
  cyan: {
    primary: '#38BDF8',
    subtle: 'rgba(56, 189, 248, 0.12)',
    border: 'rgba(56, 189, 248, 0.3)',
  },

  // Semantic Status Colors (WCAG AA Compliant)
  semantic: {
    crimson: '#F43F5E',      // Danger / High Threat / Red Flags
    crimsonBg: 'rgba(244, 63, 94, 0.12)',
    emerald: '#10B981',      // Safe / Verified / Best Practice
    emeraldBg: 'rgba(16, 185, 129, 0.12)',
    amber: '#F59E0B',        // Caution / Medium Suspicion
    amberBg: 'rgba(245, 158, 11, 0.12)',
  },

  // Typography Scales
  text: {
    primary: '#F8FAFC',
    secondary: '#CBD5E1',
    muted: '#94A3B8',
    faint: '#64748B',
  }
} as const;

export const TYPOGRAPHY = {
  fontDisplay: '"Cormorant Garamond", Georgia, serif',
  fontBody: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontMono: '"JetBrains Mono", ui-monospace, SFMono-Regular, monospace',
  scale: {
    hero: 'clamp(2.5rem, 5vw, 4.25rem)',
    h1: 'clamp(2rem, 3.5vw, 3rem)',
    h2: 'clamp(1.5rem, 2.5vw, 2.25rem)',
    h3: '1.25rem',
    bodyLg: '1.125rem',
    body: '1rem',
    caption: '0.875rem',
    tiny: '0.75rem',
  }
} as const;

export const MOTION = {
  curveSmooth: [0.16, 1, 0.3, 1], // Cubic-bezier for slick responsive feedback
  springQuick: { type: 'spring', stiffness: 400, damping: 28 },
  springGentle: { type: 'spring', stiffness: 260, damping: 20 },
  transitionDuration: 0.2, // routine feedback <= 200ms
} as const;

export const POINTER_EFFECTS = {
  // Spotlight properties
  spotlightRadius: 650,
  spotlightOpacity: 0.18,
  
  // Card 3D tilt max degrees
  maxTiltDegrees: 8,
  glareIntensity: 0.14,
  
  // Hero shield tilt max degrees
  shieldMaxTilt: 12,
  
  // Magnetic button displacement max px
  magneticRadius: 60,
  magneticPull: 0.28,
} as const;
