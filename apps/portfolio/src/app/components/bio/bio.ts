import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PortfolioStore } from '../../store/store';
import { ButtonModule } from 'primeng/button';

import { SpotlightDirective } from '../../directives/spotlight.directive';
import { Divider } from 'primeng/divider';

@Component({
  selector: 'app-bio',
  imports: [ButtonModule, SpotlightDirective, Divider],
  templateUrl: './bio.html',
  styleUrl: './bio.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Bio {
  store = inject(PortfolioStore);
}
