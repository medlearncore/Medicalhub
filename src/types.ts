/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Medical images specifically matched to biological taxonomy
export const MEDICAL_ASSETS = {
  heart: "/assets/aistudio/heart_2d39ae2d.png",
  brain: "/assets/aistudio/brain_79a62591.png",
  lungs: "/assets/aistudio/lungs_64f4c8d4.png",
  skeleton: "/assets/aistudio/skeleton_8d8f9dea.png",
  organs: "/assets/aistudio/organs_71f3ea83.png",
  dna: "/assets/aistudio/dna_1b54e38c.png",
  pills: "/assets/aistudio/pills_5fc43f17.png",
  stethoscope: "/assets/aistudio/stethoscope_8bbd1f2a.png",
  embryology: "/assets/aistudio/embryology_912e824a.png",
  endocrine: "/assets/aistudio/endocrine_d1f21868.png",
  gi: "/assets/aistudio/gi_018bfd7a.png",
  hematology: "/assets/aistudio/hematology_4535648c.png",
  histology: "/assets/aistudio/histology_8e4cccf6.png",
  immunology: "/assets/aistudio/immunology_eb6b265e.png",
  microbiology: "/assets/aistudio/microbiology_15c9e0f6.png",
  renal: "/assets/aistudio/renal_2b3cb36f.png"
};

export type AdminRole = 'owner' | 'admin' | 'super_admin_lectures' | 'super_admin_questions';

export interface AdminPermission {
  centerId: string;
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canPublish: boolean;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  isActive: boolean;
  lastLogin?: string;
  permissions?: Record<string, Partial<AdminPermission>>;
}

export interface SubjectItem {
  id: string;
  name: string;
  group: 'basic' | 'systems' | 'clinical';
  categoryEn: string;
  categoryAr: string;
  image: string;
  desc: string;
  descAr: string;
  progress: number;
  topicsCount: number;
  qCount: number;
  lecturesCount: number;
  flashcardsCount: number;
  clinicalCasesCount: number;
  status: 'published' | 'draft' | 'archived';
  modules: {
    id: string;
    title: string;
    topics: {
      id: string;
      title: string;
      objectives: string[];
      lecturesCount: number;
      qCount: number;
      flashcardsCount: number;
    }[];
  }[];
}

export interface LectureItem {
  id: string;
  title: string;
  subjectId: string;
  topicId: string;
  type: 'pdf' | 'video' | 'youtube' | 'pptx' | 'doc';
  author: string;
  durationOrPages: string;
  dateAdded: string;
  url: string;
  status: 'published' | 'draft' | 'archived';
  downloadsCount: number;
  summary: string;
}

export interface QuestionChoice {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface QuestionItem {
  id: string;
  subjectId: string;
  topicId: string;
  vignette: string;
  question: string;
  difficulty: 'Easy' | 'Medium' | 'High-Yield Hard';
  type: 'Clinical Vignette' | 'Single Best Answer' | 'Image-Based';
  choices: QuestionChoice[];
  generalExplanation: string;
  referenceSource: string;
  status: 'published' | 'draft' | 'review';
}

export interface FlashcardItem {
  id: string;
  subjectId: string;
  topicId: string;
  front: string;
  back: string;
  clozeHint?: string;
  difficulty: 'easy' | 'good' | 'hard' | 'again';
  nextReviewDate: string;
  intervalDays: number;
  repetitions: number;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  role: AdminRole;
  action: string;
  center: string;
  target: string;
  details: string;
}

export interface PlatformAnnouncement {
  id: string;
  title: string;
  titleAr: string;
  content: string;
  contentAr: string;
  targetAudience: 'all' | 'students' | 'administrators';
  isActive: boolean;
  date: string;
  badge: string;
}

export interface UIElementConfig {
  id: string;
  section: string;
  titleEn: string;
  titleAr: string;
  subtitleEn?: string;
  subtitleAr?: string;
  isVisible: boolean;
  order: number;
}

// ---------------------------------------------------------------------------
// MASTER GRANULAR ELEMENT CONTROL & REGISTRY MODELS
// ---------------------------------------------------------------------------

export type ElementType =
  | 'title'
  | 'subtitle'
  | 'text'
  | 'button'
  | 'tab'
  | 'image'
  | 'icon'
  | 'card'
  | 'input'
  | 'section'
  | 'badge';

export type VisibilityState = 'visible' | 'hidden' | 'archived';
export type ActivationState = 'enabled' | 'disabled';
export type PublicationStatus = 'published' | 'draft' | 'under_review';

export type ElementAction =
  | 'view'
  | 'create'
  | 'edit'
  | 'delete'
  | 'rename'
  | 'hide'
  | 'show'
  | 'enable'
  | 'disable'
  | 'reorder'
  | 'upload'
  | 'replace'
  | 'publish'
  | 'unpublish'
  | 'archive'
  | 'restore'
  | 'export'
  | 'manage_permissions';

export interface ElementVersion {
  versionId: string;
  timestamp: string;
  modifiedBy: string;
  role: AdminRole;
  contentEn: string;
  contentAr: string;
  imageUrl?: string;
  visibility: VisibilityState;
  activation: ActivationState;
  publicationStatus: PublicationStatus;
  changeReason?: string;
}

export interface RegistryElement {
  id: string;                      // Unique Element ID (e.g., 'home-hero-title')
  name: string;                    // Friendly administrative label
  type: ElementType;               // 'title', 'button', 'tab', etc.
  pageName: string;                // e.g. 'Homepage', 'SubjectWorkspace', 'Navbar'
  parentSection: string;           // e.g. 'Hero Section', 'Tab Bar', 'Footer'
  parentElementId?: string;        // Nested hierarchy
  locationPath: string;            // e.g. "Website → Home Page → Hero Section → Main Title"
  
  // Content values (Bilingual)
  contentEn: string;
  contentAr: string;
  draftContentEn?: string;
  draftContentAr?: string;
  imageUrl?: string;
  targetRoute?: string;            // for buttons / navigation
  customColor?: string;            // optional accent
  
  // Control States
  visibility: VisibilityState;     // 'visible' | 'hidden' | 'archived'
  activation: ActivationState;     // 'enabled' | 'disabled'
  publicationStatus: PublicationStatus; // 'published' | 'draft'
  displayOrder: number;
  
  // Classification & Guard
  isSystemCritical?: boolean;      // If true, functional logic cannot be broken
  
  // Scopes & Overrides support
  scope: 'global' | 'page' | 'subject' | 'module' | 'topic';
  subjectId?: string;              // Specific subject override (e.g. 'cardiovascular')
  
  // Administrative audit
  lastModifiedBy: string;
  lastModifiedDate: string;
  
  // Version history snapshot
  versions: ElementVersion[];
}

// Granular per-element and per-field permissions
export interface GranularElementPermission {
  adminId: string;
  elementId: string;               // Target element or '*' for wildcard
  allowedActions: ElementAction[];
  restrictedFields?: string[];     // specific fields this admin cannot modify (e.g. ['name', 'imageUrl'])
}

// Subject Customization Settings
export interface SubjectCustomizationConfig {
  subjectId: string;
  customTitleEn?: string;
  customTitleAr?: string;
  customDescEn?: string;
  customDescAr?: string;
  customColor?: string;
  customCoverImage?: string;
  hiddenTabs: string[];            // e.g. ['resources', 'questions']
  tabOrder: string[];              // e.g. ['overview', 'topics', 'lectures', 'questions', 'flashcards']
  featuredModuleId?: string;
}
