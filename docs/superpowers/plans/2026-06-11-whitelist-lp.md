# Whitelist LP + Industri Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Tambah section "Cocok untuk berbagai industri" ke `/services/sewa-akun`, dan buat 2 landing page standalone `/meta-whitelist` & `/google-whitelist` (tanpa WA button, tanpa harga, banyak gambar) untuk traffic iklan.

**Architecture:** Astro 6 static. Section industri = komponen baru `IndustriesGrid.astro` + data di `sewa-akun.ts`, dipakai 3 halaman. 2 LP baru = halaman tipis yang compose 5 komponen reusable di `src/components/sections/lp/` + data di `whitelist-lp.ts` (benefit di-reuse dari `sewa-akun.ts`). BaseLayout dapat prop `bareLayout` untuk mematikan StickyWA di 2 LP.

**Tech Stack:** Astro 6, Tailwind v4 (via global CSS classes di `components.css`), TypeScript, content via typed `src/data/*.ts`, Cloudflare adapter, bun.

**Verifikasi pengganti unit test:** Tidak ada test runner. "Test" = `bun run check` (astro check, type+content) + `grep` assertion + (akhir) `bun run build`. Jalankan `bun run check` setelah tiap task.

---

## File Structure

| File | Aksi | Tanggung jawab |
|------|------|----------------|
| `src/layouts/BaseLayout.astro` | Modify | +prop `bareLayout`, guard `<StickyWA/>` |
| `src/data/sewa-akun.ts` | Modify | +`Industry` type, `INDUSTRIES`, `INDUSTRY_HEADING` |
| `src/components/sections/IndustriesGrid.astro` | Create | Grid kartu industri (shared 3 halaman) |
| `src/data/whitelist-lp.ts` | Create | `LpData` types + `META_LP`, `GOOGLE_LP` |
| `src/components/sections/lp/LpHero.astro` | Create | Hero LP |
| `src/components/sections/lp/LpProblem.astro` | Create | Section pain-point |
| `src/components/sections/lp/LpBenefits.astro` | Create | Check-list keunggulan |
| `src/components/sections/lp/LpPhotoVisit.astro` | Create | Galeri foto kunjungan partner |
| `src/components/sections/lp/LpFinalCta.astro` | Create | Banner CTA → /services/sewa-akun |
| `src/pages/services/sewa-akun.astro` | Modify | Sisip `<IndustriesGrid>` |
| `src/pages/meta-whitelist.astro` | Create | LP Meta (compose) |
| `src/pages/google-whitelist.astro` | Create | LP Google (compose) |

**Urutan task** disusun agar tiap task bisa `bun run check` lulus sendiri (komponen dibuat sebelum dipakai).

---

## Task 1: BaseLayout `bareLayout` prop

**Files:**
- Modify: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Tambah `bareLayout` ke interface Props**

Cari baris (sekitar 26, setelah `keywords?: string[];` atau di dalam `interface Props`):
```astro
  pageType?: 'website' | 'article' | 'profile';
```
Tambahkan TEPAT sebelum baris itu:
```astro
  bareLayout?: boolean;
```

- [ ] **Step 2: Destructure prop**

Cari blok destructuring `const { ... } = Astro.props;` (sekitar baris 28-41). Tambahkan `bareLayout = false,` di dalamnya, mis. setelah `keywords,`:
```astro
  keywords,
  bareLayout = false,
```

- [ ] **Step 3: Guard StickyWA (baris ~197)**

Ganti:
```astro
    <StickyWA />
```
dengan:
```astro
    {!bareLayout && <StickyWA />}
```

- [ ] **Step 4: Verifikasi**

Run: `bun run check`
Expected: 0 errors.

- [ ] **Step 5: Commit**

```bash
git add src/layouts/BaseLayout.astro
git commit -m "feat: add bareLayout prop to BaseLayout (toggle StickyWA)"
```

---

## Task 2: Data industri di sewa-akun.ts

**Files:**
- Modify: `src/data/sewa-akun.ts`

- [ ] **Step 1: Append types + data** di akhir file `src/data/sewa-akun.ts`:

