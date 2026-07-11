import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { HiUser, HiLocationMarker, HiClipboardList, HiHeart, HiPencil } from 'react-icons/hi'
import { fadeInUp } from '../../utils/animations'
import { userProfile, allProducts, orders } from '../../data/mockData'
import Badge from '../../components/common/Badge'

export default function Profile() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const [activeTab, setActiveTab] = useState('info')

  const wishlistProducts = allProducts.filter((p) => userProfile.wishlist.includes(p.id))
  const userOrders = orders.filter((o) => userProfile.orderHistory.includes(o.id))

  const tabs = [
    { id: 'info', label: t('profile.myInfo'), icon: HiUser },
    { id: 'orders', label: t('profile.myOrders'), icon: HiClipboardList },
    { id: 'wishlist', label: t('profile.wishlist'), icon: HiHeart },
    { id: 'address', label: t('profile.myAddress'), icon: HiLocationMarker },
  ]

  return (
    <>
      <Helmet><title>{t('profile.title')} — {t('common.storeName')}</title></Helmet>
      <h1 className="mb-6 text-2xl font-bold">{t('profile.title')}</h1>

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="text-center">
              <img src={userProfile.avatar} alt="" className="mx-auto h-20 w-20 rounded-full object-cover" />
              <h3 className="mt-3 font-bold">{lang === 'ar' ? userProfile.nameAr : userProfile.name}</h3>
              <p className="text-sm text-gray-500">{userProfile.email}</p>
            </div>
            <nav className="mt-5 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex w-full items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                    activeTab === tab.id ? 'bg-brand-100 text-brand-700' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon size={18} /> {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <motion.div key={activeTab} variants={fadeInUp} initial="hidden" animate="visible" className="lg:col-span-3">
          {activeTab === 'info' && (
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold">{t('profile.personalInfo')}</h2>
                <button className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-semibold text-brand-600 hover:bg-brand-50">
                  <HiPencil size={14} /> {t('common.edit')}
                </button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div><p className="text-xs font-semibold text-gray-500">{t('profile.name')}</p><p className="mt-1 font-semibold">{lang === 'ar' ? userProfile.nameAr : userProfile.name}</p></div>
                <div><p className="text-xs font-semibold text-gray-500">{t('profile.email')}</p><p className="mt-1 font-semibold">{userProfile.email}</p></div>
                <div><p className="text-xs font-semibold text-gray-500">{t('profile.phone')}</p><p className="mt-1 font-semibold" dir="ltr">{userProfile.phone}</p></div>
                <div><p className="text-xs font-semibold text-gray-500">{t('profile.joined')}</p><p className="mt-1 font-semibold">{userProfile.joinDate}</p></div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-bold">{t('profile.orderHistory')}</h2>
              {userOrders.length === 0 ? (
                <p className="py-8 text-center text-gray-500">{t('profile.noOrders')}</p>
              ) : (
                <div className="space-y-3">
                  {userOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between rounded-xl border border-gray-100 p-4">
                      <div>
                        <p className="font-semibold">{order.id}</p>
                        <p className="text-sm text-gray-500">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <Badge status={order.status}>{order.status}</Badge>
                        <p className="mt-1 font-bold text-brand-600">{order.total} {t('common.egp')}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-bold">{t('profile.wishlist')}</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {wishlistProducts.map((p) => (
                  <Link key={p.id} to={`/products/${p.id}`} className="group overflow-hidden rounded-xl border border-gray-100">
                    <div className="aspect-square overflow-hidden bg-gray-100">
                      <img src={p.image} alt="" className="h-full w-full object-cover transition group-hover:scale-105" />
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-semibold line-clamp-1">{lang === 'ar' ? p.nameAr : p.nameEn}</p>
                      <p className="font-bold text-brand-600">{p.price} {t('common.egp')}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'address' && (
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold">{t('profile.myAddress')}</h2>
                <button className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-semibold text-brand-600 hover:bg-brand-50">
                  <HiPencil size={14} /> {t('common.edit')}
                </button>
              </div>
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="font-semibold">{lang === 'ar' ? userProfile.addressAr : userProfile.address}</p>
                <p className="mt-1 text-sm text-gray-500">{lang === 'ar' ? userProfile.cityAr : userProfile.city}</p>
                <p className="mt-1 text-sm text-gray-500" dir="ltr">{userProfile.phone}</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </>
  )
}
