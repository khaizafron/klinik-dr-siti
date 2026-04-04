import React, { useState, useEffect } from 'react'
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

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)

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
      <WhatsAppButton />

    </div>
  )
}
