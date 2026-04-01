import React from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, Briefcase, Star, Award, MapPin, CheckCircle2 } from 'lucide-react'

const doctors = [
  {
    name: 'Dr. Siti Nurfaizah',
    qualification: 'MBBS (UM), MMed Family Medicine',
    specialty: 'Perubatan Keluarga & Ibu Hamil',
    experience: '12 Tahun',
    avatar: 'https://ui-avatars.com/api/?name=Siti+Nurfaizah&background=6B21A8&color=fff&size=256&bold=true',
    branch: 'Puchong Permai',
    tags: ['Pakar Perubatan', 'Ibu & Anak']
  },
  {
    name: 'Dr. Ahmad Faris',
    qualification: 'MBBS (UKM), Dip. Obstetrics',
    specialty: 'Kesihatan Kanak-kanak & Vaksinasi',
    experience: '9 Tahun',
    avatar: 'https://ui-avatars.com/api/?name=Ahmad+Faris&background=4C1D95&color=fff&size=256&bold=true',
    branch: 'Puchong Utama',
    tags: ['Pediatrik', 'Vaksinasi']
  },
  {
    name: 'Dr. Nurul Ain',
    qualification: 'MBBS (IIUM), Dip. Dermatology',
    specialty: 'Penyakit Kulit & Estetika',
    experience: '7 Tahun',
    avatar: 'https://ui-avatars.com/api/?name=Nurul+Ain&background=7E22CE&color=fff&size=256&bold=true',
    branch: 'Puchong Permai',
    tags: ['Dermatologi', 'Estetika']
  },
  {
    name: 'Dr. Rizwan Hakim',
    qualification: 'MBBS (UM), MMed Internal Medicine',
    specialty: 'Perubatan Am & Diagnostik',
    experience: '10 Tahun',
    avatar: 'https://ui-avatars.com/api/?name=Rizwan+Hakim&background=581C87&color=fff&size=256&bold=true',
    branch: 'Puchong Utama',
    tags: ['Diagnostik', 'Kesihatan Am']
  },
]

export default function Doctors() {
  return (
    <section id="doctors" className="py-32 bg-neutral-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-purple-600 font-bold text-xs tracking-[0.3em] uppercase mb-4">Pakar Perubatan</p>
          <h2 className="text-4xl md:text-5xl font-black text-purple-900 leading-tight mb-6">
            Pasukan Doktor <br className="md:hidden" />
            <span className="text-purple-600">Berpengalaman</span>
          </h2>
          <p className="text-neutral-500 text-lg max-w-2xl mx-auto">
            Kenali barisan doktor bertauliah kami yang komited dalam memberikan rawatan terbaik untuk kesihatan anda sekeluarga.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctors.map((doc, i) => (
            <motion.div
              key={doc.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-[3rem] p-8 text-center border border-neutral-100 shadow-sm hover:shadow-2xl hover:shadow-purple-900/10 transition-all duration-500 relative overflow-hidden"
            >
              {/* Decorative Background Element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />

              {/* Avatar Container */}
              <div className="relative mb-8 inline-block">
                <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden shadow-xl shadow-purple-900/10 border-4 border-white group-hover:rotate-3 transition-transform duration-500">
                  <img 
                    src={doc.avatar} 
                    alt={doc.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 rounded-2xl border-4 border-white flex items-center justify-center shadow-lg">
                  <CheckCircle2 size={18} className="text-white" />
                </div>
              </div>

              {/* Info */}
              <div className="relative z-10">
                <h3 className="font-black text-purple-900 text-xl mb-2 group-hover:text-purple-600 transition-colors tracking-tight">
                  {doc.name}
                </h3>
                
                <div className="flex items-center justify-center gap-2 mb-4">
                  <GraduationCap size={14} className="text-purple-400" />
                  <p className="text-[11px] text-neutral-400 font-bold uppercase tracking-wider leading-tight">
                    {doc.qualification}
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-xl text-xs font-black mb-6 border border-purple-100">
                  <Star size={12} className="fill-purple-700" />
                  {doc.specialty}
                </div>

                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  {doc.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold text-neutral-400 bg-neutral-50 px-2 py-1 rounded-md border border-neutral-100">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-neutral-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-neutral-50 rounded-lg flex items-center justify-center text-purple-500">
                      <Briefcase size={14} />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] text-neutral-400 font-bold uppercase leading-none mb-1">Pengalaman</p>
                      <p className="text-xs font-black text-purple-900">{doc.experience}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-1 justify-end text-purple-600 mb-1">
                      <MapPin size={12} />
                      <span className="text-[10px] font-black uppercase tracking-tighter">Cawangan</span>
                    </div>
                    <p className="text-[11px] font-bold text-neutral-500">{doc.branch}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 flex flex-col md:flex-row items-center justify-center gap-6 p-8 bg-white rounded-[2.5rem] border border-neutral-100 shadow-sm"
        >
          <div className="flex -space-x-4">
            {[1,2,3,4].map(i => (
              <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-purple-100 flex items-center justify-center overflow-hidden">
                <img src={`https://ui-avatars.com/api/?background=random&size=128&name=Doctor+${i}`} alt="doc" />
              </div>
            ))}
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-purple-900 font-black text-lg">Sedia Berkhidmat Untuk Anda</h4>
            <p className="text-neutral-500 text-sm">Pasukan kami sentiasa bersedia memberikan konsultasi perubatan terbaik.</p>
          </div>
          <motion.a 
            href="https://klinikdrsiti.yezza.co/appointment"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-purple-600 text-white px-8 py-4 rounded-2xl font-black text-sm tracking-widest shadow-lg shadow-purple-600/20"
          >
            HUBUNGI KAMI
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
