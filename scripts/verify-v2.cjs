const fs = require('fs');
const code = fs.readFileSync('src/pages/v2.astro', 'utf8');
console.log('File length:', code.length);
console.log('Has overlay:', code.includes('id="mobile-menu-overlay"'));
console.log('Has mobile media query:', code.includes('@media (max-width: 767px)'));
console.log('Has setupMobileNav:', code.includes('setupMobileNav'));
console.log('Has WhatsApp CTA in dropdown:', code.includes('mobile-menu-cta-wrap'));
