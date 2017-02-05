export interface Speaker {
  name: string;
  company: string;
  avatar: string;
  description: string;
  role?: string;
  tags: string[];
  social: {
    website?: string;
    twitter?: string;
    github?: string;
  }
};
