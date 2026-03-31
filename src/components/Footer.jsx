import React from 'react'
import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const waUrl = 'https://wa.me/60166914270?text=Hi%2C%20saya%20ingin%20membuat%20temujanji'

  return (
    <footer className="bg-gradient-to-b from-purple-950 to-purple-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <img src="/logo.PNG" alt="Logo" className="h-14 w-14 object-contain" />
              <div>
                <p className="font-black text-xl leading-tight">Klinik Dr Siti</p>
                <p className="text-purple-300 font-semibold text-sm">& Rakan-Rakan</p>
              </div>
            </div>
            <p className="text-purple-200/80 text-sm leading-relaxed mb-6 max-w-xs">
              Klinik swasta terpercaya yang menyediakan rawatan komprehensif untuk ibu, anak dan keluarga di Puchong sejak lebih 10 tahun.
            </p>
            <div className="flex gap-3">
              <a href="#" aria-label="Facebook" className="w-10 h-10 bg-purple-800/50 hover:bg-purple-700 rounded-xl flex items-center justify-center transition-colors text-sm font-bold">
                f
              </a>
              <a href="#" aria-label="Instagram" className="w-10 h-10 bg-purple-800/50 hover:bg-purple-700 rounded-xl flex items-center justify-center transition-colors text-sm font-bold">
                ig
              </a>
              <a href={waUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-10 h-10 bg-green-600 hover:bg-green-500 rounded-xl flex items-center justify-center transition-colors">
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Cawangan */}
          <div>
            <h4 className="font-bold text-lg mb-5 text-white">Cawangan</h4>
            <div className="space-y-6">
              {[
                { name: 'Puchong Permai', addr: 'No. 12, Jalan Permai 1, 47100 Puchong', tel: '+603-8070 XXXX' },
                { name: 'Puchong Utama', addr: 'No. 5, Jalan Utama 2, 47150 Puchong', tel: '+603-8071 XXXX' },
              ].map(c => (
                <div key={c.name}>
                  <p className="font-semibold text-purple-200 mb-2">{c.name}</p>
                  <div className="flex gap-2 mb-1">
                    <MapPin size={14} className="text-purple-400 flex-shrink-0 mt-0.5" />
                    <p className="text-purple-300/70 text-xs leading-relaxed">{c.addr}</p>
                  </div>
                  <div className="flex gap-2">
                    <Phone size={14} className="text-purple-400 flex-shrink-0" />
                    <a href={`tel:${c.tel}`} className="text-purple-300/70 text-xs hover:text-white transition-colors">{c.tel}</a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Links + Hours */}
          <div>
            <h4 className="font-bold text-lg mb-5">Pautan Cepat</h4>
            <ul className="space-y-2 mb-8">
              {[
                ['Home', '#home'],
                ['Tentang Kami', '#about'],
                ['Perkhidmatan', '#services'],
                ['Cawangan', '#branches'],
                ['Hubungi', '#contact'],
              ].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="text-purple-300/70 text-sm hover:text-white transition-colors">{label}</a>
                </li>
              ))}
            </ul>
            <div>
              <h4 className="font-bold text-sm mb-3 flex items-center gap-2"><Clock size={14} className="text-purple-400" /> Waktu Operasi</h4>
              <p className="text-purple-300/70 text-xs">Isnin – Jumaat: 8:30am – 6pm</p>
              <p className="text-purple-300/70 text-xs">Sabtu: 8:30am – 1pm</p>
              <p className="text-red-400/70 text-xs">Ahad & Cuti: Tutup</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-purple-800/50 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-purple-400 text-xs text-center sm:text-left">
            © {currentYear} Klinik Dr Siti & Rakan-Rakan. Hak Cipta Terpelihara.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-purple-400 hover:text-white text-xs transition-colors">Dasar Privasi</a>
            <a href="#" className="text-purple-400 hover:text-white text-xs transition-colors">Terma Penggunaan</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
