/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, LayoutDashboard, FileText, Newspaper, Image, Heart, 
  HelpCircle, GraduationCap, Users, Bookmark, FileSpreadsheet, Send, 
  Trash2, Plus, Edit, ShieldAlert, CheckCircle, Clock, XCircle, Info, LogOut 
} from 'lucide-react';
import { 
  Application, LanguageReg, NewsItem, GalleryItem, 
  Testimonial, PartnerUniversity, Teacher, FaqItem, ProgramInfo, User, UserRole 
} from '../types';

interface AdminPortalProps {
  onClose: () => void;
  isAdminLoggedIn: boolean;
  onLoginSuccess: (user: User) => void;
  onLogout: () => void;
  currentActor: User | null;
}

export default function AdminPortal({ onClose, isAdminLoggedIn, onLoginSuccess, onLogout, currentActor }: AdminPortalProps) {
  // Authentication states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  // Active module tab within dashboard
  const [activeWorkspace, setActiveWorkspace] = useState<'overview' | 'applications' | 'languages' | 'news' | 'gallery' | 'testimonials' | 'tuition' | 'partners' | 'teachers' | 'faq' | 'users'>('overview');

  // Datasets states
  const [stats, setStats] = useState<any>({ totalApplications: 0, statusBreakdown: {}, pendingLanguageRegs: 0, stagnantAlerts: 0, totalNews: 0, totalTeachers: 0 });
  const [applications, setApplications] = useState<Application[]>([]);
  const [languageRegs, setLanguageRegs] = useState<LanguageReg[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [programs, setPrograms] = useState<ProgramInfo[]>([]);
  const [partners, setPartners] = useState<PartnerUniversity[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  // Selection states for inspector panels
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [replySubject, setReplySubject] = useState('');
  const [replyBody, setReplyBody] = useState('');
  const [sendingMsg, setSendingMsg] = useState(false);
  const [replySuccessMessage, setReplySuccessMessage] = useState<string | null>(null);

  // Forms states for additions
  const [isAddingNews, setIsAddingNews] = useState(false);
  const [newsForm, setNewsForm] = useState({ title: '', content: '', category: 'School Life' as any, image: '', featured: false });
  
  const [isAddingGallery, setIsAddingGallery] = useState(false);
  const [galleryForm, setGalleryForm] = useState({ title: '', url: '', album: 'Campus' as any, featured: false });

  const [isAddingTestimonial, setIsAddingTestimonial] = useState(false);
  const [testimonialForm, setTestimonialForm] = useState({ name: '', role: '', text: '', rating: 5, active: true, featured: false });

  const [isAddingPartner, setIsAddingPartner] = useState(false);
  const [partnerForm, setPartnerForm] = useState({ name: '', country: '', specialty: '', description: '', logo: '🇨🇦', active: true, website: '' });

  const [isAddingTeacher, setIsAddingTeacher] = useState(false);
  const [teacherForm, setTeacherForm] = useState({ name: '', role: '', subject: '', bio: '', education: '', image: '', active: true });

  const [isAddingFaq, setIsAddingFaq] = useState(false);
  const [faqForm, setFaqForm] = useState({ question: '', answer: '', category: 'General', active: true });

  // Filters
  const [appSearch, setAppSearch] = useState('');
  const [appStatusFilter, setAppStatusFilter] = useState('All');
  const [langCertFilter, setLangCertFilter] = useState('All');

  // Trigger loading of stats and workspaces
  useEffect(() => {
    if (isAdminLoggedIn) {
      loadAllAdminData();
    }
  }, [isAdminLoggedIn, activeWorkspace]);

  const loadAllAdminData = () => {
    // Collect stats
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error(err));

    // Distribute calls depending on loaded triggers
    fetch('/api/applications').then(res => res.json()).then(data => setApplications(data)).catch(err => console.error(err));
    fetch('/api/language-regs').then(res => res.json()).then(data => setLanguageRegs(data)).catch(err => console.error(err));
    fetch('/api/news').then(res => res.json()).then(data => setNews(data)).catch(err => console.error(err));
    fetch('/api/gallery').then(res => res.json()).then(data => setGallery(data)).catch(err => console.error(err));
    fetch('/api/testimonials').then(res => res.json()).then(data => setTestimonials(data)).catch(err => console.error(err));
    fetch('/api/programs').then(res => res.json()).then(data => setPrograms(data)).catch(err => console.error(err));
    fetch('/api/partners').then(res => res.json()).then(data => setPartners(data)).catch(err => console.error(err));
    fetch('/api/teachers').then(res => res.json()).then(data => setTeachers(data)).catch(err => console.error(err));
    fetch('/api/faq').then(res => res.json()).then(data => setFaqs(data)).catch(err => console.error(err));
    fetch('/api/users').then(res => res.json()).then(data => setUsers(data)).catch(err => console.error(err));
  };

  // ────────────────────────── AUTHENTICATION ──────────────────────────
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setAuthLoading(true);

    fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Invalid username or passwords details. Standard is 'admin' or 'admissions' with 'rousseau2026'");
        }
        return res.json();
      })
      .then(data => {
        if (data.success) {
          onLoginSuccess(data.user);
          // Auto route depending on credentials
          if (data.user.role === 'CommOfficer') {
            setActiveWorkspace('news');
          } else {
            setActiveWorkspace('overview');
          }
        }
        setAuthLoading(false);
      })
      .catch(err => {
        setLoginError(err.message);
        setAuthLoading(false);
      });
  };

  // 1-click Candidate Application update
  const handleUpdateAppStatus = (appId: string, status: string) => {
    fetch(`/api/applications/${appId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    })
      .then(res => res.json())
      .then(updated => {
        setApplications(applications.map(a => a.id === appId ? updated : a));
        setSelectedApp(updated);
        // Refresh stats
        fetch('/api/stats').then(res => res.json()).then(data => setStats(data));
      })
      .catch(err => console.error(err));
  };

  // Submit Parent response message log
  const handleSendParentMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp) return;
    setSendingMsg(true);
    setReplySuccessMessage(null);

    fetch(`/api/applications/${selectedApp.id}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject: replySubject, body: replyBody })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          // Update message history in local inspector
          const updatedApp = {
            ...selectedApp,
            messageHistory: [data.message, ...selectedApp.messageHistory]
          };
          setApplications(applications.map(a => a.id === selectedApp.id ? updatedApp : a));
          setSelectedApp(updatedApp);
          setReplyBody('');
          setReplySubject('');
          setReplySuccessMessage("Email message logged onto parent transcripts successfully.");
        }
        setSendingMsg(false);
      })
      .catch(err => {
        console.error(err);
        setSendingMsg(false);
      });
  };

  // Toggle Language Cert Pre-Registration Status
  const handleUpdateLanguageStatus = (regId: string, status: string) => {
    fetch(`/api/language-regs/${regId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    })
      .then(res => res.json())
      .then(updated => {
        setLanguageRegs(languageRegs.map(l => l.id === regId ? updated : l));
        fetch('/api/stats').then(res => res.json()).then(data => setStats(data));
      })
      .catch(err => console.error(err));
  };

  // News Editor addition
  const handleAddNews = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('/api/news', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newsForm)
    })
      .then(res => res.json())
      .then(added => {
        setNews([added, ...news]);
        setIsAddingNews(false);
        setNewsForm({ title: '', content: '', category: 'School Life', image: '', featured: false });
      });
  };

  const handleDeleteNews = (id: string) => {
    fetch(`/api/news/${id}`, { method: 'DELETE' })
      .then(() => setNews(news.filter(n => n.id !== id)));
  };

  // Gallery Addition
  const handleAddGallery = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('/api/gallery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(galleryForm)
    })
      .then(res => res.json())
      .then(added => {
        setGallery([...gallery, added]);
        setIsAddingGallery(false);
        setGalleryForm({ title: '', url: '', album: 'Campus', featured: false });
      });
  };

  const handleDeleteGallery = (id: string) => {
    fetch(`/api/gallery/${id}`, { method: 'DELETE' })
      .then(() => setGallery(gallery.filter(g => g.id !== id)));
  };

  // Testimonials toggles
  const handleToggleTestimonial = (id: string, prop: 'active' | 'featured', val: boolean) => {
    fetch(`/api/testimonials/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [prop]: val })
    })
      .then(res => res.json())
      .then(updated => {
        setTestimonials(testimonials.map(t => t.id === id ? updated : t));
      });
  };

  const handleAddTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('/api/testimonials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testimonialForm)
    })
      .then(res => res.json())
      .then(added => {
        setTestimonials([...testimonials, added]);
        setIsAddingTestimonial(false);
        setTestimonialForm({ name: '', role: '', text: '', rating: 5, active: true, featured: false });
      });
  };

  // Tuition pricing editor
  const handleUpdateTuitionFee = (id: string, tuitionFee: string) => {
    fetch(`/api/programs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tuitionFee })
    })
      .then(res => res.json())
      .then(updated => {
        setPrograms(programs.map(p => p.id === id ? updated : p));
        alert("Annual Tuition fee structured successfully!");
      });
  };

  // Partners addition
  const handleAddPartner = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('/api/partners', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(partnerForm)
    })
      .then(res => res.json())
      .then(added => {
        setPartners([...partners, added]);
        setIsAddingPartner(false);
        setPartnerForm({ name: '', country: '', specialty: '', description: '', logo: '🇨🇦', active: true, website: '' });
      });
  };

  const handleDeletePartner = (id: string) => {
    fetch(`/api/partners/${id}`, { method: 'DELETE' })
      .then(() => setPartners(partners.filter(p => p.id !== id)));
  };

  // Faculty teachers addition
  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('/api/teachers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(teacherForm)
    })
      .then(res => res.json())
      .then(added => {
        setTeachers([...teachers, added]);
        setIsAddingTeacher(false);
        setTeacherForm({ name: '', role: '', subject: '', bio: '', education: '', image: '', active: true });
      });
  };

  const handleDeleteTeacher = (id: string) => {
    fetch(`/api/teachers/${id}`, { method: 'DELETE' })
      .then(() => setTeachers(teachers.filter(t => t.id !== id)));
  };

  // FAQ addition
  const handleAddFaq = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('/api/faq', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(faqForm)
    })
      .then(res => res.json())
      .then(added => {
        setFaqs([...faqs, added]);
        setIsAddingFaq(false);
        setFaqForm({ question: '', answer: '', category: 'General', active: true });
      });
  };

  const handleDeleteFaq = (id: string) => {
    fetch(`/api/faq/${id}`, { method: 'DELETE' })
      .then(() => setFaqs(faqs.filter(f => f.id !== id)));
  };

  // Export applications lists to CSV
  const handleExportCSV = () => {
    const headers = "ID,Student Name,Parent Name,Parent Email,Parent Phone,Requested level,Curriculum,Status,DateSubmitted\n";
    const rows = applications.map(a => {
      return `"${a.id}","${a.studentName}","${a.parentName}","${a.parentEmail}","${a.parentPhone}","${a.requestedLevel}","${a.progInterest}","${a.status}","${a.dateSubmitted}"`;
    }).join("\n");

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `RIS_Admissions_Registrations_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Roles access checker
  const hasAccessToModule = (module: string) => {
    if (!currentActor) return false;
    const role = currentActor.role;

    if (role === 'SuperAdmin') return true;
    if (role === 'Viewer') return true; // View all in read-only

    if (role === 'AdmissionsOfficer') {
      return module === 'overview' || module === 'applications' || module === 'languages';
    }

    if (role === 'CommOfficer') {
      return module === 'news' || module === 'gallery' || module === 'testimonials' || module === 'teachers' || module === 'partners' || module === 'faq';
    }

    return false;
  };

  const isReadOnly = () => {
    return currentActor?.role === 'Viewer';
  };

  // Filtered lists
  const filteredApps = applications.filter(a => {
    const matchesSearch = a.studentName.toLowerCase().includes(appSearch.toLowerCase()) || a.parentName.toLowerCase().includes(appSearch.toLowerCase());
    const matchesStatus = appStatusFilter === 'All' || a.status === appStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredLangRegs = languageRegs.filter(l => {
    return langCertFilter === 'All' || l.certification === langCertFilter;
  });

  const getStatusBadgeStyles = (status: string) => {
    switch (status) {
      case 'Accepted': return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Pending': return 'bg-[#FEF0DC] text-amber-800 border-amber-200';
      case 'Interview Scheduled': return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'Rejected': return 'bg-rose-50 text-rose-800 border-rose-200';
      default: return 'bg-slate-50 text-slate-850 border-slate-200';
    }
  };

  return (
    <div className="fixed inset-0 bg-[#041424] z-[99] flex flex-col justify-between">
      
      {/* ────────────────────────── INTERACTIVE STAFF ENTRY PORTAL ────────────────────────── */}
      {!isAdminLoggedIn ? (
        <div id="registration-lock" className="w-full h-full flex items-center justify-center p-4 bg-brand-navy relative overflow-hidden">
          
          <div className="absolute inset-0 bg-repeat opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
          />

          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl w-full max-w-md p-6 md:p-8 space-y-6 shadow-2xl relative z-10"
          >
            <div className="text-center space-y-2">
              <div 
                className="w-12 h-12 bg-[#041424] rounded-xl flex items-center justify-center text-white mx-auto shadow-md cursor-pointer"
                onClick={onClose}
              >
                RIS
              </div>
              <h1 className="font-sans font-bold text-xl text-brand-navy">Rousseau Staff Authority</h1>
              <p className="text-neutral-secondary text-[11px] uppercase tracking-widest font-semibold">
                Dynamic Administration portal sittings
              </p>
            </div>

            {loginError && (
              <div className="bg-rose-50 border border-status-error/30 text-status-error p-3 rounded-lg text-xs flex items-start gap-2.5">
                <ShieldAlert className="w-4.5 h-4.5 shrink-0 mt-0.5" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1 text-left">
                <label className="text-xs font-semibold text-brand-navy block">Registered Username</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. admin, admissions, comm, viewer"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full border border-neutral-border rounded-lg px-3.5 py-2.5 text-xs focus:border-brand-royal outline-none"
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="text-xs font-semibold text-brand-navy block">Security Password Token</label>
                <input 
                  type="password"
                  required
                  placeholder="Password (e.g. rousseau2026)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-neutral-border rounded-lg px-3.5 py-2.5 text-xs focus:border-brand-royal outline-none"
                />
              </div>

              <button 
                type="submit"
                disabled={authLoading}
                className="w-full bg-[#041424] hover:bg-brand-royal text-white font-bold py-3 rounded-lg text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow"
              >
                {authLoading ? "Unlocking security rails..." : "Unlock Dashboard"}
                <Lock className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="bg-neutral-pearl/80 border border-neutral-border p-4 rounded-lg text-[11px] text-neutral-secondary text-left space-y-1">
              <span className="font-sans font-bold text-brand-navy block text-xs">ℹ️ Sandboxed credentials mapping:</span>
              <span>• Username: **admin** (SuperAdmin role / unrestricted)</span>
              <span>• Username: **admissions** (Officer role / admissions focus)</span>
              <span>• Username: **comm** (Officer role / news focus)</span>
              <span>• Password token: **rousseau2026**</span>
            </div>

            <button 
              onClick={onClose}
              className="text-xs underline text-neutral-secondary hover:text-brand-navy cursor-pointer"
            >
              Back to Public Web
            </button>
          </motion.div>
        </div>
      ) : (
        
        // ────────────────────────── PRIMARY DOCK ADMIN WORKSPACE ──────────────────────────
        <div id="staff-workspace" className="w-full h-full flex flex-col lg:flex-row bg-neutral-pearl text-brand-navy text-left text-xs">
          
          {/* Workspace Sider navigation pane */}
          <aside className="w-full lg:w-[260px] bg-[#020D1A] lg:h-full text-white p-5 flex flex-col justify-between shrink-0 border-r border-white/5">
            <div className="space-y-6">
              
              <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white text-[#041424] flex items-center justify-center font-bold text-xs uppercase">
                    RIS
                  </div>
                  <div>
                    <h2 className="font-bold text-xs tracking-tight uppercase leading-tight">Admin Vault</h2>
                    <span className="text-[9px] text-[#4b9fe1] font-bold block uppercase tracking-wide">
                      {currentActor?.role} Access
                    </span>
                  </div>
                </div>
                <button 
                  onClick={onClose}
                  className="p-1 hover:bg-white/5 rounded text-white lg:hidden border border-white/10"
                >
                  Close
                </button>
              </div>

              {/* Workspace Navigation tab items */}
              <nav className="flex flex-col gap-1 inline-block w-full">
                {hasAccessToModule('overview') && (
                  <button
                    onClick={() => setActiveWorkspace('overview')}
                    className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-lg font-semibold tracking-wide text-xs text-left cursor-pointer transition-colors ${
                      activeWorkspace === 'overview' ? 'bg-brand-royal text-white' : 'text-stone-300 hover:bg-white/5'
                    }`}
                  >
                    <LayoutDashboard className="w-4 h-4 shrink-0" />
                    Overview Index
                  </button>
                )}

                {hasAccessToModule('applications') && (
                  <button
                    onClick={() => setActiveWorkspace('applications')}
                    className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-lg font-semibold tracking-wide text-xs text-left cursor-pointer transition-colors ${
                      activeWorkspace === 'applications' ? 'bg-brand-royal text-white' : 'text-stone-300 hover:bg-white/5'
                    }`}
                  >
                    <FileText className="w-4 h-4 shrink-0" />
                    Candidatures Enrollments
                  </button>
                )}

                {hasAccessToModule('languages') && (
                  <button
                    onClick={() => setActiveWorkspace('languages')}
                    className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-lg font-semibold tracking-wide text-xs text-left cursor-pointer transition-colors ${
                      activeWorkspace === 'languages' ? 'bg-brand-royal text-white' : 'text-stone-300 hover:bg-white/5'
                    }`}
                  >
                    <GraduationCap className="w-4 h-4 shrink-0" />
                    Certifications Pre-regs
                  </button>
                )}

                {hasAccessToModule('news') && (
                  <button
                    onClick={() => setActiveWorkspace('news')}
                    className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-lg font-semibold tracking-wide text-xs text-left cursor-pointer transition-colors ${
                      activeWorkspace === 'news' ? 'bg-brand-royal text-white' : 'text-stone-300 hover:bg-white/5'
                    }`}
                  >
                    <Newspaper className="w-4 h-4 shrink-0" />
                    NOW@RIS Journal
                  </button>
                )}

                {hasAccessToModule('gallery') && (
                  <button
                    onClick={() => setActiveWorkspace('gallery')}
                    className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-lg font-semibold tracking-wide text-xs text-left cursor-pointer transition-colors ${
                      activeWorkspace === 'gallery' ? 'bg-brand-royal text-white' : 'text-stone-300 hover:bg-white/5'
                    }`}
                  >
                    <Image className="w-4 h-4 shrink-0" />
                    Bespoke Gallery
                  </button>
                )}

                {hasAccessToModule('testimonials') && (
                  <button
                    onClick={() => setActiveWorkspace('testimonials')}
                    className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-lg font-semibold tracking-wide text-xs text-left cursor-pointer transition-colors ${
                      activeWorkspace === 'testimonials' ? 'bg-brand-royal text-white' : 'text-stone-300 hover:bg-white/5'
                    }`}
                  >
                    <Heart className="w-4 h-4 shrink-0" />
                    Parents Testimonials
                  </button>
                )}

                {currentActor?.role === 'SuperAdmin' && (
                  <>
                    <button
                      onClick={() => setActiveWorkspace('tuition')}
                      className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-lg font-semibold tracking-wide text-xs text-left cursor-pointer transition-colors ${
                        activeWorkspace === 'tuition' ? 'bg-brand-royal text-white' : 'text-stone-300 hover:bg-white/5'
                      }`}
                    >
                      <Bookmark className="w-4 h-4 shrink-0" />
                      School Tuition Fees
                    </button>
                    
                    <button
                      onClick={() => setActiveWorkspace('partners')}
                      className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-lg font-semibold tracking-wide text-xs text-left cursor-pointer transition-colors ${
                        activeWorkspace === 'partners' ? 'bg-brand-royal text-white' : 'text-stone-300 hover:bg-white/5'
                      }`}
                    >
                      <Users className="w-4 h-4 shrink-0" />
                      Partner Colleges
                    </button>

                    <button
                      onClick={() => setActiveWorkspace('teachers')}
                      className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-lg font-semibold tracking-wide text-xs text-left cursor-pointer transition-colors ${
                        activeWorkspace === 'teachers' ? 'bg-brand-royal text-white' : 'text-stone-300 hover:bg-white/5'
                      }`}
                    >
                      <Users className="w-4 h-4 shrink-0" />
                      Faculty Registers
                    </button>

                    <button
                      onClick={() => setActiveWorkspace('faq')}
                      className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-lg font-semibold tracking-wide text-xs text-left cursor-pointer transition-colors ${
                        activeWorkspace === 'faq' ? 'bg-brand-royal text-white' : 'text-stone-300 hover:bg-white/5'
                      }`}
                    >
                      <HelpCircle className="w-4 h-4 shrink-0" />
                      Sessional FAQ Board
                    </button>

                    <button
                      onClick={() => setActiveWorkspace('users')}
                      className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-lg font-semibold tracking-wide text-xs text-left cursor-pointer transition-colors ${
                        activeWorkspace === 'users' ? 'bg-brand-royal text-white' : 'text-stone-300 hover:bg-white/5'
                      }`}
                    >
                      <Users className="w-4 h-4 shrink-0" />
                      System User accounts
                    </button>
                  </>
                )}
              </nav>

            </div>

            {/* Logout segment */}
            <div className="border-t border-white/10 pt-4 flex flex-col gap-2">
              <div className="text-[10px] text-stone-400">
                <span className="block font-bold">Logged as: {currentActor?.name}</span>
                <span>Role: {currentActor?.role}</span>
              </div>
              
              <button 
                onClick={onLogout}
                className="w-full bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 py-2 rounded font-semibold flex items-center justify-center gap-2 text-[11px] cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                Logout Account
              </button>
              
              <button 
                onClick={onClose}
                className="text-xs text-center text-brand-sky underline cursor-pointer hover:text-white"
              >
                Back to Public Web
              </button>
            </div>
          </aside>

          {/* Active Worksite viewport */}
          <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6 h-full flex flex-col justify-start">
            
            {/* Header title */}
            <div className="border-b border-gray-200 pb-4 flex items-center justify-between">
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-[#041424] capitalize font-navy">
                  Workspace: {activeWorkspace} Control
                </h1>
                <p className="text-neutral-secondary text-xs">
                  Active staff member: **{currentActor?.name}** with **{currentActor?.role}** permissions.
                </p>
              </div>

              {activeWorkspace === 'applications' && (
                <button 
                  onClick={handleExportCSV}
                  className="bg-brand-royal hover:bg-brand-royal/90 text-white px-3.5 py-1.5 rounded-md font-sans font-semibold text-xs flex items-center gap-2 cursor-pointer shadow"
                >
                  <FileSpreadsheet className="w-4 h-4 text-white" />
                  Excel CSV Export
                </button>
              )}
            </div>

            {/* ────────────────────────── 1. MODULE: OVERVIEW DASHBOARD INDEX ───────────────────────── */}
            {activeWorkspace === 'overview' && (
              <div className="space-y-6">
                
                {/* Highlights widgets */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  
                  <div className="bg-white p-5 rounded-xl shadow-sm border border-neutral-border flex items-center justify-between">
                    <div className="space-y-1">
                      <span className="text-[10px] text-neutral-secondary font-bold tracking-wider uppercase">Annual Candidatures</span>
                      <span className="text-3xl font-sans font-bold text-brand-navy block leading-none">{stats.totalApplications}</span>
                    </div>
                    <FileText className="w-8 h-8 text-brand-royal opacity-40 shrink-0" />
                  </div>

                  <div className="bg-white p-5 rounded-xl shadow-sm border border-neutral-border flex items-center justify-between">
                    <div className="space-y-1">
                      <span className="text-[10px] text-neutral-secondary font-bold tracking-wider uppercase">Stagnant Untreated (Older than 48h)</span>
                      <span className={`text-3xl font-sans font-bold block leading-none ${stats.stagnantAlerts > 0 ? 'text-status-alert' : 'text-brand-navy'}`}>{stats.stagnantAlerts}</span>
                    </div>
                    <ShieldAlert className="w-8 h-8 text-brand-gold opacity-45 shrink-0" />
                  </div>

                  <div className="bg-white p-5 rounded-xl shadow-sm border border-neutral-border flex items-center justify-between">
                    <div className="space-y-1">
                      <span className="text-[10px] text-neutral-secondary font-bold tracking-wider uppercase">Languages Center Pre-Regs</span>
                      <span className="text-3xl font-sans font-bold text-emerald-700 block leading-none">{stats.pendingLanguageRegs}</span>
                    </div>
                    <GraduationCap className="w-8 h-8 text-emerald-600 opacity-40 shrink-0" />
                  </div>

                  <div className="bg-white p-5 rounded-xl shadow-sm border border-neutral-border flex items-center justify-between">
                    <div className="space-y-1">
                      <span className="text-[10px] text-neutral-secondary font-bold tracking-wider uppercase">Active News Published</span>
                      <span className="text-3xl font-sans font-bold text-brand-navy block leading-none">{stats.totalNews}</span>
                    </div>
                    <Newspaper className="w-8 h-8 text-purple-600 opacity-40 shrink-0" />
                  </div>

                </div>

                {/* Stagnancy critical alerts box */}
                {stats.stagnantAlerts > 0 && (
                  <div className="bg-amber-50 border border-status-alert/30 p-4 rounded-xl flex items-start gap-3 text-status-alert leading-normal text-xs shadow-sm">
                    <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-sans font-bold text-brand-navy block">Stagnant Candidacies Warning Indicator:</span>
                      <span>You have **{stats.stagnantAlerts}** online application entries logged older than **48 hours** requiring level evaluation sittings or placement interview schedules. Settle codes in the candidatures section.</span>
                    </div>
                  </div>
                )}

                {/* Latest listings widgets split */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
                  
                  {/* Latest applications list */}
                  <div className="bg-white border border-neutral-border p-5 rounded-xl shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                      <h4 className="font-sans font-bold text-sm text-brand-navy uppercase flex items-center gap-2">
                        <FileText className="w-4 h-4 text-brand-royal" />
                        Latest Campus applications
                      </h4>
                      <button 
                        onClick={() => setActiveWorkspace('applications')}
                        className="text-[11px] font-bold text-brand-royal hover:underline uppercase"
                      >
                        All Applications
                      </button>
                    </div>

                    <div className="space-y-3.5 divide-y divide-gray-50 max-h-[300px] overflow-y-auto pr-1">
                      {applications.slice(0, 4).map((a) => (
                        <div key={a.id} className="pt-2.5 first:pt-0 flex items-start justify-between text-left text-xs text-neutral-text font-sans">
                          <div>
                            <span className="font-semibold text-brand-navy block leading-tight">{a.studentName}</span>
                            <span className="text-[10px] text-neutral-secondary block">{a.requestedLevel}</span>
                          </div>
                          
                          <span className={`px-2 py-0.5 text-[9px] uppercase font-bold rounded-full border ${getStatusBadgeStyles(a.status)}`}>
                            {a.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Latest news items list */}
                  <div className="bg-white border border-neutral-border p-5 rounded-xl shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                      <h4 className="font-sans font-bold text-sm text-brand-navy uppercase flex items-center gap-2">
                        <Newspaper className="w-4 h-4 text-purple-600" />
                        Latest News & Events published
                      </h4>
                      <button 
                        onClick={() => setActiveWorkspace('news')}
                        className="text-[11px] font-bold text-brand-royal hover:underline uppercase"
                      >
                        All Articles
                      </button>
                    </div>

                    <div className="space-y-3.5 divide-y divide-gray-50 max-h-[300px] overflow-y-auto pr-1">
                      {news.slice(0, 4).map((n) => (
                        <div key={n.id} className="pt-2.5 first:pt-0 flex items-start justify-between text-left text-xs text-neutral-text font-sans">
                          <div>
                            <span className="font-semibold text-brand-navy block leading-tight">{n.title}</span>
                            <span className="text-[10px] text-neutral-secondary block">Date: {n.date} | Category: {n.category}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* ────────────────────────── 2. MODULE: CANDIDATURES / REGISTRATIONS ───────────────────────── */}
            {activeWorkspace === 'applications' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left: Table List */}
                <div className="lg:col-span-7 space-y-4">
                  
                  {/* Search and filters filters */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input 
                      type="text"
                      placeholder="Search candidate or parent name..."
                      value={appSearch}
                      onChange={(e) => setAppSearch(e.target.value)}
                      className="flex-1 bg-white border border-neutral-border px-3.5 py-2 rounded-lg text-xs outline-none focus:border-brand-royal"
                    />

                    <select 
                      value={appStatusFilter}
                      onChange={(e) => setAppStatusFilter(e.target.value)}
                      className="bg-white border border-neutral-border px-3.5 py-2 rounded-lg text-xs outline-none"
                    >
                      <option value="All">All statuses sills</option>
                      <option value="Pending">Pending Files</option>
                      <option value="Interview Scheduled">Interview Scheduled</option>
                      <option value="Accepted">Accepted Candidates</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Waitlist">Waitlist</option>
                    </select>
                  </div>

                  {/* Listings applications index */}
                  <div className="bg-white border border-neutral-border rounded-xl shadow-sm overflow-hidden overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#041424] text-white">
                        <tr>
                          <th className="p-3 font-semibold uppercase">Candidate Student</th>
                          <th className="p-3 font-semibold uppercase">Requested Level</th>
                          <th className="p-3 font-semibold uppercase">Syllabus Track</th>
                          <th className="p-3 font-semibold uppercase">Status Check</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 text-neutral-text">
                        {filteredApps.map((a) => (
                          <tr 
                            key={a.id} 
                            onClick={() => setSelectedApp(a)}
                            className={`hover:bg-neutral-pearl/40 cursor-pointer ${selectedApp?.id === a.id ? 'bg-brand-royal/5 border-l-4 border-brand-royal' : ''}`}
                          >
                            <td className="p-3 font-bold text-brand-navy">
                              {a.studentName}
                              <span className="text-[10px] text-neutral-secondary font-normal block">Parent: {a.parentName}</span>
                            </td>
                            <td className="p-3">{a.requestedLevel}</td>
                            <td className="p-3 font-semibold text-brand-royal">{a.progInterest}</td>
                            <td className="p-3">
                              <span className={`px-2.5 py-1 text-[9px] uppercase font-bold rounded-full border ${getStatusBadgeStyles(a.status)}`}>
                                {a.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                </div>

                {/* Right: Inspector and parent messaging log details */}
                <div className="lg:col-span-5">
                  <div className="bg-white border border-neutral-border rounded-xl p-6 shadow-sm text-left font-sans space-y-6 max-h-[85vh] overflow-y-auto">
                    
                    {selectedApp ? (
                      <div className="space-y-6">
                        
                        <div className="border-b border-gray-100 pb-4">
                          <span className="text-[9px] font-mono font-bold tracking-widest text-brand-royal uppercase block">
                            Registration Code: {selectedApp.id}
                          </span>
                          <h3 className="font-sans font-bold text-lg text-brand-[#041424] mt-0.5">
                            {selectedApp.studentName}
                          </h3>
                        </div>

                        {/* General details grid */}
                        <div className="grid grid-cols-2 gap-y-3.5 gap-x-2 text-xs">
                          <div>
                            <span className="text-neutral-secondary font-semibold uppercase block text-[10px]">Student DOB</span>
                            <span className="text-brand-navy font-medium">{selectedApp.studentDob}</span>
                          </div>
                          <div>
                            <span className="text-neutral-secondary font-semibold uppercase block text-[10px]">Target Syllabus Track</span>
                            <span className="text-brand-royal font-bold">{selectedApp.progInterest}</span>
                          </div>
                          <div>
                            <span className="text-neutral-secondary font-semibold uppercase block text-[10px]">Parent Name</span>
                            <span className="text-brand-navy font-medium">{selectedApp.parentName}</span>
                          </div>
                          <div>
                            <span className="text-neutral-secondary font-semibold uppercase block text-[10px]">Parent Tel (WhatsApp)</span>
                            <span className="text-brand-navy font-medium font-mono">{selectedApp.parentPhone}</span>
                          </div>
                          <div>
                            <span className="text-neutral-secondary font-semibold uppercase block text-[10px]">Parent Email</span>
                            <span className="text-brand-navy font-medium font-mono">{selectedApp.parentEmail}</span>
                          </div>
                          <div>
                            <span className="text-neutral-secondary font-semibold uppercase block text-[10px]">Enrollment date</span>
                            <span className="text-brand-navy font-medium">
                              {new Date(selectedApp.dateSubmitted).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        {/* Attachments & Files display */}
                        <div className="space-y-2 border-t border-gray-100 pt-4 text-xs">
                          <h4 className="text-[10px] font-bold text-[#203864] uppercase tracking-wider">
                            Uploaded Attachments / Pièces Jointes
                          </h4>
                          <div className="grid grid-cols-1 gap-1.5">
                            <div className="flex items-center justify-between p-2 bg-neutral-50 rounded border border-neutral-100/70">
                              <span className="font-semibold text-neutral-600 text-[10.5px]">Acte de naissance:</span>
                              {selectedApp.birthCertFile ? (
                                <span className="font-mono text-[10px] text-[#203864] bg-[#F2F6FA] px-2 py-0.5 rounded border border-[#203864]/10 truncate max-w-[180px]" title={selectedApp.birthCertFile}>
                                  📄 {selectedApp.birthCertFile}
                                </span>
                              ) : (
                                <span className="text-neutral-400 italic text-[10px]">Non fourni / Not attached</span>
                              )}
                            </div>
                            <div className="flex items-center justify-between p-2 bg-neutral-50 rounded border border-neutral-100/70">
                              <span className="font-semibold text-neutral-600 text-[10.5px]">Bulletin:</span>
                              {selectedApp.bulletinFile ? (
                                <span className="font-mono text-[10px] text-[#203864] bg-[#F2F6FA] px-2 py-0.5 rounded border border-[#203864]/10 truncate max-w-[180px]" title={selectedApp.bulletinFile}>
                                  📊 {selectedApp.bulletinFile}
                                </span>
                              ) : (
                                <span className="text-neutral-400 italic text-[10px]">Non fourni / Not attached</span>
                              )}
                            </div>
                            <div className="flex items-center justify-between p-2 bg-neutral-50 rounded border border-neutral-100/70">
                              <span className="font-semibold text-neutral-600 text-[10.5px]">Certificat médical:</span>
                              {selectedApp.medicalCertFile ? (
                                <span className="font-mono text-[10px] text-[#203864] bg-[#F2F6FA] px-2 py-0.5 rounded border border-[#203864]/10 truncate max-w-[180px]" title={selectedApp.medicalCertFile}>
                                  🩺 {selectedApp.medicalCertFile}
                                </span>
                              ) : (
                                <span className="text-neutral-400 italic text-[10px]">Non fourni / Not attached</span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Action Status change sills */}
                        {!isReadOnly() && (
                          <div className="space-y-3 border-t border-gray-100 pt-4">
                            <h4 className="text-[10px] font-bold text-brand-navy uppercase tracking-wider">
                              Update Enrollment Status Gate
                            </h4>
                            <div className="flex flex-wrap gap-2 text-[11px]">
                              <button 
                                onClick={() => handleUpdateAppStatus(selectedApp.id, 'Interview Scheduled')}
                                className="bg-blue-50 text-blue-800 hover:bg-blue-100 px-3 py-1.5 rounded font-bold border border-blue-200 cursor-pointer"
                              >
                                Book Interview
                              </button>
                              
                              <button 
                                onClick={() => handleUpdateAppStatus(selectedApp.id, 'Accepted')}
                                className="bg-emerald-50 text-emerald-800 hover:bg-emerald-100 px-3 py-1.5 rounded font-bold border border-emerald-200 cursor-pointer"
                              >
                                Accept Entry
                              </button>

                              <button 
                                onClick={() => handleUpdateAppStatus(selectedApp.id, 'Waitlist')}
                                className="bg-amber-50 text-amber-800 hover:bg-amber-100 px-3 py-1.5 rounded font-bold border border-amber-200 cursor-pointer"
                              >
                                Waitlist
                              </button>

                              <button 
                                onClick={() => handleUpdateAppStatus(selectedApp.id, 'Rejected')}
                                className="bg-rose-50 text-rose-800 hover:bg-rose-100 px-3 py-1.5 rounded font-bold border border-rose-200 cursor-pointer"
                              >
                                Reject File
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Correspondence mail composer */}
                        {!isReadOnly() && (
                          <form onSubmit={handleSendParentMessage} className="space-y-3 border-t border-gray-100 pt-4">
                            <h4 className="text-[10px] font-bold text-[#041424] uppercase tracking-wider">
                              Dispatch parent notification email
                            </h4>

                            {replySuccessMessage && (
                              <div className="bg-emerald-50 border border-status-valid/30 text-status-valid p-2.5 rounded-lg text-[11px] flex gap-2">
                                <CheckCircle className="w-4 h-4 shrink-0" />
                                <span>{replySuccessMessage}</span>
                              </div>
                            )}

                            <div className="space-y-1.5 text-xs">
                              <input 
                                type="text"
                                required
                                placeholder="Subject title (e.g. RIS admissions Board schedule)"
                                value={replySubject}
                                onChange={(e) => setReplySubject(e.target.value)}
                                className="w-full border border-neutral-border rounded px-3 py-2 text-xs focus:border-brand-royal outline-none"
                              />
                              <textarea 
                                rows={3}
                                required
                                placeholder="Write sessional instructions to parent transcripts..."
                                value={replyBody}
                                onChange={(e) => setReplyBody(e.target.value)}
                                className="w-full border border-neutral-border rounded px-3 py-2 text-xs focus:border-brand-royal outline-none"
                              />
                            </div>

                            <button 
                              type="submit"
                              disabled={sendingMsg}
                              className="w-full bg-[#041424] hover:bg-brand-royal text-white py-2 rounded text-xs font-semibold uppercase flex items-center justify-center gap-2 cursor-pointer"
                            >
                              {sendingMsg ? "Disbursing details..." : "Log message history"}
                              <Send className="w-3.5 h-3.5 text-white" />
                            </button>
                          </form>
                        )}

                        {/* Message log sittings */}
                        <div className="space-y-3 border-t border-gray-100 pt-4">
                          <h4 className="text-[10px] font-bold text-neutral-secondary uppercase tracking-wider">
                            Parent Correspondence Files Logs ({selectedApp.messageHistory.length})
                          </h4>
                          <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1 text-xs leading-normal">
                            {selectedApp.messageHistory.map((m) => (
                              <div key={m.id} className="bg-neutral-pearl/50 p-3 rounded-lg border border-neutral-border/40">
                                <div className="flex justify-between font-semibold pb-1 text-brand-navy">
                                  <span>{m.subject}</span>
                                  <span className="text-[10px] text-neutral-secondary">
                                    {new Date(m.date).toLocaleDateString()}
                                  </span>
                                </div>
                                <p className="text-[11px] text-neutral-text whitespace-pre-line">{m.body}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    ) : (
                      <div className="text-center text-neutral-secondary text-xs py-12 space-y-2">
                        <Info className="w-8 h-8 text-neutral-secondary mx-auto opacity-60" />
                        <p>Select any application row from the listings left index to review documents parameters, process status codes and compose logs.</p>
                      </div>
                    )}

                  </div>
                </div>

              </div>
            )}

            {/* ────────────────────────── 3. MODULE: LANGUAGE CENTRE REGISTRATIONS ───────────────────────── */}
            {activeWorkspace === 'languages' && (
              <div className="space-y-6 text-xs text-left">
                
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-b border-gray-105 pb-4">
                  <h3 className="font-sans font-bold text-sm text-[#041424] uppercase">
                    Language sittings pre-bookings
                  </h3>

                  <div className="flex gap-2">
                    <button onClick={() => setLangCertFilter('All')} className={`px-2.5 py-1 rounded border text-[11px] uppercase cursor-pointer ${langCertFilter === 'All' ? 'bg-[#041424] text-white' : 'bg-white'}`}>All</button>
                    <button onClick={() => setLangCertFilter('IELTS')} className={`px-2.5 py-1 rounded border text-[11px] uppercase cursor-pointer ${langCertFilter === 'IELTS' ? 'bg-[#041424] text-white' : 'bg-white'}`}>IELTS</button>
                    <button onClick={() => setLangCertFilter('TOEFL')} className={`px-2.5 py-1 rounded border text-[11px] uppercase cursor-pointer ${langCertFilter === 'TOEFL' ? 'bg-[#041424] text-white' : 'bg-white'}`}>TOEFL</button>
                    <button onClick={() => setLangCertFilter('TOEIC')} className={`px-2.5 py-1 rounded border text-[11px] uppercase cursor-pointer ${langCertFilter === 'TOEIC' ? 'bg-[#041424] text-white' : 'bg-white'}`}>TOEIC</button>
                    <button onClick={() => setLangCertFilter('TFI')} className={`px-2.5 py-1 rounded border text-[11px] uppercase cursor-pointer ${langCertFilter === 'TFI' ? 'bg-[#041424] text-white' : 'bg-white'}`}>TFI</button>
                  </div>
                </div>

                <div className="bg-white border border-neutral-border rounded-xl shadow-sm overflow-hidden overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-[#041424] text-white">
                      <tr>
                        <th className="p-3 font-semibold uppercase">Candidate</th>
                        <th className="p-3 font-semibold uppercase">Requested Cert</th>
                        <th className="p-3 font-semibold uppercase">Session Goal</th>
                        <th className="p-3 font-semibold uppercase">Current Status</th>
                        {!isReadOnly() && <th className="p-3 font-semibold uppercase">Status Check Action</th>}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-neutral-text">
                      {filteredLangRegs.map((l) => (
                        <tr key={l.id} className="hover:bg-neutral-pearl/30">
                          <td className="p-3 font-bold text-brand-navy">
                            {l.name}
                            <span className="text-[10px] text-neutral-secondary font-mono block">{l.email} | {l.phone}</span>
                          </td>
                          <td className="p-3 font-bold text-brand-royal">{l.certification}</td>
                          <td className="p-3 font-medium text-brand-navy">{l.sessionDate}</td>
                          <td className="p-3">
                            <span className={`px-2.5 py-1 text-[9px] uppercase font-bold rounded-full border ${
                              l.status === 'Paid' ? 'bg-emerald-50 text-emerald-800 border-emerald-250' : 'bg-amber-50 text-amber-800'
                            }`}>
                              {l.status}
                            </span>
                          </td>
                          {!isReadOnly() && (
                            <td className="p-3 space-x-1.5 flex items-center">
                              <button 
                                onClick={() => handleUpdateLanguageStatus(l.id, 'Registered')}
                                className="text-[10px] font-bold border border-slate-200 px-2 py-1 rounded hover:bg-neutral-pearl cursor-pointer"
                              >
                                Registered
                              </button>
                              <button 
                                onClick={() => handleUpdateLanguageStatus(l.id, 'Paid')}
                                className="text-[10px] font-bold border border-emerald-200 text-emerald-700 bg-emerald-50/40 px-2 py-1 rounded hover:bg-emerald-50 cursor-pointer"
                              >
                                Settle Paid
                              </button>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            )}

            {/* ────────────────────────── 4. MODULE: NEWS NOW@RIS JOURNAL EDITOR ───────────────────────── */}
            {activeWorkspace === 'news' && (
              <div className="space-y-6 text-left">
                
                <div className="flex justify-between items-center pb-3 border-b border-gray-150">
                  <h3 className="font-sans font-bold text-sm text-[#041424] uppercase">RIS Journal Catalog</h3>
                  {!isReadOnly() && (
                    <button 
                      onClick={() => setIsAddingNews(!isAddingNews)}
                      className="bg-[#041424] hover:bg-brand-royal text-white text-[11px] font-bold px-3 py-1.5 rounded flex items-center gap-2 cursor-pointer"
                    >
                      <Plus className="w-4 h-4 text-white" />
                      Add Article
                    </button>
                  )}
                </div>

                {isAddingNews && (
                  <form onSubmit={handleAddNews} className="bg-white border border-neutral-border rounded-xl p-5 space-y-4 shadow-sm text-xs">
                    <h4 className="font-sans font-bold text-brand-navy border-b border-gray-100 pb-2 uppercase">Create News Article Row</h4>
                    
                    <div className="space-y-1">
                      <label className="font-semibold text-brand-navy">News Title</label>
                      <input 
                        type="text"
                        required
                        placeholder="IGCSE high academic scores board revealed..."
                        value={newsForm.title}
                        onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                        className="w-full border border-neutral-border rounded p-2 focus:border-brand-royal outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-brand-navy">Featured details Content</label>
                      <textarea 
                        rows={4}
                        required
                        placeholder="Write dynamic content text..."
                        value={newsForm.content}
                        onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                        className="w-full border border-neutral-border rounded p-2 focus:border-brand-royal outline-none font-sans"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-semibold text-brand-navy">Category</label>
                        <select 
                          value={newsForm.category}
                          onChange={(e: any) => setNewsForm({ ...newsForm, category: e.target.value })}
                          className="w-full border bg-white border-neutral-border rounded p-2 outline-none"
                        >
                          <option value="Event">Event</option>
                          <option value="Academic Result">Academic Result</option>
                          <option value="Announcement">Announcement</option>
                          <option value="School Life">School Life</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="font-semibold text-brand-navy">Seeded Image CDN URL</label>
                        <input 
                          type="text"
                          placeholder="https://picsum.photos/seed/etc/800/450"
                          value={newsForm.image}
                          onChange={(e) => setNewsForm({ ...newsForm, image: e.target.value })}
                          className="w-full border border-neutral-border rounded p-2 focus:border-brand-royal outline-none font-mono"
                        />
                      </div>
                    </div>

                    <button 
                      type="submit"
                      className="bg-brand-royal text-white px-4 py-2 font-bold rounded uppercase tracking-wider shadow cursor-pointer"
                    >
                      Publish Article
                    </button>
                  </form>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {news.map((n) => (
                    <div key={n.id} className="bg-white border border-neutral-border rounded-xl p-4 flex flex-col justify-between shadow-sm">
                      <div className="space-y-3">
                        <div className="relative aspect-video rounded-lg overflow-hidden bg-neutral-pearl">
                          <img src={n.image} alt={n.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          <span className="absolute top-2 left-2 bg-brand-navy text-white text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                            {n.category}
                          </span>
                        </div>
                        <h4 className="font-sans font-bold text-sm text-brand-navy">{n.title}</h4>
                        <p className="text-neutral-text text-[11px] leading-relaxed line-clamp-3 font-sans">{n.content}</p>
                      </div>

                      <div className="border-t border-gray-50 mt-4 pt-3 flex items-center justify-between text-[11px]">
                        <span className="text-neutral-secondary">{n.date}</span>
                        {!isReadOnly() && (
                          <button 
                            onClick={() => handleDeleteNews(n.id)}
                            className="bg-rose-50 text-rose-700 hover:bg-rose-100 p-1.5 rounded border border-rose-200 cursor-pointer flex items-center gap-1.5 font-bold"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* ────────────────────────── 5. MODULE: GALLERY PHOTO MODULE ───────────────────────── */}
            {activeWorkspace === 'gallery' && (
              <div className="space-y-6 text-left">
                
                <div className="flex justify-between items-center border-b border-neutral-border pb-3">
                  <h3 className="font-sans font-bold text-sm text-brand-navy uppercase">Administrative photo boards</h3>
                  {!isReadOnly() && (
                    <button 
                      onClick={() => setIsAddingGallery(!isAddingGallery)}
                      className="bg-[#041424] text-white text-[11px] font-bold px-3 py-1.5 rounded flex items-center gap-2 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" /> Add Photo
                    </button>
                  )}
                </div>

                {isAddingGallery && (
                  <form onSubmit={handleAddGallery} className="bg-white border rounded-xl p-5 space-y-4 max-w-md text-xs">
                    <h4 className="font-sans font-bold text-brand-navy uppercase border-b pb-2">Add Photo archives</h4>
                    
                    <div className="space-y-1">
                      <label className="font-semibold text-brand-navy">Descriptive Title</label>
                      <input 
                        type="text" required placeholder="Chemistry class dynamic testing..."
                        value={galleryForm.title} onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                        className="w-full border rounded p-2 text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-semibold text-brand-navy">Album Group</label>
                        <select 
                          value={galleryForm.album} onChange={(e: any) => setGalleryForm({ ...galleryForm, album: e.target.value })}
                          className="w-full bg-white border rounded p-2 text-xs"
                        >
                          <option value="Campus">Campus</option>
                          <option value="Events">Events</option>
                          <option value="Sports">Sports</option>
                          <option value="Ceremonies">Ceremonies</option>
                          <option value="Activities">Activities</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="font-semibold text-brand-navy">Image link URL</label>
                        <input 
                          type="text" required placeholder="https://picsum.photos/seed/etc/800/600"
                          value={galleryForm.url} onChange={(e) => setGalleryForm({ ...galleryForm, url: e.target.value })}
                          className="w-full border rounded p-2 text-xs font-mono"
                        />
                      </div>
                    </div>

                    <button type="submit" className="bg-brand-royal text-white px-4 py-2 font-bold rounded uppercase">Save Photo</button>
                  </form>
                )}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {gallery.map((g) => (
                    <div key={g.id} className="bg-white border rounded-xl overflow-hidden shadow-sm flex flex-col justify-between">
                      <div className="relative aspect-video">
                        <img src={g.url} alt={g.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        <span className="absolute top-2 left-2 bg-[#041424] text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase font-mono">
                          {g.album}
                        </span>
                      </div>
                      <div className="p-3 flex items-center justify-between">
                        <span className="font-bold text-brand-navy leading-tight line-clamp-1">{g.title}</span>
                        {!isReadOnly() && (
                          <button 
                            onClick={() => handleDeleteGallery(g.id)}
                            className="text-rose-600 hover:text-rose-800 p-1 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* ────────────────────────── 6. MODULE: TESTIMONIALS SPOTLIGHT MODULE ───────────────────────── */}
            {activeWorkspace === 'testimonials' && (
              <div className="space-y-6 text-left text-xs">
                
                <div className="flex justify-between items-center border-b border-neutral-border pb-3">
                  <h3 className="font-sans font-bold text-sm text-brand-navy uppercase">Homepage reviews and testimonials</h3>
                  {!isReadOnly() && (
                    <button 
                      onClick={() => setIsAddingTestimonial(!isAddingTestimonial)}
                      className="bg-[#041424] text-white font-bold px-3 py-1.5 rounded flex items-center gap-2 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" /> Add Review
                    </button>
                  )}
                </div>

                {isAddingTestimonial && (
                  <form onSubmit={handleAddTestimonial} className="bg-white border rounded-xl p-5 space-y-4 max-w-md text-xs">
                    <h4 className="font-sans font-bold text-brand-navy uppercase border-b pb-2">Create parent review sills</h4>
                    
                    <div className="space-y-1">
                      <label className="font-semibold text-brand-navy">Author Full Name</label>
                      <input 
                        type="text" required placeholder="e.g. Dr. Florence Ngando"
                        value={testimonialForm.name} onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
                        className="w-full border rounded p-2"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-brand-navy">Role context</label>
                      <input 
                        type="text" required placeholder="e.g. Parent of Cambridge Year 11 Student"
                        value={testimonialForm.role} onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })}
                        className="w-full border rounded p-2"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-brand-navy">Citations quote</label>
                      <textarea 
                        rows={3} required placeholder="Write testimonials copy..."
                        value={testimonialForm.text} onChange={(e) => setTestimonialForm({ ...testimonialForm, text: e.target.value })}
                        className="w-full border rounded p-2 font-sans"
                      />
                    </div>

                    <button type="submit" className="bg-brand-royal text-white px-4 py-2 font-bold rounded uppercase">Save Testimonial</button>
                  </form>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {testimonials.map((t) => (
                    <div key={t.id} className="bg-white border rounded-xl p-5 space-y-4 flex flex-col justify-between shadow-sm">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-bold text-brand-navy leading-tight">{t.name}</span>
                          <span className="text-[10px] text-neutral-secondary">{t.role}</span>
                        </div>
                        <p className="font-serif italic text-neutral-text leading-relaxed">"{t.text}"</p>
                      </div>

                      <div className="flex items-center justify-between border-t border-gray-50 pt-2.5 text-[11px]">
                        <span className="font-bold text-emerald-700">Rating Stars: {t.rating} / 5</span>
                        
                        <div className="space-x-2">
                          <button 
                            onClick={() => handleToggleTestimonial(t.id, 'featured', !t.featured)}
                            className={`px-2 py-1 rounded text-[10px] font-bold border cursor-pointer ${
                              t.featured ? 'bg-amber-100 border-amber-300 text-amber-800' : 'bg-slate-50 border-slate-200 text-slate-800'
                            }`}
                          >
                            {t.featured ? "Featured on Home" : "Set Featured"}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* ────────────────────────── 7. MODULE: PROGRAMS & TUITION FEES ───────────────────────── */}
            {activeWorkspace === 'tuition' && (
              <div className="space-y-6 text-left text-xs">
                <p className="text-neutral-secondary">
                  Configure tuition fees schedules displayed to parent visitors on active programs modules.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {programs.map((p) => (
                    <div key={p.id} className="bg-white border rounded-xl p-5 space-y-4 shadow-sm flex flex-col justify-between">
                      <div className="space-y-2 text-left">
                        <span className="text-[9px] font-bold text-brand-sky uppercase tracking-wider block">ID: {p.id}</span>
                        <h4 className="font-sans font-bold text-sm text-brand-navy">{p.title}</h4>
                        <p className="text-[11px] text-neutral-text leading-relaxed">{p.desc}</p>
                      </div>

                      <div className="border-t pt-3.5 flex items-center justify-between gap-3">
                        <div>
                          <span className="text-[9px] uppercase font-bold text-neutral-secondary">Fee text rate</span>
                          <input 
                            type="text" 
                            defaultValue={p.tuitionFee}
                            id={`tuition-fee-input-${p.id}`}
                            className="bg-neutral-pearl border border-neutral-border p-1.5 rounded text-xs font-semibold focus:border-brand-royal"
                          />
                        </div>

                        <button 
                          onClick={() => {
                            const val = (document.getElementById(`tuition-fee-input-${p.id}`) as HTMLInputElement)?.value;
                            if (val) handleUpdateTuitionFee(p.id, val);
                          }}
                          className="bg-[#041424] hover:bg-brand-royal text-white px-3 py-2 rounded text-[10.5px] font-bold uppercase tracking-wider cursor-pointer"
                        >
                          Save Fee
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ────────────────────────── 8. MODULE: PARTNER UNIVERSITIES ───────────────────────── */}
            {activeWorkspace === 'partners' && (
              <div className="space-y-6 text-left text-xs">
                
                <div className="flex justify-between items-center border-b pb-3">
                  <h3 className="font-bold text-brand-navy uppercase">Partner Universities index</h3>
                  <button 
                    onClick={() => setIsAddingPartner(!isAddingPartner)}
                    className="bg-[#041424] text-white font-bold px-3 py-1.5 rounded flex items-center gap-2 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> Add Partner
                  </button>
                </div>

                {isAddingPartner && (
                  <form onSubmit={handleAddPartner} className="bg-white border rounded-xl p-5 space-y-4 max-w-md text-xs">
                    <h4 className="font-bold uppercase border-b pb-2">Add college sittings</h4>
                    <input type="text" placeholder="College Name (e.g. McGill University)" required value={partnerForm.name} onChange={(e) => setPartnerForm({ ...partnerForm, name: e.target.value })} className="w-full border rounded p-2" />
                    <input type="text" placeholder="Country (e.g. Canada)" required value={partnerForm.country} onChange={(e) => setPartnerForm({ ...partnerForm, country: e.target.value })} className="w-full border rounded p-2" />
                    <input type="text" placeholder="Target Specialty (e.g. Engineering)" value={partnerForm.specialty} onChange={(e) => setPartnerForm({ ...partnerForm, specialty: e.target.value })} className="w-full border rounded p-2" />
                    <input type="url" placeholder="Official Website Link (e.g. https://www.mcgill.ca)" value={partnerForm.website} onChange={(e) => setPartnerForm({ ...partnerForm, website: e.target.value })} className="w-full border rounded p-2" />
                    <textarea placeholder="General descriptions..." value={partnerForm.description} onChange={(e) => setPartnerForm({ ...partnerForm, description: e.target.value })} className="w-full border rounded p-2" />
                    <button type="submit" className="bg-brand-royal text-white px-4 py-2 font-bold rounded uppercase">Save Partner</button>
                  </form>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {partners.map((p) => (
                    <div key={p.id} className="bg-white border p-4 rounded-xl flex flex-col justify-between text-left">
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <span className="text-xl">{p.logo}</span>
                          <div>
                            <h4 className="font-bold text-brand-navy leading-tight">{p.name}</h4>
                            <span className="text-stone-550 text-[10px]">{p.country}</span>
                          </div>
                        </div>
                        <p className="text-[11px] leading-relaxed select-none">{p.description}</p>
                      </div>

                      <button onClick={() => handleDeletePartner(p.id)} className="text-rose-600 font-bold uppercase text-[10px] mt-4 flex items-center gap-1">
                        <Trash2 className="w-3.5 h-3.5" /> Remove Partner
                      </button>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* ────────────────────────── 9. MODULE: FACULTY REGISTERS ───────────────────────── */}
            {activeWorkspace === 'teachers' && (
              <div className="space-y-6 text-left text-xs">
                
                <div className="flex justify-between items-center border-b pb-3">
                  <h3 className="font-bold text-brand-navy uppercase">Pedagogical faculty team</h3>
                  <button 
                    onClick={() => setIsAddingTeacher(!isAddingTeacher)}
                    className="bg-[#041424] text-white font-bold px-3 py-1.5 rounded flex items-center gap-2 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> Add Teacher
                  </button>
                </div>

                {isAddingTeacher && (
                  <form onSubmit={handleAddTeacher} className="bg-white border rounded-xl p-5 space-y-4 max-w-md text-xs">
                    <h4 className="font-bold border-b pb-2 uppercase">Create Teacher Profile</h4>
                    <input type="text" placeholder="Teacher Name (e.g. Dr. George)" required value={teacherForm.name} onChange={(e) => setTeacherForm({ ...teacherForm, name: e.target.value })} className="w-full border rounded p-2" />
                    <input type="text" placeholder="Role (e.g. Principal)" required value={teacherForm.role} onChange={(e) => setTeacherForm({ ...teacherForm, role: e.target.value })} className="w-full border rounded p-2" />
                    <input type="text" placeholder="Specialty Subject (e.g. Advanced Calculus)" value={teacherForm.subject} onChange={(e) => setTeacherForm({ ...teacherForm, subject: e.target.value })} className="w-full border rounded p-2" />
                    <textarea placeholder="Bio notes..." value={teacherForm.bio} onChange={(e) => setTeacherForm({ ...teacherForm, bio: e.target.value })} className="w-full border rounded p-2 font-sans" />
                    <input type="text" placeholder="Education Degree" value={teacherForm.education} onChange={(e) => setTeacherForm({ ...teacherForm, education: e.target.value })} className="w-full border rounded p-2" />
                    <button type="submit" className="bg-brand-royal text-white px-4 py-2 font-bold rounded uppercase">Save Teacher</button>
                  </form>
                )}

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {teachers.map((t) => (
                    <div key={t.id} className="bg-white border rounded-xl overflow-hidden shadow-sm flex flex-col justify-between">
                      <div className="aspect-[3/4] bg-neutral-pearl">
                        <img src={t.image} alt={t.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="p-4 space-y-2">
                        <h4 className="font-bold text-brand-navy leading-tight">{t.name}</h4>
                        <span className="text-[10px] text-brand-royal font-semibold uppercase">{t.role}</span>
                        <p className="text-[11px] leading-relaxed line-clamp-3 font-sans">{t.bio}</p>
                        
                        <button onClick={() => handleDeleteTeacher(t.id)} className="text-rose-600 text-[10px] uppercase font-bold flex items-center gap-1 pt-2.5 border-t border-gray-50 cursor-pointer">
                          <Trash2 className="w-3.5 h-3.5" /> Delete Member
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* ────────────────────────── 10. MODULE: FAQ BOARD ───────────────────────── */}
            {activeWorkspace === 'faq' && (
              <div className="space-y-6 text-left text-xs">
                
                <div className="flex justify-between items-center border-b pb-3">
                  <h3 className="font-bold text-brand-navy uppercase">FAQ Q&A sessional management</h3>
                  <button 
                    onClick={() => setIsAddingFaq(!isAddingFaq)}
                    className="bg-[#041424] text-white font-bold px-3 py-1.5 rounded flex items-center gap-2 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> Add FAQ
                  </button>
                </div>

                {isAddingFaq && (
                  <form onSubmit={handleAddFaq} className="bg-white border rounded-xl p-5 space-y-4 max-w-md text-xs">
                    <h4 className="font-bold border-b pb-2 uppercase text-xs">Create FAQ item</h4>
                    <input type="text" placeholder="Question Text" required value={faqForm.question} onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })} className="w-full border rounded p-2" />
                    <textarea rows={3} placeholder="Answer description text" required value={faqForm.answer} onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })} className="w-full border rounded p-2 font-sans" />
                    <button type="submit" className="bg-brand-royal text-white px-4 py-2 font-bold rounded uppercase">Save FAQ</button>
                  </form>
                )}

                <div className="space-y-4 max-w-3xl">
                  {faqs.map((f) => (
                    <div key={f.id} className="bg-white border rounded-xl p-4 flex items-start justify-between shadow-sm">
                      <div className="space-y-2 text-left">
                        <h4 className="font-sans font-bold text-brand-navy flex items-center gap-1.5">
                          Question ID: {f.id} | {f.question}
                        </h4>
                        <p className="text-neutral-text font-sans">{f.answer}</p>
                      </div>
                      <button onClick={() => handleDeleteFaq(f.id)} className="text-rose-600 hover:text-rose-800 p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* ────────────────────────── 11. MODULE: USERS ROLES ACCOUNTS ───────────────────────── */}
            {activeWorkspace === 'users' && (
              <div className="space-y-6 text-left text-xs">
                <p className="text-neutral-secondary">
                  Configure dynamic security roles sittings. Users authenticate against standard verified passwords mapping.
                </p>

                <div className="bg-white border rounded-xl shadow-sm overflow-hidden max-w-3xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#041424] text-white">
                      <tr>
                        <th className="p-3 font-semibold">User Profile name</th>
                        <th className="p-3 font-semibold">Username token</th>
                        <th className="p-3 font-semibold">Email registry</th>
                        <th className="p-3 font-semibold">Auth Class Role</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-neutral-text">
                      {users.map((u) => (
                        <tr key={u.id} className="hover:bg-neutral-pearl/50">
                          <td className="p-3 font-bold text-brand-navy">{u.name}</td>
                          <td className="p-3 font-mono font-medium">{u.username}</td>
                          <td className="p-3 font-mono">{u.email}</td>
                          <td className="p-3">
                            <span className="px-2.5 py-1 text-[9px] uppercase font-bold bg-brand-royal/10 text-brand-royal rounded border border-brand-royal/20">
                              {u.role}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </main>
        </div>
      )}
    </div>
  );
}
