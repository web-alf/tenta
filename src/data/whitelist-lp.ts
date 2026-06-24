// src/data/whitelist-lp.ts
// Konten 2 landing page standalone: /meta-whitelist & /google-whitelist (+ /en/*).
// Tanpa harga, tanpa WA — CTA mengarah ke /layanan/sewa-akun.
// Bilingual: akses via META_LP[lang] / GOOGLE_LP[lang] / INDUSTRIES_LP[lang].
import type { Industry } from '@data/sewa-akun';
import type { Lang } from '@i18n/utils';

export interface WhyItem { iconId: 'stable' | 'comfortable' | 'scale' | 'tax' | 'priority' | 'expert' | 'protection'; title: string; desc: string }
export interface LpProblem { icon: string; title: string; desc: string }
export interface LpPhoto { src: string; alt: string; portrait?: boolean }

export interface BaseLpData {
  platform: 'meta' | 'google';
  hero: { eyebrow: string; title: string; titleAccent: string; desc: string };
  photoHeading: string;
  photoSub: string;
  photos: LpPhoto[];
  cta: { title: string; desc: string; btn: string };
  seo: { title: string; description: string };
  keywords: string[];
}

export interface MetaLpData extends BaseLpData {
  platform: 'meta';
  problemHeading: string;
  problemSub: string;
  problems: LpProblem[];
  benefitHeading: string;
  benefits: string[];
  whyHeading: string;
  whySub: string;
  whyItems: WhyItem[];
}

export interface GoogleLpData extends BaseLpData {
  platform: 'google';
  problemHeading: string;
  problemSub: string;
  problems: LpProblem[];
  benefitHeading: string;
  benefits: string[];
  whyHeading: string;
  whySub: string;
  whyItems: WhyItem[];
}

export type LpData = MetaLpData | GoogleLpData;

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
    title: 'Cocok untuk <span style="color: var(--orange-500)">berbagai industri</span>',
    sub: 'Umumnya digunakan oleh advertiser di industri:',
  },
  en: {
    title: 'Fit for <span style="color: var(--orange-500)">various industries</span>',
    sub: 'Commonly used by advertisers in industries:',
  },
};

const CTA_HREF = '/layanan/sewa-akun';

