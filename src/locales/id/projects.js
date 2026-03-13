const projects = {
  // Section project
  projectTitle: "Apa Saja Project Saya?",
  projectDesc:
    "Mulai dari rancanggan UI/UX hingga sistem backend, setiap proyek adalah cerminan dari solusi kreatif dan dedikasi.",
  emptyMessage: "Sedang dalam pengembangan. Ditunggu ya!",

  // Filter tabs
  tabs: {
    BEST: "UNGGULAN",
    WEB: "WEB",
    UI_UX: "UI/UX",
    BRANDING: "BRANDING",
    ILLUSTRATION: "ILUSTRASI",
  },

  //project detail
  keyFeature: "Fitur Utama",
  theChallenge: "Tantangan Utama",
  challenge: "Tantangan",
  solution: "Solusi",
  tech: "Teknologi",
  forClient: "Klien",
  start: "Durasi Kerja",
  finish: "Waktu Selesai",
  role: "Peran Saya",
  simProject: "Proyek Serupa",

  // PROJECT CONTENT
  items: {
    "vitalwell-healthcare": {
      title: "VitalWell Platform Kesehatan",
      desc: "Landing page untuk platform asisten kesehatan digital dan pencarian layanan medis.",
      fullDescription:
        "Sebuah desain landing page yang komprehensif untuk VitalWell, platform yang menghubungkan pasien dengan berbagai layanan kesehatan seperti perawatan primer, kesehatan mental, dan spesialis. Desain ini menekankan kepercayaan, profesionalisme, dan kemudahan akses informasi medis.",
      challenge:
        "Menyusun hierarki informasi yang kompleks agar tetap terlihat bersih dan menenangkan bagi pengguna yang mungkin sedang mencari bantuan medis dalam kondisi stres.",
      solution:
        "Menggunakan layout berbasis kartu (card-based) untuk kategori layanan, palet warna biru yang menenangkan, serta tipografi tebal (bold) untuk pesan utama guna memberikan kejelasan navigasi.",
      role: "UI/UX Designer & Web Developer",
      duration: "1.5 months",
      completedDate: "March 2024",
      client: "VitalWell Health Group",
      features: [
        "Sistem navigasi terintegrasi (Home, Find Care, Articles)",
        "Fitur pencarian dokter dan layanan berdasarkan kategori",
        "Bagian 'About Us' dengan visi misi perusahaan",
        "Dashboard kategori layanan (Primary Care, Mental Health, Urgent Care, Specialists)",
        "Integrasi call-to-action untuk pendaftaran gratis",
      ],
    },

    "personal-portfolio": {
      title: "Portofolio Profesional",
      desc: "Website portofolio pribadi untuk Full-Stack Developer & Graphic Designer.",
      fullDescription:
        "Sebuah platform portofolio modern yang menampilkan keahlian dalam pengembangan web dan desain grafis. Situs ini dirancang dengan pendekatan estetika bersih (clean aesthetic), navigasi intuitif, dan performa tinggi menggunakan ekosistem React terbaru.",
      challenge:
        "Mengintegrasikan dua identitas profesional yang berbeda (Developer dan Designer) ke dalam satu antarmuka yang kohesif tanpa membingungkan audiens target.",
      solution:
        "Menggunakan layout berbasis grid yang dinamis, tipografi yang kuat untuk branding personal, dan animasi halus menggunakan Motion untuk meningkatkan pengalaman pengguna (UX).",
      role: "Full-Stack Developer & Designer",
      duration: "3 bulan",
      completedDate: "Maret 2024",
      client: "Proyek Pribadi",
      features: [
        "Hero section dengan ilustrasi digital kustom",
        "Filter kategori proyek (Web, UI/UX, Design)",
        "Statistik pengalaman (4+ tahun, 200+ proyek selesai)",
        "Menu layanan akordeon (Web Dev, Branding, Illustration)",
        "Formulir kontak terintegrasi dengan EmailJS",
        "Desain sepenuhnya responsif untuk semua perangkat",
      ],
    },

    "fitquest-fitness-platform": {
      title: "FitQuest - Landing Page Tantangan Kebugaran",
      desc: "Landing page dinamis bertema dark-mode untuk komunitas kebugaran yang tergamifikasi.",
      fullDescription:
        "FitQuest adalah platform web modern yang dirancang untuk memotivasi pengguna melalui tantangan kebugaran dan keterlibatan komunitas. Desain ini menampilkan estetika kontras tinggi yang berani, pelacakan papan peringkat (leaderboard), dan kategori latihan untuk menciptakan perjalanan kebugaran yang imersif.",
      challenge:
        "Menciptakan pengalaman visual berenergi tinggi yang menyeimbangkan citra besar yang inspiratif dengan elemen data fungsional seperti papan peringkat dan akordeon interaktif.",
      solution:
        "Menggunakan tema gelap yang canggih dengan aksen oranye cerah untuk mendorong aksi, menerapkan kisi (grid) yang terorganisir untuk kategori tantangan, dan merancang UI papan peringkat yang jelas untuk menumbuhkan kompetisi yang sehat.",
      role: "Lead UI/UX Designer & Web Developer",
      duration: "1 bulan",
      completedDate: "April 2024",
      client: "FitQuest Startup",
      features: [
        "Sistem tantangan tergamifikasi (Lari, Yoga, Kardio, Kekuatan)",
        "Bagian 'Tentang Kami' interaktif dengan detail akordeon",
        "Papan peringkat komunitas langsung dan pelacakan kemajuan",
        "Integrasi media sosial dan bagian acara komunitas mendatang",
        "Formulir kontak responsif dengan CTA 'Kirim Pesan Kepada Kami'",
      ],
    },

    "ecommerce-ui": {
      title: "Konsep UI E-Commerce",
      desc: "Tampilan produk bersih dengan fokus pada konversi.",
      fullDescription:
        "Antarmuka e-commerce modern yang dirancang untuk meningkatkan angka konversi dan memberikan pengalaman belanja yang mulus. Fokus pada kemudahan penelusuran produk dan alur checkout yang ringkas.",
      challenge:
        "Merancang alur belanja yang memudahkan pengguna sehingga mengurangi angka keranjang yang ditinggalkan (cart abandonment).",
      solution:
        "Menyederhanakan proses checkout dengan indikator progres, memberikan feedback visual pada setiap aksi belanja, serta memudahkan pencarian produk melalui filter pintar.",
      role: "UI/UX Designer",
      duration: "2 bulan",
      completedDate: "Desember 2023",
      client: "Perusahaan Fashion",
      features: [
        "Modal 'Quick View' untuk melihat produk",
        "Sidebar keranjang belanja yang praktis",
        "Indikator progres checkout",
        "Rekomendasi produk terkait",
      ],
    },

    "brand-identity": {
      title: "Sistem Identitas Brand",
      desc: "Identitas visual untuk startup kreatif.",
      fullDescription:
        "Sistem identitas merek lengkap yang mencakup desain logo, palet warna, tipografi, hingga panduan penggunaan merek (brand guidelines) agar konsisten di berbagai media.",
      challenge:
        "Membangun identitas yang fleksibel untuk media digital maupun cetak, namun tetap selaras dengan visi inovatif perusahaan.",
      solution:
        "Mengembangkan sistem desain modular, dokumentasi panduan yang mendalam, serta menyediakan berbagai variasi logo untuk kebutuhan platform yang berbeda.",
      role: "Brand Designer",
      duration: "1.5 bulan",
      completedDate: "November 2023",
      client: "Startup Kreatif",
      features: [
        "Logo utama dan sekunder",
        "Palet warna dengan standar aksesibilitas",
        "Sistem tipografi berbasis web fonts",
        "Dokumen PDF panduan merek (Brand Guidelines)",
      ],
    },

    "mobile-banking": {
      title: "UI Aplikasi Mobile Banking",
      desc: "Antarmuka perbankan digital yang ramah pengguna.",
      fullDescription:
        "Desain aplikasi perbankan mobile yang mengedepankan kesederhanaan, keamanan, dan kemudahan dalam mengelola transaksi harian. Tersedia untuk platform iOS dan Android.",
      challenge:
        "Membangun antarmuka yang sangat aman namun tetap nyaman digunakan, guna menumbuhkan rasa percaya pengguna saat melakukan transaksi kompleks.",
      solution:
        "Menggunakan pola desain perbankan yang familiar, hierarki visual yang jelas, serta integrasi biometrik untuk keamanan maksimal.",
      role: "UI/UX Designer",
      duration: "2 bulan",
      completedDate: "Oktober 2023",
      client: "Fintech Startup",
      features: [
        "Ringkasan saldo akun yang jelas",
        "Riwayat transaksi dengan filter detail",
        "Alur transfer uang yang simpel",
        "Keamanan dengan autentikasi biometrik",
      ],
    },

    "corporate-website": {
      title: "Redesain Website Perusahaan",
      desc: "Penyegaran modern untuk profil perusahaan.",
      fullDescription:
        "Transformasi total website perusahaan dengan fokus pada estetika modern, peningkatan keterlibatan pengunjung, serta struktur informasi yang lebih tertata untuk perusahaan jasa keuangan.",
      challenge:
        "Memperbarui citra perusahaan yang kaku menjadi lebih modern tanpa menghilangkan kesan profesional, kredibel, dan tetap patuh pada aturan industri keuangan.",
      solution:
        "Menerapkan layout yang bersih dan elegan dengan sentuhan animasi GSAP, menjaga nada komunikasi tetap profesional namun jauh lebih interaktif.",
      role: "Frontend Developer",
      duration: "1.5 bulan",
      completedDate: "September 2023",
      client: "Perusahaan Jasa Keuangan",
      features: [
        "Bagian hero dengan animasi menarik",
        "Carousel profil anggota tim",
        "Timeline sejarah perusahaan interaktif",
        "Bagian berita dan wawasan terkini",
      ],
    },

    "startup-branding": {
      title: "Branding Pitch Startup",
      desc: "Aset visual untuk startup tahap awal.",
      fullDescription:
        "Paket branding lengkap untuk startup teknologi yang sedang bersiap menghadapi putaran pendanaan awal, mencakup logo, pitch deck, dan materi presentasi investor.",
      challenge:
        "Menciptakan identitas yang ikonik untuk mengomunikasikan inovasi kepada calon investor di tengah kompetisi pasar yang ketat.",
      solution:
        "Menyusun identitas visual yang tech-forward dengan sistem logo yang kuat serta desain materi presentasi yang profesional.",
      role: "Brand Designer",
      duration: "1 bulan",
      completedDate: "Agustus 2023",
      client: "Tech Startup",
      features: [
        "Variasi logo dan wordmark",
        "Template pitch deck profesional",
        "Desain kartu nama eksklusif",
        "Aset konten media sosial",
      ],
    },

    "saas-landing-page": {
      title: "Landing Page SaaS",
      desc: "Halaman penawaran dengan tingkat konversi tinggi.",
      fullDescription:
        "Landing page yang dirancang untuk menonjolkan fitur produk SaaS, membangun kepercayaan melalui testimoni, dan mendorong pendaftaran pengguna lewat tombol aksi yang strategis.",
      challenge:
        "Menjelaskan fitur produk yang kompleks dengan bahasa yang sederhana dan mudah dimengerti agar pengunjung tertarik mencoba.",
      solution:
        "Fokus pada copywriting berbasis manfaat, ilustrasi fitur yang jelas, serta penempatan tombol CTA yang tepat di sepanjang halaman.",
      role: "Frontend Developer & Designer",
      duration: "3 minggu",
      completedDate: "Juli 2023",
      client: "Perusahaan SaaS",
      features: [
        "Tabel perbandingan harga yang jelas",
        "Grid fitur unggulan",
        "Carousel testimoni pelanggan",
        "Bagian FAQ yang interaktif",
      ],
    },

    "design-system-ui": {
      title: " Desain Sistem UI Kit ",
      desc: "Sistem komponen skalabel untuk tim produk.",
      fullDescription:
        "UI Kit komprehensif berisi komponen yang dapat digunakan kembali, token desain, dan dokumentasi lengkap guna menjaga konsistensi visual di berbagai platform aplikasi.",
      challenge:
        "Membangun sistem yang fleksibel agar mudah diadopsi oleh desainer maupun pengembang lain dalam jangka panjang.",
      solution:
        "Menggunakan struktur 'Atomic Design' dengan varian komponen yang kaya di Figma, lengkap dengan panduan penggunaan yang mendetail.",
      role: "UI/UX Designer",
      duration: "3 bulan",
      completedDate: "Juni 2023",
      client: "Tim Produk",
      features: [
        "Token warna dan tipografi yang sistematis",
        "Library komponen dengan berbagai varian",
        "Set ikon kustom yang lengkap",
        "Dokumentasi panduan teknis bagi tim",
      ],
    },
  },
};

export default projects;
