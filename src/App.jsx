import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Header from './components/Header'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import CartPage from './components/CartPage'
import CheckoutPage from './components/CheckoutPage'
import { FREE_DELIVERY_MIN } from './config/store'

export default function App() {
  const [page, setPage] = useState('home')
  const { t, i18n } = useTranslation()

  useEffect(() => {
    const lang = i18n.language
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [i18n.language])

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50/50 to-white">
      <Header page={page} setPage={setPage} />

      <main className="mx-auto max-w-6xl px-4 py-6">
        {page === 'home' && (
          <>
            <Hero onShop={scrollToProducts} />
            <p className="mt-4 text-center text-sm text-gray-500">
              🚚 {t('freeDelivery')} {FREE_DELIVERY_MIN} {t('egp')}
            </p>
            <div id="products">
              <ProductGrid />
            </div>
          </>
        )}

        {page === 'cart' && <CartPage setPage={setPage} />}
        {page === 'checkout' && <CheckoutPage setPage={setPage} />}
      </main>

      <footer className="mt-12 border-t border-pink-100 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} {t('storeName')} — {t('tagline')}
      </footer>
    </div>
  )
}
