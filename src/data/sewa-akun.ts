// src/data/sewa-akun.ts
// Konten layanan "Sewa Akun" — rental akun iklan whitelist Google & Meta.
// Single source of truth untuk halaman /layanan/sewa-akun.

export interface WhitelistInfo {
  key: 'meta' | 'google';
  title: string;
  desc: string;
  benefits: string[];
  requirements: string[];
}

export interface SewaPlan {
  name: string;
  tagline: string;
  price: string;
  unit: string;
  featured?: boolean;
  features: string[];
}

export interface FlowStep {
  no: number;
  tahap: string;
  aksi: string;
}

export interface TopupMethod {
  metode: string;
  cara: string;
}

export interface SewaFaq { q: string; a: string }

export const SEWA_HERO = {
  eyebrow: 'Sewa Akun',
  title: 'Iklan Jalan Terus,',
  titleAccent: 'Tanpa Drama Akun Kena Banned.',
  desc: 'Sewa Akun Whitelist Google & Meta Premium di Tentaklik. Dapatkan infrastruktur iklan kelas korporat dengan limit tanpa batas, review kilat, dan kestabilan performa untuk scale-up bisnis Anda.',
} as const;

export const META_WL: WhitelistInfo = {
  key: 'meta',
  title: 'Meta Ads Whitelist',
  desc: 'Akun iklan Facebook & Instagram yang sudah terverifikasi di bawah Business Manager resmi partner Meta.',
  benefits: [
    'Akun stabil, minim risiko random restrict',
    'Tidak ada limit spending harian — bebas scale',
    'Tidak dikenakan PPN',
    'Bisa digunakan untuk semua tipe campaign: Traffic, Leads, Conversions, Catalog, dll',
    'Support appeal melalui jalur langsung ke tim Meta',
    'Saldo otomatis pindah ke akun pengganti jika terjadi disable (syarat & ketentuan berlaku)',
  ],
  requirements: [
    'Memiliki akun Facebook personal yang aktif',
    'Memiliki Facebook Business Manager (BM)',
    'Fan Page / akun Instagram minimal berusia 7 hari dan sudah ada postingan',
    'Memiliki website dengan kontak (nomor WhatsApp / email) yang tertera jelas',
    'Produk / layanan yang diiklankan tidak melanggar kebijakan Meta',
  ],
};

export const GOOGLE_WL: WhitelistInfo = {
  key: 'google',
  title: 'Google Ads Whitelist',
  desc: 'Akun Google Ads yang dikelola resmi Google Partner agensi Tentaklik.',
  benefits: [
    'Risiko suspend lebih rendah dibanding akun Google Ads personal biasa',
    'Tidak ada batas maksimal spending harian — cocok untuk skala besar',
    'Proses appeal lebih cepat karena terhubung langsung ke Google Partner',
    'Saldo otomatis pindah ke akun pengganti jika terjadi disable (syarat & ketentuan berlaku)',
    'Support teknis oleh tim Tentaklik yang profesional dengan kebijakan Google Ads',
  ],
  requirements: [
    'Memiliki akun Gmail aktif',
    'Memiliki website / landing page yang sudah live',
    'Produk / layanan yang diiklankan tidak melanggar kebijakan Google Ads',
  ],
};

// Struktur harga — tier pricing volume besar (lihat docs section 4.4).
// Fee topup menurun seiring volume topup bulanan. Growth = best value (featured).
export const SEWA_PLANS: SewaPlan[] = [
  {
    name: 'Starter',
    tagline: '',
    price: '5%',
    unit: 'fee topup',
    features: [
      'Sekali topup 300rb - 5jt',
      'Akun Whitelist Resmi',
      'Tanpa biaya PPN',
      'Support appeal jalur partner',
      'Saldo pindah otomatis jika disable*',
      'Support prioritas (standar)',
    ],
  },
  {
    name: 'Growth',
    tagline: '',
    price: '4,5%',
    unit: 'fee topup',
    featured: true,
    features: [
      'Sekali topup 5jt - 15jt',
      'Akun Whitelist Resmi',
      'Tanpa biaya PPN',
      'Support appeal jalur partner',
      'Saldo pindah otomatis jika disable*',
      'Support prioritas (prioritas)',
    ],
  },
  {
    name: 'Scale',
    tagline: '',
    price: '3,5%',
    unit: 'fee topup',
    features: [
      'Topup di atas 15jt',
      'Akun Whitelist Resmi',
      'Tanpa biaya PPN',
      'Support appeal jalur partner',
      'Saldo pindah otomatis jika disable*',
      'Support prioritas (VIP)',
    ],
  },
];

