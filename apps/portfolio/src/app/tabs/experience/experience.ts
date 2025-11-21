import { Component, computed, inject } from '@angular/core';
import { PortfolioStore } from '../../store/store';
import { ExperienceItem } from '../../components/experience-item/experience-item';

@Component({
  selector: 'app-experience',
  imports: [ExperienceItem],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class Experience {
  store = inject(PortfolioStore);

  totalExperience = computed(() =>
    this.getDurationInYearsAndMonths(
      this.store.profile().careerStart,
      new Date().getTime()
    )
  );

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
