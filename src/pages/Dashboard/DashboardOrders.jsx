import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { HiSearch, HiShoppingBag, HiChevronDown, HiChevronUp } from 'react-icons/hi';
import { orders } from '../../data/mockData';
import Badge from '../../components/common/Badge';
import Pagination from '../../components/common/Pagination';
import EmptyState from '../../components/common/EmptyState';
import { fadeInUp, staggerContainer } from '../../utils/animations';

const ORDERS_PER_PAGE = 5;

const STATUS_OPTIONS = [
  { value: 'all', labelKey: 'dashboard.all' },
  { value: 'delivered', labelKey: 'dashboard.delivered' },
  { value: 'shipped', labelKey: 'dashboard.shipped' },
  { value: 'processing', labelKey: 'dashboard.processing' },
  { value: 'pending', labelKey: 'dashboard.pending' },
  { value: 'cancelled', labelKey: 'dashboard.cancelled' },
];

export default function DashboardOrders() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  const totalPages = Math.ceil(filteredOrders.length / ORDERS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ORDERS_PER_PAGE,
    currentPage * ORDERS_PER_PAGE
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
    setExpandedOrderId(null);
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
    setExpandedOrderId(null);
  };

  const handleRowClick = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('dashboard.orders')}</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {filteredOrders.length} {t('dashboard.totalOrdersLabel')}
          </p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <HiSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={t('dashboard.searchOrders')}
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={handleStatusChange}
          className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {t(option.labelKey)}
            </option>
          ))}
        </select>
      </div>

      {/* Orders Table */}
      {paginatedOrders.length > 0 ? (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50">
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {t('dashboard.orderId')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {t('dashboard.customer')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {t('dashboard.date')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {t('dashboard.total')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {t('dashboard.status')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {t('dashboard.payment')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">

                  </th>
                </tr>
              </thead>
              <motion.tbody
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {paginatedOrders.map((order) => (
                  <OrderRow
                    key={order.id}
                    order={order}
                    isExpanded={expandedOrderId === order.id}
                    onToggle={() => handleRowClick(order.id)}
                    formatDate={formatDate}
                  />
                ))}
              </motion.tbody>
            </table>
          </div>
        </div>
      ) : (
        <EmptyState
          icon={HiShoppingBag}
          title={t('dashboard.noOrdersFound')}
          description={t('dashboard.noOrdersHint')}
        />
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </motion.div>
  );
}

function OrderRow({ order, isExpanded, onToggle, formatDate }) {
  const { t } = useTranslation();
  return (
    <>
      <motion.tr
        variants={fadeInUp}
        onClick={onToggle}
        className="cursor-pointer border-b border-gray-100 transition-colors hover:bg-gray-50 dark:border-gray-700/50 dark:hover:bg-gray-700/30"
      >
        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-brand-600">
          {order.id}
        </td>
        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
          {order.customerName}
        </td>
        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
          {formatDate(order.date)}
        </td>
        <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">
          ${order.total.toFixed(2)}
        </td>
        <td className="whitespace-nowrap px-6 py-4">
          <Badge status={order.status} />
        </td>
        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
          {order.paymentMethod}
        </td>
        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-400">
          {isExpanded ? (
            <HiChevronUp className="h-5 w-5" />
          ) : (
            <HiChevronDown className="h-5 w-5" />
          )}
        </td>
      </motion.tr>
      <AnimatePresence>
        {isExpanded && (
          <tr>
            <td colSpan={7} className="p-0">
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="mx-4 mb-4 mt-1 rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900/50">
                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Customer Info */}
                    <div>
                      <h4 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
                        {t('dashboard.customerInfo')}
                      </h4>
                      <div className="space-y-2 text-sm">
                        <p className="text-gray-600 dark:text-gray-400">
                          <span className="font-medium text-gray-900 dark:text-white">{t('dashboard.name')}:</span>{' '}
                          {order.customerName}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          <span className="font-medium text-gray-900 dark:text-white">{t('dashboard.email')}:</span>{' '}
                          {order.email}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          <span className="font-medium text-gray-900 dark:text-white">{t('dashboard.phone')}:</span>{' '}
                          {order.phone}
                        </p>
                      </div>
                    </div>

                    {/* Shipping Address */}
                    <div>
                      <h4 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
                        {t('dashboard.shippingAddress')}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {order.address}
                      </p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="mt-6">
                    <h4 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
                      {t('dashboard.orderItems')}
                    </h4>
                    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-white dark:bg-gray-800">
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                              {t('dashboard.product')}
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                              {t('dashboard.sizeLabel')}
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                              {t('dashboard.qty')}
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                              {t('dashboard.price')}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.items.map((item, index) => (
                            <tr
                              key={index}
                              className="border-t border-gray-100 dark:border-gray-700"
                            >
                              <td className="px-4 py-2 text-sm text-gray-900 dark:text-white">
                                {item.nameEn}
                              </td>
                              <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">
                                {item.size}
                              </td>
                              <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">
                                {item.quantity}
                              </td>
                              <td className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-white">
                                ${item.price.toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {t('dashboard.orderTotal')}:{' '}
                        <span className="text-brand-600">${order.total.toFixed(2)}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </td>
          </tr>
        )}
      </AnimatePresence>
    </>
  );
}