```typescript

// Section "Cocok untuk berbagai industri" — dipakai LP sewa-akun + 2 LP whitelist.
export interface Industry { label: string; icon: string; tint: string }

export const INDUSTRY_HEADING = {
  title: 'Cocok untuk berbagai industri',
  sub: 'Umumnya digunakan oleh advertiser di industri:',
} as const;

// tint = warna dasar kartu (gradient lembut digenerate di komponen).
export const INDUSTRIES: Industry[] = [
  { label: 'Personal Care',   icon: '🧴', tint: '#E8F0FE' },
  { label: 'Fashion Dewasa',  icon: '👗', tint: '#FCE7F3' },
  { label: 'Kesehatan',       icon: '🩺', tint: '#E7F6EC' },
  { label: 'Kecantikan',      icon: '💄', tint: '#F3E8FF' },
  { label: 'Produk Dewasa',   icon: '📦', tint: '#FFF1E6' },
  { label: 'NGO / Sosial',    icon: '🤝', tint: '#E6F4F7' },
];
```

- [ ] **Step 2: Verifikasi**

Run: `bun run check`
Expected: 0 errors.

Run: `grep -c "INDUSTRIES\|INDUSTRY_HEADING\|interface Industry" src/data/sewa-akun.ts`
Expected: ≥3.

- [ ] **Step 3: Commit**

```bash
git add src/data/sewa-akun.ts
git commit -m "feat: add INDUSTRIES data for industri section"
```

---

## Task 3: IndustriesGrid component

**Files:**
- Create: `src/components/sections/IndustriesGrid.astro`

- [ ] **Step 1: Buat komponen** dengan isi PERSIS:

```astro
---
import type { Industry } from '@data/sewa-akun';

interface Props {
  items: Industry[];
  heading: { title: string; sub: string };
  bg?: 'warm' | 'default';
}
const { items, heading, bg = 'default' } = Astro.props;
const sectionStyle = bg === 'warm' ? 'background:var(--bg-warm);' : '';
---
<section style={sectionStyle} aria-labelledby="industri-heading">
  <div class="container">
    <h2 id="industri-heading" class="section-title">{heading.title}</h2>
    <p class="section-sub" style="margin-bottom:44px;">{heading.sub}</p>
    <div class="industri-grid">
      {items.map((it) => (
        <article class="industri-card reveal" style={`--tint:${it.tint}`}>
          <span class="industri-icon" aria-hidden="true">{it.icon}</span>
          <h3 class="industri-label">{it.label}</h3>
        </article>
      ))}
    </div>
  </div>
</section>

<style>
  .industri-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
    max-width: 980px;
    margin: 0 auto;
  }
  .industri-card {
    background: linear-gradient(150deg, var(--tint), #ffffff 90%);
    border: 1px solid var(--ink-100);
    border-radius: var(--radius-xl);
    padding: 28px 24px;
    min-height: 132px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 12px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .industri-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }
  .industri-icon {
    font-size: 32px;
    line-height: 1;
  }
  .industri-label {
    font-size: 17px;
    font-weight: 700;
    color: var(--ink-900);
    margin: 0;
  }
  @media (max-width: 760px) {
    .industri-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
    .industri-card { padding: 22px 18px; min-height: 110px; }
    .industri-icon { font-size: 28px; }
    .industri-label { font-size: 15px; }
  }
  @media (max-width: 380px) {
    .industri-grid { grid-template-columns: 1fr; }
  }
</style>
```

- [ ] **Step 2: Verifikasi**

Run: `bun run check`
Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/IndustriesGrid.astro
git commit -m "feat: add IndustriesGrid component"
```

---

## Task 4: Sisip IndustriesGrid ke /services/sewa-akun

**Files:**
- Modify: `src/pages/services/sewa-akun.astro`

- [ ] **Step 1: Tambah import** — di blok frontmatter, setelah baris `import Check from '@components/icons/Check.astro';`:

```astro
import IndustriesGrid from '@components/sections/IndustriesGrid.astro';
```

- [ ] **Step 2: Tambah `INDUSTRIES` + `INDUSTRY_HEADING` ke import data** — ubah blok import dari `@data/sewa-akun` menjadi:

```astro
import {
  SEWA_HERO, META_WL, GOOGLE_WL, SEWA_PLANS,
  SEWA_FAQS, SEWA_SEO, SEWA_KEYWORDS,
  INDUSTRIES, INDUSTRY_HEADING,
  type WhitelistInfo,
} from '@data/sewa-akun';
```

- [ ] **Step 3: Sisip komponen** — cari baris:
```astro
  <PricingSection plans={SEWA_PLANS} service="Sewa Akun" />
