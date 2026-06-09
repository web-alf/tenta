# Sewa Akun Pivot + S&K Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reposisi penawaran iklan tentaklik.com dari managed-ads agency menjadi "Sewa Akun" (rental akun iklan whitelist Google & Meta), tambah materi S&K Sewa Akun ke /terms, dan sinkronkan nav/beranda/footer — tanpa menghapus page Google Ads & Meta Ads lama (cuma di-hide dari navigasi).

**Architecture:** Astro 6 static site. Halaman `/services/sewa-akun` adalah page standalone baru (BUKAN lewat `[slug].astro` content-collection) karena konten kaya (2 sub-layanan + 3 tabel alur). Konten dipisah ke `src/data/sewa-akun.ts` (pola sama `site.ts`/`terms-sections.ts`). Komponen existing di-reuse: `ServiceHero`, `PricingSection`, `ServiceFAQ`, `ServiceCTA`. Markup baru hanya untuk detail whitelist + tabel alur. S&K = append 3 section ke array `TERMS_SECTIONS`. Nav/grid/footer = edit array data.

**Tech Stack:** Astro 6, Tailwind v4 (via global CSS classes, sebagian besar styling sudah ada di `components.css`), TypeScript, content collections (`astro:content`), Cloudflare adapter, bun.

**Verifikasi pengganti unit test:** Project tidak punya test runner. "Test" tiap task = `bun run check` (astro check — type+content validation) dan/atau `grep` assertion + (sekali di akhir) `bun run build`. Jalankan `bun run check` setelah tiap perubahan kode untuk menangkap type error sedini mungkin.

---

## File Structure

| File | Aksi | Tanggung jawab |
|------|------|----------------|
| `src/data/sewa-akun.ts` | **Create** | Semua konten Sewa Akun (hero, whitelist detail, plans, flow, topup, faqs, seo) — single source of truth |
| `src/pages/services/sewa-akun.astro` | **Create** | Compose page dari data + komponen reuse + section baru |
| `src/components/icons/ServiceIcon.astro` | Modify | Tambah tipe ikon `shield` untuk Sewa Akun |
| `src/components/layout/Header.astro` | Modify | Dropdown layanan 3 item, nav Karir→S&K |
| `src/layouts/BaseLayout.astro` | Modify | Tambah `'snk'` ke union `active` |
| `src/components/sections/ServicesGrid.astro` | Modify | Beranda: 4→3 kartu, ganti Google+Meta jadi Sewa Akun |
| `src/components/layout/Footer.astro` | Modify | Kolom Layanan + link S&K |
| `src/data/terms-sections.ts` | Modify | +3 section S&K Sewa Akun, update lastUpdated |

Page lama `/services/google-ads` & `/services/meta-ads` + file `.md`-nya **tidak disentuh** (tetap live, tetap di sitemap & JSON-LD beranda).

---

## Task 1: Buat data konten Sewa Akun

**Files:**
- Create: `src/data/sewa-akun.ts`

Konten verbatim/poles-ringan dari Google Doc tab "sewa akun 9/6/26". Tipe `Plan` cocok dengan `PricingSection.astro` props (`name, tagline, price, unit, featured?, features[]`).

- [ ] **Step 1: Tulis file data lengkap**

```typescript
// src/data/sewa-akun.ts
// Konten layanan "Sewa Akun" — rental akun iklan whitelist Google & Meta.
// Single source of truth untuk halaman /services/sewa-akun.

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

// Struktur harga — model rental: fee topup 4%, value-props utama.
// Google Whitelist = featured (sesuai keputusan brainstorming).
export const SEWA_PLANS: SewaPlan[] = [
  {
    name: 'Meta Whitelist',
    tagline: 'Facebook & Instagram Ads, anti random restrict',
    price: '4%',
    unit: 'fee topup',
    features: [
      'Akun whitelist Business Manager resmi',
      'Tanpa PPN',
      'Tanpa limit spending harian',
      'Saldo pindah otomatis jika disable*',
      'Support appeal jalur partner Meta',
    ],
  },
  {
    name: 'Google Whitelist',
    tagline: 'Akun Google Ads kelola Google Partner',
    price: '4%',
    unit: 'fee topup',
    featured: true,
    features: [
      'Akun terhubung MCC resmi Google Partner',
      'Tanpa PPN',
      'Tanpa batas spending harian',
      'Saldo pindah otomatis jika disable*',
      'Appeal lebih cepat via Google Partner',
    ],
  },
  {
    name: 'Custom',
    tagline: 'Untuk volume besar / multi-akun',
    price: 'Nego',
    unit: 'volume besar',
    features: [
      'Multi-akun Meta & Google',
      'Onboarding checklist gratis',
      'Support personal (bukan bot)',
      'Cocok untuk NGO / yayasan',
      'Skema fee menyesuaikan volume',
    ],
  },
];

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
  description: 'Sewa akun iklan whitelist Google Ads & Meta Ads (Facebook & Instagram) di Tentaklik: tanpa limit spending, tanpa PPN, anti random banned, dan saldo pindah otomatis jika disable. Fee topup hanya 4%.',
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
```

