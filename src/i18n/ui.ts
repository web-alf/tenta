// src/i18n/ui.ts
// Kamus string UI non-konten (nav, tombol, label form, heading generik).
// Konten halaman panjang (hero/benefit/FAQ) ada di src/data/* keyed per bahasa.

export const UI = {
  id: {
    // Navigasi
    'nav.beranda': 'Beranda',
    'nav.tentang': 'Tentang',
    'nav.layanan': 'Layanan',
    'nav.partner': 'Partner',
    'nav.faq': 'FAQ',
    'nav.blog': 'Blog',
    'nav.kontak': 'Kontak',
    'nav.lang': 'Bahasa',
    'nav.lang.id': 'Indonesia',
    'nav.lang.en': 'English',
    // Layanan dropdown
    'svc.website': 'Website Development',
    'svc.sewaAkun': 'Sewa Akun',
    'svc.konsultasi': 'Konsultasi Digital Marketing',
    // Form shortform
    'form.nama': 'Nama Lengkap',
    'form.nama.ph': 'Nama Anda',
    'form.wa': 'Nomor WhatsApp',
    'form.wa.ph': '0812-xxxx-xxxx',
    'form.ket': 'Keterangan Project Singkat',
    'form.ket.ph': 'Produk/jasa, target, dan kebutuhan akun...',
    'form.kirim': 'Kirim',
    'form.mengirim': 'Mengirim…',
    'form.sent': 'Terkirim! Mengarahkan kamu ke WhatsApp…',
    'form.err.nama': 'Nama tidak valid (2–100 karakter).',
    'form.err.wa': 'Nomor WhatsApp tidak valid.',
    'form.err.inactive': 'Form belum aktif. Hubungi kami via WhatsApp untuk sementara.',
    'form.heading': 'Ajukan Akun Whitelist',
    'form.sub': 'Isi data singkat, tim kami hubungi kamu.',
  },
  en: {
    // Navigation
    'nav.beranda': 'Home',
    'nav.tentang': 'About',
    'nav.layanan': 'Services',
    'nav.partner': 'Partners',
    'nav.faq': 'FAQ',
    'nav.blog': 'Blog',
    'nav.kontak': 'Contact',
    'nav.lang': 'Language',
    'nav.lang.id': 'Indonesia',
    'nav.lang.en': 'English',
    // Services dropdown
    'svc.website': 'Website Development',
    'svc.sewaAkun': 'Account Rental',
    'svc.konsultasi': 'Digital Marketing Consulting',
    // Shortform
    'form.nama': 'Full Name',
    'form.nama.ph': 'Your name',
    'form.wa': 'WhatsApp Number',
    'form.wa.ph': '0812-xxxx-xxxx',
    'form.ket': 'Brief Project Description',
    'form.ket.ph': 'Product/service, goals, and account needs...',
    'form.kirim': 'Send',
    'form.mengirim': 'Sending…',
    'form.sent': 'Sent! Redirecting you to WhatsApp…',
    'form.err.nama': 'Invalid name (2–100 characters).',
    'form.err.wa': 'Invalid WhatsApp number.',
    'form.err.inactive': 'Form not active yet. Please contact us via WhatsApp for now.',
    'form.heading': 'Request a Whitelist Account',
    'form.sub': 'Fill in a few details and our team will reach out.',
  },
} as const;

export type Lang = keyof typeof UI;
export type UIKey = keyof typeof UI['id'];
