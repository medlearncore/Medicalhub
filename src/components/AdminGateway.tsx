/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { usePlatform } from '../PlatformContext';
import { Shield, Key, Lock, CheckCircle2, AlertCircle, X, ExternalLink, ArrowRight } from 'lucide-react';
import { AdminRole } from '../types';

export const AdminGatewayModal: React.FC = () => {
  const {
    isAdminGatewayOpen,
    setIsAdminGatewayOpen,
    currentAdmin,
    adminLogin,
    adminLogout,
    allAdminUsers,
    setCurrentRoute,
    lang
  } = usePlatform();

  const [selectedRole, setSelectedRole] = useState<AdminRole>('owner');
  const [emailInput, setEmailInput] = useState('owner@medstudyhub.org');
  const [passwordInput, setPasswordInput] = useState('medstudy2026');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isAdminGatewayOpen) return null;

  const rolePresets = [
    {
      role: 'owner' as AdminRole,
      title: 'Owner (المالك)',
      desc: 'Full system control, 11 centers, database & all admins',
      email: 'owner@medstudyhub.org'
    },
    {
      role: 'admin' as AdminRole,
      title: 'General Admin (مشرف عام)',
      desc: 'Interface, announcements, pages & UI visibility',
      email: 'admin@medstudyhub.org'
    },
    {
      role: 'super_admin_lectures' as AdminRole,
      title: 'Super Admin — Lectures (مشرف المحاضرات)',
      desc: 'Direct uploads, library management & publishing',
      email: 'lectures@medstudyhub.org'
    },
    {
      role: 'super_admin_questions' as AdminRole,
      title: 'Super Admin — Questions (مشرف بنك الأسئلة)',
      desc: 'Question bank authoring, imports & validation',
      email: 'questions@medstudyhub.org'
    }
  ];

  const handleRoleSelect = (role: AdminRole, email: string) => {
    setSelectedRole(role);
    setEmailInput(email);
    setErrorMsg('');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !passwordInput) {
      setErrorMsg('Please enter valid administrator credentials.');
      return;
    }

    const success = adminLogin(emailInput, selectedRole);
    if (success) {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setIsAdminGatewayOpen(false);
        setCurrentRoute('admin');
      }, 700);
    } else {
      setErrorMsg('Account is disabled or invalid credentials.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 overflow-hidden"
        dir={lang === 'ar' ? 'rtl' : 'ltr'}
      >
        {/* Header Strip */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">
                {lang === 'ar' ? 'بوابة الدخول الإدارية المؤمنة' : 'Secure Administrative Gateway'}
              </h3>
              <p className="text-xs text-slate-400">
                {lang === 'ar' ? 'مركز القيادة والتحكم الشامل — MedStudy Hub' : 'Master Control & Command Center Access'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAdminGatewayOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {currentAdmin ? (
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider block">
                    {lang === 'ar' ? 'الجلسة الإدارية نشطة حالياً' : 'Active Session Established'}
                  </span>
                  <p className="font-bold text-white text-base mt-0.5">{currentAdmin.name}</p>
                  <p className="text-xs text-slate-400">{currentAdmin.email}</p>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-bold uppercase">
                  {currentAdmin.role}
                </span>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    setIsAdminGatewayOpen(false);
                    setCurrentRoute('admin');
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition flex items-center justify-center gap-2"
                >
                  <span>{lang === 'ar' ? 'فتح لوحة القيادة' : 'Open Master Control Center'}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>
                <button
                  onClick={() => {
                    adminLogout();
                    setIsAdminGatewayOpen(false);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-700 hover:bg-rose-900/40 hover:text-rose-400 text-slate-300 font-medium text-xs transition"
                >
                  {lang === 'ar' ? 'تسجيل الخروج' : 'Sign Out'}
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Role Quick Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  {lang === 'ar' ? 'اختر الدور الإداري للاختبار والدخول:' : 'Select Administrative Role for Access:'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {rolePresets.map(preset => (
                    <button
                      type="button"
                      key={preset.role}
                      onClick={() => handleRoleSelect(preset.role, preset.email)}
                      className={`p-3 rounded-xl text-left rtl:text-right border transition ${
                        selectedRole === preset.role
                          ? 'bg-blue-600/15 border-blue-500 text-white shadow-xs'
                          : 'bg-slate-800/60 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-xs text-white block">{preset.title}</span>
                        {selectedRole === preset.role && <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />}
                      </div>
                      <span className="text-[11px] text-slate-400 leading-snug block">{preset.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Fields */}
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {lang === 'ar' ? 'البريد الإلكتروني الإداري' : 'Admin Email Address'}
                  </label>
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                    placeholder="admin@medstudyhub.org"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {lang === 'ar' ? 'كلمة المرور' : 'Password'}
                  </label>
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                    placeholder="••••••••••••"
                  />
                </div>

                {errorMsg && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {isSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{lang === 'ar' ? 'تم التحقق بنجاح! جاري التوجيه إلى مركز القيادة...' : 'Verification successful! Redirecting to Command Center...'}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSuccess}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-[0.99] text-white font-semibold text-sm transition shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'المصادقة ودخول الإدارة' : 'Authenticate & Enter Center'}</span>
                </button>
              </form>
            </>
          )}
        </div>

        {/* Footer Note */}
        <div className="px-6 py-3.5 bg-slate-950/60 border-t border-slate-800/80 text-[11px] text-slate-500 flex items-center justify-between">
          <span>{lang === 'ar' ? 'آلية دخول مطابقة لمنصة وعي يداوي' : 'Autonomous Administrative Portal Architecture'}</span>
          <span>Role-Based Access Control (RBAC)</span>
        </div>
      </div>
    </div>
  );
};

export const FloatingAdminIcon: React.FC = () => {
  const { setIsAdminGatewayOpen, currentAdmin, lang } = usePlatform();

  return (
    <div className="fixed bottom-5 end-5 z-40">
      <button
        onClick={() => setIsAdminGatewayOpen(true)}
        className="group relative flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900/95 hover:bg-slate-900 text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 border border-slate-700/80 backdrop-blur-md transition-all duration-200"
        title="بوابة الإدارة المستقلة — MedStudy Hub"
        aria-label="Admin Portal Gateway"
      >
        <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
        <Shield className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
        <span className="text-xs font-semibold tracking-wide hidden sm:inline">
          {currentAdmin ? (lang === 'ar' ? 'مركز القيادة' : 'Control Center') : (lang === 'ar' ? 'بوابة الإدارة' : 'Admin Portal')}
        </span>
      </button>
    </div>
  );
};
