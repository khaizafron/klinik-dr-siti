import React, { useRef, useState, useEffect } from 'react'

const panels = [
  { name: 'Great Eastern', color: '#D32F2F', short: 'GE' },
  { name: 'AIA', color: '#D32F2F', short: 'AIA' },
  { name: 'Prudential', color: '#00509E', short: 'PRU' },
  { name: 'Allianz', color: '#003781', short: 'ALZ' },
  { name: 'Etiqa', color: '#E65100', short: 'ETQ' },
  { name: 'Takaful Malaysia', color: '#388E3C', short: 'TM' },
  { name: 'Sun Life', color: '#FDD835', short: 'SL' },
  { name: 'MSIG', color: '#1565C0', short: 'MSIG' },
  { name: 'Tokio Marine', color: '#B71C1C', short: 'TM' },
  { name: 'AmMetLife', color: '#7B1FA2', short: 'AML' },
  { name: 'Hong Leong', color: '#F57F17', short: 'HL' },
  { name: 'BSIG', color: '#1A237E', short: 'BSIG' },
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

export default function Panel() {
  const ref = useRef(null)
  const inView = useInView(ref)

  return (
    <section className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-purple-500 font-semibold text-sm tracking-widest uppercase mb-4">Jaringan Kami</p>
          <h2 className="section-title">Panel Insurans & <span className="text-gradient">Rakan Klinik</span></h2>
          <p className="section-subtitle">Menerima pelbagai panel insurans utama di Malaysia</p>
        </div>

        <div className={`grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 transition-all duration-1000 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {panels.map(p => (
            <div
              key={p.name}
              className="group bg-gray-50 hover:bg-white rounded-3xl p-5 flex flex-col items-center justify-center gap-2 border border-gray-100 hover:border-purple-200 card-hover cursor-pointer shadow-sm hover:shadow-purple-100"
              title={p.name}
            >
              {/* Logo placeholder with colored badge */}
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-xs transition-all duration-300 grayscale group-hover:grayscale-0"
                style={{ backgroundColor: p.color }}
              >
                {p.short}
              </div>
              <p className="text-xs text-gray-500 group-hover:text-purple-700 text-center font-medium transition-colors leading-tight">{p.name}</p>
            </div>
          ))}
        </div>

        <div className={`mt-10 text-center transition-all duration-1000 delay-400 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-gray-400 text-sm">& banyak lagi. Hubungi kami untuk pertanyaan panel.</p>
        </div>
      </div>
    </section>
  )
}
