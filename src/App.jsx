import React, { Suspense, lazy, useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation, useParams } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Trust from './components/Trust'
import Branches from './components/Branches'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import DeferredMount from './components/ui/DeferredMount'

const Panel = lazy(() => import('./components/Panel'))
const Testimonials = lazy(() => import('./components/Testimonials'))
const Contact = lazy(() => import('./components/Contact'))
const LazyDoctors = lazy(() => import('./components/Doctors'))
const LazyServices = lazy(() => import('./components/Services'))
const LazyPromotions = lazy(() => import('./components/Promotions'))

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
          <DeferredMount minHeight={900}>
            <Suspense fallback={<div className="py-28 min-h-[900px]" />}>
              <Panel />
            </Suspense>
          </DeferredMount>
          <DeferredMount minHeight={1100}>
            <Suspense fallback={<div className="py-28 min-h-[1100px]" />}>
              <LazyServices onModalToggle={setIsModalOpen} />
            </Suspense>
          </DeferredMount>
          <DeferredMount minHeight={1200}>
            <Suspense fallback={<div className="py-32 min-h-[1200px]" />}>
              <LazyDoctors />
            </Suspense>
          </DeferredMount>
          <Branches />
          <DeferredMount minHeight={680}>
            <Suspense fallback={<div className="py-32 min-h-[680px]" />}>
              <LazyPromotions />
            </Suspense>
          </DeferredMount>
          <DeferredMount minHeight={520}>
            <Suspense fallback={<div className="py-32 min-h-[520px]" />}>
              <Testimonials />
            </Suspense>
          </DeferredMount>
          <DeferredMount id="contact" minHeight={980}>
            <Suspense fallback={<div className="py-32 min-h-[980px]" />}>
              <Contact sectionId={null} />
            </Suspense>
          </DeferredMount>
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
