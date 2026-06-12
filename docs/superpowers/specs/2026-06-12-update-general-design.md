# Design: Update General 12/6/26 (Header, Footer, Label, LP Whitelist, Shortform)

**Date:** 2026-06-12
**Source:** Google Doc tab "Update General 12/6/26" (Header, Url Web, Struktur, Footer, LP Baru) + 21 screenshot.
**Stack:** Astro 6 static, Tailwind v4 (global CSS), Cloudflare adapter, bun. Form pakai Google Apps Script Sheet (pola existing di `kontak.astro`).

## Keputusan terkunci (user)

| # | Topik | Keputusan |
|---|-------|-----------|
| 1 | service→layanan, terms→ketentuan, tentang | **Label saja**, route TIDAK berubah (no redirect) |
| 2 | Header Blog | Link eksternal `https://mediawaktu.com` (tab baru) |
| 3 | Header Kontak | Jadi tombol `btn-primary` (desktop + mobile) |
| 4 | Menu FAQ | Anchor `/#faq` (section beranda) |
| 5 | LP whitelist changes | HANYA di 2 LP (`/meta-whitelist`, `/google-whitelist`); `/services/sewa-akun` tetap |
| 6 | Kategori industri (2 LP) | 6 baru: NGO/Yayasan, UMKM, Kesehatan, Fashion, Produk Kecantikan, Konsultan Pendidikan; **center all device** |
| 7 | Footer Meta/Google Whitelist | **Sub dari "Sewa Akun"** (nested) |
| 8 | Shortform endpoint | Aku buatkan Apps Script + sheet terpisah Meta/Google; URL diisi user setelah deploy |
| 9 | Shortform posisi | Setelah industri, sebelum CTA akhir; CTA "Lihat Detail & Harga" tetap ada |
| 10 | S&K | Dihapus dari header → ke footer "Ketentuan Layanan" |

## Arsitektur

### A. Header — `src/components/layout/Header.astro`
Urutan menu baru: **Beranda · Tentang · Layanan ▾ · FAQ · Blog↗ · [Kontak]**

`links` array jadi:
```ts
const links = [
  { id: 'beranda', label: 'Beranda', href: '/' },
  { id: 'tentang', label: 'Tentang', href: '/tentang' },
  // Layanan dropdown disisipkan di posisi setelah Tentang (lihat markup)
  { id: 'faq',     label: 'FAQ',     href: '/#faq' },
];
```
- Dropdown "Layanan" tetap (Website/Sewa Akun/Konsultasi). Posisi: setelah "Tentang".
- **Blog**: item baru, `href="https://mediawaktu.com"`, `target="_blank" rel="noopener noreferrer"`, kecil panah ↗ (reuse pola atau `↗` text). BUKAN bagian `active` highlighting.
- **Kontak**: dipindah keluar `links`, render sebagai `<a href="/kontak" class="btn btn-primary nav-kontak-btn">Kontak</a>` di ujung nav (desktop). Mobile drawer: render sebagai tombol primary di bawah.
- Hapus item **S&K** dan **Case Study** dari `links` header (S&K → footer; Case Study → tidak lagi di nav utama per urutan baru doc). 
  - CATATAN: urutan doc TIDAK memuat "Case Study"/"Partner" di header → keluarkan dari nav header. Route & halaman tetap; akses via footer/home section.
- Markup desktop + mobile drawer ikut urutan baru. `active` union tetap (tambah `'faq'` bila perlu highlight; Blog/Kontak tak butuh active).
- Urutan render desktop: Beranda, Tentang, **[Layanan dropdown]**, FAQ, Blog↗, lalu `<a class="btn btn-primary">Kontak</a>`.

BaseLayout `active` union: tambah `'faq'`. (`'case'`, `'karir'`, `'snk'` tetap ada agar halaman lain tak error.)

### B. Label Indonesia (route tetap)
- Header "Tentang Kami" → **"Tentang"** (sudah di links di atas).
- Footer & tempat lain: pastikan label "Tentang Kami"→"Tentang" konsisten (Footer kolom). Route `/tentang` tetap.
- "terms"/"Ketentuan Layanan": footer legal link sudah "Ketentuan Layanan" — biarkan. Tidak ubah route `/terms`.

