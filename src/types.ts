/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ApplicationStatus = 'Pending' | 'Interview Scheduled' | 'Accepted' | 'Rejected' | 'Waitlist';

export interface Application {
  id: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  studentName: string;
  studentDob: string;
  requestedLevel: string; // Grade level
  currSchool: string;
  progInterest: 'Cambridge' | 'IB' | 'OSSD' | 'General';
  dateSubmitted: string;
  status: ApplicationStatus;
  internalNotes: string;
  timeLimitDays: number; // For delay alert calculation
  birthCertFile?: string;
  bulletinFile?: string;
  medicalCertFile?: string;
  messageHistory: Array<{
    id: string;
    sender: 'staff' | 'parent';
    date: string;
    subject: string;
    body: string;
  }>;
}

export type LanguageCertType = 'IELTS' | 'TOEFL' | 'TOEIC' | 'TFI';
export type LanguageCertStatus = 'Contacted' | 'Registered' | 'Paid' | 'Passed';

export interface LanguageReg {
  id: string;
  name: string;
  email: string;
  phone: string;
  certification: LanguageCertType;
  sessionDate: string;
  status: LanguageCertStatus;
  dateSubmitted: string;
  internalNotes: string;
}

export type NewsCategory = 'Event' | 'Academic Result' | 'Announcement' | 'School Life';
export type NewsStatus = 'Draft' | 'Published' | 'Archived';

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  category: NewsCategory;
  status: NewsStatus;
  featured: boolean;
  image: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  album: 'Campus' | 'Events' | 'Sports' | 'Ceremonies' | 'Activities';
  url: string;
  featured: boolean; // Display on home
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  image: string;
  active: boolean;
  featured: boolean; // Display on home
}

export interface PartnerUniversity {
  id: string;
  name: string;
  country: string;
  specialty: string;
  description: string;
  logo: string;
  active: boolean;
  website?: string;
}

export interface Teacher {
  id: string;
  name: string;
  role: string;
  subject: string;
  bio: string;
  education: string;
  image: string;
  active: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  active: boolean;
  order: number;
}

export type UserRole = 'SuperAdmin' | 'AdmissionsOfficer' | 'CommOfficer' | 'Viewer';

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface ProgramInfo {
  id: string;
  title: string;
  desc: string;
  highlights: string[];
  active: boolean;
  tuitionFee: string;
}
