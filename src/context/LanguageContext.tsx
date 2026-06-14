/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type Locale = 'en' | 'fr' | 'ar';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, customDict?: Record<string, { en: string; fr: string; ar?: string }>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Core translation dictionary for common labels, headers, and navigation
export const commonTranslations: Record<string, { en: string; fr: string; ar?: string }> = {
  // Navigation
  'nav.home': { en: 'Home', fr: 'Accueil', ar: 'الرئيسية' },
  'nav.about': { en: 'About RIS', fr: 'À propos de RIS', ar: 'عن ريس' },
  'nav.programmes': { en: 'Programmes', fr: 'Programmes', ar: 'البرامج الأكاديمية' },
  'nav.admissions': { en: 'Admissions', fr: 'Admissions', ar: 'القبول والتسجيل' },
  'nav.life': { en: 'School Life', fr: 'Vie Scolaire', ar: 'الحياة المدرسية' },
  'nav.language': { en: 'Language Centre', fr: 'Centre de Langues', ar: 'مركز اللغات' },
  'nav.abroad': { en: 'Study Abroad', fr: 'Étudiants à l’étranger', ar: 'الدراسة في الخارج' },
  'nav.contact': { en: 'Contact & FAQ', fr: 'Contact & FAQ', ar: 'الاتصال والأسئلة الشائعة' },
  
  // Header Buttons & CTAs
  'btn.applyNow': { en: 'Apply Now', fr: 'S’inscrire', ar: 'قدّم الآن' },
  'btn.applyOnlineNow': { en: 'Apply Online Now', fr: 'S’inscrire en Ligne', ar: 'سجل عبر الإنترنت الآن' },
  'btn.staffPortal': { en: 'Staff Secured Portal', fr: 'Portail Sécurisé Personnel', ar: 'بوابة الموظفين الآمنة' },
  'btn.staffPortalShort': { en: 'Staff Portal Lock', fr: 'Portail Personnel Verrouillé', ar: 'بوابة الموظفين الآمنة' },
  'btn.portal': { en: 'Portal', fr: 'Portail', ar: 'البوابة' },
  'btn.logout': { en: 'Logout', fr: 'Déconnexion', ar: 'تسجيل الخروج' },
  'btn.logoutAccount': { en: 'Log Out Account', fr: 'Se Déconnecter', ar: 'تسجيل خروج الحساب' },
  'btn.adminPortal': { en: 'Admin Portal', fr: 'Portail Administrateur', ar: 'بوابة المسؤول' },
  'indicator.authorizedHost': { en: 'British Council & ETS Authorized testing hub', fr: 'Centre d’examen agréé British Council & ETS', ar: 'مركز اختبار معتمد من المجلس الثقافي البريطاني وETS' },
  
  // Footer text
  'footer.desc': { 
    en: 'Accredited Cambridge, IB World & Canadian OSSD sessional center situated in Douala Bonanjo. Educating global minds for tomorrow\'s horizons.', 
    fr: 'Centre de session accrédité Cambridge, IB World et OSSD canadien situé à Douala Bonanjo. Former les esprits mondiaux pour les horizons de demain.',
    ar: 'مركز دراسي معتمد لمنهج كامبريدج، البكالوريا الدولية (IB)، وأونتاريو الكندية (OSSD) يقع في بونانجو، دوالا. تعليم عقول عالمية لآفاق الغد.'
  },
  'footer.coordinates': { en: 'Corporate Desk Coordinates', fr: 'Coordonnées administratives', ar: 'بيانات المكتب الإداري' },
  'footer.portals': { en: 'Sessional Portals', fr: 'Portails d’étude', ar: 'البوابات الدراسية' },
  'footer.curriculum': { en: 'Curriculum Frameworks', fr: 'Cadres programmatiques', ar: 'أطر المناهج الدراسية' },
  'footer.applyIntake': { en: 'Apply Online Intake', fr: 'Inscription en Ligne', ar: 'التقديم عبر الإنترنت' },
  'footer.languageCert': { en: 'Language Certifications', fr: 'Certifications linguistiques', ar: 'الشهادات اللغوية المعتمدة' },
  'footer.counseling': { en: 'Counseling Board', fr: 'Conseil d’orientation', ar: 'مجلس الإرشاد والتوجيه' },
  'footer.journal': { en: 'NOW@RIS Journal', fr: 'Journal d’actualité RIS', ar: 'صحيفة أخبار ريس' },
  'footer.prestataire': { en: 'Prestataire', fr: 'Développé par', ar: 'تطوير وتصميم' },
  'footer.allRights': { 
    en: '© 2026 Rousseau International School | All Rights Specified and Certified.', 
    fr: '© 2026 Rousseau International School | Tous droits réservés et certifiés.',
    ar: '© 2026 مدرسة روسو الدولية | جميع الحقوق محفوظة وموثقة.'
  },

  // General Statuses
  'status.academicSystems': { en: 'Academic Systems', fr: 'Systèmes Académiques', ar: 'الأنظمة الأكاديمية' },
  'status.admissionsHub': { en: 'Admissions Hub', fr: 'Pôle Admissions', ar: 'مركز القبول والتسجيل' },
  'status.examCenter': { en: 'Approved Exam Center', fr: 'Centre d’Examen Agréé', ar: 'مركز امتحانات معتمد' },
  'status.prepAdmissions': { en: 'Preparation & Admissions', fr: 'Préparation & Admissions', ar: 'التحضير والقبول' },
  'status.getInTouch': { en: 'Get In Touch', fr: 'Contactez-nous', ar: 'اتصل بنا' },
  'status.aboutAcademy': { en: 'About Our Academy', fr: 'À Propos de l’Académie', ar: 'حول أكاديميتنا' },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const saved = localStorage.getItem('ris_preferred_language');
    if (saved === 'fr' || saved === 'en' || saved === 'ar') return saved;
    // Autodetect browser locale
    const browserLang = navigator.language.slice(0, 2);
    if (browserLang === 'ar') return 'ar';
    return browserLang === 'fr' ? 'fr' : 'en';
  });

  useEffect(() => {
    if (locale === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('ris_preferred_language', newLocale);
  };

  const t = (key: string, customDict?: Record<string, { en: string; fr: string; ar?: string }>) => {
    const dict = customDict || commonTranslations;
    if (dict[key]) {
      const val = dict[key][locale];
      if (val !== undefined && val !== '') {
        return val;
      }
      return dict[key]['en'] || dict[key]['fr'] || key;
    }
    // Deep fallback logic for dictionary paths or raw key
    return key;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
