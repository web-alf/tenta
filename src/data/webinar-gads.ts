// Webinar Google Ads LP — Content Data
// Structure follows eventgads.md (DIFFERENT from eventfb/Meta)
import hanifPhoto from '../assets/webinar/hanif-gads.avif';

export const WEBINAR_GADS = {
  seo: {
    title: 'Bedah Strategi Google Ads dari Click ke Conversion — Webinar Online Gratis',
    description: 'Pahami metrik Google Ads, temukan kebocoran conversion, dan bedah perjalanan dari click hingga conversion secara GRATIS via Zoom & Telegram.',
    keywords: ['webinar google ads gratis', 'optimasi google ads', 'belajar google ads free', 'google ads conversion', 'tentaklik webinar'],
  },
  event: {
    date: 'Jumat, 11 September 2026',
    time: '20.00 WIB',
    platform: 'Online via Zoom & Telegram',
    earlyBirdDeadline: '2026-09-10T23:59:59+07:00',
    seatLeft: 10,
    priceEarlyBird: 'GRATIS',
    priceRegular: 'Rp0',
    priceOriginal: 'Rp99.000',
    isFree: true,
  },
  telegramUrl: 'https://t.me/+mUZLSiegI6o0N2Jl',
  hero: {
    hook: 'Click Banyak, Customer Sedikit?',
    title: 'Bedah Strategi Google Ads',
    titleAccent: 'dari Click ke Conversion',
    desc: 'Pelajari cara membedah performa Google Ads dari click hingga conversion, supaya budget iklan menghasilkan lebih banyak customer.',
    mockupSrc: '/assets/mockup-gads.avif',
    subLines: [
      'Sudah jalanin Google Ads.',
      'Click masuk. Budget keluar.',
      'Tapi hasil belum sebanding?',
      'Mungkin bukan soal tambah budget.',
      'Tapi cara membaca dan mengoptimasi campaign-nya.',
    ],
    ctaText: 'Gabung Telegram (Gratis)',
    ctaHref: 'https://t.me/+mUZLSiegI6o0N2Jl',
  },
  speaker: {
    name: 'Hanif Sayyid',
    title: 'Performance Marketing Expert · Google Ads Specialist',
    bio: 'Berpengalaman menangani campaign Google Ads dan membantu advertiser memahami performance campaign dari click hingga conversion.',
    photoSrc: hanifPhoto.src,
    credentials: ['Campaign Strategy', 'Keyword Research', 'Conversion Optimization'],
  },
  problems: {
    heading: 'Pernah',
    headingAccent: 'Mengalami Ini?',
    sub: '',
    items: [
      'Click sudah banyak, tapi inquiry sedikit?',
      'Traffic tinggi, tapi penjualan tidak sebanding?',
      'CPC sudah murah, tapi conversion tetap rendah?',
      'Bingung apakah masalahnya ada di iklan, keyword, atau landing page?',
      'Sudah optimasi campaign, tapi hasilnya masih belum maksimal?',
    ],
    closer: 'Kalau pernah mengalami ini, webinar ini untuk Anda.',
  },
  curriculum: {
    heading: 'Dalam Webinar Ini, Anda Akan Memahami:',
    items: [
      { number: '01', title: 'Baca Data Google Ads', desc: 'Pahami metrik penting untuk mengetahui apakah campaign benar-benar bekerja atau hanya menghasilkan click.' },
      { number: '02', title: 'Temukan Kebocoran Conversion', desc: 'Cari tahu di tahap mana calon customer berhenti sebelum melakukan conversion.' },
      { number: '03', title: 'Bedah dari Click ke Conversion', desc: 'Pelajari hubungan antara keyword, iklan, landing page, hingga tindakan customer.' },
      { number: '04', title: 'Optimasi Berdasarkan Data', desc: 'Tentukan apa yang perlu diperbaiki agar budget tidak hanya menghasilkan traffic, tapi juga customer.' },
    ],
  },
  audience: {
    heading: 'Siapa yang Cocok Ikut?',
    leadIn: 'Webinar ini cocok untuk:',
    note: 'Di webinar ini, Anda akan diajak membedah perjalanan Google Ads dari click → landing page → conversion, supaya budget yang dikeluarkan bisa menghasilkan lebih banyak customer.',
    suitable: [
      'Business Owner',
      'Performance Marketer',
      'Digital Marketer',
      'E-commerce Seller',
      'Media Buyer',
      'Advertiser yang sudah menjalankan Google Ads',
    ],
    notFor: 'Pemula total yang belum pernah pakai Google Ads',
  },
  midCta: {
    eyebrow: 'Intinya',
    title: 'Click Sudah Banyak.',
    titleAccent: 'Sekarang Saatnya Cari Customer-nya.',
    desc: 'Jangan puas hanya dengan traffic. Cari tahu apa yang terjadi setelah mereka klik, temukan titik kebocoran dari click hingga conversion, agar budget Google Ads tidak berhenti di angka click saja.',
    ctaText: 'Gabung Group Telegram (Gratis)',
    ctaHref: 'https://t.me/+mUZLSiegI6o0N2Jl',
    footnote: '100% Gratis · Akses Zoom & Materi dibagikan via Telegram',
  },
  form: {
    eyebrow: 'Akses Sesi Live',
    heading: 'Sudah Spending di Google Ads?',
    headingAccent: 'Jangan Tambah Budget Dulu.',
    sub: 'Pahami dulu kenapa click tidak jadi customer. Gabung ke grup Telegram untuk mendapatkan link akses Zoom dan Materi PDF.',
    scriptUrl: '',
    waNumber: '6285129992225',
  },
};
