import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { PortfolioStore } from '../../../store/store';

@Component({
  selector: 'app-welcome-banner',
  imports: [RouterLink],
  templateUrl: './welcome-banner.html',
  styleUrl: './welcome-banner.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeBanner {
  store = inject(PortfolioStore);
  headerTexts = signal<string[]>([
    '<span class="highlight">Architecting</span> systems that scale effortlessly.',
    'Transforming ideas into <span class="highlight">intelligent</span> reality.',
    '<span class="highlight">Crafting</span> interfaces that users love.',
    '<span class="highlight">Engineering</span> code with precision and purpose.',
    'Building digital <span class="highlight">experiences</span> that matter.',
  ]);

  heroText = computed(() => {
    const randomIndex = Math.floor(Math.random() * this.headerTexts().length);
    return this.headerTexts()[randomIndex];
  });
}
