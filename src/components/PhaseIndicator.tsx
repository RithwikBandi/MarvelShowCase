import { motion } from 'motion/react';
import { type TimelineMode } from '@/data/mcuData';

interface PhaseIndicatorProps {
  phase: string;
  index: number;
  mode: TimelineMode;
}

const PhaseIndicator = ({ phase, index, mode }: PhaseIndicatorProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative">
      
      {/* Decorative Line */}
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-red-600/30" />
      </div>
      
      {/* Phase Title */}
      <div className="relative flex justify-center">
        <motion.div
          className="px-6 py-3 bg-gradient-to-r from-red-950 via-black to-red-950 rounded-full border border-red-600/40 shadow-lg"
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.2 }
          }}>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
            {phase}
          </h2>
        </motion.div>
      </div>
      
      {/* Phase Description */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center mt-4 text-gray-400 text-sm">
        {getPhaseDescription(phase)}
      </motion.div>
    </motion.div>
  );
};

const getPhaseDescription = (phase: string): string => {
  switch (phase) {
    case 'Phase 1':
      return 'The Beginning: Assembling Earth\'s Mightiest Heroes';
    case 'Phase 2':
      return 'Expanding the Universe: New Heroes and Greater Threats';
    case 'Phase 3':
      return 'The Infinity Saga: The Ultimate Battle for the Universe';
    case 'Phase 4':
      return 'A New Era: Multiverse and Magic';
    case 'Phase 5':
      return 'Beyond the Known: The Multiverse Saga Continues';
    default:
      return 'The Marvel Cinematic Universe Expands';
  }
};

export default PhaseIndicator;