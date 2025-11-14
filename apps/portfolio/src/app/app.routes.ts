import { Route } from '@angular/router';
import { Welcome } from './tabs/welcome/welcome';
import { Contact } from './tabs/contact/contact';
import { Experience } from './tabs/experience/experience';
import { Portfolio } from './tabs/portfolio/portfolio';
import { Home } from './pages/home/home';

export const appRoutes: Route[] = [
  {
    path: '',
    component: Home,
    children: [
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: 'welcome', component: Welcome, title: 'Debanjan Saha | Welcome' },
      { path: 'portfolio', component: Portfolio, title: 'Debanjan Saha | Portfolio' },
      { path: 'experience', component: Experience, title: 'Debanjan Saha | Experience' },
      { path: 'contact', component: Contact, title: 'Debanjan Saha | Contact' },
    ],
  },
  {
    path: 'project/:id',
    loadComponent: () =>
      import('./pages/project-details/project-details').then(
        (m) => m.ProjectDetails
      ),
  },
];
