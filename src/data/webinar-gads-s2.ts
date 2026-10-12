// Webinar Google Ads S2 — Content Data (copywriting diperkuat)
export const WEBINAR_GADS_S2 = {
  seo: {
    title:
      "Sudah Pasang Google Ads, Kok Belum Ada Leads? — Webinar Google Ads Gratis Tentaklik",
    description:
      "Bedah kesalahan keyword, setting campaign, dan landing page yang membuat iklan sulit menghasilkan calon pelanggan. Webinar online gratis, 16 Oktober 2026 pukul 20.00 WIB.",
    keywords: [
      "webinar google ads gratis",
      "google ads tidak ada leads",
      "evaluasi keyword google ads",
      "optimasi landing page",
      "belajar google ads",
      "tentaklik webinar",
    ],
  },
  telegramUrl: "https://t.me/+mUZLSiegI6o0N2Jl",
  event: {
    dateShort: "16 Oktober 2026",
    date: "Jumat, 16 Oktober 2026",
    time: "20.00 WIB",
    location: "Online via Zoom",
    price: "Gratis",
    isoDate: "2026-10-16T20:00:00+07:00",
    duration: "Sekitar 90–120 menit",
  },
  hero: {
    badge: "Webinar Google Ads Gratis",
    title: "Sudah Pasang Google Ads,",
    titleAccent: "Kok Belum Ada Leads?",
    subheading:
      "Bedah Kesalahan Keyword, Setting Campaign, dan Landing Page yang Membuat Iklan Sulit Menghasilkan Calon Pelanggan.",
    desc: "Sudah keluar budget untuk iklan, tetapi leads masih sepi? Yuk, pelajari cara menemukan masalahnya dan mengevaluasi campaign Google Ads agar lebih terarah.",
    ctaText: "DAFTAR WEBINAR GRATIS",
    ctaNote: "100% Gratis · Tanpa Biaya",
    imageSrc: "/assets/google/sewa-akun-google-ads-whitelist.avif",
  },
  problems: {
    heading: "Iklan Jalan, Tapi Leads Belum Datang?",
    intro:
      "Jangan buru-buru menambah budget. Bisa jadi ada bagian campaign yang perlu dievaluasi.",
    items: [
      "Klik banyak, tetapi tidak ada calon pelanggan yang menghubungi.",
      "Budget cepat habis karena keyword kurang relevan.",
      "Iklan sudah tayang, tetapi hasilnya belum sesuai harapan.",
      "Landing page dikunjungi, tetapi pengunjung tidak melakukan konversi.",
    ],
    closer: "Pernah mengalami salah satunya? Webinar ini dibuat untuk kamu.",
  },
  story: {
    eyebrow: "Alur Iklan",
    heading: "Dari Klik sampai Leads, Di Mana Biasanya Macet?",
    intro:
      "Leads tidak datang dari satu tempat. Ada beberapa tahap yang harus nyambung satu sama lain.",
    steps: [
      {
        label: "Tahap 1",
        title: "Orang mencari di Google",
        desc: "Keyword yang kamu pilih mempertemukan iklan dengan pencarian mereka.",
        tone: "ok",
      },
      {
        label: "Tahap 2",
        title: "Iklan diklik",
        desc: "Budget mulai terpakai di setiap klik, termasuk klik yang tidak relevan.",
        tone: "ok",
      },
      {
        label: "Tahap 3",
        title: "Landing page dibuka",
        desc: "Pesan, penawaran, dan alur halaman menentukan pengunjung lanjut atau pergi.",
        tone: "warn",
      },
      {
        label: "Tahap 4",
        title: "Leads tidak masuk",
        desc: "Pengunjung pergi tanpa menghubungi, mengisi form, atau membeli.",
        tone: "bad",
      },
    ] satisfies {
      label: string;
      title: string;
      desc: string;
      tone: "ok" | "warn" | "bad";
    }[],
    questionTitle: "Macetnya di tahap mana?",
    questionDesc:
      "Banyak advertiser langsung menambah budget, padahal sumber masalahnya bisa ada di keyword, setting campaign, atau landing page. Di webinar ini kita cari tahu bagian mana yang perlu dibenahi lebih dulu.",
  },
  curriculum: {
    heading: "Apa yang Akan Kamu Pelajari?",
    intro: "Dalam webinar ini, kita akan membahas:",
    items: [
      {
        title: "Evaluasi Keyword",
        desc: "Memilih keyword yang lebih relevan dan memahami search terms.",
        questions: [
          "Keyword mana yang menghabiskan budget tanpa hasil?",
          "Cara membaca search terms yang masuk",
        ],
      },
      {
        title: "Setting Campaign",
        desc: "Mengenali pengaturan yang perlu diperiksa oleh advertiser pemula.",
        questions: [
          "Pengaturan apa yang sering terlewat?",
          "Kapan campaign perlu diubah, kapan cukup dipantau?",
        ],
      },
      {
        title: "Optimasi Landing Page",
        desc: "Memahami faktor yang memengaruhi keputusan pengunjung.",
        questions: [
          "Apakah isi halaman sudah sesuai dengan iklan?",
          "Elemen apa yang membuat pengunjung ragu?",
        ],
      },
      {
        title: "Analisis Performa",
        desc: "Membaca CTR, CPC, dan conversion rate untuk menentukan langkah optimasi.",
        questions: [
          "Angka mana yang perlu dilihat lebih dulu?",
          "Cara menentukan langkah optimasi berikutnya",
        ],
      },
    ],
  },
  perks: {
    heading: "Yang Kamu Dapatkan",
    intro: "Gratis, tanpa biaya tersembunyi.",
    items: [
      "Sesi live via Zoom bersama pembicara",
      "Tanya jawab (Q&A) langsung",
      "Materi PDF untuk dipelajari ulang",
      "Akses grup Telegram peserta",
    ],
  },
  audience: {
    heading: "Webinar Ini Cocok untuk Kamu yang...",
    desc: "Advertiser pemula, digital marketer, atau pemilik bisnis yang sudah menjalankan Google Ads tetapi masih kesulitan mendapatkan leads.",
    tags: ["Advertiser Pemula", "Digital Marketer", "Pemilik Bisnis"],
    note: "Belum pernah memakai Google Ads sama sekali? Kamu tetap bisa ikut untuk memahami gambaran alurnya.",
  },
  speaker: {
    name: "Sari Setianingsih",
    role: "Pembicara",
    // TODO: konfirmasi bio dengan PIC / pembicara sebelum tayang
    bio: "Sari akan memandu sesi ini dengan fokus praktis: bagaimana mengenali bagian campaign yang bermasalah, dari keyword, setting, sampai landing page, sebelum memutuskan langkah optimasi berikutnya.",
    photoSrc: "/assets/team/sari.avif",
  },
  details: {
    heading: "Detail Webinar",
  },
  faq: {
    heading: "Pertanyaan yang Sering Ditanyakan",
    items: [
      {
        q: "Webinar ini di mana dan bagaimana cara bergabung?",
        a: "Webinar berlangsung online via Zoom. Klik tombol daftar, lalu bergabunglah ke grup Telegram peserta. Link Zoom dan pengingat jadwal dibagikan di sana.",
      },
      {
        q: "Apakah cocok untuk pemula?",
        a: "Cocok. Materi dibahas dari dasar: keyword, setting campaign, landing page, dan cara membaca angka performa. Kalau kamu sudah pernah menjalankan iklan, kamu akan lebih mudah mengikuti contohnya.",
      },
      {
        q: "Bagaimana kalau saya tidak bisa hadir tepat waktu?",
        a: "Materi PDF tetap dibagikan di grup Telegram peserta, jadi kamu bisa mempelajarinya kapan saja.",
      },
      {
        q: "Berapa biayanya?",
        a: "Gratis (Rp0). Tidak ada biaya pendaftaran maupun biaya tersembunyi.",
      },
      {
        q: "Bagaimana cara mengamankan tempat?",
        a: "Klik tombol Daftar Webinar Gratis. Kamu langsung diarahkan ke grup Telegram peserta, tanpa perlu mengisi form.",
      },
    ],
  },
  closing: {
    eyebrowNote: "Jumat ini, 20.00 WIB",
    heading: "Siap Mengevaluasi Google Ads Kamu?",
    desc: "Pelajari cara menemukan masalah campaign sebelum memutuskan langkah optimasi berikutnya.",
    ctaText: "DAFTAR SEKARANG — GRATIS",
    footer: "Webinar Google Ads bersama Tentaklik.",
  },
};
