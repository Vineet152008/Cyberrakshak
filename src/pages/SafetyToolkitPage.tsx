import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Wrench,
  CheckCircle2,
  Circle,
  AlertTriangle,
  PhoneCall,
  Printer,
  Share2,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  ShieldAlert,
  Smartphone,
  CreditCard,
  Lock,
  ExternalLink,
} from 'lucide-react';
import {
  TOOLKIT_CHECKLISTS,
  TRIAGE_QUESTIONS,
  ToolkitChecklistItem,
  TriageQuestion,
} from '../data/toolkitData';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { formatNumberLatn } from '../utils/formatters';
import i18n from '../i18n';
import toolkitEn from '../i18n/locales/toolkit/en.json';
import toolkitHi from '../i18n/locales/toolkit/hi.json';
import toolkitMr from '../i18n/locales/toolkit/mr.json';

// Route-level lazy loading of toolkit namespace
i18n.addResourceBundle('en', 'translation', toolkitEn, true, true);
i18n.addResourceBundle('hi', 'translation', toolkitHi, true, true);
i18n.addResourceBundle('mr', 'translation', toolkitMr, true, true);

export const SafetyToolkitPage: React.FC = () => {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState<'audit' | 'triage' | 'pocket'>('audit');
  const [completedItems, setCompletedItems] = useLocalStorage<string[]>(
    'cyberrakshak_toolkit_completed',
    []
  );
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const [selectedTriageId, setSelectedTriageId] = useState<string>(TRIAGE_QUESTIONS[0].id);
  const [copiedShareNotice, setCopiedShareNotice] = useState<boolean>(false);

  const totalItems = TOOLKIT_CHECKLISTS.length;
  const completedCount = completedItems.length;
  const auditScore = Math.round((completedCount / totalItems) * 100);

  const toggleItemCompleted = (id: string) => {
    if (completedItems.includes(id)) {
      setCompletedItems(completedItems.filter((i) => i !== id));
    } else {
      setCompletedItems([...completedItems, id]);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const shareData = {
      title: 'CyberRakshak — Citizen Cyber Safety Guide',
      text: 'Verified Indian emergency helplines & family cyber defense guide: National Helpline 1930, Emergency 112, Electricity 1912.',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User canceled share
      }
    } else {
      try {
        await navigator.clipboard.writeText(
          `${shareData.title}\n${shareData.text}\n${shareData.url}`
        );
        setCopiedShareNotice(true);
        setTimeout(() => setCopiedShareNotice(false), 3000);
      } catch {
        // Clipboard access resilience
      }
    }
  };

  const currentTriage =
    TRIAGE_QUESTIONS.find((q) => q.id === selectedTriageId) || TRIAGE_QUESTIONS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[rgba(201,169,110,0.18)]">
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-wider font-semibold text-[#C9A96E]">
            {t('toolkit.badge')}
          </span>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-[#F8FAFC]">
            {t('toolkit.pageTitle')}
          </h1>
          <p className="text-sm md:text-base text-[#94A3B8] max-w-2xl leading-relaxed">
            {t('toolkit.pageSubtitle')}
          </p>
        </div>

        {/* Action Tabs */}
        <div className="flex flex-wrap items-center gap-2 bg-[#0D1322] p-1.5 rounded-xl border border-[rgba(201,169,110,0.2)]">
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'audit'
                ? 'bg-[#C9A96E] text-[#070B14]'
                : 'text-[#94A3B8] hover:text-[#F8FAFC]'
            }`}
          >
            {t('toolkit.auditTab')}
          </button>
          <button
            onClick={() => setActiveTab('triage')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'triage'
                ? 'bg-[#C9A96E] text-[#070B14]'
                : 'text-[#94A3B8] hover:text-[#F8FAFC]'
            }`}
          >
            {t('toolkit.triageTab')}
          </button>
          <button
            onClick={() => setActiveTab('pocket')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'pocket'
                ? 'bg-[#C9A96E] text-[#070B14]'
                : 'text-[#94A3B8] hover:text-[#F8FAFC]'
            }`}
          >
            {t('toolkit.pocketGuideTab')}
          </button>
        </div>
      </div>

      {/* TAB 1: Device Security Audit */}
      {activeTab === 'audit' && (
        <div className="space-y-6">
          {/* Audit Score Card */}
          <div className="p-6 rounded-2xl border border-[rgba(201,169,110,0.25)] bg-[#0D1322] flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="text-xs uppercase tracking-wider font-semibold text-[#C9A96E]">
                {t('toolkit.auditScore')}
              </div>
              <div className="text-2xl sm:text-3xl font-display font-bold text-[#F8FAFC]">
                {t('toolkit.percentHardened', { percent: formatNumberLatn(auditScore) })}
              </div>
              <div className="text-xs text-[#94A3B8]">
                {t('toolkit.auditProgress', {
                  done: formatNumberLatn(completedCount),
                  total: formatNumberLatn(totalItems),
                })}
              </div>
            </div>

            <div className="flex-1 max-w-md">
              <div className="h-3 w-full bg-[#131B2E] rounded-full overflow-hidden border border-[rgba(255,255,255,0.06)]">
                <div
                  className="h-full bg-gradient-to-r from-[#C9A96E] to-[#10B981] rounded-full transition-all duration-500"
                  style={{ width: `${auditScore}%` }}
                />
              </div>
            </div>
          </div>

          {/* Checklist Items */}
          <div className="space-y-4">
            {TOOLKIT_CHECKLISTS.map((item) => {
              const isDone = completedItems.includes(item.id);
              const isExpanded = expandedItemId === item.id;

              return (
                <div
                  key={item.id}
                  className={`rounded-2xl border transition-all p-5 sm:p-6 ${
                    isDone
                      ? 'border-[rgba(16,185,129,0.3)] bg-[#0D1322]/80'
                      : 'border-[rgba(201,169,110,0.2)] bg-[#0D1322]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5 flex-1">
                      <button
                        onClick={() => toggleItemCompleted(item.id)}
                        className="mt-0.5 text-left text-xs font-semibold focus-visible:outline-[#C9A96E] cursor-pointer"
                        aria-label={isDone ? t('toolkit.markPending') : t('toolkit.markDone')}
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-5 h-5 text-[#10B981]" aria-hidden="true" />
                        ) : (
                          <Circle className="w-5 h-5 text-[#64748B] hover:text-[#C9A96E]" aria-hidden="true" />
                        )}
                      </button>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[11px] font-mono uppercase tracking-wider font-semibold ${
                              item.priority === 'essential'
                                ? 'text-[#F43F5E]'
                                : item.priority === 'high'
                                ? 'text-[#F59E0B]'
                                : 'text-[#38BDF8]'
                            }`}
                          >
                            {item.priority === 'essential'
                              ? t('toolkit.priorityEssential')
                              : item.priority === 'high'
                              ? t('toolkit.priorityHigh')
                              : t('toolkit.priorityRecommended')}
                          </span>
                        </div>
                        <h3 className={`text-base font-bold ${isDone ? 'text-[#CBD5E1] line-through' : 'text-[#F8FAFC]'}`}>
                          {t(item.titleKey)}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                          {t(item.descKey)}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setExpandedItemId(isExpanded ? null : item.id)}
                      className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#131B2E] transition-colors cursor-pointer"
                      aria-expanded={isExpanded}
                      aria-label={t('toolkit.howToHeading')}
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.06)] pl-8 space-y-2 text-xs sm:text-sm text-[#CBD5E1]">
                      <div className="font-semibold text-[#C9A96E] uppercase tracking-wider text-[11px]">
                        {t('toolkit.howToHeading')}
                      </div>
                      <p className="bg-[#131B2E] p-3.5 rounded-xl border border-[rgba(255,255,255,0.04)] leading-relaxed">
                        {t(item.howToKey)}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: Suspect Call Triage Tree */}
      {activeTab === 'triage' && (
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-display font-bold text-[#F8FAFC]">
              {t('toolkit.triageTitle')}
            </h2>
            <p className="text-sm text-[#94A3B8] max-w-xl mt-1">
              {t('toolkit.triageSubtitle')}
            </p>
          </div>

          {/* Situation Selector Buttons */}
          <div className="space-y-3" role="radiogroup" aria-label={t('toolkit.triageSelectPrompt')}>
            <span className="text-xs uppercase tracking-wider font-semibold text-[#C9A96E] block mb-2">
              {t('toolkit.triageSelectPrompt')}
            </span>

            {TRIAGE_QUESTIONS.map((q) => {
              const isSelected = selectedTriageId === q.id;

              return (
                <button
                  key={q.id}
                  onClick={() => setSelectedTriageId(q.id)}
                  role="radio"
                  aria-checked={isSelected}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#C9A96E] bg-[rgba(201,169,110,0.12)] text-[#F8FAFC]'
                      : 'border-[rgba(255,255,255,0.08)] bg-[#0D1322] text-[#CBD5E1] hover:border-[rgba(201,169,110,0.25)]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm sm:text-base font-semibold">
                      {t(q.triggerKey)}
                    </span>
                    <span
                      className={`text-xs font-mono uppercase px-2.5 py-1 rounded-lg shrink-0 ${
                        isSelected
                          ? 'bg-[#C9A96E] text-[#070B14] font-bold'
                          : 'bg-[#131B2E] text-[#94A3B8]'
                      }`}
                    >
                      {t(q.indicatorKey)}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Diagnostic Result Card */}
          <div className="rounded-2xl border-2 border-[#F43F5E] bg-[#0D1322] p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[rgba(244,63,94,0.15)] flex items-center justify-center text-[#F43F5E]">
                <ShieldAlert className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-[#F43F5E]">
                  {t('toolkit.triageVerdictTitle')}
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-[#F8FAFC]">
                  {t(currentTriage.indicatorKey)}
                </h3>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#131B2E] border border-[rgba(244,63,94,0.25)] text-sm sm:text-base text-[#F1F5F9] leading-relaxed">
              {t(currentTriage.verdictKey)}
            </div>

            <div className="space-y-3 pt-2">
              <div className="text-xs uppercase tracking-wider font-semibold text-[#10B981]">
                {t('toolkit.triageActionTitle')}
              </div>
              <div className="p-4 rounded-xl bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.3)] text-sm sm:text-base font-semibold text-[#10B981] leading-relaxed">
                {t(currentTriage.actionKey)}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs">
              <a
                href="tel:1930"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#E11D48] text-white font-bold hover:bg-[#BE123C] transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{t('toolkit.call1930Immediately')}</span>
              </a>
              <a
                href="https://sancharsaathi.gov.in/sfc/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#131B2E] text-[#C9A96E] border border-[rgba(201,169,110,0.3)] font-semibold hover:bg-[#1E293B]"
              >
                <span>{t('toolkit.reportChakshu')}</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Printable Pocket Emergency Card */}
      {activeTab === 'pocket' && (
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-display font-bold text-[#F8FAFC]">
                {t('toolkit.pocketGuideTitle')}
              </h2>
              <p className="text-sm text-[#94A3B8] max-w-xl mt-1">
                {t('toolkit.pocketGuideDesc')}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C9A96E] hover:bg-[#E4D1A8] text-[#070B14] font-bold text-xs sm:text-sm transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" aria-hidden="true" />
                <span>{t('toolkit.printCardButton')}</span>
              </button>
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#131B2E] border border-[rgba(201,169,110,0.3)] hover:bg-[#1E293B] text-[#F8FAFC] font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
              >
                <Share2 className="w-4 h-4" aria-hidden="true" />
                <span>{t('toolkit.shareCardButton')}</span>
              </button>
            </div>
          </div>

          {copiedShareNotice && (
            <div className="p-3 rounded-lg bg-[rgba(16,185,129,0.15)] border border-[#10B981] text-xs font-semibold text-[#10B981]">
              {t('toolkit.copiedNotice')}
            </div>
          )}

          {/* Printable Emergency Card Container */}
          <div
            id="printable-emergency-card"
            className="p-6 sm:p-10 rounded-2xl border-2 border-[#C9A96E] bg-[#070B14] space-y-8 shadow-2xl max-w-3xl mx-auto"
          >
            <div className="text-center space-y-2 border-b border-[rgba(201,169,110,0.25)] pb-6">
              <div className="text-xs uppercase tracking-widest font-mono text-[#C9A96E]">
                {t('toolkit.pocketWordmark')}
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#F8FAFC]">
                {t('toolkit.pocketCardHeading')}
              </h3>
              <p className="text-xs text-[#94A3B8]">
                {t('toolkit.pocketCardSub')}
              </p>
            </div>

            {/* Helpline Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#0D1322] border border-[rgba(244,63,94,0.3)] text-center space-y-1">
                <span className="text-[11px] font-semibold uppercase text-[#94A3B8] block">
                  {t('toolkit.pocketCyberFraud')}
                </span>
                <a href="tel:1930" className="text-2xl font-bold font-mono text-[#F43F5E] block hover:underline">
                  1930
                </a>
                <span className="text-[11px] text-[#64748B] block">{t('toolkit.pocketTollFree')}</span>
              </div>

              <div className="p-4 rounded-xl bg-[#0D1322] border border-[rgba(255,255,255,0.08)] text-center space-y-1">
                <span className="text-[11px] font-semibold uppercase text-[#94A3B8] block">
                  {t('toolkit.pocketPoliceEmergency')}
                </span>
                <a href="tel:112" className="text-2xl font-bold font-mono text-[#F8FAFC] block hover:underline">
                  112
                </a>
                <span className="text-[11px] text-[#64748B] block">{t('toolkit.pocketAllStates')}</span>
              </div>

              <div className="p-4 rounded-xl bg-[#0D1322] border border-[rgba(255,255,255,0.08)] text-center space-y-1">
                <span className="text-[11px] font-semibold uppercase text-[#94A3B8] block">
                  {t('toolkit.pocketElectricityBoard')}
                </span>
                <a href="tel:1912" className="text-2xl font-bold font-mono text-[#C9A96E] block hover:underline">
                  1912
                </a>
                <span className="text-[11px] text-[#64748B] block">{t('toolkit.pocketBillVerification')}</span>
              </div>
            </div>

            {/* 4 Emergency Golden Rules */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#C9A96E]">
                {t('toolkit.pocketFourRulesHeading')}
              </div>
              <ol className="space-y-2 text-xs sm:text-sm text-[#CBD5E1] list-decimal pl-5 leading-relaxed">
                <li>
                  <strong className="text-[#F8FAFC]">{t('toolkit.rule1Bold')}</strong> {t('toolkit.rule1Text')}
                </li>
                <li>
                  <strong className="text-[#F8FAFC]">{t('toolkit.rule2Bold')}</strong> {t('toolkit.rule2Text')}
                </li>
                <li>
                  <strong className="text-[#F8FAFC]">{t('toolkit.rule3Bold')}</strong> {t('toolkit.rule3Text')}
                </li>
                <li>
                  <strong className="text-[#F8FAFC]">{t('toolkit.rule4Bold')}</strong> {t('toolkit.rule4Text')}
                </li>
              </ol>
            </div>

            <div className="pt-4 border-t border-[rgba(201,169,110,0.18)] flex items-center justify-between text-[11px] text-[#64748B] font-mono">
              <span lang="en">{'cybercrime.gov.in'}</span>
              <span lang="en">{'sancharsaathi.gov.in'}</span>
              <span lang="en">{'sachet.rbi.org.in'}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
