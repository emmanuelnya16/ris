/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Languages, GraduationCap, Coins, CheckCircle, Mail, Phone, User, 
  Send, AlertCircle, Clock, FileText, Sparkles, Building2, Award, ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const dict: Record<string, { en: string; fr: string }> = {
  'hero.badge': {
    en: 'Approved Exam Center',
    fr: 'Centre d\'Examens Agrée'
  },
  'hero.title': {
    en: 'Official British Council & ETS Language sittings',
    fr: 'Sessions Officielles d\'Anglais British Council & ETS'
  },
  'hero.desc': {
    en: 'Book certified IELTS, TOEFL, TOEIC, and TFI examination intakes with integrated preparation workshops led by accredited tutors in Douala.',
    fr: 'Réservez vos places officielles pour l\'IELTS, le TOEFL, le TOEIC et le TFI avec des ateliers intensifs animés par des tuteurs agrées à Douala.'
  },
  'testing.badge': {
    en: 'Testing Portfolio',
    fr: 'Catalogue des Certifications'
  },
  'testing.title': {
    en: 'Four Internationally Accredited Language Sessional Tracks',
    fr: 'Quatre Cursus Individuels de Certification Internationale'
  },
  'testing.desc': {
    en: 'Rousseau holds official licensing agreements to configure electronic and written sittings. Our laboratories have dedicated private cubicles and ultra sound-dampened audio sittings.',
    fr: 'Rousseau détient les agréments officiels pour organiser les sessions écrites et sur ordinateur. Nos laboratoires disposent de box individuels insonorisés haut de gamme.'
  },
  'testing.sessionsHeader': {
    en: 'Next Designated Examination Sessions Dates:',
    fr: 'Prochaines Sessions Officielles Enregistrées :'
  },
  'testing.thExam': {
    en: 'Exam Model',
    fr: 'Examen'
  },
  'testing.thDate': {
    en: 'Official Date',
    fr: 'Date Officielle'
  },
  'testing.thDeadline': {
    en: 'Deadline Gate',
    fr: 'Clôture'
  },
  'testing.thStatus': {
    en: 'Status',
    fr: 'Statut'
  },
  'portal.title': {
    en: 'Exam Pre-Registration Portal',
    fr: 'Portail de Pré-Inscription'
  },
  'portal.desc': {
    en: 'Fill out to query session availability and download the preparation curriculum.',
    fr: 'Remplissez ce formulaire pour réserver votre place et recevoir le syllabus de préparation.'
  },
  'portal.name': {
    en: 'Your Full Name',
    fr: 'Nom & Prénom'
  },
  'portal.email': {
    en: 'Email Address',
    fr: 'Adresse E-mail'
  },
  'portal.phone': {
    en: 'WhatsApp Phone Number',
    fr: 'Numéro WhatsApp / Téléphone'
  },
  'portal.cert': {
    en: 'Target Certification',
    fr: 'Examen Choisi'
  },
  'portal.session': {
    en: 'Selected Session',
    fr: 'Session Souhaitée'
  },
  'portal.disclaimer': {
    en: 'Certified sittings take place in our Douala Bonanjo electronic testing hubs. Certified headsets and papers are issued on siting date.',
    fr: 'Les épreuves se déroulent dans nos centres numériques de Douala Bonanjo. Casques audio homologués et cahiers de test fournis le jour J.'
  },
  'portal.submit': {
    en: 'Pre-register Session Seating',
    fr: 'Valider ma Pré-inscription'
  },
  'portal.locking': {
    en: 'Locking seat...',
    fr: 'Réservation en cours...'
  },
  'receipt.badge': {
    en: 'Seat Reservation Logged',
    fr: 'Place Réservée'
  },
  'receipt.title': {
    en: 'Pre-registration Completed',
    fr: 'Pré-inscription Validée'
  },
  'receipt.hello': {
    en: 'Hello {name}, your interest regarding the {cert} session scheduled on {date} is saved.',
    fr: 'Bonjour {name}, votre demande pour la session {cert} du {date} a bien été enregistrée.'
  },
  'receipt.stepsTitle': {
    en: 'Required Action Steps for Candidate:',
    fr: 'Étapes à suivre pour finaliser :'
  },
  'receipt.step1': {
    en: 'Bring copy of National ID / Passport to our language office.',
    fr: 'Présentez une copie de votre CNI ou Passeport au secrétariat du Centre de Langues.'
  },
  'receipt.step2': {
    en: 'Settle certification slot fee via bank transfer or cashier counter.',
    fr: 'Réglez les frais officiels d\'inscription par virement bancaire ou directement à la caisse.'
  },
  'receipt.step3': {
    en: 'Unlock 4-week access credentials to the ETS electronic preparation library.',
    fr: 'Recevez sous 24h vos accès de 4 semaines à la bibliothèque numérique d\'entraînement ETS.'
  },
  'receipt.confirmAnother': {
    en: 'Confirm Another session',
    fr: 'Enregistrer une Autre Session'
  },
  'prep.badge': {
    en: 'Intensive Prep Workshops',
    fr: 'Ateliers de Préparation'
  },
  'prep.title': {
    en: 'Prestige Prep Workshops',
    fr: 'Séances de Coaching Intensif'
  },
  'prep.desc': {
    en: 'Boost your success chances with intensive target drills! Practice listening, reading, writing, and oral speech with certified instructors.',
    fr: 'Multipliez vos chances de score maximal ! Entraînez-vous à l\'écoute de bandes sonores, à l\'écriture chronométrée et aux entretiens oraux avec nos coachs.'
  },
  'prep.btn': {
    en: 'Book Prep Workshop',
    fr: 'S\'inscrire à un atelier'
  }
};

