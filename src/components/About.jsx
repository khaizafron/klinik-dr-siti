import React, { useRef, useState, useEffect } from 'react'
import { Heart, Users, Award, Clock } from 'lucide-react'

const stats = [
  { icon: Users, value: '5,000+', label: 'Pesakit Puas Hati' },
  { icon: Award, value: '10+', label: 'Tahun Pengalaman' },
  { icon: Heart, value: '2', label: 'Cawangan Puchong' },
  { icon: Clock, value: '7 Hari', label: 'Beroperasi Seminggu' },
]

function useInView(ref) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true)
    }, { threshold: 0.2 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref])
  return inView
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref)

  return (
    <section id="about" className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <p className="text-purple-500 font-semibold text-sm tracking-widest uppercase mb-4">Tentang Kami</p>
            <h2 className="text-4xl md:text-5xl font-black text-purple-900 leading-tight mb-6">
              Kesihatan Keluarga Anda,<br />
              <span className="text-gradient">Keutamaan Kami</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Klinik Dr Siti & Rakan-Rakan merupakan klinik swasta yang menyediakan rawatan menyeluruh untuk ibu, kanak-kanak dan keluarga.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-10">
              Dengan dua cawangan di Puchong, kami komited memberikan rawatan profesional, cepat dan selesa kepada setiap pesakit. Pasukan doktor kami yang berpengalaman bersedia membantu anda dan keluarga.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map(({ icon: Icon, value, label }) => (
                <div key={label} className="bg-gradient-to-br from-purple-50 to-lavender rounded-3xl p-5 border border-purple-100 card-hover">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-800 to-purple-500 rounded-2xl flex items-center justify-center mb-3">
                    <Icon size={20} className="text-white" />
                  </div>
                  <div className="text-2xl font-black text-purple-900">{value}</div>
                  <div className="text-sm text-gray-500 font-medium">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual */}
          <div className={`transition-all duration-1000 delay-200 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative">
              {/* Background blob */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-purple-200 rounded-5xl transform rotate-3" />
              {/* Main card */}
              <div className="relative bg-gradient-to-br from-purple-800 to-purple-600 rounded-5xl p-10 text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10 text-center">
                  <img src="/logo.PNG" alt="Klinik Dr Siti" className="h-32 w-32 object-contain mx-auto mb-8 drop-shadow-2xl animate-float" />
                  <h3 className="text-2xl font-black mb-2">KLINIK DR SITI</h3>
                  <p className="text-purple-200 font-semibold mb-8">& RAKAN-RAKAN</p>

                  <div className="space-y-3">
                    {[
                      '✓ Doktor Bertauliah & Berpengalaman',
                      '✓ Peralatan Perubatan Moden',
                      '✓ Persekitaran Bersih & Selesa',
                      '✓ Waktu Operasi Fleksibel',
                      '✓ Menerima Panel Insurans Utama',
                    ].map(item => (
                      <p key={item} className="text-purple-100 text-sm font-medium glass rounded-2xl px-4 py-2">{item}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
