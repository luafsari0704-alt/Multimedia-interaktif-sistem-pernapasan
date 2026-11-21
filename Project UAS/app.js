/**
 * ===================================================================
 * APP.JS — MULTIMEDIA PEMBELAJARAN INTERAKTIF SISTEM PERNAPASAN
 * Terintegrasi dengan Learning Analytics Engine & Dashboard Guru
 * Berdasarkan Storyboard & Desain Asli Figma Kelompok 5 PTIK UNIMED
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // State Aplikasi
  let currentStep = 1;
  const TOTAL_STEPS = 11;
  let teacherDashboardActive = false;
  let activeDatasetFilter = 'all'; // 'all' | 'real' | 'demo'
  
  // Instance Chart.js untuk dashboard
  let chartScoreDist = null;
  let chartItemAnalysis = null;
  let chartModuleVisits = null;

  // Data Materi Organ (Layar 3)
  const ORGAN_DATA = {
    hidung: {
      order: 1,
      name: 'Rongga Hidung (Cavum Nasalis)',
      badge: 'Organ #1 • Pintu Masuk Udara',
      fungsi: 'Tempat masuknya udara pernapasan pertama kali dari lingkungan luar. Di dalam rongga hidung terdapat rambut-rambut hidung (silia) dan selaput lendir yang berfungsi menyaring debu/kotoran, mengatur suhu (menghangatkan) agar sesuai dengan suhu tubuh, serta melembapkan udara.',
      fakta: 'Rambut hidung bergerak secara teratur menyapu lendir yang telah mengikat kotoran agar tidak masuk lebih dalam ke paru-paru.'
    },
    faring: {
      order: 2,
      name: 'Faring (Tekak)',
      badge: 'Organ #2 • Percabangan Saluran',
      fungsi: 'Saluran persimpangan antara rongga mulut ke kerongkongan (saluran cerna) dan rongga hidung ke tenggorokan (saluran napas). Berfungsi sebagai jalur lewat udara sekaligus makanan.',
      fakta: 'Di faring terdapat epiglotis, katup fleksibel yang otomatis menutup tenggorokan saat menelan agar makanan tidak masuk ke saluran napas.'
    },
    laring: {
      order: 3,
      name: 'Laring (Pangkal Tenggorok)',
      badge: 'Organ #3 • Kotak Suara',
      fungsi: 'Organ berstruktur tulang rawan yang menghubungkan faring dengan trakea. Di dalam laring terdapat pita suara (vocal cord) yang bergetar saat dialiri udara untuk menghasilkan suara ketika kita berbicara.',
      fakta: 'Tonjolan tulang rawan tiroid di bagian depan laring membentuk jakun (Adam’s apple), yang umumnya lebih menonjol pada laki-laki.'
    },
    trakea: {
      order: 4,
      name: 'Trakea (Batang Tenggorokan)',
      badge: 'Organ #4 • Pipa Udara Utama',
      fungsi: 'Saluran pipa sepanjang sekitar 10–12 cm yang tersusun dari cincin tulang rawan berbentuk huruf C. Dinding dalamnya dilapisi selaput lendir bersilia yang berfungsi menyapu dan mengeluarkan debu atau kuman yang lolos dari hidung.',
      fakta: 'Cincin tulang rawan menjaga trakea tetap kokoh dan terbuka sehingga udara dapat selalu mengalir lancar meski leher bergerak.'
    },
    bronkus: {
      order: 5,
      name: 'Bronkus & Bronkiolus',
      badge: 'Organ #5 • Cabang Tenggorokan',
      fungsi: 'Percabangan trakea menjadi dua bagian, yaitu bronkus kanan (menuju paru-paru kanan) dan bronkus kiri (menuju paru-paru kiri). Di dalam paru-paru, bronkus bercabang-cabang lagi menjadi saluran yang lebih kecil dan halus yang disebut bronkiolus.',
      fakta: 'Bronkus kanan posisinya lebih tegak dan pendek dibandingkan bronkus kiri, sehingga benda asing lebih mudah tersangkut di bronkus kanan.'
    },
    alveolus: {
      order: 6,
      name: 'Alveolus pada Paru-paru',
      badge: 'Organ #6 • Pusat Pertukaran Gas',
      fungsi: 'Kantung-kantung udara mikroskopis yang berada di ujung bronkiolus. Dinding alveolus sangat tipis dan diselimuti jaring kapiler darah. Di sinilah terjadi pertukaran gas oksigen (O₂) dari udara ke darah dan karbon dioksida (CO₂) dari darah ke udara secara difusi.',
      fakta: 'Manusia memiliki sekitar 300 hingga 500 juta alveolus. Jika seluruh permukaannya dibentangkan, luasnya setara lapangan tenis (sekitar 70–80 m²).'
    }
  };

  // Kunci & Umpan Balik Kuis (Layar 6–10)
  const QUIZ_EXPLANATIONS = {
    1: {
      correct: 'A',
      topic: 'Organ Pernapasan',
      titleCorrect: 'Tepat Sekali! (Jawaban: A)',
      textCorrect: 'Rongga hidung adalah organ pertama tempat udara masuk. Rambut hidung dan selaput lendir bekerja menyaring kotoran serta menyesuaikan suhu udara.',
      titleWrong: 'Jawaban Belum Tepat',
      hintWrong: 'Ingat kembali organ terdepan di wajah yang memiliki rambut-rambut halus dan lendir penyaring debu saat pertama kali menghirup udara.'
    },
    2: {
      correct: 'C',
      topic: 'Organ Pernapasan',
      titleCorrect: 'Hebat, Jawabanmu Benar! (Jawaban: C)',
      textCorrect: 'Trakea memiliki epitel bersilia yang bergerak menyapu partikel debu dan mikroorganisme ke arah luar sehingga saluran pernapasan tetap bersih.',
      titleWrong: 'Jawaban Kurang Tepat',
      hintWrong: 'Silia pada trakea berfungsi mekanis seperti "sapu mikro" yang menolak dan mendorong kotoran keluar dari saluran paru-paru.'
    },
    3: {
      correct: 'A',
      topic: 'Mekanisme Inspirasi',
      titleCorrect: 'Luar Biasa, Tepat! (Jawaban: A)',
      textCorrect: 'Saat inspirasi (menarik napas), otot antartulang rusuk dan diafragma berkontraksi sehingga volume rongga dada membesar dan paru-paru mengembang.',
      titleWrong: 'Belum Tepat',
      hintWrong: 'Saat kamu menarik napas dalam-dalam, dadamu terasa membesar dan udara masuk karena paru-paru mengembang menurunkan tekanannya.'
    },
    4: {
      correct: 'D',
      topic: 'Mekanisme Ekspirasi',
      titleCorrect: 'Tepat Sekali! (Jawaban: D)',
      textCorrect: 'Saat ekspirasi (menghembuskan napas), otot diafragma berelaksasi dan bentuknya kembali melengkung ke atas, mendorong udara keluar dari paru-paru.',
      titleWrong: 'Jawaban Belum Tepat',
      hintWrong: 'Pada fase ekspirasi tubuh rileks (relaksasi) sehingga diafragma kembali melengkung ke posisi istirahatnya menekan rongga dada.'
    },
    5: {
      correct: 'B',
      topic: 'Alveolus & Pertukaran Gas',
      titleCorrect: 'Sempurna! (Jawaban: B)',
      textCorrect: 'Alveolus adalah kantung udara mikroskopis yang kaya kapiler darah tempat pertukaran O₂ dan CO₂ secara difusi membran sel.',
      titleWrong: 'Jawaban Belum Tepat',
      hintWrong: 'Perhatikan bagian mikroskopis di ujung bronkiolus yang menyerupai untaian buah anggur dalam video pembelajaran.'
    }
  };

  // ===================================================================
  // 1. NAVIGASI ANTAR LAYAR (1 s.d. 11)
  // ===================================================================
  function navigateToStep(targetStep) {
    const stepNum = parseInt(targetStep, 10);
    if (stepNum < 1 || stepNum > TOTAL_STEPS) return;

    // Sembunyikan semua layar
    document.querySelectorAll('.screen-view').forEach(view => {
      view.classList.remove('active');
    });

    // Tampilkan layar yang dituju
    const targetEl = document.getElementById('screen-' + stepNum);
    if (targetEl) {
      targetEl.classList.add('active');
    }

    currentStep = stepNum;

    // Perbarui Progress Bar & Menu Sidebar
    updateSidebarProgress(currentStep);

    // Scroll ke atas
    const viewport = document.getElementById('studentViewport');
    if (viewport) viewport.scrollTop = 0;

    // Catat ke Learning Analytics
    LearningAnalytics.recordStepVisit(currentStep);

    // Perbarui Badge Topbar
    const stepBadge = document.getElementById('trackerStepBadge');
    if (stepBadge) {
      stepBadge.textContent = `Langkah ${currentStep}/${TOTAL_STEPS}`;
    }

    // Jika masuk ke Layar 11 (Hasil), jalankan evaluasi akhir
    if (currentStep === 11) {
      renderStudentResultsView();
    }
  }

  function updateSidebarProgress(step) {
    // Tombol aktif di sidebar
    document.querySelectorAll('.step-btn').forEach(btn => {
      const btnStep = parseInt(btn.dataset.step, 10);
      btn.classList.remove('active');
      if (btnStep === step) {
        btn.classList.add('active');
      }
      if (btnStep < step) {
        btn.classList.add('completed');
      }
    });

    // Hitung persentase progress
    const pct = Math.round((step / TOTAL_STEPS) * 100);
    const fillEl = document.getElementById('sidebarProgressBar');
    const textEl = document.getElementById('progressPercentageText');
    const countEl = document.getElementById('sidebarStepCountText');

    if (fillEl) fillEl.style.width = `${pct}%`;
    if (textEl) textEl.textContent = `${pct}%`;
    if (countEl) countEl.textContent = `Langkah ${step} dari ${TOTAL_STEPS}`;
  }

  // ===================================================================
  // 2. INISIALISASI EVENT LISTENERS KONTEN SISWA
  // ===================================================================
  function initStudentInteractions() {
    // Tombol Navigasi Umum (Kembali / Lanjut)
    document.querySelectorAll('.btn-prev, .btn-next').forEach(btn => {
      btn.addEventListener('click', function() {
        const target = this.dataset.target;
        if (target) navigateToStep(target);
      });
    });

    // Tombol Menu Sidebar
    document.querySelectorAll('.step-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const target = this.dataset.step;
        if (target) navigateToStep(target);
      });
    });

    // Layar 1: Tombol "MULAI BELAJAR" & Form Nama Siswa
    const btnStart = document.getElementById('btnStartLearning');
    const nameInput = document.getElementById('studentNameInput');

    function handleStart() {
      const studentName = (nameInput.value || '').trim() || 'Siswa Kelas VIII';
      // Mulai sesi baru di Learning Analytics Engine
      LearningAnalytics.startSession(studentName);

      // Tampilkan Session Tracker di Topbar
      const trackerBox = document.getElementById('sessionTracker');
      const trackerName = document.getElementById('trackerStudentName');
      if (trackerBox) trackerBox.style.display = 'flex';
      if (trackerName) trackerName.textContent = studentName;

      // Pindah ke Layar 2 (Tujuan Belajar)
      navigateToStep(2);
    }

    if (btnStart) btnStart.addEventListener('click', handleStart);
    if (nameInput) {
      nameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') handleStart();
      });
    }

    // Layar 3: Interaktivitas Organ (Pill Buttons & Hotspots Diagram)
    initOrganExploration();

    // Layar 5: Video Pembelajaran & Quick Check
    initVideoActivities();

    // Layar 6–10: Kuis 5 Soal
    initQuizEvents();

    // Layar 11: Aksi Hasil Belajar
    initResultsActions();
  }

  // Interaktivitas Layar 3: Organ Pernapasan
  function initOrganExploration() {
    const organButtons = document.querySelectorAll('.organ-pill-btn');
    const hotspots = document.querySelectorAll('.hotspot');

    function selectOrgan(organKey) {
      const data = ORGAN_DATA[organKey];
      if (!data) return;

      // Update state tombol kartu organ
      organButtons.forEach(b => {
        b.classList.remove('active');
        if (b.dataset.organ === organKey) {
          b.classList.add('active');
          b.classList.add('read');
        }
      });

      // Update state titik hotspot diagram
      hotspots.forEach(h => {
        h.classList.remove('active');
        if (h.dataset.organ === organKey) {
          h.classList.add('active');
        }
      });

      // Update panel penjelasan di sisi kanan
      const badgeEl = document.getElementById('expBadge');
      const titleEl = document.getElementById('expTitle');
      const fungsiEl = document.getElementById('expFungsi');
      const faktaEl = document.getElementById('expFakta');

      if (badgeEl) badgeEl.textContent = data.badge;
      if (titleEl) titleEl.textContent = data.name;
      if (fungsiEl) fungsiEl.textContent = data.fungsi;
      if (faktaEl) faktaEl.textContent = data.fakta;

      // Catat ke Learning Analytics
      LearningAnalytics.recordOrganExploration(organKey);
    }

    organButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        selectOrgan(this.dataset.organ);
      });
    });

    hotspots.forEach(hs => {
      hs.addEventListener('click', function() {
        selectOrgan(this.dataset.organ);
      });
    });

    // Buka hidung secara default saat pertama kali
    selectOrgan('hidung');
  }

  // Interaktivitas Layar 5: Video & Quick Check
  function initVideoActivities() {
    const btnMarkVideo = document.getElementById('btnMarkVideoDone');
    const statusText = document.getElementById('videoStatusBtnText');

    if (btnMarkVideo) {
      btnMarkVideo.addEventListener('click', function() {
        this.classList.toggle('completed');
        const isDone = this.classList.contains('completed');
        if (isDone) {
          statusText.textContent = 'Sudah Ditonton ✓';
          this.style.background = '#D1FAE5';
          this.style.color = '#065F46';
          LearningAnalytics.recordVideoActivity(true, 180);
        } else {
          statusText.textContent = 'Tandai Sudah Selesai Menonton';
          this.style.background = '#EFF6FF';
          this.style.color = '#1D4ED8';
        }
      });
    }

    // Quick Check di samping video
    const qqOptions = document.querySelectorAll('.qq-opt');
    const qqFeedback = document.getElementById('qqFeedback');

    qqOptions.forEach(opt => {
      opt.addEventListener('click', function() {
        qqOptions.forEach(o => o.classList.remove('correct', 'wrong'));
        const isCorrect = this.dataset.correct === 'true';

        if (isCorrect) {
          this.classList.add('correct');
          qqFeedback.style.display = 'block';
          qqFeedback.style.background = '#D1FAE5';
          qqFeedback.style.color = '#065F46';
          qqFeedback.innerHTML = '<strong><i class="fa-solid fa-circle-check"></i> Jawaban Tepat!</strong> Kantung alveolus adalah pusat terjadinya pertukaran gas O₂ dan CO₂ pada paru-paru.';
        } else {
          this.classList.add('wrong');
          qqFeedback.style.display = 'block';
          qqFeedback.style.background = '#FCE7F3';
          qqFeedback.style.color = '#9D174D';
          qqFeedback.innerHTML = '<strong><i class="fa-solid fa-circle-xmark"></i> Kurang Tepat.</strong> Bagian tersebut adalah saluran pernapasan. Pertukaran gas berlangsung di kantung alveolus.';
        }
      });
    });
  }

  // Interaktivitas Layar 6–10: Kuis 5 Soal
  function initQuizEvents() {
    for (let qid = 1; qid <= 5; qid++) {
      const container = document.querySelector(`.quiz-options-grid[data-qid="${qid}"]`);
      if (!container) continue;

      const options = container.querySelectorAll('.quiz-option-btn');
      const feedbackBox = document.getElementById(`feedback-q${qid}`);
      const btnNext = document.getElementById(qid === 5 ? 'btnFinishQuiz' : `btnNextQ${qid}`);
      const exp = QUIZ_EXPLANATIONS[qid];

      options.forEach(opt => {
        opt.addEventListener('click', function() {
          // Disable semua opsi agar siswa fokus melihat feedback
          options.forEach(o => {
            o.disabled = true;
            o.classList.remove('selected-correct', 'selected-wrong');
          });

          const selectedKey = this.dataset.key;
          const isCorrect = (selectedKey === exp.correct);

          if (isCorrect) {
            this.classList.add('selected-correct');
            feedbackBox.className = 'quiz-feedback-box feedback-correct';
            feedbackBox.innerHTML = `
              <div class="feedback-header"><i class="fa-solid fa-circle-check"></i> ${exp.titleCorrect}</div>
              <p>${exp.textCorrect}</p>
            `;
          } else {
            this.classList.add('selected-wrong');
            // Tandai juga opsi yang benar dengan border hijau lembut
            options.forEach(o => {
              if (o.dataset.key === exp.correct) o.classList.add('selected-correct');
            });
            feedbackBox.className = 'quiz-feedback-box feedback-wrong';
            feedbackBox.innerHTML = `
              <div class="feedback-header"><i class="fa-solid fa-triangle-exclamation"></i> ${exp.titleWrong}</div>
              <p>${exp.hintWrong}</p>
            `;
          }

          feedbackBox.style.display = 'block';

          // Aktifkan tombol selanjutnya / lihat hasil
          if (btnNext) {
            btnNext.disabled = false;
          }

          // Catat ke Learning Analytics
          LearningAnalytics.recordQuizAnswer(qid, selectedKey, isCorrect, exp.topic);
        });
      });
    }

    // Tombol Selesaikan Kuis pada Soal 5
    const btnFinishQuiz = document.getElementById('btnFinishQuiz');
    if (btnFinishQuiz) {
      btnFinishQuiz.addEventListener('click', function() {
        navigateToStep(11);
      });
    }
  }

  // ===================================================================
  // 3. MERENDER HALAMAN HASIL SISWA (LAYAR 11)
  // ===================================================================
  function renderStudentResultsView() {
    const session = LearningAnalytics.finalizeQuizResults();
    if (!session) return;

    const score = session.quizScore || 0;
    const scoreText = document.getElementById('finalScoreText');
    const badgeText = document.getElementById('scoreBadgeText');
    const greeting = document.getElementById('resultsGreeting');
    const summary = document.getElementById('resultsSummaryText');

    if (scoreText) scoreText.textContent = score;

    if (score >= 80) {
      badgeText.textContent = 'Mahir (Sangat Baik)';
      badgeText.style.background = '#D1FAE5';
      badgeText.style.color = '#065F46';
      greeting.textContent = `Luar Biasa, ${session.name}! 🎉`;
      summary.textContent = 'Kamu telah menguasai konsep sistem pernapasan manusia dengan nilai yang sangat membanggakan.';
    } else if (score >= 60) {
      badgeText.textContent = 'Cakap (Cukup Baik)';
      badgeText.style.background = '#E0F2FE';
      badgeText.style.color = '#0369A1';
      greeting.textContent = `Bagus Sekali, ${session.name}! 👍`;
      summary.textContent = 'Kamu sudah memahami sebagian besar materi, namun perlu mengulang beberapa konsep agar lebih mantap.';
    } else {
      badgeText.textContent = 'Perlu Pendampingan';
      badgeText.style.background = '#FCE7F3';
      badgeText.style.color = '#9D174D';
      greeting.textContent = `Tetap Semangat, ${session.name}! 💪`;
      summary.textContent = 'Jangan berkecil hati. Pelajari kembali materi organ dan mekanisme pernapasan sebelum mengulang kuis.';
    }

    // Quick Stats
    document.getElementById('resCorrectCount').textContent = session.correctCount;
    document.getElementById('resWrongCount').textContent = session.wrongCount;
    document.getElementById('resDuration').textContent = LearningAnalytics.formatDuration(session.durationSeconds);
    document.getElementById('resAttempt').textContent = session.attempts || 1;

    // Capaian per Topik
    // Topik 1: Organ (Soal 1, 2, 5)
    let organCorrect = 0;
    if (session.answers.q1 && session.answers.q1.correct) organCorrect++;
    if (session.answers.q2 && session.answers.q2.correct) organCorrect++;
    if (session.answers.q5 && session.answers.q5.correct) organCorrect++;
    const organPct = Math.round((organCorrect / 3) * 100);

    // Topik 2: Proses (Soal 3, 4)
    let prosesCorrect = 0;
    if (session.answers.q3 && session.answers.q3.correct) prosesCorrect++;
    if (session.answers.q4 && session.answers.q4.correct) prosesCorrect++;
    const prosesPct = Math.round((prosesCorrect / 2) * 100);

    // Topik 3: Video
    const videoPct = session.videoWatched ? 100 : (session.videoWatchDuration > 60 ? 50 : 20);

    document.getElementById('topicOrganPct').textContent = `${organPct}%`;
    document.getElementById('topicOrganFill').style.width = `${organPct}%`;

    document.getElementById('topicProsesPct').textContent = `${prosesPct}%`;
    document.getElementById('topicProsesFill').style.width = `${prosesPct}%`;

    document.getElementById('topicVideoPct').textContent = `${videoPct}%`;
    document.getElementById('topicVideoFill').style.width = `${videoPct}%`;

    // Render Kotak Rekomendasi Siswa
    const recContainer = document.getElementById('studentRecText');
    if (recContainer) {
      const recs = LearningAnalytics.generateStudentRecommendation(session);
      recContainer.innerHTML = recs.map(r => `
        <div class="rec-alert-item rec-alert-${r.theme}">
          <i class="fa-solid ${r.icon}" style="font-size: 1.2rem; margin-top: 2px;"></i>
          <div>${r.text}</div>
        </div>
      `).join('');
    }
  }

  // Aksi Tombol Layar 11
  function initResultsActions() {
    // Tombol Ulangi Kuis
    const btnRetake = document.getElementById('btnRetakeQuiz');
    if (btnRetake) {
      btnRetake.addEventListener('click', function() {
        LearningAnalytics.incrementAttempt();
        // Reset tampilan opsi kuis
        for (let qid = 1; qid <= 5; qid++) {
          const grid = document.querySelector(`.quiz-options-grid[data-qid="${qid}"]`);
          if (grid) {
            grid.querySelectorAll('.quiz-option-btn').forEach(btn => {
              btn.disabled = false;
              btn.classList.remove('selected-correct', 'selected-wrong');
            });
          }
          const fb = document.getElementById(`feedback-q${qid}`);
          if (fb) fb.style.display = 'none';
          const btnN = document.getElementById(qid === 5 ? 'btnFinishQuiz' : `btnNextQ${qid}`);
          if (btnN) btnN.disabled = true;
        }
        navigateToStep(6); // Kembali ke Soal 1
      });
    }

    // Tombol Baca Ulang Materi
    const btnReview = document.getElementById('btnReviewMaterial');
    if (btnReview) {
      btnReview.addEventListener('click', function() {
        navigateToStep(3); // Kembali ke Organ
      });
    }

    // Tombol Selesai Belajar
    const btnFinishAll = document.getElementById('btnFinishAll');
    if (btnFinishAll) {
      btnFinishAll.addEventListener('click', function() {
        alert('Selamat! Sesi pembelajaranmu telah berhasil disimpan. Terima kasih telah belajar Sistem Pernapasan Manusia.');
        navigateToStep(1); // Kembali ke Beranda
      });
    }
  }

  // ===================================================================
  // 4. VERIFIKASI AKSES GURU & MODAL PIN (PIN: 1234)
  // ===================================================================
  function initTeacherAccess() {
    const btnToggle = document.getElementById('btnToggleTeacherMode');
    const modalPin = document.getElementById('modalPinGuru');
    const pinInput = document.getElementById('teacherPinInput');
    const pinError = document.getElementById('pinErrorMsg');
    const btnSubmit = document.getElementById('btnSubmitPin');
    const btnCancel = document.getElementById('btnCancelPin');
    const btnCloseModal = document.getElementById('btnClosePinModal');
    const btnCloseDb = document.getElementById('btnCloseDashboard');

    // Buka Modal PIN saat tombol Guru diklik
    if (btnToggle) {
      btnToggle.addEventListener('click', function() {
        if (modalPin) {
          modalPin.style.display = 'flex';
          pinInput.value = '';
          pinError.style.display = 'none';
          setTimeout(() => pinInput.focus(), 100);
        }
      });
    }

    function verifyPin() {
      const pin = (pinInput.value || '').trim();
      if (pin === '1234') {
        modalPin.style.display = 'none';
        openTeacherDashboard();
      } else {
        pinError.style.display = 'block';
        pinInput.select();
      }
    }

    if (btnSubmit) btnSubmit.addEventListener('click', verifyPin);
    if (pinInput) {
      pinInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') verifyPin();
      });
    }

    function closePin() {
      if (modalPin) modalPin.style.display = 'none';
    }

    if (btnCancel) btnCancel.addEventListener('click', closePin);
    if (btnCloseModal) btnCloseModal.addEventListener('click', closePin);

    // Tutup Dashboard Guru
    if (btnCloseDb) {
      btnCloseDb.addEventListener('click', function() {
        closeTeacherDashboard();
      });
    }
  }

  function openTeacherDashboard() {
    const dbView = document.getElementById('teacherDashboard');
    if (dbView) {
      dbView.style.display = 'flex';
      teacherDashboardActive = true;
      renderTeacherDashboard();
    }
  }

  function closeTeacherDashboard() {
    const dbView = document.getElementById('teacherDashboard');
    if (dbView) {
      dbView.style.display = 'none';
      teacherDashboardActive = false;
    }
  }

  // ===================================================================
  // 5. RENDERING DASHBOARD LEARNING ANALYTICS
  // ===================================================================
  function renderTeacherDashboard() {
    const analytics = LearningAnalytics.computeDescriptiveAnalytics(activeDatasetFilter);

    // 1. Update Kartu Metrik Deskriptif
    document.getElementById('metricTotalStudents').textContent = analytics.totalStudents;
    document.getElementById('metricAvgScore').textContent = analytics.avgScore;
    document.getElementById('metricMaxScore').textContent = analytics.maxScore;
    document.getElementById('metricMinScore').textContent = analytics.minScore;
    document.getElementById('metricAvgDuration').textContent = analytics.avgDuration;
    document.getElementById('metricCompletionRate').textContent = `${analytics.completionRate}%`;
    document.getElementById('metricVideoDoneRate').textContent = `${analytics.videoDoneRate}%`;

    const noteEl = document.getElementById('metricActiveDatasetNote');
    if (noteEl) {
      noteEl.textContent = activeDatasetFilter === 'real' ? 'Data Asli Siswa' :
                           activeDatasetFilter === 'demo' ? 'DATA DEMO' : 'Semua Data Tergabung';
    }

    // 2. Render Visualisasi Grafik Chart.js
    renderCharts(analytics);

    // 3. Render Diagnostic Analytics
    renderDiagnosticSummary(analytics);

    // 4. Render Rekomendasi Guru
    renderTeacherRecommendations(analytics);

    // 5. Render Tabel Peserta Didik
    renderStudentsTable(analytics.dataset);
  }

  // Inisialisasi Grafik Chart.js
  function renderCharts(analytics) {
    // 1. Chart Distribusi Nilai
    const ctxScore = document.getElementById('scoreDistributionChart');
    if (ctxScore) {
      if (chartScoreDist) chartScoreDist.destroy();
      chartScoreDist = new Chart(ctxScore, {
        type: 'doughnut',
        data: {
          labels: ['Mahir (80–100)', 'Cakap (60–79)', 'Perlu Bimbingan (<60)'],
          datasets: [{
            data: [
              analytics.scoreDistribution.mahir,
              analytics.scoreDistribution.cakap,
              analytics.scoreDistribution.perlu_bimbingan
            ],
            backgroundColor: ['#10B981', '#38BDF8', '#F43F5E'],
            borderWidth: 2,
            borderColor: '#FFFFFF'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } }
          }
        }
      });
    }

    // 2. Chart Analisis Butir Soal (% Benar vs % Salah)
    const ctxItems = document.getElementById('itemAnalysisChart');
    if (ctxItems) {
      if (chartItemAnalysis) chartItemAnalysis.destroy();
      chartItemAnalysis = new Chart(ctxItems, {
        type: 'bar',
        data: {
          labels: ['Soal 1 (Hidung)', 'Soal 2 (Trakea)', 'Soal 3 (Inspirasi)', 'Soal 4 (Ekspirasi)', 'Soal 5 (Alveolus)'],
          datasets: [
            {
              label: '% Jawaban Benar',
              data: analytics.itemAnalysis.map(i => i.correctPct),
              backgroundColor: '#10B981',
              borderRadius: 6
            },
            {
              label: '% Jawaban Salah',
              data: analytics.itemAnalysis.map(i => i.wrongPct),
              backgroundColor: '#FDA4AF',
              borderRadius: 6
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { beginAtZero: true, max: 100, ticks: { callback: v => v + '%' } },
            x: { grid: { display: false } }
          },
          plugins: {
            legend: { position: 'bottom', labels: { boxWidth: 12 } }
          }
        }
      });
    }

    // 3. Chart Aktivitas Akses Modul
    const ctxModules = document.getElementById('moduleAccessChart');
    if (ctxModules) {
      if (chartModuleVisits) chartModuleVisits.destroy();
      chartModuleVisits = new Chart(ctxModules, {
        type: 'line',
        data: {
          labels: ['01 Beranda', '02 Tujuan', '03 Organ', '04 Proses', '05 Video', '06 Soal 1', '07 Soal 2', '08 Soal 3', '09 Soal 4', '10 Soal 5', '11 Hasil'],
          datasets: [{
            label: 'Jumlah Kunjungan Siswa',
            data: analytics.moduleVisits,
            borderColor: '#2A92A4',
            backgroundColor: 'rgba(42, 146, 164, 0.12)',
            fill: true,
            tension: 0.35,
            pointBackgroundColor: '#2A92A4',
            pointRadius: 5
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { beginAtZero: true, ticks: { stepSize: 1 } },
            x: { grid: { display: false } }
          },
          plugins: {
            legend: { display: false }
          }
        }
      });
    }
  }

  // Diagnostic Findings
  function renderDiagnosticSummary(analytics) {
    const box = document.getElementById('diagnosticSummaryBox');
    if (!box) return;

    const findings = LearningAnalytics.generateDiagnosticReport(analytics);
    box.innerHTML = findings.map(f => `
      <div class="diag-item ${f.type}">
        <i class="fa-solid ${f.type === 'warning' ? 'fa-triangle-exclamation' : f.type === 'success' ? 'fa-circle-check' : 'fa-circle-info'}"></i>
        <div>${f.text}</div>
      </div>
    `).join('');
  }

  // Teacher Pedagogical Recommendations
  function renderTeacherRecommendations(analytics) {
    const box = document.getElementById('teacherRecommendationsBox');
    if (!box) return;

    const recs = LearningAnalytics.generateTeacherRecommendations(analytics);
    box.innerHTML = recs.map(r => `
      <div class="diag-item ${r.type}">
        <i class="fa-solid fa-lightbulb"></i>
        <div>${r.text}</div>
      </div>
    `).join('');
  }

  // Render Tabel Peserta Didik
  function renderStudentsTable(students) {
    const tbody = document.getElementById('studentsTableBody');
    if (!tbody) return;

    if (!students || students.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="11" style="text-align: center; padding: 24px; color: #94A3B8;">
            Tidak ada data peserta didik yang cocok dengan filter.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = students.map((s, idx) => {
      const statusClass = (s.quizScore >= 80) ? 'st-mahir' : (s.quizScore >= 60) ? 'st-cakap' : 'st-bimbingan';
      const typeBadge = s.isDemo ? '<span class="tag-dataset tag-demo">DATA DEMO</span>' : '<span class="tag-dataset tag-real">DATA ASLI</span>';
      const durationFmt = LearningAnalytics.formatDuration(s.durationSeconds || 0);

      return `
        <tr>
          <td><strong>${idx + 1}</strong></td>
          <td><code>${s.id}</code></td>
          <td><strong>${s.name}</strong></td>
          <td>${typeBadge}</td>
          <td>${durationFmt}</td>
          <td>${s.materialCompleted ? '<i class="fa-solid fa-circle-check" style="color: #10B981;"></i> Ya' : '<i class="fa-solid fa-circle-xmark" style="color: #F43F5E;"></i> Belum'}</td>
          <td>${s.videoWatched ? '<span style="color: #10B981; font-weight:700;">Tuntas</span>' : '<span style="color: #94A3B8;">Belum</span>'}</td>
          <td><strong style="font-size: 1.05rem; color: #173550;">${s.quizScore}</strong></td>
          <td>Ke-${s.attempts || 1}</td>
          <td><span class="status-badge-table ${statusClass}">${s.statusPemahaman || '-'}</span></td>
          <td>
            <button class="btn-action-table btn-view-detail" data-id="${s.id}">
              <i class="fa-solid fa-eye"></i> Detail
            </button>
          </td>
        </tr>
      `;
    }).join('');

    // Event listener untuk tombol Detail
    tbody.querySelectorAll('.btn-view-detail').forEach(btn => {
      btn.addEventListener('click', function() {
        const studentId = this.dataset.id;
        openStudentDetailModal(studentId);
      });
    });
  }

  // Modal Detail Siswa Individual
  function openStudentDetailModal(studentId) {
    const all = LearningAnalytics.getAllSessions();
    const student = all.find(s => s.id === studentId);
    if (!student) return;

    const modal = document.getElementById('modalStudentDetail');
    const nameEl = document.getElementById('modalStudentName');
    const idEl = document.getElementById('modalStudentID');
    const bodyEl = document.getElementById('modalStudentDetailBody');

    nameEl.textContent = `Aktivitas Belajar: ${student.name}`;
    idEl.textContent = `ID: ${student.id} • ${student.isDemo ? 'DATA DEMO UAS' : 'DATA ASLI SISWA'}`;

    const recs = LearningAnalytics.generateStudentRecommendation(student);

    bodyEl.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 20px;">
        <div style="background: #F8FAFC; padding: 12px; border-radius: 8px;">
          <small style="color: #64748B;">Nilai Akhir Kuis</small>
          <div style="font-size: 1.6rem; font-weight: 800; color: #173550;">${student.quizScore}/100</div>
        </div>
        <div style="background: #F8FAFC; padding: 12px; border-radius: 8px;">
          <small style="color: #64748B;">Durasi Belajar</small>
          <div style="font-size: 1.2rem; font-weight: 700; color: #173550;">${LearningAnalytics.formatDuration(student.durationSeconds)}</div>
        </div>
        <div style="background: #F8FAFC; padding: 12px; border-radius: 8px;">
          <small style="color: #64748B;">Status Materi</small>
          <div style="font-size: 1.1rem; font-weight: 700; color: #10B981;">${student.materialCompleted ? 'Lengkap (11/11)' : 'Belum Selesai'}</div>
        </div>
      </div>

      <h4 style="margin-bottom: 10px; font-weight: 700; color: #173550;"><i class="fa-solid fa-list-check"></i> Rincian Jawaban Soal:</h4>
      <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px;">
        ${[1, 2, 3, 4, 5].map(q => {
          const ans = student.answers ? student.answers['q' + q] : null;
          const isCorrect = ans ? ans.correct : false;
          const userChoice = ans ? ans.answer : '-';
          return `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; background: ${isCorrect ? '#ECFDF5' : '#FFF1F2'}; border-radius: 6px; font-size: 0.88rem;">
              <span><strong>Soal #${q}:</strong> Jawaban Dipilih: <strong>${userChoice}</strong></span>
              <span style="font-weight: 700; color: ${isCorrect ? '#065F46' : '#9F1239'};">
                <i class="fa-solid ${isCorrect ? 'fa-check' : 'fa-xmark'}"></i> ${isCorrect ? 'BENAR' : 'SALAH'}
              </span>
            </div>
          `;
        }).join('')}
      </div>

      <h4 style="margin-bottom: 10px; font-weight: 700; color: #173550;"><i class="fa-solid fa-compass"></i> Rekomendasi Terprogram:</h4>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        ${recs.map(r => `
          <div style="padding: 10px 14px; background: #F8FAFC; border-left: 4px solid #3B82F6; font-size: 0.85rem; border-radius: 4px;">
            ${r.text}
          </div>
        `).join('')}
      </div>
    `;

    modal.style.display = 'flex';
  }

  // Inisialisasi Filter & Toolbar Dashboard
  function initDashboardToolbar() {
    // Switcher Dataset (Semua / Asli / Demo)
    const btnAll = document.getElementById('btnFilterAllData');
    const btnReal = document.getElementById('btnFilterRealData');
    const btnDemo = document.getElementById('btnFilterDemoData');

    function setDatasetFilter(type, activeBtn) {
      activeDatasetFilter = type;
      [btnAll, btnReal, btnDemo].forEach(b => b.classList.remove('active'));
      activeBtn.classList.add('active');
      renderTeacherDashboard();
    }

    if (btnAll) btnAll.addEventListener('click', function() { setDatasetFilter('all', this); });
    if (btnReal) btnReal.addEventListener('click', function() { setDatasetFilter('real', this); });
    if (btnDemo) btnDemo.addEventListener('click', function() { setDatasetFilter('demo', this); });

    // Filter Pencarian & Status Pemahaman
    const searchInput = document.getElementById('dbSearchInput');
    const statusSelect = document.getElementById('dbFilterStatus');

    function applyTableFilter() {
      const query = (searchInput.value || '').toLowerCase();
      const status = statusSelect.value;
      const analytics = LearningAnalytics.computeDescriptiveAnalytics(activeDatasetFilter);

      let filtered = analytics.dataset.filter(s => {
        const matchName = s.name.toLowerCase().includes(query) || s.id.toLowerCase().includes(query);
        let matchStatus = true;
        if (status === 'mahir') matchStatus = (s.quizScore >= 80);
        else if (status === 'cakap') matchStatus = (s.quizScore >= 60 && s.quizScore < 80);
        else if (status === 'perlu_bimbingan') matchStatus = (s.quizScore < 60);

        return matchName && matchStatus;
      });

      renderStudentsTable(filtered);
    }

    if (searchInput) searchInput.addEventListener('input', applyTableFilter);
    if (statusSelect) statusSelect.addEventListener('change', applyTableFilter);

    // Tombol Ekspor CSV
    const btnExport = document.getElementById('btnExportCSV');
    if (btnExport) {
      btnExport.addEventListener('click', function() {
        LearningAnalytics.exportToCSV(activeDatasetFilter);
      });
    }

    // Tombol Hapus Data Asli
    const btnClearReal = document.getElementById('btnClearRealData');
    if (btnClearReal) {
      btnClearReal.addEventListener('click', function() {
        if (confirm('Apakah Anda yakin ingin menghapus seluruh data siswa uji coba lokal (DATA ASLI)? Data demo akan tetap dipertahankan.')) {
          LearningAnalytics.clearRealData();
          renderTeacherDashboard();
          alert('Data asli telah berhasil dibersihkan.');
        }
      });
    }

    // Tutup Modal Detail Siswa
    const modalDetail = document.getElementById('modalStudentDetail');
    const btnCloseDetail = document.getElementById('btnCloseDetailModal');
    const btnCloseDetailBottom = document.getElementById('btnCloseDetailModalBottom');

    function closeDetailModal() {
      if (modalDetail) modalDetail.style.display = 'none';
    }

    if (btnCloseDetail) btnCloseDetail.addEventListener('click', closeDetailModal);
    if (btnCloseDetailBottom) btnCloseDetailBottom.addEventListener('click', closeDetailModal);
  }

  // ===================================================================
  // INITIALIZATION RUNNER
  // ===================================================================
  initStudentInteractions();
  initTeacherAccess();
  initDashboardToolbar();

  // Buka langkah 1 secara default
  navigateToStep(1);

});
