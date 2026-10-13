import React, { useState, useRef, useEffect } from 'react';
import { SCAM_PROFILES } from '../../data/scams';
import { ScamProfile } from '../../types/content';
import { useDeviceCapability } from '../../hooks/useDeviceCapability';
import { ShieldAlert, ChevronRight, X, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface ThreatRadarProps {
  onSelectScam?: (scam: ScamProfile) => void;
}

export const ThreatRadar: React.FC<ThreatRadarProps> = ({ onSelectScam }) => {
  const { t } = useTranslation();
  const { prefersReducedMotion } = useDeviceCapability();
  const [selectedScamId, setSelectedScamId] = useState<string>('upi_collect');
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const triggerButtonRef = useRef<HTMLButtonElement | null>(null);

  const selectedScam = SCAM_PROFILES.find((s) => s.id === selectedScamId) || SCAM_PROFILES[0];

  const radarNodes = SCAM_PROFILES.map((scam, index) => {
    const angle = (index * (360 / SCAM_PROFILES.length) - 90) * (Math.PI / 180);
    const ringRadius = scam.threatSeverity === 'critical' ? 75 : scam.threatSeverity === 'high' ? 115 : 145;
    const cx = 175 + ringRadius * Math.cos(angle);
    const cy = 175 + ringRadius * Math.sin(angle);
    return {
      scam,
      cx,
      cy,
    };
  });

  const handleSelect = (scam: ScamProfile) => {
    setSelectedScamId(scam.id);
    onSelectScam?.(scam);
  };

  const openDialog = () => {
    setIsDialogOpen(true);
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const closeDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
    setIsDialogOpen(false);
    // Return focus to trigger button
    triggerButtonRef.current?.focus();
  };

  // Handle escape key listener on dialog
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (e: Event) => {
      e.preventDefault();
      closeDialog();
    };

    dialog.addEventListener('cancel', handleCancel);
    return () => dialog.removeEventListener('cancel', handleCancel);
  }, []);

  const severityColor = (severity: string) => {
    if (severity === 'critical') return '#F43F5E';
    if (severity === 'high') return '#F59E0B';
    return '#38BDF8';
  };

  return (
    <section className="relative my-12" aria-labelledby="threat-radar-heading">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-[#C9A96E] font-medium">
            {t('home.atlasBadge')}
          </span>
          <h2 id="threat-radar-heading" className="text-2xl md:text-3xl font-display font-bold text-[#F8FAFC] mt-1">
            {t('radar.title')}
          </h2>
          <p className="text-sm text-[#94A3B8] max-w-xl mt-1">
            {t('radar.subtitle')}
          </p>
        </div>

        {/* Severity Legend */}
        <div className="flex items-center gap-4 text-xs text-[#94A3B8] bg-[#0D1322] px-4 py-2 rounded-lg border border-[rgba(201,169,110,0.15)] self-start md:self-auto">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F43F5E]" aria-hidden="true" />
            <span>{t('radar.critical')}</span>
          </div>
          <span className="text-[#64748B]" aria-hidden="true">/</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" aria-hidden="true" />
            <span>{t('radar.high')}</span>
          </div>
          <span className="text-[#64748B]" aria-hidden="true">/</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#38BDF8]" aria-hidden="true" />
            <span>{t('radar.medium')}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Radar SVG Visual Stage (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center rounded-2xl border border-[rgba(201,169,110,0.2)] bg-[#0D1322]/80 backdrop-blur-md p-6 relative overflow-hidden">
          <div className="relative w-full max-w-[360px] aspect-square">
            <svg
              viewBox="0 0 350 350"
              className="w-full h-full overflow-visible"
              role="img"
              aria-label="Interactive Threat Radar with 8 Indian fraud categories"
            >
              <defs>
                <radialGradient id="radarSweepGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#C9A96E" stopOpacity="0.3" />
                  <stop offset="60%" stopColor="#38BDF8" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Concentric distance range rings */}
              <circle cx="175" cy="175" r="145" fill="none" stroke="rgba(201,169,110,0.12)" strokeWidth="1" />
              <circle cx="175" cy="175" r="115" fill="none" stroke="rgba(201,169,110,0.15)" strokeWidth="1" strokeDasharray="4 3" />
              <circle cx="175" cy="175" r="75" fill="none" stroke="rgba(201,169,110,0.22)" strokeWidth="1.2" />
              <circle cx="175" cy="175" r="35" fill="none" stroke="rgba(201,169,110,0.3)" strokeWidth="1" />

              {/* Axis crosshairs */}
              <line x1="175" y1="10" x2="175" y2="340" stroke="rgba(201,169,110,0.12)" strokeWidth="1" />
              <line x1="10" y1="175" x2="340" y2="175" stroke="rgba(201,169,110,0.12)" strokeWidth="1" />

              {/* Radar center hub */}
              <circle cx="175" cy="175" r="6" fill="#C9A96E" />
              <circle cx="175" cy="175" r="12" fill="none" stroke="#C9A96E" strokeWidth="1" opacity="0.6" />

              {/* Animated sweep line */}
              {!prefersReducedMotion && (
                <g className="origin-[175px_175px] animate-[spin_12s_linear_infinite]" style={{ transformOrigin: '175px 175px' }}>
                  <line
                    x1="175"
                    y1="175"
                    x2="175"
                    y2="20"
                    stroke="#C9A96E"
                    strokeWidth="1.5"
                    strokeOpacity="0.75"
                  />
                  <path
                    d="M175 175 L175 20 A155 155 0 0 1 285 70 Z"
                    fill="url(#radarSweepGrad)"
                  />
                </g>
              )}

              {/* Threat Nodes / Blips */}
              {radarNodes.map(({ scam, cx, cy }) => {
                const isSelected = scam.id === selectedScamId;
                const color = severityColor(scam.threatSeverity);
                const title = t(scam.shortKey);

                return (
                  <g
                    key={scam.id}
                    className="cursor-pointer transition-transform hover:scale-125 focus-visible:outline-2 focus-visible:outline-[#C9A96E]"
                    tabIndex={0}
                    role="button"
                    aria-label={`Select scam: ${title}, risk level: ${scam.threatSeverity}`}
                    onClick={() => handleSelect(scam)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSelect(scam);
                      }
                    }}
                  >
                    {/* Ring highlight if selected */}
                    {isSelected && (
                      <circle
                        cx={cx}
                        cy={cy}
                        r="18"
                        fill="none"
                        stroke={color}
                        strokeWidth="1.8"
                        strokeDasharray="3 2"
                        className="animate-spin"
                        style={{ transformOrigin: `${cx}px ${cy}px`, animationDuration: '6s' }}
                      />
                    )}

                    {/* Outer glow target */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r="10"
                      fill={color}
                      fillOpacity={isSelected ? 0.35 : 0.15}
                    />

                    {/* Core node dot */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isSelected ? 6 : 4.5}
                      fill={isSelected ? '#F8FAFC' : color}
                      stroke={isSelected ? color : '#070B14'}
                      strokeWidth="1.5"
                    />

                    {/* Text node label */}
                    <text
                      x={cx}
                      y={cy + (cy > 175 ? 18 : -14)}
                      textAnchor="middle"
                      fill={isSelected ? '#F8FAFC' : '#CBD5E1'}
                      fontSize={isSelected ? '10.5' : '9.5'}
                      fontWeight={isSelected ? '600' : '500'}
                      fontFamily="Inter, Noto Sans Devanagari, sans-serif"
                      className="pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                    >
                      {title}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="w-full mt-4 pt-4 border-t border-[rgba(201,169,110,0.12)] flex flex-wrap items-center justify-between text-xs text-[#94A3B8]">
            <span>{t('home.radarTip')}</span>
            <span className="font-mono text-[#C9A96E]">{t('home.radarMonitored')}</span>
          </div>
        </div>

        {/* Selected Threat Preview Panel (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-[rgba(201,169,110,0.25)] bg-[#0D1322] p-6 shadow-xl relative">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#94A3B8] mb-3">
              <span className="uppercase tracking-wider font-semibold text-[#C9A96E]">
                {t('home.radarScamGuide')}
              </span>
              <span aria-hidden="true">&middot;</span>
              <span className="font-medium" style={{ color: severityColor(selectedScam.threatSeverity) }}>
                {selectedScam.threatSeverity.toUpperCase()} RISK
              </span>
              <span aria-hidden="true">&middot;</span>
              <span>{selectedScam.fictionalSample.channel}</span>
            </div>

            <h3 className="text-xl md:text-2xl font-display font-bold text-[#F8FAFC] leading-snug">
              {t(selectedScam.titleKey)}
            </h3>

            <p className="text-sm text-[#CBD5E1] mt-2 mb-6 leading-relaxed">
              {t(selectedScam.summaryKey)}
            </p>

            {/* Golden Rule Highlight Box */}
            <div className="rounded-xl border border-[rgba(16,185,129,0.3)] bg-[rgba(16,185,129,0.08)] p-4 mb-6">
              <div className="flex items-start gap-2.5">
                <ShieldAlert className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-[#10B981] uppercase tracking-wider mb-1">
                    {t('atlas.goldenRule')}
                  </div>
                  <div className="text-sm text-[#F1F5F9] font-medium leading-relaxed">
                    {t(selectedScam.goldenRuleKey)}
                  </div>
                </div>
              </div>
            </div>

            {/* Common Manipulative Hooks */}
            <div className="mb-6">
              <div className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">
                {t('atlas.commonHooks')}
              </div>
              <div className="font-mono text-xs text-[#CBD5E1] bg-[#131B2E] p-3 rounded-lg border border-[rgba(255,255,255,0.05)] leading-relaxed">
                {t(selectedScam.hooksKey)}
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-[rgba(201,169,110,0.15)] flex flex-col sm:flex-row items-center gap-3">
            <button
              ref={triggerButtonRef}
              onClick={openDialog}
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#131B2E] hover:bg-[#1A243D] text-sm font-medium text-[#F8FAFC] border border-[rgba(201,169,110,0.3)] transition-colors cursor-pointer focus-visible:outline-[#C9A96E]"
            >
              <span>{t('radar.inspect')}</span>
              <ChevronRight className="w-4 h-4 text-[#C9A96E]" />
            </button>

            <Link
              to={`/scam-lab?category=${selectedScam.id}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#C9A96E] hover:bg-[#E4D1A8] text-sm font-semibold text-[#070B14] transition-colors whitespace-nowrap focus-visible:outline-[#C9A96E]"
            >
              <span>{t('atlas.openInLab')}</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Focus-trapped native <dialog> element */}
      <dialog
        ref={dialogRef}
        aria-modal="true"
        aria-labelledby="dialog-scam-title"
        className="fixed inset-0 m-auto z-50 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[rgba(201,169,110,0.35)] bg-[#0D1322] p-6 md:p-8 shadow-2xl text-[#F8FAFC] backdrop:bg-black/80 backdrop:backdrop-blur-sm"
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-[#C9A96E] font-semibold">
              {t('home.radarBreakdownTitle')}
            </div>
            <h3 id="dialog-scam-title" className="text-2xl font-display font-bold mt-1 text-[#F8FAFC]">
              {t(selectedScam.titleKey)}
            </h3>
          </div>
          <button
            onClick={closeDialog}
            className="p-2 rounded-lg text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#131B2E] transition-colors focus-visible:outline-[#C9A96E]"
            aria-label={t('atlas.close')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6 text-sm text-[#CBD5E1]">
          <div>
            <h4 className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">
              {t('atlas.howItWorks')}
            </h4>
            <p className="leading-relaxed bg-[#131B2E] p-4 rounded-xl border border-[rgba(255,255,255,0.06)] text-[#F1F5F9]">
              {t(selectedScam.howItWorksKey)}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">
              {t('home.radarFictionalExample', { channel: selectedScam.fictionalSample.channel })}
            </h4>
            <div className="rounded-xl border border-[rgba(244,63,94,0.3)] bg-[#131B2E] p-4 font-mono text-xs text-[#F1F5F9]">
              <div className="text-[#94A3B8] mb-1">
                {t('home.radarFromPrefix', { sender: t(selectedScam.fictionalSample.senderKey) })}
              </div>
              <div className="p-3 bg-[#070B14] rounded-lg border border-[rgba(255,255,255,0.06)] leading-relaxed">
                {t(selectedScam.fictionalSample.textKey)}
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">
              {t('atlas.immediateAction')}
            </h4>
            <div className="p-3.5 rounded-lg border border-[rgba(201,169,110,0.3)] bg-[rgba(201,169,110,0.06)] text-[#E4D1A8] font-medium leading-relaxed">
              {t(selectedScam.immediateActionKey)}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-[rgba(201,169,110,0.15)] flex justify-end gap-3">
          <button
            onClick={closeDialog}
            className="px-4 py-2 rounded-lg bg-[#131B2E] text-sm text-[#CBD5E1] hover:text-[#F8FAFC] cursor-pointer"
          >
            {t('atlas.close')}
          </button>
          <Link
            to={`/scam-lab?category=${selectedScam.id}`}
            className="px-5 py-2 rounded-lg bg-[#C9A96E] text-sm font-semibold text-[#070B14] hover:bg-[#E4D1A8]"
            onClick={closeDialog}
          >
            {t('atlas.openInLab')}
          </Link>
        </div>
      </dialog>
    </section>
  );
};
