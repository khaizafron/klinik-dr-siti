import React, { useRef, useState, useEffect } from 'react'
import { MapPin, Phone, Mail, Send, CheckCircle, AlertCircle } from 'lucide-react'

function useInView(ref) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true)
    }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref])
  return inView
}

const INITIAL = { name: '', phone: '', message: '', branch: '' }

function sanitize(str) {
  return str.replace(/[<>"'&]/g, c => ({'<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#x27;','&':'&amp;'}[c]))
}

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref)
  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null) // 'success' | 'error' | null
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim() || form.name.length < 2) e.name = 'Nama diperlukan (sekurang-kurangnya 2 aksara)'
    if (!form.phone.trim() || !/^[0-9+\s\-]{8,15}$/.test(form.phone)) e.phone = 'Nombor telefon tidak sah'
    if (!form.message.trim() || form.message.length < 10) e.message = 'Mesej diperlukan (sekurang-kurangnya 10 aksara)'
    if (!form.branch) e.branch = 'Sila pilih cawangan'
    return e
  }

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length) { setErrors(e2); return }

    setLoading(true)
    try {
      // Sanitize inputs before sending to backend
      const sanitized = {
        name: sanitize(form.name.trim()),
        phone: sanitize(form.phone.trim()),
        message: sanitize(form.message.trim()),
        branch: sanitize(form.branch),
      }
      // In production: POST to /api/contact with sanitized data
      // const res = await fetch('/api/contact', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(sanitized) })
      await new Promise(r => setTimeout(r, 1200)) // simulate API
      setStatus('success')
      setForm(INITIAL)
    } catch {
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-purple-500 font-semibold text-sm tracking-widest uppercase mb-4">Hubungi Kami</p>
          <h2 className="section-title">Kami Sedia <span className="text-gradient">Membantu</span></h2>
          <p className="section-subtitle">Hubungi kami atau isi borang di bawah untuk membuat temujanji</p>
        </div>

        <div className={`grid lg:grid-cols-2 gap-12 items-start transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Left: Branch Info */}
          <div className="space-y-6">
            {[
              {
                name: 'Cawangan Puchong Permai',
                address: 'No. 12, Jalan Permai 1, Taman Puchong Permai, 47100 Puchong',
                phone: '+603-8070 XXXX',
                mobile: '+6016- 691 4270',
              },
              {
                name: 'Cawangan Puchong Utama',
                address: 'No. 5, Jalan Utama 2, Taman Puchong Utama, 47150 Puchong',
                phone: '+603-8071 XXXX',
                mobile: '+6016- 691 4270',
              },
            ].map(b => (
              <div key={b.name} className="bg-gradient-to-br from-purple-50 to-white rounded-4xl p-6 border border-purple-100">
                <h3 className="font-black text-purple-900 text-lg mb-4">{b.name}</h3>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <MapPin size={18} className="text-purple-500 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-600 text-sm leading-relaxed">{b.address}</p>
                  </div>
                  <div className="flex gap-3">
                    <Phone size={18} className="text-purple-500 flex-shrink-0" />
                    <div>
                      <a href={`tel:${b.phone.replace(/\s/g,'')}`} className="text-gray-700 text-sm font-medium hover:text-purple-700 transition-colors block">{b.phone}</a>
                      <a href={`tel:${b.mobile.replace(/\s/g,'')}`} className="text-gray-500 text-sm hover:text-purple-700 transition-colors block">{b.mobile}</a>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Hours */}
            <div className="bg-gradient-to-br from-purple-800 to-purple-600 rounded-4xl p-6 text-white">
              <h3 className="font-black text-lg mb-4">Waktu Operasi</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-purple-200">Isnin – Jumaat</span><span className="font-semibold">8:30am – 6:00pm</span></div>
                <div className="flex justify-between"><span className="text-purple-200">Sabtu</span><span className="font-semibold">8:30am – 1:00pm</span></div>
                <div className="flex justify-between"><span className="text-purple-200">Ahad & Cuti Am</span><span className="text-red-300 font-semibold">Tutup</span></div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="bg-gradient-to-br from-purple-50 to-white rounded-4xl p-8 border border-purple-100 shadow-xl shadow-purple-100/50">
            <h3 className="font-black text-purple-900 text-2xl mb-2">Hantar Mesej</h3>
            <p className="text-gray-500 text-sm mb-6">Kami akan menghubungi anda dalam masa 24 jam</p>

            {status === 'success' && (
              <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-800 rounded-2xl p-4 mb-6">
                <CheckCircle size={20} className="flex-shrink-0" />
                <p className="text-sm font-medium">Mesej anda berjaya dihantar! Kami akan menghubungi anda tidak lama lagi.</p>
              </div>
            )}
            {status === 'error' && (
              <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-800 rounded-2xl p-4 mb-6">
                <AlertCircle size={20} className="flex-shrink-0" />
                <p className="text-sm font-medium">Maaf, terdapat ralat. Sila cuba lagi atau hubungi kami terus.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nama Penuh *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  maxLength={100}
                  placeholder="Masukkan nama anda"
                  className={`w-full px-4 py-3 rounded-2xl border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all ${errors.name ? 'border-red-300 bg-red-50' : 'border-purple-200 focus:border-purple-400'}`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nombor Telefon *</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  maxLength={20}
                  placeholder="016-6914270"
                  className={`w-full px-4 py-3 rounded-2xl border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all ${errors.phone ? 'border-red-300 bg-red-50' : 'border-purple-200 focus:border-purple-400'}`}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              {/* Branch */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Pilih Cawangan *</label>
                <select
                  name="branch"
                  value={form.branch}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-2xl border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all ${errors.branch ? 'border-red-300 bg-red-50' : 'border-purple-200 focus:border-purple-400'}`}
                >
                  <option value="">-- Pilih Cawangan --</option>
                  <option value="puchong-permai">Puchong Permai</option>
                  <option value="puchong-utama">Puchong Utama</option>
                </select>
                {errors.branch && <p className="text-red-500 text-xs mt-1">{errors.branch}</p>}
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mesej *</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  maxLength={500}
                  rows={4}
                  placeholder="Terangkan keperluan rawatan atau pertanyaan anda..."
                  className={`w-full px-4 py-3 rounded-2xl border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all resize-none ${errors.message ? 'border-red-300 bg-red-50' : 'border-purple-200 focus:border-purple-400'}`}
                />
                <div className="flex justify-between">
                  {errors.message ? <p className="text-red-500 text-xs mt-1">{errors.message}</p> : <span />}
                  <p className="text-xs text-gray-400 mt-1">{form.message.length}/500</p>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-purple-800 to-purple-500 text-white font-bold py-4 rounded-2xl hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Menghantar...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Hantar
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