```
Tambahkan TEPAT SEBELUM baris itu:
```astro
  <IndustriesGrid items={INDUSTRIES} heading={INDUSTRY_HEADING} bg="warm" />

```

- [ ] **Step 4: Verifikasi**

Run: `bun run check`
Expected: 0 errors.

Run: `grep -n "IndustriesGrid\|INDUSTRIES" src/pages/services/sewa-akun.astro`
Expected: import + komponen + data import muncul.

- [ ] **Step 5: Commit**

```bash
git add src/pages/services/sewa-akun.astro
git commit -m "feat: add industri section to sewa-akun page"
```

---

## Task 5: Data 2 LP — whitelist-lp.ts

**Files:**
- Create: `src/data/whitelist-lp.ts`

- [ ] **Step 1: Buat file** dengan isi PERSIS:

```typescript
// src/data/whitelist-lp.ts
// Konten 2 landing page standalone: /meta-whitelist & /google-whitelist.
// Tanpa harga, tanpa WA — CTA mengarah ke /services/sewa-akun.
import { META_WL, GOOGLE_WL } from '@data/sewa-akun';

export interface LpProblem { icon: string; title: string; desc: string }
export interface LpPhoto { src: string; alt: string }

export interface LpData {
  platform: 'meta' | 'google';
  hero: { eyebrow: string; title: string; titleAccent: string; desc: string };
  problemHeading: string;
  problemSub: string;
  problems: LpProblem[];
  benefitHeading: string;
  benefits: string[];
  photoHeading: string;
  photoSub: string;
  photos: LpPhoto[];
  cta: { title: string; desc: string; btn: string };
  seo: { title: string; description: string };
  keywords: string[];
}

const CTA_HREF = '/services/sewa-akun';

export const META_LP: LpData = {
  platform: 'meta',
  hero: {
    eyebrow: 'Meta Ads Whitelist',
    title: 'Akun Meta Ads Whitelist',
    titleAccent: 'Siap Scale Tanpa Drama Banned.',
    desc: 'Akun Facebook & Instagram Ads terverifikasi di bawah Business Manager resmi partner Meta. Stabil, tanpa limit spending, dan didampingi tim yang paham eskalasi ke Meta.',
  },
  problemHeading: 'Saat scale, masalah Meta Ads makin kompleks',
  problemSub: 'Hal-hal yang bikin advertiser kehilangan momentum:',
  problems: [
    { icon: '🚫', title: 'Akun kena restrict', desc: 'Akun personal/BM biasa rawan random restrict saat spending naik.' },
    { icon: '⏳', title: 'Review lambat', desc: 'Iklan stuck "in review" berjam-jam — momentum campaign hilang.' },
    { icon: '📉', title: 'Limit spending', desc: 'Limit harian bikin scale tersendat di momen paling penting.' },
    { icon: '🤷', title: 'Eskalasi tak jelas', desc: 'Saat akun bermasalah, advertiser jalan sendirian tanpa jalur appeal.' },
  ],
  benefitHeading: 'Yang kamu dapat dengan akun Meta Whitelist',
  benefits: META_WL.benefits,
  photoHeading: 'Terhubung langsung dengan Meta',
  photoSub: 'Tim Tentaklik aktif di event & program resmi Meta.',
  photos: [
    { src: '/assets/galeri/9.jpeg',  alt: 'Tim Tentaklik di event Meta' },
    { src: '/assets/galeri/10.jpeg', alt: 'Kunjungan ke kantor Meta / Facebook' },
  ],
  cta: {
    title: 'Siap pakai akun Meta Whitelist?',
    desc: 'Lihat detail layanan, alur pendaftaran, dan struktur harga di halaman Sewa Akun.',
    btn: 'Lihat Detail & Harga',
  },
  seo: {
    title: 'Sewa Akun Meta Ads Whitelist (Facebook & Instagram) — Tentaklik',
    description: 'Sewa akun Meta Ads whitelist (Facebook & Instagram) di Tentaklik: akun stabil terverifikasi Business Manager resmi, tanpa limit spending, anti random restrict, dan support appeal jalur partner Meta.',
  },
  keywords: ['sewa akun meta ads', 'akun whitelist meta', 'sewa akun facebook ads', 'sewa akun instagram ads', 'akun facebook ads whitelist'],
};

