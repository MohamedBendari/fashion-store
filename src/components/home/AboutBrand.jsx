import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { fadeInUp } from '../../utils/animations'

export default function AboutBrand() {
  const { t } = useTranslation()

  return (
    <section className="mt-16">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid items-center gap-8 rounded-2xl bg-gray-50 p-8 lg:grid-cols-2 lg:p-12"
      >
        <div>
          <span className="text-sm font-semibold uppercase tracking-widest text-brand-500">
            {t('home.ourStory')}
          </span>
          <h2 className="mt-2 text-2xl font-bold text-gray-900 lg:text-3xl">
            {t('home.fashionReflects')}
          </h2>
          <p className="mt-4 leading-relaxed text-gray-600">
            {t('home.aboutBrandText')}
          </p>
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-brand-600">500+</p>
              <p className="text-xs text-gray-500">{t('about.products')}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-brand-600">10K+</p>
              <p className="text-xs text-gray-500">{t('home.happyCustomers')}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-brand-600">5+</p>
              <p className="text-xs text-gray-500">{t('home.years')}</p>
            </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80"
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </motion.div>
    </section>
  )
}
