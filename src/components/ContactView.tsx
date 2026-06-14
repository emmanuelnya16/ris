/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, Phone, MapPin, Clock, Send, AlertCircle, HelpCircle, 
  MessageSquare, ChevronDown, CheckCircle, Info, Landmark, GraduationCap 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translateFaq } from '../translationHelpers';
import { FaqItem } from '../types';

interface ContactViewProps {
  faq: FaqItem[];
}

const dict: Record<string, { en: string; fr: string }> = {
  'hero.badge': {
    en: 'Get In Touch',
    fr: 'Nous Contacter'
  },
  'hero.title': {
    en: 'Connect With Our Admissions Board',
    fr: 'Contactez Notre Comité des Admissions'
  },
  'hero.desc': {
    en: 'Get direct communication details regarding our physical campus location in Douala Bonanjo, or resolve immediate queries below.',
    fr: 'Obtenez les coordonnées directes de notre campus situé à Douala Bonanjo, ou envoyez-nous votre message ci-dessous.'
  },
  'coord.badge': {
    en: 'Primary Coordinates',
    fr: 'Nos Coordonnées'
  },
  'coord.title': {
    en: 'Corporate Office, Telephone & Sessional Hours',
    fr: 'Bureaux, Secrétariat & Horaires de Réception'
  },
  'coord.desc': {
    en: 'Admissions desk sittings remain open throughout weekday intervals to accommodate sessional requirements.',
    fr: 'Le secrétariat des admissions reste ouvert en semaine pour enregistrer vos dossiers scolaires.'
  },
  'coord.locationTitle': {
    en: 'Physical Campus Location',
    fr: 'Adresse de Notre Campus'
  },
  'coord.locationDesc': {
    en: 'Rue des Gouverneurs, Bonanjo Administrative District, B.P. 1445, Douala, Cameroon (Secure elite residential sector)',
    fr: 'Rue des Gouverneurs, Quartier Administratif de Bonanjo, B.P. 1445, Douala, Cameroun (Secteur résidentiel sécurisé)'
  },
  'coord.phoneTitle': {
    en: 'Registrar Sessional Hotlines',
    fr: 'Téléphones & WhatsApp du Secrétariat'
  },
  'coord.emailTitle': {
    en: 'Electronic Admissions Desks',
    fr: 'Adresses E-mail Officielles'
  },
  'coord.hoursTitle': {
    en: 'Office Working Hours',
    fr: 'Heures d\'Ouverture'
  },
  'coord.hoursDesc': {
    en: 'Monday — Friday: 08:00 AM — 04:30 PM | Saturday morning: 09:00 AM — 12:30 PM',
    fr: 'Lundi — Vendredi : 08h00 — 16h30 | Samedi matin : 09h00 — 12h30'
  },
  'map.badge': {
    en: 'Bonanjo District Compass Vector',
    fr: 'Plan d\'Accès du Quartier de Bonanjo'
  },
  'map.disclaimer': {
    en: 'Bonanjo is Douala’s secure primary financial administrative district. 24/7 security protocol is observed.',
    fr: 'Le quartier administratif de Bonanjo est hautement sécurisé à Douala. Protocole de garde actif 24h/24.'
  },
  'map.label1': {
    en: 'Opposite French Consular Cabinet Sessional sittings',
    fr: 'En face du Consulat Général de France'
  },
  'map.label2': {
    en: 'Rue des Gouverneurs Administrative Security Gate',
    fr: 'Entrée sécurisée Rue des Gouverneurs'
  },
  'form.title': {
    en: 'Request Callback / Academic Inquiry',
    fr: 'Formuler une Demande de Renseignements'
  },
  'form.desc': {
    en: 'Connect with general administration sessional officers. We return all calls within 24 business hours.',
    fr: 'Écrivez à nos conseillers d\'orientation. Nous vous répondons sous un délai maximum de 24 heures.'
  },
  'form.successTitle': {
    en: 'Inquiry Message Logged',
    fr: 'Message Transmis avec Succès'
  },
  'form.successDesc': {
    en: 'Your question has been routed over to the Rousseau group registrar pool. A confirmation receipt is dispatched to your email details.',
    fr: 'Votre question a été transmise à notre secrétariat. Un accusé de réception vous a été envoyé par e-mail.'
  },
  'form.anotherBtn': {
    en: 'Send Another Question',
    fr: 'Envoyer une Autre Question'
  },
  'form.name': {
    en: 'Your Full Name',
    fr: 'Nom Complet'
  },
  'form.email': {
    en: 'Email Address',
    fr: 'Adresse E-mail'
  },
  'form.subject': {
    en: 'General Subject / curriculum tracks Goal',
    fr: 'Sujet / Classe & Parcours Souhaité'
  },
  'form.message': {
    en: 'Detailed Message Text',
    fr: 'Texte Détaillé de Votre Message'
  },
  'form.messagePlaceholder': {
    en: 'Please write down your children academic goals...',
    fr: 'Décrivez brièvement les objectifs académiques de votre enfant...'
  },
  'form.submitBtn': {
    en: 'Send Secure Message',
    fr: 'Envoyer Mon Message Sécurisé'
  },
  'form.submittingText': {
    en: 'Transmitting...',
    fr: 'Envoi en cours...'
  },
  'faq.badge': {
    en: 'Direct Resolution',
    fr: 'Résolution Directe'
  },
  'faq.title': {
    en: 'Frequently Queried Admissions FAQ',
    fr: 'Questions Fréquemment Posées'
  },
  'faq.desc': {
    en: 'Resolve immediate questions related to international credentials, exams center licensing, and credit transfers.',
    fr: 'Trouvez ici les réponses immédiates à propos des équivalences scolaires, examens et transferts de crédits.'
  }
};

