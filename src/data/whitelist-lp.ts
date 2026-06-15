// src/data/whitelist-lp.ts
// Konten 2 landing page standalone: /meta-whitelist & /google-whitelist (+ /en/*).
// Tanpa harga, tanpa WA — CTA mengarah ke /layanan/sewa-akun.
// Bilingual: akses via META_LP[lang] / GOOGLE_LP[lang] / INDUSTRIES_LP[lang].
import type { Industry } from '@data/sewa-akun';
import type { Lang } from '@i18n/utils';

export interface LpProblem { icon: string; title: string; desc: string }
export interface LpPhoto { src: string; alt: string }

export interface LpData {
  platform: 'meta' | 'google';
  hero: { eyebrow: string; title: string; titleAccent: string; desc: string };
  problemHeading: string;
  problemSub: string;
  problems: LpProblem[];
  benefitHeading: string;
  benefits: string[];
  photoHeading: string;
  photoSub: string;
  photos: LpPhoto[];
  cta: { title: string; desc: string; btn: string };
  seo: { title: string; description: string };
  keywords: string[];
}

// Kategori industri khusus 2 LP whitelist (beda dari sewa-akun). Bilingual.
export const INDUSTRIES_LP: Record<Lang, Industry[]> = {
  id: [
    { label: 'NGO / Yayasan',        icon: '🤝', tint: '#E6F4F7' },
    { label: 'UMKM',                 icon: '🏪', tint: '#FFF1E6' },
    { label: 'Kesehatan',            icon: '🩺', tint: '#E7F6EC' },
    { label: 'Fashion',              icon: '👗', tint: '#FCE7F3' },
    { label: 'Produk Kecantikan',    icon: '💄', tint: '#F3E8FF' },
    { label: 'Konsultan Pendidikan', icon: '🎓', tint: '#E8F0FE' },
  ],
  en: [
    { label: 'NGO / Foundation',     icon: '🤝', tint: '#E6F4F7' },
    { label: 'SMEs',                 icon: '🏪', tint: '#FFF1E6' },
    { label: 'Healthcare',           icon: '🩺', tint: '#E7F6EC' },
    { label: 'Fashion',              icon: '👗', tint: '#FCE7F3' },
    { label: 'Beauty Products',      icon: '💄', tint: '#F3E8FF' },
    { label: 'Education Consultant', icon: '🎓', tint: '#E8F0FE' },
  ],
};

export const INDUSTRY_LP_HEADING: Record<Lang, { title: string; sub: string }> = {
  id: {
    title: 'Cocok untuk berbagai industri',
    sub: 'Umumnya digunakan oleh advertiser di industri:',
  },
  en: {
    title: 'Fit for various industries',
    sub: 'Commonly used by advertisers in industries:',
  },
};

const CTA_HREF = '/layanan/sewa-akun';

