import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { HiTrash, HiArrowLeft, HiTag, HiShoppingBag } from 'react-icons/hi'
import { DELIVERY_FEE, FREE_DELIVERY_MIN } from '../../config/store'
import { useCart } from '../../context/CartContext'
import QuantitySelector from '../../components/common/QuantitySelector'
import EmptyState from '../../components/common/EmptyState'
import { fadeInUp, staggerContainer } from '../../utils/animations'

export default function Cart() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { items, removeItem, updateQty, subtotal } = useCart()
  const lang = i18n.language
  const deliveryFee = subtotal >= FREE_DELIVERY_MIN ? 0 : DELIVERY_FEE
  const total = subtotal + deliveryFee

  const [coupon, setCoupon] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0
  const finalTotal = total - discount

  const handleCoupon = () => {
    if (coupon.trim().toLowerCase() === 'fashion10') {
      setCouponApplied(true)
    }
  }

  if (items.length === 0) {
    return (
      <>
        <Helmet><title>{t('cart.title')} — {t('common.storeName')}</title></Helmet>
        <EmptyState
          icon={HiShoppingBag}
          title={t('cart.emptyCart')}
          description={t('cart.emptyCartDesc')}
          action={
            <button onClick={() => navigate('/')} className="rounded-xl bg-brand-600 px-6 py-2.5 font-bold text-white hover:bg-brand-700">
              {t('cart.continueShopping')}
            </button>
          }
        />
      </>
    )
  }

  return (
    <>
      <Helmet><title>{t('cart.title')} — {t('common.storeName')}</title></Helmet>

      <button onClick={() => navigate(-1)} className="mb-4 flex items-center gap-1 text-sm font-semibold text-gray-500 hover:text-brand-600">
        <HiArrowLeft size={16} /> {t('common.back')}
      </button>

      <h1 className="mb-6 text-2xl font-bold">{t('cart.title')} ({items.length})</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-4 lg:col-span-2"
        >
          {items.map((item) => (
            <motion.div
              key={item.key}
              variants={fadeInUp}
              layout
              className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
            >
              <img src={item.image} alt="" className="h-28 w-24 rounded-xl object-cover" />
              <div className="flex flex-1 flex-col gap-1">
                <p className="font-bold text-gray-900">{lang === 'ar' ? item.nameAr : item.nameEn}</p>
                <p className="text-sm text-gray-500">
                  {t('cart.size')}: {item.size} · {t('cart.color')}: {item.color}
                </p>
                <p className="font-bold text-brand-600">{item.price} {t('common.egp')}</p>
                <div className="mt-auto flex items-center gap-3">
                  <QuantitySelector
                    value={item.qty}
                    onChange={(val) => updateQty(item.key, val)}
                    min={1}
                  />
                  <button
                    onClick={() => removeItem(item.key)}
                    className="flex items-center gap-1 text-sm font-semibold text-red-500 hover:text-red-600"
                  >
                    <HiTrash size={14} /> {t('cart.remove')}
                  </button>
                </div>
              </div>
              <p className="text-lg font-bold text-gray-900">{item.price * item.qty} {t('common.egp')}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-4">
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="mb-4 text-lg font-bold">{t('cart.orderSummary')}</h3>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">{t('cart.subtotal')}</span>
                  <span className="font-semibold">{subtotal} {t('common.egp')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{t('cart.deliveryFee')}</span>
                  <span className="font-semibold">
                    {deliveryFee === 0 ? (
                      <span className="text-green-600">{t('common.free')} 🎉</span>
                    ) : (
                      `${deliveryFee} ${t('common.egp')}`
                    )}
                  </span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>{t('cart.couponDiscount')}</span>
                    <span>-{discount} {t('common.egp')}</span>
                  </div>
                )}
                <hr className="my-2" />
                <div className="flex justify-between text-lg font-bold">
                  <span>{t('cart.grandTotal')}</span>
                  <span className="text-brand-600">{finalTotal} {t('common.egp')}</span>
                </div>
              </div>

              {subtotal < FREE_DELIVERY_MIN && (
                <p className="mt-3 rounded-lg bg-brand-50 p-2 text-xs text-brand-700">
                  🚚 {t('cart.freeDeliveryHint', { amount: FREE_DELIVERY_MIN - subtotal })}
                </p>
              )}
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h4 className="mb-2 flex items-center gap-2 text-sm font-bold">
                <HiTag size={16} className="text-brand-500" />
                {t('cart.couponCode')}
              </h4>
              {couponApplied ? (
                <p className="rounded-lg bg-green-50 p-2 text-sm font-semibold text-green-700">
                  ✅ {t('cart.couponApplied')}
                </p>
              ) : (
                <div className="flex gap-2">
                  <input
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder={t('cart.couponPlaceholder')}
                    className="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-400"
                  />
                  <button onClick={handleCoupon} className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-bold text-white hover:bg-gray-800">
                    {t('cart.couponApply')}
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full rounded-xl bg-brand-600 py-3.5 font-bold text-white transition hover:bg-brand-700"
            >
              {t('checkout.title')}
            </button>

            <button
              onClick={() => navigate('/products')}
              className="w-full rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50"
            >
              {t('cart.continueShopping')}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