export default function ContactView({ faq: propFaq }: ContactViewProps) {
  const [faqs, setFaqs] = useState<FaqItem[]>(propFaq);
  const [activeFaqId, setActiveFaqId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { locale } = useLanguage();

  const t = (key: string): string => {
    return dict[key]?.[locale] || dict[key]?.['en'] || key;
  };

  useEffect(() => {
    // Dynamic loading of FAQs from the Express server API
    fetch('/api/faq')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setFaqs(data.filter(f => f.active));
        }
      })
      .catch(err => console.error("Error loading faq, using defaults:", err));
  }, [propFaq]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!form.name || !form.email || !form.message) {
      setError(locale === 'fr' 
        ? "Veuillez renseigner votre nom, votre e-mail et votre message." 
        : "Please fill out name, email, and message."
      );
      return;
    }

    setLoading(true);

    // Simulate sending contact message
    setTimeout(() => {
      setSuccess(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      setLoading(false);
    }, 1200);
  };

  // Translate each FAQ statically or dynamically
  const translatedFaqs = faqs.map(item => translateFaq(item, locale));

  return (
    <div id="contact-view" className="w-full">
      
      {/* ────────────────────────── PAGE BANNER HEADER ────────────────────────── */}
      <section className="bg-[#203864] pt-40 pb-44 px-6 text-center relative overflow-hidden text-white flex flex-col justify-center items-center min-h-[460px]">
        {/* Cinematic Administration Backdrop */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600" 
            alt="RIS Campus Administration Headquarters" 
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

      {/* ────────────────────────── CONTACT DETAILS & INTERACTIVE VECTOR MAP ────────────────────────── */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Communication Cards with custom icons */}
          <div className="lg:col-span-5 space-y-8 text-left">
            
            <div className="space-y-3">
              <span className="text-xs font-bold tracking-wider text-[#203864] uppercase block font-accent">
                {t('coord.badge')}
              </span>
              <h3 className="font-serif font-bold text-xl md:text-2xl text-[#203864]">
                {t('coord.title')}
              </h3>
              <p className="text-neutral-text text-[13px] leading-relaxed">
                {t('coord.desc')}
              </p>
            </div>

            {/* Direct Cards */}
            <div className="space-y-4 font-sans text-xs">
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                whileHover={{ x: 6, scale: 1.01 }}
                className="flex gap-4 p-4 rounded-xl border border-neutral-border/60 hover:border-brand-royal/30 transition-all bg-white text-left"
              >
                <div className="w-10 h-10 rounded bg-blue-50 text-brand-royal flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 animate-bounce text-[#203864]" />
                </div>
                <div>
                  <h4 className="font-bold text-brand-navy text-[13px]">{t('coord.locationTitle')}</h4>
                  <p className="text-neutral-secondary text-[12px] mt-0.5 leading-snug">
                    {t('coord.locationDesc')}
                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.05 }}
                whileHover={{ x: 6, scale: 1.01 }}
                className="flex gap-4 p-4 rounded-xl border border-neutral-border/60 hover:border-brand-royal/30 transition-all bg-white text-left"
              >
                <div className="w-10 h-10 rounded bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-bold text-brand-navy text-[13px]">{t('coord.phoneTitle')}</h4>
                  <p className="text-neutral-secondary text-[12px] mt-0.5 font-mono">
                    WhatsApp: +237 696 001 685<br />
                    Tél. Desk: +237 233 441 559
                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                whileHover={{ x: 6, scale: 1.01 }}
                className="flex gap-4 p-4 rounded-xl border border-neutral-border/60 hover:border-brand-royal/30 transition-all bg-white text-left"
              >
                <div className="w-10 h-10 rounded bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-bold text-brand-navy text-[13px]">{t('coord.emailTitle')}</h4>
                  <p className="text-neutral-secondary text-[12px] mt-0.5 font-mono">
                    admissions@rousseauinternational.org<br />
                    fidele.kengne@rousseauinternational.org
                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.15 }}
                whileHover={{ x: 6, scale: 1.01 }}
                className="flex gap-4 p-4 rounded-xl border border-neutral-border/60 hover:border-brand-royal/30 transition-all bg-white text-left"
              >
                <div className="w-10 h-10 rounded bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-bold text-brand-navy text-[13px]">{t('coord.hoursTitle')}</h4>
                  <p className="text-neutral-secondary text-[12px] mt-0.5 leading-tight">
                    {t('coord.hoursDesc')}
                  </p>
                </div>
              </motion.div>

            </div>

            {/* Custom stylized vector layout map representing Bonanjo */}
            <div className="bg-[#041424] text-white p-5 rounded-2xl border border-white/10 space-y-3.5 relative overflow-hidden">
               <div className="absolute right-0 top-0 w-20 h-20 bg-[#203864]/15 rounded-full blur-xl pointer-events-none" />
              
              <div className="flex items-center gap-2 text-brand-gold text-xs font-semibold uppercase tracking-wider">
                <Landmark className="w-4 h-4 shrink-0 text-[#FFC000]" />
                <span>{t('map.badge')}</span>
              </div>

              {/* Styled interactive SVG map */}
              <div className="aspect-[4/3] w-full bg-[#12213D] border border-white/5 rounded-xl relative p-4 flex flex-col justify-between text-[11px] overflow-hidden select-none">
                
                {/* Simulated streets lines drawing */}
                <div className="absolute inset-x-o top-1/3 h-[2px] bg-white/5 transform -rotate-12" />
                <div className="absolute inset-x-o top-2/3 h-[2px] bg-white/5 transform rotate-6" />
                <div className="absolute left-1/3 inset-y-o w-[2px] bg-white/5 transform -rotate-12" />
                <div className="absolute left-2/3 inset-y-o w-[2px] bg-white/5 transform rotate-12" />

                <div className="relative z-10 flex justify-between">
                  <span className="text-stone-500 font-mono">NORTH / WAFI STREET</span>
                  <span className="text-stone-500 text-right pr-2">GULF SECTOR</span>
                </div>

                <div className="relative z-10 flex items-center justify-center py-8">
                  {/* The actual school location node */}
                  <div className="relative w-8 h-8">
                    <div className="absolute inset-0 bg-[#FFC000]/40 rounded-full animate-ping w-8 h-8" />
                    <div className="w-12 h-12 rounded-xl bg-[#203864] border-2 border-[#FFC000] flex flex-col items-center justify-center font-sans font-extrabold text-[#FFC000] text-[11px] text-center tracking-wider shadow-xl relative z-10 -left-2 -top-2">
                      <span>RIS</span>
                      <span className="text-[6px] text-white leading-none">ROOTS</span>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 flex flex-col gap-1.5 text-stone-300 font-sans text-[10px]">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 bg-[#FFC000] rounded shrink-0" />
                    <span>{t('map.label1')}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 bg-sky-200 rounded shrink-0" />
                    <span>{t('map.label2')}</span>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-stone-400 leading-normal text-center">
                {t('map.disclaimer')}
              </p>
            </div>

          </div>

          {/* Right: Interactive feedback contact Form */}
          <div className="lg:col-span-7">
            
            <div className="bg-white border border-neutral-border rounded-xl p-6 md:p-8 text-left shadow-md space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <h3 className="font-sans font-bold text-lg text-[#203864] flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#FFC000]" />
                  {t('form.title')}
                </h3>
                <p className="text-neutral-secondary text-xs mt-1">
                  {t('form.desc')}
                </p>
              </div>

              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div 
                    key="contact-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-emerald-50 border border-emerald-300 p-6 rounded-xl space-y-4 text-left"
                  >
                    <div className="flex gap-3">
                      <CheckCircle className="w-6 h-6 text-emerald-600 mt-0.5 shrink-0" />
                      <div>
                        <h4 className="font-sans font-bold text-emerald-800 text-base">{t('form.successTitle')}</h4>
                        <p className="text-emerald-700 text-xs mt-0.5 leading-relaxed">
                          {t('form.successDesc')}
                        </p>
                      </div>
                    </div>

                    <button 
                      onClick={() => setSuccess(false)}
                      className="bg-[#203864] text-white text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer hover:bg-[#203864]/95"
                    >
                      {t('form.anotherBtn')}
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSendMessage} className="space-y-4 text-left">
                    
                    {error && (
                      <div className="bg-rose-50 border border-status-error/30 text-status-error p-3 rounded-lg text-xs flex items-center gap-2 text-rose-700">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{error}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-brand-navy">
                          {t('form.name')} <span className="text-rose-500">*</span>
                        </label>
                        <input 
                          type="text"
                          required
                          name="name"
                          placeholder="e.g. Emmanuel Nya"
                          value={form.name}
                          onChange={handleInputChange}
                          className="w-full border border-neutral-border rounded-lg px-3.5 py-2.5 text-xs focus:border-brand-royal outline-none font-sans"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-brand-navy">
                          {t('form.email')} <span className="text-rose-500">*</span>
                        </label>
                        <input 
                          type="email"
                          required
                          name="email"
                          placeholder="e.g. emmnauelnya16@gmail.com"
                          value={form.email}
                          onChange={handleInputChange}
                          className="w-full border border-neutral-border rounded-lg px-3.5 py-2.5 text-xs focus:border-brand-royal outline-none font-sans"
                        />
                      </div>

                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-brand-navy">
                        {t('form.subject')}
                      </label>
                      <input 
                        type="text"
                        name="subject"
                        placeholder="e.g. Year 11 entry requirements"
                        value={form.subject}
                        onChange={handleInputChange}
                        className="w-full border border-neutral-border rounded-lg px-3.5 py-2.5 text-xs focus:border-[#203864] outline-none font-sans"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#203864]">
                        {t('form.message')} <span className="text-rose-500">*</span>
                      </label>
                      <textarea 
                        rows={4}
                        required
                        name="message"
                        placeholder={t('form.messagePlaceholder')}
                        value={form.message}
                        onChange={handleInputChange}
                        className="w-full border border-neutral-border rounded-lg px-3.5 py-2.5 text-xs focus:border-[#203864] outline-none font-sans"
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#203864] hover:bg-[#203864]/95 text-white py-3 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-sm font-accent text-[#FFC000]"
                    >
                      {loading ? t('form.submittingText') : t('form.submitBtn')}
                      <Send className="w-3.5 h-3.5 text-white" />
                    </button>

                  </form>
                )}
              </AnimatePresence>

            </div>

          </div>

        </div>
      </section>

      {/* ────────────────────────── ACCORDION DETAILED FAQs SECTION ────────────────────────── */}
      <section className="bg-neutral-pearl py-16 px-4 border-t border-neutral-border">
        <div className="max-w-4xl mx-auto space-y-8 text-left">
          
          <div className="space-y-2 text-center">
            <span className="text-xs font-bold tracking-widest text-[#203864] uppercase block font-accent">
              {t('faq.badge')}
            </span>
            <h2 className="font-serif font-bold text-2xl md:text-3xl text-[#203864]">
              {t('faq.title')}
            </h2>
            <p className="text-neutral-secondary text-xs">
              {t('faq.desc')}
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-3.5">
            {translatedFaqs.map((f) => {
              const isOpen = activeFaqId === f.id;
              return (
                <div 
                  key={f.id}
                  className="bg-white border border-neutral-border rounded-xl overflow-hidden shadow-sm transition-all duration-200"
                >
                  <button
                    onClick={() => setActiveFaqId(isOpen ? null : f.id)}
                    className="w-full p-5 flex items-center justify-between text-left font-sans font-bold text-[#041424] text-xs md:text-sm hover:text-brand-royal transition-colors outline-none cursor-pointer select-none"
                  >
                    <span className="flex items-center gap-2.5 font-sans">
                      <HelpCircle className="w-4 h-4 text-brand-gold shrink-0 text-[#FFC000]" />
                      {f.question}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-neutral-secondary transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-[#203864]' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-1 text-xs md:text-[13px] text-neutral-text leading-relaxed border-t border-gray-100 flex items-start gap-2 select-text font-sans">
                          <Info className="w-4 h-4 text-brand-sky shrink-0 mt-0.5" />
                          <span>{f.answer}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
}
