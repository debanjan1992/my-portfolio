import { Route } from '@angular/router';
import { Welcome } from './pages/welcome/welcome';
import { Contact } from './pages/contact/contact';
import { Experience } from './pages/experience/experience';
import { Projects } from './pages/projects/projects';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', component: Welcome, title: 'Debanjan Saha | Welcome' },
  {
    path: 'projects',
    title: 'Debanjan Saha | Projects',
    children: [
      {
        path: '',
        component: Projects
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./pages/projects/project-details/project-details').then(
            (m) => m.ProjectDetails
          ),
      },
    ],
  },
  {
    path: 'experience',
    component: Experience,
    title: 'Debanjan Saha | Experience',
  },
  { path: 'contact', component: Contact, title: 'Debanjan Saha | Contact' },
];
