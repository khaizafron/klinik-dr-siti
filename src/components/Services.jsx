import React, { useRef, useState, useEffect } from 'react'
import { ArrowRight, Stethoscope, Baby, FlaskConical } from 'lucide-react'

const categories = [
  {
    icon: Stethoscope,
    label: 'RAWATAN UMUM',
    color: 'from-purple-700 to-purple-500',
    services: [
      {
        name: 'Perubatan Am',
        emoji: '🩺',
        desc: 'Rawatan penyakit biasa seperti demam, batuk, selsema, sakit kepala dan lain-lain.',
        for: 'Semua peringkat umur',
        benefits: ['Diagnosis cepat & tepat', 'Ubatan berkualiti', 'Kos berpatutan'],
      },
      {
        name: 'Penyakit Kulit',
        emoji: '🔬',
        desc: 'Rawatan ekzema, jerawat, kulat, alahan kulit dan penyakit kulit lainnya.',
        for: 'Kanak-kanak & dewasa',
        benefits: ['Rawatan topikal & oral', 'Rujukan pakar bila perlu', 'Pemantauan berterusan'],
      },
      {
        name: 'Ujian Air Gula',
        emoji: '🩸',
        desc: 'Pemeriksaan paras gula dalam darah untuk saringan dan pemantauan diabetes.',
        for: 'Dewasa 30 tahun ke atas',
        benefits: ['Keputusan cepat', 'Kaunseling diet', 'Pemantauan berkala'],
      },
    ],
  },
  {
    icon: Baby,
    label: 'IBU & ANAK',
    color: 'from-pink-600 to-purple-500',
    services: [
      {
        name: 'Pemeriksaan Mengandung',
        emoji: '🤰',
        desc: 'Pemantauan kehamilan yang komprehensif untuk ibu dan bayi yang sihat.',
        for: 'Ibu-ibu hamil',
        benefits: ['Ultrasound & scan', 'Pemeriksaan tekanan darah', 'Kaunseling pra-bersalin'],
      },
      {
        name: 'Vaksinasi',
        emoji: '💉',
        desc: 'Program vaksin lengkap mengikut jadual KKM dan vaksin tambahan.',
        for: 'Bayi, kanak-kanak & dewasa',
        benefits: ['Vaksin KKM & swasta', 'Rekod vaksin lengkap', 'Doktor berpengalaman'],
      },
      {
        name: 'Implanon',
        emoji: '🏥',
        desc: 'Perancang keluarga jangka panjang yang selamat dan berkesan.',
        for: 'Wanita dewasa',
        benefits: ['Perlindungan 3 tahun', 'Prosedur mudah', 'Boleh dibuang bila-bila masa'],
      },
    ],
  },
  {
    icon: FlaskConical,
    label: 'DIAGNOSTIK',
    color: 'from-blue-600 to-purple-600',
    services: [
      {
        name: 'Scan / Ultrasound',
        emoji: '📡',
        desc: 'Pemeriksaan ultrasound abdomen, kehamilan dan organ dalaman.',
        for: 'Ibu hamil & semua pesakit',
        benefits: ['Mesin moden', 'Keputusan segera', 'Doktor terlatih'],
      },
      {
        name: 'Mini Lab',
        emoji: '🧪',
        desc: 'Ujian darah, air kencing, kolesterol, gula dan pelbagai ujian makmal.',
        for: 'Semua pesakit',
        benefits: ['Keputusan dalam masa 30 minit', 'Pelbagai ujian tersedia', 'Harga kompetitif'],
      },
      {
        name: 'Saringan Alergi',
        emoji: '🌿',
        desc: 'Ujian saringan untuk mengenal pasti alergen penyebab alahan.',
        for: 'Pesakit alahan kronik',
        benefits: ['Ujian komprehensif', 'Laporan terperinci', 'Plan rawatan peribadi'],
      },
    ],
  },
]

function useInView(ref) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true)
    }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref])
  return inView
}

function ServiceModal({ service, onClose }) {
  if (!service) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-4xl max-w-lg w-full p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">{service.emoji}</div>
          <h3 className="text-2xl font-black text-purple-900">{service.name}</h3>
          <p className="text-sm text-purple-500 mt-1">Untuk: {service.for}</p>
        </div>
        <p className="text-gray-600 leading-relaxed mb-6">{service.desc}</p>
        <div className="mb-6">
          <h4 className="font-bold text-purple-900 mb-3">Kelebihan:</h4>
          <ul className="space-y-2">
            {service.benefits.map(b => (
              <li key={b} className="flex items-center gap-2 text-gray-600">
                <span className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
                {b}
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-6">
          <h4 className="font-bold text-purple-900 mb-3">Proses Mudah:</h4>
          <div className="flex gap-4">
            {['Daftar & Konsultasi', 'Pemeriksaan', 'Rawatan & Ubatan'].map((step, i) => (
              <div key={step} className="flex-1 text-center">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-800 to-purple-500 text-white rounded-2xl flex items-center justify-center font-bold mx-auto mb-2">{i + 1}</div>
                <p className="text-xs text-gray-600">{step}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-3">
          <a href="#contact" onClick={onClose} className="flex-1 btn-primary text-center text-sm py-3">Book Appointment</a>
          <a
            href="https://wa.me/60166914270?text=Hi%2C%20saya%20ingin%20tanya%20tentang%20perkhidmatan"
            target="_blank" rel="noopener noreferrer"
            className="flex-1 bg-green-500 hover:bg-green-400 text-white font-semibold px-4 py-3 rounded-2xl text-center text-sm transition-colors"
          >
            WhatsApp
          </a>
        </div>
        <button onClick={onClose} className="mt-4 w-full text-sm text-gray-400 hover:text-gray-600 transition-colors">Tutup</button>
      </div>
    </div>
  )
}

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref)
  const [selected, setSelected] = useState(null)

  return (
    <section id="services" className="py-28 bg-section-gradient overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-purple-500 font-semibold text-sm tracking-widest uppercase mb-4">Apa Yang Kami Tawarkan</p>
          <h2 className="section-title">Perkhidmatan <span className="text-gradient">Kami</span></h2>
          <p className="section-subtitle">Rawatan komprehensif untuk setiap peringkat kehidupan keluarga anda</p>
        </div>

        <div className="space-y-16">
          {categories.map((cat, ci) => {
            const Icon = cat.icon
            return (
              <div
                key={cat.label}
                className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${ci * 150}ms` }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 bg-gradient-to-br ${cat.color} rounded-2xl flex items-center justify-center`}>
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="text-xl font-black text-purple-900">{cat.label}</h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-purple-200 to-transparent" />
                </div>

                {/* Service Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {cat.services.map(svc => (
                    <button
                      key={svc.name}
                      onClick={() => setSelected(svc)}
                      className="text-left bg-white rounded-4xl p-6 border border-purple-100 card-hover shadow-sm hover:shadow-purple-200/50 hover:border-purple-300 group transition-all duration-300"
                    >
                      <div className="text-3xl mb-4">{svc.emoji}</div>
                      <h4 className="font-bold text-purple-900 text-lg mb-2 group-hover:text-purple-600 transition-colors">{svc.name}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">{svc.desc}</p>
                      <div className="flex items-center gap-2 text-purple-500 text-sm font-semibold group-hover:gap-3 transition-all">
                        Ketahui lebih lanjut <ArrowRight size={16} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <ServiceModal service={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
