# Design: Pivot "Sewa Akun" + S&K (tentaklik.com)

**Date:** 2026-06-09
**Source:** Google Doc — tab "sewa akun 9/6/26" + tab "s&k 9/6/26"
**Stack:** Astro 6 (static), Tailwind v4, Cloudflare adapter. Content via `astro:content` collections + typed `src/data/*.ts`.

## Goal

Reposisi penawaran iklan dari **managed-ads agency** (kelola Google/Meta Ads klien) menjadi **Sewa Akun** — rental akun iklan whitelist Google & Meta. Plus tambah materi Syarat & Ketentuan (S&K) khusus layanan sewa akun.

Konstrain dari user: *"jangan terlalu banyak perubahan dari docs"*; copywriting boleh dipoles ringan asal konteks sama; **page Google Ads & Meta Ads lama jangan dihapus — cukup di-hide** (route tetap hidup, lepas dari nav/grid/footer).

## Keputusan terkunci (dari user)

| # | Topik | Keputusan |
|---|-------|-----------|
| 1 | Page model Sewa Akun | **1 halaman** `/services/sewa-akun` (bukan 2 terpisah) |
| 2 | Tampilan harga | **Tetap 3 kartu paket** (Meta WL / Google WL / Custom), semua fee topup 4% |
| 3 | S&K | **Gabung ke `/terms`** (tambah 3 section), nav "Karir"→"S&K"→`/terms` |
| 4 | Scope beranda | **Sinkronkan link + minim copy** (ServicesGrid & footer; hero dibiarkan) |
| 5 | Google/Meta page lama | **Hide, bukan hapus** — lepas dari nav/grid/footer, route & .md tetap |

### Default penulis (di luar 5 di atas — flag saat review)
- **(a) Icon Sewa Akun:** tambah tipe `shield` ke `ServiceIcon.astro` (lambang aman/anti-banned).
- **(b) Kartu featured:** **Google Whitelist**.
- **(c) Sitemap/SEO page lama:** route google-ads & meta-ads **tetap di sitemap & JSON-LD beranda** (honors "jangan dihapus"). Hanya link internal/nav yang dilepas. Tidak di-`noindex`.

## Arsitektur perubahan

### A. Navigasi — `src/components/layout/Header.astro`
`services` array (dropdown) jadi 3 item:
```
Website Development        /services/website     icon: code
Sewa Akun                  /services/sewa-akun   icon: shield   ← BARU
Konsultasi Digital Marketing /services/konsultasi icon: lightbulb
```
(hapus entry Google Ads & Meta Ads dari array — route tetap hidup).

`links` array: ganti `{ id:'karir', label:'Karir', href:'/karir' }` → `{ id:'snk', label:'S&K', href:'/terms' }`.

`Props.active` union: ganti `'karir'` → `'snk'`. (drawer mobile pakai `services`+`links` yang sama — otomatis ikut; verifikasi MobileDrawer tidak hardcode item.)

### B. Halaman baru — `src/pages/services/sewa-akun.astro` (standalone)
Tidak lewat `[slug].astro` (konten terlalu kaya: 2 sub-layanan + syarat + 2 tabel alur + topup). Pakai `BaseLayout` langsung, `active="layanan"`. Reuse pola styling existing (`.eyebrow`, `.section-title`, `.btn`, `.pricing-card`, `.faq-item`, `.cta-banner`). Konten dari `src/data/sewa-akun.ts`.

