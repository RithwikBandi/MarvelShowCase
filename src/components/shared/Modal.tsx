import React from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  showCloseButton?: boolean;
  width?: string;
}

export const Modal = ({ 
  isOpen, 
  onClose, 
  children, 
  showCloseButton = true,
  width = 'w-full max-w-xs sm:max-w-md lg:max-w-lg'
}: ModalProps) => {
  const transition = {
    type: "tween",
    duration: 0.3,
    ease: [0.32, 0.72, 0, 1]
  };

  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const modalVariants = {
    initial: {
      opacity: 0,
      scale: 0.95,
      y: 20,
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: {
        ...transition,
        opacity: { duration: 0.2 }
      }
    }
  };

  const backdropVariants = {
    initial: { 
      opacity: 0
    },
    animate: { 
      opacity: 1,
      transition
    },
    exit: { 
      opacity: 0,
      transition
    }
  };

  const closeButtonVariants = {
    initial: { 
      opacity: 0,
      scale: 0.8,
      rotate: -45
    },
    animate: { 
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        ...transition,
        duration: 0.2
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.8,
      rotate: 45,
      transition: {
        ...transition,
        duration: 0.2
      }
    }
  };

  return ReactDOM.createPortal(
    <AnimatePresence mode="sync">
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
          {/* Semi-transparent overlay */}
          <motion.div
            variants={backdropVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 bg-black/60 backdrop-blur-[8px]"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`${width} relative bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-red-900/30 shadow-xl z-[100000] max-h-[90vh] overflow-y-auto`}
            onClick={(e) => e.stopPropagation()}
          >
            {showCloseButton && (
              <motion.button
                variants={closeButtonVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10 p-2 z-[100001]"
              >
                <X size={20} className="w-5 h-5" />
              </motion.button>
            )}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={transition}
              className="p-4 sm:p-6"
            >
              {children}
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}; 