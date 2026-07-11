import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { HiLocationMarker, HiPhone, HiMail, HiClock } from 'react-icons/hi'
import { FaInstagram, FaFacebookF, FaTiktok, FaWhatsapp } from 'react-icons/fa'
import { fadeInUp, staggerContainer } from '../../utils/animations'
import { STORE_WHATSAPP } from '../../config/store'

export default function Contact() {
  const { t } = useTranslation()
  const [submitted, setSubmitted] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const onSubmit = () => {
    setSubmitted(true)
    reset()
    setTimeout(() => setSubmitted(false), 4000)
  }

  const contactInfo = [
    { icon: HiLocationMarker, title: t('contact.storeLocation'), text: t('contact.locationText') },
    { icon: HiPhone, title: t('contact.phoneLabel'), text: '+20 101 614 0481', isPhone: true },
    { icon: HiMail, title: t('contact.emailLabel'), text: 'info@fashionstore.com' },
    { icon: HiClock, title: t('contact.workingHoursLabel'), text: t('contact.workingHoursText') },
  ]

  const socials = [
    { icon: FaInstagram, label: 'Instagram', href: '#' },
    { icon: FaFacebookF, label: 'Facebook', href: '#' },
    { icon: FaTiktok, label: 'TikTok', href: '#' },
    { icon: FaWhatsapp, label: 'WhatsApp', href: `https://wa.me/${STORE_WHATSAPP}` },
  ]

  return (
    <>
      <Helmet><title>{t('contact.title')} — {t('common.storeName')}</title></Helmet>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">{t('contact.title')}</h1>
        <p className="mt-2 text-gray-500">{t('contact.subtitle')}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <motion.div variants={fadeInUp} initial="hidden" animate="visible">
          {submitted && (
            <div className="mb-4 rounded-xl bg-green-50 p-4 text-center text-sm font-semibold text-green-700">
              ✅ {t('contact.success')}
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-bold">{t('contact.sendMessage')}</h2>
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">{t('contact.name')} *</label>
                  <input {...register('name', { required: t('validation.required') })} className="field-input" />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">{t('contact.email')} *</label>
                  <input type="email" {...register('email', { required: t('validation.required') })} className="field-input" />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">{t('contact.subject')} *</label>
                <input {...register('subject', { required: t('validation.required') })} className="field-input" />
                {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject.message}</p>}
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">{t('contact.message')} *</label>
                <textarea rows={5} {...register('message', { required: t('validation.required') })} className="field-input" />
                {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
              </div>
              <button type="submit" className="w-full rounded-xl bg-brand-600 py-3 font-bold text-white hover:bg-brand-700">
                {t('contact.send')}
              </button>
            </div>
          </form>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-4">
          {contactInfo.map((info, idx) => (
            <motion.div key={idx} variants={fadeInUp} className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="rounded-full bg-brand-100 p-3">
                <info.icon size={20} className="text-brand-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{info.title}</h3>
                <p className="mt-1 text-sm text-gray-600" dir={info.isPhone ? 'ltr' : undefined}>
                  {info.text}
                </p>
              </div>
            </motion.div>
          ))}

          <motion.div variants={fadeInUp} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <h3 className="mb-3 font-bold text-gray-900">{t('contact.followUs')}</h3>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="rounded-full bg-gray-100 p-3 text-gray-600 transition hover:bg-brand-100 hover:text-brand-600">
                  <s.icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="overflow-hidden rounded-2xl bg-gray-200">
            <div className="flex h-48 items-center justify-center text-gray-500">
              <div className="text-center">
                <HiLocationMarker size={32} className="mx-auto text-brand-400" />
                <p className="mt-2 text-sm font-semibold">{t('contact.storeMap')}</p>
                <p className="text-xs text-gray-400">{t('contact.mapLocation')}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}
