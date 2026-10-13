import React from 'react';
import { PhoneCall, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const EmergencyBanner: React.FC = () => {
  const { t } = useTranslation();

  return (
    <aside
      aria-label={t('common.emergencyBannerLabel')}
      className="bg-[#0D1322] border-b border-[rgba(201,169,110,0.2)] px-4 py-2 text-xs text-[#CBD5E1]"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-[#E11D48]" aria-hidden="true" />
          <span className="font-semibold text-[#F8FAFC]">
            {t('home.emergencyBannerDebited')}
          </span>
          <span className="hidden md:inline text-[#CBD5E1]">
            {t('home.emergencyBannerPrompt')}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="tel:1930"
            className="inline-flex items-center gap-1.5 font-bold text-[#FDA4AF] hover:text-[#FFFFFF] transition-colors focus-visible:outline-[#C9A96E]"
          >
            <PhoneCall className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t('home.emergencyBannerCall')}</span>
          </a>

          <span className="text-[#64748B]" aria-hidden="true">|</span>

          <a
            href="https://cybercrime.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#C9A96E] hover:text-[#E4D1A8] transition-colors"
          >
            <span lang="en">{t('home.emergencyBannerPortal')}</span>
            <ExternalLink className="w-3 h-3" aria-hidden="true" />
            <span className="sr-only">{t('common.opensInNewTab')}</span>
          </a>

          <span className="text-[#64748B]" aria-hidden="true">|</span>

          <Link
            to="/emergency-assist"
            className="text-[#38BDF8] hover:text-[#7DD3FC] font-medium transition-colors"
          >
            {t('home.emergencyBannerStepByStep')}
          </Link>
        </div>
      </div>
    </aside>
  );
};
