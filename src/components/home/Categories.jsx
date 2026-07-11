import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '../../utils/animations'
import { categories } from '../../data/mockData'

export default function Categories() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language

  return (
    <section className="mt-16">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          {t('home.shopByCategory')}
        </h2>
      </div>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
      >
        {categories.map((cat) => (
          <motion.div key={cat.id} variants={fadeInUp}>
            <Link
              to={`/products?category=${cat.slug}`}
              className="group block text-center"
            >
              <div className="mx-auto aspect-square w-full overflow-hidden rounded-2xl bg-gray-100">
                <img
                  src={cat.image}
                  alt={lang === 'ar' ? cat.nameAr : cat.nameEn}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <h3 className="mt-2 text-sm font-semibold text-gray-700 group-hover:text-brand-600">
                {lang === 'ar' ? cat.nameAr : cat.nameEn}
              </h3>
              <p className="text-xs text-gray-400">{cat.count} {t('common.items')}</p>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
