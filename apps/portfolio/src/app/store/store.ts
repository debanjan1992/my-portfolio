import { computed, inject } from '@angular/core';
import { PortfolioStoreState } from './types';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { tapResponse } from '@ngrx/operators';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { map, pipe, switchMap } from 'rxjs';
import { PortfolioService } from '../portfolio';
import { Experience } from '@portfolio/models';
import { HttpClient } from '@angular/common/http';
import { convertToHtml, getDurationInYearsAndMonths } from '../utilities';

const initialState: PortfolioStoreState = {
  profile: null,
  technologies: [],
  experiences: [],
  projects: [],
  featured: ["calendar-angular-app", "quiz-me-react-chrome-extension", "tasks-angular-app", "wordicle"],
};
export const PortfolioStore = signalStore(
  withState(initialState),
  withProps(() => ({
    portfolioService: inject(PortfolioService),
    http: inject(HttpClient),
  })),
  withMethods(({ portfolioService, http, ...store }) => {
    const fetchProfileDetails = rxMethod<void>(
      pipe(
        switchMap(() =>
          portfolioService.getProfile().pipe(
            tapResponse({
              next: (profile) => patchState(store, { profile }),
              error: () => null,
            })
          )
        )
      )
    );

    const _sortExperiences = (experiences: Experience[]) => {
      return [...experiences]
        .sort(
          (a, b) =>
            new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        )
        .map((experience) => ({
          ...experience,
          roles: [...(experience.roles ?? [])].sort(
            (a, b) =>
              new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
          ),
        }));
    };

    const fetchExperiences = rxMethod<void>(
      pipe(
        switchMap(() =>
          portfolioService.getExperiences().pipe(
            tapResponse({
              next: (experiences) => {
                patchState(store, {
                  experiences: _sortExperiences(experiences),
                });
              },
              error: () => null,
            })
          )
        )
      )
    );

    const fetchProjects = rxMethod<void>(
      pipe(
        switchMap(() =>
          portfolioService.getProjects().pipe(
            tapResponse({
              next: (projects) => {
                const allTechnologies = Array.from(
                  new Set<string>(projects.map((p) => p.technologies).flat())
                );
                patchState(store, { projects, technologies: allTechnologies });
              },
              error: () => null,
            })
          )
        )
      )
    );

    const fetchMarkdownRenderAsHTML = (url: string) => {
      return http
        .get(url, { responseType: 'text' })
        .pipe(map((response) => convertToHtml(response)));
    };

    const downloadResume = () => {
      window.open(store.profile().resumeUrl, '_blank');
    };

    return {
      fetchProfileDetails,
      fetchExperiences,
      fetchProjects,
      fetchMarkdownRenderAsHTML,
      downloadResume,
    };
  }),
  withComputed((store) => ({
    fullName: computed(() =>
      store.profile()
        ? store.profile().firstName + ' ' + store.profile().lastName
        : ''
    ),
    totalExperience: computed(() =>
      getDurationInYearsAndMonths(
        store.profile().careerStart,
        new Date().getTime()
      )
    ),
  }))
);
