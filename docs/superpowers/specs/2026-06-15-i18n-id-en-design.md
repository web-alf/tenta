# Design: i18n ID/EN (tentaklik.com)

**Date:** 2026-06-15
**Stack:** Astro 6.1 static, Cloudflare adapter, Tailwind v4 global CSS, TypeScript, bun.
**Goal:** Language switcher ID/EN di navbar. Bahasa Indonesia default (root `/`), English di `/en/*`. Full i18n 13 halaman, eksekusi **vertical-slice** (Fase 1 infra+switcher+1 halaman → review → Fase 2 fan-out sisanya).

## Keputusan terkunci (user)
| # | Topik | Keputusan |
|---|---|---|
| 1 | Scope | Full i18n semua 13 halaman + data |
| 2 | URL | Path prefix `/en/` (ID di root) |
| 3 | Sumber EN | Aku translate, user review (terms/legal: cek manual) |
| 4 | Eksekusi | Vertical-slice (Fase 1 → review → Fase 2) |
| 5 | Arsitektur | Disetujui (di bawah) |

## Astro 6 i18n — fakta terverifikasi
- `prefixDefaultLocale: false` (default v6): ID di root, EN di `/en/`.
- `redirectToDefaultLocale: false` (default v6, biarkan).
- `Astro.currentLocale` → `'id'` di root (tak undefined), `'en'` di `/en/*`. Aman dipakai di mana saja.
- `getRelativeLocaleUrl('id','layanan')` → `/layanan`; `('en','layanan')` → `/en/layanan`. Import `astro:i18n`.
- hreflang TIDAK auto-emit → tambah manual di `<head>`.
- Halaman EN manual di `src/pages/en/*` (Astro tak auto-generate). `[slug]` butuh mirror EN sendiri.
- `fallback: { en: 'id' }` + `routing.fallbackType: 'rewrite'` → halaman EN yg belum ada tampil konten ID tanpa ubah URL (jaring pengaman selama Fase 2).

## Arsitektur

### A. Config — `astro.config.mjs`
Tambah top-level `i18n`:
```js
i18n: {
  defaultLocale: 'id',
  locales: ['id', 'en'],
  routing: { prefixDefaultLocale: false, redirectToDefaultLocale: false, fallbackType: 'rewrite' },
  fallback: { en: 'id' },
}
```
Sitemap integration: tambah `en` ke `locales` (sudah ada `i18n` di opsi sitemap — update `locales: { id:'id-ID', en:'en-US' }` + `defaultLocale:'id'`).

### B. Core i18n — `src/i18n/`
- **`ui.ts`** — kamus string UI non-konten (nav, tombol, label form, heading footer, CTA generik). Bentuk:
  ```ts
  export const UI = {
    id: { 'nav.beranda': 'Beranda', 'nav.tentang': 'Tentang', /* ... */ },
    en: { 'nav.beranda': 'Home',    'nav.tentang': 'About',   /* ... */ },
  } as const;
  export type Lang = keyof typeof UI;
  ```
- **`utils.ts`**:
  ```ts
  import { UI, type Lang } from './ui';
  export const LANGS: Lang[] = ['id', 'en'];
  export function getLang(currentLocale: string | undefined): Lang {
    return currentLocale === 'en' ? 'en' : 'id';
  }
  export function useT(lang: Lang) {
    return (key: keyof typeof UI['id']) => UI[lang][key] ?? UI.id[key];
  }
  // base path tanpa prefix /en — untuk hreflang & switcher
  export function stripLocale(pathname: string): string {
    return pathname.replace(/^\/en(\/|$)/, '/');
  }
  ```
  (Link antar-bahasa & path lokal pakai `getRelativeLocaleUrl` dari `astro:i18n`, bukan string manual.)

### C. Data bilingual
Refactor tiap data file jadi keyed `{ id, en }`, halaman ambil `[lang]`. Pola:
```ts
// sewa-akun.ts (contoh ringkas)
export const SEWA = {
  id: { hero: {...}, plans: [...], faqs: [...], ... },
  en: { hero: {...}, plans: [...], faqs: [...], ... },
} as const;
```
File terdampak: `sewa-akun.ts`, `whitelist-lp.ts`, `terms-sections.ts`, `disclaimer-sections.ts`, sebagian `site.ts` (description/footerTagline/keywords). `site.ts` data non-teks (wa, email, geo, social) tetap flat.
**Fase 1** hanya refactor `whitelist-lp.ts` (dipakai halaman slice). Sisanya Fase 2.

