import React, { useRef, useState, useEffect } from 'react'
import { Calendar, Tag } from 'lucide-react'

const promos = [
  {
    title: 'Pakej Pemeriksaan Lengkap',
    subtitle: 'Full Body Check-Up',
    price: 'RM 180',
    originalPrice: 'RM 350',
    tag: '🔥 HOT DEAL',
    color: 'from-purple-700 to-purple-500',
    desc: 'Ujian darah lengkap, ECG, ultrasound abdomen & konsultasi doktor',
    expiry: 'Sehingga 31 Mei 2026',
  },
  {
    title: 'Pakej Ibu Hamil',
    subtitle: 'Antenatal Package',
    price: 'RM 250',
    originalPrice: 'RM 450',
    tag: '💖 MOM\'S SPECIAL',
    color: 'from-pink-600 to-purple-500',
    desc: '5 kali pemeriksaan + ultrasound + ujian darah lengkap',
    expiry: 'Pakej bulanan',
  },
  {
    title: 'Vaksin Kanak-Kanak',
    subtitle: 'Childhood Immunization',
    price: 'RM 80',
    originalPrice: 'RM 120',
    tag: '👶 KIDS CARE',
    color: 'from-blue-600 to-purple-500',
    desc: 'Vaksin swasta pilihan termasuk rotavirus, pneumococcal & varicella',
    expiry: 'Tawaran berterusan',
  },
  {
    title: 'Saringan Diabetes',
    subtitle: 'Diabetes Screening',
    price: 'RM 30',
    originalPrice: 'RM 60',
    tag: '⚡ QUICK CHECK',
    color: 'from-orange-500 to-purple-500',
    desc: 'HbA1c + gula darah puasa + kaunseling diet percuma',
    expiry: 'Setiap Sabtu',
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

export default function Promotions() {
  const ref = useRef(null)
  const inView = useInView(ref)

  return (
    <section className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-purple-500 font-semibold text-sm tracking-widest uppercase mb-4">Tawaran Istimewa</p>
          <h2 className="section-title">Promosi & <span className="text-gradient">Pakej Kesihatan</span></h2>
          <p className="section-subtitle">Rawatan berkualiti pada harga yang berpatutan</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {promos.map((promo, i) => (
            <div
              key={promo.title}
              className={`group rounded-4xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-purple-200/50 hover:-translate-y-3 transition-all duration-500 cursor-pointer ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Poster top */}
              <div className={`bg-gradient-to-br ${promo.color} p-6 relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: 'radial-gradient(circle at 80% 20%, white 0%, transparent 50%)'
                }} />
                {/* Tag */}
                <span className="relative z-10 inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4">
                  {promo.tag}
                </span>
                <h3 className="relative z-10 text-white font-black text-xl leading-tight">{promo.title}</h3>
                <p className="relative z-10 text-white/70 text-sm font-medium mt-1">{promo.subtitle}</p>

                {/* Price */}
                <div className="relative z-10 mt-4 flex items-end gap-2">
                  <span className="text-3xl font-black text-white">{promo.price}</span>
                  <span className="text-white/50 text-sm line-through mb-1">{promo.originalPrice}</span>
                </div>

                {/* CTA Overlay on hover */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <a
                    href="#contact"
                    className="bg-white text-purple-900 font-bold px-6 py-3 rounded-2xl text-sm hover:bg-purple-50 transition-colors"
                    onClick={e => e.stopPropagation()}
                  >
                    Buat Temujanji
                  </a>
                </div>
              </div>

              {/* Body */}
              <div className="bg-white p-5 border border-purple-100 border-t-0">
                <p className="text-gray-600 text-sm leading-relaxed mb-3">{promo.desc}</p>
                <div className="flex items-center gap-2 text-xs text-purple-500">
                  <Calendar size={12} />
                  <span>{promo.expiry}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
