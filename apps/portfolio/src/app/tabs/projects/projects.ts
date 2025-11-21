import {
  Component,
  computed,
  effect,
  inject,
  linkedSignal,
  model,
  OnInit,
  signal,
} from '@angular/core';
import { PortfolioStore } from '../../store/store';
import { ProjectCardComponent } from '../../components/project-card/project-card';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { NgClass } from '@angular/common';
import { Divider } from 'primeng/divider';

@Component({
  selector: 'app-project',
  imports: [
    ProjectCardComponent,
    MultiSelectModule,
    FormsModule,
    ButtonModule,
    NgClass,
    Divider,
  ],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  store = inject(PortfolioStore);
  activeFilter = signal<string>('all');
  view = signal<'grid' | 'list'>('grid');
  filters = ['all', 'angular', 'react', 'nodejs', 'chrome extension'];

  filteredProjects = linkedSignal(() => {
    return this.store.projects();
  });

  constructor() {
    effect(() => {
      if (!this.activeFilter()) {
        return;
      }

      if (this.activeFilter() === 'all') {
        this.filteredProjects.set(this.store.projects());
        return;
      }
      this.filteredProjects.set(
        this.store
          .projects()
          .filter((p) => p.technologies.includes(this.activeFilter()))
      );
    });
  }
}
