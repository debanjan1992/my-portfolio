import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PortfolioStore } from '../../store/store';
import { ButtonModule } from 'primeng/button';

import { ThemeService } from '../../services/theme';

@Component({
  selector: 'app-bio',
  imports: [ButtonModule],
  templateUrl: './bio.html',
  styleUrl: './bio.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Bio {
  store = inject(PortfolioStore);
  themeService = inject(ThemeService);
}