export const META_LP: Record<Lang, LpData> = {
  id: {
    platform: 'meta',
    hero: {
      eyebrow: 'Meta Ads Whitelist',
      title: 'Akun Meta Ads Whitelist',
      titleAccent: 'Siap Scale Tanpa Drama Banned',
      desc: 'Akses jalur akun agensi tingkat tinggi yang dipercaya oleh sistem Meta. Bebas blokir massal, tanpa batasan spending, serta didukung prioritas eskalasi tercepat.',
    },
    problemHeading: 'Saat scale, masalah Meta Ads makin kompleks',
    problemSub: 'Hal-hal yang bikin advertiser kehilangan momentum:',
    problems: [
      { icon: '🚫', title: 'Akun kena restrict', desc: 'Akun personal/BM biasa rawan random restrict saat spending naik.' },
      { icon: '⏳', title: 'Review lambat', desc: 'Iklan stuck "in review" berjam-jam — momentum campaign hilang.' },
      { icon: '📉', title: 'Limit spending', desc: 'Limit harian bikin scale tersendat di momen paling penting.' },
      { icon: '🤷', title: 'Eskalasi tak jelas', desc: 'Saat akun bermasalah, advertiser jalan sendirian tanpa jalur appeal.' },
    ],
    benefitHeading: 'Yang kamu dapat dengan akun Meta Whitelist',
    benefits: [
      'Akun stabil, **minim risiko** random restrict',
      'Tidak ada **limit spending** harian — bebas scale',
      '**Tidak dikenakan PPN**',
      'Support appeal melalui **jalur langsung** ke tim Meta',
      'Saldo otomatis pindah ke **akun pengganti** jika terjadi disable (syarat & ketentuan berlaku)',
      'Support teknis langsung ke **tim expert Meta**',
    ],
    photoHeading: 'Terhubung langsung dengan Meta',
    photoSub: 'Tim Tentaklik aktif di event & program resmi Meta.',
    photos: [
      { src: '/assets/galeri/9.jpeg',  alt: 'Tim Tentaklik di event Meta' },
      { src: '/assets/galeri/10.jpeg', alt: 'Kunjungan ke kantor Meta / Facebook' },
    ],
    cta: {
      title: 'Siap pakai akun Meta Whitelist?',
      desc: 'Lihat detail layanan, alur pendaftaran, dan struktur harga di halaman Sewa Akun.',
      btn: 'Ajukan Sekarang',
    },
    seo: {
      title: 'Sewa Akun Meta Ads Whitelist (Facebook & Instagram) — Tentaklik',
      description: 'Sewa akun Meta Ads whitelist (Facebook & Instagram) di Tentaklik: akun stabil terverifikasi Business Manager resmi, tanpa limit spending, anti random restrict, dan support appeal jalur partner Meta.',
    },
    keywords: ['sewa akun meta ads', 'akun whitelist meta', 'sewa akun facebook ads', 'sewa akun instagram ads', 'akun facebook ads whitelist'],
  },
  en: {
    platform: 'meta',
    hero: {
      eyebrow: 'Meta Ads Whitelist',
      title: 'Meta Ads Whitelist Account',
      titleAccent: 'Ready to Scale Without Banned Drama',
      desc: 'Access top-tier agency account lines trusted by Meta\'s system. Free from mass blocks, no spending limits, and backed by the fastest escalation priority.',
    },
    problemHeading: 'As you scale, Meta Ads problems get more complex',
    problemSub: 'Things that make advertisers lose momentum:',
    problems: [
      { icon: '🚫', title: 'Account restricted', desc: 'Personal/regular BM accounts are prone to random restricts as spending grows.' },
      { icon: '⏳', title: 'Slow review', desc: 'Ads stuck "in review" for hours — campaign momentum lost.' },
      { icon: '📉', title: 'Spending limit', desc: 'Daily limits stall scaling at the most critical moment.' },
      { icon: '🤷', title: 'Unclear escalation', desc: 'When an account has issues, advertisers are on their own with no appeal path.' },
    ],
    benefitHeading: 'What you get with a Meta Whitelist account',
    benefits: [
      'Stable account, **minimal risk** of random restricts',
      'No daily **spending limit** — scale freely',
      '**No VAT** charged',
      'Appeal support through a **direct line** to the Meta team',
      'Balance auto-moves to a **replacement account** if disabled (terms & conditions apply)',
      'Direct technical support from the **Meta expert team**',
    ],
    photoHeading: 'Directly connected with Meta',
    photoSub: 'The Tentaklik team is active in Meta\'s official events & programs.',
    photos: [
      { src: '/assets/galeri/9.jpeg',  alt: 'Tentaklik team at a Meta event' },
      { src: '/assets/galeri/10.jpeg', alt: 'Visit to the Meta / Facebook office' },
    ],
    cta: {
      title: 'Ready to use a Meta Whitelist account?',
      desc: 'See service details, the registration flow, and pricing on the Account Rental page.',
      btn: 'Apply Now',
    },
    seo: {
      title: 'Meta Ads Whitelist Account Rental (Facebook & Instagram) — Tentaklik',
      description: 'Rent a Meta Ads whitelist account (Facebook & Instagram) at Tentaklik: stable account verified under an official Business Manager, no spending limit, anti random restrict, and appeal support via the Meta partner line.',
    },
    keywords: ['meta ads account rental', 'meta whitelist account', 'facebook ads account rental', 'instagram ads account rental', 'facebook ads whitelist account'],
  },
};

