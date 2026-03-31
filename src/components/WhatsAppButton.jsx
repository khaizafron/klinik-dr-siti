import React, { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'

const WA_NUMBER = '60166914270'
const WA_URL = `https://wa.me/${WA_NUMBER}?text=Hi%2C%20saya%20ingin%20membuat%20temujanji%20di%20Klinik%20Dr%20Siti`

export default function WhatsAppButton() {
  const [tooltip, setTooltip] = useState(true)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end flex-col gap-3">
      {/* Tooltip */}
      {tooltip && (
        <div className="relative bg-white rounded-2xl px-4 py-3 shadow-xl border border-green-100 mr-1 max-w-[200px] animate-slide-up">
          <button
            onClick={() => setTooltip(false)}
            className="absolute -top-2 -right-2 w-5 h-5 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-gray-500 transition-colors"
            aria-label="Close tooltip"
          >
            <X size={12} />
          </button>
          <p className="text-xs font-bold text-gray-800">Hubungi kami di WhatsApp!</p>
          <p className="text-xs text-gray-500 mt-0.5">Balas dalam masa 30 minit</p>
          {/* Tail */}
          <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r border-b border-green-100 transform rotate-45" />
        </div>
      )}

      {/* WA Button */}
      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="w-16 h-16 bg-green-500 hover:bg-green-400 text-white rounded-full flex items-center justify-center shadow-2xl shadow-green-500/50 hover:scale-110 transition-all duration-300 wa-pulse"
        onMouseEnter={() => setTooltip(true)}
      >
        <MessageCircle size={30} fill="white" strokeWidth={0} />
      </a>
    </div>
  )
}
