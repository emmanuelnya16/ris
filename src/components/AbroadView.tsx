/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Landmark, Compass, Award, FileText, ChevronRight, GraduationCap, 
  MapPin, Search, Plane, Globe, Luggage, Navigation, Map, Sparkles,
  Briefcase
} from 'lucide-react';
import { PartnerUniversity } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { translatePartner } from '../translationHelpers';

const dict: Record<string, { en: string; fr: string }> = {
  'hero.badge': {
    en: 'Douala’s Portal to Elite Institutions',
    fr: 'Le Portail de Douala vers les Établissements d\'Élite'
  },
  'hero.titleLine1': {
    en: 'Deploying Graduates Into',
    fr: 'Déployer Nos Diplômés dans'
  },
  'hero.titleHighlight': {
    en: 'Global Tier-1 Universities',
    fr: 'les Universités Mondiales d\'Élite'
  },
  'hero.desc': {
    en: 'Our specialized counselors office serves as a fully integrated bridge to prestigious Ivy League, G5, U15, and European world-class faculties directly from Douala, Cameroon.',
    fr: 'Notre cabinet de conseil spécialisé sert de passerelle entièrement intégrée vers les prestigieuses facultés de l\'Ivy League, du G5 britannique, de l\'U15 canadien et d\'Europe, directement depuis Douala.'
  },
  'counsel.badge': {
    en: 'Bespoke Placements Guidance',
    fr: 'Orientation sur Mesure'
  },
  'counsel.title': {
    en: 'A Complete High-Impact Support Division From Port Selection To Visas',
    fr: 'Un Accompagnement Complet de Haute Précision : de la Sélection au Visa'
  },
  'counsel.desc': {
    en: "At Rousseau International School, we take pride in managing families' hopes. Our Guidance Division runs certified pathways, hosting continuous evaluations, interview drills, and logistical coordination for 100% university entry rates.",
    fr: "À Rousseau International School, nous sommes fiers d'accompagner l'ambition des familles. Notre division d'orientation gère des parcours certifiés comprenant bilans réguliers, simulations d'entretiens et logistique administrative pour atteindre 100 % d'admission."
  },
  'counsel.card1Title': {
    en: 'University Matching',
    fr: 'Correspondance Universitaire'
  },
  'counsel.card1Desc': {
    en: 'Custom placement filters matched to student profiles, performance, and family target locations.',
    fr: 'Filtres de placement sur mesure ajustés selon les profils, les aspirations de l\'élève et les choix géographiques de la famille.'
  },
  'counsel.card2Title': {
    en: 'Portfolio & Essay Audits',
    fr: 'Audits de Portfolios & Essais'
  },
  'counsel.card2Desc': {
    en: 'Iterative draft critiques, letter templates, and portfolios designed to grab admission heads\' eyes.',
    fr: 'Révisions itératives de brouillons de motivation, lettres et portfolios pour capter l\'attention des comités de sélection.'
  },
  'counsel.card3Title': {
    en: 'Admissions Pipelines',
    fr: 'Gestion des Candidatures'
  },
  'counsel.card3Desc': {
    en: 'Integrated UCAS, CommonApp, and digital trackers ensuring absolute promptness for admissions dates.',
    fr: 'Suivi coordonné via UCAS, CommonApp et tableaux de bord d\'admission pour une ponctualité rigoureuse aux dates butoirs.'
  },
  'counsel.card4Title': {
    en: 'Study Permits & Logistics',
    fr: 'Permis d\'Études & Logistique'
  },
  'counsel.card4Desc': {
    en: 'Direct aid on verification papers, bank certificates, and legal embassy interview protocols.',
    fr: 'Aide concrète à la validation des justificatifs financiers, dossiers administratifs et préparation aux entretiens d\'ambassade.'
  },
  'counsel.stampsRate': {
    en: '100% ACTIVE PATHS SUCCESS RATE',
    fr: '100 % DE REUSSITE AUX PARCOURS ACTIFS'
  },
  'partners.badge': {
    en: 'Global Destinations',
    fr: 'Destinations Mondiales'
  },
  'partners.title': {
    en: 'Partner Institutions & Sessional Higher Placement Targets',
    fr: 'Institutions Partenaires & Objectifs de Placement Supérieur'
  },
  'partners.desc': {
    en: 'We directly structure student reports to match transfer values for universities in Canada, United Kingdom, and globally.',
    fr: 'Nous organisons les relevés scolaires pour maximiser les équivalences de crédits au Canada, au Royaume-Uni et partout dans le monde.'
  },
  'partners.searchPlaceholder': {
    en: 'Search universities, specialties or countries...',
    fr: 'Rechercher des universités, des spécialités ou des pays...'
  },
  'partners.loading': {
    en: 'Checking active global registers...',
    fr: 'Vérification des registres mondiaux actifs...'
  },
  'partners.notFound': {
    en: 'No registered pathways matched "{query}"',
    fr: 'Aucun parcours enregistré ne correspond à "{query}"'
  },
  'partners.major': {
    en: 'Major Specialty',
    fr: 'Spécialité Majeure'
  },
  'partners.accredited': {
    en: 'Accredited',
    fr: 'Accrédité'
  },
  'partners.directIntake': {
    en: 'Direct Intake active',
    fr: 'Admission directe active'
  },
  'stories.badge': {
    en: 'Success Testimonials',
    fr: 'Témoignages de Réussite'
  },
  'stories.title': {
    en: 'Where Rousseau Credentials Flew Parents\' Legacies',
    fr: 'Là où les Enseignements de Rousseau Propulsent les Élèves'
  }
};

