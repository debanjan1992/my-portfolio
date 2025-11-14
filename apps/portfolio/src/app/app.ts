import { Component, inject, OnInit } from '@angular/core';
import { Header } from './components/header/header';
import { PortfolioStore } from './store/store';
import { ButtonModule } from 'primeng/button';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [Header, ButtonModule, RouterOutlet],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  providers: [PortfolioStore],
})
export class App implements OnInit {
  store = inject(PortfolioStore);

  ngOnInit() {
    this.store.fetchProfileDetails();
    this.store.fetchExperiences();
    this.store.fetchProjects();
  }
}
