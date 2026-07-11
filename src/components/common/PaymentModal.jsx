import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { HiLockClosed, HiX, HiShieldCheck } from 'react-icons/hi'
import { modalVariants, overlayVariants } from '../../utils/animations'

function VisaLogo() {
  return (
    <svg viewBox="0 0 780 500" className="h-8 w-auto">
      <rect width="780" height="500" rx="40" fill="#1A1F71" />
      <path
        d="M293.2 348.7l33.4-195.7h53.4l-33.4 195.7H293.2zm246.8-190.6c-10.6-4-27.2-8.3-47.9-8.3-52.8 0-90 26.5-90.2 64.5-.3 28.1 26.5 43.7 46.8 53.1 20.8 9.6 27.8 15.7 27.7 24.3-.1 13.1-16.6 19.1-32 19.1-21.4 0-32.8-3-50.3-10.2l-6.9-3.1-7.5 43.8c12.5 5.5 35.6 10.2 59.6 10.5 56.1 0 92.5-26.2 92.9-66.8.2-22.3-14-39.2-44.8-53.2-18.6-9.1-30.1-15.1-30-24.3 0-8.1 9.7-16.8 30.6-16.8 17.4-.3 30.1 3.5 39.9 7.5l4.8 2.3 7.3-42.4zm137.3-5.1h-41.3c-12.8 0-22.4 3.5-28 16.2l-79.4 179.5h56.1l11.2-29.2h68.5l6.5 29.2h49.5l-43.1-195.7zm-65.9 126.2c4.4-11.3 21.5-54.7 21.5-54.7-.3.5 4.4-11.4 7.1-18.8l3.6 17s10.3 47.2 12.5 57.1h-44.7v-.6zM249.4 153l-52.4 133.5-5.6-27.1c-9.7-31.2-40-65.1-73.9-82l47.8 171h56.5l84.1-195.4h-56.5z"
        fill="#fff"
      />
      <path
        d="M146.9 153H60.9l-.7 3.8c67 16.2 111.4 55.3 129.7 102.3L171.6 170c-3.2-12.4-12.7-16.5-24.7-17z"
        fill="#F9A533"
      />
    </svg>
  )
}

function MastercardLogo() {
  return (
    <svg viewBox="0 0 780 500" className="h-8 w-auto">
      <rect width="780" height="500" rx="40" fill="#16366F" />
      <circle cx="330" cy="250" r="150" fill="#D9222A" />
      <circle cx="450" cy="250" r="150" fill="#EE9F2D" />
      <path
        d="M390 130.7c-33.4 26.4-54.8 67.1-54.8 112.3s21.4 85.9 54.8 112.3c33.4-26.4 54.8-67.1 54.8-112.3S423.4 157.1 390 130.7z"
        fill="#EB6100"
      />
    </svg>
  )
}

function MeezaLogo() {
  return (
    <svg viewBox="0 0 780 500" className="h-8 w-auto">
      <rect width="780" height="500" rx="40" fill="#004B87" />
      <text x="390" y="280" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="160" fill="#fff">
        meeza
      </text>
      <rect x="200" y="320" width="380" height="8" rx="4" fill="#E8B931" />
    </svg>
  )
}

function formatCardNumber(value) {
  const digits = value.replace(/\D/g, '').slice(0, 16)
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ')
}

function formatExpiry(value) {
  const digits = value.replace(/\D/g, '').slice(0, 4)
  if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2)
  return digits
}

