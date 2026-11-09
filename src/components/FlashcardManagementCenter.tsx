/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { usePlatform } from '../PlatformContext';
import { Layers, Plus, Trash2, RotateCw, CheckCircle2 } from 'lucide-react';
import { FlashcardItem } from '../types';

export const FlashcardManagementCenter: React.FC = () => {
  const { subjects, flashcards, addFlashcard, updateCardReview } = usePlatform();

  const [selectedSubId, setSelectedSubId] = useState(subjects[0]?.id || '');
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [frontText, setFrontText] = useState('');
  const [backText, setBackText] = useState('');

  const currentSubject = subjects.find(s => s.id === selectedSubId) || subjects[0];
  const filteredCards = selectedSubId
    ? flashcards.filter(f => f.subjectId === selectedSubId)
    : flashcards;

  const handleSaveCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!frontText || !backText) return;

    addFlashcard({
      subjectId: selectedSubId,
      topicId: currentSubject?.modules[0]?.topics[0]?.id || 'gen-topic',
      front: frontText,
      back: backText,
      difficulty: 'good'
    });

    setFrontText('');
    setBackText('');
    setIsAddingCard(false);
    alert(`تمت إضافة البطاقة بنجاح لمادة [${currentSubject?.name}]`);
  };

  return (
    <div className="space-y-6 text-slate-100" dir="rtl">
      {/* Top Strip */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white">مركز إدارة وتأليف البطاقات التعليمية (Flashcards)</h3>
            <p className="text-xs text-slate-400">إضافة وتعديل بطاقات التكرار المتباعد تبعا لكل مادة وجهاز وموضوع.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedSubId}
            onChange={(e) => setSelectedSubId(e.target.value)}
            className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
          >
            {subjects.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>

          <button
            onClick={() => setIsAddingCard(!isAddingCard)}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>{isAddingCard ? 'إلغاء' : '+ إنشاء بطاقة جديدة'}</span>
          </button>
        </div>
      </div>

      {/* Creation Form */}
      {isAddingCard && (
        <form onSubmit={handleSaveCard} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <h4 className="font-bold text-sm text-purple-400 border-b border-slate-800 pb-2">
            إضافة بطاقة استرجاع نشط لمادة [{currentSubject?.name}]
          </h4>

          <div>
            <label className="block text-xs text-slate-300 mb-1">واجهة البطاقة / السؤال (Front Prompt / Question)</label>
            <textarea
              value={frontText}
              onChange={(e) => setFrontText(e.target.value)}
              placeholder="e.g. What is the classic triad of Wernicke encephalopathy?"
              className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white h-20"
              required
            />
          </div>

          <div>
            <label className="block text-xs text-slate-300 mb-1">ظهر البطاقة / الإجابة الطبية (Back Answer / Explanation)</label>
            <textarea
              value={backText}
              onChange={(e) => setBackText(e.target.value)}
              placeholder="e.g. Confusion, ophthalmoplegia (nystagmus), and ataxia (due to Thiamine B1 deficiency)."
              className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white h-24"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAddingCard(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-xs"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-purple-600 text-white font-semibold text-xs shadow-md"
            >
              حفظ ونشر البطاقة
            </button>
          </div>
        </form>
      )}

      {/* Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCards.map(c => (
          <div key={c.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block mb-1">
                {c.subjectId.toUpperCase()}
              </span>
              <p className="font-bold text-sm text-white mb-2">{c.front}</p>
              <p className="text-xs text-slate-400 border-t border-slate-800 pt-2 leading-relaxed">{c.back}</p>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
              <span>تكرار المراجعة: {c.repetitions} مرات</span>
              <span className="text-purple-400 font-semibold">{c.nextReviewDate}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
