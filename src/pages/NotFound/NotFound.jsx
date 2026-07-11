import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'

export default function NotFound() {
  const { t } = useTranslation()

  return (
    <>
      <Helmet><title>404 — {t('common.storeName')}</title></Helmet>
      <div className="flex min-h-[60vh] items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-8xl font-bold text-brand-200">404</p>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            {t('notFound.title')}
          </h1>
          <p className="mt-2 text-gray-500">
            {t('notFound.subtitle')}
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link to="/" className="rounded-xl bg-brand-600 px-6 py-2.5 font-bold text-white hover:bg-brand-700">
              {t('notFound.goHome')}
            </Link>
            <Link to="/products" className="rounded-xl border border-gray-200 px-6 py-2.5 font-semibold text-gray-600 hover:bg-gray-50">
              {t('navbar.products')}
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  )
}
