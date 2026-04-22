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
        data: { title: 'Home' }
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
        data: { title: 'Projects' }
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./features/products/products').then(m => m.Products),
        data: { title: 'Products' }
      },
      {
        path: 'technology',
        loadComponent: () =>
          import('./features/technology/technology').then(m => m.Technology),
        data: { title: 'Technology' }
      },
      {
        path: 'applications',
        loadComponent: () =>
          import('./features/applications/applications').then(m => m.Applications),
        data: { title: 'Applications' }
      }
    ]
  }
];
