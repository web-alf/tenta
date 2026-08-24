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

export const TERMS_HERO_EN = {
  eyebrow: 'Legal',
  title: 'Tenta<span class="accent">Klik</span> Terms of Service',
  lede: 'The agreement between you and Tentaklik when using our website, services, and digital products. Written in plain language so there are no surprises.',
  lastUpdated: '2026-06-09',
};

export const TERMS_SECTIONS_EN: TermsSection[] = [
  {
    id: 'persetujuan',
    num: '01',
    title: 'Acceptance of Terms',
    contentHtml: `<p>By accessing or using <strong>tentaklik.com</strong> and any services provided by Tentaklik ("Tentaklik," "we," or "our"), you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, please do not use our services.</p>
              <p>These terms apply to all visitors, clients, and users of our website and digital marketing services, including but not limited to Web Development, Digital Marketing Consulting, Google Ads, and Meta Ads.</p>`,
  },
  {
    id: 'layanan',
    num: '02',
    title: 'Services Provided',
    contentHtml: `<p>Tentaklik provides professional digital marketing services for businesses and organizations. The scope, deliverables, and timeline of each project are set out in a separate <strong>Service Agreement (SA)</strong> or <strong>Statement of Work (SOW)</strong> signed by both parties.</p>
              <p>Our services include but are not limited to:</p>
              <ul>
                <li>Web Development & Design</li>
                <li>Digital Marketing Consulting</li>
                <li>Google Ads Campaign Management</li>
                <li>Meta Ads (Facebook & Instagram) Campaign Management</li>
              </ul>`,
  },
  {
    id: 'data-dikumpulkan',
    num: '03',
    title: 'Data We Collect',
    contentHtml: `<p>We collect information you directly provide when filling out contact forms, requesting consultations, or signing service agreements. This includes:</p>
              <ul>
                <li><strong>Identity Data:</strong> Full name, company name, job title</li>
                <li><strong>Contact Data:</strong> Email address, phone number, mailing address</li>
                <li><strong>Project Data:</strong> Business goals, budget, timeline, brand assets</li>
                <li><strong>Technical Data:</strong> IP address, browser type, device information, pages visited</li>
                <li><strong>Marketing Data:</strong> Communication preferences, campaign responses</li>
              </ul>
              <div class="callout callout-good"><strong>Note:</strong> We <strong>do not</strong> sell your personal data to third parties. Ever.</div>`,
  },
  {
    id: 'cara-penggunaan',
    num: '04',
    title: 'How We Use Your Data',
    contentHtml: `<p>We use the collected information to:</p>
              <ul>
                <li>Provide the services you have contracted us for</li>
                <li>Communicate about your project and respond to inquiries</li>
                <li>Send relevant marketing communications (with your consent)</li>
                <li>Improve our website, services, and client experience</li>
                <li>Comply with legal obligations and protect our rights</li>
                <li>Analyze trends and measure the effectiveness of our campaigns</li>
              </ul>`,
  },
  {
    id: 'cookie',
    num: '05',
    title: 'Cookies & Tracking',
    contentHtml: `<p>Our website uses cookies and similar tracking technologies to improve user experience, analyze traffic, and serve personalized ads. We use:</p>
              <ul>
                <li><strong>Essential Cookies:</strong> Required for the site to function</li>
                <li><strong>Analytics Cookies:</strong> Google Analytics 4, Meta Pixel</li>
                <li><strong>Advertising Cookies:</strong> Google Ads and Meta Ads Remarketing</li>
                <li><strong>Preference Cookies:</strong> To remember your choices</li>
              </ul>
              <p>You can control cookie settings through your browser. Disabling cookies may limit certain website features.</p>`,
  },
  {
    id: 'pembagian-data',
    num: '06',
    title: 'Data Sharing & Third Parties',
    contentHtml: `<p>We share data only with trusted partners who help us run our business, including hosting providers, advertising platforms (Google, Meta), analytics tools, and payment processors. All partners are contractually bound to protect your data and use it only for the purposes we specify.</p>
              <p>We may also disclose information if required by law, to protect our rights, or in connection with a business transaction such as a merger or acquisition.</p>`,
  },
  {
    id: 'keamanan-data',
    num: '07',
    title: 'Data Security',
    contentHtml: `<p>We implement industry security standards including SSL/TLS encryption, secure password hashing, strict access controls, and regular security audits to protect your data from unauthorized access, alteration, or disclosure.</p>
              <p>However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security, but we are committed to notifying affected users within <strong>72 hours</strong> of discovering a breach affecting their personal data.</p>`,
  },
  {
    id: 'hak-anda',
    num: '08',
    title: 'Your Rights',
    contentHtml: `<p>Depending on your jurisdiction, you have the right to:</p>
              <ul>
                <li><strong>Access</strong> the personal data we hold about you</li>
                <li><strong>Correct</strong> inaccurate or incomplete data</li>
                <li><strong>Delete</strong> your data (the "right to be forgotten")</li>
                <li><strong>Restrict</strong> or object to certain processing</li>
                <li><strong>Receive a copy</strong> of your data in a portable format</li>
                <li><strong>Withdraw consent</strong> for marketing communications at any time</li>
              </ul>
              <p>To exercise these rights, contact us at <a href="mailto:tentaklik@mediapro.work">tentaklik@mediapro.work</a>. We will provide a response within 30 days.</p>`,
  },
  {
    id: 'pembayaran',
    num: '09',
    title: 'Payments & Refunds',
    contentHtml: `<p>Service fees, payment schedules, and refund terms are detailed in your individual Service Agreement (SA). Generally:</p>
              <ul>
                <li>A <strong>50%</strong> deposit is required before work begins on most projects</li>
                <li>All fees are quoted and billed in <strong>Rupiah (IDR)</strong> or <strong>US Dollars (USD)</strong> (as agreed)</li>
                <li>Invoices are due within 14 days of issuance (<strong>NET-14</strong>)</li>
                <li>Late payments may incur a monthly interest charge of <strong>1.5%</strong></li>
                <li>We accept bank transfers, credit card payments, or other agreed payment methods</li>
                <li>Advertising costs (<em>ad spend</em>) are billed separately and paid directly to the ad platforms</li>
                <li>Refunds for work already performed are not available; unused <em>retainer</em> balances may be credited or refunded at our discretion</li>
              </ul>`,
  },
  {
    id: 'hak-kekayaan',
    num: '10',
    title: 'Intellectual Property Rights',
    contentHtml: `<p>All content on this website — including text, graphics, logos, code, and design — is the property of Tentaklik or its licensors and is protected by international copyright laws.</p>
              <p>Upon full payment, custom work created for your project (website, ad creatives, content) becomes yours. Pre-existing tools, frameworks, and methodologies remain ours.</p>`,
  },
  {
    id: 'standar-implementasi',
    num: '11',
    title: 'Our Implementation Standards',
    contentHtml: `<p>As a commitment to Quality Assurance and long-term support, we implement an attribution standard by embedding a <strong>"Supported by TentaKlik"</strong> label in the footer of your website.</p>
              <p>This attribution is a <strong>seal of professionalism</strong> indicating that your digital assets are managed and built by experts.</p>`,
  },
  {
    id: 'batasan-tanggung-jawab',
    num: '12',
    title: 'Limitation of Liability',
    contentHtml: `<p>To the fullest extent permitted by law, Tentaklik is not liable for indirect, incidental, special, consequential, or punitive damages, including loss of profits, arising from your use of our services or website.</p>
              <p>Our total liability for any claim will not exceed the amount you paid us for the specific services underlying the claim in the <strong>past 12 months</strong>.</p>`,
  },
  {
    id: 'perubahan',
    num: '13',
    title: 'Changes to Terms',
    contentHtml: `<p>We may update these Terms from time to time. Material changes will be communicated via email or a notice on our website at least <strong>14 days before taking effect</strong>. Your continued use of our services after the effective date constitutes your acceptance.</p>`,
  },
  {
    id: 'kontak',
    num: '14',
    title: 'Contact Us',
    contentHtml: `<p>Have questions about these Terms or our Privacy Policy? Contact us:</p>
              <ul>
                <li><strong>WhatsApp:</strong> <a href="https://wa.me/6285129992225" target="_blank" rel="noopener noreferrer">085129992225</a></li>
                <li><strong>Email:</strong> <a href="mailto:tentaklik@mediapro.work">tentaklik@mediapro.work</a></li>
                <li><strong>Address:</strong> Semarang, Indonesia</li>
              </ul>`,
  },
  {
    id: 'sewa-syarat-umum',
    num: '15',
    title: 'General Terms for Account Rental Services',
    contentHtml: `<p>The following terms apply specifically to the <strong>Account Rental</strong> service (Google & Meta whitelist ad accounts):</p>
              <ul>
                <li>Clients must have an active and valid Meta Business Manager or Google account.</li>
                <li>Clients may not use whitelist accounts to advertise products/services prohibited by the platforms.</li>
                <li>One client, one Business Manager ID — you cannot use a BM that has been connected to another whitelist provider.</li>
                <li>Clients must follow all applicable Meta and Google advertising policies.</li>
                <li>Tentaklik reserves the right to disable the service without balance refund if intentional severe violations are proven.</li>
              </ul>`,
  },
  {
    id: 'sewa-produk-dilarang',
    num: '16',
    title: 'Prohibited Products / Services',
    contentHtml: `<p>The following categories cannot use Tentaklik's Account Rental service:</p>
              <ul>
                <li>Illegal or semi-legal products (narcotics, prescription drugs, etc.)</li>
                <li>Online gambling / money games without official licenses</li>
                <li>Investment scams or Ponzi schemes</li>
                <li>Adult content / pornography</li>
                <li>Counterfeit products or piracy</li>
                <li>Firearms, ammunition, or hazardous materials</li>
                <li>Hacking / phishing / cyber attack services</li>
                <li>Content that spreads hate speech or disinformation</li>
              </ul>
              <div class="callout callout-warn"><strong>Note:</strong> This list follows official Meta and Google policies. If in doubt, consult your product type with Tentaklik CS before registering.</div>`,
  },
  {
    id: 'sewa-produk-verifikasi',
    num: '17',
    title: 'Products / Services Requiring Additional Verification',
    contentHtml: `<p>The following categories can still be advertised, but require additional documents / verification before the account is activated:</p>
              <ul>
                <li>Health supplements and medicines (requires BPOM distribution permit)</li>
                <li>Financial / investment services (requires OJK permit)</li>
                <li>Tobacco / vape products (restricted and subject to special conditions)</li>
                <li>Money lending services (requires official permit)</li>
                <li>Content involving sensitive political or social issues</li>
              </ul>`,
  },
];