### C. Home "Case Study" → "Partner" (label saja, route tetap)
- `CaseStudiesPreview.astro:11`: "Case Study Pilihan" → **"Partner Pilihan"**.
- `src/pages/case-study/index.astro`: eyebrow "Case Study" (baris 38) → **"Partner"**; H1 & SEO judul boleh tetap "Case Study Tentaklik" (SEO) ATAU relabel "Partner" — **putusan: eyebrow + section label "Partner", H1 halaman index "Partner Pilihan", SEO title tetap** (hindari rusak SEO entity). Route `/case-study` tetap.
- Footer: jika ada link "Case Study" → label "Partner" (href tetap `/case-study`).
- Tidak relabel slug/route/breadcrumb URL.

### D. Footer — `src/components/layout/Footer.astro`
- Kolom **"Mengenai" → "Halaman"**, isi samakan menu header:
  - Tentang (`/tentang`), Layanan (`/services/sewa-akun` atau `/#layanan`), FAQ (`/#faq`), Blog (`https://mediawaktu.com`, tab baru), Ketentuan (`/terms`).
  - (Gantikan item S&K lama dengan "Ketentuan".)
- Kolom **"Layanan"**: tambah Meta Whitelist & Google Whitelist sebagai **sub dari Sewa Akun** (indent/nested):
  ```
  Website Development
  Sewa Akun
    › Meta Whitelist     (/meta-whitelist)
    › Google Whitelist   (/google-whitelist)
  Konsultasi Digital Marketing
  ```
  Nested pakai sub-list kecil (CSS indent + prefix). Hilangkan titik (.) di akhir kalimat deskripsi footer.
- Deskripsi footer (`site.description` dipakai di Footer): teks "Google Ads, Meta Ads" → **"sewa akun whitelist Google Ads & Meta Ads"**. CATATAN: `site.description` dipakai juga di SEO meta global. Agar tak ubah SEO sitewide, **buat string footer terpisah** (hardcode di Footer atau field `site.footerDesc`) — JANGAN ubah `site.description`. Putusan: tambah `site.footerTagline` di `site.ts`, Footer pakai itu; hilangkan titik akhir.

### E. Terms email — `src/data/terms-sections.ts`
- Section "Hubungi Kami" (num 14): `admin@tentaklik.com` (mailto + teks) → **`tentaklik@mediapro.work`**. (img12 konfirmasi masih admin@tentaklik.com.) Cek juga section "Hak Anda" (num 08) yang punya `admin@tentaklik.com` → ikut ganti ke `tentaklik@mediapro.work` untuk konsistensi.

### F. LP Whitelist — benefit decouple + industri + shortform
Karena "hanya 2 LP", **decouple benefit** dari `sewa-akun.ts`:
- `whitelist-lp.ts`: ganti `benefits: META_WL.benefits` → array literal per LP (copy isi + modifikasi). Hapus import `META_WL/GOOGLE_WL` (atau biarkan hanya kalau masih dipakai — tidak; hapus).
- **Meta benefits** (modif): 
  - Akun stabil, minim risiko random restrict
  - Tidak ada limit spending harian — bebas scale
  - **Tidak dikenakan PPN** (poin 2, sudah ada di Meta — pastikan ada)
  - ~~Bisa digunakan untuk semua tipe campaign…~~ **DIHAPUS** (poin 3)
  - Support appeal melalui jalur langsung ke tim Meta
  - Saldo otomatis pindah ke akun pengganti jika terjadi disable (syarat & ketentuan berlaku)
  - **+ Free mentorship Google Ads & Meta Ads** (poin 3)
  - **+ Support teknis langsung ke tim expert Meta & Google** (poin 3)
- **Google benefits** (modif):
  - Risiko suspend lebih rendah dibanding akun Google Ads personal biasa
  - Tidak ada batas maksimal spending harian — cocok untuk skala besar
  - **+ Tidak dikenakan PPN** (poin 2 — Google blm punya, tambahkan)
  - Proses appeal lebih cepat karena terhubung langsung ke Google Partner
  - Saldo otomatis pindah ke akun pengganti jika terjadi disable (syarat & ketentuan berlaku)
  - ~~Support teknis oleh tim Tentaklik…~~ → diganti pola expert (lihat bawah)
  - **+ Free mentorship Google Ads & Meta Ads** (poin 3)
  - **+ Support teknis langsung ke tim expert Meta & Google** (poin 3)
  - (Google tak punya "semua tipe campaign", jadi poin 3-hapus tak berlaku; cukup tambah 2 poin baru.)