const alumniStoriesDefault = [
  {
    name: "Marc-Aurele Kamga",
    uni: "McGill University, Canada",
    major: "Honours Computer Engineering",
    year: "RIS '24 Alumnus",
    quote: "Rousseau's IB course prepared me perfectly for McGill's workload. I entered with 18 advanced credits, which lowered my tuition load considerably.",
    quoteFr: "Le programme IB de Rousseau m'a armé pour la charge de travail à McGill. J'y suis entré avec 18 crédits d'équivalence avancés, ce qui a réduit mes droits de scolarité.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200"
  },
  {
    name: "Carla Bissong",
    uni: "University of Oxford, UK",
    major: "Philosophy, Politics & Economics (PPE)",
    year: "RIS '23 Alumna",
    quote: "The personalized coaching at Rousseau's counselor office was central to my UCAS personal statement. They review your drafts until they spark real intellectual rigor.",
    quoteFr: "L'accompagnement individuel du bureau des conseillers de Rousseau a été décisif pour ma lettre d'intention UCAS. Ils analysent vos écrits jusqu'à ce qu'ils révèlent une vraie rigueur académique.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200"
  },
  {
    name: "Elsa Ngassa",
    uni: "University of Toronto, Canada",
    major: "Biomedical Sciences / Pre-Med",
    year: "RIS '24 Alumna",
    quote: "Continuous evaluation on my OSSD Canadian curriculum was a lifesaver. My transcript reflected regular laboratory efforts, letting me secure entrance without exam anxiety.",
    quoteFr: "L'évaluation continue du cursus canadien OSSD a été salutaire. Mon relevé traduisait mes travaux réguliers en laboratoire, me permettant de sécuriser mon admission sans le stress d'un examen unique.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200"
  }
];

interface AbroadViewProps {
  partners: PartnerUniversity[];
}

