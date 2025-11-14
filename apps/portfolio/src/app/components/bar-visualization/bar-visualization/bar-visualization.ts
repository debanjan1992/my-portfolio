import { Component, computed, DOCUMENT, inject, input } from '@angular/core';
import { TechnologyPillComponent } from '../../technology-pill';
import { MASTER_SKILLS } from '../../../utilities';

export interface BarDataInput {
  name: string;
  value: number;
}

@Component({
  selector: 'app-bar-visualization',
  imports: [TechnologyPillComponent],
  templateUrl: './bar-visualization.html',
  styleUrl: './bar-visualization.scss',
})
export class BarVisualization {
  data = input.required<BarDataInput[]>();

  processedData = computed(() => {
    const currentData = this.data();
    const total = currentData.reduce((acc, curr) => acc + curr.value, 0);

    if (total === 0) return [];

    return currentData
      .map((item) => {
        const percent = (item.value / total) * 100;
        return {
          ...item,
          percent: percent,
          formattedPercent: percent.toFixed(1) + '%',
        };
      })
      .sort((a, b) => b.percent - a.percent);
  });

  getColor(tech: string) {
    return MASTER_SKILLS[tech.toLowerCase()]?.color ?? '#9ca3af';
  }
}
