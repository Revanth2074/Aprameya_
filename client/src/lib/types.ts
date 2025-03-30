export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  team: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  image: string;
  author: string;
}

export interface ResearchItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  date: string;
  authors: string[];
  citations: number;
}

export interface Event {
  id: string;
  title: string;
  type: string;
  date: string;
  day: string;
  month: string;
  year: string;
  time: string;
  location: string;
  description: string;
  image: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  year: string;
  image: string;
  socialLinks: {
    linkedin?: string;
    github?: string;
    email?: string;
  };
}

export interface StatItem {
  value: string;
  label: string;
}