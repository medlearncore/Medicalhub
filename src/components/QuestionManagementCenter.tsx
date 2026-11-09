/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { usePlatform } from '../PlatformContext';
import {
  HelpCircle,
  Plus,
  Trash2,
  CheckCircle2,
  UploadCloud,
  FileSpreadsheet,
  AlertCircle,
  Check,
  Eye,
  Filter
} from 'lucide-react';
import { QuestionItem, QuestionChoice } from '../types';

export const QuestionManagementCenter: React.FC = () => {
  const { subjects, questions, addQuestion, deleteQuestion, bulkImportQuestions } = usePlatform();

  const [selectedSubId, setSelectedSubId] = useState<string>(subjects[0]?.id || '');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('');
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'High-Yield Hard'>('High-Yield Hard');
  const [qType, setQType] = useState<'Clinical Vignette' | 'Single Best Answer' | 'Image-Based'>('Clinical Vignette');

  const [vignette, setVignette] = useState('');
  const [questionStem, setQuestionStem] = useState('');
  const [generalExplanation, setGeneralExplanation] = useState('');
  const [referenceSource, setReferenceSource] = useState('Harrison Principles of Internal Medicine');

  // Choices state
  const [choices, setChoices] = useState<QuestionChoice[]>([
    { id: 'c1', text: '', isCorrect: true, explanation: 'Primary diagnostic mechanism' },
    { id: 'c2', text: '', isCorrect: false, explanation: 'Incorrect alternative' },
    { id: 'c3', text: '', isCorrect: false, explanation: 'Incorrect alternative' },
    { id: 'c4', text: '', isCorrect: false, explanation: 'Incorrect alternative' }
  ]);

  // Bulk import state
  const [bulkImportText, setBulkImportText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const currentSubject = subjects.find(s => s.id === selectedSubId) || subjects[0];
  const allModules = currentSubject?.modules || [];
  const currentTopic = allModules[0]?.topics[0];

  const filteredQuestions = selectedSubId
    ? questions.filter(q => q.subjectId === selectedSubId)
    : questions;

  const handleChoiceTextChange = (idx: number, text: string) => {
    setChoices(prev => {
      const next = [...prev];
      next[idx] = { ...next[idx], text };
      return next;
    });
  };

  const handleChoiceExplChange = (idx: number, explanation: string) => {
    setChoices(prev => {
      const next = [...prev];
      next[idx] = { ...next[idx], explanation };
      return next;
    });
  };

  const setCorrectChoice = (idx: number) => {
    setChoices(prev =>
      prev.map((c, i) => ({
        ...c,
        isCorrect: i === idx
      }))
    );
  };

  const addChoiceRow = () => {
    setChoices(prev => [
      ...prev,
      {
        id: `c${prev.length + 1}`,
        text: '',
        isCorrect: false,
        explanation: 'Distractor rationale'
      }
    ]);
  };

  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vignette || !questionStem || choices.some(c => !c.text.trim())) {
      alert('الرجاء إدخال نص الحالة السريرية، السؤال، وكافة نصوص الخيارات.');
      return;
    }

    addQuestion({
      subjectId: selectedSubId,
      topicId: selectedTopicId || (currentTopic?.id || 'gen-top'),
      difficulty,
      type: qType,
      vignette,
      question: questionStem,
      choices,
      generalExplanation: generalExplanation || 'Comprehensive clinical explanation.',
      referenceSource: referenceSource || 'Standard Medical References',
      status: 'published'
    });

    // Reset Form
    setVignette('');
    setQuestionStem('');
    setGeneralExplanation('');
    setIsAddingQuestion(false);
    alert('تم حفظ ونشر السؤال السريري بنجاح!');
  };

  const handleBulkImport = () => {
    try {
      const parsed = JSON.parse(bulkImportText);
      if (Array.isArray(parsed)) {
        bulkImportQuestions(parsed);
        setImportStatus(`نجح استيراد وفحص ${parsed.length} سؤالاً بنجاح!`);
        setBulkImportText('');
      } else {
        setImportStatus('خطأ: صيغة الملف يجب أن تكون مصفوفة JSON صالحة.');
      }
    } catch (err) {
      setImportStatus('خطأ في بناء ملف JSON. يرجى مراجعة الأقواس وعلامات التنصيص.');
    }
  };

  return (
    <div className="space-y-6 text-slate-100" dir="rtl">
      {/* Top Controller */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white">مركز إدارة وتأليف بنك الأسئلة المتقدم</h3>
            <p className="text-xs text-slate-400">تأليف الأسئلة السريرية، تصنيف الصعوبة، ربط المراجع، وشرح كل خيار بدقة.</p>
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
            onClick={() => setIsAddingQuestion(!isAddingQuestion)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>{isAddingQuestion ? 'إلغاء' : '+ تأليف سؤال جديد'}</span>
          </button>
        </div>
      </div>

      {/* Authoring Wizard Form */}
      {isAddingQuestion && (
        <form onSubmit={handleSaveQuestion} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <h4 className="font-bold text-sm text-cyan-400 border-b border-slate-800 pb-2">
            نموذج تأليف سؤال سريري متعدد الخيارات (Clinical Vignette MCQ)
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs text-slate-300 mb-1">المادة المرتبطة</label>
              <select
                value={selectedSubId}
                onChange={(e) => setSelectedSubId(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
              >
                {subjects.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs text-slate-300 mb-1">مستوى الصعوبة</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as any)}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
              >
                <option value="Easy">سهل (Foundational / Easy)</option>
                <option value="Medium">متوسط (Intermediate Medium)</option>
                <option value="High-Yield Hard">عالي العائد / صعب (High-Yield Hard)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-slate-300 mb-1">نوع السؤال</label>
              <select
                value={qType}
                onChange={(e) => setQType(e.target.value as any)}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
              >
                <option value="Clinical Vignette">حالة سريرية (Clinical Vignette)</option>
                <option value="Single Best Answer">سؤال مباشر (Single Best Answer)</option>
                <option value="Image-Based">سؤال مستند لصورة (Image-Based)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-300 mb-1">نص الحالة السريرية (Clinical Scenario / Stem)</label>
            <textarea
              value={vignette}
              onChange={(e) => setVignette(e.target.value)}
              placeholder="A 55-year-old male with severe chest pain radiating to his left shoulder..."
              className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white h-24 font-serif"
              required
            />
          </div>

          <div>
            <label className="block text-xs text-slate-300 mb-1">السؤال الأساسي (Question Lead-in)</label>
            <input
              type="text"
              value={questionStem}
              onChange={(e) => setQuestionStem(e.target.value)}
              placeholder="Which of the following is the most likely microscopic finding in this patient?"
              className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white font-bold"
              required
            />
          </div>

          {/* Choices & Distractors with individual explanations */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-300">
                خيارات الإجابة والشرح الخاص بكل مشتت (اختر الإجابة الصحيحة بالدائرة الخضراء):
              </label>
              <button
                type="button"
                onClick={addChoiceRow}
                className="text-[11px] text-cyan-400 hover:underline font-semibold"
              >
                + إضافة خيار إضافي
              </button>
            </div>

            {choices.map((c, i) => (
              <div key={c.id} className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setCorrectChoice(i)}
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs transition ${
                      c.isCorrect
                        ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                        : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                    }`}
                    title={c.isCorrect ? 'الإجابة الصحيحة' : 'اجعلها الإجابة الصحيحة'}
                  >
                    {String.fromCharCode(65 + i)}
                  </button>
                  <input
                    type="text"
                    value={c.text}
                    onChange={(e) => handleChoiceTextChange(i, e.target.value)}
                    placeholder={`نص الخيار (${String.fromCharCode(65 + i)})...`}
                    className="flex-1 p-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                    required
                  />
                  {c.isCorrect && (
                    <span className="text-[10px] text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                      ✓ الإجابة الصحيحة
                    </span>
                  )}
                </div>

                <div className="ms-9">
                  <input
                    type="text"
                    value={c.explanation}
                    onChange={(e) => handleChoiceExplChange(i, e.target.value)}
                    placeholder="شرح وتبرير سبب صحة أو خطأ هذا الخيار بالتحديد..."
                    className="w-full p-1.5 rounded-lg bg-slate-900/60 border border-slate-800 text-[11px] text-slate-300 italic"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-xs text-slate-300 mb-1">الشرح الطبي الشامل (General Clinical Explanation)</label>
              <textarea
                value={generalExplanation}
                onChange={(e) => setGeneralExplanation(e.target.value)}
                placeholder="التفسير السريري الكامل للحالة المرضية والخطة التشخيصية..."
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white h-20"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-300 mb-1">المصدر والمرجع الأكاديمي</label>
              <textarea
                value={referenceSource}
                onChange={(e) => setReferenceSource(e.target.value)}
                placeholder="Robbins Pathologic Basis of Disease, Braunwald Cardiology..."
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white h-20 font-serif"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAddingQuestion(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-xs"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-blue-600 text-white font-semibold text-xs shadow-md"
            >
              حفظ السؤال ونشره في بنك الأسئلة
            </button>
          </div>
        </form>
      )}

      {/* Bulk Import Drawer */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
          <FileSpreadsheet className="w-4 h-4" />
          <span>مركز الاستيراد السريع للأسئلة (Bulk Dataset Import)</span>
        </div>
        <textarea
          value={bulkImportText}
          onChange={(e) => setBulkImportText(e.target.value)}
          placeholder={`[\n  {\n    "subjectId": "${selectedSubId}",\n    "topicId": "top-1",\n    "difficulty": "High-Yield Hard",\n    "type": "Clinical Vignette",\n    "vignette": "Case presentation...",\n    "question": "Question stem...",\n    "choices": [...],\n    "generalExplanation": "Full explanation...",\n    "referenceSource": "Robbins Pathology",\n    "status": "published"\n  }\n]`}
          className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 h-24"
          dir="ltr"
        />
        {importStatus && <p className="text-xs font-bold text-cyan-400">{importStatus}</p>}
        <div className="flex justify-end">
          <button
            onClick={handleBulkImport}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5"
          >
            <UploadCloud className="w-4 h-4" />
            <span>فحص واستيراد الدفعة فورياً</span>
          </button>
        </div>
      </div>

      {/* Questions List of Selected Subject */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span>الأسئلة المسجلة لمادة [{currentSubject?.name}]: {filteredQuestions.length} سؤال</span>
        </div>

        {filteredQuestions.map(q => (
          <div key={q.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-bold">{q.difficulty}</span>
              <span className="text-slate-400">{q.type} · {q.choices.length} خيارات</span>
            </div>
            <p className="text-xs text-slate-300 font-serif leading-relaxed">{q.vignette}</p>
            <p className="text-xs font-bold text-white">❓ {q.question}</p>
            <div className="pt-2 flex justify-between items-center text-[11px] text-slate-500 border-t border-slate-800">
              <span className="truncate max-w-md">المرجع: {q.referenceSource}</span>
              <button
                onClick={() => deleteQuestion(q.id)}
                className="text-rose-400 hover:underline"
              >
                حذف السؤال
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
