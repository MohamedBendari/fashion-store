import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { getProductColors, getProductName } from '../../data/products'
import { useCart } from '../../context/CartContext'
import Rating from '../common/Rating'

export default function ProductCard({ product }) {
  const { t, i18n } = useTranslation()
  const { addItem } = useCart()
  const lang = i18n.language
  const colors = getProductColors(product, lang)
  const name = getProductName(product, lang)
  const [size, setSize] = useState(product.sizes[0])
  const [color, setColor] = useState(colors[0])
  const [added, setAdded] = useState(false)

  const finalPrice = product.discount > 0 ? Math.round(product.price * (1 - product.discount / 100)) : product.price

  const handleAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!product.inStock) return
    addItem(product, size, color, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <motion.article whileHover={{ y: -4 }} className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md">
      <Link to={`/products/${product.id}`} className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <img src={product.image} alt={name} className="h-full w-full object-cover transition group-hover:scale-105" loading="lazy" />
        {!product.inStock && (
          <span className="absolute left-2 top-2 rounded-full bg-gray-800/80 px-2 py-1 text-xs text-white">{t('cart.outOfStock')}</span>
        )}
        {product.discount > 0 && product.inStock && (
          <span className="absolute left-2 top-2 rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">-{product.discount}%</span>
        )}
        {product.isNew && (
          <span className="absolute right-2 top-2 rounded-full bg-brand-500 px-2 py-0.5 text-xs font-bold text-white">
            {t('common.new')}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <div>
          <Link to={`/products/${product.id}`}>
            <h3 className="text-sm font-bold text-gray-900 line-clamp-1">{name}</h3>
          </Link>
          {product.rating && <Rating value={product.rating} size={12} showCount count={product.reviewCount} />}
          <div className="mt-1 flex items-center gap-2">
            {product.discount > 0 ? (
              <>
                <span className="text-sm font-bold text-brand-600">{finalPrice} {t('common.egp')}</span>
                <span className="text-xs text-gray-400 line-through">{product.price}</span>
              </>
            ) : (
              <span className="text-sm font-bold text-brand-600">{product.price} {t('common.egp')}</span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {product.sizes.slice(0, 4).map((s) => (
            <button
              key={s}
              onClick={(e) => { e.preventDefault(); setSize(s) }}
              className={`rounded-md border px-1.5 py-0.5 text-[10px] font-semibold ${size === s ? 'border-brand-600 bg-brand-50 text-brand-700' : 'border-gray-200 text-gray-500'}`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-1">
          {colors.slice(0, 3).map((c) => (
            <button
              key={c}
              onClick={(e) => { e.preventDefault(); setColor(c) }}
              className={`rounded-md border px-1.5 py-0.5 text-[10px] font-semibold ${color === c ? 'border-brand-600 bg-brand-50 text-brand-700' : 'border-gray-200 text-gray-500'}`}
            >
              {c}
            </button>
          ))}
        </div>

        <button
          onClick={handleAdd}
          disabled={!product.inStock}
          className={`mt-auto rounded-xl py-2 text-xs font-bold transition ${
            product.inStock
              ? added ? 'bg-green-500 text-white' : 'bg-brand-600 text-white hover:bg-brand-700'
              : 'cursor-not-allowed bg-gray-200 text-gray-400'
          }`}
        >
          {added ? '✓' : t('cart.addToCart')}
        </button>
      </div>
    </motion.article>
  )
}
