import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[appSpotlight]',
  standalone: true,
})
export class SpotlightDirective implements OnInit, OnDestroy {
  @Input() spotlightRadius = 150;
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private document = inject(DOCUMENT);
  private styleElement: HTMLStyleElement;

  constructor() {
    this.renderer.addClass(this.el.nativeElement, 'spotlight-card');
    this.renderer.addClass(this.el.nativeElement, 'rounded-md');
  }

  ngOnInit() {
    this.styleElement = this.renderer.createElement('style');
    this.renderer.appendChild(this.document.head, this.styleElement);
    this.styleElement.innerHTML = `
      .spotlight-card {
        position: relative;
      }
      /* Inner glow */
      .spotlight-card::before {
        content: '';
        position: absolute;
        left: 0; top: 0; width: 100%; height: 100%;
        background: radial-gradient(
          circle var(--radius, 150px) at var(--x) var(--y),
          var(--spotlight-color-start),
          var(--spotlight-color-end)
        );
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 2;
        pointer-events: none;
        border-radius: inherit;
      }
      /* Border glow */
      .spotlight-card::after {
        content: "";
        position: absolute;
        inset: 0;
        padding: 2px; /* border thickness */
        border-radius: inherit;
        background: radial-gradient(
          circle var(--radius, 150px) at var(--x) var(--y),
          var(--spotlight-highlight-color), 
          transparent
        );
        -webkit-mask: 
           linear-gradient(#fff 0 0) content-box, 
           linear-gradient(#fff 0 0);
        mask-composite: exclude;
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
        z-index: 1; 
      }
      .spotlight-card:hover::before,
      .spotlight-card:hover::after {
        opacity: 1;
      }
    `;
  }

  ngOnDestroy() {
    this.renderer.removeChild(this.document.head, this.styleElement);
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const card = this.el.nativeElement as HTMLElement;
    const { x, y } = card.getBoundingClientRect();
    card.style.setProperty('--x', `${event.clientX - x}px`);
    card.style.setProperty('--y', `${event.clientY - y}px`);
    card.style.setProperty('--radius', `${this.spotlightRadius}px`);
  }
}
