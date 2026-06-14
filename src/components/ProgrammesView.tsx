/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, GraduationCap, Globe, ShieldAlert, Check, Coins, Calendar, ArrowRight, Download } from 'lucide-react';
import { ProgramInfo } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { translateProgram } from '../translationHelpers';

interface ProgrammesViewProps {
  programs: ProgramInfo[];
  setTab: (tab: string) => void;
}

const dict: Record<string, { en: string; fr: string }> = {
  'hero.badge': {
    en: 'Academic Systems',
    fr: 'Systèmes Académiques'
  },
  'hero.title': {
    en: 'Curricula of Prestige & Global Postures',
    fr: 'Programmes d\'Exquise Excellence Internationale'
  },
  'hero.desc': {
    en: 'Discover a tailored balance of Cambridge Assessment pathways, IB International Baccalaureate, Canadian High school credits, and elite language facilities.',
    fr: 'Découvrez la synergie parfaite entre les certifications officielles de Cambridge Assessment, le Baccalauréat International (IB), le diplôme canadien (OSSD) et le Centre linguistique.'
  },
  'spotlight.badge': {
    en: 'Active Curriculum Spotlight',
    fr: 'Parcours Académique Sélectionné'
  },
  'highlights.title': {
    en: 'Primary Strategic Highlights & Differentiators',
    fr: 'Points Clés & Avantages Stratégiques'
  },
  'syllabus.title': {
    en: 'Syllabus & Core Educational Strands',
    fr: 'Syllabus & Socles d\'Enseignement'
  },
  'syllabus.desc': {
    en: 'Students progress through distinct stages modeled around structured international credentials benchmarks.',
    fr: 'Les élèves progressent à travers des étapes claires, répondant aux standards officiels mondiaux.'
  },
  'tuition.badge': {
    en: 'Tuition Allocation',
    fr: 'Frais de Scolarité estimatifs'
  },
  'tuition.feesTitle': {
    en: 'Estimated Academic Cost',
    fr: 'Frais Académiques Estimés'
  },
  'tuition.annualRate': {
    en: 'Annual Cost Rate',
    fr: 'Tarif Annuel Global'
  },
  'payment.scheduling': {
    en: 'Flexible Payment Scheduling',
    fr: 'Échéancier de Paiement Flexible'
  },
  'payment.initiation': {
    en: 'File Initiation Fee (Once)',
    fr: 'Frais de Dossier Initial (Unique)'
  },
  'payment.triannual': {
    en: 'Tri-Annual Standard Installment',
    fr: 'Étalement Trimestriel Standard'
  },
  'payment.triannualDesc': {
    en: '3 equal parts (Autumn/Winter/Spring)',
    fr: '3 échéances égales (Automne / Hiver / Printemps)'
  },
  'payment.discount': {
    en: 'Advance Payment Deduction',
    fr: 'Remise pour Paiement Anticipé'
  },
  'payment.discountDesc': {
    en: '-5% on entire settlement before Sept. 15th',
    fr: '-5% sur l\'ensemble si réglé avant le 15 Septembre'
  },
  'scholarship.notice': {
    en: 'Scholarships and sports bursaries programs are accessible up to 25% of annual margins, based on academic credentials.',
    fr: 'Des bourses académiques et sportives allant jusqu\'à 25% peuvent être accordées selon le mérite et le profil.'
  },
  'seats.title': {
    en: 'Secure Seating for 2026 / 2027',
    fr: 'Places Limitées pour 2026 / 2027'
  },
  'seats.desc': {
    en: 'Rousseau holds extremely compact classroom sizes of max 18 children per tutor to guarantee absolute focus. We recommend processing records prior to summer testing gates.',
    fr: 'Rousseau maintient des effectifs réduits (maximum 18 élèves par classe) pour garantir un suivi d\'excellence. Nous recommandons de postuler tôt.'
  },
  'seats.btn': {
    en: 'Launch Admissions Ticket',
    fr: 'Déposer ma Demande de Place'
  }
};

