export interface Speaker {
  $key: string;
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
  hidden: boolean;
};
