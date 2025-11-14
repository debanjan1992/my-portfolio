import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SvgIcon, SvgIconComponent } from '../svg-icon/svg-icon';

@Component({
  selector: 'app-skill-tag',
  standalone: true,
  imports: [SvgIconComponent],
  templateUrl: './skill-tag.html',
  styleUrl: './skill-tag.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillTagComponent {
  skill = input.required<string>();

  asSvgIcon(icon: string): SvgIcon {
    return icon as SvgIcon;
  }
}