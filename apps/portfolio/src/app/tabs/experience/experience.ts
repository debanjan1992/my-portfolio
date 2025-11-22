import { Component, computed, inject } from '@angular/core';
import { PortfolioStore } from '../../store/store';
import { ExperienceItem } from '../../components/experience-item/experience-item';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-experience',
  imports: [ExperienceItem, NgIf],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class Experience {
  store = inject(PortfolioStore);
}
