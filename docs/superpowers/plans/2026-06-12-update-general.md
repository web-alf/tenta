# Update General 12/6/26 Implementation Plan

> **For agentic workers:** subagent fan-out execution. Steps use checkbox (`- [ ]`). Each file is owned by one task; all target files distinct → safe parallel writes. Controller serializes `bun run check` + `bun run build` + commits.

**Goal:** Header reorder (Tentang/Layanan/Partner/FAQ/Blog/Kontak-button), footer "Halaman" + nested whitelist, "Case Study"→"Partner" relabel, terms email, LP whitelist benefit/industri/shortform changes, + Apps Script deliverable.

**Architecture:** Astro 6 static. Label-only renames (routes unchanged). LP benefits decoupled from sewa-akun. New `LpShortForm` component + Apps Script docs. `IndustriesGrid` gains `center` prop.

**Tech Stack:** Astro 6, Tailwind v4 global CSS, TypeScript, bun. Form = Google Apps Script Sheet (GET fire-and-forget, pola `kontak.astro`).

**Verifikasi:** `bun run check` + grep + `bun run build`.

---

## Task 1: Header — reorder + Blog + Kontak button

**Files:** Modify `src/components/layout/Header.astro`

- [ ] **Step 1: Ganti frontmatter arrays (baris 10-22)**

Ganti blok:
```astro
const services = [
  { label: 'Website Development',          href: '/services/website',     icon: 'code' as const },
  { label: 'Sewa Akun',                    href: '/services/sewa-akun',   icon: 'shield' as const },
  { label: 'Konsultasi Digital Marketing', href: '/services/konsultasi',  icon: 'lightbulb' as const },
];

const links = [
  { id: 'beranda', label: 'Beranda',      href: '/' },
  { id: 'case',    label: 'Case Study',   href: '/case-study' },
  { id: 'tentang', label: 'Tentang Kami', href: '/tentang' },
  { id: 'snk',     label: 'S&K',          href: '/terms' },
  { id: 'kontak',  label: 'Kontak',       href: '/kontak' },
];
```
dengan:
```astro
const services = [
  { label: 'Website Development',          href: '/services/website',     icon: 'code' as const },
  { label: 'Sewa Akun',                    href: '/services/sewa-akun',   icon: 'shield' as const },
  { label: 'Konsultasi Digital Marketing', href: '/services/konsultasi',  icon: 'lightbulb' as const },
];

// Link sebelum dropdown Layanan
const linksBefore = [
  { id: 'tentang', label: 'Tentang', href: '/tentang' },
];
// Link setelah dropdown Layanan
const linksAfter = [
  { id: 'case', label: 'Partner', href: '/case-study' },
  { id: 'faq',  label: 'FAQ',     href: '/#faq' },
];
const blogHref = 'https://mediawaktu.com';
```

- [ ] **Step 2: Ganti desktop nav (baris 31-59)**

Ganti seluruh blok `<nav class="nav-links nav-desktop" ...>...</nav>` menjadi:
```astro
    <nav class="nav-links nav-desktop" aria-label="Navigasi utama">
      <a href="/" class={active === 'beranda' ? 'active' : ''}>Beranda</a>

      {linksBefore.map(l => (
        <a href={l.href} class={active === l.id ? 'active' : ''}>{l.label}</a>
      ))}

      <!-- Layanan dropdown -->
      <div class="nav-dropdown-wrap" id="layanan-wrap">
        <button
          class={`nav-dropdown-trigger ${active === 'layanan' ? 'active' : ''}`}
          aria-haspopup="true"
          aria-expanded="false"
          aria-controls="layanan-menu"
          type="button"
        >
          Layanan
          <svg class="chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="nav-dropdown" id="layanan-menu" role="menu">
          {services.map(s => (
            <a href={s.href} class="nav-dropdown-item" role="menuitem">
              <span class="nav-dropdown-icon" aria-hidden="true"><ServiceIcon type={s.icon} size={16} /></span>
              {s.label}
            </a>
          ))}
        </div>
      </div>

      {linksAfter.map(l => (
        <a href={l.href} class={active === l.id ? 'active' : ''}>{l.label}</a>
      ))}

      <a href={blogHref} target="_blank" rel="noopener noreferrer" class="nav-blog-link">Blog <span aria-hidden="true">↗</span></a>

      <a href="/kontak" class={`btn btn-primary nav-kontak-btn ${active === 'kontak' ? 'active' : ''}`}>Kontak</a>
    </nav>
```