**Industri 2 LP** — kategori baru + center:
- Data baru `INDUSTRIES_LP` di `whitelist-lp.ts` (atau `sewa-akun.ts`): NGO / Yayasan, UMKM, Kesehatan, Fashion, Produk Kecantikan, Konsultan Pendidikan (icon + tint).
- `IndustriesGrid.astro`: tambah prop `center?: boolean` → saat true, kartu/teks center semua device (text-align center, grid auto-fit center). 2 LP pakai `INDUSTRIES_LP` + `center`. `/services/sewa-akun` tetap `INDUSTRIES` lama (tanpa center).

**Shortform** — komponen baru `src/components/sections/lp/LpShortForm.astro`:
- Field: Nama Lengkap, Nomor WhatsApp, Keterangan project singkat (textarea). Tombol "Kirim".
- Submit: GET fire-and-forget ke `SHORTFORM_URL` + param `platform` (meta/google) + nama/wa/keterangan (pola `kontak.astro`).
- `SHORTFORM_URL` konstanta di komponen — placeholder jelas `'PASTE_APPS_SCRIPT_EXEC_URL'` sampai user deploy. Form tetap render & submit no-op aman bila belum diisi.
- Posisi di LP: setelah `IndustriesGrid`, sebelum `LpFinalCta`.
- Pass `platform` prop dari halaman (meta/google).

### G. Apps Script + Sheet (deliverable docs)
- `docs/apps-script/whitelist-form.gs`: `doGet(e)` — baca `e.parameter.platform` (meta|google), pilih sheet tab "Meta Whitelist" / "Google Whitelist", append row [timestamp, nama, whatsapp, keterangan]. Auto-create header bila kosong. Return JSON.
- `docs/apps-script/SETUP.md`: langkah — buat Google Spreadsheet (owner web@mediapro.work), 2 tab, paste script, Deploy > Web app (Execute as: me, Access: Anyone), copy `/exec` URL → tempel ke `SHORTFORM_URL` di `LpShortForm.astro`.

## Yang TIDAK berubah
- Route apa pun (semua label-only).
- `/services/sewa-akun` konten (kategori industri lama, benefit, harga).
- `site.description` (SEO global) — footer pakai field baru `footerTagline`.
- Form kontak existing.

## Verifikasi
- `bun run check` 0 error (prop `center`, `active` +faq, data baru).
- `bun run build` sukses; rute lama tetap.
- Header: urutan Beranda/Tentang/Layanan/FAQ/Blog/Kontak; Blog external _blank; Kontak btn-primary; no S&K/Case Study di header.
- Footer: kolom "Halaman"; Meta/Google Whitelist nested di bawah Sewa Akun; deskripsi tanpa titik akhir + "sewa akun whitelist".
- 2 LP: benefit (PPN, free mentorship, expert) ada; "semua tipe campaign" hilang di Meta; industri 6 kategori baru + center; shortform ada (3 field) sebelum CTA; CTA tetap.
- Terms: email tentaklik@mediapro.work.
- `docs/apps-script/` ada 2 file.

## File berubah/baru
| File | Aksi |
|------|------|
| `src/components/layout/Header.astro` | edit (urutan, Blog, Kontak btn, hapus S&K/Case) |
| `src/layouts/BaseLayout.astro` | edit (`active` +'faq') |
| `src/components/layout/Footer.astro` | edit (Halaman col, nested whitelist, tagline) |
| `src/data/site.ts` | edit (+`footerTagline`) |
| `src/components/sections/CaseStudiesPreview.astro` | edit ("Partner Pilihan") |
| `src/pages/case-study/index.astro` | edit (eyebrow/H1 "Partner") |
| `src/data/terms-sections.ts` | edit (email) |
| `src/data/whitelist-lp.ts` | edit (decouple benefit, +INDUSTRIES_LP) |
| `src/components/sections/IndustriesGrid.astro` | edit (+`center` prop) |
| `src/components/sections/lp/LpShortForm.astro` | **baru** |
| `src/pages/meta-whitelist.astro` | edit (industri LP, +shortform) |
| `src/pages/google-whitelist.astro` | edit (industri LP, +shortform) |
| `docs/apps-script/whitelist-form.gs` | **baru** |
| `docs/apps-script/SETUP.md` | **baru** |
