/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Target, Compass, Search, GraduationCap } from 'lucide-react';
import { Teacher } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { translateTeacher } from '../translationHelpers';
import img_directeur from "../../assets/directeur-768x697.png";

const aboutDict: Record<string, { en: string; fr: string }> = {
  'banner.badge': {
    en: 'About Our Academy',
    fr: 'À Propos de Notre Académie'
  },
  'banner.title': {
    en: 'Nurturing Elite Pioneers Since 2011',
    fr: 'Façonner des Pionniers d’Élite depuis 2011'
  },
  'banner.desc': {
    en: "Discover the legacy, values, and pedagogical leadership steering Cameroon's pre-eminent Cambridge and IB education.",
    fr: "Découvrez l’héritage, les valeurs et le leadership pédagogique qui guident l’enseignement de référence Cambridge et IB au Cameroun."
  },
  'founder.quote': {
    en: '"Our curricula require depth. We cultivate children prepared to address historical questions."',
    fr: '"Nos programmes exigent de la profondeur. Nous formons des esprits capables de répondre aux enjeux historiques."'
  },
  'founder.quoteRole': {
    en: '— M. KENGNE FIDÈLE, FOUNDER',
    fr: '— M. KENGNE FIDÈLE, FONDATEUR'
  },
  'founder.badge': {
    en: 'Message from the Founder',
    fr: 'Le Message du Fondateur'
  },
  'founder.title': {
    en: '"An Unyielding Standard of Academic Prestige"',
    fr: '"Un Standard Inflexible de Prestige Académique"'
  },
  'founder.desc1': {
    en: 'Rousseau International School was established out of a crucial necessity: families in Cameroon seeking an elite international curriculum (Cambridge and IB) should not feel constrained to relocate their children to Europe or North America to acquire a global pre-university posture.',
    fr: 'Rousseau International School est née d’une nécessité cruciale : les familles établies au Cameroun en quête d’un cursus international d’élite (Cambridge, IB) ne doivent plus se sentir contraintes d’envoyer leurs enfants en Europe ou en Amérique du Nord pour obtenir un passeport académique mondial.'
  },
  'founder.desc2': {
    en: 'Our vision is structured around global competitiveness and rigorous individual accountability. At Rousseau, bilingual eloquence and scientific fluency aren’t optional highlights; they are standard metrics of our day-to-day work.',
    fr: 'Notre vision s’articule autour de la compétitivité internationale et d’une responsabilisation individuelle exigeante. Chez Rousseau, l’éloquence bilingue et la fluidité scientifique ne sont pas des options accessoires, mais les piliers fondateurs de notre action quotidienne.'
  },
  'founder.desc3': {
    en: 'We stand recognized as Cameroon’s pre-eminent path for British Council exam sittings, enabling expatriates and local students alike to unlock advanced status transfer credits in Ivy Leagues program pipelines. I welcome your children to join our legacy of exceptional outcomes.',
    fr: 'Nous sommes reconnus comme le pôle majeur au Cameroun pour les sessions officielles du British Council, donnant aux élèves camerounais et internationaux l’accès à des équivalences de crédits pour intégrer sereinement les meilleures universités. Je serai honoré de voir vos enfants rejoindre cette tradition d’excellence.'
  },
  'founder.roleDetails': {
    en: 'Founder & Director General, Rousseau Group',
    fr: 'Fondateur & Directeur Général, Groupe Rousseau'
  },
  'core.badge': {
    en: 'Our Core Architecture',
    fr: 'Notre Architecture Fondatrice'
  },
  'core.title': {
    en: 'Vision, Mission & Shared Values',
    fr: 'Vision, Mission & Valeurs Communes'
  },
  'core.missionTitle': {
    en: 'Our Mission',
    fr: 'Notre Mission'
  },
  'core.missionDesc': {
    en: 'To equip pupils with high academic caliber, cross-border critical habits, and prestigious portfolios required to earn admissions at major global tier-1 universities.',
    fr: 'Préparer nos élèves par une rigueur académique supérieure, une posture critique ouverte et des dossiers d’excellence indispensables pour s’imposer dans les plus grandes universités mondiales.'
  },
  'core.visionTitle': {
    en: 'Our Vision',
    fr: 'Notre Vision'
  },
  'core.visionDesc': {
    en: "To be celebrated as West Africa's leading school of bilingual excellence—fusing authentic Cameroonian resilience with the modern structures of Cambridge CAIE and International Baccalaureate.",
    fr: "S’imposer comme l’établissement d’excellence bilingue de référence en Afrique de l’Ouest — alliant la rigueur et la résilience camerounaises aux cadres d’apprentissage Cambridge CAIE et Baccalauréat International."
  },
  'core.valuesTitle': {
    en: 'Our Values',
    fr: 'Nos Valeurs'
  },
  'core.valuesDesc': {
    en: 'Deep intellectual rigor, global curiosity, bilingual eloquence, individual accountability, and a profound respect for cultural contribution.',
    fr: 'Rigueur intellectuelle profonde, curiosité mondiale, éloquence bilingue, responsabilité individuelle et respect absolu de la diversité culturelle.'
  },
  'fac.badge': {
    en: 'Academic Authorities',
    fr: 'Les Autorités Académiques'
  },
  'fac.title': {
    en: 'A World-Class Pedagogical Faculty',
    fr: 'Un Corps Enseignant de Classe Mondiale'
  },
  'fac.desc': {
    en: 'Every educator at Rousseau is selected for their command of Cambridge & IB syllabi alongside their passion for child mentorship.',
    fr: 'Chaque enseignant chez Rousseau est sélectionné pour sa maîtrise experte des programmes Cambridge & IB et son dévouement profond envers l’accompagnement des élèves.'
  },
  'fac.searchPlaceholder': {
    en: 'Search faculty by name or subject...',
    fr: 'Rechercher un enseignant par nom ou matière...'
  },
  'fac.loading': {
    en: 'Loading faculty registers...',
    fr: 'Chargement des personnels enseignants...'
  },
  'fac.notFound': {
    en: 'No faculty members found matching "{query}"',
    fr: 'Aucun membre de faculté trouvé pour "{query}"'
  },
  'fac.eduDegree': {
    en: 'Education & Degree',
    fr: 'Diplômes & Formation'
  }
};

