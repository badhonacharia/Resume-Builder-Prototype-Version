
export type AuthState = 'login' | 'signup' | 'authenticated';

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface ResumeContent {
  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
  summary: string;
  skills: string[];
  experience: {
    company: string;
    role: string;
    period: string;
    description: string;
  }[];
  education: {
    school: string;
    degree: string;
    year: string;
  }[];
  profileImage?: string;
}

export interface ResumeColors {
  primary: string;
  secondary: string;
  text: string;
  background: string;
}

export interface UserResume {
  id: string;
  templateId: number;
  content: ResumeContent;
  colors: ResumeColors;
  createdAt: string;
}

export interface ResumeTemplate {
  id: number;
  name: string;
  category: string;
  thumbnail: string;
}

export enum ResumeCategory {
  Modern = "Modern",
  Professional = "Professional",
  Creative = "Creative",
  Academic = "Academic",
  Minimalist = "Minimalist"
}