export const META_LP: Record<Lang, MetaLpData> = {
  id: {
    platform: 'meta',
    hero: {
      eyebrow: 'Meta Ads Whitelist',
      title: 'Jangan Biarkan',
      titleAccent: 'Kendala Akun Menghambat Pertumbuhan Bisnis Anda',
      desc: 'Meta Whitelist membantu bisnis yang aktif beriklan menjalankan campaign dengan lebih nyaman dan fokus pada pertumbuhan',
    },
    whyHeading: 'Mengapa Memilih Meta Whitelist?',
    whySub: 'Solusi terbaik untuk scale-up iklan Anda dengan aman, nyaman, dan bebas hambatan.',
    whyItems: [
      { iconId: 'stable', title: 'Akun Stabil', desc: 'Akun stabil, Minim risiko pembatasan acak' },
      { iconId: 'comfortable', title: 'Lebih Nyaman', desc: 'Lebih nyaman untuk beriklan' },
      { iconId: 'scale', title: 'Bebas Scale', desc: 'Bebas scale limit spending harian' },
      { iconId: 'tax', title: 'Tanpa PPN', desc: 'Tidak dikenakan PPN' },
      { iconId: 'priority', title: 'Jalur Prioritas', desc: 'Support appeal langsung melalui jalur Meta' },
      { iconId: 'expert', title: 'Support Expert', desc: 'Support teknis langsung ke tim expert Meta' },
      { iconId: 'protection', title: 'Proteksi Saldo', desc: 'Saldo otomatis pindah ke akun pengganti jika terjadi disable (s&k berlaku)' },
    ],
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
    photoHeading: 'Terhubung langsung <span style="color: var(--orange-500)">dengan Meta</span>',
    photoSub: 'Tim Tentaklik aktif di event & program resmi Meta.',
    photos: [
      { src: '/assets/galeri-meta/meta1.avif', alt: 'Tim Tentaklik di event Meta' },
      { src: '/assets/galeri-meta/meta2.avif', alt: 'Kunjungan ke kantor Meta' },
      { src: '/assets/galeri-meta/meta6.avif', alt: 'Kunjungan tim ke Facebook Singapore' },
      { src: '/assets/galeri-meta/meta4.avif', alt: 'Event resmi Partner Meta' },
      { src: '/assets/galeri-meta/meta5.avif', alt: 'Tim Tentaklik', portrait: true },
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
      desc: 'Free from mass blocks, no spending limits, and backed by the fastest escalation priority.',
    },
    whyHeading: 'Why Choose Meta Whitelist?',
    whySub: 'The ultimate solution to scale your ads safely, comfortably, and without obstacles.',
    whyItems: [
      { iconId: 'stable', title: 'Stable Accounts', desc: 'Stable accounts, minimal risk of random restrictions' },
      { iconId: 'comfortable', title: 'More Comfortable', desc: 'More comfortable for advertising' },
      { iconId: 'scale', title: 'Scale Freely', desc: 'Scale freely with no daily spending limits' },
      { iconId: 'tax', title: 'No VAT', desc: 'No VAT charged' },
      { iconId: 'priority', title: 'Priority Route', desc: 'Direct appeal support through Meta channels' },
      { iconId: 'expert', title: 'Expert Support', desc: 'Direct technical support from Meta expert team' },
      { iconId: 'protection', title: 'Balance Protection', desc: 'Balance auto-moves to replacement account if disabled (T&C apply)' },
    ],
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
    photoHeading: 'Directly connected <span style="color: var(--orange-500)">with Meta</span>',
    photoSub: 'The Tentaklik team is active in Meta\'s official events & programs.',
    photos: [
      { src: '/assets/galeri-meta/meta1.avif', alt: 'Tentaklik team at a Meta event' },
      { src: '/assets/galeri-meta/meta2.avif', alt: 'Visit to the Meta office' },
      { src: '/assets/galeri-meta/meta6.avif', alt: 'Team visit to Facebook Singapore' },
      { src: '/assets/galeri-meta/meta4.avif', alt: 'Official Meta Partner event' },
      { src: '/assets/galeri-meta/meta5.avif', alt: 'Tentaklik Team', portrait: true },
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

export const GOOGLE_LP: Record<Lang, GoogleLpData> = {
  id: {
    platform: 'google',
    hero: {
      eyebrow: 'Google Ads Whitelist',
      title: 'Jangan Biarkan',
      titleAccent: 'Kendala Akun Menghambat Performa Google Ads Anda',
      desc: 'Google Whitelist membantu bisnis menjalankan aktivitas periklanan dengan lebih nyaman dan efisien.',
    },
    whyHeading: 'Mengapa Memilih Google Whitelist?',
    whySub: 'Solusi terbaik untuk scale-up iklan Anda dengan aman, nyaman, dan bebas hambatan.',
    whyItems: [
      { iconId: 'stable', title: 'Risiko Suspend Rendah', desc: 'Risiko Suspend lebih rendah dibanding akun Google Ads Personal biasa' },
      { iconId: 'comfortable', title: 'Lebih Nyaman', desc: 'Lebih nyaman untuk beriklan' },
      { iconId: 'scale', title: 'Bebas Scale', desc: 'Bebas scale limit spending harian' },
      { iconId: 'tax', title: 'Tanpa PPN', desc: 'Tidak dikenakan PPN' },
      { iconId: 'priority', title: 'Jalur Prioritas', desc: 'Support appeal langsung melalui jalur Google Partner' },
      { iconId: 'expert', title: 'Support Expert', desc: 'Support teknis langsung ke tim expert Google' },
      { iconId: 'protection', title: 'Proteksi Saldo', desc: 'Saldo otomatis pindah ke akun pengganti jika terjadi disable (s&k berlaku)' },
    ],
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
      { src: '/assets/galeri/2.jpg', alt: 'Galeri Google 2' },
      { src: '/assets/galeri/3.jpg', alt: 'Galeri Google 3' },
      { src: '/assets/galeri/4.jpg', alt: 'Galeri Google 4' },
      { src: '/assets/galeri/6.jpg', alt: 'Galeri Google 6' },
      { src: '/assets/galeri/8.jpg', alt: 'Galeri Google 8' },
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
      title: "Don't Let",
      titleAccent: 'Account Issues Hinder Your Google Ads Performance',
      desc: 'Google Whitelist helps businesses run advertising activities more comfortably and efficiently.',
    },
    whyHeading: 'Why Choose Google Whitelist?',
    whySub: 'The ultimate solution to scale your ads safely, comfortably, and without obstacles.',
    whyItems: [
      { iconId: 'stable', title: 'Lower Suspension Risk', desc: 'Lower suspension risk compared to a regular personal Google Ads account' },
      { iconId: 'comfortable', title: 'More Comfortable', desc: 'More comfortable for advertising' },
      { iconId: 'scale', title: 'Scale Freely', desc: 'Scale freely with no daily spending limits' },
      { iconId: 'tax', title: 'No VAT', desc: 'No VAT charged' },
      { iconId: 'priority', title: 'Priority Route', desc: 'Direct appeal support through Google Partner' },
      { iconId: 'expert', title: 'Expert Support', desc: 'Direct technical support from the Google expert team' },
      { iconId: 'protection', title: 'Balance Protection', desc: 'Balance auto-moves to replacement account if disabled (T&C apply)' },
    ],
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
      { src: '/assets/galeri/2.jpg', alt: 'Google Gallery 2' },
      { src: '/assets/galeri/3.jpg', alt: 'Google Gallery 3' },
      { src: '/assets/galeri/4.jpg', alt: 'Google Gallery 4' },
      { src: '/assets/galeri/6.jpg', alt: 'Google Gallery 6' },
      { src: '/assets/galeri/8.jpg', alt: 'Google Gallery 8' },
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
