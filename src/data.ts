/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MEDICAL_ASSETS, SubjectItem, LectureItem, QuestionItem, FlashcardItem, AdminUser, PlatformAnnouncement, UIElementConfig, AuditLog } from './types';

export const INITIAL_BRAND_CONFIG = {
  nameEn: "MedStudy Hub",
  nameAr: "ميد ستدي هب",
  taglineEn: "One Workspace. Every Step. Every Specialty.",
  taglineAr: "مساحة واحدة. كل خطوة. كل تخصص.",
  headerSubtitleEn: "Digital Medical University",
  headerSubtitleAr: "جامعة التعليم الطبي الرقمي",
  primaryColor: "#1D4ED8",
  accentColor: "#06B6D4",
  logoText: "M",
  logoIconEmoji: "🏥",
  headerBannerText: "Welcome to the MedStudy Hub Digital University & Clinical Academy",
  headerBannerTextAr: "مرحباً بك في منصة ميد ستدي هب — الأكاديمية الطبية الشاملة",
  footerCopyright: "MedStudy Hub — Built with precision for medical scholars worldwide.",
  footerTagline: "One Workspace. Every Step. Every Specialty.",
  footerNoticeAr: "منظومة التعليم الطبي المستقلة لطلاب الطب والامتياز"
};

