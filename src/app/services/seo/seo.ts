import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';

interface RouteSeoData {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  path?: string;
  type?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private readonly appName = 'Accoustic360';
  private readonly siteUrl = 'https://www.accoustic360.com';
  private readonly defaultImage = 'assets/acoustic-hero-generated.jpg';
  private readonly defaultDescription =
    'Accoustic360 delivers premium acoustic spray and sound damping systems for offices, auditoriums, studios, factories and modern architectural interiors.';
  private readonly defaultKeywords =
    'acoustic spray, sound damping, acoustic insulation, sound absorption, NRC, acoustic ceiling, cellulose acoustic spray, Accoustic360 India';
  private readonly structuredDataScriptId = 'accoustic360-route-schema';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private title: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.listenToRouteChanges();
  }

  private listenToRouteChanges(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const route = this.getDeepestChild(this.activatedRoute);
        const seo = (route.snapshot.data['seo'] ?? {}) as RouteSeoData;
        const routeTitle = route.snapshot.data['title'] as string | undefined;
        this.applySeo(seo, routeTitle);
      });
  }

  private applySeo(seo: RouteSeoData, routeTitle?: string): void {
    const pageTitle = seo.title || (routeTitle ? `${routeTitle} | ${this.appName}` : this.appName);
    const description = seo.description || this.defaultDescription;
    const keywords = seo.keywords || this.defaultKeywords;
    const url = this.absoluteUrl(seo.path || this.router.url.split('?')[0]);
    const image = this.absoluteUrl(seo.image || this.defaultImage);
    const type = seo.type || 'website';

    this.title.setTitle(pageTitle);

    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'keywords', content: keywords });
    this.meta.updateTag({ name: 'author', content: this.appName });
    this.meta.updateTag({ name: 'robots', content: 'index, follow, max-image-preview:large' });
    this.meta.updateTag({ name: 'theme-color', content: '#174d43' });

    this.meta.updateTag({ property: 'og:site_name', content: this.appName });
    this.meta.updateTag({ property: 'og:type', content: type });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:image:alt', content: `${this.appName} acoustic spray and sound damping solutions` });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    this.setCanonical(url);
    this.setStructuredData(pageTitle, description, url, image);
  }

  private getDeepestChild(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }

  private absoluteUrl(path: string): string {
    if (/^https?:\/\//i.test(path)) return path;

    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${this.siteUrl}${normalizedPath}`;
  }

  private setCanonical(url: string): void {
    let canonical = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');

    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      this.document.head.appendChild(canonical);
    }

    canonical.setAttribute('href', url);
  }

  private setStructuredData(title: string, description: string, url: string, image: string): void {
    this.document.getElementById(this.structuredDataScriptId)?.remove();

    const script = this.document.createElement('script');
    script.id = this.structuredDataScriptId;
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': `${this.siteUrl}/#organization`,
          name: this.appName,
          url: this.siteUrl,
          logo: `${this.siteUrl}/assets/logo.png`,
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+91-98765-43210',
            contactType: 'sales',
            areaServed: 'IN',
            availableLanguage: ['en', 'hi'],
          },
        },
        {
          '@type': 'WebSite',
          '@id': `${this.siteUrl}/#website`,
          name: this.appName,
          url: this.siteUrl,
          publisher: { '@id': `${this.siteUrl}/#organization` },
        },
        {
          '@type': 'Service',
          '@id': `${url}#service`,
          name: title,
          description,
          url,
          image,
          serviceType: 'Acoustic spray and sound damping solutions',
          provider: { '@id': `${this.siteUrl}/#organization` },
          areaServed: {
            '@type': 'Country',
            name: 'India',
          },
          offers: {
            '@type': 'Offer',
            availability: 'https://schema.org/InStock',
            priceCurrency: 'INR',
            url,
          },
        },
      ],
    });

    this.document.head.appendChild(script);
  }
}
