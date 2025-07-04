import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';

interface FloatingHomeButtonProps {
  className?: string;
}

const FloatingHomeButton = ({ className = '' }: FloatingHomeButtonProps) => {
  const [isNavigatingHome, setIsNavigatingHome] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  // Cleanup effect to reset loading state if unmounted or navigation occurs
  useEffect(() => {
    return () => setIsNavigatingHome(false);
  }, []);

  const handleBackToHome = (e: React.MouseEvent) => {
    setIsNavigatingHome(true);
    // Ripple effect
    const button = e.currentTarget as HTMLElement;
    const ripple = document.createElement('span');
    ripple.className = 'absolute inset-0 rounded-full bg-red-500/30 animate-ripple pointer-events-none';
    button.appendChild(ripple);
    setTimeout(() => {
      ripple.remove();
    }, 600);
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <>
      {/* Loading Screen for Navigation */}
      <AnimatePresence>
        {isNavigatingHome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1002]"
          >
            <LoadingScreen isExit={true} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.div
        className={`fixed bottom-6 right-6 z-[1001] ${className}`}
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ 
          duration: 0.6, 
          delay: 0.3,
          type: "spring",
          stiffness: 200,
          damping: 20
        }}
      >
        <div className="group relative">
          <motion.button
            onClick={handleBackToHome}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative flex items-center justify-center overflow-hidden focus:outline-none"
            initial={false}
            animate={{
              width: isHovered ? 180 : 56,
              minWidth: isHovered ? 180 : 56,
              maxWidth: isHovered ? 180 : 56,
              height: 56,
              borderRadius: 28,
              background: isHovered
                ? 'linear-gradient(90deg, #ef4444 0%, #b91c1c 100%)'
                : 'linear-gradient(135deg, #b91c1c 0%, #111 100%)',
              boxShadow: '0 8px 32px 0 rgba(239,68,68,0.18)'
            }}
            transition={{
              width: { type: 'spring', stiffness: 220, damping: 22 },
              minWidth: { type: 'spring', stiffness: 220, damping: 22 },
              maxWidth: { type: 'spring', stiffness: 220, damping: 22 },
              borderRadius: { type: 'spring', stiffness: 220, damping: 22 },
              background: { duration: 0.3 },
            }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
            whileHover={{ scale: 1.13 }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Glowing ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-red-500/30 pointer-events-none"
              animate={{
                opacity: isHovered ? 0.7 : 0.3,
                scale: isHovered ? 1.15 : 1
              }}
              transition={{ duration: 0.3 }}
            />
            {/* Home Icon - only visible when not hovered, perfectly centered in the visible button area */}
            {!isHovered && (
              <span className="flex items-center justify-center w-full h-full z-20">
                <Home className="w-6 h-6 text-red-300" />
              </span>
            )}
            {/* Marvel M + Text - only visible when hovered, perfectly centered as a row */}
            <motion.div
              className="flex items-center justify-center w-full h-full absolute left-0 top-0 z-10"
              initial={false}
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
              transition={{ opacity: { duration: 0.25, delay: isHovered ? 0.08 : 0 }, x: { type: 'spring', stiffness: 220, damping: 22 } }}
              style={{ pointerEvents: 'none' }}
            >
              <span className="text-white text-3xl font-black tracking-tight select-none mr-2" style={{ fontFamily: 'Arial Black, sans-serif' }}>M</span>
              <span className="text-white text-base font-semibold whitespace-nowrap">Back to Home</span>
            </motion.div>
          </motion.button>
        </div>
      </motion.div>
    </>
  );
};

// Add ripple animation to global styles if not present
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes ripple {
      0% { opacity: 0.7; transform: scale(0.8); }
      70% { opacity: 0.3; transform: scale(1.2); }
      100% { opacity: 0; transform: scale(1.5); }
    }
    .animate-ripple {
      animation: ripple 0.6s linear;
    }
  `;
  if (!document.head.querySelector('style[data-ripple]')) {
    style.setAttribute('data-ripple', '');
    document.head.appendChild(style);
  }
}

export default FloatingHomeButton; 