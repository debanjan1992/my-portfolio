import { SvgIconComponent } from '../svg-icon/svg-icon';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Experience } from '@portfolio/models';
import { DatePipe } from '@angular/common';

import { SpotlightDirective } from '../../directives/spotlight.directive';
import { ChipModule } from 'primeng/chip';
import { Divider } from 'primeng/divider';

@Component({
  selector: 'app-experience-item',
  imports: [
    DatePipe,
    SvgIconComponent,
    SpotlightDirective,
    ChipModule,
    Divider,
  ],
  templateUrl: './experience-item.html',
  styleUrl: './experience-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceItem {
  experience = input.required<Experience>();

  getType(type: 'full-time' | 'contract' | 'freelance') {
    switch (type) {
      case 'full-time':
        return 'Full Time';
      case 'contract':
        return 'Contract';
      default:
        return type;
    }
  }

  getDurationInYearsAndMonths(start: number, end: number) {
    if (end === 0) {
      end = new Date().getTime();
    }
    const startDate = new Date(start);
    const endDate = new Date(end);
    let years = endDate.getFullYear() - startDate.getFullYear();
    let months = endDate.getMonth() - startDate.getMonth();

    // Adjust months and years if the end date's month is earlier than the start date's month
    if (months < 0) {
      years--;
      months += 12;
    }

    // Handle cases where the end day is earlier than the start day in the same month
    // This ensures that a full month is only counted if the day has passed
    if (endDate.getDate() < startDate.getDate()) {
      months--;
      if (months < 0) {
        years--;
        months += 12;
      }
    }

    if (!years && months) {
      return `${months} months`;
    }

    if (!months && years) {
      return `${years} years`;
    }

    return `${years} years, ${months} months`;
  }
}
