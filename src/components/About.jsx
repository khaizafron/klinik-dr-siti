import React from 'react'
import { Heart, Users, Award, Clock, CheckCircle2, Eye, Target } from 'lucide-react'
import { motion } from 'framer-motion'
import FlowingMenu from './ui/FlowingMenu'

const stats = [
  { icon: Users, value: '5,000+', label: 'Pesakit' },
  { icon: Award, value: '15+', label: 'Tahun' },
  { icon: Heart, value: '2', label: 'Cawangan' },
  { icon: Clock, value: '7 Hari', label: 'Operasi' },
]

const flowingMenuItems = [
  { link: '#about', text: '5,000+ Pesakit Puas Hati', image: 'https://plus.unsplash.com/premium_photo-1675807264533-5e6db71ba3c4?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { link: '#about', text: '15+ Tahun Pengalaman', image: 'https://plus.unsplash.com/premium_photo-1667511010926-549af1b3499d?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { link: '#about', text: '2 Cawangan di Puchong', image: '/klinikdrsiti-desktop.PNG' },
  { link: '#about', text: '7 Hari Operasi Seminggu', image: 'https://images.unsplash.com/photo-1589554882513-691f8f071f72?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
];

const features = [
  'Doktor Bertauliah & Berpengalaman',
  'Peralatan Perubatan Moden',
  'Persekitaran Bersih & Selesa',
  'Waktu Operasi Fleksibel',
  'Menerima Panel Insurans Utama',
]

export default function About() {
  return (
    <section id="about" className="relative py-16 md:py-32 bg-white overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-neutral-50 -z-10 hidden md:block" />
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-red-100/50 rounded-full blur-3xl -z-10 opacity-50" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
          
          {/* Left: Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-100 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-red-600 font-bold text-[10px] tracking-widest uppercase">Tentang Kami</span>
            </div>

            <h2 className="text-3xl md:text-6xl font-serif font-medium text-neutral-900 leading-tight mb-6 md:mb-8">
              Kesihatan Keluarga Anda, <br className="hidden md:block" />
              <span className="italic text-red-600">Keutamaan Kami</span>
            </h2>

            <div className="space-y-4 md:space-y-6 text-neutral-500 text-base md:text-lg leading-relaxed mb-10 md:mb-12">
              <p>
                Klinik Dr Siti dan Rakan Rakan merupakan klinik swasta yang menyediakan rawatan menyeluruh untuk ibu, kanak-kanak dan keluarga.
              </p>
              <p>
                Dengan dua cawangan di Puchong, kami komited memberikan rawatan profesional, cepat dan selesa kepada setiap pesakit.
              </p>
            </div>

            {/* Vision & Mission - Mobile Optimized */}
            <div className="grid grid-cols-1 gap-4 mb-12">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-5 rounded-2xl bg-neutral-50 border border-neutral-100"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center text-white">
                    <Eye size={18} />
                  </div>
                  <h3 className="font-bold text-neutral-900 uppercase tracking-wider text-sm">Visi</h3>
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Klinik Dr Siti & Rakan-Rakan aims to be the most accessible and preferred community medical care, committed to holistic treatments and healthcare excellence.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="p-5 rounded-2xl bg-neutral-50 border border-neutral-100"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white">
                    <Target size={18} />
                  </div>
                  <h3 className="font-bold text-neutral-900 uppercase tracking-wider text-sm">Misi</h3>
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  To provide an affordable, comprehensive and high quality healthcare service to the communities we serve.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Visual Composition - Mobile Optimized */}
          <div className="relative mt-16 lg:mt-0 px-4 md:px-0">
            {/* Main Image Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative z-10 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] aspect-[4/5] max-w-md mx-auto lg:max-w-none border border-neutral-100"
            >
              <img 
                src="/permaiinside.jpg" 
                alt="Suasana Klinik Profesional" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              {/* Image Overlay Gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
              
              {/* Floating Features Card - Simplified for Mobile */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute bottom-4 left-4 right-12 md:bottom-8 md:left-8 md:right-8 p-5 md:p-8 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[1.5rem] md:rounded-[2rem] text-white"
              >
                <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                  <div className="p-2 md:p-3 bg-white rounded-xl shadow-lg">
                    <img src="/logo.webp" alt="Logo" className="h-6 w-6 md:h-8 md:w-8 object-contain" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm md:text-xl leading-none tracking-tight">Klinik Dr Siti dan Rakan Rakan</h3>
                    <p className="text-white/60 text-[8px] md:text-[10px] uppercase tracking-[0.2em] mt-1.5 font-medium">Healthcare Excellence</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-2.5 md:gap-3">
                  {features.slice(0, 3).map((item) => (
                    <div key={item} className="flex items-center gap-2.5 md:gap-3 text-[10px] md:text-sm font-medium">
                      <div className="w-4 h-4 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
                        <CheckCircle2 size={10} className="text-red-400 shrink-0" />
                      </div>
                      <span className="opacity-90 leading-tight">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Secondary Decorative Image - Refined for Mobile */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="absolute -top-4 -left-2 md:-top-12 md:-left-12 rounded-2xl md:rounded-[2rem] overflow-hidden border-4 md:border-[12px] border-white shadow-2xl z-20 w-[160px] md:w-[320px] lg:w-[450px] aspect-[16/9]"
            >
              <img 
                src="/staff.jpg" 
                alt="Konsultasi Doktor" 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Experience Badge - Premium Seal Style at Bottom Right */}
            <motion.div 
              animate={{ rotateZ: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-8 -right-4 md:-bottom-12 md:-right-12 w-28 h-28 md:w-48 md:h-48 bg-white rounded-full flex items-center justify-center z-30 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-[6px] md:border-[12px] border-red-50"
            >
              <div className="text-center">
                <div className="text-2xl md:text-5xl font-black text-red-600 leading-none tracking-tighter">15+</div>
                <div className="text-[8px] md:text-[12px] uppercase tracking-[0.2em] font-bold text-neutral-400 mt-1.5 leading-tight">Tahun<br/>Pengalaman</div>
              </div>
              <div className="absolute inset-1.5 md:inset-3 border-2 border-red-100 border-dashed rounded-full" />
            </motion.div>
          </div>

        </div>
      </div>

      {/* Stats Section - Flowing Menu Integration (Full Width at Bottom) */}
      <div className="mt-20 border-y border-neutral-100 overflow-hidden w-full bg-neutral-50/30">
        <div className="h-[400px] md:h-[500px] relative">
          <FlowingMenu 
            items={flowingMenuItems} 
            bgColor="transparent"
            textColor="#171717"
            marqueeBgColor="#dc2626"
            marqueeTextColor="#ffffff"
            borderColor="#e5e5e5"
            speed={20}
          />
        </div>
      </div>
    </section>
  )
}
