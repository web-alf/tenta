// Webinar Meta LP — Content Data
// Ganti placeholder sebelum go-live.
import bilalPhoto from '../assets/webinar/bilal-fb.avif';
import mascotHero from '../assets/webinar/mockup-fb.avif';

export const WEBINAR_META = {
  seo: {
    title: 'Dari Boncos ke Profit: Bedah Campaign Meta Ads yang Salah Strategi',
    description: 'Webinar online khusus praktisi Meta Ads. Pelajari cara baca data campaign, temukan kebocoran budget, dan tentukan titik optimasi yang tepat.',
    keywords: ['webinar meta ads','optimasi meta ads','belajar meta ads','bedah campaign facebook ads','tentaklik webinar'],
  },
  event: {
    date: 'Sabtu, 28 Agustus 2026',
    time: '20.00 WIB',
    platform: 'Online via Zoom',
    earlyBirdDeadline: '2026-08-21T23:59:59+07:00',
    seatLeft: 10,
    priceEarlyBird: 'Rp10.000',
    priceRegular: 'Rp17.000',
    priceOriginal: 'Rp99.000',
  },
  hero: {
    ribbon: 'Dirgahayu Republik Indonesia',
    ribbonBadge: 'KE-81',
    title: 'Dari Boncos',
    titleAccent: 'ke Profit',
    subtitle: 'Bedah Campaign Meta Ads yang Salah Strategi',
    desc: [
      'Sudah beriklan di Meta Ads, tapi budget terus keluar sementara hasil belum maksimal?',
      'Bisa jadi masalahnya bukan kurang budget.',
      'Bisa jadi ada yang salah dalam campaign Anda.',
    ],
    ctaText: 'Daftar Webinar Sekarang',
    ctaHref: '#form-registrasi',
    mascotSrc: mascotHero.src,
  },
  problems: {
    heading: 'Pernah Mengalami Ini?',
    sub: 'Kalau Anda pernah mengalami salah satunya, webinar ini untuk Anda.',
    items: [
      { icon: 'trending-down', title: 'Budget naik, tapi hasil justru turun?' },
      { icon: 'target', title: 'ROAS tidak sesuai target?' },
      { icon: 'sliders', title: 'Campaign sudah berjalan, tapi bingung harus optimasi bagian mana?' },
      { icon: 'video', title: 'Sudah testing creative, tapi performance tetap tidak stabil?' },
    ],
  },
  curriculum: {
    heading: 'Dalam webinar ini, Anda akan diajak memahami:',
    items: [
      { icon: 'bar-chart', title: 'Baca Data Campaign', desc: 'Pelajari cara membaca performance campaign dan memahami angka yang benar-benar penting.' },
      { icon: 'rupiah', title: 'Temukan Kebocoran Budget', desc: 'Cari tahu bagian mana yang membuat budget tidak bekerja secara optimal.' },
      { icon: 'target', title: 'Tentukan Titik Optimasi', desc: 'Pahami mana yang harus diperbaiki, dipertahankan, atau dihentikan.' },
      { icon: 'trending-up', title: 'Ambil Keputusan Berdasarkan Data', desc: 'Jangan lagi mengoptimasi campaign hanya berdasarkan feeling atau asumsi.' },
    ],
  },
  audience: {
    heading: 'Siapa yang Cocok Ikut?',
    sub: 'Webinar ini khusus untuk Anda yang sudah pernah menjalankan Meta Ads.',
    items: [
      'Business Owner',
      'Performance Marketer',
      'Digital Marketer',
      'E-commerce Seller',
      'Media Buyer',
      'Advertiser dengan campaign existing',
    ],
    note: 'Bukan webinar "cara pasang iklan dari nol". Kita akan membahas apa yang harus dilakukan setelah campaign sudah berjalan.',
  },
  speaker: {
    name: 'Bilal Abdurrahman',
    title: 'Meta Ads & Performance Marketing Manager',
    bio: 'Praktisi Performance Marketing dengan fokus pada Meta Ads dan strategi digital advertising berbasis data untuk membantu bisnis mendapatkan hasil iklan yang lebih efektif dan terukur.',
    photoSrc: bilalPhoto.src,
    credentials: ['Campaign Strategy', 'Audience Targeting', 'Performance Optimization'],
  },
  form: {
    badge: 'Webinar Spesial Kemerdekaan',
    heading: 'Siap Mengetahui Di Mana Budget Iklan Anda Bocor?',
    sub: 'Jangan hanya melihat berapa banyak budget yang sudah Anda keluarkan. Cari tahu apa yang sebenarnya terjadi di dalam campaign Anda.',
    promoLabel: 'Promo Kemerdekaan',
    priceNote: 'Rp10.000 untuk 10 peserta tercepat!',
    heading2: 'Form Registrasi',
    consentText: 'Saya bersedia menerima informasi terkait webinar dan layanan Tentaklik melalui WhatsApp/email.',
    ctaText: 'Daftar Sekarang',
    footnote: 'Kuota peserta terbatas.',
    scriptUrl: 'https://script.google.com/macros/s/AKfycbyqBbjxA91y18QR_PvcYArI62SSEbdD0JU49PFnlb4Wj7Q1xviBNbwDaHG_jSKZk0OutA/exec',
    waNumber: '6285129992225',
    pixelId: '1341980327384883',
  },
};