export const SEWA_PLANS_EN: SewaPlan[] = [
  {
    name: 'Starter',
    tagline: '',
    price: '5%',
    unit: 'top-up fee',
    features: [
      'Monthly spend: $0 - $10,000',
      'Official Whitelist Ad Account',
      'No VAT / Tax Markup',
      'Partner Support Appeal',
      'Automatic Balance Migration (Terms & Conditions apply)',
      'Standard Priority Support',
    ],
  },
  {
    name: 'Growth',
    tagline: '',
    price: '4%',
    unit: 'top-up fee',
    featured: true,
    features: [
      'Monthly spend: $11,000 - $50,000',
      'Official Whitelist Ad Account',
      'No VAT / Tax Markup',
      'Partner Support Appeal',
      'Automatic Balance Migration (Terms & Conditions apply)',
      'Priority Support',
    ],
  },
  {
    name: 'Scale',
    tagline: '',
    price: '3%',
    unit: 'top-up fee',
    features: [
      'Monthly spend: $51,000 - $100,000',
      'Official Whitelist Ad Account',
      'No VAT / Tax Markup',
      'Partner Support Appeal',
      'Automatic Balance Migration (Terms & Conditions apply)',
      'VIP Support',
    ],
  },
];

// Biaya sewa akun & setup — ditampilkan di section pricing homepage (di atas fee topup per paket).
export const SEWA_RENTAL = {
  setup: 'Gratis',
  tiers: [
    { label: '1 Bulan', price: '150rb' },
    { label: '3 Bulan', price: '350rb' },
    { label: '6 Bulan', price: '792rb' },
  ],
} as const;

export const SEWA_RENTAL_EN = {
  setup: 'Free',
  tiers: [
    { label: '1 Month', price: '$31' },
    { label: '3 Months', price: '$75' },
    { label: '6 Months', price: '$169' },
  ],
} as const;

export const FLOW_META: FlowStep[] = [
  { no: 1, tahap: 'Daftar akun dashboard', aksi: 'Buka tentaklik.com dan daftar akun dengan email aktif' },
  { no: 2, tahap: 'Isi formulir pengajuan', aksi: 'Masukkan: ID Business Manager Meta, link Fan Page, link landing page, jenis produk/layanan' },
  { no: 3, tahap: 'Verifikasi data', aksi: 'Tim Tentaklik memverifikasi BM ID dan kelengkapan data (maks. 1–2 jam hari kerja)' },
  { no: 4, tahap: 'Akun aktif', aksi: 'Akun iklan whitelist muncul di Business Manager klien — siap digunakan' },
  { no: 5, tahap: 'Topup saldo', aksi: 'Transfer ke rekening / e-wallet Tentaklik + konfirmasi via dashboard atau WhatsApp' },
  { no: 6, tahap: 'Mulai beriklan', aksi: 'Buat campaign di Ads Manager seperti biasa menggunakan akun whitelist yang sudah aktif' },
];

export const FLOW_GOOGLE: FlowStep[] = [
  { no: 1, tahap: 'Daftar akun dashboard', aksi: 'Buka tentaklik.com dan daftar akun dengan email Google aktif' },
  { no: 2, tahap: 'Isi formulir pengajuan', aksi: 'Masukkan: Customer ID Google Ads (jika sudah ada), URL website/landing page, kategori bisnis' },
  { no: 3, tahap: 'Proses setup MCC', aksi: 'Tim Tentaklik membuat / menghubungkan akun ke MCC resmi (estimasi 1×24 jam hari kerja)' },
  { no: 4, tahap: 'Akun aktif', aksi: 'Akun Google Ads muncul di dashboard klien — siap untuk topup' },
  { no: 5, tahap: 'Topup saldo', aksi: 'Transfer ke rekening Tentaklik + konfirmasi — saldo masuk dalam hitungan jam' },
  { no: 6, tahap: 'Mulai beriklan', aksi: 'Buat campaign di Google Ads sesuai kebutuhan bisnis' },
];

