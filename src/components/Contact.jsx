import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MapPin,
  Phone,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  MessageCircle,
  Calendar
} from 'lucide-react'

const INITIAL_FORM = { name: '', phone: '', message: '', branch: '' }
const SCRIPT_URL = 'https://klinik-dr-siti.vercel.app/api/contact'
const RECAPTCHA_SITE_KEY = '6LdBVL0sAAAAACDlmEWY06Ol293Vbu8EcKkhEPVh'
const RECAPTCHA_SCRIPT_ID = 'google-recaptcha-v3-script'

let recaptchaLoadPromise = null

const BRANCHES = [
  {
    id: 'puchong-permai',
    name: 'Puchong Permai',
    address: 'No. 12, Jalan Permai 1, Taman Puchong Permai, 47100 Puchong, Selangor',
    phone: '+603-8066 0086',
    mobile: '+60 16-729 6121',
    mapUrl: 'https://maps.app.goo.gl/B7tT98wH4qeywhM5A',
    hours: [
      { day: 'Isnin - Jumaat', time: '8:30am - 10:00pm' },
      { day: 'Sabtu', time: '9:00am - 5:00pm' },
      { day: 'Ahad', time: '12:00pm - 10:00pm' },
    ],
  },
  {
    id: 'puchong-utama',
    name: 'Puchong Utama',
    address: 'No. 5, Jalan Utama 2, Taman Puchong Utama, 47150 Puchong, Selangor',
    phone: '+603-8066 0086',
    mobile: '+60-11 3604 3101',
    mapUrl: 'https://maps.app.goo.gl/B7tT98wH4qeywhM5A',
    hours: [
      { day: 'Isnin - Jumaat', time: '8:30am - 9:00pm' },
      { day: 'Sabtu', time: '9:00am - 5:00pm' },
      { day: 'Ahad', time: '10:00am - 5:00pm' },
    ],
  },
]

