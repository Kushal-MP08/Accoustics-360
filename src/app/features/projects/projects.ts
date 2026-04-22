import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RevealOnScrollDirective } from '../../shared/reveal-on-scroll.directive';

interface Project {
  id: number;
  title: string;
  category: 'Industrial' | 'Commercial' | 'Institutional' | 'Retrofit';
  location: string;
  year: number;
  status: 'Completed' | 'Ongoing';
  image: string;
  summary: string;
  tags: string[];
}

interface ProjectMetric {
  value: string;
  label: string;
  detail: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterModule, RevealOnScrollDirective],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  categories: Array<'All' | Project['category']> = [
    'All',
    'Industrial',
    'Commercial',
    'Institutional',
    'Retrofit',
  ];

  activeCategory: 'All' | Project['category'] = 'All';

  projectMetrics: ProjectMetric[] = [
    { value: '70+', label: 'Installed spaces', detail: 'Commercial, industrial and institutional volumes.' },
    { value: '1.0', label: 'NRC targets', detail: 'High absorption build-ups for reverberation control.' },
    { value: '5', label: 'System families', detail: 'Spray finishes tuned by substrate and design intent.' },
  ];

  projects: Project[] = [
    {
      id: 1,
      title: 'Noise-controlled manufacturing hall',
      category: 'Industrial',
      location: 'Bengaluru, Karnataka',
      year: 2023,
      status: 'Completed',
      image: 'assets/acoustic-hero-generated.jpg',
      summary: 'High NRC cellulose acoustic spray installed over exposed deck to reduce reverberation and improve speech clarity.',
      tags: ['NRC 0.90', 'Exposed deck', 'Retrofit'],
    },
    {
      id: 2,
      title: 'Open office acoustic upgrade',
      category: 'Commercial',
      location: 'Hyderabad, Telangana',
      year: 2022,
      status: 'Completed',
      image: 'assets/acoustic-texture-generated.jpg',
      summary: 'Seamless acoustic spray across open ceiling grid to control noise between collaboration zones and focus areas.',
      tags: ['Open ceiling', 'Office', 'Warm neutrals'],
    },
    {
      id: 3,
      title: 'University lecture theatre',
      category: 'Institutional',
      location: 'Chennai, Tamil Nadu',
      year: 2021,
      status: 'Completed',
      image: 'assets/bak1.png',
      summary: 'Curved lecture hall treated with spray-applied cellulose to deliver even coverage and strong speech intelligibility.',
      tags: ['Lecture hall', 'Curved geometry', 'NRC 1.0'],
    },
    {
      id: 4,
      title: 'Studio and rehearsal space',
      category: 'Commercial',
      location: 'Mumbai, Maharashtra',
      year: 2024,
      status: 'Ongoing',
      image: 'assets/bak3.png',
      summary: 'Dark-toned acoustic spray on ceilings and upper walls to create a controlled acoustic environment for recording and practice.',
      tags: ['Studios', 'Dark palette', 'Low reverberation'],
    },
    {
      id: 5,
      title: 'Warehouse retrofit to office',
      category: 'Retrofit',
      location: 'Pune, Maharashtra',
      year: 2023,
      status: 'Completed',
      image: 'assets/projbak-1.jpeg',
      summary: 'Existing warehouse converted into a modern workspace with acoustic spray used to keep structure visible yet quiet.',
      tags: ['Adaptive reuse', 'Retrofit', 'Exposed trusses'],
    },
    {
      id: 6,
      title: 'Multi-purpose auditorium',
      category: 'Institutional',
      location: 'Coimbatore, Tamil Nadu',
      year: 2022,
      status: 'Completed',
      image: 'assets/acoustic-hero-generated.jpg',
      summary: 'Spray-applied system tuned for speech, music and public events, integrated with lighting and HVAC layouts.',
      tags: ['Auditorium', 'Performance', 'Custom colour'],
    },
  ];

  get featuredProject(): Project {
    return this.projects[0];
  }

  get filteredProjects(): Project[] {
    return this.activeCategory === 'All'
      ? this.projects
      : this.projects.filter(project => project.category === this.activeCategory);
  }

  setCategory(category: 'All' | Project['category']): void {
    this.activeCategory = category;
  }

  statusClass(status: Project['status']): string {
    return status === 'Completed' ? 'status--completed' : 'status--ongoing';
  }
}
