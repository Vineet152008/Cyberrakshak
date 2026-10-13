/**
 * SEO & hreflang management utility for multilingual URLs (/en/..., /hi/..., /mr/...)
 */

export const SUPPORTED_LANGUAGES = ['en', 'hi', 'mr'] as const;
export type SupportedLang = (typeof SUPPORTED_LANGUAGES)[number];

export const isSupportedLang = (l: string | undefined): l is SupportedLang => {
  return typeof l === 'string' && (SUPPORTED_LANGUAGES as readonly string[]).includes(l);
};

export const updateHreflangTags = (currentPathWithoutLang: string) => {
  if (typeof document === 'undefined') return;

  const origin = window.location.origin;
  const cleanPath = currentPathWithoutLang.startsWith('/')
    ? currentPathWithoutLang
    : `/${currentPathWithoutLang}`;

  const langConfigs = [
    { lang: 'en', href: `${origin}/en${cleanPath === '/' ? '' : cleanPath}` },
    { lang: 'hi', href: `${origin}/hi${cleanPath === '/' ? '' : cleanPath}` },
    { lang: 'mr', href: `${origin}/mr${cleanPath === '/' ? '' : cleanPath}` },
    { lang: 'x-default', href: `${origin}${cleanPath}` },
  ];

  // Remove existing alternate links
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());

  // Add updated alternate links
  langConfigs.forEach(({ lang, href }) => {
    const link = document.createElement('link');
    link.rel = 'alternate';
    link.hreflang = lang;
    link.href = href;
    document.head.appendChild(link);
  });
};

export const stripLangPrefix = (pathname: string): { lang?: SupportedLang; pathWithoutLang: string } => {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length > 0 && isSupportedLang(parts[0])) {
    const lang = parts[0] as SupportedLang;
    const pathWithoutLang = '/' + parts.slice(1).join('/');
    return { lang, pathWithoutLang: pathWithoutLang === '' ? '/' : pathWithoutLang };
  }
  return { pathWithoutLang: pathname || '/' };
};
