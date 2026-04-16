import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Phone, Clock, ExternalLink, Calendar, MessageCircle, Navigation } from 'lucide-react'

const WA_NUMBER = '60166914270'

const branches = [
  {
    id: 'permai',
    name: 'Puchong Permai',
    tagline: 'Cawangan Utama',
    address: 'No. 12, Jalan Permai 1, Taman Puchong Permai, 47100 Puchong, Selangor',
    phone: '+603-8066 0086',
    mobile: '+60-16 729 6121',
    hours: [
      { day: 'Isnin - Jumaat', time: '8:30am – 10:00pm' },
      { day: 'Sabtu', time: '8:30am – 5:00pm' },
      { day: 'Ahad', time: '12:00pm - 10pm' }
    ],
    thumbnail: 'klinikpermai.jpg',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31874.582248434464!2d101.56319571083985!3d3.0075724000000252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cdb36e80a150a9%3A0xd422f8497d009bd7!2sKlinik%20Dr%20Siti%20dan%20Rakan%20Rakan!5e0!3m2!1sen!2smy!4v1775012564781!5m2!1sen!2smy',
    mapLink: 'https://maps.app.goo.gl/vY9xJvX9xJvX9xJvX',
    waLink: `https://wa.me/${WA_NUMBER}?text=Hi%2C%20saya%20ingin%20tanya%20tentang%20Cawangan%20Puchong%20Permai`,
  },
  {
    id: 'utama',
    name: 'Puchong Utama',
    tagline: 'Cawangan Kedua',
    address: 'No. 5, Jalan Utama 2, Taman Puchong Utama, 47150 Puchong, Selangor',
    phone: '+603-8066 0086',
    mobile: '+60-11 3604 3101',
    hours: [
      { day: 'Isnin - Jumaat', time: '8:30am – 9:00pm' },
      { day: 'Sabtu', time: '9:00am – 5:00pm' },
      { day: 'Ahad', time: '10:00am - 5:00pm' }
    ],
    thumbnail: 'klinikutama.webp',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31874.582248434464!2d101.56319571083985!3d3.0075724000000252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cdb50d2456b0cf%3A0xf76c0e2c30d17952!2sKlinik%20Dr%20Siti%20dan%20Rakan%20rakan!5e0!3m2!1sen!2smy!4v1775012619200!5m2!1sen!2smy',
    mapLink: 'https://maps.app.goo.gl/vY9xJvX9xJvX9xJvX',
    waLink: `https://wa.me/${WA_NUMBER}?text=Hi%2C%20saya%20ingin%20tanya%20tentang%20Cawangan%20Puchong%20Utama`,
  },
]

export default function Branches() {
  const [hoveredBranch, setHoveredBranch] = useState(null)

  return (
    <section id="branches" className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-red-600 font-bold text-xs tracking-[0.3em] uppercase mb-4">Lokasi Strategik</p>
          <h2 className="text-4xl md:text-5xl font-black text-blue-900 leading-tight mb-6">
            Cawangan <br className="md:hidden" />
            <span className="text-red-600">Klinik Kami</span>
          </h2>
          <p className="text-neutral-500 text-lg max-w-2xl mx-auto">
            Kami hadir di dua lokasi utama di Puchong untuk memastikan anda mendapat akses perubatan yang pantas dan berkualiti.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {branches.map((branch, i) => (
            <motion.div
              key={branch.id}
              initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="group bg-neutral-50 rounded-[3.5rem] overflow-hidden border border-neutral-100 shadow-sm hover:shadow-2xl hover:shadow-red-900/5 transition-all duration-500"
            >
              {/* Interactive Map/Thumbnail Area */}
              <div 
                className="relative h-80 overflow-hidden cursor-crosshair"
                onMouseEnter={() => setHoveredBranch(branch.id)}
                onMouseLeave={() => setHoveredBranch(null)}
              >
                <AnimatePresence mode="wait">
                  {hoveredBranch === branch.id ? (
                    <motion.div
                      key="map"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <iframe 
                        src={branch.mapEmbed}
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen="" 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`Map ${branch.name}`}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="thumbnail"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <img 
                        src={branch.thumbnail} 
                        alt={branch.name} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-blue-900/80 via-transparent to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/30 flex items-center gap-3 text-white font-black text-xs tracking-widest">
                          <Navigation size={16} className="animate-pulse" />
                          SENTUH UNTUK LIHAT PETA
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Content Area */}
              <div className="p-10">
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <span className="inline-block px-4 py-1.5 bg-red-100 text-red-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-3">
                      {branch.tagline}
                    </span>
                    <h3 className="text-3xl font-black text-blue-900 tracking-tight">{branch.name}</h3>
                  </div>
                  <div className="w-14 h-14 bg-white rounded-2xl shadow-lg flex items-center justify-center text-red-600">
                    <MapPin size={24} />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-10">
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-500 shrink-0">
                        <MapPin size={18} />
                      </div>
                      <p className="text-neutral-500 text-sm leading-relaxed font-medium">{branch.address}</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-500 shrink-0">
                        <Phone size={18} />
                      </div>
                      <div>
                        <p className="text-blue-900 font-black text-sm">{branch.phone}</p>
                        <p className="text-neutral-400 text-xs font-bold">{branch.mobile}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm md:col-span-1 min-w-[280px]">
                    <div className="flex items-center gap-3 mb-4">
                      <Clock size={16} className="text-red-500" />
                      <h4 className="text-xs font-black text-blue-900 uppercase tracking-widest">Waktu Operasi</h4>
                    </div>
                    <div className="space-y-2">
                      {branch.hours.map((h, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs">
                          <span className="text-neutral-400 font-bold">{h.day}</span>
                          <span className={`font-black ${h.time === 'Tutup' ? 'text-red-400' : 'text-blue-700'}`}>{h.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.a 
                    href={branch.waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-black px-8 py-5 rounded-2xl text-center flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20 transition-all text-xs tracking-widest"
                  >
                    <MessageCircle size={18} />
                    WHATSAPP CAWANGAN
                  </motion.a>
                  <motion.a 
                    href="#contact"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-black px-8 py-5 rounded-2xl text-center flex items-center justify-center gap-3 shadow-lg shadow-red-900/20 transition-all text-xs tracking-widest"
                  >
                    <Calendar size={18} />
                    TEMPAH TEMUJANJI
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
