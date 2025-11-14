import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  Experience,
  GetExperiencesResponse,
  GetProfileDetailsResponse,
  GetProjectResponse,
  GetProjectsResponse,
  ProfileDetails,
  Project,
} from '@portfolio/models';
import { map, Observable } from 'rxjs';

@Injectable()
export class PortfolioService {
  private readonly http = inject(HttpClient);

  public getProfile(): Observable<ProfileDetails> {
    return this.http
      .get<GetProfileDetailsResponse>('/api/profile')
      .pipe(map((response) => response.profile));
  }

  public getExperiences(): Observable<Experience[]> {
    return this.http
      .get<GetExperiencesResponse>('/api/experiences')
      .pipe(map((response) => response.experiences));
  }

  public getProjects(): Observable<Project[]> {
    return this.http
      .get<GetProjectsResponse>('/api/projects')
      .pipe(map((response) => response.projects));
  }

  public getProjectDetails(id: string): Observable<Project> {
    return this.http
      .get<GetProjectResponse>('/api/project/' + id)
      .pipe(map((response) => response.project));
  }

  public sendEmailMessage(
    name: string,
    email: string,
    message: string
  ): Observable<any> {
    return this.http
      .post<any>('/api/sendEmail', {
        name,
        email,
        message,
      })
      .pipe(map((response) => response.project));
  }
}
