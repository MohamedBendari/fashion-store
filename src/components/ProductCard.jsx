import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getProductColors, getProductName } from '../data/products'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { t, i18n } = useTranslation()
  const { addItem } = useCart()
  const lang = i18n.language
  const colors = getProductColors(product, lang)
  const [size, setSize] = useState(product.sizes[0])
  const [color, setColor] = useState(colors[0])
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    if (!product.inStock) return
    addItem(product, size, color, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={getProductName(product, lang)}
          className="h-full w-full object-cover transition group-hover:scale-105"
          loading="lazy"
        />
        {!product.inStock && (
          <span className="absolute left-2 top-2 rounded-full bg-gray-800/80 px-2 py-1 text-xs text-white">
            {t('outOfStock')}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="font-bold text-gray-900">{getProductName(product, lang)}</h3>
          <p className="mt-1 text-lg font-bold text-brand-600">
            {product.price} {t('egp')}
          </p>
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-500">{t('size')}</label>
          <div className="mt-1 flex flex-wrap gap-1">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`rounded-lg border px-2 py-1 text-xs font-semibold ${size === s ? 'border-brand-600 bg-brand-50 text-brand-700' : 'border-gray-200 text-gray-600'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-500">{t('color')}</label>
          <div className="mt-1 flex flex-wrap gap-1">
            {colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`rounded-lg border px-2 py-1 text-xs font-semibold ${color === c ? 'border-brand-600 bg-brand-50 text-brand-700' : 'border-gray-200 text-gray-600'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleAdd}
          disabled={!product.inStock}
          className={`mt-auto rounded-xl py-2.5 text-sm font-bold transition ${
            product.inStock
              ? added
                ? 'bg-green-500 text-white'
                : 'bg-brand-600 text-white hover:bg-brand-700'
              : 'cursor-not-allowed bg-gray-200 text-gray-400'
          }`}
        >
          {added ? '✓' : t('addToCart')}
        </button>
      </div>
    </article>
  )
}
