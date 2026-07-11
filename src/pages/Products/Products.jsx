import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '../../utils/animations'
import { allProducts } from '../../data/mockData'
import ProductCard from '../../components/products/ProductCard'
import ProductFilters from '../../components/products/ProductFilters'
import Pagination from '../../components/common/Pagination'
import EmptyState from '../../components/common/EmptyState'
import { HiShoppingBag } from 'react-icons/hi'

const ITEMS_PER_PAGE = 8

export default function Products() {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()

  const [filters, setFilters] = useState({
    category: searchParams.get('category') || 'all',
    search: searchParams.get('q') || '',
    sort: 'newest',
    priceRange: [0, 1000],
    sizes: [],
    colors: [],
  })
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    let items = [...allProducts]

    if (filters.category !== 'all') {
      items = items.filter((p) => p.category === filters.category)
    }

    if (filters.search.trim()) {
      const q = filters.search.trim().toLowerCase()
      items = items.filter((p) => p.nameAr.toLowerCase().includes(q) || p.nameEn.toLowerCase().includes(q))
    }

    items = items.filter((p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1])

    if (filters.sizes.length > 0) {
      items = items.filter((p) => p.sizes.some((s) => filters.sizes.includes(s)))
    }

    if (filters.colors.length > 0) {
      items = items.filter((p) => p.colorsEn.some((c) => filters.colors.includes(c)))
    }

    switch (filters.sort) {
      case 'price-low': items.sort((a, b) => a.price - b.price); break
      case 'price-high': items.sort((a, b) => b.price - a.price); break
      case 'rating': items.sort((a, b) => b.rating - a.rating); break
      default: items.sort((a, b) => b.id - a.id)
    }

    return items
  }, [filters])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const handlePageChange = (p) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Helmet>
        <title>{t('products.title')} — {t('common.storeName')}</title>
      </Helmet>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t('products.allProducts')}</h1>
        <p className="text-sm text-gray-500">{filtered.length} {t('common.items')}</p>
      </div>

      <ProductFilters filters={filters} setFilters={(fn) => { setFilters(fn); setPage(1) }} />

      <div className="lg:ml-64">
        {paginated.length > 0 ? (
          <>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              key={`${filters.category}-${filters.sort}-${page}`}
              className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
            >
              {paginated.map((product) => (
                <motion.div key={product.id} variants={fadeInUp}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
            <div className="mt-8">
              <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
          </>
        ) : (
          <EmptyState icon={HiShoppingBag} title={t('products.noProducts')} description={t('products.adjustFilters')} />
        )}
      </div>
    </>
  )
}
