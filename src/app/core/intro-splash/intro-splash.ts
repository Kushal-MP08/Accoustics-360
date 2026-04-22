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
  private platformId = inject(PLATFORM_ID);
  private hideTimer?: number;
  private leaveTimer?: number;
  private progressTimer?: number;
  private audioContext?: AudioContext;
  private oscillator?: OscillatorNode;
  private gain?: GainNode;

  visible = signal(false);
  leaving = signal(false);
  progress = signal(0);
  ambientEnabled = signal(false);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const seenIntro = sessionStorage.getItem('accoustic360:intro-seen') === 'true';
    if (seenIntro) return;

    this.visible.set(true);
    this.startProgress();

    this.leaveTimer = window.setTimeout(() => this.leaving.set(true), 5600);
    this.hideTimer = window.setTimeout(() => this.finishIntro(), 6400);
  }

  skipIntro(): void {
    this.finishIntro();
  }

  async toggleAmbient(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    if (this.ambientEnabled()) {
      this.stopAmbient();
      return;
    }

    const AudioContextCtor =
      window.AudioContext ||
      (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextCtor) return;

    this.audioContext = new AudioContextCtor();
    await this.audioContext.resume();

    this.oscillator = this.audioContext.createOscillator();
    this.gain = this.audioContext.createGain();
    this.oscillator.type = 'triangle';
    this.oscillator.frequency.setValueAtTime(174, this.audioContext.currentTime);
    this.gain.gain.setValueAtTime(0, this.audioContext.currentTime);
    this.gain.gain.linearRampToValueAtTime(0.12, this.audioContext.currentTime + 0.35);

    this.oscillator.connect(this.gain);
    this.gain.connect(this.audioContext.destination);
    this.oscillator.start();
    this.ambientEnabled.set(true);
  }

  ngOnDestroy(): void {
    this.clearTimers();
    this.stopAmbient();
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
    this.stopAmbient();

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

  private stopAmbient(): void {
    this.ambientEnabled.set(false);
    this.oscillator?.stop();
    this.oscillator?.disconnect();
    this.gain?.disconnect();
    this.audioContext?.close();
    this.oscillator = undefined;
    this.gain = undefined;
    this.audioContext = undefined;
  }
}