- [ ] **Step 3: Ganti mobile drawer nav (baris 83-104)**

Ganti seluruh blok `<nav class="mobile-drawer-links" ...>...</nav>` menjadi:
```astro
    <nav class="mobile-drawer-links" aria-label="Navigasi mobile">
      <a href="/" class={active === 'beranda' ? 'active' : ''}>Beranda</a>

      {linksBefore.map(l => (
        <a href={l.href} class={active === l.id ? 'active' : ''}>{l.label}</a>
      ))}

      <!-- Layanan accordion -->
      <div class="mobile-layanan">
        <button class="mobile-layanan-trigger" type="button" aria-expanded="false">
          Layanan
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="mobile-layanan-sub" hidden>
          {services.map(s => (
            <a href={s.href} class="mobile-sub-item">
              <span aria-hidden="true" style="display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;color:var(--orange-700);"><ServiceIcon type={s.icon} size={18} /></span> {s.label}
            </a>
          ))}
        </div>
      </div>

      {linksAfter.map(l => (
        <a href={l.href} class={active === l.id ? 'active' : ''}>{l.label}</a>
      ))}

      <a href={blogHref} target="_blank" rel="noopener noreferrer">Blog ↗</a>

      <a href="/kontak" class={`btn btn-primary mobile-kontak-btn ${active === 'kontak' ? 'active' : ''}`} style="justify-content:center;margin-top:8px;">Kontak</a>
    </nav>
```

- [ ] **Step 4: Tambah CSS** — di dalam `<style>` Header (setelah blok `.nav-dropdown-trigger` mana saja, sebelum `</style>` pertama), tambahkan:
```css
  .nav-blog-link { display: inline-flex; align-items: center; gap: 3px; }
  .nav-kontak-btn { padding: 9px 18px; font-size: 14px; }
  .nav-kontak-btn:hover { color: white; }
```

- [ ] **Step 5: Verifikasi**

Run: `bun run check`
Expected: 0 errors.

Run: `grep -c "Case Study\|S&K\|/terms" src/components/layout/Header.astro`
Expected: 0 (tak ada lagi Case Study/S&K/terms di header).

Run: `grep -n "Partner\|mediawaktu\|nav-kontak-btn\|linksBefore\|linksAfter" src/components/layout/Header.astro`
Expected: muncul.

- [ ] **Step 6: Commit** (controller)

---

## Task 2: Footer — Halaman col + nested whitelist + tagline

**Files:** Modify `src/components/layout/Footer.astro`, `src/data/site.ts`

- [ ] **Step 1: Tambah `footerTagline` di `site.ts`** — setelah baris `shortDescription: '...',` (cari `shortDescription`), tambahkan:
```ts
  footerTagline: 'Agensi digital marketing Semarang untuk jasa pembuatan website, sewa akun whitelist Google Ads & Meta Ads, dan konsultasi digital marketing untuk UMKM dan brand di Indonesia',
```

- [ ] **Step 2: Footer — kolom Layanan (nested whitelist)** — ganti blok:
```astro
      <h4>Layanan</h4>
      <ul>
        <li><a href="/services/website">Website Development</a></li>
        <li><a href="/services/sewa-akun">Sewa Akun</a></li>
        <li><a href="/services/konsultasi">Konsultasi Digital Marketing</a></li>
      </ul>
```
dengan:
```astro
      <h4>Layanan</h4>
      <ul>
        <li><a href="/services/website">Website Development</a></li>
        <li>
          <a href="/services/sewa-akun">Sewa Akun</a>
          <ul class="footer-subnav">
            <li><a href="/meta-whitelist">Meta Whitelist</a></li>
            <li><a href="/google-whitelist">Google Whitelist</a></li>
          </ul>
        </li>
        <li><a href="/services/konsultasi">Konsultasi Digital Marketing</a></li>
      </ul>
```

- [ ] **Step 3: Footer — kolom Mengenai → Halaman** — ganti blok:
```astro
      <h4>Mengenai</h4>
      <ul>
        <li><a href="/tentang">Tentang Kami</a></li>
        <li><a href="/case-study">Case Study</a></li>
        <li><a href="/#faq">FAQ</a></li>
        <li><a href="/terms">S&K</a></li>
      </ul>
```
dengan:
```astro
      <h4>Halaman</h4>
      <ul>
        <li><a href="/tentang">Tentang</a></li>
        <li><a href="/case-study">Partner</a></li>
        <li><a href="/#faq">FAQ</a></li>
        <li><a href="https://mediawaktu.com" target="_blank" rel="noopener noreferrer">Blog ↗</a></li>
        <li><a href="/terms">Ketentuan</a></li>
      </ul>
```