export default function PaymentModal({ isOpen, onClose, total, currency }) {
  const { t } = useTranslation()
  const [step, setStep] = useState('form')
  const [cardNumber, setCardNumber] = useState('')
  const [cardHolder, setCardHolder] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [errors, setErrors] = useState({})

  function reset() {
    setStep('form')
    setCardNumber('')
    setCardHolder('')
    setExpiry('')
    setCvv('')
    setErrors({})
  }

  function handleClose() {
    reset()
    onClose()
  }

  function handleDone() {
    reset()
    onClose(true)
  }

  function validate() {
    const e = {}
    const digits = cardNumber.replace(/\s/g, '')
    if (!digits) e.cardNumber = t('checkout.cardNumberRequired')
    else if (digits.length !== 16) e.cardNumber = t('checkout.cardNumberInvalid')

    if (!cardHolder.trim()) e.cardHolder = t('checkout.cardholderRequired')

    const expiryDigits = expiry.replace('/', '')
    if (!expiryDigits) e.expiry = t('checkout.expiryRequired')
    else if (expiryDigits.length !== 4 || parseInt(expiryDigits.slice(0, 2)) > 12 || parseInt(expiryDigits.slice(0, 2)) < 1)
      e.expiry = t('checkout.expiryInvalid')

    const cvvDigits = cvv.replace(/\D/g, '')
    if (!cvvDigits) e.cvv = t('checkout.cvvRequired')
    else if (cvvDigits.length < 3 || cvvDigits.length > 4) e.cvv = t('checkout.cvvInvalid')

    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    setStep('processing')
    setTimeout(() => setStep('success'), 2000)
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
            onClick={step === 'form' ? handleClose : undefined}
          />
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-800"
          >
            {step === 'form' && (
              <>
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <HiLockClosed className="text-green-400" size={18} />
                      <span className="text-sm font-semibold text-white">{t('checkout.securePayment')}</span>
                    </div>
                    <button onClick={handleClose} className="rounded-lg p-1 text-gray-400 transition hover:text-white">
                      <HiX size={20} />
                    </button>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <VisaLogo />
                    <MastercardLogo />
                    <MeezaLogo />
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 p-6">
                  <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 dark:bg-gray-700">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{t('checkout.totalAmount')}</span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">{total} {currency}</span>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-semibold text-gray-700 dark:text-gray-300">{t('checkout.cardNumber')}</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder={t('checkout.cardNumberPlaceholder')}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      className={`field-input tracking-widest ${errors.cardNumber ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''}`}
                      dir="ltr"
                    />
                    {errors.cardNumber && <p className="mt-1 text-xs text-red-500">{errors.cardNumber}</p>}
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-semibold text-gray-700 dark:text-gray-300">{t('checkout.cardholderName')}</label>
                    <input
                      type="text"
                      placeholder={t('checkout.cardholderPlaceholder')}
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      className={`field-input ${errors.cardHolder ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''}`}
                    />
                    {errors.cardHolder && <p className="mt-1 text-xs text-red-500">{errors.cardHolder}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-sm font-semibold text-gray-700 dark:text-gray-300">{t('checkout.expiryDate')}</label>
                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder={t('checkout.expiryPlaceholder')}
                        value={expiry}
                        onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                        className={`field-input ${errors.expiry ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''}`}
                        dir="ltr"
                      />
                      {errors.expiry && <p className="mt-1 text-xs text-red-500">{errors.expiry}</p>}
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-semibold text-gray-700 dark:text-gray-300">{t('checkout.cvv')}</label>
                      <input
                        type="password"
                        inputMode="numeric"
                        placeholder={t('checkout.cvvPlaceholder')}
                        maxLength={4}
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                        className={`field-input ${errors.cvv ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''}`}
                        dir="ltr"
                      />
                      {errors.cvv && <p className="mt-1 text-xs text-red-500">{errors.cvv}</p>}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 py-3.5 text-sm font-bold text-white transition hover:bg-brand-700"
                  >
                    <HiLockClosed size={16} />
                    {t('checkout.payNow')} — {total} {currency}
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
                    <HiShieldCheck size={14} />
                    <span>{t('checkout.demoMode')}</span>
                  </div>
                </form>
              </>
            )}

            {step === 'processing' && (
              <div className="flex flex-col items-center justify-center px-6 py-16">
                <div className="relative mb-6 h-16 w-16">
                  <div className="absolute inset-0 animate-spin rounded-full border-4 border-gray-200 border-t-brand-600" />
                </div>
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">{t('checkout.processing')}</p>
              </div>
            )}

            {step === 'success' && (
              <div className="flex flex-col items-center justify-center px-6 py-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100"
                >
                  <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{t('checkout.paymentSuccess')}</h3>
                <span className="mt-1 rounded-full bg-yellow-100 px-3 py-0.5 text-xs font-semibold text-yellow-700">{t('checkout.demoMode')}</span>
                <p className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">{t('checkout.paymentSuccessDesc')}</p>
                <div className="mt-3 rounded-xl bg-gray-50 px-6 py-3 dark:bg-gray-700">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{t('checkout.totalAmount')}: </span>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">{total} {currency}</span>
                </div>
                <button
                  onClick={handleDone}
                  className="mt-6 w-full rounded-xl bg-brand-600 py-3 text-sm font-bold text-white transition hover:bg-brand-700"
                >
                  {t('checkout.done')}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
