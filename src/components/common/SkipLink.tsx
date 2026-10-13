import React from 'react';
import { useTranslation } from 'react-i18next';

export const SkipLink: React.FC = () => {
  const { t } = useTranslation();

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#C9A96E] focus:text-[#070B14] focus:font-bold focus:rounded-lg focus:shadow-xl focus:outline-none"
    >
      {t('common.skipToMain')}
    </a>
  );
};
