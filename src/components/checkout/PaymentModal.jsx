import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import { HiLockClosed, HiX, HiCheckCircle, HiShieldCheck } from 'react-icons/hi'
import { overlayVariants, modalVariants } from '../../utils/animations'

const VISA_LOGO = (
  <svg viewBox="0 0 48 16" className="h-5 w-auto" aria-label="Visa">
    <path
      fill="#1A1F71"
      d="M19.4 1.2l-3 13.6h-3.5l3-13.6h3.5zm14.2 8.8l1.8-5 1.1 5h-2.9zm3.9 4.8h3.2L37.9 1.2h-3c-.7 0-1.2.4-1.5 1l-5.2 12.6h3.6l.7-2h4.4l.6 2zm-9.2-4.4c0-3.6-5-3.8-5-5.4 0-.5.5-1 1.5-1.1.5 0 1.9-.1 3.5.7l.6-2.9C28 1.3 26.9 1 25.5 1c-3.4 0-5.7 1.8-5.7 4.3 0 1.9 1.7 2.9 3 3.5 1.3.6 1.7 1 1.7 1.6 0 .8-1 1.2-2 1.2-1.6 0-2.6-.4-3.3-.8l-.6 2.9c.8.4 2.1.7 3.6.7 3.5 0 5.9-1.8 5.9-4.5zM15.6 1.2L10 14.8H6.3L3.5 4c-.2-.7-.3-1-.8-1.3C1.9 2.2.7 1.7 0 1.4l.1-.2h5.8c.7 0 1.4.5 1.6 1.4l1.4 7.6 3.6-9h3.6z"
    />
  </svg>
)

const MASTERCARD_LOGO = (
  <svg viewBox="0 0 48 30" className="h-5 w-auto" aria-label="Mastercard">
    <circle cx="18" cy="15" r="12" fill="#EB001B" />
    <circle cx="30" cy="15" r="12" fill="#F79E1B" />
    <path
      d="M24 5.6a12 12 0 0 1 0 18.8 12 12 0 0 1 0-18.8z"
      fill="#FF5F00"
    />
  </svg>
)

const MEEZA_LOGO = (
  <svg viewBox="0 0 60 20" className="h-5 w-auto" aria-label="Meeza">
    <rect rx="3" width="60" height="20" fill="#00875A" />
    <text x="30" y="14.5" textAnchor="middle" fill="white" fontSize="10" fontWeight="700" fontFamily="Arial, sans-serif">meeza</text>
  </svg>
)

function formatCardNumber(value) {
  const digits = value.replace(/\D/g, '').slice(0, 16)
  return digits.replace(/(.{4})/g, '$1 ').trim()
}

function formatExpiry(value) {
  const digits = value.replace(/\D/g, '').slice(0, 4)
  if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2)
  return digits
}

