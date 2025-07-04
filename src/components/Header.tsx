import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Search, User, LogOut, ArrowRight, Settings, UserCircle, Menu, X, Moon, Sun } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from './AuthModal';
import { createPortal } from 'react-dom';
import ProfileModal from './ProfileModal';
import { Switch } from "@/components/ui/switch";

interface NavItem {
  title: string;
  path: string;
  preview?: string;
  description?: string;
  gradient: string;
  icon: string;
}

interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  photoURL?: string;
}

const navItems: NavItem[] = [
  {
    title: 'CHARACTERS',
    path: '/characters',
    preview: '/images/previews/characters.webp',
    description: 'Meet the heroes and villains of the Marvel Universe',
    gradient: 'from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600',
    icon: '👥'
  },
  {
    title: 'MOVIES',
    path: '/movies',
    preview: '/images/previews/movies.webp',
    description: 'Experience epic Marvel blockbusters',
    gradient: 'from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600',
    icon: '🎬'
  },
  {
    title: 'TV SHOWS',
    path: '/tv-shows',
    preview: '/images/previews/tvshows.webp',
    description: 'Dive into Marvel series and shows',
    gradient: 'from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600',
    icon: '📺'
  },
  {
    title: 'SPECIAL PRESENTATIONS',
    path: '/special-presentations',
    preview: '/images/previews/specials.webp',
    description: 'Discover Marvel special presentations and one-shots',
    gradient: 'from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
    icon: '✨'
  },
  {
    title: 'MCU TIMELINE',
    path: '/mcu-timeline',
    preview: '/images/previews/timeline.webp',
    description: 'Follow the complete MCU story in perfect order',
    gradient: 'from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600',
    icon: '🕒'
  }
];

