import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { HiArrowLeft, HiHeart, HiOutlineHeart, HiShare, HiTruck, HiShieldCheck, HiRefresh } from 'react-icons/hi'
import { allProducts } from '../../data/mockData'
import { useCart } from '../../context/CartContext'
import Rating from '../../components/common/Rating'
import QuantitySelector from '../../components/common/QuantitySelector'
import ProductCard from '../../components/products/ProductCard'

export default function ProductDetails() {
  const { id } = useParams()
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const lang = i18n.language
  const product = allProducts.find((p) => p.id === Number(id))

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [qty, setQty] = useState(1)
  const [wishlisted, setWishlisted] = useState(false)
  const [added, setAdded] = useState(false)
  const [zoomed, setZoomed] = useState(false)

  if (!product) {
    return (
      <div className="py-16 text-center">
        <p className="text-xl text-gray-500">{t('products.notFound')}</p>
        <Link to="/products" className="mt-4 inline-block rounded-xl bg-brand-600 px-6 py-2 font-bold text-white">
          {t('products.backToProducts')}
        </Link>
      </div>
    )
  }

  const name = lang === 'ar' ? product.nameAr : product.nameEn
  const description = lang === 'ar' ? product.descriptionAr : product.descriptionEn
  const colors = lang === 'ar' ? product.colors : product.colorsEn
  const images = product.images || [product.image]
  const finalPrice = product.discount > 0 ? Math.round(product.price * (1 - product.discount / 100)) : product.price
  const related = allProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  const size = selectedSize || product.sizes[0]
  const color = selectedColor || colors[0]

  const handleAdd = () => {
    if (!product.inStock) return
    addItem(product, size, color, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <>
      <Helmet><title>{name} — {t('common.storeName')}</title></Helmet>

      <button onClick={() => navigate(-1)} className="mb-4 flex items-center gap-1 text-sm font-semibold text-gray-500 hover:text-brand-600">
        <HiArrowLeft size={16} /> {t('common.back')}
      </button>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative aspect-[3/4] cursor-zoom-in overflow-hidden rounded-2xl bg-gray-100"
              onClick={() => setZoomed(true)}
            >
              <img src={images[selectedImage]} alt={name} className="h-full w-full object-cover" />
              {product.discount > 0 && (
                <span className="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1 text-sm font-bold text-white">
                  -{product.discount}%
                </span>
              )}
            </motion.div>
          </AnimatePresence>
          {images.length > 1 && (
            <div className="mt-3 flex gap-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`h-16 w-16 overflow-hidden rounded-xl border-2 transition ${selectedImage === idx ? 'border-brand-600' : 'border-transparent hover:border-gray-300'}`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-500">{product.brand}</p>
              <h1 className="mt-1 text-2xl font-bold text-gray-900 lg:text-3xl">{name}</h1>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setWishlisted(!wishlisted)} className="rounded-full bg-gray-100 p-2 transition hover:bg-pink-100">
                {wishlisted ? <HiHeart size={20} className="text-red-500" /> : <HiOutlineHeart size={20} className="text-gray-400" />}
              </button>
              <button className="rounded-full bg-gray-100 p-2 transition hover:bg-gray-200">
                <HiShare size={20} className="text-gray-400" />
              </button>
            </div>
          </div>

          <div className="mt-2">
            <Rating value={product.rating} size={18} showCount count={product.reviewCount} />
          </div>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-brand-600">{finalPrice} {t('common.egp')}</span>
            {product.discount > 0 && (
              <span className="text-lg text-gray-400 line-through">{product.price} {t('common.egp')}</span>
            )}
          </div>

          <p className="mt-4 leading-relaxed text-gray-600">{description}</p>

          <div className="mt-6">
            <h4 className="mb-2 text-sm font-bold text-gray-700">{t('cart.size')}</h4>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                    (selectedSize || product.sizes[0]) === s ? 'border-brand-600 bg-brand-50 text-brand-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <h4 className="mb-2 text-sm font-bold text-gray-700">{t('cart.color')}</h4>
            <div className="flex flex-wrap gap-2">
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                    (selectedColor || colors[0]) === c ? 'border-brand-600 bg-brand-50 text-brand-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <QuantitySelector value={qty} onChange={setQty} />
            <button
              onClick={handleAdd}
              disabled={!product.inStock}
              className={`flex-1 rounded-xl py-3 text-sm font-bold transition ${
                product.inStock
                  ? added ? 'bg-green-500 text-white' : 'bg-brand-600 text-white hover:bg-brand-700'
                  : 'cursor-not-allowed bg-gray-200 text-gray-400'
              }`}
            >
              {!product.inStock ? t('cart.outOfStock') : added ? `✓ ${t('products.added')}` : t('cart.addToCart')}
            </button>
          </div>

          <div className="mt-8 space-y-3 rounded-2xl bg-gray-50 p-4">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <HiTruck size={20} className="text-brand-500" />
              <span>{t('products.deliveryDays')}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <HiRefresh size={20} className="text-brand-500" />
              <span>{t('products.freeReturns')}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <HiShieldCheck size={20} className="text-brand-500" />
              <span>{t('products.qualityGuarantee')}</span>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-xl font-bold">{t('products.relatedProducts')}</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      <AnimatePresence>
        {zoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-black/90 p-4"
            onClick={() => setZoomed(false)}
          >
            <img src={images[selectedImage]} alt={name} className="max-h-full max-w-full rounded-lg object-contain" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