export const INITIAL_SUBJECTS: SubjectItem[] = [
  {
    id: "cardiovascular",
    name: "Cardiovascular System",
    group: "systems",
    categoryEn: "Organ Systems",
    categoryAr: "أجهزة الجسم",
    image: MEDICAL_ASSETS.heart,
    desc: "Cardiac hemodynamics, coronary circulation, valvular pathologies, ECG interpretation, and cardiovascular pharmacology.",
    descAr: "ديناميكا الدم القلبية، الدورة الدموية التاجية، أمراض الصمامات، تخطيط القلب وعلم أدوية القلب.",
    progress: 88,
    topicsCount: 16,
    qCount: 540,
    lecturesCount: 22,
    flashcardsCount: 180,
    clinicalCasesCount: 28,
    status: "published",
    modules: [
      {
        id: "cv-m1",
        title: "Hemodynamics & Cardiac Cycle",
        topics: [
          {
            id: "cv-t1",
            title: "Wiggers Diagram & Valvular Mechanics",
            objectives: [
              "Correlate ventricular pressure changes with heart sounds S1 to S4",
              "Analyze pressure-volume loops in aortic stenosis and mitral regurgitation",
              "Understand preload, afterload, and myocardial contractility curves"
            ],
            lecturesCount: 4,
            qCount: 48,
            flashcardsCount: 24
          },
          {
            id: "cv-t2",
            title: "Electrocardiogram (ECG) Foundations",
            objectives: [
              "Axis determination using Limb Leads I and aVF",
              "STEMI territory localizations (Anterior, Inferior, Lateral)",
              "Arrhythmias: AV blocks, Atrial Fibrillation, and Ventricular Tachycardia"
            ],
            lecturesCount: 5,
            qCount: 65,
            flashcardsCount: 30
          }
        ]
      },
      {
        id: "cv-m2",
        title: "Ischemic Heart Disease & Heart Failure",
        topics: [
          {
            id: "cv-t3",
            title: "Atherosclerosis & Acute Coronary Syndromes",
            objectives: [
              "Plaque rupture mechanisms and platelet aggregation cascade",
              "Biomarker kinetics: Troponin I/T vs CK-MB",
              "Antiplatelet, anticoagulation, and reperfusion strategies"
            ],
            lecturesCount: 6,
            qCount: 82,
            flashcardsCount: 40
          }
        ]
      }
    ]
  },
  {
    id: "respiratory",
    name: "Respiratory System",
    group: "systems",
    categoryEn: "Organ Systems",
    categoryAr: "أجهزة الجسم",
    image: MEDICAL_ASSETS.lungs,
    desc: "Pulmonary mechanics, ventilation-perfusion matching, obstructive vs restrictive lung diseases, and arterial blood gas analysis.",
    descAr: "ميكانيكا التنفس، تطابق التهوية والتروية، أمراض الرئة الانسدادية والحاصرة، وغازات الدم الشرياني.",
    progress: 74,
    topicsCount: 14,
    qCount: 420,
    lecturesCount: 18,
    flashcardsCount: 150,
    clinicalCasesCount: 22,
    status: "published",
    modules: [
      {
        id: "resp-m1",
        title: "Pulmonary Mechanics & Gas Exchange",
        topics: [
          {
            id: "resp-t1",
            title: "Spirometry & Lung Volumes",
            objectives: [
              "Differentiate FEV1/FVC ratio in Asthma/COPD vs Idiopathic Pulmonary Fibrosis",
              "Calculate Alveolar Gas Equation and A-a gradient",
              "Assess hypoxic vasoconstriction and dead space ventilation"
            ],
            lecturesCount: 4,
            qCount: 52,
            flashcardsCount: 26
          }
        ]
      }
    ]
  },
  {
    id: "renal",
    name: "Renal System",
    group: "systems",
    categoryEn: "Organ Systems",
    categoryAr: "أجهزة الجسم",
    image: MEDICAL_ASSETS.renal,
    desc: "Glomerular filtration rate, tubular transport, acid-base disorders, nephrotic vs nephritic syndromes, and renal failure.",
    descAr: "معدل الترشيح الكبيبي، النقل النبيبي، اضطرابات الحمض والقاعدة، المتلازمة النفروزية والنفريتية، والفشل الكلوي.",
    progress: 65,
    topicsCount: 12,
    qCount: 390,
    lecturesCount: 16,
    flashcardsCount: 130,
    clinicalCasesCount: 19,
    status: "published",
    modules: [
      {
        id: "renal-m1",
        title: "Glomerular Diseases & Tubulopathies",
        topics: [
          {
            id: "renal-t1",
            title: "Nephrotic vs. Nephritic Syndromes",
            objectives: [
              "Minimal change disease, FSGS, Membranous nephropathy electron microscopy findings",
              "Post-streptococcal glomerulonephritis and IgA nephropathy presentations",
              "Renal handling of potassium, bicarbonate, and loop diuretic actions"
            ],
            lecturesCount: 5,
            qCount: 60,
            flashcardsCount: 28
          }
        ]
      }
    ]
  },
  {
    id: "nervous",
    name: "Nervous System",
    group: "systems",
    categoryEn: "Organ Systems",
    categoryAr: "أجهزة الجسم",
    image: MEDICAL_ASSETS.brain,
    desc: "Neuroanatomy, cerebrovascular accidents, sensory & motor pathways, cranial nerves, demyelinating diseases, and pharmacology.",
    descAr: "التشريح العصبي، السكتات الدماغية، المسارات الحسية والحركية، الأعصاب القحفية، والأمراض المزيلة للميالين.",
    progress: 82,
    topicsCount: 18,
    qCount: 610,
    lecturesCount: 25,
    flashcardsCount: 210,
    clinicalCasesCount: 32,
    status: "published",
    modules: [
      {
        id: "neuro-m1",
        title: "Cerebrovascular Anatomy & Stroke Syndromes",
        topics: [
          {
            id: "neuro-t1",
            title: "Circle of Willis & Stroke Localizations",
            objectives: [
              "MCA vs ACA vs PCA stroke presentation and homonymous hemianopia",
              "Brainstem stroke syndromes: Wallenberg (PICA) vs Weber (PCA)",
              "Intracranial hemorrhages: Epidural, Subdural, Subarachnoid findings on CT"
            ],
            lecturesCount: 6,
            qCount: 75,
            flashcardsCount: 35
          }
        ]
      }
    ]
  },
  {
    id: "gastrointestinal",
    name: "Gastrointestinal System",
    group: "systems",
    categoryEn: "Organ Systems",
    categoryAr: "أجهزة الجسم",
    image: MEDICAL_ASSETS.gi,
    desc: "Digestive physiology, gastric secretion, liver metabolism, cirrhosis complications, IBD vs IBS, and acute abdomen diagnostics.",
    descAr: "فسيولوجيا الهضم، إفرازات المعدة، وظائف الكبد، مضاعفات تشمع الكبد، أمراض الأمعاء الالتهابية، والبطن الحادة.",
    progress: 58,
    topicsCount: 15,
    qCount: 460,
    lecturesCount: 19,
    flashcardsCount: 145,
    clinicalCasesCount: 21,
    status: "published",
    modules: [
      {
        id: "gi-m1",
        title: "Hepatobiliary Pathology & IBD",
        topics: [
          {
            id: "gi-t1",
            title: "Crohn's Disease vs Ulcerative Colitis",
            objectives: [
              "Transmural skip lesions with noncaseating granulomas vs continuous mucosal disease",
              "Extraintestinal manifestations (erythema nodosum, uveitis, pyoderma gangrenosum)",
              "Ascites SAAG ratio and portal hypertension management"
            ],
            lecturesCount: 4,
            qCount: 55,
            flashcardsCount: 25
          }
        ]
      }
    ]
  },
  {
    id: "endocrine",
    name: "Endocrine System",
    group: "systems",
    categoryEn: "Organ Systems",
    categoryAr: "أجهزة الجسم",
    image: MEDICAL_ASSETS.endocrine,
    desc: "Hypothalamic-pituitary axis, thyroid disease, calcium homeostasis, adrenal cortex disorders, and diabetes management.",
    descAr: "المحور الوطائي النخامي، أمراض الغدة الدرقية، توازن الكالسيوم، اضطرابات قشرة الكظر، وعلاج مرض السكري.",
    progress: 80,
    topicsCount: 13,
    qCount: 410,
    lecturesCount: 17,
    flashcardsCount: 160,
    clinicalCasesCount: 24,
    status: "published",
    modules: [
      {
        id: "endo-m1",
        title: "Thyroid & Adrenal Pathology",
        topics: [
          {
            id: "endo-t1",
            title: "Cushing Syndrome & Adrenal Insufficiency",
            objectives: [
              "High-dose vs low-dose dexamethasone suppression test algorithm",
              "Primary (Addison) vs Secondary adrenal crisis",
              "Graves disease pathophysiology and antithyroid medications"
            ],
            lecturesCount: 4,
            qCount: 48,
            flashcardsCount: 26
          }
        ]
      }
    ]
  },
  {
    id: "hematology",
    name: "Hematology & Oncology",
    group: "systems",
    categoryEn: "Organ Systems",
    categoryAr: "أجهزة الجسم",
    image: MEDICAL_ASSETS.hematology,
    desc: "Microcytic, normocytic, and macrocytic anemias, bleeding disorders, leukemias, lymphomas, and transfusion medicine.",
    descAr: "أنواع فقر الدم (الصغير، السوي، والكبير)، اضطرابات التخثر والنزيف، اللوكيميا، الليمفوما، وطب نقل الدم.",
    progress: 70,
    topicsCount: 11,
    qCount: 380,
    lecturesCount: 15,
    flashcardsCount: 140,
    clinicalCasesCount: 20,
    status: "published",
    modules: [
      {
        id: "hem-m1",
        title: "Anemia Diagnostic Workup & Coagulation Cascade",
        topics: [
          {
            id: "hem-t1",
            title: "Microcytic Anemias & Hemoglobinopathies",
            objectives: [
              "Iron deficiency vs Anemia of chronic disease (Ferritin, TIBC, Iron saturation)",
              "Thalassemia trait electrophoretic patterns",
              "Hemophilia A/B vs von Willebrand disease laboratory workup"
            ],
            lecturesCount: 5,
            qCount: 50,
            flashcardsCount: 22
          }
        ]
      }
    ]
  },
  {
    id: "anatomy",
    name: "Human Anatomy",
    group: "basic",
    categoryEn: "Basic Medical Sciences",
    categoryAr: "العلوم الطبية الأساسية",
    image: MEDICAL_ASSETS.skeleton,
    desc: "Topographic anatomy, osteology, muscular compartments, neurovascular bundles, and surgical anatomical triangles.",
    descAr: "التشريح الطوبوغرافي، علم العظام، الحجرات العضلية، الحزم الوعائية العصبية، والمثلثات الجراحية.",
    progress: 62,
    topicsCount: 19,
    qCount: 480,
    lecturesCount: 24,
    flashcardsCount: 220,
    clinicalCasesCount: 18,
    status: "published",
    modules: [
      {
        id: "anat-m1",
        title: "Upper & Lower Limb Innervation",
        topics: [
          {
            id: "anat-t1",
            title: "Brachial Plexus Lesions",
            objectives: [
              "Erb-Duchenne palsy (C5-C6) vs Klumpke palsy (C8-T1)",
              "Radial nerve injury at spiral groove vs wrist drop",
              "Femoral, obturator, and sciatic nerve courses and cutaneous supply"
            ],
            lecturesCount: 5,
            qCount: 58,
            flashcardsCount: 32
          }
        ]
      }
    ]
  },
  {
    id: "histology",
    name: "Histology & Microanatomy",
    group: "basic",
    categoryEn: "Basic Medical Sciences",
    categoryAr: "العلوم الطبية الأساسية",
    image: MEDICAL_ASSETS.histology,
    desc: "Epithelial, connective, muscular, and nervous tissue microarchitecture, specialized stains, and electron microscopic cytology.",
    descAr: "البنية المجهرية للأنسجة الطلائية والضامة والعضلية والعصبية، والصبغات الخاصة والمجهر الإلكتروني.",
    progress: 45,
    topicsCount: 10,
    qCount: 310,
    lecturesCount: 13,
    flashcardsCount: 110,
    clinicalCasesCount: 12,
    status: "published",
    modules: [
      {
        id: "hist-m1",
        title: "Epithelial Classifications & Glandular Tissues",
        topics: [
          {
            id: "hist-t1",
            title: "Mucosal Barriers & Cellular Junctions",
            objectives: [
              "Tight junctions (zonula occludens), desmosomes, and hemidesmosomes",
              "Respiratory pseudostratified ciliated columnar epithelium",
              "Renal podocytes and glomerular basement membrane three layers"
            ],
            lecturesCount: 3,
            qCount: 35,
            flashcardsCount: 18
          }
        ]
      }
    ]
  },
  {
    id: "embryology",
    name: "Embryology & Development",
    group: "basic",
    categoryEn: "Basic Medical Sciences",
    categoryAr: "العلوم الطبية الأساسية",
    image: MEDICAL_ASSETS.embryology,
    desc: "Gastrulation, germ layers, organogenesis, pharyngeal arches, teratogenic windows, and congenital malformations.",
    descAr: "التطور الجنيني، الطبقات الجنينية، تخلق الأعضاء، الأقواس البلعومية، والتشوهات الخلقية وتوقيت المسخات.",
    progress: 40,
    topicsCount: 9,
    qCount: 220,
    lecturesCount: 11,
    flashcardsCount: 95,
    clinicalCasesCount: 14,
    status: "published",
    modules: [
      {
        id: "emb-m1",
        title: "Pharyngeal Apparatus & Heart Development",
        topics: [
          {
            id: "emb-t1",
            title: "Pharyngeal Arches, Pouches, and Clefts",
            objectives: [
              "Derivatives of 1st, 2nd, 3rd, and 4th/6th pharyngeal arches",
              "DiGeorge syndrome (3rd and 4th pouch failure)",
              "Embryological cardiac septation and Tetralogy of Fallot origin"
            ],
            lecturesCount: 4,
            qCount: 38,
            flashcardsCount: 20
          }
        ]
      }
    ]
  },
  {
    id: "pharmacology",
    name: "Pharmacology & Therapeutics",
    group: "basic",
    categoryEn: "Basic Medical Sciences",
    categoryAr: "العلوم الطبية الأساسية",
    image: MEDICAL_ASSETS.pills,
    desc: "Pharmacokinetics, autonomic pharmacology, antimicrobials, cardiovascular drugs, and adverse drug reactions.",
    descAr: "الحركية الدوائية، أدوية الجهاز العصبي الذاتي، مضادات الميكروبات، أدوية القلب والأوعية، والتفاعلات الدوائية الضارة.",
    progress: 68,
    topicsCount: 18,
    qCount: 620,
    lecturesCount: 26,
    flashcardsCount: 230,
    clinicalCasesCount: 30,
    status: "published",
    modules: [
      {
        id: "pharm-m1",
        title: "Autonomic Receptor Agonists & Antagonists",
        topics: [
          {
            id: "pharm-t1",
            title: "Sympathetic vs Parasympathetic Modulators",
            objectives: [
              "Alpha-1, Alpha-2, Beta-1, and Beta-2 second messenger systems (Gq, Gi, Gs)",
              "Anticholinergic toxidrome presentation and antidote (Physostigmine)",
              "Beta-blocker selectivity and intrinsic sympathomimetic activity"
            ],
            lecturesCount: 6,
            qCount: 70,
            flashcardsCount: 36
          }
        ]
      }
    ]
  },
  {
    id: "biochemistry",
    name: "Biochemistry & Genetics",
    group: "basic",
    categoryEn: "Basic Medical Sciences",
    categoryAr: "العلوم الطبية الأساسية",
    image: MEDICAL_ASSETS.dna,
    desc: "Cellular metabolism, Krebs cycle, electron transport chain, amino acid catabolism, inborn errors of metabolism, and genomics.",
    descAr: "التمثيل الغذائي الخلوي، حلقة كريبس، هدم الأحماض الأمينية، الأخطاء الأيضية الوراثية، والجينوم الطبي.",
    progress: 54,
    topicsCount: 14,
    qCount: 390,
    lecturesCount: 17,
    flashcardsCount: 140,
    clinicalCasesCount: 16,
    status: "published",
    modules: [
      {
        id: "biochem-m1",
        title: "Inborn Errors of Metabolism & Vitamin Deficiencies",
        topics: [
          {
            id: "biochem-t1",
            title: "Glycogen Storage Diseases & Urea Cycle Disorders",
            objectives: [
              "Von Gierke (Type I) vs Pompe (Type II) vs McArdle (Type V) diseases",
              "Hyperammonemia and Ornithine transcarbamylase deficiency",
              "Biochemical roles of Thiamine (B1), Niacin (B3), and Cobalamin (B12)"
            ],
            lecturesCount: 5,
            qCount: 54,
            flashcardsCount: 28
          }
        ]
      }
    ]
  },
  {
    id: "immunology",
    name: "Immunology",
    group: "basic",
    categoryEn: "Basic Medical Sciences",
    categoryAr: "العلوم الطبية الأساسية",
    image: MEDICAL_ASSETS.immunology,
    desc: "Innate immunity, MHC class I/II, T and B cell development, hypersensitivity reactions, immunodeficiencies, and vaccines.",
    descAr: "المناعة الفطرية، معقد التوافق النسيجي، تطور الخلايا التائية والبائية، تفاعلات فرط الحساسية، والعوز المناعي.",
    progress: 86,
    topicsCount: 12,
    qCount: 430,
    lecturesCount: 16,
    flashcardsCount: 155,
    clinicalCasesCount: 20,
    status: "published",
    modules: [
      {
        id: "imm-m1",
        title: "Hypersensitivity Types & Primary Immunodeficiencies",
        topics: [
          {
            id: "imm-t1",
            title: "Type I to IV Hypersensitivity Reactions",
            objectives: [
              "IgE mast cell degranulation vs cytotoxic antibody-mediated vs immune complex vs delayed T-cell mediated",
              "X-linked agammaglobulinemia (Bruton) vs SCID pathophysiology",
              "Complement cascade activation: Classical, Lectin, and Alternative pathways"
            ],
            lecturesCount: 4,
            qCount: 62,
            flashcardsCount: 30
          }
        ]
      }
    ]
  },
  {
    id: "microbiology",
    name: "Microbiology & Infectious Diseases",
    group: "basic",
    categoryEn: "Basic Medical Sciences",
    categoryAr: "العلوم الطبية الأساسية",
    image: MEDICAL_ASSETS.microbiology,
    desc: "Gram-positive & gram-negative bacteriology, DNA/RNA virology, systemic mycoses, parasitology, and antibiotic stewardship.",
    descAr: "بكتيريا إيجابية وسلبية الغرام، الفيروسات، الفطريات الجهازية، الطفيليات، والترشيد العلاجي للمضادات الحيوية.",
    progress: 60,
    topicsCount: 15,
    qCount: 510,
    lecturesCount: 22,
    flashcardsCount: 185,
    clinicalCasesCount: 25,
    status: "published",
    modules: [
      {
        id: "micro-m1",
        title: "Bacterial Pathogenesis & Virulence Factors",
        topics: [
          {
            id: "micro-t1",
            title: "Gram-Positive Cocci & Toxin Mediated Diseases",
            objectives: [
              "Staphylococcus aureus (Toxic Shock Syndrome Toxin-1, exfoliative toxin)",
              "Streptococcus pyogenes (M protein, ASOT, post-streptococcal sequelae)",
              "Clostridial neurotoxins: Tetanospasmin vs Botulinum toxin"
            ],
            lecturesCount: 6,
            qCount: 68,
            flashcardsCount: 34
          }
        ]
      }
    ]
  },
  {
    id: "internal-medicine",
    name: "Internal Medicine",
    group: "clinical",
    categoryEn: "Clinical Sciences & Specialties",
    categoryAr: "العلوم الإكلينيكية والتخصصات",
    image: MEDICAL_ASSETS.stethoscope,
    desc: "Diagnostic algorithms, clinical decision rules, emergency resuscitation, ICU management, and outpatient medicine.",
    descAr: "خوارزميات التشخيص، قواعد القرار السريري، الإنعاش الطارئ، العناية المركزة، والطب الباطني العام.",
    progress: 52,
    topicsCount: 26,
    qCount: 980,
    lecturesCount: 36,
    flashcardsCount: 310,
    clinicalCasesCount: 55,
    status: "published",
    modules: [
      {
        id: "im-m1",
        title: "Critical Care Resuscitation & Sepsis Guidelines",
        topics: [
          {
            id: "im-t1",
            title: "Septic Shock & Surviving Sepsis Campaign",
            objectives: [
              "Hour-1 Bundle: Lactate measurement, blood cultures, broad-spectrum antibiotics, IV crystalloid resuscitation",
              "Norepinephrine titration target MAP >= 65 mmHg",
              "Sequential Organ Failure Assessment (qSOFA and SOFA) score components"
            ],
            lecturesCount: 6,
            qCount: 88,
            flashcardsCount: 42
          }
        ]
      }
    ]
  },
  {
    id: "general-surgery",
    name: "General Surgery",
    group: "clinical",
    categoryEn: "Clinical Sciences & Specialties",
    categoryAr: "العلوم الإكلينيكية والتخصصات",
    image: MEDICAL_ASSETS.organs,
    desc: "Preoperative risk assessment, surgical trauma, acute abdomen, wound healing, surgical oncology, and hernia repair.",
    descAr: "تقييم المخاطر قبل الجراحة، صدمات الحوادث، البطن الحادة، التئام الجروح، جراحة الأورام، والفتوق الجدارية.",
    progress: 44,
    topicsCount: 18,
    qCount: 680,
    lecturesCount: 24,
    flashcardsCount: 190,
    clinicalCasesCount: 35,
    status: "published",
    modules: [
      {
        id: "surg-m1",
        title: "Acute Abdomen & Trauma Resuscitation",
        topics: [
          {
            id: "surg-t1",
            title: "Acute Appendicitis, Cholecystitis & Bowel Obstruction",
            objectives: [
              "Alvarado score criteria and indications for emergent laparoscopic appendectomy",
              "Charcot triad and Reynolds pentad in acute cholangitis",
              "Small bowel obstruction vs paralytic ileus radiological findings"
            ],
            lecturesCount: 5,
            qCount: 72,
            flashcardsCount: 30
          }
        ]
      }
    ]
  }
];

