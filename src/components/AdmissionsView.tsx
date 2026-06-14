/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, Calendar, Compass, UserCheck, ShieldCheck, Mail, Phone, 
  User, CheckCircle, Clock, AlertCircle, FileSpreadsheet, Loader, Send, GraduationCap 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const dict: Record<string, { en: string; fr: string }> = {
  'hero.badge': {
    en: 'Admissions Hub',
    fr: 'Pôle des Admissions'
  },
  'hero.title': {
    en: 'Apply Online for 2026/2027 Academic Term',
    fr: 'Inscriptions en Ligne pour l\'Année 2026/2027'
  },
  'hero.desc': {
    en: 'Discover standard placements, entry prerequisites, tuition guides, and register below using our secure online application form.',
    fr: 'Découvrez les équivalences de niveau, les critères d\'entrée, les guides d\'encadrement et déposez votre candidature ci-dessous.'
  },
  'sidebar.badge': {
    en: 'Criteria & Placement',
    fr: 'Critères & Placement'
  },
  'sidebar.title': {
    en: 'International Placement Matrix',
    fr: 'Tableau d\'Équivalence Scolaire'
  },
  'sidebar.desc': {
    en: 'Rousseau International maps entry qualifications to British Key Stages, European credits, and Ontario Education requirements. Reference your student\'s age below:',
    fr: 'Rousseau International établit des correspondances rigoureuses entre ses classes, le système britannique (Key Stages, Cambridge) et canadien (OSSD) :'
  },
  'sidebar.thAge': {
    en: 'Age Range',
    fr: 'Tranche d\'âge'
  },
  'sidebar.thUk': {
    en: 'Cambridge Stage',
    fr: 'Cycle Cambridge'
  },
  'sidebar.thCa': {
    en: 'Canadian Equivalent',
    fr: 'Équivalent Canadien'
  },
  'checklist.title': {
    en: 'Required Attachments Checklist',
    fr: 'Pièces Justificatives Requises'
  },
  'checklist.desc': {
    en: 'You may attach these digital files during active application checkout below or submit physically inside our registrar cabinet:',
    fr: 'Vous pouvez joindre ces fichiers numériques ci-dessous ou les soumettre directement lors de votre entretien physique au secrétariat :'
  },
  'checklist.item1': {
    en: 'Copy of Child\'s Passport or Birth Certificate',
    fr: 'Copie du passeport de l\'enfant ou acte de naissance'
  },
  'checklist.item2': {
    en: 'Official academic evaluations/transcripts (Previous 2 terms)',
    fr: 'Bulletins scolaires officiels des 2 derniers trimestres'
  },
  'checklist.item3': {
    en: 'Vaccination/Health Record clearance certificate',
    fr: 'Carnet de vaccination ou certificat médical d\'aptitude'
  },
  'checklist.item4': {
    en: 'Copy of parent\'s national ID or resident permit',
    fr: 'Copie de la CNI ou du permis de séjour du parent tuteur'
  },
  'form.title': {
    en: 'Online Application Intake',
    fr: 'Formulaire d\'Inscription'
  },
  'form.desc': {
    en: 'Provide detailed profiles to launch standard registrar assessment sittings in Cameroon.',
    fr: 'Complétez les champs ci-dessous pour déclencher l\'examen de passage à Douala.'
  },
  'form.parentName': {
    en: 'Parent / Legal Guardian Full Name',
    fr: 'Num de famille & Prénom du Parent / Tuteur'
  },
  'form.parentEmail': {
    en: 'Primary Email Address',
    fr: 'Adresse E-mail Principale'
  },
  'form.parentPhone': {
    en: 'Active Mobile / WhatsApp Phone Number',
    fr: 'Numéro de Téléphone (Mobile & WhatsApp actif)'
  },
  'form.studentName': {
    en: 'Student Full Name',
    fr: 'Nom complet de l\'Élève'
  },
  'form.studentDob': {
    en: 'Student Date of Birth',
    fr: 'Date de Naissance de l\'Élève'
  },
  'form.requestedLevel': {
    en: 'Requested Level Entry Grade',
    fr: 'Classe / Grade Demandé'
  },
  'form.currSchool': {
    en: 'Current Enrolled School Name (if any)',
    fr: 'Établissement actuellement fréquenté (si applicable)'
  },
  'form.track': {
    en: 'Choice of Curriculum Track',
    fr: 'Parcours Académique Envisagé'
  },
  'step.parent': {
    en: 'Parent/Guardian',
    fr: 'Parent/Tuteur'
  },
  'step.student': {
    en: 'Student Profile',
    fr: 'Profil de l\'élève'
  },
  'step.placements': {
    en: 'Placements',
    fr: 'Pièces & Vœux'
  },
  'step.desc1': {
    en: 'Contact details',
    fr: 'Coordonnées tuteur'
  },
  'step.desc2': {
    en: 'Target placement',
    fr: 'Identité de l\'élève'
  },
  'step.desc3': {
    en: 'Sessional records',
    fr: 'Documents joints'
  },
  'form.step1Header': {
    en: 'Step 1: Guardian / Parent Profile',
    fr: 'Étape 1 : Coordonnées du Parent / Tuteur'
  },
  'form.step2Header': {
    en: 'Step 2: Student Applicant Details',
    fr: 'Étape 2 : Informations de l\'Élève'
  },
  'form.step3Header': {
    en: 'Step 3: Document Attachments & Consents',
    fr: 'Étape 3 : Pièces Jointes & Consentement'
  },
  'form.uploadLabel': {
    en: 'Please upload current report cards or transcripts (PDF, PNG preferred)',
    fr: 'Veuillez téléverser vos bulletins scolaires (PDF ou images)'
  },
  'form.birthCertLabel': {
    en: 'Birth Certificate',
    fr: 'Acte de naissance'
  },
  'form.bulletinLabel': {
    en: 'Report Card / Academic Transcript',
    fr: 'Bulletin scolaire ou Relevé de notes'
  },
  'form.medicalCertLabel': {
    en: 'Medical Certificate',
    fr: 'Certificat médical'
  },
  'form.birthCertDrag': {
    en: 'Drag & Drop Birth Certificate here or Browse',
    fr: 'Glissez-déposez l’acte de naissance ici ou Parcourez vos fichiers'
  },
  'form.bulletinDrag': {
    en: 'Drag & Drop Report Card here or Browse',
    fr: 'Glissez-déposez le bulletin ici ou Parcourez vos fichiers'
  },
  'form.medicalCertDrag': {
    en: 'Drag & Drop Medical Certificate here or Browse',
    fr: 'Glissez-déposez le certificat médical ici ou Parcourez vos fichiers'
  },
  'form.uploadDrag': {
    en: 'Drag & Drop report cards here or Browse',
    fr: 'Glissez-déposez vos bulletins ici ou Parcourez vos fichiers'
  },
  'form.uploadLimits': {
    en: 'Supports PDF, PNG and JPEG formats up to 10MB',
    fr: 'Formats acceptés : PDF, PNG, JPEG jusqu\'à 10 Mo'
  },
  'form.consentText': {
    en: 'I hereby certify that all information supplied on this admission intake ticket is authentic, and that the attached academic evaluations represent real records.',
    fr: 'Je certifie sur l\'honneur que toutes les informations fournies dans cette demande sont exactes et authentiques, et que les bulletins importés sont conformes.'
  },
  'form.back': {
    en: 'Back',
    fr: 'Retour'
  },
  'form.next': {
    en: 'Next Step',
    fr: 'Suivant'
  },
  'form.submittingText': {
    en: 'Logging admission record...',
    fr: 'Enregistrement de la candidature...'
  },
  'form.submit': {
    en: 'Submit Admissions Hub ticket',
    fr: 'Soumettre ma demande d\'admission'
  },
  'receipt.badge': {
    en: 'Submitted Success',
    fr: 'Soumission Réussie'
  },
  'receipt.title': {
    en: 'Admissions Request Logged',
    fr: 'Demande d\'Admission Enregistrée d\'Élite'
  },
  'receipt.another': {
    en: 'Submit Another Application',
    fr: 'Soumettre une Nouvelle Demande'
  },
  'receipt.appCode': {
    en: 'Application Code',
    fr: 'Code du dossier'
  },
  'receipt.pRegistrant': {
    en: 'Parent Registrant',
    fr: 'Parent Enregistré'
  },
  'receipt.sName': {
    en: 'Student Name',
    fr: 'Nom de l\'Élève'
  },
  'receipt.track': {
    en: 'Selected Track',
    fr: 'Parcours Sélectionné'
  },
  'receipt.date': {
    en: 'Date Logged',
    fr: 'Date d\'Enregistrement'
  },
  'receipt.status': {
    en: 'Next Status code',
    fr: 'Statut du dossier'
  },
  'receipt.statusDesc': {
    en: 'Awaiting Placement File Check',
    fr: 'En attente d\'examen académique'
  },
  'receipt.nextSteps': {
    en: 'Admissions Officer Next Steps Protocols:',
    fr: 'Prochaines étapes de l\'équipe des admissions :'
  },
  'receipt.step1': {
    en: 'Our admissions officer verifies past transcript alignment with target levels.',
    fr: 'Notre responsable des admissions examine la cohérence des bulletins avec la classe demandée.'
  },
  'receipt.step2': {
    en: 'We trigger a phone and email schedule notification within **48 hours** to book the in-person placement test in Douala.',
    fr: 'Nous vous contactons par téléphone et e-mail sous **48 heures** pour planifier le test de niveau à Douala.'
  },
  'receipt.step3': {
    en: 'Parents receive direct email transcripts regarding outcomes, seat confirmation fees and registration codes.',
    fr: 'Les parents reçoivent un compte-rendu officiel de décision par e-mail, incluant les frais de réservation de place.'
  }
};