export default function PaymentModal({ isOpen, onClose, total, currency, onSuccess }) {
  const { t } = useTranslation()
  const [form, setForm] = useState({ cardNumber: '', cardholder: '', expiry: '', cvv: '' })
  const [errors, setErrors] = useState({})
  const [step, setStep] = useState('form')

  useEffect(() => {
    if (!isOpen) {
      setForm({ cardNumber: '', cardholder: '', expiry: '', cvv: '' })
      setErrors({})
      setStep('form')
    }
  }, [isOpen])

  const validate = () => {
    const errs = {}
    const digits = form.cardNumber.replace(/\s/g, '')
    if (!digits) errs.cardNumber = t('checkout.cardNumberRequired')
    else if (digits.length < 16) errs.cardNumber = t('checkout.cardNumberInvalid')

    if (!form.cardholder.trim()) errs.cardholder = t('checkout.cardholderRequired')

    const expiryParts = form.expiry.split('/')
    if (!form.expiry) errs.expiry = t('checkout.expiryRequired')
    else if (expiryParts.length !== 2 || expiryParts[0].length !== 2 || expiryParts[1].length !== 2 || +expiryParts[0] < 1 || +expiryParts[0] > 12) errs.expiry = t('checkout.expiryInvalid')

    const cvvDigits = form.cvv.replace(/\D/g, '')
    if (!cvvDigits) errs.cvv = t('checkout.cvvRequired')
    else if (cvvDigits.length < 3) errs.cvv = t('checkout.cvvInvalid')

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    setStep('processing')
    setTimeout(() => setStep('success'), 2000)
  }

  const handleDone = () => {
    onSuccess?.()
    onClose()
  }

  const handleChange = (field) => (e) => {
    let value = e.target.value
    if (field === 'cardNumber') value = formatCardNumber(value)
    else if (field === 'expiry') value = formatExpiry(value)
    else if (field === 'cvv') value = value.replace(/\D/g, '').slice(0, 4)
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={step === 'form' ? onClose : undefined}
          />
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            {step === 'form' && (
              <>
                {/* Header */}
                <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <HiLockClosed className="text-green-600" size={18} />
                      <h3 className="text-lg font-bold text-gray-900">{t('checkout.securePayment')}</h3>
                    </div>
                    <button onClick={onClose} className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600" aria-label={t('common.close')}>
                      <HiX size={20} />
                    </button>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    {VISA_LOGO}
                    {MASTERCARD_LOGO}
                    {MEEZA_LOGO}
                  </div>
                </div>

                {/* Amount bar */}
                <div className="flex items-center justify-between bg-brand-50 px-6 py-3">
                  <span className="text-sm font-medium text-gray-600">{t('checkout.totalAmount')}</span>
                  <span className="text-lg font-bold text-brand-700">{total} {currency}</span>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5" noValidate>
                  {/* Card Number */}
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-gray-700">{t('checkout.cardNumber')}</label>
                    <div className="relative">
                      <input
                        type="text"
                        inputMode="numeric"
                        value={form.cardNumber}
                        onChange={handleChange('cardNumber')}
                        placeholder={t('checkout.cardNumberPlaceholder')}
                        className={`w-full rounded-xl border bg-gray-50 px-4 py-3 text-sm tracking-wider outline-none transition focus:bg-white focus:ring-2 ${errors.cardNumber ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-brand-400 focus:ring-brand-100'}`}
                        dir="ltr"
                        autoComplete="cc-number"
                      />
                      <div className="pointer-events-none absolute inset-y-0 end-3 flex items-center">
                        {form.cardNumber.startsWith('4') && VISA_LOGO}
                        {form.cardNumber.startsWith('5') && MASTERCARD_LOGO}
                      </div>
                    </div>
                    {errors.cardNumber && <p className="mt-1 text-xs text-red-500">{errors.cardNumber}</p>}
                  </div>

                  {/* Cardholder */}
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-gray-700">{t('checkout.cardholderName')}</label>
                    <input
                      type="text"
                      value={form.cardholder}
                      onChange={handleChange('cardholder')}
                      placeholder={t('checkout.cardholderPlaceholder')}
                      className={`w-full rounded-xl border bg-gray-50 px-4 py-3 text-sm outline-none transition focus:bg-white focus:ring-2 ${errors.cardholder ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-brand-400 focus:ring-brand-100'}`}
                      autoComplete="cc-name"
                    />
                    {errors.cardholder && <p className="mt-1 text-xs text-red-500">{errors.cardholder}</p>}
                  </div>

                  {/* Expiry + CVV */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-gray-700">{t('checkout.expiryDate')}</label>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={form.expiry}
                        onChange={handleChange('expiry')}
                        placeholder={t('checkout.expiryPlaceholder')}
                        className={`w-full rounded-xl border bg-gray-50 px-4 py-3 text-sm tracking-wider outline-none transition focus:bg-white focus:ring-2 ${errors.expiry ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-brand-400 focus:ring-brand-100'}`}
                        dir="ltr"
                        autoComplete="cc-exp"
                      />
                      {errors.expiry && <p className="mt-1 text-xs text-red-500">{errors.expiry}</p>}
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-gray-700">{t('checkout.cvv')}</label>
                      <input
                        type="password"
                        inputMode="numeric"
                        value={form.cvv}
                        onChange={handleChange('cvv')}
                        placeholder={t('checkout.cvvPlaceholder')}
                        className={`w-full rounded-xl border bg-gray-50 px-4 py-3 text-sm tracking-wider outline-none transition focus:bg-white focus:ring-2 ${errors.cvv ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-brand-400 focus:ring-brand-100'}`}
                        dir="ltr"
                        autoComplete="cc-csc"
                      />
                      {errors.cvv && <p className="mt-1 text-xs text-red-500">{errors.cvv}</p>}
                    </div>
                  </div>

                  {/* Pay Button */}
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 py-3.5 text-sm font-bold text-white transition hover:bg-brand-700 active:scale-[0.98]"
                  >
                    <HiLockClosed size={16} />
                    {t('checkout.payNow')} — {total} {currency}
                  </button>
                </form>

                {/* Footer */}
                <div className="flex items-center justify-center gap-1.5 border-t border-gray-100 bg-gray-50 px-6 py-3">
                  <HiShieldCheck className="text-gray-400" size={14} />
                  <span className="text-xs text-gray-400">SSL Encrypted &middot; {t('checkout.demoMode')}</span>
                </div>
              </>
            )}

            {step === 'processing' && (
              <div className="flex flex-col items-center justify-center px-6 py-16">
                <div className="relative h-16 w-16">
                  <div className="absolute inset-0 animate-spin rounded-full border-4 border-gray-200 border-t-brand-600" />
                </div>
                <p className="mt-6 text-sm font-semibold text-gray-600">{t('checkout.processing')}</p>
                <div className="mt-3 flex items-center gap-3">
                  {VISA_LOGO}
                  {MASTERCARD_LOGO}
                  {MEEZA_LOGO}
                </div>
              </div>
            )}

            {step === 'success' && (
              <div className="flex flex-col items-center justify-center px-6 py-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100"
                >
                  <HiCheckCircle className="text-green-600" size={48} />
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-5 text-xl font-bold text-gray-900"
                >
                  {t('checkout.paymentSuccess')}
                </motion.h3>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-1 rounded-full bg-amber-100 px-3 py-0.5 text-xs font-semibold text-amber-700"
                >
                  {t('checkout.demoMode')}
                </motion.span>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-3 max-w-xs text-center text-sm text-gray-500"
                >
                  {t('checkout.paymentSuccessDesc')}
                </motion.p>
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  onClick={handleDone}
                  className="mt-6 w-full rounded-xl bg-green-600 py-3 text-sm font-bold text-white transition hover:bg-green-700 active:scale-[0.98]"
                >
                  {t('checkout.done')}
                </motion.button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
