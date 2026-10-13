import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { QuizQuestionDefinition } from '../../data/scamLabData';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Award,
  ArrowRight,
  ShieldCheck,
  Info
} from 'lucide-react';

interface RedFlagQuizProps {
  questions: QuizQuestionDefinition[];
}

export const RedFlagQuiz: React.FC<RedFlagQuizProps> = ({ questions }) => {
  const { t } = useTranslation();

  // ID-based answer persistence
  const [selectedAnswers, setSelectedAnswers] = useLocalStorage<Record<string, string>>(
    'cyberrakshak_quiz_answers',
    {}
  );
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);

  const currentQuestion = questions[activeQuestionIndex];
  const selectedOptionId = currentQuestion ? selectedAnswers[currentQuestion.id] : undefined;

  const handleSelectOption = (optId: string) => {
    if (!currentQuestion) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optId,
    }));
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setActiveQuestionIndex(0);
  };

  // Compute score across all questions
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(selectedAnswers).length;
  const correctCount = questions.filter(
    (q) => selectedAnswers[q.id] === q.correctOptionId
  ).length;

  const isCompleted = answeredCount === totalQuestions;

  return (
    <div className="space-y-6">
      {/* Quiz Progress Header */}
      <div className="p-4 rounded-xl bg-[#0D1322] border border-[rgba(201,169,110,0.25)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold text-[#C9A96E]">
            {t('scamLab.meta.tabQuiz')}
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-[#F8FAFC]">
            {t('scamLab.meta.title')}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-lg bg-[#131B2E] border border-[rgba(201,169,110,0.2)] text-xs font-semibold text-[#CBD5E1]">
            <span>{t('scamLab.meta.scoreLabel')}: {correctCount} / {totalQuestions}</span>
          </div>

          <button
            onClick={handleResetQuiz}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#131B2E] border border-[rgba(201,169,110,0.25)] text-xs text-[#CBD5E1] hover:text-[#F8FAFC] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t('scamLab.meta.restartQuiz')}</span>
          </button>
        </div>
      </div>

      {/* Question Stepper Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Questions list">
        {questions.map((q, idx) => {
          const isAnswered = Boolean(selectedAnswers[q.id]);
          const isCorrect = selectedAnswers[q.id] === q.correctOptionId;
          const isActive = activeQuestionIndex === idx;

          return (
            <button
              key={q.id}
              onClick={() => setActiveQuestionIndex(idx)}
              role="tab"
              aria-selected={isActive}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap border focus-visible:outline-2 focus-visible:outline-[#C9A96E] ${
                isActive
                  ? 'bg-[#C9A96E] text-[#070B14] border-[#C9A96E] font-bold shadow-xs'
                  : isAnswered
                  ? isCorrect
                    ? 'bg-[#10B981]/15 text-[#6EE7B7] border-[#10B981]/40'
                    : 'bg-[#BE123C]/15 text-[#FDA4AF] border-[#BE123C]/40'
                  : 'bg-[#0D1322] text-[#94A3B8] border-[rgba(201,169,110,0.2)] hover:bg-[#131B2E]'
              }`}
            >
              <span>#{idx + 1}</span>
              {isAnswered && (
                isCorrect ? (
                  <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                ) : (
                  <XCircle className="w-3.5 h-3.5" aria-hidden="true" />
                )
              )}
            </button>
          );
        })}
      </div>

      {currentQuestion && (
        <div className="space-y-6">
          {/* Simulated Vignette Box */}
          <div className="rounded-2xl border border-[rgba(201,169,110,0.3)] bg-[#070B14] p-5 sm:p-7 space-y-3">
            <div className="flex items-center justify-between text-xs text-[#94A3B8] border-b border-[rgba(255,255,255,0.08)] pb-2.5">
              <span className="font-semibold text-[#C9A96E]">
                {t(`scamLab.quiz.${currentQuestion.id}.context`)}
              </span>
              <span>{t(`scamLab.quiz.${currentQuestion.id}.sender`)}</span>
            </div>
            <div className="p-4 rounded-xl bg-[#0D1322] border border-[rgba(201,169,110,0.15)] text-base text-[#F8FAFC] font-medium leading-relaxed">
              "{t(`scamLab.quiz.${currentQuestion.id}.message`)}"
            </div>
          </div>

          {/* Question Prompt */}
          <div className="rounded-2xl border border-[rgba(201,169,110,0.25)] bg-[#0D1322] p-5 sm:p-7 space-y-5">
            <h3 className="text-base sm:text-lg font-bold text-[#F8FAFC]">
              {t(`scamLab.quiz.${currentQuestion.id}.question`)}
            </h3>

            {/* Answer Options */}
            <div className="space-y-3" role="radiogroup" aria-label="Quiz Answer Choices">
              {currentQuestion.optionIds.map((optId) => {
                const isSelected = selectedOptionId === optId;
                const isAnswered = Boolean(selectedOptionId);
                const isCorrectOption = optId === currentQuestion.correctOptionId;

                return (
                  <button
                    key={optId}
                    onClick={() => handleSelectOption(optId)}
                    role="radio"
                    aria-checked={isSelected}
                    className={`w-full text-left p-4 rounded-xl border text-sm sm:text-base font-medium transition-all cursor-pointer flex items-center justify-between gap-4 focus-visible:outline-2 focus-visible:outline-[#C9A96E] ${
                      isAnswered
                        ? isCorrectOption
                          ? 'bg-[#10B981]/15 border-[#10B981] text-[#F8FAFC]'
                          : isSelected
                          ? 'bg-[#BE123C]/15 border-[#BE123C] text-[#F8FAFC]'
                          : 'bg-[#131B2E] border-[rgba(255,255,255,0.06)] text-[#64748B]'
                        : 'bg-[#131B2E] border-[rgba(201,169,110,0.2)] text-[#CBD5E1] hover:bg-[#1A243D] hover:text-[#F8FAFC]'
                    }`}
                  >
                    <span>{t(`scamLab.quiz.${currentQuestion.id}.options.${optId}.text`)}</span>
                    <span className="shrink-0">
                      {isAnswered && isCorrectOption && (
                        <CheckCircle2 className="w-5 h-5 text-[#10B981]" aria-hidden="true" />
                      )}
                      {isAnswered && isSelected && !isCorrectOption && (
                        <XCircle className="w-5 h-5 text-[#BE123C]" aria-hidden="true" />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback & Golden Rule Card once answered */}
          {selectedOptionId && (
            <div className="rounded-2xl border border-[rgba(201,169,110,0.3)] bg-[#0D1322] p-5 sm:p-7 space-y-4 shadow-lg animate-fadeIn">
              <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-3">
                <div className="flex items-center gap-2">
                  {selectedOptionId === currentQuestion.correctOptionId ? (
                    <CheckCircle2 className="w-5 h-5 text-[#10B981]" aria-hidden="true" />
                  ) : (
                    <XCircle className="w-5 h-5 text-[#BE123C]" aria-hidden="true" />
                  )}
                  <h4 className="text-base sm:text-lg font-bold text-[#F8FAFC]">
                    {selectedOptionId === currentQuestion.correctOptionId
                      ? 'Correct Recognition'
                      : 'Common Trap'}
                  </h4>
                </div>
              </div>

              <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
                {t(`scamLab.quiz.${currentQuestion.id}.options.${selectedOptionId}.explanation`)}
              </p>

              {/* Golden Rule */}
              <div className="p-4 rounded-xl bg-[#131B2E] border border-[rgba(201,169,110,0.3)]">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#C9A96E] mb-1">
                  <Info className="w-4 h-4 text-[#C9A96E]" aria-hidden="true" />
                  <span>{t('scamLab.meta.keyTakeaway')}</span>
                </div>
                <p className="text-sm sm:text-base font-semibold text-[#F8FAFC]">
                  {t(`scamLab.quiz.${currentQuestion.id}.goldenRule`)}
                </p>
              </div>

              {/* Next Question Navigation */}
              {activeQuestionIndex < questions.length - 1 && (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setActiveQuestionIndex((prev) => prev + 1)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C9A96E] hover:bg-[#E4D1A8] text-[#070B14] font-bold text-sm transition-colors cursor-pointer"
                  >
                    <span>{t('scamLabMeta.quizNextQuestion')}</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Quiz Completion Banner with Restrained SVG Badge (No confetti!) */}
      {isCompleted && (
        <div className="rounded-2xl border-2 border-[#C9A96E] bg-[#0D1322] p-6 sm:p-8 text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-[rgba(201,169,110,0.15)] border border-[#C9A96E] flex items-center justify-center text-[#C9A96E]">
            <Award className="w-8 h-8" aria-hidden="true" />
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-bold font-display text-[#F8FAFC]">
              {t('scamLab.meta.quizCompletionTitle')}
            </h3>
            <p className="text-sm sm:text-base text-[#CBD5E1] max-w-xl mx-auto">
              {t('scamLab.meta.quizCompletionDesc')}
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#131B2E] border border-[rgba(201,169,110,0.3)] text-base font-bold text-[#C9A96E]">
            <span>{t('scamLab.meta.scoreLabel')}: {correctCount} / {totalQuestions}</span>
          </div>
        </div>
      )}
    </div>
  );
};
