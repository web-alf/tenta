// Sekali pakai: audit responsif lintas viewport via CDP.
// Cek overflow horizontal, tap target < 44px, teks kepotong, dan grid yang tak collapse.
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const target = process.argv[2] || 'http://localhost:4325/webinar-gads';
const shotDir = process.argv[3] || null;
const port = 9340;
const profile = path.join(os.tmpdir(), 'gads-resp-profile');

const VIEWPORTS = [
  { name: 'galaxy-fold',    w: 280,  h: 653,  mobile: true,  dpr: 3 },
  { name: 'iphone-se',      w: 320,  h: 568,  mobile: true,  dpr: 2 },
  { name: 'android-sm',     w: 360,  h: 740,  mobile: true,  dpr: 3 },
  { name: 'iphone-8',       w: 375,  h: 667,  mobile: true,  dpr: 2 },
  { name: 'iphone-14pro',   w: 393,  h: 852,  mobile: true,  dpr: 3 },
  { name: 'pixel-7',        w: 412,  h: 915,  mobile: true,  dpr: 2.6 },
  { name: 'iphone-14promax',w: 430,  h: 932,  mobile: true,  dpr: 3 },
  { name: 'mobile-landscape',w: 852, h: 393,  mobile: true,  dpr: 3 },
  { name: 'tablet-portrait',w: 768,  h: 1024, mobile: true,  dpr: 2 },
  { name: 'ipad-air',       w: 820,  h: 1180, mobile: true,  dpr: 2 },
  { name: 'ipad-pro',       w: 1024, h: 1366, mobile: true,  dpr: 2 },
  { name: 'ipad-landscape', w: 1180, h: 820,  mobile: true,  dpr: 2 },
  { name: 'laptop-sm',      w: 1280, h: 800,  mobile: false, dpr: 1 },
  { name: 'laptop',         w: 1440, h: 900,  mobile: false, dpr: 1 },
  { name: 'desktop-xl',     w: 1920, h: 1080, mobile: false, dpr: 1 },
  { name: 'ultrawide',      w: 2560, h: 1080, mobile: false, dpr: 1 },
];

const chrome = spawn(CHROME, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars',
  `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`,
  '--no-first-run', 'about:blank',
], { stdio: 'ignore' });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function wsUrl() {
  for (let i = 0; i < 60; i++) {
    try {
      const j = await (await fetch(`http://127.0.0.1:${port}/json/version`)).json();
      if (j.webSocketDebuggerUrl) return j.webSocketDebuggerUrl;
    } catch {}
    await sleep(250);
  }
  throw new Error('devtools not up');
}

const ws = new WebSocket(await wsUrl());
let id = 0;
const pending = new Map();
ws.addEventListener('message', (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
});
await new Promise((r) => ws.addEventListener('open', r, { once: true }));
const send = (method, params = {}, sessionId) => {
  const msg = { id: ++id, method, params, ...(sessionId ? { sessionId } : {}) };
  return new Promise((res) => { pending.set(msg.id, res); ws.send(JSON.stringify(msg)); });
};

const { result: t } = await send('Target.createTarget', { url: 'about:blank' });
const { result: att } = await send('Target.attachToTarget', { targetId: t.targetId, flatten: true });
const sid = att.sessionId;
await send('Page.enable', {}, sid);

