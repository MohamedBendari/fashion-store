import { useState, useEffect, useRef } from 'react'
import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  HiHome,
  HiShoppingBag,
  HiCollection,
  HiClipboardList,
  HiUsers,
  HiMail,
  HiCalendar,
  HiChartBar,
  HiCog,
  HiUser,
  HiMenu,
  HiX,
  HiSearch,
  HiBell,
  HiSun,
  HiMoon,
  HiChevronLeft,
  HiChevronRight,
  HiLogout,
} from 'react-icons/hi'
import { useDarkMode } from '../hooks/useDarkMode'
import { slideInLeft, overlayVariants } from '../utils/animations'

const navItems = [
  { icon: HiHome, labelKey: 'dashboard.title', path: '/dashboard', end: true },
  { icon: HiShoppingBag, labelKey: 'dashboard.products', path: '/dashboard/products' },
  { icon: HiCollection, labelKey: 'dashboard.categories', path: '/dashboard/categories' },
  { icon: HiClipboardList, labelKey: 'dashboard.orders', path: '/dashboard/orders' },
  { icon: HiUsers, labelKey: 'dashboard.customers', path: '/dashboard/customers' },
  { icon: HiMail, labelKey: 'dashboard.messages', path: '/dashboard/messages' },
  { icon: HiCalendar, labelKey: 'dashboard.bookings', path: '/dashboard/booking' },
  { icon: HiChartBar, labelKey: 'dashboard.analytics', path: '/dashboard/analytics' },
  { icon: HiCog, labelKey: 'dashboard.settings', path: '/dashboard/settings' },
  { icon: HiUser, labelKey: 'dashboard.profile', path: '/dashboard/profile' },
]

const sampleNotifications = [
  {
    id: 1,
    title: 'New order received',
    message: 'Order #1042 has been placed by Sara Ahmed.',
    time: '2 min ago',
    read: false,
  },
  {
    id: 2,
    title: 'Low stock alert',
    message: 'Silk Evening Dress is running low (3 left).',
    time: '15 min ago',
    read: false,
  },
  {
    id: 3,
    title: 'New customer registered',
    message: 'Nour Hassan just created an account.',
    time: '1 hour ago',
    read: true,
  },
  {
    id: 4,
    title: 'Payment confirmed',
    message: 'Payment for order #1039 has been confirmed.',
    time: '3 hours ago',
    read: true,
  },
]

function useClickOutside(ref, handler) {
  useEffect(() => {
    function listener(event) {
      if (!ref.current || ref.current.contains(event.target)) return
      handler()
    }
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}

function SidebarContent({ collapsed, onNavClick }) {
  const { t } = useTranslation()
  return (
    <nav className="flex flex-1 flex-col gap-1 px-3">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.end}
          onClick={onNavClick}
          className={({ isActive }) =>
            `group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
              isActive
                ? 'bg-brand-600 text-white shadow-md shadow-brand-600/25'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
            } ${collapsed ? 'justify-center' : ''}`
          }
        >
          <item.icon className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span className="truncate">{t(item.labelKey)}</span>}
        </NavLink>
      ))}
    </nav>
  )
}

function DesktopSidebar({ collapsed, setCollapsed }) {
  const { t } = useTranslation()
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 hidden flex-col border-r border-gray-200 bg-white transition-all duration-300 dark:border-gray-700 dark:bg-gray-800 lg:flex ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand area */}
      <div className="flex h-16 items-center border-b border-gray-200 px-4 dark:border-gray-700">
        {!collapsed ? (
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white">
              <HiShoppingBag className="h-5 w-5" />
            </div>
            <span className="font-cairo text-lg font-bold text-gray-900 dark:text-white">
              {t('common.storeName')}
            </span>
          </div>
        ) : (
          <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white">
            <HiShoppingBag className="h-5 w-5" />
          </div>
        )}
      </div>

      {/* Nav items */}
      <div className="flex flex-1 flex-col gap-2 overflow-y-auto py-4">
        <SidebarContent collapsed={collapsed} onNavClick={undefined} />
      </div>

      {/* Collapse toggle */}
      <div className="border-t border-gray-200 p-3 dark:border-gray-700">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center justify-center rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <HiChevronRight className="h-5 w-5" />
          ) : (
            <HiChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>
    </aside>
  )
}

