import { Component, computed, inject } from '@angular/core';
import { PortfolioStore } from '../../store/store';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { AvatarModule } from 'primeng/avatar';
import { TooltipModule } from 'primeng/tooltip';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [DividerModule, ButtonModule, AvatarModule, TooltipModule, RouterLink],
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