- [ ] **Step 2: Verifikasi type-check lulus**

Run: `bun run check`
Expected: PASS — 0 errors (file baru tidak diimpor siapa pun belum, jadi minimal harus parse + type valid).

- [ ] **Step 3: Commit**

```bash
git add src/data/sewa-akun.ts
git commit -m "feat: add sewa-akun content data"
```

---

## Task 2: Tambah ikon `shield` ke ServiceIcon

**Files:**
- Modify: `src/components/icons/ServiceIcon.astro`

- [ ] **Step 1: Edit union type + tambah branch SVG**

Ganti baris `type: 'code' | 'google' | 'meta' | 'lightbulb';` menjadi:

```astro
  type: 'code' | 'google' | 'meta' | 'lightbulb' | 'shield';
```

Lalu tambahkan branch baru SEBELUM baris penutup file (setelah branch `lightbulb`):

```astro
{type === 'shield' && (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
)}
```

- [ ] **Step 2: Verifikasi**

Run: `bun run check`
Expected: PASS — 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/icons/ServiceIcon.astro
git commit -m "feat: add shield icon variant to ServiceIcon"
```

---

## Task 3: Tambah `'snk'` ke union `active` (BaseLayout)

**Files:**
- Modify: `src/layouts/BaseLayout.astro:19`

Header & BaseLayout punya union `active`. Karena `karir.astro` masih pakai `active="karir"`, kita **tambah** `'snk'` (tidak hapus `'karir'`).

- [ ] **Step 1: Edit union di BaseLayout Props**

Ganti baris 19:

```astro
  active?: 'beranda' | 'layanan' | 'case' | 'tentang' | 'karir' | 'faq' | 'kontak';
```

menjadi:

```astro
  active?: 'beranda' | 'layanan' | 'case' | 'tentang' | 'karir' | 'snk' | 'faq' | 'kontak';
```

- [ ] **Step 2: Verifikasi**

Run: `bun run check`
Expected: PASS — 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/layouts/BaseLayout.astro
git commit -m "feat: add snk to active nav union"
```

---

## Task 4: Update navigasi Header (dropdown 3 item + Karir→S&K)

**Files:**
- Modify: `src/components/layout/Header.astro:5-23`

Drawer mobile sudah embedded di Header dan render dari array `services`+`links` yang sama — jadi cukup edit dua array + union Props.

- [ ] **Step 1: Edit `Props.active` union (baris 6)**

Ganti:
```astro
  active?: 'beranda' | 'layanan' | 'case' | 'tentang' | 'karir' | 'faq' | 'kontak';
```
menjadi:
```astro
  active?: 'beranda' | 'layanan' | 'case' | 'tentang' | 'karir' | 'snk' | 'faq' | 'kontak';
```

- [ ] **Step 2: Edit array `services` (baris 10-15)**

Ganti seluruh blok menjadi (hapus Google Ads & Meta Ads, tambah Sewa Akun):

```astro
const services = [
  { label: 'Website Development',          href: '/services/website',     icon: 'code' as const },
  { label: 'Sewa Akun',                    href: '/services/sewa-akun',   icon: 'shield' as const },
  { label: 'Konsultasi Digital Marketing', href: '/services/konsultasi',  icon: 'lightbulb' as const },
];
```

- [ ] **Step 3: Edit array `links` (baris 17-23)** — ganti entry Karir jadi S&K

```astro
const links = [
  { id: 'beranda', label: 'Beranda',      href: '/' },
  { id: 'case',    label: 'Case Study',   href: '/case-study' },
  { id: 'tentang', label: 'Tentang Kami', href: '/tentang' },
  { id: 'snk',     label: 'S&K',          href: '/terms' },
  { id: 'kontak',  label: 'Kontak',       href: '/kontak' },
];
```

