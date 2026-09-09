const fs = require('fs');

let html = fs.readFileSync('template/index.html', 'utf8');

// 1. Replace Header Logo BEFORE path replacements (clean inline sizing to fit template container)
html = html.replace(
  /<a href="index\.html">\s*<img src="assets\/images\/pertama-web-logo-[^"]+\.png"[^>]*>\s*<\/a>/gi,
  '<a href="#" class="header-logo-link"><img src="/logo-full.png" alt="Tentaklik" title="Tentaklik" class="header-logo-img" style="max-height: 42px; width: auto; max-width: 170px; display: inline-block;" /></a>'
);

// 1.2 Replace Favicons with official Tentaklik favicons
const tentaklikFavicons = `
	<link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />
	<link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="/icon-32.png" />
	<link rel="shortcut icon" href="/favicon.ico" />
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />`;

html = html.replace(
  /<link rel="icon"[^>]+32x32\.png"[^>]*>\s*<link rel="icon"[^>]+192x192\.png"[^>]*>\s*<link rel="apple-touch-icon"[^>]+180x180\.png"[^>]*>/gi,
  tentaklikFavicons
);

// 1.3 Replace Google Fonts: swap Jost & Poppins for Tentaklik's Inter & Plus Jakarta Sans
html = html.replace(
  /<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=Jost[^"]*" rel="stylesheet">/gi,
  '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:ital,wght@0,400..800;1,400..800&display=swap" rel="stylesheet">'
);

// 1.4 Replace Title and Meta descriptions with Tentaklik standards
html = html.replace(
  /<title>.*?<\/title>/gi,
  '<title>Jasa Pembuatan Website Profesional & Konversi Tinggi — Tentaklik</title>'
);
html = html.replace(
  /<meta name="description" content="[^"]*"\s*\/?>/gi,
  '<meta name="description" content="Jasa pembuatan website profesional untuk bisnis di Indonesia: landing page, company profile, hingga toko online. Fast loading, mobile-first, SEO-ready, dan didesain untuk konversi nyata." />'
);
html = html.replace(
  /<meta property="og:title" content="[^"]*"\s*\/?>/gi,
  '<meta property="og:title" content="Jasa Pembuatan Website Profesional & Konversi Tinggi — Tentaklik" />'
);
html = html.replace(
  /<meta property="og:description" content="[^"]*"\s*\/?>/gi,
  '<meta property="og:description" content="Jasa pembuatan website profesional untuk bisnis di Indonesia: landing page, company profile, hingga toko online. Fast loading, mobile-first, SEO-ready, dan didesain untuk konversi nyata." />'
);
html = html.replace(
  /<meta name="twitter:title" content="[^"]*"\s*\/?>/gi,
  '<meta name="twitter:title" content="Jasa Pembuatan Website Profesional & Konversi Tinggi — Tentaklik" />'
);
html = html.replace(
  /<meta name="twitter:description" content="[^"]*"\s*\/?>/gi,
  '<meta name="twitter:description" content="Jasa pembuatan website profesional untuk bisnis di Indonesia: landing page, company profile, hingga toko online. Fast loading, mobile-first, SEO-ready, dan didesain untuk konversi nyata." />'
);

// 1.5 Place Logo on left and Toggle on right on mobile: remove reverse-mobile/reverse-tablet
html = html.replace('elementor-reverse-tablet elementor-reverse-mobile', '');

// 1.8 Replace burger menu font icons with crisp, sharp SVGs matching Elementor class toggle
const svgMenuOpen = `<svg aria-hidden="true" class="elementor-menu-toggle__icon--open" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
const svgMenuClose = `<svg aria-hidden="true" class="elementor-menu-toggle__icon--close" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;

html = html.replace(/<i[^>]*class="[^"]*ti-menu"[^>]*><\/i>/gi, svgMenuOpen);
html = html.replace(/<i[^>]*class="[^"]*ti-close"[^>]*><\/i>/gi, svgMenuClose);

// 2. Replace all remaining asset paths cleanly
html = html.split('assets/css/').join('/template/assets/css/');
html = html.split('assets/js/').join('/template/assets/js/');
html = html.split('assets/images/').join('/template/assets/images/');

// 3. Replace relative links
html = html.split('href="index.html#').join('href="#');
html = html.split('href="index.html"').join('href="#"');

// 4. Replace WhatsApp contact number
html = html.split('phone=6282229292923').join('phone=6285129992225');

// 5. Replace Brand Name mentions
html = html.split('Pertama Web').join('Tentaklik');
html = html.split('Pertama web').join('Tentaklik');

// 6. SVG Icons for missing font icons (stats, users, check, design, database, helpdesk)
const svgCheck = `<svg aria-hidden="true" class="e-font-icon-svg e-fas-check" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>`;

const svgStats = `<svg aria-hidden="true" class="e-font-icon-svg e-fas-chart-line" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M496 384H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v336c0 17.67 14.33 32 32 32h464c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zM464 96H345.94c-21.38 0-32.09 25.85-16.97 40.97l31.94 31.94L267.03 262.75l-50.8-50.8c-6.25-6.25-16.38-6.25-22.63 0l-96 96c-6.25 6.25-6.25 16.38 0 22.63l22.63 22.63c6.25 6.25 16.38 6.25 22.63 0L205.7 290.35l50.8 50.8c6.25 6.25 16.38 6.25 22.63 0l115.17-115.17 31.94 31.94c15.13 15.11 40.97 4.41 40.97-16.97V112c0-8.84-7.16-16-16-16z"></path></svg>`;

