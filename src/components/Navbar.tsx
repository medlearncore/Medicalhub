/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { usePlatform } from '../PlatformContext';
import { Globe, Shield, BookOpen, Layers, Library, HelpCircle, Award, Users, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    lang,
    setLang,
    brand,
    currentRoute,
    setCurrentRoute,
    currentAdmin,
    setIsAdminGatewayOpen,
    getElementContent,
    isElementVisible
  } = usePlatform();

  const navItems = [
    { id: 'home', elementId: 'nav-link-home', labelEn: 'Home', labelAr: 'الرئيسية' },
    { id: 'academy', elementId: 'nav-link-academy', labelEn: 'Academy', labelAr: 'الأكاديمية' },
    { id: 'dashboard', elementId: 'nav-link-dashboard', labelEn: 'Dashboard', labelAr: 'لوحتي التعليمية' },
    { id: 'library', elementId: 'nav-link-library', labelEn: 'Library', labelAr: 'المكتبة' },
    { id: 'qbank', elementId: 'nav-link-qbank', labelEn: 'Q-Bank', labelAr: 'بنك الأسئلة' },
    { id: 'flashcards', elementId: 'nav-link-flashcards', labelEn: 'Flashcards', labelAr: 'البطاقات' },
    { id: 'community', elementId: 'nav-link-community', labelEn: 'Community', labelAr: 'المجتمع' },
    { id: 'ai-assistant', elementId: 'nav-link-ai', labelEn: 'AI Assistant', labelAr: 'المساعد الطبي' }
  ];

  const brandTitle = getElementContent('nav-brand-title', lang === 'ar' ? brand.nameAr : brand.nameEn);
  const brandSubtitle = getElementContent('nav-brand-subtitle', lang === 'ar' ? (brand.headerSubtitleAr || 'جامعة التعليم الطبي الرقمي') : (brand.headerSubtitleEn || 'Digital Medical University'));

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark & Emblem */}
        <div 
          onClick={() => setCurrentRoute('home')} 
          className="flex items-center gap-3 cursor-pointer select-none shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1D4ED8] to-[#06B6D4] flex items-center justify-center text-white font-bold text-xl shadow-md shadow-blue-500/10">
            {brand.logoIconEmoji || brand.logoText}
          </div>
          <div>
            <span className="font-bold text-lg sm:text-xl tracking-tight text-slate-900 block leading-tight">
              {brandTitle}
            </span>
            <span className="text-[10px] text-slate-500 hidden sm:block tracking-wider uppercase">
              {brandSubtitle}
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links (Single-Line, Dynamic Visibility via Registry) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          {navItems.filter(item => isElementVisible(item.elementId)).map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentRoute(item.id)}
              className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                currentRoute === item.id
                  ? 'text-[#1D4ED8] border-[#1D4ED8] font-semibold'
                  : 'border-transparent hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              {getElementContent(item.elementId, lang === 'ar' ? item.labelAr : item.labelEn)}
            </button>
          ))}
        </nav>

        {/* Zone 3: Actions & Localization Switch */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
            title="Switch Language / تبديل اللغة"
          >
            <Globe className="w-3.5 h-3.5 text-[#1D4ED8]" />
            <span>{lang === 'en' ? 'العربية' : 'English'}</span>
          </button>

          {/* Student Profile Quick View */}
          <button
            onClick={() => setCurrentRoute('dashboard')}
            className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 text-[#1D4ED8] text-xs font-bold flex items-center justify-center hover:ring-2 hover:ring-blue-400 transition"
            title="Omar Al-Mansoor (Year 4)"
          >
            OM
          </button>
        </div>
      </div>

      {/* Mobile Navigation Strip */}
      <div className="lg:hidden flex items-center gap-2 overflow-x-auto px-4 py-2 border-t border-slate-100 bg-slate-50 text-xs no-scrollbar">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setCurrentRoute(item.id)}
            className={`px-3 py-1 rounded-md whitespace-nowrap shrink-0 transition ${
              currentRoute === item.id
                ? 'bg-blue-600 text-white font-medium shadow-xs'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            {lang === 'ar' ? item.labelAr : item.labelEn}
          </button>
        ))}
      </div>
    </header>
  );
};
