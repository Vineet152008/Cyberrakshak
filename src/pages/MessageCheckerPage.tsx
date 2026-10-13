import React, { useState, useId } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  ExternalLink,
  PhoneCall,
  Search,
  Lock,
  Info,
  CheckCircle2,
} from 'lucide-react';
import {
  analyzeMessageText,
  SAMPLE_MESSAGES,
  CheckerAnalysisResult,
} from '../data/checkerRules';
import { useCalmMode } from '../context/CalmModeContext';
import i18n from '../i18n';
import checkerEn from '../i18n/locales/checker/en.json';
import checkerHi from '../i18n/locales/checker/hi.json';
import checkerMr from '../i18n/locales/checker/mr.json';

// Route-level lazy loading of checker namespace
i18n.addResourceBundle('en', 'translation', checkerEn, true, true);
i18n.addResourceBundle('hi', 'translation', checkerHi, true, true);
i18n.addResourceBundle('mr', 'translation', checkerMr, true, true);

export const MessageCheckerPage: React.FC = () => {
  const { t } = useTranslation();
  const { isCalmMode } = useCalmMode();
  const inputId = useId();

  const [inputText, setInputText] = useState<string>('');
  const [analysis, setAnalysis] = useState<CheckerAnalysisResult | null>(null);
  const [hasInspected, setHasInspected] = useState<boolean>(false);

  const handleAnalyze = (textToAnalyze = inputText) => {
    const result = analyzeMessageText(textToAnalyze);
    setAnalysis(result);
    setHasInspected(true);
  };

  const handleSampleClick = (sampleKey: keyof typeof SAMPLE_MESSAGES) => {
    const sample = SAMPLE_MESSAGES[sampleKey];
    setInputText(sample);
    handleAnalyze(sample);
  };

  const handleClear = () => {
    setInputText('');
    setAnalysis(null);
    setHasInspected(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#131B2E] border border-[rgba(56,189,248,0.3)] text-xs font-semibold text-[#38BDF8]">
          <Search className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{t('checker.badge')}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#F8FAFC]">
          {t('checker.title')}
        </h1>

        <p className="text-base sm:text-lg text-[#CBD5E1] leading-relaxed">
          {t('checker.subtitle')}
        </p>

        {/* Privacy Assurance Box */}
        <div className="p-3.5 rounded-xl bg-[#0D1322] border border-[rgba(201,169,110,0.25)] flex items-center justify-center gap-2.5 text-xs text-[#94A3B8]">
          <Lock className="w-4 h-4 text-[#C9A96E] shrink-0" aria-hidden="true" />
          <span>{t('checker.privacyNote')}</span>
        </div>
      </div>

      {/* Critical Security Warning - Never Paste OTP/PIN */}
      <aside
        aria-labelledby="security-warning-title"
        className="rounded-xl border border-[#BE123C]/50 bg-[#BE123C]/10 p-4 sm:p-5 flex items-start gap-3.5"
      >
        <AlertTriangle className="w-5 h-5 text-[#FDA4AF] shrink-0 mt-0.5" aria-hidden="true" />
        <div className="space-y-1 text-sm text-[#F1F5F9]">
          <h2 id="security-warning-title" className="font-bold text-[#FDA4AF]">
            {t('checker.neverPasteWarningTitle')}
          </h2>
          <p className="leading-relaxed text-[#FDA4AF]/90">
            {t('checker.neverPasteWarningBody')}
          </p>
        </div>
      </aside>

      {/* Interactive Input Form */}
      <div className="rounded-2xl border border-[rgba(201,169,110,0.25)] bg-[#0D1322] p-5 sm:p-8 space-y-6 shadow-xl">
        {/* Sample Selection Quick Buttons */}
        <div className="space-y-2">
          <div className="text-xs uppercase tracking-wider font-semibold text-[#94A3B8]">
            {t('checker.sampleButtonsTitle')}
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleSampleClick('en')}
              className="px-3 py-1.5 rounded-lg bg-[#131B2E] hover:bg-[#1A243D] text-[#CBD5E1] hover:text-white border border-[rgba(201,169,110,0.2)] text-xs font-medium cursor-pointer transition-colors focus-visible:outline-[#C9A96E]"
            >
              <span lang="en">{t('checker.sampleEn')}</span>
            </button>
            <button
              type="button"
              onClick={() => handleSampleClick('hi')}
              className="px-3 py-1.5 rounded-lg bg-[#131B2E] hover:bg-[#1A243D] text-[#CBD5E1] hover:text-white border border-[rgba(201,169,110,0.2)] text-xs font-medium cursor-pointer transition-colors focus-visible:outline-[#C9A96E]"
            >
              <span lang="hi">{t('checker.sampleHi')}</span>
            </button>
            <button
              type="button"
              onClick={() => handleSampleClick('mr')}
              className="px-3 py-1.5 rounded-lg bg-[#131B2E] hover:bg-[#1A243D] text-[#CBD5E1] hover:text-white border border-[rgba(201,169,110,0.2)] text-xs font-medium cursor-pointer transition-colors focus-visible:outline-[#C9A96E]"
            >
              <span lang="mr">{t('checker.sampleMr')}</span>
            </button>
            <button
              type="button"
              onClick={() => handleSampleClick('hinglish')}
              className="px-3 py-1.5 rounded-lg bg-[#131B2E] hover:bg-[#1A243D] text-[#CBD5E1] hover:text-white border border-[rgba(201,169,110,0.2)] text-xs font-medium cursor-pointer transition-colors focus-visible:outline-[#C9A96E]"
            >
              <span lang="hi-Latn">{t('checker.sampleHinglish')}</span>
            </button>
            <button
              type="button"
              onClick={() => handleSampleClick('safe')}
              className="px-3 py-1.5 rounded-lg bg-[#131B2E] hover:bg-[#1A243D] text-[#10B981] hover:text-[#34D399] border border-[#10B981]/30 text-xs font-medium cursor-pointer transition-colors focus-visible:outline-[#10B981]"
            >
              <span lang="en">{t('checker.sampleSafe')}</span>
            </button>
          </div>
        </div>

        {/* Text Area */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor={inputId} className="text-sm font-semibold text-[#F8FAFC]">
              {t('checker.inputLabel')}
            </label>
            <span className="text-xs font-mono text-[#64748B]">
              {t('checker.charCount', { count: inputText.length })}
            </span>
          </div>

          <textarea
            id={inputId}
            rows={5}
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              if (hasInspected) {
                handleAnalyze(e.target.value);
              }
            }}
            placeholder={t('checker.inputPlaceholder')}
            className="w-full rounded-xl border border-[rgba(201,169,110,0.3)] bg-[#131B2E] p-4 text-base text-[#F8FAFC] placeholder:text-[#64748B] focus:outline-none focus:border-[#C9A96E] leading-relaxed transition-colors"
          />
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[rgba(255,255,255,0.06)]">
          <button
            type="button"
            onClick={handleClear}
            disabled={!inputText}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#131B2E] text-[#94A3B8] hover:text-[#F8FAFC] border border-[rgba(255,255,255,0.1)] text-xs font-medium cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline-[#C9A96E]"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t('checker.clearInputButton')}</span>
          </button>

          <button
            type="button"
            onClick={() => handleAnalyze()}
            disabled={!inputText.trim()}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#BE123C] hover:bg-[#9F1239] text-white text-sm font-bold shadow-md cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline-[#BE123C]"
          >
            <Search className="w-4 h-4" aria-hidden="true" />
            <span>{t('checker.analyzeButton')}</span>
          </button>
        </div>
      </div>

      {/* Analysis Results Display */}
      {hasInspected && analysis && (
        <section
          aria-labelledby="analysis-results-heading"
          className="space-y-6 pt-4 border-t border-[rgba(201,169,110,0.2)] animate-fadeIn"
        >
          {/* Section Heading & Mandatory Disclaimer */}
          <div className="space-y-3">
            <h2 id="analysis-results-heading" className="text-xl sm:text-2xl font-bold text-[#F8FAFC]">
              {t('checker.resultsTitle')}
            </h2>

            {/* MANDATORY DISCLAIMER: Guidance, not a verdict of safety */}
            <div className="p-4 rounded-xl bg-[#131B2E] border border-[rgba(201,169,110,0.35)] flex items-start gap-3 text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
              <Info className="w-5 h-5 text-[#C9A96E] shrink-0 mt-0.5" aria-hidden="true" />
              <p>{t('checker.disclaimerNotice')}</p>
            </div>
          </div>

          {/* Outcome Verdict Card */}
          {analysis.hasMatches ? (
            <div className="rounded-2xl border border-[#BE123C]/50 bg-[#BE123C]/10 p-5 sm:p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#BE123C]/20 pb-3">
                <div className="flex items-center gap-2.5">
                  <ShieldAlert className="w-6 h-6 text-[#FDA4AF]" aria-hidden="true" />
                  <h3 className="text-lg font-bold text-[#FDA4AF]">
                    {t('checker.warningResultTitle', { count: analysis.totalMatches })}
                  </h3>
                </div>

                <span className="text-xs uppercase tracking-wider px-3 py-1 rounded-full font-bold bg-[#BE123C] text-white">
                  {analysis.overallSeverity === 'critical'
                    ? t('checker.severityCritical')
                    : analysis.overallSeverity === 'high'
                    ? t('checker.severityHigh')
                    : t('checker.severityMedium')}
                </span>
              </div>

              <p className="text-sm text-[#F1F5F9] leading-relaxed">
                {t('checker.warningResultDesc')}
              </p>

              {/* Segmented Highlighted Text Visualizer */}
              <div className="p-4 rounded-xl bg-[#070B14] border border-[rgba(255,255,255,0.08)] font-sans text-sm sm:text-base leading-relaxed">
                {analysis.highlightedSegments.map((segment, idx) => (
                  <span
                    key={idx}
                    className={
                      segment.isFlagged
                        ? 'bg-[#BE123C]/30 text-[#FDA4AF] font-bold px-1.5 py-0.5 rounded border border-[#BE123C]/50 inline-block m-0.5'
                        : 'text-[#E2E8F0]'
                    }
                  >
                    {segment.text}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-[#10B981]/40 bg-[#10B981]/10 p-5 sm:p-6 space-y-3">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-6 h-6 text-[#10B981]" aria-hidden="true" />
                <h3 className="text-lg font-bold text-[#A7F3D0]">
                  {t('checker.safeResultTitle')}
                </h3>
              </div>
              <p className="text-sm text-[#D1FAE5] leading-relaxed">
                {t('checker.safeResultDesc')}
              </p>
            </div>
          )}

          {/* Breakdown of Detected Deception Rules */}
          {analysis.matchedCues.length > 0 && (
            <div className="space-y-4">
              <div className="text-xs uppercase tracking-wider font-semibold text-[#94A3B8]">
                {t('checker.resultsTitle')}
              </div>

              <div className="grid grid-cols-1 gap-4">
                {analysis.matchedCues.map((cue, idx) => (
                  <div
                    key={`${cue.ruleId}-${idx}`}
                    className="p-4 sm:p-5 rounded-xl bg-[#0D1322] border border-[rgba(201,169,110,0.3)] space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[rgba(255,255,255,0.06)] pb-2.5">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-[#C9A96E]" aria-hidden="true" />
                        <h4 className="font-bold text-sm sm:text-base text-[#F8FAFC]">
                          {t(`checker.rules.${cue.ruleId}.title`)}
                        </h4>
                      </div>

                      <span className="text-xs px-2.5 py-0.5 rounded bg-[#131B2E] text-[#C9A96E] border border-[rgba(201,169,110,0.2)] font-mono">
                        {cue.matchedText}
                      </span>
                    </div>

                    <div className="space-y-2 text-xs sm:text-sm">
                      <p className="text-[#CBD5E1] leading-relaxed">
                        {t(`checker.rules.${cue.ruleId}.explanation`)}
                      </p>

                      <div className="p-3 rounded-lg bg-[#131B2E] border border-[rgba(201,169,110,0.2)] flex items-start gap-2 text-[#E4D1A8]">
                        <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="leading-relaxed">
                          {t(`checker.rules.${cue.ruleId}.guidance`)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Next Steps Guidance */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#0D1322] border border-[rgba(201,169,110,0.25)] space-y-4">
            <h3 className="font-bold text-base text-[#F8FAFC] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#C9A96E]" aria-hidden="true" />
              <span>{t('checker.nextStepsTitle')}</span>
            </h3>

            <ul className="space-y-2.5 text-sm text-[#CBD5E1]">
              <li className="flex items-start gap-2">
                <span className="text-[#C9A96E] font-bold">•</span>
                <span>{t('checker.step1')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#C9A96E] font-bold">•</span>
                <span>{t('checker.step2')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#C9A96E] font-bold">•</span>
                <span>{t('checker.step3')}</span>
              </li>
            </ul>

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <a
                href="tel:1930"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#BE123C] hover:bg-[#9F1239] text-white text-xs sm:text-sm font-semibold transition-colors focus-visible:outline-[#BE123C]"
              >
                <PhoneCall className="w-4 h-4" aria-hidden="true" />
                <span>{t('emergency.call1930Button')}</span>
              </a>

              <a
                href="https://sancharsaathi.gov.in/sfc/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#131B2E] text-[#38BDF8] hover:text-[#7DD3FC] border border-[rgba(56,189,248,0.3)] text-xs sm:text-sm font-medium transition-colors focus-visible:outline-[#38BDF8]"
              >
                <span>{t('emergency.chakshuButton')}</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="sr-only">{t('emergency.opensInNewTab')}</span>
              </a>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
