import { createRoot } from 'react-dom/client';
import App from './App.tsx';

// Self-hosted fonts via Fontsource (with font-display: swap built in)
import '@fontsource/cormorant-garamond/500.css';
import '@fontsource/cormorant-garamond/600.css';
import '@fontsource/cormorant-garamond/700.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/noto-sans-devanagari/400.css';
import '@fontsource/noto-sans-devanagari/600.css';
import '@fontsource/noto-sans-devanagari/700.css';
import '@fontsource/noto-serif-devanagari/600.css';
import '@fontsource/noto-serif-devanagari/700.css';

// Localization and key parity initialization
import './i18n/index.ts';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);
