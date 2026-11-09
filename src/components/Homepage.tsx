/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { usePlatform } from '../PlatformContext';
import {
  ArrowRight,
  BookOpen,
  HelpCircle,
  Layers,
  Sparkles,
  Users,
  CheckCircle2,
  TrendingUp,
  FileText,
  Search,
  ExternalLink
} from 'lucide-react';
import { AnatomicalCard } from './AnatomicalCard';

export const Homepage: React.FC = () => {
  const {
    lang,
    brand,
    subjects,
    lectures,
    questions,
    flashcards,
    setCurrentRoute,
    setSelectedSubjectId,
    uiElements,
    getElementContent,
    isElementVisible
  } = usePlatform();
  const [activeTab, setActiveTab] = useState<'all' | 'basic' | 'systems' | 'clinical'>('all');

  const filteredSubjects = activeTab === 'all'
    ? subjects
    : subjects.filter(s => s.group === activeTab);

  const heroUI = uiElements.find(u => u.id === 'hero-section');
  const tracksUI = uiElements.find(u => u.id === 'university-track-overview');

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Hero Section */}
      {isElementVisible('home-hero-title') && (
        <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/60 via-white to-transparent py-14 sm:py-20 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & Actions */}
            <div className="lg:col-span-7 space-y-6">
              {isElementVisible('home-hero-badge') && (
                <div className="flex items-center gap-2 text-xs font-semibold text-[#1D4ED8]">
                  <span>
                    {getElementContent('home-hero-badge', lang === 'ar' ? 'الأكاديمية الطبية الرقمية المتكاملة · من السنة الأولى حتى سنة الامتياز' : 'Digital Medical University & Clinical Hub · Year 1 to Residency')}
                  </span>
                </div>
              )}

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                {getElementContent('home-hero-title', lang === 'ar' ? 'ادرس الطب وكأنه صُمّم من أجلك.' : 'Study medicine like it was designed for you.')}
              </h1>

              {isElementVisible('home-hero-desc') && (
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                  {getElementContent('home-hero-desc', lang === 'ar' ? 'محاضرات، بنوك أسئلة، بطاقات تعليمية وتتبع للتقدم — منظمة حسب المادة والجهاز والتخصص.' : 'Lectures, question banks, flashcards and progress — organized by subject, system and specialty.')}
                </p>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {isElementVisible('home-hero-btn-primary') && (
                  <button
                    onClick={() => setCurrentRoute('academy')}
                    className="px-6 py-3.5 rounded-xl bg-[#1D4ED8] hover:bg-blue-700 active:scale-95 text-white font-semibold text-sm shadow-lg shadow-blue-500/20 transition flex items-center gap-2"
                  >
                    <span>{getElementContent('home-hero-btn-primary', lang === 'ar' ? 'استكشف المناهج الطبية' : 'Explore Medical Academy')}</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </button>
                )}

                {isElementVisible('home-hero-btn-secondary') && (
                  <button
                    onClick={() => setCurrentRoute('qbank')}
                    className="px-6 py-3.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold text-sm shadow-xs transition"
                  >
                    {getElementContent('home-hero-btn-secondary', lang === 'ar' ? 'ابدأ بنك الأسئلة السريرية' : 'Launch Clinical Q-Bank')}
                  </button>
                )}
              </div>

              {/* Verified Metrics Strip (No floating random badge clutter) */}
              <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-6 text-slate-700">
                <div>
                  <div className="font-extrabold text-2xl sm:text-3xl text-slate-900 tabular-nums">
                    {subjects.length}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {lang === 'ar' ? 'مادة دراسية معتمدة' : 'Accredited Subjects'}
                  </div>
                </div>

                <div>
                  <div className="font-extrabold text-2xl sm:text-3xl text-slate-900 tabular-nums">
                    {questions.length}+
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {lang === 'ar' ? 'سؤال سريري مدقق' : 'Clinical Vignettes'}
                  </div>
                </div>

                <div>
                  <div className="font-extrabold text-2xl sm:text-3xl text-slate-900 tabular-nums">
                    {lectures.length}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {lang === 'ar' ? 'محاضرة ومرجع رقمي' : 'Lectures & References'}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: High-Fidelity Anatomical Centerpiece */}
            <div className="lg:col-span-5 flex justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/10 to-cyan-400/20 rounded-full blur-3xl -z-10" />
              <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-slate-200 shadow-xl max-w-sm w-full space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1D4ED8] uppercase tracking-wider">
                    Featured Organ System
                  </span>
                  <span className="text-xs text-slate-500">Cardiovascular</span>
                </div>
                
                <div className="flex justify-center py-2">
                  <img
                    src="/assets/aistudio/heart_2d39ae2d.png"
                    alt="Cardiovascular Heart Anatomy"
                    className="w-56 h-56 object-contain drop-shadow-2xl animate-pulse duration-1000"
                  />
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <span>Wiggers Diagram & Valvular Cycle</span>
                  <button
                    onClick={() => {
                      setSelectedSubjectId('cardiovascular');
                      setCurrentRoute('subject-workspace');
                    }}
                    className="text-[#1D4ED8] font-semibold hover:underline"
                  >
                    {lang === 'ar' ? 'فتح المادة' : 'Open Workspace'} →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 2. Medical Academy Tracks & Taxonomy */}
      {tracksUI?.isVisible && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#1D4ED8] mb-1">
                <span>{lang === 'ar' ? 'المسارات الأكاديمية' : 'University & Clinical Pathways'}</span>
                <span>·</span>
                <span>{filteredSubjects.length} Disciplines Available</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {lang === 'ar' ? tracksUI.titleAr : tracksUI.titleEn}
              </h2>
              <p className="text-sm text-slate-500 mt-1 max-w-2xl">
                {lang === 'ar' ? tracksUI.subtitleAr : tracksUI.subtitleEn}
              </p>
            </div>

            {/* Segmented Filter Control (Not a Pill Badge) */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200 self-start md:self-auto text-xs font-medium">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  activeTab === 'all' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lang === 'ar' ? 'الكل' : 'All Tracks'}
              </button>
              <button
                onClick={() => setActiveTab('basic')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  activeTab === 'basic' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lang === 'ar' ? 'العلوم الأساسية' : 'Basic Sciences'}
              </button>
              <button
                onClick={() => setActiveTab('systems')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  activeTab === 'systems' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lang === 'ar' ? 'أجهزة الجسم' : 'Organ Systems'}
              </button>
              <button
                onClick={() => setActiveTab('clinical')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  activeTab === 'clinical' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lang === 'ar' ? 'التخصصات السريرية' : 'Clinical Specialties'}
              </button>
            </div>
          </div>

          {/* Grid of Medical Subjects — Reusable AnatomicalCard Component */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSubjects.map(sub => (
              <AnatomicalCard
                key={sub.id}
                id={sub.id}
                name={sub.name}
                category={lang === 'ar' ? sub.categoryAr : sub.categoryEn}
                image={sub.image}
                desc={lang === 'ar' ? sub.descAr : sub.desc}
                progress={sub.progress}
                lecturesCount={sub.lecturesCount}
                qCount={sub.qCount}
                flashcardsCount={sub.flashcardsCount}
                organMetricLabel={`${sub.topicsCount} Topics`}
                onClick={() => {
                  setSelectedSubjectId(sub.id);
                  setCurrentRoute('subject-workspace');
                }}
              />
            ))}
          </div>
        </section>
      )}

      {/* 3. Comprehensive Integrated Learning Ecosystem Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 sm:p-12 shadow-2xl grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold">Integrated Lecture Library</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Full-fidelity academic references: PDF textbooks, clinical anatomy plates, lecture slide decks, and video masterclasses preserved without distortion.
            </p>
            <button
              onClick={() => setCurrentRoute('library')}
              className="text-xs text-cyan-400 font-semibold hover:underline flex items-center gap-1 pt-1"
            >
              <span>{lang === 'ar' ? 'استعراض المكتبة' : 'Browse Library'}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </button>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold">Clinical Vignette Question Bank</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Step 1 & Step 2 style multi-sentence patient scenarios with exhaustive explanations for correct options and distractor rationales.
            </p>
            <button
              onClick={() => setCurrentRoute('qbank')}
              className="text-xs text-cyan-400 font-semibold hover:underline flex items-center gap-1 pt-1"
            >
              <span>{lang === 'ar' ? 'بدء جلسة تدريب' : 'Start Practice Session'}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </button>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-400">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold">Active Recall Spaced Repetition</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Scientifically scheduled flashcard reviews targeting memory consolidation before forgetting curves drop.
            </p>
            <button
              onClick={() => setCurrentRoute('flashcards')}
              className="text-xs text-cyan-400 font-semibold hover:underline flex items-center gap-1 pt-1"
            >
              <span>{lang === 'ar' ? 'مراجعة البطاقات اليوم' : 'Review Due Cards'}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