export const INITIAL_LECTURES: LectureItem[] = [
  {
    id: "lec-1",
    title: "Cardiovascular Hemodynamics & Wiggers Diagram Masterclass",
    subjectId: "cardiovascular",
    topicId: "cv-t1",
    type: "pdf",
    author: "Prof. Dr. Tariq Al-Mansoor, MD, FACC",
    durationOrPages: "48 Pages · Color Clinical Plates",
    dateAdded: "2026-10-15",
    url: "#",
    status: "published",
    downloadsCount: 1420,
    summary: "Comprehensive breakdown of left ventricular pressure-volume loops, valve opening/closing timings, and pathological systolic vs diastolic murmur acoustic tracings."
  },
  {
    id: "lec-2",
    title: "12-Lead Electrocardiogram: Systematic Vector & Ischemia Analysis",
    subjectId: "cardiovascular",
    topicId: "cv-t2",
    type: "video",
    author: "Dr. Elena Rostova, MD (Cardiology Electrophysiology)",
    durationOrPages: "52 Minutes · High Definition",
    dateAdded: "2026-10-20",
    url: "#",
    status: "published",
    downloadsCount: 2180,
    summary: "Visual step-by-step masterclass analyzing axis deviation, bundle branch blocks (LBBB vs RBBB), Sgarbossa criteria, and STEMI equivalents."
  },
  {
    id: "lec-3",
    title: "Nephrotic vs Nephritic Syndromes: High-Yield Biopsy Correlations",
    subjectId: "renal",
    topicId: "renal-t1",
    type: "pdf",
    author: "Dr. Marcus Vance, Renal Pathology Chair",
    durationOrPages: "36 Pages · Electron Micrographs Included",
    dateAdded: "2026-10-28",
    url: "#",
    status: "published",
    downloadsCount: 960,
    summary: "Light, immunofluorescence, and electron microscopy differential features for Minimal Change Disease, FSGS, Membranous Glomerulopathy, and Post-Streptococcal GN."
  },
  {
    id: "lec-4",
    title: "Respiratory Mechanics, Spirometry & Acid-Base Blood Gas Interpretation",
    subjectId: "respiratory",
    topicId: "resp-t1",
    type: "youtube",
    author: "Prof. Arthur Pendelton, Pulmonology & Critical Care",
    durationOrPages: "44 Minutes · Live Blackboard Simulation",
    dateAdded: "2026-11-02",
    url: "#",
    status: "published",
    downloadsCount: 1840,
    summary: "Intuitive, rapid-fire clinical approach to Winter's formula, delta-delta gap, and distinguishing metabolic acidosis with elevated anion gap."
  },
  {
    id: "lec-5",
    title: "Circle of Willis Anatomy & Stroke Syndromes Localization",
    subjectId: "nervous",
    topicId: "neuro-t1",
    type: "pptx",
    author: "Dr. Samiha Haddad, Neurovascular Surgeon",
    durationOrPages: "62 Slides · 3D Angiography Case Studies",
    dateAdded: "2026-11-05",
    url: "#",
    status: "published",
    downloadsCount: 1530,
    summary: "Detailed anatomical maps connecting vascular occlusion sites with classic neurologic deficits including Wallenberg syndrome, Weber syndrome, and aphasia syndromes."
  }
];

