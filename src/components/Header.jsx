import { useTranslation } from 'react-i18next'
import { useCart } from '../context/CartContext'

export default function Header({ page, setPage }) {
  const { t, i18n } = useTranslation()
  const { count } = useCart()
  const isAr = i18n.language === 'ar'

  const toggleLang = () => {
    const next = isAr ? 'en' : 'ar'
    i18n.changeLanguage(next)
    localStorage.setItem('lang', next)
    document.documentElement.lang = next
    document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr'
  }

  return (
    <header className="sticky top-0 z-50 border-b border-pink-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <button
          onClick={() => setPage('home')}
          className="text-xl font-bold text-brand-700"
        >
          {t('storeName')}
        </button>

        <nav className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => setPage('home')}
            className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${page === 'home' ? 'bg-brand-100 text-brand-700' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            {t('home')}
          </button>
          <button
            onClick={() => setPage('cart')}
            className={`relative rounded-lg px-3 py-1.5 text-sm font-semibold ${page === 'cart' || page === 'checkout' ? 'bg-brand-100 text-brand-700' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            {t('cart')}
            {count > 0 && (
              <span className="absolute -top-1 -left-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-xs text-white">
                {count}
              </span>
            )}
          </button>
          <button
            onClick={toggleLang}
            className="rounded-lg border border-brand-200 px-3 py-1.5 text-sm font-semibold text-brand-700 hover:bg-brand-50"
          >
            {t('language')}
          </button>
        </nav>
      </div>
    </header>
  )
}
