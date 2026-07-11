import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  HiCurrencyDollar,
  HiShoppingCart,
  HiUsers,
  HiShoppingBag,
  HiArrowUp,
  HiArrowDown,
  HiClock,
  HiEye,
} from 'react-icons/hi'
import { fadeInUp, staggerContainer } from '../../utils/animations'
import { dashboardStats, orders } from '../../data/mockData'
import Badge from '../../components/common/Badge'

export default function DashboardHome() {
  const { t } = useTranslation()
  const [hoveredBar, setHoveredBar] = useState(null)

  const stats = [
    {
      label: t('dashboard.totalRevenue'),
      value: `$${dashboardStats.totalRevenue.toLocaleString()}`,
      change: dashboardStats.revenueChange,
      icon: HiCurrencyDollar,
      color: 'brand',
      bgColor: 'bg-brand-100 dark:bg-brand-900/30',
      iconColor: 'text-brand-600 dark:text-brand-400',
    },
    {
      label: t('dashboard.totalOrders'),
      value: dashboardStats.totalOrders.toLocaleString(),
      change: dashboardStats.ordersChange,
      icon: HiShoppingCart,
      color: 'blue',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      label: t('dashboard.totalCustomers'),
      value: dashboardStats.totalCustomers.toLocaleString(),
      change: dashboardStats.customersChange,
      icon: HiUsers,
      color: 'green',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      iconColor: 'text-green-600 dark:text-green-400',
    },
    {
      label: t('dashboard.totalProducts'),
      value: dashboardStats.totalProducts.toLocaleString(),
      change: dashboardStats.productsChange,
      icon: HiShoppingBag,
      color: 'purple',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
      iconColor: 'text-purple-600 dark:text-purple-400',
    },
  ]

  const maxSales = Math.max(...dashboardStats.monthlySales.map((m) => m.sales))

  const recentOrders = orders.slice(0, 5)

  const categoryColors = [
    'bg-brand-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-amber-500',
    'bg-purple-500',
  ]

  const activityIcons = {
    'New Order': HiShoppingCart,
    Order: HiShoppingCart,
    Customer: HiUsers,
    Product: HiShoppingBag,
    default: HiClock,
  }

  const getActivityIcon = (action) => {
    for (const key of Object.keys(activityIcons)) {
      if (action && action.toLowerCase().includes(key.toLowerCase())) {
        return activityIcons[key]
      }
    }
    return activityIcons.default
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-0"
    >
      {/* Page Header */}
      <motion.div variants={fadeInUp} className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
          {t('dashboard.overview')}
        </h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          {t('dashboard.welcomeBack')}
        </p>
      </motion.div>

      {/* Stat Cards */}
      <motion.div
        variants={staggerContainer}
        className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon
          const isPositive = stat.change >= 0
          return (
            <motion.div
              key={stat.label}
              variants={fadeInUp}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="flex items-center justify-between">
                <div className={`rounded-full p-3 ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>
                <div
                  className={`flex items-center gap-1 text-sm font-medium ${
                    isPositive
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {isPositive ? (
                    <HiArrowUp className="h-4 w-4" />
                  ) : (
                    <HiArrowDown className="h-4 w-4" />
                  )}
                  <span>{Math.abs(stat.change)}%</span>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Charts Row */}
      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Monthly Sales Chart */}
        <motion.div
          variants={fadeInUp}
          className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 lg:col-span-2"
        >
          <h2 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">
            {t('dashboard.monthlySales')}
          </h2>
          <div className="flex items-end justify-between gap-2 sm:gap-4" style={{ height: '240px' }}>
            {dashboardStats.monthlySales.map((item, index) => {
              const heightPercent = (item.sales / maxSales) * 100
              return (
                <div
                  key={item.month}
                  className="group relative flex flex-1 flex-col items-center justify-end h-full"
                  onMouseEnter={() => setHoveredBar(index)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  {/* Tooltip */}
                  {hoveredBar === index && (
                    <div className="absolute -top-8 rounded-lg bg-gray-900 px-2 py-1 text-xs font-medium text-white shadow-lg dark:bg-gray-700">
                      ${item.sales.toLocaleString()}
                    </div>
                  )}
                  {/* Bar */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${heightPercent}%` }}
                    transition={{ duration: 0.6, delay: index * 0.08, ease: 'easeOut' }}
                    className="w-full cursor-pointer rounded-t-md bg-brand-500 transition-colors hover:bg-brand-600 dark:bg-brand-600 dark:hover:bg-brand-500"
                    style={{ minHeight: '8px' }}
                  />
                  {/* Label */}
                  <span className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                    {item.month}
                  </span>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Category Distribution */}
        <motion.div
          variants={fadeInUp}
          className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
        >
          <h2 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">
            {t('dashboard.categoryDist')}
          </h2>
          <div className="space-y-4">
            {dashboardStats.categoryDistribution.map((cat, index) => (
              <div key={cat.category}>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {cat.category}
                  </span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {cat.percentage}%
                  </span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.percentage}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
                    className={`h-full rounded-full ${categoryColors[index % categoryColors.length]}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <motion.div
          variants={fadeInUp}
          className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
        >
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            {t('dashboard.recentActivity')}
          </h2>
          <div className="space-y-4">
            {dashboardStats.recentActivity.map((activity) => {
              const ActivityIcon = getActivityIcon(activity.action)
              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <div className="rounded-full bg-brand-100 p-2 dark:bg-brand-900/30">
                    <ActivityIcon className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.action}
                    </p>
                    <p className="truncate text-xs text-gray-600 dark:text-gray-400">
                      {activity.description}
                    </p>
                    <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                      {activity.time}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Recent Orders Table */}
        <motion.div
          variants={fadeInUp}
          className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 lg:col-span-2"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('dashboard.recentOrders')}
            </h2>
            <button className="flex items-center gap-1 text-sm font-medium text-brand-600 transition-colors hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300">
              <HiEye className="h-4 w-4" />
              {t('common.viewAll')}
            </button>
          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-x-auto sm:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {t('dashboard.orderId')}
                  </th>
                  <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {t('dashboard.customer')}
                  </th>
                  <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {t('dashboard.date')}
                  </th>
                  <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {t('dashboard.total')}
                  </th>
                  <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {t('dashboard.status')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <td className="py-3 text-sm font-medium text-gray-900 dark:text-white">
                      {order.id}
                    </td>
                    <td className="py-3 text-sm text-gray-600 dark:text-gray-400">
                      {order.customerName}
                    </td>
                    <td className="py-3 text-sm text-gray-600 dark:text-gray-400">
                      {order.date}
                    </td>
                    <td className="py-3 text-sm font-medium text-gray-900 dark:text-white">
                      ${order.total.toLocaleString()}
                    </td>
                    <td className="py-3">
                      <Badge status={order.status}>{order.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="space-y-3 sm:hidden">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="rounded-xl border border-gray-100 p-4 dark:border-gray-700"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {order.id}
                  </span>
                  <Badge status={order.status}>{order.status}</Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {order.customerName}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    {order.date}
                  </span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    ${order.total.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
