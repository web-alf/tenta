const sharp = require('sharp');
const fs = require('fs');

async function run() {
  const inputPath = 'public/assets/layanan/website/jasa-pembuatan-website-after-sales-terbaik-sepanjang-masa.webp';
  const backupPath = 'public/assets/layanan/website/hero-original-solid.webp';

  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(inputPath, backupPath);
  }

  const { data, info } = await sharp(backupPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const visited = new Uint8Array(width * height);
  const queueX = new Int32Array(width * height);
  const queueY = new Int32Array(width * height);
  let qStart = 0;
  let qEnd = 0;

  function isWhite(x, y) {
    const idx = (y * width + x) * 4;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    // Threshold for outer white background
    return r >= 246 && g >= 246 && b >= 246;
  }

  for (let x = 0; x < width; x++) {
    if (isWhite(x, 0)) {
      visited[x] = 1;
      queueX[qEnd] = x;
      queueY[qEnd] = 0;
      qEnd++;
    }
    const bottomIdx = (height - 1) * width + x;
    if (isWhite(x, height - 1)) {
      visited[bottomIdx] = 1;
      queueX[qEnd] = x;
      queueY[qEnd] = height - 1;
      qEnd++;
    }
  }

  for (let y = 0; y < height; y++) {
    const leftIdx = y * width;
    if (!visited[leftIdx] && isWhite(0, y)) {
      visited[leftIdx] = 1;
      queueX[qEnd] = 0;
      queueY[qEnd] = y;
      qEnd++;
    }
    const rightIdx = y * width + (width - 1);
    if (!visited[rightIdx] && isWhite(width - 1, y)) {
      visited[rightIdx] = 1;
      queueX[qEnd] = width - 1;
      queueY[qEnd] = y;
      qEnd++;
    }
  }

  while (qStart < qEnd) {
    const x = queueX[qStart];
    const y = queueY[qStart];
    qStart++;

    const idx = (y * width + x) * 4;
    data[idx + 3] = 0; // Alpha to 0

    // 4 directional neighbors
    if (x + 1 < width) {
      const nPos = y * width + (x + 1);
      if (!visited[nPos]) {
        visited[nPos] = 1;
        if (isWhite(x + 1, y)) {
          queueX[qEnd] = x + 1;
          queueY[qEnd] = y;
          qEnd++;
        }
      }
    }
    if (x - 1 >= 0) {
      const nPos = y * width + (x - 1);
      if (!visited[nPos]) {
        visited[nPos] = 1;
        if (isWhite(x - 1, y)) {
          queueX[qEnd] = x - 1;
          queueY[qEnd] = y;
          qEnd++;
        }
      }
    }
    if (y + 1 < height) {
      const nPos = (y + 1) * width + x;
      if (!visited[nPos]) {
        visited[nPos] = 1;
        if (isWhite(x, y + 1)) {
          queueX[qEnd] = x;
          queueY[qEnd] = y + 1;
          qEnd++;
        }
      }
    }
    if (y - 1 >= 0) {
      const nPos = (y - 1) * width + x;
      if (!visited[nPos]) {
        visited[nPos] = 1;
        if (isWhite(x, y - 1)) {
          queueX[qEnd] = x;
          queueY[qEnd] = y - 1;
          qEnd++;
        }
      }
    }
  }

  console.log('Total pixels converted to transparent:', qEnd);

  // Write PNG format for perfect lossless transparency support
  const pngPath = 'public/assets/layanan/website/jasa-pembuatan-website-hero.png';
  await sharp(data, { raw: { width, height, channels: 4 } })
    .png()
    .toFile(pngPath);

  console.log('Successfully saved transparent PNG:', pngPath);
}

run().catch(console.error);
