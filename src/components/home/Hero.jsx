import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeInUp } from '../../utils/animations'

export default function Hero({ onShop }) {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 via-brand-500 to-pink-400 shadow-lg">
      <div className="relative z-10 grid items-center gap-6 px-6 py-14 sm:px-10 lg:grid-cols-2 lg:py-20">
        <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="max-w-lg">
          <span className="inline-block rounded-full bg-white/20 px-4 py-1 text-xs font-semibold text-white backdrop-blur">
            ✨ {t('home.newCollection2025')}
          </span>
          <h1 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            {t('home.heroTitle')}
          </h1>
          <p className="mt-3 text-lg text-pink-50">{t('home.heroSubtitle')}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={onShop}
              className="rounded-xl bg-white px-6 py-3 font-bold text-brand-700 shadow transition hover:scale-105"
            >
              {t('home.shopNow')}
            </button>
            <button
              onClick={() => navigate('/products')}
              className="rounded-xl border-2 border-white/50 px-6 py-3 font-bold text-white transition hover:bg-white/10"
            >
              {t('common.browseAll')}
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="hidden lg:block"
        >
          <img
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&q=80"
            alt="Fashion"
            className="mx-auto w-80 rounded-2xl shadow-2xl"
          />
        </motion.div>
      </div>

      <div className="pointer-events-none absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-white/10" />
      <div className="pointer-events-none absolute -right-6 top-4 h-24 w-24 rounded-full bg-white/10" />
      <div className="pointer-events-none absolute bottom-10 right-20 h-16 w-16 rounded-full bg-white/5" />
    </section>
  )
}
