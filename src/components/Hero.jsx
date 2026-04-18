import React, { useEffect, useRef, useState } from 'react'
import { MessageCircle, Calendar, ChevronDown, Heart, Shield, Clock } from 'lucide-react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import GlassSurface from '../components/ui/GlassSurface'

const WA_NUMBER = '601136043101'
const BOOKING_URL = 'https://klinikdrsiti.yezza.co/appointment'

export default function Hero() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const rafRef = useRef(null)
  const drawFrameRef = useRef(null)
  const currentFrameRef = useRef(-1)
  const [images, setImages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadProgress, setLoadProgress] = useState(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  })

  // Frame count from user code
  const frameCount = window.innerWidth < 768 ? 252 : 305

  // Preload images
  useEffect(() => {
    let loadedCount = 0
    const loadedImages = []

const currentFrame = (i) => {
  let num = i.toString().padStart(4, "0")

  if (window.innerWidth < 768) {
    return "/frames-mobile/frame_" + num + ".webp"
  } else {
    return "/frames-desktop/frame_" + num + ".webp"
  }
}

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image()
      img.decoding = 'async'
      img.src = currentFrame(i)
      img.onload = () => {
        loadedCount++
        setLoadProgress(Math.floor((loadedCount / frameCount) * 100))
        if (loadedCount === frameCount) {
          setImages(loadedImages)
          setIsLoading(false)
        }
      }
      loadedImages.push(img)
    }
  }, [])

  // Canvas rendering driven by scroll
  useEffect(() => {
    if (images.length === 0 || !canvasRef.current) return

    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    if (!context) return

    const drawFrame = (frameIndex) => {
      const safeIndex = Math.max(0, Math.min(frameCount - 1, frameIndex))
      const img = images[safeIndex]
      if (!img) return

      currentFrameRef.current = safeIndex

      const canvasAspect = canvas.width / canvas.height
      const imgAspect = img.width / img.height

      let drawWidth, drawHeight, offsetX, offsetY

      if (canvasAspect > imgAspect) {
        drawWidth = canvas.width
        drawHeight = canvas.width / imgAspect
        offsetX = 0
        offsetY = (canvas.height - drawHeight) / 2
      } else {
        drawWidth = canvas.height * imgAspect
        drawHeight = canvas.height
        offsetX = (canvas.width - drawWidth) / 2
        offsetY = 0
      }

      context.clearRect(0, 0, canvas.width, canvas.height)
      context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
    }

    drawFrameRef.current = drawFrame

    const renderFromProgress = (progress) => {
      const nextFrameIndex = Math.min(
        frameCount - 1,
        Math.floor(progress * (frameCount - 1))
      )

      if (nextFrameIndex === currentFrameRef.current) return

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }

      rafRef.current = requestAnimationFrame(() => {
        drawFrame(nextFrameIndex)
        rafRef.current = null
      })
    }

    drawFrame(0)

    const unsubscribe = scrollYProgress.on('change', (latest) => {
      renderFromProgress(latest)
    })

    return () => {
      unsubscribe()
      drawFrameRef.current = null
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [images, scrollYProgress])

  // Handle Resize
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      canvas.width = width
      canvas.height = height

      if (drawFrameRef.current) {
        drawFrameRef.current(currentFrameRef.current >= 0 ? currentFrameRef.current : 0)
      }
    }

    resize()
    window.addEventListener("resize", resize)
    window.addEventListener("orientationchange", resize)

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("orientationchange", resize)
    }
  }, [])

  const waUrl = `https://wa.me/${WA_NUMBER}?text=Hi%2C%20saya%20ingin%20membuat%20temujanji`

  // Content visibility transforms
  // Keep the intro scenes shorter and let the final CTA take most of the scroll time.
const welcomeOpacity = useTransform(scrollYProgress, [0, 0.02, 0.06, 0.10], [0, 1, 1, 0])
const welcomeY = useTransform(scrollYProgress, [0, 0.02, 0.06, 0.10], [30, 0, 0, -16])

const excellenceOpacity = useTransform(scrollYProgress, [0.08, 0.14, 0.18, 0.22], [0, 1, 1, 0])
const excellenceY = useTransform(scrollYProgress, [0.08, 0.14, 0.18, 0.22], [30, 0, 0, -16])