const svgUsers = `<svg aria-hidden="true" class="e-font-icon-svg e-fas-users" viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C116.8 288 64 339.2 64 403.2V432c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48v-28.8c0-64-52.8-115.2-115.2-115.2zm-283.7-13.4C92.5 263.1 76.6 256 59 256H-5c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"></path></svg>`;

const svgDesign = `<svg aria-hidden="true" class="e-font-icon-svg e-fas-paint-brush" viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M565.6 202.6l-58.5-58.5c-16-16-45-16.5-60.5-.5l-235 235c-2.1 2.1-3.6 4.7-4.4 7.6L182.7 480c-2.4 8.4 5.2 16 13.6 13.6l93.8-24.5c2.9-.8 5.5-2.3 7.6-4.4l235-235c16-15.5 15.5-44.5-.5-60.5z"></path></svg>`;

const svgDatabase = `<svg aria-hidden="true" class="e-font-icon-svg e-fas-server" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M480 32H32C14.3 32 0 46.3 0 64v96c0 17.7 14.3 32 32 32h448c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32zm-64 88c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm64 96H32c-17.7 0-32 14.3-32 32v96c0 17.7 14.3 32 32 32h448c17.7 0 32-14.3 32-32v-96c0-17.7-14.3-32-32-32zm-64 88c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm64 96H32c-17.7 0-32 14.3-32 32v96c0 17.7 14.3 32 32 32h448c17.7 0 32-14.3 32-32v-96c0-17.7-14.3-32-32-32zm-64 88c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24z"></path></svg>`;

const svgHelpDesk = `<svg aria-hidden="true" class="e-font-icon-svg e-fas-laptop" viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M624 416H381.54c-.74 19.81-14.71 32-32.74 32H288c-18.69 0-33.02-17.47-32.77-32H16c-8.8 0-16 7.2-16 16v16c0 17.7 14.3 32 32 32h576c17.7 0 32-14.3 32-32v-16c0-8.8-7.2-16-16-16zM576 48H64C28.7 48 0 76.7 0 112v240c0 8.8 7.2 16 16 16h608c8.8 0 16-7.2 16-16V112c0-35.3-28.7-64-64-64zm-48 256H112V112h416v192z"></path></svg>`;

// Replace font icons in HTML
html = html.split('<i aria-hidden="true" class="icon icon-check"></i>').join(svgCheck);
html = html.split('<i aria-hidden="true" class="icon icon-stats-2"></i>').join(svgStats);
html = html.split('<i aria-hidden="true" class="icon icon-users"></i>').join(svgUsers);
html = html.split('<i aria-hidden="true" class="icon icon-design"></i>').join(svgDesign);
html = html.split('<i aria-hidden="true" class="icon icon-database1"></i>').join(svgDatabase);
html = html.split('<i aria-hidden="true" class="icon icon-help-desk"></i>').join(svgHelpDesk);

// 6.5 Ensure FAQ items start CLOSED by default
html = html.split('<div class="elementskit-card active">').join('<div class="elementskit-card">');
html = html.split('aria-expanded="true" aria-controls="Collapse-cc08ee36aa03ae232be3"').join('aria-expanded="false" aria-controls="Collapse-cc08ee36aa03ae232be3"');
html = html.split('aria-expanded="true" aria-controls="Collapse-cc08ee36aa03ae233288"').join('aria-expanded="false" aria-controls="Collapse-cc08ee36aa03ae233288"');
html = html.split('class=" show collapse"').join('class=" collapse"');

// 6.6 Fix skip-link target (#content) & normalize accordion href to match target IDs (#Collapse-...)
html = html.replace('class="elementor elementor-16"', 'class="elementor elementor-16" id="content"');
html = html.replace(/href="#collapse-([a-f0-9]+)"/gi, 'href="#Collapse-$1"');

