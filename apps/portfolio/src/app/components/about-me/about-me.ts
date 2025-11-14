import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  signal,
} from '@angular/core';
import { PortfolioStore } from '../../store/store';
import { ButtonModule } from 'primeng/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-about-me',
  imports: [ButtonModule],
  templateUrl: './about-me.html',
  styleUrl: './about-me.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutMe {
  store = inject(PortfolioStore);
  destroyRef = inject(DestroyRef);

  title = computed(() => this.store.fullName().trim().toLowerCase());

  renderedAboutMe = signal<any>(null);

  constructor() {
    effect(() => {
      // const url = this.store.profile().aboutUrl;
      const url = 'assets/detailed-bio.md';

      this.store
        .fetchMarkdownRenderAsHTML(url)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((r) => this.renderedAboutMe.set(r));
    });
  }
}