- [ ] **Step 4: Footer — deskripsi pakai footerTagline** — cari baris di Footer yang render deskripsi:
```astro
      <p style="font-size:14px;color:var(--ink-300);max-width:280px;line-height:1.6;">{site.description}</p>
```
ganti `{site.description}` → `{site.footerTagline}`:
```astro
      <p style="font-size:14px;color:var(--ink-300);max-width:280px;line-height:1.6;">{site.footerTagline}</p>
```

- [ ] **Step 5: Tambah CSS footer-subnav** — di `<style>` Footer (sebelum `</style>`), tambahkan:
```css
  .footer-subnav { list-style: none; padding: 6px 0 0 14px; margin: 6px 0 0; display: flex; flex-direction: column; gap: 8px; border-left: 1px solid rgba(255,255,255,0.12); }
  .footer-subnav li::before { content: "› "; color: var(--ink-300); }
```

- [ ] **Step 6: Verifikasi**

Run: `bun run check` → 0 errors.
Run: `grep -c "Mengenai\|Case Study\|>S&K<" src/components/layout/Footer.astro` → 0.
Run: `grep -n "Halaman\|footer-subnav\|meta-whitelist\|footerTagline" src/components/layout/Footer.astro` → muncul.

- [ ] **Step 7: Commit** (controller)

---

## Task 3: "Case Study" → "Partner" relabel (home + index)

**Files:** Modify `src/components/sections/CaseStudiesPreview.astro`, `src/pages/case-study/index.astro`

- [ ] **Step 1: CaseStudiesPreview heading** — ganti:
```astro
    <h2 class="section-title">Case Study Pilihan</h2>
    <p class="section-sub" style="margin-bottom:40px;">Hasil dari brand yang udah kerja bareng kami.</p>
```
dengan:
```astro
    <h2 class="section-title">Partner Pilihan</h2>
    <p class="section-sub" style="margin-bottom:40px;">Brand &amp; partner yang sudah tumbuh bareng kami.</p>
```

- [ ] **Step 2: case-study index — SEO title** — ganti:
```astro
  title="Case Study Tentaklik — Hasil Nyata Klien Digital Marketing"
  description="Kumpulan case study Tentaklik: hasil nyata Google Ads, Meta Ads, dan website klien — angka sebenarnya, periode jelas, dan strategi di baliknya."
```
dengan:
```astro
  title="Partner Tentaklik — Hasil Nyata Klien Digital Marketing"
  description="Partner & brand yang tumbuh bareng Tentaklik: hasil nyata Google Ads, Meta Ads, dan website — angka sebenarnya, periode jelas, dan strategi di baliknya."
```

- [ ] **Step 3: case-study index — keywords** — ganti baris:
```astro
  keywords={['case study tentaklik', 'portofolio digital marketing', 'hasil google ads', 'hasil meta ads', 'case study website']}
```
dengan:
```astro
  keywords={['partner tentaklik', 'case study tentaklik', 'portofolio digital marketing', 'hasil google ads', 'hasil meta ads']}
```

- [ ] **Step 4: case-study index — eyebrow + H1 + lede** — ganti:
```astro
      <span class="eyebrow">Case Study</span>
      <h1 style="font-size:48px;margin-top:18px;margin-bottom:14px;">
        Hasil nyata, bukan <span style="color:var(--orange-500);">cherry-picked</span>.
      </h1>
      <p style="font-size:17px;color:var(--ink-500);max-width:620px;margin:0 auto;">
        Kumpulan project yang kami kerjakan — angka yang sebenarnya, periode yang jelas, dan strategi di baliknya.
      </p>
```
dengan:
```astro
      <span class="eyebrow">Partner</span>
      <h1 style="font-size:48px;margin-top:18px;margin-bottom:14px;">
        Partner yang tumbuh, bukan sekadar <span style="color:var(--orange-500);">cherry-picked</span>.
      </h1>
      <p style="font-size:17px;color:var(--ink-500);max-width:620px;margin:0 auto;">
        Brand &amp; partner yang kami dampingi — angka yang sebenarnya, periode yang jelas, dan strategi di baliknya.
      </p>
```

- [ ] **Step 5: case-study index — breadcrumb name** — cari `{ name: 'Case Study', url }` (baris ~17) ganti jadi `{ name: 'Partner', url }`. Dan jsonLd itemList name `'Case Study Tentaklik'` (baris ~25) → `'Partner Tentaklik'`.

