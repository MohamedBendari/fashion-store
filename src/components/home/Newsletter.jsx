import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { fadeInUp } from '../../utils/animations'
import { HiMail } from 'react-icons/hi'

export default function Newsletter() {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <section className="mt-16">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="rounded-2xl bg-gradient-to-r from-brand-600 to-pink-400 p-8 text-center text-white sm:p-12"
      >
        <HiMail className="mx-auto text-4xl" />
        <h2 className="mt-3 text-2xl font-bold">
          {t('home.newsletterTitle')}
        </h2>
        <p className="mt-2 text-sm text-pink-100">
          {t('home.newsletterSubtitle')}
        </p>
        {subscribed ? (
          <p className="mt-6 font-semibold">
            ✅ {t('home.subscribed')}
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-md gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('home.emailPlaceholder')}
              required
              className="flex-1 rounded-xl px-4 py-3 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-white/50"
            />
            <button
              type="submit"
              className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-brand-600 transition hover:bg-pink-50"
            >
              {t('home.subscribe')}
            </button>
          </form>
        )}
      </motion.div>
    </section>
  )
}
