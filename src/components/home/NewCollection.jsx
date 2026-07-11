import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '../../utils/animations'
import { allProducts } from '../../data/mockData'

export default function NewCollection() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const newItems = allProducts.filter((p) => p.isNew).slice(0, 3)

  return (
    <section className="mt-16">
      <div className="mb-6 text-center">
        <span className="text-sm font-semibold uppercase tracking-widest text-brand-500">
          {t('home.justArrived')}
        </span>
        <h2 className="mt-1 text-2xl font-bold text-gray-900">
          {t('home.newCollection')}
        </h2>
      </div>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid gap-4 sm:grid-cols-3"
      >
        {newItems.map((product, idx) => (
          <motion.div key={product.id} variants={fadeInUp}>
            <Link
              to={`/products/${product.id}`}
              className={`group relative block overflow-hidden rounded-2xl ${idx === 0 ? 'sm:row-span-2 sm:aspect-auto sm:h-full' : 'aspect-[4/3]'}`}
            >
              <img
                src={product.image}
                alt={lang === 'ar' ? product.nameAr : product.nameEn}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <span className="inline-block rounded-full bg-brand-500 px-2 py-0.5 text-xs font-semibold">
                  {t('common.new')}
                </span>
                <h3 className="mt-1 text-lg font-bold">{lang === 'ar' ? product.nameAr : product.nameEn}</h3>
                <p className="text-sm text-white/80">{product.price} {t('common.egp')}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
