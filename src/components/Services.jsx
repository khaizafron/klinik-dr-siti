import React, { useState } from 'react'
import { ArrowRight, Stethoscope, Baby, FlaskConical, X, CheckCircle2, MessageCircle, Calendar } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const categories = [
  {
    icon: Stethoscope,
    label: 'RAWATAN UMUM',
    color: 'from-purple-700 to-purple-500',
    services: [
      {
        name: 'Perubatan Am',
        image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=800',
        desc: 'Rawatan penyakit biasa seperti demam, batuk, selsema, sakit kepala dan lain-lain.',
        for: 'Semua peringkat umur',
        benefits: ['Diagnosis cepat & tepat', 'Ubatan berkualiti', 'Kos berpatutan'],
      },
      {
        name: 'Penyakit Kulit',
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800',
        desc: 'Rawatan ekzema, jerawat, kulat, alahan kulit dan penyakit kulit lainnya.',
        for: 'Kanak-kanak & dewasa',
        benefits: ['Rawatan topikal & oral', 'Rujukan pakar bila perlu', 'Pemantauan berterusan'],
      },
      {
        name: 'Ujian Air Gula',
        image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800',
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
        image: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&q=80&w=800',
        desc: 'Pemantauan kehamilan yang komprehensif untuk ibu dan bayi yang sihat.',
        for: 'Ibu-ibu hamil',
        benefits: ['Ultrasound & scan', 'Pemeriksaan tekanan darah', 'Kaunseling pra-bersalin'],
      },
      {
        name: 'Vaksinasi',
        image: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&q=80&w=800',
        desc: 'Program vaksin lengkap mengikut jadual KKM dan vaksin tambahan.',
        for: 'Bayi, kanak-kanak & dewasa',
        benefits: ['Vaksin KKM & swasta', 'Rekod vaksin lengkap', 'Doktor berpengalaman'],
      },
      {
        name: 'Implanon',
        image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800',
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
        image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
        desc: 'Pemeriksaan ultrasound abdomen, kehamilan dan organ dalaman.',
        for: 'Ibu hamil & semua pesakit',
        benefits: ['Mesin moden', 'Keputusan segera', 'Doktor terlatih'],
      },
      {
        name: 'Mini Lab',
        image: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80&w=800',
        desc: 'Ujian darah, air kencing, kolesterol, gula dan pelbagai ujian makmal.',
        for: 'Semua pesakit',
        benefits: ['Keputusan dalam masa 30 minit', 'Pelbagai ujian tersedia', 'Harga kompetitif'],
      },
      {
        name: 'Saringan Alergi',
        image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=800',
        desc: 'Ujian saringan untuk mengenal pasti alergen penyebab alahan.',
        for: 'Pesakit alahan kronik',
        benefits: ['Ujian komprehensif', 'Laporan terperinci', 'Plan rawatan peribadi'],
      },
    ],
  },
]

