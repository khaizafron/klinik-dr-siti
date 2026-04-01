import React from 'react'
import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const waUrl = 'https://wa.me/60166914270?text=Hi%2C%20saya%20ingin%20membuat%20temujanji'

  return (
    <footer className="relative bg-gradient-to-b from-white via-blue-500 to-blue-800 text-white overflow-hidden">

      {/* Soft Glow Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-300/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-100/30 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10 relative z-10">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <img src="/logo.PNG" alt="Logo" className="h-14 w-14 object-contain" />
              <div>
                <p className="font-black text-xl leading-tight text-white">Klinik Dr Siti</p>
                <p className="text-blue-100 font-semibold text-sm">& Rakan-Rakan</p>
              </div>
            </div>

            <p className="text-blue-100/90 text-sm leading-relaxed mb-6 max-w-xs">
              Menyediakan rawatan kesihatan menyeluruh untuk ibu, anak dan keluarga dengan pendekatan profesional, moden dan mesra pesakit.
            </p>

            {/* Social */}
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-white/20 backdrop-blur-md border border-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-all text-sm font-bold">
                f
              </a>
              <a href="#" className="w-10 h-10 bg-white/20 backdrop-blur-md border border-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-all text-sm font-bold">
                ig
              </a>
              <a href={waUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-green-500 hover:bg-green-400 rounded-xl flex items-center justify-center transition-all">
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Cawangan */}
          <div>
            <h4 className="font-bold text-lg mb-5 text-white">Lokasi Cawangan</h4>
            <div className="space-y-6">
              {[
                { name: 'Puchong Permai', addr: 'No. 12, Jalan Permai 1, 47100 Puchong', tel: '+603-8070 XXXX' },
                { name: 'Puchong Utama', addr: 'No. 5, Jalan Utama 2, 47150 Puchong', tel: '+603-8071 XXXX' },
              ].map(c => (
                <div key={c.name} className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-xl">
                  <p className="font-semibold text-white mb-2">{c.name}</p>

                  <div className="flex gap-2 mb-1">
                    <MapPin size={14} className="text-blue-100 mt-0.5" />
                    <p className="text-blue-100/80 text-xs">{c.addr}</p>
                  </div>

                  <div className="flex gap-2">
                    <Phone size={14} className="text-blue-100" />
                    <a href={`tel:${c.tel}`} className="text-blue-100/80 text-xs hover:text-white transition-colors">
                      {c.tel}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Links + Hours */}
          <div>
            <h4 className="font-bold text-lg mb-5 text-white">Maklumat</h4>

            <ul className="space-y-2 mb-8">
              {[
                ['Home', '#home'],
                ['Tentang Kami', '#about'],
                ['Perkhidmatan', '#services'],
                ['Cawangan', '#branches'],
                ['Hubungi', '#contact'],
              ].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="text-blue-100/80 text-sm hover:text-white transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-4">
              <h4 className="font-bold text-sm mb-3 flex items-center gap-2 text-white">
                <Clock size={14} className="text-blue-100" />
                Waktu Operasi
              </h4>
              <p className="text-blue-100/80 text-xs">Isnin – Jumaat: 8:30am – 6pm</p>
              <p className="text-blue-100/80 text-xs">Sabtu: 8:30am – 1pm</p>
              <p className="text-red-200 text-xs">Ahad & Cuti: Tutup</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-blue-100 text-xs text-center sm:text-left">
            © {currentYear} Klinik Dr Siti & Rakan-Rakan. Hak Cipta Terpelihara.
          </p>

          <div className="flex gap-6">
            <a href="#" className="text-blue-100 hover:text-white text-xs transition-colors">Dasar Privasi</a>
            <a href="#" className="text-blue-100 hover:text-white text-xs transition-colors">Terma Penggunaan</a>
          </div>
        </div>

      </div>
    </footer>
  )
}