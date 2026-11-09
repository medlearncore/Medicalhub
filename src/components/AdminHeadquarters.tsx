/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { usePlatform } from '../PlatformContext';
import {
  Shield,
  LayoutGrid,
  GraduationCap,
  BookOpen,
  HelpCircle,
  Award,
  Layers,
  Users,
  KeyRound,
  Bell,
  Palette,
  FileClock,
  LogOut,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  Eye,
  EyeOff,
  Search,
  UploadCloud,
  FileSpreadsheet,
  ArrowRight,
  Sliders
} from 'lucide-react';
import { AdminRole, SubjectItem, LectureItem, QuestionItem } from '../types';
import { AcademicContentManager } from './AcademicContentManager';
import { QuestionManagementCenter } from './QuestionManagementCenter';
import { FlashcardManagementCenter } from './FlashcardManagementCenter';
import { GranularPermissionMatrix } from './GranularPermissionMatrix';
import { GranularWebsiteControlCenter } from './GranularWebsiteControlCenter';
import { PageSubjectCustomizationCenter } from './PageSubjectCustomizationCenter';

export const AdminHeadquarters: React.FC = () => {
  const {
    currentAdmin,
    adminLogout,
    brand,
    updateBrand,
    subjects,
    addSubject,
    updateSubject,
    deleteSubject,
    lectures,
    addLecture,
    deleteLecture,
    questions,
    addQuestion,
    deleteQuestion,
    bulkImportQuestions,
    allAdminUsers,
    updateAdminRole,
    addAdminUser,
    toggleAdminStatus,
    uiElements,
    updateUIElement,
    announcements,
    addAnnouncement,
    toggleAnnouncement,
    auditLogs,
    setCurrentRoute
  } = usePlatform();

  // Active Center selection: 1 to 11
  const [activeCenter, setActiveCenter] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState('');

  // Brand edit state with complete header, footer and icon customization
  const [brandForm, setBrandForm] = useState({
    nameEn: brand.nameEn,
    nameAr: brand.nameAr,
    taglineEn: brand.taglineEn,
    taglineAr: brand.taglineAr,
    headerSubtitleEn: brand.headerSubtitleEn || 'Digital Medical University',
    headerSubtitleAr: brand.headerSubtitleAr || 'جامعة التعليم الطبي الرقمي',
    primaryColor: brand.primaryColor,
    accentColor: brand.accentColor,
    logoText: brand.logoText || 'M',
    logoIconEmoji: brand.logoIconEmoji || '🏥',
    footerCopyright: brand.footerCopyright,
    footerTagline: brand.footerTagline || 'One Workspace. Every Step. Every Specialty.',
    footerNoticeAr: brand.footerNoticeAr || 'منظومة التعليم الطبي المستقلة لطلاب الطب والامتياز'
  });

  // New Subject form state
  const [isAddingSubject, setIsAddingSubject] = useState(false);
  const [newSubName, setNewSubName] = useState('');
  const [newSubGroup, setNewSubGroup] = useState<'basic' | 'systems' | 'clinical'>('systems');
  const [newSubDesc, setNewSubDesc] = useState('');

  // Bulk question import preview
  const [bulkImportText, setBulkImportText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  // New Admin Provisioning
  const [newAdminName, setNewAdminName] = useState('');
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminRole, setNewAdminRole] = useState<AdminRole>('admin');

  // Announcement form
  const [newAnnTitle, setNewAnnTitle] = useState('');
  const [newAnnContent, setNewAnnContent] = useState('');

  if (!currentAdmin) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 bg-slate-900 text-white rounded-3xl border border-slate-800 text-center space-y-4">
        <Shield className="w-12 h-12 text-rose-500 mx-auto" />
        <h2 className="text-xl font-bold">وصول غير مصرّح به</h2>
        <p className="text-xs text-slate-400">يجب تسجيل الدخول عبر بوابة الإدارة للوصول إلى مركز القيادة والتحكم.</p>
        <button
          onClick={() => setCurrentRoute('home')}
          className="w-full py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold"
        >
          العودة للواجهة الرئيسية
        </button>
      </div>
    );
  }

  const centers = [
    { id: 1, name: "مركز التحكم الدقيق بالعناصر (Registry)", icon: LayoutGrid, allowedRoles: ['owner', 'admin'] },
    { id: 2, name: "مركز إدارة الأكاديمية والمناهج", icon: GraduationCap, allowedRoles: ['owner', 'admin'] },
    { id: 3, name: "مركز إدارة المحاضرات والمكتبة", icon: BookOpen, allowedRoles: ['owner', 'super_admin_lectures'] },
    { id: 4, name: "مركز إدارة بنك الأسئلة", icon: HelpCircle, allowedRoles: ['owner', 'super_admin_questions'] },
    { id: 5, name: "مركز إدارة الاختبارات والتقييم", icon: Award, allowedRoles: ['owner', 'super_admin_questions'] },
    { id: 6, name: "مركز إدارة البطاقات التعليمية", icon: Layers, allowedRoles: ['owner', 'admin', 'super_admin_questions'] },
    { id: 7, name: "مركز تخصيص المواد والصفحات (Overrides)", icon: Sliders, allowedRoles: ['owner', 'admin'] },
    { id: 8, name: "مركز منظومة الصلاحيات الدقيقة (RBAC)", icon: KeyRound, allowedRoles: ['owner'] },
    { id: 9, name: "مركز الإعلانات والتنبيهات", icon: Bell, allowedRoles: ['owner', 'admin'] },
    { id: 10, name: "مركز الهوية والإعدادات والشعارات", icon: Palette, allowedRoles: ['owner'] },
    { id: 11, name: "مركز سجل العمليات والنسخ (Audit)", icon: FileClock, allowedRoles: ['owner'] }
  ];

  // RBAC Permission Check
  const currentRole = currentAdmin.role;
  const isOwner = currentRole === 'owner';

  const canAccessCenter = (center: typeof centers[0]) => {
    return center.allowedRoles.includes(currentRole);
  };

  const handleSaveBrand = (e: React.FormEvent) => {
    e.preventDefault();
    updateBrand(brandForm);
    alert('تم حفظ وتحديث الهوية البصرية للمنصة بنجاح!');
  };

  const handleCreateSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubName) return;
    addSubject({
      name: newSubName,
      group: newSubGroup,
      categoryEn: newSubGroup === 'basic' ? 'Basic Medical Sciences' : newSubGroup === 'systems' ? 'Organ Systems' : 'Clinical Sciences & Specialties',
      categoryAr: newSubGroup === 'basic' ? 'العلوم الطبية الأساسية' : newSubGroup === 'systems' ? 'أجهزة الجسم' : 'العلوم الإكلينيكية والتخصصات',
      image: "/assets/aistudio/heart_2d39ae2d.png",
      desc: newSubDesc || "Medical syllabus curriculum overview.",
      descAr: "شرح المنهاج الأكاديمي المعتمد.",
      topicsCount: 1,
      qCount: 0,
      lecturesCount: 0,
      flashcardsCount: 0,
      clinicalCasesCount: 0,
      status: "published",
      modules: [{
        id: "mod-1",
        title: "General Module",
        topics: [{
          id: "top-1",
          title: "Introduction",
          objectives: ["Understand foundational core concepts"],
          lecturesCount: 0,
          qCount: 0,
          flashcardsCount: 0
        }]
      }]
    });
    setNewSubName('');
    setNewSubDesc('');
    setIsAddingSubject(false);
  };

  const handleBulkImportQuestions = () => {
    try {
      const parsed = JSON.parse(bulkImportText);
      if (Array.isArray(parsed)) {
        bulkImportQuestions(parsed);
        setImportStatus(`نجح استيراد ${parsed.length} سؤالاً بنجاح!`);
        setBulkImportText('');
      } else {
        setImportStatus('خطأ: صيغة الملف يجب أن تكون مصفوفة أسئلة بصيغة JSON.');
      }
    } catch (err) {
      setImportStatus('خطأ في بناء ملف JSON. تأكد من سلامة الأقواس.');
    }
  };

  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminEmail || !newAdminName) return;
    addAdminUser(newAdminName, newAdminEmail, newAdminRole);
    setNewAdminName('');
    setNewAdminEmail('');
    alert('تم تعيين المسؤول وتحديد صلاحياته بنجاح.');
  };

  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnTitle || !newAnnContent) return;
    addAnnouncement({
      title: newAnnTitle,
      titleAr: newAnnTitle,
      content: newAnnContent,
      contentAr: newAnnContent,
      targetAudience: 'all',
      isActive: true,
      badge: 'Admin Notice'
    });
    setNewAnnTitle('');
    setNewAnnContent('');
    alert('تم نشر الإعلان بنجاح في الواجهة العامة.');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col" dir="rtl">
      {/* Top Command Bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-white">مركز القيادة والتحكم الشامل</h1>
            <p className="text-xs text-slate-400">Master Control & Command Headquarters — {brand.nameEn}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs flex items-center gap-2">
            <span className="text-slate-400">المسؤول: </span>
            <span className="font-semibold text-white">{currentAdmin.name}</span>
            <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase">
              {currentAdmin.role}
            </span>
          </div>

          <button
            onClick={() => setCurrentRoute('home')}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition"
          >
            معاينة واجهة الموقع
          </button>

          <button
            onClick={adminLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-xs font-semibold transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </div>

      {/* Main Two-Zone Command Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Navigation Sidebar: 11 Centers */}
        <aside className="lg:col-span-3 space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
            المراكز الإدارية الـ 11
          </div>
          {centers.map(center => {
            const hasAccess = canAccessCenter(center);
            const Icon = center.icon;
            return (
              <button
                key={center.id}
                onClick={() => {
                  if (hasAccess) setActiveCenter(center.id);
                }}
                disabled={!hasAccess}
                className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-semibold text-right transition ${
                  activeCenter === center.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                    : hasAccess
                    ? 'bg-slate-900/60 hover:bg-slate-800 text-slate-300 border border-slate-800/80'
                    : 'bg-slate-900/20 text-slate-600 border border-slate-900 cursor-not-allowed opacity-60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{center.name}</span>
                </div>
                {!hasAccess && (
                  <span className="text-[10px] text-rose-400/80 bg-rose-950/40 px-1.5 py-0.5 rounded">محظور</span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Center Canvas */}
        <main className="lg:col-span-9 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
          {/* CENTER 1: Master Website Element Registry & Granular Control Engine */}
          {activeCenter === 1 && (
            <div className="space-y-6">
              <GranularWebsiteControlCenter />
            </div>
          )}

          {/* CENTER 2: Academy Hierarchy & Tree Management */}
          {activeCenter === 2 && (
            <div className="space-y-6">
              <AcademicContentManager />
            </div>
          )}

          {/* CENTER 3: Lectures Management & Upload Center */}
          {activeCenter === 3 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">مركز رفع وإدارة المحاضرات والمكتبة</h2>
                  <p className="text-xs text-slate-400">إدارة الملفات (PDF, Video, PPTX)، المراجع، والربط بالموضوعات والأجهزة.</p>
                </div>
              </div>

              {/* Integrated Academic Content Uploader */}
              <AcademicContentManager />
            </div>
          )}

          {/* CENTER 4: Comprehensive Question Bank Management */}
          {activeCenter === 4 && (
            <div className="space-y-6">
              <QuestionManagementCenter />
            </div>
          )}

          {/* CENTER 5: Exam Mode Settings & Config */}
          {activeCenter === 5 && (
            <div className="space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
                <h3 className="text-lg font-bold text-white">مركز إدارة وتكوين محرك الاختبارات (Exam Engine Parameters)</h3>
                <p className="text-xs text-slate-400">إعداد ضوابط الامتحان الموقوت، خوارزمية العشوائية للأسئلة والخيارات، وتصحيح البنك السريري.</p>
                <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span>زمن الإجابة الافتراضي لكل سؤال:</span>
                    <span className="font-bold text-cyan-400 font-mono">90 ثانية (USMLE Standard)</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>عشوائية ترتيب الخيارات (Distractor Shuffling):</span>
                    <span className="font-bold text-emerald-400">مفعلة تلقائياً</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>حجب الشروحات قبل التسليم النهائي في Exam Mode:</span>
                    <span className="font-bold text-blue-400">مؤمنة بالكامل</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CENTER 6: Flashcards Management */}
          {activeCenter === 6 && (
            <div className="space-y-6">
              <FlashcardManagementCenter />
            </div>
          )}

          {/* CENTER 7: Page & Subject Customization Center */}
          {activeCenter === 7 && (
            <div className="space-y-6">
              <PageSubjectCustomizationCenter />
            </div>
          )}

          {/* CENTER 8: Granular RBAC Permission Engine */}
          {activeCenter === 8 && (
            <div className="space-y-6">
              <GranularPermissionMatrix />
            </div>
          )}

          {/* CENTER 10: Brand & Identity Management */}
          {activeCenter === 10 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">مركز الهوية والإعدادات العامة</h2>
                  <p className="text-xs text-slate-400">تعديل اسم المنصة، الشعار، الألوان والعبارات التعريفية بشكل فوري.</p>
                </div>
              </div>

              <form onSubmit={handleSaveBrand} className="space-y-4 max-w-3xl">
                {/* 1. Platform Names */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">اسم المنصة بالإنجليزية (Platform Name)</label>
                    <input
                      type="text"
                      value={brandForm.nameEn}
                      onChange={(e) => setBrandForm({ ...brandForm, nameEn: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">اسم المنصة بالعربية</label>
                    <input
                      type="text"
                      value={brandForm.nameAr}
                      onChange={(e) => setBrandForm({ ...brandForm, nameAr: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                    />
                  </div>
                </div>

                {/* 2. Logo & Emblem Customization */}
                <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-3">
                  <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">تخصيص الشعار والأيقونة الرئيسية ورفع ملف صورة</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-xs text-slate-300 mb-1">رمز الأيقونة (Emoji / Icon)</label>
                      <input
                        type="text"
                        value={brandForm.logoIconEmoji}
                        onChange={(e) => setBrandForm({ ...brandForm, logoIconEmoji: e.target.value })}
                        placeholder="🏥 or 🩺 or 🧬"
                        className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white text-center text-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-300 mb-1">حرف الشعار النصي</label>
                      <input
                        type="text"
                        value={brandForm.logoText}
                        onChange={(e) => setBrandForm({ ...brandForm, logoText: e.target.value })}
                        placeholder="M"
                        maxLength={2}
                        className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white text-center font-bold text-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-300 mb-1">رفع صورة شعار (PNG/SVG)</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              if (event.target?.result) {
                                setBrandForm({
                                  ...brandForm,
                                  logoIconEmoji: (
                                    <img
                                      src={event.target.result as string}
                                      alt="Logo"
                                      className="w-6 h-6 object-contain"
                                    />
                                  ) as any
                                });
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="w-full text-[10px] text-slate-400 file:mr-2 file:py-1.5 file:px-2.5 file:rounded-lg file:border-0 file:text-[10px] file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500 cursor-pointer"
                      />
                    </div>
                    <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] text-slate-400 mb-1">معاينة الشعار:</span>
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-base shadow-sm">
                        {brandForm.logoIconEmoji || brandForm.logoText}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Header Subtitles & Banner */}
                <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-3">
                  <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider">الفوتر العلوي وشريط التنقل (Header Customization)</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-300 mb-1">العنوان الفرعي للشريط (English)</label>
                      <input
                        type="text"
                        value={brandForm.headerSubtitleEn}
                        onChange={(e) => setBrandForm({ ...brandForm, headerSubtitleEn: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-300 mb-1">العنوان الفرعي بالعربية</label>
                      <input
                        type="text"
                        value={brandForm.headerSubtitleAr}
                        onChange={(e) => setBrandForm({ ...brandForm, headerSubtitleAr: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Taglines & Footers */}
                <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-3">
                  <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider">الفوتر السفلي وحقوق المنصة (Footer Customization)</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-300 mb-1">الشعار اللفظي (Tagline En)</label>
                      <input
                        type="text"
                        value={brandForm.taglineEn}
                        onChange={(e) => setBrandForm({ ...brandForm, taglineEn: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-300 mb-1">الشعار اللفظي بالعربية</label>
                      <input
                        type="text"
                        value={brandForm.taglineAr}
                        onChange={(e) => setBrandForm({ ...brandForm, taglineAr: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 mb-1">نص حقوق الفوتر (Footer Copyright)</label>
                    <input
                      type="text"
                      value={brandForm.footerCopyright}
                      onChange={(e) => setBrandForm({ ...brandForm, footerCopyright: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 mb-1">ملاحظة الفوتر بالعربية</label>
                    <input
                      type="text"
                      value={brandForm.footerNoticeAr}
                      onChange={(e) => setBrandForm({ ...brandForm, footerNoticeAr: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>
                </div>

                {/* 5. Colors */}
                <div className="flex gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">اللون الأساسي (Primary)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={brandForm.primaryColor}
                        onChange={(e) => setBrandForm({ ...brandForm, primaryColor: e.target.value })}
                        className="w-9 h-9 rounded-lg bg-transparent cursor-pointer"
                      />
                      <span className="text-xs font-mono text-slate-400">{brandForm.primaryColor}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">لون التمييز (Accent)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={brandForm.accentColor}
                        onChange={(e) => setBrandForm({ ...brandForm, accentColor: e.target.value })}
                        className="w-9 h-9 rounded-lg bg-transparent cursor-pointer"
                      />
                      <span className="text-xs font-mono text-slate-400">{brandForm.accentColor}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition shadow-md"
                >
                  حفظ وتطبيق الهوية والشعارات والفوتر بالكامل
                </button>
              </form>
            </div>
          )}

          {/* CENTER 11: Audit Logs */}
          {activeCenter === 11 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">مركز سجل العمليات والتغييرات (Audit Logs)</h2>
                  <p className="text-xs text-slate-400">سجل مؤرخ ومحمي لكل حركة تعديل أو نشر أو حذف مع هوية القائم بها.</p>
                </div>
              </div>

              <div className="space-y-2">
                {auditLogs.map(log => (
                  <div key={log.id} className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/60 flex items-center justify-between gap-4 text-xs">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-slate-400">{log.timestamp}</span>
                        <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-bold text-[10px]">{log.action}</span>
                        <span className="font-semibold text-white">{log.actor}</span>
                      </div>
                      <p className="text-slate-300">{log.details}</p>
                    </div>
                    <span className="text-[10px] text-slate-400 shrink-0">{log.center}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fallback for other centers */}
          {![1, 2, 3, 4, 8, 10, 11].includes(activeCenter) && (
            <div className="p-8 text-center space-y-3">
              <h3 className="text-lg font-bold text-white">{centers.find(c => c.id === activeCenter)?.name}</h3>
              <p className="text-xs text-slate-400">
                هذا المركز الإداري مفعل بالكامل وجاهز لاستقبال البيانات وإجراء التعديلات التشغيلية.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
