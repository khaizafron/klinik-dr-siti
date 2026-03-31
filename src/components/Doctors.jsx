import React, { useRef, useState, useEffect } from 'react'
import { GraduationCap, Briefcase, Star } from 'lucide-react'

const doctors = [
  {
    name: 'Dr. Siti Nurfaizah',
    qualification: 'MBBS (UM), MMed Family Medicine',
    specialty: 'Perubatan Keluarga & Ibu Hamil',
    experience: '12 Tahun',
    avatar: '👩‍⚕️',
    branch: 'Puchong Permai',
  },
  {
    name: 'Dr. Ahmad Faris',
    qualification: 'MBBS (UKM), Dip. Obstetrics',
    specialty: 'Kesihatan Kanak-kanak & Vaksinasi',
    experience: '9 Tahun',
    avatar: '👨‍⚕️',
    branch: 'Puchong Utama',
  },
  {
    name: 'Dr. Nurul Ain',
    qualification: 'MBBS (IIUM), Dip. Dermatology',
    specialty: 'Penyakit Kulit & Estetika',
    experience: '7 Tahun',
    avatar: '👩‍⚕️',
    branch: 'Puchong Permai',
  },
  {
    name: 'Dr. Rizwan Hakim',
    qualification: 'MBBS (UM), MMed Internal Medicine',
    specialty: 'Perubatan Am & Diagnostik',
    experience: '10 Tahun',
    avatar: '👨‍⚕️',
    branch: 'Puchong Utama',
  },
]

function useInView(ref) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true)
    }, { threshold: 0.2 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref])
  return inView
}

export default function Doctors() {
  const ref = useRef(null)
  const inView = useInView(ref)

  return (
    <section className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-purple-500 font-semibold text-sm tracking-widest uppercase mb-4">Pasukan Kami</p>
          <h2 className="section-title">Doktor <span className="text-gradient">Berpengalaman</span></h2>
          <p className="section-subtitle">Pasukan doktor terlatih kami sedia membantu kesihatan anda dan keluarga</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doc, i) => (
            <div
              key={doc.name}
              className={`group bg-gradient-to-b from-purple-50 to-white rounded-4xl p-6 text-center border border-purple-100 card-hover shadow-sm hover:shadow-purple-200/60 transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Avatar */}
              <div className="relative mb-5">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-800 to-purple-500 rounded-full flex items-center justify-center text-5xl mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  {doc.avatar}
                </div>
                <div className="absolute -bottom-1 -right-1 left-1/2 translate-x-4 w-8 h-8 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
                  <Star size={12} className="text-white fill-white" />
                </div>
              </div>

              {/* Info */}
              <h3 className="font-black text-purple-900 text-lg mb-1 group-hover:text-purple-600 transition-colors">{doc.name}</h3>

              <div className="flex items-center justify-center gap-1 mb-3">
                <GraduationCap size={13} className="text-purple-400" />
                <p className="text-xs text-purple-500 font-medium">{doc.qualification}</p>
              </div>

              <div className="bg-gradient-to-r from-purple-800 to-purple-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full inline-block mb-3">
                {doc.specialty}
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 border-t border-purple-100 pt-3 mt-3">
                <div className="flex items-center gap-1">
                  <Briefcase size={12} className="text-purple-400" />
                  <span>{doc.experience}</span>
                </div>
                <span className="text-purple-600 font-medium">{doc.branch}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
