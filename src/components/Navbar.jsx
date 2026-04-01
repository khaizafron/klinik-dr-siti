import React, { useState, useEffect } from 'react'
import { Menu, X, ChevronDown, Calendar, Phone, MapPin } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const services = [
  { label: 'Perubatan Am', href: '#services' },
  { label: 'Pemeriksaan Mengandung', href: '#services' },
  { label: 'Vaksinasi', href: '#services' },
  { label: 'Diagnostik & Scan', href: '#services' },
  { label: 'Penyakit Kulit', href: '#services' },
  { label: 'Mini Lab', href: '#services' },
]

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Tentang Kami', href: '#about' },
  { label: 'Cawangan', href: '#branches' },
  { label: 'Hubungi', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  // 🔥 PREMIUM SCROLL DETECTION (ikut hero)
  useEffect(() => {
    const handler = () => {
      const hero = document.getElementById('home')
      if (!hero) return

      const rect = hero.getBoundingClientRect()
      setScrolled(rect.bottom <= 80)
    }

    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className="fixed top-4 left-0 right-0 z-[100] transition-all duration-500">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div
          className={`relative flex items-center justify-between px-6 rounded-3xl transition-all duration-500 border ${
            scrolled
              ? 'bg-white/10 backdrop-blur-2xl border-white/20 shadow-2xl shadow-black/20 h-16' 
              : 'bg-transparent border-transparent h-20'
          }`}
        >

          {/* LOGO */}
          <a href="#home" className="flex items-center gap-4 group">
            <div className="relative">
              <img
                src="/logo.PNG"
                alt="Logo"
                className={`h-10 w-10 object-contain transition-all duration-500 ${
                  scrolled ? 'brightness-100 invert-0' : 'brightness-0 invert'
                }`}
              />
            </div>

            <div className="flex flex-col">
              <span
                className={`font-bold text-lg tracking-tight leading-none transition-colors duration-500 ${
                  scrolled ? 'text-neutral-900' : 'text-white'
                }`}
              >
                KLINIK DR SITI
              </span>

              <span
                className={`text-[10px] uppercase tracking-[0.3em] font-medium transition-colors duration-500 ${
                  scrolled ? 'text-neutral-500' : 'text-white/50'
                }`}
              >
                & Rakan-Rakan
              </span>
            </div>
          </a>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-1">

            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`px-4 py-2 text-sm font-medium transition-colors relative group ${
                  scrolled
                    ? 'text-neutral-600 hover:text-neutral-900'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}

                <span
                  className={`absolute bottom-1 left-4 right-4 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${
                    scrolled ? 'bg-neutral-900' : 'bg-white'
                  }`}
                />
              </a>
            ))}

            {/* DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors ${
                  scrolled
                    ? 'text-neutral-600 hover:text-neutral-900'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Perkhidmatan
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${
                    dropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full left-0 mt-2 w-64 p-2 bg-white/90 backdrop-blur-xl border border-neutral-200 rounded-2xl shadow-xl"
                  >
                    {services.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        className="block px-4 py-3 text-sm text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-xl transition"
                      >
                        {s.label}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-4">

            <a
              href="https://klinikdrsiti.yezza.co/appointment"
              className={`hidden md:flex items-center gap-2 text-xs font-bold px-6 py-2.5 rounded-full transition-all ${
                scrolled
                  ? 'bg-neutral-900 text-white hover:bg-neutral-800'
                  : 'bg-white text-black hover:bg-neutral-200'
              }`}
            >
              <Calendar size={14} />
              BOOK APPOINTMENT
            </a>

            {/* MOBILE */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`lg:hidden w-10 h-10 flex items-center justify-center rounded-full border transition ${
                scrolled
                  ? 'bg-neutral-100 border-neutral-200 text-neutral-900'
                  : 'bg-white/10 border-white/20 text-white'
              }`}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden mt-2 mx-4 overflow-hidden"
          >
            <div className="bg-white/95 backdrop-blur-xl border border-neutral-200 rounded-3xl p-6 shadow-xl">

              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-4 text-lg font-medium text-neutral-700 hover:text-black hover:bg-neutral-100 rounded-2xl"
                >
                  {link.label}
                </a>
              ))}

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </nav>
  )
}