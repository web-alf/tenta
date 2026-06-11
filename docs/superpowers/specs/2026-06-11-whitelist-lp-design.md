# Design: LP Update — Industri Section + 2 LP Whitelist Terpisah

**Date:** 2026-06-11
**Source:** Google Doc tabs "LP utama 11/6/26" + "LP tambahan 11/6/26"
**Stack:** Astro 6 (static), Tailwind v4 (global CSS classes), Cloudflare adapter.

## Goal

Dua update untuk penawaran "Sewa Akun" tentaklik.com:
1. **LP utama** (`/services/sewa-akun`): tambah section "Cocok untuk berbagai industri" (grid kartu kategori, gaya everpro.id/tiktok-whitelist-sem).
2. **LP tambahan**: 2 landing page terpisah `/meta-whitelist` & `/google-whitelist` untuk traffic iklan — tanpa WA button, tanpa nominal harga, banyak gambar (termasuk foto kunjungan partner), sedikit text.

Referensi visual: https://everpro.id/tiktok-whitelist-sem/. Arahan doc: *"Materi bebas berkreasi, jangan terlalu banyak text tampilkan gambar juga."*

## Keputusan terkunci (user)

| # | Topik | Keputusan |
|---|-------|-----------|
| 1 | Akses 2 LP baru | Standalone — TIDAK di nav/dropdown/footer; akses via URL/link iklan |
| 2 | StickyWA di 2 LP | Disembunyikan (WA button dihilangkan) |
| 3 | CTA 2 LP (no harga/WA) | Tombol arah ke `/services/sewa-akun` (detail + harga lengkap) |
| 4 | Gambar section industri | Kartu ilustrasi CSS/gradient + icon (bukan foto stok) — layout persis everpro |
| 5 | Foto kunjungan | Meta LP → galeri 9 + 10; Google LP → galeri 1, 5, 8 |
| 6 | Hide WA mekanisme | Prop `bareLayout` di BaseLayout (StickyWA off, header tetap clean) |
| 7 | Struktur per LP | 6 section: hero → problem → benefit → foto kunjungan → industri → CTA |
| 8 | Komponen | Reusable di `src/components/sections/lp/`, dipakai 2 halaman (DRY) |
| 9 | Industri di 2 LP | Ya — section industri muncul di LP utama DAN 2 LP baru |
| 10 | Sitemap | 2 LP baru masuk sitemap (landing SEO/ads), tidak noindex |

## Arsitektur

### A. BaseLayout — prop `bareLayout`
`src/layouts/BaseLayout.astro`:
- Tambah `bareLayout?: boolean` ke `Props` (default `false`).
- Baris 197 `<StickyWA />` → `{!bareLayout && <StickyWA />}`.
- Header tetap dirender (clean, tak ada tombol WA khusus di header desktop — verifikasi: header pakai array nav saja, tak ada WA CTA hardcoded di Header.astro; StickyWA satu-satunya WA global). Tidak ubah Header.

### B. Section Industri (shared)
Data di `src/data/sewa-akun.ts` — tambah:
```ts
export interface Industry { label: string; icon: string; tint: string }
export const INDUSTRIES: Industry[] = [
  { label: 'Personal Care', icon: '🧴', tint: '...' },
  { label: 'Fashion Dewasa', icon: '👗', tint: '...' },
  { label: 'Kesehatan',      icon: '🩺', tint: '...' },
  { label: 'Kecantikan',     icon: '💄', tint: '...' },
  { label: 'Produk Dewasa',  icon: '📦', tint: '...' },
  { label: 'NGO / Sosial',   icon: '🤝', tint: '...' },
];
export const INDUSTRY_HEADING = { title: 'Cocok untuk berbagai industri', sub: 'Umumnya digunakan oleh advertiser di industri:' };
```
Komponen baru `src/components/sections/IndustriesGrid.astro` (Props: `items`, optional `bg`):
- `<section>` + `.section-title` + `.section-sub` + grid 3×2.
- Kartu: gradient pastel (tint per kategori) + icon besar + label. Hover lift.
- Responsif: 3 → 2 (≤760) → masih 2 atau 1 (≤480). Pakai inline grid + media query scoped.
- Dipakai di `/services/sewa-akun` (Bagian A) + 2 LP (Bagian D).

LP utama: import `IndustriesGrid` + `INDUSTRIES`, sisipkan SETELAH section "Layanan yang Tersedia" (whitelist cards), SEBELUM `<PricingSection>`.

### C. Data 2 LP — `src/data/whitelist-lp.ts`
Typed, satu objek per platform:
```ts
export interface LpProblem { title: string; desc: string }
export interface LpData {
  platform: 'meta' | 'google';
  hero: { eyebrow: string; title: string; titleAccent: string; desc: string };
  problemHeading: string;
  problems: LpProblem[];           // 3-4 pain points
  benefitHeading: string;
  benefits: string[];              // reuse META_WL/GOOGLE_WL benefits
  photoHeading: string;
  photoSub: string;
  photos: { src: string; alt: string }[];  // galeri paths
  cta: { title: string; desc: string; btn: string };  // -> /services/sewa-akun
  seo: { title: string; description: string };
  keywords: string[];
}
export const META_LP: LpData = {...}
export const GOOGLE_LP: LpData = {...}
```
- `benefits` di-import dari `META_WL.benefits` / `GOOGLE_WL.benefits` (sewa-akun.ts) — single source, hindari duplikasi.
- `photos`: Meta → `/assets/galeri/9.jpeg`, `/assets/galeri/10.jpeg`; Google → `/assets/galeri/1.jpg`, `/assets/galeri/5.jpg`, `/assets/galeri/8.jpg`.
- TIDAK ada field harga/nominal. TIDAK ada waLink.

