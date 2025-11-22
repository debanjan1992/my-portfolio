import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { appRoutes } from './app.routes';
import { providePrimeNG } from 'primeng/config';

import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { PortfolioService } from './portfolio';
import { PortfolioThemePreset } from './theme.preset';
import { ThemeService } from './services/theme';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(appRoutes, withComponentInputBinding()),
    provideAnimations(),
    providePrimeNG({
      theme: {
        preset: PortfolioThemePreset,
        options: {
          darkModeSelector: '.app-dark-theme',
          cssLayer: false,
        },
      },
      ripple: true,
    }),
    {
      provide: PortfolioService,
      useClass: PortfolioService,
    },
    ThemeService,
  ],
};
