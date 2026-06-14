import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, X, Send, Sparkles, ArrowRight, GraduationCap, 
  MapPin, Phone, Compass, BookOpen, Clock, Globe
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  actionTab?: 'home' | 'about' | 'programmes' | 'admissions' | 'life' | 'language' | 'abroad' | 'contact';
  actionLabel?: string;
  timestamp: Date;
}

interface ChatbotWidgetProps {
  onNavigate: (tab: 'home' | 'about' | 'programmes' | 'admissions' | 'life' | 'language' | 'abroad' | 'contact') => void;
}

export default function ChatbotWidget({ onNavigate }: ChatbotWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [currentLang, setCurrentLang] = useState<'fr' | 'en'>('fr');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Suggested pre-baked interactions for quick accessibility
  const quickQuestions = currentLang === 'fr' ? [
    { label: "📚 Programmes & Doubles Diplômes", q: "Quels sont vos programmes de double diplôme (Cambridge, IB, OSSD) ?" },
    { label: "📝 Admissions & Inscriptions", q: "Comment se déroule le processus d'admission et quels sont les frais ?" },
    { label: "🇬🇧 Certification TOEFL & IELTS", q: "Êtes-vous un centre officiel de TOEFL ou d'IELTS à Douala ?" },
    { label: "📍 Localisation & Horaires", q: "Où se situe l'école à Douala et quelles sont vos heures d'ouverture ?" },
    { label: "✈️ Études à l'Étranger", q: "Comment aidez-vous les élèves pour les universités à l'étranger ?" }
  ] : [
    { label: "📚 Programs & Degrees", q: "What are your double degree programs (Cambridge, IB, OSSD)?" },
    { label: "📝 Admissions & Fees", q: "How does the admission process work and what are the fees?" },
    { label: "🇬🇧 TOEFL & IELTS Center", q: "Are you an official TOEFL or IELTS testing center in Douala?" },
    { label: "📍 Location & Hours", q: "Where is the school located and what are your opening hours?" },
    { label: "✈️ Study Abroad Services", q: "How do you assist students planning to study at universities abroad?" }
  ];

  // Language detection helper
  const isEnglishQuery = (text: string): boolean => {
    const englishWords = [
      "hello", "hi", "hey", "what", "how", "where", "when", "who", "why", "is", "are", "the", "school", "fee", "fees", "tuition", "admission", "admissions", "program", "programs", "english", "location", "address", "phone", "hours", "contact", "abroad", "foreign", "canada", "ielts", "toefl", "test", "exam", "certification", "study", "student", "diploma", "certify", "can", "do", "you", "about", "register", "price", "cost", "where is", "how much", "how to"
    ];
    const frenchWords = [
      "bonjour", "salut", "comment", "ou", "où", "quand", "qui", "pourquoi", "est", "sont", "le", "la", "les", "un", "une", "ecole", "école", "frais", "scolarite", "scolarité", "admission", "admissions", "inscription", "programme", "programmes", "anglais", "localisation", "adresse", "telephone", "téléphone", "horaire", "horaires", "contact", "contacter", "etranger", "étranger", "etude", "étude", "etudes", "études", "diplome", "diplôme", "certif", "certification", "enregistrer", "cours", "prix", "cout"
    ];
    
    const words = text.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").split(/\s+/);
    let enScore = 0;
    let frScore = 0;
    
    words.forEach(w => {
      if (englishWords.includes(w)) enScore += 1.5;
      if (frenchWords.includes(w)) frScore += 1.5;
    });
    
    if (enScore === 0 && frScore === 0) {
      if (/[éèàçùïîâêûô]/i.test(text)) return false;
      if (/\b(the|and|of|to|a|in|for|is|on|that|by|this|with|i|you|it|not|or|be|are|from|at|your|we|an|have)\b/i.test(text)) return true;
    }
    
    return enScore > frScore;
  };

  // Initialize with welcome message
  useEffect(() => {
    setMessages([
      {
        id: 'welcome',
        sender: 'bot',
        text: "Bonjour ! Je suis l'assistant virtuel de Rousseau International School Douala 🇨🇲.\nJe suis là pour vous renseigner instantanément sur nos programmes (Cambridge, IB, OSSD), admissions ou certifications.\nComment puis-je vous aider ?\n\n💬 *Choose your language above or write to me in English!*",
        timestamp: new Date()
      }
    ]);
  }, []);

  // Scroll to bottom whenever messages list expands
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasNewMessage(false);
    }
  };

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Detect language on the fly to fulfill user's expectation
    const detectedEn = isEnglishQuery(textToSend);
    const queryLang = detectedEn ? 'en' : 'fr';
    setCurrentLang(queryLang);

    // Add user message
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // AI/Local Bot response matching engine with high fidelity responses
    setTimeout(() => {
      const botResponse = matchLocalResponse(textToSend, queryLang);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
      
      if (!isOpen) {
        setHasNewMessage(true);
      }
    }, 1000); // 1s organic latency feedback
  };

  const matchLocalResponse = (query: string, lang: 'fr' | 'en'): Message => {
    const qLower = query.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, " ");
    
    // Heuristic Score match matrices with English + French translations
    const matchWeights = {
      programmes: {
        keys: ["programme", "curriculum", "diplome", "double", "classe", "bilingue", "cambridge", "ib", "international", "baccalaureat", "ossd", "canada", "matiere", "etude", "niveau", "cours", "lycée", "college", "filiere", "degree", "diploma", "program", "programs", "bilingual"],
        text: lang === 'fr' 
          ? "Rousseau International School propose un cursus bilingue d'excellence unique au Cameroun, fusionnant les meilleurs programmes internationaux :\n\n• **Cambridge Assessment International** (Curriculum britannique IGCSE, AS & A-Levels)\n• **Baccalauréat International (IB)** (Reconnaissance mondiale ultime)\n• **OSSD Canadien** (Ontario Secondary School Diploma, obtention directe sans concours au Canada)\n\nLa formation est dispensée au quartier administratif Bonanjo, à Douala, dans un cadre technologique ultramoderne."
          : "Rousseau International School offers a unique bilingual curriculum of academic excellence in Cameroon, fusing premium global pathways:\n\n• **Cambridge Assessment International** (British curriculum featuring IGCSE, AS & A-Levels)\n• **International Baccalaureate (IB)** (The gold standard worldwide)\n• **Canadian OSSD** (Ontario Secondary School Diploma, offering direct entry to Canadian universities without competitive tests)\n\nOur classes are held in our ultramodern facilities in the secure administrative quarter of Douala Bonanjo.",
        tab: "programmes" as const,
        label: lang === 'fr' ? "Consulter les Programmes" : "View Academic Programs"
      },
      admissions: {
        keys: ["admission", "inscription", "postuler", "frais", "prix", "cout", "scolarite", "tarif", "valider", "enregistrer", "rentree", "dossier", "preinscription", "tuition", "payer", "apply", "enrol", "enroll", "enrollment", "registr", "cost", "fee", "fees", "price"],
        text: lang === 'fr'
          ? "Les admissions de Rousseau International School sont gérées de manière inclusive mais rigoureuse en 4 étapes :\n\n1. **Prise de contact** : Soumission du dossier et des relevés de notes en ligne ou au secrétariat.\n2. **Évaluation** : Analyse par notre bureau d'admission des équivalences (Cambridge/IB).\n3. **Entretien d'Adéquation** : Discussion de motivation à Douala-Bonanjo ou par visioconférence.\n4. **Offre formelle** : Décision et émission du numéro matricule sous 48 heures.\n\nVous pouvez consulter l'onglet d'admission pour initier votre démarche !"
          : "Admissions at Rousseau International School are handled through an inclusive but structured 4-step framework:\n\n1. **Initial Submission**: Upload academic transcripts and files online or turn them in at the registrar's desk.\n2. **Academic Review**: Thorough assessment of equivalencies under Cambridge and IB parameters.\n3. **Fitted Conversation**: Motivation discussion held physically at Douala Bonanjo or via high-definition video call.\n4. **Formal Decision**: Offer letters and safe registration matricule issued within 48 business hours.\n\nYou may visit the Admissions module directly to get started!",
        tab: "admissions" as const,
        label: lang === 'fr' ? "Démarrer l'Admission" : "Start Admission Steps"
      },
      certifications: {
        keys: ["toefl", "ielts", "langue", "examen", "certification", "anglais", "francais", "test", "prep", "atelier", "centre", "ets", "british council", "toeic", "tfi", "language", "workshop", "workshops", "dates"],
        text: lang === 'fr'
          ? "Rousseau International School est un centre d'examen officiel de renom homologué par le **British Council** et **ETS** pour les candidats individuels ou scolaires.\n\nNous certifions :\n- **IELTS Academic / General** (Standard du Commonwealth)\n- **TOEFL iBT** (Fiducie d'acceptation américaine et globale)\n\nNous organisons également des sessions de **préparations intensives** hebdomadaires guidées par des examinateurs homologués pour garantir une performance optimale."
          : "Rousseau International School is a prominent testing center designated and certifiably approved by both **British Council** and **ETS** for individual and institutional candidates.\n\nWe coordinate sessions for:\n- **IELTS Academic / General** (Standard Commonwealth qualification)\n- **TOEFL iBT** (International and North American collegiate standard)\n\nWe host intensive, weekly preparation workshops driven by certified instructors to maximize test achievements.",
        tab: "language" as const,
        label: lang === 'fr' ? "Voir les Certifications & Dates" : "View Certifications & Weekly Dates"
      },
      location: {
        keys: ["adresse", "localiser", "trouver", "douala", "bonanjo", "rue", "gouverneur", "aller", "situe", "direction", "office", "lieu", "quartier", "ou", "carte", "map", "address", "location", "find", "located", "where"],
        text: lang === 'fr'
          ? "Nous sommes stratégiquement implantés en plein cœur du pôle administratif et sécurisé de Douala :\n\n📍 **Rue des Gouverneurs, Bonanjo, Douala, Cameroun.** (B.P. 1445)\n\n🕒 **Horaires d'ouverture :**\n- **Lundi à Vendredi :** 08h00 — 16h30\n- **Samedi Matin :** 09h00 — 12h30 (Sittings de pré-inscription uniquement)"
          : "Our campus is strategically situated in the most peaceful and guarded administrative zone of Douala:\n\n📍 **Rue des Gouverneurs, Bonanjo, Douala, Cameroon.** (P.O. Box 1445)\n\n🕒 **Opening Hours:**\n- **Monday to Friday:** 08:00 AM — 04:30 PM\n- **Saturday Morning:** 09:00 AM — 12:30 PM (Reserved for physical pre-registrations and sittings)",
        tab: "contact" as const,
        label: lang === 'fr' ? "Nous Contacter" : "Contact Details"
      },
      contact: {
        keys: ["contact", "telephone", "phone", "email", "mail", "whatsapp", "ecrire", "joindre", "appeler", "desk", "bureau", "numero", "contacter", "secrétariat", "reach", "call", "office"],
        text: lang === 'fr'
          ? "Notre secrétariat et nos conseillers académiques se tiennent disponibles pour répondre à toutes vos interrogations :\n\n📞 **WhatsApp Desk :** +237 696 001 685\n☎️ **Ligne Standard (Douala) :** +237 233 441 559\n📧 **Courriel Direct :** admissions@rousseauinternational.org\n\nN'hésitez pas à nous appeler ou à nous rendre visite directement sur notre campus de Bonanjo !"
          : "Our administrative desk and counseling teams are ready to resolve any questions:\n\n📞 **WhatsApp Desk:** +237 696 001 685\n☎️ **Standard Landline (Douala):** +237 233 441 559\n📧 **Direct Inbox:** admissions@rousseauinternational.org\n\nDo not hesitate to reach out online or schedule a live campus tour!",
        tab: "contact" as const,
        label: lang === 'fr' ? "Accéder à la Page Contact" : "Go to Contact Details"
      },
      abroad: {
        keys: ["etranger", "partenaires", "universite", "boree", "voyage", "canada", "europe", "usa", "amerique", "aide", "visa", "orientation", "bourse", "études à l'étranger", "abroad", "foreign", "visas", "scholarship", "partners"],
        text: lang === 'fr'
          ? "Grâce à notre pôle spécialisé **RIS Abroad Excellence**, nous conseillons et planifions la transition de nos bacheliers vers les universités les plus renommées :\n\n- Accompagnement rigoureux aux demandes de visas d'études.\n- Équivalence de diplômes directe (notamment grâce au double diplôme OSSD Canadien).\n- Lettres de recommandation d'institutions.\n\nNos élèves intègrent directement des facultés au Canada, en France, au Royaume-Uni et aux États-Unis."
          : "Under the stewardship of our custom advisory group **RIS Abroad Excellence**, we carefully plan college transitions to highly competitive universities globally:\n\n- Comprehensive assembly of documents for student study permits.\n- Direct degree conversions and equivalencies (facilitated by the Canadian OSSD pipeline).\n- Official institutional validation letters and testimonials.\n\nOur graduates step straight into selective faculties inside Canada, the United Kingdom, France, and the USA.",
        tab: "abroad" as const,
        label: lang === 'fr' ? "Découvrir RIS Abroad" : "Explore RIS Abroad Pathways"
      },
      school_life: {
        keys: ["vie", "eleve", "sport", "activite", "club", "journal", "actualite", "evenement", "life", "journal", "cantine", "rouss", "campus", "students", "activities", "clubs", "sports"],
        text: lang === 'fr'
          ? "La vie à Rousseau International School équilibre la rigueur académique et l'épanouissement extrascolaire :\n\n- Clubs technologiques, robotique et codage.\n• Événements sportifs et compétitions régionales.\n• Journal d'actualités NOW@RIS en ligne.\n\nConsultez notre fil d'actualités et la galerie du campus pour en ressentir l'effervescence !"
          : "Daily student activity at Rousseau International School maintains an elegant balance of academic discipline and creative play:\n\n- Advanced robotic labs, computing, and code club modules.\n• Diverse sports matches and regional athletic meets.\n• Fully responsive NOW@RIS live digest feed.\n\nRead our online news feed and preview recent gallery entries to see the rich community yourself!",
        tab: "life" as const,
        label: lang === 'fr' ? "Parcourir la Vie Scolaire" : "Preview School Life"
      }
    };

    // Score evaluation
    let maxScore = 0;
    let matchedCategory: keyof typeof matchWeights | null = null;

    Object.entries(matchWeights).forEach(([category, info]) => {
      let score = 0;
      info.keys.forEach(key => {
        if (qLower.includes(key)) {
          score += 2; // Match on keys gets standard weights
          // Bonus if exact word boundary
          const regex = new RegExp(`\\b${key}\\b`, 'i');
          if (regex.test(qLower)) {
            score += 3;
          }
        }
      });
      if (score > maxScore) {
        maxScore = score;
        matchedCategory = category as keyof typeof matchWeights;
      }
    });

    if (matchedCategory && maxScore > 1) {
      const matched = matchWeights[matchedCategory];
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: matched.text,
        actionTab: matched.tab,
        actionLabel: matched.label,
        timestamp: new Date()
      };
    }

    // Default Fallback
    return {
      id: `bot-${Date.now()}`,
      sender: 'bot',
      text: lang === 'fr'
        ? "Je n'ai pas tout à fait saisi votre question.\n\nVoici quelques questions courantes que je sais éclairer :\n- **Programmes** : Informations sur le Cambridge, l'IB ou l'OSSD.\n- **Admissions** : Comment postuler et s'inscrire.\n- **Certifications** : Obtenir un test officiel d'anglais TOEFL ou IELTS à Douala.\n- **Localisation** : Où se situe le campus de Bonanjo.\n- **Contact** : Numéros de téléphone et adresses emails."
        : "I didn't quite get that. Could you please specify your inquiry?\n\nHere are common topics I am ready to cover:\n- **Registry & Admissions**: Tuition costs and enrollment forms.\n- **Language Certifications**: Official TOEFL / IELTS exam sittings in Douala.\n- **Academic Offerings**: Overviews of our Cambridge, IB, & OSSD curricula.\n- **Office Location**: Direct routes and map points inside Douala Bonanjo.\n- **Contact**: Fast phone lines and custom contact addresses.",
      timestamp: new Date()
    };
  };

  const handleActionClick = (tab: 'home' | 'about' | 'programmes' | 'admissions' | 'life' | 'language' | 'abroad' | 'contact') => {
    onNavigate(tab);
    setIsOpen(false);
  };

  return (
    <>
      {/* ────────────────────────── FLOATING CHAT BUTTON WIDGET ────────────────────────── */}
      <div className="fixed bottom-4 right-4 z-40">
        <motion.button 
          onClick={handleToggle}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="relative bg-brand-navy hover:bg-brand-royal text-white border-2 border-brand-champagne/80 hover:border-brand-gold w-12 h-12 rounded-full flex items-center justify-center shadow-2xl cursor-pointer"
          aria-label="Contacter le chatbot local"
          title="RIS Assistant Interactif"
        >
          {isOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <MessageSquare className="w-5 h-5 text-brand-champagne" />
          )}

          {/* New message blinking indicator */}
          {hasNewMessage && !isOpen && (
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-[#FFC000] rounded-full border-2 border-brand-navy animate-ping" />
          )}
        </motion.button>
      </div>

      {/* ────────────────────────── CHAT DIALOG OVERLAY ────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 35, scale: 0.92 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-18 right-4 md:right-4 w-[360px] md:w-[400px] max-h-[580px] h-[85vh] bg-neutral-pearl border border-neutral-border/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden z-50 text-left"
          >
            {/* Elegant Header with Prestige elements */}
            <div className="bg-brand-navy text-white px-5 py-4 flex items-center justify-between border-b border-white/10 relative">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-white text-brand-navy flex items-center justify-center font-bold text-xs tracking-wider shadow-md">
                  RIS
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-sans font-bold text-xs text-brand-champagne uppercase tracking-wider">
                      {currentLang === 'fr' ? "Assistance RIS" : "RIS Support"}
                    </h3>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <span className="text-[10px] text-brand-sky font-sans block leading-none">
                    {currentLang === 'fr' ? "Support Local disponible 24h/24" : "Local support online 24/7"}
                  </span>
                </div>
              </div>

              {/* Language selection switches */}
              <div className="flex items-center gap-1 bg-white/10 rounded-lg p-0.5 ml-auto mr-2">
                <button 
                  onClick={() => setCurrentLang('fr')}
                  className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase transition-all duration-200 cursor-pointer ${
                    currentLang === 'fr' ? 'bg-brand-gold text-brand-navy font-extrabold scale-105' : 'text-stone-300 hover:text-white'
                  }`}
                  title="Mettre l'assistant en Français"
                >
                  FR
                </button>
                <button 
                  onClick={() => setCurrentLang('en')}
                  className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase transition-all duration-200 cursor-pointer ${
                    currentLang === 'en' ? 'bg-brand-gold text-brand-navy font-extrabold scale-105' : 'text-stone-300 hover:text-white'
                  }`}
                  title="Switch Assistant to English"
                >
                  EN
                </button>
              </div>

              <button 
                onClick={() => setIsOpen(false)}
                className="text-stone-300 hover:text-white p-1 hover:bg-white/5 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat dialog viewport */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-100/50">
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={`flex flex-col max-w-[85%] ${
                    msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                  }`}
                >
                  <div 
                    className={`p-3.5 rounded-2xl text-xs font-sans leading-relaxed shadow-sm ${
                      msg.sender === 'user' 
                        ? 'bg-brand-royal text-white rounded-br-none text-right' 
                        : 'bg-white text-brand-navy border border-neutral-border/60 rounded-bl-none text-left'
                    }`}
                    style={{ whiteSpace: 'pre-wrap' }}
                  >
                    {msg.text}

                    {/* Integrated deep action button */}
                    {msg.sender === 'bot' && msg.actionTab && (
                      <div className="mt-3 pt-2.5 border-t border-neutral-border/40">
                        <button
                          onClick={() => handleActionClick(msg.actionTab!)}
                          className="w-full bg-brand-navy hover:bg-brand-royal text-brand-champagne hover:text-white text-[10px] font-bold uppercase tracking-wider py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer shadow-sm"
                        >
                          {msg.actionLabel || (currentLang === 'fr' ? 'En savoir plus' : 'Learn more')}
                          <ArrowRight className="w-3.5 h-3.5 text-brand-gold" />
                        </button>
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] text-neutral-secondary mt-1 font-mono">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}

              {/* Bot thinking placeholder */}
              {isTyping && (
                <div className="flex flex-col max-w-[85%] mr-auto items-start">
                  <div className="p-3.5 rounded-2xl bg-white text-brand-navy border border-neutral-border/60 rounded-bl-none text-left flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-brand-navy rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-brand-navy rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-brand-navy rounded-full animate-bounce"></span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Selection suggestions bubble menu */}
            <div className="px-4 py-3 bg-neutral-50/90 border-t border-neutral-border border-b border-neutral-border overflow-x-auto whitespace-nowrap flex gap-2 scrollbar-thin select-none">
              {quickQuestions.map((qq, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(qq.q)}
                  className="inline-block bg-white hover:bg-brand-royal/5 border border-neutral-border hover:border-brand-royal/35 text-[10px] text-brand-navy font-semibold px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer shrink-0"
                >
                  {qq.label}
                </button>
              ))}
            </div>

            {/* Input keyboard tray area */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputText);
              }}
              className="bg-white p-3 flex items-center gap-2 border-t border-neutral-border/30"
            >
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={currentLang === 'fr' ? "Posez votre question... (ex. IELTS, adresse)" : "Type your question... (e.g. IELTS, location)"}
                className="flex-1 bg-neutral-100 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-brand-royal/15 outline-none font-sans"
              />
              <button 
                type="submit"
                disabled={!inputText.trim()}
                className="bg-brand-royal text-white p-2.5 rounded-xl disabled:bg-neutral-200 disabled:text-neutral-secondary transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
