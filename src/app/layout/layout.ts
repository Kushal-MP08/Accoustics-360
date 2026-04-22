import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../core/navbar/navbar';
import { Footer } from '../core/footer/footer';
import { IntroSplash } from '../core/intro-splash/intro-splash';
import { FloatingContact } from '../core/floating-contact/floating-contact';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [IntroSplash, FloatingContact, Navbar, Footer, RouterOutlet],
  templateUrl: './layout.html',
  styleUrls: ['./layout.scss'],
})
export class Layout {}
