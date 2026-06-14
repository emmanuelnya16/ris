/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image, Film, Calendar, Share2, Tag, X, ExternalLink, MessageCircle, GraduationCap, Play, Clock } from 'lucide-react';
import { GalleryItem, NewsItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { translateNews, translateGallery } from '../translationHelpers';

interface LifeViewProps {
  gallery: GalleryItem[];
  news: NewsItem[];
}

const dict: Record<string, { en: string; fr: string; ar?: string }> = {
  'hero.title': {
    en: 'DREAM BIG,\nBE THE CHANGE',
    fr: 'RÊVEZ GRAND,\nSOYEZ LE CHANGEMENT',
    ar: 'احلم بكبير\nوكن أنت التغيير'
  },
  'news.badge': {
    en: 'Active Chronicles',
    fr: 'Actualités & Chroniques',
    ar: 'الأخبار والوقائع اليومية'
  },
  'news.title': {
    en: 'NOW@RIS — The Daily School Journal',
    fr: 'NOW@RIS — Le Journal de la Vie Scolaire',
    ar: 'ناو ريس — جريدة الحياة المدرسية اليومية'
  },
  'news.readMore': {
    en: 'Read Details',
    fr: 'Lire la Suite',
    ar: 'قراءة التفاصيل'
  },
  'video.badge': {
    en: 'Life In Motion',
    fr: 'La Vie en Mouvement',
    ar: 'الحياة المدرسية في حركة'
  },
  'video.title': {
    en: 'Video Campus Channel',
    fr: 'Chaîne Vidéo de l’École',
    ar: 'قناة الفيديو المدرسية الرسمية'
  },
  'video.desc': {
    en: 'Step inside the daily energy, cultural assemblies, and sports trials on our campus through our official lens feed.',
    fr: 'Découvrez en images vives, assemblées culturelles et galas de sport la vitalité de notre campus à travers notre fil officiel de reportages.',
    ar: 'اكتشف بالفيديو الأنشطة اليومية والفعاليات الثقافية والرياضية في حرم المدرسة بـ دوالا.'
  },
  'gallery.badge': {
    en: 'Visual Heritage',
    fr: 'Héritage Visuel',
    ar: 'المعرض المرئي'
  },
  'gallery.title': {
    en: 'The Rousseau Media Gallery',
    fr: 'Galerie Médias de Notre Campus',
    ar: 'معرض وسائط مدرسة روسو'
  },
  'gallery.desc': {
    en: 'Immerse Yourself in Daily Dynamic Moments Across Douala Campus Spaces.',
    fr: 'Plongez au cœur des moments forts de la vie quotidienne sur notre campus de Douala.',
    ar: 'تصفح صور ولقطات متميزة من واقع الحياة اليومية للطلاب في دوالا.'
  },
  'modal.backBtn': {
    en: 'Return to school journal list',
    fr: 'Retour à la liste des actualités',
    ar: 'العودة إلى قائمة الأخبار'
  },
  'modal.published': {
    en: 'Published Sessional Announcement',
    fr: 'Communiqué Officiel Publié',
    ar: 'تم تفعيل نشر الإعلان'
  }
};

interface CampusVideo {
  id: string;
  titleEn: string;
  titleFr: string;
  titleAr: string;
  categoryEn: string;
  categoryFr: string;
  categoryAr: string;
  duration: string;
  thumbnail: string;
  embedUrl: string;
  date: string;
}

const CAMPUS_VIDEOS: CampusVideo[] = [
  {
    id: "vid_1",
    titleEn: "Discover Rousseau International School - Official Campus Tour",
    titleFr: "Découvrez Rousseau International School - Visite Officielle du Campus",
    titleAr: "جولتنا الرسمية داخل مدرسة روسو الدولية الحديثة",
    categoryEn: "Campus Tour",
    categoryFr: "Visite du Campus",
    categoryAr: "جولة الحرم",
    duration: "4:15",
    thumbnail: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800",
    embedUrl: "https://www.youtube.com/embed/ysz5S6PUM-U?autoplay=1",
    date: "2026-05-10"
  },
  {
    id: "vid_2",
    titleEn: "Annual Sports Championship & Track Gala 2026",
    titleFr: "Championnat Annuel d’Athlétisme & Gala de Sport 2026",
    titleAr: "البطولة الرياضية السنوية وحفل الجري والسباق 2026",
    categoryEn: "Sports",
    categoryFr: "Activités Sportives",
    categoryAr: "رياضات",
    duration: "3:10",
    thumbnail: "https://images.unsplash.com/photo-1508962914676-134849a727f0?q=80&w=800",
    embedUrl: "https://www.youtube.com/embed/ysz5S6PUM-U?autoplay=1",
    date: "2026-04-12"
  },
  {
    id: "vid_3",
    titleEn: "Cambridge & OSSD Sessional Graduation Ceremony",
    titleFr: "Cérémonie Solennelle de Remise des Diplômes Cambridge & OSSD",
    titleAr: "حفل التخرج السنوي المتكامل لشهادات كولدج كندا وكامبريدج",
    categoryEn: "Ceremonies",
    categoryFr: "Cérémonies Académiques",
    categoryAr: "حفل تخرج",
    duration: "6:24",
    thumbnail: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800",
    embedUrl: "https://www.youtube.com/embed/ysz5S6PUM-U?autoplay=1",
    date: "2026-06-05"
  },
  {
    id: "vid_4",
    titleEn: "Science Expo & Robotics Club Innovations Show",
    titleFr: "Exposition Scientifique & Démonstration du Club de Robotique",
    titleAr: "معرض العلوم المتميز ومخترعات نادي الهندسة والذكاء",
    categoryEn: "Activities",
    categoryFr: "Clubs & Innovations",
    categoryAr: "أنشطة علمية",
    duration: "2:45",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800",
    embedUrl: "https://www.youtube.com/embed/ysz5S6PUM-U?autoplay=1",
    date: "2026-03-18"
  }
];

export default function LifeView({ gallery: propGallery, news: propNews }: LifeViewProps) {
  const [gallery, setGallery] = useState<GalleryItem[]>(propGallery);
  const [news, setNews] = useState<NewsItem[]>(propNews);
  
  const [activeAlbum, setActiveAlbum] = useState<string>('All');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<CampusVideo | null>(null);
  
  const [expandedNews, setExpandedNews] = useState<NewsItem | null>(null);
  const [newsFilter, setNewsFilter] = useState<string>('All');
  const { locale } = useLanguage();

  const t = (key: string): string => {
    return dict[key]?.[locale] || dict[key]?.[locale === 'ar' ? 'fr' : 'en'] || dict[key]?.['en'] || key;
  };

  useEffect(() => {
    // Dynamic fetches from our live Express backend
    fetch('/api/news')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setNews(data.filter(n => n.status === 'Published'));
        }
      })
      .catch(err => console.error("Could not fetch news, falling back:", err));

    fetch('/api/gallery')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setGallery(data);
        }
      })
      .catch(err => console.error("Could not fetch gallery, falling back:", err));
  }, [propNews, propGallery]);

  const rawAlbums = ['All', 'Campus', 'Events', 'Sports', 'Ceremonies', 'Activities'];
  const rawNewsCategories = ['All', 'Event', 'Academic Result', 'Announcement', 'School Life'];

  const getAlbumLabel = (alb: string): string => {
    if (locale !== 'fr') return alb;
    switch (alb) {
      case 'All': return 'Tout';
      case 'Campus': return 'Campus & Locaux';
      case 'Events': return 'Événements';
      case 'Sports': return 'Activités Sportives';
      case 'Ceremonies': return 'Cérémonies';
      case 'Activities': return 'Clubs & Ateliers';
      default: return alb;
    }
  };

  const getNewsCatLabel = (cat: string): string => {
    if (locale !== 'fr') return cat;
    switch (cat) {
      case 'All': return 'Toutes actualités';
      case 'Event': return 'Événements';
      case 'Academic Result': return 'Résultats Académiques';
      case 'Announcement': return 'Annonces';
      case 'School Life': return 'Vie du Campus';
      default: return cat;
    }
  };

  // Translate dynamically loaded lists
  const translatedNews = news.map(n => translateNews(n, locale));
  const translatedGallery = gallery.map(g => translateGallery(g, locale));

  // Filtering Logic
  const filteredGallery = translatedGallery.filter(item => {
    if (activeAlbum === 'All') return true;
    return item.album === activeAlbum;
  });

  const filteredNews = translatedNews.filter(item => {
    if (newsFilter === 'All') return true;
    return item.category === newsFilter || (newsFilter === 'Academic Result' && item.category === 'Résultat Académique') || (newsFilter === 'School Life' && item.category === 'Vie Scolaire') || (newsFilter === 'Event' && item.category === 'Événement') || (newsFilter === 'Announcement' && item.category === 'Annonce');
  });

  return (
    <div id="life-view" className="w-full">
      
      {/* ────────────────────────── PAGE BANNER HEADER ────────────────────────── */}
      <section className="bg-[#203864] pt-40 pb-44 px-6 text-center relative overflow-hidden text-white flex flex-col justify-center items-center min-h-[460px]">
        {/* Cinematic Student Life Backdrop */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1600" 
            alt="Dynamic Campus Student Life" 
            className="w-full h-full object-cover opacity-35 transform scale-105 transition-opacity duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#203864]/75 via-[#12213D]/55 to-[#203864]/90 mix-blend-multiply" />
        </div>

        <div className="max-w-4xl mx-auto space-y-4 relative z-10 flex flex-col items-center">
          <h1 className="font-sans font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-[0.06em] leading-tight md:leading-none uppercase drop-shadow-lg whitespace-pre-line">
            {t('hero.title')}
          </h1>
          <p className="text-stone-100 text-xs sm:text-sm md:text-base font-serif italic tracking-wide opacity-90 drop-shadow-sm mt-2">
            -Saturday November 5, 2022
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

      {/* ────────────────────────── NOW@RIS NEWS SECTION ────────────────────────── */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-10">
          
          <div className="flex flex-col md:flex-row items-center justify-between border-b border-neutral-border pb-6 gap-6 text-left">
            <div>
              <span className="text-xs font-bold tracking-wider text-[#203864] uppercase font-accent">
                {t('news.badge')}
              </span>
              <h2 className="font-serif font-bold text-2xl md:text-3xl text-brand-navy mt-1">
                {t('news.title')}
              </h2>
            </div>

            {/* News Categories Pill Filter */}
            <div className="flex flex-wrap gap-2">
              {rawNewsCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setNewsFilter(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide cursor-pointer transition-colors ${
                    newsFilter === cat 
                      ? 'bg-[#203864] text-white' 
                      : 'bg-neutral-pearl hover:bg-neutral-border/50 text-neutral-text'
                  }`}
                >
                  {getNewsCatLabel(cat)}
                </button>
              ))}
            </div>
          </div>

          {/* News Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            <AnimatePresence mode="popLayout">
              {filteredNews.map((item, idx) => (
                <motion.article 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -6, boxShadow: "0 22px 35px -10px rgba(32,56,100,0.12)" }}
                  className="bg-white border border-neutral-border rounded-xl overflow-hidden flex flex-col justify-between shadow-sm cursor-pointer"
                  onClick={() => setExpandedNews(item)}
                >
                  <div>
                    {/* Compact category status line */}
                    <div className="p-4 bg-neutral-pearl/40 border-b border-neutral-border/40 flex items-center justify-between">
                      <span className="text-[9px] uppercase font-mono tracking-widest bg-[#203864]/5 px-2.1 py-1 rounded text-[#203864] font-bold">
                        {item.category}
                      </span>
                      <span className="text-[10px] text-neutral-secondary flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#FFC000]" />
                        {new Date(item.datePublished).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="p-6 space-y-3">
                      <h4 className="font-serif font-bold text-base text-[#12213D] leading-snug group-hover:text-brand-royal transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-neutral-text text-[12px] leading-relaxed line-clamp-3">
                        {item.content}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#203864] group-hover:underline transition-all">
                      {t('news.readMore')}
                      <ExternalLink className="w-3.5 h-3.5 text-[#203864]" />
                    </span>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* ────────────────────────── CAMPUS VIDEO CHANNEL ────────────────────────── */}
      <section className="bg-white py-16 px-4 border-t border-neutral-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-10">
          
          <div className="flex flex-col md:flex-row items-center justify-between border-b border-neutral-border pb-6 gap-6 text-left">
            <div className="space-y-1">
              <span className="text-xs font-bold tracking-wider text-[#203864] uppercase font-accent">
                {t('video.badge')}
              </span>
              <h2 className="font-serif font-bold text-2xl md:text-3xl text-brand-navy">
                {t('video.title')}
              </h2>
              <p className="text-neutral-secondary text-xs">
                {t('video.desc')}
              </p>
            </div>
          </div>

          {/* Videos Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {CAMPUS_VIDEOS.map((vid) => {
              const videoTitle = locale === 'fr' ? vid.titleFr : (locale === 'ar' ? vid.titleAr : vid.titleEn);
              const videoCategory = locale === 'fr' ? vid.categoryFr : (locale === 'ar' ? vid.categoryAr : vid.categoryEn);

              return (
                <motion.div
                  key={vid.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -6, boxShadow: "0 20px 30px -10px rgba(32,56,100,0.12)" }}
                  className="bg-white border border-neutral-border rounded-xl overflow-hidden shadow-sm flex flex-col justify-between group cursor-pointer"
                  onClick={() => setSelectedVideo(vid)}
                >
                  <div>
                    {/* Visual Poster Cover */}
                    <div className="aspect-video w-full overflow-hidden bg-slate-900 relative">
                      <img
                        src={vid.thumbnail}
                        alt={videoTitle}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Stylized play overlay with backdrop filter glass */}
                      <div className="absolute inset-0 bg-black/35 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
                        <div className="w-12 h-12 rounded-full bg-white/95 text-[#203864] flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        </div>
                      </div>

                      {/* Duration Tag */}
                      <div className="absolute bottom-2 right-2 bg-black/75 px-2 py-0.5 rounded text-[10px] font-mono font-bold text-[#FFC000] flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#FFC000]" />
                        {vid.duration}
                      </div>
                    </div>

                    {/* Meta info tags */}
                    <div className="p-4 space-y-2">
                      <span className="text-[9px] uppercase font-mono tracking-wider bg-[#203864]/5 px-2 py-0.5 rounded text-[#203864] font-bold">
                        {videoCategory}
                      </span>
                      <h4 className="font-sans font-bold text-xs text-[#12213D] leading-snug line-clamp-2 min-h-[32px] group-hover:text-brand-royal transition-colors">
                        {videoTitle}
                      </h4>
                    </div>
                  </div>

                  <div className="px-4 pb-4 pt-1 flex items-center justify-between text-[10px] text-neutral-secondary border-t border-neutral-100/60 mt-2">
                    <span>{new Date(vid.date).toLocaleDateString()}</span>
                    <span className="text-[#FFC000] font-bold uppercase tracking-wider group-hover:underline flex items-center gap-1">
                      {locale === 'fr' ? 'Lancer' : (locale === 'ar' ? 'عرض' : 'Play')}
                      <Play className="w-2.5 h-2.5 fill-current" />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ────────────────────────── THE ROUSSEAU MEDIA GALLERY ────────────────────────── */}
      <section className="bg-neutral-pearl/50 py-16 px-4 border-t border-neutral-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-10">
          
          <div className="flex flex-col md:flex-row items-center justify-between border-b border-neutral-border pb-6 gap-6 text-left">
            <div className="space-y-1">
              <span className="text-xs font-bold tracking-wider text-[#203864] uppercase font-accent">
                {t('gallery.badge')}
              </span>
              <h2 className="font-serif font-bold text-2xl md:text-3xl text-brand-navy">
                {t('gallery.title')}
              </h2>
              <p className="text-neutral-secondary text-xs">
                {t('gallery.desc')}
              </p>
            </div>

            {/* Albums Tab Selectors */}
            <div className="flex flex-wrap gap-2">
              {rawAlbums.map((alb) => (
                <button
                  key={alb}
                  onClick={() => setActiveAlbum(alb)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer border transition-colors ${
                    activeAlbum === alb 
                      ? 'bg-[#203864] text-white border-[#203864]' 
                      : 'bg-white text-[#203864] border-neutral-border hover:bg-neutral-pearl'
                  }`}
                >
                  {getAlbumLabel(alb)}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredGallery.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35 }}
                  whileHover={{ scale: 1.025 }}
                  className="bg-white border border-neutral-border rounded-xl overflow-hidden shadow-sm cursor-zoom-in relative group"
                  onClick={() => setSelectedImage(item.url)}
                >
                  <div className="aspect-square w-full overflow-hidden bg-slate-900 relative">
                    <img 
                      src={item.url} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:opacity-85 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-left">
                      <span className="text-[10px] text-[#FFC000] uppercase font-bold tracking-wider mb-0.5">{getAlbumLabel(item.album)}</span>
                      <h4 className="font-sans font-bold text-xs text-white uppercase tracking-wide">{item.title}</h4>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* ────────────────────────── NEWS ANNOUNCEMENT EXPANDED MODAL ────────────────────────── */}
      <AnimatePresence>
        {expandedNews && (
          <div className="fixed inset-0 bg-[#041424]/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 text-left">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto overflow-x-hidden border border-neutral-border relative shadow-2xl flex flex-col justify-between"
            >
              <div className="p-6 md:p-8 space-y-6">
                
                {/* Header Close info */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded bg-brand-royal animate-pulse" />
                    <span className="text-[9px] uppercase font-bold tracking-widest text-[#203864]">
                      {t('modal.published')}
                    </span>
                  </div>
                  <button 
                    onClick={() => setExpandedNews(null)}
                    className="p-1 rounded-full text-neutral-secondary hover:bg-neutral-pearl cursor-pointer"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div className="space-y-4">
                  <span className="text-[10px] text-neutral-secondary block font-semibold">{new Date(expandedNews.datePublished).toUTCString()}</span>
                  <h3 className="font-serif font-black text-xl md:text-2xl text-[#12213D] leading-tight">
                    {expandedNews.title}
                  </h3>
                  <div className="text-xs md:text-sm text-neutral-text leading-relaxed font-sans whitespace-pre-wrap select-text selection:bg-[#FFC000]/35 py-1">
                    {expandedNews.content}
                  </div>
                </div>
              </div>

              {/* Action footer */}
              <div className="bg-neutral-pearl p-6 border-t border-gray-100 text-right">
                <button 
                  onClick={() => setExpandedNews(null)}
                  className="bg-[#203864] hover:bg-[#203864]/95 text-[#FFC000] font-accent font-black text-xs py-2.5 px-6 rounded-lg uppercase tracking-wider cursor-pointer shadow"
                >
                  {t('modal.backBtn')}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ────────────────────────── IMAGE COMPONENT LIGHTBOX MODAL ────────────────────────── */}
      <AnimatePresence>
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-neutral-900/95 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage} 
              alt="Elite Rousseau High-res Snapshot" 
              className="max-w-full max-h-[85vh] rounded-lg shadow-2xl object-contain"
            />
          </div>
        )}
      </AnimatePresence>

      {/* ────────────────────────── INTERACTIVE VIDEO PLAYER LIGHTBOX MODAL ────────────────────────── */}
      <AnimatePresence>
        {selectedVideo && (
          <div className="fixed inset-0 bg-[#041424]/90 backdrop-blur-md flex items-center justify-center p-4 z-50 text-left">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#12213D] rounded-2xl max-w-4xl w-full overflow-hidden border border-[#203864]/40 relative shadow-2xl flex flex-col justify-between text-white"
            >
              {/* Header Title Bar */}
              <div className="p-4 bg-[#1a2d52] border-b border-[#203864]/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Film className="w-4 h-4 text-[#FFC000]" />
                  <span className="text-[10px] uppercase font-black tracking-widest text-[#FFC000]">
                    {locale === 'fr' ? selectedVideo.categoryFr : (locale === 'ar' ? selectedVideo.categoryAr : selectedVideo.categoryEn)}
                  </span>
                </div>
                <button 
                  onClick={() => setSelectedVideo(null)}
                  className="p-1 rounded-full text-stone-300 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Embedding Iframe */}
              <div className="aspect-video w-full bg-black relative">
                <iframe
                  src={selectedVideo.embedUrl}
                  title={locale === 'fr' ? selectedVideo.titleFr : (locale === 'ar' ? selectedVideo.titleAr : selectedVideo.titleEn)}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>

              {/* Video Info bar */}
              <div className="p-6 space-y-2 bg-[#12213D]">
                <h3 className="font-serif font-black text-lg md:text-xl text-white leading-tight">
                  {locale === 'fr' ? selectedVideo.titleFr : (locale === 'ar' ? selectedVideo.titleAr : selectedVideo.titleEn)}
                </h3>
                <div className="flex items-center gap-4 text-xs text-stone-300">
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5 text-[#FFC000]" />
                    {selectedVideo.duration}
                  </span>
                  <span>•</span>
                  <span>{new Date(selectedVideo.date).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Footer Button spacer */}
              <div className="bg-[#1a2d52] p-4 text-right border-t border-[#203864]/30">
                <button 
                  onClick={() => setSelectedVideo(null)}
                  className="bg-[#FFC000] hover:bg-[#FFC000]/90 text-[#12213D] font-accent font-black text-xs py-2 px-5 rounded-lg uppercase tracking-wider cursor-pointer transition-colors"
                >
                  {locale === 'fr' ? 'Fermer la vidéo' : (locale === 'ar' ? 'إغلاق الفيديو' : 'Close Player')}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
