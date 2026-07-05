import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CITIES, CITIES_EN, DELIVERY_FEE, FREE_DELIVERY_MIN } from '../config/store'
import { useCart } from '../context/CartContext'
import { buildOrderMessage, buildWhatsAppUrl } from '../utils/whatsapp'

export default function CheckoutPage({ setPage }) {
  const { t, i18n } = useTranslation()
  const { items, subtotal, clearCart } = useCart()
  const lang = i18n.language
  const cities = lang === 'ar' ? CITIES : CITIES_EN

  const deliveryFee = subtotal >= FREE_DELIVERY_MIN ? 0 : DELIVERY_FEE
  const total = subtotal + deliveryFee

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    city: cities[0],
    notes: '',
  })
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      setError(lang === 'ar' ? 'املئي كل الحقول المطلوبة' : 'Please fill all required fields')
      return
    }

    const message = buildOrderMessage({
      customer: form,
      items,
      subtotal,
      deliveryFee,
      total,
      lang,
    })

    const url = buildWhatsAppUrl(message)
    window.open(url, '_blank')
    clearCart()
    setSent(true)
  }

  if (items.length === 0 && !sent) {
    return (
      <div className="py-16 text-center">
        <p className="text-xl text-gray-500">{t('emptyCart')}</p>
        <button
          onClick={() => setPage('home')}
          className="mt-4 rounded-xl bg-brand-600 px-6 py-2 font-bold text-white"
        >
          {t('continueShopping')}
        </button>
      </div>
    )
  }

  if (sent) {
    return (
      <div className="mx-auto max-w-md py-16 text-center">
        <div className="rounded-2xl bg-green-50 p-8">
          <p className="text-4xl">✅</p>
          <h2 className="mt-4 text-2xl font-bold text-green-800">{t('orderSentTitle')}</h2>
          <p className="mt-2 text-green-700">{t('orderSentDesc')}</p>
          <button
            onClick={() => {
              setSent(false)
              setPage('home')
            }}
            className="mt-6 rounded-xl bg-brand-600 px-6 py-2 font-bold text-white"
          >
            {t('newOrder')}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
      <form onSubmit={handleSubmit} className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold">{t('customerInfo')}</h2>

        {error && (
          <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</p>
        )}

        <div className="space-y-4">
          <Field label={t('fullName')} required>
            <input
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              className="field-input"
            />
          </Field>
          <Field label={t('phone')} required>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
              className="field-input"
              placeholder="01xxxxxxxxx"
            />
          </Field>
          <Field label={t('city')} required>
            <select
              value={form.city}
              onChange={(e) => update('city', e.target.value)}
              className="field-input"
            >
              {cities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </Field>
          <Field label={t('address')} required>
            <textarea
              rows={3}
              value={form.address}
              onChange={(e) => update('address', e.target.value)}
              className="field-input"
            />
          </Field>
          <Field label={t('notes')}>
            <textarea
              rows={2}
              value={form.notes}
              onChange={(e) => update('notes', e.target.value)}
              className="field-input"
            />
          </Field>

          <div className="rounded-xl bg-brand-50 p-4">
            <p className="text-sm font-semibold text-brand-800">{t('paymentMethod')}</p>
            <p className="mt-1 font-bold text-brand-700">💵 {t('cod')}</p>
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3 font-bold text-white hover:bg-green-700"
        >
          <span>WhatsApp</span>
          {t('placeOrder')}
        </button>
      </form>

      <div className="rounded-2xl bg-gray-50 p-6">
        <h3 className="mb-4 text-xl font-bold">{t('orderSummary')}</h3>
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item.key} className="flex justify-between text-sm">
              <span>
                {lang === 'ar' ? item.nameAr : item.nameEn} ×{item.qty}
              </span>
              <span>{item.price * item.qty} {t('egp')}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 space-y-2 border-t pt-4 text-sm">
          <div className="flex justify-between">
            <span>{t('total')}</span>
            <span>{subtotal} {t('egp')}</span>
          </div>
          <div className="flex justify-between">
            <span>{t('deliveryFee')}</span>
            <span>{deliveryFee === 0 ? (lang === 'ar' ? 'مجاني' : 'Free') : `${deliveryFee} ${t('egp')}`}</span>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span>{t('grandTotal')}</span>
            <span className="text-brand-600">{total} {t('egp')}</span>
          </div>
        </div>
        <p className="mt-4 text-xs text-gray-500">
          {t('freeDelivery')} {FREE_DELIVERY_MIN} {t('egp')}
        </p>
      </div>
    </div>
  )
}

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-gray-700">
        {label}{required && ' *'}
      </span>
      <div className="mt-1">{children}</div>
    </label>
  )
}