### D. Komponen LP reusable — `src/components/sections/lp/`
- `LpHero.astro` — Props: eyebrow/title/titleAccent/desc, slot ilustrasi (kraken float reuse). CTA "Pelajari Selengkapnya" → `/services/sewa-akun` (anchor `#pricing`).
- `LpProblem.astro` — Props: heading, items[]. Layout: heading + grid kartu pain-point (icon + judul + desc ringkas). 1 gambar ilustrasi opsional (kraken/galeri).
- `LpBenefits.astro` — Props: heading, items[]. Check-list (reuse pola `.wl-check` + Check icon) 2 kolom.
- `LpPhotoVisit.astro` — Props: heading, sub, photos[]. Grid foto (gaya `.galeri-grid` di tentang.astro) + caption. Lazy load.
- `LpFinalCta.astro` — Props: title, desc, btn, href. Banner `.cta-banner` (reuse), tombol → /services/sewa-akun. TANPA WA.

Masing-masing kecil, satu tanggung jawab, di-feed data berbeda per platform.

### E. Halaman LP — tipis
`src/pages/meta-whitelist.astro` & `src/pages/google-whitelist.astro`:
```astro
---
import BaseLayout from '@layouts/BaseLayout.astro';
import LpHero from '...'; /* + LpProblem, LpBenefits, LpPhotoVisit, IndustriesGrid, LpFinalCta */
import { META_LP /* atau GOOGLE_LP */ } from '@data/whitelist-lp';
import { INDUSTRIES, INDUSTRY_HEADING } from '@data/sewa-akun';
import { serviceJsonLd, breadcrumbJsonLd } from '@lib/seo';
import { site } from '@data/site';
const d = META_LP; const url = `${site.url}/meta-whitelist`;
const jsonLd = [ serviceJsonLd({name,description,url,serviceType}), breadcrumbJsonLd([...]) ];
---
<BaseLayout title={d.seo.title} description={d.seo.description} active="layanan" bareLayout jsonLd={jsonLd} keywords={d.keywords}>
  <LpHero .../>
  <LpProblem .../>
  <LpBenefits .../>
  <LpPhotoVisit .../>
  <IndustriesGrid items={INDUSTRIES} heading={INDUSTRY_HEADING} bg="warm" />
  <LpFinalCta .../>
</BaseLayout>
```
`active="layanan"` (highlight nav meski tak ada submenu-nya — acceptable). `bareLayout` → no StickyWA.

### F. SEO/JSON-LD
- serviceJsonLd TANPA `plans` (no harga). breadcrumbJsonLd [Beranda, Sewa Akun, Meta/Google Whitelist].
- Sitemap: otomatis ter-include (output static). astro.config sitemap rule: `/meta-whitelist` & `/google-whitelist` tak match `/services/` → default priority 0.7 weekly. Acceptable.

## Yang TIDAK berubah
- Harga/pricing di `/services/sewa-akun` (tetap tier 5/4,5/3,5%).
- Nav, footer, dropdown (2 LP baru standalone).
- Halaman lain, galeri tentang.astro.
- StickyWA tetap aktif di SEMUA halaman selain 2 LP baru.

## Verifikasi
- `bun run check` 0 error (prop `bareLayout`, import data, tipe LpData/Industry).
- `bun run build` sukses; rute `/meta-whitelist`, `/google-whitelist`, `/services/sewa-akun` ter-generate.
- dist: 2 LP TIDAK punya `sticky-wa`; LP utama punya section "Cocok untuk berbagai industri"; 2 LP punya foto galeri yg benar; CTA arah ke `/services/sewa-akun`; tak ada `wa.me` / nominal `Rp`/`%` harga di 2 LP.
- 2 LP TIDAK ada di Header/Footer (grep).

## File berubah/baru
| File | Aksi |
|------|------|
| `src/layouts/BaseLayout.astro` | edit (+`bareLayout` prop, guard StickyWA) |
| `src/data/sewa-akun.ts` | edit (+INDUSTRIES, INDUSTRY_HEADING, Industry type) |
| `src/data/whitelist-lp.ts` | **baru** (META_LP, GOOGLE_LP, LpData types) |
| `src/components/sections/IndustriesGrid.astro` | **baru** |
| `src/components/sections/lp/LpHero.astro` | **baru** |
| `src/components/sections/lp/LpProblem.astro` | **baru** |
| `src/components/sections/lp/LpBenefits.astro` | **baru** |
| `src/components/sections/lp/LpPhotoVisit.astro` | **baru** |
| `src/components/sections/lp/LpFinalCta.astro` | **baru** |
| `src/pages/services/sewa-akun.astro` | edit (sisip IndustriesGrid) |
| `src/pages/meta-whitelist.astro` | **baru** |
| `src/pages/google-whitelist.astro` | **baru** |