- [ ] **Step 6: Verifikasi**

Run: `bun run check` → 0 errors.
Run: `grep -c "Partner Pilihan\|>Partner<\|Partner Tentaklik" src/components/sections/CaseStudiesPreview.astro src/pages/case-study/index.astro` → ≥3 total.

- [ ] **Step 7: Commit** (controller)

---

## Task 4: Terms email → tentaklik@mediapro.work

**Files:** Modify `src/data/terms-sections.ts`

- [ ] **Step 1: Ganti kedua occurrence** `admin@tentaklik.com` → `tentaklik@mediapro.work` (baris 99 + 150). Lakukan replace_all pada string `admin@tentaklik.com` → `tentaklik@mediapro.work` (muncul di mailto href + teks; ganti semua).

Edit (replace_all true) old: `admin@tentaklik.com` new: `tentaklik@mediapro.work`.

- [ ] **Step 2: Verifikasi**

Run: `bun run check` → 0 errors.
Run: `grep -c "admin@tentaklik.com" src/data/terms-sections.ts` → 0.
Run: `grep -c "tentaklik@mediapro.work" src/data/terms-sections.ts` → 2.

- [ ] **Step 3: Commit** (controller)

---

## Task 5: LP data — decouple benefits + INDUSTRIES_LP + platform

**Files:** Modify `src/data/whitelist-lp.ts`

- [ ] **Step 1: Hapus import META_WL/GOOGLE_WL** — ganti baris 4:
```ts
import { META_WL, GOOGLE_WL } from '@data/sewa-akun';
```
dengan:
```ts
import type { Industry } from '@data/sewa-akun';
```

- [ ] **Step 2: Meta benefits** — ganti `benefits: META_WL.benefits,` dengan literal:
```ts
  benefits: [
    'Akun stabil, minim risiko random restrict',
    'Tidak ada limit spending harian — bebas scale',
    'Tidak dikenakan PPN',
    'Support appeal melalui jalur langsung ke tim Meta',
    'Saldo otomatis pindah ke akun pengganti jika terjadi disable (syarat & ketentuan berlaku)',
    'Free mentorship Google Ads & Meta Ads',
    'Support teknis langsung ke tim expert Meta & Google',
  ],
```

- [ ] **Step 3: Google benefits** — ganti `benefits: GOOGLE_WL.benefits,` dengan literal:
```ts
  benefits: [
    'Risiko suspend lebih rendah dibanding akun Google Ads personal biasa',
    'Tidak ada batas maksimal spending harian — cocok untuk skala besar',
    'Tidak dikenakan PPN',
    'Proses appeal lebih cepat karena terhubung langsung ke Google Partner',
    'Saldo otomatis pindah ke akun pengganti jika terjadi disable (syarat & ketentuan berlaku)',
    'Free mentorship Google Ads & Meta Ads',
    'Support teknis langsung ke tim expert Meta & Google',
  ],
```

- [ ] **Step 4: Tambah INDUSTRIES_LP** — sebelum `const CTA_HREF` (baris 25), tambahkan:
```ts
// Kategori industri khusus 2 LP whitelist (beda dari sewa-akun).
export const INDUSTRIES_LP: Industry[] = [
  { label: 'NGO / Yayasan',        icon: '🤝', tint: '#E6F4F7' },
  { label: 'UMKM',                 icon: '🏪', tint: '#FFF1E6' },
  { label: 'Kesehatan',            icon: '🩺', tint: '#E7F6EC' },
  { label: 'Fashion',              icon: '👗', tint: '#FCE7F3' },
  { label: 'Produk Kecantikan',   icon: '💄', tint: '#F3E8FF' },
  { label: 'Konsultan Pendidikan', icon: '🎓', tint: '#E8F0FE' },
];

export const INDUSTRY_LP_HEADING = {
  title: 'Cocok untuk berbagai industri',
  sub: 'Umumnya digunakan oleh advertiser di industri:',
} as const;
```

- [ ] **Step 5: Verifikasi**

Run: `bun run check` → 0 errors. (Memastikan benefit literal + INDUSTRIES_LP tipe Industry valid, import type resolve.)
Run: `grep -c "Free mentorship\|Tidak dikenakan PPN\|INDUSTRIES_LP\|tim expert" src/data/whitelist-lp.ts` → ≥6.
Run: `grep -c "semua tipe campaign" src/data/whitelist-lp.ts` → 0.

