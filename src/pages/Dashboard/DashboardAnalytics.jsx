import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  HiCurrencyDollar,
  HiShoppingCart,
  HiUsers,
  HiTrendingUp,
  HiArrowUp,
  HiArrowDown,
  HiStar,
} from 'react-icons/hi'
import { fadeInUp, staggerContainer } from '../../utils/animations'
import { dashboardStats, orders, allProducts } from '../../data/mockData'

export default function DashboardAnalytics() {
  const { t } = useTranslation()
  const [hoveredBar, setHoveredBar] = useState(null)

  const avgOrderValue = Math.round(dashboardStats.totalRevenue / dashboardStats.totalOrders)
  const conversionRate = 3.2

  const stats = [
    {
      label: t('dashboard.totalRevenue'),
      value: `$${dashboardStats.totalRevenue.toLocaleString()}`,
      change: dashboardStats.revenueChange,
      icon: HiCurrencyDollar,
      bgColor: 'bg-brand-100 dark:bg-brand-900/30',
      iconColor: 'text-brand-600 dark:text-brand-400',
    },
    {
      label: t('dashboard.avgOrderValue'),
      value: `$${avgOrderValue.toLocaleString()}`,
      change: 5.4,
      icon: HiTrendingUp,
      bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
    },
    {
      label: t('dashboard.totalOrders'),
      value: dashboardStats.totalOrders.toLocaleString(),
      change: dashboardStats.ordersChange,
      icon: HiShoppingCart,
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      label: t('dashboard.conversionRate'),
      value: `${conversionRate}%`,
      change: 1.8,
      icon: HiUsers,
      bgColor: 'bg-amber-100 dark:bg-amber-900/30',
      iconColor: 'text-amber-600 dark:text-amber-400',
    },
  ]

  const maxSales = Math.max(...dashboardStats.monthlySales.map((m) => m.sales))

  const topProducts = [...allProducts]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5)

  const categoryColors = [
    { bg: 'bg-brand-500', text: 'text-brand-600 dark:text-brand-400' },
    { bg: 'bg-blue-500', text: 'text-blue-600 dark:text-blue-400' },
    { bg: 'bg-green-500', text: 'text-green-600 dark:text-green-400' },
    { bg: 'bg-amber-500', text: 'text-amber-600 dark:text-amber-400' },
    { bg: 'bg-purple-500', text: 'text-purple-600 dark:text-purple-400' },
  ]

  const customerGrowth = [
    { month: 'Jan', customers: 32 },
    { month: 'Feb', customers: 41 },
    { month: 'Mar', customers: 48 },
    { month: 'Apr', customers: 55 },
    { month: 'May', customers: 67 },
    { month: 'Jun', customers: 78 },
    { month: 'Jul', customers: 89 },
  ]

  const maxCustomers = Math.max(...customerGrowth.map((m) => m.customers))

  const totalCategoryPercentage = dashboardStats.categoryDistribution.reduce(
    (sum, cat) => sum + cat.percentage,
    0
  )

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
          {t('dashboard.analytics')}
        </h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          {t('dashboard.analyticsSubtitle')}
        </p>
      </motion.div>

      {/* Revenue Overview Cards */}
      <motion.div
        variants={staggerContainer}
        className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat) => {
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

      {/* Revenue Trend Chart */}
      <motion.div
        variants={fadeInUp}
        className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
      >
        <h2 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">
          {t('dashboard.revenueTrend')}
        </h2>
        <div className="flex items-end justify-between gap-3 sm:gap-6" style={{ height: '260px' }}>
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
                  <div className="absolute -top-8 z-10 rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white shadow-lg dark:bg-gray-600">
                    ${item.sales.toLocaleString()}
                  </div>
                )}
                {/* Gradient Bar */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${heightPercent}%` }}
                  transition={{ duration: 0.7, delay: index * 0.1, ease: 'easeOut' }}
                  className="relative w-full cursor-pointer overflow-hidden rounded-t-lg"
                  style={{ minHeight: '12px' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-700 to-brand-400 opacity-90 transition-opacity group-hover:opacity-100 dark:from-brand-800 dark:to-brand-500" />
                </motion.div>
                {/* Value below bar on desktop */}
                <span className="mt-3 hidden text-xs font-medium text-gray-500 dark:text-gray-400 sm:block">
                  ${(item.sales / 1000).toFixed(1)}k
                </span>
                {/* Month Label */}
                <span className="mt-1 text-xs font-medium text-gray-600 dark:text-gray-400">
                  {item.month}
                </span>
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* Middle Row */}
      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Top Selling Products */}
        <motion.div
          variants={fadeInUp}
          className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
        >
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            {t('dashboard.topSellingProducts')}
          </h2>
          <div className="space-y-3">
            {topProducts.map((product, index) => (
              <div
                key={product.id}
                className="flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                {/* Rank Number */}
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-600 dark:bg-brand-900/30 dark:text-brand-400">
                  {index + 1}
                </div>
                {/* Product Image */}
                <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
                  <img
                    src={product.image}
                    alt={product.nameEn}
                    className="h-full w-full object-cover"
                  />
                </div>
                {/* Product Info */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    {product.nameEn}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {product.category} &middot; {product.brand}
                  </p>
                </div>
                {/* Price & Rating */}
                <div className="flex-shrink-0 text-right">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    ${product.price.toLocaleString()}
                  </p>
                  <div className="flex items-center justify-end gap-0.5">
                    <HiStar className="h-3.5 w-3.5 text-amber-400" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {product.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Sales by Category */}
        <motion.div
          variants={fadeInUp}
          className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
        >
          <h2 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">
            {t('dashboard.salesByCategory')}
          </h2>

          {/* Donut Chart using CSS */}
          <div className="flex flex-col items-center sm:flex-row sm:items-center sm:gap-8">
            <div className="relative mb-6 sm:mb-0">
              <div
                className="relative h-44 w-44 rounded-full"
                style={{
                  background: (() => {
                    const colors = ['#ec4899', '#3b82f6', '#22c55e', '#f59e0b', '#a855f7']
                    let gradientParts = []
                    let cumulativePercent = 0
                    dashboardStats.categoryDistribution.forEach((cat, i) => {
                      const normalizedPercent = (cat.percentage / totalCategoryPercentage) * 100
                      const start = cumulativePercent
                      cumulativePercent += normalizedPercent
                      gradientParts.push(
                        `${colors[i]} ${start}% ${cumulativePercent}%`
                      )
                    })
                    return `conic-gradient(${gradientParts.join(', ')})`
                  })(),
                }}
              >
                {/* Inner circle for donut effect */}
                <div className="absolute inset-[25%] flex items-center justify-center rounded-full bg-white dark:bg-gray-800">
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900 dark:text-white">100%</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t('dashboard.total')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="flex-1 space-y-3">
              {dashboardStats.categoryDistribution.map((cat, index) => (
                <div key={cat.category} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-3 w-3 rounded-full ${categoryColors[index % categoryColors.length].bg}`}
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {cat.category}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {cat.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Customer Growth */}
      <motion.div
        variants={fadeInUp}
        className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
      >
        <h2 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">
          {t('dashboard.customerGrowth')}
        </h2>
        <div className="relative" style={{ height: '220px' }}>
          {/* Grid Lines */}
          <div className="absolute inset-0 flex flex-col justify-between">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-full border-b border-dashed border-gray-100 dark:border-gray-700"
              />
            ))}
          </div>

          {/* Chart Area */}
          <div className="relative flex h-full items-end justify-between px-2">
            {customerGrowth.map((item, index) => {
              const heightPercent = (item.customers / maxCustomers) * 85
              const nextItem = customerGrowth[index + 1]
              return (
                <div
                  key={item.month}
                  className="relative flex flex-1 flex-col items-center justify-end h-full z-10"
                >
                  {/* Value */}
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                    className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400"
                  >
                    {item.customers}
                  </motion.span>
                  {/* Dot and Bar */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${heightPercent}%` }}
                    transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
                    className="relative flex w-full flex-col items-center"
                    style={{ minHeight: '16px' }}
                  >
                    {/* Dot */}
                    <div className="absolute -top-1.5 h-3 w-3 rounded-full border-2 border-white bg-brand-500 shadow-sm dark:border-gray-800 dark:bg-brand-400" />
                    {/* Bar */}
                    <div className="h-full w-3 rounded-t-full bg-gradient-to-t from-brand-200 to-brand-400 dark:from-brand-900/40 dark:to-brand-600 sm:w-4" />
                  </motion.div>
                  {/* Label */}
                  <span className="mt-3 text-xs font-medium text-gray-600 dark:text-gray-400">
                    {item.month}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Connecting Line (SVG overlay) */}
          <svg
            className="pointer-events-none absolute inset-0 z-20"
            style={{ width: '100%', height: '100%' }}
            preserveAspectRatio="none"
          >
            <polyline
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-brand-500 dark:text-brand-400"
              points={customerGrowth
                .map((item, index) => {
                  const x =
                    ((index + 0.5) / customerGrowth.length) * 100
                  const heightPercent = (item.customers / maxCustomers) * 85
                  const y = 100 - heightPercent - 4
                  return `${x}%,${y}%`
                })
                .join(' ')}
            />
          </svg>
        </div>

        {/* Summary */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 border-t border-gray-100 pt-4 dark:border-gray-700">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {dashboardStats.totalCustomers}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{t('dashboard.totalCustomers')}</p>
          </div>
          <div className="text-center">
            <p className="flex items-center justify-center gap-1 text-2xl font-bold text-green-600 dark:text-green-400">
              <HiArrowUp className="h-5 w-5" />
              {dashboardStats.customersChange}%
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{t('dashboard.growthRate')}</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {customerGrowth[customerGrowth.length - 1].customers -
                customerGrowth[customerGrowth.length - 2].customers}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{t('dashboard.newThisMonth')}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
