import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SeoService } from './services/seo/seo';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('accoustic360');

  constructor(private readonly seo: SeoService) {
    // SeoService starts listening immediately
  }
}
