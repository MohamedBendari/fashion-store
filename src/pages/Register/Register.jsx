import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { HiUser, HiMail, HiLockClosed, HiPhone, HiEye, HiEyeOff } from 'react-icons/hi'
import { fadeInUp } from '../../utils/animations'

export default function Register() {
  const { t } = useTranslation()
  const [showPassword, setShowPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const password = watch('password')

  const onSubmit = () => setSubmitted(true)

  return (
    <>
      <Helmet><title>{t('register.title')} — {t('common.storeName')}</title></Helmet>
      <div className="flex min-h-[60vh] items-center justify-center py-8">
        <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900">{t('register.title')}</h1>
            <p className="mt-1 text-sm text-gray-500">{t('register.subtitle')}</p>
          </div>

          {submitted ? (
            <div className="rounded-2xl bg-green-50 p-6 text-center">
              <p className="text-4xl">🎉</p>
              <p className="mt-3 font-semibold text-green-800">{t('register.success')}</p>
              <Link to="/login" className="mt-4 inline-block rounded-xl bg-brand-600 px-6 py-2 font-bold text-white">
                {t('register.signIn')}
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-semibold text-gray-700">{t('register.firstName')} *</label>
                    <div className="relative">
                      <HiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input {...register('firstName', { required: t('validation.required') })} className="field-input pl-10" />
                    </div>
                    {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName.message}</p>}
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-semibold text-gray-700">{t('register.lastName')} *</label>
                    <input {...register('lastName', { required: t('validation.required') })} className="field-input" />
                    {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">{t('register.email')} *</label>
                  <div className="relative">
                    <HiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input type="email" {...register('email', { required: t('validation.required'), pattern: { value: /^\S+@\S+\.\S+$/, message: t('validation.invalidEmail') } })} className="field-input pl-10" />
                  </div>
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">{t('register.phone')} *</label>
                  <div className="relative">
                    <HiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input type="tel" placeholder="01xxxxxxxxx" {...register('phone', { required: t('validation.required'), pattern: { value: /^01[0125]\d{8}$/, message: t('validation.invalidPhone') } })} className="field-input pl-10" />
                  </div>
                  {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">{t('register.password')} *</label>
                  <div className="relative">
                    <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input type={showPassword ? 'text' : 'password'} {...register('password', { required: t('validation.required'), minLength: { value: 6, message: t('validation.minChars') } })} className="field-input pl-10 pr-10" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      {showPassword ? <HiEyeOff size={18} /> : <HiEye size={18} />}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">{t('register.confirmPassword')} *</label>
                  <input type="password" {...register('confirmPassword', { required: t('validation.required'), validate: (v) => v === password || t('validation.passwordMismatch') })} className="field-input" />
                  {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>}
                </div>

                <label className="flex items-start gap-2 text-sm text-gray-600">
                  <input type="checkbox" {...register('terms', { required: t('validation.required') })} className="mt-0.5 rounded border-gray-300 text-brand-600" />
                  <span>{t('register.terms')}</span>
                </label>
                {errors.terms && <p className="text-xs text-red-500">{errors.terms.message}</p>}

                <button type="submit" className="w-full rounded-xl bg-brand-600 py-3 font-bold text-white hover:bg-brand-700">
                  {t('register.createAccount')}
                </button>
              </div>

              <p className="mt-6 text-center text-sm text-gray-500">
                {t('register.hasAccount')}{' '}
                <Link to="/login" className="font-semibold text-brand-600">{t('register.signIn')}</Link>
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </>
  )
}