function ServiceModal({ service, onClose }) {
  if (!service) return null

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}

        className="
          fixed inset-0 z-50 
          flex items-start justify-center 
          pt-28 md:pt-32 px-4
          bg-purple-950/50 backdrop-blur-lg
        "

        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 30, opacity: 0 }}

          className="
            bg-white rounded-[2rem] 
            w-full max-w-2xl
            shadow-2xl 
            overflow-hidden
          "

          onClick={(e) => e.stopPropagation()}
        >

          {/* CLOSE */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 bg-black/20 hover:bg-black/40 text-white rounded-full flex items-center justify-center"
          >
            <X size={18} />
          </button>

          {/* IMAGE */}
          <div className="relative h-40 md:h-48">
            <img 
              src={service.image} 
              alt={service.name}
              className="w-full h-full object-cover"
            />

            {/* WHITE FADE */}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent" />

            <div className="absolute bottom-0 left-0 p-5 md:p-6">
              <h3 className="text-2xl md:text-4xl font-black text-purple-900 leading-tight">
                {service.name}
              </h3>
              <p className="text-purple-600 font-bold uppercase tracking-widest text-xs md:text-sm mt-1">
                Untuk: {service.for}
              </p>
            </div>
          </div>

          {/* CONTENT */}
          <div className="px-5 md:px-6 py-4">

            <p className="text-neutral-500 text-sm md:text-base leading-relaxed leading-relaxed mb-5">
              {service.desc}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">

              {/* BENEFITS */}
              <div>
                <h4 className="font-black text-purple-900 uppercase tracking-widest text-xs md:text-sm mb-2">
                  Kelebihan
                </h4>

                <ul className="space-y-1.5">
                  {service.benefits.map((b) => (
                    <li key={b} className="flex gap-2 text-neutral-600 text-sm md:text-base font-medium">
                      <CheckCircle2 size={14} className="text-purple-500 mt-[2px]" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* STEPS */}
              <div>
                <h4 className="font-black text-purple-900 uppercase tracking-widest text-xs md:text-sm mb-2">
                  Proses
                </h4>

                <div className="space-y-2">
                  {['Pendaftaran', 'Pemeriksaan', 'Rawatan'].map((step, i) => (
                    <div key={step} className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-md flex items-center justify-center text-[10px] font-black">
                        {i + 1}
                      </div>
                      <p className="text-neutral-600 text-sm md:text-base font-semibold">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* CTA */}
            <div className="flex gap-3">
              <a 
                href="https://klinikdrsiti.yezza.co/appointment"
                className="flex-1 bg-purple-600 text-white text-xs font-bold py-3 rounded-xl flex items-center justify-center gap-2"
              >
                <Calendar size={14} />
                TEMPAH
              </a>

              <a
                href="https://wa.me/60166914270"
                target="_blank"
                className="flex-1 bg-emerald-500 text-white text-xs font-bold py-3 rounded-xl flex items-center justify-center gap-2"
              >
                <MessageCircle size={14} />
                WHATSAPP
              </a>
            </div>

          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function Services() {
  const [selected, setSelected] = useState(null)

  return (
    <section id="services" className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <p className="text-purple-600 font-bold text-xs tracking-[0.3em] uppercase mb-4">Kepakaran Kami</p>
          <h2 className="text-4xl md:text-6xl font-black text-purple-900 leading-tight mb-6">
            Perkhidmatan <br className="md:hidden" />
            <span className="text-purple-600">Komprehensif</span>
          </h2>
          <p className="text-neutral-500 text-lg max-w-2xl mx-auto">
            Kami menyediakan pelbagai rawatan perubatan moden yang direka khas untuk memastikan kesihatan optimum bagi setiap ahli keluarga anda.
          </p>
        </motion.div>

        <div className="space-y-24">
          {categories.map((cat, ci) => {
            const Icon = cat.icon
            return (
              <div key={cat.label}>
                {/* Category Header */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-6 mb-10"
                >
                  <div className={`w-16 h-16 bg-linear-to-br ${cat.color} rounded-3xl flex items-center justify-center shadow-xl shadow-purple-900/10`}>
                    <Icon size={28} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-purple-900 tracking-tight">{cat.label}</h3>
                    <div className="h-1 w-12 bg-purple-200 rounded-full mt-1" />
                  </div>
                </motion.div>

                {/* Service Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {cat.services.map((svc, index) => (
                    <motion.button
                      key={svc.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setSelected(svc)}
                      className="group text-left bg-neutral-50 rounded-[2.5rem] overflow-hidden border border-neutral-100 hover:border-purple-200 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-purple-900/5 flex flex-col h-full"
                    >
                      <div className="relative h-56 overflow-hidden">
                        <img 
                          src={svc.image} 
                          alt={svc.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-neutral-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                      
                      <div className="p-8 flex flex-col flex-1">
                        <h4 className="font-black text-purple-900 text-xl mb-3 group-hover:text-purple-600 transition-colors tracking-tight">{svc.name}</h4>
                        <p className="text-neutral-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">{svc.desc}</p>
                        
                        <div className="flex items-center justify-between mt-auto pt-6 border-t border-neutral-200/60">
                          <span className="text-purple-600 text-xs font-black uppercase tracking-widest">Lihat Butiran</span>
                          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-purple-600 shadow-sm group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                            <ArrowRight size={18} />
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
