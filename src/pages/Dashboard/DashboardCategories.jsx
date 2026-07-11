import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { HiPlus, HiPencil, HiTrash, HiCollection } from 'react-icons/hi'
import { categories as mockCategories } from '../../data/mockData'
import { fadeInUp, staggerContainer } from '../../utils/animations'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import Modal from '../../components/common/Modal'
import EmptyState from '../../components/common/EmptyState'

const defaultFormData = {
  nameEn: '',
  image: '',
}

export default function DashboardCategories() {
  const { t } = useTranslation()
  const [categoriesList, setCategoriesList] = useState(mockCategories)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [formData, setFormData] = useState(defaultFormData)

  const openAddModal = () => {
    setFormData(defaultFormData)
    setShowAddModal(true)
  }

  const openEditModal = (category) => {
    setSelectedCategory(category)
    setFormData({
      nameEn: category.nameEn,
      image: category.image,
    })
    setShowEditModal(true)
  }

  const openDeleteModal = (category) => {
    setSelectedCategory(category)
    setShowDeleteModal(true)
  }

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSaveNew = () => {
    const newCategory = {
      id: Date.now(),
      nameEn: formData.nameEn,
      nameAr: formData.nameEn,
      slug: formData.nameEn.toLowerCase().replace(/\s+/g, '-'),
      image: formData.image || 'https://via.placeholder.com/600',
      count: 0,
    }
    setCategoriesList((prev) => [...prev, newCategory])
    setShowAddModal(false)
    setFormData(defaultFormData)
  }

  const handleSaveEdit = () => {
    setCategoriesList((prev) =>
      prev.map((c) =>
        c.id === selectedCategory.id
          ? {
              ...c,
              nameEn: formData.nameEn,
              slug: formData.nameEn.toLowerCase().replace(/\s+/g, '-'),
              image: formData.image,
            }
          : c
      )
    )
    setShowEditModal(false)
    setSelectedCategory(null)
    setFormData(defaultFormData)
  }

  const handleDelete = () => {
    setCategoriesList((prev) => prev.filter((c) => c.id !== selectedCategory.id))
    setShowDeleteModal(false)
    setSelectedCategory(null)
  }

  const isFormValid = formData.nameEn.trim().length > 0

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="space-y-0"
    >
      {/* Page Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('dashboard.categories')}</h1>
        <Button variant="primary" onClick={openAddModal}>
          <HiPlus size={18} />
          {t('dashboard.addCategory')}
        </Button>
      </div>

      {/* Categories Grid */}
      {categoriesList.length === 0 ? (
        <div className="rounded-2xl bg-white p-8 dark:bg-gray-800">
          <EmptyState
            icon={HiCollection}
            title={t('dashboard.noCategoriesYet')}
            description={t('dashboard.addFirstCategory')}
            action={
              <Button variant="primary" onClick={openAddModal}>
                <HiPlus size={18} />
                {t('dashboard.addCategory')}
              </Button>
            }
          />
        </div>
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {categoriesList.map((category) => (
              <motion.div
                key={category.id}
                variants={fadeInUp}
                exit={{ opacity: 0, scale: 0.95 }}
                layout
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.nameEn}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-3 left-4">
                    <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-800 backdrop-blur-sm dark:bg-gray-900/80 dark:text-gray-200">
                      {category.count} {t('dashboard.productCount')}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {category.nameEn}
                  </h3>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(category)}
                      className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-brand-600 dark:hover:bg-gray-700 dark:hover:text-brand-400"
                      aria-label={`Edit ${category.nameEn}`}
                    >
                      <HiPencil size={18} />
                    </button>
                    <button
                      onClick={() => openDeleteModal(category)}
                      className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                      aria-label={`Delete ${category.nameEn}`}
                    >
                      <HiTrash size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Add Category Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title={t('dashboard.addCategory')}
        size="sm"
      >
        <div className="space-y-4">
          <Input
            label={t('dashboard.categoryName')}
            required
            value={formData.nameEn}
            onChange={(e) => handleFormChange('nameEn', e.target.value)}
            placeholder={t('dashboard.enterCategoryName')}
          />
          <Input
            label={t('dashboard.image')}
            value={formData.image}
            onChange={(e) => handleFormChange('image', e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
          {formData.image && (
            <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
              <img
                src={formData.image}
                alt="Preview"
                className="h-32 w-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none'
                }}
              />
            </div>
          )}
          <div className="flex items-center justify-end gap-3 border-t border-gray-200 pt-4 dark:border-gray-700">
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>
              {t('common.cancel')}
            </Button>
            <Button variant="primary" onClick={handleSaveNew} disabled={!isFormValid}>
              {t('dashboard.addCategory')}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit Category Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title={t('dashboard.editCategory')}
        size="sm"
      >
        <div className="space-y-4">
          <Input
            label={t('dashboard.categoryName')}
            required
            value={formData.nameEn}
            onChange={(e) => handleFormChange('nameEn', e.target.value)}
            placeholder={t('dashboard.enterCategoryName')}
          />
          <Input
            label={t('dashboard.image')}
            value={formData.image}
            onChange={(e) => handleFormChange('image', e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
          {formData.image && (
            <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
              <img
                src={formData.image}
                alt="Preview"
                className="h-32 w-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none'
                }}
              />
            </div>
          )}
          <div className="flex items-center justify-end gap-3 border-t border-gray-200 pt-4 dark:border-gray-700">
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              {t('common.cancel')}
            </Button>
            <Button variant="primary" onClick={handleSaveEdit} disabled={!isFormValid}>
              {t('dashboard.saveChanges')}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title={t('dashboard.deleteCategory')}
        size="sm"
      >
        <div className="space-y-6">
          <p className="text-gray-600 dark:text-gray-400">
            {t('dashboard.deleteConfirm')}{' '}
            <span className="font-semibold text-gray-900 dark:text-white">
              {selectedCategory?.nameEn}
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