- [ ] **Step 6: Commit** (controller)

---

## Task 6: IndustriesGrid — prop `center`

**Files:** Modify `src/components/sections/IndustriesGrid.astro`

- [ ] **Step 1: Tambah prop `center`** — ganti blok frontmatter:
```astro
interface Props {
  items: Industry[];
  heading: { title: string; sub: string };
  bg?: 'warm' | 'default';
}
const { items, heading, bg = 'default' } = Astro.props;
const sectionStyle = bg === 'warm' ? 'background:var(--bg-warm);' : '';
```
dengan:
```astro
interface Props {
  items: Industry[];
  heading: { title: string; sub: string };
  bg?: 'warm' | 'default';
  center?: boolean;
}
const { items, heading, bg = 'default', center = false } = Astro.props;
const sectionStyle = bg === 'warm' ? 'background:var(--bg-warm);' : '';
```

- [ ] **Step 2: Terapkan center ke grid wrapper** — ganti:
```astro
    <div class="industri-grid">
```
dengan:
```astro
    <div class={`industri-grid ${center ? 'industri-center' : ''}`}>
```

- [ ] **Step 3: Tambah CSS center** — di `<style>` sebelum `@media (max-width: 760px)`, tambahkan:
```css
  .industri-center .industri-card {
    align-items: center;
    text-align: center;
  }
```

- [ ] **Step 4: Verifikasi**

Run: `bun run check` → 0 errors.
Run: `grep -c "center\b" src/components/sections/IndustriesGrid.astro` → ≥3.

- [ ] **Step 5: Commit** (controller)

---

## Task 7: LpShortForm component

**Files:** Create `src/components/sections/lp/LpShortForm.astro`

- [ ] **Step 1: Buat file** dengan isi PERSIS:

```astro
---
import ArrowRight from '@components/icons/ArrowRight.astro';

interface Props {
  platform: 'meta' | 'google';
  heading?: string;
  sub?: string;
}
const { platform, heading = 'Ajukan Akun Whitelist', sub = 'Isi data singkat, tim kami hubungi kamu.' } = Astro.props;
const formId = `shortform-${platform}`;
---
<section aria-labelledby="shortform-heading">
  <div class="container" style="max-width:620px;">
    <h2 id="shortform-heading" class="section-title">{heading}</h2>
    <p class="section-sub" style="margin-bottom:32px;">{sub}</p>
    <form id={formId} class="shortform" data-platform={platform} novalidate>
      <input type="text" name="website" tabindex="-1" autocomplete="off" class="sf-hp" aria-hidden="true" />
      <div class="sf-field">
        <label for={`${formId}-nama`}>Nama Lengkap</label>
        <input id={`${formId}-nama`} type="text" name="nama" placeholder="Nama Anda" required maxlength="100" />
      </div>
      <div class="sf-field">
        <label for={`${formId}-wa`}>Nomor WhatsApp</label>
        <input id={`${formId}-wa`} type="tel" name="whatsapp" placeholder="0812-xxxx-xxxx" required maxlength="20" />
      </div>
      <div class="sf-field">
        <label for={`${formId}-ket`}>Keterangan Project Singkat</label>
        <textarea id={`${formId}-ket`} name="keterangan" placeholder="Produk/jasa, target, dan kebutuhan akun..." rows="3" maxlength="500"></textarea>
      </div>
      <button type="submit" class="btn btn-primary" style="justify-content:center;width:100%;">Kirim <ArrowRight size={14} /></button>
      <p class="sf-sent" hidden>Terkirim! Tim kami akan menghubungi kamu via WhatsApp.</p>
      <p class="sf-err" hidden></p>
    </form>
  </div>
</section>

<style>
  .shortform {
    background: white;
    border: 1px solid var(--ink-100);
    border-radius: var(--radius-xl);
    padding: 28px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .sf-hp { position: absolute; left: -9999px; width: 1px; height: 1px; opacity: 0; }
  .sf-field { display: flex; flex-direction: column; gap: 6px; }
  .sf-field label { font-size: 13px; font-weight: 600; color: var(--ink-700); }
  .sf-field input, .sf-field textarea {
    font: inherit; padding: 12px 14px;
    border-radius: var(--radius-md);
    border: 1.5px solid var(--ink-100); background: white;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
  }
  .sf-field input:focus, .sf-field textarea:focus {
    outline: none; border-color: var(--orange-500);
    box-shadow: 0 0 0 3px rgba(255,107,26,0.15);
  }
  .sf-field textarea { resize: vertical; min-height: 80px; }
  .sf-sent { color: #15803d; font-size: 14px; font-weight: 600; margin: 0; }
  .sf-err { color: #b91c1c; font-size: 14px; margin: 0; }
</style>

<script>
  // Shortform whitelist → Google Apps Script Sheet (GET fire-and-forget).
  // Ganti SHORTFORM_URL dengan URL /exec setelah deploy Apps Script (lihat docs/apps-script/SETUP.md).
  const SHORTFORM_URL = 'PASTE_APPS_SCRIPT_EXEC_URL';
  const forms = document.querySelectorAll<HTMLFormElement>('form.shortform');
  const NAME_RE = /^[\p{L}\p{M}\s.\-']{2,100}$/u;
  const PHONE_RE = /^[0-9+\-\s()]{6,20}$/;
  const CTRL_RE = new RegExp('[\\u0000-\\u001F\\u007F]', 'g');
  const clip = (v: string, n: number) => v.replace(CTRL_RE, ' ').slice(0, n).trim();

  forms.forEach((form) => {
    const sent = form.querySelector<HTMLElement>('.sf-sent');
    const err  = form.querySelector<HTMLElement>('.sf-err');
    const platform = form.getAttribute('data-platform') ?? '';
    const showErr = (t: string) => { if (err) { err.textContent = t; err.hidden = false; setTimeout(() => { err.hidden = true; }, 5000); } };

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      if (String(fd.get('website') ?? '').length > 0) return; // honeypot
      const nama = clip(String(fd.get('nama') ?? ''), 100);
      const wa   = clip(String(fd.get('whatsapp') ?? ''), 20);
      const ket  = clip(String(fd.get('keterangan') ?? ''), 500);
      if (!NAME_RE.test(nama)) { showErr('Nama tidak valid (2–100 karakter).'); return; }
      if (!PHONE_RE.test(wa))  { showErr('Nomor WhatsApp tidak valid.'); return; }

      if (SHORTFORM_URL && SHORTFORM_URL.indexOf('http') === 0) {
        const params = new URLSearchParams({
          platform: platform, nama: nama, whatsapp: wa,
          keterangan: ket, source: window.location.href,
        });
        fetch(SHORTFORM_URL + '?' + params.toString(), { mode: 'no-cors' }).catch(() => {});
      }
      form.reset();
      if (sent) sent.hidden = false;
    });
  });
</script>
```

