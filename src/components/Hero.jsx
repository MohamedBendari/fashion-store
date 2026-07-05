import { useTranslation } from 'react-i18next'

export default function Hero({ onShop }) {
  const { t } = useTranslation()

  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 via-brand-500 to-pink-400 px-6 py-14 text-white shadow-lg sm:px-10">
      <div className="relative z-10 max-w-lg">
        <h1 className="text-3xl font-bold leading-tight sm:text-4xl">{t('heroTitle')}</h1>
        <p className="mt-3 text-lg text-pink-50">{t('heroSubtitle')}</p>
        <button
          onClick={onShop}
          className="mt-6 rounded-xl bg-white px-6 py-3 font-bold text-brand-700 shadow transition hover:scale-105"
        >
          {t('shopNow')}
        </button>
      </div>
      <div className="pointer-events-none absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-white/10" />
      <div className="pointer-events-none absolute -right-6 top-4 h-24 w-24 rounded-full bg-white/10" />
    </section>
  )
}