const gradeMatrix = [
  { age: "11 - 12 Years", ageFr: "11 - 12 Ans", ukLevel: "Year 7", caLevel: "Secondaire Grade 7", syllabus: "Cambridge Checkpoint Logic" },
  { age: "12 - 13 Years", ageFr: "12 - 13 Ans", ukLevel: "Year 8 / 9", caLevel: "Secondaire Grade 8", syllabus: "Cambridge Checkpoint Science" },
  { age: "14 - 15 Years", ageFr: "14 - 15 Ans", ukLevel: "Year 10 (IGCSE)", caLevel: "Secondaire Grade 9", syllabus: "Cambridge IGCSE Sessional" },
  { age: "15 - 16 Years", ageFr: "15 - 16 Ans", ukLevel: "Year 11 (IGCSE)", caLevel: "Secondaire Grade 10", syllabus: "IGCSE Board Exams" },
  { age: "16 - 17 Years", ageFr: "16 - 17 Ans", ukLevel: "Year 12 (A-Levels / IB)", caLevel: "Grade 11 College Prep", syllabus: "IB Diploma / OSSD Core" },
  { age: "17 - 18 Years", ageFr: "17 - 18 Ans", ukLevel: "Year 13 (A-Levels / IB)", caLevel: "Grade 12 Graduation", syllabus: "Advanced Placement entry" }
];