- [ ] **Step 2: Verifikasi**

Run: `bun run check` → 0 errors.

- [ ] **Step 3: Commit** (controller)

---

## Task 8: meta-whitelist page — industri LP + shortform

**Files:** Modify `src/pages/meta-whitelist.astro`

- [ ] **Step 1: Update import data** — ganti baris:
```astro
import { META_LP, CTA_HREF } from '@data/whitelist-lp';
import { INDUSTRIES, INDUSTRY_HEADING } from '@data/sewa-akun';
```
dengan:
```astro
import LpShortForm from '@components/sections/lp/LpShortForm.astro';
import { META_LP, CTA_HREF, INDUSTRIES_LP, INDUSTRY_LP_HEADING } from '@data/whitelist-lp';
```

- [ ] **Step 2: Update body** — ganti:
```astro
  <IndustriesGrid items={INDUSTRIES} heading={INDUSTRY_HEADING} bg="warm" />
  <LpFinalCta title={d.cta.title} desc={d.cta.desc} btn={d.cta.btn} href={CTA_HREF} />
```
dengan:
```astro
  <IndustriesGrid items={INDUSTRIES_LP} heading={INDUSTRY_LP_HEADING} bg="warm" center />
  <LpShortForm platform="meta" />
  <LpFinalCta title={d.cta.title} desc={d.cta.desc} btn={d.cta.btn} href={CTA_HREF} />
```

- [ ] **Step 3: Verifikasi**

Run: `bun run check` → 0 errors.
Run: `grep -c "INDUSTRIES_LP\|LpShortForm\|center" src/pages/meta-whitelist.astro` → ≥3.

- [ ] **Step 4: Commit** (controller)

---

## Task 9: google-whitelist page — industri LP + shortform

**Files:** Modify `src/pages/google-whitelist.astro`

- [ ] **Step 1: Update import data** — ganti baris:
```astro
import { GOOGLE_LP, CTA_HREF } from '@data/whitelist-lp';
import { INDUSTRIES, INDUSTRY_HEADING } from '@data/sewa-akun';
```
dengan:
```astro
import LpShortForm from '@components/sections/lp/LpShortForm.astro';
import { GOOGLE_LP, CTA_HREF, INDUSTRIES_LP, INDUSTRY_LP_HEADING } from '@data/whitelist-lp';
```

