import { CommonModule, NgClass } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { MASTER_SKILLS } from '../utilities';

@Component({
  selector: 'app-tech-pill',
  standalone: true,
  imports: [CommonModule, NgClass],
  template: `
    <div
      class="pill flex items-center px-2 py-1 gap-2 rounded-2xl"
      [ngClass]="flat() ? 'flat' : ''"
    >
      <span class="dot" [style.background-color]="info().color"> </span>
      <span class="text text-xs capitalize">
        {{ info().title }}
      </span>
    </div>
  `,
  styles: [
    `
      .pill {
        &:not(.flat) {
          background-color: var(--bg-color-2);
          border: 1px solid var(--border-color);
          cursor: default;
        }
      }

      .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        flex-shrink: 0;
      }
    `,
  ],
})
export class TechnologyPillComponent {
  technology = input.required<string>();
  flat = input();

  info = computed(() => {
    const key = this.technology().toLowerCase();
    const skill = MASTER_SKILLS[key];

    // Return the skill if found, otherwise a fallback generic object
    return (
      skill || {
        title: this.technology(), // Fallback to showing the input string
        color: '#9ca3af', // Fallback generic gray
      }
    );
  });
}
