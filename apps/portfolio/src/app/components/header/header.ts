import { Component, inject } from '@angular/core';
import { PortfolioStore } from '../../store/store';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { Divider } from 'primeng/divider';

@Component({
  selector: 'app-header',
  imports: [ButtonModule, TooltipModule, RouterLink, Divider, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  store = inject(PortfolioStore);

  isDarkMode() {
    const element = document.querySelector('html');
    return element.classList.contains('app-dark-theme');
  }

  toggleDarkMode() {
    const element = document.querySelector('html');
    element.classList.toggle('app-dark-theme');
  }
}
