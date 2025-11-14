import {
  Experience,
  ProfileDetails,
  Project,
} from './models';

export interface GetProfileDetailsResponse {
  profile: ProfileDetails | null;
}

export interface GetSkillsResponse {
  skills: string[];
}

export interface GetExperiencesResponse {
  experiences: Experience[];
}

export interface GetProjectsResponse {
  projects: Project[];
}

export interface GetProjectResponse {
  project: Project;
}

export interface CreateProjectResponse {
    project: Project;
}

export interface UpdateProjectRequest {
    project: Partial<Omit<Project, "id">>;
    updateMasks: string[];
}