export const GOOGLE_LP: LpData = {
  platform: 'google',
  hero: {
    eyebrow: 'Google Ads Whitelist',
    title: 'Akun Google Ads Whitelist',
    titleAccent: 'Stabil untuk Skala Besar.',
    desc: 'Akun Google Ads yang dikelola resmi Google Partner agensi Tentaklik. Risiko suspend lebih rendah, tanpa batas spending, dan appeal lebih cepat lewat jalur partner.',
  },
  problemHeading: 'Saat scale, masalah Google Ads makin kompleks',
  problemSub: 'Hal-hal yang bikin advertiser kehilangan momentum:',
  problems: [
    { icon: '🚫', title: 'Akun kena suspend', desc: 'Akun Google Ads personal rawan suspend saat budget naik cepat.' },
    { icon: '⏳', title: 'Appeal berbelit', desc: 'Proses banding lama tanpa jalur langsung ke Google.' },
    { icon: '📉', title: 'Batas spending', desc: 'Limit harian menghambat scale di kampanye yang sedang menang.' },
    { icon: '🤷', title: 'Support minim', desc: 'Tidak ada pendampingan teknis yang paham kebijakan Google Ads.' },
  ],
  benefitHeading: 'Yang kamu dapat dengan akun Google Whitelist',
  benefits: GOOGLE_WL.benefits,
  photoHeading: 'Terhubung langsung dengan Google',
  photoSub: 'Tim Tentaklik aktif di event & program resmi Google Partner.',
  photos: [
    { src: '/assets/galeri/1.jpg', alt: 'Tim Tentaklik di kantor Google' },
    { src: '/assets/galeri/5.jpg', alt: 'Event Akselerasi Bisnis dengan Google Ads' },
    { src: '/assets/galeri/8.jpg', alt: 'Kunjungan tim ke Google' },
  ],
  cta: {
    title: 'Siap pakai akun Google Whitelist?',
    desc: 'Lihat detail layanan, alur pendaftaran, dan struktur harga di halaman Sewa Akun.',
    btn: 'Lihat Detail & Harga',
  },
  seo: {
    title: 'Sewa Akun Google Ads Whitelist — Tentaklik',
    description: 'Sewa akun Google Ads whitelist di Tentaklik: dikelola Google Partner resmi, risiko suspend lebih rendah, tanpa batas spending harian, dan proses appeal lebih cepat untuk skala besar.',
  },
  keywords: ['sewa akun google ads', 'akun whitelist google', 'sewa akun google ads whitelist', 'akun google ads mcc', 'sewa akun iklan google'],
};

export { CTA_HREF };
```

- [ ] **Step 2: Verifikasi**

Run: `bun run check`
Expected: 0 errors. (Memastikan import `META_WL`/`GOOGLE_WL` resolve + tipe valid.)

Run: `grep -c "META_LP\|GOOGLE_LP\|interface LpData" src/data/whitelist-lp.ts`
Expected: ≥3.

- [ ] **Step 3: Commit**

```bash
git add src/data/whitelist-lp.ts
git commit -m "feat: add whitelist LP content data (Meta + Google)"
```

---

## Task 6: LpHero component

**Files:**
- Create: `src/components/sections/lp/LpHero.astro`

- [ ] **Step 1: Buat file** dengan isi PERSIS:

```astro
---
import ArrowRight from '@components/icons/ArrowRight.astro';

interface Props {
  eyebrow: string;
  title: string;
  titleAccent: string;
  desc: string;
  ctaText: string;
  ctaHref: string;
}
const { eyebrow, title, titleAccent, desc, ctaText, ctaHref } = Astro.props;
---
<section style="padding-top:56px;padding-bottom:56px;background:var(--bg-warm);position:relative;overflow:hidden;">
  <div class="container" style="display:grid;grid-template-columns:1.1fr 1fr;gap:40px;align-items:center;">
    <div>
      <span class="eyebrow">{eyebrow}</span>
      <h1 style="font-size:50px;margin-top:18px;margin-bottom:18px;">
        {title} <span style="color:var(--orange-500);">{titleAccent}</span>
      </h1>
      <p style="font-size:17px;color:var(--ink-500);max-width:520px;margin-bottom:28px;">{desc}</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap;">
        <a href={ctaHref} class="btn btn-primary">{ctaText} <ArrowRight size={14} /></a>
      </div>
    </div>
    <div style="position:relative;display:flex;justify-content:center;align-items:center;min-height:360px;">
      <div class="kraken-float" style="width:100%;max-width:440px;margin:0 auto;filter:drop-shadow(0 24px 48px rgba(255,107,26,0.18));">
        <picture>
          <source type="image/avif" srcset="/assets/kraken-hero-400.avif 400w, /assets/kraken-hero-560.avif 560w, /assets/kraken-hero-800.avif 800w" sizes="(max-width: 760px) min(440px, 95vw), 440px" />
          <source type="image/webp" srcset="/assets/kraken-hero-400.webp 400w, /assets/kraken-hero-560.webp 560w, /assets/kraken-hero-800.webp 800w" sizes="(max-width: 760px) min(440px, 95vw), 440px" />
          <img src="/assets/kraken-hero.png" alt="Tentaklik" width="1200" height="960" loading="eager" fetchpriority="high" decoding="async" style="width:100%;height:auto;display:block;" />
        </picture>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verifikasi**

