import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { EMERGENCY_FLOWS, EVIDENCE_CHECKLIST_ITEMS } from '../data/emergency';
import { EmergencyFlowId } from '../types/content';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useCalmMode } from '../context/CalmModeContext';
import i18n from '../i18n';
import emergencyEn from '../i18n/locales/emergency/en.json';
import emergencyHi from '../i18n/locales/emergency/hi.json';
import emergencyMr from '../i18n/locales/emergency/mr.json';

// Route-level lazy loading of emergency namespace
i18n.addResourceBundle('en', 'translation', emergencyEn, true, true);
i18n.addResourceBundle('hi', 'translation', emergencyHi, true, true);
i18n.addResourceBundle('mr', 'translation', emergencyMr, true, true);

import {
  PhoneCall,
  ExternalLink,
  AlertTriangle,
  CreditCard,
  Lock,
  Moon,
  Sun,
  Trash2,
  CheckCircle2,
  Info,
  ArrowRight,
  ShieldAlert,
  ShieldCheck
} from 'lucide-react';

export const EmergencyAssistPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { isCalmMode, toggleCalmMode } = useCalmMode();

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
    try {
      localStorage.setItem('cyberrakshak_lang', lng);
    } catch {
      // Storage resilience
    }
  };

  // Active Emergency Flow Tab
  const [activeFlowId, setActiveFlowId] = useState<EmergencyFlowId>('financial_fraud');
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Local-only evidence checklist state
  const [checkedEvidence, setCheckedEvidence] = useLocalStorage<Record<string, boolean>>(
    'cyberrakshak_evidence_checklist',
    {}
  );

  // Local-only notes state
  const [localNotes, setLocalNotes] = useLocalStorage<string>('cyberrakshak_evidence_notes', '');

  // Clear data confirmation & notification
  const [isConfirmingClear, setIsConfirmingClear] = useState<boolean>(false);
  const [clearedNotice, setClearedNotice] = useState<boolean>(false);
  const [ariaLiveMessage, setAriaLiveMessage] = useState<string>('');

  const activeFlow = EMERGENCY_FLOWS.find((f) => f.id === activeFlowId) || EMERGENCY_FLOWS[0];
  const activeIndex = EMERGENCY_FLOWS.findIndex((f) => f.id === activeFlowId);

  const handleToggleCheck = (id: string) => {
    setCheckedEvidence((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleConfirmClear = () => {
    setCheckedEvidence({});
    setLocalNotes('');
    try {
      localStorage.removeItem('cyberrakshak_evidence_checklist');
      localStorage.removeItem('cyberrakshak_evidence_notes');
    } catch {
      // Storage access resilience
    }
    setIsConfirmingClear(false);
    setClearedNotice(true);
    setAriaLiveMessage(t('emergency.clearDataSuccess'));
    setTimeout(() => {
      setClearedNotice(false);
      setAriaLiveMessage('');
    }, 4000);
  };

  // Accessible ARIA Tab Keyboard Navigation (Left/Right/Home/End)
  const handleTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    let targetIndex = index;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      targetIndex = (index + 1) % EMERGENCY_FLOWS.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      targetIndex = (index - 1 + EMERGENCY_FLOWS.length) % EMERGENCY_FLOWS.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      targetIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      targetIndex = EMERGENCY_FLOWS.length - 1;
    }

    if (targetIndex !== index) {
      setActiveFlowId(EMERGENCY_FLOWS[targetIndex].id);
      tabRefs.current[targetIndex]?.focus();
    }
  };

  return (
    <div className="relative py-8 md:py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Aria-live status region for assistive technology announcements */}
      <div role="status" aria-live="polite" className="sr-only">
        {ariaLiveMessage}
      </div>

      {/* 1. TOP-PRIORITY ACTION: 1930 Call Banner FIRST on the page */}
      <div className="rounded-2xl border-2 border-[#BE123C] bg-[#0D1322] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="text-xs uppercase tracking-wider font-semibold text-[#CBD5E1]">
            {t('emergency.flows.financial.step1.sub')}
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#F8FAFC]">
            {t('emergency.flows.financial.step1.title')}
          </h2>
          <p className="text-base text-[#CBD5E1] max-w-xl leading-relaxed">
            {t('emergency.flows.financial.subtitle')}
          </p>
        </div>

        {/* Accessible Red Emergency Button: White on #BE123C provides ~6.31:1 contrast (WCAG AA normal, AAA large) */}
        <a
          href="tel:1930"
          className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#BE123C] hover:bg-[#9F1239] text-[#FFFFFF] text-lg font-bold transition-colors whitespace-nowrap cursor-pointer shrink-0 focus-visible:outline-[#C9A96E]"
        >
          <PhoneCall className="w-5 h-5 shrink-0" aria-hidden="true" />
          <span>{t('emergency.call1930Button')}</span>
        </a>
      </div>

      {/* 2. Controls Bar: Language Selector & Calm Mode */}
      <div className="rounded-2xl border border-[rgba(201,169,110,0.3)] bg-[#0D1322] p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#C9A96E]">
            <Info className="w-4 h-4 text-[#C9A96E]" aria-hidden="true" />
            <span>{t('emergency.calmModeTitle')}</span>
          </div>
          <p className="text-base text-[#CBD5E1]">
            {t('emergency.calmModeDesc')}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 self-stretch sm:self-auto">
          {/* Header Language Switcher (EN / HI / MR) */}
          <div
            className="flex items-center rounded-lg border border-[rgba(201,169,110,0.3)] bg-[#131B2E] p-1 text-sm font-medium"
            role="group"
            aria-label="Language selection"
          >
            {[
              { code: 'en', label: 'English' },
              { code: 'hi', label: 'हिन्दी' },
              { code: 'mr', label: 'मराठी' },
            ].map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer text-xs sm:text-sm ${
                  i18n.language === lang.code
                    ? 'bg-[#C9A96E] text-[#070B14] font-bold shadow-xs'
                    : 'text-[#CBD5E1] hover:text-[#F8FAFC]'
                }`}
                aria-pressed={i18n.language === lang.code}
              >
                {lang.label}
              </button>
            ))}
          </div>

          {/* Calm Mode Toggle */}
          <button
            onClick={toggleCalmMode}
            className={`px-4 py-2 rounded-lg border text-sm font-semibold flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap justify-center focus-visible:outline-[#C9A96E] ${
              isCalmMode
                ? 'bg-[#C9A96E] text-[#070B14] border-[#C9A96E]'
                : 'bg-[#131B2E] text-[#F8FAFC] border-[rgba(201,169,110,0.3)] hover:bg-[#1A243D]'
            }`}
            aria-pressed={isCalmMode}
          >
            {isCalmMode ? <Sun className="w-4 h-4" aria-hidden="true" /> : <Moon className="w-4 h-4" aria-hidden="true" />}
            <span>{isCalmMode ? t('emergency.calmModeOn') : t('emergency.calmModeOff')}</span>
          </button>
        </div>
      </div>

      {/* 3. Page Title & Reassurance */}
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#F8FAFC]">
          {t('emergency.pageTitle')}
        </h1>
        <p className="text-base sm:text-lg text-[#CBD5E1] max-w-3xl leading-relaxed">
          {t('emergency.reassurance')}
        </p>
      </div>

      {/* 4. Fund Recovery Disclaimer (No false promises) */}
      <div className="rounded-xl border border-[rgba(201,169,110,0.35)] bg-[#131B2E] p-5 text-base text-[#F1F5F9] leading-relaxed flex items-start gap-3.5">
        <AlertTriangle className="w-5 h-5 text-[#C9A96E] shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <p className="leading-relaxed">{t('emergency.noRecoveryPromise')}</p>
        </div>
      </div>

      {/* 5. Flow Selector Tabs with Full WAI-ARIA Keyboard Pattern */}
      <div className="space-y-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#C9A96E]">
          {t('emergency.selectCategoryAria')}
        </div>
        <div
          role="tablist"
          aria-label="Incident category selection"
          className="flex flex-wrap gap-2.5"
        >
          {EMERGENCY_FLOWS.map((flow, idx) => {
            const isActive = flow.id === activeFlowId;
            return (
              <button
                key={flow.id}
                ref={(el) => { tabRefs.current[idx] = el; }}
                role="tab"
                id={`flow-tab-${flow.id}`}
                aria-selected={isActive}
                aria-controls={`flow-panel-${flow.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveFlowId(flow.id)}
                onKeyDown={(e) => handleTabKeyDown(e, idx)}
                className={`px-4 py-2.5 rounded-lg text-base font-semibold transition-colors cursor-pointer border focus-visible:outline-2 focus-visible:outline-[#C9A96E] ${
                  isActive
                    ? 'bg-[#C9A96E] text-[#070B14] border-[#C9A96E]'
                    : 'bg-[#0D1322] text-[#CBD5E1] border-[rgba(201,169,110,0.2)] hover:bg-[#131B2E]'
                }`}
              >
                {t(flow.tabLabelKey)}
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. Active Flow Panel: Data-Driven Step-by-Step Guidance */}
      <div
        id={`flow-panel-${activeFlow.id}`}
        role="tabpanel"
        aria-labelledby={`flow-tab-${activeFlow.id}`}
        className="space-y-6"
      >
        <div className="space-y-1">
          <h2 className="text-2xl font-display font-bold text-[#F8FAFC]">
            {t(activeFlow.titleKey)}
          </h2>
          <p className="text-base text-[#CBD5E1]">
            {t(activeFlow.subtitleKey)}
          </p>
        </div>

        {/* Specific Extortion Flow Notice: "This is not your fault" & immediate danger guidance */}
        {activeFlow.id === 'sensitive_extortion' && (
          <div className="rounded-xl border border-[rgba(16,185,129,0.3)] bg-[rgba(16,185,129,0.06)] p-5 space-y-3">
            <div className="flex items-center gap-2 text-base font-bold text-[#10B981]">
              <ShieldCheck className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span>{t('emergency.extortionReassuranceTitle')}</span>
            </div>
            <p className="text-base text-[#CBD5E1] leading-relaxed">
              {t('emergency.extortionReassuranceBody')}
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href="tel:1930"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#BE123C] hover:bg-[#9F1239] text-[#FFFFFF] text-sm font-bold transition-colors focus-visible:outline-[#C9A96E]"
              >
                <PhoneCall className="w-4 h-4" aria-hidden="true" />
                <span>{t('emergency.extortionCall1930')}</span>
              </a>
              <a
                href="tel:112"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#131B2E] border border-[rgba(244,63,94,0.4)] text-[#F43F5E] hover:bg-[rgba(244,63,94,0.15)] text-sm font-bold transition-colors focus-visible:outline-[#F43F5E]"
              >
                <PhoneCall className="w-4 h-4" aria-hidden="true" />
                <span>{t('emergency.extortionCall112')}</span>
              </a>
              <a
                href="https://cybercrime.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#131B2E] border border-[rgba(201,169,110,0.3)] text-[#C9A96E] hover:bg-[#1A243D] text-sm font-semibold transition-colors focus-visible:outline-[#C9A96E]"
              >
                <span>{t('emergency.extortionReportPortal')}</span>
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
                <span className="sr-only">{t('emergency.opensInNewTab')}</span>
              </a>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {activeFlow.steps.map((step) => (
            <div
              key={step.stepNumber}
              className="rounded-2xl border border-[rgba(201,169,110,0.2)] bg-[#0D1322] p-6 sm:p-8 space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#C9A96E] text-[#070B14] font-bold text-base flex items-center justify-center shrink-0">
                  {step.stepNumber}
                </div>
                <h3 className="text-xl font-bold font-display text-[#F8FAFC]">
                  {t(step.titleKey)}
                </h3>
              </div>

              <div className="text-base text-[#CBD5E1] font-medium">
                {t(step.subTitleKey)}
              </div>

              <p className="text-base text-[#CBD5E1] leading-relaxed">
                {t(step.instructionsKey)}
              </p>

              {step.cautionKey && (
                <div className="rounded-xl border border-[rgba(201,169,110,0.3)] bg-[#131B2E] p-4 text-base text-[#E4D1A8] leading-relaxed flex items-start gap-2.5">
                  <Info className="w-5 h-5 text-[#C9A96E] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{t(step.cautionKey)}</span>
                </div>
              )}

              {/* Action Link for Step with Explicit "1930" Visible in Any Call Buttons */}
              {step.actionHref && step.actionTextKey && (
                <div className="pt-2">
                  <a
                    href={step.actionHref}
                    target={step.isExternalLink ? '_blank' : undefined}
                    rel={step.isExternalLink ? 'noopener noreferrer' : undefined}
                    className={`inline-flex items-center gap-2 px-5 py-3 rounded-lg text-base font-semibold transition-colors focus-visible:outline-[#C9A96E] ${
                      step.actionHref.startsWith('tel:')
                        ? 'bg-[#BE123C] hover:bg-[#9F1239] text-[#FFFFFF]'
                        : 'bg-[#C9A96E] hover:bg-[#E4D1A8] text-[#070B14]'
                    }`}
                  >
                    {step.actionHref.startsWith('tel:') && <PhoneCall className="w-4 h-4" aria-hidden="true" />}
                    <span>
                      {t(step.actionTextKey)}
                      {step.actionHref === 'tel:1930' && !t(step.actionTextKey).includes('1930') && ' (1930)'}
                    </span>
                    {step.isExternalLink && (
                      <>
                        <ExternalLink className="w-4 h-4" aria-hidden="true" />
                        <span className="sr-only">{t('emergency.opensInNewTab')}</span>
                      </>
                    )}
                  </a>
                </div>
              )}

              {/* Step 3 Special Reminder for Bank Numbers */}
              {activeFlow.id === 'financial_fraud' && step.stepNumber === 3 && (
                <div className="rounded-xl border border-[rgba(201,169,110,0.25)] bg-[#131B2E] p-4 text-base text-[#CBD5E1] space-y-2">
                  <div className="flex items-center gap-2 font-bold text-[#E4D1A8]">
                    <CreditCard className="w-5 h-5" aria-hidden="true" />
                    <span>{t('emergency.reachBankSafelyTitle')}</span>
                  </div>
                  <p className="leading-relaxed">
                    {t('emergency.reachBankSafelyBody')}
                  </p>
                  <p className="text-[#E4D1A8] font-medium leading-relaxed">
                    {t('emergency.reachBankSafelyWarning')}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Cross-Link Banners Between Flows */}
        {activeFlow.id === 'financial_fraud' && (
          <div className="rounded-xl border border-[rgba(56,189,248,0.3)] bg-[#0D1322] p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="text-base font-bold text-[#F8FAFC]">
                {t('emergency.crossLinkAccountTitle')}
              </h4>
              <p className="text-sm text-[#CBD5E1]">
                {t('emergency.crossLinkAccountBody')}
              </p>
            </div>
            <button
              onClick={() => setActiveFlowId('account_compromise')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#131B2E] border border-[rgba(56,189,248,0.4)] text-[#38BDF8] text-sm font-semibold hover:bg-[#1A243D] transition-colors whitespace-nowrap cursor-pointer shrink-0"
            >
              <span>{t('emergency.crossLinkAccountButton')}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        )}

        {activeFlow.id === 'account_compromise' && (
          <div className="rounded-xl border border-[rgba(201,169,110,0.3)] bg-[#0D1322] p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="text-base font-bold text-[#F8FAFC]">
                {t('emergency.crossLinkFinancialTitle')}
              </h4>
              <p className="text-sm text-[#CBD5E1]">
                {t('emergency.crossLinkFinancialBody')}
              </p>
            </div>
            <button
              onClick={() => setActiveFlowId('financial_fraud')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#C9A96E] hover:bg-[#E4D1A8] text-[#070B14] text-sm font-bold transition-colors whitespace-nowrap cursor-pointer shrink-0"
            >
              <span>{t('emergency.crossLinkFinancialButton')}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      {/* 7. Reporting Suspicious Phone Numbers via Chakshu */}
      <section className="rounded-2xl border border-[rgba(56,189,248,0.3)] bg-[#0D1322] p-6 sm:p-8 space-y-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#38BDF8]">
          <span>{t('emergency.dotSancharSaathi')}</span>
        </div>
        <h3 className="text-xl font-bold font-display text-[#F8FAFC]">
          {t('emergency.chakshuHeading')}
        </h3>
        <p className="text-base text-[#CBD5E1] leading-relaxed">
          {t('emergency.chakshuDesc')}
        </p>
        <div className="pt-1">
          <a
            href="https://sancharsaathi.gov.in/sfc/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#131B2E] border border-[rgba(56,189,248,0.4)] text-[#38BDF8] text-base font-semibold hover:bg-[#1A243D] transition-colors focus-visible:outline-[#38BDF8]"
          >
            <span>{t('emergency.chakshuButton')}</span>
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
            <span className="sr-only">{t('emergency.opensInNewTab')}</span>
          </a>
        </div>
      </section>

      {/* 8. Accessible Local-Only Evidence Checklist (Using Real Form Checkboxes in Labels) */}
      <section className="rounded-2xl border border-[rgba(201,169,110,0.25)] bg-[#0D1322] p-6 sm:p-8 space-y-6" aria-labelledby="evidence-checklist-heading">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[rgba(201,169,110,0.15)] pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C9A96E]">
              <Lock className="w-4 h-4 text-[#10B981]" aria-hidden="true" />
              <span>{t('emergency.localMemoryNote')}</span>
            </div>
            <h2 id="evidence-checklist-heading" className="text-2xl font-display font-bold text-[#F8FAFC] mt-1">
              {t('emergency.checklist.heading')}
            </h2>
          </div>
          <div className="text-xs text-[#CBD5E1]">
            {t('emergency.privateLocalNote')}
          </div>
        </div>

        {/* Safety & Privacy Persistent Banner */}
        <div className="rounded-xl border border-[rgba(244,63,94,0.3)] bg-[rgba(244,63,94,0.06)] p-4 text-base text-[#F1F5F9] leading-relaxed flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-[#F43F5E] shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <strong className="block text-[#F43F5E] mb-1 font-semibold">
              {t('emergency.safetyWarningTitle')}
            </strong>
            <p>{t('emergency.safetyWarningBody')}</p>
          </div>
        </div>

        <p className="text-base text-[#CBD5E1]">
          {t('emergency.checklist.subheading')}
        </p>

        {/* Semantic Checkboxes wrapped in <label> elements */}
        <div className="space-y-4" role="group" aria-label="Evidence collection checklist">
          {EVIDENCE_CHECKLIST_ITEMS.map((item) => {
            const isChecked = !!checkedEvidence[item.id];
            return (
              <label
                key={item.id}
                className={`p-4 rounded-xl border transition-colors flex items-start gap-3.5 cursor-pointer select-none ${
                  isChecked
                    ? 'bg-[rgba(16,185,129,0.08)] border-[#10B981]/50 text-[#F8FAFC]'
                    : 'bg-[#131B2E] border-[rgba(255,255,255,0.08)] text-[#CBD5E1] hover:border-[rgba(201,169,110,0.35)]'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleToggleCheck(item.id)}
                  className="mt-1 h-5 w-5 rounded border-[#64748B] bg-[#070B14] text-[#C9A96E] focus:ring-2 focus:ring-[#C9A96E] focus:ring-offset-[#070B14] cursor-pointer"
                />

                <div className="space-y-1 flex-1">
                  <div className={`text-base font-semibold ${isChecked ? 'text-[#10B981]' : 'text-[#F8FAFC]'}`}>
                    {t(item.labelKey)}
                  </div>
                  <div className="text-sm text-[#CBD5E1]">
                    <strong className="text-[#E4D1A8]">{t('emergency.whereToFindLabel')}</strong> {t(item.howToGetKey)}
                  </div>
                  <div className="text-sm text-[#CBD5E1]">
                    <strong className="text-[#E4D1A8]">{t('emergency.whyItMattersLabel')}</strong> {t(item.whyNeededKey)}
                  </div>
                </div>
              </label>
            );
          })}
        </div>

        {/* Local Private Notes Area */}
        <div className="space-y-2 pt-2">
          <label htmlFor="evidence-notes" className="block text-sm font-semibold uppercase tracking-wider text-[#CBD5E1]">
            {t('emergency.evidenceNotesLabel')}
          </label>
          <textarea
            id="evidence-notes"
            rows={3}
            value={localNotes}
            onChange={(e) => setLocalNotes(e.target.value)}
            placeholder={t('emergency.notesPlaceholder')}
            className="w-full rounded-xl border border-[rgba(201,169,110,0.25)] bg-[#131B2E] p-3 text-base text-[#F8FAFC] placeholder:text-[#64748B] focus:outline-none focus:border-[#C9A96E]"
          />
          <div className="text-xs text-[#CBD5E1] flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-[#10B981]" aria-hidden="true" />
            <span>{t('emergency.neverTypeSensitiveNote')}</span>
          </div>
        </div>

        {/* Shared Device Warning & Clear All Data Button with Confirmation Step */}
        <div className="pt-4 border-t border-[rgba(201,169,110,0.15)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-xs text-[#CBD5E1] max-w-md">
            {t('emergency.sharedDeviceWarning')}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {clearedNotice && (
              <span className="text-xs text-[#10B981] font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{t('emergency.clearDataSuccess')}</span>
              </span>
            )}

            {!isConfirmingClear ? (
              <button
                onClick={() => setIsConfirmingClear(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#131B2E] border border-[rgba(244,63,94,0.3)] text-[#F43F5E] hover:bg-[rgba(244,63,94,0.1)] text-sm font-medium transition-colors cursor-pointer focus-visible:outline-[#F43F5E]"
              >
                <Trash2 className="w-4 h-4" aria-hidden="true" />
                <span>{t('emergency.clearDataButton')}</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-[#1A243D] border border-[rgba(244,63,94,0.4)] p-2 rounded-lg">
                <span className="text-xs text-[#F1F5F9] font-medium">{t('emergency.clearDataConfirmPrompt')}</span>
                <button
                  onClick={handleConfirmClear}
                  className="px-3 py-1 bg-[#BE123C] hover:bg-[#9F1239] text-white text-xs font-bold rounded cursor-pointer transition-colors"
                >
                  {t('emergency.clearDataConfirmYes')}
                </button>
                <button
                  onClick={() => setIsConfirmingClear(false)}
                  className="px-2.5 py-1 bg-[#131B2E] text-[#CBD5E1] hover:text-white text-xs rounded border border-[rgba(255,255,255,0.15)] cursor-pointer transition-colors"
                >
                  {t('emergency.clearDataConfirmCancel')}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
