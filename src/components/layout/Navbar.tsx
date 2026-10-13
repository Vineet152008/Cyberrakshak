import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Shield, PhoneCall, Globe, Menu, X, Eye, EyeOff } from 'lucide-react';
import { useCalmMode } from '../../context/CalmModeContext';
import { stripLangPrefix, updateHreflangTags } from '../../utils/seoLocale';

export const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { isCalmMode, toggleCalmMode } = useCalmMode();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentLang = i18n.language || 'en';
  const { pathWithoutLang } = stripLangPrefix(location.pathname);

  const getLocalizedPath = (path: string, lang = currentLang) => {
    if (lang === 'en') return path;
    return `/${lang}${path === '/' ? '' : path}`;
  };

  const navLinks = [
    { to: getLocalizedPath('/scam-lab'), rawTo: '/scam-lab', label: t('nav.scamLab') },
    { to: getLocalizedPath('/emergency-assist'), rawTo: '/emergency-assist', label: t('nav.emergencyAssist') },
    { to: getLocalizedPath('/message-checker'), rawTo: '/message-checker', label: t('nav.messageChecker') },
    { to: getLocalizedPath('/academy'), rawTo: '/academy', label: t('nav.academy') },
    { to: getLocalizedPath('/toolkit'), rawTo: '/toolkit', label: t('nav.toolkit') },
  ];

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
    try {
      localStorage.setItem('cyberrakshak_lang', lng);
    } catch {
      // Storage access resilience
    }
    const newPath = getLocalizedPath(pathWithoutLang, lng);
    navigate(newPath);
    updateHreflangTags(pathWithoutLang);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[rgba(201,169,110,0.18)] bg-[#070B14]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <Link
          to={getLocalizedPath('/')}
          className="flex items-center gap-2.5 text-lg md:text-xl font-bold tracking-tight text-[#F8FAFC] whitespace-nowrap shrink-0 group focus-visible:outline-2 focus-visible:outline-[#C9A96E]"
        >
          <div className="w-8 h-8 rounded-lg bg-[rgba(201,169,110,0.15)] border border-[rgba(201,169,110,0.35)] flex items-center justify-center text-[#C9A96E] group-hover:border-[#C9A96E] transition-colors">
            <Shield className="w-4 h-4" aria-hidden="true" />
          </div>
          <span className="font-display font-bold tracking-wide">{t('brand.name')}</span>
        </Link>

        {/* Zone 2: Single-line clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#CBD5E1]" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = pathWithoutLang === link.rawTo;
            return (
              <Link
                key={link.rawTo}
                to={link.to}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                  isActive
                    ? 'text-[#C9A96E] font-semibold border-b-2 border-[#C9A96E]'
                    : 'hover:text-[#F8FAFC]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action + Controls */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Language Selector */}
          <div className="relative flex items-center bg-[#0D1322] border border-[rgba(201,169,110,0.2)] rounded-lg px-2 py-1 text-xs">
            <Globe className="w-3.5 h-3.5 text-[#C9A96E] mr-1.5" aria-hidden="true" />
            <select
              value={currentLang}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="bg-transparent text-[#CBD5E1] focus:outline-none cursor-pointer"
              aria-label={t('nav.langLabel')}
            >
              <option value="en" className="bg-[#070B14] text-[#F8FAFC]">{t('nav.langEn')}</option>
              <option value="hi" className="bg-[#070B14] text-[#F8FAFC]">{t('nav.langHi')}</option>
              <option value="mr" className="bg-[#070B14] text-[#F8FAFC]">{t('nav.langMr')}</option>
            </select>
          </div>

          {/* Calm Mode Quick Toggle */}
          <button
            onClick={toggleCalmMode}
            className={`p-2 rounded-lg border text-xs transition-colors cursor-pointer flex items-center gap-1.5 ${
              isCalmMode
                ? 'bg-[#C9A96E]/20 text-[#C9A96E] border-[#C9A96E]'
                : 'bg-[#0D1322] text-[#94A3B8] border-[rgba(255,255,255,0.08)] hover:text-[#F8FAFC]'
            }`}
            aria-label={isCalmMode ? t('common.calmModeOn') : t('common.calmModeOff')}
            title={t('common.calmModeTitle')}
          >
            {isCalmMode ? (
              <EyeOff className="w-4 h-4 text-[#C9A96E]" aria-hidden="true" />
            ) : (
              <Eye className="w-4 h-4" aria-hidden="true" />
            )}
            <span className="hidden sm:inline font-mono text-xs">
              {isCalmMode ? 'CALM' : 'CALM'}
            </span>
          </button>

          {/* Single High-Contrast Emergency 1930 Call CTA */}
          <a
            href="tel:1930"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-bold transition-colors focus-visible:outline-[#E11D48] shadow-sm"
          >
            <PhoneCall className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t('nav.emergencyCta')}</span>
          </a>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#CBD5E1] hover:text-white bg-[#0D1322] border border-[rgba(255,255,255,0.08)] cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[rgba(255,255,255,0.08)] bg-[#070B14] px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.rawTo}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathWithoutLang === link.rawTo
                    ? 'bg-[#131B2E] text-[#C9A96E]'
                    : 'text-[#CBD5E1] hover:bg-[#0D1322]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-3 border-t border-[rgba(255,255,255,0.06)] space-y-3">
            <div className="flex items-center justify-between text-xs text-[#CBD5E1]">
              <span>{t('nav.langLabel')}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    handleLanguageChange('en');
                    setMobileMenuOpen(false);
                  }}
                  className={`px-2 py-1 rounded text-xs ${
                    currentLang === 'en'
                      ? 'bg-[#C9A96E] text-[#070B14] font-bold'
                      : 'bg-[#131B2E] text-[#CBD5E1]'
                  }`}
                >
                  {t('nav.langEn')}
                </button>
                <button
                  onClick={() => {
                    handleLanguageChange('hi');
                    setMobileMenuOpen(false);
                  }}
                  className={`px-2 py-1 rounded text-xs ${
                    currentLang === 'hi'
                      ? 'bg-[#C9A96E] text-[#070B14] font-bold'
                      : 'bg-[#131B2E] text-[#CBD5E1]'
                  }`}
                >
                  {t('nav.langHi')}
                </button>
                <button
                  onClick={() => {
                    handleLanguageChange('mr');
                    setMobileMenuOpen(false);
                  }}
                  className={`px-2 py-1 rounded text-xs ${
                    currentLang === 'mr'
                      ? 'bg-[#C9A96E] text-[#070B14] font-bold'
                      : 'bg-[#131B2E] text-[#CBD5E1]'
                  }`}
                >
                  {t('nav.langMr')}
                </button>
              </div>
            </div>

            <a
              href="tel:1930"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold rounded-lg bg-[#E11D48] text-white hover:bg-[#BE123C]"
            >
              <PhoneCall className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t('nav.emergencyCta')}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
