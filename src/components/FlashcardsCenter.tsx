/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { usePlatform } from '../PlatformContext';
import {
  Layers,
  Sparkles,
  RotateCw,
  CheckCircle2,
  AlertCircle,
  Plus,
  BookOpen
} from 'lucide-react';

export const FlashcardsCenter: React.FC = () => {
  const { flashcards, updateCardReview, lang } = usePlatform();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const activeCard = flashcards[currentIdx] || flashcards[0];

  const handleRating = (rating: 'again' | 'hard' | 'good' | 'easy') => {
    updateCardReview(activeCard.id, rating);
    setIsFlipped(false);
    if (currentIdx < flashcards.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setCurrentIdx(0);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#1D4ED8] mb-1">
            <span>{lang === 'ar' ? 'التكرار المتباعد الفعّال' : 'Spaced Repetition Active Recall'}</span>
            <span>·</span>
            <span>{flashcards.length} Cards in Deck</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {lang === 'ar' ? 'مركز البطاقات التعليمية' : 'Flashcards Mastery Center'}
          </h2>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold">
          Card {currentIdx + 1} of {flashcards.length}
        </div>
      </div>

      {/* Interactive 3D Flip Card Container */}
      <div className="flex flex-col items-center justify-center">
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className={`w-full max-w-xl min-h-[300px] bg-white rounded-3xl p-8 border border-slate-200 shadow-lg cursor-pointer flex flex-col justify-between transition-all duration-300 hover:shadow-xl ${
            isFlipped ? 'bg-gradient-to-b from-blue-50/50 to-white border-blue-300' : ''
          }`}
        >
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-bold uppercase tracking-wider text-blue-600">
              {isFlipped ? 'Answer / Clinical Rational' : 'Prompt / Recall Question'}
            </span>
            <span className="flex items-center gap-1">
              <RotateCw className="w-3.5 h-3.5" />
              <span>Tap to flip</span>
            </span>
          </div>

          <div className="py-8 text-center">
            <p className="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed font-serif">
              {isFlipped ? activeCard.back : activeCard.front}
            </p>
          </div>

          <div className="text-center text-xs text-slate-400">
            Subject: {activeCard.subjectId.toUpperCase()} · Next review: {activeCard.nextReviewDate}
          </div>
        </div>

        {/* Spaced Repetition Rating Buttons */}
        {isFlipped ? (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 animate-in fade-in">
            <button
              onClick={() => handleRating('again')}
              className="px-5 py-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold hover:bg-rose-100 transition"
            >
              Again (&lt; 10m)
            </button>
            <button
              onClick={() => handleRating('hard')}
              className="px-5 py-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold hover:bg-amber-100 transition"
            >
              Hard (1d)
            </button>
            <button
              onClick={() => handleRating('good')}
              className="px-5 py-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold hover:bg-blue-100 transition"
            >
              Good (3d)
            </button>
            <button
              onClick={() => handleRating('easy')}
              className="px-5 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold hover:bg-emerald-100 transition"
            >
              Easy (5d)
            </button>
          </div>
        ) : (
          <p className="mt-4 text-xs text-slate-400">Flip card to reveal answer and update review interval</p>
        )}
      </div>
    </div>
  );
};
