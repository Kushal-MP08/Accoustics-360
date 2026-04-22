import {
  Component,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  ElementRef,
  inject,
  ChangeDetectorRef,
} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxAnimatedCounterModule, NgxAnimatedCounterParams } from '@bugsplat/ngx-animated-counter';
import { RevealOnScrollDirective } from '../../shared/reveal-on-scroll.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    NgxAnimatedCounterModule,
    ReactiveFormsModule,
    RouterModule,
    RevealOnScrollDirective,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements AfterViewInit, OnDestroy {
  @ViewChild('statsSection') statsSection!: ElementRef<HTMLElement>;

  private cdr = inject(ChangeDetectorRef);

  // ─── CONTACT FORM ──────────────────────────────────────────────────────────
  statsVisible = false;
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{7,15}$/)]],
    });
  }

  get emailCtrl() { return this.contactForm.get('email'); }
  get phoneCtrl() { return this.contactForm.get('phone'); }

  onContactSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    console.log('Contact form payload', this.contactForm.value);
    this.contactForm.reset();
  }

  // ─── WORK STEPS ────────────────────────────────────────────────────────────
  workSteps = [
    {
      step: '01',
      title: 'Acoustic Audit',
      description: 'We study room volume, surface finishes, reverberation goals and site constraints before recommending a build-up.',
    },
    {
      step: '02',
      title: 'System Design',
      description: 'Thickness, colour, texture and application zones are mapped to meet acoustic targets without changing the architecture.',
    },
    {
      step: '03',
      title: 'Spray Application',
      description: 'Trained applicators create a continuous cellulose finish around ducts, beams, lights and complex ceiling geometry.',
    },
    {
      step: '04',
      title: 'Finish Review',
      description: 'Coverage, texture, thickness and detailing are checked before handover with support for documentation and maintenance.',
    },
  ];

  solutionCards = [
    {
      title: 'Spray-applied acoustic finish',
      metric: 'NRC up to 1.0',
      description:
        'A monolithic cellulose surface that absorbs reverberation while keeping services, beams and exposed decks visible.',
      image: 'assets/acoustic-texture-generated.jpg',
    },
    {
      title: 'Architectural ceiling integration',
      metric: '10-40 mm typical build-up',
      description:
        'Clean detailing around lighting, ducts and curved geometry for interiors that need acoustic comfort without visual clutter.',
      image: 'assets/acoustic-hero-generated.jpg',
    },
    {
      title: 'Retrofit noise control',
      metric: 'Fast on-site application',
      description:
        'Ideal for offices, factories, studios and hospitality spaces where sound needs to improve without replacing the ceiling system.',
      image: 'assets/projbak-1.jpeg',
    },
  ];

  applicationCards = [
    {
      title: 'Open offices',
      label: 'Focus + collaboration',
      image: 'assets/acoustic-hero-generated.jpg',
    },
    {
      title: 'Auditoriums',
      label: 'Speech clarity',
      image: 'assets/bak1.png',
    },
    {
      title: 'Industrial halls',
      label: 'Lower reverberation',
      image: 'assets/bak3.png',
    },
    {
      title: 'Studios',
      label: 'Controlled ambience',
      image: 'assets/acoustic-texture-generated.jpg',
    },
  ];

  trustQuotes = [
    {
      quote:
        'The ceiling kept its architectural character, but the room immediately felt calmer and more premium.',
      author: 'Project Architect',
      context: 'Commercial workplace retrofit',
    },
    {
      quote:
        'The spray system helped us tune a difficult exposed ceiling without adding panels or visual noise.',
      author: 'Acoustic Consultant',
      context: 'Performance and assembly space',
    },
  ];

  // Demo placeholders. Replace with approved client names/logos before launch.
  partnerLogos = [
    { name: 'Google', mark: 'G', category: 'Workplace environments', tone: 'blue' },
    { name: 'YouTube', mark: 'YT', category: 'Studio & media rooms', tone: 'red' },
    { name: 'AcoustiLab', mark: 'AL', category: 'Acoustic consulting', tone: 'green' },
    { name: 'MetroWorks', mark: 'MW', category: 'Commercial projects', tone: 'slate' },
    { name: 'StudioGrid', mark: 'SG', category: 'Recording spaces', tone: 'amber' },
    { name: 'GreenFrame', mark: 'GF', category: 'Sustainable interiors', tone: 'green' },
    { name: 'Nova Build', mark: 'NB', category: 'Architectural delivery', tone: 'slate' },
    { name: 'Resonance', mark: 'RS', category: 'Performance venues', tone: 'blue' },
  ];

  // ─── STATISTICS ────────────────────────────────────────────────────────────
  stats = [
    { value: 30, suffix: '+', label: 'Years of Experience' },
    { value: 70, suffix: '+', label: 'Project Locations' },
    { value: 30, suffix: '',  label: 'Finished Projects' },
  ];

  public params: NgxAnimatedCounterParams = { start: 0, end: 100, interval: 20, increment: 5 };

  private statsObserver?: IntersectionObserver;

  ngAfterViewInit(): void {
    this.initStatsObserver();
  }

  private initStatsObserver(): void {
    if (!this.statsSection?.nativeElement) return;
    this.statsObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !this.statsVisible) {
          this.statsVisible = true;
          this.cdr.markForCheck();
          this.statsObserver?.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    this.statsObserver.observe(this.statsSection.nativeElement);
  }

  ngOnDestroy(): void {
    this.statsObserver?.disconnect();
  }

  // ─── BEYOND ACOUSTICS SLIDER ───────────────────────────────────────────────
  properties = [
    {
      title: 'Acoustic Performance',
      subtitle: 'Superior sound quality',
      description: 'Achieve exceptional sound control and a silent environment with our high NRC cellulose spray system.',
      image: 'assets/acoustic-hero-generated.jpg',
    },
    {
      title: 'Thermal Efficiency',
      subtitle: 'Energy-saving insulation',
      description: 'Reduce heat transfer and improve energy efficiency across roofs, walls and industrial envelopes.',
      image: 'assets/acoustic-texture-generated.jpg',
    },
    {
      title: 'Fire & Safety',
      subtitle: 'Enhanced protection',
      description: 'Formulations designed to meet stringent safety guidelines while maintaining outstanding performance.',
      image: 'assets/bak2.png',
    },
  ];

  currentPropertyIndex = 0;
  isPropertyAnimating = true;

  private scrollCooldown = false;
  private touchStartY: number | null = null;

  get currentProperty() {
    return this.properties[this.currentPropertyIndex];
  }

  setProperty(index: number): void {
    this.currentPropertyIndex = index;
    this.triggerAnimation();
  }

  triggerAnimation(): void {
    this.isPropertyAnimating = false;
    setTimeout(() => (this.isPropertyAnimating = true), 0);
  }

  nextProperty(): void {
    this.currentPropertyIndex = (this.currentPropertyIndex + 1) % this.properties.length;
    this.triggerAnimation();
  }

  prevProperty(): void {
    this.currentPropertyIndex =
      (this.currentPropertyIndex - 1 + this.properties.length) % this.properties.length;
    this.triggerAnimation();
  }

  private scrollForward(): void {
    if (this.scrollCooldown) return;
    this.nextProperty();
    this.scrollCooldown = true;
    setTimeout(() => (this.scrollCooldown = false), 600);
  }

  private scrollBackward(): void {
    if (this.scrollCooldown) return;
    this.prevProperty();
    this.scrollCooldown = true;
    setTimeout(() => (this.scrollCooldown = false), 600);
  }

  onPropertyWheel(event: WheelEvent): void {
    const threshold = 20;
    const lastIndex = this.properties.length - 1;
    if (Math.abs(event.deltaY) < threshold) return;

    if (event.deltaY > 0 && this.currentPropertyIndex < lastIndex) {
      this.scrollForward();
      return;
    }
    if (event.deltaY < 0 && this.currentPropertyIndex > 0) {
      this.scrollBackward();
    }
  }

  onPropertyTouchStart(event: TouchEvent): void {
    if (event.touches.length === 1) {
      this.touchStartY = event.touches[0].clientY;
    }
  }

  onPropertyTouchMove(event: TouchEvent): void {
    if (this.touchStartY === null) return;
    const deltaY = this.touchStartY - event.touches[0].clientY;
    const threshold = 25;
    const lastIndex = this.properties.length - 1;
    if (Math.abs(deltaY) < threshold) return;

    if (deltaY > 0 && this.currentPropertyIndex < lastIndex) {
      this.scrollForward();
      this.touchStartY = event.touches[0].clientY;
      return;
    }
    if (deltaY < 0 && this.currentPropertyIndex > 0) {
      this.scrollBackward();
      this.touchStartY = event.touches[0].clientY;
      return;
    }
    this.touchStartY = null;
  }
}
