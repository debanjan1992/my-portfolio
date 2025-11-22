import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PortfolioStore } from '../../store/store';
import { ProjectCardComponent } from './../project-card/project-card';

@Component({
  selector: 'app-featured-projects',
  imports: [ButtonModule, RouterLink, ProjectCardComponent],
  templateUrl: './featured-projects.html',
  styleUrl: './featured-projects.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedProjects {
  store = inject(PortfolioStore);
  featuredProjects = computed(() => {
    return this.store
      .projects()
      .filter((p) => this.store.featured().includes(p.name));
  });
}
