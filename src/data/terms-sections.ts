export interface TermsSection { id: string; num: string; title: string; contentHtml: string }

export const TERMS_HERO = {
  eyebrow: 'Legal',
  title: 'Ketentuan Layanan Tenta<span class="accent">Klik</span>',
  lede: 'Perjanjian antara Anda dan Tentaklik saat menggunakan situs web, layanan, dan produk digital kami. Ditulis dalam bahasa yang jelas biar tidak ada kejutan.',
  lastUpdated: '2026-06-09',
};

export const TERMS_SECTIONS: TermsSection[] = [
  {
    id: 'persetujuan',
    num: '01',
    title: 'Persetujuan Ketentuan',
    contentHtml: `<p>Dengan mengakses atau menggunakan <strong>tentaklik.com</strong> dan layanan apa pun yang disediakan oleh Tentaklik ("Tentaklik," "kami," atau "milik kami"), Anda setuju untuk terikat oleh Ketentuan Layanan ini dan Kebijakan Privasi kami. Jika Anda tidak setuju, mohon untuk tidak menggunakan layanan kami.</p>
              <p>Ketentuan ini berlaku bagi semua pengunjung, klien, dan pengguna situs web serta layanan pemasaran digital kami, termasuk namun tidak terbatas pada Pengembangan Web, Layanan Konsultasi Digital Marketing, Google Ads, dan Meta Ads.</p>`,
  },
  {
    id: 'layanan',
    num: '02',
    title: 'Layanan yang Disediakan',
    contentHtml: `<p>Tentaklik menyediakan layanan pemasaran digital profesional untuk bisnis dan organisasi. Ruang lingkup, hasil kerja (deliverables), dan lini masa setiap proyek ditetapkan dalam <strong>Service Agreement (SA)</strong> atau <strong>Statement of Work (SOW)</strong> terpisah yang ditandatangani oleh kedua belah pihak.</p>
              <p>Layanan kami meliputi namun tidak terbatas pada:</p>
              <ul>
                <li>Pengembangan & Desain Web</li>
                <li>Konsultasi Digital Marketing</li>
                <li>Manajemen kampanye Google Ads</li>
                <li>Manajemen kampanye Meta Ads (Facebook & Instagram)</li>
              </ul>`,
  },
  {
    id: 'data-dikumpulkan',
    num: '03',
    title: 'Data yang Kami Kumpulkan',
    contentHtml: `<p>Kami mengumpulkan informasi yang Anda berikan secara langsung saat mengisi formulir kontak, meminta konsultasi, atau menandatangani perjanjian layanan. Ini termasuk:</p>
              <ul>
                <li><strong>Data Identitas:</strong> Nama lengkap, nama perusahaan, jabatan</li>
                <li><strong>Data Kontak:</strong> Alamat email, nomor telepon, alamat surat</li>
                <li><strong>Data Proyek:</strong> Tujuan bisnis, anggaran, lini masa, aset merek</li>
                <li><strong>Data Teknis:</strong> Alamat IP, jenis browser, informasi perangkat, halaman yang dikunjungi</li>
                <li><strong>Data Pemasaran:</strong> Preferensi komunikasi, respons terhadap kampanye</li>
              </ul>
              <div class="callout callout-good"><strong>Catatan:</strong> Kami <strong>tidak</strong> menjual data pribadi Anda kepada pihak ketiga. Tidak akan pernah.</div>`,
  },
  {
    id: 'cara-penggunaan',
    num: '04',
    title: 'Cara Kami Menggunakan Data',
    contentHtml: `<p>Kami menggunakan informasi yang dikumpulkan untuk:</p>
              <ul>
                <li>Memberikan layanan yang telah Anda kontrakkan kepada kami</li>
                <li>Berkomunikasi mengenai proyek Anda dan menanggapi pertanyaan</li>
                <li>Mengirimkan komunikasi pemasaran yang relevan (dengan persetujuan Anda)</li>
                <li>Meningkatkan situs web, layanan, dan pengalaman klien kami</li>
                <li>Mematuhi kewajiban hukum dan melindungi hak-hak kami</li>
                <li>Menganalisis tren dan mengukur efektivitas kampanye kami</li>
              </ul>`,
  },
  {
    id: 'cookie',
    num: '05',
    title: 'Cookie & Pelacakan',
    contentHtml: `<p>Situs web kami menggunakan cookie dan teknologi pelacakan serupa untuk meningkatkan pengalaman pengguna, menganalisis lalu lintas, dan menyajikan iklan yang dipersonalisasi. Kami menggunakan:</p>
              <ul>
                <li><strong>Cookie Esensial:</strong> Diperlukan agar situs dapat berfungsi</li>
                <li><strong>Cookie Analitik:</strong> Google Analytics 4, Meta Pixel</li>
                <li><strong>Cookie Periklanan:</strong> Remarketing Google Ads dan Meta Ads</li>
                <li><strong>Cookie Preferensi:</strong> Untuk mengingat pilihan Anda</li>
              </ul>
              <p>Anda dapat mengontrol pengaturan cookie melalui browser Anda. Menonaktifkan cookie dapat membatasi fitur situs web tertentu.</p>`,
  },
  {
    id: 'pembagian-data',
    num: '06',
    title: 'Pembagian Data & Pihak Ketiga',
    contentHtml: `<p>Kami membagikan data hanya dengan mitra terpercaya yang membantu kami menjalankan bisnis, termasuk penyedia hosting, platform iklan (Google, Meta), alat analitik, dan pemroses pembayaran. Semua mitra terikat secara kontrak untuk melindungi data Anda dan menggunakannya hanya untuk tujuan yang kami tetapkan.</p>
              <p>Kami juga dapat mengungkapkan informasi jika diwajibkan secara hukum, untuk melindungi hak kami, atau sehubungan dengan transaksi bisnis seperti penggabungan atau akuisisi.</p>`,
  },
  {
    id: 'keamanan-data',
    num: '07',
    title: 'Keamanan Data',
    contentHtml: `<p>Kami menerapkan standar keamanan industri termasuk enkripsi SSL/TLS, hashing kata sandi yang aman, kontrol akses ketat, dan audit keamanan berkala untuk melindungi data Anda dari akses, perubahan, atau pengungkapan yang tidak sah.</p>
              <p>Namun, tidak ada metode transmisi melalui internet yang 100% aman. Kami tidak dapat menjamin keamanan mutlak, tetapi berkomitmen untuk memberi tahu pengguna yang terdampak dalam waktu <strong>72 jam</strong> setelah menemukan pelanggaran yang memengaruhi data pribadi mereka.</p>`,
  },
  {
    id: 'hak-anda',
    num: '08',
    title: 'Hak Anda',
    contentHtml: `<p>Tergantung pada yurisdiksi Anda, Anda memiliki hak untuk:</p>
              <ul>
                <li><strong>Mengakses</strong> data pribadi yang kami miliki tentang Anda</li>
                <li><strong>Mengoreksi</strong> data yang tidak akurat atau tidak lengkap</li>
                <li><strong>Menghapus</strong> data Anda ("hak untuk dilupakan")</li>
                <li><strong>Membatasi</strong> atau keberatan terhadap pemrosesan tertentu</li>
                <li><strong>Menerima salinan</strong> data Anda dalam format yang portabel</li>
                <li><strong>Menarik persetujuan</strong> untuk komunikasi pemasaran kapan saja</li>
              </ul>
              <p>Untuk menggunakan hak-hak ini, hubungi kami di <a href="mailto:tentaklik@mediapro.work">tentaklik@mediapro.work</a>. Kami akan memberikan tanggapan dalam waktu 30 hari.</p>`,
  },
  {
    id: 'pembayaran',
    num: '09',
    title: 'Pembayaran & Pengembalian Dana',
    contentHtml: `<p>Biaya layanan, jadwal pembayaran, dan ketentuan pengembalian dana dirinci dalam Service Agreement (SA) individu Anda. Secara umum:</p>
              <ul>
                <li>Deposit sebesar <strong>50%</strong> diperlukan sebelum pekerjaan dimulai pada sebagian besar proyek</li>
                <li>Semua biaya dikutip dan ditagih dalam <strong>Rupiah (IDR)</strong> atau <strong>Dolar AS (USD)</strong> (sesuai kesepakatan)</li>
                <li>Faktur jatuh tempo dalam waktu 14 hari setelah diterbitkan (<strong>NET-14</strong>)</li>
                <li>Keterlambatan pembayaran dapat dikenakan bunga bulanan sebesar <strong>1,5%</strong></li>
                <li>Kami menerima transfer bank, pembayaran kartu kredit, atau metode pembayaran lain yang disepakati</li>
                <li>Biaya iklan (<em>ad spend</em>) ditagih secara terpisah dan dibayarkan langsung ke platform iklan</li>
                <li>Pengembalian dana untuk pekerjaan yang sudah dilakukan tidak tersedia; saldo <em>retainer</em> yang tidak terpakai dapat dikreditkan atau dikembalikan sesuai kebijakan kami</li>
              </ul>`,
  },
  {
    id: 'hak-kekayaan',
    num: '10',
    title: 'Hak Kekayaan Intelektual',
    contentHtml: `<p>Semua konten di situs web ini — termasuk teks, grafis, logo, kode, dan desain — adalah milik Tentaklik atau pemberi lisensinya dan dilindungi oleh undang-undang hak cipta internasional.</p>
              <p>Setelah pembayaran penuh, hasil kerja yang dibuat khusus untuk proyek Anda (situs web, materi iklan, konten) menjadi milik Anda. Alat, kerangka kerja (<em>framework</em>), dan metodologi yang sudah ada sebelumnya tetap menjadi milik kami.</p>`,
  },
  {
    id: 'standar-implementasi',
    num: '11',
    title: 'Standar Implementasi Kami',
    contentHtml: `<p>Sebagai bentuk komitmen terhadap jaminan kualitas (<em>Quality Assurance</em>) dan dukungan jangka panjang, kami menerapkan standar atribusi dengan menyematkan label <strong>"Supported by TentaKlik"</strong> pada bagian footer situs web Anda.</p>
              <p>Atribusi ini merupakan <strong>segel profesionalisme</strong> yang menunjukkan bahwa aset digital Anda dikelola dan dibangun oleh tenaga ahli.</p>`,
  },
  {
    id: 'batasan-tanggung-jawab',
    num: '12',
    title: 'Batasan Tanggung Jawab',
    contentHtml: `<p>Sejauh diizinkan oleh hukum, Tentaklik tidak bertanggung jawab atas kerusakan tidak langsung, insidental, khusus, konsekuensial, atau punitif, termasuk hilangnya keuntungan, yang timbul dari penggunaan layanan atau situs web kami oleh Anda.</p>
              <p>Total tanggung jawab kami atas klaim apa pun tidak akan melebihi jumlah yang Anda bayarkan kepada kami untuk layanan spesifik yang mendasari klaim tersebut dalam <strong>12 bulan terakhir</strong>.</p>`,
  },
  {
    id: 'perubahan',
    num: '13',
    title: 'Perubahan Ketentuan',
    contentHtml: `<p>Kami dapat memperbarui Ketentuan ini dari waktu ke waktu. Perubahan materi akan dikomunikasikan melalui email atau pemberitahuan di situs web kami setidaknya <strong>14 hari sebelum diberlakukan</strong>. Penggunaan layanan kami secara berkelanjutan setelah tanggal efektif merupakan bentuk persetujuan Anda.</p>`,
  },
  {
    id: 'kontak',
    num: '14',
    title: 'Hubungi Kami',
    contentHtml: `<p>Ada pertanyaan tentang Ketentuan ini atau Kebijakan Privasi kami? Hubungi kami:</p>
              <ul>
                <li><strong>WhatsApp:</strong> <a href="https://wa.me/6285129992225" target="_blank" rel="noopener noreferrer">085129992225</a></li>
                <li><strong>Email:</strong> <a href="mailto:tentaklik@mediapro.work">tentaklik@mediapro.work</a></li>
                <li><strong>Alamat:</strong> Semarang, Indonesia</li>
              </ul>`,
  },
  {
    id: 'sewa-syarat-umum',
    num: '15',
    title: 'Syarat Umum Layanan Sewa Akun',
    contentHtml: `<p>Ketentuan berikut berlaku khusus untuk layanan <strong>Sewa Akun</strong> (akun iklan whitelist Google & Meta):</p>
              <ul>
                <li>Klien wajib memiliki Business Manager Meta atau akun Google yang aktif dan valid.</li>
                <li>Klien tidak boleh menggunakan akun whitelist untuk mengiklankan produk/jasa yang dilarang oleh platform.</li>
                <li>Satu klien, satu Business Manager ID — tidak boleh menggunakan BM yang sudah pernah terhubung ke whitelist provider lain.</li>
                <li>Klien wajib mengikuti seluruh kebijakan iklan Meta dan Google yang berlaku.</li>
                <li>Tentaklik berhak menonaktifkan layanan tanpa pengembalian saldo jika terbukti ada pelanggaran berat yang disengaja.</li>
              </ul>`,
  },
  {
    id: 'sewa-produk-dilarang',
    num: '16',
    title: 'Produk / Layanan yang Tidak Bisa Diiklankan',
    contentHtml: `<p>Berikut kategori yang tidak dapat menggunakan layanan Sewa Akun Tentaklik:</p>
              <ul>
                <li>Produk ilegal atau semi-legal (narkotika, obat keras tanpa resep, dll)</li>
                <li>Judi online / permainan uang yang tidak berlisensi resmi</li>
                <li>Penipuan investasi atau skema Ponzi</li>
                <li>Konten dewasa / pornografi</li>
                <li>Produk palsu atau pembajakan</li>
                <li>Senjata api, amunisi, atau bahan berbahaya</li>
                <li>Layanan hacking / phishing / penyerangan siber</li>
                <li>Konten yang menyebarkan ujaran kebencian atau disinformasi</li>
              </ul>
              <div class="callout callout-warn"><strong>Catatan:</strong> Daftar ini mengikuti kebijakan resmi Meta dan Google. Jika ragu, konsultasikan jenis produk Anda ke CS Tentaklik sebelum mendaftar.</div>`,
  },
  {
    id: 'sewa-produk-verifikasi',
    num: '17',
    title: 'Produk / Layanan yang Perlu Verifikasi Tambahan',
    contentHtml: `<p>Kategori berikut tetap bisa diiklankan, namun memerlukan dokumen / verifikasi tambahan sebelum akun diaktifkan:</p>
              <ul>
                <li>Suplemen kesehatan dan obat-obatan (butuh izin edar BPOM)</li>
                <li>Layanan keuangan / investasi (butuh izin OJK)</li>
                <li>Produk rokok / vape (terbatas dan ada syarat khusus)</li>
                <li>Layanan pinjaman uang (butuh izin resmi)</li>
                <li>Konten yang menyangkut isu politik atau sosial sensitif</li>
              </ul>`,
  },
];
