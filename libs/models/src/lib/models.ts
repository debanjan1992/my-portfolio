export interface ProfileDetails {
  picture: string;
  firstName: string;
  lastName: string;
  email: string;
  title: string;
  bio: string;
  aboutUrl: string;
  address: {
    city: string;
    state: string;
    country: string;
  };
  socials: Socials;
}

export interface Experience {
  company: string;
  logo: string;
  city: string;
  state: string;
  type: 'full-time' | 'contract' | 'freelance';
  startDate: number;
  endDate: number;
  technologies: string[];
  roles: {
    designation: string;
    startDate: number;
    endDate: number;
  }[];
}

export interface Socials {
  github: { username: string; url: string };
  linkedin: { username: string; url: string };
  instagram: { username: string; url: string };
  facebook: { username: string; url: string };
}

export interface Project {
  id: string;
  name: string;
  title: string;
  shortDescription: string;
  technologies: string[];
  company?: string;
  liveUrl?: string;
  sourceUrl?: string;
  imageUrl?: string;
  private?: boolean;
  tags: string[];
  readmeUrl: string;
  defaultBranch?: string;
  size?: string;
  createdAt?: string;
  updatedAt?: string;
  pushedAt?: string;
  languages?: Record<string, number>;
}
