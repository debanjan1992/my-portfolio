import { isPlatformBrowser } from '@angular/common';
import { Injectable, inject, PLATFORM_ID, signal, effect } from '@angular/core';

type ThemeMode = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private platformId = inject(PLATFORM_ID);

  readonly theme = signal<ThemeMode>('system');

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('app-theme') as ThemeMode;
      if (saved) {
        this.theme.set(saved);
      }

      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', () => {
        if (this.theme() === 'system') {
          this.applyThemeToDom('system');
        }
      });

      effect(() => {
        const currentTheme = this.theme();
        this.applyThemeToDom(currentTheme);
        localStorage.setItem('app-theme', currentTheme);
      });
    }
  }

  isDarkMode() {
    return this.theme() === 'dark';
  }

  private applyThemeToDom(mode: ThemeMode) {
    const isSystemDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    const shouldBeDark = mode === 'dark' || (mode === 'system' && isSystemDark);

    if (shouldBeDark) {
      document.documentElement.classList.add('app-dark-theme');
    } else {
      document.documentElement.classList.remove('app-dark-theme');
    }
  }

  // Public API to change themes
  toggleTheme() {
    if (this.theme() === 'light') {
      this.theme.set('dark');
    } else {
      this.theme.set('light');
    }
  }
}
