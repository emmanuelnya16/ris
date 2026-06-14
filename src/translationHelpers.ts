/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { NewsItem, Testimonial, PartnerUniversity, Teacher, FaqItem, ProgramInfo, GalleryItem } from './types';

export function translateProgram(prog: ProgramInfo, locale: string): ProgramInfo {
  if (locale !== 'fr') return prog;
  switch (prog.id) {
    case 'prog_cambridge':
      return {
        ...prog,
        title: "Programme International Cambridge",
        desc: "Le programme d'études secondaires de référence mondiale menant aux diplômes de l'IGCSE et des Advanced Levels (A-Levels).",
        highlights: [
          "Forte concentration sur les STEM, le calcul avancé et les lettres en anglais",
          "Reconnaissance des prix Top-in-Country décernés par Cambridge Assessment",
          "Accès direct aux universités de premier plan au Royaume-Uni, en Europe et aux Émirats"
        ],
        tuitionFee: "6 500 $ / an"
      };
    case 'prog_ib':
      return {
        ...prog,
        title: "Baccalauréat International (IB)",
        desc: "Un programme prestigieux de 2 ans formant des leaders dotés d'une rigueur intellectuelle grâce à la Théorie de la Connaissance (TOK) et aux projets CAS.",
        highlights: [
          "Tutorat intensif pour le Mémoire étendu de 4 000 mots",
          "Heures de recherche scientifique de niveau pré-universitaire en laboratoire",
          "Équivalences et crédits d'études avancés dans les meilleures universités d'élite"
        ],
        tuitionFee: "7 200 $ / an"
      };
    case 'prog_ossd':
      return {
        ...prog,
        title: "Diplôme d'Études Secondaires de l'Ontario (OSSD)",
        desc: "Parcours officiel du diplôme d'études secondaires canadien, basé sur l'évaluation continue pour éviter le stress d'un examen unique.",
        highlights: [
          "Candidature directe via le code OUAC pour toutes les universités canadiennes",
          "Accent mis sur le travail d'équipe et les projets concrets",
          "Reconnu sur un pied d'égalité avec les diplômés canadiens résidents"
        ],
        tuitionFee: "5 800 $ / an"
      };
    case 'prog_languages':
      return {
        ...prog,
        title: "Centre d'Anglais Officiel",
        desc: "Centre agréé pour les examens d'anglais du British Council et d'ETS, offrant des sessions de pré-inscription directes.",
        highlights: [
          "Sessions officielles pour l'IELTS, le TOEFL, le TOEIC et le TFI",
          "Préparations intensives animées par des examinateurs certifiés d'ETS",
          "Relevés de notes officiels délivrés en moins de 10 jours"
        ],
        tuitionFee: "320 $ - 450 $ par session"
      };
    default:
      return prog;
  }
}

export function translateTeacher(teach: Teacher, locale: string): Teacher {
  if (locale !== 'fr') return teach;
  switch (teach.id) {
    case 'teach_1':
      return {
        ...teach,
        role: "Directrice Générale & Chef d'Établissement",
        subject: "Leadership Éducatif",
        bio: "Avec plus de 20 ans d'expérience à la tête d'académies bilingues de premier plan en Afrique de l'Ouest et en Europe, Helen dirige Rousseau avec un niveau d'exigence rigoureux.",
        education: "Doctorat en Éducation (Université d'Oxford)"
      };
    case 'teach_2':
      return {
        ...teach,
        role: "Chef du Département de Mathématiques (Secondaire)",
        subject: "Calcul Avancé & Physique A-Level",
        bio: "Célèbre au Cameroun pour avoir propulsé de nombreux candidats des Olympiades vers les meilleures universités mondiales. Sa classe est stimulante.",
        education: "Master en Physique (Université de Yaoundé I)"
      };
    case 'teach_3':
      return {
        ...teach,
        role: "Directrice du Programme IB",
        subject: "Littérature Anglaise & Théorie de la Connaissance",
        bio: "Evelyn veille à ce que les étudiants développent une perspective mondiale, d'excellentes habitudes d'écriture critique et d'éloquentes techniques d'expression orale.",
        education: "Master en Littérature Comparée (Sorbonne)"
      };
    case 'teach_4':
      return {
        ...teach,
        role: "Directeur des Certifications Linguistiques",
        subject: "Tuteur Académique IELTS & TOEFL",
        bio: "Samuel coordonne les tests officiels d'ETS et du British Council. Il a plus de 15 ans d'expérience dans la standardisation de la pédagogie linguistique.",
        education: "Master en Éducation - TESOL (Université de York)"
      };
    default:
      return teach;
  }
}

