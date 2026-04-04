import React, { useState } from 'react'
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

const BRANCHES = [
  {
    id: 'puchong-permai',
    name: 'Puchong Permai',
    address: 'No. 12, Jalan Permai 1, Taman Puchong Permai, 47100 Puchong, Selangor',
    phone: '+603-8070 1234',
    mobile: '+6016-691 4270',
    mapUrl: 'https://maps.app.goo.gl/B7tT98wH4qeywhM5A'
  },
  {
    id: 'puchong-utama',
    name: 'Puchong Utama',
    address: 'No. 5, Jalan Utama 2, Taman Puchong Utama, 47150 Puchong, Selangor',
    phone: '+603-8071 5678',
    mobile: '+6016-691 4270',
    mapUrl: 'https://maps.app.goo.gl/B7tT98wH4qeywhM5A'
  }
]

function sanitize(str) {
  return str.replace(/[<>"'&]/g, c => ({'<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#x27;','&':'&amp;'}[c]))
}

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const [activeBranch, setActiveBranch] = useState(BRANCHES[0].id)

  const validate = () => {
    const e = {}
    if (!form.name.trim() || form.name.length < 2) e.name = 'Sila masukkan nama penuh anda'
    if (!form.phone.trim() || !/^[0-9+\s\-]{8,15}$/.test(form.phone)) e.phone = 'Nombor telefon tidak sah'
    if (!form.message.trim() || form.message.length < 5) e.message = 'Sila kongsikan sedikit butiran pertanyaan anda'
    if (!form.branch) e.branch = 'Sila pilih cawangan pilihan anda'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
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
    <section id="contact" className="relative py-32 bg-[#fafafa] overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-red-100/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Content & Info */}
          <div className="lg:col-span-5 space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
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

            {/* Branch Selector & Info */}
            <div className="space-y-8">
              <div className="flex gap-2 p-1 bg-neutral-200/50 rounded-2xl w-fit">
                {BRANCHES.map((branch) => (
                  <button
                    key={branch.id}
                    onClick={() => setActiveBranch(branch.id)}
                    className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                      activeBranch === branch.id 
                        ? 'bg-white text-blue-900 shadow-sm' 
                        : 'text-neutral-500 hover:text-blue-900'
                    }`}
                  >
                    {branch.name}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {BRANCHES.filter(b => b.id === activeBranch).map((branch) => (
                  <motion.div
                    key={branch.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="flex gap-4 group cursor-pointer">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-neutral-200 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 shadow-sm">
                        <MapPin size={20} />
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1">Lokasi Kami</p>
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
                      <div className="w-12 h-12 rounded-2xl bg-white border border-neutral-200 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 shadow-sm">
                        <Phone size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1">Talian Terus</p>
                        <p className="text-neutral-700 font-bold">{branch.phone}</p>
                        <p className="text-neutral-500 font-medium">{branch.mobile}</p>
                      </div>
                    </div>

                    <div className="flex gap-4 group cursor-pointer">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-neutral-200 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 shadow-sm">
                        <Clock size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1">Waktu Operasi</p>
                        <p className="text-neutral-700 font-bold">Isnin – Jumaat: 8:30am – 6:00pm</p>
                        <p className="text-neutral-500 font-medium">Sabtu: 8:30am – 1:00pm</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-blue-900/5 border border-neutral-100 relative overflow-hidden"
            >
              {/* Form Header */}
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
                      onChange={(e) => setForm({...form, name: e.target.value})}
                      className={`w-full px-6 py-4 rounded-2xl bg-neutral-50 border transition-all outline-none text-neutral-800 font-medium ${
                        errors.name ? 'border-red-200 focus:border-red-400' : 'border-neutral-100 focus:border-red-300 focus:bg-white'
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
                      onChange={(e) => setForm({...form, phone: e.target.value})}
                      className={`w-full px-6 py-4 rounded-2xl bg-neutral-50 border transition-all outline-none text-neutral-800 font-medium ${
                        errors.phone ? 'border-red-200 focus:border-red-400' : 'border-neutral-100 focus:border-red-300 focus:bg-white'
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
                        onClick={() => setForm({...form, branch: branch.id})}
                        className={`px-4 py-4 rounded-2xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                          form.branch === branch.id 
                            ? 'bg-blue-900 text-white border-blue-900 shadow-lg shadow-blue-900/20' 
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
                    onChange={(e) => setForm({...form, message: e.target.value})}
                    className={`w-full px-6 py-4 rounded-2xl bg-neutral-50 border transition-all outline-none text-neutral-800 font-medium resize-none ${
                      errors.message ? 'border-red-200 focus:border-red-400' : 'border-neutral-100 focus:border-red-300 focus:bg-white'
                    }`}
                  />
                  {errors.message && <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider ml-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full relative group overflow-hidden bg-blue-950 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all hover:shadow-2xl hover:shadow-red-900/40 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Hantar Mesej
                        <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </button>
              </form>

              {/* Status Messages */}
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
