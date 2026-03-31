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

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
        scrolled 
          ? 'py-3' 
          : 'py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className={`relative flex items-center justify-between px-6 rounded-3xl transition-all duration-700 border ${
            scrolled 
              ? 'bg-white/10 backdrop-blur-2xl border-white/20 shadow-2xl shadow-black/20 h-16' 
              : 'bg-transparent border-transparent h-20'
          }`}
        >
          {/* Logo Section */}
          <a href="#home" className="flex items-center gap-4 group">
            <div className="relative">
              <img
                src="/logo.PNG"
                alt="Logo"
                className="h-10 w-10 object-contain transition-transform duration-500 group-hover:rotate-[360deg] brightness-0 invert"
              />
              <div className="absolute -inset-2 bg-white/10 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight text-white leading-none">
                KLINIK DR SITI
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-medium">
                & Rakan-Rakan
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors relative group"
              >
                {link.label}
                <span className="absolute bottom-1 left-4 right-4 h-px bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </a>
            ))}

            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors group">
                Perkhidmatan
                <ChevronDown 
                  size={14} 
                  className={`transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} 
                />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full left-0 mt-2 w-64 p-2 bg-neutral-900/90 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                  >
                    <div className="grid gap-1">
                      {services.map((s) => (
                        <a
                          key={s.label}
                          href={s.href}
                          className="px-4 py-3 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200 flex items-center justify-between group/item"
                        >
                          {s.label}
                          <div className="w-1 h-1 bg-white rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity" />
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="hidden md:flex items-center gap-2 bg-white text-black text-xs font-bold px-6 py-2.5 rounded-full hover:bg-neutral-200 transition-all active:scale-95 shadow-lg shadow-white/10"
            >
              <Calendar size={14} />
              BOOK APPOINTMENT
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden mt-2 mx-4 overflow-hidden"
          >
            <div className="bg-neutral-950/90 backdrop-blur-3xl border border-white/10 rounded-3xl p-6 shadow-2xl">
              <div className="flex flex-col gap-2">
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="px-4 py-4 text-lg font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-2xl transition-all"
                  >
                    {link.label}
                  </a>
                ))}
                
                <div className="h-px bg-white/10 my-4 mx-4" />
                
                <div className="grid grid-cols-1 gap-2">
                  <p className="px-4 text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold mb-2">Perkhidmatan Kami</p>
                  {services.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      onClick={() => setMenuOpen(false)}
                      className="px-4 py-3 text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>

                <div className="mt-8 flex flex-col gap-3">
                  <a
                    href="#contact"
                    className="flex items-center justify-center gap-2 bg-white text-black font-bold py-4 rounded-2xl"
                  >
                    <Calendar size={18} />
                    Book Appointment
                  </a>
                  <div className="flex justify-center gap-6 mt-4">
                    <a href="tel:+" className="text-white/40 hover:text-white transition-colors"><Phone size={20} /></a>
                    <a href="#branches" className="text-white/40 hover:text-white transition-colors"><MapPin size={20} /></a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