// 6.8 Replace old blue WordPress footer with Tentaklik official footer
const tentaklikFooter = `
<footer class="footer">
  <div class="container footer-grid">
    <div>
      <div style="margin-bottom:16px;">
        <a href="#"><img src="/logo-white.png" alt="Tentaklik" style="height: 42px; width: auto; display: block;" /></a>
      </div>
      <p style="font-size:14px;color:#9CA3AF;max-width:300px;line-height:1.65;margin-bottom:0;">
        Penyedia solusi digital marketing terintegrasi yang menghadirkan akses akun whitelist Google Ads &amp; Meta Ads premium, optimasi website, dan konsultasi bisnis untuk mendukung pertumbuhan eksponensial brand di pasar lintas negara.
      </p>
      <div style="display:flex;gap:12px;margin-top:20px;">
        <a href="https://www.youtube.com/@tentaklikaja" aria-label="YouTube" target="_blank" rel="noopener noreferrer" class="footer-social-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
        <a href="https://www.instagram.com/tentaklikaja?igsh=cW5yMTZmZWtoaGw2" aria-label="Instagram" target="_blank" rel="noopener noreferrer" class="footer-social-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
        <a href="https://www.tiktok.com/@tentaklikaja" aria-label="TikTok" target="_blank" rel="noopener noreferrer" class="footer-social-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg></a>
        <a href="https://t.me/komunitastentaklik" aria-label="Telegram" target="_blank" rel="noopener noreferrer" class="footer-social-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.67-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.37-.49 1.02-.75 3.98-1.73 6.64-2.87 7.97-3.43 3.8-1.58 4.59-1.85 5.1-1.86.11 0 .36.03.52.16.14.11.18.26.2.37.01.07.03.27.01.43z"/></svg></a>
      </div>
    </div>
    <div>
      <h4>Layanan</h4>
      <ul>
        <li><a href="/layanan/website">Pembuatan Website</a></li>
        <li>
          <a href="/layanan/sewa-akun">Sewa Akun Iklan</a>
          <ul class="footer-subnav">
            <li><a href="/whitelist/metaads">Meta Whitelist</a></li>
            <li><a href="/whitelist/gads">Google Whitelist</a></li>
          </ul>
        </li>
        <li><a href="/layanan/konsultasi">Konsultasi Digital Marketing</a></li>
      </ul>
    </div>
    <div>
      <h4>Halaman</h4>
      <ul>
        <li><a href="/">Beranda</a></li>
        <li><a href="/tentang">Tentang</a></li>
        <li><a href="/partner">Partner</a></li>
        <li><a href="/#faq">FAQ</a></li>
        <li><a href="https://mediawaktu.com" target="_blank" rel="noopener noreferrer">Blog ↗</a></li>
      </ul>
    </div>
    <div>
      <h4>Kontak</h4>
      <ul>
        <li style="display:flex;align-items:center;gap:8px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.05 4.91A9.82 9.82 0 0012.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 004.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.01zM12.05 20.15h-.01a8.23 8.23 0 01-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 01-1.26-4.39c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 012.41 5.82c0 4.54-3.69 8.23-8.23 8.23zm4.51-6.16c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.12-1.04-.38-1.99-1.22-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.24-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43H8.96c-.16 0-.41.06-.62.31-.21.25-.81.79-.81 1.93s.83 2.24.95 2.39c.12.16 1.64 2.5 3.97 3.5.55.24.99.38 1.33.49.56.18 1.07.15 1.47.09.45-.07 1.39-.57 1.59-1.12.2-.55.2-1.02.14-1.12-.06-.1-.22-.16-.46-.28z"/></svg> <a href="https://wa.me/6285129992225?text=Halo%20Tentaklik!%20Saya%20ingin%20menanyakan%20lebih%20lanjut%20mengenai%20layanan%20digital%20marketing%20Anda.%20Bisa%20bantu%20saya%3F" target="_blank" rel="noopener noreferrer" class="footer-wa-link">085129992225</a></li>
        <li style="display:flex;align-items:center;gap:8px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> tentaklik@mediapro.work</li>
        <li style="display:flex;align-items:center;gap:8px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg> Semarang, Indonesia</li>
      </ul>
    </div>
  </div>
  <div class="container partner-row" style="margin-top:48px;padding-top:16px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:20px;">
    <span style="font-size:13px;color:#9CA3AF;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;">Official Partner</span>
    <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap;">
      <a href="https://www.google.com/partners/agency?id=1004085415" target="_blank" rel="noopener noreferrer" aria-label="Google Partner" class="partner-logo">
        <picture><source type="image/avif" srcset="/assets/partner-google.avif" /><source type="image/webp" srcset="/assets/partner-google.webp" /><img src="/assets/partner-google.png" alt="Google Partner" width="140" height="64" loading="lazy" decoding="async" /></picture>
      </a>
      <a href="https://www.facebook.com/business/partner-directory" target="_blank" rel="noopener noreferrer" aria-label="Meta Business Partner" class="partner-logo">
        <img src="/assets/partner-meta.png" alt="Meta Business Partner" width="140" height="64" loading="lazy" decoding="async" />
      </a>
      <a href="https://www.tiktok.com/business/en/partner" target="_blank" rel="noopener noreferrer" aria-label="TikTok Partner" class="partner-logo">
        <img src="/assets/tiktok-partner.png" alt="TikTok Partner" width="140" height="64" loading="lazy" decoding="async" />
      </a>
    </div>
  </div>
  <div class="container footer-legal" style="margin-top:28px;padding-top:12px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;font-size:13px;color:#9CA3AF;">
    <span>© 2025 Tentaklik. Hak cipta dilindungi. Dikelola oleh <strong style="color:#E5E8EC;font-weight:600;">PT Media Pro Indonesia</strong>.</span>
    <div style="display:flex;gap:20px;flex-wrap:wrap;">
      <a href="/ketentuan" class="footer-legal-link">Ketentuan Layanan</a>
      <a href="/disclaimer" class="footer-legal-link">Disclaimer</a>
    </div>
  </div>
</footer>
`;

const footerRegex = /<footer data-elementor-type="footer"[\s\S]*?<\/footer>/i;
html = html.replace(footerRegex, tentaklikFooter);