export const TOPUP_METHODS: TopupMethod[] = [
  { metode: 'Transfer Bank', cara: 'Transfer ke rekening Tentaklik → konfirmasi via WhatsApp atau dashboard dengan bukti transfer' },
  { metode: 'E-Wallet (GoPay / OVO / DANA)', cara: 'Transfer ke nomor e-wallet → konfirmasi via WhatsApp dengan bukti' },
  { metode: 'Dashboard langsung', cara: 'Login dashboard Tentaklik → pilih menu Topup → pilih metode → ikuti instruksi' },
];

export const SEWA_FAQS: SewaFaq[] = [
  { q: 'Apakah akun whitelist 100% aman dari banned?', a: 'Tidak. Tidak ada akun yang kebal banned jika melanggar kebijakan platform. Akun whitelist jauh lebih tahan dari random restrict, tapi jika iklan yang ditayangkan melanggar TOS Meta atau Google, akun tetap bisa dinonaktifkan. Tentaklik membantu proses appeal untuk kasus yang bukan disebabkan pelanggaran user.' },
  { q: 'Apakah saya bisa punya lebih dari satu akun whitelist?', a: 'Bisa. Anda dapat mengajukan lebih dari satu akun whitelist sesuai kebutuhan campaign Anda.' },
  { q: 'Bagaimana jika akun lama saya sudah terhubung ke provider whitelist lain?', a: 'Untuk Meta: Anda perlu menggunakan BM baru yang bersih. Untuk Google: akun existing bisa dihubungkan ke MCC Tentaklik, namun perlu dilepas dari MCC provider sebelumnya terlebih dahulu.' },
  { q: 'Bisakah saya migrasi campaign dari akun lama ke akun whitelist Tentaklik?', a: 'Untuk Meta: bisa — campaign yang sudah berjalan di akun lama dapat dipindahkan ke akun whitelist. Untuk Google: akun existing bisa langsung dihubungkan ke akun Tentaklik.' },
  { q: 'Apakah ada kontrak atau komitmen jangka panjang?', a: 'Ada. Jika akun tidak digunakan selama sebulan maka akan dicabut otomatis, dan akan diberitahukan ke klien terlebih dahulu oleh CS.' },
  { q: 'Kenapa fee topup Tentaklik 4% sedangkan kompetitor ada yang 3%?', a: 'Tentaklik memposisikan layanan di level yang sedikit lebih premium dengan justifikasi: onboarding checklist gratis, support lebih personal (bukan bot), dan pengalaman khusus untuk kategori NGO/yayasan. Selain itu, efisiensi utama tetap dari penghematan PPN sehingga klien tetap hemat dibanding akun biasa.' },
  { q: 'Apakah Tentaklik cocok untuk organisasi sosial atau yayasan?', a: 'Sangat cocok. Tentaklik memiliki pengalaman langsung mendampingi lembaga sosial yang menjalankan campaign donasi. Kami memahami kebutuhan konten sosial yang sering terkena false-positive restrict, dan akun whitelist memberi perlindungan ekstra untuk campaign yang sensitif.' },
  { q: 'Bagaimana cara menghubungi CS Tentaklik?', a: 'CS Tentaklik dapat dihubungi via WhatsApp di nomor yang tertera di website tentaklik.com. Jam operasional: Senin–Minggu, 24 jam.' },
  { q: 'Apakah ada fitur topup otomatis?', a: 'Saat ini topup dilakukan secara manual dengan konfirmasi via dashboard atau WhatsApp. Fitur topup otomatis sedang dalam pengembangan.' },
];

export const SEWA_SEO = {
  title: 'Sewa Akun Whitelist Google & Meta Ads — Tentaklik',
  description: 'Sewa akun iklan whitelist Google Ads & Meta Ads (Facebook & Instagram) di Tentaklik: tanpa limit spending, tanpa PPN, anti random banned, dan saldo pindah otomatis jika disable. Fee topup mulai dari 3,5%.',
} as const;

export const SEWA_KEYWORDS = [
  'sewa akun iklan',
  'sewa akun facebook ads',
  'sewa akun google ads',
  'akun whitelist meta',
  'akun whitelist google',
  'sewa akun meta ads',
  'agency ads whitelist',
];

// Section "Cocok untuk berbagai industri" — dipakai LP sewa-akun + 2 LP whitelist.
export interface Industry { label: string; iconId: string; tint: string }

export const INDUSTRY_HEADING = {
  title: 'Cocok untuk berbagai industri',
  sub: 'Umumnya digunakan oleh advertiser di industri:',
} as const;

