// Sekali pakai: identifikasi tepat elemen tap-target kecil + font input.
import { spawn } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const target = process.argv[2];
const width = Number(process.argv[3] || 393);
const port = 9341;
const profile = path.join(os.tmpdir(), 'gads-resp2-profile');

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
await send('Emulation.setDeviceMetricsOverride', { width, height: 852, deviceScaleFactor: 3, mobile: true }, sid);
await send('Page.enable', {}, sid);
await send('Page.navigate', { url: target }, sid);
await sleep(4000);

const EXPR = `
(() => {
  const out = { smallTaps: [], textInputs: [], radios: [] };
  const owner = (el) => {
    let n = el;
    while (n && n !== document.body) {
      const f = n.getAttribute && n.getAttribute('data-astro-source-file');
      if (f) return f.split('/').pop();
      n = n.parentElement;
    }
    return '?';
  };
  document.querySelectorAll('a[href], button').forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return;
    if (r.height < 44 || r.width < 44) {
      out.smallTaps.push({
        el: el.tagName.toLowerCase() + (el.className ? '.' + String(el.className).trim().split(/\\s+/)[0] : ''),
        txt: (el.textContent || '').trim().slice(0, 22),
        w: Math.round(r.width), h: Math.round(r.height),
        from: owner(el),
      });
    }
  });
  document.querySelectorAll('input').forEach((el) => {
    if (el.classList.contains('gd-hp')) return;
    const fs = parseFloat(getComputedStyle(el).fontSize);
    const rec = { type: el.type, name: el.name, fs, from: owner(el) };
    if (el.type === 'radio') out.radios.push(rec); else out.textInputs.push(rec);
  });
  return JSON.stringify(out, null, 1);
})()
`;
const r = await send('Runtime.evaluate', { expression: EXPR, returnByValue: true }, sid);
const val = r.result?.result?.value ?? JSON.stringify(r).slice(0, 500);
const { writeFileSync } = await import('node:fs');
writeFileSync('ss/out/taps.json', val);
console.log(val);

ws.close();
chrome.kill();
process.exit(0);
