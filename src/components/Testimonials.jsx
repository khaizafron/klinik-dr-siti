import React from 'react'
import { motion } from 'framer-motion'
import { Star, ExternalLink } from 'lucide-react'

const GOOGLE_MAPS_LINK = 'https://maps.app.goo.gl/B7tT98wH4qeywhM5A'

const reviews = [
  { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Siti' },
  { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmad' },
  { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nurul' },
  { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rauf' },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-32 bg-white relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 opacity-50" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
              <Star size={12} className="fill-purple-700" />
              4.9/5 Rating Google
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-purple-900 leading-tight mb-6">
              Apa Kata <br />
              <span className="text-purple-600">Pesakit Kami?</span>
            </h2>
            <p className="text-neutral-500 text-lg font-medium">
              Kepercayaan anda adalah inspirasi kami untuk terus memberikan perkhidmatan kesihatan yang terbaik.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <div className="flex -space-x-3">
              {reviews.slice(0, 4).map((r, i) => (
                <img 
                  key={i} 
                  src={r.avatar} 
                  alt="" 
                  className="w-12 h-12 rounded-full border-4 border-white bg-purple-50"
                />
              ))}
              <div className="w-12 h-12 rounded-full border-4 border-white bg-purple-900 flex items-center justify-center text-white text-xs font-black">
                +500
              </div>
            </div>
            <div className="text-sm">
              <p className="font-black text-purple-900">500+ Review</p>
              <p className="text-neutral-400 font-bold">Pesakit Puas Hati</p>
            </div>
          </motion.div>
        </div>

        {/* Elfsight Google Reviews Widget */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-[3rem] overflow-hidden shadow-2xl shadow-purple-900/5 border border-neutral-100 bg-white p-4"
        >
          <div className="elfsight-app-ccd766b8-77fc-4b80-a399-274a0705f21a" data-elfsight-app-lazy></div>
        </motion.div>

        {/* Google Review CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <a 
            href={GOOGLE_MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-purple-900 font-black text-xs tracking-[0.2em] uppercase hover:text-purple-600 transition-colors group"
          >
            Lihat Semua Review di Google Maps
            <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
