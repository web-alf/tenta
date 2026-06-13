import { site } from '@data/site';

const ORG_ID = `${site.url}/#organization`;
const LOCALBUSINESS_ID = `${site.url}/#localbusiness`;
const WEBSITE_ID = `${site.url}/#website`;
const LOGO_ID = `${site.url}/#logo`;

function abs(path: string) {
  if (path.startsWith('http')) return path;
  return `${site.url}${path.startsWith('/') ? '' : '/'}${path}`;
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: site.name,
    legalName: site.legalName,
    alternateName: 'Tentaklik Digital',
    url: site.url,
    logo: {
      '@type': 'ImageObject',
      '@id': LOGO_ID,
      url: abs(site.logoUrl),
      width: 512,
      height: 512,
      caption: site.name,
    },
    image: abs(site.defaultOgImage),
    description: site.description,
    foundingDate: site.foundingDate,
    email: site.email,
    telephone: site.phoneIntl,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.geo.streetAddress,
      addressLocality: site.geo.addressLocality,
      addressRegion: site.geo.addressRegion,
      postalCode: site.geo.postalCode,
      addressCountry: site.geo.addressCountry,
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: site.phoneIntl,
        email: site.email,
        contactType: 'customer service',
        areaServed: 'ID',
        availableLanguage: ['id', 'en'],
      },
      {
        '@type': 'ContactPoint',
        email: site.emailKarir,
        contactType: 'HR',
        areaServed: 'ID',
        availableLanguage: ['id'],
      },
    ],
    sameAs: [
      site.social.instagram,
      site.social.tiktok,
      site.social.facebook,
      site.social.linkedin,
      site.social.twitter,
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: site.rating.value,
      reviewCount: site.rating.count,
      bestRating: site.rating.bestRating,
      worstRating: site.rating.worstRating,
    },
    knowsAbout: [
      'Digital Marketing',
      'Search Engine Optimization',
      'Google Ads',
      'Meta Ads',
      'Facebook Ads',
      'Instagram Ads',
      'Website Development',
      'Conversion Rate Optimization',
      'Performance Marketing',
    ],
    areaServed: site.areaServed.map(name => ({
      '@type': 'City',
      name,
    })),
  };
}

export function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService', 'MarketingService'],
    '@id': LOCALBUSINESS_ID,
    name: site.name,
    image: abs(site.defaultOgImage),
    logo: abs(site.logoUrl),
    url: site.url,
    telephone: site.phoneIntl,
    email: site.email,
    description: site.description,
    priceRange: 'Rp 2.000.000 - Rp 50.000.000+',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.geo.streetAddress,
      addressLocality: site.geo.addressLocality,
      addressRegion: site.geo.addressRegion,
      postalCode: site.geo.postalCode,
      addressCountry: site.geo.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '08:00',
        closes: '16:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Friday',
        opens: '08:00',
        closes: '17:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '08:00',
        closes: '15:00',
      },
    ],
    sameAs: [
      site.social.instagram,
      site.social.tiktok,
      site.social.facebook,
      site.social.linkedin,
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: site.rating.value,
      reviewCount: site.rating.count,
      bestRating: site.rating.bestRating,
      worstRating: site.rating.worstRating,
    },
    areaServed: site.areaServed.map(name => ({
      '@type': 'City',
      name,
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Layanan Digital Marketing Tentaklik',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Jasa Pembuatan Website', url: `${site.url}/layanan/website` },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Jasa Google Ads', url: `${site.url}/layanan/google-ads` },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Jasa Meta Ads (Facebook & Instagram)', url: `${site.url}/layanan/meta-ads` },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Konsultasi Digital Marketing', url: `${site.url}/layanan/konsultasi` },
        },
      ],
    },
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: 'id-ID',
    publisher: { '@id': ORG_ID },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${site.url}/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function serviceJsonLd(opts: {
  name: string;
  description: string;
  url: string;
  serviceType?: string;
  plans?: { name: string; price: string }[];
}) {
  const offers = opts.plans?.length
    ? opts.plans.map(p => ({
        '@type': 'Offer',
        name: p.name,
        priceCurrency: 'IDR',
        price: parsePriceToIdr(p.price),
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'IDR',
          price: parsePriceToIdr(p.price),
          valueAddedTaxIncluded: false,
        },
        availability: 'https://schema.org/InStock',
        url: opts.url,
      }))
    : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    serviceType: opts.serviceType ?? opts.name,
    provider: { '@id': ORG_ID },
    areaServed: site.areaServed.map(name => ({ '@type': 'City', name })),
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'UMKM, Startup, Brand di Indonesia',
    },
    ...(offers ? { offers } : {}),
  };
}

