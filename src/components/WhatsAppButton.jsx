import React, { useState, useEffect } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { getWaLink } from "../utils/whatsapp";

const WA_NUMBER = '601136043101'
const WA_URL = getWaLink(
  "Hi saya nak membuat temujanji di Klinik Dr Siti"
);

export default function WhatsAppButton({ hide }) {
  const [tooltip, setTooltip] = useState(false)

  useEffect(() => {
    let hideTimer
    let idleTimer

    const SHOW_DELAY = 15000       // 15s idle trigger
    const DISPLAY_TIME = 30000     // 30s show
    const REPEAT_INTERVAL = 600000 // 10 min

    const lastClosed = localStorage.getItem('wa_closed_time')
    const now = Date.now()

    // kalau user baru close (<10min), jangan show
    if (lastClosed && now - lastClosed < REPEAT_INTERVAL) {
      return
    }

    const showTooltip = () => {
      setTooltip(true)

      hideTimer = setTimeout(() => {
        setTooltip(false)
      }, DISPLAY_TIME)
    }

    // detect idle (user tak buat apa)
    const resetIdleTimer = () => {
      clearTimeout(idleTimer)
      idleTimer = setTimeout(showTooltip, SHOW_DELAY)
    }

    // trigger bila user idle
    window.addEventListener('mousemove', resetIdleTimer)
    window.addEventListener('scroll', resetIdleTimer)
    window.addEventListener('keydown', resetIdleTimer)

    // start first timer
    resetIdleTimer()

    // repeat setiap 10 min
    const interval = setInterval(showTooltip, REPEAT_INTERVAL)

    return () => {
      clearTimeout(hideTimer)
      clearTimeout(idleTimer)
      clearInterval(interval)
      window.removeEventListener('mousemove', resetIdleTimer)
      window.removeEventListener('scroll', resetIdleTimer)
      window.removeEventListener('keydown', resetIdleTimer)
    }
  }, [])

  const handleClose = () => {
    setTooltip(false)
    localStorage.setItem('wa_closed_time', Date.now())
  }

  return (
    <div className={`fixed bottom-6 right-6 z-20 flex items-end flex-col gap-3 transition-all duration-300
  ${hide ? 'opacity-0 pointer-events-none translate-y-4' : 'opacity-100 translate-y-0'}
`}>

      {/* Tooltip */}
      {tooltip && (
        <div className="relative bg-white rounded-2xl px-4 py-3 shadow-xl border border-green-100 mr-1 max-w-[220px] animate-slide-up">
          
          <button
            onClick={handleClose}
            className="absolute -top-2 -right-2 w-5 h-5 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-gray-500 transition-colors"
          >
            <X size={12} />
          </button>

          <p className="text-xs font-bold text-gray-800">
            Hubungi kami di WhatsApp!
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            Balas dalam masa 30 minit
          </p>

          <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r border-b border-green-100 rotate-45" />
        </div>
      )}

      {/* WA Button */}
      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="w-16 h-16 bg-green-500 hover:bg-green-400 text-white rounded-full flex items-center justify-center shadow-2xl shadow-green-500/50 hover:scale-110 transition-all duration-300 wa-pulse"
        onMouseEnter={() => setTooltip(true)}
      >
        <MessageCircle size={30} fill="white" strokeWidth={0} />
      </a>

    </div>
  )
}