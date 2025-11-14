import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SpotlightDirective } from '../../directives/spotlight.directive';
import { PortfolioStore } from '../../store/store';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { ChipModule } from 'primeng/chip';
import { RouterLink } from '@angular/router';
import { Project } from '@portfolio/models';
import { TechnologyPillComponent } from '../technology-pill';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [
    ButtonModule,
    SpotlightDirective,
    NgClass,
    ChipModule,
    NgTemplateOutlet,
    RouterLink,
    TechnologyPillComponent,
  ],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCardComponent {
  project = input.required<Project>();
  store = inject(PortfolioStore);
  view = input<'grid' | 'list'>();

  visibilityText = computed(() => {
    return this.project().private ? 'Private' : 'Public';
  });

  getPlaceholderColor(): string {
    let hash = 0;
    const title = this.project()?.title ?? '';
    for (let i = 0; i < title.length; i++) {
      hash = title.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c = (hash & 0x00ffffff).toString(16).toUpperCase();
    return '#' + '00000'.substring(0, 6 - c.length) + c;
  }
}
