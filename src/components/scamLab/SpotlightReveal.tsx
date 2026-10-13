import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LabScenarioDefinition } from '../../data/scamLabData';
import { useCalmMode } from '../../context/CalmModeContext';
import {
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  ShieldAlert,
  ArrowRight,
  Info,
  Sparkles,
  Search
} from 'lucide-react';

interface SpotlightRevealProps {
  scenario: LabScenarioDefinition;
}

export const SpotlightReveal: React.FC<SpotlightRevealProps> = ({ scenario }) => {
  const { t } = useTranslation();
  const { isCalmMode } = useCalmMode();
  const containerRef = useRef<HTMLDivElement>(null);

  // ID-based state persistence across language switches
  const [revealedSegmentIds, setRevealedSegmentIds] = useState<Set<string>>(new Set());
  const [activeInspectingSegmentId, setActiveInspectingSegmentId] = useState<string | null>(null);
  const [isRevealAll, setIsRevealAll] = useState<boolean>(false);
  const [ariaAnnouncement, setAriaAnnouncement] = useState<string>('');

  // Flashlight position state for cursor tracking (only if not calm mode)
  const [flashlightCoords, setFlashlightCoords] = useState<{ x: number; y: number } | null>(null);
  const [isHovering, setIsHovering] = useState<boolean>(false);

  // Reset or initialize state when scenario changes
  useEffect(() => {
    setRevealedSegmentIds(new Set());
    setActiveInspectingSegmentId(null);
    setIsRevealAll(false);
  }, [scenario.id]);

  const totalFlags = scenario.flagSegmentIds.length;
  const foundFlags = isRevealAll
    ? totalFlags
    : scenario.flagSegmentIds.filter((id) => revealedSegmentIds.has(id)).length;

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isCalmMode || isRevealAll) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setFlashlightCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleSegmentInteraction = (segId: string) => {
    if (!scenario.flagSegmentIds.includes(segId)) return;

    setRevealedSegmentIds((prev) => {
      const next = new Set(prev);
      next.add(segId);
      return next;
    });

    setActiveInspectingSegmentId(segId);

    const flagTitle = t(`scamLab.scenarios.${scenario.id}.segments.${segId}.flagTitle`);
    setAriaAnnouncement(t('scamLab.meta.announcementRevealed', { title: flagTitle }));
  };

  const toggleRevealAll = () => {
    if (isRevealAll) {
      setIsRevealAll(false);
      setAriaAnnouncement(t('scamLab.meta.announcementHideAll'));
    } else {
      setIsRevealAll(true);
      // Mark all as found
      setRevealedSegmentIds(new Set(scenario.flagSegmentIds));
      if (!activeInspectingSegmentId && scenario.flagSegmentIds.length > 0) {
        setActiveInspectingSegmentId(scenario.flagSegmentIds[0]);
      }
      setAriaAnnouncement(t('scamLab.meta.announcementRevealAll'));
    }
  };

  return (
    <div className="space-y-6">
      {/* Aria-live announcement for screen readers */}
      <div role="status" aria-live="polite" className="sr-only">
        {ariaAnnouncement}
      </div>

      {/* Control Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#0D1322] border border-[rgba(201,169,110,0.25)]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#C9A96E]">
              {t(`scamLab.scenarios.${scenario.id}.categoryLabel`)}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#1A243D] text-[#94A3B8] border border-[rgba(201,169,110,0.15)] font-mono">
              {scenario.channel}
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-[#F8FAFC]">
            {t(`scamLab.scenarios.${scenario.id}.title`)}
          </h2>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          {/* Progress Tracker */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#131B2E] border border-[rgba(201,169,110,0.2)] text-xs text-[#CBD5E1]">
            <Search className="w-3.5 h-3.5 text-[#C9A96E]" aria-hidden="true" />
            <span>
              {t('scamLab.meta.foundFlags', { count: foundFlags, total: totalFlags })}
            </span>
            {foundFlags === totalFlags && (
              <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" aria-hidden="true" />
            )}
          </div>

          {/* Reveal All Signature Button */}
          <button
            onClick={toggleRevealAll}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer border focus-visible:outline-2 focus-visible:outline-[#C9A96E] ${
              isRevealAll
                ? 'bg-[#C9A96E] text-[#070B14] border-[#C9A96E]'
                : 'bg-[#131B2E] text-[#F8FAFC] border-[rgba(201,169,110,0.3)] hover:bg-[#1A243D]'
            }`}
            aria-pressed={isRevealAll}
          >
            {isRevealAll ? (
              <>
                <EyeOff className="w-4 h-4" aria-hidden="true" />
                <span>{t('scamLab.meta.hideAllButton')}</span>
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" aria-hidden="true" />
                <span>{t('scamLab.meta.revealAllButton')}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Instructions callout */}
      <div className="text-xs text-[#94A3B8] flex flex-wrap items-center gap-x-4 gap-y-1">
        <span>{t('scamLab.meta.spotlightInstruction')}</span>
        <span className="hidden md:inline text-[rgba(201,169,110,0.4)]">|</span>
        <span>{t('scamLab.meta.keyboardInstruction')}</span>
      </div>

      {/* Interactive Mockup Container */}
      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerEnter={() => setIsHovering(true)}
        onPointerLeave={() => setIsHovering(false)}
        className="relative rounded-2xl border border-[rgba(201,169,110,0.3)] bg-[#070B14] p-5 sm:p-8 overflow-hidden shadow-xl"
        style={{
          minHeight: '340px',
        }}
      >
        {/* Flashlight Radial Mask Layer (Visual aid only, text remains in DOM) */}
        {!isCalmMode && !isRevealAll && isHovering && flashlightCoords && (
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-150"
            style={{
              background: `radial-gradient(circle 160px at ${flashlightCoords.x}px ${flashlightCoords.y}px, rgba(201, 169, 110, 0.12), transparent 75%)`,
            }}
            aria-hidden="true"
          />
        )}

        {/* Message Header Mockup */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-[rgba(255,255,255,0.08)]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#131B2E] border border-[rgba(201,169,110,0.3)] flex items-center justify-center text-[#C9A96E] font-bold text-sm">
              {scenario.channel === 'Video Call' ? 'VC' : 'SMS'}
            </div>
            <div>
              <div className="font-bold text-sm sm:text-base text-[#F8FAFC]">
                {t(`scamLab.scenarios.${scenario.id}.senderDisplay`)}
              </div>
              <div className="text-xs text-[#94A3B8]">
                {t(`scamLab.scenarios.${scenario.id}.senderSubtitle`)}
              </div>
            </div>
          </div>
          <span className="text-xs text-[#64748B]">
            {t(`scamLab.scenarios.${scenario.id}.timestamp`)}
          </span>
        </div>

        {/* Segmented Message Body (ID-driven semantic chunks) */}
        <div className="space-y-3 leading-relaxed text-base sm:text-lg">
          {scenario.segmentIds.map((segId) => {
            const isRedFlag = scenario.flagSegmentIds.includes(segId);
            const isRevealed = isRevealAll || revealedSegmentIds.has(segId);
            const isSelected = activeInspectingSegmentId === segId;
            const text = t(`scamLab.scenarios.${scenario.id}.segments.${segId}.text`);

            if (!isRedFlag) {
              return (
                <p key={segId} className="text-[#CBD5E1]">
                  {text}
                </p>
              );
            }

            return (
              <div
                key={segId}
                tabIndex={0}
                role="button"
                aria-pressed={isRevealed}
                onClick={() => handleSegmentInteraction(segId)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSegmentInteraction(segId);
                  }
                }}
                className={`group relative p-3 sm:p-4 rounded-xl border transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C9A96E] ${
                  isRevealed
                    ? isSelected
                      ? 'bg-[#BE123C]/15 border-[#BE123C] ring-2 ring-[#BE123C]/50'
                      : 'bg-[#C9A96E]/10 border-[#C9A96E] hover:bg-[#C9A96E]/15'
                    : 'bg-[#0D1322] border-[rgba(201,169,110,0.2)] hover:border-[#C9A96E]/60'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className={`font-medium ${isRevealed ? 'text-[#F8FAFC]' : 'text-[#E2E8F0]'}`}>
                    {text}
                  </span>

                  {/* Indicator Icon */}
                  <span className="shrink-0 mt-0.5">
                    {isRevealed ? (
                      <AlertTriangle className="w-4 h-4 text-[#C9A96E]" aria-hidden="true" />
                    ) : (
                      <HelpCircle className="w-4 h-4 text-[#64748B] group-hover:text-[#C9A96E]" aria-hidden="true" />
                    )}
                  </span>
                </div>

                {isRevealed && (
                  <div className="mt-2 text-xs font-semibold text-[#C9A96E] flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{t(`scamLab.scenarios.${scenario.id}.segments.${segId}.flagTitle`)}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Red-Flag Detail Inspection Panel */}
      {activeInspectingSegmentId && scenario.flagSegmentIds.includes(activeInspectingSegmentId) && (
        <div className="rounded-xl border border-[rgba(201,169,110,0.35)] bg-[#0D1322] p-5 sm:p-6 space-y-4 shadow-lg animate-fadeIn">
          <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#C9A96E]" aria-hidden="true" />
              <h3 className="text-base sm:text-lg font-bold text-[#F8FAFC]">
                {t(`scamLab.scenarios.${scenario.id}.segments.${activeInspectingSegmentId}.flagTitle`)}
              </h3>
            </div>
            <span className="text-xs uppercase tracking-wider px-2.5 py-1 rounded bg-[#BE123C]/20 text-[#FDA4AF] border border-[#BE123C]/40 font-semibold">
              {t('scamLab.meta.riskyChoiceLabel')}
            </span>
          </div>

          <div className="space-y-3 text-sm sm:text-base">
            <div>
              <div className="text-xs uppercase tracking-wider font-semibold text-[#94A3B8] mb-1">
                {t('scamLab.meta.howItWorksTitle')}
              </div>
              <p className="text-[#CBD5E1] leading-relaxed">
                {t(`scamLab.scenarios.${scenario.id}.segments.${activeInspectingSegmentId}.flagExplanation`)}
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-[#131B2E] border border-[rgba(201,169,110,0.25)]">
              <div className="text-xs uppercase tracking-wider font-semibold text-[#C9A96E] mb-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" aria-hidden="true" />
                <span>{t('scamLab.meta.howToVerifyTitle')}</span>
              </div>
              <p className="text-[#E2E8F0] leading-relaxed text-sm">
                {t(`scamLab.scenarios.${scenario.id}.segments.${activeInspectingSegmentId}.flagHowToVerify`)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
