/**
 * ===================================================================
 * LEARNING ANALYTICS ENGINE — SISTEM PERNAPASAN MANUSIA (SMP KELAS VIII)
 * Dikembangkan untuk Proyek UAS Multimedia Interaktif
 * Fitur:
 * - Persistent Data Tracking (localStorage)
 * - Pemisahan DATA ASLI dan DATA DEMO
 * - Descriptive Analytics (Kalkulasi metrik, distribusi, visualisasi)
 * - Diagnostic Analytics (Deteksi kelemahan topik & siswa berisiko)
 * - Personalized & Pedagogical Recommendations
 * - Export Rekap ke CSV
 * ===================================================================
 */

const LearningAnalytics = (function() {
  'use strict';

  const STORAGE_KEY_SESSIONS = 'resp_learning_analytics_sessions_v1';
  const STORAGE_KEY_CURRENT = 'resp_current_active_session_v1';

  // Demo Dataset yang realistis untuk siswa SMP Kelas VIII
  const DEMO_SAMPLES = [
    {
      id: 'SIS-2026-001',
      name: 'Aditya Pratama',
      isDemo: true,
      startTime: '2026-11-15T08:10:00Z',
      endTime: '2026-11-15T08:32:00Z',
      durationSeconds: 1320, // 22 menit
      visitedSteps: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      materialCompleted: true,
      videoWatched: true,
      videoWatchDuration: 210,
      organsExplored: ['hidung', 'faring', 'laring', 'trakea', 'bronkus', 'alveolus'],
      quizScore: 100,
      attempts: 1,
      correctCount: 5,
      wrongCount: 0,
      answers: {
        q1: { answer: 'A', correct: true, topic: 'Organ' },
        q2: { answer: 'C', correct: true, topic: 'Organ' },
        q3: { answer: 'A', correct: true, topic: 'Inspirasi' },
        q4: { answer: 'D', correct: true, topic: 'Ekspirasi' },
        q5: { answer: 'B', correct: true, topic: 'Alveolus' }
      },
      statusPemahaman: 'Mahir'
    },
    {
      id: 'SIS-2026-002',
      name: 'Bella Anggraini',
      isDemo: true,
      startTime: '2026-11-15T09:00:00Z',
      endTime: '2026-11-15T09:18:00Z',
      durationSeconds: 1080, // 18 menit
      visitedSteps: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      materialCompleted: true,
      videoWatched: true,
      videoWatchDuration: 180,
      organsExplored: ['hidung', 'trakea', 'alveolus'],
      quizScore: 80,
      attempts: 1,
      correctCount: 4,
      wrongCount: 1,
      answers: {
        q1: { answer: 'A', correct: true, topic: 'Organ' },
        q2: { answer: 'B', correct: false, topic: 'Organ' }, // salah di trakea
        q3: { answer: 'A', correct: true, topic: 'Inspirasi' },
        q4: { answer: 'D', correct: true, topic: 'Ekspirasi' },
        q5: { answer: 'B', correct: true, topic: 'Alveolus' }
      },
      statusPemahaman: 'Mahir'
    },
    {
      id: 'SIS-2026-003',
      name: 'Dimas Kurniawan',
      isDemo: true,
      startTime: '2026-11-15T10:15:00Z',
      endTime: '2026-11-15T10:27:00Z',
      durationSeconds: 720, // 12 menit
      visitedSteps: [1, 2, 3, 4, 6, 7, 8, 9, 10, 11], // skip video
      materialCompleted: false,
      videoWatched: false,
      videoWatchDuration: 25,
      organsExplored: ['hidung', 'faring'],
      quizScore: 40,
      attempts: 2,
      correctCount: 2,
      wrongCount: 3,
      answers: {
        q1: { answer: 'A', correct: true, topic: 'Organ' },
        q2: { answer: 'A', correct: false, topic: 'Organ' },
        q3: { answer: 'B', correct: false, topic: 'Inspirasi' },
        q4: { answer: 'A', correct: false, topic: 'Ekspirasi' },
        q5: { answer: 'B', correct: true, topic: 'Alveolus' }
      },
      statusPemahaman: 'Perlu Bimbingan'
    },
    {
      id: 'SIS-2026-004',
      name: 'Fathia Rahma',
      isDemo: true,
      startTime: '2026-11-16T08:30:00Z',
      endTime: '2026-11-16T08:50:00Z',
      durationSeconds: 1200,
      visitedSteps: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      materialCompleted: true,
      videoWatched: true,
      videoWatchDuration: 200,
      organsExplored: ['hidung', 'faring', 'laring', 'trakea', 'bronkus', 'alveolus'],
      quizScore: 80,
      attempts: 1,
      correctCount: 4,
      wrongCount: 1,
      answers: {
        q1: { answer: 'A', correct: true, topic: 'Organ' },
        q2: { answer: 'C', correct: true, topic: 'Organ' },
        q3: { answer: 'A', correct: true, topic: 'Inspirasi' },
        q4: { answer: 'A', correct: false, topic: 'Ekspirasi' }, // salah di ekspirasi
        q5: { answer: 'B', correct: true, topic: 'Alveolus' }
      },
      statusPemahaman: 'Mahir'
    },
    {
      id: 'SIS-2026-005',
      name: 'Gilang Ramadhan',
      isDemo: true,
      startTime: '2026-11-16T09:10:00Z',
      endTime: '2026-11-16T09:25:00Z',
      durationSeconds: 900,
      visitedSteps: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      materialCompleted: true,
      videoWatched: true,
      videoWatchDuration: 150,
      organsExplored: ['hidung', 'faring', 'trakea'],
      quizScore: 60,
      attempts: 1,
      correctCount: 3,
      wrongCount: 2,
      answers: {
        q1: { answer: 'A', correct: true, topic: 'Organ' },
        q2: { answer: 'B', correct: false, topic: 'Organ' },
        q3: { answer: 'A', correct: true, topic: 'Inspirasi' },
        q4: { answer: 'B', correct: false, topic: 'Ekspirasi' },
        q5: { answer: 'B', correct: true, topic: 'Alveolus' }
      },
      statusPemahaman: 'Cakap'
    },
    {
      id: 'SIS-2026-006',
      name: 'Hafizah Naila',
      isDemo: true,
      startTime: '2026-11-16T11:00:00Z',
      endTime: '2026-11-16T11:24:00Z',
      durationSeconds: 1440,
      visitedSteps: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      materialCompleted: true,
      videoWatched: true,
      videoWatchDuration: 220,
      organsExplored: ['hidung', 'faring', 'laring', 'trakea', 'bronkus', 'alveolus'],
      quizScore: 100,
      attempts: 1,
      correctCount: 5,
      wrongCount: 0,
      answers: {
        q1: { answer: 'A', correct: true, topic: 'Organ' },
        q2: { answer: 'C', correct: true, topic: 'Organ' },
        q3: { answer: 'A', correct: true, topic: 'Inspirasi' },
        q4: { answer: 'D', correct: true, topic: 'Ekspirasi' },
        q5: { answer: 'B', correct: true, topic: 'Alveolus' }
      },
      statusPemahaman: 'Mahir'
    },
    {
      id: 'SIS-2026-007',
      name: 'Iqbal Maulana',
      isDemo: true,
      startTime: '2026-11-16T13:10:00Z',
      endTime: '2026-11-16T13:22:00Z',
      durationSeconds: 720,
      visitedSteps: [1, 2, 3, 4, 6, 7, 8, 9, 10, 11],
      materialCompleted: false,
      videoWatched: false,
      videoWatchDuration: 0,
      organsExplored: ['hidung'],
      quizScore: 20,
      attempts: 2,
      correctCount: 1,
      wrongCount: 4,
      answers: {
        q1: { answer: 'A', correct: true, topic: 'Organ' },
        q2: { answer: 'A', correct: false, topic: 'Organ' },
        q3: { answer: 'B', correct: false, topic: 'Inspirasi' },
        q4: { answer: 'A', correct: false, topic: 'Ekspirasi' },
        q5: { answer: 'A', correct: false, topic: 'Alveolus' }
      },
      statusPemahaman: 'Perlu Bimbingan'
    },
    {
      id: 'SIS-2026-008',
      name: 'Jasmine Putri',
      isDemo: true,
      startTime: '2026-11-16T14:00:00Z',
      endTime: '2026-11-16T14:19:00Z',
      durationSeconds: 1140,
      visitedSteps: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      materialCompleted: true,
      videoWatched: true,
      videoWatchDuration: 190,
      organsExplored: ['hidung', 'faring', 'laring', 'trakea', 'alveolus'],
      quizScore: 80,
      attempts: 1,
      correctCount: 4,
      wrongCount: 1,
      answers: {
        q1: { answer: 'A', correct: true, topic: 'Organ' },
        q2: { answer: 'C', correct: true, topic: 'Organ' },
        q3: { answer: 'A', correct: true, topic: 'Inspirasi' },
        q4: { answer: 'D', correct: true, topic: 'Ekspirasi' },
        q5: { answer: 'C', correct: false, topic: 'Alveolus' }
      },
      statusPemahaman: 'Mahir'
    }
  ];

  // Objek Sesi Belajar Siswa Aktif Saat Ini
  let currentSession = null;
  let timerInterval = null;

  // Inisialisasi Database Lokal
  function initStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_SESSIONS);
      if (!stored) {
        // Simpan data demo ke localStorage jika belum ada
        localStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify(DEMO_SAMPLES));
      }
    } catch (e) {
      console.warn('Storage initialisation error:', e);
    }
  }

  // Mengambil Semua Data (Asli + Demo)
  function getAllSessions() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_SESSIONS);
      return stored ? JSON.parse(stored) : [...DEMO_SAMPLES];
    } catch (e) {
      return [...DEMO_SAMPLES];
    }
  }

  // Menyimpan Daftar Data Sesi
  function saveAllSessions(sessions) {
    try {
      localStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify(sessions));
    } catch (e) {
      console.error('Failed to save sessions:', e);
    }
  }

  // 1. Memulai Sesi Belajar Siswa Baru
  function startSession(studentName) {
    const trimmed = (studentName || '').trim() || 'Peserta Didik';
    const now = new Date();
    const id = 'SIS-' + now.getFullYear() + '-' + String(Math.floor(1000 + Math.random() * 9000));

    currentSession = {
      id: id,
      name: trimmed,
      isDemo: false, // Menandai ini adalah DATA ASLI SISWA
      startTime: now.toISOString(),
      endTime: null,
      durationSeconds: 0,
      visitedSteps: [1],
      materialCompleted: false,
      videoWatched: false,
      videoWatchDuration: 0,
      organsExplored: [],
      quizScore: 0,
      attempts: 1,
      correctCount: 0,
      wrongCount: 0,
      answers: {},
      statusPemahaman: 'Sedang Belajar'
    };

    saveCurrentSession();
    startDurationTimer();
    return currentSession;
  }

  // Timer Pencatat Durasi Belajar Real-Time
  function startDurationTimer() {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      if (currentSession) {
        currentSession.durationSeconds++;
        const trackerDurationEl = document.getElementById('trackerDuration');
        if (trackerDurationEl) {
          trackerDurationEl.textContent = formatDuration(currentSession.durationSeconds);
        }
      }
    }, 1000);
  }

  function saveCurrentSession() {
    try {
      localStorage.setItem(STORAGE_KEY_CURRENT, JSON.stringify(currentSession));
    } catch (e) {}
  }

  // 2. Mencatat Materi/Langkah yang Dibuka
  function recordStepVisit(stepNumber) {
    if (!currentSession) return;
    const step = parseInt(stepNumber, 10);
    if (!currentSession.visitedSteps.includes(step)) {
      currentSession.visitedSteps.push(step);
      currentSession.visitedSteps.sort((a, b) => a - b);
    }
    // Periksa apakah semua materi (langkah 1-5) sudah dikunjungi
    const requiredMaterialSteps = [1, 2, 3, 4, 5];
    const hasExploredMaterial = requiredMaterialSteps.every(s => currentSession.visitedSteps.includes(s));
    if (hasExploredMaterial) {
      currentSession.materialCompleted = true;
    }
    saveCurrentSession();
  }

  // 3. Mencatat Eksplorasi Organ
  function recordOrganExploration(organKey) {
    if (!currentSession) return;
    if (!currentSession.organsExplored.includes(organKey)) {
      currentSession.organsExplored.push(organKey);
      saveCurrentSession();
    }
  }

  // 4. Mencatat Aktivitas Video
  function recordVideoActivity(isCompleted, durationWatched) {
    if (!currentSession) return;
    if (isCompleted) {
      currentSession.videoWatched = true;
    }
    if (durationWatched) {
      currentSession.videoWatchDuration += durationWatched;
    }
    saveCurrentSession();
  }

  // 5. Mencatat Jawaban Butir Kuis
  function recordQuizAnswer(qid, selectedKey, isCorrect, topic) {
    if (!currentSession) return;
    currentSession.answers['q' + qid] = {
      answer: selectedKey,
      correct: Boolean(isCorrect),
      topic: topic || 'Umum'
    };
    saveCurrentSession();
  }

  // 6. Menyelesaikan Kuis & Menghitung Nilai Otomatis
  function finalizeQuizResults() {
    if (!currentSession) return;

    let correct = 0;
    let wrong = 0;
    const totalQuestions = 5;

    for (let i = 1; i <= totalQuestions; i++) {
      const q = currentSession.answers['q' + i];
      if (q && q.correct) {
        correct++;
      } else {
        wrong++;
      }
    }

    currentSession.correctCount = correct;
    currentSession.wrongCount = wrong;
    currentSession.quizScore = Math.round((correct / totalQuestions) * 100);
    currentSession.endTime = new Date().toISOString();

    // Tentukan Status Pemahaman berdasarkan skor
    if (currentSession.quizScore >= 80) {
      currentSession.statusPemahaman = 'Mahir';
    } else if (currentSession.quizScore >= 60) {
      currentSession.statusPemahaman = 'Cakap';
    } else {
      currentSession.statusPemahaman = 'Perlu Bimbingan';
    }

    // Simpan ke daftar sesi permanen
    const all = getAllSessions();
    // Cek apakah sudah pernah disimpan dengan id ini
    const existingIndex = all.findIndex(s => s.id === currentSession.id);
    if (existingIndex >= 0) {
      all[existingIndex] = { ...currentSession };
    } else {
      all.unshift({ ...currentSession });
    }
    saveAllSessions(all);
    saveCurrentSession();

    return currentSession;
  }

  // Mengulang Kuis (Attempts Counter)
  function incrementAttempt() {
    if (!currentSession) return;
    currentSession.attempts = (currentSession.attempts || 1) + 1;
    currentSession.answers = {};
    saveCurrentSession();
  }

  // ===================================================================
  // ENGINE DESCRIPTIVE ANALYTICS
  // ===================================================================
  function computeDescriptiveAnalytics(filterType = 'all') {
    const all = getAllSessions();
    let dataset = all;

    if (filterType === 'real') {
      dataset = all.filter(s => !s.isDemo);
    } else if (filterType === 'demo') {
      dataset = all.filter(s => s.isDemo);
    }

    const totalStudents = dataset.length;

    if (totalStudents === 0) {
      return {
        totalStudents: 0,
        avgScore: 0,
        maxScore: 0,
        minScore: 0,
        avgDuration: '0m 0s',
        completionRate: 0,
        videoDoneRate: 0,
        scoreDistribution: { mahir: 0, cakap: 0, perlu_bimbingan: 0 },
        itemAnalysis: [
          { q: 1, correctPct: 0, wrongPct: 0 },
          { q: 2, correctPct: 0, wrongPct: 0 },
          { q: 3, correctPct: 0, wrongPct: 0 },
          { q: 4, correctPct: 0, wrongPct: 0 },
          { q: 5, correctPct: 0, wrongPct: 0 }
        ],
        moduleVisits: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        dataset: []
      };
    }

    let sumScore = 0;
    let maxScore = -1;
    let minScore = 101;
    let sumDuration = 0;
    let completedCount = 0;
    let videoDoneCount = 0;

    const distribution = { mahir: 0, cakap: 0, perlu_bimbingan: 0 };
    const qCorrectCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    const moduleVisitCounts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    dataset.forEach(s => {
      const score = s.quizScore || 0;
      sumScore += score;
      if (score > maxScore) maxScore = score;
      if (score < minScore) minScore = score;

      sumDuration += (s.durationSeconds || 0);

      if (s.materialCompleted) completedCount++;
      if (s.videoWatched) videoDoneCount++;

      // Kategori pemahaman
      if (score >= 80) distribution.mahir++;
      else if (score >= 60) distribution.cakap++;
      else distribution.perlu_bimbingan++;

      // Analisis Butir Soal
      for (let i = 1; i <= 5; i++) {
        if (s.answers && s.answers['q' + i] && s.answers['q' + i].correct) {
          qCorrectCounts[i]++;
        }
      }

      // Akses Modul
      if (Array.isArray(s.visitedSteps)) {
        s.visitedSteps.forEach(step => {
          if (step >= 1 && step <= 11) {
            moduleVisitCounts[step - 1]++;
          }
        });
      }
    });

    const avgScore = Math.round(sumScore / totalStudents);
    const avgDurationSec = Math.round(sumDuration / totalStudents);
    const completionRate = Math.round((completedCount / totalStudents) * 100);
    const videoDoneRate = Math.round((videoDoneCount / totalStudents) * 100);

    const itemAnalysis = [];
    for (let i = 1; i <= 5; i++) {
      const correctPct = Math.round((qCorrectCounts[i] / totalStudents) * 100);
      itemAnalysis.push({
        q: i,
        correctPct: correctPct,
        wrongPct: 100 - correctPct
      });
    }

    return {
      totalStudents,
      avgScore,
      maxScore: maxScore === -1 ? 0 : maxScore,
      minScore: minScore === 101 ? 0 : minScore,
      avgDuration: formatDuration(avgDurationSec),
      completionRate,
      videoDoneRate,
      scoreDistribution: distribution,
      itemAnalysis,
      moduleVisits: moduleVisitCounts,
      dataset
    };
  }

  // ===================================================================
  // ENGINE DIAGNOSTIC ANALYTICS
  // Aturan Analisis Otomatis Penyebab Kesulitan Belajar
  // ===================================================================
  function generateDiagnosticReport(analytics) {
    const findings = [];
    const items = analytics.itemAnalysis;

    if (analytics.totalStudents === 0) {
      findings.push({
        type: 'info',
        text: 'Belum ada data aktivitas siswa yang terekam untuk dianalisis.'
      });
      return findings;
    }

    // Aturan 1: Deteksi kelemahan pada materi organ (Soal 1, 2, 5)
    const organAvgWrong = Math.round((items[0].wrongPct + items[1].wrongPct + items[4].wrongPct) / 3);
    if (organAvgWrong >= 35) {
      findings.push({
        type: 'warning',
        text: `Tingkat kesalahan pada topik <strong>Organ & Fungsinya</strong> cukup tinggi (${organAvgWrong}%). Siswa terutama banyak keliru pada fungsi trakea dan silia (Soal #2). Materi organ perlu diulas kembali secara klasikal.`
      });
    } else {
      findings.push({
        type: 'success',
        text: `Pemahaman siswa pada topik <strong>Organ & Fungsinya</strong> sangat baik (Rata-rata benar ${100 - organAvgWrong}%).`
      });
    }

    // Aturan 2: Deteksi kelemahan pada proses inspirasi vs ekspirasi (Soal 3, 4)
    const prosesAvgWrong = Math.round((items[2].wrongPct + items[3].wrongPct) / 2);
    if (prosesAvgWrong >= 35) {
      findings.push({
        type: 'warning',
        text: `Sebagian siswa masih tertukar antara mekanisme inspirasi dan ekspirasi (${prosesAvgWrong}% salah). Disarankan memanfaatkan simulasi visual pergerakan diafragma pada Layar 4.`
      });
    }

    // Aturan 3: Korelasi aktivitas video dengan pemahaman
    if (analytics.videoDoneRate < 70) {
      findings.push({
        type: 'warning',
        text: `Hanya ${analytics.videoDoneRate}% siswa yang menyelesaikan video pembelajaran alveolus. Siswa yang melewatkan video cenderung salah pada soal pertukaran gas (Soal #5).`
      });
    } else {
      findings.push({
        type: 'info',
        text: `${analytics.videoDoneRate}% siswa telah menuntaskan video pembelajaran secara komprehensif.`
      });
    }

    // Aturan 4: Deteksi siswa yang memerlukan pendampingan intensif
    const needAssistance = analytics.dataset.filter(s => (s.quizScore < 60 && s.materialCompleted));
    if (needAssistance.length > 0) {
      const names = needAssistance.map(s => s.name).slice(0, 3).join(', ');
      findings.push({
        type: 'warning',
        text: `Ditemukan <strong>${needAssistance.length} siswa</strong> yang telah mengakses seluruh materi namun tetap memperoleh nilai &lt; 60 (${names}${needAssistance.length > 3 ? ', dsb.' : ''}). Siswa ini terindikasi membutuhkan bimbingan langsung (remedial personal).`
      });
    }

    return findings;
  }

  // ===================================================================
  // ENGINE RECOMMENDATION
  // 1. Rekomendasi Personal untuk Siswa
  // 2. Rekomendasi Instruksional untuk Guru
  // ===================================================================
  function generateStudentRecommendation(session) {
    if (!session) return [];
    const recs = [];
    const score = session.quizScore || 0;
    const answers = session.answers || {};

    // Evaluasi Skor Utama
    if (score >= 80) {
      recs.push({
        theme: 'green',
        icon: 'fa-trophy',
        text: '<strong>Luar Biasa! Pemahaman Sangat Baik (Skor: ' + score + ').</strong> Kamu telah menguasai konsep sistem pernapasan manusia. Kamu dapat melanjutkan ke aktivitas pengayaan, misalnya membaca materi kelainan & penyakit sistem pernapasan (asma, pneumonia, dan TBC).'
      });
    } else if (score >= 60) {
      recs.push({
        theme: 'blue',
        icon: 'fa-book-open',
        text: '<strong>Capaian Cukup Baik (Skor: ' + score + ').</strong> Kamu sudah memahami konsep dasar, namun masih ada beberapa bagian yang perlu diperkuat agar mencapai nilai maksimal.'
      });
    } else {
      recs.push({
        theme: 'yellow',
        icon: 'fa-triangle-exclamation',
        text: '<strong>Perlu Belajar Lagi (Skor: ' + score + ').</strong> Nilaimu masih di bawah batas ketuntasan (KKM 75). Disarankan mengulang kembali membaca materi dari organ hingga proses inspirasi-ekspirasi, lalu kerjakan kuis kembali.'
      });
    }

    // Evaluasi spesifik per topik kuis
    if (answers.q1 && !answers.q1.correct) {
      recs.push({
        theme: 'yellow',
        icon: 'fa-lungs',
        text: 'Buka kembali <strong>Layar 3 (Organ Pernapasan)</strong> untuk mengulas fungsi rongga hidung dan rambut penyaring udara.'
      });
    }

    if (answers.q2 && !answers.q2.correct) {
      recs.push({
        theme: 'yellow',
        icon: 'fa-microscope',
        text: 'Pelajari kembali fungsi cincin tulang rawan dan epitel bersilia pada <strong>Trakea</strong> pada Layar 3.'
      });
    }

    if ((answers.q3 && !answers.q3.correct) || (answers.q4 && !answers.q4.correct)) {
      recs.push({
        theme: 'yellow',
        icon: 'fa-arrows-spin',
        text: 'Kamu masih keliru pada mekanisme pernapasan. Kunjungi <strong>Layar 4 (Proses Pernapasan)</strong> untuk mengamati perbandingan gerakan diafragma saat inspirasi vs ekspirasi.'
      });
    }

    if (answers.q5 && !answers.q5.correct) {
      recs.push({
        theme: 'yellow',
        icon: 'fa-circle-play',
        text: 'Tonton kembali <strong>Video Pembelajaran pada Layar 5</strong> untuk melihat bagaimana gas O₂ dan CO₂ bertukar secara difusi pada alveolus.'
      });
    }

    if (!session.videoWatched) {
      recs.push({
        theme: 'blue',
        icon: 'fa-film',
        text: 'Kamu belum menuntaskan video pembelajaran. Luangkan waktu 3 menit untuk menonton video agar konsep alveolus lebih mudah dipahami.'
      });
    }

    return recs;
  }

  function generateTeacherRecommendations(analytics) {
    const recs = [];
    if (analytics.totalStudents === 0) {
      recs.push({
        type: 'info',
        text: 'Data belum cukup untuk menghasilkan rekomendasi instruksional.'
      });
      return recs;
    }

    if (analytics.avgScore < 75) {
      recs.push({
        type: 'warning',
        text: `<strong>Remedial Klasikal Diperlukan:</strong> Rata-rata nilai kuis kelas (${analytics.avgScore}) belum mencapai KKM 75. Lakukan sesi review interaktif dengan bantuan bagan pernapasan.`
      });
    } else {
      recs.push({
        type: 'success',
        text: `<strong>Pencapaian Klasikal Optimal:</strong> Rata-rata kelas (${analytics.avgScore}) telah melampaui KKM. Guru dapat menyiapkan materi pengayaan (enrichment) tentang bahaya merokok & polusi udara bagi alveolus.`
      });
    }

    // Rekomendasi berdasarkan butir soal tersulit
    const worstItem = [...analytics.itemAnalysis].sort((a, b) => b.wrongPct - a.wrongPct)[0];
    if (worstItem && worstItem.wrongPct >= 30) {
      recs.push({
        type: 'info',
        text: `<strong>Fokus Pembahasan Soal #${worstItem.q}:</strong> Soal ini memiliki tingkat kesalahan tertinggi (${worstItem.wrongPct}%). Ulas kembali pertanyaan tersebut di awal pertemuan berikutnya.`
      });
    }

    // Rekomendasi durasi belajar
    if (analytics.avgDuration.includes('0m') || analytics.avgDuration.includes('1m') || analytics.avgDuration.includes('2m')) {
      recs.push({
        type: 'warning',
        text: 'Sebagian siswa menyelesaikan modul terlalu cepat (indikasi membaca cepat/skimming). Berikan instruksi agar siswa meluangkan waktu mengeksplorasi setiap organ secara bertahap.'
      });
    }

    return recs;
  }

  // ===================================================================
  // EKSPOR DATA KE FORMAT CSV
  // ===================================================================
  function exportToCSV(filterType = 'all') {
    const all = getAllSessions();
    let dataset = all;
    if (filterType === 'real') dataset = all.filter(s => !s.isDemo);
    if (filterType === 'demo') dataset = all.filter(s => s.isDemo);

    if (dataset.length === 0) {
      alert('Tidak ada data yang dapat diekspor untuk filter yang dipilih.');
      return;
    }

    const headers = [
      'No',
      'ID Siswa',
      'Nama Peserta Didik',
      'Kategori Data',
      'Waktu Mulai',
      'Waktu Selesai',
      'Durasi Belajar (Detik)',
      'Durasi Format',
      'Materi Selesai',
      'Video Selesai',
      'Nilai Kuis',
      'Jumlah Percobaan',
      'Jawaban Benar',
      'Jawaban Salah',
      'Status Pemahaman',
      'Soal 1',
      'Soal 2',
      'Soal 3',
      'Soal 4',
      'Soal 5'
    ];

    const rows = dataset.map((s, idx) => {
      const q1 = s.answers && s.answers.q1 ? (s.answers.q1.correct ? 'Benar' : 'Salah') : '-';
      const q2 = s.answers && s.answers.q2 ? (s.answers.q2.correct ? 'Benar' : 'Salah') : '-';
      const q3 = s.answers && s.answers.q3 ? (s.answers.q3.correct ? 'Benar' : 'Salah') : '-';
      const q4 = s.answers && s.answers.q4 ? (s.answers.q4.correct ? 'Benar' : 'Salah') : '-';
      const q5 = s.answers && s.answers.q5 ? (s.answers.q5.correct ? 'Benar' : 'Salah') : '-';

      return [
        idx + 1,
        `"${s.id}"`,
        `"${s.name}"`,
        s.isDemo ? 'DATA DEMO' : 'DATA ASLI',
        `"${s.startTime || '-'}"`,
        `"${s.endTime || '-'}"`,
        s.durationSeconds || 0,
        `"${formatDuration(s.durationSeconds || 0)}"`,
        s.materialCompleted ? 'Ya' : 'Belum',
        s.videoWatched ? 'Ya' : 'Belum',
        s.quizScore || 0,
        s.attempts || 1,
        s.correctCount || 0,
        s.wrongCount || 0,
        `"${s.statusPemahaman || '-'}"`,
        q1,
        q2,
        q3,
        q4,
        q5
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Rekap_Learning_Analytics_Sistem_Pernapasan_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Reset Data Asli (menjaga Data Demo tetap ada)
  function clearRealData() {
    const all = getAllSessions();
    const demoOnly = all.filter(s => s.isDemo);
    saveAllSessions(demoOnly);
    localStorage.removeItem(STORAGE_KEY_CURRENT);
    currentSession = null;
  }

  // Helper Format Durasi mm:ss atau xm ys
  function formatDuration(totalSeconds) {
    if (!totalSeconds || totalSeconds < 0) return '0m 0s';
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m}m ${s}s`;
  }

  // Inisialisasi awal saat script dimuat
  initStorage();

  // Public API
  return {
    initStorage,
    startSession,
    getCurrentSession: () => currentSession,
    recordStepVisit,
    recordOrganExploration,
    recordVideoActivity,
    recordQuizAnswer,
    finalizeQuizResults,
    incrementAttempt,
    getAllSessions,
    computeDescriptiveAnalytics,
    generateDiagnosticReport,
    generateStudentRecommendation,
    generateTeacherRecommendations,
    exportToCSV,
    clearRealData,
    formatDuration
  };

})();
