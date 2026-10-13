import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LAB_SCENARIO_DEFS, QUIZ_QUESTION_DEFS } from '../data/scamLabData';
import { SpotlightReveal } from '../components/scamLab/SpotlightReveal';
import { BranchingSimulator } from '../components/scamLab/BranchingSimulator';
import { RedFlagQuiz } from '../components/scamLab/RedFlagQuiz';
import { useCalmMode } from '../context/CalmModeContext';
import i18n from '../i18n';
import scamLabEn from '../i18n/locales/scamLab/en.json';
import scamLabHi from '../i18n/locales/scamLab/hi.json';
import scamLabMr from '../i18n/locales/scamLab/mr.json';

// Route-level lazy loading of scamLab namespace
i18n.addResourceBundle('en', 'translation', scamLabEn, true, true);
i18n.addResourceBundle('hi', 'translation', scamLabHi, true, true);
i18n.addResourceBundle('mr', 'translation', scamLabMr, true, true);
import {
  Sparkles,
  Search,
  MessageSquare,
  Award,
  Shield,
  Zap,
  PhoneCall,
  Package,
  Layers,
  Lock,
  Info
} from 'lucide-react';

type LabMode = 'spotlight' | 'simulator' | 'quiz';

export const ScamLabPage: React.FC = () => {
  const { t } = useTranslation();
  const { isCalmMode } = useCalmMode();

  const [activeMode, setActiveMode] = useState<LabMode>('spotlight');
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(LAB_SCENARIO_DEFS[0].id);

  const activeScenario =
    LAB_SCENARIO_DEFS.find((s) => s.id === selectedScenarioId) || LAB_SCENARIO_DEFS[0];

  const getScenarioIcon = (id: string) => {
    switch (id) {
      case 'electricity_disconnect':
        return <Zap className="w-4 h-4 text-[#C9A96E]" aria-hidden="true" />;
      case 'courier_redelivery':
        return <Package className="w-4 h-4 text-[#10B981]" aria-hidden="true" />;
      case 'upi_collect_request':
        return <Layers className="w-4 h-4 text-[#38BDF8]" aria-hidden="true" />;
      case 'digital_arrest_notice':
        return <PhoneCall className="w-4 h-4 text-[#F43F5E]" aria-hidden="true" />;
      default:
        return <Shield className="w-4 h-4 text-[#C9A96E]" aria-hidden="true" />;
    }
  };

  return (
    <div className="relative py-8 md:py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* 1. Header with Partial Badge & Carefully Worded Privacy Notice */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C9A96E]">
            <Sparkles className="w-4 h-4 text-[#C9A96E]" aria-hidden="true" />
            <span>{t('scamLab.meta.badge')}</span>
          </div>

          {/* Partial Status Badge */}
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#C9A96E]/20 text-[#E4D1A8] border border-[#C9A96E]/40 font-semibold font-mono">
            {t('scamLab.meta.partialBadge')}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#F8FAFC]">
          {t('scamLab.meta.title')}
        </h1>

        <p className="text-base sm:text-lg text-[#CBD5E1] max-w-3xl leading-relaxed">
          {t('scamLab.meta.subtitle')}
        </p>

        {/* Development Status Notice & Restrained Privacy Guarantee */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <div className="flex-1 p-3.5 rounded-xl bg-[#0D1322] border border-[rgba(201,169,110,0.25)] flex items-start gap-3 text-xs sm:text-sm text-[#CBD5E1]">
            <Info className="w-4 h-4 text-[#C9A96E] shrink-0 mt-0.5" aria-hidden="true" />
            <span>{t('scamLab.meta.partialNotice')}</span>
          </div>

          <div className="flex-1 p-3.5 rounded-xl bg-[#131B2E] border border-[rgba(201,169,110,0.25)] flex items-start gap-3 text-xs sm:text-sm text-[#CBD5E1]">
            <Lock className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" aria-hidden="true" />
            <span>{t('scamLab.meta.privacyNotice')}</span>
          </div>
        </div>
      </div>

      {/* 2. Lab Mode Selector Tabs */}
      <div
        className="flex flex-wrap gap-3 border-b border-[rgba(201,169,110,0.2)] pb-4"
        role="tablist"
        aria-label="Scam Lab Mode Selection"
      >
        <button
          role="tab"
          aria-selected={activeMode === 'spotlight'}
          onClick={() => setActiveMode('spotlight')}
          className={`inline-flex items-center gap-2.5 px-5 py-3 rounded-xl text-base font-semibold transition-all cursor-pointer border focus-visible:outline-2 focus-visible:outline-[#C9A96E] ${
            activeMode === 'spotlight'
              ? 'bg-[#C9A96E] text-[#070B14] border-[#C9A96E] shadow-md font-bold'
              : 'bg-[#0D1322] text-[#CBD5E1] border-[rgba(201,169,110,0.2)] hover:bg-[#131B2E]'
          }`}
        >
          <Search className="w-4 h-4" aria-hidden="true" />
          <span>{t('scamLab.meta.tabSpotlight')}</span>
        </button>

        <button
          role="tab"
          aria-selected={activeMode === 'simulator'}
          onClick={() => setActiveMode('simulator')}
          className={`inline-flex items-center gap-2.5 px-5 py-3 rounded-xl text-base font-semibold transition-all cursor-pointer border focus-visible:outline-2 focus-visible:outline-[#C9A96E] ${
            activeMode === 'simulator'
              ? 'bg-[#C9A96E] text-[#070B14] border-[#C9A96E] shadow-md font-bold'
              : 'bg-[#0D1322] text-[#CBD5E1] border-[rgba(201,169,110,0.2)] hover:bg-[#131B2E]'
          }`}
        >
          <MessageSquare className="w-4 h-4" aria-hidden="true" />
          <span>{t('scamLab.meta.tabSimulator')}</span>
        </button>

        <button
          role="tab"
          aria-selected={activeMode === 'quiz'}
          onClick={() => setActiveMode('quiz')}
          className={`inline-flex items-center gap-2.5 px-5 py-3 rounded-xl text-base font-semibold transition-all cursor-pointer border focus-visible:outline-2 focus-visible:outline-[#C9A96E] ${
            activeMode === 'quiz'
              ? 'bg-[#C9A96E] text-[#070B14] border-[#C9A96E] shadow-md font-bold'
              : 'bg-[#0D1322] text-[#CBD5E1] border-[rgba(201,169,110,0.2)] hover:bg-[#131B2E]'
          }`}
        >
          <Award className="w-4 h-4" aria-hidden="true" />
          <span>{t('scamLab.meta.tabQuiz')}</span>
        </button>
      </div>

      {/* 3. Scenario Selector (for Spotlight and Simulator modes) */}
      {activeMode !== 'quiz' && (
        <div className="space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
            {t('scamLab.meta.selectScenario')}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {LAB_SCENARIO_DEFS.map((scenario) => {
              const isSelected = selectedScenarioId === scenario.id;
              const title = t(`scamLab.scenarios.${scenario.id}.title`);
              const category = t(`scamLab.scenarios.${scenario.id}.categoryLabel`);

              return (
                <button
                  key={scenario.id}
                  onClick={() => setSelectedScenarioId(scenario.id)}
                  className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-2 focus-visible:outline-2 focus-visible:outline-[#C9A96E] ${
                    isSelected
                      ? 'bg-[rgba(201,169,110,0.15)] border-[#C9A96E] shadow-sm'
                      : 'bg-[#0D1322] border-[rgba(201,169,110,0.2)] hover:bg-[#131B2E] text-[#CBD5E1]'
                  }`}
                  aria-pressed={isSelected}
                >
                  <div className="flex items-center justify-between">
                    <span className="p-1.5 rounded-lg bg-[#131B2E] border border-[rgba(201,169,110,0.2)]">
                      {getScenarioIcon(scenario.id)}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#1A243D] text-[#94A3B8] font-mono">
                      {scenario.channel}
                    </span>
                  </div>
                  <div>
                    <div className="text-xs text-[#94A3B8] font-medium">{category}</div>
                    <div className="text-sm font-bold text-[#F8FAFC] line-clamp-2 mt-0.5">
                      {title}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. Active Mode Content */}
      <div className="mt-8">
        {activeMode === 'spotlight' && (
          <SpotlightReveal scenario={activeScenario} />
        )}

        {activeMode === 'simulator' && (
          <BranchingSimulator scenario={activeScenario} />
        )}

        {activeMode === 'quiz' && (
          <RedFlagQuiz questions={QUIZ_QUESTION_DEFS} />
        )}
      </div>
    </div>
  );
};
