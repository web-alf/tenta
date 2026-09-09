import fs from 'fs';

let html = fs.readFileSync('template/index.html', 'utf8');

// 1. Replace asset paths
html = html.replaceAll('href="assets/css/', 'href="/template/assets/css/');
html = html.replaceAll('src="assets/js/', 'src="/template/assets/js/');
html = html.replaceAll('src="assets/images/', 'src="/template/assets/images/');
html = html.replaceAll('srcset="assets/images/', 'srcset="/template/assets/images/');
html = html.replaceAll('assets/images/', '/template/assets/images/');

// 2. Replace relative links
html = html.replaceAll('href="index.html#', 'href="#');
html = html.replaceAll('href="index.html"', 'href="#"');

// 3. Replace WhatsApp contact number with Tentaklik's number
html = html.replaceAll('phone=6282229292923', 'phone=6285129992225');

// 4. Replace Header logo with Tentaklik official logo
html = html.replace(
  /<img src="\/template\/assets\/images\/pertama-web-logo-[^"]+\.png"[^>]*\/>/g,
  '<img src="/logo-full.png" alt="Tentaklik" style="height: 42px; width: auto; display: block;" />'
);

// 5. Replace Footer logo with Tentaklik white logo
html = html.replace(
  /<img src="\/template\/assets\/images\/pertamaweb-logo-white-[^"]+\.png"[^>]*\/>/g,
  '<img src="/logo-white.png" alt="Tentaklik" style="height: 42px; width: auto; display: block;" />'
);

// 6. Replace Brand Name mentions where relevant
html = html.replaceAll('Pertama Web', 'Tentaklik');
html = html.replaceAll('Pertama web', 'Tentaklik');

// 7. Inject style to ensure exact orange theme consistency
const customOrangeCss = `
<style>
  :root {
    --e-global-color-d49ac81: #FF7A1A !important;
    --e-global-color-58a3f5b: #FF7A1A !important;
    --e-global-color-332724a: #FFA66A !important;
    --e-global-color-435bebe: #FFA66A !important;
  }
  .elementor-button, 
  .elementor-button:hover,
  .elementor-button:focus {
    background-color: #FF7A1A !important;
  }
  .elementor-button:hover {
    background-color: #F26416 !important;
  }
  .elementor-item.elementor-item-active,
  .elementor-item:hover {
    color: #FF7A1A !important;
  }
  .elementor-icon-list-icon i,
  .elementor-icon-list-icon svg {
    color: #FF7A1A !important;
    fill: #FF7A1A !important;
  }
  .elementor-view-stacked .elementor-icon {
    background-color: #FF7A1A !important;
  }
  .elementor-counter-number-wrapper {
    color: #FF7A1A !important;
  }
  .elementor-custom-embed-play {
    background: #FF7A1A !important;
    border-radius: 50% !important;
  }
</style>
`;

html = html.replace('</head>', `${customOrangeCss}\n</head>`);

// Prepend Astro frontmatter
const astroFileContent = `---
// Generated exact template layout with Tentaklik orange theme & branding
---
${html}
`;

fs.writeFileSync('src/pages/v2.astro', astroFileContent, 'utf8');
console.log('src/pages/v2.astro created successfully!');