export const GOOGLE_LP: Record<Lang, LpData> = {
  id: {
    platform: 'google',
    hero: {
      eyebrow: 'Google Ads Whitelist',
      title: 'Akun Google Ads Whitelist:',
      titleAccent: 'Stabil untuk Scale-Up Besar',
      desc: 'Maksimalkan kampanye Anda dengan jaminan akun bebas hambatan dan eskalasi kendala yang lebih cepat.',
    },
    problemHeading: 'Saat scale, masalah Google Ads makin kompleks',
    problemSub: 'Hal-hal yang bikin advertiser kehilangan momentum:',
    problems: [
      { icon: '🚫', title: 'Akun kena suspend', desc: 'Akun Google Ads personal rawan suspend saat budget naik cepat.' },
      { icon: '⏳', title: 'Appeal berbelit', desc: 'Proses banding lama tanpa jalur langsung ke Google.' },
      { icon: '📉', title: 'Batas spending', desc: 'Limit harian menghambat scale di kampanye yang sedang menang.' },
      { icon: '🤷', title: 'Support minim', desc: 'Tidak ada pendampingan teknis yang paham kebijakan Google Ads.' },
    ],
    benefitHeading: 'Yang kamu dapat dengan akun Google Whitelist',
    benefits: [
      '**Risiko suspend** lebih rendah dibanding akun Google Ads personal biasa',
      'Tidak ada **batas maksimal spending** harian — cocok untuk skala besar',
      '**Tidak dikenakan PPN**',
      'Proses appeal lebih cepat karena **terhubung langsung** ke Google Partner',
      'Saldo otomatis pindah ke **akun pengganti** jika terjadi disable (syarat & ketentuan berlaku)',
      'Support teknis langsung ke **tim expert Google**',
    ],
    photoHeading: 'Terhubung langsung dengan Google',
    photoSub: 'Tim Tentaklik aktif di event & program resmi Google Partner.',
    photos: [
      { src: '/assets/galeri/1.jpg', alt: 'Tim Tentaklik di kantor Google' },
      { src: '/assets/galeri/5.jpg', alt: 'Event Akselerasi Bisnis dengan Google Ads' },
      { src: '/assets/galeri/8.jpg', alt: 'Kunjungan tim ke Google' },
    ],
    cta: {
      title: 'Siap pakai akun Google Whitelist?',
      desc: 'Lihat detail layanan, alur pendaftaran, dan struktur harga di halaman Sewa Akun.',
      btn: 'Ajukan Sekarang',
    },
    seo: {
      title: 'Sewa Akun Google Ads Whitelist — Tentaklik',
      description: 'Sewa akun Google Ads whitelist di Tentaklik: dikelola Google Partner resmi, risiko suspend lebih rendah, tanpa batas spending harian, dan proses appeal lebih cepat untuk skala besar.',
    },
    keywords: ['sewa akun google ads', 'akun whitelist google', 'sewa akun google ads whitelist', 'akun google ads mcc', 'sewa akun iklan google'],
  },
  en: {
    platform: 'google',
    hero: {
      eyebrow: 'Google Ads Whitelist',
      title: 'Google Ads Whitelist Account:',
      titleAccent: 'Stable for Large-Scale Growth',
      desc: 'Maximize your campaigns with a guaranteed obstacle-free account and faster issue escalation.',
    },
    problemHeading: 'As you scale, Google Ads problems get more complex',
    problemSub: 'Things that make advertisers lose momentum:',
    problems: [
      { icon: '🚫', title: 'Account suspended', desc: 'Personal Google Ads accounts are prone to suspension when budgets rise quickly.' },
      { icon: '⏳', title: 'Convoluted appeals', desc: 'A long appeal process with no direct line to Google.' },
      { icon: '📉', title: 'Spending cap', desc: 'Daily limits hold back scaling on campaigns that are winning.' },
      { icon: '🤷', title: 'Minimal support', desc: 'No technical guidance from people who understand Google Ads policy.' },
    ],
    benefitHeading: 'What you get with a Google Whitelist account',
    benefits: [
      '**Lower suspend risk** than a regular personal Google Ads account',
      'No maximum daily **spending cap** — fit for large scale',
      '**No VAT** charged',
      'Faster appeals thanks to a **direct connection** with Google Partner',
      'Balance auto-moves to a **replacement account** if disabled (terms & conditions apply)',
      'Direct technical support from the **Google expert team**',
    ],
    photoHeading: 'Directly connected with Google',
    photoSub: 'The Tentaklik team is active in Google Partner\'s official events & programs.',
    photos: [
      { src: '/assets/galeri/1.jpg', alt: 'Tentaklik team at the Google office' },
      { src: '/assets/galeri/5.jpg', alt: 'Business Acceleration with Google Ads event' },
      { src: '/assets/galeri/8.jpg', alt: 'Team visit to Google' },
    ],
    cta: {
      title: 'Ready to use a Google Whitelist account?',
      desc: 'See service details, the registration flow, and pricing on the Account Rental page.',
      btn: 'Apply Now',
    },
    seo: {
      title: 'Google Ads Whitelist Account Rental — Tentaklik',
      description: 'Rent a Google Ads whitelist account at Tentaklik: managed by an official Google Partner, lower suspend risk, no daily spending cap, and faster appeals for large scale.',
    },
    keywords: ['google ads account rental', 'google whitelist account', 'google ads whitelist account rental', 'google ads mcc account', 'google ads account rental service'],
  },
};

export { CTA_HREF };