export function translateFaq(faq: FaqItem, locale: string): FaqItem {
  if (locale !== 'fr') return faq;
  switch (faq.id) {
    case 'faq_1':
      return {
        ...faq,
        question: "Quels sont les programmes disponibles pour le secondaire ?",
        answer: "À Rousseau, nous offrons trois parcours de premier plan : le programme de Cambridge (IGCSE & A-Levels), le diplôme du Baccalauréat International (IB), et le diplôme de l'Ontario (OSSD - voie canadienne). Les familles choisissent la voie qui correspond le mieux aux universités visées.",
        category: "Général"
      };
    case 'faq_2':
      return {
        ...faq,
        question: "Rousseau est-il un centre d'examen officiel pour l'anglais ?",
        answer: "Oui, tout à fait. RIS est un centre accrédité par le British Council et un centre agréé ETS. Nous organisons régulièrement des sessions d'examens officiels de l'IELTS, du TOEFL, du TOEIC et du French TFI avec des ateliers de préparation.",
        category: "Examens Linguistiques"
      };
    case 'faq_3':
      return {
        ...faq,
        question: "Pouvons-nous soumettre les formulaires d'inscription entièrement en ligne ?",
        answer: "Absolument. Les parents peuvent compléter le processus d'admission en 4 étapes entièrement en ligne. Une fois le dossier soumis, notre équipe planifie les entretiens sous 48 heures.",
        category: "Admissions"
      };
    case 'faq_4':
      return {
        ...faq,
        question: "Où se situe le campus physique à Douala ?",
        answer: "Notre campus sécurisé est situé à Douala, Cameroun (au quartier administratif de Bonanjo), équipé de laboratoires scientifiques, de pôles de recherche et d'une bibliothèque active.",
        category: "Vie Scolaire"
      };
    default:
      return faq;
  }
}

export function translatePartner(p: PartnerUniversity, locale: string): PartnerUniversity {
  if (locale !== 'fr') return p;
  switch (p.id) {
    case 'part_1':
      return {
        ...p,
        specialty: "STEM / Commerce",
        description: "Université canadienne de premier rang offrant des passerelles d'admission directe aux diplômés OSSD et IB de Rousseau."
      };
    case 'part_2':
      return {
        ...p,
        specialty: "Ingénierie / Arts",
        description: "Institution de renommée mondiale offrant des crédits de transfert avancés pour nos diplômés du Baccalauréat International."
      };
    case 'part_3':
      return {
        ...p,
        specialty: "Droit / Santé Mondiale",
        description: "Accepte les diplômes d'A-Level du programme Cambridge avec un statut d'admission accéléré."
      };
    case 'part_4':
      return {
        ...p,
        specialty: "Humanités / Médecine",
        description: "Partenaire direct pour les diplômes de français avancés et les admissions coordonnées en Europe."
      };
    default:
      return p;
  }
}

export function translateTestimonial(t: Testimonial, locale: string): Testimonial {
  if (locale !== 'fr') return t;
  switch (t.id) {
    case 'test_1':
      return {
        ...t,
        role: "Parente d'un élève de Cambridge Year 11",
        text: "Inscrire nos enfants à Rousseau International a été la meilleure décision pour leur avenir international. La rigueur du programme Cambridge alliée à une attention individuelle les prépare à exceller partout."
      };
    case 'test_2':
      return {
        ...t,
        role: "Alumni / Étudiant de première année à l'Université McGill",
        text: "Le programme IB de Rousseau a transformé ma façon de structurer mes recherches et d'analyser les problèmes complexes. J'ai obtenu des crédits avancés d'équivalence à McGill."
      };
    case 'test_3':
      return {
        ...t,
        role: "Parente expatriée / Section canadienne OSSD",
        text: "La transition du Canada vers Douala a été d'une fluidité totale grâce à Rousseau. Disposer d'une véritable section OSSD en Afrique Centrale est une chance unique."
      };
    default:
      return t;
  }
}

export function translateNews(item: NewsItem, locale: string): NewsItem {
  if (locale !== 'fr') return item;
  switch (item.id) {
    case 'news_1':
      return {
        ...item,
        title: "Taux de réussite de 100 % aux examens de Cambridge",
        content: "Nous sommes fiers d'annoncer que notre promotion terminale a obtenu un succès éclatant aux récentes sessions d'examens IGCSE et A-Level de Cambridge. Deux de nos étudiants se sont classés premiers du Cameroun en mathématiques et en physique avancée. Ce record renforce notre statut d'établissement d'excellence bilingue.",
        category: "Academic Result"
      };
    case 'news_2':
      return {
        ...item,
        title: "Cours intensifs d'anglais d'été au Centre de Langues officiel",
        content: "Vous prévoyez d'étudier à l'étranger cet automne ? Le Centre de langues modernes de Rousseau lance ses parcours intensifs de préparation aux IELTS, TOEFL et TFI. Sessions dynamiques animées par des locuteurs natifs et certifiés ETS.",
        category: "Event"
      };
    case 'news_3':
      return {
        ...item,
        title: "Inauguration du nouveau complexe de laboratoires scientifiques de pointe",
        content: "Conformément aux normes d'excellence pédagogique canadiennes OSSD, Rousseau construit un espace dédié aux sciences modernes et à la robotique. Ouverture prévue pour la rentrée de septembre.",
        category: "School Life"
      };
    default:
      return item;
  }
}

export function translateGallery(item: GalleryItem, locale: string): GalleryItem {
  if (locale !== 'fr') return item;
  switch (item.id) {
    case 'gal_1':
      return { ...item, title: "Démonstration en laboratoire de chimie" };
    case 'gal_2':
      return { ...item, title: "Présentations de recherche des élèves en terminale IB" };
    case 'gal_3':
      return { ...item, title: "Victoire lors du tournoi annuel de football" };
    case 'gal_4':
      return { ...item, title: "Salle officielle d'examen d'anglais agréée par le British Council" };
    case 'gal_5':
      return { ...item, title: "Cérémonie de remise des diplômes d'honneur" };
    case 'gal_6':
      return { ...item, title: "Tests pratiques animés au club de robotique" };
    default:
      return item;
  }
}
