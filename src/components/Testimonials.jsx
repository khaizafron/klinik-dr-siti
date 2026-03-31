import React, { useRef, useState, useEffect } from 'react'
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react'

const reviews = [
  { name: 'Siti Rahayu', location: 'Puchong Permai', rating: 5, text: 'Doktor sangat mesra dan profesional. Anak saya selalu dibawa ke sini untuk vaksin. Klinik bersih dan suasana selesa.' },
  { name: 'Ahmad Hazwan', location: 'Puchong Utama', rating: 5, text: 'Servis yang cepat dan efisyen. Tak perlu tunggu lama. Doktor terangkan dengan detail tentang keadaan kesihatan saya.' },
  { name: 'Nurul Farhana', location: 'Puchong Permai', rating: 5, text: 'Sangat puas dengan pemeriksaan kandungan di sini. Dr. Siti sangat sabar dan teliti. Harga pun berpatutan.' },
  { name: 'Rauf Adlan', location: 'Puchong Utama', rating: 5, text: 'Klinik yang sangat recommended! Mudah nak buat temujanji via WhatsApp. Staff ramah dan membantu.' },
  { name: 'Maisarah Azlan', location: 'Puchong Permai', rating: 5, text: 'Panel Prudential saya diterima di sini. Prosedur claim mudah dan pantas. Akan datang lagi!' },
  { name: 'Zul Hamizan', location: 'Puchong Utama', rating: 4, text: 'Scan ultrasound yang professional. Doktor tunjuk dan terangkan dengan jelas. Ruang tunggu selesa untuk anak-anak.' },
]

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={14} className={i <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />
      ))}
    </div>
  )
}

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

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref)
  const [current, setCurrent] = useState(0)
  const perPage = 3
  const totalPages = Math.ceil(reviews.length / perPage)

  const prev = () => setCurrent(c => (c - 1 + totalPages) % totalPages)
  const next = () => setCurrent(c => (c + 1) % totalPages)

  const visible = reviews.slice(current * perPage, current * perPage + perPage)

  return (
    <section className="py-28 bg-hero-gradient overflow-hidden relative">
      {/* bg decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-400/10 rounded-full -translate-y-1/2 -translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300/10 rounded-full translate-y-1/2 translate-x-1/2 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-purple-200 font-semibold text-sm tracking-widest uppercase mb-4">Kata-kata Mereka</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Testimoni <span className="text-purple-300">Pesakit</span></h2>
          <p className="text-purple-200 text-lg max-w-2xl mx-auto">Kepercayaan pesakit adalah keutamaan kami</p>
        </div>

        {/* Cards */}
        <div className={`grid md:grid-cols-3 gap-6 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {visible.map((r, i) => (
            <div key={`${current}-${i}`} className="glass rounded-4xl p-7 hover:-translate-y-1 transition-transform duration-300">
              <Quote size={28} className="text-purple-300 mb-4 opacity-60" />
              <p className="text-white/90 leading-relaxed mb-6 text-sm italic">"{r.text}"</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-bold">{r.name}</p>
                  <p className="text-purple-300 text-xs">{r.location}</p>
                </div>
                <StarRating rating={r.rating} />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button onClick={prev} className="glass rounded-full p-2.5 text-white hover:bg-white/20 transition-colors">
            <ChevronLeft size={20} />
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === current ? 'bg-white w-8' : 'bg-white/40'}`}
            />
          ))}
          <button onClick={next} className="glass rounded-full p-2.5 text-white hover:bg-white/20 transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  )
}