// 7. Tentaklik Unified Design System Overrides
const brandCss = `
<style is:inline>
  :root {
    --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    --font-heading: 'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    --e-global-typography-primary-font-family: 'Plus Jakarta Sans', sans-serif !important;
    --e-global-typography-secondary-font-family: 'Inter', sans-serif !important;
    --e-global-typography-text-font-family: 'Inter', sans-serif !important;
    --e-global-typography-accent-font-family: 'Plus Jakarta Sans', sans-serif !important;
    --e-global-color-d49ac81: #FF7A1A !important;
    --e-global-color-58a3f5b: #FF7A1A !important;
    --e-global-color-332724a: #FF7A1A !important;
    --e-global-color-435bebe: #FFA66A !important;
  }

  /* Global safe viewport */
  html, body {
    overflow-x: hidden;
    max-width: 100%;
  }

  /* ── 1. Tentaklik Typography ── */
  body, 
  .elementor, 
  .elementor p, 
  .elementor span:not(.elementor-counter-number):not(.elementor-price-table__integer-part), 
  .elementor li, 
  .elementor a, 
  .elementor input, 
  .elementor-widget-text-editor, 
  .elementor-widget-text-editor p,
  .elementor-icon-box-description, 
  .ekit-accordion-desc, 
  .ekit-accordion--content p,
  .elementor-price-table__description, 
  .elementor-price-table__features-list, 
  .elementor-icon-list-text,
  .elementor-counter-title {
    font-family: var(--font-sans) !important;
    line-height: 1.6 !important;
  }

  h1, h2, h3, h4, h5, h6,
  .elementor-heading-title,
  .elementor-price-table__header,
  .elementor-price-table__heading,
  .elementor-price-table__price,
  .elementor-price-table__integer-part,
  .elementor-counter-number-wrapper,
  .elementor-counter-number,
  .ekit-accordion-title,
  .elementor-icon-box-title,
  .elementor-icon-box-title span,
  .elementor-button,
  .btn {
    font-family: var(--font-heading) !important;
    letter-spacing: -0.02em !important;
  }

  .elementor-heading-title {
    font-weight: 700 !important;
    color: #0E1B2A !important;
  }

  /* ── 2. Tentaklik Signature Pill Badges (Eyebrows) ── */
  .elementor-element-3d6e6f05 .elementor-heading-title,
  .elementor-element-4dd281f7 .elementor-heading-title,
  .elementor-element-2bab9493 .elementor-heading-title,
  .elementor-element-3064da64 .elementor-heading-title {
    display: inline-flex !important;
    align-items: center !important;
    background: #FFF4EB !important;
    color: #FF7A1A !important;
    border: 1px solid #FFE3CC !important;
    padding: 6px 18px !important;
    border-radius: 999px !important;
    font-size: 13px !important;
    font-weight: 700 !important;
    letter-spacing: 0.04em !important;
    text-transform: uppercase !important;
    margin-bottom: 12px !important;
    box-shadow: 0 2px 8px rgba(255, 122, 26, 0.08) !important;
  }

  /* ── 3. Tentaklik Signature Pill Buttons ── */
  .elementor-button {
    border-radius: 999px !important;
    font-family: 'Plus Jakarta Sans', sans-serif !important;
    font-weight: 700 !important;
    letter-spacing: 0.01em !important;
    transition: all 0.25s ease !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    box-sizing: border-box !important;
  }

  /* General Elementor Button Defaults (Orange primary pill buttons) */
  .elementor-button, 
  .elementor-button:focus {
    background-color: #FF7A1A !important;
    color: #FFFFFF !important;
    border: 2px solid #FF7A1A !important;
    border-radius: 999px !important;
    box-shadow: 0 6px 18px rgba(255, 122, 26, 0.28) !important;
  }
  .elementor-button:hover {
    background-color: #F26416 !important;
    border-color: #F26416 !important;
    color: #FFFFFF !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 10px 24px rgba(255, 122, 26, 0.38) !important;
  }
  .elementor-button .elementor-button-text {
    color: inherit !important;
  }

  /* Hero Secondary Button: Right Button (Konsultasi) - Tentaklik Ghost/Outline Pill */
  .elementor-element.elementor-element-fb10aa8 .elementor-button,
  .elementor-element.elementor-element-fb10aa8 .elementor-button:focus {
    background-color: #FFFFFF !important;
    color: #0E1B2A !important;
    border: 2px solid #FF7A1A !important;
    border-radius: 999px !important;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04) !important;
  }
  .elementor-element.elementor-element-fb10aa8 .elementor-button .elementor-button-text,
  .elementor-element.elementor-element-fb10aa8 .elementor-button .elementor-button-content-wrapper {
    color: #0E1B2A !important;
    fill: #0E1B2A !important;
  }
  .elementor-element.elementor-element-fb10aa8 .elementor-button:hover {
    background-color: #FFF4EB !important;
    color: #FF7A1A !important;
    border-color: #FF7A1A !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 8px 18px rgba(255, 122, 26, 0.16) !important;
  }
  .elementor-element.elementor-element-fb10aa8 .elementor-button:hover .elementor-button-text,
  .elementor-element.elementor-element-fb10aa8 .elementor-button:hover .elementor-button-content-wrapper {
    color: #FF7A1A !important;
    fill: #FF7A1A !important;
  }

  /* Header Konsultasi Button (Desktop) - Solid orange pill button */
  .elementor-element-744cce71 .elementor-button {
    background-color: #FF7A1A !important;
    color: #FFFFFF !important;
    border: 2px solid #FF7A1A !important;
    border-radius: 999px !important;
    padding: 10px 24px !important;
    box-shadow: 0 4px 14px rgba(255, 122, 26, 0.24) !important;
  }
  .elementor-element-744cce71 .elementor-button:hover {
    background-color: #F26416 !important;
    border-color: #F26416 !important;
    color: #FFFFFF !important;
    transform: translateY(-1px) !important;
    box-shadow: 0 6px 18px rgba(255, 122, 26, 0.32) !important;
  }
  .elementor-element-744cce71 .elementor-button .elementor-button-text {
    color: #FFFFFF !important;
  }

  /* Pricing Package Buttons */
  /* Starter (elementor-element-48672874) & Bisnis (elementor-element-32bb167e): Tinted Pill */
  .elementor-element-48672874 .elementor-button,
  .elementor-element-32bb167e .elementor-button {
    background-color: #FFF4EB !important;
    color: #FF7A1A !important;
    border: 2px solid #FFC79A !important;
    border-radius: 999px !important;
    font-weight: 700 !important;
    box-shadow: 0 2px 8px rgba(255, 122, 26, 0.08) !important;
  }
  .elementor-element-48672874 .elementor-button .elementor-button-text,
  .elementor-element-32bb167e .elementor-button .elementor-button-text {
    color: #FF7A1A !important;
  }
  .elementor-element-48672874 .elementor-button:hover,
  .elementor-element-32bb167e .elementor-button:hover {
    background-color: #FF7A1A !important;
    color: #FFFFFF !important;
    border-color: #FF7A1A !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 8px 20px rgba(255, 122, 26, 0.3) !important;
  }
  .elementor-element-48672874 .elementor-button:hover .elementor-button-text,
  .elementor-element-32bb167e .elementor-button:hover .elementor-button-text {
    color: #FFFFFF !important;
  }

  /* Standard (Featured) Package: Solid Orange Primary Pill */
  .elementor-element-a92f3c7 .elementor-button {
    background-color: #FF7A1A !important;
    color: #FFFFFF !important;
    border: 2px solid #FF7A1A !important;
    border-radius: 999px !important;
    font-weight: 700 !important;
    box-shadow: 0 6px 20px rgba(255, 122, 26, 0.35) !important;
  }
  .elementor-element-a92f3c7 .elementor-button .elementor-button-text {
    color: #FFFFFF !important;
  }
  .elementor-element-a92f3c7 .elementor-button:hover {
    background-color: #F26416 !important;
    border-color: #F26416 !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 10px 26px rgba(255, 122, 26, 0.45) !important;
  }

  /* Final Bottom CTA Button */
  .elementor-element-3289532a .elementor-button {
    background-color: #FF7A1A !important;
    color: #FFFFFF !important;
    border: 2px solid #FF7A1A !important;
    border-radius: 999px !important;
    font-weight: 700 !important;
    padding: 14px 32px !important;
    box-shadow: 0 8px 24px rgba(255, 122, 26, 0.32) !important;
  }
  .elementor-element-3289532a .elementor-button:hover {
    background-color: #F26416 !important;
    border-color: #F26416 !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 12px 28px rgba(255, 122, 26, 0.42) !important;
  }

  /* ── 4. Tentaklik Pricing Cards & Container Styling ── */
  .elementor-element-1e9c81bf,
  .elementor-element-72c924a4 {
    border: 1.5px solid #E5E8EC !important;
    border-radius: 24px !important;
    background-color: #FFFFFF !important;
    box-shadow: 0 4px 20px rgba(31, 26, 23, 0.04) !important;
    transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease !important;
  }
  .elementor-element-1e9c81bf:hover,
  .elementor-element-72c924a4:hover {
    transform: translateY(-6px) !important;
    box-shadow: 0 16px 36px rgba(31, 26, 23, 0.08) !important;
    border-color: #FFC79A !important;
  }

  /* Featured Standard Package */
  .elementor-element-4b15f55e {
    border: 2.5px solid #FF7A1A !important;
    border-radius: 24px !important;
    background-color: #FFFFFF !important;
    box-shadow: 0 16px 40px rgba(255, 122, 26, 0.15) !important;
    position: relative !important;
    transition: transform 0.25s ease, box-shadow 0.25s ease !important;
  }
  .elementor-element-4b15f55e:hover {
    transform: translateY(-6px) !important;
    box-shadow: 0 20px 48px rgba(255, 122, 26, 0.24) !important;
  }

  /* Price Tags Typography */
  .elementor-element-7b9bf2a5 .elementor-heading-title,
  .elementor-element-124d90a4 .elementor-heading-title,
  .elementor-element-3373216d .elementor-heading-title {
    color: #FF7A1A !important;
    font-weight: 700 !important;
    font-size: 20px !important;
  }
  .elementor-element-13658b79 .elementor-heading-title,
  .elementor-element-619e5f99 .elementor-heading-title,
  .elementor-element-706b389d .elementor-heading-title {
    color: #0E1B2A !important;
    font-weight: 800 !important;
    letter-spacing: -0.03em !important;
  }

  /* Final CTA Container */
  .elementor-element-4d5bd2f0 {
    border-radius: 28px !important;
    background: linear-gradient(135deg, #FFF7ED 0%, #FFEEDD 100%) !important;
    border: 1.5px solid #FFD8BA !important;
    box-shadow: 0 10px 30px rgba(255, 122, 26, 0.08) !important;
  }

  /* Nav active items & counters */
  .elementor-item.elementor-item-active,
  .elementor-item:hover {
    color: #FF7A1A !important;
  }
  .elementor-counter-number-wrapper {
    color: #FF7A1A !important;
    font-weight: 800 !important;
  }
  .elementor-custom-embed-play {
    background: #FF7A1A !important;
    border-radius: 50% !important;
  }

  /* ── 5. Crisp white icons inside solid orange badges ── */
  .elementor-view-stacked .elementor-icon {
    background-color: #FF7A1A !important;
    color: #FFFFFF !important;
    fill: #FFFFFF !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    box-sizing: border-box !important;
    padding: 0 !important;
    margin: 0 !important;
  }
  .elementor-view-stacked.elementor-shape-square .elementor-icon {
    width: 60px !important;
    height: 60px !important;
    min-width: 60px !important;
    max-width: 60px !important;
    min-height: 60px !important;
    max-height: 60px !important;
    flex: 0 0 60px !important;
    border-radius: 16px !important;
    box-shadow: 0 4px 14px rgba(255, 122, 26, 0.22) !important;
  }
  .elementor-view-stacked.elementor-shape-circle .elementor-icon {
    width: 64px !important;
    height: 64px !important;
    min-width: 64px !important;
    max-width: 64px !important;
    min-height: 64px !important;
    max-height: 64px !important;
    flex: 0 0 64px !important;
    border-radius: 50% !important;
    box-shadow: 0 4px 14px rgba(255, 122, 26, 0.22) !important;
  }
  .elementor-view-stacked .elementor-icon svg {
    color: #FFFFFF !important;
    fill: #FFFFFF !important;
    width: 28px !important;
    height: 28px !important;
    max-width: 28px !important;
    max-height: 28px !important;
    display: block !important;
    margin: auto !important;
    flex-shrink: 0 !important;
  }
  .elementor-view-stacked .elementor-icon path {
    fill: #FFFFFF !important;
  }
  .elementor-widget-icon-box .elementor-icon-box-icon {
    display: inline-block !important;
    flex: 0 0 auto !important;
    line-height: 0 !important;
  }

  /* Orange checkmarks in hero list & pricing */
  .elementor-icon-list-icon svg {
    color: #FF7A1A !important;
    fill: #FF7A1A !important;
    width: 18px !important;
    height: 18px !important;
    display: inline-block !important;
    vertical-align: middle !important;
  }
  .elementor-icon-list-icon path {
    fill: #FF7A1A !important;
  }
  .elementor-icon-list-icon svg.e-fas-times-circle {
    color: #94A3B8 !important;
    fill: #94A3B8 !important;
  }
  .elementor-icon-list-icon svg.e-fas-times-circle path {
    fill: #94A3B8 !important;
  }

  /* Client logo carousel: exact template size, normal full color, NO hover effect */
  .elementor-widget-image-carousel .swiper {
    padding: 10px 0 !important;
  }
  .elementor-widget-image-carousel .swiper-slide {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    height: auto !important;
  }
  .elementor-widget-image-carousel .swiper-slide-inner {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    width: 100% !important;
    margin: 0 !important;
    min-height: 70px !important;
  }
  .swiper-slide-image {
    max-width: 100% !important;
    height: auto !important;
    max-height: 80px !important;
    width: auto !important;
    object-fit: contain !important;
    filter: none !important;
    opacity: 1 !important;
    transition: none !important;
    margin: 0 auto !important;
    display: block !important;
  }
  .swiper-slide-image:hover {
    filter: none !important;
    opacity: 1 !important;
  }

  /* Desktop default: hide hamburger menu toggle */
  .elementor-menu-toggle {
    display: none !important;
  }

  /* Tablet & Mobile Header */
  @media (max-width: 1024px) {
    .elementor-menu-toggle {
      cursor: pointer !important;
      -webkit-tap-highlight-color: transparent !important;
      user-select: none !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      width: 42px !important;
      height: 42px !important;
      padding: 0 !important;
      border: 1.5px solid #E2E8F0 !important;
      border-radius: 8px !important;
      background-color: #FFFFFF !important;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05) !important;
      color: #FF7A1A !important;
      transition: all 0.2s ease !important;
    }
    .elementor-menu-toggle:hover {
      border-color: #FF7A1A !important;
      background-color: #FFF7ED !important;
    }
    .elementor-menu-toggle svg {
      width: 24px !important;
      height: 24px !important;
      color: inherit !important;
      stroke: currentColor !important;
    }
    .elementor-menu-toggle .elementor-menu-toggle__icon--open {
      display: block !important;
    }
    .elementor-menu-toggle .elementor-menu-toggle__icon--close {
      display: none !important;
    }
    .elementor-menu-toggle.elementor-active .elementor-menu-toggle__icon--open,
    .elementor-menu-toggle[aria-expanded="true"] .elementor-menu-toggle__icon--open {
      display: none !important;
    }
    .elementor-menu-toggle.elementor-active .elementor-menu-toggle__icon--close,
    .elementor-menu-toggle[aria-expanded="true"] .elementor-menu-toggle__icon--close {
      display: block !important;
    }
    .elementor-51 .elementor-element.elementor-element-5db33051 > .elementor-container {
      display: flex !important;
      flex-direction: row !important;
      align-items: center !important;
      justify-content: space-between !important;
      flex-wrap: nowrap !important;
      width: 100% !important;
      box-sizing: border-box !important;
    }
    .elementor-51 .elementor-element.elementor-element-3d09dac8 {
      order: 1 !important;
      width: auto !important;
      flex: 0 0 auto !important;
      text-align: start !important;
    }
    .elementor-51 .elementor-element.elementor-element-109039f2 {
      text-align: start !important;
    }
    .elementor-51 .elementor-element.elementor-element-109039f2 .elementor-widget-container {
      text-align: start !important;
    }
    .elementor-51 .header-logo-link {
      display: inline-flex !important;
      align-items: center !important;
    }
    .elementor-51 .header-logo-img {
      max-height: 40px !important;
      width: auto !important;
      display: block !important;
    }
    .elementor-51 .elementor-element.elementor-element-79590ac3 {
      order: 2 !important;
      width: auto !important;
      flex: 0 0 auto !important;
      margin-left: auto !important;
      display: flex !important;
      justify-content: flex-end !important;
      align-items: center !important;
    }
    .elementor-51 .elementor-element.elementor-element-374310bb {
      width: auto !important;
    }
    .elementor-51 .elementor-element.elementor-element-374310bb .elementor-widget-container {
      display: flex !important;
      justify-content: flex-end !important;
      align-items: center !important;
    }
    .elementor-51 .elementor-element.elementor-element-79590ac3,
    .elementor-51 .elementor-element.elementor-element-79590ac3 .elementor-widget-wrap,
    .elementor-51 .elementor-element.elementor-element-374310bb,
    .elementor-51 .elementor-element.elementor-element-374310bb .elementor-widget-container {
      position: static !important;
    }
    .elementor-51 .elementor-element.elementor-element-5db33051 {
      position: relative !important;
    }
    .elementor-51 .elementor-element.elementor-element-374310bb .elementor-nav-menu--dropdown {
      position: absolute !important;
      left: 0 !important;
      right: 0 !important;
      width: 100% !important;
      top: 100% !important;
      z-index: 9999 !important;
      background-color: #FFFFFF !important;
      box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.1) !important;
      border-radius: 12px !important;
    }
    .elementor-51 .elementor-element.elementor-element-374310bb .elementor-nav-menu--dropdown .elementor-item {
      color: #1F2124 !important;
      padding: 12px 20px !important;
      display: block !important;
      font-weight: 500 !important;
      text-decoration: none !important;
    }
    .elementor-51 .elementor-element.elementor-element-374310bb .elementor-nav-menu--dropdown .elementor-item:hover,
    .elementor-51 .elementor-element.elementor-element-374310bb .elementor-nav-menu--dropdown .elementor-item.elementor-item-active {
      color: #FF7A1A !important;
      background-color: #FFF7ED !important;
    }
  }

  /* ── 6. FAQ Accordion Styling (Tentaklik Clean Rounded Cards) ── */
  .ekit-wid-con .elementskit-accordion .elementskit-card {
    border: 1px solid #E5E8EC !important;
    border-radius: 14px !important;
    overflow: hidden !important;
    margin-bottom: 14px !important;
    transition: border-color 0.2s ease, box-shadow 0.2s ease !important;
  }
  .ekit-wid-con .elementskit-accordion .elementskit-card:hover {
    border-color: #FFC79A !important;
    box-shadow: 0 4px 12px rgba(255, 122, 26, 0.06) !important;
  }
  .ekit-wid-con .elementskit-accordion .elementskit-card-header > .elementskit-btn-link {
    cursor: pointer !important;
    transition: background-color 0.25s ease, color 0.25s ease !important;
    padding: 16px 20px !important;
  }
  .ekit-wid-con .elementskit-accordion .elementskit-card-header > .elementskit-btn-link[aria-expanded="true"] {
    background-color: #FF7A1A !important;
    color: #FFFFFF !important;
    border-radius: 14px 14px 0 0 !important;
  }
  .ekit-wid-con .elementskit-accordion .elementskit-card-header > .elementskit-btn-link[aria-expanded="true"] .ekit-accordion-title {
    color: #FFFFFF !important;
    font-weight: 700 !important;
  }
  .ekit-wid-con .elementskit-accordion .elementskit-card-header > .elementskit-btn-link[aria-expanded="true"] .ekit_accordion_active_icon {
    display: block !important;
    color: #FFFFFF !important;
  }
  .ekit-wid-con .elementskit-accordion .elementskit-card-header > .elementskit-btn-link[aria-expanded="true"] .ekit_accordion_active_icon i {
    color: #FFFFFF !important;
  }
  .ekit-wid-con .elementskit-accordion .elementskit-card-header > .elementskit-btn-link[aria-expanded="true"] .ekit_accordion_normal_icon {
    display: none !important;
  }
  .ekit-wid-con .elementskit-accordion .elementskit-card-header > .elementskit-btn-link[aria-expanded="false"] {
    background-color: #F8FAFC !important;
    color: #0E1B2A !important;
    border-radius: 14px !important;
  }
  .ekit-wid-con .elementskit-accordion .elementskit-card-header > .elementskit-btn-link[aria-expanded="false"] .ekit-accordion-title {
    color: #0E1B2A !important;
    font-weight: 600 !important;
  }
  .ekit-wid-con .elementskit-accordion .elementskit-card-header > .elementskit-btn-link[aria-expanded="false"] .ekit_accordion_active_icon {
    display: none !important;
  }
  .ekit-wid-con .elementskit-accordion .elementskit-card-header > .elementskit-btn-link[aria-expanded="false"] .ekit_accordion_normal_icon {
    display: block !important;
    color: #FF7A1A !important;
  }
  .ekit-wid-con .elementskit-accordion .elementskit-card-header > .elementskit-btn-link[aria-expanded="false"] .ekit_accordion_normal_icon i {
    color: #FF7A1A !important;
  }
  .ekit-wid-con .elementskit-card-body.ekit-accordion--content {
    background-color: #FFFFFF !important;
    padding: 16px 20px 20px !important;
    color: #4B5563 !important;
    font-size: 15px !important;
    line-height: 1.65 !important;
  }
  .ekit-wid-con .collapse:not(.in):not(.show) {
    display: none !important;
  }
  .ekit-wid-con .collapse.in,
  .ekit-wid-con .collapse.show {
    display: block !important;
  }

  /* ── 7. Tentaklik Official Footer ── */
  .footer {
    background-color: #0E1B2A !important;
    color: #D1D5DB !important;
    padding: 64px 0 32px !important;
    margin-top: 40px !important;
    font-family: 'Inter', sans-serif !important;
    border: none !important;
  }
  .footer .container {
    max-width: 1200px !important;
    margin: 0 auto !important;
    padding: 0 24px !important;
    border: none !important;
  }
  .footer-grid {
    display: grid !important;
    grid-template-columns: 1.4fr 1fr 1fr 1.2fr !important;
    gap: 40px !important;
    border: none !important;
  }
  @media (max-width: 1024px) {
    .footer-grid {
      grid-template-columns: 1fr 1fr !important;
      gap: 32px 24px !important;
    }
  }
  @media (max-width: 768px) {
    .footer-grid {
      grid-template-columns: 1fr !important;
      gap: 28px !important;
      text-align: left !important;
    }
    .footer .container {
      padding-left: 16px !important;
      padding-right: 16px !important;
    }
    .partner-row {
      justify-content: center !important;
      text-align: center !important;
      gap: 14px !important;
      flex-direction: column !important;
    }
    .partner-row > span {
      width: 100% !important;
      text-align: center !important;
    }
    .partner-row > div {
      justify-content: center !important;
      width: 100% !important;
      display: flex !important;
      flex-wrap: wrap !important;
      gap: 12px !important;
    }
    .footer-legal {
      justify-content: center !important;
      text-align: center !important;
      gap: 12px !important;
      flex-direction: column !important;
    }
    .footer-legal > div {
      justify-content: center !important;
      width: 100% !important;
    }
  }
  .footer h4 {
    color: #FFFFFF !important;
    font-size: 16px !important;
    margin-bottom: 16px !important;
    font-weight: 700 !important;
    font-family: 'Plus Jakarta Sans', sans-serif !important;
  }
  .footer ul {
    list-style: none !important;
    padding: 0 !important;
    margin: 0 !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 10px !important;
    font-size: 14px !important;
    color: #9CA3AF !important;
    border: none !important;
  }
  .footer ul li {
    line-height: 1.6 !important;
    border: none !important;
  }
  .footer ul a {
    color: #9CA3AF !important;
    text-decoration: none !important;
    transition: color 0.15s ease !important;
  }
  .footer ul a:hover {
    color: #FFA66A !important;
  }
  .footer-subnav {
    list-style: none !important;
    padding: 6px 0 0 0 !important;
    margin: 6px 0 0 !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 8px !important;
    border: none !important;
  }
  .footer-subnav li::before {
    content: "› " !important;
    color: #9CA3AF !important;
  }
  .footer-social-btn {
    width: 36px !important;
    height: 36px !important;
    border-radius: 999px !important;
    background: rgba(255, 255, 255, 0.06) !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    color: #FFFFFF !important;
    transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease !important;
    border: none !important;
  }
  .footer-social-btn:hover {
    background: #FF7A1A !important;
    color: #FFFFFF !important;
    transform: translateY(-2px) !important;
  }
  .footer-legal-link {
    color: #9CA3AF !important;
    text-decoration: none !important;
    transition: color 0.15s !important;
  }
  .footer-legal-link:hover {
    color: #FFA66A !important;
  }
  .footer-wa-link {
    color: inherit !important;
    text-decoration: none !important;
    transition: color 0.15s !important;
  }
  .footer-wa-link:hover,
  .footer-wa-link:focus-visible {
    color: #FFA66A !important;
  }
  .partner-logo {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    background: #FFFFFF !important;
    border-radius: 8px !important;
    padding: 6px 14px !important;
    height: 48px !important;
    min-height: 48px !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18) !important;
    transition: transform 0.2s ease, box-shadow 0.2s ease !important;
    border: none !important;
  }
  .partner-logo:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25) !important;
  }
  .partner-logo picture {
    display: flex !important;
    align-items: center !important;
  }
  .partner-logo img {
    height: 32px !important;
    max-height: 32px !important;
    width: auto !important;
    max-width: 120px !important;
    object-fit: contain !important;
    filter: none !important;
    opacity: 1 !important;
    display: block !important;
  }
</style>
`;

html = html.replace('</head>', brandCss + '\n</head>');

// 8. Ensure is:inline on scripts so Astro doesn't defer or move them
html = html.split('<script src="/template/assets/js/').join('<script is:inline src="/template/assets/js/');

// 9. Prepend Astro frontmatter
const astroDoc = '---\n// Exact layout, sections, fonts, copywriting & responsive mode with Tentaklik primary design system\n---\n' + html;

fs.writeFileSync('src/pages/v2.astro', astroDoc, 'utf8');
console.log('SUCCESS: Generated v2.astro with Tentaklik primary design system!');
