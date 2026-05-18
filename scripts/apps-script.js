/**
 * Google Apps Script — Tentaklik Lead Form to Spreadsheet
 *
 * SETUP:
 * 1. Buka Google Sheets → buat spreadsheet baru
 * 2. Rename sheet pertama menjadi "Leads"
 * 3. Extensions → Apps Script
 * 4. Hapus semua kode default, paste SELURUH isi file ini
 * 5. Simpan (Ctrl+S)
 * 6. Jalankan function setupSpreadsheet() sekali (klik ▶ Run di toolbar)
 *    → ini akan format header, warna, freeze row, dll
 * 7. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 *    - Klik Deploy → Copy URL
 * 8. Paste URL ke kode kontak.astro
 *
 * NOTE: Data dikirim via GET params (bukan POST) karena POST ke
 * Apps Script punya masalah redirect 302 yang drop request body.
 * GET lebih reliable untuk cross-origin browser fetch.
 */

// ═══════════════════════════════════════════
// 1. WEB APP HANDLER
// ═══════════════════════════════════════════

function doGet(e) {
  var p = e.parameter || {};

  // Kalau ada param 'nama', ini data lead → simpan ke sheet
  if (p.nama) {
    return saveLead(p);
  }

  // Kalau tidak ada param, return status check
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'Tentaklik Lead API is running' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    return saveLead(data);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function saveLead(data) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Leads');
  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.setName('Leads');
  }

  var timestamp = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd HH:mm:ss');

  sheet.appendRow([
    timestamp,
    data.nama     || '',
    data.email    || '',
    data.whatsapp || '',
    data.layanan  || '',
    data.budget   || '',
    data.pesan    || '',
    data.source   || ''
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', timestamp: timestamp }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ═══════════════════════════════════════════
// 2. SETUP — jalankan SEKALI untuk format spreadsheet
// ═══════════════════════════════════════════

function setupSpreadsheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Leads') || ss.getActiveSheet();
  sheet.setName('Leads');

  var headers = ['Timestamp', 'Nama', 'Email', 'WhatsApp', 'Layanan', 'Budget', 'Pesan', 'Source'];
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setValues([headers]);

  var BRAND_ORANGE = '#FF7A1A';
  headerRange
    .setBackground(BRAND_ORANGE)
    .setFontColor('#FFFFFF')
    .setFontWeight('bold')
    .setFontSize(11)
    .setFontFamily('Inter')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setWrap(false);

  sheet.setRowHeight(1, 40);
  sheet.setFrozenRows(1);

  var widths = [170, 180, 240, 150, 200, 140, 350, 200];
  for (var i = 0; i < widths.length; i++) {
    sheet.setColumnWidth(i + 1, widths[i]);
  }

  sheet.getRange('A2:A').setNumberFormat('yyyy-mm-dd hh:mm:ss');
  sheet.getRange('C2:C').setNumberFormat('@');
  sheet.getRange('D2:D').setNumberFormat('@');

  try {
    sheet.getRange('A1:H1000').applyRowBanding(SpreadsheetApp.BandingTheme.ORANGE, true, false);
  } catch(err) {}

  var rule = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=LEFT($A2,10)=TEXT(TODAY(),"yyyy-mm-dd")')
    .setBackground('#FFF4EB')
    .setRanges([sheet.getRange('A2:H1000')])
    .build();
  var rules = sheet.getConditionalFormatRules();
  rules.push(rule);
  sheet.setConditionalFormatRules(rules);

  var layananValidation = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Website Development', 'Google Ads', 'Meta Ads', 'Konsultasi Digital Marketing', 'Mix / Belum Tahu'], true)
    .setAllowInvalid(true).build();
  sheet.getRange('E2:E1000').setDataValidation(layananValidation);

  var budgetValidation = SpreadsheetApp.newDataValidation()
    .requireValueInList(['< Rp 5jt', 'Rp 5-10jt', 'Rp 10-25jt', 'Rp 25-50jt', '> Rp 50jt', 'Belum pasti'], true)
    .setAllowInvalid(true).build();
  sheet.getRange('F2:F1000').setDataValidation(budgetValidation);

  sheet.setTabColor(BRAND_ORANGE);

  var protection = sheet.getRange('A1:H1').protect().setDescription('Header — jangan diedit');
  protection.setWarningOnly(true);

  ss.rename('Tentaklik — Leads CRM');
  SpreadsheetApp.flush();
  Logger.log('✅ Spreadsheet setup selesai!');
}
