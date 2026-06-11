// src/data/whitelist-lp.ts
// Konten 2 landing page standalone: /meta-whitelist & /google-whitelist.
// Tanpa harga, tanpa WA — CTA mengarah ke /services/sewa-akun.
import { META_WL, GOOGLE_WL } from '@data/sewa-akun';

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

const CTA_HREF = '/services/sewa-akun';

export const META_LP: LpData = {
  platform: 'meta',
  hero: {
    eyebrow: 'Meta Ads Whitelist',
    title: 'Akun Meta Ads Whitelist',
    titleAccent: 'Siap Scale Tanpa Drama Banned.',
    desc: 'Akun Facebook & Instagram Ads terverifikasi di bawah Business Manager resmi partner Meta. Stabil, tanpa limit spending, dan didampingi tim yang paham eskalasi ke Meta.',
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
  benefits: META_WL.benefits,
  photoHeading: 'Terhubung langsung dengan Meta',
  photoSub: 'Tim Tentaklik aktif di event & program resmi Meta.',
  photos: [
    { src: '/assets/galeri/9.jpeg',  alt: 'Tim Tentaklik di event Meta' },
    { src: '/assets/galeri/10.jpeg', alt: 'Kunjungan ke kantor Meta / Facebook' },
  ],
  cta: {
    title: 'Siap pakai akun Meta Whitelist?',
    desc: 'Lihat detail layanan, alur pendaftaran, dan struktur harga di halaman Sewa Akun.',
    btn: 'Lihat Detail & Harga',
  },
  seo: {
    title: 'Sewa Akun Meta Ads Whitelist (Facebook & Instagram) — Tentaklik',
    description: 'Sewa akun Meta Ads whitelist (Facebook & Instagram) di Tentaklik: akun stabil terverifikasi Business Manager resmi, tanpa limit spending, anti random restrict, dan support appeal jalur partner Meta.',
  },
  keywords: ['sewa akun meta ads', 'akun whitelist meta', 'sewa akun facebook ads', 'sewa akun instagram ads', 'akun facebook ads whitelist'],
};

export const GOOGLE_LP: LpData = {
  platform: 'google',
  hero: {
    eyebrow: 'Google Ads Whitelist',
    title: 'Akun Google Ads Whitelist',
    titleAccent: 'Stabil untuk Skala Besar.',
    desc: 'Akun Google Ads yang dikelola resmi Google Partner agensi Tentaklik. Risiko suspend lebih rendah, tanpa batas spending, dan appeal lebih cepat lewat jalur partner.',
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
  benefits: GOOGLE_WL.benefits,
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
    btn: 'Lihat Detail & Harga',
  },
  seo: {
    title: 'Sewa Akun Google Ads Whitelist — Tentaklik',
    description: 'Sewa akun Google Ads whitelist di Tentaklik: dikelola Google Partner resmi, risiko suspend lebih rendah, tanpa batas spending harian, dan proses appeal lebih cepat untuk skala besar.',
  },
  keywords: ['sewa akun google ads', 'akun whitelist google', 'sewa akun google ads whitelist', 'akun google ads mcc', 'sewa akun iklan google'],
};

export { CTA_HREF };
