import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { HiAdjustments, HiX } from 'react-icons/hi'

const CATEGORIES = ['all', 'women', 'men', 'kids', 'accessories', 'shoes']
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size']
const COLORS_EN = ['Black', 'White', 'Pink', 'Blue', 'Red', 'Brown', 'Gray', 'Beige', 'Navy', 'Cream']

export default function ProductFilters({ filters, setFilters }) {
  const { t } = useTranslation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const sortOptions = [
    { value: 'newest', label: t('products.sortNewest') },
    { value: 'price-low', label: t('products.sortPriceLow') },
    { value: 'price-high', label: t('products.sortPriceHigh') },
    { value: 'rating', label: t('products.sortRating') },
  ]

  const updateFilter = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }))

  const clearFilters = () => setFilters({ category: 'all', search: '', sort: 'newest', priceRange: [0, 1000], sizes: [], colors: [] })

  const hasActiveFilters = filters.category !== 'all' || filters.sizes.length > 0 || filters.colors.length > 0 || filters.priceRange[0] > 0 || filters.priceRange[1] < 1000

  const toggleArrayFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value) ? prev[key].filter((v) => v !== value) : [...prev[key], value],
    }))
  }

  const filterPanel = (
    <div className="space-y-6">
      <div>
        <h4 className="mb-2 text-sm font-bold text-gray-700">{t('dashboard.categories')}</h4>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => updateFilter('category', cat)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                filters.category === cat ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {t(`categories.${cat}`)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-bold text-gray-700">{t('products.priceRange')}</h4>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={filters.priceRange[0]}
            onChange={(e) => updateFilter('priceRange', [Number(e.target.value), filters.priceRange[1]])}
            className="w-20 rounded-lg border border-gray-200 px-2 py-1.5 text-xs outline-none focus:border-brand-400"
            min={0}
            placeholder={t('products.min')}
          />
          <span className="text-gray-400">—</span>
          <input
            type="number"
            value={filters.priceRange[1]}
            onChange={(e) => updateFilter('priceRange', [filters.priceRange[0], Number(e.target.value)])}
            className="w-20 rounded-lg border border-gray-200 px-2 py-1.5 text-xs outline-none focus:border-brand-400"
            min={0}
            placeholder={t('products.max')}
          />
          <span className="text-xs text-gray-400">{t('common.egp')}</span>
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-bold text-gray-700">{t('cart.size')}</h4>
        <div className="flex flex-wrap gap-1.5">
          {SIZES.map((size) => (
            <button
              key={size}
              onClick={() => toggleArrayFilter('sizes', size)}
              className={`rounded-lg border px-2.5 py-1 text-xs font-semibold transition ${
                filters.sizes.includes(size) ? 'border-brand-600 bg-brand-50 text-brand-700' : 'border-gray-200 text-gray-500 hover:border-gray-300'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-bold text-gray-700">{t('cart.color')}</h4>
        <div className="flex flex-wrap gap-1.5">
          {COLORS_EN.map((color) => (
            <button
              key={color}
              onClick={() => toggleArrayFilter('colors', color)}
              className={`rounded-lg border px-2.5 py-1 text-xs font-semibold transition ${
                filters.colors.includes(color) ? 'border-brand-600 bg-brand-50 text-brand-700' : 'border-gray-200 text-gray-500 hover:border-gray-300'
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <button onClick={clearFilters} className="text-xs font-semibold text-red-500 hover:text-red-600">
          {t('products.clearFilters')}
        </button>
      )}
    </div>
  )

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <input
            type="search"
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            placeholder={t('navbar.search')}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-brand-400 sm:w-64"
          />
          <button
            onClick={() => setMobileOpen(true)}
            className="flex items-center gap-1 rounded-xl border border-gray-200 px-3 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 lg:hidden"
          >
            <HiAdjustments size={16} />
            {t('products.filter')}
          </button>
        </div>
        <select
          value={filters.sort}
          onChange={(e) => updateFilter('sort', e.target.value)}
          className="rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-brand-400"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div className="flex gap-8">
        <div className="hidden w-56 shrink-0 lg:block">
          {filterPanel}
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/50 lg:hidden"
                onClick={() => setMobileOpen(false)}
              />
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'tween' }}
                className="fixed inset-y-0 left-0 z-50 w-72 overflow-y-auto bg-white p-6 shadow-xl lg:hidden"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-bold">{t('products.filters')}</h3>
                  <button onClick={() => setMobileOpen(false)} className="rounded p-1 hover:bg-gray-100">
                    <HiX size={20} />
                  </button>
                </div>
                {filterPanel}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
