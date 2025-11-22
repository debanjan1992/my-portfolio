import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PortfolioStore } from '../../store/store';
import { AboutMe } from '../../components/about-me/about-me';
import { WelcomeBanner } from './welcome-banner/welcome-banner';

@Component({
  selector: 'app-welcome',
  imports: [ButtonModule, WelcomeBanner, AboutMe],
  templateUrl: './welcome.html',
  styleUrl: './welcome.scss',
})
export class Welcome {
  store = inject(PortfolioStore);
}
