import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, Tag, ArrowRight, Sparkles, Clock, Percent } from 'lucide-react'
import BorderGlow from '../components/ui/BorderGlow'

const WHATSAPP = "601136043101"

const promos = [
  {
    title: 'Pakej Pemeriksaan Lengkap',
    subtitle: 'Full Body Check-Up',
    price: '180',
    originalPrice: '350',
    range: 'RM180 - RM350',
    tag: 'HOT DEAL',
    color: 'from-red-600 via-blue-500 to-red-700',
    desc: 'Ujian darah lengkap, ECG, ultrasound abdomen & konsultasi doktor.',
    expiry: '31 Mei 2026',
    icon: Sparkles
  },
  {
    title: 'Pakej Ibu Hamil',
    subtitle: 'Antenatal Package',
    price: '250',
    originalPrice: '450',
    range: 'RM250 - RM450',
    tag: 'MOM\'S SPECIAL',
    color: 'from-blue-500 via-red-500 to-blue-700',
    desc: '5 kali pemeriksaan + ultrasound + ujian darah lengkap.',
    expiry: 'Pakej Bulanan',
    icon: Calendar
  },
  {
    title: 'Vaksin Kanak-Kanak',
    subtitle: 'Childhood Immunization',
    price: '80',
    originalPrice: '120',
    range: 'RM80 - RM120',
    tag: 'KIDS CARE',
    color: 'from-blue-400 via-red-400 to-blue-600',
    desc: 'Vaksin swasta pilihan termasuk rotavirus & pneumococcal.',
    expiry: 'Tawaran Berterusan',
    icon: Tag
  },
  {
    title: 'Saringan Diabetes',
    subtitle: 'Diabetes Screening',
    price: '30',
    originalPrice: '60',
    range: 'RM30 - RM60',
    tag: 'QUICK CHECK',
    color: 'from-red-500 via-blue-500 to-red-700',
    desc: 'HbA1c + gula darah puasa + kaunseling diet percuma.',
    expiry: 'Setiap Sabtu',
    icon: Clock
  },
]

export default function Promotions() {
  return (
    <section id="promotions" className="py-32 bg-neutral-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2  text-red-700 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            
            Tawaran Terhad
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-blue-900 leading-tight mb-6">
            Promosi & <br className="md:hidden" />
            <span className="text-red-600">Pakej Kesihatan</span>
          </h2>

          <p className="text-neutral-500 text-lg max-w-2xl mx-auto">
            Nikmati rawatan berkualiti tinggi dengan harga istimewa. Kami komited memberikan nilai terbaik untuk kesihatan anda.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {promos.map((promo, i) => {
            const Icon = promo.icon

            const waLink = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
              `Hi, saya berminat dengan ${promo.title} (${promo.range})`
            )}`

            return (
              <BorderGlow
                key={promo.title}
                borderRadius={40}
                glowColor="220 100 60"
                backgroundColor="#ffffff"
                glowRadius={100}
                glowIntensity={100}
                animated={true}
                colors={['#1814f5', '#3b82f6']}
                className="h-full overflow-visible"
              >

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group relative flex flex-col h-full rounded-[2.5rem] overflow-hidden"
                >

                  {/* TOP */}
                  <div className={`relative bg-gradient-to-br ${promo.color} p-8`}>
                    
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                    <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-black/10 rounded-full blur-xl" />
                    
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-6">
                        <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-black px-3 py-1 rounded-lg border border-white/20 tracking-widest">
                          {promo.tag}
                        </span>
                        <Icon size={20} className="text-white/60" />
                      </div>
                      
                      <h3 className="text-white font-black text-xl mb-1">
                        {promo.title}
                      </h3>

                      <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-4">
                        {promo.subtitle}
                      </p>

                      {/* RANGE ONLY */}
                      <div className="text-white text-3xl font-black">
                        {promo.range}
                      </div>
                    </div>
                  </div>

                  {/* DIVIDER */}
                  <div className="relative h-6 bg-white flex items-center justify-between">
                    <div className="absolute left-0 w-3 h-6 bg-neutral-50 rounded-r-full" />
                    <div className="w-full border-t-2 border-dashed border-neutral-100 mx-4" />
                    <div className="absolute right-0 w-3 h-6 bg-neutral-50 rounded-l-full" />
                  </div>

                  {/* BOTTOM */}
                  <div className="bg-white p-8 flex flex-col flex-1 transition-all duration-500">
                    
                    <p className="text-neutral-500 text-sm mb-8 flex-1">
                      {promo.desc}
                    </p>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-neutral-50">
                      
                      <div className="flex items-center gap-2 text-red-600">
                        <Clock size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">
                          {promo.expiry}
                        </span>
                      </div>

                      <motion.a 
                        href={waLink}
                        target="_blank"
                        whileHover={{ x: 3 }}
                        className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300"
                      >
                        <ArrowRight size={18} />
                      </motion.a>

                    </div>
                  </div>

                </motion.div>
              </BorderGlow>
            )
          })}
        </div>

        {/* Bottom Banner (JANGAN DELETE) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-20 p-1 bg-gradient-to-r from-red-600 via-blue-500 to-red-600 rounded-[3rem] shadow-2xl shadow-red-600/20"
        >
          <div className="bg-white rounded-[2.9rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h4 className="text-2xl md:text-3xl font-black text-blue-900 mb-2">Inginkan Pakej Khas?</h4>
              <p className="text-neutral-500 font-medium">Hubungi kami untuk konsultasi dan pakej yang disesuaikan mengikut keperluan anda.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <motion.a 
                href="https://wa.me/601136043101"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-xs tracking-[0.2em] shadow-lg shadow-blue-600/20 text-center"
              >
                WHATSAPP SEKARANG
              </motion.a>
              <motion.a 
                href="#services"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="bg-red-600 text-white px-10 py-5 rounded-2xl font-black text-xs tracking-[0.2em] shadow-lg shadow-red-600/20 text-center"
              >
                LIHAT SEMUA PAKEJ
              </motion.a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}