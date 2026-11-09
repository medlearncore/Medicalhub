/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { usePlatform } from '../PlatformContext';
import {
  FolderPlus,
  FilePlus,
  BookOpen,
  UploadCloud,
  CheckCircle2,
  FolderTree,
  ChevronRight,
  ChevronDown,
  Trash2,
  Edit,
  ExternalLink,
  Plus
} from 'lucide-react';
import { SubjectItem, LectureItem } from '../types';

export const AcademicContentManager: React.FC = () => {
  const { subjects, addSubject, updateSubject, lectures, addLecture, deleteLecture } = usePlatform();

  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(subjects[0]?.id || '');
  const [selectedModuleId, setSelectedModuleId] = useState<string>('');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('');

  // Creation Modals
  const [showAddLectureModal, setShowAddLectureModal] = useState(false);
  const [showAddModuleModal, setShowAddModuleModal] = useState(false);
  const [showAddTopicModal, setShowAddTopicModal] = useState(false);

  // Lecture form state
  const [lecTitle, setLecTitle] = useState('');
  const [lecAuthor, setLecAuthor] = useState('Dr. Medical Specialist');
  const [lecType, setLecType] = useState<'pdf' | 'video' | 'youtube' | 'pptx' | 'doc'>('pdf');
  const [lecPagesOrDuration, setLecPagesOrDuration] = useState('32 Pages · High-Yield Summary');
  const [lecSummary, setLecSummary] = useState('');
  const [lecUrl, setLecUrl] = useState('#');

  // Module & Topic Form States
  const [newModuleName, setNewModuleName] = useState('');
  const [newTopicName, setNewTopicName] = useState('');
  const [newTopicObj, setNewTopicObj] = useState('');

  const currentSubject = subjects.find(s => s.id === selectedSubjectId) || subjects[0];
  const subjectModules = currentSubject?.modules || [];
  const activeModule = subjectModules.find(m => m.id === selectedModuleId) || subjectModules[0];
  const activeTopic = activeModule?.topics.find(t => t.id === selectedTopicId) || activeModule?.topics[0];

  const filteredLectures = lectures.filter(l => l.subjectId === currentSubject?.id);

  const handleCreateLecture = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lecTitle || !currentSubject) return;

    addLecture({
      title: lecTitle,
      subjectId: currentSubject.id,
      topicId: activeTopic ? activeTopic.id : 'gen-topic',
      type: lecType,
      author: lecAuthor,
      durationOrPages: lecPagesOrDuration,
      url: lecUrl,
      status: 'published',
      summary: lecSummary || 'Comprehensive medical lecture slides and syllabus notes.'
    });

    // Reset and close
    setLecTitle('');
    setLecSummary('');
    setShowAddLectureModal(false);
    alert(`تمت إضافة ونشر المحاضرة بنجاح داخل مادة [${currentSubject.name}] وفي موضوع [${activeTopic?.title || 'عام'}]`);
  };

  const handleAddModule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newModuleName || !currentSubject) return;

    const newMod = {
      id: "mod-" + Date.now(),
      title: newModuleName,
      topics: [
        {
          id: "top-" + Date.now(),
          title: "Introduction to " + newModuleName,
          objectives: ["Core foundational overview"],
          lecturesCount: 0,
          qCount: 0,
          flashcardsCount: 0
        }
      ]
    };

    updateSubject(currentSubject.id, {
      modules: [...currentSubject.modules, newMod]
    });

    setNewModuleName('');
    setShowAddModuleModal(false);
    alert(`تمت إضافة الوحدة [${newModuleName}] إلى مادة [${currentSubject.name}]`);
  };

  const handleAddTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicName || !currentSubject || !activeModule) return;

    const newTop = {
      id: "top-" + Date.now(),
      title: newTopicName,
      objectives: newTopicObj ? newTopicObj.split('\n') : ["Master the clinical core concepts"],
      lecturesCount: 0,
      qCount: 0,
      flashcardsCount: 0
    };

    const updatedModules = currentSubject.modules.map(m => {
      if (m.id === activeModule.id) {
        return {
          ...m,
          topics: [...m.topics, newTop]
        };
      }
      return m;
    });

    updateSubject(currentSubject.id, {
      modules: updatedModules,
      topicsCount: currentSubject.topicsCount + 1
    });

    setNewTopicName('');
    setNewTopicObj('');
    setShowAddTopicModal(false);
    alert(`تمت إضافة الموضوع [${newTopicName}] داخل وحدة [${activeModule.title}]`);
  };

  return (
    <div className="space-y-6 text-slate-100" dir="rtl">
      {/* Top Selector Strip */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <FolderTree className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white">إدارة الهيكل الأكاديمي ورفع المحاضرات</h3>
            <p className="text-xs text-slate-400">حدد المادة والوحدة والموضوع لإضافة أو رفع المحاضرات في أي مكان بدقة ومزامنة فورية.</p>
          </div>
        </div>

        {/* Global Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowAddModuleModal(true)}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition border border-slate-700"
          >
            <FolderPlus className="w-4 h-4 text-cyan-400" />
            <span>+ وحدة جديدة (Module)</span>
          </button>

          <button
            onClick={() => setShowAddTopicModal(true)}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition border border-slate-700"
          >
            <FilePlus className="w-4 h-4 text-purple-400" />
            <span>+ موضوع جديد (Topic)</span>
          </button>

          <button
            onClick={() => setShowAddLectureModal(true)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-600/30 transition"
          >
            <UploadCloud className="w-4 h-4" />
            <span>+ رفع محاضرة / مرجع (Upload Lecture)</span>
          </button>
        </div>
      </div>

      {/* Synchronized 3-Level Hierarchy Picker */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Level 1: Subjects */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 pb-2 border-b border-slate-800">
            <span>1. اختر المادة (Subject)</span>
            <span className="text-blue-400">{subjects.length} مادة</span>
          </div>
          <div className="max-h-60 overflow-y-auto space-y-1.5">
            {subjects.map(s => (
              <button
                key={s.id}
                onClick={() => {
                  setSelectedSubjectId(s.id);
                  if (s.modules[0]) {
                    setSelectedModuleId(s.modules[0].id);
                    if (s.modules[0].topics[0]) {
                      setSelectedTopicId(s.modules[0].topics[0].id);
                    }
                  }
                }}
                className={`w-full text-right p-2.5 rounded-xl text-xs font-semibold transition flex items-center justify-between ${
                  selectedSubjectId === s.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-800/40 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <img src={s.image} alt="" className="w-5 h-5 object-contain" />
                  <span className="truncate">{s.name}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 shrink-0 rtl:rotate-180" />
              </button>
            ))}
          </div>
        </div>

        {/* Level 2: Modules */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 pb-2 border-b border-slate-800">
            <span>2. اختر الوحدة (Module)</span>
            <span className="text-cyan-400">{subjectModules.length} وحدة</span>
          </div>
          <div className="max-h-60 overflow-y-auto space-y-1.5">
            {subjectModules.length === 0 ? (
              <p className="text-xs text-slate-500 py-4 text-center">لا توجد وحدات بعد في هذه المادة</p>
            ) : (
              subjectModules.map((m, idx) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setSelectedModuleId(m.id);
                    if (m.topics[0]) setSelectedTopicId(m.topics[0].id);
                  }}
                  className={`w-full text-right p-2.5 rounded-xl text-xs font-semibold transition flex items-center justify-between ${
                    activeModule?.id === m.id
                      ? 'bg-cyan-600 text-white'
                      : 'bg-slate-800/40 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span className="truncate">{idx + 1}. {m.title}</span>
                  <ChevronRight className="w-3.5 h-3.5 shrink-0 rtl:rotate-180" />
                </button>
              ))
            )}
          </div>
        </div>

        {/* Level 3: Topics */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 pb-2 border-b border-slate-800">
            <span>3. اختر الموضوع (Topic)</span>
            <span className="text-purple-400">{activeModule?.topics.length || 0} موضوع</span>
          </div>
          <div className="max-h-60 overflow-y-auto space-y-1.5">
            {!activeModule || activeModule.topics.length === 0 ? (
              <p className="text-xs text-slate-500 py-4 text-center">اختر وحدة أولاً لعرض موضوعاتها</p>
            ) : (
              activeModule.topics.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTopicId(t.id)}
                  className={`w-full text-right p-2.5 rounded-xl text-xs font-semibold transition flex items-center justify-between ${
                    activeTopic?.id === t.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-800/40 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span className="truncate">• {t.title}</span>
                  <span className="text-[10px] opacity-75">{t.lecturesCount} مح</span>
                </button>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Lectures of Selected Context */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="font-bold text-base text-white">
              المحاضرات المرفوعة لمادة [{currentSubject.name}]
            </h3>
            <p className="text-xs text-slate-400">
              الموضوع المحدد حالياً: <b className="text-cyan-400">{activeTopic?.title || 'عام'}</b>
            </p>
          </div>
          <button
            onClick={() => setShowAddLectureModal(true)}
            className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>رفع محاضرة لهذا الموضوع</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredLectures.map(lec => (
            <div key={lec.id} className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-bold uppercase text-[10px]">
                    {lec.type}
                  </span>
                  <span className="text-slate-400 text-[11px]">{lec.durationOrPages}</span>
                </div>
                <h4 className="font-bold text-sm text-white">{lec.title}</h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{lec.summary}</p>
                <p className="text-[11px] text-slate-500 mt-2">المحاضر: {lec.author}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-700/50 flex items-center justify-between">
                <span className="text-[11px] text-emerald-400">📥 {lec.downloadsCount} تنزيل</span>
                <button
                  onClick={() => deleteLecture(lec.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-700 transition"
                  title="حذف المحاضرة"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Add Lecture */}
      {showAddLectureModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <h3 className="font-bold text-base text-white">إضافة ورفع محاضرة جديدة</h3>
            <p className="text-xs text-slate-400">
              سيتم ربط المحاضرة بمادة <b className="text-white">[{currentSubject.name}]</b> والموضوع <b className="text-white">[{activeTopic?.title || 'عام'}]</b>
            </p>

            <form onSubmit={handleCreateLecture} className="space-y-3">
              <div>
                <label className="block text-xs text-slate-300 mb-1">عنوان المحاضرة (Lecture Title)</label>
                <input
                  type="text"
                  value={lecTitle}
                  onChange={(e) => setLecTitle(e.target.value)}
                  placeholder="e.g. Acid-Base Disorders & Blood Gas Mastery"
                  required
                  className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-300 mb-1">نوع الملف</label>
                  <select
                    value={lecType}
                    onChange={(e) => setLecType(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  >
                    <option value="pdf">ملف PDF / مذكرة</option>
                    <option value="video">فيديو مسجل</option>
                    <option value="youtube">رابط YouTube</option>
                    <option value="pptx">عرض PPTX</option>
                    <option value="doc">مستند DOCX</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1">عدد الصفحات أو المدة</label>
                  <input
                    type="text"
                    value={lecPagesOrDuration}
                    onChange={(e) => setLecPagesOrDuration(e.target.value)}
                    placeholder="35 Pages or 45 Minutes"
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">اسم المحاضر أو المؤلف</label>
                <input
                  type="text"
                  value={lecAuthor}
                  onChange={(e) => setLecAuthor(e.target.value)}
                  placeholder="Prof. Dr. Specialist"
                  className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">الملخص والأهداف التعليمية</label>
                <textarea
                  value={lecSummary}
                  onChange={(e) => setLecSummary(e.target.value)}
                  placeholder="أهم النقاط السريرية التي تغطيها المحاضرة..."
                  className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white h-20"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddLectureModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white font-semibold text-xs"
                >
                  رفع ونشر المحاضرة فوراً
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Module */}
      {showAddModuleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="font-bold text-base text-white">إضافة وحدة جديدة لمادة [{currentSubject.name}]</h3>
            <form onSubmit={handleAddModule} className="space-y-3">
              <div>
                <label className="block text-xs text-slate-300 mb-1">اسم الوحدة (Module Name)</label>
                <input
                  type="text"
                  value={newModuleName}
                  onChange={(e) => setNewModuleName(e.target.value)}
                  placeholder="e.g. Coronary Artery Disease & Ischemia"
                  required
                  className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModuleModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-600 text-white font-semibold text-xs"
                >
                  حفظ الوحدة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Topic */}
      {showAddTopicModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="font-bold text-base text-white">إضافة موضوع جديد لوحدة [{activeModule?.title || 'عام'}]</h3>
            <form onSubmit={handleAddTopic} className="space-y-3">
              <div>
                <label className="block text-xs text-slate-300 mb-1">عنوان الموضوع (Topic Title)</label>
                <input
                  type="text"
                  value={newTopicName}
                  onChange={(e) => setNewTopicName(e.target.value)}
                  placeholder="e.g. Myocardial Infarction Biomarkers"
                  required
                  className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-300 mb-1">الأهداف التعليمية (سرد كل هدف في سطر)</label>
                <textarea
                  value={newTopicObj}
                  onChange={(e) => setNewTopicObj(e.target.value)}
                  placeholder="1. Understand Troponin I kinetics&#10;2. Contrast STEMI vs NSTEMI guidelines"
                  className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white h-20"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddTopicModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 text-white font-semibold text-xs"
                >
                  حفظ الموضوع
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
