/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { usePlatform } from './PlatformContext';
import { Navbar } from './components/Navbar';
import { Homepage } from './components/Homepage';
import { SubjectWorkspace } from './components/SubjectWorkspace';
import { ExamCenter } from './components/ExamCenter';
import { FlashcardsCenter } from './components/FlashcardsCenter';
import { AIAssistant } from './components/AIAssistant';
import { AdminHeadquarters } from './components/AdminHeadquarters';
import { AdminGatewayModal, FloatingAdminIcon } from './components/AdminGateway';
import { VisualWebsiteEditorModal } from './components/VisualWebsiteEditorModal';
import { AnatomicalCard } from './components/AnatomicalCard';
import { BookOpen, Layers, Award, TrendingUp, CheckCircle2, Bookmark, Clock, ArrowRight } from 'lucide-react';

export default function App() {
  const {
    currentRoute,
    setCurrentRoute,
    studentUser,
    subjects,
    lectures,
    lang,
    brand,
    setSelectedSubjectId,
    setIsAdminGatewayOpen,
    getElementContent
  } = usePlatform();

  // If viewing the Admin Headquarters, render full screen independent command center
  if (currentRoute === 'admin') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-600/30">
        <AdminHeadquarters />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-[#0f172a] selection:bg-blue-600/10 selection:text-blue-700">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Routed Area */}
      <main className="flex-1">
        {currentRoute === 'home' && <Homepage />}
        
        {currentRoute === 'academy' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#1D4ED8] mb-1">
                <span>{lang === 'ar' ? 'الأكاديمية الطبية' : 'Medical Academy Tracks'}</span>
                <span>·</span>
                <span>University & USMLE Elective</span>
              </div>
              <h1 className="text-3xl font-extrabold text-slate-900">
                {lang === 'ar' ? 'المناهج والمسارات الأكاديمية' : 'Curricula & Disciplines'}
              </h1>
              <p className="text-sm text-slate-500 mt-1 max-w-2xl">
                Browse by organ systems, foundational sciences, and clinical specialties with dedicated workspaces for every course.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {subjects.map(s => (
                <AnatomicalCard
                  key={s.id}
                  id={s.id}
                  name={s.name}
                  category={lang === 'ar' ? s.categoryAr : s.categoryEn}
                  image={s.image}
                  desc={lang === 'ar' ? s.descAr : s.desc}
                  progress={s.progress}
                  lecturesCount={s.lecturesCount}
                  qCount={s.qCount}
                  flashcardsCount={s.flashcardsCount}
                  organMetricLabel={`${s.topicsCount} Topics`}
                  onClick={() => {
                    setSelectedSubjectId(s.id);
                    setCurrentRoute('subject-workspace');
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {currentRoute === 'dashboard' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            {/* Student Welcome Card */}
            <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[220px]">
              <div>
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">
                  Year 4 Clinical Clerkship
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold mt-3">
                  Welcome back, {studentUser.name} 👋
                </h1>
                <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-xl">
                  You are currently on a 12-day study streak. 24 flashcards and 2 cardiovascular vignette modules are scheduled for today.
                </p>
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <button
                  onClick={() => setCurrentRoute('flashcards')}
                  className="px-5 py-2.5 rounded-xl bg-white text-[#1D4ED8] font-bold text-xs shadow-md hover:bg-slate-50 transition"
                >
                  Review Flashcards (24 Due)
                </button>
                <button
                  onClick={() => setCurrentRoute('qbank')}
                  className="px-5 py-2.5 rounded-xl bg-blue-900/40 border border-white/20 text-white font-semibold text-xs hover:bg-blue-900/60 transition"
                >
                  Launch Daily Quiz
                </button>
              </div>
            </div>

            {/* Dashboard Sections: Fixed Unified Structure */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Followed Subjects & Recent Progress */}
              <div className="lg:col-span-8 space-y-6">
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-base text-slate-900">Followed Subjects & Mastery</h3>
                    <span className="text-xs text-slate-400">Synced Real-Time</span>
                  </div>

                  <div className="space-y-3">
                    {subjects.slice(0, 4).map(sub => (
                      <div
                        key={sub.id}
                        onClick={() => {
                          setSelectedSubjectId(sub.id);
                          setCurrentRoute('subject-workspace');
                        }}
                        className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-100 transition cursor-pointer flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <img src={sub.image} alt={sub.name} className="w-10 h-10 object-contain p-1 bg-white rounded-xl border border-slate-200" />
                          <div>
                            <h4 className="font-bold text-xs text-slate-900">{sub.name}</h4>
                            <span className="text-[11px] text-slate-400">{sub.topicsCount} Topics · {sub.qCount} Questions</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-24 bg-slate-200 rounded-full h-2 hidden sm:block">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${sub.progress}%` }} />
                          </div>
                          <span className="text-xs font-bold text-blue-700">{sub.progress}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Study Statistics & Announcements */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                  <h3 className="font-bold text-base text-slate-900">Recent Platform Updates</h3>
                  <div className="space-y-3">
                    <div className="p-3 rounded-2xl bg-blue-50/60 border border-blue-100">
                      <span className="text-[10px] font-bold text-blue-700 uppercase">Academic Bulletin</span>
                      <p className="text-xs font-bold text-slate-900 mt-1">USMLE Step 1 Clinical Vignette Bank Expanded</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">350 new high-yield multi-step questions live.</p>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-600 uppercase">Library Addition</span>
                      <p className="text-xs font-bold text-slate-900 mt-1">3D Cardiovascular Hemodynamics Atlas</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">Available for direct offline reading.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentRoute === 'library' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900">Integrated Lecture Library</h1>
              <p className="text-sm text-slate-500 mt-1">
                Verified medical textbooks, slide decks, and clinical video masterclasses.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {lectures.map(lec => (
                <div key={lec.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-3">
                      <span className="px-2.5 py-1 rounded bg-blue-100 text-blue-700 font-bold uppercase text-[10px]">
                        {lec.type}
                      </span>
                      <span className="text-slate-400">{lec.durationOrPages}</span>
                    </div>
                    <h3 className="font-bold text-base text-slate-900">{lec.title}</h3>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{lec.summary}</p>
                    <p className="text-[11px] text-slate-400 mt-4">Lecturer: {lec.author}</p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500">📥 {lec.downloadsCount} downloads</span>
                    <button
                      onClick={() => alert('Accessing: ' + lec.title)}
                      className="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition"
                    >
                      Download Reference
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentRoute === 'subject-workspace' && <SubjectWorkspace />}
        {currentRoute === 'qbank' && <ExamCenter />}
        {currentRoute === 'flashcards' && <FlashcardsCenter />}
        {currentRoute === 'ai-assistant' && <AIAssistant />}

        {currentRoute === 'community' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-6">
            <h1 className="text-3xl font-extrabold text-slate-900">Academic Medical Community</h1>
            <p className="text-sm text-slate-500">
              Peer discussions, clinical diagnostic rounds, and shared active recall collections.
            </p>

            <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <span className="text-[10px] font-bold text-blue-600 uppercase">Cardiology Case Discussion</span>
                <h4 className="font-bold text-sm text-slate-900">Distinguishing S3 vs S4 heart sound in high-output cardiac states?</h4>
                <p className="text-xs text-slate-600">Posted by Dr. Layla (Year 5 Intern) · 18 replies from peer residents.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <span className="text-[10px] font-bold text-blue-600 uppercase">Neurology High Yield</span>
                <h4 className="font-bold text-sm text-slate-900">Wallenberg Lateral Medullary syndrome mnemonic compilation</h4>
                <p className="text-xs text-slate-600">Posted by Ahmed K. · 24 upvotes · Attached PDF summary.</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Discreet Footer with Protected Administrative Gateway Icon */}
      <footer className="bg-white border-t border-slate-200 mt-20 py-10 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center space-y-3">
          {/* Platform Brand Icon Trigger - Clicking opens secure Admin Gateway */}
          <button
            onClick={() => setIsAdminGatewayOpen(true)}
            className="group flex items-center justify-center w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-900 border border-slate-200 hover:border-slate-800 transition-all duration-300 shadow-xs hover:scale-105"
            title="MedStudy Hub Platform System"
            aria-label="Platform System"
          >
            <span className="font-extrabold text-xs text-slate-600 group-hover:text-cyan-400 transition-colors">
              M
            </span>
          </button>

          <p className="font-semibold text-slate-700">
            {getElementContent('footer-copyright-text', brand.footerCopyright)}
          </p>
          <p className="text-[11px] text-slate-400">
            {getElementContent('footer-tagline-text', lang === 'ar' ? (brand.footerNoticeAr || brand.taglineAr) : (brand.footerTagline || brand.taglineEn))}
          </p>
        </div>
      </footer>

      {/* Dedicated Secure Admin Gateway Modal */}
      <AdminGatewayModal />

      {/* Visual Website Editor Modal (Interactive Viewport & Element Studio) */}
      <VisualWebsiteEditorModal />
    </div>
  );
}