interface AboutViewProps {
  teachers: Teacher[];
}

export default function AboutView({ teachers: propTeachers }: AboutViewProps) {
  const [teachers, setTeachers] = useState<Teacher[]>(propTeachers);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const { locale } = useLanguage();

  const t = (key: string): string => {
    return aboutDict[key]?.[locale] || aboutDict[key]?.['en'] || key;
  };

  useEffect(() => {
    // In React 19 / Express full stack, we load teachers dynamically
    setLoading(true);
    fetch('/api/teachers')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setTeachers(data.filter(t => t.active));
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading teachers, falling back:", err);
        setLoading(false);
      });
  }, [propTeachers]);

  // Translate fetched teachers dynamically
  const translatedTeachers = teachers.map(teach => translateTeacher(teach, locale));

  // Filtering teachers search
  const filteredTeachers = translatedTeachers.filter(teach => {
    return (
      teach.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teach.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teach.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div id="about-view" className="w-full">
      
      {/* ────────────────────────── PAGE BANNER HEADER ────────────────────────── */}
      <section className="bg-[#203864] pt-40 pb-44 px-6 text-center relative overflow-hidden text-white flex flex-col justify-center items-center min-h-[460px]">
        {/* Cinematic Collegiate Backdrop */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1600" 
            alt="Collegiate Campus Heritage" 
            className="w-full h-full object-cover opacity-35 transform scale-105 transition-opacity duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#203864]/75 via-[#12213D]/55 to-[#203864]/90 mix-blend-multiply" />
        </div>

        <div className="max-w-4xl mx-auto space-y-4 relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-1.5 bg-[#FFC000]/20 border border-[#FFC000]/40 px-3.5 py-1 rounded-full backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFC000] animate-pulse" />
            <span className="text-[10px] md:text-xs font-accent font-extrabold tracking-widest text-[#FFC000] uppercase">
              {t('banner.badge')}
            </span>
          </div>
          <h1 className="font-serif font-bold text-3xl md:text-5xl text-white tracking-tight drop-shadow-md">
            {t('banner.title')}
          </h1>
          <div className="w-16 h-1 bg-[#FFC000] mx-auto rounded-full shadow-sm" />
          <p className="text-stone-150 text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-sans drop-shadow-sm font-medium">
            {t('banner.desc')}
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

      {/* ────────────────────────── FOUNDER MESSAGE ────────────────────────── */}
      <section className="bg-white py-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-xl aspect-square bg-[#0c233a] border border-gray-150">
              <img 
                src={img_directeur} 
                alt="M. Kengne Fidèle, RIS Founder" 
                className="w-full h-full object-cover grayscale brightness-95 contrast-105 transition-transform duration-700 hover:scale-105 hover:grayscale-0"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute -bottom-6 -right-6 bg-brand-champagne border border-brand-gold/50 p-4 rounded-xl shadow-lg hidden sm:block max-w-[220px]"
            >
              <span className="font-serif italic text-brand-navy text-xs leading-normal block">
                {t('founder.quote')}
              </span>
              <span className="text-[9px] font-bold text-brand-royal uppercase mt-2 block tracking-wider">
                {t('founder.quoteRole')}
              </span>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            <span className="text-xs font-bold tracking-widest text-[#203864] uppercase font-accent">
              {t('founder.badge')}
            </span>
            <h2 className="font-serif font-bold text-2xl md:text-3.5xl text-brand-navy tracking-tight leading-snug">
              {t('founder.title')}
            </h2>
            
            <div className="space-y-4 text-neutral-text text-[14px] md:text-base leading-relaxed">
              <p>
                {t('founder.desc1')}
              </p>
              <p className="font-medium text-brand-navy">
                {t('founder.desc2')}
              </p>
              <p>
                {t('founder.desc3')}
              </p>
            </div>

            <div className="pt-4 flex items-center gap-4 border-t border-gray-100">
              <div>
                <h4 className="font-sans font-bold text-brand-navy text-sm">M. Kengne Fidèle</h4>
                <p className="text-xs text-neutral-secondary">{t('founder.roleDetails')}</p>
              </div>
              <div className="h-8 w-[1px] bg-neutral-border" />
              <div>
                <img 
                  src="https://picsum.photos/seed/signature/100/40" 
                  alt="Founder signature" 
                  className="h-7 w-auto opacity-75 object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ────────────────────────── MISSION, VISION, VALUES ────────────────────────── */}
      <section className="bg-[#FAFBFD] py-20 px-4 border-y border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-3 max-w-2xl mx-auto"
          >
            <span className="text-[10px] font-bold tracking-widest text-[#203864] uppercase block font-accent">
              {t('core.badge')}
            </span>
            <h2 className="font-serif font-bold text-3xl text-brand-navy">
              {t('core.title')}
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -8, scale: 1.015, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.06), 0 10px 10px -5px rgba(0,0,0,0.04)" }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-border/40 space-y-4 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-brand-royal flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="font-sans font-bold text-lg text-brand-navy uppercase tracking-tight">{t('core.missionTitle')}</h3>
              <p className="text-neutral-text text-[13px] leading-relaxed">
                {t('core.missionDesc')}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -8, scale: 1.015, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.06), 0 10px 10px -5px rgba(0,0,0,0.04)" }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-border/40 space-y-4 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-sans font-bold text-lg text-brand-navy uppercase tracking-tight">{t('core.visionTitle')}</h3>
              <p className="text-neutral-text text-[13px] leading-relaxed">
                {t('core.visionDesc')}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -8, scale: 1.015, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.06), 0 10px 10px -5px rgba(0,0,0,0.04)" }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-border/40 space-y-4 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-sans font-bold text-lg text-brand-navy uppercase tracking-tight">{t('core.valuesTitle')}</h3>
              <p className="text-neutral-text text-[13px] leading-relaxed">
                {t('core.valuesDesc')}
              </p>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ────────────────────────── PEDAGOGICAL TEAM ────────────────────────── */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-3 max-w-3xl mx-auto"
          >
            <span className="text-[11px] font-bold tracking-widest text-[#203864] uppercase block">
              {t('fac.badge')}
            </span>
            <h2 className="font-sans font-bold text-3xl md:text-4xl text-brand-navy tracking-tight">
              {t('fac.title')}
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto rounded" />
            <p className="text-neutral-text text-sm md:text-base leading-relaxed">
              {t('fac.desc')}
            </p>
          </motion.div>

          {/* Search bar inside about view */}
          <div className="max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-neutral-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder={t('fac.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-pearl/80 border border-neutral-border outline-none pl-10 pr-4 py-2.5 rounded-lg text-xs tracking-wide text-brand-navy focus:bg-white focus:border-brand-royal transition-all duration-300 shadow-sm"
            />
          </div>

          {loading ? (
            <div className="text-center text-xs text-neutral-secondary py-12">
              {t('fac.loading')}
            </div>
          ) : filteredTeachers.length === 0 ? (
            <div className="text-center text-neutral-secondary text-xs py-12">
              {t('fac.notFound').replace('{query}', searchQuery)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredTeachers.map((teach, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: Math.min(idx * 0.08, 0.4) }}
                  whileHover={{ y: -8, scale: 1.015, boxShadow: "0 20px 30px -10px rgba(0,0,0,0.12)" }}
                  key={teach.id}
                  className="bg-white border border-neutral-border/65 rounded-xl overflow-hidden shadow-sm transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative aspect-[3/4] bg-neutral-pearl overflow-hidden">
                    <img 
                      src={teach.image} 
                      alt={teach.name} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3 bg-brand-navy/95 border border-brand-gold/40 px-2.5 py-1 rounded text-[9px] uppercase tracking-wider font-semibold text-white">
                      {teach.subject}
                    </div>
                  </div>

                  <div className="p-5 space-y-3 text-left">
                    <div className="space-y-0.5">
                      <h4 className="font-sans font-bold text-sm text-brand-navy leading-tight">
                        {teach.name}
                      </h4>
                      <p className="text-[10px] text-brand-royal font-semibold tracking-wider uppercase">
                        {teach.role}
                      </p>
                    </div>

                    <p className="text-[12px] text-neutral-text leading-relaxed line-clamp-3 hover:line-clamp-none transition-all duration-300">
                      {teach.bio}
                    </p>

                    <div className="border-t border-gray-100 pt-2.5">
                      <span className="text-[9px] text-neutral-secondary font-semibold uppercase block">{t('fac.eduDegree')}</span>
                      <span className="text-[11px] font-medium text-brand-navy font-serif leading-tight">
                        {teach.education}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

        </div>
      </section>

    </div>
  );
}
