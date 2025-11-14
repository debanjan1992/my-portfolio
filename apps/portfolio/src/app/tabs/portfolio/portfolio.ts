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

@Component({
  selector: 'app-portfolio',
  imports: [
    ProjectCardComponent,
    MultiSelectModule,
    FormsModule,
    ButtonModule,
    NgClass,
  ],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss',
})
export class Portfolio {
  store = inject(PortfolioStore);
  selectedTechnologies = model<{ name: string }[]>([]);
  view = signal<'grid' | 'list'>('grid');

  filteredProjects = linkedSignal(() => {
    return this.store.projects();
  });

  skillDropdownOptions = computed(() =>
    this.store
      .technologies()
      .map((s) => ({ name: s.charAt(0).toUpperCase() + s.substring(1) }))
  );

  constructor() {
    effect(() => {
      if (!this.selectedTechnologies()) {
        return;
      }
      if (this.selectedTechnologies().length === 0) {
        this.filteredProjects.set(this.store.projects());
        return;
      }
      const selectedTechnologies = this.selectedTechnologies().map((s) =>
        s.name.toLowerCase()
      );
      const filteredProjects = this.store
        .projects()
        .filter((p) =>
          p.technologies.some((t) => selectedTechnologies.includes(t))
        );

      this.filteredProjects.set(filteredProjects);
    });
  }
}
