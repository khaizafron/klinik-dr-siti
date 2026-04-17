import React from 'react'
import { Play, ShieldCheck, Award, FlaskConical, Pill, Handshake, Home } from 'lucide-react'
import { motion } from 'framer-motion'

const trustBadges = [
  { 
    icon: ShieldCheck, 
    title: 'Klinik Berlesen', 
    desc: 'Berdaftar dengan KKM',
    img: 'kkm.JPG'
  },
  { 
    icon: Award, 
    title: 'Doktor Bertauliah', 
    desc: 'MMC registered',
    img: 'https://images.unsplash.com/photo-1685022036532-ea7e3b114578?q=80&w=327&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  { 
    icon: FlaskConical, 
    title: 'Makmal In-house', 
    desc: 'Keputusan pantas',
    img: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=600&h=800'
  },
  { 
    icon: Pill, 
    title: 'Ubatan Berkualiti', 
    desc: 'Farmasi berlesen',
    img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600&h=800'
  },
  { 
    icon: Handshake, 
    title: 'Staf Mesra', 
    desc: 'Pelayanan terbaik',
    img: 'staffutama.jpg'
  },
   { 
    icon: Home, 
    title: 'Tempat Selesa', 
    desc: 'Bilik pemeriksaan modern',
    img: 'bilik-scan-permai.jpg'
  },
]

export default function Trust() {
  const [isPlaying, setIsPlaying] = React.useState(false)

  return (
    <section id="trust" className="relative py-32 bg-neutral-50 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }} />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-red-600 font-bold text-xs tracking-[0.3em] uppercase mb-4">Kepercayaan Komuniti</p>
          <h2 className="text-4xl md:text-6xl font-black text-blue-900 leading-tight mb-6">
            Dipercayai Oleh<br />
            <span className="text-red-600">Komuniti Setempat</span>
          </h2>
          <p className="text-neutral-500 text-lg max-w-2xl mx-auto">
            Bergabung bersama ribuan keluarga di Puchong yang mempercayai penjagaan kesihatan kami untuk generasi masa kini dan akan datang.
          </p>
        </motion.div>

        {/* Video Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative max-w-5xl mx-auto rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl shadow-blue-900/20 group"
        >
          <div className="relative aspect-video bg-neutral-900 overflow-hidden">
            {!isPlaying ? (
              <div 
                className="absolute inset-0 w-full h-full cursor-pointer group"
                onClick={() => setIsPlaying(true)}
              >
                {/* Custom Thumbnail Image */}
                <img 
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200" 
                  alt="Klinik Dr Siti Thumbnail" 
                  className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-blue-950/80 via-transparent to-transparent" />

                {/* Play Button UI */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 md:p-6">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-16 h-16 md:w-24 md:h-24 bg-white/10 backdrop-blur-xl border border-white/30 rounded-full flex items-center justify-center mb-4 md:mb-8 shadow-2xl relative"
                  >
                    <Play size={24} className="text-white fill-white ml-1 md:size-32" />
                    <div className="absolute -inset-2 md:-inset-4 border border-white/20 rounded-full animate-ping opacity-20" />
                  </motion.div>
                  <h3 className="text-white text-xl md:text-4xl font-bold mb-1 md:mb-2 tracking-tight drop-shadow-lg">Kenali Klinik Kami</h3>
                  <p className="text-blue-200 text-xs md:text-lg font-light tracking-wide drop-shadow-md">Lawatan Maya & Pengenalan Doktor</p>
                </div>

                {/* Logo Watermark */}
                <img src="/logo.PNG" alt="" className="absolute bottom-4 right-4 md:bottom-8 md:right-8 h-10 w-10 md:h-20 md:w-20 object-contain opacity-30 brightness-0 invert" referrerPolicy="no-referrer" />
              </div>
            ) : (
              <iframe 
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/rl2xsVe8cNw?autoplay=1&rel=0" 
                title="Kenali Klinik Kami" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            )}
          </div>

          {/* Video Bottom Bar */}
          <div className="bg-neutral-900 px-6 py-4 md:px-10 md:py-8 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6 border-t border-white/10">
            <div className="flex items-center gap-3 md:gap-4 text-center md:text-left">
              <div className="hidden md:block w-1 h-12 bg-red-500 rounded-full" />
              <div>
                <p className="text-white font-bold text-[10px] min-[375px]:text-[12px] sm:text-sm md:text-xl leading-tight whitespace-nowrap min-w-max">"Dipercayai oleh komuniti setempat"</p>
                <p className="text-red-400/80 text-[8px] md:text-sm uppercase tracking-widest font-medium mt-0.5">Klinik Dr Siti & Rakan-Rakan, Puchong</p>
              </div>
            </div>
            <motion.a
              href="#contact"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full md:w-auto bg-white text-black font-bold px-6 py-2.5 md:px-8 md:py-4 rounded-xl md:rounded-2xl hover:bg-neutral-200 transition-all text-[10px] md:text-sm tracking-tighter text-center"
            >
              BUAT TEMUJANJI SEKARANG
            </motion.a>
          </div>
        </motion.div>

        {/* Trust Badges Grid */}
        <div className="grid grid-cols-2 gap-4 md:gap-10 mt-12 md:mt-20 lg:flex lg:flex-wrap lg:justify-center lg:gap-12">
  {trustBadges.map((item, index) => (
    <motion.div 
      key={item.title}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative group aspect-square lg:aspect-auto lg:h-80 lg:w-[22%] rounded-[1.5rem] lg:rounded-[2.5rem] overflow-hidden shadow-xl border border-white/10"
    >
      {/* Background Image */}
      <img 
        src={item.img} 
        alt={item.title} 
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        referrerPolicy="no-referrer"
      />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

      {/* Content */}
      <div className="absolute inset-0 p-4 md:p-8 flex flex-col justify-end items-center text-center">
        
        {/* ICON */}
        <div className="w-10 h-10 md:w-14 md:h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl md:rounded-2xl flex items-center justify-center mb-2 md:mb-4 group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-500">
          <item.icon size={20} className="text-white md:size-28" />
        </div>

        {/* 🔥 TITLE (INI YANG BERUBAH WARNA) */}
        <h4 className="text-sm md:text-xl font-bold text-white mb-1 md:mb-2 tracking-tight transition-colors duration-300 group-hover:text-blue-900">
          {item.title}
        </h4>

        {/* DESC */}
        <p className="text-white/60 text-[8px] md:text-sm font-medium uppercase tracking-widest group-hover:text-blue-600 transition-colors duration-300">
          {item.desc}
        </p>

      </div>
    </motion.div>
  ))}
</div>
      </div>
    </section>
  )
}