export const INITIAL_QUESTIONS: QuestionItem[] = [
  {
    id: "q-101",
    subjectId: "cardiovascular",
    topicId: "cv-t1",
    difficulty: "High-Yield Hard",
    type: "Clinical Vignette",
    vignette: "A 68-year-old male presents with exertional syncope, dyspnea, and angina. Physical examination reveals a late-peaking systolic ejection murmur heard best at the right second intercostal space that radiates to the carotid arteries. Carotid upstrokes are noticeably delayed and weak (pulsus parvus et tardus). S2 is softly heard and paradoxically split.",
    question: "Which of the following alterations in the left ventricular pressure-volume loop is most characteristically observed in this patient's underlying condition?",
    choices: [
      {
        id: "c1",
        text: "Increased peak systolic pressure with preserved end-diastolic volume in early stages",
        isCorrect: true,
        explanation: "Correct! In severe Aortic Stenosis, the left ventricle must generate significantly elevated systolic pressures to overcome the fixed outflow obstruction, resulting in marked concentric hypertrophy and increased peak LV pressure on the pressure-volume loop."
      },
      {
        id: "c2",
        text: "Rightward displacement of the end-systolic volume point without peak pressure elevation",
        isCorrect: false,
        explanation: "Incorrect. Rightward shift of ESV with low peak pressures is typical of dilated cardiomyopathy or primary systolic dysfunction."
      },
      {
        id: "c3",
        text: "Marked loss of the isovolumetric relaxation phase due to retrograde filling",
        isCorrect: false,
        explanation: "Incorrect. Loss of isovolumetric relaxation and increased stroke volume is characteristic of acute Aortic Regurgitation, not aortic stenosis."
      },
      {
        id: "c4",
        text: "Immediate leftward collapse of the diastolic filling curve due to pericardial restraint",
        isCorrect: false,
        explanation: "Incorrect. This finding corresponds to cardiac tamponade or constrictive pericarditis with impaired ventricular compliance."
      }
    ],
    generalExplanation: "Aortic Stenosis classically presents with the triad of Angina, Syncope, and Dyspnea (A-S-D). The hallmark physical findings are a harsh, late-peaking crescendo-decrescendo systolic murmur at the right upper sternal border radiating to carotids and pulsus parvus et tardus.",
    referenceSource: "Robbins & Cotran Pathologic Basis of Disease 10th Ed, Ch 12; Braunwald's Heart Disease.",
    status: "published"
  },
  {
    id: "q-102",
    subjectId: "renal",
    topicId: "renal-t1",
    difficulty: "Medium",
    type: "Clinical Vignette",
    vignette: "A 4-year-old boy is brought to the pediatric clinic due to generalized puffiness around his eyes each morning and swollen ankles. Urinalysis reveals 4+ proteinuria, no red blood cells or casts. Serum albumin is 2.1 g/dL (normal: 3.5-5.0), and total cholesterol is 320 mg/dL. Renal ultrasound is unremarkable.",
    question: "If an electron microscopic biopsy were to be obtained, which microscopic alteration would most likely be demonstrated?",
    choices: [
      {
        id: "c1",
        text: "Diffuse effacement and flattening of visceral epithelial podocyte foot processes",
        isCorrect: true,
        explanation: "Correct! Minimal Change Disease (MCD) is the most common cause of nephrotic syndrome in young children. Light microscopy appears normal, but electron microscopy invariably shows diffuse effacement of podocyte foot processes."
      },
      {
        id: "c2",
        text: "Subepithelial 'spike and dome' immune complex deposits along the GBM",
        isCorrect: false,
        explanation: "Incorrect. 'Spike and dome' subepithelial deposits are pathognomonic for Membranous Nephropathy, which is more frequent in adults."
      },
      {
        id: "c3",
        text: "Subendothelial 'wire-loop' deposits with mesangial hypercellularity",
        isCorrect: false,
        explanation: "Incorrect. Wire-loop lesions indicate Class IV Diffuse Proliferative Lupus Nephritis (SLE)."
      },
      {
        id: "c4",
        text: "Linear IgG and C3 deposition along the glomerular basement membrane",
        isCorrect: false,
        explanation: "Incorrect. Linear anti-GBM deposition is characteristic of Goodpasture syndrome."
      }
    ],
    generalExplanation: "Minimal Change Disease responds dramatically to corticosteroids (Prednisone) in pediatric patients. It is characterized by selective proteinuria (predominantly albuminuria) due to loss of the negatively charged polyanionic filtration barrier.",
    referenceSource: "Nelson Textbook of Pediatrics 21st Ed; First Aid for the USMLE Step 1 Renal Pathology.",
    status: "published"
  },
  {
    id: "q-103",
    subjectId: "nervous",
    topicId: "neuro-t1",
    difficulty: "High-Yield Hard",
    type: "Clinical Vignette",
    vignette: "A 54-year-old hypertensive female suddenly develops severe vertigo, hoarseness, dysphagia, and difficulty walking. Neurological examination reveals loss of pain and temperature sensation on the left side of the face and the right side of the body. She also has left-sided Horner syndrome (ptosis, miosis, anhidrosis) and left cerebellar ataxia.",
    question: "Occlusion of which arterial vessel is responsible for this clinical presentation?",
    choices: [
      {
        id: "c1",
        text: "Posterior Inferior Cerebellar Artery (PICA)",
        isCorrect: true,
        explanation: "Correct! This is Lateral Medullary (Wallenberg) syndrome, caused by occlusion of the PICA (or vertebral artery). It affects the nucleus ambiguus (dysphagia, hoarseness), spinal trigeminal nucleus (ipsilateral facial pain/temp), spinothalamic tract (contralateral body pain/temp), and descending sympathetics (Horner syndrome)."
      },
      {
        id: "c2",
        text: "Anterior Inferior Cerebellar Artery (AICA)",
        isCorrect: false,
        explanation: "Incorrect. AICA occlusion causes Lateral Pontine syndrome, which famously includes ipsilateral facial droop (CN VII palsy) and sensorineural deafness (CN VIII)."
      },
      {
        id: "c3",
        text: "Paramedian branches of the Basilar Artery",
        isCorrect: false,
        explanation: "Incorrect. Paramedian pontine strokes produce Medial Pontine syndrome with contralateral hemiparesis."
      },
      {
        id: "c4",
        text: "Anterior Spinal Artery (ASA)",
        isCorrect: false,
        explanation: "Incorrect. ASA occlusion at the medulla causes Medial Medullary syndrome with tongue deviation toward the side of the lesion (CN XII)."
      }
    ],
    generalExplanation: "Lateral Medullary Syndrome (Wallenberg syndrome) is classically tested with 'Nucleus Ambiguus = Don't pick AICA!' Remember that hoarseness and swallowing difficulty localize specifically to the nucleus ambiguus in the lateral medulla supplied by PICA.",
    referenceSource: "Harrison's Principles of Internal Medicine 21st Ed; Blumenfeld Neuroanatomy Through Clinical Cases.",
    status: "published"
  }
];

