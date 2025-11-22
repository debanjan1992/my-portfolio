import { Component, inject } from '@angular/core';
import { PortfolioStore } from '../../store/store';
import { ExperienceItem } from './experience-item/experience-item';

@Component({
  selector: 'app-experience',
  imports: [ExperienceItem],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class Experience {
  store = inject(PortfolioStore);
}
