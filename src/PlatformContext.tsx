/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SubjectItem,
  LectureItem,
  QuestionItem,
  FlashcardItem,
  AdminUser,
  AdminRole,
  PlatformAnnouncement,
  UIElementConfig,
  AuditLog,
  RegistryElement,
  ElementAction,
  VisibilityState,
  ActivationState,
  GranularElementPermission,
  SubjectCustomizationConfig
} from './types';
import {
  INITIAL_BRAND_CONFIG,
  INITIAL_SUBJECTS,
  INITIAL_LECTURES,
  INITIAL_QUESTIONS,
  INITIAL_FLASHCARDS,
  INITIAL_ADMIN_USERS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_AUDIT_LOGS,
  INITIAL_UI_ELEMENTS,
  INITIAL_ELEMENT_REGISTRY,
  INITIAL_GRANULAR_PERMISSIONS,
  INITIAL_SUBJECT_CUSTOMIZATIONS
} from './data';

interface PlatformContextType {
  // Locale & Brand
  lang: 'en' | 'ar';
  setLang: (lang: 'en' | 'ar') => void;
  brand: typeof INITIAL_BRAND_CONFIG;
  updateBrand: (updated: Partial<typeof INITIAL_BRAND_CONFIG>) => void;

  // Student State
  studentUser: {
    name: string;
    email: string;
    year: string;
    avatar: string;
    favorites: string[];
    completedLectures: string[];
    dueFlashcardsCount: number;
    studyStreak: number;
  };
  toggleFavorite: (subjectId: string) => void;
  markLectureCompleted: (lectureId: string) => void;

  // Admin Auth State
  currentAdmin: AdminUser | null;
  adminLogin: (email: string, role: AdminRole) => boolean;
  adminLogout: () => void;
  allAdminUsers: AdminUser[];
  updateAdminRole: (userId: string, newRole: AdminRole) => void;
  addAdminUser: (name: string, email: string, role: AdminRole) => void;
  toggleAdminStatus: (userId: string) => void;

  // Academic Content State
  subjects: SubjectItem[];
  addSubject: (subject: Omit<SubjectItem, 'id' | 'progress'>) => void;
  updateSubject: (id: string, updated: Partial<SubjectItem>) => void;
  deleteSubject: (id: string) => void;

  // Lectures State
  lectures: LectureItem[];
  addLecture: (lecture: Omit<LectureItem, 'id' | 'dateAdded' | 'downloadsCount'>) => void;
  updateLecture: (id: string, updated: Partial<LectureItem>) => void;
  deleteLecture: (id: string) => void;

  // Questions State
  questions: QuestionItem[];
  addQuestion: (question: Omit<QuestionItem, 'id'>) => void;
  updateQuestion: (id: string, updated: Partial<QuestionItem>) => void;
  deleteQuestion: (id: string) => void;
  bulkImportQuestions: (imported: QuestionItem[]) => number;

  // Flashcards State
  flashcards: FlashcardItem[];
  updateCardReview: (cardId: string, rating: 'easy' | 'good' | 'hard' | 'again') => void;
  addFlashcard: (card: Omit<FlashcardItem, 'id' | 'repetitions' | 'intervalDays' | 'nextReviewDate'>) => void;

  // UI Elements Management State
  uiElements: UIElementConfig[];
  updateUIElement: (id: string, updated: Partial<UIElementConfig>) => void;

  // Master Element Registry State & Granular Controls
  registryElements: RegistryElement[];
  getElement: (id: string) => RegistryElement | undefined;
  getElementContent: (id: string, fallback?: string) => string;
  isElementVisible: (id: string, contextSubjectId?: string) => boolean;
  updateRegistryElement: (id: string, updated: Partial<RegistryElement>, changeReason?: string) => { success: boolean; error?: string };
  toggleElementVisibility: (id: string, state?: VisibilityState) => void;
  toggleElementActivation: (id: string, state?: ActivationState) => void;
  publishElementDraft: (id: string) => { success: boolean; error?: string };
  restoreElementVersion: (id: string, versionId: string) => boolean;
  bulkUpdateElements: (elementIds: string[], updates: Partial<RegistryElement>, reason?: string) => void;