export const INITIAL_FLASHCARDS: FlashcardItem[] = [
  {
    id: "fc-1",
    subjectId: "cardiovascular",
    topicId: "cv-t1",
    front: "What is the hemodynamic mechanism of Pulsus Paradoxus?",
    back: "An abnormally large decrease in systolic blood pressure (>10 mmHg) during inspiration, caused by increased RV filling shifting the interventricular septum leftward in cardiac tamponade or severe asthma.",
    difficulty: "good",
    nextReviewDate: "2026-11-10",
    intervalDays: 2,
    repetitions: 3
  },
  {
    id: "fc-2",
    subjectId: "cardiovascular",
    topicId: "cv-t2",
    front: "Identify the ECG criteria for Left Bundle Branch Block (LBBB).",
    back: "QRS duration >= 120 ms; broad, notched, or slurred R waves in lateral leads (I, aVL, V5, V6); deep S waves in leads V1-V3; absence of Q waves in lateral leads.",
    difficulty: "hard",
    nextReviewDate: "2026-11-09",
    intervalDays: 1,
    repetitions: 1
  },
  {
    id: "fc-3",
    subjectId: "renal",
    topicId: "renal-t1",
    front: "Which complement component is typically depleted in Post-Streptococcal Glomerulonephritis (PSGN)?",
    back: "Serum C3 is profoundly decreased due to activation of the alternative complement pathway, while C4 is usually normal or only mildly depressed.",
    difficulty: "easy",
    nextReviewDate: "2026-11-14",
    intervalDays: 5,
    repetitions: 4
  },
  {
    id: "fc-4",
    subjectId: "nervous",
    topicId: "neuro-t1",
    front: "Which cranial nerve nucleus lesion leads to hoarseness, dysphagia, and loss of the gag reflex?",
    back: "The Nucleus Ambiguus (gives rise to motor fibers of CN IX, CN X, and cranial root of XI). Characteristic of Lateral Medullary (Wallenberg) syndrome.",
    difficulty: "good",
    nextReviewDate: "2026-11-11",
    intervalDays: 3,
    repetitions: 2
  }
];

export const INITIAL_ADMIN_USERS: AdminUser[] = [
  {
    id: "adm-owner-1",
    name: "Dr. Zaid Al-Hashimi (System Owner)",
    email: "owner@medstudyhub.org",
    role: "owner",
    isActive: true,
    lastLogin: "Today, 08:30 AM"
  },
  {
    id: "adm-content-1",
    name: "Nouran Mansoor (General Admin)",
    email: "admin@medstudyhub.org",
    role: "admin",
    isActive: true,
    lastLogin: "Yesterday, 04:15 PM"
  },
  {
    id: "adm-lec-1",
    name: "Dr. Waleed Sabri (Lecture Super Admin)",
    email: "lectures@medstudyhub.org",
    role: "super_admin_lectures",
    isActive: true,
    lastLogin: "Nov 07, 2026"
  },
  {
    id: "adm-qbank-1",
    name: "Dr. Samar Khaled (Question Bank Super Admin)",
    email: "questions@medstudyhub.org",
    role: "super_admin_questions",
    isActive: true,
    lastLogin: "Nov 08, 2026"
  }
];