const AUDIT = `
(() => {
  const vw = document.documentElement.clientWidth;
  const res = {
    vw,
    docScrollW: document.documentElement.scrollWidth,
    hOverflow: document.documentElement.scrollWidth - vw,
    offenders: [],
    smallTaps: [],
    clipped: [],
    grids: {},
    fontTooSmall: [],
  };

  const label = (el) => el.tagName.toLowerCase() + (el.className ? '.' + String(el.className).trim().split(/\\s+/).slice(0,2).join('.') : '');

  // 1. elemen yang keluar viewport (abaikan dekoratif di dalam overflow:hidden + honeypot)
  document.querySelectorAll('body *').forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return;
    const cs = getComputedStyle(el);
    if (cs.position === 'fixed') return;
    if (el.classList.contains('gd-hero-glow') || el.classList.contains('gd-mid-glow')) return;
    if (el.classList.contains('gd-hp')) return;
    if (r.right > vw + 1 || r.left < -1) {
      res.offenders.push({ el: label(el), left: Math.round(r.left), right: Math.round(r.right), w: Math.round(r.width) });
    }
  });

  // 2. tap target < 44px — HANYA di section LP ini (footer/header di luar lingkup)
  const SCOPE = '.gd-bar, .gd-hero, .gd-prob, .gd-curr, .gd-aud, .gd-mid, .gd-det, .gd-form-sec, .gd-modal';
  document.querySelectorAll(SCOPE).forEach((root) => {
    root.querySelectorAll('a[href], button, label.gd-radio').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      if (getComputedStyle(el).visibility === 'hidden') return;
      // hitung area sentuh efektif termasuk ::after penambah hit-area
      let h = r.height;
      try {
        const pa = getComputedStyle(el, '::after');
        const ph = parseFloat(pa.height);
        if (pa.content !== 'none' && pa.position === 'absolute' && ph > h) h = ph;
      } catch {}
      if (h < 44 || r.width < 44) {
        res.smallTaps.push({ el: label(el), txt: (el.textContent||'').trim().slice(0,18), w: Math.round(r.width), h: Math.round(h) });
      }
    });
  });

  // 3. teks kepotong (scrollWidth > clientWidth berarti overflow terpotong)
  document.querySelectorAll('h1,h2,h3,p,li,span,strong,dd,dt,label,legend,button,a').forEach((el) => {
    if (el.children.length > 0) return;
    if (el.scrollWidth > el.clientWidth + 2 && el.clientWidth > 0) {
      const cs = getComputedStyle(el);
      if (cs.overflow === 'visible' && cs.textOverflow !== 'ellipsis') return;
      res.clipped.push({ el: label(el), scrollW: el.scrollWidth, clientW: el.clientWidth, txt: (el.textContent||'').trim().slice(0,34) });
    }
  });

  // 4. status kolom tiap grid utama (2 kolom vs stack)
  ['gd-hero-grid','gd-prob-grid','gd-curr-grid','gd-aud-grid','gd-mid-grid','gd-det-grid','gd-form-grid','gd-row2','gd-cd-row'].forEach((c) => {
    const el = document.querySelector('.' + c);
    if (!el) { res.grids[c] = 'MISSING'; return; }
    const cols = getComputedStyle(el).gridTemplateColumns.split(' ').filter(Boolean).length;
    res.grids[c] = cols;
  });

  // 5. font-size terlalu kecil di mobile (< 12px badan teks)
  if (vw <= 480) {
    document.querySelectorAll('p,li,dd,span.gd-fact,.gd-line').forEach((el) => {
      const fs = parseFloat(getComputedStyle(el).fontSize);
      if (fs > 0 && fs < 11.5 && (el.textContent||'').trim().length > 12) {
        res.fontTooSmall.push({ el: label(el), fs });
      }
    });
    // field teks harus >= 16px supaya iOS tak auto-zoom (radio/checkbox tak kena)
    document.querySelectorAll('input:not([type=radio]):not([type=checkbox]), select, textarea').forEach((el) => {
      if (el.classList.contains('gd-hp')) return;
      const fs = parseFloat(getComputedStyle(el).fontSize);
      if (fs < 16) res.fontTooSmall.push({ el: label(el) + ' [iOS-zoom]', fs });
    });
  }

  res.offenders = res.offenders.slice(0, 8);
  res.smallTaps = res.smallTaps.slice(0, 8);
  res.clipped = res.clipped.slice(0, 8);
  return JSON.stringify(res);
})()
`;

const summary = [];
for (const v of VIEWPORTS) {
  await send('Emulation.setDeviceMetricsOverride', {
    width: v.w, height: v.h, deviceScaleFactor: v.dpr, mobile: v.mobile,
  }, sid);
  await send('Page.navigate', { url: target }, sid);
  await sleep(3200);
  await send('Runtime.evaluate', {
    expression: "document.querySelectorAll('.reveal').forEach(e=>e.classList.add('in'));",
  }, sid);
  await sleep(400);

  const r = await send('Runtime.evaluate', { expression: AUDIT, returnByValue: true }, sid);
  const raw = r.result?.result?.value;
  if (!raw) { console.log(`\n### ${v.name} — AUDIT GAGAL`, JSON.stringify(r).slice(0, 300)); continue; }
  const a = JSON.parse(raw);

  const problems = [];
  if (a.hOverflow > 1) problems.push(`h-overflow +${a.hOverflow}px`);
  if (a.offenders.length) problems.push(`${a.offenders.length} elemen keluar viewport`);
  if (a.smallTaps.length) problems.push(`${a.smallTaps.length} tap target kecil`);
  if (a.clipped.length) problems.push(`${a.clipped.length} teks kepotong`);
  if (a.fontTooSmall.length) problems.push(`${a.fontTooSmall.length} font kekecilan`);

  summary.push({ name: v.name, w: v.w, ok: problems.length === 0, problems });

  console.log(`\n### ${v.name} (${v.w}x${v.h} dpr${v.dpr}${v.mobile ? ' mobile' : ''})`);
  console.log(`  scrollW ${a.docScrollW} vs vw ${a.vw}  -> ${a.hOverflow > 1 ? 'OVERFLOW +' + a.hOverflow : 'ok'}`);
  console.log(`  grids: ${Object.entries(a.grids).map(([k, n]) => k.replace('gd-', '') + '=' + n).join(' ')}`);
  if (a.offenders.length) console.log('  keluar viewport:', JSON.stringify(a.offenders));
  if (a.smallTaps.length) console.log('  tap kecil:', JSON.stringify(a.smallTaps));
  if (a.clipped.length) console.log('  kepotong:', JSON.stringify(a.clipped));
  if (a.fontTooSmall.length) console.log('  font kecil:', JSON.stringify(a.fontTooSmall));
  if (!problems.length) console.log('  -> BERSIH');

  if (shotDir) {
    const { result: shot } = await send('Page.captureScreenshot', {
      format: 'png', captureBeyondViewport: true, fromSurface: true,
    }, sid);
    fs.mkdirSync(shotDir, { recursive: true });
    fs.writeFileSync(path.join(shotDir, `${v.w}-${v.name}.png`), Buffer.from(shot.data, 'base64'));
  }
}

console.log('\n\n===== RINGKASAN =====');
for (const s of summary) {
  console.log(`${s.ok ? 'PASS' : 'FAIL'}  ${String(s.w).padStart(4)}  ${s.name.padEnd(18)} ${s.problems.join('; ')}`);
}
const fails = summary.filter((s) => !s.ok).length;
console.log(`\n${summary.length - fails}/${summary.length} viewport bersih`);

ws.close();
chrome.kill();
process.exit(0);
