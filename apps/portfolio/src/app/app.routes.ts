import { Route } from '@angular/router';
import { Welcome } from './tabs/welcome/welcome';
import { Contact } from './tabs/contact/contact';
import { Experience } from './tabs/experience/experience';
import { Portfolio } from './tabs/portfolio/portfolio';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', component: Welcome, title: 'Debanjan Saha | Welcome' },
  {
    path: 'projects',
    component: Portfolio,
    title: 'Debanjan Saha | Projects',
  },
  {
    path: 'experience',
    component: Experience,
    title: 'Debanjan Saha | Experience',
  },
  { path: 'contact', component: Contact, title: 'Debanjan Saha | Contact' },
  {
    path: 'project/:id',
    loadComponent: () =>
      import('./pages/project-details/project-details').then(
        (m) => m.ProjectDetails
      ),
  },
];