export const INITIAL_ANNOUNCEMENTS: PlatformAnnouncement[] = [
  {
    id: "ann-1",
    title: "USMLE Step 1 & Clinical Case Vignette Bank Updated",
    titleAr: "تحديث بنك الأسئلة السريرية لاختبارات USMLE Step 1",
    content: "Over 350 multi-step clinical vignettes and histology plate questions have been published with detailed explanations.",
    contentAr: "تمت إضافة أكثر من 350 سؤالاً إكلينيكياً مع مقاطع ننسيجية وشروحات تفصيلية لكافة الخيارات.",
    targetAudience: "students",
    isActive: true,
    date: "2026-11-08",
    badge: "Academic Update"
  },
  {
    id: "ann-2",
    title: "New 3D Anatomical Atlas Plates Added to Lecture Library",
    titleAr: "إضافة أطالس تشريحية ثلاثية الأبعاد بدقة فائقة لمكتبة المحاضرات",
    content: "Cardiovascular and Central Nervous System microanatomy slides are now available for offline download.",
    contentAr: "أصبحت مقاطع التشريح الدقيق للقلب والجهاز العصبي متاحة للتنزيل المباشر بصيغ PDF وPPTX.",
    targetAudience: "all",
    isActive: true,
    date: "2026-11-06",
    badge: "Library Addition"
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: "aud-1",
    timestamp: "2026-11-09 08:15:22",
    actor: "Dr. Zaid Al-Hashimi",
    role: "owner",
    action: "BRAND_IDENTITY_SYNC",
    center: "مركز الهوية والإعدادات العامة",
    target: "System Header & Logo Configuration",
    details: "Synchronized brand colors and medical asset repositories."
  },
  {
    id: "aud-2",
    timestamp: "2026-11-08 17:40:10",
    actor: "Dr. Samar Khaled",
    role: "super_admin_questions",
    action: "QUESTION_BATCH_PUBLISH",
    center: "مركز إدارة بنك الأسئلة",
    target: "Cardiovascular Vignette Bank",
    details: "Imported and validated 24 new clinical vignettes without duplicate collision."
  },
  {
    id: "aud-3",
    timestamp: "2026-11-07 14:22:05",
    actor: "Dr. Waleed Sabri",
    role: "super_admin_lectures",
    action: "LECTURE_UPLOAD_APPROVE",
    center: "مركز إدارة المحاضرات والمكتبة",
    target: "Nephrotic Syndrome High-Yield Slide Deck",
    details: "Uploaded PDF reference with attached electron microscopy annotations."
  }
];

export const INITIAL_UI_ELEMENTS: UIElementConfig[] = [
  {
    id: "hero-section",
    section: "Homepage",
    titleEn: "Study medicine like it was designed for you.",
    titleAr: "ادرس الطب وكأنه صُمّم من أجلك.",
    subtitleEn: "Lectures, question banks, flashcards and progress — organized by subject, system and specialty.",
    subtitleAr: "محاضرات، بنوك أسئلة، بطاقات تعليمية وتتبع للتقدم — منظمة حسب المادة والجهاز والتخصص.",
    isVisible: true,
    order: 1
  },
  {
    id: "university-track-overview",
    section: "Homepage",
    titleEn: "Academic Pathways & University Tracks",
    titleAr: "المسارات الأكاديمية والمسار الجامعي",
    subtitleEn: "Flexible classification covering Basic Medical Sciences, Organ Systems, and Clinical Specialties.",
    subtitleAr: "تصنيف مرن يشمل العلوم الأساسية وأجهزة الجسم والعلوم السريرية.",
    isVisible: true,
    order: 2
  },
  {
    id: "qbank-spotlight",
    section: "Homepage",
    titleEn: "High-Yield Clinical Question Bank",
    titleAr: "بنك الأسئلة السريرية عالية العائد",
    subtitleEn: "Multi-choice vignettes with comprehensive explanations for every distractor.",
    subtitleAr: "أسئلة سريرية متعددة الخيارات مع شرح علمي دقيق لكل إجابة ومشتت.",
    isVisible: true,
    order: 3
  }
];

// ---------------------------------------------------------------------------
// MASTER WEBSITE ELEMENT REGISTRY SEED
// ---------------------------------------------------------------------------
import { RegistryElement, GranularElementPermission, SubjectCustomizationConfig } from './types';