Run: `bun run check`
Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/lp/LpHero.astro
git commit -m "feat: add LpHero component"
```

---

## Task 7: LpProblem component

**Files:**
- Create: `src/components/sections/lp/LpProblem.astro`

- [ ] **Step 1: Buat file** dengan isi PERSIS:

```astro
---
import type { LpProblem } from '@data/whitelist-lp';

interface Props {
  heading: string;
  sub: string;
  items: LpProblem[];
}
const { heading, sub, items } = Astro.props;
---
<section aria-labelledby="lp-problem-heading">
  <div class="container">
    <h2 id="lp-problem-heading" class="section-title">{heading}</h2>
    <p class="section-sub" style="margin-bottom:44px;">{sub}</p>
    <div class="lp-problem-grid">
      {items.map((p) => (
        <article class="lp-problem-card reveal">
          <span class="lp-problem-icon" aria-hidden="true">{p.icon}</span>
          <h3 class="lp-problem-title">{p.title}</h3>
          <p class="lp-problem-desc">{p.desc}</p>
        </article>
      ))}
    </div>
  </div>
</section>

<style>
  .lp-problem-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 18px;
  }
  .lp-problem-card {
    background: white;
    border: 1px solid var(--ink-100);
    border-radius: var(--radius-xl);
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .lp-problem-icon { font-size: 28px; line-height: 1; }
  .lp-problem-title { font-size: 16px; font-weight: 700; color: var(--ink-900); margin: 0; }
  .lp-problem-desc { font-size: 13.5px; color: var(--ink-500); line-height: 1.55; margin: 0; }
  @media (max-width: 900px) {
    .lp-problem-grid { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 520px) {
    .lp-problem-grid { grid-template-columns: 1fr; }
  }
</style>
```

- [ ] **Step 2: Verifikasi**

Run: `bun run check`
Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/lp/LpProblem.astro
git commit -m "feat: add LpProblem component"
```

---

## Task 8: LpBenefits component

**Files:**
- Create: `src/components/sections/lp/LpBenefits.astro`

- [ ] **Step 1: Buat file** dengan isi PERSIS:

```astro
---
import Check from '@components/icons/Check.astro';

interface Props {
  heading: string;
  items: string[];
}
const { heading, items } = Astro.props;
---
<section style="background:var(--bg-warm);" aria-labelledby="lp-benefit-heading">
  <div class="container" style="max-width:880px;">
    <h2 id="lp-benefit-heading" class="section-title">{heading}</h2>
    <ul class="lp-benefits" style="margin-top:36px;">
      {items.map((b) => (
        <li><span class="lp-benefit-check" aria-hidden="true"><Check size={13} /></span>{b}</li>
      ))}
    </ul>
  </div>
</section>

<style>
  .lp-benefits {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  .lp-benefits li {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    font-size: 15px;
    color: var(--ink-700);
    line-height: 1.5;
    background: white;
    border: 1px solid var(--ink-100);
    border-radius: var(--radius-lg);
    padding: 16px 18px;
  }
  .lp-benefit-check {
    width: 22px; height: 22px; border-radius: 999px;
    background: var(--orange-100); color: var(--orange-700);
    display: inline-flex; align-items: center; justify-content: center;
    flex-shrink: 0; margin-top: 1px;
  }
  @media (max-width: 640px) {
    .lp-benefits { grid-template-columns: 1fr; }
  }
</style>
```

- [ ] **Step 2: Verifikasi**

Run: `bun run check`
Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/lp/LpBenefits.astro
git commit -m "feat: add LpBenefits component"
```

---

## Task 9: LpPhotoVisit component

**Files:**
- Create: `src/components/sections/lp/LpPhotoVisit.astro`

- [ ] **Step 1: Buat file** dengan isi PERSIS (pola galeri dari tentang.astro, jumlah foto bisa 2 atau 3):

```astro
---
import type { LpPhoto } from '@data/whitelist-lp';

interface Props {
  heading: string;
  sub: string;
  photos: LpPhoto[];
}
const { heading, sub, photos } = Astro.props;
---
<section aria-labelledby="lp-photo-heading">
  <div class="container">
    <h2 id="lp-photo-heading" class="section-title">{heading}</h2>
    <p class="section-sub" style="margin-bottom:36px;">{sub}</p>
    <div class="lp-photo-grid">
      {photos.map((p) => (
        <figure class="lp-photo-item reveal">
          <img src={p.src} alt={p.alt} loading="lazy" decoding="async" />
        </figure>
      ))}
    </div>
  </div>
</section>

<style>
  .lp-photo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 16px;
    max-width: 980px;
    margin: 0 auto;
  }
  .lp-photo-item {
    margin: 0;
    border-radius: 16px;
    overflow: hidden;
    background: var(--ink-50);
    aspect-ratio: 4 / 3;
  }
  .lp-photo-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.45s ease;
  }
  .lp-photo-item:hover img { transform: scale(1.05); }
