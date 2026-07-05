import { useTranslation } from 'react-i18next'
import { DELIVERY_FEE, FREE_DELIVERY_MIN } from '../config/store'
import { useCart } from '../context/CartContext'

export default function CartPage({ setPage }) {
  const { t, i18n } = useTranslation()
  const { items, removeItem, updateQty, subtotal } = useCart()
  const lang = i18n.language
  const deliveryFee = subtotal >= FREE_DELIVERY_MIN ? 0 : DELIVERY_FEE
  const total = subtotal + deliveryFee

  if (items.length === 0) {
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

  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="mb-6 text-2xl font-bold">{t('cart')}</h2>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.key}
            className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
          >
            <img
              src={item.image}
              alt=""
              className="h-24 w-20 rounded-xl object-cover"
            />
            <div className="flex flex-1 flex-col gap-1">
              <p className="font-bold">{lang === 'ar' ? item.nameAr : item.nameEn}</p>
              <p className="text-sm text-gray-500">
                {t('size')}: {item.size} · {t('color')}: {item.color}
              </p>
              <p className="font-bold text-brand-600">
                {item.price} {t('egp')}
              </p>
              <div className="mt-auto flex items-center gap-3">
                <div className="flex items-center rounded-lg border">
                  <button
                    onClick={() => updateQty(item.key, item.qty - 1)}
                    className="px-3 py-1 font-bold text-gray-600"
                  >
                    −
                  </button>
                  <span className="px-2 font-semibold">{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.key, item.qty + 1)}
                    className="px-3 py-1 font-bold text-gray-600"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.key)}
                  className="text-sm font-semibold text-red-500"
                >
                  {t('remove')}
                </button>
              </div>
            </div>
            <p className="font-bold">{item.price * item.qty} {t('egp')}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl bg-gray-50 p-5">
        <div className="flex justify-between text-sm">
          <span>{t('total')}</span>
          <span>{subtotal} {t('egp')}</span>
        </div>
        <div className="mt-2 flex justify-between text-sm">
          <span>{t('deliveryFee')}</span>
          <span>{deliveryFee === 0 ? (lang === 'ar' ? 'مجاني 🎉' : 'Free 🎉') : `${deliveryFee} ${t('egp')}`}</span>
        </div>
        <div className="mt-3 flex justify-between border-t pt-3 text-lg font-bold">
          <span>{t('grandTotal')}</span>
          <span className="text-brand-600">{total} {t('egp')}</span>
        </div>
      </div>

      <button
        onClick={() => setPage('checkout')}
        className="mt-4 w-full rounded-xl bg-brand-600 py-3 font-bold text-white hover:bg-brand-700"
      >
        {t('checkout')}
      </button>
    </div>
  )
}
