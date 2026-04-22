import { Routes } from '@angular/router';
import { Layout } from './layout/layout';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/home/home').then(m => m.Home),
        data: {
          title: 'Home',
          seo: {
            title: 'Acoustic Spray System in India | Accoustic360 Sound Damping',
            description: 'Accoustic360 offers India-focused acoustic spray, sound damping and thermal insulation systems for calm interiors, clean ceilings and premium architectural finishes.',
            keywords: 'acoustic spray India, sound damping, acoustic insulation, acoustic ceiling spray, NRC up to 1.0, cellulose acoustic spray, thermal insulation',
            path: '/',
            image: 'assets/acoustic-hero-generated.jpg',
          },
        }
      },
    //   {
    //     path: 'about',
    //     loadComponent: () =>
    //       import('./features/about/about').then(m => m.About),
    //     data: { title: 'About' }
    //   },
      {
        path: 'projects',
        loadComponent: () =>
          import('./features/projects/projects').then(m => m.Projects),
        data: {
          title: 'Projects',
          seo: {
            title: 'Acoustic Spray Projects | Offices, Auditoriums, Studios & Industrial Spaces',
            description: 'Explore Accoustic360 acoustic spray installations designed for reverberation control in workplaces, auditoriums, factories, studios and exposed ceiling interiors.',
            keywords: 'acoustic spray projects, sound damping installations, acoustic ceiling projects, reverberation control, office acoustics, auditorium acoustics',
            path: '/projects',
            image: 'assets/projbak-1.jpeg',
          },
        }
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./features/products/products').then(m => m.Products),
        data: {
          title: 'Products',
          seo: {
            title: 'Acoustic Spray Products | Seamless Sound Absorbing Ceiling Systems',
            description: 'Compare Accoustic360 spray-applied acoustic product systems with cellulose matrix, low VOC formulation, architectural colour options and NRC performance up to 1.0.',
            keywords: 'acoustic spray products, cellulose acoustic coating, seamless acoustic ceiling, sound absorbing spray, low VOC acoustic insulation, NRC 1.0',
            path: '/products',
            image: 'assets/product-spray-hero.png',
          },
        }
      },
      {
        path: 'technology',
        loadComponent: () =>
          import('./features/technology/technology').then(m => m.Technology),
        data: {
          title: 'Technology',
          seo: {
            title: 'Acoustic Spray Technology | NRC, Cellulose Matrix & Sound Absorption',
            description: 'Learn how Accoustic360 uses cellulose fibre science, spray thickness control and substrate preparation to deliver high-performance sound absorption.',
            keywords: 'acoustic spray technology, NRC testing, cellulose acoustic matrix, sound absorption technology, reverberation control, acoustic coating science',
            path: '/technology',
            image: 'assets/acoustic-texture-generated.jpg',
          },
        }
      },
      {
        path: 'applications',
        loadComponent: () =>
          import('./features/applications/applications').then(m => m.Applications),
        data: {
          title: 'Applications',
          seo: {
            title: 'Acoustic Spray Applications | Offices, Studios, Factories & Auditoriums',
            description: 'Find acoustic spray applications for offices, studios, auditoriums, schools, hospitality spaces, factories and retrofit interiors with exposed ceilings.',
            keywords: 'acoustic spray applications, office sound damping, studio acoustics, factory noise control, auditorium acoustic treatment, exposed ceiling acoustics',
            path: '/applications',
            image: 'assets/acoustic-hero-generated.jpg',
          },
        }
      }
    ]
  }
];