const mainContentOpacity = useTransform(scrollYProgress, [0.20, 0.28, 0.40], [0, 1, 1])
const mainContentY = useTransform(scrollYProgress, [0.20, 0.34, 0.48], [40, 10, 0])
const mainContentScale = useTransform(scrollYProgress, [0.20, 1], [0.96, 1])

  return (
    <section id="home" ref={sectionRef} className="relative h-[1200vh] bg-black">
      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-neutral-950 flex flex-col items-center justify-center"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative w-24 h-24 mb-8"
            >
              <div className="absolute inset-0 border-4 border-white/10 rounded-full" />
              <motion.div 
                className="absolute inset-0 border-4 border-t-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
            <p className="text-white/50 font-mono text-sm tracking-widest uppercase">
              Loading Experience {loadProgress}%
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="sticky top-0 h-[100dvh] w-full flex items-center justify-center overflow-hidden">
        {/* Background Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/60" />

        {/* Scene 1: Welcome */}
        <motion.div 
          style={{ opacity: welcomeOpacity, y: welcomeY }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        >
          <span className="text-black/60 uppercase tracking-[0.3em] text-xs mb-4 font-medium">Welcome to</span>
          <h1 className="text-4xl md:text-7xl font-light text-blue tracking-tight italic font-serif">
            Klinik Dr Siti Dan Rakan Rakan
          </h1>
          <p className="text-md md:text-2xl font-light text-blue tracking-tight font-serif"> Klinik Ibu, Anak & Keluarga di Puchong</p>
        </motion.div>

        {/* Scene 2: Excellence */}
        <motion.div 
          style={{ opacity: excellenceOpacity, y: excellenceY }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        >
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mb-6">

  <div className="flex items-center gap-2 text-blue-900 text-xs sm:text-sm italic font-serif font-semibold tracking-wide">
    <Shield className="w-4 h-4 text-blue-900" />
    <span>Certified Doctors</span>
  </div>

  <div className="flex items-center gap-2 text-blue-900 text-xs sm:text-sm italic font-serif font-semibold tracking-wide">
    <Clock className="w-4 h-4 text-blue-900" />
    <span>Fast Service</span>
  </div>

  <div className="flex items-center gap-2 text-blue-900 text-xs sm:text-sm italic font-serif font-semibold tracking-wide">
    <Heart className="w-4 h-4 text-blue-900" />
    <span>Patient First</span>
  </div>

</div>
          <h2 className="text-4xl md:text-6xl font-medium text-red-500 tracking-tight">
            Excellence in <span className="italic font-serif font-light text-red-500">Healthcare</span>
          </h2>
        </motion.div>

        {/* Scene 3: Main CTA */}
        <motion.div 
          style={{ opacity: mainContentOpacity, y: mainContentY, scale: mainContentScale }}
          className="relative z-10 max-w-5xl mx-auto px-6 text-center translate-y-32 md:translate-y-56"
        >
          <div className="flex justify-center mb-8 md:mb-12">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="relative p-6 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl"
            >
              <img src="/logo.PNG" alt="Logo" className="h-16 w-16 md:h-24 md:w-24 object-contain " />
              <div className="absolute -inset-1 bg-white/5 rounded-full blur-xl -z-10" />
            </motion.div>
          </div>


          
          <p className="
  text-black 
  text-lg md:text-2xl 
  max-w-2xl mx-auto 
  mt-8 md:mt-20 mb-8 md:mb-12 
  font-semibold 
  tracking-wide 
  leading-relaxed
">
  Your journey to wellness begins with a touch of 
  <span className="font-bold"> professional care</span>{' '} 
  and 
  <span className="font-bold"> modern expertise</span>.
</p>

          <div className="mt-6 md:mt-8 flex flex-col sm:flex-row justify-center items-center gap-6">
            <motion.a 
              href={BOOKING_URL} 
              whileHover={{ scale: 1.04, y: -4 }}
              whileTap={{ scale: 0.96 }}
              className="relative px-8 py-3 rounded-full font-semibold flex items-center gap-3 overflow-hidden
                bg-white/80 backdrop-blur-xl border border-white/40 text-neutral-950
                shadow-lg
                hover:bg-white/90 hover:border-white/50 hover:shadow-2xl hover:shadow-white/20
                transition-all duration-300"
            >
              <Calendar size={18} />
              <span>Book Appointment</span>
            </motion.a>

            <motion.a 
              href={waUrl} 
              whileHover={{ scale: 1.04, y: -4 }}
              whileTap={{ scale: 0.96 }}
              className="relative px-8 py-3 rounded-full font-semibold flex items-center gap-3 overflow-hidden
                bg-green-500/80 backdrop-blur-xl border border-white/40 text-white
                shadow-lg
                hover:bg-green-500/90 hover:border-white/50 hover:shadow-2xl hover:shadow-green-500/30
                transition-all duration-300"
            >
              <MessageCircle size={18} />
              <span>WhatsApp Us</span>
            </motion.a>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] text-black uppercase tracking-[0.4em] font-medium">Scroll to explore</span>
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="text-white/20 w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
