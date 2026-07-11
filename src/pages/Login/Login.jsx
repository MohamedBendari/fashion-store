import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { HiMail, HiLockClosed, HiEye, HiEyeOff } from 'react-icons/hi'
import { fadeInUp } from '../../utils/animations'

export default function Login() {
  const { t } = useTranslation()
  const [showPassword, setShowPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = () => setSubmitted(true)

  return (
    <>
      <Helmet><title>{t('login.title')} — {t('common.storeName')}</title></Helmet>
      <div className="flex min-h-[60vh] items-center justify-center py-8">
        <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              {t('login.title')}
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              {t('login.subtitle')}
            </p>
          </div>

          {submitted ? (
            <div className="rounded-2xl bg-green-50 p-6 text-center">
              <p className="text-4xl">✅</p>
              <p className="mt-3 font-semibold text-green-800">{t('login.success')}</p>
              <Link to="/" className="mt-4 inline-block rounded-xl bg-brand-600 px-6 py-2 font-bold text-white">
                {t('login.goHome')}
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">
                    {t('login.email')}
                  </label>
                  <div className="relative">
                    <HiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="email"
                      {...register('email', { required: t('validation.required'), pattern: { value: /^\S+@\S+\.\S+$/, message: t('validation.invalidEmail') } })}
                      className="field-input pl-10"
                      placeholder="example@email.com"
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">
                    {t('login.password')}
                  </label>
                  <div className="relative">
                    <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      {...register('password', { required: t('validation.required'), minLength: { value: 6, message: t('validation.minChars') } })}
                      className="field-input pl-10 pr-10"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showPassword ? <HiEyeOff size={18} /> : <HiEye size={18} />}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-gray-600">
                    <input type="checkbox" {...register('remember')} className="rounded border-gray-300 text-brand-600 focus:ring-brand-500" />
                    {t('login.rememberMe')}
                  </label>
                  <button type="button" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
                    {t('login.forgotPassword')}
                  </button>
                </div>

                <button type="submit" className="w-full rounded-xl bg-brand-600 py-3 font-bold text-white hover:bg-brand-700">
                  {t('login.signIn')}
                </button>
              </div>

              <p className="mt-6 text-center text-sm text-gray-500">
                {t('login.noAccount')}{' '}
                <Link to="/register" className="font-semibold text-brand-600 hover:text-brand-700">
                  {t('login.signUp')}
                </Link>
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </>
  )
}
