import { Component, inject } from '@angular/core';
import { PortfolioStore } from '../../store/store';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { Divider } from 'primeng/divider';
import { ThemeService } from '../../services/theme';

@Component({
  selector: 'app-header',
  imports: [ButtonModule, TooltipModule, RouterLink, Divider, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  store = inject(PortfolioStore);
  themeService = inject(ThemeService);

  toggleDarkMode() {
    this.themeService.toggleTheme();
  }
}
