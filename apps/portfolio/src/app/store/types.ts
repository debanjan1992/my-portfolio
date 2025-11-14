import { ProfileDetails, Experience, Project } from '@portfolio/models';

export interface PortfolioStoreState {
  profile: ProfileDetails | null;
  technologies: string[];
  experiences: Experience[];
  projects: Project[];
}