export default function AbroadView({ partners: propPartners }: AbroadViewProps) {
  const [partners, setPartners] = useState<PartnerUniversity[]>(propPartners);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [hoveredUni, setHoveredUni] = useState<string | null>(null);
  const { locale } = useLanguage();

  const t = (key: string): string => {
    return dict[key]?.[locale] || dict[key]?.['en'] || key;
  };

  useEffect(() => {
    setLoading(true);
    fetch('/api/partners')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setPartners(data.filter(p => p.active));
        }
        setLoading(false)
      })
      .catch(err => {
        console.error("Error fetching partners, falling back:", err);
        setLoading(false);
      });
  }, [propPartners]);

  // Dynamic localization mapping
  const translatedPartners = partners.map(p => translatePartner(p, locale));

  const filteredPartners = translatedPartners.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div id="abroad-view" className="w-full overflow-hidden text-[#203864]">
      
      {/* ────────────────────────── PAGE BANNER HEADER ────────────────────────── */}
      <section className="bg-[#203864] pt-40 pb-44 px-6 text-center relative overflow-hidden text-white flex flex-col justify-center items-center min-h-[460px]">
        {/* Cinematic Vintage Travel Backdrop with Custom Lowered Opacity */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1600" 
            alt="World Map Vintage Traveler" 
            className="w-full h-full object-cover opacity-35 transform scale-105 transition-opacity duration-700"
            referrerPolicy="no-referrer"
          />
          {/* Subtle animated overlay light rays */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#203864]/75 via-[#12213D]/55 to-[#203864]/90 mix-blend-multiply" />
        </div>

        {/* Floating Animated Travel Props */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-1">
          {/* Animated Airplane sliding slowly from right to left */}
          <motion.div 
            initial={{ x: '-10%', y: '10%', opacity: 0 }}
            animate={{ 
              x: '110%', 
              y: '30%',
              opacity: [0, 0.4, 0.4, 0] 
            }}
            transition={{ 
              duration: 25, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute left-0 top-12 text-[#FFC000] rotate-12 flex items-center gap-2"
          >
            <Plane className="w-6 h-6 fill-current" />
            <div className="w-24 h-[1px] border-t border-dashed border-white/20" />
          </motion.div>

          {/* Golden Rotating Compass Accent on top-right */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 75, repeat: Infinity, ease: "linear" }}
            className="absolute top-10 right-10 md:right-24 opacity-20 text-[#FFC000]"
          >
            <Compass className="w-20 h-20 stroke-[1]" />
          </motion.div>

          {/* Rotating Globe Accent on bottom-left */}
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-10 left-8 md:left-20 opacity-15 text-white"
          >
            <Globe className="w-32 h-32 stroke-[0.5]" />
          </motion.div>

          {/* Interactive Passport stamp graphic */}
          <div className="absolute right-12 bottom-6 opacity-5 border border-dashed border-[#FFC000] rounded-full p-6 text-[#FFC000] tracking-widest text-[8px] uppercase font-accent select-none">
            RIS BOARDING · SAVING HORIZONS
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-6 relative z-10 flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-[#FFC000]/20 border border-[#FFC000]/40 px-4 py-1.5 rounded-full backdrop-blur-sm"
          >
            <Plane className="w-3.5 h-3.5 text-[#FFC000] animate-pulse" />
            <span className="text-[10px] md:text-xs font-accent font-extrabold tracking-widest text-[#FFC000] uppercase">
              {t('hero.badge')}
            </span>
          </motion.div>

          <motion.h1 
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif font-bold text-3xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[1.12] drop-shadow-md"
          >
            {t('hero.titleLine1')} <br />
            <span className="text-[#FFC000] relative inline-block">
              {t('hero.titleHighlight')}
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute left-0 bottom-1 h-1 bg-[#FFC000] rounded-full shadow-sm"
              />
            </span>
          </motion.h1>

          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 bg-[#FFC000] mx-auto rounded shadow-sm"
          />

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-stone-150 text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-sans drop-shadow-sm font-medium"
          >
            {t('hero.desc')}
          </motion.p>
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

      {/* ────────────────────────── COUNSELING SERVICES SECTION ────────────────────────── */}
      <section className="bg-white py-20 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FFC000]" />
              <span className="text-xs font-accent font-black tracking-widest text-[#203864] uppercase">
                {t('counsel.badge')}
              </span>
            </div>

            <h2 className="font-serif font-bold text-2xl md:text-3.5xl text-[#203864] leading-tight">
              {t('counsel.title')}
            </h2>
            
            <p className="text-neutral-600 text-[13px] md:text-sm leading-relaxed font-sans">
              {t('counsel.desc')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
              <motion.div 
                whileHover={{ y: -4, scale: 1.02 }}
                className="flex gap-3 bg-[#FAFCFF] p-4 rounded-xl border border-neutral-100 shadow-sm transition-all duration-300"
              >
                <Compass className="w-5 h-5 text-[#FFC000] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-[#203864] font-accent">{t('counsel.card1Title')}</h4>
                  <p className="text-neutral-500 text-[11px] mt-0.5">{t('counsel.card1Desc')}</p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -4, scale: 1.02 }}
                className="flex gap-3 bg-[#FAFCFF] p-4 rounded-xl border border-neutral-100 shadow-sm transition-all duration-300"
              >
                <FileText className="w-5 h-5 text-[#203864] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-[#203864] font-accent">{t('counsel.card2Title')}</h4>
                  <p className="text-neutral-500 text-[11px] mt-0.5">{t('counsel.card2Desc')}</p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -4, scale: 1.02 }}
                className="flex gap-3 bg-[#FAFCFF] p-4 rounded-xl border border-neutral-100 shadow-sm transition-all duration-300"
              >
                <GraduationCap className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-[#203864] font-accent">{t('counsel.card3Title')}</h4>
                  <p className="text-neutral-500 text-[11px] mt-0.5">{t('counsel.card3Desc')}</p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -4, scale: 1.02 }}
                className="flex gap-3 bg-[#FAFCFF] p-4 rounded-xl border border-neutral-100 shadow-sm transition-all duration-300"
              >
                <Luggage className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-[#203864] font-accent">{t('counsel.card4Title')}</h4>
                  <p className="text-neutral-500 text-[11px] mt-0.5">{t('counsel.card4Desc')}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Interactive Image Frame with continuous slide hover zoom */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative aspect-[14/10] bg-neutral-100 rounded-3xl overflow-hidden shadow-xl border border-[#FAFCFF]"
          >
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800" 
              alt="Rousseau Counseling Sessions" 
              className="w-full h-full object-cover cursor-zoom-in"
              referrerPolicy="no-referrer"
            />
            {/* Real stats sticker */}
            <div className="absolute top-4 left-4 bg-[#203864] text-white border border-[#FFC000]/60 px-4 py-2 rounded-xl text-[10px] font-accent font-extrabold tracking-wider shadow-lg flex items-center gap-1.5 overflow-hidden">
              <Sparkles className="w-3.5 h-3.5 text-[#FFC000]" />
              <span>{t('counsel.stampsRate')}</span>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ────────────────────────── PARTNER UNIVERSITIES DISPLAY ────────────────────────── */}
      <section className="bg-gradient-to-b from-[#FAFCFF] to-white py-20 px-6 border-t border-neutral-100 relative">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(#E8EEF5_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto space-y-12 relative z-10">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-[10px] font-accent font-black tracking-widest text-[#203864] uppercase block">
              {t('partners.badge')}
            </span>
            <h2 className="font-serif font-bold text-2xl md:text-3.5xl text-[#203864]">
              {t('partners.title')}
            </h2>
            <div className="w-16 h-1 bg-[#FFC000] mx-auto rounded-full" />
            <p className="text-neutral-500 text-xs md:text-sm font-sans">
              {t('partners.desc')}
            </p>
          </div>

          {/* Interactive Search Tool Bar with Flight Accent */}
          <div className="max-w-md mx-auto relative">
            <div className="relative">
              <Search className="w-4 h-4 text-[#203864]/60 absolute left-4 top-1/2 -translate-y-1/2" />
              <input 
                type="text"
                placeholder={t('partners.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full outline-none pl-11 pr-12 py-3 border border-[#E8EEF5] rounded-full text-xs tracking-wide bg-white shadow-md focus:border-[#203864]/50 transition-all font-sans text-[#203864]"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                <Navigation className="w-3.5 h-3.5 text-[#FFC000]" />
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center text-xs text-neutral-400 font-sans py-12">{t('partners.loading')}</div>
          ) : filteredPartners.length === 0 ? (
            <div className="text-center text-xs text-neutral-400 font-sans py-12">
              {t('partners.notFound').replace('{query}', searchQuery)}
            </div>
          ) : (
            <motion.div 
              layout 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              <AnimatePresence>
                {filteredPartners.map((item, idx) => (
                  <motion.a 
                    href={item.website || `https://www.google.com/search?q=${encodeURIComponent(item.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.3) }}
                    key={item.id}
                    onMouseEnter={() => setHoveredUni(item.id)}
                    onMouseLeave={() => setHoveredUni(null)}
                    whileHover={{ y: -8 }}
                    className="bg-white border border-[#E8EEF5] p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left relative overflow-hidden group cursor-pointer block"
                  >
                    {/* Hover gold glowing subtle strip */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-[#203864] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="w-11 h-11 bg-neutral-50 rounded-full flex items-center justify-center text-xl shadow-inner border border-neutral-100 transform group-hover:rotate-12 transition-transform">
                          {item.logo}
                        </div>
                        <span className="text-[9px] uppercase font-accent font-extrabold tracking-wider px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded border border-emerald-100">
                          {t('partners.accredited')}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <h4 className="font-serif font-bold text-sm text-[#203864] group-hover:text-[#FFC000] transition-colors">{item.name}</h4>
                        <span className="text-[9px] text-neutral-400 font-accent font-extrabold tracking-wider flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#FFC000]" />
                          {item.country}
                        </span>
                      </div>

                      <div className="bg-[#FAFCFF] p-2.5 rounded-lg border border-[#E8EEF5]">
                        <p className="text-[9.5px] text-[#203864]/80 font-accent font-extrabold uppercase tracking-tight flex items-center gap-1">
                          <Briefcase className="w-3.5 h-3.5 text-[#FFC000]" />
                          {t('partners.major')}: 
                        </p>
                        <p className="text-[10px] text-stone-600 font-sans font-semibold mt-0.5">
                          {item.specialty}
                        </p>
                      </div>

                      <p className="text-[11px] text-neutral-500 leading-relaxed font-sans font-normal">
                        {item.description}
                      </p>
                    </div>

                    <div className="border-t border-neutral-100 mt-5 pt-3 flex items-center justify-between text-[10px] text-[#203864] font-accent font-extrabold uppercase tracking-wider">
                      <span>{t('partners.directIntake')}</span>
                      <ChevronRight className="w-4 h-4 text-[#FFC000] transform group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </motion.a>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

        </div>
      </section>

      {/* ────────────────────────── ALUMNI STORIES CAROUSEL/GRID WITH HOVER EFFECTS ────────────────────────── */}
      <section className="bg-white py-20 px-6 relative">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-[10px] font-accent font-black tracking-widest text-[#203864] uppercase block">
              {t('stories.badge')}
            </span>
            <h2 className="font-serif font-bold text-2xl md:text-3.5xl text-[#203864]">
              {t('stories.title')}
            </h2>
            <div className="w-16 h-1 bg-[#FFC000] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {alumniStoriesDefault.map((story, k) => (
              <motion.div 
                key={k} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: k * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-[#203864] text-white border border-white/5 rounded-3xl p-6 md:p-8 shadow-xl text-left flex flex-col justify-between relative overflow-hidden group"
              >
                {/* Back side subtle map glow */}
                <div className="absolute right-0 bottom-0 pointer-events-none opacity-[0.03] select-none text-white whitespace-nowrap">
                  <Plane className="w-56 h-56 rotate-45 transform translate-x-20 translate-y-20" />
                </div>

                <div className="space-y-4 relative z-10">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] uppercase font-accent font-black text-[#FFC000] tracking-wider px-3 py-1 bg-white/10 rounded-full border border-white/10 flex items-center gap-1.5">
                      <Plane className="w-3 h-3 text-[#FFC000] rotate-45" /> {story.uni}
                    </span>
                  </div>
                  
                  <p className="font-serif italic text-stone-200 text-xs md:text-[13px] leading-relaxed">
                    "{locale === 'fr' ? story.quoteFr : story.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 border-t border-white/10 mt-6 pt-4 relative z-10">
                  <img 
                    src={story.image} 
                    alt={story.name} 
                    className="w-11 h-11 rounded-full object-cover border-2 border-[#FFC000] shadow-md group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-sans font-bold text-xs text-white group-hover:text-[#FFC000] transition-colors">{story.name}</h4>
                    <span className="text-[9.5px] text-[#FFC000]/80 block uppercase tracking-wider font-accent font-black mt-0.5">
                      {locale === 'fr' ? (story.major === 'Honours Computer Engineering' ? 'Génie Informatique' : story.major) : story.major}
                    </span>
                    <span className="text-[9px] text-stone-300 font-sans mt-0.5 block">
                      {locale === 'fr' ? story.year.replace('Alumnus', 'Alumni').replace('Alumna', 'Alumna') : story.year}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
