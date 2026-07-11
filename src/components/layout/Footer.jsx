import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa'
import { STORE_WHATSAPP } from '../../config/store'

export default function Footer() {
  const { t } = useTranslation()

  const quickLinks = [
    { to: '/', label: t('navbar.home') },
    { to: '/products', label: t('navbar.products') },
    { to: '/about', label: t('navbar.about') },
    { to: '/contact', label: t('navbar.contact') },
  ]

  const customerLinks = [
    { to: '/cart', label: t('navbar.cart') },
    { to: '/profile', label: t('footer.myAccount') },
    { to: '/login', label: t('navbar.login') },
  ]

  return (
    <footer className="mt-16 border-t border-pink-100 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-bold text-brand-700">{t('common.storeName')}</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-500">{t('common.tagline')}</p>
            <div className="mt-4 flex gap-3">
              <a href="#" className="rounded-full bg-gray-200 p-2 text-gray-600 transition hover:bg-brand-100 hover:text-brand-600">
                <FaInstagram size={16} />
              </a>
              <a href="#" className="rounded-full bg-gray-200 p-2 text-gray-600 transition hover:bg-brand-100 hover:text-brand-600">
                <FaFacebookF size={16} />
              </a>
              <a href="#" className="rounded-full bg-gray-200 p-2 text-gray-600 transition hover:bg-brand-100 hover:text-brand-600">
                <FaTiktok size={16} />
              </a>
              <a href={`https://wa.me/${STORE_WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="rounded-full bg-gray-200 p-2 text-gray-600 transition hover:bg-green-100 hover:text-green-600">
                <FaWhatsapp size={16} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-900">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-gray-500 transition hover:text-brand-600">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-900">
              {t('footer.customerService')}
            </h4>
            <ul className="space-y-2">
              {customerLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-gray-500 transition hover:text-brand-600">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-900">
              {t('footer.contactUs')}
            </h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>{t('footer.location')}</li>
              <li dir="ltr">+20 101 614 0481</li>
              <li>info@fashionstore.com</li>
              <li>{t('footer.workingHours')}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} {t('common.storeName')} — {t('common.tagline')}
      </div>
    </footer>
  )
}
