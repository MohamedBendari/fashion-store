import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { HiMenu, HiX, HiShoppingBag, HiUser, HiSearch } from 'react-icons/hi'
import { useCart } from '../../context/CartContext'

export default function Header() {
  const { t, i18n } = useTranslation()
  const { count } = useCart()
  const isAr = i18n.language === 'ar'
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const toggleLang = () => {
    const next = isAr ? 'en' : 'ar'
    i18n.changeLanguage(next)
    localStorage.setItem('lang', next)
    document.documentElement.lang = next
    document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr'
  }

  const navLinks = [
    { to: '/', label: t('navbar.home') },
    { to: '/products', label: t('navbar.products') },
    { to: '/about', label: t('navbar.about') },
    { to: '/contact', label: t('navbar.contact') },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-pink-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/" className="text-xl font-bold text-brand-700">
            {t('common.storeName')}
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
                  isActive(link.to)
                    ? 'bg-brand-100 text-brand-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button onClick={() => setSearchOpen(!searchOpen)} className="rounded-lg p-2 text-gray-600 hover:bg-gray-100">
              <HiSearch size={20} />
            </button>

            <button
              onClick={() => navigate('/cart')}
              className="relative rounded-lg p-2 text-gray-600 hover:bg-gray-100"
            >
              <HiShoppingBag size={20} />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-xs text-white">
                  {count}
                </span>
              )}
            </button>

            <button onClick={() => navigate('/login')} className="hidden rounded-lg p-2 text-gray-600 hover:bg-gray-100 sm:block">
              <HiUser size={20} />
            </button>

            <button
              onClick={toggleLang}
              className="rounded-lg border border-brand-200 px-3 py-1.5 text-sm font-semibold text-brand-700 hover:bg-brand-50"
            >
              {t('common.language')}
            </button>

            <button onClick={() => setMobileOpen(true)} className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 md:hidden">
              <HiMenu size={22} />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-pink-100"
            >
              <div className="mx-auto max-w-6xl px-4 py-3">
                <input
                  autoFocus
                  type="search"
                  placeholder={t('navbar.search')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.target.value.trim()) {
                      navigate(`/products?q=${encodeURIComponent(e.target.value.trim())}`)
                      setSearchOpen(false)
                    }
                  }}
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/50"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: isAr ? '100%' : '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: isAr ? '100%' : '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className={`fixed top-0 z-[70] flex h-full w-72 flex-col bg-white shadow-xl ${isAr ? 'right-0' : 'left-0'}`}
            >
              <div className="flex items-center justify-between border-b border-pink-100 px-4 py-3">
                <span className="text-lg font-bold text-brand-700">{t('common.storeName')}</span>
                <button onClick={() => setMobileOpen(false)} className="rounded-lg p-1 text-gray-500 hover:bg-gray-100">
                  <HiX size={22} />
                </button>
              </div>
              <nav className="flex flex-1 flex-col gap-1 p-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                      isActive(link.to)
                        ? 'bg-brand-100 text-brand-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <hr className="my-2 border-gray-100" />
                <Link
                  to="/cart"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                >
                  {t('navbar.cart')} {count > 0 && `(${count})`}
                </Link>
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                >
                  {t('navbar.login')}
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                >
                  {t('navbar.profile')}
                </Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
