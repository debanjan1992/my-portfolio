import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Project } from '@portfolio/models';
import { ButtonModule } from 'primeng/button';
import { PortfolioService } from '../../portfolio';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SpotlightDirective } from '../../directives/spotlight.directive';
import { TabsModule } from 'primeng/tabs';
import { Divider } from 'primeng/divider';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { HttpClient } from '@angular/common/http';
import { PortfolioStore } from '../../store/store';
import {
  BarDataInput,
  BarVisualization,
} from '../../components/bar-visualization/bar-visualization/bar-visualization';
import { TechnologyPillComponent } from '../../components/technology-pill';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-project-details',
  imports: [
    ButtonModule,
    RouterLink,
    SpotlightDirective,
    TabsModule,
    Divider,
    BarVisualization,
    TechnologyPillComponent,
    DatePipe,
  ],
  templateUrl: './project-details.html',
  styleUrl: './project-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetails implements OnInit {
  route = inject(ActivatedRoute);
  destroyRef = inject(DestroyRef);
  portfolioService = inject(PortfolioService);
  http = inject(HttpClient);
  store = inject(PortfolioStore);

  id = input.required<string>();
  project = signal<Project | null>(null);
  visibilityText = computed(() => {
    return this.project().private ? 'Private' : 'Public';
  });
  renderedMd = signal<any>(null);

  barData = computed<BarDataInput[]>(() =>
    Object.entries(this.project().languages).map(([key, value]) => ({
      name: key,
      value: value,
    }))
  );

  ngOnInit() {
    this.portfolioService
      .getProjectDetails(this.id())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((p) => {
        this.project.set(p);
        this.store
          .fetchMarkdownRenderAsHTML(p.readmeUrl)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((r) => this.renderedMd.set(r));
      });
  }
}