  // Subject Customizations
  subjectCustomizations: Record<string, SubjectCustomizationConfig>;
  updateSubjectCustomization: (subjectId: string, customConfig: Partial<SubjectCustomizationConfig>) => void;
  toggleSubjectTabVisibility: (subjectId: string, tabId: string) => void;

  // Granular Element Permissions
  granularPermissions: GranularElementPermission[];
  checkAdminPermission: (elementId: string, action: ElementAction, field?: string) => { allowed: boolean; reason: string };
  updateGranularPermission: (adminId: string, elementId: string, allowedActions: ElementAction[], restrictedFields?: string[]) => void;

  // Visual Editor State
  isVisualEditorActive: boolean;
  setIsVisualEditorActive: (active: boolean) => void;
  selectedVisualElementId: string | null;
  setSelectedVisualElementId: (id: string | null) => void;

  // Announcements State
  announcements: PlatformAnnouncement[];
  addAnnouncement: (announcement: Omit<PlatformAnnouncement, 'id' | 'date'>) => void;
  toggleAnnouncement: (id: string) => void;

  // Audit Logs
  auditLogs: AuditLog[];
  logAction: (action: string, center: string, target: string, details: string) => void;

  // Navigation Helper
  currentRoute: string;
  setCurrentRoute: (route: string) => void;
  selectedSubjectId: string | null;
  setSelectedSubjectId: (id: string | null) => void;
  selectedTopicId: string | null;
  setSelectedTopicId: (id: string | null) => void;
  activeTopicMode: 'study' | 'practice';
  setActiveTopicMode: (mode: 'study' | 'practice') => void;

  // Admin Gateway Modal Control
  isAdminGatewayOpen: boolean;
  setIsAdminGatewayOpen: (isOpen: boolean) => void;
}

const PlatformContext = createContext<PlatformContextType | undefined>(undefined);

