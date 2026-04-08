import React from 'react'
import { Heart, Users, Award, Clock, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'

const stats = [
  { icon: Users, value: '5,000+', label: 'Pesakit Puas Hati' },
  { icon: Award, value: '15+', label: 'Tahun Pengalaman' },
  { icon: Heart, value: '2', label: 'Cawangan Puchong' },
  { icon: Clock, value: '7 Hari', label: 'Beroperasi Seminggu' },
]

const features = [
  'Doktor Bertauliah & Berpengalaman',
  'Peralatan Perubatan Moden',
  'Persekitaran Bersih & Selesa',
  'Waktu Operasi Fleksibel',
  'Menerima Panel Insurans Utama',
]

export default function About() {
  return (
    <section id="about" className="relative py-32 bg-white overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-neutral-50 -z-10" />
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-red-100/50 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* Left: Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-100 mb-6">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-red-600 font-bold text-xs tracking-widest uppercase">Tentang Kami</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-serif font-medium text-neutral-900 leading-[1.1] mb-8">
              Kesihatan Keluarga Anda, <br />
              <span className="italic text-red-600">Keutamaan Kami</span>
            </h2>

            <div className="space-y-6 text-neutral-500 text-lg leading-relaxed mb-12">
              <p>
                Klinik Dr Siti & Rakan-Rakan merupakan klinik swasta yang menyediakan rawatan menyeluruh untuk ibu, kanak-kanak dan keluarga.
              </p>
              <p>
                Dengan dua cawangan di Puchong, kami komited memberikan rawatan profesional, cepat dan selesa kepada setiap pesakit. Pasukan doktor kami yang berpengalaman bersedia membantu anda dan keluarga.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map(({ icon: Icon, value, label }, index) => (
                <motion.div 
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="group p-6 rounded-3xl bg-white border border-neutral-100 hover:border-red-200 hover:shadow-xl hover:shadow-red-500/5 transition-all duration-500"
                >
                  <div className="w-12 h-12 bg-neutral-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-red-500 group-hover:text-white transition-colors duration-500">
                    <Icon size={24} className="text-red-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="text-3xl font-bold text-neutral-900 mb-1">{value}</div>
                  <div className="text-sm text-neutral-400 font-medium uppercase tracking-wider">{label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Visual Composition */}
          <div className="relative">
            {/* Main Image Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/5]"
            >
              <img 
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800&h=1000" 
                alt="Suasana Klinik Profesional" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {/* Image Overlay Gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Floating Features Card */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute bottom-8 left-8 right-8 p-8 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl text-white"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-white rounded-2xl">
                    <img src="/logo.PNG" alt="Logo" className="h-8 w-8 object-contain" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl leading-none">KLINIK DR SITI</h3>
                    <p className="text-white/60 text-xs uppercase tracking-widest mt-1">& Rakan-Rakan</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {features.map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm font-medium">
                      <CheckCircle2 size={16} className="text-red-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

{/* Secondary Decorative Image */}
<motion.div 
  initial={{ opacity: 0, x: -50 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.8, duration: 0.8 }}
className="
  absolute 
  top-2 left-2 
  md:-top-10 md:-left-10 
  rounded-2xl 
  overflow-hidden 
  border-4 md:border-8 border-white 
  shadow-xl 
  z-20
  w-[140px] sm:w-[180px] md:w-[300px] lg:w-[420px] 
  aspect-[16/9]
"
>
  <img 
    src="staff.jpg" 
    alt="Konsultasi Doktor" 
    className="w-full h-full object-cover"
    referrerPolicy="no-referrer"
  />
</motion.div>

            {/* Experience Badge */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-600 rounded-full flex items-center justify-center z-20 shadow-2xl shadow-blue-500/40"
            >
              <div className="text-center text-white">
                <div className="text-3xl font-bold">10+</div>
                <div className="text-[10px] uppercase tracking-widest font-medium">Tahun<br/>Pengalaman</div>
              </div>
              {/* Circular Text (SVG path would be better but keeping it simple) */}
              <div className="absolute inset-2 border-2 border-white/20 border-dashed rounded-full" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