- [ ] **Step 4: Verifikasi type + isi nav**

Run: `bun run check`
Expected: PASS — 0 errors.

Run: `grep -n "Sewa Akun\|/services/sewa-akun\|'S&K'\|'shield'" src/components/layout/Header.astro`
Expected: menampilkan baris Sewa Akun (label+href+icon shield) dan S&K. TIDAK ada lagi `google-ads` / `meta-ads` di file ini:

Run: `grep -c "google-ads\|meta-ads" src/components/layout/Header.astro`
Expected: `0`

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/Header.astro
git commit -m "feat: restructure nav — Sewa Akun submenu, Karir to S&K"
```

---

## Task 5: Buat halaman /services/sewa-akun

**Files:**
- Create: `src/pages/services/sewa-akun.astro`

Reuse `ServiceHero` (hero), `PricingSection` (#pricing), `ServiceFAQ` (FAQ), `ServiceCTA`. Section baru: 2 blok whitelist detail + 3 tabel alur. Catatan penting: `serviceJsonLd` punya `parsePriceToIdr` yang akan keliru mem-parse `"4%"`. Karena itu **JANGAN** kirim `plans` ke `serviceJsonLd` di sini.

- [ ] **Step 1: Tulis page lengkap**

```astro
---
import BaseLayout from '@layouts/BaseLayout.astro';
import ServiceHero from '@components/sections/service/ServiceHero.astro';
import PricingSection from '@components/sections/service/PricingSection.astro';
import ServiceFAQ from '@components/sections/service/ServiceFAQ.astro';
import ServiceCTA from '@components/sections/service/ServiceCTA.astro';
import Check from '@components/icons/Check.astro';
import { serviceJsonLd, faqJsonLd, breadcrumbJsonLd } from '@lib/seo';
import { site } from '@data/site';
import {
  SEWA_HERO, META_WL, GOOGLE_WL, SEWA_PLANS,
  FLOW_META, FLOW_GOOGLE, TOPUP_METHODS, SEWA_FAQS, SEWA_SEO, SEWA_KEYWORDS,
  type WhitelistInfo, type FlowStep,
} from '@data/sewa-akun';

const url = `${site.url}/services/sewa-akun`;
const wlBlocks: WhitelistInfo[] = [META_WL, GOOGLE_WL];

const jsonLd = [
  serviceJsonLd({
    name: SEWA_SEO.title,
    description: SEWA_SEO.description,
    url,
    serviceType: 'Sewa Akun Ads Whitelist',
  }),
  faqJsonLd(SEWA_FAQS),
  breadcrumbJsonLd([
    { name: 'Beranda', url: site.url },
    { name: 'Layanan', url: `${site.url}/#layanan` },
    { name: 'Sewa Akun', url },
  ]),
];
---
<BaseLayout
  title={SEWA_SEO.title}
  description={SEWA_SEO.description}
  active="layanan"
  jsonLd={jsonLd}
  keywords={SEWA_KEYWORDS}
