/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { usePlatform } from '../PlatformContext';
import {
  Sparkles,
  X,
  Eye,
  EyeOff,
  Edit3,
  Save,
  Send,
  Layers,
  RotateCcw,
  CheckCircle2,
  FolderTree,
  Sliders,
  ArrowRight
} from 'lucide-react';

export const VisualWebsiteEditorModal: React.FC = () => {
  const {
    isVisualEditorActive,
    setIsVisualEditorActive,
    selectedVisualElementId,
    setSelectedVisualElementId,
    registryElements,
    updateRegistryElement,
    toggleElementVisibility,
    publishElementDraft,
    currentRoute,
    setCurrentRoute
  } = usePlatform();

  if (!isVisualEditorActive) return null;

  const currentElement = registryElements.find(e => e.id === selectedVisualElementId) || registryElements[0];

  const [editEn, setEditEn] = useState(currentElement?.contentEn || '');
  const [editAr, setEditAr] = useState(currentElement?.contentAr || '');
  const [previewEn, setPreviewEn] = useState(editEn);
  const [previewAr, setPreviewAr] = useState(editAr);

  React.useEffect(() => {
    if (currentElement) {
      setEditEn(currentElement.contentEn);
      setEditAr(currentElement.contentAr);
      setPreviewEn(currentElement.contentEn);
      setPreviewAr(currentElement.contentAr);
    }
  }, [currentElement?.id]);

  const handleApplyPreview = () => {
    setPreviewEn(editEn);
    setPreviewAr(editAr);
  };

  const handleSaveDraft = () => {
    if (!currentElement) return;
    const res = updateRegistryElement(
      currentElement.id,
      {
        draftContentEn: editEn,
        draftContentAr: editAr,
        publicationStatus: 'draft'
      },
      "Saved via Visual Website Editor"
    );
    if (res.success) {
      alert("تم حفظ التعديل كمسودة في سجل العناصر بنجاح.");
    } else {
      alert(`غير مصرح: ${res.error}`);
    }
  };

  const handlePublishLive = () => {
    if (!currentElement) return;
    const res = updateRegistryElement(
      currentElement.id,
      {
        contentEn: editEn,
        contentAr: editAr,
        draftContentEn: undefined,
        draftContentAr: undefined,
        publicationStatus: 'published'
      },
      "Published via Visual Website Editor"
    );
    if (res.success) {
      alert("تم النشر المباشر للعنصر في واجهة المنصة!");
    } else {
      alert(`غير مصرح: ${res.error}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex flex-col" dir="rtl">
      {/* Top Bar */}
      <div className="h-14 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">
              المحرر المرئي للواجهة (Visual Website Editor)
            </h3>
            <span className="text-[10px] text-slate-400">
              معاينة فورية وتحديد مباشر لأي عنصر وتعديل نصوصه وظهوره
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Page switcher preview */}
          <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl text-xs">
            <span className="text-slate-400 px-2">الصفحة:</span>
            {['home', 'academy', 'subject-workspace'].map(rt => (
              <button
                key={rt}
                onClick={() => setCurrentRoute(rt)}
                className={`px-3 py-1 rounded-lg font-semibold capitalize ${
                  currentRoute === rt ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {rt}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsVisualEditorActive(false)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
            title="إغلاق المحرر"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Split Body: Interactive Viewport & Side Control Drawer */}
      <div className="flex-1 flex overflow-hidden">
        {/* Viewport simulation */}
        <div className="flex-1 bg-slate-950 p-6 overflow-y-auto space-y-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 text-slate-100 max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
              <span>محاكاة الواجهة الحية (Live Viewport Inspector)</span>
              <span className="text-cyan-400">انقر على أي عنصر محدد بالإطار الأخضر لتعديله</span>
            </div>

            {/* Simulated interactive elements */}
            <div className="space-y-4">
              {registryElements
                .filter(e => e.pageName.toLowerCase().includes(currentRoute.toLowerCase()) || e.pageName === 'Navbar' || e.pageName === 'Homepage')
                .slice(0, 8)
                .map(el => {
                  const isSelected = el.id === currentElement?.id;
                  return (
                    <div
                      key={el.id}
                      onClick={() => setSelectedVisualElementId(el.id)}
                      className={`p-4 rounded-2xl transition cursor-pointer relative group ${
                        isSelected
                          ? 'border-2 border-cyan-400 bg-cyan-950/30 ring-4 ring-cyan-500/20'
                          : 'border border-dashed border-slate-700 hover:border-slate-500 bg-slate-900/80'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                        <span className="font-bold text-cyan-400">{el.name}</span>
                        <span>{el.locationPath}</span>
                      </div>
                      
                      <div className="text-sm font-semibold text-white">
                        {isSelected ? previewAr : (el.contentAr || el.contentEn)}
                      </div>
                      <div className="text-xs text-slate-400 mt-1" dir="ltr">
                        {isSelected ? previewEn : el.contentEn}
                      </div>

                      {/* Floating inspector badge */}
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/50 text-[10px] text-slate-300 font-mono">
                        {el.type} · {el.visibility}
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Side Control Drawer */}
        <div className="w-96 bg-slate-900 border-r border-slate-800 p-5 overflow-y-auto space-y-5">
          {currentElement ? (
            <div className="space-y-4">
              <div className="pb-3 border-b border-slate-800">
                <span className="text-[10px] font-mono text-cyan-400 uppercase">
                  العنصر النشط: {currentElement.id}
                </span>
                <h4 className="font-bold text-base text-white mt-1">{currentElement.name}</h4>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">{currentElement.locationPath}</p>
              </div>

              {/* Editing Controls */}
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    النص العربي (Arabic):
                  </label>
                  <textarea
                    rows={2}
                    value={editAr}
                    onChange={e => setEditAr(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div dir="ltr">
                  <label className="text-xs font-semibold text-slate-300 block mb-1 text-right">
                    النص الإنجليزي (English):
                  </label>
                  <textarea
                    rows={2}
                    value={editEn}
                    onChange={e => setEditEn(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-slate-400">حالة الظهور (Visibility):</span>
                  <button
                    type="button"
                    onClick={() => toggleElementVisibility(currentElement.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 ${
                      currentElement.visibility === 'visible'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : 'bg-amber-950 text-amber-400 border border-amber-800'
                    }`}
                  >
                    {currentElement.visibility === 'visible' ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    <span>{currentElement.visibility === 'visible' ? 'ظاهر' : 'مخفي'}</span>
                  </button>
                </div>

                {/* Live Preview Button */}
                <button
                  type="button"
                  onClick={handleApplyPreview}
                  className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-semibold text-xs flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>معاينة فورية على المحاكي (Preview)</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <Save className="w-4 h-4 text-cyan-400" />
                  <span>حفظ مسودة</span>
                </button>

                <button
                  type="button"
                  onClick={handlePublishLive}
                  className="py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/30"
                >
                  <Send className="w-4 h-4" />
                  <span>نشر مباشر</span>
                </button>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-500 text-center py-10">
              اضغط على أي عنصر في الواجهة لتعديله.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