const certDefaultEn = [
  { title: "IELTS Academic", authority: "British Council", type: "Academic & General migration", price: "XAF 180,000", desc: "Gold standard for entry to British, Canadian, and Australian universities sessional gates." },
  { title: "TOEFL iBT", authority: "ETS Authorised Center", type: "Academic Computer-based sittings", price: "XAF 195,000", desc: "Rigorous internet-based testing required for US higher colleges, featuring embedded AI rating metrics." },
  { title: "TOEIC", authority: "ETS Authorised Center", type: "Professional English certifications", price: "XAF 160,000", desc: "Standard track for international corporate corporations and engineering graduates seeking global assignments." },
  { title: "TFI French", authority: "ETS Registered Center", type: "Bilingual French validation sittings", price: "XAF 145,000", desc: "Measures proficiency in French for academic and corporate entities across francophone spheres." }
];

const certDefaultFr = [
  { title: "IELTS Académique", authority: "British Council", type: "Migration & Accréditation Universitaire", price: "180 000 FCFA", desc: "Le standard absolu requis pour le Royaume-Uni, le Canada et l'Australie." },
  { title: "TOEFL iBT", authority: "Centre Agréé ETS", type: "Évaluation sur Ordinateur", price: "195 000 FCFA", desc: "Test internet requis pour les institutions américaines et canadiennes, incluant des synthèses argumentées." },
  { title: "TOEIC", authority: "Centre Agréé ETS", type: "Anglais Professionnel & International", price: "160 000 FCFA", desc: "Validation de référence mondiale pour le recrutement des ingénieurs et cadres internationaux." },
  { title: "TFI Français", authority: "Centre Enregistré ETS", type: "Français Langue Étrangère", price: "145 000 FCFA", desc: "Mesure l'aptitude et l'éloquence en français au sein des filières académiques ou corporatives." }
];