function parsePriceToIdr(price: string): string {
  const match = price.match(/(\d+(?:[.,]\d+)?)\s*(jt|juta|rb|ribu)?/i);
  if (!match) return '0';
  const num = parseFloat(match[1].replace(',', '.'));
  const unit = (match[2] ?? '').toLowerCase();
  if (unit.startsWith('jt') || unit.startsWith('juta')) return String(Math.round(num * 1_000_000));
  if (unit.startsWith('rb') || unit.startsWith('ribu')) return String(Math.round(num * 1_000));
  return String(Math.round(num));
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(i => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function articleJsonLd(opts: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string | Date;
  dateModified?: string | Date;
  author?: string;
  section?: string;
  keywords?: string[];
}) {
  const datePublished = opts.datePublished instanceof Date
    ? opts.datePublished.toISOString()
    : opts.datePublished;
  const dateModified = opts.dateModified
    ? (opts.dateModified instanceof Date ? opts.dateModified.toISOString() : opts.dateModified)
    : datePublished;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: { '@type': 'WebPage', '@id': opts.url },
    headline: opts.title,
    description: opts.description,
    image: opts.image ? abs(opts.image) : abs(site.defaultOgImage),
    datePublished,
    dateModified,
    author: { '@type': 'Organization', '@id': ORG_ID, name: opts.author ?? site.name },
    publisher: { '@id': ORG_ID },
    articleSection: opts.section ?? 'Case Study',
    inLanguage: 'id-ID',
    ...(opts.keywords?.length ? { keywords: opts.keywords.join(', ') } : {}),
  };
}

export function jobPostingJsonLd(opts: {
  title: string;
  description: string;
  employmentType: string;
  location: string;
  datePosted: string;
  level?: string;
  skills?: string[];
  url: string;
}) {
  const isRemote = /remote/i.test(opts.location);
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: opts.title,
    description: opts.description,
    datePosted: opts.datePosted,
    employmentType: opts.employmentType.toUpperCase().replace(/-/g, '_').replace(/\s/g, '_'),
    hiringOrganization: { '@id': ORG_ID, '@type': 'Organization', name: site.name, sameAs: site.url, logo: abs(site.logoUrl) },
    jobLocationType: isRemote ? 'TELECOMMUTE' : undefined,
    applicantLocationRequirements: isRemote ? { '@type': 'Country', name: 'Indonesia' } : undefined,
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: opts.location.split('/')[0]?.trim() || 'Semarang',
        addressRegion: site.geo.addressRegion,
        addressCountry: 'ID',
      },
    },
    experienceRequirements: opts.level,
    skills: opts.skills?.join(', '),
    directApply: false,
    url: opts.url,
    validThrough: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90).toISOString(),
  };
}

export function contactPageJsonLd(opts: { url: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    url: opts.url,
    name: 'Kontak Tentaklik',
    description: 'Hubungi Tentaklik via WhatsApp, email, atau form kontak. Kami balas dalam 1×24 jam kerja.',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    inLanguage: 'id-ID',
  };
}

export function aboutPageJsonLd(opts: { url: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    url: opts.url,
    name: 'Tentang Tentaklik',
    description: 'Tentaklik adalah agensi digital marketing Semarang yang fokus pada hasil nyata — website, Google Ads, Meta Ads, dan konsultasi.',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    mainEntity: { '@id': ORG_ID },
    inLanguage: 'id-ID',
  };
}

export function itemListJsonLd(items: { name: string; url: string; description?: string }[], name = 'Layanan Tentaklik') {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: it.url,
      name: it.name,
      ...(it.description ? { description: it.description } : {}),
    })),
  };
}
