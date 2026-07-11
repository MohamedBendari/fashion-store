import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  HiMail,
  HiReply,
  HiEye,
  HiEyeOff,
  HiTrash,
  HiX,
  HiPaperAirplane,
} from 'react-icons/hi';
import { messages as initialMessages } from '../../data/mockData';
import Button from '../../components/common/Button';
import EmptyState from '../../components/common/EmptyState';
import { fadeInUp, staggerContainer } from '../../utils/animations';

export default function DashboardMessages() {
  const { t } = useTranslation();
  const [messagesList, setMessagesList] = useState(initialMessages);
  const [expandedMessageId, setExpandedMessageId] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

  const unreadCount = messagesList.filter((m) => !m.read).length;

  const handleToggleExpand = (messageId) => {
    if (expandedMessageId === messageId) {
      setExpandedMessageId(null);
      setReplyingTo(null);
      setReplyText('');
    } else {
      setExpandedMessageId(messageId);
      setReplyingTo(null);
      setReplyText('');
    }
  };

  const handleToggleRead = (e, messageId) => {
    e.stopPropagation();
    setMessagesList((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, read: !msg.read } : msg
      )
    );
  };

  const handleDelete = (e, messageId) => {
    e.stopPropagation();
    setMessagesList((prev) => prev.filter((msg) => msg.id !== messageId));
    if (expandedMessageId === messageId) {
      setExpandedMessageId(null);
      setReplyingTo(null);
      setReplyText('');
    }
  };

  const handleReplyClick = (e, messageId) => {
    e.stopPropagation();
    setReplyingTo(replyingTo === messageId ? null : messageId);
    setReplyText('');
  };

  const handleSendReply = (e) => {
    e.stopPropagation();
    setReplyingTo(null);
    setReplyText('');
  };

  const handleCancelReply = (e) => {
    e.stopPropagation();
    setReplyingTo(null);
    setReplyText('');
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
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('dashboard.messages')}</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {t('dashboard.manageInbox')}
          </p>
        </div>
        {unreadCount > 0 && (
          <span className="inline-flex items-center rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">
            {unreadCount} {t('dashboard.unread').toLowerCase()}
          </span>
        )}
      </div>

      {/* Messages List */}
      {messagesList.length > 0 ? (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          {messagesList.map((message) => (
            <motion.div
              key={message.id}
              variants={fadeInUp}
              layout
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
            >
              {/* Message Header / Preview */}
              <div
                onClick={() => handleToggleExpand(message.id)}
                className="flex cursor-pointer items-start gap-3 p-4 sm:p-5"
              >
                {/* Unread Indicator */}
                <div className="flex-shrink-0 pt-2">
                  {!message.read ? (
                    <div className="h-2.5 w-2.5 rounded-full bg-brand-600" />
                  ) : (
                    <div className="h-2.5 w-2.5 rounded-full bg-transparent" />
                  )}
                </div>

                {/* Message Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <h3
                        className={`truncate text-sm ${
                          !message.read
                            ? 'font-bold text-gray-900 dark:text-white'
                            : 'font-medium text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {message.name}
                      </h3>
                      <p
                        className={`mt-0.5 truncate text-sm ${
                          !message.read
                            ? 'font-semibold text-gray-800 dark:text-gray-200'
                            : 'text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        {message.subject}
                      </p>
                    </div>
                    <span className="flex-shrink-0 text-xs text-gray-500 dark:text-gray-400">
                      {formatDate(message.date)}
                    </span>
                  </div>
                  <p className="mt-1.5 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                    {message.message.length > 100
                      ? message.message.substring(0, 100) + '...'
                      : message.message}
                  </p>
                </div>
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {expandedMessageId === message.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-gray-200 px-4 pb-4 pt-4 dark:border-gray-700 sm:px-5 sm:pb-5">
                      {/* Full Message */}
                      <div className="mb-4 rounded-xl bg-gray-50 p-4 dark:bg-gray-900/50">
                        <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                          {message.message}
                        </p>
                        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                          {t('dashboard.from')}: {message.email}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => handleReplyClick(e, message.id)}
                        >
                          <HiReply className="mr-1.5 h-4 w-4" />
                          {t('dashboard.reply')}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => handleToggleRead(e, message.id)}
                        >
                          {message.read ? (
                            <>
                              <HiEyeOff className="mr-1.5 h-4 w-4" />
                              {t('dashboard.markUnread')}
                            </>
                          ) : (
                            <>
                              <HiEye className="mr-1.5 h-4 w-4" />
                              {t('dashboard.markRead')}
                            </>
                          )}
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={(e) => handleDelete(e, message.id)}
                        >
                          <HiTrash className="mr-1.5 h-4 w-4" />
                          {t('common.delete')}
                        </Button>
                      </div>

                      {/* Reply UI */}
                      <AnimatePresence>
                        {replyingTo === message.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/50">
                              <div className="mb-3 flex items-center justify-between">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                  {t('dashboard.replyTo')} {message.name}
                                </label>
                                <button
                                  onClick={handleCancelReply}
                                  className="rounded-lg p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                                >
                                  <HiX className="h-4 w-4" />
                                </button>
                              </div>
                              <textarea
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                                placeholder={t('dashboard.replyPlaceholder')}
                                rows={4}
                                className="w-full resize-none rounded-lg border border-gray-200 bg-white p-3 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
                              />
                              <div className="mt-3 flex items-center justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={handleCancelReply}
                                >
                                  {t('common.cancel')}
                                </Button>
                                <Button
                                  variant="primary"
                                  size="sm"
                                  onClick={handleSendReply}
                                  disabled={!replyText.trim()}
                                >
                                  <HiPaperAirplane className="mr-1.5 h-4 w-4 rotate-90" />
                                  {t('dashboard.send')}
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <EmptyState
          icon={HiMail}
          title={t('dashboard.noMessages')}
          description={t('dashboard.inboxEmpty')}
        />
      )}
    </motion.div>
  );
}
