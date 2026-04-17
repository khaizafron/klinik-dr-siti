import React from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, Briefcase, Star, Award, MapPin, CheckCircle2 } from 'lucide-react'

const doctors = [
  {
    name: 'Dr Sumaya Bibi bt Md Ali',
    qualification: 'MBBS (IMU), Diploma In Microbiology (UiTM) | MMC 38615',
    specialty: 'Women Health, Antenatal Care, Child Health, Ultrasound',
    experience: '24 Tahun',
    avatar: '/drsumaiya.JPG',
    branch: 'Medical Director',
    tags: ['Women Health', 'Antenatal', 'Ultrasound']
  },
  {
    name: 'Dr Nursalia Hanum Binti Md Sidek',
    qualification: 'MBBS (UniKL RCMP) | MMC 80081',
    specialty: 'Antenatal Care, Women Health, Ultrasound',
    experience: '10 Tahun',
    avatar: '/drsalia.PNG',
    branch: 'General Practitioner',
    tags: ['Women Health', 'Ultrasound']
  },
]

export default function Doctors() {
  return (
    <section id="doctors" className="py-32 bg-neutral-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-red-600 font-bold text-xs tracking-[0.3em] uppercase mb-4">Pakar Perubatan</p>
          <h2 className="text-4xl md:text-5xl font-black text-blue-900 leading-tight mb-6">
            Pasukan Doktor <br className="md:hidden" />
            <span className="text-red-600">Berpengalaman</span>
          </h2>
          <p className="text-neutral-500 text-lg max-w-2xl mx-auto">
            Kenali barisan doktor bertauliah kami yang komited dalam memberikan rawatan terbaik untuk kesihatan anda sekeluarga.
          </p>
        </motion.div>

        {/* DOCTORS GRID */}
        <div className="grid sm:grid-cols-2 gap-8 lg:gap-12">
          {doctors.map((doc, i) => (
            <motion.div
              key={doc.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative h-[500px] md:h-[600px] rounded-[3rem] overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-red-900/20 transition-all duration-700"
            >
              {/* FULL IMAGE */}
              <img 
                src={doc.avatar} 
                alt={doc.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                loading="lazy"
              />

              {/* GRADIENT OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-500" />

              {/* VERIFIED BADGE */}
              <div className="absolute top-6 right-6 w-12 h-12 bg-emerald-500 rounded-2xl border-4 border-white/20 backdrop-blur-md flex items-center justify-center shadow-lg z-20">
                <CheckCircle2 size={24} className="text-white" />
              </div>

              {/* INFO OVERLAY */}
              <div className="absolute bottom-0 left-0 right-0 p-5 pb-16 md:p-7 md:pb-20 lg:p-10 lg:pb-24 z-10">
                <div className="space-y-2 md:space-y-3 lg:space-y-4">
                  <div>
                    <h3 className="font-black text-white text-xl md:text-2xl lg:text-3xl mb-1 md:mb-2 tracking-tight">
                      {doc.name}
                    </h3>
                    
                    <div className="flex items-center gap-2">
                      <GraduationCap size={14} className="text-red-400 md:size-4 lg:size-5" />
                      <p className="text-[10px] md:text-[11px] lg:text-xs text-white/70 font-bold uppercase tracking-wider">
                        {doc.qualification}
                      </p>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-red-600 text-white rounded-xl text-[10px] md:text-[11px] lg:text-xs font-black border border-red-500/50 shadow-lg shadow-red-900/20">
                    <img src="/logo.PNG" alt="Logo" className="w-3 h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 object-contain brightness-0 invert" />
                    {doc.specialty}
                  </div>

                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {doc.tags.map(tag => (
                      <span key={tag} className="text-[9px] md:text-[10px] font-bold text-white/60 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-1 md:pt-1 lg:pt-1 border-t border-white/10 flex items-center justify-center">
                    <div className="flex items-center gap-4 md:gap-6">
                      <div className="text-center">
                        <p className="text-2xl md:text-3xl font-black text-white leading-none tracking-tighter">
                          {doc.experience.split(' ')[0]}
                        </p>
                        <p className="text-[8px] md:text-[9px] text-white/40 font-bold uppercase tracking-widest mt-1">Tahun</p>
                      </div>
                      <div className="w-px h-8 bg-white/10" />
                      <div className="text-left">
                        <p className="text-[10px] md:text-[11px] text-white/60 font-black uppercase leading-tight tracking-wider">
                          Pengalaman<br/>Berdedikasi
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ROLE BANNER */}
              <div className="absolute bottom-0 left-0 right-0 bg-red-600 py-3 text-center z-20 shadow-[0_-10px_20px_rgba(220,38,38,0.2)]">
                <p className="text-white font-black text-[10px] tracking-[0.3em] uppercase">
                  {doc.branch}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 🔥 MANAGER SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 flex justify-center"
        >
          <div className="group relative h-[500px] w-full max-w-md rounded-[3rem] overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-700">
            {/* FULL IMAGE */}
            <img 
              src="/mohiyedin.PNG" 
              alt="Mohiyedin" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />

            {/* GRADIENT OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

            {/* INFO OVERLAY */}
            <div className="absolute bottom-0 left-0 right-0 p-8 pb-20 text-center z-10">
              <h3 className="text-1xl font-black text-white mb-2">
                Mohiyedin Bin Muhammad Syaiful Nizam
              </h3>

              <p className="text-sm text-white/70 font-bold mb-1">
                Bachelor of Business Management
              </p>

              <p className="text-xs text-white/50 mb-6">
                SEGi College Subang Jaya
              </p>

              <div className="pt-1 border-t border-white/10 flex items-center justify-center">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="text-center">
                    <p className="text-sm md:text-1xl font-black text-white leading-none tracking-tighter">
                      100%
                    </p>
                    <p className="text-[8px] md:text-[9px] text-white/40 font-bold uppercase tracking-widest mt-1">Komitmen</p>
                  </div>
                  <div className="w-px h-8 bg-white/10" />
                  <div className="text-left">
                    <p className="text-sm md:text-[11px] text-white/60 font-black uppercase leading-tight tracking-wider">
                      Pengurusan<br/>Operasi
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ROLE BANNER */}
            <div className="absolute bottom-0 left-0 right-0 bg-blue-600 py-5 text-center z-20 shadow-[0_-10px_20px_rgba(37,99,235,0.2)]">
              <p className="text-white font-black text-sm tracking-[0.4em] uppercase">
                CLINIC MANAGER
              </p>
            </div>
          </div>
        </motion.div>

        {/* 🔥 HUBUNGI KAMI SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 flex flex-col md:flex-row items-center justify-between gap-8 p-10 bg-white rounded-[3rem] border border-neutral-100 shadow-xl shadow-red-900/5 relative overflow-hidden group"
        >
          {/* Decorative background circles */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-50 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-50 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-700" />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-16 h-16 rounded-2xl border-4 border-white bg-neutral-100 flex items-center justify-center overflow-hidden shadow-lg rotate-3 hover:rotate-0 transition-transform duration-300">
                  <img 
                    src={`https://ui-avatars.com/api/?background=random&size=128&name=Doctor+${i}`} 
                    alt="doc" 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            
            <div>
              <h4 className="text-blue-900 font-black text-2xl md:text-3xl mb-2 tracking-tight">Sedia Berkhidmat Untuk Anda</h4>
              <p className="text-neutral-500 text-sm md:text-base max-w-md">Pasukan kami sentiasa bersedia memberikan konsultasi perubatan terbaik untuk kesihatan optimum anda.</p>
            </div>
          </div>

          <motion.a 
            href="#contact"
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            className="relative z-10 bg-red-600 text-white px-10 py-5 rounded-2xl font-black text-sm tracking-[0.2em] shadow-2xl shadow-red-600/30 hover:bg-red-700 transition-all flex items-center gap-3 group/btn"
          >
            HUBUNGI KAMI
            <Award size={18} className="group-hover/btn:rotate-12 transition-transform" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}