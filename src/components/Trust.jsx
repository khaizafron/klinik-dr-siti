import React, { useRef, useState, useEffect } from 'react'
import { Play } from 'lucide-react'

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

export default function Trust() {
  const ref = useRef(null)
  const inView = useInView(ref)

  return (
    <section className="py-28 bg-section-gradient overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16">
            <p className="text-purple-500 font-semibold text-sm tracking-widest uppercase mb-4">Kepercayaan Komuniti</p>
            <h2 className="section-title">Dipercayai Oleh<br /><span className="text-gradient">Komuniti Setempat</span></h2>
            <p className="section-subtitle">Bergabung bersama ribuan keluarga di Puchong yang mempercayai penjagaan kesihatan kami</p>
          </div>

          {/* Video embed placeholder */}
          <div className="relative max-w-4xl mx-auto rounded-4xl overflow-hidden shadow-2xl shadow-purple-200/50">
            <div className="bg-gradient-to-br from-purple-900 to-purple-700 aspect-video flex items-center justify-center relative">
              {/* Decorative background */}
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.3) 0%, transparent 60%), radial-gradient(circle at 70% 50%, rgba(255,255,255,0.2) 0%, transparent 60%)'
              }} />

              <div className="relative z-10 text-center">
                <button
                  aria-label="Play video"
                  className="w-20 h-20 bg-white/20 backdrop-blur-sm border-2 border-white/50 rounded-full flex items-center justify-center mx-auto mb-6 hover:bg-white/30 hover:scale-110 transition-all duration-300 group"
                >
                  <Play size={32} className="text-white ml-1 group-hover:scale-110 transition-transform" />
                </button>
                <h3 className="text-white text-2xl font-bold mb-2">Kenali Klinik Kami</h3>
                <p className="text-purple-200 text-lg">Lawatan Maya & Pengenalan Doktor</p>
              </div>

              {/* Corner decorations */}
              <img src="/logo.PNG" alt="" className="absolute bottom-6 right-6 h-16 w-16 object-contain opacity-30" />
            </div>

            {/* Video overlay bottom */}
            <div className="bg-gradient-to-r from-purple-900 to-purple-700 px-8 py-5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-white font-bold text-lg">"Dipercayai oleh komuniti setempat"</p>
                <p className="text-purple-200 text-sm">Klinik Dr Siti & Rakan-Rakan, Puchong</p>
              </div>
              <a
                href="#contact"
                className="bg-white text-purple-900 font-bold px-6 py-3 rounded-2xl hover:bg-purple-50 hover:-translate-y-0.5 transition-all duration-300 text-sm"
              >
                Buat Temujanji
              </a>
            </div>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {[
              { icon: '🏥', title: 'Klinik Berlesen', desc: 'Berdaftar dengan KKM' },
              { icon: '👨‍⚕️', title: 'Doktor Bertauliah', desc: 'MMC registered' },
              { icon: '🧪', title: 'Makmal In-house', desc: 'Keputusan pantas' },
              { icon: '💊', title: 'Ubatan Berkualiti', desc: 'Farmasi berlesen' },
            ].map(item => (
              <div key={item.title} className="bg-white rounded-4xl p-6 text-center border border-purple-100 card-hover shadow-sm">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h4 className="font-bold text-purple-900 mb-1">{item.title}</h4>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
