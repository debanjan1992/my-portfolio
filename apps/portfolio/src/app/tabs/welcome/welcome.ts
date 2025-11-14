import { Component, effect, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PortfolioStore } from '../../store/store';
import { AboutMe } from '../../components/about-me/about-me';
import { SkillTagComponent } from '../../components/skill-tag/skill-tag';
import { SpotlightDirective } from '../../directives/spotlight.directive';

@Component({
  selector: 'app-welcome',
  imports: [ButtonModule, AboutMe, SkillTagComponent, SpotlightDirective],
  templateUrl: './welcome.html',
  styleUrl: './welcome.scss',
})
export class Welcome {
  store = inject(PortfolioStore);
}
