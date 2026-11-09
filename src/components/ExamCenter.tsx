/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { usePlatform } from '../PlatformContext';
import {
  HelpCircle,
  Clock,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Flag,
  ChevronRight,
  ChevronLeft,
  Award,
  Sparkles,
  BookOpen
} from 'lucide-react';

export const ExamCenter: React.FC = () => {
  const { questions, lang, setCurrentRoute } = usePlatform();

  // Mode: Learning Mode (immediate feedback) vs Exam Mode (timed, submit at end)
  const [examMode, setExamMode] = useState<'learning' | 'timed'>('learning');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const activeQuestion = questions[currentIdx] || questions[0];
  const totalQuestions = questions.length;
  const currentSelection = selectedAnswers[activeQuestion.id];
  const isFlagged = flaggedQuestions.includes(activeQuestion.id);

  const handleSelectChoice = (choiceId: string) => {
    if (isSubmitted && examMode === 'timed') return;
    setSelectedAnswers(prev => ({
      ...prev,
      [activeQuestion.id]: choiceId
    }));
    if (examMode === 'learning') {
      setShowExplanation(true);
    }
  };

  const toggleFlag = () => {
    setFlaggedQuestions(prev =>
      prev.includes(activeQuestion.id)
        ? prev.filter(id => id !== activeQuestion.id)
        : [...prev, activeQuestion.id]
    );
  };

  const handleNext = () => {
    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx(currentIdx + 1);
      setShowExplanation(examMode === 'learning' && !!selectedAnswers[questions[currentIdx + 1]?.id]);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
      setShowExplanation(examMode === 'learning' && !!selectedAnswers[questions[currentIdx - 1]?.id]);
    }
  };

  const handleSubmitExam = () => {
    setIsSubmitted(true);
    setShowExplanation(true);
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setFlaggedQuestions([]);
    setIsSubmitted(false);
    setShowExplanation(false);
    setCurrentIdx(0);
  };

  // Score calculation
  const correctCount = questions.reduce((acc, q) => {
    const chosen = selectedAnswers[q.id];
    const correctChoice = q.choices.find(c => c.isCorrect);
    return acc + (chosen === correctChoice?.id ? 1 : 0);
  }, 0);

  const scorePercent = Math.round((correctCount / totalQuestions) * 100);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Top Controller Strip */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-base text-slate-900">
              {lang === 'ar' ? 'مركز الاختبارات والتدريب السريري' : 'Clinical Practice & Examination Center'}
            </h2>
            <p className="text-xs text-slate-500">
              Question {currentIdx + 1} of {totalQuestions} · High-Yield Diagnostic Bank
            </p>
          </div>
        </div>

        {/* Mode Selector */}
        {!isSubmitted && (
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => {
                setExamMode('learning');
                setShowExplanation(!!currentSelection);
              }}
              className={`px-3 py-1.5 rounded-lg transition ${
                examMode === 'learning' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lang === 'ar' ? 'وضع التعلّم الفوري' : 'Learning Mode (Immediate Feedback)'}
            </button>
            <button
              onClick={() => {
                setExamMode('timed');
                setShowExplanation(false);
              }}
              className={`px-3 py-1.5 rounded-lg transition ${
                examMode === 'timed' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lang === 'ar' ? 'وضع الامتحان' : 'Exam Mode (Full Simulation)'}
            </button>
          </div>
        )}
      </div>

      {/* Main Question Card */}
      {!isSubmitted ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          {/* Header Metadata */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-blue-600 uppercase">{activeQuestion.subjectId}</span>
              <span>·</span>
              <span className="text-slate-500">{activeQuestion.difficulty}</span>
            </div>

            <button
              onClick={toggleFlag}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-medium transition ${
                isFlagged ? 'bg-amber-50 border-amber-300 text-amber-700' : 'border-slate-200 text-slate-500 hover:bg-slate-50'
              }`}
            >
              <Flag className="w-3.5 h-3.5" />
              <span>{isFlagged ? 'Flagged for Review' : 'Mark for Review'}</span>
            </button>
          </div>

          {/* Clinical Vignette Stem */}
          <div className="space-y-3">
            <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-serif">
              {activeQuestion.vignette}
            </p>
            <p className="text-sm sm:text-base font-bold text-slate-900 pt-2">
              {activeQuestion.question}
            </p>
          </div>

          {/* Multi-Choice Options */}
          <div className="space-y-3 pt-2">
            {activeQuestion.choices.map((c, i) => {
              const isSelected = currentSelection === c.id;
              let choiceStyle = "bg-white border-slate-200 hover:bg-slate-50 text-slate-800";

              if (examMode === 'learning' && isSelected) {
                choiceStyle = c.isCorrect
                  ? "bg-emerald-50 border-emerald-500 text-emerald-900 font-medium"
                  : "bg-rose-50 border-rose-500 text-rose-900 font-medium";
              } else if (examMode === 'timed' && isSelected) {
                choiceStyle = "bg-blue-50 border-blue-600 text-blue-950 font-medium";
              }

              return (
                <div
                  key={c.id}
                  onClick={() => handleSelectChoice(c.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 text-xs sm:text-sm ${choiceStyle}`}
                >
                  <span className="w-6 h-6 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center font-bold text-slate-700 shrink-0 text-xs">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <div className="flex-1">
                    <p>{c.text}</p>
                    {/* Immediate explanation in Learning Mode */}
                    {examMode === 'learning' && currentSelection && (
                      <p className="mt-2 text-xs text-slate-600 pt-2 border-t border-slate-200/60">
                        {c.explanation}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* General Explanation Card (Learning Mode or Post Submission) */}
          {showExplanation && (
            <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-2 text-xs">
              <span className="font-bold text-blue-900 uppercase tracking-wider block">
                Comprehensive Diagnostic Explanation
              </span>
              <p className="text-slate-800 leading-relaxed font-serif">
                {activeQuestion.generalExplanation}
              </p>
              <p className="text-slate-500 italic pt-1">
                Reference Source: {activeQuestion.referenceSource}
              </p>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentIdx === 0}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 disabled:opacity-40 hover:bg-slate-50 transition flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
              <span>Previous</span>
            </button>

            <div className="flex gap-2">
              {currentIdx === totalQuestions - 1 ? (
                <button
                  onClick={handleSubmitExam}
                  className="px-6 py-2 rounded-xl bg-[#1D4ED8] hover:bg-blue-700 text-white text-xs font-semibold shadow-md transition"
                >
                  Submit Examination
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition flex items-center gap-1.5"
                >
                  <span>Next Question</span>
                  <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Results & Score Card */
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center mx-auto text-2xl font-extrabold">
            {scorePercent}%
          </div>
          <div>
            <h3 className="text-2xl font-extrabold text-slate-900">Examination Completed</h3>
            <p className="text-sm text-slate-500 mt-1">
              You scored {correctCount} out of {totalQuestions} correct questions ({scorePercent}% mastery).
            </p>
          </div>

          <div className="flex justify-center gap-3 pt-4">
            <button
              onClick={handleRetake}
              className="px-5 py-2.5 rounded-xl bg-[#1D4ED8] hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Test Session</span>
            </button>
            <button
              onClick={() => setCurrentRoute('academy')}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition"
            >
              Return to Academy
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