>
  <ServiceHero
    eyebrow={SEWA_HERO.eyebrow}
    title={SEWA_HERO.title}
    titleAccent={SEWA_HERO.titleAccent}
    desc={SEWA_HERO.desc}
  >
    <div slot="illustration" class="kraken-float" style="width:100%;max-width:480px;margin:0 auto;filter:drop-shadow(0 24px 48px rgba(255,107,26,0.18));">
      <picture>
        <source type="image/avif" srcset="/assets/kraken-hero-400.avif 400w, /assets/kraken-hero-560.avif 560w, /assets/kraken-hero-800.avif 800w" sizes="(max-width: 760px) min(480px, 95vw), 480px" />
        <source type="image/webp" srcset="/assets/kraken-hero-400.webp 400w, /assets/kraken-hero-560.webp 560w, /assets/kraken-hero-800.webp 800w" sizes="(max-width: 760px) min(480px, 95vw), 480px" />
        <img src="/assets/kraken-hero.png" alt="Tentaklik Sewa Akun Whitelist" width="1200" height="960" loading="eager" fetchpriority="high" decoding="async" style="width:100%;height:auto;display:block;" />
      </picture>
    </div>
  </ServiceHero>

  <!-- Layanan whitelist: Meta + Google -->
  <section>
    <div class="container">
      <h2 class="section-title">Layanan yang Tersedia</h2>
      <p class="section-sub" style="margin-bottom:48px;">Dua jalur akun premium — pilih sesuai platform iklan Anda.</p>
      <div class="wl-grid">
        {wlBlocks.map((wl) => (
          <article class="wl-card reveal">
            <h3 class="wl-title">{wl.title}</h3>
            <p class="wl-desc">{wl.desc}</p>
            <div class="wl-cols">
              <div>
                <h4 class="wl-sub">Keunggulan</h4>
                <ul class="wl-benefits">
                  {wl.benefits.map((b) => (
                    <li><span class="wl-check" aria-hidden="true"><Check size={12} /></span>{b}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 class="wl-sub">Syarat Mendaftar</h4>
                <ol class="wl-reqs">
                  {wl.requirements.map((r) => (<li>{r}</li>))}
                </ol>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>

  <PricingSection plans={SEWA_PLANS} service="Sewa Akun" />

  <!-- Alur pendaftaran + topup -->
  <section style="background:var(--bg-warm);">
    <div class="container">
      <h2 class="section-title">Cara Kerja & Alur Pendaftaran</h2>
      <p class="section-sub" style="margin-bottom:40px;">Dari daftar sampai mulai beriklan — transparan dan cepat.</p>

      <div class="flow-block">
        <h3 class="flow-title">Alur Meta Ads Whitelist</h3>
        <div class="flow-table-wrap">
          <table class="flow-table">
            <thead><tr><th style="width:48px;">#</th><th style="width:30%;">Tahap</th><th>Yang Perlu Dilakukan</th></tr></thead>
            <tbody>
              {FLOW_META.map((s: FlowStep) => (
                <tr><td class="flow-no">{s.no}</td><td class="flow-tahap">{s.tahap}</td><td>{s.aksi}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div class="flow-block">
        <h3 class="flow-title">Alur Google Ads Whitelist</h3>
        <div class="flow-table-wrap">
          <table class="flow-table">
            <thead><tr><th style="width:48px;">#</th><th style="width:30%;">Tahap</th><th>Yang Perlu Dilakukan</th></tr></thead>
            <tbody>
              {FLOW_GOOGLE.map((s: FlowStep) => (
                <tr><td class="flow-no">{s.no}</td><td class="flow-tahap">{s.tahap}</td><td>{s.aksi}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div class="flow-block">
        <h3 class="flow-title">Cara Topup Saldo</h3>
        <div class="flow-table-wrap">
          <table class="flow-table">
            <thead><tr><th style="width:34%;">Metode</th><th>Cara</th></tr></thead>
            <tbody>
              {TOPUP_METHODS.map((m) => (
                <tr><td class="flow-tahap">{m.metode}</td><td>{m.cara}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p class="flow-note">⚡ Saldo aktif dalam <strong>15–60 menit</strong> setelah konfirmasi diterima. Topup bisa kapan saja — 24 jam, termasuk weekend.</p>
      </div>
    </div>
  </section>

  <ServiceFAQ items={SEWA_FAQS} />
  <ServiceCTA />
</BaseLayout>

<style>
  /* Whitelist cards */
  .wl-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  .wl-card {
    background: white;
    border: 1px solid var(--ink-100);
    border-radius: var(--radius-xl);
    padding: 28px;
  }
  .wl-title { font-size: 22px; margin-bottom: 8px; }
  .wl-desc { font-size: 14.5px; color: var(--ink-500); margin-bottom: 22px; line-height: 1.6; }
  .wl-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  .wl-sub {
    font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--orange-700); margin-bottom: 12px;
  }
  .wl-benefits { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
  .wl-benefits li { display: flex; gap: 10px; align-items: flex-start; font-size: 14px; color: var(--ink-700); line-height: 1.5; }
  .wl-check {
    width: 18px; height: 18px; border-radius: 999px;
    background: var(--orange-100); color: var(--orange-700);
    display: inline-flex; align-items: center; justify-content: center;
    flex-shrink: 0; margin-top: 1px;
  }
  .wl-reqs { margin: 0; padding-left: 20px; display: flex; flex-direction: column; gap: 10px; }
  .wl-reqs li { font-size: 14px; color: var(--ink-700); line-height: 1.5; }
  .wl-reqs li::marker { color: var(--orange-500); font-weight: 700; }

  /* Flow tables */
  .flow-block { margin-bottom: 36px; }
  .flow-block:last-of-type { margin-bottom: 0; }
  .flow-title { font-size: 19px; margin-bottom: 16px; color: var(--ink-900); }
  .flow-table-wrap { overflow-x: auto; border-radius: var(--radius-lg); border: 1px solid var(--ink-100); background: white; }
  .flow-table { width: 100%; border-collapse: collapse; min-width: 540px; }
  .flow-table th {
    text-align: left; font-size: 12px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
    color: var(--ink-500); padding: 14px 18px; background: var(--bg-warm); border-bottom: 1px solid var(--ink-100);
  }
  .flow-table td { padding: 14px 18px; font-size: 14px; color: var(--ink-700); border-bottom: 1px solid var(--ink-100); vertical-align: top; line-height: 1.5; }
  .flow-table tbody tr:last-child td { border-bottom: none; }
  .flow-no {
    font-family: 'Plus Jakarta Sans Variable', 'Plus Jakarta Sans', sans-serif;
    font-weight: 800; color: var(--orange-600);
  }
  .flow-tahap { font-weight: 600; color: var(--ink-900); }
  .flow-note {
    margin-top: 16px; padding: 14px 18px;
    background: var(--orange-50); border: 1px solid var(--orange-200); border-radius: var(--radius-lg);
    font-size: 14px; color: var(--ink-700);
  }
  .flow-note strong { color: var(--ink-900); }

  @media (max-width: 900px) {
    .wl-grid { grid-template-columns: 1fr; }
  }
  @media (max-width: 560px) {
    .wl-cols { grid-template-columns: 1fr; gap: 18px; }
    .wl-card { padding: 22px; }
  }
</style>
```

- [ ] **Step 2: Verifikasi type + content**

Run: `bun run check`
Expected: PASS — 0 errors. (Memastikan import data, tipe `WhitelistInfo`/`FlowStep`, props komponen valid.)

- [ ] **Step 3: Commit**

```bash
git add src/pages/services/sewa-akun.astro
git commit -m "feat: add /services/sewa-akun page"
```

---

## Task 6: Sinkronkan ServicesGrid beranda (4→3 kartu)

**Files:**
- Modify: `src/components/sections/ServicesGrid.astro`

Hapus kartu Google Ads & Meta Ads dari beranda, ganti satu kartu "Sewa Akun". Grid `repeat(4,1fr)` → `repeat(3,1fr)`.

- [ ] **Step 1: Edit array `services` (baris 4-9)**

```astro
const services = [
  { title: 'Website Development',           desc: 'Landing page, company profile, dan website yang fokus pada konversi.', slug: 'website',     icon: 'web' },
  { title: 'Sewa Akun',                     desc: 'Akun iklan whitelist Google & Meta — limit tanpa batas, tanpa PPN, anti random banned.', slug: 'sewa-akun', icon: 'shield' },
  { title: 'Konsultasi Digital Marketing',  desc: 'Audit funnel, strategi channel, dan rekomendasi prioritas yang actionable.', slug: 'konsultasi', icon: 'konsul' },
] as const;
```

- [ ] **Step 2: Edit grid columns (baris 19)**

Ganti:
```astro
    <div style="display:grid;grid-template-columns:repeat(4, 1fr);gap:20px;">
```
menjadi:
```astro
    <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:20px;">
```

- [ ] **Step 3: Tambah branch render ikon `shield`** — di dalam `.service-icon`, setelah blok `{s.icon === 'web' && (...)}` dan sebelum/sesudah blok lain, tambahkan (hapus blok `google` & `meta` boleh, tapi TIDAK wajib karena array sudah tak memuatnya — biarkan untuk minim diff; cukup TAMBAH blok shield):

```astro
            {s.icon === 'shield' && (
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--orange-500)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <path d="m9 12 2 2 4-4"/>
              </svg>
            )}
```

- [ ] **Step 4: Verifikasi**

Run: `bun run check`
Expected: PASS — 0 errors.

Run: `grep -c "google-ads\|meta-ads\|'google'\|'meta'" src/components/sections/ServicesGrid.astro`
Expected: konteks — array `services` tidak lagi memuat slug `google-ads`/`meta-ads`. (Blok SVG `google`/`meta` yang tersisa hanya dead-branch yang tak ter-render; boleh dibiarkan. Yang penting: tidak ada lagi kartu yang link ke `/services/google-ads` atau `/services/meta-ads`.)

Run: `grep -n "sewa-akun\|repeat(3, 1fr)" src/components/sections/ServicesGrid.astro`
Expected: menampilkan slug sewa-akun + grid 3 kolom.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/ServicesGrid.astro
git commit -m "feat: homepage services grid — Sewa Akun replaces Google/Meta cards"
```

---

## Task 7: Update Footer (link Layanan + S&K)

**Files:**
- Modify: `src/components/layout/Footer.astro:21-37`

- [ ] **Step 1: Edit kolom "Layanan" (baris 22-27)** — hapus Google & Meta, tambah Sewa Akun

```astro
      <ul>
        <li><a href="/services/website">Website Development</a></li>
        <li><a href="/services/sewa-akun">Sewa Akun</a></li>
        <li><a href="/services/konsultasi">Konsultasi Digital Marketing</a></li>
      </ul>
```

- [ ] **Step 2: Edit kolom "Mengenai" (baris 31-36)** — ganti Karir jadi S&K

```astro
      <ul>
        <li><a href="/tentang">Tentang Kami</a></li>
        <li><a href="/case-study">Case Study</a></li>
        <li><a href="/#faq">FAQ</a></li>
        <li><a href="/terms">S&K</a></li>
      </ul>
```

- [ ] **Step 3: Verifikasi**

Run: `grep -c "/services/google-ads\|/services/meta-ads" src/components/layout/Footer.astro`
Expected: `0`

Run: `grep -n "sewa-akun\|>S&K<" src/components/layout/Footer.astro`
Expected: menampilkan link Sewa Akun + S&K.

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/Footer.astro
git commit -m "feat: footer — Sewa Akun link + S&K"
```

---

## Task 8: Tambah 3 section S&K Sewa Akun ke /terms

**Files:**
- Modify: `src/data/terms-sections.ts`

- [ ] **Step 1: Update `lastUpdated` (baris 7)**

Ganti:
```typescript
  lastUpdated: '2026-05-05',
```
menjadi:
```typescript
  lastUpdated: '2026-06-09',
```

- [ ] **Step 2: Append 3 section baru** — sebelum `];` penutup array `TERMS_SECTIONS` (setelah section `kontak` num 14), tambahkan:

```typescript
  {
    id: 'sewa-syarat-umum',
    num: '15',
    title: 'Syarat Umum Layanan Sewa Akun',
    contentHtml: `<p>Ketentuan berikut berlaku khusus untuk layanan <strong>Sewa Akun</strong> (akun iklan whitelist Google & Meta):</p>
              <ul>
                <li>Klien wajib memiliki Business Manager Meta atau akun Google yang aktif dan valid.</li>
                <li>Klien tidak boleh menggunakan akun whitelist untuk mengiklankan produk/jasa yang dilarang oleh platform.</li>
                <li>Satu klien, satu Business Manager ID — tidak boleh menggunakan BM yang sudah pernah terhubung ke whitelist provider lain.</li>
                <li>Klien wajib mengikuti seluruh kebijakan iklan Meta dan Google yang berlaku.</li>
                <li>Tentaklik berhak menonaktifkan layanan tanpa pengembalian saldo jika terbukti ada pelanggaran berat yang disengaja.</li>
              </ul>`,
  },
  {
    id: 'sewa-produk-dilarang',
    num: '16',
    title: 'Produk / Layanan yang Tidak Bisa Diiklankan',
    contentHtml: `<p>Berikut kategori yang tidak dapat menggunakan layanan Sewa Akun Tentaklik:</p>
              <ul>
                <li>Produk ilegal atau semi-legal (narkotika, obat keras tanpa resep, dll)</li>
                <li>Judi online / permainan uang yang tidak berlisensi resmi</li>
                <li>Penipuan investasi atau skema Ponzi</li>
                <li>Konten dewasa / pornografi</li>
                <li>Produk palsu atau pembajakan</li>
                <li>Senjata api, amunisi, atau bahan berbahaya</li>
                <li>Layanan hacking / phishing / penyerangan siber</li>
                <li>Konten yang menyebarkan ujaran kebencian atau disinformasi</li>
              </ul>
              <div class="callout callout-warn"><strong>Catatan:</strong> Daftar ini mengikuti kebijakan resmi Meta dan Google. Jika ragu, konsultasikan jenis produk Anda ke CS Tentaklik sebelum mendaftar.</div>`,
  },
  {
    id: 'sewa-produk-verifikasi',
    num: '17',
    title: 'Produk / Layanan yang Perlu Verifikasi Tambahan',
    contentHtml: `<p>Kategori berikut tetap bisa diiklankan, namun memerlukan dokumen / verifikasi tambahan sebelum akun diaktifkan:</p>
              <ul>
                <li>Suplemen kesehatan dan obat-obatan (butuh izin edar BPOM)</li>
                <li>Layanan keuangan / investasi (butuh izin OJK)</li>
                <li>Produk rokok / vape (terbatas dan ada syarat khusus)</li>
                <li>Layanan pinjaman uang (butuh izin resmi)</li>
                <li>Konten yang menyangkut isu politik atau sosial sensitif</li>
              </ul>`,
  },
```

- [ ] **Step 3: Verifikasi**

Run: `bun run check`
Expected: PASS — 0 errors.

Run: `grep -c "sewa-syarat-umum\|sewa-produk-dilarang\|sewa-produk-verifikasi" src/data/terms-sections.ts`
Expected: `3`

- [ ] **Step 4: Commit**

```bash
git add src/data/terms-sections.ts
git commit -m "feat: add Sewa Akun terms sections to /terms"
```

---

## Task 9: Build penuh + verifikasi rute akhir

**Files:** none (verifikasi end-to-end)

- [ ] **Step 1: Build penuh**

Run: `bun run build`
Expected: build sukses (astro check + astro build), 0 error.

- [ ] **Step 2: Verifikasi rute ter-generate**

Run: `ls dist/services/`
Expected: ada `sewa-akun/` (atau `sewa-akun.html`), DAN `google-ads/` + `meta-ads/` MASIH ada (page lama tidak dihapus).

Run: `test -f dist/sitemap-index.xml && echo sitemap-ok`
Expected: `sitemap-ok`

- [ ] **Step 3: Verifikasi konten halaman baru ter-render**

Run: `grep -rl "Meta Ads Whitelist\|Alur Google Ads Whitelist\|fee topup" dist/services/sewa-akun* 2>/dev/null | head` (path sesuai output Step 2)
Expected: file HTML sewa-akun memuat string-string itu.

Run: `grep -l "Syarat Umum Layanan Sewa Akun\|Produk / Layanan yang Tidak Bisa Diiklankan" dist/terms*` (sesuaikan path: `dist/terms.html` atau `dist/terms/index.html`)
Expected: file terms memuat 2 judul section baru.

- [ ] **Step 4: Verifikasi link lama tidak diputus (hide ≠ hapus)**

Run: `grep -rc "/services/google-ads" dist/services/google-ads* 2>/dev/null; echo "---"; grep -rl "/services/sewa-akun" dist/index.html`
Expected: page google-ads tetap ada; `dist/index.html` (beranda) memuat link ke `/services/sewa-akun`.

- [ ] **Step 5: Commit (jika ada artefak/lockfile berubah)**

Hanya jika `git status` menunjukkan perubahan source (bukan `dist/`):
```bash
git add -A
git commit -m "chore: sewa-akun pivot build verification" || echo "nothing to commit"
```

(Catatan: `dist/` biasanya di-`.gitignore`. Jangan commit `dist/`.)

---

## Self-Review Notes (penulis plan)

- **Spec coverage:** Nav (T4), page sewa-akun 1-halaman (T5), pricing kartu 4% (T1+T5), 2 whitelist detail (T5), flow tables + topup (T5), 9 FAQ (T1+T5), S&K gabung /terms (T8), beranda+footer sinkron (T6,T7), hide bukan hapus google/meta (T9 verifikasi), icon shield (T2), active union snk (T3). ✅ semua tercakup.
- **Type consistency:** `WhitelistInfo`/`FlowStep`/`SewaPlan` didefinisikan di T1, dipakai di T5. `SEWA_PLANS` shape == `PricingSection` Props `Plan`. `active="snk"` ditambah di T3 (BaseLayout) & T4 (Header).
- **Risiko `serviceJsonLd` + "4%":** dihindari dengan TIDAK mengirim `plans` ke `serviceJsonLd` (T5 Step 1 — hanya name/desc/url/serviceType).
- **`Check` prop:** terverifikasi — `Check.astro` menerima `size?: number` (default 16). CSS tokens (`--bg-warm`, `--radius-*`, oranges) terverifikasi ada di `tokens.css`.
- **Karir:** halaman `/karir` & `jobs.json` tetap utuh; hanya lepas dari nav (T4) & footer (T7). Tidak ada task hapus.
