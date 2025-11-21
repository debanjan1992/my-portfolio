import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-welcome-banner',
  imports: [RouterLink],
  templateUrl: './welcome-banner.html',
  styleUrl: './welcome-banner.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeBanner {}
