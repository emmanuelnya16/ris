/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import fs from 'fs';
import path from 'path';
// Removed fileURLToPath as it's unused and causes esbuild issues with CJS

const PORT = Number(process.env.PORT) || 3000;
const DB_FILE = process.env.VERCEL 
  ? path.join('/tmp', 'school_database.json') 
  : path.join(process.cwd(), 'school_database.json');

// Interface schema for entire stored JSON state
interface DBState {
  applications: any[];
  languageRegs: any[];
  newsItems: any[];
  galleryItems: any[];
  testimonials: any[];
  partners: any[];
  teachers: any[];
  faqItems: any[];
  programs: any[];
  users: any[];
}

// Default initial high-fidelity academic datasets
const DEFAULT_STATE: DBState = {
  applications: [
    {
      id: "app_1",
      parentName: "Marie-Louise Ndip",
      parentEmail: "mlndip@compuserve.cm",
      parentPhone: "+237 699 448 211",
      studentName: "Brenda Ndip",
      studentDob: "2012-08-14",
      requestedLevel: "Grade 9 (Year 10)",
      currSchool: "Douala Legacy Academy",
      progInterest: "Cambridge",
      dateSubmitted: new Date(Date.now() - 3.5 * 24 * 60 * 60 * 1000).toISOString(), // 3.5 days ago (Alert trigger >48h)
      status: "Pending",
      internalNotes: "Review with English teacher. Student holds strong marks in Sciences.",
      timeLimitDays: 4,
      messageHistory: []
    },
    {
      id: "app_2",
      parentName: "Dr. Richard Ngué",
      parentEmail: "richard.ngue@clinique-bonanjo.com",
      parentPhone: "+237 671 223 901",
      studentName: "Cedric Ngué",
      studentDob: "2010-03-22",
      requestedLevel: "Diploma Programme Year 1",
      currSchool: "Lycée Bilingue de Bonabéri",
      progInterest: "IB",
      dateSubmitted: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      status: "Interview Scheduled",
      internalNotes: "Interview set for June 4th at 10:00 AM. Father is highly supportive.",
      timeLimitDays: 1,
      messageHistory: [
        {
          id: "m_1",
          sender: "staff",
          date: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
          subject: "Admissions Interview - Rousseau International",
          body: "Hello Dr. Ngué, we are pleased to confirm your son Cedric's interview on Thursday morning. We look forward to meeting you both."
        }
      ]
    },
    {
      id: "app_3",
      parentName: "Sarah Al-Fathy",
      parentEmail: "sarah.fathy@gulfshipping.ae",
      parentPhone: "+237 655 089 122",
      studentName: "Zayd Al-Fathy",
      studentDob: "2014-11-05",
      requestedLevel: "Grade 7 (Year 8)",
      currSchool: "International School of Cairo",
      progInterest: "General",
      dateSubmitted: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      status: "Accepted",
      internalNotes: "English proficiency test passed perfectly. Outstanding portfolio. Enrollment deposit received.",
      timeLimitDays: 0,
      messageHistory: []
    }
  ],
  languageRegs: [
    {
      id: "reg_1",
      name: "Jean-Pierre Tchakounté",
      email: "jp_tchako@yahoo.fr",
      phone: "+237 691 550 439",
      certification: "IELTS",
      sessionDate: "June 20, 2026",
      status: "Paid",
      dateSubmitted: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      internalNotes: "Receipt checked. Registered for IELTS Academic on June session."
    },
    {
      id: "reg_2",
      name: "Audrey Biya",
      email: "b.audrey@outlook.com",
      phone: "+237 677 889 004",
      certification: "TOEFL",
      sessionDate: "July 12, 2026",
      status: "Contacted",
      dateSubmitted: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      internalNotes: "Sent information flyer regarding standard study hours."
    },
    {
      id: "reg_3",
      name: "Armand Mbarga",
      email: "armandm@ict-group.cm",
      phone: "+237 654 332 211",
      certification: "TOEIC",
      sessionDate: "September 05, 2026",
      status: "Registered",
      dateSubmitted: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      internalNotes: "Professional track student. Needs corporate invoice."
    }
  ],
  newsItems: [
    {
      id: "news_1",
      title: "Rousseau International Achieves 100% Cambridge Examination Pass Rate",
      content: "We are immensely proud to announce that our Senior class has achieved historical success in the recent Cambridge IGCSE and A-Level exam sessions. Two of our students scored Top in Cameroon for Mathematics and Advanced Physics. This record reinforces our status as Cameroon's premier international academy.",
      date: "May 24, 2026",
      category: "Academic Result",
      status: "Published",
      featured: true,
      image: "https://picsum.photos/seed/studnetsuccess/800/450"
    },
    {
      id: "news_2",
      title: "Summer English Intensive Prep Courses at British Council Language Center",
      content: "Are you planning to study abroad this fall? The Modern Language Centre at Rousseau is launching its signature intensive prep tracks for IELTS, TOEFL, and TFI. Dynamic sessions led by native speakers and Pearson-certified tutors are scheduled every weekday afternoon. Secure your seating before June 15th.",
      date: "May 28, 2026",
      category: "Event",
      status: "Published",
      featured: true,
      image: "https://picsum.photos/seed/languageprep/800/450"
    },
    {
      id: "news_3",
      title: "New Modern Science Laboratory Commons Design Revealed",
      content: "In alignment with the OSSD core standards, RIS is building a state-of-the-art Science and Robotics commons. Equipped with augmented reality tools, dual-fume hoods, and dedicated project pods, the wing is slated to open for the autumn term.",
      date: "May 30, 2026",
      category: "School Life",
      status: "Published",
      featured: false,
      image: "https://picsum.photos/seed/roboticlab/800/450"
    }
  ],
  galleryItems: [
    { id: "gal_1", title: "Modern Science Lab Demonstration", album: "Campus", url: "https://picsum.photos/seed/scilab/800/600", featured: true },
    { id: "gal_2", title: "IB Diploma Year 2 Research Presentation", album: "Events", url: "https://picsum.photos/seed/ibevents/800/600", featured: true },
    { id: "gal_3", title: "Annual Football Tournament Victory", album: "Sports", url: "https://picsum.photos/seed/rilsport/800/600", featured: true },
    { id: "gal_4", title: "British Council Exam Center Hall", album: "Campus", url: "https://picsum.photos/seed/bcent/800/600", featured: false },
    { id: "gal_5", title: "Honours Graduation Ceremony", album: "Ceremonies", url: "https://picsum.photos/seed/gradsc/800/600", featured: true },
    { id: "gal_6", title: "Robotics Club Dynamic Testing", album: "Activities", url: "https://picsum.photos/seed/robotics/800/600", featured: false }
  ],
  testimonials: [
    {
      id: "test_1",
      name: "Dr. Florence Ngando",
      role: "Parent of Cambridge Year 11 Student",
      text: "Enrolling our children in Rousseau International was the best decision for their global futures. The rigor of the Cambridge curriculum matched with genuine individual care prepared them to compete on any global stage.",
      rating: 5,
      image: "https://picsum.photos/seed/parent1/150/150",
      active: true,
      featured: true
    },
    {
      id: "test_2",
      name: "Marc-Aurele Kamga",
      role: "Alumni / McGill University Freshman",
      text: "Rousseau's IB Program transformed the way I compose my research and analyze complex problems. I obtained advanced standings at McGill due to my higher level credits.",
      rating: 5,
      image: "https://picsum.photos/seed/alumn/150/150",
      active: true,
      featured: true
    },
    {
      id: "test_3",
      name: "Stéphanie Desroches",
      role: "Expat Parent / Canadian OSSD Track",
      text: "The transition from British Columbia to Douala was made entirely seamless by RIS. Having a certified Ontario Secondary Diploma (OSSD) path within Central Africa is unique and highly valuable.",
      rating: 5,
      image: "https://picsum.photos/seed/parent2/150/150",
      active: true,
      featured: false
    }
  ],
  partners: [
    { id: "part_1", name: "University of Toronto", country: "Canada", specialty: "STEM / Business", description: "Top Canadian university offering direct admissions pathways for Rousseau OSSD and IB graduates.", logo: "🇨🇦", active: true, website: "https://www.utoronto.ca" },
    { id: "part_2", name: "McGill University", country: "Canada", specialty: "Engineering / Arts", description: "Renowned institution offering advanced transfer credits for our International Baccalaureate high scorers.", logo: "🇨🇦", active: true, website: "https://www.mcgill.ca" },
    { id: "part_3", name: "King's College London", country: "United Kingdom", specialty: "Law / Global Health", description: "Accepts Cambridge International A-Levels with fast-track admissions status.", logo: "🇬🇧", active: true, website: "https://www.kcl.ac.uk" },
    { id: "part_4", name: "Sorbonne Université", country: "France", specialty: "Humanities / Medicine", description: "Direct partner for advanced French language credentials and collaborative European entries.", logo: "🇫🇷", active: true, website: "https://www.sorbonne-universite.fr" }
  ],
  teachers: [
    { id: "teach_1", name: "Dr. Helen Carter", role: "Principal & Head of School", subject: "Educational Leadership", bio: "With over 20 years heading elite bilingual academies across West Africa and Europe, Helen directs Rousseau with an unyielding standard for excellence.", education: "Ph.D. in Education (Oxford University)", image: "https://picsum.photos/seed/principal/300/400", active: true },
    { id: "teach_2", name: "Prof. George Ndip", role: "Head of Mathematics (Secondary)", subject: "A-Level Calculus & Physics", bio: "George is highly celebrated across Cameroon for sending multiple Olympiad candidates into Ivy Leagues. He keeps a rigorous but deeply inspiring classroom.", education: "M.Sc. in Physics (University of Yaoundé I)", image: "https://picsum.photos/seed/tmath/300/400", active: true },
    { id: "teach_3", name: "Mrs. Evelyn Brossard", role: "Director of IB Diploma", subject: "English Literature & Theory of Knowledge", bio: "Evelyn ensures that students develop global-mindedness, rich critical writing habits, and beautiful oral presentation postures.", education: "M.A. in Comparative Lit (Sorbonne College)", image: "https://picsum.photos/seed/tib/300/400", active: true },
    { id: "teach_4", name: "Mr. Samuel Tagne", role: "Director of Language Certifications", subject: "IELTS & TOEFL Academic Tutors", bio: "Samuel coordinates tests for ETS and the British Council. He has over 15 years of standardizing language prep pedagogy.", education: "M.Ed. in TESOL (University of York)", image: "https://picsum.photos/seed/tlang/300/400", active: true }
  ],
  faqItems: [
    { id: "faq_1", question: "What curricula options exist for high school years?", answer: "At Rousseau, we provide three premier tracks: the Cambridge Assessment International Education (IGCSE & A-Levels), the International Baccalaureate (IB) Diploma Programme, and the Ontario Secondary School Diploma (OSSD - Canadian Track). Families choose the path that best matches their child's target universities.", category: "General", active: true, order: 1 },
    { id: "faq_2", question: "Is Rousseau an authorized center for English examinations?", answer: "Yes, we are highly official. RIS is an accredited British Council Language Centre and an authorized ETS center. We host regular sit-in sessions for IELTS, TOEFL, TOEIC, and French TFI with integrated dynamic prep workshops.", category: "Language Exams", active: true, order: 2 },
    { id: "faq_3", question: "Can we submit registration forms entirely online?", answer: "Absolutely. Parents can complete the 4-step Admissions process online. Once submitted, our team reviews current school records, schedules interviews/placement tests within 48 hours, and notifies outcomes digitally.", category: "Admissions", active: true, order: 3 },
    { id: "faq_4", question: "Where is the physical campus located in Douala?", answer: "Our secure prestige campus is located in Douala, Cameroon (Bonanjo Administrative District), featuring fully safe laboratories, digital media hubs, spacious activity rooms, and a modern language library.", category: "Campus Life", active: true, order: 4 }
  ],
  programs: [
    {
      id: "prog_cambridge",
      title: "Cambridge International Curriculum",
      desc: "Worldwide gold-standard secondary curriculum culminating in internationally celebrated IGCSE and Advanced Levels (A-Levels) credentials.",
      highlights: [
        "In-depth focus on STEM, Advanced Calculus, and English Humanities",
        "Top-in-Country awards recognition by Cambridge Assessment",
        "Direct access to premium universities across UK, Europe, and UAE"
      ],
      active: true,
      tuitionFee: "$6,500 / year"
    },
    {
      id: "prog_ib",
      title: "International Baccalaureate (IB) Diploma",
      desc: "Comprehensive 2-year prestige program developing globally cautious, intellectually rigorous leaders through Theory of Knowledge (TOK) and CAS.",
      highlights: [
        "Rigorous 4,000-word Extended Essay mentoring",
        "Pre-university standard laboratory research hours",
        "Direct second-year standings advanced credits at top US & Canada Ivy Leagues"
      ],
      active: true,
      tuitionFee: "$7,200 / year"
    },
    {
      id: "prog_ossd",
      title: "Ontario Secondary School Diploma (OSSD)",
      desc: "Official Canadian High School Diploma pathway, graded on continuous evaluation as in Ontario, avoiding final single-exam high-stress.",
      highlights: [
        "Direct OUAC code application for all Canadian universities",
        "Focus on cooperative teamwork and real-world projects",
        "Recognized on equal terms with domestic Canadian graduates"
      ],
      active: true,
      tuitionFee: "$5,800 / year"
    },
    {
      id: "prog_languages",
      title: "English Certification Center",
      desc: "Authorized venue for elite British Council and ETS language exams with direct tailored pre-registration slots.",
      highlights: [
        "IELTS, TOEFL, TOEIC, and TFI official examination sit-ins",
        "Intensive mock-drills led by certified ETS examiners",
        "Official certification transcripts issued within 5-10 business days"
      ],
      active: true,
      tuitionFee: "$320 - $450 per session"
    }
  ],
  users: [
    { id: "u_1", username: "admin", name: "Fidèle Kengne", email: "fidele.kengne@rousseauinternational.org", role: "SuperAdmin" },
    { id: "u_2", username: "admissions", name: "Admissions Team", email: "admissions@rousseauinternational.org", role: "AdmissionsOfficer" },
    { id: "u_3", username: "comm", name: "Emmanuel Nya", email: "emmnauelnya16@gmail.com", role: "CommOfficer" },
    { id: "u_4", username: "viewer", name: "Standard Auditor", email: "audit@rousseauinternational.org", role: "Viewer" }
  ]
};