export const INITIAL_ELEMENT_REGISTRY: RegistryElement[] = [
  // 1. NAVBAR ELEMENTS
  {
    id: "nav-brand-title",
    name: "Navbar Platform Name",
    type: "title",
    pageName: "Navbar",
    parentSection: "Header",
    locationPath: "Website → Global Header → Brand Wordmark → Title",
    contentEn: "MedStudy Hub",
    contentAr: "ميد ستدي هب",
    visibility: "visible",
    activation: "enabled",
    publicationStatus: "published",
    displayOrder: 1,
    isSystemCritical: true,
    scope: "global",
    lastModifiedBy: "Prof. Tariq (Owner)",
    lastModifiedDate: "2026-11-09 10:15",
    versions: [
      {
        versionId: "v-nav-1",
        timestamp: "2026-11-01 09:00",
        modifiedBy: "Prof. Tariq (Owner)",
        role: "owner",
        contentEn: "MedStudy Hub",
        contentAr: "ميد ستدي هب",
        visibility: "visible",
        activation: "enabled",
        publicationStatus: "published",
        changeReason: "Initial system registry baseline"
      }
    ]
  },
  {
    id: "nav-brand-subtitle",
    name: "Navbar Subtitle Badge",
    type: "subtitle",
    pageName: "Navbar",
    parentSection: "Header",
    locationPath: "Website → Global Header → Brand Wordmark → Subtitle",
    contentEn: "Digital Medical University",
    contentAr: "جامعة التعليم الطبي الرقمي",
    visibility: "visible",
    activation: "enabled",
    publicationStatus: "published",
    displayOrder: 2,
    scope: "global",
    lastModifiedBy: "Prof. Tariq (Owner)",
    lastModifiedDate: "2026-11-09 10:15",
    versions: []
  },
  {
    id: "nav-link-academy",
    name: "Navbar Academy Tab",
    type: "tab",
    pageName: "Navbar",
    parentSection: "Navigation Links",
    locationPath: "Website → Global Header → Main Nav → Academy Link",
    contentEn: "Academy",
    contentAr: "الأكاديمية",
    targetRoute: "academy",
    visibility: "visible",
    activation: "enabled",
    publicationStatus: "published",
    displayOrder: 3,
    scope: "global",
    lastModifiedBy: "Prof. Tariq (Owner)",
    lastModifiedDate: "2026-11-09 10:15",
    versions: []
  },
  {
    id: "nav-link-qbank",
    name: "Navbar Q-Bank Tab",
    type: "tab",
    pageName: "Navbar",
    parentSection: "Navigation Links",
    locationPath: "Website → Global Header → Main Nav → Q-Bank Link",
    contentEn: "Q-Bank",
    contentAr: "بنك الأسئلة",
    targetRoute: "qbank",
    visibility: "visible",
    activation: "enabled",
    publicationStatus: "published",
    displayOrder: 4,
    scope: "global",
    lastModifiedBy: "Prof. Tariq (Owner)",
    lastModifiedDate: "2026-11-09 10:15",
    versions: []
  },
  {
    id: "nav-link-flashcards",
    name: "Navbar Flashcards Tab",
    type: "tab",
    pageName: "Navbar",
    parentSection: "Navigation Links",
    locationPath: "Website → Global Header → Main Nav → Flashcards Link",
    contentEn: "Flashcards",
    contentAr: "البطاقات",
    targetRoute: "flashcards",
    visibility: "visible",
    activation: "enabled",
    publicationStatus: "published",
    displayOrder: 5,
    scope: "global",
    lastModifiedBy: "Prof. Tariq (Owner)",
    lastModifiedDate: "2026-11-09 10:15",
    versions: []
  },

  // 2. HOMEPAGE HERO ELEMENTS
  {
    id: "home-hero-badge",
    name: "Homepage Hero Kicker Badge",
    type: "badge",
    pageName: "Homepage",
    parentSection: "Hero Section",
    locationPath: "Website → Home Page → Hero Section → Kicker Badge",
    contentEn: "Digital Medical University & Clinical Hub · Year 1 to Residency",
    contentAr: "الأكاديمية الطبية الرقمية المتكاملة · من السنة الأولى حتى سنة الامتياز",
    visibility: "visible",
    activation: "enabled",
    publicationStatus: "published",
    displayOrder: 6,
    scope: "page",
    lastModifiedBy: "Prof. Tariq (Owner)",
    lastModifiedDate: "2026-11-09 10:20",
    versions: []
  },
  {
    id: "home-hero-title",
    name: "Homepage Hero Main Headline",
    type: "title",
    pageName: "Homepage",
    parentSection: "Hero Section",
    locationPath: "Website → Home Page → Hero Section → Main Title",
    contentEn: "Study medicine like it was designed for you.",
    contentAr: "ادرس الطب وكأنه صُمّم من أجلك.",
    visibility: "visible",
    activation: "enabled",
    publicationStatus: "published",
    displayOrder: 7,
    scope: "page",
    lastModifiedBy: "Prof. Tariq (Owner)",
    lastModifiedDate: "2026-11-09 10:20",
    versions: [
      {
        versionId: "v-hero-title-orig",
        timestamp: "2026-11-05 14:00",
        modifiedBy: "Prof. Tariq (Owner)",
        role: "owner",
        contentEn: "One Workspace. Every Step. Every Specialty.",
        contentAr: "مساحة واحدة. كل خطوة. كل تخصص.",
        visibility: "visible",
        activation: "enabled",
        publicationStatus: "published",
        changeReason: "Original platform slogan baseline"
      }
    ]
  },
  {
    id: "home-hero-desc",
    name: "Homepage Hero Description",
    type: "text",
    pageName: "Homepage",
    parentSection: "Hero Section",
    locationPath: "Website → Home Page → Hero Section → Description",
    contentEn: "Lectures, question banks, flashcards and progress — organized by subject, system and specialty.",
    contentAr: "محاضرات، بنوك أسئلة، بطاقات تعليمية وتتبع للتقدم — منظمة حسب المادة والجهاز والتخصص.",
    visibility: "visible",
    activation: "enabled",
    publicationStatus: "published",
    displayOrder: 8,
    scope: "page",
    lastModifiedBy: "Prof. Tariq (Owner)",
    lastModifiedDate: "2026-11-09 10:20",
    versions: []
  },
  {
    id: "home-hero-btn-primary",
    name: "Homepage Primary CTA Button",
    type: "button",
    pageName: "Homepage",
    parentSection: "Hero Section",
    locationPath: "Website → Home Page → Hero Section → Primary Button",
    contentEn: "Explore Medical Academy",
    contentAr: "استكشف المناهج الطبية",
    targetRoute: "academy",
    customColor: "#1D4ED8",
    visibility: "visible",
    activation: "enabled",
    publicationStatus: "published",
    displayOrder: 9,
    scope: "page",
    lastModifiedBy: "Prof. Tariq (Owner)",
    lastModifiedDate: "2026-11-09 10:20",
    versions: []
  },
  {
    id: "home-hero-btn-secondary",
    name: "Homepage Secondary CTA Button",
    type: "button",
    pageName: "Homepage",
    parentSection: "Hero Section",
    locationPath: "Website → Home Page → Hero Section → Secondary Button",
    contentEn: "Launch Clinical Q-Bank",
    contentAr: "ابدأ بنك الأسئلة السريرية",
    targetRoute: "qbank",
    visibility: "visible",
    activation: "enabled",
    publicationStatus: "published",
    displayOrder: 10,
    scope: "page",
    lastModifiedBy: "Prof. Tariq (Owner)",
    lastModifiedDate: "2026-11-09 10:20",
    versions: []
  },

  // 3. SUBJECT WORKSPACE TEMPLATE & INDIVIDUAL OVERRIDES
  {
    id: "subject-workspace-tab-overview",
    name: "Subject Workspace Overview Tab",
    type: "tab",
    pageName: "SubjectWorkspace",
    parentSection: "Subject Navigation Tabs",
    locationPath: "Website → Subject Workspace → Tabs Bar → Overview Tab",
    contentEn: "Overview",
    contentAr: "نظرة عامة",
    visibility: "visible",
    activation: "enabled",
    publicationStatus: "published",
    displayOrder: 11,
    scope: "global",
    lastModifiedBy: "Prof. Tariq (Owner)",
    lastModifiedDate: "2026-11-09 10:25",
    versions: []
  },
  {
    id: "subject-workspace-tab-topics",
    name: "Subject Workspace Topics Tab",
    type: "tab",
    pageName: "SubjectWorkspace",
    parentSection: "Subject Navigation Tabs",
    locationPath: "Website → Subject Workspace → Tabs Bar → Topics Tab",
    contentEn: "Topics & Modules",
    contentAr: "المواضيع والوحدات",
    visibility: "visible",
    activation: "enabled",
    publicationStatus: "published",
    displayOrder: 12,
    scope: "global",
    lastModifiedBy: "Prof. Tariq (Owner)",
    lastModifiedDate: "2026-11-09 10:25",
    versions: []
  },
  {
    id: "subject-workspace-tab-lectures",
    name: "Subject Workspace Lectures Tab",
    type: "tab",
    pageName: "SubjectWorkspace",
    parentSection: "Subject Navigation Tabs",
    locationPath: "Website → Subject Workspace → Tabs Bar → Lectures Tab",
    contentEn: "Lectures & Vault",
    contentAr: "المحاضرات والمراجع",
    visibility: "visible",
    activation: "enabled",
    publicationStatus: "published",
    displayOrder: 13,
    scope: "global",
    lastModifiedBy: "Prof. Tariq (Owner)",
    lastModifiedDate: "2026-11-09 10:25",
    versions: []
  },
  {
    id: "subject-workspace-tab-questions",
    name: "Subject Workspace Questions Tab",
    type: "tab",
    pageName: "SubjectWorkspace",
    parentSection: "Subject Navigation Tabs",
    locationPath: "Website → Subject Workspace → Tabs Bar → Questions Tab",
    contentEn: "Q-Bank Practice",
    contentAr: "تدريب الأسئلة",
    visibility: "visible",
    activation: "enabled",
    publicationStatus: "published",
    displayOrder: 14,
    scope: "global",
    lastModifiedBy: "Prof. Tariq (Owner)",
    lastModifiedDate: "2026-11-09 10:25",
    versions: []
  },
  {
    id: "subject-workspace-tab-flashcards",
    name: "Subject Workspace Flashcards Tab",
    type: "tab",
    pageName: "SubjectWorkspace",
    parentSection: "Subject Navigation Tabs",
    locationPath: "Website → Subject Workspace → Tabs Bar → Flashcards Tab",
    contentEn: "Spaced Flashcards",
    contentAr: "البطاقات التفاعلية",
    visibility: "visible",
    activation: "enabled",
    publicationStatus: "published",
    displayOrder: 15,
    scope: "global",
    lastModifiedBy: "Prof. Tariq (Owner)",
    lastModifiedDate: "2026-11-09 10:25",
    versions: []
  },
  {
    id: "subject-workspace-tab-resources",
    name: "Subject Workspace Resources Tab",
    type: "tab",
    pageName: "SubjectWorkspace",
    parentSection: "Subject Navigation Tabs",
    locationPath: "Website → Subject Workspace → Tabs Bar → Resources Tab",
    contentEn: "Clinical Resources & Atlas",
    contentAr: "المصادر والأطلس السريري",
    visibility: "visible",
    activation: "enabled",
    publicationStatus: "published",
    displayOrder: 16,
    scope: "global",
    lastModifiedBy: "Prof. Tariq (Owner)",
    lastModifiedDate: "2026-11-09 10:25",
    versions: []
  },

  // 4. SPECIFIC SUBJECT OVERRIDES (e.g., Anatomy Page Title & Renal Specifics)
  {
    id: "anatomy-page-title",
    name: "Anatomy Subject Page Title",
    type: "title",
    pageName: "SubjectWorkspace",
    parentSection: "Subject Header",
    locationPath: "Website → University Track → Basic Medical Sciences → Anatomy → Subject Title",
    contentEn: "Gross & Clinical Anatomy",
    contentAr: "علم التشريح السريري العام",
    visibility: "visible",
    activation: "enabled",
    publicationStatus: "published",
    displayOrder: 17,
    scope: "subject",
    subjectId: "anatomy",
    lastModifiedBy: "Prof. Tariq (Owner)",
    lastModifiedDate: "2026-11-09 10:30",
    versions: []
  },
  {
    id: "renal-page-title",
    name: "Renal Physiology Subject Title",
    type: "title",
    pageName: "SubjectWorkspace",
    parentSection: "Subject Header",
    locationPath: "Website → University Track → Organ Systems → Renal System → Subject Title",
    contentEn: "Renal System & Nephrology",
    contentAr: "الجهاز الكلوي وطب الكلى",
    visibility: "visible",
    activation: "enabled",
    publicationStatus: "published",
    displayOrder: 18,
    scope: "subject",
    subjectId: "renal",
    lastModifiedBy: "Prof. Tariq (Owner)",
    lastModifiedDate: "2026-11-09 10:30",
    versions: []
  },
  {
    id: "cardio-page-title",
    name: "Cardiovascular System Header Title",
    type: "title",
    pageName: "SubjectWorkspace",
    parentSection: "Subject Header",
    locationPath: "Website → University Track → Organ Systems → Cardiovascular → Subject Title",
    contentEn: "Cardiovascular System & Hemodynamics",
    contentAr: "الجهاز القلبي الوعائي والديناميكا الدموية",
    visibility: "visible",
    activation: "enabled",
    publicationStatus: "published",
    displayOrder: 19,
    scope: "subject",
    subjectId: "cardiovascular",
    lastModifiedBy: "Prof. Tariq (Owner)",
    lastModifiedDate: "2026-11-09 10:30",
    versions: []
  },

  // 5. FOOTER ELEMENTS
  {
    id: "footer-copyright-text",
    name: "Footer Copyright Notice",
    type: "text",
    pageName: "Footer",
    parentSection: "Footer Zone",
    locationPath: "Website → Global Footer → Legal Line",
    contentEn: "MedStudy Hub — Built with precision for medical scholars worldwide.",
    contentAr: "ميد ستدي هب — صُمم بأعلى درجات الدقة لطلاب الطب والأطباء حول العالم.",
    visibility: "visible",
    activation: "enabled",
    publicationStatus: "published",
    displayOrder: 20,
    scope: "global",
    lastModifiedBy: "Prof. Tariq (Owner)",
    lastModifiedDate: "2026-11-09 10:35",
    versions: []
  },
  {
    id: "footer-tagline-text",
    name: "Footer System Subtitle",
    type: "text",
    pageName: "Footer",
    parentSection: "Footer Zone",
    locationPath: "Website → Global Footer → Tagline Subtitle",
    contentEn: "One Workspace. Every Step. Every Specialty.",
    contentAr: "منظومة التعليم الطبي المستقلة لطلاب الطب والامتياز",
    visibility: "visible",
    activation: "enabled",
    publicationStatus: "published",
    displayOrder: 21,
    scope: "global",
    lastModifiedBy: "Prof. Tariq (Owner)",
    lastModifiedDate: "2026-11-09 10:35",
    versions: []
  }
];

