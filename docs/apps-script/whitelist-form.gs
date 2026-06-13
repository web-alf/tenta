/**
 * Tentaklik — Whitelist Shortform handler (Google Apps Script).
 * Menerima submission dari /meta-whitelist & /google-whitelist,
 * disimpan ke 2 tab terpisah ("Meta Whitelist" & "Google Whitelist")
 * dalam SATU Google Spreadsheet.
 *
 * Deploy: Extensions > Apps Script (dari Spreadsheet) > paste > Deploy > Web app.
 * Setup awal (opsional): jalankan fungsi doSetup() sekali untuk membuat
 * kedua tab + header rapi tanpa menunggu submission pertama.
 * Lihat SETUP.md.
 */

var HEADERS = ['Timestamp', 'Nama', 'WhatsApp', 'Keterangan', 'Source URL'];
var SHEETS = { meta: 'Meta Whitelist', google: 'Google Whitelist' };
var BRAND_ORANGE = '#FF6B1A';

/**
 * Buat sheet bernama `name` bila belum ada, lalu pastikan header + styling siap.
 * Idempotent — aman dijalankan berkali-kali.
 */
function ensureSheet(ss, name) {
  var sheet = ss.getSheetByName(name);
  if (!sheet) sheet = ss.insertSheet(name);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    var hr = sheet.getRange(1, 1, 1, HEADERS.length);
    hr.setFontWeight('bold').setBackground(BRAND_ORANGE).setFontColor('#FFFFFF');
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 160);
    sheet.setColumnWidth(2, 180);
    sheet.setColumnWidth(3, 150);
    sheet.setColumnWidth(4, 360);
    sheet.setColumnWidth(5, 240);
  }
  return sheet;
}

/**
 * Setup sekali-jalan: buat kedua tab (Meta & Google) + header rapi.
 * Jalankan manual dari editor Apps Script (pilih fungsi doSetup → Run),
 * atau via menu "Tentaklik" di spreadsheet (lihat onOpen).
 * Juga merapikan tab default "Sheet1" yang kosong bila ada.
 */
function doSetup() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ensureSheet(ss, SHEETS.meta);
  ensureSheet(ss, SHEETS.google);

  // Hapus tab default "Sheet1"/"Sheet" yang kosong & tak terpakai (bila ada > 1 sheet).
  var leftovers = ['Sheet1', 'Sheet'];
  for (var i = 0; i < leftovers.length; i++) {
    var s = ss.getSheetByName(leftovers[i]);
    if (s && s.getLastRow() === 0 && ss.getSheets().length > 1) {
      ss.deleteSheet(s);
    }
  }

  SpreadsheetApp.getActiveSpreadsheet().toast(
    'Tab "Meta Whitelist" & "Google Whitelist" siap.', 'Setup selesai', 5
  );
  return 'OK: ' + SHEETS.meta + ' + ' + SHEETS.google + ' siap.';
}

/** Tambah menu "Tentaklik > Jalankan Setup" di spreadsheet untuk kemudahan. */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Tentaklik')
    .addItem('Jalankan Setup', 'doSetup')
    .addToUi();
}

function clip(v, n) {
  return String(v == null ? '' : v).replace(new RegExp('[\\u0000-\\u001F\\u007F]', 'g'), ' ').slice(0, n).trim();
}

function doGet(e) {
  try {
    var p = (e && e.parameter) ? e.parameter : {};
    var platform = String(p.platform || '').toLowerCase();
    var sheetName = platform === 'google' ? SHEETS.google
                  : platform === 'meta'   ? SHEETS.meta
                  : 'Lainnya';

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ensureSheet(ss, sheetName);

    sheet.appendRow([
      new Date(),
      clip(p.nama, 100),
      clip(p.whatsapp, 20),
      clip(p.keterangan, 500),
      clip(p.source, 300)
    ]);

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
