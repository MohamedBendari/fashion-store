import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { bookings } from '../../data/mockData';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import Badge from '../../components/common/Badge';

const DashboardBooking = () => {
  const { t } = useTranslation();
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredBookings = useMemo(() => {
    if (activeFilter === 'all') return bookings;
    return bookings.filter((booking) => booking.status === activeFilter);
  }, [activeFilter]);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOffset = new Date(currentYear, currentMonth, 1).getDay();

  const calendarCells = useMemo(() => {
    const cells = [];
    for (let i = 0; i < firstDayOffset; i++) {
      cells.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      cells.push(day);
    }
    return cells;
  }, [firstDayOffset, daysInMonth]);

  const bookingDays = useMemo(() => {
    const days = new Set();
    bookings.forEach((booking) => {
      const parts = booking.date.split('-');
      const bookingMonth = parseInt(parts[1], 10) - 1;
      const bookingDay = parseInt(parts[2], 10);
      if (bookingMonth === currentMonth) {
        days.add(bookingDay);
      }
    });
    return days;
  }, [currentMonth]);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const isToday = (day) => {
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  const filterButtons = [
    { labelKey: 'dashboard.all', value: 'all' },
    { labelKey: 'dashboard.confirmed', value: 'confirmed' },
    { labelKey: 'dashboard.pending', value: 'pending' },
    { labelKey: 'dashboard.cancelled', value: 'cancelled' },
  ];

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="space-y-0"
    >
      {/* Page Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('dashboard.bookingManagement')}
        </h1>
      </div>

      {/* Calendar Grid */}
      <div className="mb-6 rounded-2xl bg-white p-4 shadow dark:bg-gray-800 sm:p-6">
        {/* Month Navigation */}
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={handlePrevMonth}
            className="rounded-xl p-2 text-gray-600 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <HiChevronLeft className="h-5 w-5" />
          </button>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {monthNames[currentMonth]} {currentYear}
          </h2>
          <button
            onClick={handleNextMonth}
            className="rounded-xl p-2 text-gray-600 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <HiChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1">
          {dayNames.map((day) => (
            <div
              key={day}
              className="py-2 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
            >
              {day}
            </div>
          ))}

          {/* Calendar Days */}
          {calendarCells.map((day, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center py-2"
            >
              {day === null ? (
                <span className="text-sm text-gray-300 dark:text-gray-600"></span>
              ) : (
                <>
                  <span
                    className={`flex h-8 w-8 items-center justify-center text-sm ${
                      isToday(day)
                        ? 'rounded-full bg-brand-600 font-semibold text-white'
                        : 'text-gray-700 dark:text-gray-200'
                    }`}
                  >
                    {day}
                  </span>
                  {bookingDays.has(day) && (
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-600"></span>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Status Filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        {filterButtons.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setActiveFilter(filter.value)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              activeFilter === filter.value
                ? 'bg-brand-600 text-white'
                : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            {t(filter.labelKey)}
          </button>
        ))}
      </div>

      {/* Bookings Table */}
      <div className="rounded-2xl bg-white shadow dark:bg-gray-800">
        {/* Desktop Table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  {t('dashboard.customerName')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  {t('dashboard.date')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  {t('dashboard.time')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  {t('dashboard.service')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  {t('dashboard.status')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  {t('dashboard.phone')}
                </th>
              </tr>
            </thead>
            <motion.tbody variants={staggerContainer} initial="hidden" animate="visible">
              {filteredBookings.map((booking) => (
                <motion.tr
                  key={booking.id}
                  variants={fadeInUp}
                  layout
                  className="border-b border-gray-100 transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/50"
                >
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    {booking.customerName}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {booking.date}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {booking.time}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {booking.service}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <Badge status={booking.status} />
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {booking.phone}
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>

        {/* Mobile Card Layout */}
        <div className="space-y-4 p-4 md:hidden">
          {filteredBookings.map((booking) => (
            <motion.div
              key={booking.id}
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="rounded-xl border border-gray-200 p-4 dark:border-gray-700"
            >
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  {booking.customerName}
                </h3>
                <Badge status={booking.status} />
              </div>
              <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                <p>
                  <span className="font-medium text-gray-500 dark:text-gray-400">{t('dashboard.date')}:</span>{' '}
                  {booking.date}
                </p>
                <p>
                  <span className="font-medium text-gray-500 dark:text-gray-400">{t('dashboard.time')}:</span>{' '}
                  {booking.time}
                </p>
                <p>
                  <span className="font-medium text-gray-500 dark:text-gray-400">{t('dashboard.service')}:</span>{' '}
                  {booking.service}
                </p>
                <p>
                  <span className="font-medium text-gray-500 dark:text-gray-400">{t('dashboard.phone')}:</span>{' '}
                  {booking.phone}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardBooking;
