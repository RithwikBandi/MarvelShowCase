import { motion } from 'motion/react';
import type { TimelineMode } from '@/data/mcuData';

interface TimelineToggleProps {
  mode: TimelineMode;
  onModeChange: (mode: TimelineMode) => void;
}

const TimelineToggle = ({ mode, onModeChange }: TimelineToggleProps) => {
  return (
    <div className="relative flex justify-center items-center">
      <motion.div
        className="bg-black/40 backdrop-blur-md p-2 rounded-2xl border border-red-600/30 shadow-lg shadow-red-900/20"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}>
        <div className="relative flex space-x-2 p-1">
          {/* Background Slider */}
          <motion.div
            className="absolute inset-1 bg-gradient-to-r from-red-600 to-red-900 rounded-xl shadow-lg"
            initial={false}
            animate={{
              x: mode === 'story' ? 0 : '100%',
              width: '50%'
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
            style={{
              filter: 'blur(2px)'
            }}
          />

          {/* Story Button */}
          <motion.button
            onClick={() => onModeChange('story')}
            className={`relative px-6 py-2 rounded-xl text-sm font-bold transition-colors z-10
              ${mode === 'story' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              scale: mode === 'story' ? 1.05 : 1,
              y: mode === 'story' ? -2 : 0
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30
            }}>
            Story Order
          </motion.button>

          {/* Release Button */}
          <motion.button
            onClick={() => onModeChange('release')}
            className={`relative px-6 py-2 rounded-xl text-sm font-bold transition-colors z-10
              ${mode === 'release' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              scale: mode === 'release' ? 1.05 : 1,
              y: mode === 'release' ? -2 : 0
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30
            }}>
            Release Order
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default TimelineToggle;