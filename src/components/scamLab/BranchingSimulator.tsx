import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LabScenarioDefinition } from '../../data/scamLabData';
import {
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
  Info,
  ShieldAlert,
  MessageSquare
} from 'lucide-react';

interface BranchingSimulatorProps {
  scenario: LabScenarioDefinition;
}

export const BranchingSimulator: React.FC<BranchingSimulatorProps> = ({ scenario }) => {
  const { t } = useTranslation();

  // State tracked by option ID so switching language preserves user's current step & decision
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const handleSelectOption = (optId: string) => {
    setSelectedOptionId(optId);
  };

  const handleReset = () => {
    setSelectedOptionId(null);
  };

  const isSafe = selectedOptionId === scenario.safeBranchId;

  return (
    <div className="space-y-6">
      {/* Simulation Scenario Header */}
      <div className="p-4 rounded-xl bg-[#0D1322] border border-[rgba(201,169,110,0.25)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold text-[#C9A96E]">
            {t(`scamLab.scenarios.${scenario.id}.categoryLabel`)}
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-[#F8FAFC]">
            {t(`scamLab.scenarios.${scenario.id}.title`)}
          </h2>
        </div>

        {selectedOptionId && (
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#131B2E] border border-[rgba(201,169,110,0.25)] text-xs text-[#CBD5E1] hover:text-[#F8FAFC] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t('scamLab.meta.resetSimulation')}</span>
          </button>
        )}
      </div>

      {/* Realistic Message Viewer Mockup */}
      <div className="rounded-2xl border border-[rgba(201,169,110,0.3)] bg-[#070B14] p-5 sm:p-7 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[rgba(255,255,255,0.08)]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#131B2E] border border-[rgba(201,169,110,0.3)] flex items-center justify-center text-[#C9A96E] font-bold text-xs">
              {scenario.channel === 'Video Call' ? 'VC' : 'SMS'}
            </div>
            <div>
              <div className="font-bold text-sm text-[#F8FAFC]">
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

        {/* Narrative Content */}
        <div className="space-y-2 text-[#CBD5E1] leading-relaxed text-base">
          {scenario.segmentIds.map((segId) => (
            <p key={segId}>
              {t(`scamLab.scenarios.${scenario.id}.segments.${segId}.text`)}
            </p>
          ))}
        </div>
      </div>

      {/* Decision Point Card */}
      <div className="rounded-2xl border border-[rgba(201,169,110,0.25)] bg-[#0D1322] p-5 sm:p-7 space-y-5">
        <div className="flex items-start gap-3">
          <MessageSquare className="w-5 h-5 text-[#C9A96E] shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#F8FAFC]">
              {t(`scamLab.scenarios.${scenario.id}.simulation.prompt`)}
            </h3>
            <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
              {t('scamLabMeta.simulatorPromptSubtitle')}
            </p>
          </div>
        </div>

        {/* Branching Options */}
        <div className="space-y-3" role="radiogroup" aria-label={t(`scamLab.scenarios.${scenario.id}.simulation.prompt`)}>
          {scenario.branchIds.map((optId) => {
            const isSelected = selectedOptionId === optId;
            const optIsSafe = optId === scenario.safeBranchId;
            const label = t(`scamLab.scenarios.${scenario.id}.simulation.options.${optId}.label`);

            return (
              <button
                key={optId}
                onClick={() => handleSelectOption(optId)}
                role="radio"
                aria-checked={isSelected}
                className={`w-full text-left p-4 rounded-xl border text-sm sm:text-base font-medium transition-all cursor-pointer flex items-center justify-between gap-4 focus-visible:outline-2 focus-visible:outline-[#C9A96E] ${
                  isSelected
                    ? optIsSafe
                      ? 'bg-[#10B981]/15 border-[#10B981] text-[#F8FAFC] shadow-sm'
                      : 'bg-[#BE123C]/15 border-[#BE123C] text-[#F8FAFC] shadow-sm'
                    : 'bg-[#131B2E] border-[rgba(201,169,110,0.2)] text-[#CBD5E1] hover:bg-[#1A243D] hover:text-[#F8FAFC]'
                }`}
              >
                <span>{label}</span>
                <span className="shrink-0">
                  {isSelected ? (
                    optIsSafe ? (
                      <CheckCircle2 className="w-5 h-5 text-[#10B981]" aria-hidden="true" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-[#BE123C]" aria-hidden="true" />
                    )
                  ) : (
                    <ArrowRight className="w-4 h-4 text-[#64748B]" aria-hidden="true" />
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Constructive Real-World Consequence Feedback Card */}
      {selectedOptionId && (
        <div
          className={`rounded-2xl border p-5 sm:p-7 space-y-4 shadow-lg animate-fadeIn ${
            isSafe
              ? 'bg-[#10B981]/10 border-[#10B981]/40'
              : 'bg-[#BE123C]/10 border-[#BE123C]/40'
          }`}
        >
          <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-3">
            <div className="flex items-center gap-2.5">
              {isSafe ? (
                <ShieldCheck className="w-6 h-6 text-[#10B981]" aria-hidden="true" />
              ) : (
                <ShieldAlert className="w-6 h-6 text-[#BE123C]" aria-hidden="true" />
              )}
              <h4 className="text-base sm:text-lg font-bold text-[#F8FAFC]">
                {t(`scamLab.scenarios.${scenario.id}.simulation.options.${selectedOptionId}.feedbackTitle`)}
              </h4>
            </div>

            <span
              className={`text-xs uppercase tracking-wider px-2.5 py-1 rounded font-bold ${
                isSafe
                  ? 'bg-[#10B981]/20 text-[#6EE7B7] border border-[#10B981]/40'
                  : 'bg-[#BE123C]/20 text-[#FDA4AF] border border-[#BE123C]/40'
              }`}
            >
              {isSafe ? t('scamLab.meta.safeChoiceLabel') : t('scamLab.meta.riskyChoiceLabel')}
            </span>
          </div>

          <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
            {t(`scamLab.scenarios.${scenario.id}.simulation.options.${selectedOptionId}.feedbackExplanation`)}
          </p>

          {/* Golden Rule Takeaway */}
          <div className="p-4 rounded-xl bg-[#0D1322] border border-[rgba(201,169,110,0.3)]">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#C9A96E] mb-1">
              <Info className="w-4 h-4 text-[#C9A96E]" aria-hidden="true" />
              <span>{t('scamLab.meta.keyTakeaway')}</span>
            </div>
            <p className="text-sm sm:text-base font-semibold text-[#F8FAFC]">
              {t(`scamLab.scenarios.${scenario.id}.simulation.options.${selectedOptionId}.goldenRule`)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