- [ ] **Step 2: Update body** — ganti:
```astro
  <IndustriesGrid items={INDUSTRIES} heading={INDUSTRY_HEADING} bg="warm" />
  <LpFinalCta title={d.cta.title} desc={d.cta.desc} btn={d.cta.btn} href={CTA_HREF} />
```
dengan:
```astro
  <IndustriesGrid items={INDUSTRIES_LP} heading={INDUSTRY_LP_HEADING} bg="warm" center />
  <LpShortForm platform="google" />
  <LpFinalCta title={d.cta.title} desc={d.cta.desc} btn={d.cta.btn} href={CTA_HREF} />
```

- [ ] **Step 3: Verifikasi**

Run: `bun run check` → 0 errors.
Run: `grep -c "INDUSTRIES_LP\|LpShortForm\|center" src/pages/google-whitelist.astro` → ≥3.

- [ ] **Step 4: Commit** (controller)

---

## Task 10: Apps Script deliverable

**Files:** Create `docs/apps-script/whitelist-form.gs`, `docs/apps-script/SETUP.md`

- [ ] **Step 1: Buat `docs/apps-script/whitelist-form.gs`** dengan isi PERSIS:

```javascript
/**
 * Tentaklik — Whitelist Shortform handler (Google Apps Script).
 * Menerima submission dari /meta-whitelist & /google-whitelist,
 * disimpan ke 2 tab terpisah ("Meta Whitelist" & "Google Whitelist")
 * dalam SATU Google Spreadsheet.
 *
 * Deploy: Extensions > Apps Script (dari Spreadsheet) > paste > Deploy > Web app.
 * Lihat SETUP.md.
 */

var HEADERS = ['Timestamp', 'Nama', 'WhatsApp', 'Keterangan', 'Source URL'];

function doGet(e) {
  try {
    var p = (e && e.parameter) ? e.parameter : {};
    var platform = String(p.platform || '').toLowerCase();
    var sheetName = platform === 'google' ? 'Google Whitelist'
                  : platform === 'meta'   ? 'Meta Whitelist'
                  : 'Lainnya';

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    }
    // Header (auto bila kosong) + styling
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      var hr = sheet.getRange(1, 1, 1, HEADERS.length);
      hr.setFontWeight('bold').setBackground('#FF6B1A').setFontColor('#FFFFFF');
      sheet.setFrozenRows(1);
      sheet.setColumnWidth(1, 160);
      sheet.setColumnWidth(2, 180);
      sheet.setColumnWidth(3, 150);
      sheet.setColumnWidth(4, 360);
      sheet.setColumnWidth(5, 240);
    }

    var clip = function (v, n) { return String(v == null ? '' : v).replace(new RegExp('[\\u0000-\\u001F\\u007F]', 'g'), ' ').slice(0, n).trim(); };
    var row = [
      new Date(),
      clip(p.nama, 100),
      clip(p.whatsapp, 20),
      clip(p.keterangan, 500),
      clip(p.source, 300)
    ];
    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true, sheet: sheetName }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Form di web pakai GET (fire-and-forget). doPost dialihkan ke doGet bila perlu.
function doPost(e) { return doGet(e); }
```

- [ ] **Step 2: Buat `docs/apps-script/SETUP.md`** dengan isi PERSIS:

```markdown
# Setup Shortform Whitelist → Google Sheet

Form di `/meta-whitelist` & `/google-whitelist` mengirim data ke satu Google Spreadsheet,
terpisah ke 2 tab: **Meta Whitelist** dan **Google Whitelist**.

## Langkah

1. **Buat Spreadsheet**
   - Buka https://sheets.google.com (login sebagai `web@mediapro.work`).
   - Buat spreadsheet baru, beri nama mis. `Tentaklik — Whitelist Leads`.
   - (Tab dibuat otomatis oleh script saat submission pertama; tidak perlu bikin manual.)

2. **Pasang Apps Script**
   - Di spreadsheet: menu **Extensions → Apps Script**.
   - Hapus isi default, **paste** seluruh isi `whitelist-form.gs`.
   - Save (ikon disk / Ctrl+S).

3. **Deploy sebagai Web App**
   - Klik **Deploy → New deployment**.
   - Pilih tipe **Web app** (ikon gear → Web app).
   - **Description**: `whitelist form`.
   - **Execute as**: `Me (web@mediapro.work)`.
   - **Who has access**: `Anyone`.
   - Klik **Deploy**, izinkan permission (Authorize access).
   - Salin **Web app URL** (berakhiran `/exec`).

4. **Tempel URL ke website**
   - Buka `src/components/sections/lp/LpShortForm.astro`.
   - Ganti baris:
     ```js
     const SHORTFORM_URL = 'PASTE_APPS_SCRIPT_EXEC_URL';
     ```
     dengan URL `/exec` tadi.
   - Commit + build + deploy ulang website.

5. **Test**
   - Buka `/meta-whitelist`, isi form, submit → cek tab "Meta Whitelist".
   - Buka `/google-whitelist`, submit → cek tab "Google Whitelist".

## Catatan
- Data tersimpan: Timestamp, Nama, WhatsApp, Keterangan, Source URL.
- Header tab dibuat & di-styling otomatis (oranye, frozen row).
- Jika ubah script, **Deploy → Manage deployments → Edit → New version** (URL tetap sama).
```

