import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PortfolioStore } from '../../store/store';

@Component({
  selector: 'app-welcome-banner',
  imports: [RouterLink],
  templateUrl: './welcome-banner.html',
  styleUrl: './welcome-banner.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeBanner {
  store = inject(PortfolioStore);
}
