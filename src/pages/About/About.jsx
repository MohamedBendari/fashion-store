import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '../../utils/animations'
import { HiEye, HiSparkles, HiHeart } from 'react-icons/hi'

export default function About() {
  const { t } = useTranslation()

  const values = [
    { icon: HiSparkles, title: t('about.ourStory'), text: t('about.ourStoryText') },
    { icon: HiEye, title: t('about.ourVision'), text: t('about.ourVisionText') },
    { icon: HiHeart, title: t('about.ourMission'), text: t('about.ourMissionText') },
  ]

  const stats = [
    { value: '500+', label: t('about.products') },
    { value: '10K+', label: t('about.happyCustomers') },
    { value: '5+', label: t('about.years') },
    { value: '15+', label: t('about.cities') },
  ]

  return (
    <>
      <Helmet><title>{t('about.title')} — {t('common.storeName')}</title></Helmet>

      <section className="overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 to-pink-400 px-6 py-16 text-center text-white sm:px-10">
        <motion.div variants={fadeInUp} initial="hidden" animate="visible">
          <h1 className="text-3xl font-bold sm:text-4xl">{t('about.title')}</h1>
          <p className="mx-auto mt-3 max-w-xl text-lg text-pink-100">
            {t('about.subtitle')}
          </p>
        </motion.div>
      </section>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-12 space-y-12"
      >
        {values.map((item, idx) => (
          <motion.div
            key={idx}
            variants={fadeInUp}
            className={`grid items-center gap-8 lg:grid-cols-2 ${idx % 2 === 1 ? 'lg:direction-rtl' : ''}`}
          >
            <div className={idx % 2 === 1 ? 'lg:order-2' : ''}>
              <div className="mb-3 inline-flex rounded-full bg-brand-100 p-3">
                <item.icon size={24} className="text-brand-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{item.title}</h2>
              <p className="mt-3 leading-relaxed text-gray-600">{item.text}</p>
            </div>
            <div className={`overflow-hidden rounded-2xl ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
              <img
                src={`https://images.unsplash.com/photo-${['1441986300917-64674bd600d8', '1558618666-fcd25c85f82e', '1483985988355-763728e1935b'][idx]}?w=600&q=80`}
                alt=""
                className="h-64 w-full object-cover lg:h-80"
                loading="lazy"
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.value} className="rounded-2xl bg-gray-50 p-6 text-center">
            <p className="text-3xl font-bold text-brand-600">{stat.value}</p>
            <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </motion.div>
    </>
  )
}
