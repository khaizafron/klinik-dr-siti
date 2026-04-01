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
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/40 backdrop-blur-md" 
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          className="bg-white rounded-[3rem] max-w-2xl w-full overflow-hidden shadow-2xl relative"
          onClick={e => e.stopPropagation()}
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/20 backdrop-blur-md hover:bg-white/40 text-white rounded-full flex items-center justify-center transition-all"
          >
            <X size={24} />
          </button>

          <div className="relative h-64">
            <img 
              src={service.image} 
              alt={service.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-linear-to-t from-white via-white/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-10">
              <h3 className="text-4xl font-black text-purple-900 tracking-tight">{service.name}</h3>
              <p className="text-purple-600 font-bold uppercase tracking-widest text-sm mt-2">Untuk: {service.for}</p>
            </div>
          </div>

          <div className="p-10 pt-4">
            <p className="text-neutral-500 text-lg leading-relaxed mb-8">{service.desc}</p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div>
                <h4 className="font-black text-purple-900 uppercase tracking-widest text-xs mb-4">Kelebihan Utama</h4>
                <ul className="space-y-3">
                  {service.benefits.map(b => (
                    <li key={b} className="flex items-start gap-3 text-neutral-600 font-medium">
                      <CheckCircle2 size={20} className="text-purple-500 shrink-0 mt-0.5" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-black text-purple-900 uppercase tracking-widest text-xs mb-4">Proses Rawatan</h4>
                <div className="space-y-4">
                  {['Pendaftaran & Konsultasi', 'Pemeriksaan Klinikal', 'Rawatan & Farmasi'].map((step, i) => (
                    <div key={step} className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center font-black text-sm">{i + 1}</div>
                      <p className="text-neutral-600 text-sm font-semibold">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a 
                href="https://klinikdrsiti.yezza.co/appointment" 
                onClick={onClose}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-5 rounded-2xl text-center flex items-center justify-center gap-2 shadow-lg shadow-purple-600/20 transition-all"
              >
                <Calendar size={20} />
                TEMPAH TEMUJANJI
              </motion.a>
              <motion.a
                href="https://wa.me/60166914270?text=Hi%2C%20saya%20ingin%20tanya%20tentang%20perkhidmatan"
                target="_blank" rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 py-5 rounded-2xl text-center flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
              >
                <MessageCircle size={20} />
                WHATSAPP KAMI
              </motion.a>
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