</style>
```

- [ ] **Step 2: Verifikasi**

Run: `bun run check`
Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/lp/LpPhotoVisit.astro
git commit -m "feat: add LpPhotoVisit component"
```

---

## Task 10: LpFinalCta component

**Files:**
- Create: `src/components/sections/lp/LpFinalCta.astro`

- [ ] **Step 1: Buat file** dengan isi PERSIS:

```astro
---
import ArrowRight from '@components/icons/ArrowRight.astro';

interface Props {
  title: string;
  desc: string;
  btn: string;
  href: string;
}
const { title, desc, btn, href } = Astro.props;
---
<section style="padding-bottom:24px;scroll-margin-top:90px;">
  <div class="container">
    <div class="cta-banner reveal" style="background:var(--orange-500);">
      <div style="flex:1;position:relative;z-index:1;">
        <h3>{title}</h3>
        <p style="margin-top:8px;font-size:15px;opacity:0.95;">{desc}</p>
      </div>
      <a href={href} class="btn btn-ghost">{btn} <ArrowRight size={14} /></a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verifikasi**

Run: `bun run check`
Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/lp/LpFinalCta.astro
git commit -m "feat: add LpFinalCta component"
```

---

## Task 11: Halaman /meta-whitelist

**Files:**
- Create: `src/pages/meta-whitelist.astro`

- [ ] **Step 1: Buat file** dengan isi PERSIS:

```astro
---
import BaseLayout from '@layouts/BaseLayout.astro';
import LpHero from '@components/sections/lp/LpHero.astro';
import LpProblem from '@components/sections/lp/LpProblem.astro';
import LpBenefits from '@components/sections/lp/LpBenefits.astro';
import LpPhotoVisit from '@components/sections/lp/LpPhotoVisit.astro';
import IndustriesGrid from '@components/sections/IndustriesGrid.astro';
import LpFinalCta from '@components/sections/lp/LpFinalCta.astro';
import { META_LP, CTA_HREF } from '@data/whitelist-lp';
import { INDUSTRIES, INDUSTRY_HEADING } from '@data/sewa-akun';
import { serviceJsonLd, breadcrumbJsonLd } from '@lib/seo';
import { site } from '@data/site';

const d = META_LP;
const url = `${site.url}/meta-whitelist`;
const jsonLd = [
  serviceJsonLd({
    name: d.seo.title,
    description: d.seo.description,
    url,
    serviceType: 'Sewa Akun Meta Ads Whitelist',
  }),
  breadcrumbJsonLd([
    { name: 'Beranda', url: site.url },
    { name: 'Sewa Akun', url: `${site.url}/services/sewa-akun` },
    { name: 'Meta Whitelist', url },
  ]),
];
---
<BaseLayout
  title={d.seo.title}
  description={d.seo.description}
  active="layanan"
  bareLayout
  jsonLd={jsonLd}
  keywords={d.keywords}
>
  <LpHero
    eyebrow={d.hero.eyebrow}
    title={d.hero.title}
    titleAccent={d.hero.titleAccent}
    desc={d.hero.desc}
    ctaText={d.cta.btn}
    ctaHref={CTA_HREF}
  />
  <LpProblem heading={d.problemHeading} sub={d.problemSub} items={d.problems} />
  <LpBenefits heading={d.benefitHeading} items={d.benefits} />
  <LpPhotoVisit heading={d.photoHeading} sub={d.photoSub} photos={d.photos} />
  <IndustriesGrid items={INDUSTRIES} heading={INDUSTRY_HEADING} bg="warm" />
  <LpFinalCta title={d.cta.title} desc={d.cta.desc} btn={d.cta.btn} href={CTA_HREF} />
</BaseLayout>
```

