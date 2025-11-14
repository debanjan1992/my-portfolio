import { Component, computed, inject } from '@angular/core';
import {
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { PortfolioStore } from '../../store/store';
import { SpotlightDirective } from '../../directives/spotlight.directive';
import { PortfolioService } from '../../portfolio';

@Component({
  selector: 'app-contact',
  imports: [
    Button,
    ReactiveFormsModule,
    InputTextModule,
    TextareaModule,
    SpotlightDirective,
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  providers: [],
})
export class Contact {
  private fb = inject(NonNullableFormBuilder);
  store = inject(PortfolioStore);
  portfolioService = inject(PortfolioService);

  contactForm = this.fb.group<{
    name: FormControl<string>;
    email: FormControl<string>;
    message: FormControl<string>;
  }>({
    name: this.fb.control('', [Validators.required, Validators.minLength(3)]),
    email: this.fb.control('', [Validators.required, Validators.email]),
    message: this.fb.control('', [
      Validators.required,
      Validators.minLength(20),
    ]),
  });

  get name() {
    return this.contactForm.controls.name;
  }

  get email() {
    return this.contactForm.controls.email;
  }

  get message() {
    return this.contactForm.controls.message;
  }

  headerText = computed(
    () => this.store.fullName().toLowerCase() + '/contact.html'
  );

  onSubmit() {
    if (this.contactForm.invalid) return;
    this.contactForm.reset();

    this.portfolioService
      .sendEmailMessage(this.name.value, this.email.value, this.message.value)
      .subscribe(console.log);
  }
}
