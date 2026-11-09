/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { usePlatform } from '../PlatformContext';
import {
  Sparkles,
  Sliders,
  Eye,
  EyeOff,
  CheckCircle2,
  Save,
  BookOpen,
  ArrowUpDown,
  Palette,
  Image as ImageIcon
} from 'lucide-react';
import { SubjectItem } from '../types';

export const PageSubjectCustomizationCenter: React.FC = () => {
  const {
    subjects,
    subjectCustomizations,
    updateSubjectCustomization,
    toggleSubjectTabVisibility,
    logAction
  } = usePlatform();

  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(subjects[0]?.id || 'anatomy');

  const selectedSubject = subjects.find(s => s.id === selectedSubjectId) || subjects[0];
  const currentCustomization = subjectCustomizations[selectedSubjectId] || {
    subjectId: selectedSubjectId,
    hiddenTabs: [],
    tabOrder: ['overview', 'topics', 'lectures', 'questions', 'flashcards', 'resources']
  };

  const [customTitleEn, setCustomTitleEn] = useState(currentCustomization.customTitleEn || selectedSubject?.name || '');
  const [customTitleAr, setCustomTitleAr] = useState(currentCustomization.customTitleAr || selectedSubject?.descAr || '');
  const [customDescEn, setCustomDescEn] = useState(currentCustomization.customDescEn || selectedSubject?.desc || '');
  const [customColor, setCustomColor] = useState(currentCustomization.customColor || '#1D4ED8');

  React.useEffect(() => {
    if (selectedSubject) {
      const custom = subjectCustomizations[selectedSubject.id];
      setCustomTitleEn(custom?.customTitleEn || selectedSubject.name);
      setCustomTitleAr(custom?.customTitleAr || '');
      setCustomDescEn(custom?.customDescEn || selectedSubject.desc);
      setCustomColor(custom?.customColor || '#1D4ED8');
    }
  }, [selectedSubjectId, subjectCustomizations]);

  const allAvailableTabs = [
    { id: 'overview', nameEn: 'Overview', nameAr: 'نظرة عامة' },
    { id: 'topics', nameEn: 'Topics & Modules', nameAr: 'المواضيع والوحدات' },
    { id: 'lectures', nameEn: 'Lectures Vault', nameAr: 'المحاضرات والمراجع' },
    { id: 'questions', nameEn: 'Q-Bank Practice', nameAr: 'تدريب الأسئلة' },
    { id: 'flashcards', nameEn: 'Spaced Flashcards', nameAr: 'البطاقات التفاعلية' },
    { id: 'resources', nameEn: 'Clinical Resources & Atlas', nameAr: 'المصادر السريرية والأطلس' }
  ];

  const handleSaveSubjectSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSubjectCustomization(selectedSubjectId, {
      customTitleEn,
      customTitleAr,
      customDescEn,
      customColor
    });
    alert(`تم حفظ التخصيص المستقل لمادة [${selectedSubject.name}] بنجاح دون التأثير على بقية المواد.`);
  };

  return (
    <div className="space-y-6 text-slate-100" dir="rtl">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Sliders className="w-4 h-4" />
            <span>Subject & Page Customization Center</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            مركز التخصيص المستقل لكل مادة وصفحة (Page & Subject Customization)
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl">
            تخصيص العناوين، الألوان، التبويبات الظاهرة والمخفية لكل مادة بشكل مستقل تام (مثلاً: إخفاء تبويب Resources في Anatomy فقط وإبقاؤه في Biochemistry).
          </p>
        </div>
      </div>

      {/* Main Grid: Subject Selector & Customization Studio */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Subject Picker (4 Cols) */}
        <div className="md:col-span-4 bg-slate-900 border border-slate-800 rounded-3xl p-4 space-y-3">
          <label className="text-xs font-bold text-slate-400 block px-2">اختر المادة للتخصيص المستقل:</label>
          <div className="space-y-1.5 max-h-[500px] overflow-y-auto">
            {subjects.map(s => {
              const isSelected = s.id === selectedSubjectId;
              const hasCustom = !!subjectCustomizations[s.id];
              return (
                <button
                  key={s.id}
                  onClick={() => setSelectedSubjectId(s.id)}
                  className={`w-full text-right p-3 rounded-2xl text-xs font-semibold transition flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-slate-800/40 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img src={s.image} alt={s.name} className="w-7 h-7 object-contain bg-slate-900 rounded-lg p-0.5 border border-slate-700" />
                    <span className="truncate">{s.name}</span>
                  </div>
                  {hasCustom && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 shrink-0">
                      مخصص
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Customization Details (8 Cols) */}
        <div className="md:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="font-bold text-base text-white">
                تخصيص مادة: <span className="text-cyan-400">{selectedSubject?.name}</span>
              </h3>
              <p className="text-xs text-slate-400">
                أي تغيير هنا يخص هذا المعرف [{selectedSubjectId}] فقط ولا يغير القالب العام.
              </p>
            </div>
            <img src={selectedSubject?.image} alt="" className="w-10 h-10 object-contain p-1 bg-slate-950 rounded-xl border border-slate-700" />
          </div>

          <form onSubmit={handleSaveSubjectSettings} className="space-y-5">
            {/* Custom Titles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  العنوان الظاهر للمادة (English Custom Title):
                </label>
                <input
                  type="text"
                  value={customTitleEn}
                  onChange={e => setCustomTitleEn(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  العنوان العربي المخصص (Arabic Custom Title):
                </label>
                <input
                  type="text"
                  value={customTitleAr}
                  onChange={e => setCustomTitleAr(e.target.value)}
                  placeholder="مثال: علم التشريح السريري العام..."
                  className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                />
              </div>
            </div>

            {/* Custom Description */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                الوصف الأكاديمي المخصص (Custom Description):
              </label>
              <textarea
                rows={2}
                value={customDescEn}
                onChange={e => setCustomDescEn(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
              />
            </div>

            {/* Independent Tabs Visibility Control */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-white">التحكم في ظهور التبويبات داخل هذه المادة حصراً:</h4>
                  <p className="text-[11px] text-slate-400">
                    يمكنك إخفاء أي تبويب لمادة معينة دون التأثير على بقية المواد في المنصة.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {allAvailableTabs.map(tab => {
                  const isHidden = currentCustomization.hiddenTabs.includes(tab.id);
                  return (
                    <div
                      key={tab.id}
                      className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between"
                    >
                      <div>
                        <span className="font-semibold text-xs text-white block">{tab.nameAr}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{tab.nameEn}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleSubjectTabVisibility(selectedSubjectId, tab.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                          !isHidden
                            ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 hover:bg-emerald-900/60'
                            : 'bg-rose-950/60 text-rose-400 border border-rose-800/60 hover:bg-rose-900/60'
                        }`}
                      >
                        {!isHidden ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        <span>{!isHidden ? 'ظاهر (Visible)' : 'مخفي (Hidden)'}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-blue-600/30"
              >
                <Save className="w-4 h-4" />
                <span>حفظ تخصيصات المادة المستقلة</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
