import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { HiArrowLeft, HiTruck, HiCreditCard, HiCash } from 'react-icons/hi'
import { CITIES, CITIES_EN, DELIVERY_FEE, FREE_DELIVERY_MIN } from '../../config/store'
import { useCart } from '../../context/CartContext'
import { buildOrderMessage, buildWhatsAppUrl } from '../../utils/whatsapp'
import { fadeInUp } from '../../utils/animations'
import PaymentModal from '../../components/checkout/PaymentModal'

const EXPRESS_FEE = 30

export default function Checkout() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { items, subtotal, clearCart } = useCart()
  const lang = i18n.language
  const cities = lang === 'ar' ? CITIES : CITIES_EN

  const [sent, setSent] = useState(false)
  const [deliveryMethod, setDeliveryMethod] = useState('standard')
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  const baseDeliveryFee = subtotal >= FREE_DELIVERY_MIN ? 0 : DELIVERY_FEE
  const shippingCost = useMemo(() => {
    if (deliveryMethod === 'express') return baseDeliveryFee + EXPRESS_FEE
    return baseDeliveryFee
  }, [deliveryMethod, baseDeliveryFee])
  const total = subtotal + shippingCost

  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data) => {
    if (paymentMethod === 'card') {
      setShowPaymentModal(true)
      return
    }
    const message = buildOrderMessage({
      customer: { ...data, city: data.city || cities[0] },
      items,
      subtotal,
      deliveryFee: shippingCost,
      total,
      lang,
    })
    const url = buildWhatsAppUrl(message)
    window.open(url, '_blank')
    clearCart()
    setSent(true)
  }

  const handlePaymentSuccess = () => {
    clearCart()
    setSent(true)
  }

  if (items.length === 0 && !sent) {
    return (
      <>
        <Helmet><title>{t('checkout.title')} — {t('common.storeName')}</title></Helmet>
        <div className="py-16 text-center">
          <p className="text-xl text-gray-500">{t('cart.emptyCart')}</p>
          <button onClick={() => navigate('/')} className="mt-4 rounded-xl bg-brand-600 px-6 py-2 font-bold text-white">{t('cart.continueShopping')}</button>
        </div>
      </>
    )
  }

  if (sent) {
    return (
      <>
        <Helmet><title>{t('checkout.orderSentTitle')} — {t('common.storeName')}</title></Helmet>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-md py-16 text-center">
          <div className="rounded-2xl bg-green-50 p-8">
            <p className="text-5xl">✅</p>
            <h2 className="mt-4 text-2xl font-bold text-green-800">{t('checkout.orderSentTitle')}</h2>
            <p className="mt-2 text-green-700">{t('checkout.orderSentDesc')}</p>
            <button onClick={() => { setSent(false); navigate('/') }} className="mt-6 rounded-xl bg-brand-600 px-6 py-2.5 font-bold text-white">{t('checkout.newOrder')}</button>
          </div>
        </motion.div>
      </>
    )
  }

  const deliveryMethods = [
    { id: 'standard', label: t('checkout.standard'), price: baseDeliveryFee, icon: HiTruck },
    { id: 'express', label: t('checkout.express'), price: baseDeliveryFee + EXPRESS_FEE, icon: HiTruck },
  ]

  const paymentMethods = [
    { id: 'cod', label: t('checkout.cod'), icon: HiCash, desc: t('checkout.codDesc') },
    { id: 'card', label: t('checkout.card'), icon: HiCreditCard, desc: t('checkout.cardDesc') },
  ]

  return (
    <>
      <Helmet><title>{t('checkout.title')} — {t('common.storeName')}</title></Helmet>

      <button onClick={() => navigate(-1)} className="mb-4 flex items-center gap-1 text-sm font-semibold text-gray-500 hover:text-brand-600">
        <HiArrowLeft size={16} /> {t('common.back')}
      </button>

      <h1 className="mb-6 text-2xl font-bold">{t('checkout.title')}</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <motion.form variants={fadeInUp} initial="hidden" animate="visible" onSubmit={handleSubmit(onSubmit)} className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-bold">{t('checkout.customerInfo')}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">{t('checkout.fullName')} *</label>
                <input {...register('name', { required: t('validation.required') })} className="field-input" />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">{t('checkout.phone')} *</label>
                <input type="tel" placeholder="01xxxxxxxxx" {...register('phone', { required: t('validation.required'), pattern: { value: /^01[0125]\d{8}$/, message: t('validation.invalidPhone') } })} className="field-input" />
                {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">{t('checkout.city')} *</label>
                <select {...register('city')} className="field-input">
                  {cities.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-semibold text-gray-700">{t('checkout.address')} *</label>
                <textarea rows={2} {...register('address', { required: t('validation.required') })} className="field-input" />
                {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address.message}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-semibold text-gray-700">{t('checkout.notes')}</label>
                <textarea rows={2} {...register('notes')} className="field-input" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-bold">{t('checkout.deliveryMethod')}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {deliveryMethods.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setDeliveryMethod(m.id)}
                  className={`flex items-center gap-3 rounded-xl border-2 p-4 text-left transition ${deliveryMethod === m.id ? 'border-brand-600 bg-brand-50' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <m.icon size={24} className={deliveryMethod === m.id ? 'text-brand-600' : 'text-gray-400'} />
                  <div>
                    <p className="text-sm font-semibold">{m.label}</p>
                    <p className="text-xs text-gray-500">
                      {m.price === 0 ? t('common.free') : `${m.price} ${t('common.egp')}`}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-bold">{t('checkout.paymentMethod')}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {paymentMethods.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPaymentMethod(m.id)}
                  className={`flex items-center gap-3 rounded-xl border-2 p-4 text-left transition ${paymentMethod === m.id ? 'border-brand-600 bg-brand-50' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <m.icon size={24} className={paymentMethod === m.id ? 'text-brand-600' : 'text-gray-400'} />
                  <div>
                    <p className="text-sm font-semibold">{m.label}</p>
                    <p className="text-xs text-gray-500">{m.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className={`flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-bold text-white transition ${paymentMethod === 'card' ? 'bg-brand-600 hover:bg-brand-700' : 'bg-green-600 hover:bg-green-700'}`}>
            {paymentMethod === 'card' ? (
              <>{t('checkout.payNow')} — {total} {t('common.egp')}</>
            ) : (
              <><span>WhatsApp</span> {t('checkout.placeOrder')}</>
            )}
          </button>
        </motion.form>

        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-lg font-bold">{t('checkout.orderSummary')}</h3>
            <ul className="space-y-3">
              {items.map((item) => (
                <li key={item.key} className="flex justify-between text-sm">
                  <span className="text-gray-600">{lang === 'ar' ? item.nameAr : item.nameEn} ×{item.qty}</span>
                  <span className="font-semibold">{item.price * item.qty} {t('common.egp')}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 space-y-2 border-t pt-4 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">{t('checkout.subtotal')}</span><span>{subtotal} {t('common.egp')}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">{t('checkout.shippingCost')}</span><span>{shippingCost === 0 ? t('common.free') : `${shippingCost} ${t('common.egp')}`}</span></div>
              <div className="flex justify-between border-t pt-2 text-lg font-bold"><span>{t('checkout.grandTotal')}</span><span className="text-brand-600">{total} {t('common.egp')}</span></div>
            </div>
          </div>
        </div>
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentSuccess}
        total={total}
        currency={t('common.egp')}
      />
    </>
  )
}
