import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RevealOnScrollDirective } from '../../shared/reveal-on-scroll.directive';

interface TechItem {
  name: string;
  description: string;
  metric: string;
}

@Component({
  selector: 'app-technology',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, RevealOnScrollDirective],
  templateUrl: './technology.html',
  styleUrl: './technology.scss',
})
export class Technology {
  contactForm: FormGroup;

  technologies: TechItem[] = [
    {
      name: 'Cellulose acoustic matrix',
      metric: 'Porous absorption',
      description: 'A spray-applied cellulose fibre structure converts reflected sound energy into heat through controlled air movement.',
    },
    {
      name: 'Thickness-tuned build-ups',
      metric: '10-40 mm',
      description: 'Layer depth is selected by reverberation target, substrate and ceiling volume so the finish remains efficient.',
    },
    {
      name: 'Architectural detailing',
      metric: 'Clean interfaces',
      description: 'Edges, services, lights and sprinklers are coordinated so the acoustic layer looks intentional in finished interiors.',
    },
  ];

  processSteps = [
    'Acoustic target and drawing review',
    'Substrate inspection and sample mock-up',
    'Spray application with depth control',
    'Finish inspection and documentation',
  ];

  labMetrics = [
    { value: 'Up to 1.0', label: 'NRC achieved' },
    { value: 'Low VOC', label: 'Interior use' },
    { value: 'Pan-India', label: 'Project support' },
  ];

  contactChannels = [
    {
      label: 'Project enquiries',
      email: 'projects@accoustic360.com',
      description: 'New builds, retrofits, tenders and budgets.',
    },
    {
      label: 'Technical support',
      email: 'tech@accoustic360.com',
      description: 'Details, build-ups, test data and specifications.',
    },
    {
      label: 'General and partnerships',
      email: 'hello@accoustic360.com',
      description: 'Partnerships, media and everything else.',
    },
  ];

  projectTypes = [
    'Office / workspace',
    'Education / institution',
    'Industrial / plant',
    'Retail / hospitality',
    'Studio / performance',
    'Other',
  ];

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      company: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s]{7,18}$/)]],
      projectType: [''],
      message: ['', [Validators.required, Validators.minLength(10)]],
      consent: [false, Validators.requiredTrue],
    });
  }

  get f() {
    return this.contactForm.controls;
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    console.log('TECHNOLOGY ENQUIRY PAYLOAD', this.contactForm.value);
    this.contactForm.reset();
  }
}
