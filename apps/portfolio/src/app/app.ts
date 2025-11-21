import { Component, inject, OnInit } from '@angular/core';
import { Header } from './components/header/header';
import { PortfolioStore } from './store/store';
import { ButtonModule } from 'primeng/button';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Bio } from "./components/bio/bio";
import { Divider } from "primeng/divider";
import { Footer } from './components/footer/footer';

@Component({
  imports: [Header, ButtonModule, RouterOutlet, ToastModule, Bio, Divider, Footer],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  providers: [PortfolioStore, MessageService],
})
export class App implements OnInit {
  store = inject(PortfolioStore);

  ngOnInit() {
    this.store.fetchProfileDetails();
    this.store.fetchExperiences();
    this.store.fetchProjects();
  }
}
