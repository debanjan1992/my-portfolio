import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { take } from 'rxjs';
import { NgClass } from '@angular/common';

export type SvgIcon =
  | 'location'
  | 'email'
  | 'github'
  | 'linkedin'
  | 'briefcase'
  | 'twitter'
  | 'facebook'
  | 'dribbble'
  | 'npm'
  | 'react'
  | 'java'
  | 'git'
  | 'nextjs'
  | 'scss'
  | 'html5'
  | 'redux'
  | 'firebase'
  | 'jest'
  | 'nx'
  | 'nodejs'
  | 'tailwind'
  | 'mysql'
  | 'typescript'
  | 'angular'
  | 'angularjs'
  | 'css'
  | 'flutter'
  | 'playwright'
  | 'ngrx'
  | 'javascript';

@Component({
  selector: 'app-svg-icon',
  standalone: true,
  imports: [NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <span [innerHTML]="svgContent()" [ngClass]="className()"></span> `,
  styles: [
    `
      :host span {
        display: inline-block;
        width: 24px;
        height: 24px;
      }

      :host span ::ng-deep svg {
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class SvgIconComponent {
  icon = input.required<SvgIcon>();
  className = input<string>('');

  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);

  svgContent = signal<SafeHtml>('');

  constructor() {
    effect(() => {
      const iconName = this.icon();
      this.http
        .get(`assets/svg/${iconName}.svg`, { responseType: 'text' })
        .pipe(take(1))
        .subscribe((svg) => {
          this.svgContent.set(this.sanitizer.bypassSecurityTrustHtml(svg));
        });
    });
  }
}