export const PlatformProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<'en' | 'ar'>('en');
  const [brand, setBrand] = useState(INITIAL_BRAND_CONFIG);
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [activeTopicMode, setActiveTopicMode] = useState<'study' | 'practice'>('study');
  const [isAdminGatewayOpen, setIsAdminGatewayOpen] = useState(false);

  // Student Account
  const [studentUser, setStudentUser] = useState({
    name: "Omar Al-Mansoor",
    email: "omar.student@med.edu",
    year: "4th Year Medicine (Clinical Clerkship)",
    avatar: "OM",
    favorites: ["cardiovascular", "nervous", "renal"],
    completedLectures: ["lec-1", "lec-3"],
    dueFlashcardsCount: 24,
    studyStreak: 12
  });

  // Admin Auth
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(INITIAL_ADMIN_USERS[0]); // Default to Owner for seamless demo
  const [allAdminUsers, setAllAdminUsers] = useState<AdminUser[]>(INITIAL_ADMIN_USERS);

  // Dynamic Stores
  const [subjects, setSubjects] = useState<SubjectItem[]>(INITIAL_SUBJECTS);
  const [lectures, setLectures] = useState<LectureItem[]>(INITIAL_LECTURES);
  const [questions, setQuestions] = useState<QuestionItem[]>(INITIAL_QUESTIONS);
  const [flashcards, setFlashcards] = useState<FlashcardItem[]>(INITIAL_FLASHCARDS);
  const [uiElements, setUiElements] = useState<UIElementConfig[]>(INITIAL_UI_ELEMENTS);
  const [announcements, setAnnouncements] = useState<PlatformAnnouncement[]>(INITIAL_ANNOUNCEMENTS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);

  // Synchronize document direction with language
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const setLang = (newLang: 'en' | 'ar') => {
    setLangState(newLang);
  };

  const updateBrand = (updated: Partial<typeof INITIAL_BRAND_CONFIG>) => {
    setBrand(prev => {
      const next = { ...prev, ...updated };
      logAction("BRAND_UPDATE", "مركز الهوية والإعدادات العامة", "Platform Brand Configuration", `Updated brand: ${JSON.stringify(updated)}`);
      return next;
    });
  };

  const logAction = (action: string, center: string, target: string, details: string) => {
    const newLog: AuditLog = {
      id: "aud-" + Date.now(),
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      actor: currentAdmin ? currentAdmin.name : "System User",
      role: currentAdmin ? currentAdmin.role : "admin",
      action,
      center,
      target,
      details
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const toggleFavorite = (subjectId: string) => {
    setStudentUser(prev => {
      const exists = prev.favorites.includes(subjectId);
      return {
        ...prev,
        favorites: exists
          ? prev.favorites.filter(id => id !== subjectId)
          : [...prev.favorites, subjectId]
      };
    });
  };

  const markLectureCompleted = (lectureId: string) => {
    setStudentUser(prev => {
      if (prev.completedLectures.includes(lectureId)) return prev;
      return {
        ...prev,
        completedLectures: [...prev.completedLectures, lectureId]
      };
    });
  };

  const adminLogin = (email: string, role: AdminRole): boolean => {
    const existing = allAdminUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      if (!existing.isActive) return false;
      setCurrentAdmin(existing);
    } else {
      const newAdmin: AdminUser = {
        id: "adm-" + Date.now(),
        name: email.split('@')[0],
        email,
        role,
        isActive: true,
        lastLogin: "Just now"
      };
      setAllAdminUsers(prev => [...prev, newAdmin]);
      setCurrentAdmin(newAdmin);
    }
    logAction("ADMIN_LOGIN", "بوابة الإدارة", email, `Logged in with role: ${role}`);
    return true;
  };

  const adminLogout = () => {
    if (currentAdmin) {
      logAction("ADMIN_LOGOUT", "بوابة الإدارة", currentAdmin.email, "Admin signed out");
    }
    setCurrentAdmin(null);
    setCurrentRoute('home');
  };

  const updateAdminRole = (userId: string, newRole: AdminRole) => {
    setAllAdminUsers(prev =>
      prev.map(u => (u.id === userId ? { ...u, role: newRole } : u))
    );
    logAction("UPDATE_ROLE", "مركز إدارة المسؤولين والصلاحيات", userId, `Changed role to: ${newRole}`);
  };

  const addAdminUser = (name: string, email: string, role: AdminRole) => {
    const newUser: AdminUser = {
      id: "adm-" + Date.now(),
      name,
      email,
      role,
      isActive: true,
      lastLogin: "Never"
    };
    setAllAdminUsers(prev => [...prev, newUser]);
    logAction("ADD_ADMIN", "مركز إدارة المسؤولين والصلاحيات", email, `Provisioned new admin with role: ${role}`);
  };

  const toggleAdminStatus = (userId: string) => {
    setAllAdminUsers(prev =>
      prev.map(u => (u.id === userId ? { ...u, isActive: !u.isActive } : u))
    );
    logAction("TOGGLE_ADMIN_STATUS", "مركز إدارة المسؤولين والصلاحيات", userId, "Toggled account active state");
  };

  // Subjects
  const addSubject = (sub: Omit<SubjectItem, 'id' | 'progress'>) => {
    const newSub: SubjectItem = {
      ...sub,
      id: "subj-" + Date.now(),
      progress: 0
    };
    setSubjects(prev => [newSub, ...prev]);
    logAction("CREATE_SUBJECT", "مركز إدارة الأكاديمية", sub.name, "Created new medical subject");
  };

  const updateSubject = (id: string, updated: Partial<SubjectItem>) => {
    setSubjects(prev =>
      prev.map(s => (s.id === id ? { ...s, ...updated } : s))
    );
    logAction("UPDATE_SUBJECT", "مركز إدارة الأكاديمية", id, "Updated subject parameters");
  };

  const deleteSubject = (id: string) => {
    const target = subjects.find(s => s.id === id);
    setSubjects(prev => prev.filter(s => s.id !== id));
    logAction("DELETE_SUBJECT", "مركز إدارة الأكاديمية", target?.name || id, "Deleted medical subject");
  };

  // Lectures
  const addLecture = (lec: Omit<LectureItem, 'id' | 'dateAdded' | 'downloadsCount'>) => {
    const newLec: LectureItem = {
      ...lec,
      id: "lec-" + Date.now(),
      dateAdded: new Date().toISOString().split('T')[0],
      downloadsCount: 0
    };
    setLectures(prev => [newLec, ...prev]);
    logAction("ADD_LECTURE", "مركز إدارة المحاضرات والمكتبة", lec.title, "Uploaded new educational reference");
  };

  const updateLecture = (id: string, updated: Partial<LectureItem>) => {
    setLectures(prev =>
      prev.map(l => (l.id === id ? { ...l, ...updated } : l))
    );
    logAction("UPDATE_LECTURE", "مركز إدارة المحاضرات والمكتبة", id, "Modified lecture metadata");
  };

  const deleteLecture = (id: string) => {
    setLectures(prev => prev.filter(l => l.id !== id));
    logAction("DELETE_LECTURE", "مركز إدارة المحاضرات والمكتبة", id, "Archived lecture reference");
  };

  // Questions
  const addQuestion = (q: Omit<QuestionItem, 'id'>) => {
    const newQ: QuestionItem = {
      ...q,
      id: "q-" + Date.now()
    };
    setQuestions(prev => [newQ, ...prev]);
    logAction("ADD_QUESTION", "مركز إدارة بنك الأسئلة", newQ.id, "Authored new question item");
  };

  const updateQuestion = (id: string, updated: Partial<QuestionItem>) => {
    setQuestions(prev =>
      prev.map(q => (q.id === id ? { ...q, ...updated } : q))
    );
    logAction("UPDATE_QUESTION", "مركز إدارة بنك الأسئلة", id, "Updated question details");
  };

  const deleteQuestion = (id: string) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
    logAction("DELETE_QUESTION", "مركز إدارة بنك الأسئلة", id, "Deleted question");
  };

  const bulkImportQuestions = (imported: QuestionItem[]): number => {
    setQuestions(prev => [...imported, ...prev]);
    logAction("BULK_IMPORT_QUESTIONS", "مركز إدارة بنك الأسئلة", `${imported.length} Questions`, "Successfully imported batch");
    return imported.length;
  };

  // Flashcards
  const updateCardReview = (cardId: string, rating: 'easy' | 'good' | 'hard' | 'again') => {
    setFlashcards(prev =>
      prev.map(c => {
        if (c.id !== cardId) return c;
        const newInterval = rating === 'easy' ? c.intervalDays * 2 + 1 : rating === 'good' ? c.intervalDays + 2 : 1;
        return {
          ...c,
          difficulty: rating,
          repetitions: c.repetitions + 1,
          intervalDays: newInterval,
          nextReviewDate: new Date(Date.now() + newInterval * 86400000).toISOString().split('T')[0]
        };
      })
    );
  };

  const addFlashcard = (card: Omit<FlashcardItem, 'id' | 'repetitions' | 'intervalDays' | 'nextReviewDate'>) => {
    const newCard: FlashcardItem = {
      ...card,
      id: "fc-" + Date.now(),
      repetitions: 0,
      intervalDays: 1,
      nextReviewDate: new Date().toISOString().split('T')[0]
    };
    setFlashcards(prev => [newCard, ...prev]);
    logAction("ADD_FLASHCARD", "مركز إدارة البطاقات التعليمية", newCard.front.substring(0, 30), "Created flashcard item");
  };

  // UI Elements
  const updateUIElement = (id: string, updated: Partial<UIElementConfig>) => {
    setUiElements(prev =>
      prev.map(el => (el.id === id ? { ...el, ...updated } : el))
    );
    logAction("UPDATE_UI_ELEMENT", "مركز إدارة الواجهة", id, `Modified element visibility/text: ${JSON.stringify(updated)}`);
  };

  // -------------------------------------------------------------------------
  // MASTER ELEMENT REGISTRY & GRANULAR PERMISSION ENGINE
  // -------------------------------------------------------------------------
  const [registryElements, setRegistryElements] = useState<RegistryElement[]>(INITIAL_ELEMENT_REGISTRY);
  const [granularPermissions, setGranularPermissions] = useState<GranularElementPermission[]>(INITIAL_GRANULAR_PERMISSIONS);
  const [subjectCustomizations, setSubjectCustomizations] = useState<Record<string, SubjectCustomizationConfig>>(INITIAL_SUBJECT_CUSTOMIZATIONS);
  
  // Visual Editor State
  const [isVisualEditorActive, setIsVisualEditorActive] = useState<boolean>(false);
  const [selectedVisualElementId, setSelectedVisualElementId] = useState<string | null>(null);

  // Security & Least Privilege Check
  const checkAdminPermission = (
    elementId: string,
    action: ElementAction,
    field?: string
  ): { allowed: boolean; reason: string } => {
    if (!currentAdmin) {
      return { allowed: false, reason: "Unauthorized: No active admin session found." };
    }
    // Owner has unrestricted super-authority
    if (currentAdmin.role === 'owner') {
      return { allowed: true, reason: "Full access granted by Owner authority." };
    }

    // Check specific element rule for this admin
    const directRule = granularPermissions.find(
      p => p.adminId === currentAdmin.id && (p.elementId === elementId || p.elementId === '*')
    );

    if (!directRule) {
      return {
        allowed: false,
        reason: `Access Denied: Admin [${currentAdmin.name}] has no granted permission for element [${elementId}].`
      };
    }

    if (!directRule.allowedActions.includes(action)) {
      return {
        allowed: false,
        reason: `Access Denied: Action [${action.toUpperCase()}] is not granted on this element for [${currentAdmin.role}].`
      };
    }

    if (field && directRule.restrictedFields && directRule.restrictedFields.includes(field)) {
      return {
        allowed: false,
        reason: `Access Denied: Field [${field}] is strictly restricted from editing by this role.`
      };
    }

    return { allowed: true, reason: "Authorized" };
  };

  const getElement = (id: string): RegistryElement | undefined => {
    return registryElements.find(el => el.id === id);
  };

  const getElementContent = (id: string, fallback?: string): string => {
    const el = registryElements.find(e => e.id === id);
    if (!el) return fallback || '';
    
    // If element is hidden and student is viewing, check visibility
    if (!currentAdmin && el.visibility === 'hidden') {
      return '';
    }

    // Return translated content
    return lang === 'ar' ? (el.contentAr || el.contentEn) : (el.contentEn || el.contentAr);
  };

  const isElementVisible = (id: string, contextSubjectId?: string): boolean => {
    // Subject specific tab hide rule check
    if (contextSubjectId && subjectCustomizations[contextSubjectId]) {
      const custom = subjectCustomizations[contextSubjectId];
      // If element is a tab and listed in hiddenTabs
      if (custom.hiddenTabs.some(t => id.includes(t))) {
        return false;
      }
    }

    const el = registryElements.find(e => e.id === id);
    if (!el) return true;
    return el.visibility === 'visible';
  };

  const updateRegistryElement = (
    id: string,
    updated: Partial<RegistryElement>,
    changeReason?: string
  ): { success: boolean; error?: string } => {
    const target = registryElements.find(e => e.id === id);
    if (!target) return { success: false, error: "Element not found" };

    // Verify permissions
    const permCheck = checkAdminPermission(id, 'edit');
    if (!permCheck.allowed) {
      logAction("PERMISSION_DENIED", "منظومة الصلاحيات", id, permCheck.reason);
      return { success: false, error: permCheck.reason };
    }

    // Safety guard: Cannot alter critical keys
    if (target.isSystemCritical && updated.id && updated.id !== target.id) {
      return { success: false, error: "Cannot rename internal ID of system-critical element." };
    }

    // Snapshot version before modification
    const versionSnapshot = {
      versionId: `v-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      modifiedBy: currentAdmin ? currentAdmin.name : "System",
      role: currentAdmin ? currentAdmin.role : 'admin',
      contentEn: target.contentEn,
      contentAr: target.contentAr,
      imageUrl: target.imageUrl,
      visibility: target.visibility,
      activation: target.activation,
      publicationStatus: target.publicationStatus,
      changeReason: changeReason || "Admin element modification"
    };

    setRegistryElements(prev =>
      prev.map(el => {
        if (el.id !== id) return el;
        return {
          ...el,
          ...updated,
          lastModifiedBy: currentAdmin ? currentAdmin.name : "Admin",
          lastModifiedDate: new Date().toISOString().replace('T', ' ').substring(0, 16),
          versions: [versionSnapshot, ...el.versions]
        };
      })
    );

    logAction(
      "UPDATE_ELEMENT",
      "مركز التحكم الدقيق بالعناصر",
      `${target.name} [${id}]`,
      `Updated properties: ${Object.keys(updated).join(', ')}. Reason: ${changeReason || 'Direct update'}`
    );

    return { success: true };
  };

  const toggleElementVisibility = (id: string, state?: VisibilityState) => {
    const target = registryElements.find(e => e.id === id);
    if (!target) return;

    const action = state === 'hidden' ? 'hide' : 'show';
    const permCheck = checkAdminPermission(id, action);
    if (!permCheck.allowed) {
      alert(`غير مصرح: ${permCheck.reason}`);
      return;
    }

    const nextState: VisibilityState = state || (target.visibility === 'visible' ? 'hidden' : 'visible');
    updateRegistryElement(id, { visibility: nextState }, `Toggled visibility to ${nextState}`);
  };

  const toggleElementActivation = (id: string, state?: ActivationState) => {
    const target = registryElements.find(e => e.id === id);
    if (!target) return;

    const action = state === 'disabled' ? 'disable' : 'enable';
    const permCheck = checkAdminPermission(id, action);
    if (!permCheck.allowed) {
      alert(`غير مصرح: ${permCheck.reason}`);
      return;
    }

    const nextState: ActivationState = state || (target.activation === 'enabled' ? 'disabled' : 'enabled');
    updateRegistryElement(id, { activation: nextState }, `Toggled activation to ${nextState}`);
  };

  const publishElementDraft = (id: string): { success: boolean; error?: string } => {
    const permCheck = checkAdminPermission(id, 'publish');
    if (!permCheck.allowed) {
      return { success: false, error: permCheck.reason };
    }

    const target = registryElements.find(e => e.id === id);
    if (!target) return { success: false, error: "Element not found" };

    setRegistryElements(prev =>
      prev.map(el => {
        if (el.id !== id) return el;
        return {
          ...el,
          contentEn: el.draftContentEn !== undefined ? el.draftContentEn : el.contentEn,
          contentAr: el.draftContentAr !== undefined ? el.draftContentAr : el.contentAr,
          draftContentEn: undefined,
          draftContentAr: undefined,
          publicationStatus: 'published',
          lastModifiedBy: currentAdmin?.name || 'Admin',
          lastModifiedDate: new Date().toISOString().replace('T', ' ').substring(0, 16)
        };
      })
    );

    logAction("PUBLISH_ELEMENT", "مركز التحكم الدقيق بالعناصر", id, "Published draft changes live to students.");
    return { success: true };
  };

  const restoreElementVersion = (id: string, versionId: string): boolean => {
    const target = registryElements.find(e => e.id === id);
    if (!target) return false;

    const permCheck = checkAdminPermission(id, 'restore');
    if (!permCheck.allowed) {
      alert(`فشلت الاستعادة: ${permCheck.reason}`);
      return false;
    }

    const version = target.versions.find(v => v.versionId === versionId);
    if (!version) return false;

    // Restore properties and log audit
    updateRegistryElement(
      id,
      {
        contentEn: version.contentEn,
        contentAr: version.contentAr,
        imageUrl: version.imageUrl,
        visibility: version.visibility,
        activation: version.activation,
        publicationStatus: version.publicationStatus
      },
      `Rollback to version timestamp ${version.timestamp}`
    );

    logAction("RESTORE_VERSION", "مركز سجل التعديلات والإصدارات", id, `Restored version [${versionId}] created by [${version.modifiedBy}]`);
    return true;
  };

  const bulkUpdateElements = (elementIds: string[], updates: Partial<RegistryElement>, reason?: string) => {
    elementIds.forEach(elId => {
      updateRegistryElement(elId, updates, reason || "Bulk element batch modification");
    });
  };

  // Subject Customization Engine
  const updateSubjectCustomization = (subjectId: string, customConfig: Partial<SubjectCustomizationConfig>) => {
    setSubjectCustomizations(prev => ({
      ...prev,
      [subjectId]: {
        ...(prev[subjectId] || {
          subjectId,
          hiddenTabs: [],
          tabOrder: ["overview", "topics", "lectures", "questions", "flashcards"]
        }),
        ...customConfig
      }
    }));
    logAction(
      "SUBJECT_CUSTOMIZATION",
      "مركز تخصيص المواد والصفحات",
      subjectId,
      `Updated subject layout parameters: ${JSON.stringify(customConfig)}`
    );
  };

  const toggleSubjectTabVisibility = (subjectId: string, tabId: string) => {
    setSubjectCustomizations(prev => {
      const current = prev[subjectId] || {
        subjectId,
        hiddenTabs: [],
        tabOrder: ["overview", "topics", "lectures", "questions", "flashcards"]
      };
      const isHidden = current.hiddenTabs.includes(tabId);
      const nextHidden = isHidden
        ? current.hiddenTabs.filter(t => t !== tabId)
        : [...current.hiddenTabs, tabId];

      const updated = { ...current, hiddenTabs: nextHidden };
      logAction(
        "SUBJECT_TAB_TOGGLE",
        "مركز تخصيص المواد والصفحات",
        `${subjectId} → ${tabId}`,
        `Tab visibility set to: ${isHidden ? 'Visible' : 'Hidden'}`
      );
      return { ...prev, [subjectId]: updated };
    });
  };

  // Granular Permission Assignment
  const updateGranularPermission = (
    adminId: string,
    elementId: string,
    allowedActions: ElementAction[],
    restrictedFields: string[] = []
  ) => {
    if (currentAdmin?.role !== 'owner') {
      alert("المالك (Owner) هو الوحيد المخول بتعديل وتفويض الصلاحيات.");
      return;
    }

    setGranularPermissions(prev => {
      const filtered = prev.filter(p => !(p.adminId === adminId && p.elementId === elementId));
      return [...filtered, { adminId, elementId, allowedActions, restrictedFields }];
    });

    logAction(
      "UPDATE_GRANULAR_PERMISSIONS",
      "مركز تخصيص الصلاحيات",
      `Admin ID: ${adminId} on Element: ${elementId}`,
      `Configured actions: [${allowedActions.join(', ')}]`
    );
  };

  // Announcements
  const addAnnouncement = (ann: Omit<PlatformAnnouncement, 'id' | 'date'>) => {
    const newAnn: PlatformAnnouncement = {
      ...ann,
      id: "ann-" + Date.now(),
      date: new Date().toISOString().split('T')[0]
    };
    setAnnouncements(prev => [newAnn, ...prev]);
    logAction("CREATE_ANNOUNCEMENT", "مركز الإعلانات والتنبيهات", ann.title, "Published new announcement");
  };

  const toggleAnnouncement = (id: string) => {
    setAnnouncements(prev =>
      prev.map(a => (a.id === id ? { ...a, isActive: !a.isActive } : a))
    );
    logAction("TOGGLE_ANNOUNCEMENT", "مركز الإعلانات والتنبيهات", id, "Toggled active visibility");
  };

  return (
    <PlatformContext.Provider
      value={{
        lang,
        setLang,
        brand,
        updateBrand,
        studentUser,
        toggleFavorite,
        markLectureCompleted,
        currentAdmin,
        adminLogin,
        adminLogout,
        allAdminUsers,
        updateAdminRole,
        addAdminUser,
        toggleAdminStatus,
        subjects,
        addSubject,
        updateSubject,
        deleteSubject,
        lectures,
        addLecture,
        updateLecture,
        deleteLecture,
        questions,
        addQuestion,
        updateQuestion,
        deleteQuestion,
        bulkImportQuestions,
        flashcards,
        updateCardReview,
        addFlashcard,
        uiElements,
        updateUIElement,
        registryElements,
        getElement,
        getElementContent,
        isElementVisible,
        updateRegistryElement,
        toggleElementVisibility,
        toggleElementActivation,
        publishElementDraft,
        restoreElementVersion,
        bulkUpdateElements,
        subjectCustomizations,
        updateSubjectCustomization,
        toggleSubjectTabVisibility,
        granularPermissions,
        checkAdminPermission,
        updateGranularPermission,
        isVisualEditorActive,
        setIsVisualEditorActive,
        selectedVisualElementId,
        setSelectedVisualElementId,
        announcements,
        addAnnouncement,
        toggleAnnouncement,
        auditLogs,
        logAction,
        currentRoute,
        setCurrentRoute,
        selectedSubjectId,
        setSelectedSubjectId,
        selectedTopicId,
        setSelectedTopicId,
        activeTopicMode,
        setActiveTopicMode,
        isAdminGatewayOpen,
        setIsAdminGatewayOpen
      }}
    >
      {children}
    </PlatformContext.Provider>
  );
};

export const usePlatform = () => {
  const context = useContext(PlatformContext);
  if (!context) {
    throw new Error("usePlatform must be used within a PlatformProvider");
  }
  return context;
};
