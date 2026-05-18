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
 * 8. Paste URL ke .env: PUBLIC_SHEET_URL=https://script.google.com/macros/s/.../exec
 */

// ═══════════════════════════════════════════
// 1. WEB APP HANDLER — menerima POST dari form
// ═══════════════════════════════════════════

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
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

    // Auto-resize kolom setelah data masuk
    try { sheet.autoResizeColumns(1, 8); } catch(err) {}

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok', timestamp: timestamp }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// CORS preflight handler
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'Tentaklik Lead API is running' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ═══════════════════════════════════════════
// 2. SETUP FUNCTION — jalankan SEKALI untuk format spreadsheet
// ═══════════════════════════════════════════

function setupSpreadsheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Leads') || ss.getActiveSheet();
  sheet.setName('Leads');

  // ── Header row ──
  var headers = ['Timestamp', 'Nama', 'Email', 'WhatsApp', 'Layanan', 'Budget', 'Pesan', 'Source'];
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setValues([headers]);

  // ── Styling header ──
  var BRAND_ORANGE = '#FF7A1A';
  var DARK_INK = '#0E1B2A';
  headerRange
    .setBackground(BRAND_ORANGE)
    .setFontColor('#FFFFFF')
    .setFontWeight('bold')
    .setFontSize(11)
    .setFontFamily('Inter')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setWrap(false);

  // ── Row height header ──
  sheet.setRowHeight(1, 40);

  // ── Freeze header row ──
  sheet.setFrozenRows(1);

  // ── Column widths ──
  var widths = [170, 180, 240, 150, 200, 140, 350, 200];
  for (var i = 0; i < widths.length; i++) {
    sheet.setColumnWidth(i + 1, widths[i]);
  }

  // ── Format kolom Timestamp ──
  sheet.getRange('A2:A').setNumberFormat('yyyy-mm-dd hh:mm:ss');

  // ── Format kolom Email & WhatsApp sebagai plain text ──
  sheet.getRange('C2:C').setNumberFormat('@');
  sheet.getRange('D2:D').setNumberFormat('@');

  // ── Alternating row colors ──
  var bandingTheme = sheet.getRange('A1:H1000');
  try {
    bandingTheme.applyRowBanding(SpreadsheetApp.BandingTheme.ORANGE, true, false);
  } catch(err) {
    // Banding sudah ada, skip
  }

  // ── Conditional formatting: highlight baris baru (hari ini) ──
  var rule = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=LEFT($A2,10)=TEXT(TODAY(),"yyyy-mm-dd")')
    .setBackground('#FFF4EB')  // orange-50
    .setRanges([sheet.getRange('A2:H1000')])
    .build();
  var rules = sheet.getConditionalFormatRules();
  rules.push(rule);
  sheet.setConditionalFormatRules(rules);

  // ── Data validation: Layanan dropdown ──
  var layananValidation = SpreadsheetApp.newDataValidation()
    .requireValueInList([
      'Website Development',
      'Google Ads',
      'Meta Ads',
      'Konsultasi Digital Marketing',
      'Mix / Belum Tahu'
    ], true)
    .setAllowInvalid(true)
    .build();
  sheet.getRange('E2:E1000').setDataValidation(layananValidation);

  // ── Data validation: Budget dropdown ──
  var budgetValidation = SpreadsheetApp.newDataValidation()
    .requireValueInList([
      '< Rp 5jt',
      'Rp 5-10jt',
      'Rp 10-25jt',
      'Rp 25-50jt',
      '> Rp 50jt',
      'Belum pasti'
    ], true)
    .setAllowInvalid(true)
    .build();
  sheet.getRange('F2:F1000').setDataValidation(budgetValidation);

  // ── Sheet tab color ──
  sheet.setTabColor(BRAND_ORANGE);

  // ── Protection: lock header row ──
  var protection = sheet.getRange('A1:H1').protect().setDescription('Header — jangan diedit');
  protection.setWarningOnly(true);

  // ── Spreadsheet name ──
  ss.rename('Tentaklik — Leads CRM');

  SpreadsheetApp.flush();
  Logger.log('✅ Spreadsheet setup selesai!');
}
