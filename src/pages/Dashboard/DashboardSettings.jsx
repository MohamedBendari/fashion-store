import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { HiCloudUpload } from 'react-icons/hi';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { useDarkMode } from '../../hooks/useDarkMode';

const DashboardSettings = () => {
  const { t } = useTranslation();
  const { isDark, toggle } = useDarkMode();
  const fileInputRef = useRef(null);

  const [storeInfo, setStoreInfo] = useState({
    storeName: 'Fashion Store',
    phone: '+1 234 567 890',
    email: 'info@fashionstore.com',
    address: '123 Fashion Street, Style City',
  });

  const [socialLinks, setSocialLinks] = useState({
    instagram: '',
    facebook: '',
    tiktok: '',
    whatsapp: '',
  });

  const [logoFileName, setLogoFileName] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleStoreInfoChange = (field) => (e) => {
    setStoreInfo((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSocialLinksChange = (field) => (e) => {
    setSocialLinks((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleLogoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFileName(file.name);
    }
  };

  const handleSave = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  };

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
          {t('dashboard.settings')}
        </h1>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Store Information Section */}
        <motion.div
          variants={fadeInUp}
          className="rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800 sm:p-6"
        >
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            {t('dashboard.storeInfo')}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Input
                label={t('dashboard.storeName')}
                value={storeInfo.storeName}
                onChange={handleStoreInfoChange('storeName')}
              />
            </div>
            <Input
              label={t('dashboard.phone')}
              value={storeInfo.phone}
              onChange={handleStoreInfoChange('phone')}
            />
            <Input
              label={t('dashboard.email')}
              type="email"
              value={storeInfo.email}
              onChange={handleStoreInfoChange('email')}
            />
            <div className="sm:col-span-2">
              <Input
                label={t('dashboard.address')}
                type="textarea"
                value={storeInfo.address}
                onChange={handleStoreInfoChange('address')}
              />
            </div>
          </div>
        </motion.div>

        {/* Logo Upload Section */}
        <motion.div
          variants={fadeInUp}
          className="rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800 sm:p-6"
        >
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            {t('dashboard.storeLogo')}
          </h2>
          <div
            onClick={handleLogoClick}
            className="cursor-pointer rounded-xl border-2 border-dashed border-gray-300 p-8 text-center transition hover:border-brand-500 dark:border-gray-600"
          >
            <HiCloudUpload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('dashboard.dragDropLogo')}
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {t('dashboard.fileFormats')}
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/svg+xml"
            onChange={handleFileChange}
            className="hidden"
          />
          {logoFileName && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {t('dashboard.selectedFile')}: {logoFileName}
            </p>
          )}
        </motion.div>

        {/* Social Media Links Section */}
        <motion.div
          variants={fadeInUp}
          className="rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800 sm:p-6"
        >
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            {t('dashboard.socialMedia')}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label={t('dashboard.instagramUrl')}
              placeholder="https://instagram.com/yourstore"
              value={socialLinks.instagram}
              onChange={handleSocialLinksChange('instagram')}
            />
            <Input
              label={t('dashboard.facebookUrl')}
              placeholder="https://facebook.com/yourstore"
              value={socialLinks.facebook}
              onChange={handleSocialLinksChange('facebook')}
            />
            <Input
              label={t('dashboard.tiktokUrl')}
              placeholder="https://tiktok.com/@yourstore"
              value={socialLinks.tiktok}
              onChange={handleSocialLinksChange('tiktok')}
            />
            <Input
              label={t('dashboard.whatsappNumber')}
              placeholder="+1 234 567 890"
              value={socialLinks.whatsapp}
              onChange={handleSocialLinksChange('whatsapp')}
            />
          </div>
        </motion.div>

        {/* Theme Settings Section */}
        <motion.div
          variants={fadeInUp}
          className="rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800 sm:p-6"
        >
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            {t('dashboard.appearance')}
          </h2>

          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {t('dashboard.darkMode')}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {isDark ? t('dashboard.currentlyDarkMode') : t('dashboard.currentlyLightMode')}
              </p>
            </div>
            <button
              type="button"
              onClick={toggle}
              className={`relative inline-flex h-7 w-14 items-center rounded-full transition ${
                isDark ? 'bg-brand-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                  isDark ? 'translate-x-8' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Brand Color Palette */}
          <div className="mt-6">
            <p className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {t('dashboard.brandColors')}
            </p>
            <div className="flex gap-2">
              <div className="h-8 w-8 rounded-lg bg-brand-100" />
              <div className="h-8 w-8 rounded-lg bg-brand-200" />
              <div className="h-8 w-8 rounded-lg bg-brand-300" />
              <div className="h-8 w-8 rounded-lg bg-brand-400" />
              <div className="h-8 w-8 rounded-lg bg-brand-500" />
              <div className="h-8 w-8 rounded-lg bg-brand-600" />
              <div className="h-8 w-8 rounded-lg bg-brand-700" />
              <div className="h-8 w-8 rounded-lg bg-brand-800" />
              <div className="h-8 w-8 rounded-lg bg-brand-900" />
            </div>
          </div>
        </motion.div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button variant="primary" onClick={handleSave}>
            {t('dashboard.saveSettings')}
          </Button>
        </div>
      </motion.div>

      {/* Success Toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 rounded-lg bg-green-500 px-6 py-3 text-sm font-medium text-white shadow-lg"
          >
            {t('dashboard.settingsSaved')}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DashboardSettings;
