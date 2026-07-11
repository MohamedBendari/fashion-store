import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { HiCamera, HiCheckCircle } from 'react-icons/hi';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const DashboardProfile = () => {
  const { t } = useTranslation();
  const fileInputRef = useRef(null);

  const [profileInfo, setProfileInfo] = useState({
    fullName: 'Admin User',
    email: 'admin@fashionstore.com',
    phone: '+1 234 567 890',
    role: 'Administrator',
  });

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [avatarFileName, setAvatarFileName] = useState('');
  const [avatarPreview, setAvatarPreview] = useState(
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
  );
  const [showSuccess, setShowSuccess] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' });

  const handleProfileChange = (field) => (e) => {
    setProfileInfo((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handlePasswordChange = (field) => (e) => {
    setPasswords((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdatePassword = () => {
    if (!passwords.currentPassword || !passwords.newPassword || !passwords.confirmPassword) {
      setPasswordMessage({ type: 'error', text: t('dashboard.fillAllPasswords') });
      setTimeout(() => setPasswordMessage({ type: '', text: '' }), 3000);
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      setPasswordMessage({ type: 'error', text: t('dashboard.passwordsNoMatch') });
      setTimeout(() => setPasswordMessage({ type: '', text: '' }), 3000);
      return;
    }
    setPasswordMessage({ type: 'success', text: t('dashboard.passwordUpdatedSuccess') });
    setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setTimeout(() => setPasswordMessage({ type: '', text: '' }), 3000);
  };

  const handleSaveProfile = () => {
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
      {/* Success Toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed right-6 top-6 z-50 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-5 py-3 text-sm font-medium text-green-700 shadow-lg dark:border-green-800 dark:bg-green-900/30 dark:text-green-400"
          >
            <HiCheckCircle className="h-5 w-5" />
            {t('dashboard.profileUpdatedSuccess')}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('dashboard.myProfile')}
        </h1>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Avatar Section */}
        <motion.div
          variants={fadeInUp}
          className="rounded-2xl bg-white p-6 shadow dark:bg-gray-800"
        >
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <div className="flex flex-col items-center gap-3">
              <img
                src={avatarPreview}
                alt="Profile avatar"
                className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-lg dark:border-gray-700 sm:h-32 sm:w-32"
              />
              <Button variant="outline" size="sm" onClick={handleAvatarClick}>
                <HiCamera className="h-4 w-4" />
                {t('dashboard.changeAvatar')}
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleFileChange}
                className="hidden"
              />
              {avatarFileName && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {avatarFileName}
                </p>
              )}
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {profileInfo.fullName}
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {profileInfo.role}
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {profileInfo.email}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Personal Information Section */}
        <motion.div
          variants={fadeInUp}
          className="rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800 sm:p-6"
        >
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            {t('dashboard.personalInfo')}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label={t('dashboard.fullName')}
              value={profileInfo.fullName}
              onChange={handleProfileChange('fullName')}
            />
            <Input
              label={t('dashboard.email')}
              type="email"
              value={profileInfo.email}
              onChange={handleProfileChange('email')}
            />
            <Input
              label={t('dashboard.phone')}
              value={profileInfo.phone}
              onChange={handleProfileChange('phone')}
            />
            <div>
              <Input
                label={t('dashboard.role')}
                value={profileInfo.role}
                disabled={true}
                className="cursor-not-allowed bg-gray-100 dark:bg-gray-600"
              />
              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                {t('dashboard.roleCannotChange')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Change Password Section */}
        <motion.div
          variants={fadeInUp}
          className="rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800 sm:p-6"
        >
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            {t('dashboard.changePassword')}
          </h2>
          <div className="space-y-4">
            <Input
              label={t('dashboard.currentPassword')}
              type="password"
              placeholder=""
              value={passwords.currentPassword}
              onChange={handlePasswordChange('currentPassword')}
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                label={t('dashboard.newPassword')}
                type="password"
                placeholder=""
                value={passwords.newPassword}
                onChange={handlePasswordChange('newPassword')}
              />
              <Input
                label={t('dashboard.confirmPassword')}
                type="password"
                placeholder=""
                value={passwords.confirmPassword}
                onChange={handlePasswordChange('confirmPassword')}
                error={
                  passwords.confirmPassword &&
                  passwords.newPassword !== passwords.confirmPassword
                    ? t('dashboard.passwordsNoMatch')
                    : ''
                }
              />
            </div>

            {/* Password action message */}
            {passwordMessage.text && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-sm font-medium ${
                  passwordMessage.type === 'success'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {passwordMessage.text}
              </motion.p>
            )}

            <div className="flex justify-end">
              <Button variant="outline" onClick={handleUpdatePassword}>
                {t('dashboard.updatePassword')}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Save Profile Button */}
        <div className="flex justify-end">
          <Button variant="primary" onClick={handleSaveProfile}>
            {t('dashboard.saveProfile')}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DashboardProfile;