// Help load/save database state asynchronously
function getDBState(): DBState {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(DEFAULT_STATE, null, 2), 'utf-8');
      return DEFAULT_STATE;
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading database fallback to defaults:", err);
    return DEFAULT_STATE;
  }
}

function saveDBState(state: DBState) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(state, null, 2), 'utf-8');
  } catch (err) {
    console.error("Error writing database state:", err);
  }
}

const app = express();
app.use(express.json());

  // Log simple requests for monitoring
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });

  // ────────────────────────── AUTHENTICATION ──────────────────────────
  app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;
    const db = getDBState();
    
    // Simple password verification. Real app uses proper hashing, we do quick solid logic
    // Accept standard simple password for dev testing: 'rousseau2026' or username matches password
    const matchedUser = db.users.find(u => u.username === username);

    if (matchedUser && (password === 'rousseau2026' || password === username)) {
      return res.json({
        success: true,
        token: `mock_jwt_token_for_${matchedUser.role}_${Date.now()}`,
        user: matchedUser
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid credentials. Use 'admin', 'admissions', or 'comm' with password 'rousseau2026' to log in."
    });
  });

  // ──────────────────────────── ANALYTICS ────────────────────────────
  app.get('/api/stats', (req, res) => {
    const db = getDBState();
    const totalApps = db.applications.length;
    const totalLanguageRegs = db.languageRegs.length;

    // Status breakdown for applications
    const statusBreakdown = {
      Pending: db.applications.filter(a => a.status === 'Pending').length,
      'Interview Scheduled': db.applications.filter(a => a.status === 'Interview Scheduled').length,
      Accepted: db.applications.filter(a => a.status === 'Accepted').length,
      Rejected: db.applications.filter(a => a.status === 'Rejected').length,
      Waitlist: db.applications.filter(a => a.status === 'Waitlist').length,
    };

    // Warn of pending applications older than 48 hours is automatic alert
    const fortyEightHoursAgo = Date.now() - 48 * 60 * 60 * 1000;
    const stagnantCount = db.applications.filter(a => {
      const dbDate = new Date(a.dateSubmitted).getTime();
      return a.status === 'Pending' && dbDate < fortyEightHoursAgo;
    }).length;

    // Counts for dashboard
    res.json({
      totalApplications: totalApps,
      statusBreakdown,
      pendingLanguageRegs: db.languageRegs.filter(l => l.status === 'Contacted').length,
      stagnantAlerts: stagnantCount,
      totalNews: db.newsItems.length,
      totalTeachers: db.teachers.length
    });
  });

  // ────────────────────────── APPLICATIONS ──────────────────────────
  app.get('/api/applications', (req, res) => {
    res.json(getDBState().applications);
  });

  app.post('/api/applications', (req, res) => {
    const { parentName, parentEmail, parentPhone, studentName, studentDob, requestedLevel, currSchool, progInterest, birthCertFile, bulletinFile, medicalCertFile } = req.body;
    if (!parentName || !studentName || !parentEmail) {
      return res.status(400).json({ error: "Required fields parentName, parentEmail, studentName are missing." });
    }

    const db = getDBState();
    const newApp = {
      id: `app_${Date.now()}`,
      parentName,
      parentEmail,
      parentPhone: parentPhone || "",
      studentName,
      studentDob: studentDob || "",
      requestedLevel: requestedLevel || "Grade 7",
      currSchool: currSchool || "",
      progInterest: progInterest || "General",
      birthCertFile: birthCertFile || "",
      bulletinFile: bulletinFile || "",
      medicalCertFile: medicalCertFile || "",
      dateSubmitted: new Date().toISOString(),
      status: "Pending",
      internalNotes: "Online applicant. Needs profile inspection.",
      timeLimitDays: 4,
      messageHistory: []
    };

    db.applications.unshift(newApp);
    saveDBState(db);
    res.status(201).json(newApp);
  });

  app.put('/api/applications/:id', (req, res) => {
    const db = getDBState();
    const index = db.applications.findIndex(a => a.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: "Application not found." });

    const current = db.applications[index];
    const updated = {
      ...current,
      ...req.body,
      id: current.id, // Avoid ID overwrite
      dateSubmitted: current.dateSubmitted // Avoid dates overwrite
    };

    // Auto add notification message when status transitions
    if (req.body.status && req.body.status !== current.status) {
      updated.messageHistory.unshift({
        id: `m_${Date.now()}`,
        sender: 'staff',
        date: new Date().toISOString(),
        subject: `Enrollment Application Status Update: ${req.body.status}`,
        body: `Hello ${updated.parentName},\n\nWe would like to inform you that your registration candidacy for ${updated.studentName} has been transitioned to: [${req.body.status}].\nOur administration division will update you shortly on placement metrics.`
      });
    }

    db.applications[index] = updated;
    saveDBState(db);
    res.json(updated);
  });

  app.post('/api/applications/:id/messages', (req, res) => {
    const db = getDBState();
    const index = db.applications.findIndex(a => a.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: "Application not found." });

    const { subject, body } = req.body;
    if (!subject || !body) return res.status(400).json({ error: "Subject and Body required" });

    const newMessage = {
      id: `m_${Date.now()}`,
      sender: 'staff' as const,
      date: new Date().toISOString(),
      subject,
      body
    };

    db.applications[index].messageHistory.unshift(newMessage);
    saveDBState(db);
    res.json({ success: true, message: newMessage });
  });

  app.delete('/api/applications/:id', (req, res) => {
    const db = getDBState();
    const filtered = db.applications.filter(a => a.id !== req.params.id);
    db.applications = filtered;
    saveDBState(db);
    res.json({ success: true });
  });

  // ──────────────────────── LANGUAGE PRE-REGISTRATIONS ────────────────────────
  app.get('/api/language-regs', (req, res) => {
    res.json(getDBState().languageRegs);
  });

  app.post('/api/language-regs', (req, res) => {
    const { name, email, phone, certification, sessionDate } = req.body;
    if (!name || !email || !certification) {
      return res.status(400).json({ error: "Missing required certification metadata details." });
    }

    const db = getDBState();
    const newReg = {
      id: `reg_${Date.now()}`,
      name,
      email,
      phone: phone || "",
      certification,
      sessionDate: sessionDate || "Next Session Available",
      status: "Contacted",
      dateSubmitted: new Date().toISOString(),
      internalNotes: "Pre-registered online. Check background certifications goals."
    };

    db.languageRegs.unshift(newReg);
    saveDBState(db);
    res.status(201).json(newReg);
  });

  app.put('/api/language-regs/:id', (req, res) => {
    const db = getDBState();
    const index = db.languageRegs.findIndex(l => l.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: "Registration not found." });

    db.languageRegs[index] = { ...db.languageRegs[index], ...req.body, id: req.params.id };
    saveDBState(db);
    res.json(db.languageRegs[index]);
  });

  app.delete('/api/language-regs/:id', (req, res) => {
    const db = getDBState();
    db.languageRegs = db.languageRegs.filter(l => l.id !== req.params.id);
    saveDBState(db);
    res.json({ success: true });
  });

  // ─────────────────────────────── NEWS ───────────────────────────────
  app.get('/api/news', (req, res) => {
    res.json(getDBState().newsItems);
  });

  app.post('/api/news', (req, res) => {
    const { title, content, category, featured, image, status } = req.body;
    if (!title || !content) return res.status(400).json({ error: "Title and content required." });

    const db = getDBState();
    const newItem = {
      id: `news_${Date.now()}`,
      title,
      content,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      category: category || "School Life",
      status: status || "Published",
      featured: !!featured,
      image: image || "https://picsum.photos/seed/defaultnews/800/450"
    };

    db.newsItems.unshift(newItem);
    saveDBState(db);
    res.status(201).json(newItem);
  });

  app.put('/api/news/:id', (req, res) => {
    const db = getDBState();
    const index = db.newsItems.findIndex(n => n.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: "News item not found." });

    db.newsItems[index] = { ...db.newsItems[index], ...req.body, id: req.params.id };
    saveDBState(db);
    res.json(db.newsItems[index]);
  });

  app.delete('/api/news/:id', (req, res) => {
    const db = getDBState();
    db.newsItems = db.newsItems.filter(n => n.id !== req.params.id);
    saveDBState(db);
    res.json({ success: true });
  });

  // ───────────────────────────── GALLERY ─────────────────────────────
  app.get('/api/gallery', (req, res) => {
    res.json(getDBState().galleryItems);
  });

  app.post('/api/gallery', (req, res) => {
    const { title, album, url, featured } = req.body;
    if (!title || !url || !album) return res.status(400).json({ error: "Required details missing." });

    const db = getDBState();
    const newItem = {
      id: `gal_${Date.now()}`,
      title,
      album,
      url,
      featured: !!featured
    };

    db.galleryItems.push(newItem);
    saveDBState(db);
    res.status(201).json(newItem);
  });

  app.delete('/api/gallery/:id', (req, res) => {
    const db = getDBState();
    db.galleryItems = db.galleryItems.filter(g => g.id !== req.params.id);
    saveDBState(db);
    res.json({ success: true });
  });

  // ────────────────────────── TESTIMONIALS ──────────────────────────
  app.get('/api/testimonials', (req, res) => {
    res.json(getDBState().testimonials);
  });

  app.post('/api/testimonials', (req, res) => {
    const { name, role, text, rating, image, featured, active } = req.body;
    if (!name || !text) return res.status(400).json({ error: "Name and text are required." });

    const db = getDBState();
    const newItem = {
      id: `test_${Date.now()}`,
      name,
      role: role || "Parent",
      text,
      rating: rating || 5,
      image: image || "https://picsum.photos/seed/defaultavatar/150/150",
      featured: !!featured,
      active: active !== false
    };

    db.testimonials.push(newItem);
    saveDBState(db);
    res.status(201).json(newItem);
  });

  app.put('/api/testimonials/:id', (req, res) => {
    const db = getDBState();
    const index = db.testimonials.findIndex(t => t.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: "Testimonial not found." });

    db.testimonials[index] = { ...db.testimonials[index], ...req.body, id: req.params.id };
    saveDBState(db);
    res.json(db.testimonials[index]);
  });

  app.delete('/api/testimonials/:id', (req, res) => {
    const db = getDBState();
    db.testimonials = db.testimonials.filter(t => t.id !== req.params.id);
    saveDBState(db);
    res.json({ success: true });
  });

  // ──────────────────────────── PARTNERS ────────────────────────────
  app.get('/api/partners', (req, res) => {
    res.json(getDBState().partners);
  });

  app.post('/api/partners', (req, res) => {
    const { name, country, specialty, description, logo, active, website } = req.body;
    if (!name || !country) return res.status(400).json({ error: "Name and Country required." });

    const db = getDBState();
    const newItem = {
      id: `part_${Date.now()}`,
      name,
      country,
      specialty: specialty || "Academic Path",
      description: description || "",
      logo: logo || "🎓",
      active: active !== false,
      website: website || ""
    };

    db.partners.push(newItem);
    saveDBState(db);
    res.status(201).json(newItem);
  });

  app.put('/api/partners/:id', (req, res) => {
    const db = getDBState();
    const index = db.partners.findIndex(p => p.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: "Partner not found." });

    db.partners[index] = { ...db.partners[index], ...req.body, id: req.params.id };
    saveDBState(db);
    res.json(db.partners[index]);
  });

  app.delete('/api/partners/:id', (req, res) => {
    const db = getDBState();
    db.partners = db.partners.filter(p => p.id !== req.params.id);
    saveDBState(db);
    res.json({ success: true });
  });

  // ──────────────────────────── TEACHERS ────────────────────────────
  app.get('/api/teachers', (req, res) => {
    res.json(getDBState().teachers);
  });

  app.post('/api/teachers', (req, res) => {
    const { name, role, subject, bio, education, image, active } = req.body;
    if (!name || !role) return res.status(400).json({ error: "Name and role are required." });

    const db = getDBState();
    const newItem = {
      id: `teach_${Date.now()}`,
      name,
      role,
      subject: subject || "General Curriculum",
      bio: bio || "",
      education: education || "",
      image: image || "https://picsum.photos/seed/defaultteacher/300/400",
      active: active !== false
    };

    db.teachers.push(newItem);
    saveDBState(db);
    res.status(201).json(newItem);
  });

  app.put('/api/teachers/:id', (req, res) => {
    const db = getDBState();
    const index = db.teachers.findIndex(t => t.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: "Teacher not found." });

    db.teachers[index] = { ...db.teachers[index], ...req.body, id: req.params.id };
    saveDBState(db);
    res.json(db.teachers[index]);
  });

  app.delete('/api/teachers/:id', (req, res) => {
    const db = getDBState();
    db.teachers = db.teachers.filter(t => t.id !== req.params.id);
    saveDBState(db);
    res.json({ success: true });
  });

  // ────────────────────────────── FAQs ──────────────────────────────
  app.get('/api/faq', (req, res) => {
    res.json(getDBState().faqItems);
  });

  app.post('/api/faq', (req, res) => {
    const { question, answer, category, active } = req.body;
    if (!question || !answer) return res.status(400).json({ error: "Question and Answer required." });

    const db = getDBState();
    const newItem = {
      id: `faq_${Date.now()}`,
      question,
      answer,
      category: category || "General",
      active: active !== false,
      order: db.faqItems.length + 1
    };

    db.faqItems.push(newItem);
    saveDBState(db);
    res.status(201).json(newItem);
  });

  app.put('/api/faq/:id', (req, res) => {
    const db = getDBState();
    const index = db.faqItems.findIndex(f => f.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: "FAQ Item not found." });

    db.faqItems[index] = { ...db.faqItems[index], ...req.body, id: req.params.id };
    saveDBState(db);
    res.json(db.faqItems[index]);
  });

  app.delete('/api/faq/:id', (req, res) => {
    const db = getDBState();
    db.faqItems = db.faqItems.filter(f => f.id !== req.params.id);
    saveDBState(db);
    res.json({ success: true });
  });

  // ──────────────────────────── PROGRAMS ────────────────────────────
  app.get('/api/programs', (req, res) => {
    res.json(getDBState().programs);
  });

  app.put('/api/programs/:id', (req, res) => {
    const db = getDBState();
    const index = db.programs.findIndex(p => p.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: "Program not found." });

    db.programs[index] = { ...db.programs[index], ...req.body, id: req.params.id };
    saveDBState(db);
    res.json(db.programs[index]);
  });

  // ────────────────────────────── USERS ──────────────────────────────
  app.get('/api/users', (req, res) => {
    res.json(getDBState().users);
  });

  app.post('/api/users', (req, res) => {
    const { username, name, email, role } = req.body;
    if (!username || !email || !role) return res.status(400).json({ error: "Missing required details." });

    const db = getDBState();
    const newUser = {
      id: `u_${Date.now()}`,
      username,
      name,
      email,
      role
    };

    db.users.push(newUser);
    saveDBState(db);
    res.status(201).json(newUser);
  });

  app.put('/api/users/:id', (req, res) => {
    const db = getDBState();
    const index = db.users.findIndex(u => u.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: "User not found." });

    db.users[index] = { ...db.users[index], ...req.body, id: req.params.id };
    saveDBState(db);
    res.json(db.users[index]);
  });

  app.delete('/api/users/:id', (req, res) => {
    const db = getDBState();
    db.users = db.users.filter(u => u.id !== req.params.id);
    saveDBState(db);
    res.json({ success: true });
  });

  // ────────────────────────── VITE MIDDLEWARE ──────────────────────────
  if (process.env.NODE_ENV !== "production") {
    import('vite').then(async ({ createServer: createViteServer }) => {
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'spa',
      });
      app.use(vite.middlewares);
    });
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  if (!process.env.VERCEL) {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Rousseau International School server active on http://localhost:${PORT}`);
    });
  }

export default app;
