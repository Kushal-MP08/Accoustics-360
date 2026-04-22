import { Component } from '@angular/core';

@Component({
  selector: 'app-floating-contact',
  standalone: true,
  templateUrl: './floating-contact.html',
  styleUrl: './floating-contact.scss',
})
export class FloatingContact {
  phoneNumber = '+91 98765 43210';
  phoneHref = 'tel:+919876543210';
  whatsappHref = 'https://wa.me/919876543210?text=Hi%20Accoustic360%2C%20I%20want%20to%20discuss%20an%20acoustic%20spray%20project.';
  emailHref = 'mailto:info@accoustic360.com?subject=Acoustic%20spray%20project%20enquiry';
}
