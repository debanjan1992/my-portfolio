import { Route } from '@angular/router';
import { Welcome } from './tabs/welcome/welcome';
import { Contact } from './tabs/contact/contact';
import { Experience } from './tabs/experience/experience';
import { Projects } from './tabs/projects/projects';

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
          import('./pages/project-details/project-details').then(
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
