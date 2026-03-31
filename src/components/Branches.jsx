import React, { useRef, useState, useEffect } from 'react'
import { MapPin, Phone, Clock, ExternalLink, Calendar, MessageCircle } from 'lucide-react'

const WA_NUMBER = '60166914270'

const branches = [
  {
    name: 'Puchong Permai',
    tagline: 'Cawangan Utama',
    address: 'No. 12, Jalan Permai 1, Taman Puchong Permai, 47100 Puchong, Selangor',
    phone: '+603-8070 XXXX',
    mobile: '+60166914270',
    hours: 'Isnin - Jumaat: 8:30am – 6:00pm\nSabtu: 8:30am – 1:00pm\nAhad: Tutup',
    mapEmbed: 'https://maps.google.com/maps?q=Puchong+Permai+Selangor&output=embed',
    mapLink: 'https://maps.google.com/?q=Puchong+Permai+Selangor',
    waLink: `https://wa.me/${WA_NUMBER}?text=Hi%2C%20saya%20ingin%20tanya%20tentang%20Cawangan%20Puchong%20Permai`,
  },
  {
    name: 'Puchong Utama',
    tagline: 'Cawangan Kedua',
    address: 'No. 5, Jalan Utama 2, Taman Puchong Utama, 47150 Puchong, Selangor',
    phone: '+603-8071 XXXX',
    mobile: '+60166914270',
    hours: 'Isnin - Jumaat: 8:30am – 6:00pm\nSabtu: 8:30am – 1:00pm\nAhad: Tutup',
    mapEmbed: 'https://maps.google.com/maps?q=Puchong+Utama+Selangor&output=embed',
    mapLink: 'https://maps.google.com/?q=Puchong+Utama+Selangor',
    waLink: `https://wa.me/${WA_NUMBER}?text=Hi%2C%20saya%20ingin%20tanya%20tentang%20Cawangan%20Puchong%20Utama`,
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

export default function Branches() {
  const ref = useRef(null)
  const inView = useInView(ref)

  return (
    <section id="branches" className="py-28 bg-section-gradient overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-purple-500 font-semibold text-sm tracking-widest uppercase mb-4">Lokasi Kami</p>
          <h2 className="section-title">Dua Cawangan di <span className="text-gradient">Puchong</span></h2>
          <p className="section-subtitle">Mudah diakses, dekat dengan komuniti anda</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {branches.map((branch, i) => (
            <div
              key={branch.name}
              className={`bg-white rounded-4xl overflow-hidden border border-purple-100 shadow-lg hover:shadow-purple-200/60 transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-800 to-purple-600 p-6 text-white">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs text-purple-200 font-semibold uppercase tracking-wider">{branch.tagline}</span>
                    <h3 className="text-2xl font-black mt-1">{branch.name}</h3>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                    <MapPin size={22} className="text-white" />
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="h-48 bg-purple-50 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-200">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📍</div>
                    <p className="text-purple-700 font-bold text-sm">{branch.name}</p>
                    <p className="text-purple-500 text-xs">Puchong, Selangor</p>
                    <a
                      href={branch.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-3 bg-purple-800 text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-purple-700 transition-colors"
                    >
                      <ExternalLink size={12} />
                      Buka Google Maps
                    </a>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="p-6 space-y-4">
                <div className="flex gap-3">
                  <MapPin size={18} className="text-purple-500 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-600 text-sm leading-relaxed">{branch.address}</p>
                </div>
                <div className="flex gap-3">
                  <Phone size={18} className="text-purple-500 flex-shrink-0" />
                  <div>
                    <p className="text-gray-700 text-sm font-medium">{branch.phone}</p>
                    <p className="text-gray-500 text-sm">{branch.mobile}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Clock size={18} className="text-purple-500 flex-shrink-0 mt-0.5" />
                  <div>
                    {branch.hours.split('\n').map(line => (
                      <p key={line} className="text-gray-600 text-sm">{line}</p>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="px-6 pb-6 flex gap-3">
                <a
                  href={branch.mapLink}
                  target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 border-2 border-purple-200 text-purple-700 font-semibold py-3 rounded-2xl hover:bg-purple-50 hover:border-purple-400 transition-all text-sm"
                >
                  <ExternalLink size={16} />
                  Lihat Peta
                </a>
                <a
                  href="#contact"
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-800 to-purple-500 text-white font-semibold py-3 rounded-2xl hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-0.5 transition-all text-sm"
                >
                  <Calendar size={16} />
                  Buat Temujanji
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
