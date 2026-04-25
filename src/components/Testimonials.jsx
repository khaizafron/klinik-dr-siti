import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Star, ExternalLink } from 'lucide-react'

const GOOGLE_MAPS_LINK = 'https://maps.app.goo.gl/B7tT98wH4qeywhM5A'
const ELFSIGHT_WIDGET_ID = '07b899d9-18b4-4d4e-981b-293c41508a96'
const ELFSIGHT_SCRIPT_ID = 'elfsight-platform-script'
const ELFSIGHT_SCRIPT_SRC = 'https://elfsightcdn.com/platform.js'

let elfsightLoadPromise = null

function ensureElfsightScript() {
  if (typeof window === 'undefined') return Promise.resolve(false)
  if (window.ElfsightPlatform || window.__ELFSIGHT__ || document.getElementById(ELFSIGHT_SCRIPT_ID)) {
    return Promise.resolve(true)
  }

  if (elfsightLoadPromise) return elfsightLoadPromise

  elfsightLoadPromise = new Promise((resolve) => {
    const existing = document.querySelector(`script[src="${ELFSIGHT_SCRIPT_SRC}"]`)

    if (existing) {
      existing.addEventListener('load', () => resolve(true), { once: true })
      existing.addEventListener('error', () => resolve(false), { once: true })
      return
    }

    const script = document.createElement('script')
    script.id = ELFSIGHT_SCRIPT_ID
    script.src = ELFSIGHT_SCRIPT_SRC
    script.async = true
    script.defer = true
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  }).finally(() => {
    if (typeof window !== 'undefined' && !window.ElfsightPlatform && !window.__ELFSIGHT__) {
      elfsightLoadPromise = null
    }
  })

  return elfsightLoadPromise
}

function hideElfsightBranding(container) {
  if (!container) return

  const elfsightLinks = container.querySelectorAll(
    'a[href*="elfsight.com"], a[title*="Elfsight"], a[href*="google-reviews"]'
  )

  elfsightLinks.forEach((link) => {
    link.style.display = 'none'
    link.style.visibility = 'hidden'
    link.style.opacity = '0'
    link.style.pointerEvents = 'none'
    link.style.height = '0'
    link.style.width = '0'
    link.style.position = 'absolute'
  })
}

const reviews = [
  { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Siti' },
  { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmad' },
  { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nurul' },
  { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rauf' },
]

export default function Testimonials() {
  const widgetRef = useRef(null)
  const sectionRef = useRef(null)
  const [widgetLoaded, setWidgetLoaded] = useState(false)
  const widgetLoadedRef = useRef(false)

  useEffect(() => {
    let cancelled = false
    let observer

    const loadWidget = async () => {
      if (cancelled || widgetLoadedRef.current) return
      const loaded = await ensureElfsightScript()
      if (!cancelled && loaded) {
        widgetLoadedRef.current = true
        setWidgetLoaded(true)
        hideElfsightBranding(widgetRef.current)
      }
    }

    const timeoutId = window.setTimeout(loadWidget, 3000)

    const triggerLoad = () => {
      loadWidget()
      cleanupTriggers()
    }

    const cleanupTriggers = () => {
      window.removeEventListener('pointerdown', triggerLoad)
      window.removeEventListener('touchstart', triggerLoad)
      window.removeEventListener('keydown', triggerLoad)
      window.removeEventListener('scroll', triggerLoad)
      if (observer) observer.disconnect()
    }

    if ('IntersectionObserver' in window && sectionRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            triggerLoad()
          }
        },
        { rootMargin: '250px 0px' }
      )

      observer.observe(sectionRef.current)
    } else {
      loadWidget()
    }

    window.addEventListener('pointerdown', triggerLoad, { passive: true })
    window.addEventListener('touchstart', triggerLoad, { passive: true })
    window.addEventListener('keydown', triggerLoad)
    window.addEventListener('scroll', triggerLoad, { passive: true })

    const brandingObserver = new MutationObserver(() => hideElfsightBranding(widgetRef.current))
    if (widgetRef.current) {
      brandingObserver.observe(widgetRef.current, { childList: true, subtree: true })
    }

    return () => {
      cancelled = true
      clearTimeout(timeoutId)
      cleanupTriggers()
      brandingObserver.disconnect()
    }
  }, [])

  return (
    <section id="testimonials" ref={sectionRef} className="py-32 bg-white relative overflow-hidden">
      
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
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
              <Star size={12} className="fill-red-700" />
              4.9/5 Rating Google
            </div>

            <h2 className="text-4xl md:text-6xl font-black text-blue-900 leading-tight mb-6">
              Apa Kata <br />
              <span className="text-red-600">Pesakit Kami?</span>
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
                  loading="lazy"
                />
              ))}

              <div className="w-12 h-12 rounded-full border-4 border-white bg-red-600 flex items-center justify-center text-white text-xs font-black">
                +500
              </div>
            </div>

            <div className="text-sm">
              <p className="font-black text-blue-900">500+ Review</p>
              <p className="text-neutral-400 font-bold">Pesakit Puas Hati</p>
            </div>
          </motion.div>
        </div>

        {/* 🔥 ELFSIGHT WIDGET - Google Reviews */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-[3rem] overflow-hidden shadow-2xl shadow-purple-900/5 border border-neutral-100 bg-white p-4 min-h-[300px]"
        >
          <div
            ref={widgetRef}
            className={`elfsight-app-${ELFSIGHT_WIDGET_ID}`}
            data-elfsight-app-lazy
            aria-busy={!widgetLoaded}
          />
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
            className="inline-flex items-center gap-3 text-black-900 font-black text-xs tracking-[0.2em] uppercase hover:text-blue-600 transition-colors group"
          >
            Lihat Semua Review di Google Maps
            <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </motion.div>

      </div>
    </section>
  )
}
