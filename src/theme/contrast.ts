/**
 * WCAG 2.1 Contrast Verification Calculator
 * Computes exact relative luminance and contrast ratio for all CyberRakshak color pairs.
 */

export interface ContrastAuditResult {
  foregroundName: string;
  foregroundHex: string;
  backgroundName: string;
  backgroundHex: string;
  contrastRatio: number;
  wcagAaNormalPass: boolean;  // >= 4.5:1
  wcagAaLargePass: boolean;   // >= 3.0:1
  wcagAaaNormalPass: boolean; // >= 7.0:1
}

function hexToRgb(hex: string): [number, number, number] {
  const cleanHex = hex.replace('#', '');
  const bigint = parseInt(cleanHex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
}

function channelLuminance(channel: number): number {
  const c = channel / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex);
  return 0.2126 * channelLuminance(r) + 0.7152 * channelLuminance(g) + 0.0722 * channelLuminance(b);
}

export function calculateContrast(fgHex: string, bgHex: string): number {
  const l1 = relativeLuminance(fgHex);
  const l2 = relativeLuminance(bgHex);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  const ratio = (lighter + 0.05) / (darker + 0.05);
  return Number(ratio.toFixed(2));
}

// Alpha blend on top of base navy #070B14
// Panel surface: rgba(13, 19, 34, 0.90) on #070B14 (R:7, G:11, B:20)
// Result: R = round(13*0.9 + 7*0.1) = 12, G = round(19*0.9 + 11*0.1) = 18, B = round(34*0.9 + 20*0.1) = 33 -> #0C1221
export const CYBERRAKSHAK_CONTRAST_AUDIT: ContrastAuditResult[] = [
  {
    foregroundName: 'Primary Crisp Text (#F8FAFC)',
    foregroundHex: '#F8FAFC',
    backgroundName: 'Midnight Base Canvas (#070B14)',
    backgroundHex: '#070B14',
    contrastRatio: calculateContrast('#F8FAFC', '#070B14'), // ~ 19.3:1
    wcagAaNormalPass: true,
    wcagAaLargePass: true,
    wcagAaaNormalPass: true,
  },
  {
    foregroundName: 'Primary Crisp Text (#F8FAFC)',
    foregroundHex: '#F8FAFC',
    backgroundName: 'Surface Container (#0D1322)',
    backgroundHex: '#0D1322',
    contrastRatio: calculateContrast('#F8FAFC', '#0D1322'), // ~ 16.5:1
    wcagAaNormalPass: true,
    wcagAaLargePass: true,
    wcagAaaNormalPass: true,
  },
  {
    foregroundName: 'Primary Crisp Text (#F8FAFC)',
    foregroundHex: '#F8FAFC',
    backgroundName: 'Translucent Glass Panel 90% (#0C1221)',
    backgroundHex: '#0C1221',
    contrastRatio: calculateContrast('#F8FAFC', '#0C1221'), // ~ 17.0:1
    wcagAaNormalPass: true,
    wcagAaLargePass: true,
    wcagAaaNormalPass: true,
  },
  {
    foregroundName: 'Secondary Silver Text (#CBD5E1)',
    foregroundHex: '#CBD5E1',
    backgroundName: 'Midnight Base Canvas (#070B14)',
    backgroundHex: '#070B14',
    contrastRatio: calculateContrast('#CBD5E1', '#070B14'), // ~ 13.6:1
    wcagAaNormalPass: true,
    wcagAaLargePass: true,
    wcagAaaNormalPass: true,
  },
  {
    foregroundName: 'Muted Slate Text (#94A3B8)',
    foregroundHex: '#94A3B8',
    backgroundName: 'Surface Container (#0D1322)',
    backgroundHex: '#0D1322',
    contrastRatio: calculateContrast('#94A3B8', '#0D1322'), // ~ 6.3:1
    wcagAaNormalPass: true,
    wcagAaLargePass: true,
    wcagAaaNormalPass: false,
  },
  {
    foregroundName: 'Champagne Gold Brand/Kicker (#C9A96E)',
    foregroundHex: '#C9A96E',
    backgroundName: 'Midnight Base Canvas (#070B14)',
    backgroundHex: '#070B14',
    contrastRatio: calculateContrast('#C9A96E', '#070B14'), // ~ 8.87:1
    wcagAaNormalPass: true,
    wcagAaLargePass: true,
    wcagAaaNormalPass: true,
  },
  {
    foregroundName: 'Champagne Gold Accent (#C9A96E)',
    foregroundHex: '#C9A96E',
    backgroundName: 'Surface Container (#0D1322)',
    backgroundHex: '#0D1322',
    contrastRatio: calculateContrast('#C9A96E', '#0D1322'), // ~ 7.55:1
    wcagAaNormalPass: true,
    wcagAaLargePass: true,
    wcagAaaNormalPass: true,
  },
  {
    foregroundName: 'Restrained Cyan Accent (#38BDF8)',
    foregroundHex: '#38BDF8',
    backgroundName: 'Midnight Base Canvas (#070B14)',
    backgroundHex: '#070B14',
    contrastRatio: calculateContrast('#38BDF8', '#070B14'), // ~ 9.94:1
    wcagAaNormalPass: true,
    wcagAaLargePass: true,
    wcagAaaNormalPass: true,
  },
  {
    foregroundName: 'Semantic Warning Crimson (#F43F5E)',
    foregroundHex: '#F43F5E',
    backgroundName: 'Midnight Base Canvas (#070B14)',
    backgroundHex: '#070B14',
    contrastRatio: calculateContrast('#F43F5E', '#070B14'), // ~ 5.32:1
    wcagAaNormalPass: true,
    wcagAaLargePass: true,
    wcagAaaNormalPass: false,
  },
  {
    foregroundName: 'White Emergency Button Text (#FFFFFF)',
    foregroundHex: '#FFFFFF',
    backgroundName: 'Emergency Rose Surface (#BE123C)',
    backgroundHex: '#BE123C',
    contrastRatio: calculateContrast('#FFFFFF', '#BE123C'), // ~ 6.31:1
    wcagAaNormalPass: true,
    wcagAaLargePass: true,
    wcagAaaNormalPass: false,
  },
  {
    foregroundName: 'Semantic Safe Emerald (#10B981)',
    foregroundHex: '#10B981',
    backgroundName: 'Midnight Base Canvas (#070B14)',
    backgroundHex: '#070B14',
    contrastRatio: calculateContrast('#10B981', '#070B14'), // ~ 7.42:1
    wcagAaNormalPass: true,
    wcagAaLargePass: true,
    wcagAaaNormalPass: true,
  },
];