- [ ] **Step 2: Verifikasi**

Run: `bun run check`
Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/pages/meta-whitelist.astro
git commit -m "feat: add /meta-whitelist landing page"
```

---

## Task 12: Halaman /google-whitelist

**Files:**
- Create: `src/pages/google-whitelist.astro`

- [ ] **Step 1: Buat file** dengan isi PERSIS (identik T11 tapi pakai `GOOGLE_LP` + serviceType + breadcrumb Google):

```astro
---
import BaseLayout from '@layouts/BaseLayout.astro';
import LpHero from '@components/sections/lp/LpHero.astro';
import LpProblem from '@components/sections/lp/LpProblem.astro';
import LpBenefits from '@components/sections/lp/LpBenefits.astro';
import LpPhotoVisit from '@components/sections/lp/LpPhotoVisit.astro';
import IndustriesGrid from '@components/sections/IndustriesGrid.astro';
import LpFinalCta from '@components/sections/lp/LpFinalCta.astro';
import { GOOGLE_LP, CTA_HREF } from '@data/whitelist-lp';
import { INDUSTRIES, INDUSTRY_HEADING } from '@data/sewa-akun';
import { serviceJsonLd, breadcrumbJsonLd } from '@lib/seo';
import { site } from '@data/site';

const d = GOOGLE_LP;
const url = `${site.url}/google-whitelist`;
const jsonLd = [
  serviceJsonLd({
    name: d.seo.title,
    description: d.seo.description,
    url,
    serviceType: 'Sewa Akun Google Ads Whitelist',
  }),
  breadcrumbJsonLd([
    { name: 'Beranda', url: site.url },
    { name: 'Sewa Akun', url: `${site.url}/services/sewa-akun` },
    { name: 'Google Whitelist', url },
  ]),
];
---
<BaseLayout
  title={d.seo.title}
  description={d.seo.description}
  active="layanan"
  bareLayout
  jsonLd={jsonLd}
  keywords={d.keywords}
>
  <LpHero
    eyebrow={d.hero.eyebrow}
    title={d.hero.title}
    titleAccent={d.hero.titleAccent}
    desc={d.hero.desc}
    ctaText={d.cta.btn}
    ctaHref={CTA_HREF}
  />
  <LpProblem heading={d.problemHeading} sub={d.problemSub} items={d.problems} />
  <LpBenefits heading={d.benefitHeading} items={d.benefits} />
  <LpPhotoVisit heading={d.photoHeading} sub={d.photoSub} photos={d.photos} />
  <IndustriesGrid items={INDUSTRIES} heading={INDUSTRY_HEADING} bg="warm" />
  <LpFinalCta title={d.cta.title} desc={d.cta.desc} btn={d.cta.btn} href={CTA_HREF} />
</BaseLayout>
```

- [ ] **Step 2: Verifikasi**

Run: `bun run check`
Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/pages/google-whitelist.astro
git commit -m "feat: add /google-whitelist landing page"
```

---

## Task 13: Build penuh + verifikasi akhir

**Files:** none (verifikasi end-to-end)

- [ ] **Step 1: Build**

Run: `bun run build`
Expected: sukses, 0 error. Rute `/meta-whitelist`, `/google-whitelist`, `/services/sewa-akun` ter-generate.

- [ ] **Step 2: Rute ter-generate**

Run: `D=dist/client; [ -d "$D" ] || D=dist; ls "$D" | grep -E "meta-whitelist|google-whitelist"; ls "$D/services/"`
Expected: `meta-whitelist`, `google-whitelist` ada; `services/` masih punya `sewa-akun`, `google-ads`, `meta-ads`, dll.

- [ ] **Step 3: StickyWA OFF di 2 LP, ON di sewa-akun**