### D. Komponen section — lang-aware via prop
Komponen tetap "bodoh": terima konten via props (sudah begitu). Yang perlu string UI (tombol "Kirim", "Lihat Detail") → terima `lang` prop ATAU baca `Astro.currentLocale` di komponen + `useT`. **Putusan: komponen baca `Astro.currentLocale` sendiri** (lebih sedikit prop-drilling) untuk string UI generik; konten halaman tetap via props per-lang dari data.

### E. Halaman EN — `src/pages/en/*`
Mirror struktur:
```
src/pages/en/index.astro, tentang.astro, kontak.astro, karir.astro,
  disclaimer.astro, ketentuan.astro, meta-whitelist.astro, google-whitelist.astro,
  layanan/sewa-akun.astro, layanan/[slug].astro, partner/index.astro, partner/[slug].astro
```
Tiap file tipis: `const lang = 'en'` (atau `getLang(Astro.currentLocale)`), feed data `[lang]` ke komponen yg sama. `[slug]` EN: `getStaticPaths` sama (slug route tak berubah, konten via lang).
404 EN opsional (Astro fallback ID).

### F. BaseLayout — lang + hreflang + SEO
- `<html lang={lang}>` dinamis (`getLang(Astro.currentLocale)`).
- `<head>` tambah hreflang (pakai base path tanpa prefix):
  ```astro
  <link rel="alternate" hreflang="id" href={getAbsoluteLocaleUrl('id', basePath)} />
  <link rel="alternate" hreflang="en" href={getAbsoluteLocaleUrl('en', basePath)} />
  <link rel="alternate" hreflang="x-default" href={getAbsoluteLocaleUrl('id', basePath)} />
  ```
  `basePath = stripLocale(Astro.url.pathname)`.
- `canonical` per halaman (URL bahasa aktif). Robots/OG `og:locale` ikut lang.

### G. Language switcher — Header
Dropdown `[ID ▾]` (pakai pola `.nav-dropdown` yg ada) berisi 2 link:
- ID → `getRelativeLocaleUrl('id', basePath)`
- EN → `getRelativeLocaleUrl('en', basePath)`
`basePath = stripLocale(Astro.url.pathname)` → switch pertahankan halaman saat ini. Tampil di desktop nav + mobile drawer. Aktif = bahasa sekarang (highlight). Label: "ID" / "EN" + ikon globe (opsional).

### H. _redirects
Tetap (route ID). EN tak butuh redirect. Tambah komentar bahwa `/en/*` di-handle Astro.

## Fase eksekusi
- **Fase 1 (vertical slice)**: A (config) + B (i18n core, ui.ts minimal) + F (BaseLayout lang/hreflang) + G (switcher) + refactor `whitelist-lp.ts` bilingual + `src/pages/en/meta-whitelist.astro` + komponen LP* baca lang utk string UI. Build + verifikasi `/` (ID) & `/en/meta-whitelist` (EN) jalan, switcher pindah benar. **→ User review gate.**
- **Fase 2 (fan-out)**: refactor data sisanya bilingual + 11 halaman EN + komponen sisanya lang-aware + translate semua copy. Fan-out per halaman/data file (distinct → paralel).

## Verifikasi
- `bun run check` 0 error; `bun run build` sukses.
- `/en/meta-whitelist` ada di dist, konten EN; `/meta-whitelist` tetap ID.
- `<html lang>` benar per halaman; hreflang id/en/x-default ada.
- Switcher: dari `/meta-whitelist` klik EN → `/en/meta-whitelist`; sebaliknya.
- StickyWA tetap off di LP (bareLayout); CTA/shortform tetap jalan.

## Risiko & mitigasi
- **Volume copy besar** → fallback `rewrite` jaga halaman EN belum-jadi tampil ID (tak 404) selama Fase 2.
- **Drift ID/EN** → data keyed `{id,en}` satu file, mudah banding.
- **hreflang salah prefix** → `stripLocale` dipakai konsisten.

## File (Fase 1)
| File | Aksi |
|---|---|
| `astro.config.mjs` | edit (i18n config + sitemap locales) |
| `src/i18n/ui.ts` | baru |
| `src/i18n/utils.ts` | baru |
| `src/data/whitelist-lp.ts` | refactor bilingual |
| `src/layouts/BaseLayout.astro` | edit (lang, hreflang, og:locale) |
| `src/components/layout/Header.astro` | edit (switcher desktop+mobile) |
| `src/components/sections/lp/LpShortForm.astro` | edit (string UI via lang) |
| `src/components/sections/lp/LpFinalCta.astro` | (konten via prop, no change atau minimal) |
| `src/pages/en/meta-whitelist.astro` | baru |
