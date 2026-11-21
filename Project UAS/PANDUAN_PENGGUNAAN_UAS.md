# PANDUAN PENGGUNAAN APLIKASI MULTIMEDIA INTERAKTIF & LEARNING ANALYTICS

**Judul Proyek:**  
Pengembangan Multimedia Interaktif Mengenal Sistem Pernapasan Manusia Berbasis Learning Analytics untuk Siswa SMP Kelas VIII.

**Mata Kuliah:** TIK dalam Pendidikan  
**Dosen Pengampu:** Reni Rahmadani, S.Kom., M.Kom.  
**Tim Pengembang (Kelompok 5 • PTIK-D UNIMED 2026):**
1. Ester Oktaviani Sinaga (Ketua Tim & Integrasi)
2. Lulu Afsari (Desain Visual & Media)
3. Nurul Ahadia Fahmawati (Penyusun Materi & Storyboard)
4. Deby Lestari Putri Br. Purba (Aktivitas & Assessment)

---

## 1. CARA MENJALANKAN APLIKASI

Aplikasi dibangun sebagai **Single Page Application (SPA)** berbasis teknologi web murni (*HTML5, CSS3, JavaScript modern*) tanpa memerlukan instalasi database server lokal yang rumit.

1. Buka folder proyek: `c:\Users\Lulu Afsari\Downloads\New folder`
2. Klik dua kali pada file **`index.html`** untuk membukanya langsung di browser (Google Chrome, Microsoft Edge, atau Mozilla Firefox).
3. Aplikasi akan langsung berjalan dengan tampilan responsif, mulus, dan interaktif.

---

## 2. FITUR ALUR PEMBELAJARAN SISWA (11 LAYAR SESUAI FIGMA UTS)

1. **Layar 1 — Beranda Pembuka:**
   - Judul materi, ilustrasi visual anatomi paru-paru asli Figma, identitas tim Kelompok 5 PTIK-D UNIMED.
   - Form input Nama Siswa (otomatis menginisialisasi sesi pencatatan di *Learning Analytics Engine*).
   - Tombol **"MULAI"** untuk melangkah ke modul pembelajaran.

2. **Layar 2 — Tujuan Pembelajaran:**
   - 4 kartu tujuan (01–04) dengan indikator kompetensi IPA SMP Kelas VIII.
   - Dilengkapi *progress bar* dan navigasi *Langkah 02 dari 11*.

3. **Layar 3 — Organ Pernapasan Manusia:**
   - **Diagram Anatomi Interaktif:** Dilengkapi 6 titik *hotspot* bernomor (1 s.d. 6).
   - **6 Kartu Organ:** Rongga Hidung, Faring, Laring, Trakea, Bronkus, dan Paru-paru (Alveolus).
   - Siswa dapat mengklik organ mana pun untuk membaca fungsi utama dan fakta menarik ilmiah.
   - Aktivitas eksplorasi organ dicatat otomatis sebagai bukti ketuntasan materi.

4. **Layar 4 — Proses Pernapasan (Inspirasi vs Ekspirasi):**
   - Komparasi berdampingan: Panel Hijau (*Inspirasi*) dan Panel Pink (*Ekspirasi*).
   - Visualisasi kembang-kempis paru-paru dan pergerakan diafragma mendatar vs melengkung ke atas.

5. **Layar 5 — Video Pembelajaran & Quick Check:**
   - Pemutar video pembelajaran pertukaran gas di alveolus (Channel Edu).
   - Tombol pencatat status tontonan video.
   - Fitur **Cek Cepat Pemahaman** di samping video dengan umpan balik langsung.

6. **Layar 6 s.d. 10 — Kuis Interaktif (1 Soal per Layar):**
   - Soal 1: Jalur penyaring pertama (Rongga Hidung).
   - Soal 2: Fungsi epitel bersilia pada Trakea.
   - Soal 3: Kondisi rongga dada saat Inspirasi.
   - Soal 4: Kondisi otot diafragma saat Ekspirasi.
   - Soal 5: Organ tempat pertukaran gas secara difusi (Alveolus).
   - **Umpan Balik Instan:** Kotak hijau jika benar, atau kotak kuning berpetunjuk edukatif (*guided hint*) jika salah.
   - Tombol navigasi soal terkunci hingga siswa memilih jawaban.