- [ ] **Step 3: Verifikasi**

Run: `ls docs/apps-script/` → `whitelist-form.gs`, `SETUP.md`.

- [ ] **Step 4: Commit** (controller)

---

## Task 11: Build + verifikasi akhir (controller)

- [ ] **Step 1: Build** — `bun run build` → 0 error; rute lama + 2 LP ter-generate.

- [ ] **Step 2: Header** — `D=dist/client; [ -d "$D" ] || D=dist; grep -o "Beranda\|Tentang\|Layanan\|Partner\|FAQ\|Blog\|Kontak" "$D/index.html" | head` muncul; `grep -c "mediawaktu.com" "$D/index.html"` ≥1.

- [ ] **Step 3: Footer** — `grep -c "Halaman\|meta-whitelist\|footer-subnav" "$D/index.html"` ≥2; deskripsi pakai tagline (no titik akhir).

- [ ] **Step 4: Partner relabel** — `grep -c "Partner Pilihan" "$D/index.html"` ≥1; `grep -c "Partner" "$D/case-study/index.html"` ≥1.

- [ ] **Step 5: Terms email** — `grep -c "tentaklik@mediapro.work" "$D/terms/index.html"` ≥1; `grep -c "admin@tentaklik.com" "$D/terms/index.html"` = 0.

- [ ] **Step 6: LP benefit + industri + form** — untuk meta & google:
  - `grep -c "Free mentorship\|Tidak dikenakan PPN\|tim expert" "$D/meta-whitelist/index.html"` ≥3
  - `grep -c "semua tipe campaign" "$D/meta-whitelist/index.html"` = 0
  - `grep -c "Konsultan Pendidikan\|industri-center" "$D/meta-whitelist/index.html"` ≥1
  - `grep -c "shortform-meta\|Nomor WhatsApp" "$D/meta-whitelist/index.html"` ≥1
  - sama untuk google-whitelist (`shortform-google`).

- [ ] **Step 7: StickyWA tetap off di 2 LP** — `grep -c 'class="sticky-wa"' "$D/meta-whitelist/index.html"` = 0.

- [ ] **Step 8: Commit sisa (jika ada) + report.**

---

## Self-Review Notes

- **Spec coverage:** Header reorder+Blog+Kontak btn (T1), Footer Halaman+nested+tagline (T2), Partner relabel (T3), terms email (T4), LP benefit decouple+industri data (T5), IndustriesGrid center (T6), shortform comp (T7), 2 LP pages wire (T8-9), Apps Script (T10), verify (T11). ✅
- **Type consistency:** `INDUSTRIES_LP: Industry[]` (T5) pakai tipe `Industry` dari sewa-akun (import type). `INDUSTRY_LP_HEADING` shape {title,sub} cocok IndustriesGrid `heading` prop. `center?: boolean` (T6) dipakai T8-9. `LpShortForm` `platform` prop (T7) di-pass T8-9.
- **active union:** sudah punya `'faq'` + `'case'` — tak perlu ubah BaseLayout/Header union.
- **Route aman:** semua label-only; `/case-study`, `/terms`, `/tentang`, `/services/*` tetap. CTA LP tetap ke `/services/sewa-akun`.
- **site.description** tak diubah (SEO global); footer pakai `footerTagline` baru.
- **Shortform** placeholder URL jelas; form no-op aman sampai user deploy Apps Script (guard `indexOf('http')===0`).
- **Blog/Kontak** tak butuh `active` state (eksternal/button).