export default function LanguageView() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    certification: 'IELTS' as any,
    sessionDate: 'June 20, 2026'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedReg, setSubmittedReg] = useState<any | null>(null);
  const { locale } = useLanguage();

  const t = (key: string): string => {
    return dict[key]?.[locale] || dict[key]?.['en'] || key;
  };

  const certifications = locale === 'fr' ? certDefaultFr : certDefaultEn;

  const sessions = [
    { cert: "IELTS Academic", date: locale === 'fr' ? "20 Juin 2026" : "June 20, 2026", deadline: locale === 'fr' ? "05 Juin 2026" : "June 05, 2026", status: locale === 'fr' ? "Places Limitées" : "Compact Seats" },
    { cert: "TOEFL iBT", date: locale === 'fr' ? "12 Juillet 2026" : "July 12, 2026", deadline: locale === 'fr' ? "25 Juin 2026" : "June 25, 2026", status: locale === 'fr' ? "Ouvert" : "Open" },
    { cert: "TOEIC Professional", date: locale === 'fr' ? "05 Septembre 2026" : "September 05, 2026", deadline: locale === 'fr' ? "15 Août 2026" : "August 15, 2026", status: locale === 'fr' ? "Ouvert" : "Open" },
    { cert: "TFI French", date: locale === 'fr' ? "19 Septembre 2026" : "September 19, 2026", deadline: locale === 'fr' ? "30 Août 2026" : "August 30, 2026", status: locale === 'fr' ? "Ouvert" : "Open" }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.name || !form.email || !form.phone) {
      setError(locale === 'fr' 
        ? "Veuillez renseigner votre nom, e-mail et numéro de téléphone mobile." 
        : "Please fill out your name, email, and mobile phone number."
      );
      return;
    }

    setLoading(true);

    fetch('/api/language-regs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
      .then(res => {
        if (!res.ok) throw new Error("Could not log pre-registration.");
        return res.json();
      })
      .then(data => {
        setSubmittedReg(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(locale === 'fr' ? "Échec de l'envoi du formulaire. Veuillez réessayer." : "Network transaction failed. Please retry.");
        setLoading(false);
      });
  };

  return (
    <div id="languages-view" className="w-full">
      
      {/* ────────────────────────── PAGE BANNER HEADER ────────────────────────── */}
      <section className="bg-[#203864] pt-40 pb-44 px-6 text-center relative overflow-hidden text-white flex flex-col justify-center items-center min-h-[460px]">
        {/* Cinematic Global/Language Backdrop */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1524168272322-4a9923a13a4d?q=80&w=1600" 
            alt="International Languages & Connections" 
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

      {/* ────────────────────────── EXAMS GRID & PUBLIC SESSION TIMELINE ────────────────────────── */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Certifications details and upcoming schedules */}
          <div className="lg:col-span-7 space-y-10 text-left">
            
            <div className="space-y-3">
              <span className="text-xs font-bold tracking-wider text-brand-royal uppercase">
                {t('testing.badge')}
              </span>
              <h2 className="font-sans font-bold text-2xl md:text-3xl text-brand-navy max-w-xl">
                {t('testing.title')}
              </h2>
              <p className="text-neutral-text text-[13px] leading-relaxed">
                {t('testing.desc')}
              </p>
            </div>

            {/* Certifications cards list */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certifications.map((item, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.025, 
                    boxShadow: "0 20px 30px -8px rgba(32,56,100,0.12), 0 10px 10px -5px rgba(32,56,100,0.04)",
                    borderColor: "rgba(32,56,100,0.3)"
                  }}
                  className="bg-neutral-pearl/50 border border-neutral-border p-6 rounded-xl space-y-3 shadow-sm hover:bg-white transition-all duration-300 text-left group cursor-default"
                >
                  <div className="flex items-center justify-between border-b border-neutral-border pb-2">
                    <span className="font-sans font-bold text-sm text-brand-navy group-hover:text-brand-royal transition-colors duration-200">{item.title}</span>
                    <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 bg-brand-royal/10 text-brand-royal rounded border border-brand-royal/20 group-hover:bg-brand-royal group-hover:text-white transition-all duration-300">
                      {item.authority}
                    </span>
                  </div>
                  <p className="text-[12px] text-neutral-secondary font-medium">{item.type}</p>
                  <p className="text-[12px] text-neutral-text leading-relaxed">{item.desc}</p>
                  
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[10px] text-neutral-secondary">Fee:</span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                      {item.price}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Sessions Calendar listing */}
            <div className="space-y-4 pt-4">
              <h3 className="font-sans font-bold text-lg text-brand-navy flex items-center gap-2">
                <Clock className="w-5 h-5 text-brand-gold" />
                {t('testing.sessionsHeader')}
              </h3>
              
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="border border-neutral-border rounded-xl overflow-hidden shadow-sm bg-white"
              >
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#041424] text-white">
                    <tr>
                      <th className="p-3 font-semibold uppercase">{t('testing.thExam')}</th>
                      <th className="p-3 font-semibold uppercase">{t('testing.thDate')}</th>
                      <th className="p-3 font-semibold uppercase">{t('testing.thDeadline')}</th>
                      <th className="p-3 font-semibold uppercase">{t('testing.thStatus')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-border text-neutral-text">
                    {sessions.map((ses, idx) => (
                      <motion.tr 
                        key={idx} 
                        whileHover={{ backgroundColor: "rgba(32,56,100,0.03)", x: 2 }}
                        transition={{ duration: 0.2 }}
                        className={`transition-all duration-200 cursor-default ${idx % 2 === 0 ? 'bg-white' : 'bg-neutral-pearl/30'}`}
                      >
                        <td className="p-3 font-bold text-brand-navy flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-royal shrink-0" />
                          {ses.cert}
                        </td>
                        <td className="p-3 font-semibold text-brand-royal">{ses.date}</td>
                        <td className="p-3 text-neutral-secondary">{ses.deadline}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-amber-50 text-amber-700 border border-amber-200">
                            {ses.status}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            </div>

          </div>

          {/* Right Column: Pre-registration intake form or successful confirmation */}
          <div className="lg:col-span-5">
            
            <AnimatePresence mode="wait">
              {submittedReg ? (
                // Success Pre-registration Block
                <motion.div 
                  key="reg-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-[#041424] text-white border-2 border-brand-gold/50 rounded-2xl p-8 text-left space-y-6 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-royal text-brand-champagne flex items-center justify-center shrink-0 border border-white/20">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[8px] uppercase tracking-widest text-[#4b9fe1] border border-brand-sky/30 px-2 py-0.5 rounded font-bold">
                        {t('receipt.badge')}
                      </span>
                      <h4 className="font-sans font-bold text-lg text-white mt-1">
                        {t('receipt.title')}
                      </h4>
                    </div>
                  </div>

                  <hr className="border-t border-white/10" />

                  <p className="text-xs text-stone-300 leading-relaxed">
                    {t('receipt.hello')
                      .replace('{name}', submittedReg.name)
                      .replace('{cert}', submittedReg.certification)
                      .replace('{date}', submittedReg.sessionDate)}
                  </p>

                  <div className="space-y-3.5 bg-white/5 border border-white/10 p-4 rounded-xl text-xs">
                    <h5 className="font-sans font-bold text-brand-champagne uppercase text-[10px] tracking-wider">
                      {t('receipt.stepsTitle')}
                    </h5>

                    <div className="space-y-2.5 text-stone-200">
                      <div className="flex gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{t('receipt.step1')}</span>
                      </div>

                      <div className="flex gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{t('receipt.step2')}</span>
                      </div>

                      <div className="flex gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{t('receipt.step3')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-[10px] text-stone-400 text-center uppercase tracking-widest pb-1">
                    Receipt ID: {submittedReg.id}
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => setSubmittedReg(null)}
                    className="w-full bg-brand-royal hover:bg-brand-royal/90 text-white py-3.5 rounded-lg text-xs font-bold uppercase cursor-pointer text-center block"
                  >
                    {t('receipt.confirmAnother')}
                  </motion.button>
                </motion.div>
              ) : (
                // Pre-registration Form
                <motion.div 
                  key="reg-form"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  whileHover={{ y: -4, boxShadow: "0 20px 40px -15px rgba(32,56,100,0.12)" }}
                  className="bg-white border border-neutral-border rounded-xl p-6 md:p-8 text-left shadow-md space-y-6 transition-all duration-300"
                >
                  <div className="border-b border-gray-100 pb-3">
                    <h3 className="font-sans font-bold text-lg text-brand-navy">
                      {t('portal.title')}
                    </h3>
                    <p className="text-neutral-secondary text-xs mt-1">
                      {t('portal.desc')}
                    </p>
                  </div>

                  {error && (
                    <div className="bg-rose-50 border border-status-error/40 text-status-error p-3.5 rounded-lg flex items-start gap-2 text-xs">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}

                  <form onSubmit={handleRegister} className="space-y-4">
                    
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-brand-navy flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-neutral-secondary" />
                        {t('portal.name')} <span className="text-rose-500">*</span>
                      </label>
                      <input 
                        type="text"
                        required
                        name="name"
                        placeholder="e.g. Jean-Pierre Tchakounté"
                        value={form.name}
                        onChange={handleInputChange}
                        className="w-full border border-neutral-border rounded-lg px-3.5 py-2.5 text-xs md:text-sm hover:border-neutral-secondary/60 focus:border-brand-royal focus:ring-2 focus:ring-brand-royal/10 outline-none transition-all duration-200"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-brand-navy flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-neutral-secondary" />
                        {t('portal.email')} <span className="text-rose-500">*</span>
                      </label>
                      <input 
                        type="email"
                        required
                        name="email"
                        placeholder="e.g. jp_tchako@yahoo.fr"
                        value={form.email}
                        onChange={handleInputChange}
                        className="w-full border border-neutral-border rounded-lg px-3.5 py-2.5 text-xs md:text-sm hover:border-neutral-secondary/60 focus:border-brand-royal focus:ring-2 focus:ring-brand-royal/10 outline-none transition-all duration-200"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-brand-navy flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-neutral-secondary" />
                        {t('portal.phone')} <span className="text-rose-500">*</span>
                      </label>
                      <input 
                        type="tel"
                        required
                        name="phone"
                        placeholder="e.g. +237 691 550 439"
                        value={form.phone}
                        onChange={handleInputChange}
                        className="w-full border border-neutral-border rounded-lg px-3.5 py-2.5 text-xs md:text-sm hover:border-neutral-secondary/60 focus:border-brand-royal focus:ring-2 focus:ring-brand-royal/10 outline-none transition-all duration-200"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-brand-navy font-medium">
                          {t('portal.cert')}
                        </label>
                        <select 
                          name="certification"
                          value={form.certification}
                          onChange={handleInputChange}
                          className="w-full border border-neutral-border bg-white rounded-lg px-3 py-2 text-xs focus:border-brand-royal focus:ring-2 focus:ring-brand-royal/10 outline-none transition-all duration-200 font-sans"
                        >
                          <option value="IELTS">IELTS Academic (IDP/BC)</option>
                          <option value="TOEFL">TOEFL iBT (ETS)</option>
                          <option value="TOEIC">TOEIC (ETS Professional)</option>
                          <option value="TFI">TFI French Certification</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-brand-navy font-medium">
                          {t('portal.session')}
                        </label>
                        <select 
                          name="sessionDate"
                          value={form.sessionDate}
                          onChange={handleInputChange}
                          className="w-full border border-neutral-border bg-white rounded-lg px-3 py-2 text-xs focus:border-brand-royal focus:ring-2 focus:ring-brand-royal/10 outline-none transition-all duration-200 font-sans"
                        >
                          <option value="June 20, 2026">June 20, 2026</option>
                          <option value="July 12, 2026">July 12, 2026</option>
                          <option value="September 05, 2026">September 05, 2026</option>
                          <option value="September 19, 2026">September 19, 2026</option>
                        </select>
                      </div>
                    </div>

                    <div className="bg-neutral-pearl/60 border border-neutral-border/50 p-3 rounded-lg text-[10px] text-neutral-secondary leading-normal flex items-start gap-1.5 font-sans">
                      <Building2 className="w-3.5 h-3.5 text-brand-gold shrink-0 mt-0.5" />
                      <span>{t('portal.disclaimer')}</span>
                    </div>

                    <motion.button 
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.015, backgroundColor: "#1e335b", boxShadow: "0 10px 20px -5px rgba(32,56,100,0.3)" }}
                      whileTap={{ scale: 0.985 }}
                      className="w-full bg-brand-royal disabled:bg-slate-400 text-white font-semibold py-3 rounded-lg text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-colors duration-200 font-accent"
                    >
                      {loading ? t('portal.locking') : t('portal.submit')}
                      <Send className="w-3.5 h-3.5 text-white" />
                    </motion.button>

                  </form>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>
      </section>

      {/* ────────────────────────── MINI HERO ACTION BANNER (PREPARATORY WORKSHOPS) ────────────────────────── */}
      <section className="bg-neutral-pearl py-12 px-4 border-t border-neutral-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="relative bg-brand-navy rounded-3xl overflow-hidden py-12 px-8 md:px-16 text-left text-white shadow-xl border border-white/10 group"
          >
            {/* Unsplash Background Image with zoom / pan effect on hover */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200" 
                alt="Intensive prep workshops banner" 
                className="w-full h-full object-cover opacity-25 group-hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/90 to-transparent" />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center font-sans">
              <div className="lg:col-span-8 space-y-4">
                <span className="inline-flex items-center gap-1.5 bg-brand-gold/20 border border-brand-gold/40 px-3 py-1 rounded-full text-[10px] md:text-xs font-semibold uppercase tracking-wider text-brand-champagne">
                  <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-pulse" />
                  {t('prep.badge')}
                </span>
                <h3 className="font-serif font-bold text-2xl md:text-3.5xl text-white leading-tight">
                  {t('prep.title')}
                </h3>
                <p className="text-stone-200 text-xs md:text-sm leading-relaxed max-w-2xl font-sans">
                  {t('prep.desc')}
                </p>
              </div>
              <div className="lg:col-span-4 flex justify-start lg:justify-end">
                <motion.button 
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 20px -5px rgba(255, 192, 0, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const formEl = document.getElementById('languages-view');
                    if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-[#FFC000] hover:bg-[#FFC000]/95 text-brand-navy font-bold text-xs px-6 py-3.5 rounded-xl uppercase tracking-wider flex items-center gap-2 shadow-lg transition-colors cursor-pointer"
                >
                  <GraduationCap className="w-4 h-4 text-brand-navy" />
                  {t('prep.btn')}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
