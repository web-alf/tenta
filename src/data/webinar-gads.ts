// Webinar Google Ads LP — Content Data
// Structure follows eventgads.md (DIFFERENT from eventfb/Meta)
import hanifPhoto from '../assets/webinar/hanif-gads.avif';

export const WEBINAR_GADS = {
  seo: {
    title: 'Google Ads: From Click to Conversion — Webinar Online',
    description: 'Bedah kenapa Google Ads Anda belum menghasilkan conversion yang optimal. Pelajari cara setup campaign, keyword, bidding, dan optimasi Google Ads berbasis data.',
    keywords: ['webinar google ads', 'optimasi google ads', 'belajar google ads', 'google ads conversion', 'tentaklik webinar'],
  },
  event: {
    date: 'Jumat, 28 Agustus 2026',
    time: '19:00 WIB',
    platform: 'Zoom Meeting',
    earlyBirdDeadline: '2026-08-27T23:59:59+07:00',
    seatLeft: 10,
    priceEarlyBird: 'Rp10.000',
    priceRegular: 'Rp17.000',
    priceOriginal: 'Rp99.000',
  },
  hero: {
    hook: 'Click Banyak, Customer Sedikit?',
    title: 'Google Ads:',
    titleAccent: 'From Click to Conversion',
    desc: 'Bedah kenapa Google Ads Anda belum menghasilkan conversion yang optimal',
    subLines: [
      'Sudah jalanin Google Ads.',
      'Click masuk. Budget keluar.',
      'Tapi hasil belum sebanding?',
      'Mungkin bukan soal tambah budget.',
      'Tapi cara membaca dan mengoptimasi campaign-nya.',
    ],
    ctaText: 'Ambil Tiket Sekarang',
    ctaHref: '#form-registrasi',
  },
  speaker: {
    name: 'Hanif Sayyid',
    title: 'Performance Marketing Expert · Google Ads Specialist',
    bio: 'Praktisi Performance Marketing dengan fokus pada Google Ads dan strategi digital advertising berbasis data. Memiliki expertise dalam campaign strategy, keyword research, bidding optimization, serta conversion tracking untuk membantu bisnis mendapatkan hasil iklan yang lebih efektif dan terukur.',
    photoSrc: hanifPhoto.src,
    credentials: ['Campaign Strategy', 'Keyword Research', 'Conversion Optimization'],
  },
  problems: {
    heading: 'Masalahnya Bukan di Click',
    headingAccent: 'Tapi di Setelah Click',
    sub: 'Google Ads bukan soal traffic saja. Yang sering terjadi:',
    items: [
      'Click banyak tapi tidak jadi customer',
      'Budget habis tapi tidak jelas hasilnya',
      'Campaign jalan tapi tidak stabil',
    ],
    closer: 'Di mana masalahnya?',
  },
  curriculum: {
    heading: 'Yang Akan Dibahas',
    items: [
      { number: '01', title: 'Setup Campaign', desc: 'Apakah struktur campaign sudah benar dari awal?' },
      { number: '02', title: 'Keyword & Audience', desc: 'Apakah traffic yang masuk benar-benar relevan?' },
      { number: '03', title: 'Bidding & Budget', desc: 'Apakah uang Anda dipakai dengan cara yang tepat?' },
      { number: '04', title: 'Conversion', desc: 'Kenapa click tidak berubah jadi customer?' },
      { number: '05', title: 'Optimasi', desc: 'Cara membaca data untuk perbaikan campaign' },
    ],
  },
  audience: {
    heading: 'Webinar Ini Untuk Siapa?',
    suitable: [
      'Business Owner',
      'Digital Marketer',
      'Performance Marketer',
      'E-commerce Seller',
      'Advertiser yang sudah running Google Ads',
    ],
    notFor: 'Pemula total yang belum pernah pakai Google Ads',
  },
  midCta: {
    eyebrow: 'Intinya',
    title: 'Click Itu Mudah',
    titleAccent: 'Yang Susah Itu Conversion',
    desc: 'Webinar ini akan bantu Anda memahami: apa yang salah di campaign Anda dan bagaimana cara memperbaikinya.',
    ctaText: 'Daftar Sekarang',
    ctaHref: '#form-registrasi',
  },
  form: {
    eyebrow: 'Registrasi Webinar',
    heading: 'Sudah Spending di Google Ads?',
    headingAccent: 'Jangan Tambah Budget Dulu.',
    sub: 'Pahami dulu kenapa click tidak jadi customer. Isi data berikut untuk mengamankan tempat Anda.',
    scriptUrl: 'https://script.google.com/macros/s/AKfycbyqBbjxA91y18QR_PvcYArI62SSEbdD0JU49PFnlb4Wj7Q1xviBNbwDaHG_jSKZk0OutA/exec',
    waNumber: '6285129992225',
  },
};
