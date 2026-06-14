/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Award, BookOpen, Globe, CheckCircle, ArrowRight, Video, Star, 
  MapPin, ShieldCheck, GraduationCap, Users, CalendarDays, 
  Quote, ChevronDown, ChevronLeft, ChevronRight, Info, Trophy, Zap
} from 'lucide-react';
import { Testimonial, ProgramInfo } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { translateProgram, translateTestimonial } from '../translationHelpers';
import slide1 from "../../assets/ecole2.jpg";

const homeDict: Record<string, { en: string; fr: string }> = {
  'home.whyTitle': { en: 'Why Choose RIS', fr: 'Pourquoi Choisir RIS' },
  'home.whySub': { en: 'An Academic Institution Beyond All Local Equivalents', fr: 'Une Institution Académique Exceptionnelle' },
  'home.whyDesc': { 
    en: "We understand that electing a school dictates your child's global career. Our pillars are sculpted to bridge Double Degree curricula with direct entrance opportunities.", 
    fr: "Nous comprenons que le choix d'une école dicte la carrière de votre enfant. Nos piliers académiques sont conçus pour associer des double diplômes à d'immenses opportunités." 
  },
  'home.why1Title': { en: 'Dual Prestige Curricula', fr: 'Fusion de Curricula de Prestige' },
  'home.why1Desc': { en: "Seamlessly blending the world's standard Cambridge Progression with the holistically revered IB Diploma and direct Ontario High School (Canada) options.", fr: "Fusionner de manière fluide la progression officielle Cambridge avec le Baccalauréat International (IB) et l'OSSD canadien." },
  'home.why2Title': { en: 'Official IELTS / TOEFL Center', fr: "Centre d'Examens IELTS & TOEFL" },
  'home.why2Desc': { en: "As a designated British Council and ETS hub in Douala, our students pass high-stakes certification assessments right on campus with native-curated mock training.", fr: "En tant que centre agréé British Council et ETS à Douala, nos élèves valident leurs certifications sur notre campus sécurisé." },
  'home.why3Title': { en: 'Advanced Academic Credits', fr: 'Équivalences Universitaires' },
  'home.why3Desc': { en: "Our curriculum yields up to a full year of advanced standings at McGill, York, or Toronto, greatly lowering foreign study cost overheads.", fr: "Nos diplômés bénéficient de crédits d'équivalence universitaire de transfert dans de grandes facultés comme McGill, Toronto ou York." },
  'home.why4Title': { en: 'Direct University Pipeline', fr: "Parcours et Admissions Directs" },
  'home.why4Desc': { en: "Our bespoke guidance office assists 100% of seniors with college matching, visa files, structural portfolio reviews, and personal statement refinement.", fr: "Notre bureau d'orientation spécialisé accompagne 100 % des élèves dans le placement, le montage des visas et les dossiers universitaires." },
  'home.why5Title': { en: 'Elite Certified Educators', fr: "Enseignants Certifiés d'Élite" },
  'home.why5Desc': { en: "Instructors hold top graduate degrees from institutions in France, the UK, and Cameroon, coupled with ongoing professional development milestones inside Cambridge Assessment.", fr: "Nos enseignants sont titulaires de diplômes de France, du Royaume-Uni et du Cameroun, complétés par des formations certifiées Cambridge." },
  'home.why6Title': { en: 'Secure Elite Campus', fr: "Campus Résidentiel Privé Sécurisé" },
  'home.why6Desc': { en: "Nestled in Bonanjo's premium sector, featuring safe robotic workshop bays, dynamic research suites, and high-speed fiber throughout.", fr: "Idéalement niché au quartier d'affaires de Bonanjo, doté d'infrastructures de pointe et d'ateliers de robotique modernes." },
  'home.progTitle': { en: 'Featured Education Highs', fr: 'Programmes d’Excellence' },
  'home.progSub': { en: 'Four Interwoven Pillars of Academic Distinction', fr: 'Quatre Piliers de Distinction Universitaire' },
  'home.progDesc': { en: 'Differentiated and strictly credentialed programs built to develop intellectual, bilingual, and critical postures.', fr: 'Des parcours pédagogiques rigoureusement accrédités pour forger des chefs de file bilingues.' },
  'home.annualFee': { en: 'Typical Annual Fee', fr: 'Frais d’études annuels' },
  'home.exploreSyllabi': { en: 'Explore Syllabi', fr: 'Explorer les Programmes' },
  'home.admTitle': { en: 'Admission Pathway', fr: 'Voie d’Admission' },
  'home.admSub': { en: 'Your 4-Step Entrance Journey', fr: 'Votre Candidature en 4 Étapes' },
  'home.admDesc': { en: 'We operate an inclusive but strictly verified entrance system. Apply online and clear scheduling elements within index status codes.', fr: 'Nous appliquons des critères clairs d’admissibilité. Déposez votre candidature en ligne pour planifier vos évaluations.' },
  'home.step1Title': { en: '1. Online Application File', fr: '1. Inscription en Ligne' },
  'home.step1Desc': { en: 'Fill out candidate bio sheets and submit school transcripts on our secure portal.', fr: 'Renseignez l’état civil de l’élève et partagez l’historique de ses bulletins sur notre portail sécurisé.' },
  'home.step2Title': { en: '2. Placement Assessments', fr: '2. Évaluation de Niveau' },
  'home.step2Desc': { en: 'Schedule specialized math and bilingual proficiency diagnostics (on-site or digital).', fr: 'Passez des tests de positionnement en mathématiques et aptitudes bilingues (sur place ou visioconférence).' },
  'home.step3Title': { en: '3. Academic Review Board', fr: '3. Comité d’Admissibilité' },
  'home.step3Desc': { en: 'The admissions division evaluates scores, portfolio designs, and recommendations.', fr: 'Notre bureau académique examine les bilans, les bulletins de notes et les recommandations adaptées.' },
  'home.step4Title': { en: '4. Intake Acceptance', fr: '4. Confirmation Finale' },
  'home.step4Desc': { en: 'Successful parents secure student seating with dynamic tuition down-payments.', fr: 'Les familles retenues valident l’attribution de la place et finalisent les modalités scolaires.' },
  'home.testTitle': { en: 'Academic Verdicts', fr: 'Témoignages Familiaux' },
  'home.testSub': { en: 'What Our Global Families Reflect', fr: 'Les Expériences de nos Familles' },
  'home.testDesc': { en: 'Explore genuine experiences of parents, Ivy League freshmen, and expatriate business minds.', fr: 'Découvrez les commentaires de parents d’élèves, d’anciens bacheliers et de résidents diplomatiques.' },
  'home.statLabs': { en: 'Fluency Languages', fr: 'Langues d’Enseignement' },
  'home.statAcc': { en: 'Cambridge Support', fr: 'Voie Cambridge' },
  'home.statTracks': { en: 'Global Tracks', fr: 'Filières Internationales' },
  'home.experienceRousseau': { en: 'Experience Rousseau', fr: 'Découvrir Rousseau' },
  'home.discover': { en: 'Discover', fr: 'Découvrir' },
  'home.officialRecog': { en: 'Official Global Recognition & Testing Licences:', fr: 'Agréments et licences officiels :' }
};

