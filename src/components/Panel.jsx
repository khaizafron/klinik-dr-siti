import React, { useRef, useState, useEffect } from 'react'

const panels = [
  { name: 'Health Connect / Mediexpress', img: 'hc.PNG' },
  { name: 'Micare', img: 'mc.PNG' },
  { name: 'AIA', img: 'aia.PNG' },
  { name: 'IA International', img: 'ia.PNG' },
  { name: 'IHP', img: 'IHP.PNG' },
  { name: 'E-MAS', img: 'em.PNG' },
  { name: 'Allianz', img: 'a.png' },
  { name: 'Compumed', img: 'c.PNG' },
  { name: 'Mednefit', img: 'm.png' },
  { name: 'ASP Medical', img: 'asp.png' },
  { name: 'Medilink Global', img: 'mg.png' },
  { name: 'Red Alert', img: 'ra.png' },
  { name: 'Selcare', img: 'sc.png' },
  { name: 'WeCare', img: 'wc.PNG' },
  { name: 'GFlex', img: 'gf.png' },
  { name: 'Health Metrics', img: 'hm.png' },
  { name: 'Medkad', img: 'mk.png' },
  { name: 'PMCare', img: 'pc.png' },
  { name: 'Madani', img: 'madani.webp' },
  { name: 'Peka B40', img: 'pb40.png' },
  { name: 'Peduli Sihat (ILTIZAM)', img: 'ps.png' },
  { name: 'Angsana Health', img: 'ah.png' },
  { name: 'KPSB Care', img: 'kpsb.png' },
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

        {/* HEADER */}
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-red-600 font-semibold text-sm tracking-widest uppercase mb-4">
            Jaringan Kami
          </p>

          <h2 className="section-title text-red-600">
            Panel Insurans & <span className="text-blue-900">Rakan Klinik</span>
          </h2>

          <p className="section-subtitle">
            Menerima pelbagai panel insurans utama di Malaysia
          </p>
        </div>

        {/* GRID */}
        <div className={`grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 transition-all duration-1000 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

          {panels.map(p => (
            <div
              key={p.name}
              className="group bg-gray-50 hover:bg-white rounded-3xl p-5 flex flex-col items-center justify-center gap-3 border border-gray-100 hover:border-blue-900 card-hover cursor-pointer shadow-sm hover:shadow-blue-500/20 transition-all duration-300"
              title={p.name}
            >

              {/* 🔥 REAL LOGO */}
              <div className="w-full h-50 flex items-center justify-center">
                <img
                  src={`/panel-logo/${p.img}`}
                  alt={p.name}
                  className="max-w-full max-h-full object-contain group-hover:grayscale-0 transition duration-300"
                  loading="lazy"
                />
              </div>

              {/* NAME */}
              <p className="text-[11px] text-gray-500 group-hover:text-red-600 text-center font-medium transition-colors leading-tight">
                {p.name}
              </p>

            </div>
          ))}

        </div>

        {/* FOOTER */}
        <div className={`mt-10 text-center transition-all duration-1000 delay-400 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-gray-400 text-sm">
            & banyak lagi. Hubungi kami untuk pertanyaan panel.
          </p>
        </div>

      </div>
    </section>
  )
}