// tint = warna dasar kartu (gradient lembut digenerate di komponen).
export const INDUSTRIES: Industry[] = [
  { label: 'Personal Care',   iconId: 'bottle', tint: '#E8F0FE' },
  { label: 'Fashion Dewasa',  iconId: 'shirt', tint: '#FCE7F3' },
  { label: 'Kesehatan',       iconId: 'shield-cross', tint: '#E7F6EC' },
  { label: 'Kecantikan',      iconId: 'sparkles', tint: '#F3E8FF' },
  { label: 'Produk Dewasa',   iconId: 'box', tint: '#FFF1E6' },
  { label: 'NGO / Sosial',    iconId: 'heart', tint: '#E6F4F7' },
];

export const SEWA_HERO_EN = {
  eyebrow: 'Account Rental',
  title: 'Keep Ads Running,',
  titleAccent: 'Without Account Ban Drama.',
  desc: 'Rent Premium Google & Meta Whitelist Accounts at Tentaklik. Get corporate-grade ad infrastructure with unlimited spending, lightning-fast reviews, and stable performance to scale up your business.',
} as const;

export const META_WL_EN: WhitelistInfo = {
  key: 'meta',
  title: 'Meta Ads Whitelist',
  desc: 'Verified Facebook & Instagram ad accounts under the official Business Manager of a Meta partner.',
  benefits: [
    'Stable account, minimal risk of random restrictions',
    'No daily spending limit — free to scale',
    'No VAT applied',
    'Can be used for all campaign types: Traffic, Leads, Conversions, Catalog, etc.',
    'Appeal support through a direct line to the Meta team',
    'Balance automatically transfers to a replacement account if disabled (terms & conditions apply)',
  ],
  requirements: [
    'Have an active personal Facebook account',
    'Have a Facebook Business Manager (BM)',
    'Fan Page / Instagram account must be at least 7 days old with existing posts',
    'Have a website with clear contact information (WhatsApp number / email)',
    'The advertised product / service does not violate Meta policies',
  ],
};

export const GOOGLE_WL_EN: WhitelistInfo = {
  key: 'google',
  title: 'Google Ads Whitelist',
  desc: 'Google Ads account officially managed by Tentaklik, a Google Partner agency.',
  benefits: [
    'Lower suspension risk compared to regular personal Google Ads accounts',
    'No maximum daily spending limit — suitable for large scale',
    'Faster appeal process as it is directly connected to a Google Partner',
    'Balance automatically transfers to a replacement account if disabled (terms & conditions apply)',
    'Technical support by the Tentaklik team, professionals in Google Ads policies',
  ],
  requirements: [
    'Have an active Gmail account',
    'Have a live website / landing page',
    'The advertised product / service does not violate Google Ads policies',
  ],
};

export const FLOW_META_EN: FlowStep[] = [
  { no: 1, tahap: 'Register dashboard account', aksi: 'Go to tentaklik.com and register an account with an active email' },
  { no: 2, tahap: 'Fill out request form', aksi: 'Enter: Meta BM ID, Fan Page link, landing page link, product/service type' },
  { no: 3, tahap: 'Data verification', aksi: 'The Tentaklik team verifies the BM ID and data completeness (max. 1–2 working hours)' },
  { no: 4, tahap: 'Account active', aksi: 'The whitelist ad account appears in the client\'s Business Manager — ready to use' },
  { no: 5, tahap: 'Top-up balance', aksi: 'Transfer to Tentaklik\'s bank / e-wallet + confirm via dashboard or WhatsApp' },
  { no: 6, tahap: 'Start advertising', aksi: 'Create campaigns in Ads Manager as usual using the active whitelist account' },
];

export const FLOW_GOOGLE_EN: FlowStep[] = [
  { no: 1, tahap: 'Register dashboard account', aksi: 'Go to tentaklik.com and register an account with an active Google email' },
  { no: 2, tahap: 'Fill out request form', aksi: 'Enter: Google Ads Customer ID (if available), website/landing page URL, business category' },
  { no: 3, tahap: 'MCC setup process', aksi: 'The Tentaklik team creates / links the account to the official MCC (estimated 1×24 working hours)' },
  { no: 4, tahap: 'Account active', aksi: 'The Google Ads account appears in the client\'s dashboard — ready for top-up' },
  { no: 5, tahap: 'Top-up balance', aksi: 'Transfer to Tentaklik\'s account + confirm — balance is credited within hours' },
  { no: 6, tahap: 'Start advertising', aksi: 'Create campaigns in Google Ads according to your business needs' },
];