interface HomeViewProps {
  setTab: (tab: string) => void;
  testimonials: Testimonial[];
  programs: ProgramInfo[];
}

// Custom simple hook for count-up animations
function useCountUp(target: number, durationMs: number = 1000, trigger: boolean = true) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const end = target;
    if (start === end) return;

    const totalMiliseconds = durationMs;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 15);
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        clearInterval(timer);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target, durationMs, trigger]);

  return count;
}

export default function HomeView({ setTab, testimonials, programs }: HomeViewProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isHoveredStat, setIsHoveredStat] = useState<number | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const { locale, t: tGlobal } = useLanguage();

  const t = (key: string) => {
    if (homeDict[key]) {
      return homeDict[key][locale];
    }
    return tGlobal(key);
  };

  const slides = locale === 'fr' ? [
    {
      image: {slide1},
      surtitre: "EXCELLENCE SANS FRONTIÈRES",
      title: "Former les Esprits Mondiaux pour les Horizons de Demain",
      subtitle: "Programmes britanniques et canadiens accrédités et faculté prestigieuse de l'IB",
      quote: "Votre enfant mérite une éducation sans frontières, ancrée en toute sécurité à Douala."
    },
    {
      image: {slide1},
      surtitre: "ADMISSION UNIVERSITAIRE D'ÉLITE",
      title: "Parcours sur Mesure vers l'International",
      subtitle: "Jusqu'à une année complète d'équivalence universitaire avancée à McGill, Toronto et York",
      quote: "Valoriser l'excellence des élèves grâce à une préparation officielle et performante à l'IELTS, au TOEFL et au SAT."
    },
    {
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600",
      surtitre: "DIPLÔMES PÉDAGOGIQUES DYNAMIQUES",
      title: "Quand l'Éthique Académique rencontre les Sciences Modernes",
      subtitle: "Laboratoires interactifs de robotique, d'informatique intégrée et de ressources multimédia",
      quote: "Des cursus d'apprentissage pensés pour former de brillants analystes et décideurs."
    },
    {
      image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=1600",
      surtitre: "CAMPUS SÉCURISÉ DE BONANJO",
      title: "Conseil en Orientation et Partenariats Internationaux",
      subtitle: "Accompagnement de 100 % des diplômés dans la préparation de dossiers scolaires et de visas d'études",
      quote: "L'enseignement pré-universitaire de premier ordre, niché au cœur du pôle administratif de Douala."
    }
  ] : [
    {
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1600",
      surtitre: "EXCELLENCE SANS FRONTIÈRES",
      title: "Educating Global Minds for Tomorrow's Horizons",
      subtitle: "Accredited British-Canadian Programs & Prestigious IB World Faculty",
      quote: "Your child deserves an education without borders, nestled securely in Douala."
    },
    {
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1600",
      surtitre: "ELITE UNIVERSITY INTAKE",
      title: "Bespoke Pathways to Ivy League & G5",
      subtitle: "Up to a full year of advanced college standings across McGill, Toronto and York",
      quote: "Empowering student excellence with official, high-scoring IELTS, TOEFL, & SAT sessional prep."
    },
    {
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600",
      surtitre: "DYNAMIC PEDAGOGICAL DEGREES",
      title: "Where Academic Ethics Meet Modern Sciences",
      subtitle: "Equipped with interactive robotic labs, computing hubs, and digital research bays",
      quote: "Double Degree curricula designed for modern, analytical future world deciders."
    },
    {
      image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=1600",
      surtitre: "SECURE BONANJO CAMPUS",
      title: "Direct Counselling & High-Stakes Placements",
      subtitle: "Assisting 100% of sessional graduates through portfolio design, matching & visa protocols",
      quote: "Pre-eminent high school prestige nestled inside the safe diplomatic center of Douala."
    }
  ];

  const translatedPrograms = programs.map(p => translateProgram(p, locale));
  const translatedTestimonials = testimonials.map(t => translateTestimonial(t, locale));

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Stats numbers for count up
  const countLanguages = useCountUp(3, 800);
  const countAccredited = useCountUp(100, 1200);
  const countCurricula = useCountUp(2, 800);

  // Select home-featured testimonials
  const featuredTestimonials = testimonials.filter(t => t.active && t.featured);
  
  // Custom grids style for programs
  const getProgramStyles = (id: string) => {
    switch (id) {
      case 'prog_cambridge':
        return {
          iconBg: 'bg-blue-100 text-[#203864]',
          badgeBg: 'bg-blue-50 text-[#203864] border-blue-200',
          badgeText: 'International Track',
          hoverBorder: 'hover:border-[#203864]',
          imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600'
        };
      case 'prog_ib':
        return {
          iconBg: 'bg-emerald-100 text-emerald-700',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          badgeText: 'Prestige IB Diploma',
          hoverBorder: 'hover:border-emerald-500',
          imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600'
        };
      case 'prog_ossd':
        return {
          iconBg: 'bg-amber-100 text-amber-700',
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
          badgeText: 'Canadian High School',
          hoverBorder: 'hover:border-amber-500',
          imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600'
        };
      default:
        return {
          iconBg: 'bg-purple-100 text-purple-700',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          badgeText: 'Authorized Center',
          hoverBorder: 'hover:border-purple-500',
          imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600'
        };
    }
  };

  return (
    <div id="home-view" className="w-full">
      
      {/* ────────────────────────── HERO SECTION ────────────────────────── */}
      <section 
        id="hero"
        className="relative bg-[#203864] min-h-screen flex flex-col justify-center items-center pt-24 pb-16 px-6 overflow-hidden text-center text-white"
      >
        {/* Automatic Slider Backdrops */}
        {slides.map((slide, idx) => {
          const isActive = idx === activeSlide;
          return (
            <div
              key={idx}
              className={`absolute inset-0 z-0 transition-all duration-[2000ms] ease-out pointer-events-none ${
                isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
              }`}
            >
              <img
                src={slide.image}
                alt=""
                className="w-full h-full object-cover text-transparent pointer-events-none"
                referrerPolicy="no-referrer"
              />
            </div>
          );
        })}

        {/* Master Sophisticated Gradient Overlay (Deep Navy/Slate to subtle lateral gold filters) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#203864]/75 via-[#12213D]/45 to-[#203864]/75 z-1 pointer-events-none" />
        
        {/* Subtle geometric dot matrix accent layer */}
        <div 
          className="absolute inset-0 opacity-[0.03] z-1 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, white 1.5px, transparent 1.5px)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Slider Controls Bar (Manual selector points in Gold and White) */}
        <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`w-2.5 transition-all duration-500 rounded-full h-2.5 cursor-pointer ${
                idx === activeSlide 
                  ? 'bg-[#FFC000] scale-125 h-8 border border-[#FFC000]' 
                  : 'bg-white/40 hover:bg-white'
              }`}
              title={`Switch to Slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Main Content Layout */}
        <div className="w-full max-w-5xl mx-auto px-4 relative z-10 space-y-8 flex flex-col items-center">
          
          {/* Subtle Accent Surtitre (Montserrat Style with large letter spacing) */}
          <div className="overflow-hidden">
            <motion.span 
              key={`surtitre-${activeSlide}`}
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 0.95 }}
              transition={{ duration: 0.7 }}
              className="font-accent font-extrabold text-[#FFC000] tracking-[0.25em] text-[11px] md:text-xs uppercase block"
            >
              {slides[activeSlide].surtitre}
            </motion.span>
          </div>

          {/* Premium Playfair Grand Display Heading */}
          <div className="max-w-4xl">
            <motion.h1 
              key={`title-${activeSlide}`}
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif font-bold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.12]"
            >
              {slides[activeSlide].title}
            </motion.h1>
          </div>

          {/* Soft Description Text (Inter) */}
          <div className="max-w-2xl">
            <motion.p 
              key={`subtitle-${activeSlide}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-sans text-stone-200 text-sm sm:text-base md:text-lg leading-relaxed"
            >
              {slides[activeSlide].subtitle}
            </motion.p>
          </div>

          {/* Golden Elegant Italic Quote */}
          <div className="overflow-hidden max-w-xl">
            <motion.p 
              key={`quote-${activeSlide}`}
              initial={{ x: -15, opacity: 0 }}
              animate={{ x: 0, opacity: 0.9 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="font-serif italic text-xs md:text-sm text-[#FFC000]/90 tracking-wide border-l-2 border-[#FFC000]/60 pl-4 py-1"
            >
              "{slides[activeSlide].quote}"
            </motion.p>
          </div>

          {/* Micro Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3 w-full sm:w-auto"
          >
            <button 
              onClick={() => setTab('admissions')}
              className="w-full sm:w-auto bg-[#FFC000] hover:bg-[#FFC000]/90 text-[#203864] font-accent font-extrabold text-[12px] uppercase tracking-wider py-4 px-8 rounded-full shadow-lg hover:shadow-[#FFC000]/15 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              {t('btn.applyIntake') || 'Apply Online Intake'}
              <ArrowRight className="w-4 h-4 text-[#203864]" />
            </button>
            
            <button 
              onClick={() => setIsVideoOpen(true)}
              className="w-full sm:w-auto border border-white/30 hover:border-white text-white font-accent font-semibold text-[12px] uppercase tracking-wider py-4 px-8 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-250 cursor-pointer flex items-center justify-center gap-2"
            >
              <Video className="w-4 h-4 text-[#FFC000]" />
              {t('home.experienceRousseau')}
            </button>
          </motion.div>

          {/* Inline Academic Statistics Counter */}
          <div className="w-full max-w-4xl border-t border-white/10 pt-8 mt-12 grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <div className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight flex items-center justify-center">
                <span className="text-[#FFC000] mr-0.5">0</span>
                {countLanguages}
              </div>
              <div className="text-[9px] md:text-[10px] text-stone-350 tracking-widest uppercase font-accent font-semibold">
                {t('home.statLabs')}
              </div>
            </div>

            <div className="space-y-1 border-x border-white/10">
              <div className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight flex items-center justify-center">
                {countAccredited}%
              </div>
              <div className="text-[9px] md:text-[10px] text-stone-350 tracking-widest uppercase font-accent font-semibold">
                {t('home.statAcc')}
              </div>
            </div>

            <div className="space-y-1">
              <div className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight flex items-center justify-center">
                <span className="text-brand-sky mr-0.5">0</span>
                {countCurricula}
              </div>
              <div className="text-[9px] md:text-[10px] text-stone-350 tracking-widest uppercase font-accent font-semibold">
                {t('home.statTracks')}
              </div>
            </div>
          </div>

        </div>

        {/* Bouncing Chevron down indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce cursor-pointer flex flex-col items-center">
          <span className="text-[9px] font-accent text-white/50 uppercase tracking-widest block mb-1">{t('home.discover')}</span>
          <ChevronDown className="w-5 h-5 text-[#FFC000]" />
        </div>
      </section>

      {/* ────────────────────────── ACCREDITATIONS BAND ────────────────────────── */}
      <section id="accreditations" className="bg-white py-12 px-4 border-b border-neutral-border/60">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-10"
          >
            <div className="text-xs md:text-sm font-bold tracking-[0.2em] text-brand-navy uppercase flex items-center gap-4 text-center">
              <div className="hidden sm:block h-px w-12 lg:w-24 bg-gradient-to-r from-transparent to-brand-gold/70"></div>
              <span className="flex items-center gap-2">
                <Award className="w-5 h-5 text-brand-gold" />
                {t('home.officialRecog')}
              </span>
              <div className="hidden sm:block h-px w-12 lg:w-24 bg-gradient-to-l from-transparent to-brand-gold/70"></div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 w-full">
              <motion.div 
                whileHover={{ y: -5, scale: 1.02, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)" }} 
                className="bg-neutral-pearl/40 border border-neutral-border/60 p-5 rounded-2xl flex flex-col items-center justify-center text-center gap-4 transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-sm border border-neutral-border/50">
                  <Info className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-[13px] font-bold text-brand-navy leading-snug">British Council Accredited</span>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5, scale: 1.02, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)" }} 
                className="bg-blue-50/40 border border-blue-100 p-5 rounded-2xl flex flex-col items-center justify-center text-center gap-4 transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-sm border border-blue-100">
                  <GraduationCap className="w-6 h-6 text-[#203864]" />
                </div>
                <span className="text-[13px] font-bold text-[#203864] leading-snug">Cambridge CAIE Center ID</span>
              </motion.div>

              <motion.div 
                whileHover={{ y: -5, scale: 1.02, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)" }} 
                className="bg-emerald-50/40 border border-emerald-100 p-5 rounded-2xl flex flex-col items-center justify-center text-center gap-4 transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-sm border border-emerald-100">
                  <Trophy className="w-6 h-6 text-emerald-600" />
                </div>
                <span className="text-[13px] font-bold text-emerald-700 leading-snug">International Baccalaureate (IB)</span>
              </motion.div>

              <motion.div 
                whileHover={{ y: -5, scale: 1.02, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)" }} 
                className="bg-amber-50/40 border border-amber-100 p-5 rounded-2xl flex flex-col items-center justify-center text-center gap-4 transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-sm border border-amber-100">
                  <Globe className="w-6 h-6 text-amber-600" />
                </div>
                <span className="text-[13px] font-bold text-amber-700 leading-snug">Licensed Ontario OSSD Path</span>
              </motion.div>

              <motion.div 
                whileHover={{ y: -5, scale: 1.02, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)" }} 
                className="bg-orange-50/30 border border-orange-100/60 p-5 rounded-2xl flex flex-col items-center justify-center text-center gap-4 transition-all col-span-2 md:col-span-1 lg:col-span-1 mx-auto w-full max-w-[280px] lg:max-w-none"
              >
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-sm border border-orange-100">
                  <Zap className="w-6 h-6 text-[#FFC000]" />
                </div>
                <span className="text-[13px] font-bold text-brand-navy leading-snug">Certified TOEFL & IELTS Center</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ────────────────────────── WHY RIS SECTION ────────────────────────── */}
      <section id="why-ris" className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
          
          {/* Section tag and header */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-85px" }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-3 max-w-3xl mx-auto"
          >
            <span className="text-[11px] font-bold tracking-widest text-brand-royal uppercase block">
              {t('home.whyTitle')}
            </span>
            <h2 className="font-sans font-bold text-3xl md:text-4xl text-brand-navy tracking-tight">
              {t('home.whySub')}
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto rounded" />
            <p className="text-neutral-text text-sm md:text-base leading-relaxed">
              {t('home.whyDesc')}
            </p>
          </motion.div>

          {/* Value props Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.05 }}
              whileHover={{ y: -6, scale: 1.015, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.06), 0 10px 10px -5px rgba(0,0,0,0.04)" }}
              className="bg-neutral-pearl/50 border border-neutral-border/60 p-5 rounded-2xl hover:bg-white transition-all duration-300 text-left group flex flex-col"
            >
              <div className="relative h-48 w-full mb-5 rounded-xl overflow-hidden shadow-sm bg-neutral-200">
                <img 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600" 
                  alt="" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute top-3 left-3 w-10 h-10 bg-white/95 backdrop-blur-md rounded-lg shadow-md flex items-center justify-center text-brand-royal z-10">
                  <Globe className="w-5 h-5" />
                </div>
              </div>
              <h3 className="font-sans font-bold text-lg text-brand-navy mb-2">{t('home.why1Title')}</h3>
              <p className="text-neutral-text text-[13px] leading-relaxed flex-grow">
                {t('home.why1Desc')}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -6, scale: 1.015, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.06), 0 10px 10px -5px rgba(0,0,0,0.04)" }}
              className="bg-neutral-pearl/50 border border-neutral-border/60 p-5 rounded-2xl hover:bg-white transition-all duration-300 text-left group flex flex-col"
            >
              <div className="relative h-48 w-full mb-5 rounded-xl overflow-hidden shadow-sm bg-neutral-200">
                <img 
                  src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600" 
                  alt="" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute top-3 left-3 w-10 h-10 bg-white/95 backdrop-blur-md rounded-lg shadow-md flex items-center justify-center text-brand-gold z-10">
                  <CheckCircle className="w-5 h-5" />
                </div>
              </div>
              <h3 className="font-sans font-bold text-lg text-brand-navy mb-2">{t('home.why2Title')}</h3>
              <p className="text-neutral-text text-[13px] leading-relaxed flex-grow">
                {t('home.why2Desc')}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.15 }}
              whileHover={{ y: -6, scale: 1.015, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.06), 0 10px 10px -5px rgba(0,0,0,0.04)" }}
              className="bg-neutral-pearl/50 border border-neutral-border/60 p-5 rounded-2xl hover:bg-white transition-all duration-300 text-left group flex flex-col"
            >
              <div className="relative h-48 w-full mb-5 rounded-xl overflow-hidden shadow-sm bg-neutral-200">
                <img 
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600" 
                  alt="" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute top-3 left-3 w-10 h-10 bg-white/95 backdrop-blur-md rounded-lg shadow-md flex items-center justify-center text-emerald-600 z-10">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>
              <h3 className="font-sans font-bold text-lg text-brand-navy mb-2">{t('home.why3Title')}</h3>
              <p className="text-neutral-text text-[13px] leading-relaxed flex-grow">
                {t('home.why3Desc')}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -6, scale: 1.015, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.06), 0 10px 10px -5px rgba(0,0,0,0.04)" }}
              className="bg-neutral-pearl/50 border border-neutral-border/60 p-5 rounded-2xl hover:bg-white transition-all duration-300 text-left group flex flex-col"
            >
              <div className="relative h-48 w-full mb-5 rounded-xl overflow-hidden shadow-sm bg-neutral-200">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600" 
                  alt="" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute top-3 left-3 w-10 h-10 bg-white/95 backdrop-blur-md rounded-lg shadow-md flex items-center justify-center text-amber-600 z-10">
                  <GraduationCap className="w-5 h-5" />
                </div>
              </div>
              <h3 className="font-sans font-bold text-lg text-brand-navy mb-2">{t('home.why4Title')}</h3>
              <p className="text-neutral-text text-[13px] leading-relaxed flex-grow">
                {t('home.why4Desc')}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.25 }}
              whileHover={{ y: -6, scale: 1.015, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.06), 0 10px 10px -5px rgba(0,0,0,0.04)" }}
              className="bg-neutral-pearl/50 border border-neutral-border/60 p-5 rounded-2xl hover:bg-white transition-all duration-300 text-left group flex flex-col"
            >
              <div className="relative h-48 w-full mb-5 rounded-xl overflow-hidden shadow-sm bg-neutral-200">
                <img 
                  src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=600" 
                  alt="" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute top-3 left-3 w-10 h-10 bg-white/95 backdrop-blur-md rounded-lg shadow-md flex items-center justify-center text-purple-600 z-10">
                  <Users className="w-5 h-5" />
                </div>
              </div>
              <h3 className="font-sans font-bold text-lg text-brand-navy mb-2">{t('home.why5Title')}</h3>
              <p className="text-neutral-text text-[13px] leading-relaxed flex-grow">
                {t('home.why5Desc')}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -6, scale: 1.015, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.06), 0 10px 10px -5px rgba(0,0,0,0.04)" }}
              className="bg-neutral-pearl/50 border border-neutral-border/60 p-5 rounded-2xl hover:bg-white transition-all duration-300 text-left group flex flex-col"
            >
              <div className="relative h-48 w-full mb-5 rounded-xl overflow-hidden shadow-sm bg-neutral-200">
                <img 
                  src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=600" 
                  alt="" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute top-3 left-3 w-10 h-10 bg-white/95 backdrop-blur-md rounded-lg shadow-md flex items-center justify-center text-rose-600 z-10">
                  <CalendarDays className="w-5 h-5" />
                </div>
              </div>
              <h3 className="font-sans font-bold text-lg text-brand-navy mb-2">{t('home.why6Title')}</h3>
              <p className="text-neutral-text text-[13px] leading-relaxed flex-grow">
                {t('home.why6Desc')}
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ────────────────────────── MAIN PROGRAMMES ────────────────────────── */}
      <section id="programmes-spot" className="bg-neutral-pearl py-20 px-4">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-85px" }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-3 max-w-3xl mx-auto"
          >
            <span className="text-[11px] font-bold tracking-widest text-brand-royal uppercase block">
              {t('home.progTitle')}
            </span>
            <h2 className="font-sans font-bold text-3xl md:text-4xl text-brand-navy tracking-tight">
              {t('home.progSub')}
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto rounded" />
            <p className="text-neutral-text text-sm md:text-base leading-relaxed">
              {t('home.progDesc')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {translatedPrograms.map((prog, idx) => {
              const styles = getProgramStyles(prog.id);
              if (!prog.active) return null;
              return (
                <motion.div 
                  key={prog.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  whileHover={{ y: -6, scale: 1.015, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.06)" }}
                  className={`bg-white border border-neutral-border/75 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:border-l-4 ${styles.hoverBorder} flex flex-col justify-between group`}
                >
                  <div className="space-y-4">
                    <div className="relative h-48 w-full rounded-xl overflow-hidden shadow-sm bg-neutral-200 mb-2">
                      <img 
                        src={styles.imageUrl} 
                        alt={prog.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                      <div className={`absolute top-3 left-3 w-10 h-10 rounded-lg shadow-md flex items-center justify-center ${styles.iconBg}`}>
                        <BookOpen className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border ${styles.badgeBg}`}>
                        {styles.badgeText}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-sans font-bold text-xl text-brand-navy">{prog.title}</h3>
                      <p className="text-neutral-text text-[13px] leading-relaxed">{prog.desc}</p>
                    </div>

                    <ul className="space-y-2 pt-2">
                      {prog.highlights.slice(0, 3).map((hl, k) => (
                        <li key={k} className="flex items-start gap-2 text-xs text-neutral-text">
                          <CheckCircle className="w-3.5 h-3.5 text-brand-royal mt-0.5 shrink-0" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-gray-100 mt-6 pt-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-neutral-secondary font-semibold block uppercase">{t('home.annualFee')}</span>
                      <span className="font-sans font-bold text-emerald-700 text-sm">{prog.tuitionFee}</span>
                    </div>
                    <button 
                      onClick={() => setTab('programmes')}
                      className="text-xs text-brand-royal hover:text-brand-navy font-bold flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      {t('home.exploreSyllabi')}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ────────────────────────── PROCESSUS ADMISSION Walkthrough ────────────────────────── */}
      <section id="admissions-spot" className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-85px" }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-3 max-w-3xl mx-auto"
          >
            <span className="text-[11px] font-bold tracking-widest text-brand-royal uppercase block">
              {t('home.admTitle')}
            </span>
            <h2 className="font-sans font-bold text-3xl md:text-4xl text-brand-navy tracking-tight">
              {t('home.admSub')}
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto rounded" />
            <p className="text-neutral-text text-sm md:text-base leading-relaxed">
              {t('home.admDesc')}
            </p>
          </motion.div>

          <div className="relative pt-8">
            
            {/* Horizontal Line connector on desktop */}
            <div className="absolute top-[84px] left-12 right-12 h-1 bg-neutral-border z-0 hidden lg:block rounded-full" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              
              <motion.div 
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.05 }}
                whileHover={{ y: -4, scale: 1.015 }}
                className="bg-white text-center rounded-xl p-5 border border-neutral-border lg:border-none relative transition-all duration-300"
              >
                <div className="w-14 h-14 bg-brand-navy text-white font-sans font-bold rounded-full flex items-center justify-center text-lg mx-auto mb-4 border-4 border-brand-champagne relative z-10 shadow-lg">
                  1
                </div>
                <h3 className="font-sans font-bold text-base text-brand-navy mb-1.5">{t('home.step1Title')}</h3>
                <p className="text-neutral-text text-[12px] leading-relaxed">
                  {t('home.step1Desc')}
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ y: -4, scale: 1.015 }}
                className="bg-white text-center rounded-xl p-5 border border-neutral-border lg:border-none relative transition-all duration-300"
              >
                <div className="w-14 h-14 bg-brand-royal text-white font-sans font-bold rounded-full flex items-center justify-center text-lg mx-auto mb-4 border-4 border-slate-100 relative z-10 shadow-lg">
                  2
                </div>
                <h3 className="font-sans font-bold text-base text-brand-navy mb-1.5">{t('home.step2Title')}</h3>
                <p className="text-neutral-text text-[12px] leading-relaxed">
                  {t('home.step2Desc')}
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.15 }}
                whileHover={{ y: -4, scale: 1.015 }}
                className="bg-white text-center rounded-xl p-5 border border-neutral-border lg:border-none relative transition-all duration-300"
              >
                <div className="w-14 h-14 bg-brand-sky text-white font-sans font-bold rounded-full flex items-center justify-center text-lg mx-auto mb-4 border-4 border-slate-100 relative z-10 shadow-lg">
                  3
                </div>
                <h3 className="font-sans font-bold text-base text-brand-navy mb-1.5">{t('home.step3Title')}</h3>
                <p className="text-neutral-text text-[12px] leading-relaxed">
                  {t('home.step3Desc')}
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -4, scale: 1.015 }}
                className="bg-white text-center rounded-xl p-5 border border-neutral-border lg:border-none relative transition-all duration-300"
              >
                <div className="w-14 h-14 bg-brand-gold text-white font-sans font-bold rounded-full flex items-center justify-center text-lg mx-auto mb-4 border-4 border-brand-champagne relative z-10 shadow-lg">
                  4
                </div>
                <h3 className="font-sans font-bold text-base text-brand-navy mb-1.5">{t('home.step4Title')}</h3>
                <p className="text-neutral-text text-[12px] leading-relaxed">
                  {t('home.step4Desc')}
                </p>
              </motion.div>

            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex justify-center pt-4"
          >
            <button 
              onClick={() => setTab('admissions')}
              className="bg-brand-navy hover:bg-brand-navy/95 text-white font-semibold text-xs py-3 px-6 rounded-md uppercase tracking-wider flex items-center gap-2 cursor-pointer"
            >
              {locale === 'fr' ? 'Consulter les Tarifs et S\'inscrire' : 'Consult Tuition & Register'}
              <ArrowRight className="w-4 h-4 text-brand-gold" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ────────────────────────── TESTIMONIALS ────────────────────────── */}
      <section id="testimonials-spot" className="bg-neutral-pearl py-20 px-4">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-85px" }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-3 max-w-3xl mx-auto"
          >
            <span className="text-[11px] font-bold tracking-widest text-brand-royal uppercase block">
              {t('home.testTitle')}
            </span>
            <h2 className="font-sans font-bold text-3xl md:text-4xl text-brand-navy tracking-tight">
              {t('home.testSub')}
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto rounded" />
            <p className="text-neutral-text text-sm md:text-base leading-relaxed">
              {t('home.testDesc')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {featuredTestimonials.map((test, index) => {
              // Central highlighted card (design champagne)
              const isCenter = index === 1;
              return (
                <motion.div 
                  key={test.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -6, scale: 1.015, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.06)" }}
                  className={`border rounded-2xl p-6 transition-all duration-300 shadow-sm flex flex-col justify-between ${
                    isCenter 
                      ? 'bg-brand-champagne/40 border-brand-gold/60 scale-102' 
                      : 'bg-white border-neutral-border/60'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-1 text-brand-gold">
                      {[...Array(test.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-brand-gold" />
                      ))}
                    </div>
                    
                    <p className="font-serif italic text-brand-navy text-[14px] md:text-base leading-relaxed">
                      "{test.text}"
                    </p>
                  </div>

                  <div className="flex items-center gap-4 border-t border-gray-100/80 mt-6 pt-4">
                    <img 
                      src={test.image} 
                      alt={test.name} 
                      className="w-10 h-10 rounded-full object-cover border-2 border-brand-royal"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-sans font-bold text-xs text-brand-navy">{test.name}</h4>
                      <p className="text-[10px] text-neutral-secondary font-medium uppercase font-sans tracking-tight">
                        {test.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ────────────────────────── SEAMLESS HORIZONTAL LOGO CAROUSEL ────────────────────────── */}
      <section id="partner-carousel" className="bg-[#FAFBFD] py-16 px-6 border-t border-b border-neutral-100 relative overflow-hidden">
        {/* Absolute Left & Right lateral fading transparent masks to make logo entry/exit beautifully fluid */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-r from-[#FAFBFD] via-[#FAFBFD]/60 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-l from-[#FAFBFD] via-[#FAFBFD]/60 to-transparent z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-8 relative z-1">
          {/* Humble, ultra-clean header for partners */}
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-[10px] font-accent font-black tracking-[0.2em] text-[#203864]/60 uppercase block">
              {locale === 'fr' ? 'Transferts d’Équivalents & Admissions Directes' : 'Direct Credit Transfers & Academic Paths'}
            </span>
            <h3 className="font-serif font-bold text-lg md:text-xl text-[#203864] tracking-tight">
              {locale === 'fr' ? 'Nos Partenaires Universitaires & Certifications du Monde' : 'Our Global University & Certifying Partners'}
            </h3>
          </div>

          {/* Continuous Infinite Marquee Track */}
          <div className="w-full overflow-hidden relative py-4 flex items-center">
            <motion.div 
              animate={{ x: [0, "-50%"] }}
              transition={{ 
                ease: "linear", 
                duration: 28, 
                repeat: Infinity 
              }}
              className="flex gap-20 md:gap-28 items-center shrink-0 whitespace-nowrap"
            >
              {[
                { name: "Cambridge Assessment International Education", logo: "https://rousseauinternational.org/wp-content/uploads/2021/06/cocic.png", website: "https://www.cambridgeinternational.org" },
                { name: "British Council", logo: "https://rousseauinternational.org/wp-content/uploads/2021/06/zhejiang.png", website: "https://www.britishcouncil.org" },
                { name: "International Baccalaureate", logo: "https://rousseauinternational.org/wp-content/uploads/2021/06/zhejiang.png", website: "https://www.ibo.org" },
                { name: "University of Toronto", logo: "https://rousseauinternational.org/wp-content/uploads/2023/07/ib-world-school-logo-1-colour-300x295.png", website: "https://www.utoronto.ca" },
                { name: "McGill University", logo: "https://rousseauinternational.org/wp-content/uploads/2021/06/satguru-300x185.png", website: "https://www.mcgill.ca" },
                { name: "University of Oxford", logo: "https://rousseauinternational.org/wp-content/uploads/2025/08/secodi-logo-1-300x158.jpg", website: "https://www.ox.ac.uk" },
                { name: "University of British Columbia", logo: "https://rousseauinternational.org/wp-content/uploads/2021/06/lpr-300x71.png", website: "https://www.ubc.ca" },
                { name: "Educational Testing Service", logo: "https://rousseauinternational.org/wp-content/uploads/2025/08/Spar-Logo-650x366-2-300x169.png", website: "https://www.ets.org" }
              ].concat([
                { name: "Cambridge Assessment International Education", logo: "https://rousseauinternational.org/wp-content/uploads/2021/06/cocic.png", website: "https://www.cambridgeinternational.org" },
                { name: "British Council", logo: "https://rousseauinternational.org/wp-content/uploads/2021/06/zhejiang.png", website: "https://www.britishcouncil.org" },
                { name: "International Baccalaureate", logo: "https://rousseauinternational.org/wp-content/uploads/2021/06/zhejiang.png", website: "https://www.ibo.org" },
                { name: "University of Toronto", logo: "https://rousseauinternational.org/wp-content/uploads/2023/07/ib-world-school-logo-1-colour-300x295.png", website: "https://www.utoronto.ca" },
                { name: "McGill University", logo: "https://rousseauinternational.org/wp-content/uploads/2021/06/satguru-300x185.png", website: "https://www.mcgill.ca" },
                { name: "University of Oxford", logo: "https://rousseauinternational.org/wp-content/uploads/2025/08/secodi-logo-1-300x158.jpg", website: "https://www.ox.ac.uk" },
                { name: "University of British Columbia", logo: "https://rousseauinternational.org/wp-content/uploads/2021/06/lpr-300x71.png", website: "https://www.ubc.ca" },
                { name: "Educational Testing Service", logo: "https://rousseauinternational.org/wp-content/uploads/2025/08/Spar-Logo-650x366-2-300x169.png", website: "https://www.ets.org" }
              ]).map((partner, idx) => (
                <a 
                  key={idx} 
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center shrink-0"
                  title={partner.name}
                >
                  <img 
                    src={partner.logo} 
                    alt={partner.name}
                    className="h-14 md:h-[120px] w-auto object-contain max-w-[230px] md:max-w-[330px] hover:opacity-100 hover:scale-105 transition-all duration-300 pointer-events-auto cursor-pointer"
                    referrerPolicy="no-referrer"
                  />
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ────────────────────────── CTA BANNER ────────────────────────── */}
      <section id="cta-banner" className="relative bg-brand-navy py-20 px-4 overflow-hidden">
        {/* Layer 2: Radial Highlight Halo */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-royal/20 rounded-full blur-[120px] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center space-y-6 relative z-10 px-4"
        >
          <span className="text-[11px] font-bold tracking-widest text-brand-sky uppercase block">
            Admissions Now Live for Academic Year 2026/2027
          </span>
          <h2 className="font-sans font-bold text-3xl md:text-5xl text-white tracking-tight">
            Inspiring Educational Excellence, <br />
            Building World Postures in Cameroon.
          </h2>
          <p className="text-stone-300 text-[14px] md:text-base leading-relaxed max-w-[620px] mx-auto">
            Contact our Admissions Registrar directly or fill out the online pre-registration module. 
            We guarantee written notification and evaluation scheduling within 48 business hours.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
            <button 
              onClick={() => setTab('admissions')}
              className="bg-brand-royal hover:bg-brand-royal/95 text-white font-semibold text-xs py-3 px-8 rounded-md shadow-lg transition-transform hover:-translate-y-0.5 w-full sm:w-auto uppercase tracking-wide cursor-pointer animate-pulse"
            >
              Apply Online
            </button>
            <button 
              onClick={() => setTab('contact')}
              className="border border-white/20 text-white hover:border-white font-semibold text-xs py-3 px-8 rounded-md hover:bg-white/5 transition-colors w-full sm:w-auto uppercase tracking-wide cursor-pointer"
            >
              Admissions FAQ
            </button>
          </div>

          <p className="text-[10px] text-brand-sky/75 font-semibold uppercase tracking-widest pt-2 flex items-center justify-center gap-1">
            <Star className="w-3.5 h-3.5 text-[#FFC000] fill-current shrink-0" />
            British Council & ETS Registered Centre ID: 237-RIS
          </p>
        </motion.div>
      </section>

      {/* Video Modal experience */}
      {isVideoOpen && (
        <div className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4">
          <div className="bg-brand-navy border border-white/10 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl relative">
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-brand-navy-dark">
              <span className="font-sans font-semibold text-sm text-white tracking-wide">
                RIS Campus Experience Film
              </span>
              <button 
                onClick={() => setIsVideoOpen(false)}
                className="text-white hover:text-brand-gold bg-white/10 hover:bg-white/15 px-3 py-1 rounded"
              >
                Close
              </button>
            </div>
            <div className="aspect-video w-full bg-slate-900 flex items-center justify-center text-stone-300">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
                title="RIS Campus YouTube Experience"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                referrerPolicy="no-referrer"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
