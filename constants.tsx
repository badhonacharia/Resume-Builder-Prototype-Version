
import { ResumeCategory, ResumeTemplate, ResumeContent, ResumeColors } from './types';

export const CATEGORIES = [
  { id: ResumeCategory.Modern, icon: 'fa-rocket', color: 'bg-blue-500' },
  { id: ResumeCategory.Professional, icon: 'fa-briefcase', color: 'bg-purple-500' },
  { id: ResumeCategory.Creative, icon: 'fa-palette', color: 'bg-pink-500' },
  { id: ResumeCategory.Academic, icon: 'fa-graduation-cap', color: 'bg-green-500' },
  { id: ResumeCategory.Minimalist, icon: 'fa-leaf', color: 'bg-gray-500' },
];

export const TEMPLATES: ResumeTemplate[] = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: `Template ${i + 1}`,
  category: CATEGORIES[i % CATEGORIES.length].id,
  thumbnail: `https://picsum.photos/seed/${i + 50}/400/600`,
}));

export const DEFAULT_CONTENT: ResumeContent = {
  firstName: 'John',
  lastName: 'Doe',
  jobTitle: 'Senior Software Engineer',
  email: 'john.doe@example.com',
  phone: '+1 (555) 000-1111',
  address: 'San Francisco, CA',
  summary: 'Experienced developer with a passion for building scalable web applications and leading cross-functional teams.',
  skills: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Gemini AI'],
  experience: [
    {
      company: 'TechCorp Solutions',
      role: 'Senior Developer',
      period: '2020 - Present',
      description: 'Lead developer for the core cloud infrastructure team. Improved performance by 40%.'
    },
    {
      company: 'Startup Hub',
      role: 'Full Stack Engineer',
      period: '2018 - 2020',
      description: 'Built the initial MVP for a social networking platform using MERN stack.'
    }
  ],
  education: [
    {
      school: 'University of Technology',
      degree: 'B.S. in Computer Science',
      year: '2018'
    }
  ],
  profileImage: 'https://picsum.photos/seed/profile/200/200'
};

export const DEFAULT_COLORS: ResumeColors = {
  primary: '#3b82f6',
  secondary: '#1e3a8a',
  text: '#111827',
  background: '#ffffff',
};