function MobileSidebar({ open, onClose }) {
  const { t } = useTranslation()
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          />

          {/* Drawer */}
          <motion.aside
            variants={slideInLeft}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-white shadow-2xl dark:bg-gray-800 lg:hidden"
          >
            {/* Header with close button */}
            <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white">
                  <HiShoppingBag className="h-5 w-5" />
                </div>
                <span className="font-cairo text-lg font-bold text-gray-900 dark:text-white">
                  {t('common.storeName')}
                </span>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                aria-label="Close sidebar"
              >
                <HiX className="h-5 w-5" />
              </button>
            </div>

            {/* Nav items */}
            <div className="flex flex-1 flex-col gap-2 overflow-y-auto py-4">
              <SidebarContent collapsed={false} onNavClick={onClose} />
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

function NotificationsDropdown({ open, onClose, notifications, onMarkAllRead }) {
  const { t } = useTranslation()
  const ref = useRef(null)
  useClickOutside(ref, onClose)

  if (!open) return null

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.15 }}
      className="absolute right-0 top-full mt-2 w-80 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800"
    >
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-gray-700">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          {t('dashboard.notifications')}
        </h3>
        <button
          onClick={onMarkAllRead}
          className="text-xs font-medium text-brand-600 transition-colors hover:text-brand-700"
        >
          {t('dashboard.markAllRead')}
        </button>
      </div>
      <div className="max-h-80 overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`border-b border-gray-100 px-4 py-3 transition-colors last:border-0 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-750 ${
              !notification.read ? 'bg-brand-50/50 dark:bg-brand-900/10' : ''
            }`}
          >
            <div className="flex items-start gap-3">
              {!notification.read && (
                <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-brand-600" />
              )}
              <div className={!notification.read ? '' : 'pl-5'}>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {notification.title}
                </p>
                <p className="mt-0.5 text-xs text-gray-600 dark:text-gray-400">
                  {notification.message}
                </p>
                <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                  {notification.time}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-200 p-2 dark:border-gray-700">
        <button className="w-full rounded-lg px-3 py-2 text-center text-xs font-medium text-brand-600 transition-colors hover:bg-brand-50 dark:hover:bg-brand-900/20">
          {t('dashboard.viewAllNotifications')}
        </button>
      </div>
    </motion.div>
  )
}

function UserDropdown({ open, onClose }) {
  const { t } = useTranslation()
  const ref = useRef(null)
  useClickOutside(ref, onClose)

  if (!open) return null

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.15 }}
      className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800"
    >
      {/* User info */}
      <div className="border-b border-gray-200 px-4 py-3 dark:border-gray-700">
        <p className="text-sm font-semibold text-gray-900 dark:text-white">
          Admin User
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          admin@fashionstore.com
        </p>
      </div>

      <div className="p-1.5">
        <NavLink
          to="/dashboard/profile"
          onClick={onClose}
          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <HiUser className="h-4 w-4" />
          {t('dashboard.profile')}
        </NavLink>
        <NavLink
          to="/dashboard/settings"
          onClick={onClose}
          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <HiCog className="h-4 w-4" />
          {t('dashboard.settings')}
        </NavLink>
      </div>

      <div className="border-t border-gray-200 p-1.5 dark:border-gray-700">
        <button
          onClick={onClose}
          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
        >
          <HiLogout className="h-4 w-4" />
          {t('dashboard.logout')}
        </button>
      </div>
    </motion.div>
  )
}

export default function DashboardLayout() {
  const { t } = useTranslation()
  const { isDark, toggle } = useDarkMode()
  const location = useLocation()

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const [notifications, setNotifications] = useState(sampleNotifications)

  const notificationsRef = useRef(null)
  const userDropdownRef = useRef(null)

  const unreadCount = notifications.filter((n) => !n.read).length

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileSidebarOpen(false)
  }, [location.pathname])

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setNotificationsOpen(false)
      }
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setUserDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [])

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (mobileSidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileSidebarOpen])

  function handleMarkAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  function toggleNotifications() {
    setNotificationsOpen((prev) => !prev)
    setUserDropdownOpen(false)
  }

  function toggleUserDropdown() {
    setUserDropdownOpen((prev) => !prev)
    setNotificationsOpen(false)
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Desktop Sidebar */}
      <DesktopSidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      {/* Mobile Sidebar */}
      <MobileSidebar
        open={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      {/* Main area */}
      <div
        className={`flex flex-1 flex-col transition-all duration-300 ${
          sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        {/* Top Navbar */}
        <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-gray-200 bg-white/80 px-4 backdrop-blur-md dark:border-gray-700 dark:bg-gray-800/80 sm:px-6">
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 lg:hidden"
            aria-label="Open sidebar"
          >
            <HiMenu className="h-6 w-6" />
          </button>

          {/* Search */}
          <div className="hidden flex-1 sm:block">
            <div className="relative max-w-md">
              <HiSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={t('dashboard.search')}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-brand-500 dark:focus:bg-gray-700"
              />
            </div>
          </div>

          {/* Spacer for mobile */}
          <div className="flex-1 sm:hidden" />

          {/* Right side actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Notifications */}
            <div className="relative" ref={notificationsRef}>
              <button
                onClick={toggleNotifications}
                className="relative rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                aria-label="Notifications"
              >
                <HiBell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                    {unreadCount}
                  </span>
                )}
              </button>
              <AnimatePresence>
                {notificationsOpen && (
                  <NotificationsDropdown
                    open={notificationsOpen}
                    onClose={() => setNotificationsOpen(false)}
                    notifications={notifications}
                    onMarkAllRead={handleMarkAllRead}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Dark mode toggle */}
            <button
              onClick={toggle}
              className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? (
                <HiSun className="h-5 w-5" />
              ) : (
                <HiMoon className="h-5 w-5" />
              )}
            </button>

            {/* User avatar / dropdown */}
            <div className="relative" ref={userDropdownRef}>
              <button
                onClick={toggleUserDropdown}
                className="flex items-center gap-2 rounded-lg p-1.5 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="User menu"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white">
                  A
                </div>
                <span className="hidden text-sm font-medium text-gray-700 dark:text-gray-300 md:block">
                  Admin
                </span>
              </button>
              <AnimatePresence>
                {userDropdownOpen && (
                  <UserDropdown
                    open={userDropdownOpen}
                    onClose={() => setUserDropdownOpen(false)}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
