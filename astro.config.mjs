// @ts-check
// Dev server trigger reload
import { defineConfig, envField } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { EnumChangefreq } from 'sitemap';
import tailwindcss from '@tailwindcss/vite';

import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://tentaklik.com',
  output: 'static',
  trailingSlash: 'never',

  // Permalink LP diubah ke /layanan/*. Redirect 301 dari URL lama (SEO + iklan existing).
  redirects: {
    '/whitelist/metaads': '/layanan/akun-meta-ads-whitelist',
    '/en/whitelist/metaads': '/en/layanan/akun-meta-ads-whitelist',
    '/meta-whitelist': '/layanan/akun-meta-ads-whitelist',
    '/en/meta-whitelist': '/en/layanan/akun-meta-ads-whitelist',
    '/layanan/sewa-akun': '/layanan/sewa-akun-whitelist',
    '/en/layanan/sewa-akun': '/en/layanan/sewa-akun-whitelist',
    '/google-whitelist': '/layanan/akun-google-ads-whitelist',
    '/en/google-whitelist': '/en/layanan/akun-google-ads-whitelist',
    '/whitelist/gads': '/layanan/akun-google-ads-whitelist',
    '/en/whitelist/gads': '/en/layanan/akun-google-ads-whitelist',
    '/whitelist/tiktokads': '/layanan/akun-tiktok-ads-whitelist',
    '/en/whitelist/tiktokads': '/en/layanan/akun-tiktok-ads-whitelist',
    '/layanan/website': '/layanan/jasa-pembuatan-website-after-sales-terbaik',
    '/en/layanan/website': '/en/layanan/jasa-pembuatan-website-after-sales-terbaik',
    '/layanan/website-v2': '/layanan/jasa-pembuatan-website-after-sales-terbaik',
    '/en/layanan/website-v2': '/en/layanan/jasa-pembuatan-website-after-sales-terbaik',
    '/layanan/konsultasi': '/layanan/konsultasi-digital-marketing',
    '/en/layanan/konsultasi': '/en/layanan/konsultasi-digital-marketing',
  },

  // i18n: ID default di root (/), EN di /en/. Halaman EN yang belum ada
  // jatuh ke konten ID via fallback rewrite (URL tetap /en/...).
  i18n: {
    defaultLocale: 'id',
    locales: ['id', 'en'],
    routing: { prefixDefaultLocale: false, redirectToDefaultLocale: false, fallbackType: 'rewrite' },
    fallback: { en: 'id' },
  },

  build: {
    inlineStylesheets: 'always',
  },

  compressHTML: true,

  // prefetch dinonaktifkan: tidak ada data-astro-prefetch di codebase,
  // modul page.*.js (±2.3 KB) ikut termuat di semua halaman tanpa guna.

  // prefetch: {
  //   prefetchAll: false,
  //   defaultStrategy: 'hover',
  // },
  
  integrations: [
    sitemap({
      changefreq: EnumChangefreq.WEEKLY,
      priority: 0.7,
      lastmod: new Date(),
      i18n: {
        defaultLocale: 'id',
        locales: { id: 'id-ID', en: 'en-US' },
      },
      filter: (page) => !page.includes('/404'),
      serialize(item) {
        const url = item.url;
        if (url === 'https://tentaklik.com/' || url === 'https://tentaklik.com') {
          item.priority = 1.0;
          item.changefreq = EnumChangefreq.DAILY;
        } else if (url.includes('/layanan/')) {
          item.priority = 0.9;
          item.changefreq = EnumChangefreq.WEEKLY;
        } else if (url.includes('/partner')) {
          item.priority = 0.8;
          item.changefreq = EnumChangefreq.MONTHLY;
        } else if (url.endsWith('/kontak') || url.endsWith('/kontak/')) {
          item.priority = 0.8;
          item.changefreq = EnumChangefreq.MONTHLY;
        } else if (url.endsWith('/tentang') || url.endsWith('/tentang/')) {
          item.priority = 0.7;
          item.changefreq = EnumChangefreq.MONTHLY;
        } else if (url.endsWith('/karir') || url.endsWith('/karir/')) {
          item.priority = 0.6;
          item.changefreq = EnumChangefreq.WEEKLY;
        }
        return item;
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  env: {
    schema: {
      PUBLIC_SITE_URL:  envField.string({ context: 'client', access: 'public', default: 'https://tentaklik.com' }),
      PUBLIC_WA_NUMBER: envField.string({ context: 'client', access: 'public', default: '6282219987770' }),
      PUBLIC_GA_ID:     envField.string({ context: 'client', access: 'public', default: 'G-7TZENR9L4G', optional: true }),
    },
  },

  adapter: cloudflare({
    imageService: 'compile',
  }),
});