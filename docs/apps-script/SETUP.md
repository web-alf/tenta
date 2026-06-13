# Setup Shortform Whitelist → Google Sheet

Form di `/meta-whitelist` & `/google-whitelist` mengirim data ke satu Google Spreadsheet,
terpisah ke 2 tab: **Meta Whitelist** dan **Google Whitelist**.

## Langkah

1. **Buat Spreadsheet**
   - Buka https://sheets.google.com (login sebagai `web@mediapro.work`).
   - Buat spreadsheet baru, beri nama mis. `Tentaklik — Whitelist Leads`.

2. **Pasang Apps Script**
   - Di spreadsheet: menu **Extensions → Apps Script**.
   - Hapus isi default, **paste** seluruh isi `whitelist-form.gs`.
   - Save (ikon disk / Ctrl+S).

3. **Jalankan Setup (buat tab Meta & Google)**
   - Di editor Apps Script: pilih fungsi **`doSetup`** dari dropdown atas, klik **Run**.
   - Izinkan permission saat diminta (Authorize access).
   - Tab **Meta Whitelist** & **Google Whitelist** terbuat otomatis dengan header rapi (oranye, frozen row). Tab kosong "Sheet1" dibersihkan.
   - Alternatif: setelah refresh spreadsheet, ada menu **Tentaklik → Jalankan Setup**.
   - *(Jika dilewati pun aman — tab tetap dibuat otomatis saat submission pertama.)*

4. **Deploy sebagai Web App**
   - Klik **Deploy → New deployment**.
   - Pilih tipe **Web app** (ikon gear → Web app).
   - **Description**: `whitelist form`.
   - **Execute as**: `Me (web@mediapro.work)`.
   - **Who has access**: `Anyone`.
   - Klik **Deploy**, izinkan permission (Authorize access).
   - Salin **Web app URL** (berakhiran `/exec`).

5. **Tempel URL ke website**
   - Buka `src/components/sections/lp/LpShortForm.astro`.
   - Ganti baris:
     ```js
     const SHORTFORM_URL = 'PASTE_APPS_SCRIPT_EXEC_URL';
     ```
     dengan URL `/exec` tadi.
   - Commit + build + deploy ulang website.

6. **Test**
   - Buka `/meta-whitelist`, isi form, submit → cek tab "Meta Whitelist".
   - Buka `/google-whitelist`, submit → cek tab "Google Whitelist".

## Catatan
- Data tersimpan: Timestamp, Nama, WhatsApp, Keterangan, Source URL.
- `doSetup()` idempotent — aman dijalankan berkali-kali (tak menimpa data).
- Header tab dibuat & di-styling otomatis (oranye, frozen row).
- Jika ubah script, **Deploy → Manage deployments → Edit → New version** (URL tetap sama).
