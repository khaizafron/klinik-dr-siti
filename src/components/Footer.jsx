import React from 'react'
import { 
  MapPin, 
  Phone, 
  Clock, 
  MessageCircle, 
  ArrowUpRight,
  Heart,
  ShieldCheck
} from 'lucide-react'

const BRANCHES = [
  { 
    name: 'Puchong Permai', 
    addr: 'No. 12, Jalan Permai 1, 47100 Puchong', 
    tel: '+60 16 729 6121',
  },
  { 
    name: 'Puchong Utama', 
    addr: 'No. 5, Jalan Utama 2, 47150 Puchong', 
    tel: '+60 11-3604 3101',
    
  },
]

const QUICK_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Tentang Kami', href: '#about' },
  { label: 'Perkhidmatan', href: '#services' },
  { label: 'Cawangan', href: '#branches' },
  { label: 'Hubungi', href: '#contact' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const waUrl = 'https://wa.me/601136043101'

  return (
    <footer className="relative bg-gradient-to-b from-red-50 via-white to-white pt-24 pb-12 overflow-hidden border-t border-red-100/50">

      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-200/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* TOP */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-20 pb-12 border-b border-red-100/50">

          <div className="flex items-center gap-5 group">
            <div className="relative">
              <div className="absolute -inset-4 bg-red-400/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <img src="/logo.PNG" className="h-24 w-24 relative z-10" />
            </div>

            <div>
              <h2 className="font-black text-2xl text-blue-950">KLINIK DR SITI</h2>
              <p className="text-[10px] font-black tracking-[0.4em] text-red-500">& Rakan-Rakan</p>
            </div>
          </div>

          {/* 🔥 FIXED SOCIAL */}
          {/* 🔥 UPDATED SOCIAL */}
<div className="flex items-center gap-2">

  {/* Facebook */}
  <a 
    href="https://www.facebook.com/people/Klinik-DrSiti-Dan-RakanRakan/100014080984681/?locale=ms_MY" 
    target="_blank"
    className="w-11 h-11 rounded-2xl bg-white border border-red-100 flex items-center justify-center hover:bg-red-600 transition"
  >
    <img 
      src="/facebook.png" 
      alt="Facebook" 
      className="w-full h-full object-cover rounded-2xl"
    />
  </a>

  {/* Instagram */}
  <a 
    href="https://www.instagram.com/klinikdrsitidanrakanrakan/" 
    target="_blank"
    className="w-11 h-11 rounded-2xl bg-white border border-red-100 flex items-center justify-center hover:bg-red-600 transition"
  >
    <img 
      src="/instagram.jpg" 
      alt="Instagram" 
      className="w-full h-full object-cover rounded-2xl"
    />
  </a>

  {/* WhatsApp */}
  <a 
    href={waUrl} 
    target="_blank"
    className="w-11 h-11 rounded-2xl bg-white border border-red-100 flex items-center justify-center hover:bg-green-500 transition"
  >
    <img 
      src="/whatsapp.png" 
      alt="WhatsApp" 
      className="w-full h-full object-cover rounded-2xl"
    />
  </a>

</div>

        </div>

        {/* GRID */}
        <div className="grid lg:grid-cols-12 gap-12 mb-20">
          
          <div className="lg:col-span-4">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-red-300 mb-6">
              Visi & Misi
            </h4>

            <div className="space-y-4">
  <div>
    <p className="text-[10px] font-bold text-blue-900 uppercase tracking-wide">
      Vision
    </p>
    <p className="text-neutral-600 text-sm italic">
      "Klinik Dr Siti & Rakan-Rakan aims to be the most accessible and preferred community medical care, committed to holistic treatments and healthcare excellence."
    </p>
  </div>

  <div>
    <p className="text-[10px] font-bold text-blue-900 uppercase tracking-wide">
      Mission
    </p>
    <p className="text-neutral-600 text-sm italic">
      "To provide an affordable, comprehensive and high quality healthcare service to the communities we serve."
    </p>
  </div>
</div>
          </div>

          <div className="lg:col-span-5">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-red-300 mb-6">
              Lokasi Cawangan
            </h4>

            <div className="grid sm:grid-cols-2 gap-5">
              {BRANCHES.map((b, i) => (
                <div key={i} className="p-6 rounded-[2rem] bg-white/60 backdrop-blur-sm border border-red-50">
                  <div className="flex gap-3 mb-3">
                    <MapPin size={14} className="text-red-600" />
                    <span className="font-black text-[11px] text-blue-950">{b.name}</span>
                  </div>

                  <p className="text-neutral-500 text-[10px] mb-3">{b.addr}</p>

                  <a href={`tel:${b.tel}`} className="text-blue-900 text-[10px] font-black flex gap-2">
                    <Phone size={10} />
                    {b.tel}
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-red-300 mb-6">
              Waktu Operasi
            </h4>
              <h3 className="font-black text-sm text-blue-950">Cawangan Puchong Permai</h3>
              <p className="text-sm">Isnin – Jumaat: 8:30am – 10pm</p>
              <p className="text-sm">Sabtu: 9:00am – 5pm</p>
              <p className="text-sm">Ahad: 12:00pm - 10pm</p>
              <h3 className="font-black text-sm text-blue-950">Cawangan Puchong Utama</h3>
              <p className="text-sm">Isnin – Jumaat: 8:30am – 9pm</p>
              <p className="text-sm">Sabtu: 9:00am – 5pm</p>
              <p className="text-sm">Ahad: 10:00am - 5pm</p>

           

              <a href={waUrl} target="_blank" className="mt-4 w-full py-3 bg-blue-900 text-white rounded-xl flex items-center justify-center gap-2 text-xs font-bold">
                <MessageCircle size={14} />
                Hubungi Kami
              </a>
            
          </div>

        </div>

        {/* BOTTOM */}
        <div className="pt-10 border-t border-red-100 flex flex-col md:flex-row md:justify-between items-center gap-6 lg:relative">

          <div className="flex flex-wrap gap-6">
            {QUICK_LINKS.map((l, i) => (
              <a key={i} href={l.href} className="text-xs font-black text-neutral-400 hover:text-red-600">
                {l.label}
              </a>
            ))}
          </div>

          <p className="text-neutral-400 text-xs">
            © {currentYear} Klinik Dr Siti & Rakan2
          </p>

          <a 
  href="https://www.luxera.my" 
  target="_blank"
  className="text-neutral-400 text-xs font-medium tracking-wide hover:opacity-80 transition lg:absolute lg:left-[45%]"
>
  Powered by{' '}
  <span className="font-bold bg-gradient-to-r from-blue-900 to-blue-500 bg-clip-text text-transparent">
    Luxera Cognitive Resources
  </span>
</a>

        </div>

      </div>
    </footer>
  )
}