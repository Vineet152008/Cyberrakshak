import React, { useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { stripLangPrefix, updateHreflangTags, isSupportedLang } from '../../utils/seoLocale';

export const LanguageRouteSync: React.FC = () => {
  const location = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    const { lang, pathWithoutLang } = stripLangPrefix(location.pathname);

    if (lang && isSupportedLang(lang) && i18n.language !== lang) {
      i18n.changeLanguage(lang);
      try {
        localStorage.setItem('cyberrakshak_lang', lang);
      } catch {
        // Resilience
      }
    }

    updateHreflangTags(pathWithoutLang);
  }, [location.pathname, i18n]);

  return <Outlet />;
};
