import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RevealOnScrollDirective } from '../../shared/reveal-on-scroll.directive';

interface ProductSystem {
  name: string;
  use: string;
  thickness: string;
  nrc: string;
  finish: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule, RevealOnScrollDirective],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {
  heroHighlights = ['NRC up to 1.0', 'Seamless monolithic finish', 'Sprayed in place on site'];

  performanceStats = [
    { value: '10-40 mm', label: 'Typical build-up range' },
    { value: 'Low VOC', label: 'Interior-ready formulation' },
    { value: 'Custom', label: 'Colour and texture direction' },
  ];

  productSystems: ProductSystem[] = [
    {
      name: 'AcoustiCell Classic',
      use: 'Open offices, retail, education and hospitality ceilings.',
      thickness: '12-25 mm',
      nrc: '0.70-0.90',
      finish: 'Fine spray texture',
    },
    {
      name: 'AcoustiCell Performance',
      use: 'Auditoria, studios, lecture theatres and high-volume rooms.',
      thickness: '25-40 mm',
      nrc: '0.90-1.00',
      finish: 'Medium acoustic texture',
    },
    {
      name: 'AcoustiCell Industrial',
      use: 'Factories, warehouses, plants and exposed service zones.',
      thickness: '20-40 mm',
      nrc: '0.80-1.00',
      finish: 'Robust spray finish',
    },
  ];

  benefits = [
    {
      title: 'Acoustic performance',
      text: 'High sound absorption across speech frequencies, reducing reverberation in offices, studios, halls and industrial spaces.',
    },
    {
      title: 'Design freedom',
      text: 'Smooth or textured finishes, clean edges, and a curated colour palette that works with exposed ceilings and modern interiors.',
    },
    {
      title: 'Sustainable choice',
      text: 'Cellulose-based formulation with recycled content, low VOC, and long service life designed for green building projects.',
    },
  ];

  colourFamilies = [
    {
      name: 'Essential Whites',
      description: 'Clean, bright tones ideal for offices, education, retail and spaces that need a neutral canvas.',
      finishes: 'Smooth trowelled or fine spray texture',
      colours: [
        { name: 'Polar White', hex: '#F6F7F9' },
        { name: 'Cloud Grey', hex: '#E1E4EA' },
        { name: 'Soft Linen', hex: '#ECE4D8' },
      ],
    },
    {
      name: 'Warm Neutrals',
      description: 'Comfortable, hospitality-friendly hues that soften large volumes and exposed ceilings.',
      finishes: 'Fine or medium spray texture',
      colours: [
        { name: 'Sandstone', hex: '#D8C5A7' },
        { name: 'Warm Clay', hex: '#C6A58A' },
        { name: 'Mushroom', hex: '#B7A69A' },
      ],
    },
    {
      name: 'Architectural Darks',
      description: 'Deep, saturated tones that help zone spaces or highlight key areas like collaboration hubs and theatres.',
      finishes: 'Medium spray texture for visual depth',
      colours: [
        { name: 'Graphite', hex: '#414549' },
        { name: 'Deep Teal', hex: '#265764' },
        { name: 'Brick Red', hex: '#8C3A2D' },
      ],
    },
  ];

  applicationAreas = [
    'Offices and meeting rooms',
    'Auditoria and lecture halls',
    'Studios and rehearsal spaces',
    'Retail and F&B environments',
    'Industrial plants and warehouses',
  ];
}
