import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PortfolioStore } from '../../store/store';
import { WelcomeBanner } from '../../components/welcome-banner/welcome-banner';
import { AboutMe } from '../../components/about-me/about-me';

@Component({
  selector: 'app-welcome',
  imports: [ButtonModule, WelcomeBanner, AboutMe],
  templateUrl: './welcome.html',
  styleUrl: './welcome.scss',
})
export class Welcome {
  store = inject(PortfolioStore);
}
