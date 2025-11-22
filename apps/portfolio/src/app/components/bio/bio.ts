import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PortfolioStore } from '../../store/store';
import { ButtonModule } from 'primeng/button';

import { Divider } from 'primeng/divider';
import { ThemeService } from '../../services/theme';

@Component({
  selector: 'app-bio',
  imports: [ButtonModule, Divider],
  templateUrl: './bio.html',
  styleUrl: './bio.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Bio {
  store = inject(PortfolioStore);
  themeService = inject(ThemeService);
}
