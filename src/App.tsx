/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import ProgrammesView from './components/ProgrammesView';
import AdmissionsView from './components/AdmissionsView';
import LifeView from './components/LifeView';
import LanguageView from './components/LanguageView';
import AbroadView from './components/AbroadView';
import ContactView from './components/ContactView';
import AdminPortal from './components/AdminPortal';
import ChatbotWidget from './components/ChatbotWidget';
import { User, NewsItem, GalleryItem, Testimonial, PartnerUniversity, Teacher, FaqItem, ProgramInfo } from './types';
import { FALLBACK_NEWS, FALLBACK_GALLERY, FALLBACK_TESTIMONIALS, FALLBACK_PARTNERS, FALLBACK_TEACHERS, FALLBACK_FAQS, FALLBACK_PROGRAMS } from './fallbackData';
import { Landmark, Phone, Mail, Clock, Eye, Lock } from 'lucide-react';
import { useLanguage } from './context/LanguageContext';

export default function App() {
  const { locale, t } = useLanguage();
  const [currentView, setCurrentView] = useState<'home' | 'about' | 'programmes' | 'admissions' | 'life' | 'language' | 'abroad' | 'contact'>('home');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [currentActor, setCurrentActor] = useState<User | null>(null);

  // States to feed to elements for instant paint initialized with high fidelity fallbacks
  const [news, setNews] = useState<NewsItem[]>(FALLBACK_NEWS);
  const [gallery, setGallery] = useState<GalleryItem[]>(FALLBACK_GALLERY);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(FALLBACK_TESTIMONIALS);
  const [partners, setPartners] = useState<PartnerUniversity[]>(FALLBACK_PARTNERS);
  const [teachers, setTeachers] = useState<Teacher[]>(FALLBACK_TEACHERS);
  const [faqs, setFaqs] = useState<FaqItem[]>(FALLBACK_FAQS);
  const [programs, setPrograms] = useState<ProgramInfo[]>(FALLBACK_PROGRAMS);

  // Fetch lists on App boot
  useEffect(() => {
    fetch('/api/news')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setNews(data);
      })
      .catch(err => console.warn("Could not fetch news sills during app loading, falling back:", err));

    fetch('/api/gallery')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setGallery(data);
      })
      .catch(err => console.warn("Could not fetch gallery during app loading, falling back:", err));

    fetch('/api/testimonials')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setTestimonials(data);
      })
      .catch(err => console.warn("Could not fetch testimonials during app loading, falling back:", err));

    fetch('/api/partners')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setPartners(data);
      })
      .catch(err => console.warn("Could not fetch partners during app loading, falling back:", err));

    fetch('/api/teachers')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setTeachers(data);
      })
      .catch(err => console.warn("Could not fetch teachers during app loading, falling back:", err));

    fetch('/api/faq')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setFaqs(data);
      })
      .catch(err => console.warn("Could not fetch faq during app loading, falling back:", err));

    fetch('/api/programs')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setPrograms(data);
      })
      .catch(err => console.warn("Could not fetch programs during app loading, falling back:", err));
  }, []);

  const handleLoginSuccess = (user: User) => {
    setIsAdminLoggedIn(true);
    setCurrentActor(user);
    // Reload database instances inside dashboard immediately
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setCurrentActor(null);
  };

  // Render core views
  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView testimonials={testimonials} programs={programs} setTab={(view) => setCurrentView(view as any)} />;
      case 'about':
        return <AboutView teachers={teachers} />;
      case 'programmes':
        return <ProgrammesView programs={programs} setTab={(view) => setCurrentView(view as any)} />;
      case 'admissions':
        return <AdmissionsView />;
      case 'life':
        return <LifeView gallery={gallery} news={news} />;
      case 'language':
        return <LanguageView />;
      case 'abroad':
        return <AbroadView partners={partners} />;
      case 'contact':
        return <ContactView faq={faqs} />;
      default:
        return <HomeView testimonials={testimonials} programs={programs} setTab={(view) => setCurrentView(view as any)} />;
    }
  };

  return (
    <div id="rousseau-app" className="min-h-screen bg-neutral-pearl flex flex-col justify-between text-brand-navy">
      
      {/* Dynamic Header Navbar widget */}
      <Navbar currentTab={currentView} setTab={setCurrentView} onOpenAdmin={() => setIsAdminOpen(true)} isAdminLoggedIn={isAdminLoggedIn} onLogoutAdmin={handleLogout} />

      {/* Primary Dynamic page canvas viewport */}
      <main className="flex-1 w-full bg-white">
        {renderView()}
      </main>

      {/* ────────────────────────── CORPORATE EXCELLENCE FOOTER ────────────────────────── */}
      <footer className="bg-brand-navy text-white pt-16 pb-8 border-t border-brand-gold/15 select-none relative overflow-hidden text-xs text-left">
        <div 
          className="absolute inset-0 bg-repeat opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
            backgroundSize: '25px 25px'
          }}
        />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 relative z-10">
          
          {/* Logo brand */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white text-brand-navy flex items-center justify-center font-bold text-sm tracking-widest shadow-lg border border-brand-gold/10">
                RIS
              </div>
              <div>
                <h3 className="font-sans font-bold text-sm text-brand-champagne tracking-wider">ROUSSEAU</h3>
                <span className="text-[10px] text-brand-sky font-bold block tracking-widest uppercase">
                  International School
                </span>
              </div>
            </div>

            <p className="text-stone-350 leading-relaxed text-[12px] max-w-sm">
              {t('footer.desc')}
            </p>

            <span className="text-[9px] uppercase font-mono tracking-widest text-[#4b9fe1] block pt-1 font-bold flex items-center gap-1 bg-white/5 px-2 py-1 rounded w-fit">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FFC000] animate-pulse" />
              {t('indicator.authorizedHost')}
            </span>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="font-sans font-bold text-xs text-brand-champagne uppercase tracking-widest border-b border-white/5 pb-2">
              {t('footer.portals')}
            </h4>
            <ul className="space-y-2 text-[12px] font-sans">
              <li>
                <button onClick={() => setCurrentView('programmes')} className="text-stone-350 hover:text-brand-sky transition-colors cursor-pointer text-left">
                  {t('footer.curriculum')}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('admissions')} className="text-stone-350 hover:text-brand-sky transition-colors cursor-pointer text-left">
                  {t('footer.applyIntake')}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('language')} className="text-stone-350 hover:text-brand-sky transition-colors cursor-pointer text-left">
                  {t('footer.languageCert')}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('abroad')} className="text-stone-350 hover:text-brand-sky transition-colors cursor-pointer text-left">
                  {t('footer.counseling')}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('life')} className="text-stone-350 hover:text-brand-sky transition-colors cursor-pointer text-left">
                  {t('footer.journal')}
                </button>
              </li>
            </ul>
          </div>

          {/* Location coordinates */}
          <div className="lg:col-span-5 space-y-3.5">
            <h4 className="font-sans font-bold text-xs text-brand-champagne uppercase tracking-widest border-b border-white/5 pb-2">
              {t('footer.coordinates')}
            </h4>
            <div className="space-y-3.5 text-stone-350 text-[12px] leading-relaxed">
              <div className="flex items-start gap-2.5">
                <Landmark className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <span>Rue des Gouverneurs, Bonanjo Administrative District, Douala, Cameroon</span>
              </div>

              <div className="flex items-start gap-2.5 font-mono">
                <Phone className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <span>+237 696 001 685 (WhatsApp Desk) / +237 233 441 559</span>
              </div>

              <div className="flex items-start gap-2.5 font-mono">
                <Mail className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <span>admissions@rousseauinternational.org</span>
              </div>
            </div>
          </div>

        </div>

        <hr className="border-t border-white/5 max-w-7xl mx-auto my-10" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between text-[11px] text-stone-350 gap-4">
          <span>{t('footer.allRights')}</span>
          <div className="flex items-center gap-6">
            <span>{t('footer.prestataire')}: Emmanuel Nya</span>
            <button 
              onClick={() => setIsAdminOpen(true)}
              className="text-brand-gold hover:text-brand-gold/80 font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer border border-brand-gold/30 px-3 py-1 bg-white/5 rounded"
            >
              <Lock className="w-3.5 h-3.5" />
              {t('btn.staffPortal')}
            </button>
          </div>
        </div>
      </footer>

      {/* Chatbot Assistant */}
      <ChatbotWidget onNavigate={(tab) => setCurrentView(tab)} />

      {/* Full screen administration workspace container overlay */}
      <AnimatePresence>
        {isAdminOpen && (
          <AdminPortal 
            onClose={() => setIsAdminOpen(false)}
            isAdminLoggedIn={isAdminLoggedIn}
            onLoginSuccess={handleLoginSuccess}
            onLogout={handleLogout}
            currentActor={currentActor}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
