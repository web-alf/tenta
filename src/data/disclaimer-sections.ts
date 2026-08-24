export interface DisclaimerSection { id: string; num: string; title: string; contentHtml: string }

export const DISCLAIMER_HERO = {
  eyebrow: 'Disclaimer',
  title: 'Disclaimer Tenta<span class="accent">Klik</span>',
  lede: 'Sebelum kita mulai kolaborasi, luangin 5 menit buat baca ini dulu — biar ekspektasi kita sama-sama jelas dari awal.',
  lastUpdated: '2026-05-05',
};

export const DISCLAIMER_SECTIONS: DisclaimerSection[] = [
  {
    id: 'informasi-website',
    num: '01',
    title: 'Informasi di Website Ini',
    contentHtml: `<p>Seluruh konten di website <strong>tentaklik.com</strong> — mulai dari deskripsi layanan, studi kasus, hingga angka-angka hasil campaign — disusun berdasarkan pengalaman nyata tim kami dan data historis dari proyek yang sudah berjalan.</p>
              <p>Meski begitu, konten di sini bersifat <strong>informatif dan umum</strong>. Bisa berubah sewaktu-waktu seiring perkembangan layanan, tools, atau kebijakan platform digital seperti Google dan Meta.</p>
              <div class="callout callout-warn"><strong>⚠️ Catatan penting:</strong> Kami selalu berusaha menjaga info tetap up-to-date, tapi kalau ada ketidaksesuaian antara konten di website sama realita layanan terbaru, <strong>yang berlaku adalah informasi terbaru yang disampaikan langsung oleh tim Tentaklik.</strong></div>`,
  },
  {
    id: 'hasil-performa',
    num: '02',
    title: 'Soal Hasil & Performa Iklan',
    contentHtml: `<p>Tentaklik udah bantu banyak bisnis scale up lewat digital marketing. Studi kasus yang kami tampilkan adalah hasil nyata — dan kami bangga sama itu. Tapi ada satu hal penting yang perlu dipahami:</p>
              <p>Angka-angka di studi kasus adalah hasil nyata dari klien dengan kondisi bisnis, pasar, dan waktu yang spesifik. <strong>Bukan garansi</strong> bahwa bisnis Anda akan dapat angka yang persis sama.</p>
              <ul>
                <li>Performa iklan sangat dipengaruhi kondisi industri, kompetitor, anggaran, dan kualitas produk Anda sendiri</li>
                <li>Algoritma Google dan Meta terus berubah — kami adaptasi terus, tapi faktor eksternal tetap ada di luar kendali kami</li>
                <li>Hasil campaign bisa berbeda antar industri, kota, bahkan musim</li>
                <li>KPI yang kami kejar selalu disepakati bareng di awal — bukan angka sepihak dari kami</li>
              </ul>
              <div class="callout callout-good"><strong>💡 Yang kami jamin:</strong> proses terstruktur, strategi terukur, reporting transparan, dan tim yang beneran kerja keras buat bisnis Anda. Hasil terbaik selalu datang dari kolaborasi dua arah.</div>`,
  },
  {
    id: 'kepemilikan-akun',
    num: '03',
    title: 'Kepemilikan Akun & Model Layanan Kami',
    contentHtml: `<p>Berbeda dari agensi pada umumnya, Tentaklik menawarkan layanan berbasis <strong>penyewaan akun iklan</strong> — artinya iklan Anda dijalankan menggunakan akun Google Ads dan Meta Ads milik Tentaklik, bukan akun baru atas nama Anda.</p>
              <p>Model ini kami pilih karena akun kami sudah punya <strong>track record, trust score, dan riwayat performa</strong> yang matang di mata algoritma Google dan Meta — sehingga campaign bisa lebih cepat optimal dibanding akun baru yang masih <em>cold start</em>.</p>
              <ul>
                <li>Akun iklan yang digunakan adalah milik Tentaklik — Anda menyewa akses dan kapasitas iklannya</li>
                <li>Selama masa kerja sama aktif, akun dan semua campaign yang berjalan dikelola penuh oleh tim kami</li>
                <li>Jika kerja sama berakhir, campaign akan dihentikan dan akun kembali ke pengelolaan Tentaklik sepenuhnya</li>
                <li>Data performa campaign (laporan, angka, insight) tetap akan kami berikan ke Anda secara transparan via dashboard real-time</li>
                <li>Informasi bisnis, produk, dan data Anda yang kami gunakan untuk keperluan iklan diperlakukan secara <em>confidential</em> — tidak dibagikan ke pihak lain</li>
              </ul>
              <div class="callout callout-warn"><strong>📌 Penting:</strong> Karena akun adalah milik Tentaklik, histori campaign <strong>tidak bisa dipindahkan</strong> ke akun pribadi Anda jika kerja sama berakhir. Pastikan Anda memahami model ini sebelum mulai — kalau ada pertanyaan, tanya kami dulu sebelum deal.</div>
              <div class="callout callout-good"><strong>💡 Keuntungan model ini:</strong> Anda nggak perlu repot setup akun dari nol, nggak kena <em>learning period</em> panjang, dan langsung bisa manfaatin reputasi akun yang sudah <em>proven</em>. Lebih efisien, lebih cepat jalan.</div>`,
  },
  {
    id: 'platform-pihak-ketiga',
    num: '04',
    title: 'Layanan Platform Pihak Ketiga',
    contentHtml: `<p>Sebagai <strong>Google Partner</strong> dan <strong>Meta Business Partner</strong>, Tentaklik beroperasi menggunakan platform milik pihak ketiga. Ada hal penting yang perlu Anda pahami:</p>
              <ul>
                <li>Kebijakan iklan Google dan Meta bisa berubah sewaktu-waktu dan di luar kendali kami</li>
                <li>Penolakan atau pembatasan iklan oleh platform adalah keputusan Google/Meta — bukan Tentaklik</li>
                <li>Downtime atau gangguan teknis dari platform bukan tanggung jawab kami, tapi kami akan selalu update Anda kalau itu terjadi</li>
                <li>Biaya iklan (ad spend) langsung ditagih ke akun klien oleh Google/Meta — Tentaklik tidak ngambil margin dari budget iklan Anda</li>
              </ul>
              <div class="callout callout-warn"><strong>📌 Anggaran iklan:</strong> Kami sangat menyarankan anggaran iklan minimal <strong>Rp 10–15 juta per bulan</strong> biar strategi yang kami susun bisa dieksekusi dengan optimal. Di bawah itu, ruang buat optimasi jadi sangat terbatas.</div>`,
  },
  {
    id: 'syarat-kerja-sama',
    num: '05',
    title: 'Syarat & Ekspektasi Kerja Sama',
    contentHtml: `<p>Tentaklik percaya hasil terbaik lahir dari kerja sama yang saling mendukung — bukan hubungan satu arah di mana Anda nyerahin semua terus nunggu keajaiban.</p>
              <ul>
                <li>Durasi kontrak minimal <strong>3 bulan</strong> — optimasi digital butuh waktu, bukan sulap instan</li>
                <li>Klien wajib menyediakan informasi bisnis yang akurat sebagai bahan audit dan strategi</li>
                <li>Feedback dan approval dari klien dibutuhkan dalam proses eksekusi kreatif dan copywriting</li>
                <li>Tentaklik berhak menolak proyek yang tidak sesuai nilai perusahaan atau melanggar kebijakan platform</li>
                <li>Perubahan scope pekerjaan yang signifikan akan selalu didiskusikan dan disesuaikan bersama</li>
              </ul>`,
  },
  {
    id: 'link-eksternal',
    num: '06',
    title: 'Link & Referensi Eksternal',
    contentHtml: `<p>Website Tentaklik mungkin menampilkan tautan ke sumber eksternal seperti artikel atau platform lain sebagai referensi tambahan. Kami tidak mengontrol konten dari website pihak ketiga dan <strong>tidak bertanggung jawab</strong> atas isi, keakuratan, atau kebijakan privasi mereka.</p>
              <p>Kalau ada info dari sumber eksternal yang bikin ragu, tanya langsung ke tim kami — gratis, dan kami seneng bantu klarifikasi.</p>`,
  },
  {
    id: 'pembaruan',
    num: '07',
    title: 'Pembaruan Disclaimer',
    contentHtml: `<p>Disclaimer ini bisa diperbarui seiring perkembangan layanan dan kebijakan yang berlaku. Setiap perubahan signifikan akan kami informasikan lewat website ini dengan mencantumkan tanggal pembaruan terbaru.</p>
              <p>Dengan terus menggunakan layanan Tentaklik setelah adanya pembaruan, Anda dianggap udah baca dan setuju sama versi terbaru dari disclaimer ini.</p>
              <div class="callout callout-good"><strong>✅ Ada bagian yang bikin bingung?</strong> Jangan sungkan kontak kami langsung. Kami lebih prefer ngobrol jujur dari awal daripada ada yang ga jelas di tengah jalan.</div>`,
  },
];

