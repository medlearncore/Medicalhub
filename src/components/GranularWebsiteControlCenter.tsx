/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { usePlatform } from '../PlatformContext';
import {
  Search,
  Filter,
  Sliders,
  Eye,
  EyeOff,
  Edit3,
  Clock,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  FolderTree,
  Tag,
  Save,
  Send,
  Layers,
  Sparkles,
  ExternalLink,
  Lock,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { RegistryElement, ElementAction, VisibilityState, ActivationState, ElementType } from '../types';

export const GranularWebsiteControlCenter: React.FC = () => {
  const {
    registryElements,
    updateRegistryElement,
    toggleElementVisibility,
    toggleElementActivation,
    publishElementDraft,
    restoreElementVersion,
    bulkUpdateElements,
    currentAdmin,
    checkAdminPermission,
    logAction,
    setIsVisualEditorActive,
    setSelectedVisualElementId
  } = usePlatform();

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [pageFilter, setPageFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [visibilityFilter, setVisibilityFilter] = useState<string>('all');

  // Active Selected Element for editing drawer
  const [selectedElementId, setSelectedElementId] = useState<string | null>(registryElements[0]?.id || null);

  // Form State for editing the active element
  const selectedElement = registryElements.find(e => e.id === selectedElementId);
  const [editEn, setEditEn] = useState(selectedElement?.contentEn || '');
  const [editAr, setEditAr] = useState(selectedElement?.contentAr || '');
  const [editReason, setEditReason] = useState('');
  const [editOrder, setEditOrder] = useState(selectedElement?.displayOrder || 1);
  const [editColor, setEditColor] = useState(selectedElement?.customColor || '#1D4ED8');

  // Bulk Selection State
  const [selectedBulkIds, setSelectedBulkIds] = useState<string[]>([]);

  // Update local inputs when active element changes
  React.useEffect(() => {
    if (selectedElement) {
      setEditEn(selectedElement.contentEn);
      setEditAr(selectedElement.contentAr);
      setEditOrder(selectedElement.displayOrder);
      setEditColor(selectedElement.customColor || '#1D4ED8');
      setEditReason('');
    }
  }, [selectedElementId]);

  // Filtering Logic
  const filteredElements = registryElements.filter(el => {
    const matchesSearch =
      el.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      el.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      el.contentEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      el.contentAr.includes(searchTerm) ||
      el.locationPath.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPage = pageFilter === 'all' || el.pageName === pageFilter;
    const matchesType = typeFilter === 'all' || el.type === typeFilter;
    const matchesVisibility = visibilityFilter === 'all' || el.visibility === visibilityFilter;

    return matchesSearch && matchesPage && matchesType && matchesVisibility;
  });

  const distinctPages = Array.from(new Set(registryElements.map(e => e.pageName)));
  const distinctTypes = Array.from(new Set(registryElements.map(e => e.type)));

  // Handlers
  const handleSaveDraft = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedElement) return;

    const res = updateRegistryElement(
      selectedElement.id,
      {
        draftContentEn: editEn,
        draftContentAr: editAr,
        displayOrder: Number(editOrder),
        customColor: editColor,
        publicationStatus: 'draft'
      },
      editReason || 'Saved draft changes via Granular Control Center'
    );

    if (res.success) {
      alert(`تم حفظ التعديلات كمسودة للمراجعة للعنصر [${selectedElement.name}] بنجاح.`);
    } else {
      alert(`خطأ في الصلاحيات: ${res.error}`);
    }
  };

  const handlePublishImmediate = () => {
    if (!selectedElement) return;

    // Check permission
    const perm = checkAdminPermission(selectedElement.id, 'publish');
    if (!perm.allowed) {
      alert(`غير مصرح بالنشر: ${perm.reason}`);
      return;
    }

    const res = updateRegistryElement(
      selectedElement.id,
      {
        contentEn: editEn,
        contentAr: editAr,
        draftContentEn: undefined,
        draftContentAr: undefined,
        displayOrder: Number(editOrder),
        customColor: editColor,
        publicationStatus: 'published'
      },
      editReason || 'Published changes immediately to students'
    );

    if (res.success) {
      alert(`تم نشر العنصر [${selectedElement.name}] للطلاب فورياً وتحديث كافة الواجهات!`);
    } else {
      alert(`خطأ: ${res.error}`);
    }
  };

  const handleRollback = (versionId: string) => {
    if (!selectedElement) return;
    if (confirm('هل أنت متأكد من استعادة هذه النسخة السابقة؟ سيتم توثيق العملية في سجل العمليات.')) {
      const ok = restoreElementVersion(selectedElement.id, versionId);
      if (ok) {
        alert('تمت استعادة النسخة السابقة بنجاح.');
      }
    }
  };

  const handleBulkAction = (action: 'hide' | 'show' | 'enable' | 'disable') => {
    if (selectedBulkIds.length === 0) {
      alert('يرجى تحديد عناصر من القائمة أولاً.');
      return;
    }

    if (action === 'hide') {
      bulkUpdateElements(selectedBulkIds, { visibility: 'hidden' }, 'Bulk hide operation');
    } else if (action === 'show') {
      bulkUpdateElements(selectedBulkIds, { visibility: 'visible' }, 'Bulk show operation');
    } else if (action === 'enable') {
      bulkUpdateElements(selectedBulkIds, { activation: 'enabled' }, 'Bulk enable operation');
    } else if (action === 'disable') {
      bulkUpdateElements(selectedBulkIds, { activation: 'disabled' }, 'Bulk disable operation');
    }

    alert(`تم تنفيذ العملية [${action}] على ${selectedBulkIds.length} عنصر بنجاح.`);
    setSelectedBulkIds([]);
  };

  const toggleSelectAll = () => {
    if (selectedBulkIds.length === filteredElements.length) {
      setSelectedBulkIds([]);
    } else {
      setSelectedBulkIds(filteredElements.map(e => e.id));
    }
  };

  const toggleSelectBulk = (id: string) => {
    setSelectedBulkIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6 text-slate-100" dir="rtl">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Sliders className="w-4 h-4" />
            <span>Master Website Element Registry & Granular Control Engine</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            مركز التحكم الدقيق في جميع عناصر الموقع (Granular Website Control)
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl">
            سجل إداري مركزي لكل عنصر في المنصة (عناوين، أزرار، تبويبات، بطاقات، حقول) مع مساره الدقيق، سجل النسخ، وحالة النشر المستقلة.
          </p>
        </div>

        {/* Quick Launch Visual Editor */}
        <button
          onClick={() => {
            if (selectedElement) {
              setSelectedVisualElementId(selectedElement.id);
            }
            setIsVisualEditorActive(true);
          }}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-95 transition"
        >
          <Sparkles className="w-4 h-4" />
          <span>المحرر المرئي للواجهة (Visual Editor)</span>
        </button>
      </div>

      {/* Search, Filter & Bulk Action Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="sm:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-500 absolute top-3.5 right-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="ابحث بالاسم، المعرف ID، النص، أو المسار (مثال: Renal Physiology)..."
              className="w-full pr-9 pl-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Page Filter */}
          <div className="sm:col-span-3">
            <select
              value={pageFilter}
              onChange={e => setPageFilter(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="all">كافة الصفحات (All Pages)</option>
              {distinctPages.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div className="sm:col-span-2">
            <select
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="all">كافة الأنواع (All Types)</option>
              {distinctTypes.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Visibility Filter */}
          <div className="sm:col-span-2">
            <select
              value={visibilityFilter}
              onChange={e => setVisibilityFilter(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="all">الحالة: الكل</option>
              <option value="visible">ظاهر (Visible)</option>
              <option value="hidden">مخفي (Hidden)</option>
              <option value="archived">مؤرشف (Archived)</option>
            </select>
          </div>
        </div>

        {/* Bulk Action Controls */}
        {selectedBulkIds.length > 0 && (
          <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-800/50 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-cyan-300 font-bold">
              <span>تم تحديد {selectedBulkIds.length} عنصر</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleBulkAction('show')}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold"
              >
                إظهار للجميع (Show)
              </button>
              <button
                onClick={() => handleBulkAction('hide')}
                className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold"
              >
                إخفاء (Hide)
              </button>
              <button
                onClick={() => handleBulkAction('enable')}
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold"
              >
                تفعيل الوظيفة (Enable)
              </button>
              <button
                onClick={() => handleBulkAction('disable')}
                className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold"
              >
                تعطيل (Disable)
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main 2-Column Split: Registry Table & Editing Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Elements Registry Table (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-lg">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between text-xs font-bold text-slate-400">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedBulkIds.length === filteredElements.length && filteredElements.length > 0}
                onChange={toggleSelectAll}
                className="rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-0"
              />
              <span>سجل العناصر المكتشفة ({filteredElements.length} عنصر)</span>
            </div>
            <span>اضغط على أي عنصر لتعديله فورياً</span>
          </div>

          <div className="divide-y divide-slate-800/80 max-h-[620px] overflow-y-auto">
            {filteredElements.length === 0 ? (
              <div className="p-12 text-center text-slate-500 text-xs">
                لا توجد عناصر مطابقة لبحثك الحالي.
              </div>
            ) : (
              filteredElements.map(el => {
                const isSelected = selectedElementId === el.id;
                const isBulkChecked = selectedBulkIds.includes(el.id);

                return (
                  <div
                    key={el.id}
                    onClick={() => setSelectedElementId(el.id)}
                    className={`p-3.5 transition cursor-pointer flex items-start gap-3 ${
                      isSelected
                        ? 'bg-blue-950/60 border-r-4 border-cyan-400'
                        : 'hover:bg-slate-800/40'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isBulkChecked}
                      onClick={e => e.stopPropagation()}
                      onChange={() => toggleSelectBulk(el.id)}
                      className="mt-1 rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-0"
                    />

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 truncate">
                          <span className="font-bold text-xs text-white truncate">{el.name}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                            {el.type}
                          </span>
                          {el.isSystemCritical && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-rose-950 text-rose-300 border border-rose-800">
                              System Critical
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {/* Visibility badge */}
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              toggleElementVisibility(el.id);
                            }}
                            className={`p-1 rounded-md text-[11px] transition ${
                              el.visibility === 'visible'
                                ? 'text-emerald-400 bg-emerald-950/40 hover:bg-emerald-900/60'
                                : 'text-amber-400 bg-amber-950/40 hover:bg-amber-900/60'
                            }`}
                            title="Toggle Visibility"
                          >
                            {el.visibility === 'visible' ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                          </button>

                          {/* Publication badge */}
                          <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                            el.publicationStatus === 'published'
                              ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-800/60'
                              : 'bg-amber-950/50 text-amber-400 border border-amber-800/60'
                          }`}>
                            {el.publicationStatus === 'published' ? 'منشور' : 'مسودة'}
                          </span>
                        </div>
                      </div>

                      {/* Content snippet */}
                      <p className="text-xs text-slate-300 truncate">
                        {el.contentAr || el.contentEn}
                      </p>

                      {/* Hierarchy path */}
                      <div className="flex items-center gap-1 text-[10px] text-slate-500 font-mono truncate">
                        <FolderTree className="w-3 h-3 text-cyan-500 shrink-0" />
                        <span className="truncate">{el.locationPath}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Element Editing Studio (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
          {selectedElement ? (
            <div className="space-y-5">
              {/* Header Info */}
              <div className="pb-4 border-b border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-cyan-400 uppercase">
                    ID: {selectedElement.id}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300">
                    {selectedElement.pageName}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-white">{selectedElement.name}</h3>
                <p className="text-[11px] text-slate-400 font-mono bg-slate-950/80 p-2 rounded-xl border border-slate-800/60">
                  {selectedElement.locationPath}
                </p>
              </div>

              {/* Editing Form */}
              <form onSubmit={handleSaveDraft} className="space-y-4">
                {/* Arabic Content */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300 block">
                    النص باللغة العربية (Content Arabic):
                  </label>
                  {selectedElement.type === 'text' || selectedElement.type === 'subtitle' ? (
                    <textarea
                      rows={3}
                      value={editAr}
                      onChange={e => setEditAr(e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  ) : (
                    <input
                      type="text"
                      value={editAr}
                      onChange={e => setEditAr(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  )}
                </div>

                {/* English Content */}
                <div className="space-y-1" dir="ltr">
                  <label className="text-xs font-semibold text-slate-300 block text-right">
                    النص باللغة الإنجليزية (Content English):
                  </label>
                  {selectedElement.type === 'text' || selectedElement.type === 'subtitle' ? (
                    <textarea
                      rows={3}
                      value={editEn}
                      onChange={e => setEditEn(e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  ) : (
                    <input
                      type="text"
                      value={editEn}
                      onChange={e => setEditEn(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  )}
                </div>

                {/* Display Order & Custom Accent */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-400 block mb-1">
                      ترتيب العرض (Order):
                    </label>
                    <input
                      type="number"
                      value={editOrder}
                      onChange={e => setEditOrder(Number(e.target.value))}
                      className="w-full p-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-400 block mb-1">
                      اللون المخصص (Color):
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={editColor}
                        onChange={e => setEditColor(e.target.value)}
                        className="w-8 h-8 rounded-lg bg-transparent border-0 cursor-pointer"
                      />
                      <span className="text-xs font-mono text-slate-300">{editColor}</span>
                    </div>
                  </div>
                </div>

                {/* Modification Reason (For Audit Log) */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400 block">
                    سبب التعديل (Change Reason - اختياري للتدقيق):
                  </label>
                  <input
                    type="text"
                    value={editReason}
                    onChange={e => setEditReason(e.target.value)}
                    placeholder="مثال: تحديث الصياغة بناء على توجيه العمادة..."
                    className="w-full p-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                </div>

                {/* Action Buttons: Save Draft vs Immediate Publish */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Save className="w-4 h-4 text-cyan-400" />
                    <span>حفظ كمسودة</span>
                  </button>

                  <button
                    type="button"
                    onClick={handlePublishImmediate}
                    className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/30"
                  >
                    <Send className="w-4 h-4" />
                    <span>نشر فوري للطلاب</span>
                  </button>
                </div>
              </form>

              {/* Version History & Rollback Section */}
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-white flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    <span>سجل النسخ والاسترجاع (Version History)</span>
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {selectedElement.versions.length} نسخة سابقة
                  </span>
                </div>

                {selectedElement.versions.length === 0 ? (
                  <p className="text-[11px] text-slate-500 bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
                    لا توجد نسخ سابقة مسجلة بعد لهذا العنصر. يتم إنشاء النسخ تلقائياً عند أي تعديل.
                  </p>
                ) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {selectedElement.versions.map(ver => (
                      <div
                        key={ver.versionId}
                        className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs space-y-1.5"
                      >
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-slate-300">{ver.modifiedBy}</span>
                          <span className="text-slate-500 font-mono text-[10px]">{ver.timestamp}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 italic">"{ver.contentAr || ver.contentEn}"</p>
                        {ver.changeReason && (
                          <p className="text-[10px] text-slate-500">السبب: {ver.changeReason}</p>
                        )}
                        <div className="pt-1 flex justify-end">
                          <button
                            type="button"
                            onClick={() => handleRollback(ver.versionId)}
                            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 text-[10px] font-bold flex items-center gap-1"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>استرجاع هذه النسخة</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-slate-500 text-xs">
              اختر عنصراً من القائمة للبدء في إدارته وتعديله.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