7. **Layar 11 — Hasil Evaluasi & Rekomendasi Siswa:**
   - Skor akhir kuis (0–100) dengan indikator lingkaran animasi.
   - Status pemahaman: **Mahir (80–100)**, **Cakap (60–79)**, atau **Perlu Pendampingan (<60)**.
   - Rincian capaian penguasaan per topik (*Organ*, *Mekanisme Proses*, dan *Video*).
   - **Rekomendasi Personal Otomatis:** Menampilkan instruksi belajar mandiri yang disesuaikan secara dinamis dengan butir soal yang dijawab salah oleh siswa.
   - Tombol Ulangi Kuis (menaikkan *counter attempt*), Baca Ulang Materi, dan Selesai Belajar.

---

## 3. FITUR LEARNING ANALYTICS & DASHBOARD GURU

### A. Akses Dashboard Guru
- Klik tombol **"Dashboard Guru"** di pojok kanan atas topbar aplikasi.
- Masukkan **PIN Pengaman Guru:** `1234`
- Dashboard khusus guru akan terbuka secara penuh.

### B. 6 Jenis Learning Data yang Dicatat Otomatis
1. **Durasi Belajar:** Waktu aktif mulai, selesai, dan total durasi dalam detik dan menit.
2. **Materi yang Dibuka:** Riwayat langkah modul yang dikunjungi (Langkah 1–11).
3. **Aktivitas Video:** Status tuntas/tidaknya siswa menonton video pembelajaran.
4. **Nilai Kuis:** Skor 0–100 yang dihitung otomatis dari 5 soal.
5. **Jumlah Percobaan (Attempts):** Frekuensi siswa mengulang kuis evaluasi.
6. **Log Butir Jawaban:** Rekaman kebenaran jawaban siswa per butir soal (Soal 1 s.d. 5).

### C. Pemisahan Dataset (Asli vs Demo)
- Tersedia switcher filter di bagian atas dashboard:
  - **Semua Data:** Menggabungkan seluruh data riil dan data percontohan.
  - **Data Asli Siswa:** Hanya menampilkan sesi belajar yang dilakukan oleh pengguna saat ini di komputer.
  - **DATA DEMO:** Menampilkan 8 profil siswa SMP percontohan (*Aditya, Bella, Dimas, Fathia, Gilang, Hafizah, Iqbal, Jasmine*) untuk keperluan pengujian dan demonstrasi grafik oleh penguji/dosen.
- Terdapat tombol **"Hapus Data Asli"** untuk mereset riwayat pengujian lokal tanpa menghapus data demo.

### D. Descriptive Analytics
- 4 Kartu Metrik Utama: Total Peserta Didik, Rata-rata Nilai (disertai nilai tertinggi & terendah), Rata-rata Durasi, dan Persentase Penyelesaian Materi/Video.
- 3 Grafik Interaktif Chart.js:
  1. *Doughnut Chart:* Distribusi Capaian Pemahaman Siswa (Mahir, Cakap, Perlu Bimbingan).
  2. *Bar Chart:* Analisis Butir Soal (% Benar vs % Salah per Butir Soal).
  3. *Line Chart:* Tingkat Akses Siswa pada Setiap Layar Materi.

### E. Diagnostic Analytics (Deteksi Masalah Belajar)
Sistem secara otomatis mengevaluasi data dan memunculkan temuan:
- Mendeteksi apakah kelas mengalami kelemahan pada materi organ atau mekanisme pernapasan.
- Menemukan korelasi antara siswa yang tidak menuntaskan video dengan kesalahan pada soal alveolus.
- Menandai siswa spesifik yang telah mengakses seluruh materi namun memperoleh nilai < 60 sebagai siswa yang memerlukan pendampingan intensif.

### F. Pedagogical Recommendations (Rekomendasi Guru)
- Memberikan saran tindak lanjut instruksional: apakah perlu dilakukan remedial klasikal, fokus pembahasan soal tertentu di kelas, atau menyiapkan materi pengayaan (misal bahaya merokok bagi alveolus).

### G. Tabel Data & Ekspor CSV
- Tabel lengkap dengan kolom: No, ID Siswa, Nama, Tipe Data, Durasi Belajar, Materi Tuntas, Status Video, Nilai Kuis, Percobaan, Status Pemahaman, dan Tombol **"Detail"**.
- Tombol **"Detail"** membuka modal berisi riwayat jawaban butir per butir siswa beserta rekomendasi personalnya.
- Fitur pencarian nama siswa real-time dan filter dropdown status pemahaman.
- Tombol **"Ekspor CSV"** untuk mengunduh rekapitulasi data lengkap ke dalam format spreadsheet Excel/CSV.