Run: `D=dist/client; [ -d "$D" ] || D=dist; echo -n "meta sticky: "; grep -c "sticky-wa" "$D/meta-whitelist/index.html"; echo -n "google sticky: "; grep -c "sticky-wa" "$D/google-whitelist/index.html"; echo -n "sewa-akun sticky: "; grep -c "sticky-wa" "$D/services/sewa-akun/index.html"`
Expected: meta 0, google 0, sewa-akun ≥1.

- [ ] **Step 4: Tidak ada WA link / harga di 2 LP**

Run: `D=dist/client; [ -d "$D" ] || D=dist; echo -n "meta wa.me: "; grep -c "wa.me" "$D/meta-whitelist/index.html"; echo -n "google wa.me: "; grep -c "wa.me" "$D/google-whitelist/index.html"`
Expected: meta 0, google 0. (Tidak ada nominal harga karena LpData tak punya field harga.)

- [ ] **Step 5: Industri section ada di 3 halaman**

Run: `D=dist/client; [ -d "$D" ] || D=dist; for f in services/sewa-akun meta-whitelist google-whitelist; do echo -n "$f: "; grep -c "Cocok untuk berbagai industri" "$D/$f/index.html"; done`
Expected: tiap ≥1.

- [ ] **Step 6: Foto kunjungan benar per LP**

Run: `D=dist/client; [ -d "$D" ] || D=dist; echo "=meta="; grep -o "galeri/9.jpeg\|galeri/10.jpeg" "$D/meta-whitelist/index.html" | sort -u; echo "=google="; grep -o "galeri/1.jpg\|galeri/5.jpg\|galeri/8.jpg" "$D/google-whitelist/index.html" | sort -u`
Expected: meta → 9.jpeg + 10.jpeg; google → 1.jpg, 5.jpg, 8.jpg.

- [ ] **Step 7: CTA arah ke /services/sewa-akun**

Run: `D=dist/client; [ -d "$D" ] || D=dist; echo -n "meta cta: "; grep -c "/services/sewa-akun" "$D/meta-whitelist/index.html"; echo -n "google cta: "; grep -c "/services/sewa-akun" "$D/google-whitelist/index.html"`
Expected: tiap ≥1.

- [ ] **Step 8: 2 LP TIDAK di Header/Footer (standalone)**

Run: `grep -c "meta-whitelist\|google-whitelist" src/components/layout/Header.astro src/components/layout/Footer.astro`
Expected: 0 di kedua file.

- [ ] **Step 9: Commit (jika ada source berubah; jangan commit dist/)**

```bash
git status --porcelain | grep -v "^??" || echo "nothing to commit"
```
(dist/ di-gitignore — jangan di-add.)

---

## Self-Review Notes (penulis plan)

- **Spec coverage:** BaseLayout bareLayout (T1), data industri (T2), IndustriesGrid (T3), sisip ke LP utama (T4), data 2 LP (T5), 5 komponen LP (T6-10), 2 halaman (T11-12), verifikasi end-to-end termasuk sitemap/StickyWA/foto/CTA (T13). ✅
- **Type consistency:** `Industry` (T2) dipakai IndustriesGrid (T3) + halaman. `LpData`/`LpProblem`/`LpPhoto` (T5) dipakai LpProblem (T7), LpPhotoVisit (T9), halaman (T11-12). `benefits: string[]` di LpData = `META_WL.benefits` (string[]) — cocok dengan LpBenefits `items: string[]` (T8). `CTA_HREF` diekspor T5, dipakai T11-12.
- **Reuse:** LpBenefits konsumsi `META_WL.benefits`/`GOOGLE_WL.benefits` lewat LpData — tak duplikasi konten. IndustriesGrid 1 komponen dipakai 3 halaman.
- **Risiko `serviceJsonLd` harga:** LpData tak punya plans/harga → `serviceJsonLd` dipanggil tanpa `plans` (T11-12) → aman.
- **No WA:** LpFinalCta + LpHero pakai `<a href>` biasa (→ /services/sewa-akun), tak ada `waLink`. `bareLayout` matikan StickyWA. Header tak punya WA CTA (verified). T13 step 3-4 cek.
- **Galeri assets:** `/assets/galeri/{1,5,8}.jpg` + `{9,10}.jpeg` sudah ada di `public/assets/galeri/` (verified).
- **active="layanan":** 2 LP highlight nav "Layanan" walau standalone — acceptable, tak ada efek rusak.
