import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/shared/Modal';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserCircle, 
  Settings, 
  Lock, 
  User, 
  Mail, 
  Calendar,
  Eye,
  EyeOff,
  Check,
  X,
  ArrowLeft,
  Shield,
  Palette,
  Bell,
  Globe,
  Smartphone,
  Moon,
  Sun
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Switch } from '@/components/ui/switch';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    displayName: string;
    email: string;
    username: string;
    photoURL?: string;
  };
}

type Section = 'main' | 'password' | 'username' | 'displayName' | 'settings' | 'security';

const ProfileModal = ({ isOpen, onClose, user }: ProfileModalProps) => {
  const [currentSection, setCurrentSection] = useState<Section>('main');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  // Form states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newDisplayName, setNewDisplayName] = useState('');
  
  // Username change restriction
  const [lastUsernameChange, setLastUsernameChange] = useState<Date | null>(null);
  const [canChangeUsername, setCanChangeUsername] = useState(true);

  const { logout } = useAuth();

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || document.documentElement.classList.contains('dark');
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    // Check username change restriction
    const storedLastChange = localStorage.getItem('last_username_change');
    if (storedLastChange) {
      const lastChange = new Date(storedLastChange);
      const now = new Date();
      const diffInDays = (now.getTime() - lastChange.getTime()) / (1000 * 60 * 60 * 24);
      
      if (diffInDays < 30) {
        setCanChangeUsername(false);
        setLastUsernameChange(lastChange);
      }
    }
  }, []);

  const resetForm = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setNewUsername('');
    setNewDisplayName('');
    setMessage(null);
  };

  const handleSectionChange = (section: Section) => {
    resetForm();
    setCurrentSection(section);
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      showMessage('error', 'All fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      showMessage('error', 'New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      showMessage('error', 'Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update stored credentials
      const storedCredentials = localStorage.getItem('marvel_credentials');
      if (storedCredentials) {
        const credentials = JSON.parse(storedCredentials);
        if (credentials.password === currentPassword) {
          credentials.password = newPassword;
          localStorage.setItem('marvel_credentials', JSON.stringify(credentials));
          showMessage('success', 'Password updated successfully');
          resetForm();
        } else {
          showMessage('error', 'Current password is incorrect');
        }
      }
    } catch (error) {
      showMessage('error', 'Failed to update password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUsernameChange = async () => {
    if (!newUsername.trim()) {
      showMessage('error', 'Username is required');
      return;
    }

    if (!canChangeUsername) {
      showMessage('error', 'Username can only be changed once per month');
      return;
    }

    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(newUsername)) {
      showMessage('error', 'Username can only contain letters, numbers, and underscores');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update stored credentials and user
      const storedCredentials = localStorage.getItem('marvel_credentials');
      const storedUser = localStorage.getItem('marvel_user');
      
      if (storedCredentials && storedUser) {
        const credentials = JSON.parse(storedCredentials);
        const userData = JSON.parse(storedUser);
        
        credentials.username = newUsername;
        userData.username = newUsername;
        
        localStorage.setItem('marvel_credentials', JSON.stringify(credentials));
        localStorage.setItem('marvel_user', JSON.stringify(userData));
        localStorage.setItem('last_username_change', new Date().toISOString());
        
        setCanChangeUsername(false);
        setLastUsernameChange(new Date());
        showMessage('success', 'Username updated successfully');
        resetForm();
        
        // Refresh page to update user context
        window.location.reload();
      }
    } catch (error) {
      showMessage('error', 'Failed to update username');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisplayNameChange = async () => {
    if (!newDisplayName.trim()) {
      showMessage('error', 'Display name is required');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update stored credentials and user
      const storedCredentials = localStorage.getItem('marvel_credentials');
      const storedUser = localStorage.getItem('marvel_user');
      
      if (storedCredentials && storedUser) {
        const credentials = JSON.parse(storedCredentials);
        const userData = JSON.parse(storedUser);
        
        credentials.displayName = newDisplayName;
        userData.displayName = newDisplayName;
        
        localStorage.setItem('marvel_credentials', JSON.stringify(credentials));
        localStorage.setItem('marvel_user', JSON.stringify(userData));
        
        showMessage('success', 'Display name updated successfully');
        resetForm();
        
        // Refresh page to update user context
        window.location.reload();
      }
    } catch (error) {
      showMessage('error', 'Failed to update display name');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    onClose();
  };

  const getDaysUntilUsernameChange = () => {
    if (!lastUsernameChange) return 30;
    const now = new Date();
    const lastChange = new Date(lastUsernameChange);
    const diffInDays = (now.getTime() - lastChange.getTime()) / (1000 * 60 * 60 * 24);
    return Math.max(0, Math.ceil(30 - diffInDays));
  };

  const renderMainSection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Profile Header */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="relative mx-auto w-24 h-24"
        >
          <div className="w-full h-full rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white text-4xl shadow-lg border-4 border-white/10">
            {user.photoURL ? (
              <img src={user.photoURL} alt={user.displayName} className="w-full h-full rounded-full object-cover" />
            ) : (
              <UserCircle className="w-16 h-16" />
            )}
          </div>
          <motion.div
            className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer border-2 border-white"
          >
            <User className="w-4 h-4 text-white" />
          </motion.div>
        </motion.div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">{user.displayName}</h2>
          <p className="text-gray-400 text-sm">@{user.username}</p>
          <p className="text-gray-500 text-sm">{user.email}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSectionChange('displayName')}
          className="w-full p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl border border-white/10 hover:border-red-500/30 transition-all duration-200 flex items-center justify-between group"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <User className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-left">
              <p className="text-white font-medium">Display Name</p>
              <p className="text-gray-400 text-sm">Change your display name</p>
            </div>
          </div>
          <div className="text-gray-400 group-hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5 rotate-180" />
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSectionChange('username')}
          className="w-full p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl border border-white/10 hover:border-red-500/30 transition-all duration-200 flex items-center justify-between group"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <User className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-left">
              <p className="text-white font-medium">Username</p>
              <p className="text-gray-400 text-sm">
                {canChangeUsername ? 'Change your username' : `Available in ${getDaysUntilUsernameChange()} days`}
              </p>
            </div>
          </div>
          <div className="text-gray-400 group-hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5 rotate-180" />
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSectionChange('password')}
          className="w-full p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl border border-white/10 hover:border-red-500/30 transition-all duration-200 flex items-center justify-between group"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <Lock className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-left">
              <p className="text-white font-medium">Password</p>
              <p className="text-gray-400 text-sm">Change your password</p>
            </div>
          </div>
          <div className="text-gray-400 group-hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5 rotate-180" />
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSectionChange('settings')}
          className="w-full p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl border border-white/10 hover:border-red-500/30 transition-all duration-200 flex items-center justify-between group"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
              <Settings className="w-5 h-5 text-orange-400" />
            </div>
            <div className="text-left">
              <p className="text-white font-medium">Settings</p>
              <p className="text-gray-400 text-sm">App preferences & notifications</p>
            </div>
          </div>
          <div className="text-gray-400 group-hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5 rotate-180" />
          </div>
        </motion.button>
      </div>

      {/* Logout Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleLogout}
        className="w-full p-4 bg-gradient-to-r from-red-600/20 to-red-700/20 rounded-xl border border-red-500/30 hover:border-red-400/50 transition-all duration-200 text-red-400 hover:text-red-300 font-medium"
      >
        Sign Out
      </motion.button>
    </motion.div>
  );

  const renderPasswordSection = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleSectionChange('main')}
          className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-white" />
        </motion.button>
        <h2 className="text-xl font-bold text-white">Change Password</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
          <div className="flex items-center">
            <input
              type={showPassword ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
              placeholder="Enter current password"
            />
            <motion.button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-lg bg-gray-700/50 text-gray-400 hover:text-white hover:bg-gray-700/80 hover:shadow-lg transition-all"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
          <div className="flex items-center">
            <input
              type={showNewPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
              placeholder="Enter new password"
            />
            <motion.button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-lg bg-gray-700/50 text-gray-400 hover:text-white hover:bg-gray-700/80 hover:shadow-lg transition-all"
            >
              {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
          <div className="flex items-center">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
              placeholder="Confirm new password"
            />
            <motion.button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-lg bg-gray-700/50 text-gray-400 hover:text-white hover:bg-gray-700/80 hover:shadow-lg transition-all"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handlePasswordChange}
          disabled={isLoading}
          className="w-full p-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-medium hover:from-red-500 hover:to-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Updating...' : 'Update Password'}
        </motion.button>
      </div>
    </motion.div>
  );

  const renderUsernameSection = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleSectionChange('main')}
          className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-white" />
        </motion.button>
        <h2 className="text-xl font-bold text-white">Change Username</h2>
      </div>

      {!canChangeUsername && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-lg"
        >
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-yellow-400" />
            <p className="text-yellow-300 text-sm">
              Username can only be changed once per month. Available in {getDaysUntilUsernameChange()} days.
            </p>
          </div>
        </motion.div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Current Username</label>
          <input
            type="text"
            value={user.username}
            disabled
            className="w-full p-3 bg-gray-800/30 border border-gray-600 rounded-lg text-gray-400 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">New Username</label>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            disabled={!canChangeUsername}
            className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="Enter new username"
          />
          <p className="text-xs text-gray-500 mt-1">Only letters, numbers, and underscores allowed</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleUsernameChange}
          disabled={isLoading || !canChangeUsername}
          className="w-full p-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-medium hover:from-purple-500 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Updating...' : 'Update Username'}
        </motion.button>
      </div>
    </motion.div>
  );

  const renderDisplayNameSection = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleSectionChange('main')}
          className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-white" />
        </motion.button>
        <h2 className="text-xl font-bold text-white">Change Display Name</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Current Display Name</label>
          <input
            type="text"
            value={user.displayName}
            disabled
            className="w-full p-3 bg-gray-800/30 border border-gray-600 rounded-lg text-gray-400 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">New Display Name</label>
          <input
            type="text"
            value={newDisplayName}
            onChange={(e) => setNewDisplayName(e.target.value)}
            className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
            placeholder="Enter new display name"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleDisplayNameChange}
          disabled={isLoading}
          className="w-full p-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:from-blue-500 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Updating...' : 'Update Display Name'}
        </motion.button>
      </div>
    </motion.div>
  );

  const renderSettingsSection = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleSectionChange('main')}
          className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-white" />
        </motion.button>
        <h2 className="text-xl font-bold text-white">Settings</h2>
      </div>

      <div className="space-y-4">
        {/* Notifications */}
        <div className="p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl border border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Bell className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-white font-medium">Push Notifications</p>
                <p className="text-gray-400 text-sm">Get notified about new content</p>
              </div>
            </div>
            <div className="w-12 h-6 bg-gray-600 rounded-full relative cursor-pointer">
              <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform"></div>
            </div>
          </div>
        </div>

        {/* Language */}
        <div className="p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl border border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <Globe className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-white font-medium">Language</p>
                <p className="text-gray-400 text-sm">English (US)</p>
              </div>
            </div>
            <ArrowLeft className="w-5 h-5 text-gray-400 rotate-180" />
          </div>
        </div>

        {/* Mobile App */}
        <div className="p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl border border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <p className="text-white font-medium">Mobile App</p>
                <p className="text-gray-400 text-sm">Download our mobile app</p>
              </div>
            </div>
            <ArrowLeft className="w-5 h-5 text-gray-400 rotate-180" />
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="w-full max-w-md">
      <div className="relative">
        {/* Message Toast */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className={`absolute top-4 left-4 right-4 p-3 rounded-lg flex items-center space-x-2 z-10 ${
                message.type === 'success' 
                  ? 'bg-green-500/20 border border-green-500/30 text-green-300' 
                  : 'bg-red-500/20 border border-red-500/30 text-red-300'
              }`}
            >
              {message.type === 'success' ? (
                <Check className="w-5 h-5" />
              ) : (
                <X className="w-5 h-5" />
              )}
              <span className="text-sm font-medium">{message.text}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content */}
        <div className="pt-4">
          <AnimatePresence mode="wait">
            {currentSection === 'main' && (
              <motion.div key="main">
                {renderMainSection()}
              </motion.div>
            )}
            {currentSection === 'password' && (
              <motion.div key="password">
                {renderPasswordSection()}
              </motion.div>
            )}
            {currentSection === 'username' && (
              <motion.div key="username">
                {renderUsernameSection()}
              </motion.div>
            )}
            {currentSection === 'displayName' && (
              <motion.div key="displayName">
                {renderDisplayNameSection()}
              </motion.div>
            )}
            {currentSection === 'settings' && (
              <motion.div key="settings">
                {renderSettingsSection()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Modal>
  );
};

export default ProfileModal; 