import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import { allProducts } from '../../data/mockData'
import { useCart } from '../../context/CartContext'
import Rating from '../common/Rating'

export default function FeaturedProducts() {
  const { t, i18n } = useTranslation()
  const { addItem } = useCart()
  const lang = i18n.language
  const featured = allProducts.filter((p) => p.isFeatured)

  return (
    <section className="mt-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {t('home.featured')}
        </h2>
        <Link to="/products" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
          {t('common.viewAll')} →
        </Link>
      </div>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={16}
        slidesPerView={2}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        breakpoints={{ 640: { slidesPerView: 3 }, 1024: { slidesPerView: 4 } }}
      >
        {featured.map((product) => (
          <SwiperSlide key={product.id}>
            <motion.div whileHover={{ y: -4 }} className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md">
              <Link to={`/products/${product.id}`} className="relative block aspect-[3/4] overflow-hidden bg-gray-100">
                <img src={product.image} alt={lang === 'ar' ? product.nameAr : product.nameEn} className="h-full w-full object-cover transition group-hover:scale-105" loading="lazy" />
                {product.discount > 0 && (
                  <span className="absolute left-2 top-2 rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
                    -{product.discount}%
                  </span>
                )}
              </Link>
              <div className="p-3">
                <Link to={`/products/${product.id}`}>
                  <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">{lang === 'ar' ? product.nameAr : product.nameEn}</h3>
                </Link>
                <Rating value={product.rating} size={12} showCount count={product.reviewCount} />
                <div className="mt-1 flex items-center gap-2">
                  {product.discount > 0 ? (
                    <>
                      <span className="font-bold text-brand-600">{Math.round(product.price * (1 - product.discount / 100))} {t('common.egp')}</span>
                      <span className="text-xs text-gray-400 line-through">{product.price} {t('common.egp')}</span>
                    </>
                  ) : (
                    <span className="font-bold text-brand-600">{product.price} {t('common.egp')}</span>
                  )}
                </div>
                <button
                  onClick={() => addItem(product, product.sizes[0], (lang === 'ar' ? product.colors : product.colorsEn)[0], 1)}
                  className="mt-2 w-full rounded-xl bg-brand-600 py-2 text-xs font-bold text-white transition hover:bg-brand-700"
                >
                  {t('cart.addToCart')}
                </button>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
