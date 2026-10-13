import React from 'react';
import { useTranslation } from 'react-i18next';
import { Shield, ExternalLink, Lock } from 'lucide-react';
import { VERIFIED_RESOURCES } from '../../data/resources';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-[rgba(201,169,110,0.18)] bg-[#070B14] text-[#94A3B8] text-xs pt-12 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand & Mission Statement (5 cols) */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2 text-base font-bold text-[#F8FAFC]">
              <Shield className="w-5 h-5 text-[#C9A96E]" aria-hidden="true" />
              <span className="font-display">{t('brand.name')}</span>
            </div>
            <p className="text-sm text-[#CBD5E1] max-w-sm leading-relaxed">
              {t('home.footerTagline')}
            </p>
            <div className="flex items-center gap-2 text-xs text-[#10B981] pt-1">
              <Lock className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t('home.footerZeroBanking')}</span>
            </div>
          </div>

          {/* Verified Official Portals (4 cols) */}
          <div className="md:col-span-4 space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#C9A96E]">
              {t('home.footerPortalsHeading')}
            </div>
            <ul className="space-y-2 pt-1">
              {VERIFIED_RESOURCES.slice(0, 4).map((res) => (
                <li key={res.id}>
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#CBD5E1] hover:text-[#C9A96E] transition-colors"
                  >
                    <span>{t(res.titleKey)}</span>
                    <ExternalLink className="w-3 h-3 text-[#64748B]" aria-hidden="true" />
                    <span className="sr-only">{t('emergency.opensInNewTab')}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Help Contacts (3 cols) */}
          <div className="md:col-span-3 space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#C9A96E]">
              {t('home.footerHelplinesHeading')}
            </div>
            <div className="space-y-2 pt-1 text-xs">
              <div>
                <span className="text-[#F8FAFC] font-semibold block">{t('home.footerNationalCyber')}</span>
                <a href="tel:1930" className="text-[#F43F5E] font-bold text-sm hover:underline">
                  {t('home.footerCall1930')}
                </a>
              </div>
              <div>
                <span className="text-[#F8FAFC] font-semibold block">{t('home.footerNationalEmergency')}</span>
                <a href="tel:112" className="text-[#CBD5E1] hover:underline">
                  {t('home.footerCall112')}
                </a>
              </div>
              <div>
                <span className="text-[#F8FAFC] font-semibold block">{t('home.footerRbiOmbudsman')}</span>
                <a href="tel:14440" className="text-[#CBD5E1] hover:underline">
                  14440
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Statutory Trust & Safety Disclaimer Box */}
        <div className="p-4 rounded-xl border border-[rgba(201,169,110,0.15)] bg-[#0D1322] text-[#94A3B8] leading-relaxed">
          <div className="font-semibold text-xs text-[#C9A96E] uppercase tracking-wider mb-1">
            {t('footer.disclaimerTitle')}
          </div>
          <p>{t('footer.disclaimerText')}</p>
        </div>

        <div className="pt-4 border-t border-[rgba(255,255,255,0.06)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#64748B]">
          <div>
            {t('home.footerCopyright', { year: new Date().getFullYear() })}
          </div>
          <div className="flex items-center gap-4">
            <span>{t('home.footerZeroTracking')}</span>
            <span aria-hidden="true">&bull;</span>
            <span>{t('home.footerWcag')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
