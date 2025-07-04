import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="relative z-20 py-10 sm:py-14 bg-gradient-to-t from-black/80 via-black/60 to-transparent backdrop-blur-xl border-t border-red-500/30 shadow-[0_-4px_32px_0_rgba(239,68,68,0.10)]">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center justify-center gap-2"
        >
          <div className="flex items-center gap-2 text-white text-base font-medium drop-shadow-sm">
            <span className="opacity-80">Built with</span>
            <Heart className="inline-block w-5 h-5 text-red-500 animate-pulse" />
            <span className="opacity-80">by <span className="font-bold text-red-400">BATMAN</span></span>
          </div>
          <div className="text-xs text-gray-400 mt-2 opacity-70">
            &copy; {new Date().getFullYear()} MarvelShowCase. Not affiliated with Marvel Studios.
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 