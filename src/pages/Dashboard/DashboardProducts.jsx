import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { HiPlus, HiSearch, HiPencil, HiTrash, HiShoppingBag } from 'react-icons/hi'
import { allProducts, categories } from '../../data/mockData'
import { fadeInUp, staggerContainer } from '../../utils/animations'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import Modal from '../../components/common/Modal'
import Badge from '../../components/common/Badge'
import Pagination from '../../components/common/Pagination'
import EmptyState from '../../components/common/EmptyState'

const ITEMS_PER_PAGE = 5

const defaultFormData = {
  nameEn: '',
  price: '',
  category: '',
  sizes: '',
  descriptionEn: '',
  image: '',
  inStock: true,
}

export default function DashboardProducts() {
  const { t } = useTranslation()
  const [products, setProducts] = useState(allProducts)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [stockFilter, setStockFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [formData, setFormData] = useState(defaultFormData)

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.nameEn
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
      const matchesCategory = !categoryFilter || product.category === categoryFilter
      const matchesStock =
        stockFilter === 'all' ||
        (stockFilter === 'inStock' && product.inStock) ||
        (stockFilter === 'outOfStock' && !product.inStock)
      return matchesSearch && matchesCategory && matchesStock
    })
  }, [products, searchQuery, categoryFilter, stockFilter])

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const resetFilters = () => {
    setSearchQuery('')
    setCategoryFilter('')
    setStockFilter('all')
    setCurrentPage(1)
  }

  const openAddModal = () => {
    setFormData(defaultFormData)
    setShowAddModal(true)
  }

  const openEditModal = (product) => {
    setSelectedProduct(product)
    setFormData({
      nameEn: product.nameEn,
      price: String(product.price),
      category: product.category,
      sizes: Array.isArray(product.sizes) ? product.sizes.join(', ') : '',
      descriptionEn: product.descriptionEn || '',
      image: product.image || '',
      inStock: product.inStock,
    })
    setShowEditModal(true)
  }

  const openDeleteModal = (product) => {
    setSelectedProduct(product)
    setShowDeleteModal(true)
  }

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSaveNew = () => {
    const newProduct = {
      id: Date.now(),
      nameEn: formData.nameEn,
      nameAr: formData.nameEn,
      category: formData.category,
      price: Number(formData.price) || 0,
      sizes: formData.sizes
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      colors: [],
      colorsEn: [],
      image: formData.image || 'https://via.placeholder.com/400',
      images: formData.image ? [formData.image] : [],
      inStock: formData.inStock,
      rating: 0,
      reviewCount: 0,
      discount: null,
      descriptionEn: formData.descriptionEn,
      descriptionAr: '',
      isFeatured: false,
      isNew: true,
      isBestSeller: false,
      brand: '',
      sku: `NEW-${Date.now()}`,
    }
    setProducts((prev) => [newProduct, ...prev])
    setShowAddModal(false)
    setFormData(defaultFormData)
    setCurrentPage(1)
  }

  const handleSaveEdit = () => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === selectedProduct.id
          ? {
              ...p,
              nameEn: formData.nameEn,
              price: Number(formData.price) || 0,
              category: formData.category,
              sizes: formData.sizes
                .split(',')
                .map((s) => s.trim())
                .filter(Boolean),
              descriptionEn: formData.descriptionEn,
              image: formData.image,
              images: formData.image ? [formData.image] : p.images,
              inStock: formData.inStock,
            }
          : p
      )
    )
    setShowEditModal(false)
    setSelectedProduct(null)
    setFormData(defaultFormData)
  }

  const handleDelete = () => {
    setProducts((prev) => prev.filter((p) => p.id !== selectedProduct.id))
    setShowDeleteModal(false)
    setSelectedProduct(null)
    if (paginatedProducts.length === 1 && currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  const isFormValid = formData.nameEn.trim() && formData.price && formData.category

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="space-y-0"
    >
      {/* Page Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('dashboard.products')}</h1>
        <Button variant="primary" onClick={openAddModal}>
          <HiPlus size={18} />
          {t('dashboard.addProduct')}
        </Button>
      </div>

      {/* Search & Filters */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <Input
            placeholder={t('dashboard.searchProducts')}
            icon={HiSearch}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
          />
        </div>
        <div>
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value)
              setCurrentPage(1)
            }}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-brand-400"
          >
            <option value="">{t('dashboard.allCategories')}</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {cat.nameEn}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            value={stockFilter}
            onChange={(e) => {
              setStockFilter(e.target.value)
              setCurrentPage(1)
            }}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-brand-400"
          >
            <option value="all">{t('dashboard.allStockStatus')}</option>
            <option value="inStock">{t('dashboard.inStock')}</option>
            <option value="outOfStock">{t('dashboard.outOfStock')}</option>
          </select>
        </div>
      </div>

      {/* Products Table / Content */}
      {filteredProducts.length === 0 ? (
        <div className="rounded-2xl bg-white p-8 dark:bg-gray-800">
          <EmptyState
            icon={HiShoppingBag}
            title={t('dashboard.noProductsFound')}
            description={t('dashboard.adjustFiltersHint')}
            action={
              <Button variant="secondary" onClick={resetFilters}>
                {t('dashboard.clearFilters')}
              </Button>
            }
          />
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 md:block">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50">
                    <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-400">
                      {t('dashboard.image')}
                    </th>
                    <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-400">
                      {t('dashboard.name')}
                    </th>
                    <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-400">
                      {t('dashboard.category')}
                    </th>
                    <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-400">
                      {t('dashboard.price')}
                    </th>
                    <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-400">
                      {t('dashboard.status')}
                    </th>
                    <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-400">
                      {t('dashboard.actions')}
                    </th>
                  </tr>
                </thead>
                <motion.tbody
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  <AnimatePresence mode="popLayout">
                    {paginatedProducts.map((product) => (
                      <motion.tr
                        key={product.id}
                        variants={fadeInUp}
                        exit={{ opacity: 0, y: -10 }}
                        layout
                        className="border-b border-gray-100 transition-colors hover:bg-gray-50 dark:border-gray-700/50 dark:hover:bg-gray-700/30"
                      >
                        <td className="px-6 py-4">
                          <img
                            src={product.image}
                            alt={product.nameEn}
                            className="h-10 w-10 rounded-lg object-cover"
                          />
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                          {product.nameEn}
                        </td>
                        <td className="px-6 py-4 capitalize text-gray-600 dark:text-gray-400">
                          {product.category}
                        </td>
                        <td className="px-6 py-4 text-gray-900 dark:text-white">
                          ${product.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4">
                          <Badge color={product.inStock ? 'green' : 'red'}>
                            {product.inStock ? t('dashboard.inStock') : t('dashboard.outOfStock')}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openEditModal(product)}
                              aria-label={`Edit ${product.nameEn}`}
                            >
                              <HiPencil size={16} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                              onClick={() => openDeleteModal(product)}
                              aria-label={`Delete ${product.nameEn}`}
                            >
                              <HiTrash size={16} />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </motion.tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-4 md:hidden"
          >
            <AnimatePresence mode="popLayout">
              {paginatedProducts.map((product) => (
                <motion.div
                  key={product.id}
                  variants={fadeInUp}
                  exit={{ opacity: 0, y: -10 }}
                  layout
                  className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={product.image}
                      alt={product.nameEn}
                      className="h-16 w-16 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {product.nameEn}
                      </h3>
                      <p className="text-sm capitalize text-gray-500 dark:text-gray-400">
                        {product.category}
                      </p>
                      <div className="mt-1 flex items-center gap-3">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          ${product.price.toFixed(2)}
                        </span>
                        <Badge color={product.inStock ? 'green' : 'red'}>
                          {product.inStock ? t('dashboard.inStock') : t('dashboard.outOfStock')}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-end gap-2 border-t border-gray-100 pt-3 dark:border-gray-700">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditModal(product)}
                    >
                      <HiPencil size={16} />
                      {t('common.edit')}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                      onClick={() => openDeleteModal(product)}
                    >
                      <HiTrash size={16} />
                      {t('common.delete')}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Pagination */}
          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}

      {/* Add Product Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title={t('dashboard.addProduct')}
        size="lg"
      >
        <ProductForm
          formData={formData}
          onChange={handleFormChange}
          onCancel={() => setShowAddModal(false)}
          onSave={handleSaveNew}
          saveLabel={t('dashboard.addProduct')}
          isValid={isFormValid}
        />
      </Modal>

      {/* Edit Product Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title={t('dashboard.editProduct')}
        size="lg"
      >
        <ProductForm
          formData={formData}
          onChange={handleFormChange}
          onCancel={() => setShowEditModal(false)}
          onSave={handleSaveEdit}
          saveLabel={t('dashboard.saveChanges')}
          isValid={isFormValid}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title={t('dashboard.deleteProduct')}
        size="sm"
      >
        <div className="space-y-6">
          <p className="text-gray-600 dark:text-gray-400">
            {t('dashboard.deleteConfirm')}{' '}
            <span className="font-semibold text-gray-900 dark:text-white">
              {selectedProduct?.nameEn}
            </span>
            {' '}{t('dashboard.cannotBeUndone')}
          </p>
          <div className="flex items-center justify-end gap-3">
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              {t('common.cancel')}
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              <HiTrash size={16} />
              {t('common.delete')}
            </Button>
          </div>
        </div>
      </Modal>
    </motion.div>
  )
}

function ProductForm({ formData, onChange, onCancel, onSave, saveLabel, isValid }) {
  const { t } = useTranslation()
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label={t('dashboard.productName')}
          required
          value={formData.nameEn}
          onChange={(e) => onChange('nameEn', e.target.value)}
          placeholder={t('dashboard.enterProductName')}
        />
        <Input
          label={t('dashboard.price')}
          required
          type="number"
          min="0"
          step="0.01"
          value={formData.price}
          onChange={(e) => onChange('price', e.target.value)}
          placeholder="0.00"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-semibold text-gray-700 dark:text-gray-300">
            {t('dashboard.category')} <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.category}
            onChange={(e) => onChange('category', e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-brand-400"
          >
            <option value="">{t('dashboard.selectCategory')}</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {cat.nameEn}
              </option>
            ))}
          </select>
        </div>
        <Input
          label={t('dashboard.sizes')}
          value={formData.sizes}
          onChange={(e) => onChange('sizes', e.target.value)}
          placeholder="S, M, L, XL"
        />
      </div>
      <Input
        label={t('dashboard.image')}
        value={formData.image}
        onChange={(e) => onChange('image', e.target.value)}
        placeholder="https://example.com/image.jpg"
      />
      <Input
        label={t('dashboard.description')}
        type="textarea"
        rows={3}
        value={formData.descriptionEn}
        onChange={(e) => onChange('descriptionEn', e.target.value)}
        placeholder={t('dashboard.enterDescription')}
      />
      <div className="flex items-center gap-3">
        <label className="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            checked={formData.inStock}
            onChange={(e) => onChange('inStock', e.target.checked)}
            className="peer sr-only"
          />
          <div className="peer h-6 w-11 rounded-full bg-gray-300 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-brand-600 peer-checked:after:translate-x-full dark:bg-gray-600"></div>
        </label>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('dashboard.inStock')}
        </span>
      </div>
      <div className="flex items-center justify-end gap-3 border-t border-gray-200 pt-4 dark:border-gray-700">
        <Button variant="secondary" onClick={onCancel}>
          {t('common.cancel')}
        </Button>
        <Button variant="primary" onClick={onSave} disabled={!isValid}>
          {saveLabel}
        </Button>
      </div>
    </div>
  )
}
