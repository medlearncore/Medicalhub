/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { usePlatform } from '../PlatformContext';
import {
  KeyRound,
  Shield,
  UserCheck,
  UserX,
  Lock,
  CheckCircle2,
  AlertCircle,
  Save,
  Plus,
  FolderTree,
  Sliders,
  Sparkles,
  HelpCircle,
  CheckSquare,
  Square
} from 'lucide-react';
import { AdminRole, AdminUser, ElementAction } from '../types';

export const GranularPermissionMatrix: React.FC = () => {
  const {
    allAdminUsers,
    updateAdminRole,
    toggleAdminStatus,
    addAdminUser,
    registryElements,
    granularPermissions,
    updateGranularPermission,
    logAction,
    currentAdmin
  } = usePlatform();

  const [selectedAdminId, setSelectedAdminId] = useState<string>(allAdminUsers[1]?.id || allAdminUsers[0]?.id || '');
  const [selectedElementId, setSelectedElementId] = useState<string>(registryElements[0]?.id || 'home-hero-title');
  const [newAdminName, setNewAdminName] = useState('');
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminRole, setNewAdminRole] = useState<AdminRole>('admin');

  const selectedAdmin = allAdminUsers.find(u => u.id === selectedAdminId) || allAdminUsers[0];
  const isOwner = selectedAdmin?.role === 'owner';

  // Centers Matrix
  const centerMatrix = [
    { id: 'c1', name: 'مركز التحكم الدقيق بالعناصر (Granular Element Control)' },
    { id: 'c2', name: 'مركز إدارة الأكاديمية والمناهج (Academy Structure)' },
    { id: 'c3', name: 'مركز إدارة المحاضرات والمكتبة (Lectures & Vault)' },
    { id: 'c4', name: 'مركز إدارة بنك الأسئلة (Question Bank & Import)' },
    { id: 'c5', name: 'مركز إدارة الاختبارات (Exams & Assessment)' },
    { id: 'c6', name: 'مركز إدارة البطاقات التعليمية (Flashcards)' },
    { id: 'c7', name: 'مركز تخصيص المواد والصفحات (Subject Customization)' },
    { id: 'c8', name: 'مركز إدارة المسؤولين والصلاحيات (Admin RBAC Matrix)' },
    { id: 'c9', name: 'مركز الإعلانات والتنبيهات (Announcements)' },
    { id: 'c10', name: 'مركز الهوية والإعدادات العامة (Brand & Logos)' },
    { id: 'c11', name: 'مركز سجل العمليات والتغييرات (Audit Logs)' }
  ];

  const allElementActions: { action: ElementAction; labelAr: string; labelEn: string }[] = [
    { action: 'view', labelAr: 'مشاهدة', labelEn: 'View' },
    { action: 'edit', labelAr: 'تعديل', labelEn: 'Edit' },
    { action: 'create', labelAr: 'إضافة', labelEn: 'Create' },
    { action: 'delete', labelAr: 'حذف', labelEn: 'Delete' },
    { action: 'rename', labelAr: 'إعادة تسمية', labelEn: 'Rename' },
    { action: 'hide', labelAr: 'إخفاء', labelEn: 'Hide' },
    { action: 'show', labelAr: 'إظهار', labelEn: 'Show' },
    { action: 'enable', labelAr: 'تفعيل', labelEn: 'Enable' },
    { action: 'disable', labelAr: 'تعطيل', labelEn: 'Disable' },
    { action: 'publish', labelAr: 'نشر', labelEn: 'Publish' },
    { action: 'restore', labelAr: 'استعادة نسخة', labelEn: 'Restore' }
  ];

  // Specific rule for selected admin and element
  const currentRule = granularPermissions.find(
    p => p.adminId === selectedAdminId && p.elementId === selectedElementId
  );

  const [activeActions, setActiveActions] = useState<ElementAction[]>(
    currentRule ? currentRule.allowedActions : ['view']
  );
  const [restrictedFields, setRestrictedFields] = useState<string[]>(
    currentRule?.restrictedFields || []
  );

  // Sync state when selection changes
  React.useEffect(() => {
    const rule = granularPermissions.find(
      p => p.adminId === selectedAdminId && p.elementId === selectedElementId
    );
    if (rule) {
      setActiveActions(rule.allowedActions);
      setRestrictedFields(rule.restrictedFields || []);
    } else {
      setActiveActions(isOwner ? allElementActions.map(a => a.action) : ['view']);
      setRestrictedFields([]);
    }
  }, [selectedAdminId, selectedElementId]);

  const toggleAction = (act: ElementAction) => {
    if (isOwner) return;
    setActiveActions(prev =>
      prev.includes(act) ? prev.filter(a => a !== act) : [...prev, act]
    );
  };

  const toggleFieldRestriction = (fieldName: string) => {
    if (isOwner) return;
    setRestrictedFields(prev =>
      prev.includes(fieldName) ? prev.filter(f => f !== fieldName) : [...prev, fieldName]
    );
  };

  const handleSaveElementRule = () => {
    if (currentAdmin?.role !== 'owner') {
      alert('المالك (Owner) هو الوحيد الذي يمتلك صلاحية تعديل وحفظ مصفوفة الصلاحيات.');
      return;
    }
    updateGranularPermission(selectedAdminId, selectedElementId, activeActions, restrictedFields);
    alert(`تم حفظ وتطبيق الصلاحية الدقيقة للمسؤول [${selectedAdmin.name}] على العنصر [${selectedElementId}] بنجاح.`);
  };

  const handleCreateAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminName || !newAdminEmail) return;
    addAdminUser(newAdminName, newAdminEmail, newAdminRole);
    setNewAdminName('');
    setNewAdminEmail('');
    alert('تم تعيين المسؤول بنجاح.');
  };

  const targetElement = registryElements.find(e => e.id === selectedElementId);

  return (
    <div className="space-y-6 text-slate-100" dir="rtl">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <KeyRound className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              منظومة الصلاحيات التفصيلية ومصفوفة التحكم في العناصر (Permission Engine)
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              تخصيص صلاحيات كل مسؤول على مستوى العنصر والحقل الفردي (Edit دون Delete، أو تعديل حقل محدد فقط مثل الوصف دون العنوان، مع حظر الترقية الذاتية).
            </p>
          </div>
        </div>

        <button
          onClick={handleSaveElementRule}
          disabled={isOwner}
          className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/30 active:scale-95 transition"
        >
          <Save className="w-4 h-4" />
          <span>حفظ وتطبيق القاعدة الدقيقة</span>
        </button>
      </div>

      {/* 3-Column Granular Assignment Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Col 1: Admin Directory & Roles (3 Cols) */}
        <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-3xl p-4 space-y-3">
          <label className="text-xs font-bold text-slate-400 block px-2">1. اختر المسؤول الإداري:</label>
          <div className="space-y-1.5 max-h-[460px] overflow-y-auto">
            {allAdminUsers.map(adm => {
              const isSelected = selectedAdminId === adm.id;
              return (
                <button
                  key={adm.id}
                  onClick={() => setSelectedAdminId(adm.id)}
                  className={`w-full text-right p-3 rounded-2xl text-xs font-semibold transition flex flex-col gap-1 ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-slate-800/40 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold truncate">{adm.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-black/30 font-mono uppercase">
                      {adm.role}
                    </span>
                  </div>
                  <span className="text-[10px] opacity-75 truncate">{adm.email}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Col 2: Website Element Tree Selector (4 Cols) */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-3xl p-4 space-y-3">
          <label className="text-xs font-bold text-slate-400 block px-2">2. شجرة العناصر والصفحات:</label>
          <div className="space-y-1.5 max-h-[460px] overflow-y-auto">
            {registryElements.map(el => {
              const isSelected = selectedElementId === el.id;
              return (
                <button
                  key={el.id}
                  onClick={() => setSelectedElementId(el.id)}
                  className={`w-full text-right p-3 rounded-2xl text-xs font-semibold transition flex flex-col gap-1 ${
                    isSelected
                      ? 'bg-cyan-950/70 border border-cyan-400 text-cyan-200'
                      : 'bg-slate-800/40 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold truncate">{el.name}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 font-mono">
                      {el.pageName}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono truncate">{el.locationPath}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Col 3: Granular Action & Field Restriction Matrix (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
          <div className="pb-3 border-b border-slate-800 space-y-1">
            <span className="text-[10px] font-mono text-cyan-400 uppercase">
              قاعدة الصلاحية الدقيقة (Granular Rule)
            </span>
            <h3 className="font-bold text-sm text-white">
              المسؤول: <span className="text-cyan-300">{selectedAdmin?.name}</span> ({selectedAdmin?.role})
            </h3>
            <p className="text-xs text-slate-400">
              العنصر المستهدف: <span className="text-white font-mono">{targetElement?.name}</span>
            </p>
          </div>

          {isOwner ? (
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 text-xs space-y-1">
              <span className="font-bold flex items-center gap-1.5">
                <Shield className="w-4 h-4" />
                <span>حساب المالك (Owner) — صلاحيات غير مقيدة</span>
              </span>
              <p className="text-[11px] text-emerald-400/80">
                المالك يمتلك بطبيعته كافة الصلاحيات على جميع عناصر ومراكز المنصة ولا يمكن تقييد صلاحياته أو تعديلها من قبل أي مسؤول آخر.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Operations Checkboxes */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-2">
                  العمليات المسموح بها لهذا العنصر فقط:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {allElementActions.map(act => {
                    const isGranted = activeActions.includes(act.action);
                    return (
                      <button
                        key={act.action}
                        type="button"
                        onClick={() => toggleAction(act.action)}
                        className={`p-2 rounded-xl text-xs font-semibold flex items-center justify-between transition ${
                          isGranted
                            ? 'bg-blue-600/30 border border-blue-500 text-white'
                            : 'bg-slate-800/60 border border-slate-700/60 text-slate-400 hover:text-white'
                        }`}
                      >
                        <span>{act.labelAr}</span>
                        <span className="text-[10px] font-mono opacity-60 uppercase">{act.labelEn}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Field-level Restrictions */}
              <div className="pt-3 border-t border-slate-800 space-y-2">
                <label className="text-xs font-bold text-amber-400 block">
                  تقييد حقول محددة (Field-Level Denial):
                </label>
                <p className="text-[11px] text-slate-400">
                  حدد الحقول المحظورة على هذا المسؤول حتى لو كان يمتلك صلاحية Edit (مثال: منع تعديل الصورة أو المسار):
                </p>

                <div className="space-y-1.5">
                  {[
                    { field: 'imageUrl', label: 'صورة العنصر (Image URL)' },
                    { field: 'targetRoute', label: 'الرابط والإجراء الداخلي (Target Route)' },
                    { field: 'name', label: 'الاسم الداخلي للعنصر (Internal Name)' },
                    { field: 'displayOrder', label: 'ترتيب العرض (Display Order)' }
                  ].map(f => {
                    const isRestricted = restrictedFields.includes(f.field);
                    return (
                      <button
                        key={f.field}
                        type="button"
                        onClick={() => toggleFieldRestriction(f.field)}
                        className={`w-full p-2 rounded-xl text-xs font-semibold flex items-center justify-between transition ${
                          isRestricted
                            ? 'bg-rose-950/60 border border-rose-800 text-rose-300'
                            : 'bg-slate-800/40 text-slate-400 hover:text-white'
                        }`}
                      >
                        <span>{f.label}</span>
                        <span className="text-[10px] font-bold">
                          {isRestricted ? 'محظور (Restricted)' : 'مسموح'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Provision New Administrator Form */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-lg space-y-3">
        <h4 className="font-bold text-sm text-cyan-400">+ تعيين وتفويض مسؤول إداري جديد</h4>
        <form onSubmit={handleCreateAdmin} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <input
            type="text"
            value={newAdminName}
            onChange={(e) => setNewAdminName(e.target.value)}
            placeholder="الاسم الكامل"
            required
            className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
          />
          <input
            type="email"
            value={newAdminEmail}
            onChange={(e) => setNewAdminEmail(e.target.value)}
            placeholder="البريد الإلكتروني"
            required
            className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
          />
          <select
            value={newAdminRole}
            onChange={(e) => setNewAdminRole(e.target.value as AdminRole)}
            className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
          >
            <option value="admin">Admin (مشرف عام)</option>
            <option value="super_admin_lectures">Super Admin - Lectures (مشرف المحاضرات)</option>
            <option value="super_admin_questions">Super Admin - Questions (مشرف بنك الأسئلة)</option>
          </select>
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md"
          >
            إضافة المسؤول فوراً
          </button>
        </form>
      </div>
    </div>
  );
};