export default function AdmissionsView() {
  const [form, setForm] = useState({
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    studentName: '',
    studentDob: '',
    requestedLevel: 'Grade 7 (Year 8)',
    currSchool: '',
    progInterest: 'Cambridge'
  });

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedApp, setSubmittedApp] = useState<any | null>(null);
  const [birthCertFile, setBirthCertFile] = useState<File | null>(null);
  const [bulletinFile, setBulletinFile] = useState<File | null>(null);
  const [medicalCertFile, setMedicalCertFile] = useState<File | null>(null);
  const [certifyConsent, setCertifyConsent] = useState(false);
  const { locale } = useLanguage();

  const t = (key: string): string => {
    return dict[key]?.[locale] || dict[key]?.['en'] || key;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleBirthCertChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBirthCertFile(e.target.files[0]);
    }
  };

  const handleBulletinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBulletinFile(e.target.files[0]);
    }
  };

  const handleMedicalCertChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMedicalCertFile(e.target.files[0]);
    }
  };

  const validateStep1 = () => {
    if (!form.parentName.trim()) {
      return locale === 'fr' ? 'Veuillez saisir votre nom complet.' : 'Please specify your full name.';
    }
    if (!form.parentEmail.trim() || !form.parentEmail.includes('@')) {
      return locale === 'fr' ? 'Veuillez saisir une adresse e-mail valide.' : 'Please specify a valid email address.';
    }
    if (!form.parentPhone.trim()) {
      return locale === 'fr' ? 'Veuillez saisir votre numéro de téléphone.' : 'Please specify your telephone coordinates.';
    }
    return null;
  };

  const validateStep2 = () => {
    if (!form.studentName.trim()) {
      return locale === 'fr' ? "Veuillez spécifier le nom complet de l'élève." : "Please specify the applicant's full name.";
    }
    if (!form.studentDob.trim()) {
      return locale === 'fr' ? "Veuillez sélectionner la date de naissance." : "Please select the applicant's date of birth.";
    }
    return null;
  };

  const handleNext = () => {
    setError(null);
    if (step === 1) {
      const err = validateStep1();
      if (err) {
        setError(err);
        return;
      }
      setStep(2);
    } else if (step === 2) {
      const err = validateStep2();
      if (err) {
        setError(err);
        return;
      }
      setStep(3);
    }
  };

  const handleBack = () => {
    setError(null);
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const err1 = validateStep1();
    if (err1) { setStep(1); setError(err1); return; }
    const err2 = validateStep2();
    if (err2) { setStep(2); setError(err2); return; }

    if (!certifyConsent) {
      setError(locale === 'fr' 
        ? "Veuillez cocher la case pour certifier l'authenticité des relevés." 
        : "Please check the box to certify all submitted academic records are accurate."
      );
      return;
    }

    setLoading(true);

    // Call POST application endpoint
    fetch('/api/applications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...form,
        birthCertFile: birthCertFile ? birthCertFile.name : '',
        bulletinFile: bulletinFile ? bulletinFile.name : '',
        medicalCertFile: medicalCertFile ? medicalCertFile.name : ''
      })
    })
      .then(res => {
        if (!res.ok) throw new Error("Could not submit the application.");
        return res.json();
      })
      .then(data => {
        setSubmittedApp(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(locale === 'fr'
          ? "Une erreur réseau est survenue lors de l'envoi. Veuillez réessayer."
          : "A connection error occurred while submitting. Please try again."
        );
        setLoading(false);
      });
  };

  const stepsInfo = [
    { number: 1, title: t('step.parent'), desc: t('step.desc1') },
    { number: 2, title: t('step.student'), desc: t('step.desc2') },
    { number: 3, title: t('step.placements'), desc: t('step.desc3') }
  ];

  return (
    <div id="admissions-view" className="w-full">
      
      {/* ────────────────────────── PAGE BANNER HEADER ────────────────────────── */}
      <section className="bg-[#203864] pt-40 pb-44 px-6 text-center relative overflow-hidden text-white flex flex-col justify-center items-center min-h-[460px]">
        {/* Cinematic Admissions Backdrop */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1600" 
            alt="Elite Student Graduation Heritage" 
            className="w-full h-full object-cover opacity-45 transform scale-105 transition-opacity duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#203864]/65 via-[#12213D]/40 to-[#203864]/80 mix-blend-multiply" />
        </div>

        <div className="max-w-4xl mx-auto space-y-4 relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-1.5 bg-[#FFC000]/20 border border-[#FFC000]/40 px-3.5 py-1 rounded-full backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFC000] animate-pulse" />
            <span className="text-[10px] md:text-xs font-accent font-extrabold tracking-widest text-[#FFC000] uppercase">
              {t('hero.badge')}
            </span>
          </div>
          <h1 className="font-serif font-bold text-3xl md:text-5xl text-white tracking-tight drop-shadow-md">
            {t('hero.title')}
          </h1>
          <div className="w-16 h-1 bg-[#FFC000] mx-auto rounded-full shadow-sm" />
          <p className="text-stone-150 text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-sans drop-shadow-sm font-medium">
            {t('hero.desc')}
          </p>
        </div>

        {/* Cloud effect divider SVG overlapping and covering the bottom of the section */}
        <div className="absolute bottom-0 left-0 right-0 w-full z-20 pointer-events-none transform translate-y-[2px]">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 283.5 27.8" 
            preserveAspectRatio="xMidYMax slice"
            className="w-full h-16 sm:h-24 md:h-32 lg:h-40 xl:h-48 text-white fill-white block"
          >
            <path className="elementor-shape-fill" fill="#ffffff" d="M265.8 3.5c-10.9 0-15.9 6.2-15.9 6.2s-3.6-3.5-9.2-.9c-9.1 4.1-4.4 13.4-4.4 13.4s-1.2.2-1.9.9c-.6.7-.5 1.9-.5 1.9s-1-.5-2.3-.2c-1.3.3-1.6 1.4-1.6 1.4s.4-3.4-1.5-5c-3.9-3.4-8.3-.2-8.3-.2s-.6-.7-.9-.9c-.4-.2-1.2-.2-1.2-.2s-4.4-3.6-11.5-2.6-10.4 7.9-10.4 7.9-.5-3.3-3.9-4.9c-4.8-2.4-7.4 0-7.4 0s2.4-4.1-1.9-6.4-6.2 1.2-6.2 1.2-.9-.5-2.1-.5-2.3 1.1-2.3 1.1.1-.7-1.1-1.1c-1.2-.4-2 0-2 0s3.6-6.8-3.5-8.9c-6-1.8-7.9 2.6-8.4 4-.1-.3-.4-.7-.9-1.1-1-.7-1.3-.5-1.3-.5s1-4-1.7-5.2c-2.7-1.2-4.2 1.1-4.2 1.1s-3.1-1-5.7 1.4-2.1 5.5-2.1 5.5-.9 0-2.1.7-1.4 1.7-1.4 1.7-1.7-1.2-4.3-1.2c-2.6 0-4.5 1.2-4.5 1.2s-.7-1.5-2.8-2.4c-2.1-.9-4 0-4 0s2.6-5.9-4.7-9c-7.3-3.1-12.6 3.3-12.6 3.3s-.9 0-1.9.2c-.9.2-1.5.9-1.5.9S99.4 3 94.9 3.9c-4.5.9-5.7 5.7-5.7 5.7s-2.8-5-12.3-3.9-11.1 6-11.1 6-1.2-1.4-4-.7c-.8.2-1.3.5-1.8.9-.9-2.1-2.7-4.9-6.2-4.4-3.2.4-4 2.2-4 2.2s-.5-.7-1.2-.7h-1.4s-.5-.9-1.7-1.4-2.4 0-2.4 0-2.4-1.2-4.7 0-3.1 4.1-3.1 4.1-1.7-1.4-3.6-.7c-1.9.7-1.9 2.8-1.9 2.8s-.5-.5-1.7-.2c-1.2.2-1.4.7-1.4.7s-.7-2.3-2.8-2.8c-2.1-.5-4.3.2-4.3.2s-1.7-5-11.1-6c-3.8-.4-6.6.2-8.5 1v21.2h283.5V11.1c-.9.2-1.6.4-1.6.4s-5.2-8-16.1-8z" />
          </svg>
        </div>

        {/* Central Circular Prestige Crest overlapping the cloud bottom */}
        <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-30">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center shadow-lg border border-neutral-100 p-1 select-none">
            <div className="w-full h-full rounded-full bg-[#12213D] border border-[#FFC000]/30 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0.5 rounded-full border border-[#FFC000]/20" />
              <GraduationCap className="w-5 h-5 text-[#FFC000]" />
              <span className="text-[8px] font-accent font-extrabold text-white tracking-wider leading-none mt-0.5">RIS</span>
              <span className="text-[4px] text-[#FFC000] tracking-widest leading-none uppercase font-semibold">Douala</span>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────── TWO SECTION: AGE/GRADE MATRIX & ONLINE FORM ────────────────────────── */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Side: Age Matrix and instructions */}
          <div className="lg:col-span-5 space-y-8 text-left">
            
            <div className="space-y-3">
              <span className="text-xs font-accent font-bold tracking-wider text-[#203864] uppercase block">
                {t('sidebar.badge')}
              </span>
              <h3 className="font-serif font-bold text-2xl text-[#203864]">
                {t('sidebar.title')}
              </h3>
              <p className="text-neutral-text text-[13px] leading-relaxed">
                {t('sidebar.desc')}
              </p>
            </div>

            {/* Placement Matrix Table */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)" }}
              className="border border-neutral-border rounded-xl overflow-hidden bg-white transition-all duration-300"
            >
              <table className="w-full text-left text-xs text-neutral-text">
                <thead className="bg-[#203864] text-white font-accent">
                  <tr>
                    <th className="p-3 font-semibold uppercase tracking-wide">{t('sidebar.thAge')}</th>
                    <th className="p-3 font-semibold uppercase tracking-wide">{t('sidebar.thUk')}</th>
                    <th className="p-3 font-semibold uppercase tracking-wide">{t('sidebar.thCa')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-border font-sans">
                  {gradeMatrix.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-neutral-pearl/40'}>
                      <td className="p-3 font-semibold text-[#203864]">
                        {locale === 'fr' ? row.ageFr : row.age}
                      </td>
                      <td className="p-3">{row.ukLevel}</td>
                      <td className="p-3">{locale === 'fr' ? row.caLevel.replace('Secondary', 'Secondaire') : row.caLevel}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            {/* Checklist of admissions papers */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -3, scale: 1.01, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)" }}
              className="bg-[#FAFCFF] p-6 rounded-2xl border border-neutral-border/60 space-y-4 transition-all duration-300"
            >
              <h4 className="font-accent font-bold text-xs text-[#203864] uppercase tracking-wider flex items-center gap-2 border-b border-neutral-border/50 pb-3">
                <FileText className="w-4 h-4 text-[#FFC000]" />
                {t('checklist.title')}
              </h4>
              <p className="text-[11px] text-neutral-secondary">
                {t('checklist.desc')}
              </p>
              <ul className="space-y-2 text-[12px] text-neutral-text">
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{t('checklist.item1')}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{t('checklist.item2')}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{t('checklist.item3')}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{t('checklist.item4')}</span>
                </li>
              </ul>
            </motion.div>

          </div>

          {/* Right Side: The Registration Dynamic Form or Successful Receipt View */}
          <div className="lg:col-span-7">
            
            <AnimatePresence mode="wait">
              {submittedApp ? (
                // Success card Receipt view
                <motion.div 
                  key="success-receipt"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-[#FAFCFF] border-2 border-[#203864]/40 rounded-2xl p-8 text-left space-y-6 shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase font-mono font-bold tracking-wider px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded">
                        {t('receipt.badge')}
                      </span>
                      <h4 className="font-serif font-bold text-xl text-[#203864]">
                        {t('receipt.title')}
                      </h4>
                    </div>
                  </div>

                  <hr className="border-t border-neutral-border" />

                  {/* Summary grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                    <div>
                      <span className="text-neutral-secondary font-semibold uppercase block">{t('receipt.appCode')}</span>
                      <span className="font-mono text-[#203864] font-bold text-[13px]">{submittedApp.id}</span>
                    </div>
                    <div>
                      <span className="text-neutral-secondary font-semibold uppercase block">{t('receipt.pRegistrant')}</span>
                      <span className="text-[#203864] font-bold text-[13px]">{submittedApp.parentName}</span>
                    </div>
                    <div>
                      <span className="text-neutral-secondary font-semibold uppercase block">{t('receipt.sName')}</span>
                      <span className="text-[#203864] font-bold text-[13px]">{submittedApp.studentName}</span>
                    </div>
                    <div>
                      <span className="text-neutral-secondary font-semibold uppercase block">{t('receipt.track')}</span>
                      <span className="text-[#203864] font-bold text-[13px]">{submittedApp.progInterest} Program</span>
                    </div>
                    <div>
                      <span className="text-neutral-secondary font-semibold uppercase block">{t('receipt.date')}</span>
                      <span className="text-[#203864] font-bold text-[13px]">
                        {new Date(submittedApp.dateSubmitted).toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-neutral-secondary font-semibold uppercase block">{t('receipt.status')}</span>
                      <span className="text-[#203864] font-bold tracking-wide uppercase text-[11px] flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#FFC000]" />
                        {t('receipt.statusDesc')}
                      </span>
                    </div>
                  </div>

                  {/* Next milestones roadmap */}
                  <div className="bg-white p-5 rounded-xl border border-neutral-border/70 space-y-4">
                    <h5 className="font-accent font-bold text-xs text-[#203864] uppercase tracking-wider">
                      {t('receipt.nextSteps')}
                    </h5>
                    
                    <div className="space-y-3.5">
                      <div className="flex gap-3">
                        <div className="w-5 h-5 rounded bg-[#203864] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          1
                        </div>
                        <p className="text-[11px] text-neutral-text leading-tight font-medium">
                          {t('receipt.step1')}
                        </p>
                      </div>

                      <div className="flex gap-3">
                        <div className="w-5 h-5 rounded bg-[#203864] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          2
                        </div>
                        <p className="text-[11px] text-neutral-text leading-tight font-medium">
                          {t('receipt.step2')}
                        </p>
                      </div>

                      <div className="flex gap-3">
                        <div className="w-5 h-5 rounded bg-[#203864] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          3
                        </div>
                        <p className="text-[11px] text-neutral-text leading-tight font-bold">
                          {t('receipt.step3')}
                        </p>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      setSubmittedApp(null);
                      setStep(1);
                      setCertifyConsent(false);
                      setBirthCertFile(null);
                      setBulletinFile(null);
                      setMedicalCertFile(null);
                    }}
                    className="w-full bg-[#203864] hover:bg-[#203864]/95 text-white py-3 px-4 rounded-lg font-accent font-bold text-xs uppercase tracking-wide text-center cursor-pointer"
                  >
                    {t('receipt.another')}
                  </button>

                </motion.div>
              ) : (
                // Form View represented as a Stepper Wizard
                <motion.div 
                  key="form-stepper"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white border border-[#E8EEF5] rounded-3xl p-6 md:p-10 text-left shadow-xl space-y-8"
                >
                  <div className="border-b border-neutral-border/60 pb-4">
                    <h3 className="font-serif font-bold text-2xl text-[#203864]">
                      {t('form.title')}
                    </h3>
                    <p className="text-neutral-secondary text-xs mt-1 font-sans">
                      {t('form.desc')}
                    </p>
                  </div>

                  {/* STEPPER PROGRESS INDEX BAR */}
                  <div className="grid grid-cols-3 gap-2 relative border-b border-neutral-100 pb-6">
                    {stepsInfo.map((st) => {
                      const isCurrent = st.number === step;
                      const isCompleted = st.number < step;
                      return (
                        <div 
                          key={st.number} 
                          onClick={() => {
                            if (st.number < step) {
                              setStep(st.number);
                            }
                          }}
                          className={`flex flex-col items-center text-center space-y-1.5 cursor-pointer select-none group`}
                        >
                          {/* Circle badge */}
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-accent font-bold transition-all duration-300 border-2 ${
                            isCurrent 
                              ? 'bg-[#203864] text-[#FFC000] border-[#203864]' 
                              : isCompleted 
                                ? 'bg-emerald-50 text-emerald-600 border-emerald-500' 
                                : 'bg-gray-50 text-gray-400 border-gray-200'
                          }`}>
                            {isCompleted ? "✓" : st.number}
                          </div>
                          <div className="flex flex-col">
                            <span className={`text-[10px] uppercase font-accent tracking-wider font-extrabold transition-colors duration-300 ${
                              isCurrent ? 'text-[#203864]' : 'text-gray-400'
                            }`}>
                              {st.title}
                            </span>
                            <span className="text-[8px] text-gray-400 block hidden md:block">
                              {st.desc}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {error && (
                    <div className="bg-rose-50 border border-status-error/40 text-status-error p-3.5 rounded-lg flex items-start gap-2.5 text-xs">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <AnimatePresence mode="wait">
                      
                      {/* STEP 1: GUARDIAN INFORMATION */}
                      {step === 1 && (
                        <motion.div
                          key="step-1"
                          initial={{ opacity: 0, x: -15 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 15 }}
                          className="space-y-5"
                        >
                          <div className="flex items-center gap-2 border-b border-gray-150 pb-2 mb-4">
                            <div className="w-1.5 h-4 bg-[#FFC000] rounded-sm" />
                            <h4 className="text-xs font-accent font-black text-[#203864] uppercase tracking-wider">
                              {t('form.step1Header')}
                            </h4>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5 text-left">
                              <label className="text-xs font-bold text-[#203864] flex items-center gap-1 justify-start">
                                <User className="w-3.5 h-3.5 text-neutral-secondary" />
                                {t('form.parentName')} <span className="text-[#FFC000]">*</span>
                              </label>
                              <input 
                                type="text"
                                required
                                name="parentName"
                                placeholder="e.g. Marie-Louise Ndip"
                                value={form.parentName}
                                onChange={handleInputChange}
                                className="w-full border border-neutral-border rounded-xl px-3.5 py-3 text-xs md:text-sm focus:border-[#203864] focus:ring-3 focus:ring-[#203864]/5 outline-none font-sans"
                              />
                            </div>

                            <div className="space-y-1.5 text-left">
                              <label className="text-xs font-bold text-[#203864] flex items-center gap-1 justify-start">
                                <Mail className="w-3.5 h-3.5 text-neutral-secondary" />
                                {t('form.parentEmail')} <span className="text-[#FFC000]">*</span>
                              </label>
                              <input 
                                type="email"
                                required
                                name="parentEmail"
                                placeholder="e.g. mlndip@gmail.com"
                                value={form.parentEmail}
                                onChange={handleInputChange}
                                className="w-full border border-neutral-border rounded-xl px-3.5 py-3 text-xs md:text-sm focus:border-[#203864] focus:ring-3 focus:ring-[#203864]/5 outline-none font-sans"
                              />
                            </div>

                            <div className="space-y-1.5 md:col-span-2 text-left">
                              <label className="text-xs font-bold text-[#203864] flex items-center gap-1 justify-start">
                                <Phone className="w-3.5 h-3.5 text-neutral-secondary" />
                                {t('form.parentPhone')} <span className="text-[#FFC000]">*</span>
                              </label>
                              <input 
                                type="tel"
                                required
                                name="parentPhone"
                                placeholder="e.g. +237 699 448 211"
                                value={form.parentPhone}
                                onChange={handleInputChange}
                                className="w-full border border-neutral-border rounded-xl px-3.5 py-3 text-xs md:text-sm focus:border-[#203864] focus:ring-3 focus:ring-[#203864]/5 outline-none font-sans"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* STEP 2: APPLICANT STUDENT INFORMATION */}
                      {step === 2 && (
                        <motion.div
                          key="step-2"
                          initial={{ opacity: 0, x: -15 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 15 }}
                          className="space-y-5"
                        >
                          <div className="flex items-center gap-2 border-b border-gray-150 pb-2 mb-4">
                            <div className="w-1.5 h-4 bg-[#FFC000] rounded-sm" />
                            <h4 className="text-xs font-accent font-black text-[#203864] uppercase tracking-wider">
                              {t('form.step2Header')}
                            </h4>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5 text-left">
                              <label className="text-xs font-bold text-[#203864] block">
                                {t('form.studentName')} <span className="text-[#FFC000]">*</span>
                              </label>
                              <input 
                                type="text"
                                required
                                name="studentName"
                                placeholder="e.g. Brenda Ndip"
                                value={form.studentName}
                                onChange={handleInputChange}
                                className="w-full border border-neutral-border rounded-xl px-3.5 py-3 text-xs md:text-sm focus:border-[#203864] focus:ring-3 focus:ring-[#203864]/5 outline-none font-sans"
                              />
                            </div>

                            <div className="space-y-1.5 text-left">
                              <label className="text-xs font-bold text-[#203864] flex items-center gap-1 justify-start">
                                <Calendar className="w-3.5 h-3.5 text-neutral-secondary" />
                                {t('form.studentDob')} <span className="text-[#FFC000]">*</span>
                              </label>
                              <input 
                                type="date"
                                required
                                name="studentDob"
                                value={form.studentDob}
                                onChange={handleInputChange}
                                className="w-full border border-neutral-border rounded-xl px-3.5 py-3 text-xs focus:border-[#203864] focus:ring-3 focus:ring-[#203864]/5 outline-none font-sans"
                              />
                            </div>

                            <div className="space-y-1.5 text-left">
                              <label className="text-xs font-bold text-[#203864] block">
                                {t('form.requestedLevel')}
                              </label>
                              <select 
                                name="requestedLevel"
                                value={form.requestedLevel}
                                onChange={handleInputChange}
                                className="w-full border border-neutral-border bg-white rounded-xl px-3.5 py-3 text-xs focus:border-[#203864] focus:ring-3 focus:ring-[#203864]/5 outline-none font-sans"
                              >
                                <option>Grade 6 / Year 7</option>
                                <option>Grade 7 / Year 8</option>
                                <option>Grade 8 / Year 9</option>
                                <option>Grade 9 / Year 10 (IGCSE)</option>
                                <option>Grade 10 / Year 11 (IGCSE)</option>
                                <option>Grade 11 / IB Year 1</option>
                                <option>Grade 12 / IB Year 2</option>
                              </select>
                            </div>

                            <div className="space-y-1.5 text-left">
                              <label className="text-xs font-bold text-[#203864] block">
                                {t('form.track')}
                              </label>
                              <select 
                                name="progInterest"
                                value={form.progInterest}
                                onChange={handleInputChange}
                                className="w-full border border-neutral-border bg-white rounded-xl px-3.5 py-3 text-xs focus:border-[#203864] focus:ring-3 focus:ring-[#203864]/5 outline-none font-sans"
                              >
                                <option value="Cambridge">Cambridge International Curriculum</option>
                                <option value="IB">International Baccalaureate (IB)</option>
                                <option value="OSSD">Ontario Secondary School (OSSD)</option>
                                <option value="English">General Tracks / Language Centre</option>
                              </select>
                            </div>

                            <div className="space-y-1.5 md:col-span-2 text-left">
                              <label className="text-xs font-bold text-[#203864] block">
                                {t('form.currSchool')}
                              </label>
                              <input 
                                type="text"
                                name="currSchool"
                                placeholder="e.g. Douala Academy (Cameroon)"
                                value={form.currSchool}
                                onChange={handleInputChange}
                                className="w-full border border-neutral-border rounded-xl px-3.5 py-3 text-xs md:text-sm focus:border-[#203864] focus:ring-3 focus:ring-[#203864]/5 outline-none font-sans"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* STEP 3: DOCUMENT COMPRESSED ATTACHMENTS & CERTIFICATION */}
                      {step === 3 && (
                        <motion.div
                          key="step-3"
                          initial={{ opacity: 0, x: -15 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 15 }}
                          className="space-y-5"
                        >
                          <div className="flex items-center gap-2 border-b border-gray-150 pb-2 mb-4">
                            <div className="w-1.5 h-4 bg-[#FFC000] rounded-sm" />
                            <h4 className="text-xs font-accent font-black text-[#203864] uppercase tracking-wider">
                              {t('form.step3Header')}
                            </h4>
                          </div>

                          <div className="space-y-4 pt-1 text-left">
                            <label className="text-xs font-bold text-[#203864] block">
                              {t('form.uploadLabel')}
                            </label>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {/* 1. Acte de naissance */}
                              <div className="flex flex-col space-y-2">
                                <span className="text-xs font-bold text-neutral-700 font-sans flex items-center gap-1.5">
                                  <FileText className="w-3.5 h-3.5 text-[#203864]" />
                                  {t('form.birthCertLabel')} <span className="text-rose-500 font-normal">*</span>
                                </span>
                                <div className="border border-dashed border-neutral-border hover:border-[#203864]/60 rounded-xl p-4 text-center cursor-pointer transition-all relative bg-neutral-pearl/20 hover:bg-neutral-pearl/35">
                                  <input 
                                    type="file"
                                    accept=".pdf,.png,.jpg,.jpeg"
                                    onChange={handleBirthCertChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                  />
                                  <FileText className="w-5 h-5 text-neutral-secondary mx-auto mb-1.5" />
                                  <span className="text-[11px] font-sans font-semibold text-[#203864] block truncate">
                                    {birthCertFile ? birthCertFile.name : t('form.birthCertDrag')}
                                  </span>
                                  <span className="text-[9px] text-neutral-secondary block mt-0.5">
                                    {t('form.uploadLimits')}
                                  </span>
                                </div>
                              </div>

                              {/* 2. Bulletin */}
                              <div className="flex flex-col space-y-2">
                                <span className="text-xs font-bold text-neutral-700 font-sans flex items-center gap-1.5">
                                  <FileSpreadsheet className="w-3.5 h-3.5 text-[#203864]" />
                                  {t('form.bulletinLabel')} <span className="text-rose-500 font-normal">*</span>
                                </span>
                                <div className="border border-dashed border-neutral-border hover:border-[#203864]/60 rounded-xl p-4 text-center cursor-pointer transition-all relative bg-neutral-pearl/20 hover:bg-neutral-pearl/35">
                                  <input 
                                    type="file"
                                    accept=".pdf,.png,.jpg,.jpeg"
                                    onChange={handleBulletinChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                  />
                                  <FileSpreadsheet className="w-5 h-5 text-neutral-secondary mx-auto mb-1.5" />
                                  <span className="text-[11px] font-sans font-semibold text-[#203864] block truncate">
                                    {bulletinFile ? bulletinFile.name : t('form.bulletinDrag')}
                                  </span>
                                  <span className="text-[9px] text-neutral-secondary block mt-0.5">
                                    {t('form.uploadLimits')}
                                  </span>
                                </div>
                              </div>

                              {/* 3. Certificat médical */}
                              <div className="flex flex-col space-y-2">
                                <span className="text-xs font-bold text-neutral-700 font-sans flex items-center gap-1.5">
                                  <FileText className="w-3.5 h-3.5 text-[#203864]" />
                                  {t('form.medicalCertLabel')} <span className="text-rose-500 font-normal">*</span>
                                </span>
                                <div className="border border-dashed border-neutral-border hover:border-[#203864]/60 rounded-xl p-4 text-center cursor-pointer transition-all relative bg-neutral-pearl/20 hover:bg-neutral-pearl/35">
                                  <input 
                                    type="file"
                                    accept=".pdf,.png,.jpg,.jpeg"
                                    onChange={handleMedicalCertChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                  />
                                  <FileText className="w-5 h-5 text-neutral-secondary mx-auto mb-1.5" />
                                  <span className="text-[11px] font-sans font-semibold text-[#203864] block truncate">
                                    {medicalCertFile ? medicalCertFile.name : t('form.medicalCertDrag')}
                                  </span>
                                  <span className="text-[9px] text-neutral-secondary block mt-0.5">
                                    {t('form.uploadLimits')}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Certification Consent Checkbox */}
                          <div className="p-4 bg-[#FAFCFF] rounded-xl border border-neutral-border/60 text-left flex items-start gap-3">
                            <input 
                              type="checkbox"
                              id="consent-box"
                              checked={certifyConsent}
                              onChange={(e) => setCertifyConsent(e.target.checked)}
                              className="mt-1 w-4 h-4 text-[#203864] rounded focus:ring-2 focus:ring-[#203864]/10 cursor-pointer"
                            />
                            <label htmlFor="consent-box" className="text-[11.5px] text-neutral-text leading-relaxed cursor-pointer font-sans">
                              {t('form.consentText')}
                            </label>
                          </div>
                        </motion.div>
                      )}

                    </AnimatePresence>

                    {/* Navigation Actions Footer Panel */}
                    <div className="flex items-center justify-between pt-6 border-t border-neutral-100">
                      {step > 1 ? (
                        <button
                          type="button"
                          onClick={handleBack}
                          className="bg-gray-100 hover:bg-gray-200 text-[#203864] font-accent font-bold py-3 px-5 rounded-xl text-xs uppercase tracking-wide cursor-pointer transition-colors"
                        >
                          {t('form.back')}
                        </button>
                      ) : (
                        <div />
                      )}

                      {step < 3 ? (
                        <button
                          type="button"
                          onClick={handleNext}
                          className="bg-[#203864] hover:bg-[#203864]/95 text-white font-accent font-bold py-3 px-6 rounded-xl text-xs uppercase tracking-wide cursor-pointer transition-all hover:scale-102 flex items-center gap-1"
                        >
                          {t('form.next')}
                        </button>
                      ) : (
                        <button 
                          type="submit"
                          disabled={loading}
                          className="bg-[#203864] hover:bg-[#203864]/95 disabled:bg-slate-400 text-[#FFC000] font-accent font-black py-3.5 px-8 rounded-xl text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all hover:scale-102"
                        >
                          {loading ? (
                            <>
                              <Loader className="w-4 h-4 animate-spin text-[#FFC000]" />
                              {t('form.submittingText')}
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4 text-[#FFC000]" />
                              {t('form.submit')}
                            </>
                          )}
                        </button>
                      )}
                    </div>

                  </form>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>
      </section>

    </div>
  );
}
