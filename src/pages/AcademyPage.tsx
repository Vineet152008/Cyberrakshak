import React, { useState, useId } from 'react';
import { useTranslation } from 'react-i18next';
import {
  GraduationCap,
  Award,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  RotateCcw,
  Download,
  X,
  ShieldCheck,
  Sparkles,
  Info,
  Clock,
  HelpCircle,
} from 'lucide-react';
import { ACADEMY_LESSONS, AcademyLesson } from '../data/academyData';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { formatNumberLatn } from '../utils/formatters';
import i18n from '../i18n';
import academyEn from '../i18n/locales/academy/en.json';
import academyHi from '../i18n/locales/academy/hi.json';
import academyMr from '../i18n/locales/academy/mr.json';

// Route-level lazy loading of academy namespace
i18n.addResourceBundle('en', 'translation', academyEn, true, true);
i18n.addResourceBundle('hi', 'translation', academyHi, true, true);
i18n.addResourceBundle('mr', 'translation', academyMr, true, true);

export const AcademyPage: React.FC = () => {
  const { t, i18n: currentI18n } = useTranslation();
  const nameInputId = useId();

  // Local state for progress persistence
  const [completedLessonIds, setCompletedLessonIds] = useLocalStorage<string[]>(
    'cyberrakshak_completed_lessons',
    []
  );
  const [learnerName, setLearnerName] = useLocalStorage<string>(
    'cyberrakshak_learner_name',
    ''
  );

  // Active UI modal states
  const [activeLesson, setActiveLesson] = useState<AcademyLesson | null>(null);
  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const totalLessons = ACADEMY_LESSONS.length;
  const completedCount = completedLessonIds.length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  const filteredLessons =
    selectedCategory === 'all'
      ? ACADEMY_LESSONS
      : ACADEMY_LESSONS.filter((l) => l.category === selectedCategory);

  const handleOpenLesson = (lesson: AcademyLesson) => {
    setActiveLesson(lesson);
    setSelectedQuizOption(null);
    setQuizSubmitted(false);
  };

  const handleCloseLesson = () => {
    setActiveLesson(null);
    setSelectedQuizOption(null);
    setQuizSubmitted(false);
  };

  const handleSubmitQuiz = (lesson: AcademyLesson) => {
    if (!selectedQuizOption) return;
    setQuizSubmitted(true);

    const q = lesson.quiz[0];
    const opt = q.options.find((o) => o.id === selectedQuizOption);
    if (opt?.isCorrect && !completedLessonIds.includes(lesson.id)) {
      setCompletedLessonIds([...completedLessonIds, lesson.id]);
    }
  };

  const handleDownloadSvgCertificate = () => {
    const certId = `CR-${formatNumberLatn(2026)}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    const dateStr = new Date().toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const displayName = learnerName.trim() || t('academy.certifiedRakshakTitle');

    const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1000" height="700" viewBox="0 0 1000 700" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#070B14"/>
      <stop offset="100%" stop-color="#0D1322"/>
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E4D1A8"/>
      <stop offset="100%" stop-color="#C9A96E"/>
    </linearGradient>
  </defs>

  <!-- Border & Background -->
  <rect width="1000" height="700" fill="url(#bg)"/>
  <rect x="25" y="25" width="950" height="650" fill="none" stroke="url(#gold)" stroke-width="2" rx="16"/>
  <rect x="35" y="35" width="930" height="630" fill="none" stroke="rgba(201,169,110,0.3)" stroke-width="1" rx="12"/>

  <!-- Header Wordmark -->
  <text x="500" y="110" font-family="serif" font-size="20" letter-spacing="4" fill="#C9A96E" text-anchor="middle" font-weight="600">${t('academy.certificateSubheader')}</text>
  <text x="500" y="170" font-family="serif" font-size="38" fill="#F8FAFC" text-anchor="middle" font-weight="bold">${t('academy.certificateTitleText')}</text>
  
  <line x1="350" y1="200" x2="650" y2="200" stroke="#C9A96E" stroke-width="1.5" stroke-opacity="0.6"/>

  <text x="500" y="250" font-family="sans-serif" font-size="16" fill="#94A3B8" text-anchor="middle">${t('academy.certificateAwardedTo')}</text>
  
  <!-- Recipient Name -->
  <text x="500" y="320" font-family="serif" font-size="44" fill="url(#gold)" text-anchor="middle" font-weight="bold">${displayName}</text>
  <line x1="300" y1="340" x2="700" y2="340" stroke="rgba(201,169,110,0.4)" stroke-width="1"/>

  <!-- Pledge Statement -->
  <text x="500" y="400" font-family="sans-serif" font-size="16" fill="#CBD5E1" text-anchor="middle">${t('academy.certificateReasonLine1')}</text>
  <text x="500" y="430" font-family="sans-serif" font-size="16" fill="#CBD5E1" text-anchor="middle">${t('academy.certificateReasonLine2')}</text>

  <!-- Seal / Emblem -->
  <circle cx="500" cy="520" r="42" fill="#131B2E" stroke="#C9A96E" stroke-width="2"/>
  <polygon points="500,490 512,518 542,518 518,534 527,562 500,544 473,562 482,534 458,518 488,518" fill="#C9A96E"/>

  <!-- Footer Verification -->
  <text x="120" y="600" font-family="sans-serif" font-size="13" fill="#64748B">${t('academy.certificateDateLabel')}: <tspan fill="#F8FAFC">${dateStr}</tspan></text>
  <text x="120" y="625" font-family="sans-serif" font-size="13" fill="#64748B">${t('academy.certificateHelplineLabel')}: <tspan fill="#F8FAFC">${t('academy.certificateHelplineValue')}</tspan></text>
  
  <text x="880" y="600" font-family="sans-serif" font-size="13" fill="#64748B" text-anchor="end">${t('academy.certificateIdLabel')}: <tspan fill="#F8FAFC">${certId}</tspan></text>
  <text x="880" y="625" font-family="sans-serif" font-size="13" fill="#64748B" text-anchor="end">${t('academy.certificateVerificationLabel')}: <tspan fill="#10B981">${t('academy.certificateVerificationValue')}</tspan></text>
</svg>`;

    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CyberRakshak-Guardian-Certificate-${displayName.replace(/\s+/g, '_')}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[rgba(201,169,110,0.18)]">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#C9A96E]">
              {t('academy.badge')}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-[#F8FAFC]">
            {t('academy.pageTitle')}
          </h1>
          <p className="text-sm md:text-base text-[#94A3B8] max-w-2xl leading-relaxed">
            {t('academy.pageSubtitle')}
          </p>
        </div>

        {/* Certificate Button & Progress Pill */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            onClick={() => setIsCertificateModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#C9A96E] hover:bg-[#E4D1A8] text-[#070B14] font-bold text-sm transition-colors cursor-pointer shadow-sm focus-visible:outline-[#C9A96E]"
          >
            <Award className="w-4 h-4" aria-hidden="true" />
            <span>{t('academy.certificateButton')}</span>
          </button>
        </div>
      </div>

      {/* Progress Status Bar */}
      <div className="p-5 sm:p-6 rounded-2xl border border-[rgba(201,169,110,0.2)] bg-[#0D1322] flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-1">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#C9A96E]">
            {t('academy.progressTitle')}
          </div>
          <div className="text-lg sm:text-xl font-bold text-[#F8FAFC]">
            {t('academy.progressCompleted', {
              completed: formatNumberLatn(completedCount),
              total: formatNumberLatn(totalLessons),
            })}
          </div>
        </div>

        {/* Progress track */}
        <div className="flex-1 max-w-md">
          <div className="flex justify-between text-xs text-[#94A3B8] mb-1.5 font-mono">
            <span>{t('academy.percentComplete', { percent: formatNumberLatn(progressPercent) })}</span>
            <span>{completedCount}/{totalLessons}</span>
          </div>
          <div className="h-2.5 w-full bg-[#131B2E] rounded-full overflow-hidden border border-[rgba(255,255,255,0.06)]">
            <div
              className="h-full bg-gradient-to-r from-[#C9A96E] to-[#E4D1A8] rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Curriculum Grid */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl sm:text-2xl font-display font-bold text-[#F8FAFC]">
            {t('academy.lessonsHeading')}
          </h2>

          {/* Category Filter tabs */}
          <div className="flex flex-wrap gap-2 text-xs">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#C9A96E]/20 text-[#C9A96E] border-[#C9A96E] font-semibold'
                  : 'bg-[#0D1322] text-[#94A3B8] border-[rgba(255,255,255,0.08)] hover:text-[#F8FAFC]'
              }`}
            >
              {t('academy.allCategories')}
            </button>
            <button
              onClick={() => setSelectedCategory('upi')}
              className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                selectedCategory === 'upi'
                  ? 'bg-[#C9A96E]/20 text-[#C9A96E] border-[#C9A96E] font-semibold'
                  : 'bg-[#0D1322] text-[#94A3B8] border-[rgba(255,255,255,0.08)] hover:text-[#F8FAFC]'
              }`}
            >
              {t('academy.categoryUpi')}
            </button>
            <button
              onClick={() => setSelectedCategory('impersonation')}
              className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                selectedCategory === 'impersonation'
                  ? 'bg-[#C9A96E]/20 text-[#C9A96E] border-[#C9A96E] font-semibold'
                  : 'bg-[#0D1322] text-[#94A3B8] border-[rgba(255,255,255,0.08)] hover:text-[#F8FAFC]'
              }`}
            >
              {t('academy.categoryArrest')}
            </button>
            <button
              onClick={() => setSelectedCategory('seniors')}
              className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                selectedCategory === 'seniors'
                  ? 'bg-[#C9A96E]/20 text-[#C9A96E] border-[#C9A96E] font-semibold'
                  : 'bg-[#0D1322] text-[#94A3B8] border-[rgba(255,255,255,0.08)] hover:text-[#F8FAFC]'
              }`}
            >
              {t('academy.categorySeniors')}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson) => {
            const isCompleted = completedLessonIds.includes(lesson.id);

            return (
              <div
                key={lesson.id}
                className="flex flex-col justify-between rounded-2xl border border-[rgba(201,169,110,0.2)] bg-[#0D1322] p-6 hover:border-[rgba(201,169,110,0.4)] transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3 text-xs text-[#94A3B8]">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#C9A96E]" aria-hidden="true" />
                      <span>{formatNumberLatn(lesson.durationMinutes)} {t('academy.minAbbr')}</span>
                    </div>

                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1 text-[#10B981] font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{t('academy.lessonCompleted')}</span>
                      </span>
                    ) : (
                      <span className="text-[#64748B] font-mono">{t('academy.uncompleted')}</span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-[#F8FAFC] group-hover:text-[#C9A96E] transition-colors mb-2">
                    {t(lesson.titleKey)}
                  </h3>

                  <p className="text-xs text-[#CBD5E1] leading-relaxed mb-6">
                    {t(lesson.summaryKey)}
                  </p>
                </div>

                <div className="pt-4 border-t border-[rgba(201,169,110,0.12)]">
                  <button
                    onClick={() => handleOpenLesson(lesson)}
                    className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#131B2E] hover:bg-[#1E293B] text-xs font-semibold text-[#F8FAFC] border border-[rgba(201,169,110,0.25)] transition-colors cursor-pointer"
                  >
                    <span>{isCompleted ? t('academy.retakeQuiz') : t('academy.startQuiz')}</span>
                    <ArrowRight className="w-4 h-4 text-[#C9A96E] group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Lesson & Quiz Modal */}
      {activeLesson && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#070B14]/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
        >
          <div className="relative w-full max-w-2xl bg-[#0D1322] border border-[rgba(201,169,110,0.3)] rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl my-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-[#C9A96E]">
                  {t(activeLesson.badgeNameKey)}
                </span>
                <h3 className="text-2xl font-display font-bold text-[#F8FAFC] mt-1">
                  {t(activeLesson.titleKey)}
                </h3>
              </div>
              <button
                onClick={handleCloseLesson}
                className="p-2 rounded-lg text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#131B2E] transition-colors cursor-pointer"
                aria-label={t('academy.closeModal')}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Structured Educational Sections */}
            <div className="space-y-4 text-sm text-[#CBD5E1]">
              {activeLesson.sections.map((sec, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#131B2E] border border-[rgba(255,255,255,0.06)] space-y-2">
                  <h4 className="font-semibold text-[#F8FAFC] text-sm">
                    {t(sec.headingKey)}
                  </h4>
                  <p className="leading-relaxed text-xs sm:text-sm text-[#CBD5E1]">
                    {t(sec.contentKey)}
                  </p>
                  {sec.bulletKeys && (
                    <ul className="list-disc pl-5 space-y-1 text-xs text-[#94A3B8] pt-1">
                      {sec.bulletKeys.map((bk, bIdx) => (
                        <li key={bIdx}>{t(bk)}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              {/* Golden Rule Highlight */}
              <div className="p-4 rounded-xl border border-[rgba(201,169,110,0.3)] bg-[rgba(201,169,110,0.08)] text-[#E4D1A8] text-xs font-semibold">
                {t(activeLesson.goldenRuleKey)}
              </div>
            </div>

            {/* Knowledge Check Quiz Section */}
            <div className="pt-4 border-t border-[rgba(201,169,110,0.18)] space-y-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#C9A96E]">
                <HelpCircle className="w-4 h-4" aria-hidden="true" />
                <span>{t('academy.quizTitle')}</span>
              </div>

              <p className="text-sm font-semibold text-[#F8FAFC]">
                {t(activeLesson.quiz[0].questionKey)}
              </p>

              <div className="space-y-2.5">
                {activeLesson.quiz[0].options.map((opt) => {
                  const isSelected = selectedQuizOption === opt.id;
                  let optionStyles = 'border-[rgba(255,255,255,0.08)] bg-[#131B2E] text-[#CBD5E1] hover:border-[rgba(201,169,110,0.3)]';

                  if (quizSubmitted) {
                    if (opt.isCorrect) {
                      optionStyles = 'border-[#10B981] bg-[rgba(16,185,129,0.15)] text-[#10B981] font-semibold';
                    } else if (isSelected && !opt.isCorrect) {
                      optionStyles = 'border-[#F43F5E] bg-[rgba(244,63,94,0.15)] text-[#F43F5E]';
                    }
                  } else if (isSelected) {
                    optionStyles = 'border-[#C9A96E] bg-[rgba(201,169,110,0.15)] text-[#F8FAFC]';
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => !quizSubmitted && setSelectedQuizOption(opt.id)}
                      disabled={quizSubmitted}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer ${optionStyles}`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span>{t(opt.labelKey)}</span>
                        {quizSubmitted && opt.isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" aria-hidden="true" />
                        )}
                      </div>

                      {quizSubmitted && isSelected && (
                        <p className="mt-2 pt-2 border-t border-current/20 text-xs font-normal">
                          {t(opt.explanationKey)}
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                {!quizSubmitted ? (
                  <button
                    onClick={() => handleSubmitQuiz(activeLesson)}
                    disabled={!selectedQuizOption}
                    className="px-5 py-2.5 rounded-xl bg-[#C9A96E] disabled:opacity-50 text-[#070B14] font-bold text-xs sm:text-sm transition-opacity cursor-pointer"
                  >
                    {t('academy.submitAnswer')}
                  </button>
                ) : (
                  <button
                    onClick={handleCloseLesson}
                    className="px-5 py-2.5 rounded-xl bg-[#10B981] text-[#070B14] font-bold text-xs sm:text-sm transition-colors cursor-pointer"
                  >
                    {t('academy.closeModal')}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Certificate Generator Modal */}
      {isCertificateModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#070B14]/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
        >
          <div className="relative w-full max-w-xl bg-[#0D1322] border border-[rgba(201,169,110,0.3)] rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl my-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-[#C9A96E]">
                  {t('academy.certificateTitle')}
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-[#F8FAFC] mt-1">
                  {t('academy.certifiedRakshakTitle')}
                </h3>
              </div>
              <button
                onClick={() => setIsCertificateModalOpen(false)}
                className="p-2 rounded-lg text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#131B2E] transition-colors cursor-pointer"
                aria-label={t('academy.closeModal')}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
              {t('academy.certificateDesc')}
            </p>

            <div className="space-y-2">
              <label htmlFor={nameInputId} className="block text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
                {t('academy.fullNamePlaceholder')}
              </label>
              <input
                id={nameInputId}
                type="text"
                value={learnerName}
                onChange={(e) => setLearnerName(e.target.value)}
                placeholder={t('academy.nameInputPlaceholder')}
                className="w-full px-4 py-2.5 rounded-xl bg-[#131B2E] border border-[rgba(201,169,110,0.3)] text-sm text-[#F8FAFC] placeholder-[#64748B] focus:outline-none focus:border-[#C9A96E]"
              />
            </div>

            {/* Certificate Preview Card */}
            <div className="p-5 rounded-xl border border-[rgba(201,169,110,0.25)] bg-[#070B14] text-center space-y-3">
              <Award className="w-8 h-8 text-[#C9A96E] mx-auto" aria-hidden="true" />
              <div className="text-base sm:text-lg font-bold text-[#F8FAFC]">
                {learnerName.trim() || t('academy.certifiedRakshakTitle')}
              </div>
              <p className="text-xs text-[#94A3B8] max-w-sm mx-auto leading-relaxed">
                {t('academy.certificatePledge')}
              </p>
              <div className="text-[11px] font-mono text-[#64748B]">
                {t('academy.verifiedBy', { issuer: t('academy.certificateIssuer') })}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
              <button
                onClick={handleDownloadSvgCertificate}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#C9A96E] hover:bg-[#E4D1A8] text-[#070B14] font-bold text-xs sm:text-sm transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                <span>{t('academy.downloadCertificate')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
