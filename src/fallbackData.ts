/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { NewsItem, GalleryItem, Testimonial, PartnerUniversity, Teacher, FaqItem, ProgramInfo } from './types';

export const FALLBACK_NEWS: NewsItem[] = [
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
];

export const FALLBACK_GALLERY: GalleryItem[] = [
  { id: "gal_1", title: "Modern Science Lab Demonstration", album: "Campus", url: "https://picsum.photos/seed/scilab/800/600", featured: true },
  { id: "gal_2", title: "IB Diploma Year 2 Research Presentation", album: "Events", url: "https://picsum.photos/seed/ibevents/800/600", featured: true },
  { id: "gal_3", title: "Annual Football Tournament Victory", album: "Sports", url: "https://picsum.photos/seed/rilsport/800/600", featured: true },
  { id: "gal_4", title: "British Council Exam Center Hall", album: "Campus", url: "https://picsum.photos/seed/bcent/800/600", featured: false },
  { id: "gal_5", title: "Honours Graduation Ceremony", album: "Ceremonies", url: "https://picsum.photos/seed/gradsc/800/600", featured: true },
  { id: "gal_6", title: "Robotics Club Dynamic Testing", album: "Activities", url: "https://picsum.photos/seed/robotics/800/600", featured: false }
];

export const FALLBACK_TESTIMONIALS: Testimonial[] = [
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
];

export const FALLBACK_PARTNERS: PartnerUniversity[] = [
  { id: "part_1", name: "University of Toronto", country: "Canada", specialty: "STEM / Business", description: "Top Canadian university offering direct admissions pathways for Rousseau OSSD and IB graduates.", logo: "🇨🇦", active: true, website: "https://www.utoronto.ca" },
  { id: "part_2", name: "McGill University", country: "Canada", specialty: "Engineering / Arts", description: "Renowned institution offering advanced transfer credits for our International Baccalaureate high scorers.", logo: "🇨🇦", active: true, website: "https://www.mcgill.ca" },
  { id: "part_3", name: "King's College London", country: "United Kingdom", specialty: "Law / Global Health", description: "Accepts Cambridge International A-Levels with fast-track admissions status.", logo: "🇬🇧", active: true, website: "https://www.kcl.ac.uk" },
  { id: "part_4", name: "Sorbonne Université", country: "France", specialty: "Humanities / Medicine", description: "Direct partner for advanced French language credentials and collaborative European entries.", logo: "🇫🇷", active: true, website: "https://www.sorbonne-universite.fr" }
];

export const FALLBACK_TEACHERS: Teacher[] = [
  { id: "teach_1", name: "Dr. Helen Carter", role: "Principal & Head of School", subject: "Educational Leadership", bio: "With over 20 years heading elite bilingual academies across West Africa and Europe, Helen directs Rousseau with an unyielding standard for excellence.", education: "Ph.D. in Education (Oxford University)", image: "https://picsum.photos/seed/principal/300/400", active: true },
  { id: "teach_2", name: "Prof. George Ndip", role: "Head of Mathematics (Secondary)", subject: "A-Level Calculus & Physics", bio: "George is celebrated across Cameroon for sending multiple Olympiad candidates into Ivy Leagues. He keeps a rigorous but deeply inspiring classroom.", education: "M.Sc. in Physics (University of Yaoundé I)", image: "https://picsum.photos/seed/tmath/300/400", active: true },
  { id: "teach_3", name: "Mrs. Evelyn Brossard", role: "Director of IB Diploma", subject: "English Literature & Theory of Knowledge", bio: "Evelyn ensures that students develop global-mindedness, rich critical writing habits, and beautiful oral presentation postures.", education: "M.A. in Comparative Lit (Sorbonne College)", image: "https://picsum.photos/seed/tib/300/400", active: true },
  { id: "teach_4", name: "Mr. Samuel Tagne", role: "Director of Language Certifications", subject: "IELTS & TOEFL Academic Tutors", bio: "Samuel coordinates tests for ETS and the British Council. He has over 15 years of standardizing language prep pedagogy.", education: "M.Ed. in TESOL (University of York)", image: "https://picsum.photos/seed/tlang/300/400", active: true }
];

export const FALLBACK_FAQS: FaqItem[] = [
  { id: "faq_1", question: "What curricula options exist for high school years?", answer: "At Rousseau, we provide three premier tracks: the Cambridge Assessment International Education (IGCSE & A-Levels), the International Baccalaureate (IB) Diploma Programme, and the Ontario Secondary School Diploma (OSSD - Canadian Track). Families choose the path that best matches their child's target universities.", category: "General", active: true, order: 1 },
  { id: "faq_2", question: "Is Rousseau an authorized center for English examinations?", answer: "Yes, we are highly official. RIS is an accredited British Council Language Centre and an authorized ETS center. We host regular sit-in sessions for IELTS, TOEFL, TOEIC, and French TFI with integrated dynamic prep workshops.", category: "Language Exams", active: true, order: 2 },
  { id: "faq_3", question: "Can we submit registration forms entirely online?", answer: "Absolutely. Parents can complete the 4-step Admissions process online. Once submitted, our team reviews current school records, schedules interviews/placement tests within 48 hours, and notifies outcomes digitally.", category: "Admissions", active: true, order: 3 },
  { id: "faq_4", question: "Where is the physical campus located in Douala?", answer: "Our secure prestige campus is located in Douala, Cameroon (Bonanjo Administrative District), featuring fully safe laboratories, digital media hubs, spacious activity rooms, and a modern language library.", category: "Campus Life", active: true, order: 4 }
];

export const FALLBACK_PROGRAMS: ProgramInfo[] = [
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
];