const Header = () => {
  const [hoveredItem, setHoveredItem] = useState<NavItem | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const { user, logout } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isIconFlipped, setIsIconFlipped] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number } | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme === 'dark') return true;
      if (storedTheme === 'light') return false;
      // System preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY.current;
      
      // Only hide header if we've scrolled down past 100px
      if (scrollingDown && isHeaderVisible && currentScrollY > 100) {
        setIsHeaderVisible(false);
      } else if (!scrollingDown && !isHeaderVisible) {
        setIsHeaderVisible(true);
      }
      
      // Always show header when at the top
      if (currentScrollY < 50) {
        setIsHeaderVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHeaderVisible]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const clearHoverTimeout = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  const handleMouseEnter = (item: NavItem) => {
    clearHoverTimeout();
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    clearHoverTimeout();
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredItem(null);
    }, 100);
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update dropdown position when menu opens
  useEffect(() => {
    if (isUserMenuOpen && userMenuRef.current) {
      const rect = userMenuRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 8, // 8px gap
        left: rect.left,
      });
    }
  }, [isUserMenuOpen]);

  const handleAuthClick = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    // Add a small delay for the animation
    await new Promise(resolve => setTimeout(resolve, 800));
    logout();
    setIsUserMenuOpen(false);
    setIsLoggingOut(false);
  };

  return (
    <>
      {/* Logout Animation Overlay */}
      <AnimatePresence>
        {isLoggingOut && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[1001]"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ scale: 1, rotateY: 0 }}
                animate={{ 
                  scale: 0.8, 
                  rotateY: 360,
                  y: -50
                }}
                transition={{ 
                  duration: 0.8,
                  ease: "easeInOut"
                }}
                className="flex flex-col items-center"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white text-3xl mb-4">
                  {user?.displayName?.[0]?.toUpperCase() || 'U'}
                </div>
                <motion.p
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  className="text-white text-lg font-medium"
                >
                  Signing out...
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.header 
        className="fixed top-0 left-0 right-0 z-[1000]"
        animate={{
          y: isHeaderVisible ? 0 : -100,
          rotateX: isHeaderVisible ? 0 : -20,
          opacity: isHeaderVisible ? 1 : 0
        }}
        initial={false}
        transition={{
          y: { type: "tween", duration: 0.2 },
          rotateX: { type: "tween", duration: 0.3 },
          opacity: { type: "tween", duration: 0.2 }
        }}
        style={{
          transformOrigin: "top",
          perspective: "1000px"
        }}
      >
        {/* Top Bar */}
        <div className="bg-black border-b border-white/10">
          <div className="container mx-auto px-4 py-2 sm:py-4">
            <div className="flex items-center justify-between">
              {/* Left Side - Auth/Profile Buttons */}
              <div className="hidden md:flex items-center gap-2 sm:gap-4">
                <AnimatePresence mode="wait">
                  {user ? (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(220, 38, 38, 0.4)" }}
                        whileTap={{ scale: 0.95 }}
                        className="hidden sm:flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-red-600 to-red-800 rounded-lg text-white text-sm sm:text-base font-medium transition-all duration-300 shadow-lg shadow-red-600/30 hover:shadow-red-600/50"
                        onClick={() => setIsProfileModalOpen(true)}
                      >
                        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-white/10 to-white/5 text-white border border-white/20">
                          {user && 'photoURL' in user && user.photoURL ? (
                            <img src={String(user.photoURL)} alt={user.displayName} className="w-full h-full rounded-full object-cover" />
                          ) : (
                            <UserCircle className="w-5 h-5" />
                          )}
                        </span>
                        <span className="hidden sm:inline">Profile</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(220, 38, 38, 0.4)" }}
                        whileTap={{ scale: 0.95 }}
                        className="hidden sm:flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg text-white text-sm sm:text-base font-medium transition-all duration-300 shadow-lg hover:shadow-red-600/50"
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                      >
                        <span className="hidden sm:inline">{isLoggingOut ? 'Signing out...' : 'Sign Out'}</span>
                      </motion.button>
                    </>
                  ) : (
                    <motion.div
                      key="auth-buttons"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex items-center gap-2 sm:gap-4"
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAuthClick('login')}
                        className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base"
                      >
                        Sign In
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(220, 38, 38, 0.4)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAuthClick('signup')}
                        className="bg-gradient-to-r from-red-600 to-red-700 text-white px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 shadow-lg shadow-red-600/25 hover:shadow-red-600/50 text-sm sm:text-base"
                      >
                        Sign Up
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Center - Logo */}
              <Link 
                to="/" 
                className="absolute left-1/2 top-9 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[40px] sm:w-[130px] sm:h-[52px]"
                aria-label="Marvel"
              >
                <img 
                  src="/images/marvel-logo.svg" 
                  alt="Marvel" 
                  className="w-full h-full"
                  width={130}
                  height={52}
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/95 backdrop-blur-md border-b border-white/10 overflow-hidden"
            >
              <div className="px-6 py-6 space-y-6">
                {/* Mobile Auth Buttons */}
                {user ? (
                  <div className="flex flex-col gap-4">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-red-600 to-red-800 rounded-lg text-white font-medium text-base"
                      onClick={() => {
                        setIsProfileModalOpen(true);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <UserCircle className="w-5 h-5" />
                      Profile
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg text-white font-medium text-base"
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      disabled={isLoggingOut}
                    >
                      <LogOut className="w-5 h-5" />
                      {isLoggingOut ? 'Signing out...' : 'Sign Out'}
                    </motion.button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        handleAuthClick('login');
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center justify-center px-6 py-4 bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg text-white font-medium text-base transition-all duration-300"
                    >
                      Sign In
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        handleAuthClick('signup');
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center justify-center px-6 py-4 bg-gradient-to-r from-red-600 to-red-700 rounded-lg text-white font-medium text-base transition-all duration-300"
                    >
                      Sign Up
                    </motion.button>
                  </div>
                )}

                {/* Mobile Navigation Links */}
                <div className="border-t border-white/10 pt-6">
                  <div className="space-y-4">
                    {navItems.map((item) => (
                      <motion.div
                        key={item.path}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          to={item.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-4 p-4 text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                        >
                          <span className="text-xl">{item.icon}</span>
                          <div className="flex-1">
                            <div className="font-medium text-base">{item.title}</div>
                            <div className="text-sm text-gray-500 mt-1">{item.description}</div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop Navigation Menu */}
        <nav className="hidden md:block bg-black relative z-[1001]">
          <div className="container mx-auto">
            <div className="flex justify-center">
              {navItems.map((item, index) => (
                <div
                  key={item.path}
                  ref={el => navRefs.current[index] = el}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to={item.path}
                    className="block py-4 px-4 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                  >
                    {item.title}
                  </Link>

                  <AnimatePresence>
                    {hoveredItem === item && item.preview && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-[50%] -translate-x-[50%] w-80 bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/10 overflow-hidden cursor-pointer transform-gpu transition-transform hover:scale-[1.02]"
                        style={{
                          transform: 'translate(-50%, 10px)',
                          marginLeft: '-100%',
                          marginRight: 'auto'
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(item.path);
                        }}
                      >
                        <img
                          src={item.preview}
                          alt={item.title}
                          className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="text-white font-bold mb-2">{item.title}</h3>
                          <p className="text-gray-300 text-sm">{item.description}</p>
                          <div className="mt-3 flex items-center text-red-400 text-sm">
                            <span>Click to explore</span>
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />

      {user && (
        <ProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          user={user}
        />
      )}
    </>
  );
};

export default Header;