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
