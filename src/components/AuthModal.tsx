import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { 
  User, 
  Mail, 
  Lock, 
  UserPlus, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  Key, 
  Check,
  X,
  Shield,
  Sparkles,
  Zap,
  Star,
  Heart,
  Crown,
  Shield as ShieldIcon,
  Sparkles as SparklesIcon
} from 'lucide-react';
import { Modal } from '@/components/shared/Modal';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

type ViewMode = 'login' | 'signup' | 'forgot-password';

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) => {
  const [viewMode, setViewMode] = useState<ViewMode>(initialMode);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isEyeHovered, setIsEyeHovered] = useState(false);
  const [isConfirmEyeHovered, setIsConfirmEyeHovered] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  
  const { login, signup, isAuthenticating } = useAuth();

  // Update viewMode when initialMode prop changes
  useEffect(() => {
    if (isOpen) {
      setViewMode(initialMode);
      // Clear form when mode changes
      setEmail('');
      setUsername('');
      setDisplayName('');
      setPassword('');
      setConfirmPassword('');
      setError('');
      setOtpSent(false);
      setPasswordStrength(0);
    }
  }, [initialMode, isOpen]);

  // Password strength checker
  useEffect(() => {
    if (!password) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;
    if (password.length >= 6) strength += 25;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;

    setPasswordStrength(Math.min(strength, 100));
  }, [password]);

  const validateEmail = (email: string) => {
    // Reset error
    setError('');

    // Basic format check
    const basicEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!basicEmailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return false;
    }

    // Advanced validation
    const [localPart, domain] = email.split('@');
    
    // Check local part
    if (localPart.length === 0 || localPart.length > 64) {
      setError('Please enter a valid email address.');
      return false;
    }

    // Check domain
    if (!domain.includes('.') || domain.startsWith('.') || domain.endsWith('.')) {
      setError('Please enter a valid email address.');
      return false;
    }

    // Check for common typos in popular domains
    const commonDomains: { [key: string]: string } = {
      'gmail.con': 'gmail.com',
      'gmail.co': 'gmail.com',
      'yahoo.con': 'yahoo.com',
      'hotmail.con': 'hotmail.com',
      'outlook.con': 'outlook.com'
    };

    const domainPart = domain.toLowerCase();
    if (commonDomains[domainPart]) {
      setError(`Did you mean ${email.split('@')[0]}@${commonDomains[domainPart]}?`);
      return false;
    }

    return true;
  };

  const isEmailError = () => {
    return error && (error.includes('valid email') || error.includes('Did you mean') || error.includes('not registered'));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    // Clear error when user starts typing
    if (error && (error.includes('valid email') || error.includes('Did you mean'))) {
      setError('');
    }
  };

  const handleEmailBlur = () => {
    if (email) {
      validateEmail(email);
    }
  };

  const handleViewModeChange = (newMode: ViewMode) => {
    setViewMode(newMode);
    setError('');
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validate email format first
      if (!validateEmail(email)) {
        setIsLoading(false);
        return;
      }

      // Check if email exists in localStorage
      const storedCredentialsStr = localStorage.getItem('marvel_credentials');
      if (!storedCredentialsStr) {
        setError('This email is not registered.');
        setIsLoading(false);
        return;
      }

      const storedCredentials = JSON.parse(storedCredentialsStr);
      if (storedCredentials.email !== email) {
        setError('This email is not registered.');
        setIsLoading(false);
        return;
      }

      // Simulate OTP sending
      await new Promise(resolve => setTimeout(resolve, 1500));
      setOtpSent(true);
      
      // Simulate OTP delivery
      setTimeout(() => {
        setOtpSent(false);
        handleViewModeChange('login');
      }, 3000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (viewMode === 'signup') {
        // Validate all fields
        if (!email || !username || !displayName || !password || !confirmPassword) {
          throw new Error('All fields are required');
        }
        
        // Validate email format
        if (!validateEmail(email)) {
          setIsLoading(false);
          return;
        }

        if (password !== confirmPassword) {
          throw new Error('Passwords do not match');
        }
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters long');
        }
        await signup(email, username, password, displayName);
      } else {
        // Validate email format for login
        if (!validateEmail(email)) {
          setIsLoading(false);
          return;
        }
        
        // Check if password is empty
        if (!password || !password.trim()) {
          throw new Error('Please enter your password');
        }
        
        await login(email, password);
      }
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const getErrorIcon = (errorMessage: string) => {
    if (errorMessage.includes('email may not be registered') || errorMessage.includes('not registered')) {
      return <Mail className="w-4 h-4" />;
    }
    if (errorMessage.includes('Invalid password') || errorMessage.includes('Please enter your password')) {
      return <Lock className="w-4 h-4" />;
    }
    return <X className="w-4 h-4" />;
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return 'bg-red-500';
    if (passwordStrength < 50) return 'bg-orange-500';
    if (passwordStrength < 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return 'Weak';
    if (passwordStrength < 50) return 'Fair';
    if (passwordStrength < 75) return 'Good';
    return 'Strong';
  };

  const renderLoginView = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="relative mx-auto w-16 h-16"
        >
          <div className="w-full h-full rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-lg border-2 border-white/10">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 360]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
          >
            <Sparkles className="w-3 h-3 text-white" />
          </motion.div>
        </motion.div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
          <p className="text-gray-400 text-sm">Enter your credentials to continue your journey</p>
        </div>
      </div>

      {/* Error Message */}
      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            key={error}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm"
          >
            <div className="flex items-center gap-3">
              {getErrorIcon(error)}
              <div>
                <p className="font-medium">{error}</p>
                {error.includes('email may not be registered') && (
                  <p className="text-xs text-gray-400 mt-1">
                    Please check your email or create a new account.
                  </p>
                )}
                {error.includes('Invalid password') && (
                  <p className="text-xs text-gray-400 mt-1">
                    Please check your password and try again.
                  </p>
                )}
                {error.includes('Please enter your password') && (
                  <p className="text-xs text-gray-400 mt-1">
                    Please enter your password to continue.
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm text-gray-300 flex items-center gap-2">
            <Mail size={16} />
            Email
          </label>
          <div className="relative group">
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              className={`w-full px-4 py-3 bg-gray-800/50 border ${
                isEmailError() ? 'border-red-500/50' : 'border-gray-600'
              } rounded-xl focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 transition-all text-white placeholder-gray-400 group-hover:border-gray-500`}
              placeholder="Enter your email"
              required
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: email ? 1 : 0 }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {email && !isEmailError() && (
                <Check className="w-5 h-5 text-green-400" />
              )}
            </motion.div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-300 flex items-center gap-2">
            <Lock size={16} />
            Password
          </label>
          <div className="relative group">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 transition-all pr-12 group-hover:border-gray-500 text-white placeholder-gray-400"
              placeholder="Enter your password"
            />
            <motion.button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-lg bg-gray-700/50 text-gray-400 hover:text-white hover:bg-gray-700/80 hover:shadow-lg transition-all"
              onClick={() => setShowPassword(!showPassword)}
              onMouseEnter={() => setIsEyeHovered(true)}
              onMouseLeave={() => setIsEyeHovered(false)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </motion.button>
          </div>
        </div>

        {/* Forgot Password Link */}
        <div className="text-right">
          <motion.button
            type="button"
            onClick={() => handleViewModeChange('forgot-password')}
            className="text-sm text-red-400 hover:text-red-300 font-medium transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Forgot password?
          </motion.button>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isLoading}
          whileHover={{ scale: isLoading ? 1 : 1.02 }}
          whileTap={{ scale: isLoading ? 1 : 0.98 }}
          className={`w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold transition-all duration-200 ${
            isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:from-red-500 hover:to-red-600 hover:shadow-lg hover:shadow-red-500/25'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
              />
              Please wait...
            </div>
          ) : (
            'Sign In'
          )}
        </motion.button>

        {/* Mode Toggle */}
        <div className="text-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{' '}
            <motion.button
              type="button"
              onClick={() => handleViewModeChange('signup')}
              className="text-red-400 hover:text-red-300 font-medium transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Sign Up
            </motion.button>
          </p>
        </div>
      </form>
    </motion.div>
  );

  const renderSignupView = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="relative mx-auto w-16 h-16"
        >
          <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center shadow-lg border-2 border-white/10">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, -360]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center"
          >
            <Star className="w-3 h-3 text-white" />
          </motion.div>
        </motion.div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">Join the Marvel Universe</h2>
          <p className="text-gray-400 text-sm">Create your account to join our community</p>
        </div>
      </div>

      {/* Error Message */}
      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            key={error}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm"
          >
            <div className="flex items-center gap-3">
              {getErrorIcon(error)}
              <div>
                <p className="font-medium">{error}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm text-gray-300 flex items-center gap-2">
            <User size={16} />
            Display Name
          </label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all text-white placeholder-gray-400 hover:border-gray-500"
            placeholder="Enter your display name"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-300 flex items-center gap-2">
            <UserPlus size={16} />
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all text-white placeholder-gray-400 hover:border-gray-500"
            placeholder="Choose a username"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-300 flex items-center gap-2">
            <Mail size={16} />
            Email
          </label>
          <div className="relative group">
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              className={`w-full px-4 py-3 bg-gray-800/50 border ${
                isEmailError() ? 'border-red-500/50' : 'border-gray-600'
              } rounded-xl focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all text-white placeholder-gray-400 group-hover:border-gray-500`}
              placeholder="Enter your email"
              required
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: email && !isEmailError() ? 1 : 0 }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {email && !isEmailError() && (
                <Check className="w-5 h-5 text-green-400" />
              )}
            </motion.div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-300 flex items-center gap-2">
            <Lock size={16} />
            Password
          </label>
          <div className="relative group">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all pr-12 group-hover:border-gray-500 text-white placeholder-gray-400"
              placeholder="Create a password"
            />
            <motion.button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-lg bg-gray-700/50 text-gray-400 hover:text-white hover:bg-gray-700/80 hover:shadow-lg transition-all"
              onClick={() => setShowPassword(!showPassword)}
              onMouseEnter={() => setIsEyeHovered(true)}
              onMouseLeave={() => setIsEyeHovered(false)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </motion.button>
          </div>
          
          {/* Password Strength Indicator */}
          {password && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Password strength:</span>
                <span className={`font-medium ${
                  passwordStrength < 25 ? 'text-red-400' :
                  passwordStrength < 50 ? 'text-orange-400' :
                  passwordStrength < 75 ? 'text-yellow-400' : 'text-green-400'
                }`}>
                  {getPasswordStrengthText()}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${passwordStrength}%` }}
                  transition={{ duration: 0.3 }}
                  className={`h-2 rounded-full ${getPasswordStrengthColor()}`}
                />
              </div>
            </motion.div>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-300 flex items-center gap-2">
            <Lock size={16} />
            Confirm Password
          </label>
          <div className="relative group">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all pr-12 group-hover:border-gray-500 text-white placeholder-gray-400"
              placeholder="Confirm your password"
            />
            <motion.button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-lg bg-gray-700/50 text-gray-400 hover:text-white hover:bg-gray-700/80 hover:shadow-lg transition-all"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              onMouseEnter={() => setIsConfirmEyeHovered(true)}
              onMouseLeave={() => setIsConfirmEyeHovered(false)}
            >
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </motion.button>
          </div>
          
          {/* Password Match Indicator */}
          {confirmPassword && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-xs"
            >
              {password === confirmPassword ? (
                <>
                  <Check className="w-3 h-3 text-green-400" />
                  <span className="text-green-400">Passwords match</span>
                </>
              ) : (
                <>
                  <X className="w-3 h-3 text-red-400" />
                  <span className="text-red-400">Passwords don't match</span>
                </>
              )}
            </motion.div>
          )}
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isLoading}
          whileHover={{ scale: isLoading ? 1 : 1.02 }}
          whileTap={{ scale: isLoading ? 1 : 0.98 }}
          className={`w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold transition-all duration-200 ${
            isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:from-purple-500 hover:to-purple-600 hover:shadow-lg hover:shadow-purple-500/25'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
              />
              Creating account...
            </div>
          ) : (
            'Create Account'
          )}
        </motion.button>

        {/* Mode Toggle */}
        <div className="text-center">
          <p className="text-sm text-gray-400">
            Already have an account?{' '}
            <motion.button
              type="button"
              onClick={() => handleViewModeChange('login')}
              className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Sign In
            </motion.button>
          </p>
        </div>
      </form>
    </motion.div>
  );

  const renderForgotPasswordView = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="relative mx-auto w-16 h-16"
        >
          <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg border-2 border-white/10">
            <Key className="w-8 h-8 text-white" />
          </div>
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 360]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
          >
            <Zap className="w-3 h-3 text-white" />
          </motion.div>
        </motion.div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">Reset Password</h2>
          <p className="text-gray-400 text-sm">Enter your email to receive a reset link</p>
        </div>
      </div>

      {/* Error Message */}
      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            key={error}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm"
          >
            <div className="flex items-center gap-3">
              {getErrorIcon(error)}
              <div>
                <p className="font-medium">{error}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Message */}
      <AnimatePresence mode="wait">
        {otpSent && (
          <motion.div
            key="otp-success"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm"
          >
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4" />
              <div>
                <p className="font-medium">Reset link sent!</p>
                <p className="text-xs text-gray-400 mt-1">
                  Check your email for password reset instructions.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form */}
      <form onSubmit={handleForgotPassword} className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm text-gray-300 flex items-center gap-2">
            <Mail size={16} />
            Email
          </label>
          <div className="relative group">
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              className={`w-full px-4 py-3 bg-gray-800/50 border ${
                isEmailError() ? 'border-red-500/50' : 'border-gray-600'
              } rounded-xl focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all text-white placeholder-gray-400 group-hover:border-gray-500`}
              placeholder="Enter your registered email"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: email && !isEmailError() ? 1 : 0 }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {email && !isEmailError() && (
                <Check className="w-5 h-5 text-green-400" />
              )}
            </motion.div>
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isLoading}
          whileHover={{ scale: isLoading ? 1 : 1.02 }}
          whileTap={{ scale: isLoading ? 1 : 0.98 }}
          className={`w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold transition-all duration-200 ${
            isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:from-blue-500 hover:to-blue-600 hover:shadow-lg hover:shadow-blue-500/25'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
              />
              Sending...
            </div>
          ) : (
            'Send Reset Link'
          )}
        </motion.button>

        {/* Back to Login */}
        <div className="text-center">
          <motion.button
            type="button"
            onClick={() => handleViewModeChange('login')}
            className="text-sm text-gray-400 hover:text-gray-300 font-medium transition-colors flex items-center justify-center gap-2 mx-auto"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowLeft size={16} />
            Back to Sign In
          </motion.button>
        </div>
      </form>
    </motion.div>
  );

  return (
    <>
      {/* Sign In Success Animation */}
      <AnimatePresence>
        {isAuthenticating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[1001]"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: 1,
                  opacity: 1,
                  y: [0, -20, 0]
                }}
                transition={{ 
                  duration: 1.2,
                  ease: "easeInOut"
                }}
                className="flex flex-col items-center"
              >
                <motion.div 
                  className="relative w-24 h-24 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center mb-6 shadow-2xl shadow-red-600/30 border-4 border-white/10"
                  animate={{
                    rotateY: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 1.5,
                    ease: "easeInOut"
                  }}
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 360]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Heart className="w-12 h-12 text-white" />
                  </motion.div>
                  
                  {/* Success particles */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute inset-0"
                  >
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                        style={{
                          left: '50%',
                          top: '50%',
                          transform: 'translate(-50%, -50%)'
                        }}
                        animate={{
                          x: [0, Math.cos(i * 45 * Math.PI / 180) * 60],
                          y: [0, Math.sin(i * 45 * Math.PI / 180) * 60],
                          opacity: [1, 0],
                          scale: [0, 1, 0]
                        }}
                        transition={{
                          duration: 1,
                          delay: 0.5 + i * 0.1,
                          ease: "easeOut"
                        }}
                      />
                    ))}
                  </motion.div>
                </motion.div>
                
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-white text-xl font-bold"
                >
                  Welcome back!
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-gray-400 text-sm"
                >
                  You're now signed in
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Modal isOpen={isOpen} onClose={onClose} width="w-full max-w-md">
        <div className="relative p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={viewMode}
              initial={{ 
                x: viewMode === 'forgot-password' ? 300 : viewMode === 'signup' ? -300 : 0,
                opacity: 0,
                scale: 0.95
              }}
              animate={{ 
                x: 0,
                opacity: 1,
                scale: 1
              }}
              exit={{ 
                x: viewMode === 'forgot-password' ? -300 : viewMode === 'signup' ? 300 : 0,
                opacity: 0,
                scale: 0.95
              }}
              transition={{ 
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              {viewMode === 'login' && renderLoginView()}
              {viewMode === 'signup' && renderSignupView()}
              {viewMode === 'forgot-password' && renderForgotPasswordView()}
            </motion.div>
          </AnimatePresence>
        </div>
      </Modal>
    </>
  );
};

export default AuthModal; 