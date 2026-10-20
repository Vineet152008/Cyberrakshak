import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HeroShield } from '../components/home/HeroShield';
import { ThreatRadar } from '../components/home/ThreatRadar';
import { QuickActionStrip } from '../components/home/QuickActionStrip';
import { MagneticButton } from '../components/pointer/MagneticButton';
import { TiltCard } from '../components/pointer/TiltCard';
import { SCAM_PROFILES } from '../data/scams';
import { ScamProfile } from '../types/content';
import { AlertTriangle, ArrowRight, CheckCircle2, PhoneCall, Lock, X, ShieldAlert } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const [selectedThreat, setSelectedThreat] = useState<ScamProfile>(SCAM_PROFILES[0]);
  const [activeGuideScam, setActiveGuideScam] = useState<ScamProfile | null>(null);

  return (
    <div className="relative overflow-hidden">
      {/* Background Subtle Technical Grid & Grain */}
      <div className="pointer-events-none absolute inset-0 bg-tech-grid opacity-30" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-grain" aria-hidden="true" />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Hero Copy & Actions (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#C9A96E]">
              <span className="w-2 h-2 rounded-full bg-[#C9A96E]" aria-hidden="true" />
              <span>{t('hero.kicker')}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-[#F8FAFC] tracking-tight leading-[1.08] text-balance">
              {t('hero.title')}
            </h1>

            <p className="text-base sm:text-lg text-[#CBD5E1] max-w-2xl leading-relaxed">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link to="/scam-lab">
                <MagneticButton variant="primary" className="w-full sm:w-auto px-7 py-3 text-base">
                  <span>{t('hero.ctaEnterLab')}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </MagneticButton>
              </Link>

              <Link to="/emergency-assist">
                <MagneticButton variant="danger" className="w-full sm:w-auto px-6 py-3 text-base">
                  <PhoneCall className="w-4 h-4 mr-1.5" />
                  <span>{t('hero.ctaScammed')}</span>
                </MagneticButton>
              </Link>
            </div>

            <div className="pt-6 border-t border-[rgba(201,169,110,0.15)] flex flex-wrap items-center gap-6 text-xs text-[#94A3B8]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                <span>{t('home.guaranteeNoLogin')}</span>
              </div>
              <span className="text-[#64748B]" aria-hidden="true">&middot;</span>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#C9A96E]" />
                <span>{t('home.guaranteeInBrowser')}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Central Tilting SVG Security Shield (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <HeroShield />
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 pb-24">
        {/* Flagship Modules Strip */}
        <QuickActionStrip />

        {/* Interactive Threat Radar Section */}
        <ThreatRadar onSelectScam={(scam) => setSelectedThreat(scam)} />

        {/* Featured Common Fraud Traps Grid */}
        <section aria-labelledby="common-scams-heading">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#C9A96E] font-medium">
                {t('home.atlasBadge')}
              </span>
              <h2 id="common-scams-heading" className="text-2xl md:text-3xl font-display font-bold text-[#F8FAFC] mt-1">
                {t('home.atlasTitle')}
              </h2>
              <p className="text-sm text-[#94A3B8] max-w-xl mt-1">
                {t('home.atlasSubtitle')}
              </p>
            </div>

            <Link
              to="/scam-lab"
              className="text-xs font-semibold text-[#C9A96E] hover:text-[#E4D1A8] inline-flex items-center gap-1 self-start md:self-auto"
            >
              <span>{t('home.atlasPracticeCta')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SCAM_PROFILES.map((scam) => {
              const isSelected = selectedThreat.id === scam.id;
              return (
                <TiltCard
                  key={scam.id}
                  className={`flex flex-col justify-between cursor-pointer transition-all hover:border-[rgba(201,169,110,0.4)] ${
                    isSelected ? 'ring-1 ring-[#C9A96E] bg-[#131B2E]' : ''
                  }`}
                  onClick={() => {
                    setSelectedThreat(scam);
                    setActiveGuideScam(scam);
                  }}
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#94A3B8] mb-2.5">
                      <span className="font-semibold" style={{ color: scam.threatSeverity === 'critical' ? '#F43F5E' : '#C9A96E' }}>
                        {scam.threatSeverity.toUpperCase()}
                      </span>
                      <span aria-hidden="true">&middot;</span>
                      <span>{scam.fictionalSample.channel}</span>
                    </div>

                    <h3 className="text-base font-bold text-[#F8FAFC] mb-2 leading-snug">
                      {t(scam.shortKey)}
                    </h3>

                    <p className="text-xs text-[#CBD5E1] line-clamp-3 leading-relaxed mb-4">
                      {t(scam.summaryKey)}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[rgba(201,169,110,0.12)] flex items-center justify-between text-xs">
                    <span className="text-[#94A3B8] font-mono">{t('home.atlasHowItWorks')}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedThreat(scam);
                        setActiveGuideScam(scam);
                      }}
                      className="text-[#C9A96E] hover:text-[#E4D1A8] font-medium hover:underline cursor-pointer focus-visible:outline-[#C9A96E]"
                    >
                      {t('home.atlasViewGuide')}
                    </button>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </section>

        {/* Reassurance Banner */}
        <section
          aria-labelledby="victim-support-heading"
          className="rounded-2xl border border-[rgba(244,63,94,0.35)] bg-gradient-to-r from-[#131B2E] to-[#0D1322] p-8 md:p-10 relative overflow-hidden"
        >
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#F43F5E]">
              <AlertTriangle className="w-4 h-4 text-[#F43F5E]" />
              <span>{t('home.reassuranceBadge')}</span>
            </div>
            <h2 id="victim-support-heading" className="text-2xl md:text-3xl font-display font-bold text-[#F8FAFC]">
              {t('home.reassuranceTitle')}
            </h2>
            <p className="text-sm md:text-base text-[#CBD5E1] leading-relaxed">
              {t('home.reassuranceText')}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="tel:1930"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#F43F5E] hover:bg-[#E11D48] text-white text-sm font-semibold transition-colors"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{t('home.reassuranceCall1930')}</span>
              </a>
              <Link
                to="/emergency-assist"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#070B14] hover:bg-[#131B2E] text-[#F8FAFC] text-sm font-medium border border-[rgba(201,169,110,0.3)] transition-colors"
              >
                <span>{t('home.reassuranceWhatToDo')}</span>
                <ArrowRight className="w-4 h-4 text-[#C9A96E]" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Interactive Threat Guide Modal */}
      {activeGuideScam && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="threat-guide-modal-title"
          className="fixed inset-0 z-50 bg-[#070B14]/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
        >
          <div className="relative w-full max-w-2xl bg-[#0D1322] border border-[rgba(201,169,110,0.35)] rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl my-8">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-[rgba(201,169,110,0.18)] pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#94A3B8] mb-1">
                  <span
                    className="font-bold uppercase tracking-wider text-[11px]"
                    style={{ color: activeGuideScam.threatSeverity === 'critical' ? '#F43F5E' : '#C9A96E' }}
                  >
                    {activeGuideScam.threatSeverity.toUpperCase()}
                  </span>
                  <span aria-hidden="true">&middot;</span>
                  <span>{activeGuideScam.fictionalSample.channel}</span>
                </div>
                <h2 id="threat-guide-modal-title" className="text-2xl font-display font-bold text-[#F8FAFC]">
                  {t(activeGuideScam.titleKey)}
                </h2>
              </div>

              <button
                onClick={() => setActiveGuideScam(null)}
                className="p-2 rounded-lg text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#131B2E] transition-colors cursor-pointer"
                aria-label={t('common.closeModal')}
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Fictional Sample Message Box */}
            <div className="p-4 rounded-xl bg-[#070B14] border border-[rgba(201,169,110,0.2)] space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#94A3B8]">
                <span>{t('home.atlasBadge')} ({activeGuideScam.fictionalSample.channel})</span>
                <span className="text-[#F43F5E] font-semibold">{t(activeGuideScam.fictionalSample.senderKey)}</span>
              </div>
              <p className="text-xs sm:text-sm text-[#CBD5E1] font-mono leading-relaxed bg-[#131B2E] p-3 rounded-lg border border-[rgba(255,255,255,0.05)]">
                "{t(activeGuideScam.fictionalSample.textKey)}"
              </p>
            </div>

            {/* How It Works & Deceptive Mechanism */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#C9A96E]">
                {t('home.atlasHowItWorks')}
              </h3>
              <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                {t(activeGuideScam.howItWorksKey)}
              </p>
            </div>

            {/* Deceptive Hooks */}
            <div className="space-y-1.5 text-xs sm:text-sm text-[#CBD5E1]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8] block">
                {t('home.atlasTriggersTitle')}
              </span>
              <p className="leading-relaxed bg-[#131B2E] p-3 rounded-lg border border-[rgba(255,255,255,0.05)] text-[#CBD5E1]">
                {t(activeGuideScam.hooksKey)}
              </p>
            </div>

            {/* Golden Rule Callout Box */}
            <div className="p-4 rounded-xl border border-[rgba(201,169,110,0.3)] bg-[rgba(201,169,110,0.08)] text-[#E4D1A8] text-xs sm:text-sm font-semibold leading-relaxed flex items-start gap-2.5">
              <ShieldAlert className="w-5 h-5 text-[#C9A96E] shrink-0 mt-0.5" aria-hidden="true" />
              <div>{t(activeGuideScam.goldenRuleKey)}</div>
            </div>

            {/* Immediate Action Protocol */}
            <div className="space-y-2 pt-2 border-t border-[rgba(201,169,110,0.15)]">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#10B981]">
                {t('home.atlasProtocolTitle')}
              </h3>
              <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                {t(activeGuideScam.immediateActionKey)}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-4 border-t border-[rgba(201,169,110,0.18)]">
              <Link
                to="/scam-lab"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#C9A96E] hover:bg-[#E4D1A8] text-[#070B14] font-bold text-xs sm:text-sm transition-colors cursor-pointer"
              >
                <span>{t('home.atlasPracticeCta')}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <button
                type="button"
                onClick={() => setActiveGuideScam(null)}
                className="px-5 py-2.5 rounded-xl bg-[#131B2E] hover:bg-[#1E293B] text-[#F8FAFC] font-semibold text-xs sm:text-sm border border-[rgba(255,255,255,0.08)] transition-colors cursor-pointer"
              >
                {t('common.closeModal')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
