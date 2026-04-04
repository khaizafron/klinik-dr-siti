import React, { useState, useEffect } from 'react'
import { 
  ArrowRight, 
  Stethoscope, 
  Baby, 
  FlaskConical, 
  X, 
  CheckCircle2, 
  MessageCircle, 
  Calendar, 
  HeartPulse, 
  UserCheck, 
  Sparkles,
  ChevronRight,
  Info,
  Loader2,
  ShieldCheck
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const BOOKING_URL = 'https://klinikdrsiti.yezza.co/appointment'
const WA_NUMBER = '60166914270'

const categories = [
  {
    icon: Stethoscope,
    label: 'RAWATAN UMUM',
    color: 'from-red-700 to-red-500',
    services: [
      {
        id: 'perubatan-am-core',
        type: 'multi',
        name: 'Perubatan Am (Core)',
        image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=800',
        desc: 'Entry point utama untuk rawatan perubatan harian dan kecemasan ringan.',
        for: 'Semua peringkat umur',
        benefits: ['Diagnosis cepat & tepat', 'Ubatan berkualiti', 'Kos berpatutan'],
        options: [
          { name: 'Rawatan Perubatan Am', desc: 'Konsultasi untuk demam, batuk, selsema dan sakit kepala.', price: 'RM30 - RM80' },
          { name: 'Rawatan Kecemasan', desc: 'Rawatan segera untuk kecederaan ringan atau sakit mengejut.', price: 'RM50 - RM150' },
          { name: 'Rawatan Kulit', desc: 'Rawatan ekzema, jerawat, kulat dan alahan kulit.', price: 'RM50 - RM150' },
          { name: 'Nebulizer', desc: 'Rawatan pernafasan untuk asma atau sesak nafas.', price: 'RM40 - RM70' }
        ]
      },
      {
        id: 'prosedur-kecil',
        type: 'multi',
        name: 'Prosedur Kecil & Rawatan Luaran',
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800',
        desc: 'Servis berasaskan prosedur untuk kesakitan atau keperluan urgent.',
        for: 'Kanak-kanak & dewasa',
        benefits: ['Prosedur steril', 'Peralatan moden', 'Penjagaan rapi'],
        options: [
          { name: 'Rawatan Bisul (I&D)', desc: 'Prosedur torehan dan saliran untuk bisul atau abses.', price: 'RM80 - RM200' },
          { name: 'Dressing Luka', desc: 'Pencucian dan pembalutan luka selepas pembedahan atau kecederaan.', price: 'RM20 - RM60' },
          { name: 'Nail Avulsion', desc: 'Prosedur mencabut kuku yang cengkam atau rosak.', price: 'RM100 - RM250' },
          { name: 'Cuci Telinga (Ear Syringing)', desc: 'Membersihkan tahi telinga yang tersumbat dengan selamat.', price: 'RM50 - RM100' }
        ]
      },
      {
        id: 'pemeriksaan-mini-lab',
        type: 'multi',
        name: 'Pemeriksaan & Mini Lab',
        image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800',
        desc: 'Ujian makmal asas untuk saringan kesihatan yang lebih mendalam.',
        for: 'Dewasa & Ibu Hamil',
        benefits: ['Keputusan segera', 'Analisis tepat', 'Konsultasi doktor'],
        options: [
          { name: 'Full Blood Count (FBC)', desc: 'Ujian darah lengkap untuk mengesan jangkitan atau anemia.', price: 'RM40 - RM80' },
          { name: 'Urine Test', desc: 'Ujian air kencing untuk kencing manis atau jangkitan kuman.', price: 'RM15 - RM30' }
        ]
      }
    ],
  },
  {
    icon: Baby,
    label: 'IBU & ANAK',
    color: 'from-blue-600 to-blue-400',
    services: [
      {
        id: 'fertility-reproductive',
        type: 'multi',
        name: 'Fertiliti & Kesihatan Reproduktif',
        image: 'https://images.unsplash.com/photo-1690749156340-6a26c8cfdb80?q=80&w=327&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        desc: 'Saringan dan konsultasi kesuburan untuk pasangan yang merancang zuriat.',
        for: 'Pasangan Merancang Keluarga',
        benefits: ['Konsultasi peribadi', 'Scan rahim & ovari', 'Ujian hormon'],
        options: [
          { name: 'AMH Test', desc: 'Ujian rizab ovari untuk menilai potensi kesuburan wanita.', price: 'RM180 - RM250' },
          { name: 'Progesterone D21', desc: 'Ujian darah untuk mengesahkan ovulasi telah berlaku.', price: 'RM60 - RM100' },
          { name: 'Seminal Analysis', desc: 'Ujian kualiti, kuantiti dan pergerakan sperma.', price: 'RM80 - RM150' },
          { name: 'Infertility Consultation', desc: 'Sesi perbincangan mendalam mengenai masalah kesuburan.', price: 'RM100 - RM150' },
          { name: 'Hormonal Evaluation', desc: 'Saringan hormon lengkap (FSH, LH, Prolactin).', price: 'RM150 - RM300' }
        ]
      },
      {
        id: 'antenatal-care',
        type: 'multi',
        name: 'Kehamilan & Penjagaan Antenatal',
        image: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&q=80&w=800',
        desc: 'Pemantauan kehamilan yang teliti untuk memastikan kesihatan ibu dan bayi.',
        for: 'Ibu Hamil',
        benefits: ['Pemeriksaan fizikal', 'Ujian makmal', 'Bimbingan kesihatan'],
        options: [
          { name: 'Antenatal Checkup (Buku Pink)', desc: 'Pendaftaran dan pemeriksaan rutin kehamilan.', price: 'RM50 - RM80', suitable: 'Ibu Hamil' },
          { name: 'Pregnancy Follow-up', desc: 'Pemeriksaan susulan berkala untuk memantau kesihatan.', price: 'RM40 - RM70', suitable: 'Setiap Bulan' },
          { name: 'Routine Monitoring', desc: 'Pemeriksaan tekanan darah, berat badan dan ujian air kencing.', price: 'RM20 - RM40', suitable: 'Rutin' },
          { name: 'MOGTT (Ujian Gula)', desc: 'Saringan kencing manis semasa hamil.', price: 'RM30 - RM50', suitable: 'Ibu Hamil' },
          { name: 'Beta-HCG Test', desc: 'Ujian darah untuk pengesahan awal kehamilan yang tepat.', price: 'RM60 - RM100', suitable: 'Awal Hamil' }
        ]
      },
      {
        id: 'pregnancy-scans',
        type: 'multi',
        name: 'Scan Kehamilan / Ultrasound',
        image: 'https://plus.unsplash.com/premium_photo-1770775359636-ba7836139522?q=80&w=741&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        desc: 'Teknologi ultrasound terkini untuk melihat perkembangan bayi anda.',
        for: 'Ibu Hamil',
        benefits: ['Mesin ultrasound 2D/4D/5D', 'Keputusan segera', 'Laporan bergambar'],
        options: [
          { name: 'NT Scan', desc: 'Saringan awal risiko keabnormalan janin (11-13 minggu).', price: 'RM120 - RM180', suitable: '11-13 Minggu' },
          { name: 'Detail Scan', desc: 'Pemeriksaan anatomi lengkap organ bayi secara terperinci.', price: 'RM150 - RM250', suitable: '18-24 Minggu' },
          { name: '5D Scan', desc: 'Gambaran realistik wajah dan pergerakan bayi secara real-time.', price: 'RM180 - RM280', suitable: '24-32 Minggu' },
          { name: 'Growth Scan', desc: 'Memantau tumbesaran, berat bayi dan air ketuban.', price: 'RM60 - RM100', suitable: 'Trimester 3' },
          { name: 'Gynae Scan', desc: 'Scan rahim dan ovari untuk saringan kesihatan umum.', price: 'RM80 - RM150', suitable: 'Umum' },
          { name: 'TVS (Scan Dalaman)', desc: 'Scan dalaman untuk gambaran yang lebih jelas dan tepat.', price: 'RM80 - RM120', suitable: 'Khusus' }
        ]
      },
      {
        id: 'vaccination-ibu-anak',
        type: 'multi',
        name: 'Vaksinasi (Ibu & Anak)',
        image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=800',
        desc: 'Perlindungan imunisasi yang lengkap untuk ibu dan si manja.',
        for: 'Ibu & Kanak-kanak',
        benefits: ['Vaksin KKM & swasta', 'Rekod vaksin digital', 'Penyimpanan suhu terkawal'],
        options: [
          { name: 'Influenza Vaccine', desc: 'Vaksin selsema bermusim (disyorkan setiap tahun).', price: 'RM70 - RM90', suitable: 'Semua' },
          { name: 'Typhoid Injection', desc: 'Wajib untuk pengendali makanan (sah 3 tahun).', price: 'RM60 - RM80', suitable: 'Pekerja Makanan' },
          { name: 'Umrah Vaccine (Meningococcal)', desc: 'Vaksin wajib untuk jemaah Haji dan Umrah.', price: 'RM150 - RM180', suitable: 'Jemaah' },
          { name: 'Child Immunization', desc: 'Vaksin tambahan seperti Rotavirus, Pneumococcal & Chickenpox.', price: 'RM120 - RM250', suitable: 'Kanak-kanak' }
        ]
      },
      {
        id: 'womens-health-gynae',
        type: 'multi',
        name: 'Kesihatan Wanita (Servis Ginekologi)',
        image: 'https://plus.unsplash.com/premium_photo-1672760403439-bf51a26c1ae6?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        desc: 'Penjagaan kesihatan reproduktif wanita yang menyeluruh dan privasi.',
        for: 'Wanita Dewasa',
        benefits: ['Prosedur selamat', 'Doktor wanita', 'Privasi terjamin'],
        options: [
          { name: 'General Women Consultation', desc: 'Rundingan masalah haid, keputihan, and kesihatan umum wanita.', price: 'RM50 - RM100', suitable: 'Umum' },
          { name: 'Pap Smear', desc: 'Saringan tradisional untuk mengesan sel luar biasa pada serviks.', price: 'RM60 - RM100', suitable: 'Saringan' },
          { name: 'HPV DNA Test', desc: 'Ujian saringan kanser serviks yang lebih sensitif.', price: 'RM250 - RM350', suitable: 'Saringan' },
          { name: 'IUCD Insertion', desc: 'Prosedur pemasangan alat perancang keluarga dalam rahim.', price: 'RM150 - RM300', suitable: 'Perancang' },
          { name: 'Depo Injection', desc: 'Suntikan perancang keluarga setiap 3 bulan.', price: 'RM40 - RM60', suitable: 'Perancang' }
        ]
      },
      {
        id: 'child-care-monitoring',
        type: 'multi',
        name: 'Penjagaan Bayi & Kanak-kanak',
        image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=800',
        desc: 'Rawatan dan pemantauan kesihatan untuk bayi dan kanak-kanak.',
        for: 'Bayi & Kanak-kanak',
        benefits: ['Rawatan pakar', 'Persekitaran mesra kanak-kanak', 'Pemantauan tumbesaran'],
        options: [
          { name: 'Women & Child Consultation', desc: 'Rundingan kesihatan khusus untuk ibu dan anak.', price: 'RM50 - RM100', suitable: 'Ibu & Anak' },
          { name: 'Baby Procedures', desc: 'Prosedur kecil seperti rawatan pusat, sedut kahak dan lain-lain.', price: 'RM30 - RM80', suitable: 'Bayi' },
          { name: 'Child Health Monitoring', desc: 'Pemeriksaan tumbesaran, berat badan dan perkembangan motor.', price: 'RM40 - RM70', suitable: 'Kanak-kanak' }
        ]
      }
    ],
  },
  {
    icon: FlaskConical,
    label: 'DIAGNOSTIK',
    color: 'from-red-600 to-blue-600',
    services: [
      {
        id: 'mini-lab-asas',
        type: 'grouped',
        name: 'Mini Lab & Pemeriksaan Asas',
        image: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80&w=800',
        desc: 'Ujian makmal dan pemeriksaan fizikal asas untuk pemantauan kesihatan harian.',
        for: 'Semua pesakit',
        benefits: ['Keputusan pantas', 'Peralatan moden', 'Konsultasi pakar'],
        groups: [
          {
            title: 'Pemeriksaan Asas',
            items: [
              { name: 'ECG', desc: 'Ujian saringan jantung untuk mengesan keabnormalan ritma.', price: 'RM40 - RM70' },
              { name: 'Ujian Air Gula (MOGTT / GDL)', desc: 'Saringan kencing manis semasa hamil atau rutin.', price: 'RM30 - RM50' }
            ]
          },
          {
            title: 'Ujian Makmal',
            items: [
              { name: 'Blood Test Package (Basic & Premium)', desc: 'Saringan darah lengkap untuk profil kesihatan menyeluruh.', price: 'RM100 - RM350' },
              { name: 'Beta-HCG (Ujian Kehamilan)', desc: 'Ujian darah untuk pengesahan awal kehamilan yang tepat.', price: 'RM60 - RM100' }
            ]
          },
          {
            title: 'Susulan',
            items: [
              { name: 'Follow Up / Review Result', desc: 'Sesi konsultasi bersama doktor untuk ulasan keputusan ujian.', price: 'RM30 - RM50' }
            ]
          }
        ]
      },
      {
        id: 'scan-ultrasound',
        type: 'grouped',
        name: 'Scan & Ultrasound',
        image: 'https://plus.unsplash.com/premium_photo-1663013248555-1e4068f3018d?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        desc: 'Pemeriksaan ultrasound untuk pelbagai bahagian badan termasuk abdomen, payudara dan organ dalaman.',
        for: 'Semua Pesakit',
        benefits: ['Keputusan segera', 'Laporan bergambar', 'Penjelasan pakar'],
        groups: [
          {
            title: 'Scan Umum',
            items: [
              { name: 'Abdominal Scan', desc: 'Pemeriksaan organ dalaman abdomen seperti hati, buah pinggang dan pundi hempedu.', price: 'RM80 - RM150' },
              { name: 'KUB Scan', desc: 'Pemeriksaan buah pinggang, ureter dan pundi kencing.', price: 'RM80 - RM150' },
              { name: 'Breast Scan', desc: 'Ultrasound payudara untuk saringan ketulan atau perubahan tisu.', price: 'RM80 - RM150' }
            ]
          },
          {
            title: 'Scan Khusus',
            items: [
              { name: 'Thyroid Scan', desc: 'Pemeriksaan kelenjar tiroid untuk mengesan ketumbuhan atau masalah hormon.', price: 'RM80 - RM150' },
              { name: 'Prostate Scan', desc: 'Pemeriksaan prostat bagi lelaki.', price: 'RM100 - RM180' },
              { name: 'Muscle / Tendon Scan', desc: 'Scan untuk kecederaan otot dan tendon.', price: 'RM80 - RM150' }
            ]
          }
        ]
      },
      {
        id: 'ujian-hormon-kesuburan',
        type: 'grouped',
        name: 'Ujian Hormon & Kesuburan',
        image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=800',
        desc: 'Penilaian profil hormon untuk kesuburan, kitaran haid, dan kesihatan reproduktif.',
        for: 'Wanita & Pasangan',
        benefits: ['Keputusan makmal tepat', 'Ulasan doktor', 'Penilaian kesuburan'],
        groups: [
          {
            title: 'Profil Hormon',
            items: [
              { name: 'Female Hormone Profile (FSH, LH, Prolactin, Estradiol)', desc: 'Penilaian asas hormon kesuburan wanita.', price: 'RM150 - RM250' },
              { name: 'Progesterone Test (Day 21)', desc: 'Ujian untuk mengesan ovulasi.', price: 'RM60 - RM100' },
              { name: 'Thyroid Profile (T3, T4, TSH)', desc: 'Saringan fungsi tiroid yang mempengaruhi kesuburan.', price: 'RM80 - RM150' },
              { name: 'AMH Test (Anti-Mullerian Hormone)', desc: 'Penilaian baki simpanan telur (ovarian reserve).', price: 'RM250 - RM350' }
            ]
          }
        ]
      }
    ],
  },
  {
    icon: HeartPulse,
    label: 'KESIHATAN WANITA',
    color: 'from-pink-600 to-red-500',
    services: [
      {
        id: 'perancang-keluarga',
        type: 'grouped',
        name: 'Perancang Keluarga',
        image: 'https://images.unsplash.com/photo-1559334941-acb7bc1ae33a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        desc: 'Pelbagai kaedah perancang keluarga yang selamat dan berkesan.',
        for: 'Wanita Merancang Keluarga',
        benefits: ['Konsultasi pakar', 'Pilihan pelbagai', 'Prosedur selamat'],
        groups: [
          {
            title: 'Kaedah Perancang',
            items: [
              { name: 'IUCD', desc: 'Alat perancang keluarga dalam rahim jangka panjang (3-5 tahun).', price: 'RM150 - RM300' },
              { name: 'Injection Depo', desc: 'Suntikan perancang keluarga setiap 3 bulan.', price: 'RM40 - RM60' },
              { name: 'Konsultasi Perancang Keluarga', desc: 'Sesi perbincangan untuk memilih kaedah yang paling sesuai.', price: 'RM50 - RM80' }
            ]
          }
        ]
      },
      {
        id: 'saringan-wanita-kesihatan',
        type: 'grouped',
        name: 'Konsultasi & Rawatan Wanita',
        image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=800',
        desc: 'Rawatan dan konsultasi untuk masalah kesihatan wanita termasuk haid tidak teratur, jangkitan dan hormon.',
        for: 'Wanita Dewasa',
        benefits: ['Privasi terjamin', 'Keputusan makmal tepat', 'Ulasan doktor'],
        groups: [
          {
            title: 'Rawatan Wanita',
            items: [
              { name: 'General Women Consultation', desc: 'Rundingan masalah haid, keputihan dan kesihatan wanita umum.', price: 'RM50 - RM100' },
              { name: 'Rawatan Sakit Puan', desc: 'Rawatan jangkitan dan masalah dalaman wanita.', price: 'RM50 - RM150' },
              { name: 'Konsultasi Hormon Wanita', desc: 'Penilaian simptom berkaitan hormon seperti PMS atau irregular cycle.', price: 'RM80 - RM150' }
            ]
          }
        ]
      },
      {
        id: 'gynae-scan-pemeriksaan',
        type: 'grouped',
        name: 'Gynae Scan & Pemeriksaan',
        image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800',
        desc: 'Pemeriksaan ultrasound untuk memantau kesihatan rahim dan ovari.',
        for: 'Wanita Dewasa',
        benefits: ['Mesin ultrasound moden', 'Laporan bergambar', 'Penjelasan pakar'],
        groups: [
          {
            title: 'Ultrasound Ginekologi',
            items: [
              { name: 'Gynae Scan', desc: 'Scan rahim dan ovari untuk saringan kesihatan umum.', price: 'RM80 - RM150' },
              { name: 'TVS (Transvaginal Scan)', desc: 'Scan dalaman untuk gambaran yang lebih jelas dan tepat.', price: 'RM80 - RM120' },
              { name: 'Pelvic Scan', desc: 'Pemeriksaan ultrasound kawasan pelvis.', price: 'RM80 - RM150' }
            ]
          }
        ]
      }
    ]
  },
  {
    icon: UserCheck,
    label: 'SARINGAN KESIHATAN',
    color: 'from-emerald-600 to-teal-500',
    services: [
      {
        id: 'medical-checkup-asas',
        type: 'grouped',
        name: 'Medical Checkup',
        image: 'https://plus.unsplash.com/premium_photo-1661766708050-a164431ffdf5?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        desc: 'Pemeriksaan kesihatan menyeluruh untuk pelbagai tujuan.',
        for: 'Semua peringkat umur',
        benefits: ['Laporan rasmi', 'Pemeriksaan fizikal', 'Keputusan pantas'],
        groups: [
          {
            title: 'Pemeriksaan Rasmi',
            items: [
              { name: 'General Medical Checkup', desc: 'Pemeriksaan kesihatan rutin untuk pemantauan kendiri.', price: 'RM80 - RM150' },
              { name: 'Student Medical Checkup', desc: 'Saringan kesihatan untuk kemasukan sekolah atau universiti.', price: 'RM50 - RM80' },
              { name: 'Pre-employment Checkup', desc: 'Pemeriksaan kesihatan sebelum memulakan pekerjaan baru.', price: 'RM80 - RM150' }
            ]
          },
          {
            title: 'Pemeriksaan Khas',
            items: [
              { name: 'GDL Medical Checkup', desc: 'Pemeriksaan kesihatan untuk lesen GDL (kenderaan berat).', price: 'RM60 - RM120' },
              { name: 'Grab Medical Checkup', desc: 'Pemeriksaan kesihatan untuk pendaftaran pemandu Grab / e-hailing.', price: 'RM60 - RM120' },
              { name: 'Socso Medical Checkup', desc: 'Pemeriksaan kesihatan berkaitan tuntutan atau keperluan SOCSO.', price: 'RM80 - RM150' }
            ]
          }
        ]
      },
      {
        id: 'fomema-pekerja-asing',
        type: 'grouped',
        name: 'FOMEMA & Pekerja Asing',
        image: 'https://images.unsplash.com/photo-1679000265956-3bd0f356b2b3?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        desc: 'Pemeriksaan kesihatan rasmi untuk pekerja asing.',
        for: 'Pekerja Asing',
        benefits: ['Berdaftar FOMEMA', 'Proses efisien', 'Laporan terus ke sistem'],
        groups: [
          {
            title: 'Saringan FOMEMA',
            items: [
              { name: 'FOMEMA Medical Checkup', desc: 'Pemeriksaan kesihatan lengkap mengikut piawaian FOMEMA.', price: 'RM180 - RM200' }
            ]
          }
        ]
      },
      {
        id: 'pakej-pemeriksaan-darah',
        type: 'grouped',
        name: 'Pakej Pemeriksaan',
        image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800',
        desc: 'Pakej saringan darah yang komprehensif untuk profil kesihatan anda.',
        for: 'Dewasa',
        benefits: ['Profil darah lengkap', 'Analisis makmal', 'Ulasan doktor'],
        groups: [
          {
            title: 'Pakej Darah',
            items: [
              { name: 'Standard Blood Test Package', desc: 'Saringan darah asas merangkumi kolesterol, gula, dan fungsi organ.', price: 'RM100 - RM180' },
              { name: 'Premium Package', desc: 'Saringan darah menyeluruh termasuk penanda kanser dan profil hormon.', price: 'RM250 - RM350' }
            ]
          }
        ]
      }
    ]
  },
  {
    icon: Sparkles,
    label: 'ESTETIKA',
    color: 'from-amber-500 to-orange-400',
    services: [
      {
        id: 'aesthetic',
        type: 'single',
        name: 'Aesthetic (Kecantikan)',
        image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800',
        desc: 'Rawatan kecantikan dan kulit untuk penampilan yang lebih yakin.',
        for: 'Semua yang mementingkan kecantikan',
        benefits: ['Coming Soon', 'Rawatan Moden', 'Pakar Estetika'],
        steps: ['Akan Datang'],
        price: 'Coming Soon',
        isComingSoon: true
      }
    ]
  }
]

function ServiceModal({ service, onClose }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [service])

  if (!service) return null

  const getWaLink = (subServiceName) => {
    const message = `Hi saya nak buat temu janji untuk ${subServiceName || service.name} di Klinik Dr Siti.`
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
  }

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[110] flex items-start justify-center pt-6 md:pt-16 px-4 bg-blue-950/60 backdrop-blur-md overflow-y-auto pb-10"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 40, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 40, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-white rounded-[2rem] md:rounded-[2.5rem] w-full max-w-5xl shadow-2xl overflow-hidden relative"
          onClick={(e) => e.stopPropagation()}
        >
          {isLoading ? (
            <div className="h-[400px] md:h-[500px] flex flex-col items-center justify-center gap-4">
              <Loader2 className="w-10 h-10 text-red-600 animate-spin" />
              <p className="text-neutral-400 font-bold text-xs uppercase tracking-widest">Memuatkan Butiran...</p>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row h-full max-h-[90vh] lg:max-h-[85vh]">
              {/* LEFT SIDE: CONTENT */}
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                {/* HERO SECTION */}
                <div className="relative h-32 md:h-48 lg:h-80">
                  <img 
                    src={service.image} 
                    alt={service.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 p-4 md:p-8 lg:p-10">
                    <span className="inline-block px-3 py-1 bg-red-600 text-white text-[8px] md:text-[9px] lg:text-[10px] font-black rounded-full uppercase tracking-widest mb-1 md:mb-3">
                      {service.type === 'multi' || service.type === 'grouped' ? 'Pakej Pilihan' : 'Rawatan Fokus'}
                    </span>
                    <h3 className="text-lg md:text-3xl lg:text-5xl font-black text-blue-950 leading-tight">
                      {service.name}
                    </h3>
                  </div>
                  
                  {/* CLOSE BUTTON MOBILE */}
                  <button 
                    onClick={onClose}
                    className="lg:hidden absolute top-4 right-4 z-30 w-10 h-10 bg-black/20 hover:bg-black/40 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="p-4 md:p-8 lg:p-10 space-y-6 md:space-y-10">
                  {/* DESCRIPTION */}
                  <section>
                    <h4 className="text-[10px] md:text-xs font-black text-red-600 uppercase tracking-[0.2em] mb-2 md:mb-4 flex items-center gap-2">
                      <Info size={14} />
                      Mengenai Perkhidmatan
                    </h4>
                    <p className="text-neutral-600 text-xs md:text-base leading-relaxed">
                      {service.desc}
                    </p>
                  </section>

                  {/* SERVICE LIST / DETAILS */}
                  {service.type === 'single' ? (
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-[10px] md:text-xs font-black text-blue-900 uppercase tracking-widest mb-4">Kelebihan</h4>
                        <ul className="space-y-3">
                          {service.benefits.map((b) => (
                            <li key={b} className="flex gap-3 text-neutral-600 text-sm md:text-base font-medium">
                              <CheckCircle2 size={18} className="text-red-500 shrink-0" />
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-[10px] md:text-xs font-black text-blue-900 uppercase tracking-widest mb-4">Proses</h4>
                        <div className="space-y-4">
                          {service.steps.map((step, i) => (
                            <div key={step} className="flex items-center gap-4">
                              <div className="w-8 h-8 bg-red-50 text-red-600 rounded-xl flex items-center justify-center text-xs font-black border border-red-100">
                                {i + 1}
                              </div>
                              <p className="text-neutral-600 text-sm md:text-base font-semibold">{step}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : service.type === 'grouped' ? (
                    <div className="space-y-10 md:space-y-12">
                      {service.groups.map((group) => (
                        <section key={group.title}>
                          <h4 className="text-[10px] md:text-xs font-black text-blue-900 uppercase tracking-widest mb-4 md:mb-6 flex items-center gap-2">
                            <div className="w-1.5 h-4 bg-red-600 rounded-full" />
                            {group.title}
                          </h4>
                          <div className="grid gap-4">
                            {group.items.map((opt) => (
                              <div 
                                key={opt.name}
                                className="group p-4 md:p-5 bg-neutral-50 rounded-[1.5rem] md:rounded-[2rem] border border-neutral-100 hover:border-red-200 hover:bg-white hover:shadow-xl hover:shadow-red-900/5 transition-all duration-300"
                              >
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
                                  <div className="flex-1">
                                    <h5 className="font-black text-blue-950 text-sm md:text-lg group-hover:text-red-600 transition-colors mb-1">{opt.name}</h5>
                                    <p className="text-neutral-500 text-[10px] md:text-sm leading-relaxed mb-2 md:mb-3">{opt.desc}</p>
                                    {opt.suitable && (
                                      <div className="flex items-center gap-2">
                                        <span className="text-[8px] md:text-[9px] font-black text-red-600 bg-red-50 px-2 py-0.5 rounded uppercase tracking-wider border border-red-100">Sesuai Untuk:</span>
                                        <span className="text-[10px] md:text-xs font-bold text-neutral-600">{opt.suitable}</span>
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end justify-between gap-3 md:gap-4 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-neutral-100">
                                    <div className="text-left md:text-right">
                                      <p className="text-[8px] md:text-[10px] font-black text-neutral-400 uppercase tracking-widest leading-none mb-1">Anggaran Harga</p>
                                      <p className="text-sm md:text-xl font-black text-blue-900">{opt.price}</p>
                                    </div>
                                    <div className="flex gap-2 w-full sm:w-auto">
                                      <a 
                                        href={getWaLink(opt.name)}
                                        target="_blank"
                                        className="flex-1 sm:flex-none px-3 md:px-4 py-2 md:py-2.5 bg-white border border-neutral-200 text-blue-600 hover:bg-blue-50 hover:border-blue-200 rounded-xl flex items-center justify-center gap-2 transition-all text-[9px] md:text-[10px] font-black uppercase tracking-widest"
                                      >
                                        <MessageCircle size={14} />
                                        TANYA
                                      </a>
                                      <a 
                                        href={BOOKING_URL}
                                        className="flex-1 sm:flex-none px-4 md:px-5 py-2 md:py-2.5 bg-red-600 text-white text-[9px] md:text-[10px] font-black rounded-xl hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/20 transition-all flex items-center justify-center gap-2 uppercase tracking-widest"
                                      >
                                        TEMPAH
                                        <ChevronRight size={14} />
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </section>
                      ))}
                    </div>
                  ) : (
                    <section>
                      <h4 className="text-[10px] md:text-xs font-black text-blue-900 uppercase tracking-widest mb-6">Pilihan Perkhidmatan</h4>
                      <div className="grid gap-4">
                        {service.options.map((opt) => (
                          <div 
                            key={opt.name}
                            className="group p-4 md:p-5 bg-neutral-50 rounded-[1.5rem] md:rounded-[2rem] border border-neutral-100 hover:border-red-200 hover:bg-white hover:shadow-xl hover:shadow-red-900/5 transition-all duration-300"
                          >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
                              <div className="flex-1">
                                <h5 className="font-black text-blue-950 text-sm md:text-lg group-hover:text-red-600 transition-colors mb-1">{opt.name}</h5>
                                <p className="text-neutral-500 text-[10px] md:text-sm leading-relaxed mb-2 md:mb-3">{opt.desc}</p>
                                {opt.suitable && (
                                  <div className="flex items-center gap-2">
                                    <span className="text-[8px] md:text-[9px] font-black text-red-600 bg-red-50 px-2 py-0.5 rounded uppercase tracking-wider border border-red-100">Sesuai Untuk:</span>
                                    <span className="text-[10px] md:text-xs font-bold text-neutral-600">{opt.suitable}</span>
                                  </div>
                                )}
                              </div>
                              <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end justify-between gap-3 md:gap-4 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-neutral-100">
                                <div className="text-left md:text-right">
                                  <p className="text-[8px] md:text-[10px] font-black text-neutral-400 uppercase tracking-widest leading-none mb-1">Anggaran Harga</p>
                                  <p className="text-sm md:text-xl font-black text-blue-900">{opt.price}</p>
                                </div>
                                <div className="flex gap-2 w-full sm:w-auto">
                                  <a 
                                    href={getWaLink(opt.name)}
                                    target="_blank"
                                    className="flex-1 sm:flex-none px-3 md:px-4 py-2 md:py-2.5 bg-white border border-neutral-200 text-blue-600 hover:bg-blue-50 hover:border-blue-200 rounded-xl flex items-center justify-center gap-2 transition-all text-[9px] md:text-[10px] font-black uppercase tracking-widest"
                                  >
                                    <MessageCircle size={14} />
                                    TANYA
                                  </a>
                                  <a 
                                    href={BOOKING_URL}
                                    className="flex-1 sm:flex-none px-4 md:px-5 py-2 md:py-2.5 bg-red-600 text-white text-[9px] md:text-[10px] font-black rounded-xl hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/20 transition-all flex items-center justify-center gap-2 uppercase tracking-widest"
                                  >
                                    TEMPAH
                                    <ChevronRight size={14} />
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              </div>

              {/* RIGHT SIDE: CTA PANEL (Sticky on Desktop, Compact Footer on Mobile) */}
              <div className="w-full lg:w-[380px] bg-white lg:bg-neutral-50 border-t border-neutral-100 p-4 md:p-6 lg:p-10 flex flex-col justify-between shrink-0">
                <div className="space-y-8">
                  <div className="hidden lg:flex justify-end">
                    <button 
                      onClick={onClose}
                      className="w-12 h-12 bg-white border border-neutral-200 text-neutral-400 hover:text-red-600 hover:border-red-200 rounded-2xl flex items-center justify-center transition-all shadow-sm active:scale-95"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <div className="space-y-4 lg:space-y-6">
                    <div className="lg:bg-white lg:p-6 lg:rounded-3xl lg:border lg:border-neutral-200/60 lg:shadow-sm">
                      <h5 className="hidden lg:block text-blue-950 font-black text-sm uppercase tracking-widest mb-4">Tindakan Pantas</h5>
                      <div className="flex flex-row lg:flex-col gap-2 lg:gap-3">
                        <a 
                          href={BOOKING_URL}
                          className="flex-1 lg:w-full bg-red-600 hover:bg-red-700 text-white font-black py-3 md:py-3.5 lg:py-4 rounded-xl lg:rounded-2xl flex items-center justify-center gap-2 lg:gap-3 shadow-lg lg:shadow-xl shadow-red-900/10 lg:shadow-red-900/20 transition-all active:scale-95 text-[8px] md:text-[10px] lg:text-xs tracking-widest"
                        >
                          <Calendar size={14} className="md:size-4 lg:size-[18px]" />
                          <span className="hidden sm:inline">TEMPAH</span> TEMUJANJI
                        </a>
                        <a 
                          href={getWaLink()}
                          target="_blank"
                          className="flex-1 lg:w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3 md:py-3.5 lg:py-4 rounded-xl lg:rounded-2xl flex items-center justify-center gap-2 lg:gap-3 shadow-lg lg:shadow-xl shadow-blue-900/10 lg:shadow-blue-900/20 transition-all active:scale-95 text-[8px] md:text-[10px] lg:text-xs tracking-widest"
                        >
                          <MessageCircle size={14} className="md:size-4 lg:size-[18px]" />
                          <span className="hidden sm:inline">TANYA</span> WHATSAPP
                        </a>
                      </div>
                    </div>

                    <div className="hidden lg:flex items-center gap-4 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl">
                      <div className="w-10 h-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center shrink-0">
                        <ShieldCheck size={20} />
                      </div>
                      <div>
                        <p className="text-emerald-900 font-black text-[10px] uppercase tracking-widest">Klinik Berdaftar KKM</p>
                        <p className="text-emerald-600/70 text-[9px] font-bold">Keselamatan & Kualiti Terjamin</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hidden lg:block mt-10 lg:mt-0 pt-6 border-t border-neutral-200/60 text-center">
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Klinik Dr Siti © 2026</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function Services() {
  const [selected, setSelected] = useState(null)

  return (
    <section id="services" className="py-20 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="text-red-600 font-bold text-xs tracking-[0.3em] uppercase mb-4">Kepakaran Kami</p>
          <h2 className="text-3xl md:text-6xl font-black text-blue-900 leading-tight mb-6">
            Perkhidmatan <br className="md:hidden" />
            <span className="text-red-600">Komprehensif</span>
          </h2>
          <p className="text-neutral-500 text-sm md:text-lg max-w-2xl mx-auto">
            Kami menyediakan pelbagai rawatan perubatan moden yang direka khas untuk memastikan kesihatan optimum bagi setiap ahli keluarga anda.
          </p>
        </motion.div>

        <div className="space-y-20 md:space-y-32">
          {categories.map((cat, ci) => {
            const Icon = cat.icon
            return (
              <div key={cat.label}>
                {/* Category Header */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 md:gap-6 mb-8 md:mb-12"
                >
                  <div className={`w-14 h-14 md:w-20 md:h-20 bg-linear-to-br ${cat.color} rounded-2xl md:rounded-[2rem] flex items-center justify-center shadow-2xl shadow-red-900/10 relative group`}>
                    <Icon size={24} className="text-white relative z-10 md:size-32" />
                    <div className="absolute inset-0 bg-white/20 rounded-2xl md:rounded-[2rem] scale-0 group-hover:scale-100 transition-transform duration-500" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-3xl font-black text-blue-950 tracking-tight uppercase">{cat.label}</h3>
                    <div className="h-1 md:h-1.5 w-12 md:w-16 bg-red-600 rounded-full mt-1 md:mt-2" />
                  </div>
                </motion.div>

                {/* Service Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                  {cat.services.map((svc, index) => (
                    <motion.button
                      key={svc.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setSelected(svc)}
                      className="group text-left bg-white rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-neutral-100 hover:border-red-200 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-red-900/5 flex flex-col h-full relative"
                    >
                      <div className="relative h-56 md:h-64 overflow-hidden">
                        <img 
                          src={svc.image} 
                          alt={svc.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-blue-950/80 via-blue-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                        
                        {svc.isComingSoon && (
                          <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-amber-500 text-white text-[8px] md:text-[10px] font-black px-3 py-1 md:px-4 md:py-1.5 rounded-full shadow-lg">
                            COMING SOON
                          </div>
                        )}

                        <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6">
                          <p className="text-white/60 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-1">
                            {svc.type === 'multi' ? 'Pakej Pilihan' : 'Rawatan Fokus'}
                          </p>
                          <h4 className="font-black text-white text-xl md:text-2xl tracking-tight group-hover:text-red-400 transition-colors leading-tight">{svc.name}</h4>
                        </div>
                      </div>
                      
                      <div className="p-6 md:p-8 flex flex-col flex-1">
                        <p className="text-neutral-500 text-xs md:text-sm leading-relaxed mb-6 md:mb-8 line-clamp-3 flex-1">{svc.desc}</p>
                        
                        <div className="flex items-center justify-between mt-auto pt-4 md:pt-6 border-t border-neutral-100">
                          <div className="flex flex-col">
                            <span className="text-[8px] md:text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1">Mula Dari</span>
                            <span className="text-blue-900 font-black text-base md:text-lg">{svc.type === 'multi' ? svc.options[0].price : svc.type === 'grouped' ? svc.groups[0].items[0].price : svc.price}</span>
                          </div>
                          <div className="w-10 h-10 md:w-12 md:h-12 bg-neutral-50 rounded-xl md:rounded-2xl flex items-center justify-center text-red-600 shadow-inner group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                            <ArrowRight size={18} md:size={20} />
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      
      <AnimatePresence>
        {selected && <ServiceModal service={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}
