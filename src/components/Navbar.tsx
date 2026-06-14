/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Landmark, GraduationCap, ShieldAlert, Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import logo2 from "../../assets/image.png"

interface NavbarProps {
  currentTab: string;
  setTab: (tab: string) => void;
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
  onLogoutAdmin: () => void;
}

export default function Navbar({ currentTab, setTab, onOpenAdmin, isAdminLoggedIn, onLogoutAdmin }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { locale, setLocale, t } = useLanguage();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: t('nav.home') },
    { id: 'about', label: t('nav.about') },
    { id: 'programmes', label: t('nav.programmes') },
    { id: 'admissions', label: t('nav.admissions') },
    { id: 'life', label: t('nav.life') },
    { id: 'language', label: t('nav.language') },
    { id: 'abroad', label: t('nav.abroad') },
    { id: 'contact', label: t('nav.contact') }
  ];

  const handleLinkClick = (tabId: string) => {
    setTab(tabId);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header 
      id="main-navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 flex items-center ${
        scrolled 
          ? 'h-[64px] bg-white shadow-md border-b border-neutral-100/90' 
          : 'h-[80px] bg-[#203864]/25 backdrop-blur-md border-b border-white/10'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Logo Section */}
                <div 
          id="nav-logo" 
          onClick={() => handleLinkClick('home')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className={`w-55 h-40 rounded-lg flex items-center justify-center font-bold text-sm tracking-wider transition-all duration-350`}>
            <img src={logo2} alt="" className='w-50 h-15' />
          </div>
          
        </div>

        {/* Desktop Links (Title Case, soft hover capsules) */}
        <nav id="desktop-nav" className={`hidden lg:flex items-center gap-0.5 xl:gap-1 bg-white/5 p-0.5 rounded-full border transition-all duration-350 ${
          scrolled ? 'bg-neutral-100/80 border-neutral-200/40' : 'bg-white/10 border-white/10 backdrop-blur-sm'
        }`}>
          {navLinks.map((link) => (
            <div key={link.id} className="relative">
              <button
                onClick={() => handleLinkClick(link.id)}
                className={`transition-all duration-300 text-[11px] xl:text-[12px] font-accent font-bold px-2.5 xl:px-3.5 py-1.5 rounded-full cursor-pointer whitespace-nowrap ${
                  currentTab === link.id 
                    ? 'text-[#203864] bg-[#FFC000] shadow-sm' 
                    : (scrolled ? 'text-neutral-600 hover:text-[#203864] hover:bg-neutral-200/50' : 'text-white/90 hover:text-[#FFC000] hover:bg-white/10')
                }`}
              >
                {link.label}
              </button>
            </div>
          ))}
        </nav>

        {/* CTAs on Right */}
        <div className="hidden lg:flex items-center gap-3.5">
          {/* Stunning Language Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-accent font-extrabold cursor-pointer transition-all duration-300 ${
                scrolled 
                  ? 'bg-neutral-50 hover:bg-neutral-100 border-neutral-200/80 text-[#203864]' 
                  : 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-[#FFC000]" />
              <span>{locale === 'en' ? 'EN' : locale === 'fr' ? 'FR' : 'AR'}</span>
              <ChevronDown className={`w-3 h-3 transition-transform duration-250 ${langDropdownOpen ? 'rotate-180' : ''}`} />
            </button>


            <AnimatePresence>
              {langDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-32 bg-white border border-neutral-200 rounded-xl shadow-lg py-1.5 z-50 overflow-hidden"
                >
                  <button
                    onClick={() => {
                      setLocale('en');
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-xs font-bold font-sans flex items-center justify-between transition-colors cursor-pointer ${
                      locale === 'en' 
                        ? 'bg-[#203864] text-[#FFC000]' 
                        : 'text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    <span>English (EN)</span>
                    {locale === 'en' && <span className="w-1.5 h-1.5 rounded-full bg-[#FFC000]" />}
                  </button>
                  <button
                    onClick={() => {
                      setLocale('fr');
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-xs font-bold font-sans flex items-center justify-between transition-colors cursor-pointer ${
                      locale === 'fr' 
                        ? 'bg-[#203864] text-[#FFC000]' 
                        : 'text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    <span>Français (FR)</span>
                    {locale === 'fr' && <span className="w-1.5 h-1.5 rounded-full bg-[#FFC000]" />}
                  </button>
                  <button
                    onClick={() => {
                      setLocale('ar');
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-xs font-bold font-sans flex items-center justify-between transition-colors cursor-pointer ${
                      locale === 'ar' 
                        ? 'bg-[#203864] text-[#FFC000]' 
                        : 'text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    <span>العربية (AR)</span>
                    {locale === 'ar' && <span className="w-1.5 h-1.5 rounded-full bg-[#FFC000]" />}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {isAdminLoggedIn && (
            <div className="flex items-center gap-2">
              <button 
                onClick={onOpenAdmin}
                className={`text-[11px] font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 border transition-all cursor-pointer ${
                  scrolled 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-250/50 hover:bg-emerald-100' 
                    : 'bg-emerald-500/10 text-emerald-405 border-emerald-500/20 hover:bg-emerald-500/20'
                }`}
              >
                <Landmark className="w-3.5 h-3.5" />
                {t('btn.portal')}
              </button>
              <button 
                onClick={onLogoutAdmin}
                className={`text-[11px] font-medium cursor-pointer ${
                  scrolled ? 'text-neutral-500 hover:text-neutral-800' : 'text-white/60 hover:text-white'
                }`}
              >
                {t('btn.logout')}
              </button>
            </div>
          )}
 
          <button 
            onClick={() => handleLinkClick('admissions')}
            className={`font-accent font-extrabold text-[11px] xl:text-xs px-4 xl:px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ${
              scrolled 
                ? 'bg-[#203864] hover:bg-[#203864]/90 text-white shadow-md' 
                : 'bg-[#FFC000] hover:bg-[#FFC000]/90 text-[#203864] shadow-lg'
            }`}
          >
            {t('btn.applyNow')}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center gap-3">
          {isAdminLoggedIn && (
            <button 
              onClick={onOpenAdmin} 
              className="bg-emerald-500/15 text-emerald-405 text-[10px] uppercase font-bold px-2.5 py-1 rounded-full border border-emerald-500/20"
            >
              Portal
            </button>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-1.5 rounded-full focus:outline-none cursor-pointer transition-colors duration-250 ${
              scrolled 
                ? 'text-[#203864] hover:bg-neutral-100' 
                : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-neutral-950/40 backdrop-blur-sm z-40 lg:hidden"
            />
             {/* Slide menu */}
            <motion.div 
              initial={{ x: '100%', opacity: 0.9 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-[290px] bg-[#12213D]/98 backdrop-blur-xl text-white z-50 p-6 flex flex-col justify-between border-l border-white/5 shadow-2xl lg:hidden animate-none"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white text-[#203864] rounded-lg flex items-center justify-center font-bold text-xs">
                      RIS
                    </div>
                    <span className="font-accent font-bold text-xs tracking-wider">ROUSSEAU INT.</span>
                  </div>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-1 px-2.5 text-white hover:text-[#FFC000] border border-white/15 rounded-full"
                  >
                    <X className="w-4 h-4 inline-block align-middle" />
                  </button>
                </div>

                {/* Mobile Language Switcher Row */}
                <div className="bg-white/5 border border-white/10 p-1 rounded-xl mb-5 flex items-center justify-between select-none">
                  <span className="text-[10px] font-accent font-extrabold tracking-wider text-white/50 pl-2 uppercase">Langue / Language / اللغة</span>
                  <div className="flex items-center gap-0.5">
                    <button
                      onClick={() => setLocale('en')}
                      className={`text-[10px] tracking-wider font-accent font-black px-2 py-1.5 rounded-lg cursor-pointer transition-all duration-200 ${
                        locale === 'en' ? 'bg-white text-[#203864] font-bold shadow' : 'text-white/60 hover:text-white'
                      }`}
                    >
                      EN
                    </button>
                    <button
                      onClick={() => setLocale('fr')}
                      className={`text-[10px] tracking-wider font-accent font-black px-2 py-1.5 rounded-lg cursor-pointer transition-all duration-200 ${
                        locale === 'fr' ? 'bg-[#FFC000] text-[#203864] font-bold shadow' : 'text-white/60 hover:text-white'
                      }`}
                    >
                      FR
                    </button>
                    <button
                      onClick={() => setLocale('ar')}
                      className={`text-[10px] tracking-wider font-accent font-black px-2 py-1.5 rounded-lg cursor-pointer transition-all duration-200 ${
                        locale === 'ar' ? 'bg-[#FFC000] text-[#203864] font-bold shadow' : 'text-white/60 hover:text-white'
                      }`}
                    >
                      AR
                    </button>
                  </div>
                </div>

                <nav className="flex flex-col gap-2.5">
                  {navLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => handleLinkClick(link.id)}
                      className={`text-left font-accent font-semibold text-sm capitalize py-2 px-3 rounded-lg transition-all duration-200 flex items-center justify-between ${
                        currentTab === link.id 
                          ? 'text-[#FFC000] bg-white/5 font-bold' 
                          : 'text-white/70 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span>{link.label}</span>
                      {currentTab === link.id && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFC000]" />
                      )}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="flex flex-col gap-4 border-t border-white/10 pt-6">
                {isAdminLoggedIn ? (
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={() => { setIsOpen(false); onOpenAdmin(); }}
                      className="bg-emerald-600 text-white py-2 rounded-full font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Landmark className="w-4 h-4" />
                      {t('btn.adminPortal')}
                    </button>
                    <button 
                      onClick={() => { setIsOpen(false); onLogoutAdmin(); }}
                      className="text-xs text-center text-rose-300 hover:underline cursor-pointer"
                    >
                      {t('btn.logoutAccount')}
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => { setIsOpen(false); onOpenAdmin(); }}
                    className="text-xs text-center text-slate-300 hover:text-white cursor-pointer underline"
                  >
                    {t('btn.staffPortalShort')}
                  </button>
                )}
                
                <button
                  onClick={() => handleLinkClick('admissions')}
                  className="bg-[#FFC000] text-[#203864] py-3 rounded-full font-accent font-extrabold text-xs tracking-wider uppercase text-center cursor-pointer shadow-lg"
                >
                  {t('btn.applyOnlineNow')}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
