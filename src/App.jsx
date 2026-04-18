import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation, useParams } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Trust from './components/Trust'
import Panel from './components/Panel'
import Services from './components/Services'
import Doctors from './components/Doctors'
import Branches from './components/Branches'
import Promotions from './components/Promotions'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

function MainPage() {
  const { slug } = useParams()
  const { pathname } = useLocation()
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (pathname.startsWith('/services/')) return

    const routeSectionMap = {
      '/about': 'about',
      '/contact': 'contact',
    }

    const targetId = routeSectionMap[pathname] || slug
    if (!targetId) return

    const scrollTimer = setTimeout(() => {
      const target = document.getElementById(targetId)
      if (target) {
        const y = target.getBoundingClientRect().top + window.scrollY - 100
        window.scrollTo({ top: Math.max(y, 0), behavior: 'smooth' })
      }
    }, 200)

    return () => clearTimeout(scrollTimer)
  }, [pathname, slug])

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isModalOpen])

  return (
    <div className="min-h-screen bg-white">

      {/* Navbar kekal */}
      <Navbar isModalOpen={isModalOpen} />

      <main>

        {/* 🔥 HERO SCROLL ZONE (ISOLATED) */}
        <div className="relative z-0">
          <Hero />
        </div>

        {/* 🔥 SPACER UNTUK STABILKAN SCROLL (IMPORTANT) */}
        <div className="h-screen bg-white" />

        {/* 🔥 CONTENT NORMAL (TAK GANGGU HERO) */}
        <div className="relative z-10 bg-white">
          <About />
          <Trust />
          <Panel />
          <Services onModalToggle={setIsModalOpen} />
          <Doctors />
          <Branches />
          <Promotions />
          <Testimonials />
          <Contact />
        </div>

      </main>

      <Footer />
      <WhatsAppButton hide={isModalOpen} />

    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<MainPage />} />
        <Route path="/contact" element={<MainPage />} />
        <Route path="/services/:slug" element={<MainPage />} />
        <Route path="/branch/:slug" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  )
}
