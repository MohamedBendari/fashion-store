import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import AppRoutes from './routes/AppRoutes'

export default function App() {
  const { i18n } = useTranslation()

  useEffect(() => {
    const lang = i18n.language
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [i18n.language])

  return <AppRoutes />
}
