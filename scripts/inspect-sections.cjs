const fs = require('fs');
const html = fs.readFileSync('template/index.html', 'utf8');
const regex = /<[^>]*class="[^"]*elementor-icon[^"]*"[^>]*>/g;
let match;
const found = new Set();
while ((match = regex.exec(html)) !== null) {
  found.add(match[0]);
}
console.log('All unique elementor-icon elements:');
found.forEach(f => console.log(f));