function ensureRecaptchaScript() {
  if (typeof window === 'undefined') return Promise.resolve(false)
  if (window.grecaptcha) return Promise.resolve(true)
  if (recaptchaLoadPromise) return recaptchaLoadPromise

  recaptchaLoadPromise = new Promise((resolve) => {
    const existing = document.getElementById(RECAPTCHA_SCRIPT_ID)

    if (existing) {
      existing.addEventListener('load', () => resolve(Boolean(window.grecaptcha)), { once: true })
      existing.addEventListener('error', () => resolve(false), { once: true })
      return
    }

    const script = document.createElement('script')
    script.id = RECAPTCHA_SCRIPT_ID
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`
    script.async = true
    script.defer = true
    script.onload = () => resolve(Boolean(window.grecaptcha))
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  }).finally(() => {
    if (typeof window !== 'undefined' && !window.grecaptcha) {
      recaptchaLoadPromise = null
    }
  })

  return recaptchaLoadPromise
}

async function getRecaptchaToken() {
  const loaded = await ensureRecaptchaScript()

  if (!loaded || !window.grecaptcha) {
    return ''
  }

  return new Promise((resolve) => {
    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(RECAPTCHA_SITE_KEY, { action: 'submit' })
        .then((token) => resolve(token))
        .catch(() => resolve(''))
    })
  })
}

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const [activeBranch, setActiveBranch] = useState(BRANCHES[0].id)
  const sectionRef = useRef(null)

  useEffect(() => {
    let cancelled = false
    let observer

    const loadRecaptcha = async () => {
      if (cancelled) return
      await ensureRecaptchaScript()
    }

    const timer = window.setTimeout(loadRecaptcha, 3500)

    if ('IntersectionObserver' in window && sectionRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            loadRecaptcha()
            observer.disconnect()
          }
        },
        { rootMargin: '200px 0px' }
      )

      observer.observe(sectionRef.current)
    }

    return () => {
      cancelled = true
      clearTimeout(timer)
      if (observer) observer.disconnect()
    }
  }, [])

  const validate = () => {
    const nextErrors = {}
    if (!form.name.trim() || form.name.length < 2) nextErrors.name = 'Sila masukkan nama penuh anda'
    if (!form.phone.trim() || !/^[0-9+\s\-]{8,15}$/.test(form.phone)) nextErrors.phone = 'Nombor telefon tidak sah'
    if (!form.message.trim() || form.message.length < 5) nextErrors.message = 'Sila kongsikan sedikit butiran pertanyaan anda'
    if (!form.branch) nextErrors.branch = 'Sila pilih cawangan pilihan anda'
    return nextErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    setLoading(true)

    try {
      const recaptchaToken = await getRecaptchaToken()

      if (!recaptchaToken) {
        setStatus('error')
        return
      }

      const res = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          branch: form.branch,
          message: form.message.trim(),
          token: recaptchaToken,
        }),
      })

      const data = await res.json()

      if (!data.success) {
        throw new Error(data.error || 'Submit failed')
      }

      setStatus('success')
      setForm(INITIAL_FORM)
      setTimeout(() => setStatus(null), 5000)
    } catch (err) {
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" ref={sectionRef} className="relative py-32 bg-[#fafafa] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="hidden md:block absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-red-100/40 rounded-full blur-[120px]" />
        <div className="hidden md:block absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[100px]" />
        <div className="hidden absolute top-[-5%] right-[-10%] w-[300px] h-[300px] bg-red-100/20 rounded-full blur-[60px]" />
        <div className="hidden absolute bottom-[-5%] left-[-10%] w-[250px] h-[250px] bg-blue-50/20 rounded-full blur-[60px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5 space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest">
                <MessageCircle size={12} />
                Hubungi Kami
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-blue-950 leading-[0.9] tracking-tighter">
                Mari Bicara <br />
                <span className="text-red-600 italic font-serif font-light">Kesihatan.</span>
              </h2>
              <p className="text-neutral-500 text-lg max-w-md font-medium leading-relaxed">
                Ada pertanyaan tentang rawatan atau ingin buat temujanji? Kami sedia mendengar dan membantu anda.
              </p>
            </motion.div>

            <div className="space-y-8">
              <div className="flex gap-2 p-1 bg-neutral-200/50 rounded-2xl w-fit">
                {BRANCHES.map((branch) => (
                  <button
                    key={branch.id}
                    onClick={() => setActiveBranch(branch.id)}
                    className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                      activeBranch === branch.id
                        ? 'bg-white text-blue-900 shadow-sm'
                        : 'text-neutral-600 hover:text-blue-900'
                    }`}
                  >
                    {branch.name}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {BRANCHES.filter((b) => b.id === activeBranch).map((branch) => (
                  <motion.div
                    key={branch.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="flex gap-4 group cursor-pointer">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-neutral-200 flex items-center justify-center text-red-600 md:group-hover:bg-red-600 md:group-hover:text-white transition-all duration-300 shadow-sm">
                        <MapPin size={20} />
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-black text-neutral-600 uppercase tracking-widest mb-1">Lokasi Kami</p>
                        <p className="text-neutral-700 font-medium leading-snug">{branch.address}</p>
                        <a
                          href={branch.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-red-600 text-xs font-bold mt-2 hover:underline"
                        >
                          Buka Google Maps <ArrowRight size={12} />
                        </a>
                      </div>
                    </div>

                    <div className="flex gap-4 group cursor-pointer">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-neutral-200 flex items-center justify-center text-red-600 md:group-hover:bg-red-600 md:group-hover:text-white transition-all duration-300 shadow-sm">
                        <Phone size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-neutral-600 uppercase tracking-widest mb-1">Talian Terus</p>
                        <p className="text-neutral-700 font-bold">{branch.phone}</p>
                        <p className="text-neutral-600 font-medium">{branch.mobile}</p>
                      </div>
                    </div>

                    <div className="flex gap-4 group cursor-pointer">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-neutral-200 flex items-center justify-center text-red-600 md:group-hover:bg-red-600 md:group-hover:text-white transition-all duration-300 shadow-sm">
                        <Clock size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-neutral-600 uppercase tracking-widest mb-1">Waktu Operasi</p>
                        <div className="bg-neutral-50 border border-neutral-100 rounded-2xl p-4 space-y-3">
                          {branch.hours.map((h, i) => (
                            <div key={i} className="flex items-center justify-between">
                              <span className="text-[11px] font-bold text-neutral-700 tracking-wide whitespace-nowrap">
                                {h.day}
                              </span>
                              <div className="flex-1 mx-3 border-t border-dashed border-neutral-200" />
                              <span className="text-[12px] font-black text-blue-700 whitespace-nowrap">
                                {h.time}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-[3rem] p-8 md:p-12 md:shadow-2xl md:shadow-blue-900/5 shadow-lg md:border border-neutral-100 relative overflow-hidden"
            >
              <div className="mb-10">
                <h3 className="text-3xl font-black text-blue-950 mb-2">Hantar Mesej</h3>
                <p className="text-neutral-400 font-medium">Kami akan membalas pertanyaan anda secepat mungkin.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] ml-1">Nama Penuh</label>
                    <input
                      type="text"
                      placeholder="Contoh: Siti Aminah"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={`w-full px-6 py-4 rounded-2xl bg-neutral-50 border md:transition-all outline-none text-neutral-800 font-medium ${
                        errors.name ? 'border-red-200 focus:border-red-400' : 'border-neutral-100 focus:border-red-300 md:focus:bg-white'
                      }`}
                    />
                    {errors.name && <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider ml-1">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] ml-1">Nombor Telefon</label>
                    <input
                      type="tel"
                      placeholder="012-3456789"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className={`w-full px-6 py-4 rounded-2xl bg-neutral-50 border md:transition-all outline-none text-neutral-800 font-medium ${
                        errors.phone ? 'border-red-200 focus:border-red-400' : 'border-neutral-100 focus:border-red-300 md:focus:bg-white'
                      }`}
                    />
                    {errors.phone && <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider ml-1">{errors.phone}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] ml-1">Cawangan Pilihan</label>
                  <div className="grid grid-cols-2 gap-4">
                    {BRANCHES.map((branch) => (
                      <button
                        key={branch.id}
                        type="button"
                        onClick={() => setForm({ ...form, branch: branch.id })}
                        className={`px-4 py-4 rounded-2xl border text-xs font-bold md:transition-all flex items-center justify-center gap-2 ${
                          form.branch === branch.id
                            ? 'bg-blue-900 text-white border-blue-900 md:shadow-lg md:shadow-blue-900/20'
                            : 'bg-neutral-50 text-neutral-500 border-neutral-100 hover:border-red-200'
                        }`}
                      >
                        <Calendar size={14} />
                        {branch.name}
                      </button>
                    ))}
                  </div>
                  {errors.branch && <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider ml-1">{errors.branch}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] ml-1">Pertanyaan Anda</label>
                  <textarea
                    rows={4}
                    placeholder="Bagaimana kami boleh membantu anda hari ini?"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`w-full px-6 py-4 rounded-2xl bg-neutral-50 border md:transition-all outline-none text-neutral-800 font-medium resize-none ${
                      errors.message ? 'border-red-200 focus:border-red-400' : 'border-neutral-100 focus:border-red-300 md:focus:bg-white'
                    }`}
                  />
                  {errors.message && <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider ml-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full relative group overflow-hidden bg-blue-950 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs md:hover:shadow-2xl md:hover:shadow-red-900/40 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Hantar Mesej
                        <Send size={14} className="md:group-hover:translate-x-1 md:group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-400 translate-y-full md:group-hover:translate-y-0 transition-transform duration-500" />
                </button>
                <p className="text-[10px] text-neutral-400 leading-relaxed">
                  This site is protected by reCAPTCHA and the Google{' '}
                  <a href="https://policies.google.com/privacy" className="underline">Privacy Policy</a> and{' '}
                  <a href="https://policies.google.com/terms" className="underline">Terms of Service</a> apply.
                </p>
              </form>

              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute inset-0 z-20 bg-white flex flex-col items-center justify-center p-12 text-center"
                  >
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 size={40} />
                    </div>
                    <h4 className="text-2xl font-black text-blue-950 mb-2">Terima Kasih!</h4>
                    <p className="text-neutral-500 font-medium mb-8">
                      Mesej anda telah berjaya dihantar. Pasukan kami akan menghubungi anda dalam masa terdekat.
                    </p>
                    <button
                      onClick={() => setStatus(null)}
                      className="text-red-600 font-black text-[10px] uppercase tracking-widest hover:underline"
                    >
                      Hantar Mesej Lain
                    </button>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mt-6 flex items-center gap-3 p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100"
                  >
                    <AlertCircle size={20} />
                    <p className="text-xs font-bold uppercase tracking-wider">Maaf, ralat berlaku. Sila cuba lagi.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
