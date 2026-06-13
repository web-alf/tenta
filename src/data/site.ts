import { PUBLIC_SITE_URL, PUBLIC_WA_NUMBER } from 'astro:env/client';

export const site = {
  name: 'Tentaklik',
  legalName: 'Tentaklik Digital Agency',
  url: PUBLIC_SITE_URL,
  wa: PUBLIC_WA_NUMBER,
  email: 'tentaklik@mediapro.work',
  emailKarir: 'karir@tentaklik.com',
  phone: '085129992225',
  phoneIntl: '+6285129992225',
  address: 'Semarang, Indonesia',
  foundingDate: '2023-01-01',

  geo: {
    streetAddress: 'Semarang',
    addressLocality: 'Semarang',
    addressRegion: 'Jawa Tengah',
    postalCode: '50241',
    addressCountry: 'ID',
    latitude: -6.9666,
    longitude: 110.4167,
  },

  areaServed: [
    'Semarang', 'Jakarta', 'Surabaya', 'Bandung', 'Yogyakarta', 'Bali',
    'Medan', 'Makassar', 'Solo', 'Indonesia',
  ],

  openingHours: [
    'Mo-Th 08:00-16:00',
    'Fr 08:00-17:00',
    'Sa 08:00-15:00',
  ],

  social: {
    instagram: 'https://www.instagram.com/tentaklikaja?igsh=eW1oa25pdHdtZ3Q0',
    tiktok: 'https://www.tiktok.com/@digimarcore?_r=1&_t=ZS-95xdD3xnLTo',
    facebook: 'https://facebook.com/tentaklik',
    linkedin: 'https://linkedin.com/company/tentaklik',
    twitter: 'https://twitter.com/tentaklik',
  },
  twitterHandle: '@tentaklik',

  description: 'Agensi digital marketing Semarang untuk jasa pembuatan website, Google Ads, Meta Ads (Facebook & Instagram), dan konsultasi digital marketing untuk UMKM dan brand di Indonesia.',
  shortDescription: 'Agensi untuk website, Google Ads, Meta Ads, dan konsultasi digital marketing.',
  footerTagline: 'Agensi digital marketing Semarang untuk jasa pembuatan website, sewa akun whitelist Google Ads & Meta Ads, dan konsultasi digital marketing untuk UMKM dan brand di Indonesia',

  defaultOgImage: '/assets/kraken-hero.png',
  logoUrl: '/logo-full.png',

  keywords: [
    'jasa digital marketing semarang',
    'agensi digital marketing semarang',
    'jasa pembuatan website semarang',
    'jasa google ads semarang',
    'jasa meta ads',
    'jasa facebook ads',
    'jasa instagram ads',
    'konsultan digital marketing',
    'jasa seo semarang',
    'agensi iklan online indonesia',
    'tentaklik',
  ],

  rating: {
    value: 4.9,
    count: 1720,
    bestRating: 5,
    worstRating: 1,
  },

  verification: {
    google: 'fhvj-kqOLg580zSOwN8stYGLH2TQeOUwKwFHJCJ2wbM',
  },
} as const;

export function waLink(message = 'Halo Tentaklik') {
  return `https://wa.me/${PUBLIC_WA_NUMBER}?text=${encodeURIComponent(message)}`;
}