Urutan section:
1. **Hero** — headline "Iklan Jalan Terus, Tanpa Drama Akun Kena Banned"; sub = teks doc penjelasan ("Sewa Akun Whitelist Google & Meta Premium…"). CTA: "Lihat Paket" (#pricing) + "Konsultasi via WhatsApp" (waLink). Ilustrasi: reuse kraken-hero (float anim, pola ServiceLayout).
2. **Meta Ads Whitelist** — deskripsi + Keunggulan (6 item) + Syarat Mendaftar (5 item). Layout 2 kolom (keunggulan check-list + syarat numbered).
3. **Google Ads Whitelist** — deskripsi + Keunggulan (5) + Syarat (3). Layout sama.
4. **Struktur Harga** (`#pricing`) — 3 kartu `pricing-card`: Meta Whitelist, **Google Whitelist (featured)**, Custom. Tiap kartu: price `4%`, unit `fee topup`, list value-props (Tanpa PPN, Tanpa limit spending, Saldo pindah otomatis, Support appeal partner). CTA "Konsultasi" → waLink per paket. Tambah sub-note: "Custom = nego untuk volume besar / multi-akun".
5. **Alur Pendaftaran & Topup** — 3 tabel:
   - Alur Meta Ads Whitelist (6 step: Daftar dashboard → Isi formulir → Verifikasi data → Akun aktif → Topup → Mulai beriklan).
   - Alur Google Ads Whitelist (6 step: Daftar → Formulir → Setup MCC → Akun aktif → Topup → Mulai).
   - Cara Topup (3 metode: Transfer Bank / E-Wallet / Dashboard).
   - Badge: "Saldo aktif dalam 15–60 menit setelah konfirmasi. Topup 24 jam termasuk weekend."
   - Tabel = komponen inline (responsive: stack di mobile, atau horizontal-scroll wrapper).
6. **FAQ** (`#faq`) — 9 Q&A dari doc. Reuse markup `.faq-item` (details/summary). `faqJsonLd(faqs)`.
7. **CTA** — reuse `ServiceCTA.astro`.

**SEO/JSON-LD:** `serviceJsonLd` (name "Sewa Akun Whitelist Google & Meta — Tentaklik", serviceType "Sewa Akun Ads Whitelist", plans), `faqJsonLd`, `breadcrumbJsonLd([Beranda, Layanan(#layanan), Sewa Akun])`. SEO title/desc baru. Keywords: sewa akun iklan, sewa akun facebook ads, sewa akun google ads, akun whitelist meta, akun whitelist google, agency ads whitelist.

### C. Data — `src/data/sewa-akun.ts` (typed `as const` + interfaces)
Export:
- `SEWA_HERO` { eyebrow, title, titleAccent, desc }
- `META_WL` { title, desc, benefits: string[], requirements: string[] }
- `GOOGLE_WL` { title, desc, benefits, requirements }
- `SEWA_PLANS` Plan[] (reuse shape PricingSection: name, tagline, price, unit, featured?, features[])
- `FLOW_META` Step[] { no, tahap, aksi }
- `FLOW_GOOGLE` Step[]
- `TOPUP_METHODS` { metode, cara }[]
- `SEWA_FAQS` { q, a }[] (9)
- `SEWA_SEO` { title, description }

Semua teks verbatim/poles ringan dari doc. waLink helper dari `@data/site`.

### D. S&K — `src/data/terms-sections.ts`
- `TERMS_HERO.lastUpdated` → `'2026-06-09'`.
- Append 3 section ke `TERMS_SECTIONS`:
  - `15 — Syarat Umum Sewa Akun` (`id: 'sewa-syarat-umum'`): 5 poin (tab 2 §7.1).
  - `16 — Produk yang Tidak Bisa Diiklankan` (`id: 'sewa-produk-dilarang'`): 8 kategori (`<ul>`) + callout-warn catatan "ikuti kebijakan resmi Meta & Google; ragu → konsultasi CS".
  - `17 — Produk yang Perlu Verifikasi Tambahan` (`id: 'sewa-produk-verifikasi'`): 5 poin (suplemen/BPOM, keuangan/OJK, rokok/vape, pinjaman, politik/sosial sensitif).
- `/terms.astro` tidak berubah (auto-render dari array; TOC ikut). `breadcrumbJsonLd` tetap.

### E. Beranda + Footer (sinkron link, minim copy)
- `src/components/sections/ServicesGrid.astro`: array `services` 4→**3** (Website, Sewa Akun, Konsultasi). Hapus kartu Google & Meta. Kartu Sewa Akun: icon shield (inline SVG konsisten gaya kartu lain), desc dari doc ("Akun iklan whitelist Google & Meta — limit tanpa batas, tanpa PPN, anti random banned."), link `/services/sewa-akun`. Grid `repeat(4,1fr)`→`repeat(3,1fr)` (cek responsive).
- `src/components/layout/Footer.astro`: kolom "Layanan" → Website / **Sewa Akun** / Konsultasi (hapus Google & Meta li). Kolom "Mengenai": `Karir`(`/karir`) → **`S&K`**(`/terms`).
- Hero & copy beranda lain: **tidak diubah**.

### F. ServiceIcon — `src/components/icons/ServiceIcon.astro`
Tambah tipe `'shield'` ke union + branch SVG (shield/lock outline, `stroke="currentColor"`), agar dropdown nav punya ikon Sewa Akun.

## Yang TIDAK berubah (out of scope)
- Hero/value-prop/testimoni beranda, FAQ beranda (`faqs.json`), Process, CaseStudies.
- Halaman `/karir`, `jobs.json`, komponen Karir* — tetap (cuma lepas dari nav).
- Page `/services/google-ads` & `/services/meta-ads` + `.md` — tetap, tetap di sitemap & JSON-LD ItemList beranda.
- `astro.config.mjs` sitemap (sewa-akun otomatis kena rule `/services/` priority 0.9).

## Verifikasi
- `bun run check` (astro check) lulus — tipe `active="snk"`, ServiceIcon `shield`, schema content.
- `bun run build` sukses; route `/services/sewa-akun` & `/terms` ter-generate.
- Manual: nav dropdown 3 item, S&K link → /terms section 15–17, kartu beranda 3, footer link benar, google-ads/meta-ads masih bisa dibuka via URL.
- Tabel alur responsive di mobile.

## File berubah (ringkas)
| File | Aksi |
|------|------|
| `src/components/layout/Header.astro` | edit nav (dropdown 3, Karir→S&K, active union) |
| `src/components/layout/MobileDrawer.astro` | verifikasi (kemungkinan tak perlu / ikut Header) |
| `src/pages/services/sewa-akun.astro` | **baru** |
| `src/data/sewa-akun.ts` | **baru** |
| `src/data/terms-sections.ts` | edit (+3 section, lastUpdated) |
| `src/components/sections/ServicesGrid.astro` | edit (4→3 kartu) |
| `src/components/layout/Footer.astro` | edit (link layanan + S&K) |
| `src/components/icons/ServiceIcon.astro` | edit (+shield) |