export const TOPUP_METHODS_EN: TopupMethod[] = [
  { metode: 'Bank Transfer', cara: 'Transfer to Tentaklik\'s bank account → confirm via WhatsApp or dashboard with transfer receipt' },
  { metode: 'E-Wallet (GoPay / OVO / DANA)', cara: 'Transfer to e-wallet number → confirm via WhatsApp with receipt' },
  { metode: 'Direct Dashboard', cara: 'Login to Tentaklik dashboard → choose Topup menu → select method → follow instructions' },
];

export const SEWA_FAQS_EN: SewaFaq[] = [
  { q: 'Is the whitelist account 100% safe from bans?', a: 'No. No account is immune to bans if it violates platform policies. Whitelist accounts are much more resistant to random restrictions, but if the running ads violate Meta or Google TOS, the account can still be disabled. Tentaklik helps with the appeal process for cases not caused by user violations.' },
  { q: 'Can I have more than one whitelist account?', a: 'Yes. You can request more than one whitelist account according to your campaign needs.' },
  { q: 'What if my old account is already linked to another whitelist provider?', a: 'For Meta: You need to use a clean new BM. For Google: existing accounts can be linked to Tentaklik\'s MCC, but must be unlinked from the previous provider\'s MCC first.' },
  { q: 'Can I migrate campaigns from my old account to a Tentaklik whitelist account?', a: 'For Meta: Yes — campaigns already running in the old account can be moved to the whitelist account. For Google: existing accounts can be directly linked to Tentaklik\'s account.' },
  { q: 'Is there a contract or long-term commitment?', a: 'Yes. If the account is unused for a month, it will be automatically revoked, and the client will be notified in advance by CS.' },
  { q: 'Why is Tentaklik\'s top-up fee 4% while competitors have 3%?', a: 'Tentaklik positions its service at a slightly more premium level justified by: a free onboarding checklist, more personalized support (not a bot), and a specialized experience for NGO/foundation categories. Moreover, the main efficiency still comes from VAT savings, so clients still save compared to regular accounts.' },
  { q: 'Is Tentaklik suitable for social organizations or foundations?', a: 'Very suitable. Tentaklik has direct experience accompanying social institutions running donation campaigns. We understand the needs of social content that often gets false-positive restrictions, and whitelist accounts provide extra protection for sensitive campaigns.' },
  { q: 'How can I contact Tentaklik CS?', a: 'Tentaklik CS can be contacted via WhatsApp at the number listed on tentaklik.com. Operating hours: Monday–Sunday, 24 hours.' },
  { q: 'Is there an auto top-up feature?', a: 'Currently, top-ups are done manually with confirmation via dashboard or WhatsApp. An auto top-up feature is under development.' },
];

export const SEWA_SEO_EN = {
  title: 'Google & Meta Ads Whitelist Account Rental — Tentaklik',
  description: 'Rent Google Ads & Meta Ads (Facebook & Instagram) whitelist ad accounts at Tentaklik: no spending limit, no VAT, anti random ban, and automatic balance transfer if disabled. Top-up fees start at 3%.',
} as const;

export const SEWA_KEYWORDS_EN = [
  'rent ad account',
  'rent facebook ads account',
  'rent google ads account',
  'meta whitelist account',
  'google whitelist account',
  'rent meta ads account',
  'agency ads whitelist',
];

export const INDUSTRY_HEADING_EN = {
  title: 'Suitable for various industries',
  sub: 'Commonly used by advertisers in these industries:',
} as const;

export const INDUSTRIES_EN: Industry[] = [
  { label: 'Personal Care',   iconId: 'bottle', tint: '#E8F0FE' },
  { label: 'Adult Fashion',   iconId: 'shirt', tint: '#FCE7F3' },
  { label: 'Healthcare',      iconId: 'shield-cross', tint: '#E7F6EC' },
  { label: 'Beauty',          iconId: 'sparkles', tint: '#F3E8FF' },
  { label: 'Adult Products',  iconId: 'box', tint: '#FFF1E6' },
  { label: 'NGO / Social',    iconId: 'heart', tint: '#E6F4F7' },
];