export const INITIAL_GRANULAR_PERMISSIONS: GranularElementPermission[] = [
  // Admin A (Content Admin) - can edit titles, cannot delete or publish without approval
  {
    adminId: "adm-2", // Dr. Sarah (admin)
    elementId: "home-hero-title",
    allowedActions: ["view", "edit", "hide", "show"],
    restrictedFields: ["imageUrl", "targetRoute"]
  },
  {
    adminId: "adm-2",
    elementId: "home-hero-desc",
    allowedActions: ["view", "edit"],
    restrictedFields: []
  },
  // Admin B (Lectures Super Admin) - full control on lectures tab and resources, none on header
  {
    adminId: "adm-3", // Dr. Kareem (super_admin_lectures)
    elementId: "subject-workspace-tab-lectures",
    allowedActions: ["view", "edit", "reorder", "publish"],
    restrictedFields: []
  },
  // Admin C (Questions Super Admin) - full control on questions tab
  {
    adminId: "adm-4", // Dr. Nour (super_admin_questions)
    elementId: "subject-workspace-tab-questions",
    allowedActions: ["view", "edit", "reorder", "publish"],
    restrictedFields: []
  }
];

export const INITIAL_SUBJECT_CUSTOMIZATIONS: Record<string, SubjectCustomizationConfig> = {
  anatomy: {
    subjectId: "anatomy",
    customTitleEn: "Gross & Clinical Anatomy",
    customTitleAr: "علم التشريح السريري العام",
    customDescEn: "Regional dissection, neuroanatomy pathways, and surgical landmarks.",
    customDescAr: "التشريح الناحي، مسارات الجهاز العصبي، والعلامات الجراحية.",
    hiddenTabs: ["resources"], // Specifically hide resources tab in Anatomy only
    tabOrder: ["overview", "topics", "lectures", "questions", "flashcards"]
  },
  biochemistry: {
    subjectId: "biochemistry",
    customTitleEn: "Biochemistry & Medical Genetics",
    customTitleAr: "الكيمياء الحيوية والوراثة الطبية",
    hiddenTabs: [], // All tabs visible in Biochemistry
    tabOrder: ["overview", "topics", "lectures", "resources", "questions", "flashcards"]
  }
};