export default function ProgrammesView({ programs, setTab }: ProgrammesViewProps) {
  const [activeProgId, setActiveProgId] = useState('prog_cambridge');
  const { locale } = useLanguage();

  const t = (key: string): string => {
    return dict[key]?.[locale] || dict[key]?.['en'] || key;
  };

  // Translate dynamically loaded programs
  const translatedPrograms = programs.map(p => translateProgram(p, locale));
  const selectedProg = translatedPrograms.find(p => p.id === activeProgId) || translatedPrograms[0];

  // Map courses modules per programs for deep premium academic feeling or their French equivalents
  const getSyllabusModules = (id: string) => {
    if (locale === 'fr') {
      switch (id) {
        case 'prog_cambridge':
          return [
            { level: "Premier Cycle Secondaire (Années 7-9)", modules: ["Français & Anglais Littérature", "Sciences Intégrées & Initiation à la Physique", "Logique & Mathématiques de Base", "Perspectives Mondiales"] },
            { level: "Diplômes Optionnels de l'IGCSE (Années 10-11)", modules: ["Chimie Approfondie & Biologie Moléculaire", "Mathématiques Optionnelles (Algèbre II)", "Certification de Langues British Council", "Informatique & Économie d'Entreprise"] },
            { level: "Classes Finales Advanced Levels (A-Levels / Années 12-13)", modules: ["Mathématiques Pures & Statistiques II", "Physique Quantique & Mécanique Classique", "Analyse Littéraire & Dissertation", "Politique Globale & Fondements de l'Économie"] }
          ];
        case 'prog_ib':
          return [
            { level: "Baccalauréat International Année 1", modules: ["Langue A : Littérature Anglaise HL/SL", "Mathématiques : Analyses HL", "Sciences Fondamentales : Biologie & Chimie HL", "Histoire du Monde Moderne SL"] },
            { level: "Les Piliers Obligatoires du Core", modules: ["Théorie de la Connaissance (TOK)", "Mémoire de Recherche de fin de cycle (4 000 mots)", "Créativité, Action, Service (CAS)"] },
            { level: "Baccalauréat International Année 2", modules: ["Langue B : Maîtrise Orale du Français HL", "Physique Avancée & Chimie Analytique HL", "Économie & Finance Mondiale HL"] }
          ];
        case 'prog_ossd':
          return [
            { level: "Crédits Obligatoires de 10e & 11e Année", modules: ["Principes de Mathématiques (DPM3U)", "Alphabétisation Bilingue Anglaise (ENG3U)", "Introduction aux Études Informatiques (ICS3U)", "Sciences de l'Environnement (SBI3U)"] },
            { level: "Crédits de Pré-Accréditation de 12e Année", modules: ["Fonctions Avancées & Trigonométrie (MHF4U)", "Calcul & Vecteurs (MCV4U)", "Préparation Universitaire d'Anglais (ENG4U)", "Leadership & Finance Commerciale (BOH4M)"] }
          ];
        default:
          return [
            { level: "Anglais IELTS Académique", modules: ["Rédaction Académique & Structure de Synthèse", "Examens Blancs Cronométrés d'Écoute & Lecture", "Coaching Éloquence & Expression Orale"] },
            { level: "Sessions TOEFL / TOEIC", modules: ["Gestion du stress & Grilles de Réponses ETS", "Correction Dynamique d'Erreurs de Syntaxe", "Analyse Pratique d'Enregistrements Professionnels"] }
          ];
      }
    }

    switch (id) {
      case 'prog_cambridge':
        return [
          { level: "Lower Secondary (Years 7-9)", modules: ["Cambridge Lower English & Literature", "Integrated Science & Introductory Physics", "Secondary Logic & Core Mathematics", "Global Perspectives & History"] },
          { level: "IGCSE Optionals (Years 10-11)", modules: ["Extended Chemistry & Advanced Biology", "Additional Mathematics / Algebra II", "Bilingual French & Language Certs", "Computer Science & Business Economics"] },
          { level: "Advanced Levels (A-Levels / Years 12-13)", modules: ["Pure Mathematics & Statistics II", "Advanced Quantum Physics & Mechanics", "Analytical Literature & Composition", "Global Politics & Economics Theory"] }
        ];
      case 'prog_ib':
        return [
          { level: "IB Diploma Year 1 (Higher & Standard)", modules: ["Language A: English Literature HL/SL", "Mathematics: Analysis & Approaches HL", "Sciences: Biology & Chemistry HL", "History of the Modern World SL"] },
          { level: "IB Core Pillars (Compulsory)", modules: ["Theory of Knowledge (TOK) Seminar", "Extended Essay (4,000 words thesis)", "Creativity, Activity, Service (CAS) Logs"] },
          { level: "IB Diploma Year 2 (Higher & Standard)", modules: ["Language B: French Fluency HL", "Sciences: Advanced Physics HL", "Global Economics & Finance HL"] }
        ];
      case 'prog_ossd':
        return [
          { level: "Grade 10 & 11 Core Credits", modules: ["Principles of Mathematics (DPM3U)", "Bilingual English Literacy (ENG3U)", "Introduction to Computer Studies (ICS3U)", "Environmental Sciences Studies (SBI3U)"] },
          { level: "Grade 12 Advanced Entry Credits", modules: ["Advanced Functions & Trigonometry (MHF4U)", "Calculus and Vectors (MCV4U)", "English University Preparation (ENG4U)", "Business Leadership & Finance (BOH4M)"] }
        ];
      default:
        return [
          { level: "IELTS Standard Core", modules: ["Academic Writing & Structure Review", "Listening & Reading Mock Sprints", "Oral Fluency & Standard Posture Prep"] },
          { level: "TOEFL / TOEIC Sittings", modules: ["Electronic Essay Timing Strategies", "Grammatical Error Patterns Reviews", "Listening under Stress Protocols"] }
        ];
    }
  };

  const getProgramIcon = (id: string) => {
    switch (id) {
      case 'prog_cambridge':
        return <GraduationCap className="w-5 h-5" />;
      case 'prog_ib':
        return <BookOpen className="w-5 h-5" />;
      case 'prog_ossd':
        return <Globe className="w-5 h-5" />;
      default:
        return <Coins className="w-5 h-5" />;
    }
  };

  const getProgramImage = (id: string) => {
    switch (id) {
      case 'prog_cambridge': return 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600';
      case 'prog_ib': return 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600';
      case 'prog_ossd': return 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600';
      default: return 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600';
    }
  };

  const activeModules = getSyllabusModules(activeProgId);

  return (
    <div id="programmes-view" className="w-full">
      
      {/* ────────────────────────── PAGE BANNER HEADER ────────────────────────── */}
      <section className="bg-[#203864] pt-40 pb-44 px-6 text-center relative overflow-hidden text-white flex flex-col justify-center items-center min-h-[460px]">
        {/* Cinematic Academic Backdrop */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600" 
            alt="Advanced Global Academics" 
            className="w-full h-full object-cover opacity-35 transform scale-105 transition-opacity duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#203864]/75 via-[#12213D]/55 to-[#203864]/90 mix-blend-multiply" />
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

      {/* ────────────────────────── HORIZONTAL TAB SELECTOR (IMAGE CARDS) ────────────────────────── */}
      <section className="bg-neutral-50/50 border-b border-neutral-border py-8 px-4 z-30 shadow-sm relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {translatedPrograms.map((prog) => {
            if (!prog.active) return null;
            const isActive = prog.id === activeProgId;
            return (
              <button
                key={prog.id}
                onClick={() => setActiveProgId(prog.id)}
                className={`relative group overflow-hidden rounded-2xl text-left cursor-pointer transition-all duration-300 flex flex-col h-40 md:h-48 border-2 ${
                  isActive 
                    ? 'border-[#203864] shadow-lg shadow-[#203864]/20 scale-[1.02]' 
                    : 'border-transparent shadow-md hover:shadow-xl hover:-translate-y-1'
                }`}
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src={getProgramImage(prog.id)} 
                    alt={prog.title} 
                    className={`w-full h-full object-cover transition-transform duration-700 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} 
                  />
                  <div className={`absolute inset-0 transition-colors duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-t from-[#203864]/95 via-[#203864]/80 to-[#203864]/40' 
                      : 'bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-[#203864]/90'
                  }`} />
                </div>
                
                {/* Content */}
                <div className="relative z-10 p-4 md:p-5 flex flex-col h-full justify-end">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 transition-colors duration-300 shadow-sm ${
                    isActive ? 'bg-[#FFC000] text-[#203864]' : 'bg-white/20 text-white backdrop-blur-md group-hover:bg-[#FFC000] group-hover:text-[#203864]'
                  }`}>
                    {getProgramIcon(prog.id)}
                  </div>
                  <span className={`font-sans font-bold text-sm md:text-base leading-tight transition-colors duration-300 drop-shadow-md ${
                    isActive ? 'text-[#FFC000]' : 'text-white'
                  }`}>
                    {prog.title}
                  </span>
                </div>
                
                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full bg-[#FFC000] animate-pulse shadow-[0_0_8px_rgba(255,192,0,0.8)]" />
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* ────────────────────────── PROGRAM DETAIL VIEW ────────────────────────── */}
      <section className="bg-white py-16 px-4">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeProgId}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12"
          >
            
            {/* Left Column: Descriptions and highlights */}
            <div className="lg:col-span-7 space-y-8 text-left">
              
              <div className="space-y-4">
                <span className="text-xs font-bold tracking-widest text-[#203864] uppercase font-accent">
                  {t('spotlight.badge')}
                </span>
                <h2 className="font-serif font-bold text-2xl md:text-3.5xl text-[#203864] tracking-tight">
                  {selectedProg.title}
                </h2>
                <p className="text-neutral-text text-sm md:text-base leading-relaxed">
                  {selectedProg.desc}
                </p>
              </div>

              {/* Highlights Block */}
              <div className="bg-neutral-pearl/60 border border-neutral-border/60 p-6 rounded-2xl space-y-4">
                <h4 className="font-sans font-medium text-[#203864] text-xs tracking-wider uppercase flex items-center gap-2 border-b border-neutral-border/50 pb-3">
                  <Check className="w-4 h-4 text-[#FFC000] stroke-[3]" />
                  {t('highlights.title')}
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedProg.highlights.map((hl, k) => (
                    <li key={k} className="flex items-start gap-2.5 text-xs text-neutral-text leading-normal">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#203864] mt-1.5 shrink-0" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Syllabi modules list */}
              <div className="space-y-4 pt-4">
                <h3 className="font-sans font-bold text-lg text-[#203864] font-serif">
                  {t('syllabus.title')}
                </h3>
                <p className="text-neutral-secondary text-xs">
                  {t('syllabus.desc')}
                </p>

                <div className="space-y-4">
                  {activeModules.map((levelBlock, index) => (
                    <motion.div 
                      key={index} 
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      whileHover={{ y: -3, scale: 1.01, borderColor: "rgba(32,56,100,0.3)", backgroundColor: "rgba(250,251,253,0.8)" }}
                      className="border border-neutral-border/60 rounded-xl p-5 transition-all duration-200 bg-white shadow-sm"
                    >
                      <h4 className="font-sans font-bold text-xs text-[#203864] uppercase tracking-wide mb-3">
                        {levelBlock.level}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {levelBlock.modules.map((m, key) => (
                          <div key={key} className="flex items-center gap-2 text-[12px] text-neutral-text">
                            <div className="w-1.5 h-1.5 rounded bg-[#FFC000] shrink-0" />
                            <span>{m}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Fees, tuition modeling & Apply box */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* The Tuition & Financial Structure Box */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(18,21,39,0.3)" }}
                className="bg-[#203864] text-white rounded-2xl p-6 border border-white/10 shadow-xl space-y-6 relative overflow-hidden transition-all duration-300 text-left"
              >
                <div className="absolute right-0 bottom-0 w-24 h-24 bg-white/5 rounded-full blur-xl pointer-events-none" />
                
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-[#FFC000] tracking-wider uppercase block font-accent">
                    {t('tuition.badge')}
                  </span>
                  <h3 className="font-serif font-bold text-lg text-white">{t('tuition.feesTitle')}</h3>
                </div>

                <div className="bg-white/5 border border-white/8 rounded-xl p-5 flex items-center justify-between">
                  <div>
                    <span className="text-stone-350 text-[10px] uppercase font-sans tracking-wide block">{t('tuition.annualRate')}</span>
                    <span className="font-serif text-2xl font-bold text-[#FFC000]">{selectedProg.tuitionFee}</span>
                  </div>
                  <Coins className="w-8 h-8 text-[#FFC000] opacity-80" />
                </div>

                {/* Installment modeling */}
                <div className="space-y-3.5 pt-2">
                  <h4 className="text-xs font-semibold text-[#FFC000] uppercase tracking-wider font-accent">{t('payment.scheduling')}</h4>
                  
                  <div className="space-y-2 text-xs font-sans">
                    <div className="flex justify-between border-b border-white/10 pb-1.5 text-stone-200">
                      <span>{t('payment.initiation')}</span>
                      <span className="font-semibold text-white">150 000 FCFA</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-1.5 text-stone-200">
                      <span>{t('payment.triannual')}</span>
                      <span className="font-semibold text-white">{t('payment.triannualDesc')}</span>
                    </div>
                    <div className="flex justify-between pb-1 text-stone-200">
                      <span>{t('payment.discount')}</span>
                      <span className="font-semibold text-emerald-400">{t('payment.discountDesc')}</span>
                    </div>
                  </div>
                </div>

                {/* Secure warning tag */}
                <div className="flex items-start gap-2.5 bg-white/5 border border-white/10 p-3 rounded-lg text-[11px] text-stone-350 leading-normal font-sans">
                  <ShieldAlert className="w-4 h-4 text-[#FFC000] shrink-0 mt-0.5" />
                  <span>{t('scholarship.notice')}</span>
                </div>

              </motion.div>

              {/* Application solicitation panel */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ y: -4, scale: 1.01, boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05)" }}
                className="border border-neutral-border/75 bg-neutral-pearl/40 p-6 rounded-2xl text-left space-y-4 transition-all duration-300 bg-white"
              >
                <h4 className="font-serif font-bold text-sm text-[#203864] uppercase">
                  {t('seats.title')}
                </h4>
                <p className="text-neutral-text text-[12px] leading-relaxed font-sans">
                  {t('seats.desc')}
                </p>
                <button 
                  onClick={() => setTab('admissions')}
                  className="w-full bg-[#203864] hover:bg-[#203864]/95 text-white py-3 px-4 rounded-lg font-bold text-xs tracking-wide uppercase flex items-center justify-center gap-2 shadow-sm cursor-pointer font-accent text-[#FFC000]"
                >
                  {t('seats.btn')}
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </motion.div>

            </div>

          </motion.div>
        </AnimatePresence>
      </section>

    </div>
  );
}