export const DISCLAIMER_HERO_EN = {
  eyebrow: 'Disclaimer',
  title: 'Tenta<span class="accent">Klik</span> Disclaimer',
  lede: 'Before we start our collaboration, take 5 minutes to read this — so our expectations are aligned from the beginning.',
  lastUpdated: '2026-05-05',
};

export const DISCLAIMER_SECTIONS_EN: DisclaimerSection[] = [
  {
    id: 'informasi-website',
    num: '01',
    title: 'Information on this Website',
    contentHtml: `<p>All content on the <strong>tentaklik.com</strong> website — from service descriptions, case studies, to campaign result numbers — is compiled based on our team's real experience and historical data from past projects.</p>
              <p>Even so, the content here is <strong>informative and general</strong> in nature. It may change at any time as our services, tools, or digital platform policies like Google and Meta evolve.</p>
              <div class="callout callout-warn"><strong>⚠️ Important note:</strong> We always try to keep information up-to-date, but if there is a discrepancy between the content on the website and the latest service reality, <strong>the prevailing information is the latest updates provided directly by the Tentaklik team.</strong></div>`,
  },
  {
    id: 'hasil-performa',
    num: '02',
    title: 'About Results & Ad Performance',
    contentHtml: `<p>Tentaklik has helped many businesses scale up through digital marketing. The case studies we display are real results — and we are proud of them. But there is one important thing to understand:</p>
              <p>The numbers in the case studies are actual results from clients with specific business conditions, markets, and timing. <strong>It is not a guarantee</strong> that your business will get exactly the same numbers.</p>
              <ul>
                <li>Ad performance is highly influenced by industry conditions, competitors, budget, and the quality of your own product</li>
                <li>Google and Meta algorithms are constantly changing — we continuously adapt, but external factors remain beyond our control</li>
                <li>Campaign results can differ across industries, cities, and even seasons</li>
                <li>The KPIs we chase are always agreed upon together at the start — not arbitrary numbers from us</li>
              </ul>
              <div class="callout callout-good"><strong>💡 What we guarantee:</strong> a structured process, measurable strategies, transparent reporting, and a team that genuinely works hard for your business. The best results always come from two-way collaboration.</div>`,
  },
  {
    id: 'kepemilikan-akun',
    num: '03',
    title: 'Account Ownership & Our Service Model',
    contentHtml: `<p>Unlike general agencies, Tentaklik offers a service based on <strong>ad account rental</strong> — meaning your ads are run using Google Ads and Meta Ads accounts owned by Tentaklik, not new accounts in your name.</p>
              <p>We chose this model because our accounts already have an established <strong>track record, trust score, and performance history</strong> in the eyes of Google and Meta algorithms — so campaigns can optimize faster compared to new accounts with a <em>cold start</em>.</p>
              <ul>
                <li>The ad accounts used are owned by Tentaklik — you are renting access and ad capacity</li>
                <li>During the active collaboration period, the accounts and all running campaigns are fully managed by our team</li>
                <li>If the collaboration ends, campaigns will be stopped and the accounts return to Tentaklik's full management</li>
                <li>Campaign performance data (reports, numbers, insights) will still be provided to you transparently via a real-time dashboard</li>
                <li>Your business information, products, and data we use for advertising purposes are treated as <em>confidential</em> — not shared with third parties</li>
              </ul>
              <div class="callout callout-warn"><strong>📌 Important:</strong> Because the accounts are owned by Tentaklik, campaign history <strong>cannot be transferred</strong> to your personal account if the collaboration ends. Make sure you understand this model before starting — if you have questions, ask us first before making a deal.</div>
              <div class="callout callout-good"><strong>💡 Advantages of this model:</strong> You don't have to bother setting up accounts from scratch, you don't face a long <em>learning period</em>, and you can immediately leverage the reputation of <em>proven</em> accounts. It's more efficient and faster to run.</div>`,
  },
  {
    id: 'platform-pihak-ketiga',
    num: '04',
    title: 'Third-Party Platform Services',
    contentHtml: `<p>As a <strong>Google Partner</strong> and <strong>Meta Business Partner</strong>, Tentaklik operates using platforms owned by third parties. There are important things you need to understand:</p>
              <ul>
                <li>Google and Meta ad policies can change at any time and are beyond our control</li>
                <li>Ad rejection or restriction by the platform is the decision of Google/Meta — not Tentaklik</li>
                <li>Downtime or technical disruptions from the platform are not our responsibility, but we will always update you if it happens</li>
                <li>Ad spend is billed directly to the client's account by Google/Meta — Tentaklik does not take a margin from your ad budget</li>
              </ul>
              <div class="callout callout-warn"><strong>📌 Ad budget:</strong> We highly recommend a minimum ad budget of <strong>Rp 10–15 million per month</strong> so the strategies we formulate can be executed optimally. Below that, the room for optimization becomes very limited.</div>`,
  },
  {
    id: 'syarat-kerja-sama',
    num: '05',
    title: 'Terms & Expectations of Collaboration',
    contentHtml: `<p>Tentaklik believes the best results are born from a mutually supportive collaboration — not a one-way relationship where you hand everything over and wait for a miracle.</p>
              <ul>
                <li>Minimum contract duration is <strong>3 months</strong> — digital optimization takes time, it's not instant magic</li>
                <li>Clients must provide accurate business information as material for audits and strategies</li>
                <li>Feedback and approval from the client are needed in the creative and copywriting execution process</li>
                <li>Tentaklik reserves the right to reject projects that do not align with company values or violate platform policies</li>
                <li>Significant changes in the scope of work will always be discussed and adjusted together</li>
              </ul>`,
  },
  {
    id: 'link-eksternal',
    num: '06',
    title: 'External Links & References',
    contentHtml: `<p>The Tentaklik website may display links to external sources like articles or other platforms as additional references. We do not control the content of third-party websites and are <strong>not responsible</strong> for their content, accuracy, or privacy policies.</p>
              <p>If there is information from an external source that makes you doubt, ask our team directly — it's free, and we are happy to help clarify.</p>`,
  },
  {
    id: 'pembaruan',
    num: '07',
    title: 'Disclaimer Updates',
    contentHtml: `<p>This disclaimer may be updated along with the development of services and applicable policies. We will inform you of any significant changes through this website by indicating the latest update date.</p>
              <p>By continuing to use Tentaklik services after an update, you are considered to have read and agreed to the latest version of this disclaimer.</p>
              <div class="callout callout-good"><strong>✅ Is there a confusing part?</strong> Don't hesitate to contact us directly. We prefer honest conversations from the start rather than unclarity midway.</div>`,
  },
];
