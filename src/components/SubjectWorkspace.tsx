/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { usePlatform } from '../PlatformContext';
import {
  ArrowLeft,
  BookOpen,
  HelpCircle,
  Layers,
  FileText,
  CheckCircle2,
  Download,
  Share2,
  Clock,
  Award,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export const SubjectWorkspace: React.FC = () => {
  const {
    subjects,
    selectedSubjectId,
    setCurrentRoute,
    lectures,
    questions,
    flashcards,
    lang,
    studentUser,
    markLectureCompleted,
    toggleFavorite,
    subjectCustomizations,
    getElementContent,
    isElementVisible
  } = usePlatform();

  const [activeTab, setActiveTab] = useState<'overview' | 'modules' | 'lectures' | 'questions' | 'flashcards' | 'resources'>('overview');
  const [selectedModuleIdx, setSelectedModuleIdx] = useState(0);

  const subject = subjects.find(s => s.id === selectedSubjectId) || subjects[0];
  const custom = subjectCustomizations[subject.id] || { hiddenTabs: [] };

  const subjectLectures = lectures.filter(l => l.subjectId === subject.id);
  const subjectQuestions = questions.filter(q => q.subjectId === subject.id);
  const subjectCards = flashcards.filter(f => f.subjectId === subject.id);
  const isFav = studentUser.favorites.includes(subject.id);

  // Subject title and description with individual override fallback
  const displayTitle = custom.customTitleEn || (lang === 'ar' ? (custom.customTitleAr || subject.name) : subject.name);
  const displayDesc = custom.customDescEn || (lang === 'ar' ? (custom.customDescAr || subject.descAr) : subject.desc);

  // Dynamic Tabs filtered by Subject Customization engine (e.g. Anatomy hiding resources)
  const availableTabs = [
    { id: 'overview', elementId: 'subject-workspace-tab-overview', label: lang === 'ar' ? 'نظرة عامة' : 'Overview' },
    { id: 'modules', elementId: 'subject-workspace-tab-topics', label: lang === 'ar' ? 'الوحدات والموضوعات' : 'Curriculum Modules' },
    { id: 'lectures', elementId: 'subject-workspace-tab-lectures', label: lang === 'ar' ? 'المحاضرات والمراجع' : 'Lectures & Files' },
    { id: 'questions', elementId: 'subject-workspace-tab-questions', label: lang === 'ar' ? 'بنك الأسئلة' : 'Question Bank' },
    { id: 'flashcards', elementId: 'subject-workspace-tab-flashcards', label: lang === 'ar' ? 'البطاقات التعليمية' : 'Flashcards' },
    { id: 'resources', elementId: 'subject-workspace-tab-resources', label: lang === 'ar' ? 'المصادر السريرية والأطلس' : 'Clinical Resources' }
  ].filter(tab => !custom.hiddenTabs.includes(tab.id) && isElementVisible(tab.elementId, subject.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Breadcrumb & Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentRoute('academy')}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition"
        >
          <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
          <span>{lang === 'ar' ? 'العودة إلى الأكاديمية' : 'Back to Academy'}</span>
        </button>

        <button
          onClick={() => toggleFavorite(subject.id)}
          className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition ${
            isFav
              ? 'bg-rose-50 border-rose-200 text-rose-600'
              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          {isFav ? '★ Saved to My Favorites' : '☆ Add to Favorites'}
        </button>
      </div>

      {/* Subject Header Banner with Medical Indicator Monitor Integration */}
      <div className="relative bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Soft Ambient Organ Glow */}
        <div className="absolute top-0 end-0 w-80 h-80 bg-gradient-to-bl from-blue-100/50 via-cyan-50/30 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="md:col-span-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#1D4ED8]">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-100">{lang === 'ar' ? subject.categoryAr : subject.categoryEn}</span>
            <span>·</span>
            <span>Accredited Medical Curriculum</span>
            {custom.customTitleEn && (
              <span className="px-2 py-0.5 rounded-md bg-cyan-50 text-cyan-700 text-[10px] font-mono border border-cyan-200">
                Custom Override
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {displayTitle}
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
            {displayDesc}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600">
            <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl">
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>{subjectLectures.length} Lectures</span>
            </span>
            <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl">
              <HelpCircle className="w-3.5 h-3.5 text-cyan-600" />
              <span>{subjectQuestions.length} Clinical Vignettes</span>
            </span>
            <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl">
              <Layers className="w-3.5 h-3.5 text-purple-600" />
              <span>{subjectCards.length} Flashcards</span>
            </span>
          </div>
        </div>

        {/* Anatomical Visual Asset — Integrated 3D Anatomical Organ Showcase */}
        <div className="md:col-span-4 flex justify-center">
          <div className="relative w-56 h-56 rounded-3xl bg-gradient-to-br from-slate-50 via-white to-slate-100/60 border border-slate-200/80 p-4 flex items-center justify-center shadow-lg">
            <img
              src={custom.customCoverImage || subject.image}
              alt={subject.name}
              className="w-full h-full object-contain filter drop-shadow-2xl animate-float"
            />
            {/* Integrated Clinical Metric Badge */}
            <div className="absolute bottom-2 start-2 end-2 bg-white/95 backdrop-blur-md rounded-xl p-2 border border-slate-100 shadow-sm flex items-center justify-between text-[11px]">
              <span className="text-slate-500 font-medium">Topic Mastery</span>
              <span className="font-bold text-blue-600">{subject.progress}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs (Dynamically filtered by Subject Customization) */}
      <div className="flex items-center gap-2 border-b border-slate-200 text-xs font-semibold overflow-x-auto no-scrollbar">
        {availableTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3 px-3 border-b-2 whitespace-nowrap transition ${
              activeTab === tab.id
                ? 'border-[#1D4ED8] text-[#1D4ED8] font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-4">
              <h3 className="font-bold text-base text-slate-900">Syllabus Outline & Core Competencies</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                This curriculum provides systematic coverage designed in accordance with international medical accreditation standards (USMLE, PLAB, and University Board exams).
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {subject.modules.map((mod, i) => (
                  <div key={mod.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-blue-600 font-bold uppercase">Module {i + 1}</span>
                    <h4 className="font-bold text-xs text-slate-900 mt-0.5">{mod.title}</h4>
                    <span className="text-[11px] text-slate-500 block mt-1">{mod.topics.length} Focused Topics</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-4">
              <h3 className="font-bold text-base text-slate-900">Your Study Progress</h3>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${subject.progress}%` }} />
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>Completed Topics</span>
                <span className="font-bold text-slate-900">{subject.progress}%</span>
              </div>
              <button
                onClick={() => setActiveTab('questions')}
                className="w-full py-2.5 rounded-xl bg-[#1D4ED8] hover:bg-blue-700 text-white font-semibold text-xs transition"
              >
                Launch Subject Practice Test
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Modules & Topics */}
      {activeTab === 'modules' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Module Selector */}
          <div className="lg:col-span-4 space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block px-1 mb-2">
              Modules ({subject.modules.length})
            </span>
            {subject.modules.map((m, idx) => (
              <button
                key={m.id}
                onClick={() => setSelectedModuleIdx(idx)}
                className={`w-full text-left rtl:text-right p-4 rounded-2xl border transition ${
                  selectedModuleIdx === idx
                    ? 'bg-blue-50/60 border-blue-300 text-blue-900 font-semibold shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="text-[10px] text-blue-600 font-bold uppercase">Module {idx + 1}</div>
                <div className="text-sm mt-0.5 font-bold">{m.title}</div>
                <div className="text-xs text-slate-500 mt-1">{m.topics.length} Topics Included</div>
              </button>
            ))}
          </div>

          {/* Topics Detail Workspace */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-200 space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-[10px] text-blue-600 font-bold uppercase">Module {selectedModuleIdx + 1}</span>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                {subject.modules[selectedModuleIdx]?.title}
              </h3>
            </div>

            <div className="space-y-4">
              {subject.modules[selectedModuleIdx]?.topics.map(t => (
                <div key={t.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-slate-900">{t.title}</h4>
                    <span className="text-xs text-slate-500">📚 {t.lecturesCount} Lectures</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      Learning Objectives:
                    </span>
                    <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                      {t.objectives.map((obj, i) => (
                        <li key={i}>{obj}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 flex gap-2">
                    <button
                      onClick={() => setActiveTab('lectures')}
                      className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      View Lectures
                    </button>
                    <button
                      onClick={() => setActiveTab('questions')}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 text-xs font-semibold text-white hover:bg-blue-500"
                    >
                      Practice Questions
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Lectures */}
      {activeTab === 'lectures' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subjectLectures.map(lec => {
            const isCompleted = studentUser.completedLectures.includes(lec.id);
            return (
              <div key={lec.id} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 font-bold uppercase text-[10px]">
                      {lec.type}
                    </span>
                    <span className="text-slate-400">{lec.durationOrPages}</span>
                  </div>
                  <h4 className="font-bold text-base text-slate-900">{lec.title}</h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{lec.summary}</p>
                  <p className="text-[11px] text-slate-400 mt-3">Author: {lec.author}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => markLectureCompleted(lec.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                      isCompleted
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isCompleted ? 'Completed' : 'Mark Complete'}</span>
                  </button>

                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Starting download for: ' + lec.title);
                    }}
                    className="flex items-center gap-1 text-xs text-[#1D4ED8] font-semibold hover:underline"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download / Open</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 4: Questions */}
      {activeTab === 'questions' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg text-slate-900">High-Yield Questions ({subjectQuestions.length})</h3>
              <p className="text-xs text-slate-500">Practice clinical vignettes with full diagnostic explanations.</p>
            </div>
            <button
              onClick={() => setCurrentRoute('qbank')}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700"
            >
              Open Interactive Exam Engine
            </button>
          </div>

          <div className="space-y-4">
            {subjectQuestions.map(q => (
              <div key={q.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 font-bold">
                    {q.difficulty}
                  </span>
                  <span className="text-slate-400">{q.type}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-serif">
                  {q.vignette}
                </p>
                <p className="text-sm font-bold text-slate-900">
                  {q.question}
                </p>
                <div className="space-y-2 pt-2">
                  {q.choices.map((c, i) => (
                    <div
                      key={c.id}
                      className="p-3 rounded-xl border border-slate-200 text-xs text-slate-700 hover:bg-slate-50 cursor-pointer flex items-start gap-2"
                    >
                      <span className="font-bold text-slate-500">{String.fromCharCode(65 + i)}.</span>
                      <span>{c.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Flashcards */}
      {activeTab === 'flashcards' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjectCards.map(fc => (
            <div key={fc.id} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400">Card Recall</span>
                <p className="text-sm font-bold text-slate-900 mt-2">{fc.front}</p>
                <p className="text-xs text-slate-600 mt-3 pt-3 border-t border-slate-100">{fc.back}</p>
              </div>
              <div className="mt-4 pt-3 flex justify-between items-center text-[11px] text-slate-400">
                <span>Next review: {fc.nextReviewDate}</span>
                <span className="font-semibold text-blue-600 capitalize">{fc.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
