import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCircle, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

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

interface MobileMarvelMenuProps {
  open: boolean;
  onClose: () => void;
  navItems: NavItem[];
  user: User | null;
  onProfile: () => void;
  onAuth: (mode: 'login' | 'signup') => void;
}

const MobileMarvelMenu = ({ open, onClose, navItems, user, onProfile, onAuth }: MobileMarvelMenuProps) => {
  // Lock background scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="marvel-mobile-menu"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="fixed inset-0 z-[10020] h-screen w-screen bg-gradient-to-br from-black via-zinc-900 to-red-900/90 backdrop-blur-md flex flex-col pt-[env(safe-area-inset-top)]"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {/* Backdrop for click-to-close (optional, can add if desired) */}
        {/* <div className="absolute inset-0 bg-black/60" onClick={onClose} /> */}
        {/* Top Bar: Close button & Marvel logo */}
        <div className="flex items-center justify-between px-4 pt-6 pb-2">
          <button
            aria-label="Close menu"
            onClick={onClose}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-black/40 text-white hover:bg-red-700/80 transition-all"
            type="button"
          >
            <X className="w-7 h-7" />
          </button>
          <img src="/images/marvel-logo.svg" alt="Marvel" className="w-28 h-10 drop-shadow-[0_2px_12px_rgba(220,38,38,0.7)]" />
          <div className="w-10 h-10" /> {/* Spacer for symmetry */}
        </div>
        {/* Menu Content */}
        <div className="flex-1 px-4 pb-8 overflow-y-auto max-h-[calc(100vh-80px)]">
          {/* Profile/Auth Buttons */}
          <div className="flex flex-col gap-4 mb-6">
            {user ? (
              <button
                className="flex items-center justify-center gap-3 py-4 rounded-full bg-gradient-to-r from-red-700 via-red-600 to-red-800 text-white font-bold text-lg shadow-lg shadow-red-900/30 border-2 border-red-700/60 hover:from-red-800 hover:to-red-900 transition-all"
                onClick={() => {
                  onProfile();
                  onClose();
                }}
              >
                <UserCircle className="w-6 h-6" />
                Profile
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    onAuth('login');
                    onClose();
                  }}
                  className="flex items-center justify-center py-4 rounded-full bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-900 text-white font-bold text-lg border-2 border-zinc-700/60 hover:from-zinc-900 hover:to-zinc-800 transition-all mb-2"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    onAuth('signup');
                    onClose();
                  }}
                  className="flex items-center justify-center py-4 rounded-full bg-gradient-to-r from-red-700 via-red-600 to-red-800 text-white font-bold text-lg shadow-lg shadow-red-900/30 border-2 border-red-700/60 hover:from-red-800 hover:to-red-900 transition-all"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
          {/* Divider */}
          <div className="border-t-2 border-red-700/40 mb-6" />
          {/* Navigation Links */}
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className="flex items-center gap-4 py-4 px-6 rounded-full bg-gradient-to-r from-zinc-800 via-zinc-900 to-red-900/80 text-white font-extrabold text-lg shadow-md shadow-red-900/20 border-2 border-red-700/30 hover:from-red-900 hover:to-red-800 hover:shadow-red-700/40 transition-all"
                style={{ letterSpacing: '0.04em' }}
              >
                <span className="text-2xl drop-shadow-[0_2px_8px_rgba(220,38,38,0.5)]">{item.icon}</span>
                <div className="flex-1">
                  <div className="font-extrabold text-lg">{item.title}</div>
                  <div className="text-xs text-red-200/80 mt-1 font-medium">{item.description}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export default MobileMarvelMenu; 