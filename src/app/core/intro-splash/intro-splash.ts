import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnDestroy, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';

@Component({
  selector: 'app-intro-splash',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './intro-splash.html',
  styleUrl: './intro-splash.scss',
})
export class IntroSplash implements OnInit, OnDestroy {
  private readonly ambientAudioSrc = 'assets/intro-ambient.wav';
  private platformId = inject(PLATFORM_ID);
  private hideTimer?: number;
  private leaveTimer?: number;
  private progressTimer?: number;
  private ambientAudio?: HTMLAudioElement;
  private removeAmbientUnlock?: () => void;

  visible = signal(false);
  leaving = signal(false);
  progress = signal(0);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const seenIntro = sessionStorage.getItem('accoustic360:intro-seen') === 'true';
    if (seenIntro) return;

    this.visible.set(true);
    this.startProgress();
    this.startAmbientAudio();

    this.leaveTimer = window.setTimeout(() => this.leaving.set(true), 5600);
    this.hideTimer = window.setTimeout(() => this.finishIntro(), 6400);
  }

  ngOnDestroy(): void {
    this.clearTimers();
    this.stopAmbientAudio();
  }

  private startProgress(): void {
    const startedAt = performance.now();
    const duration = 6100;

    this.progressTimer = window.setInterval(() => {
      const elapsed = performance.now() - startedAt;
      this.progress.set(Math.min(100, Math.round((elapsed / duration) * 100)));
    }, 40);
  }

  private finishIntro(): void {
    if (!this.visible()) return;

    this.leaving.set(true);
    sessionStorage.setItem('accoustic360:intro-seen', 'true');
    this.clearTimers();
    this.stopAmbientAudio();

    window.setTimeout(() => {
      this.progress.set(100);
      this.visible.set(false);
    }, 420);
  }

  private clearTimers(): void {
    if (this.hideTimer) window.clearTimeout(this.hideTimer);
    if (this.leaveTimer) window.clearTimeout(this.leaveTimer);
    if (this.progressTimer) window.clearInterval(this.progressTimer);
  }

  private startAmbientAudio(): void {
    this.ambientAudio = new Audio(this.ambientAudioSrc);
    this.ambientAudio.loop = true;
    this.ambientAudio.preload = 'auto';
    this.ambientAudio.volume = 1;

    this.playAmbientAudio();
  }

  private playAmbientAudio(): void {
    this.ambientAudio?.play().catch(() => {
      this.registerAmbientUnlock();
    });
  }

  private registerAmbientUnlock(): void {
    if (this.removeAmbientUnlock) return;

    const unlock = () => {
      this.playAmbientAudio();
      this.removeAmbientUnlock?.();
    };

    window.addEventListener('pointerdown', unlock, { once: true });
    window.addEventListener('keydown', unlock, { once: true });

    this.removeAmbientUnlock = () => {
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
      this.removeAmbientUnlock = undefined;
    };
  }

  private stopAmbientAudio(): void {
    this.removeAmbientUnlock?.();

    if (!this.ambientAudio) return;

    this.ambientAudio.pause();
    this.ambientAudio.currentTime = 0;
    this.ambientAudio.src = '';
    this.ambientAudio.load();
    this.ambientAudio = undefined;
  }
}
