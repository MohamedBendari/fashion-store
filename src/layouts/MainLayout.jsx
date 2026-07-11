import { Outlet } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import WhatsAppButton from '../components/layout/WhatsAppButton'

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50/50 to-white">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
