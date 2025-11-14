import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-project-card',
  imports: [],
  templateUrl: './components.html',
  styleUrl: './components.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCard {}
