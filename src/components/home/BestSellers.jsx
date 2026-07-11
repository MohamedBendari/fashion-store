import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '../../utils/animations'
import { allProducts } from '../../data/mockData'
import { useCart } from '../../context/CartContext'
import Rating from '../common/Rating'

export default function BestSellers() {
  const { t, i18n } = useTranslation()
  const { addItem } = useCart()
  const lang = i18n.language
  const bestSellers = allProducts.filter((p) => p.isBestSeller).slice(0, 4)

  return (
    <section className="mt-16">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {t('home.bestSellers')}
        </h2>
        <Link to="/products" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
          {t('common.viewAll')} →
        </Link>
      </div>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-2 gap-4 lg:grid-cols-4"
      >
        {bestSellers.map((product) => (
          <motion.article key={product.id} variants={fadeInUp} whileHover={{ y: -4 }} className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md">
            <Link to={`/products/${product.id}`} className="relative block aspect-[3/4] overflow-hidden bg-gray-100">
              <img src={product.image} alt={lang === 'ar' ? product.nameAr : product.nameEn} className="h-full w-full object-cover transition group-hover:scale-105" loading="lazy" />
              <span className="absolute left-2 top-2 rounded-full bg-yellow-500 px-2 py-0.5 text-xs font-bold text-white">
                🔥 {t('home.bestSellerBadge')}
              </span>
            </Link>
            <div className="p-3">
              <Link to={`/products/${product.id}`}>
                <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">{lang === 'ar' ? product.nameAr : product.nameEn}</h3>
              </Link>
              <Rating value={product.rating} size={12} showCount count={product.reviewCount} />
              <p className="mt-1 font-bold text-brand-600">{product.price} {t('common.egp')}</p>
              <button
                onClick={() => addItem(product, product.sizes[0], (lang === 'ar' ? product.colors : product.colorsEn)[0], 1)}
                disabled={!product.inStock}
                className={`mt-2 w-full rounded-xl py-2 text-xs font-bold transition ${product.inStock ? 'bg-brand-600 text-white hover:bg-brand-700' : 'cursor-not-allowed bg-gray-200 text-gray-400'}`}
              >
                {product.inStock ? t('cart.addToCart') : t('cart.outOfStock')}
              </button>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}
