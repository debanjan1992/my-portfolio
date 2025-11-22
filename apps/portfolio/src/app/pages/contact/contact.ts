import { Component, computed, inject, signal } from '@angular/core';
import {
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { PortfolioStore } from '../../store/store';
import { PortfolioService } from '../../portfolio';
import { SelectModule } from 'primeng/select';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, InputTextModule, TextareaModule, SelectModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  providers: [],
})
export class Contact {
  private fb = inject(NonNullableFormBuilder);
  private messageService = inject(MessageService);
  store = inject(PortfolioStore);
  portfolioService = inject(PortfolioService);

  allSubjects = signal<{ name: string }[]>([
    { name: 'General Inquiry' },
    { name: 'Freelance Project' },
    { name: 'Job Opportunity  ' },
    { name: 'Technical Consultation' },
  ]);

  contactForm = this.fb.group<{
    name: FormControl<string>;
    email: FormControl<string>;
    subject: FormControl<{ name: string }>;
    message: FormControl<string>;
  }>({
    name: this.fb.control('', [Validators.required]),
    email: this.fb.control('', [Validators.required, Validators.email]),
    subject: this.fb.control({ name: 'General Inquiry' }, [
      Validators.required,
      Validators.email,
    ]),
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
      .subscribe({
        next: () =>
          this.messageService.add({
            severity: 'success',
            summary: 'Email sent successfully!',
            life: 3000,
          }),
        error: () =>
          this.messageService.add({
            severity: 'error',
            summary: 'Failed to send email!',
            life: 3000,
          }),
      });
  }
}
