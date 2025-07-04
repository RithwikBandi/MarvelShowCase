import { motion } from 'framer-motion';

interface LoadingScreenProps {
  theme?: 'default' | 'movies' | 'tvshows' | 'specials' | 'timeline' | 'characters';
  isExit?: boolean;
}

// Simple Marvel Logo component for loading screens
const SimpleMarvelLogo = ({ className }: { className?: string }) => (
  <div className={className}>
    <span className="text-6xl font-bold bg-gradient-to-r from-red-500 via-red-400 to-red-600 bg-clip-text text-transparent">
      MARVEL
    </span>
  </div>
);

// Unified Exit Loading Screen - Professional Apple-like transition
const ExitLoadingScreen = () => (
  <div className="fixed inset-0 bg-black z-[1001] flex items-center justify-center overflow-hidden">
    {/* Background gradient */}
    <div className="absolute inset-0 bg-gradient-to-b from-red-900/30 via-black to-red-600/30" />
    
    {/* Animated background particles */}
    <div className="absolute inset-0">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-red-500/60 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 2, 
            delay: Math.random() * 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>

    {/* Central content container */}
    <div className="relative z-10 flex flex-col items-center justify-center text-center">
      {/* Professional Marvel Logo Animation */}
      <motion.div
        className="mb-8"
        initial={{ scale: 1, opacity: 1 }}
        animate={{ 
          scale: [1, 1.1, 0.9, 0],
          opacity: [1, 1, 0.8, 0]
        }}
        transition={{ 
          duration: 1.5, 
          ease: "easeInOut",
          times: [0, 0.3, 0.7, 1]
        }}
      >
        <SimpleMarvelLogo className="text-6xl" />
      </motion.div>
      
      {/* Loading dots */}
      <motion.div
        className="flex justify-center space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ 
          duration: 1.5, 
          delay: 0.3,
          ease: "easeInOut"
        }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-red-500 rounded-full"
            animate={{ 
              scale: [1, 1.5, 1, 0],
              opacity: [1, 1, 0.8, 0]
            }}
            transition={{ 
              duration: 1.5, 
              delay: 0.3 + (i * 0.1),
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
    </div>

    {/* Collapsing panel effect */}
    <motion.div
      className="absolute inset-0 bg-gradient-to-t from-red-600/20 to-transparent"
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ scaleY: [0, 1, 0], opacity: [0, 0.3, 0] }}
      transition={{ 
        duration: 1.5, 
        delay: 0.8,
        ease: "easeInOut"
      }}
      style={{ transformOrigin: "bottom" }}
    />
  </div>
);

const LoadingScreen = ({ theme = 'default', isExit = false }: LoadingScreenProps) => {
  // Return exit loading screen if isExit is true
  if (isExit) {
    return <ExitLoadingScreen />;
  }

  // Movies Theme - Cinematic reel with Marvel movie-style red theme
  const MoviesLoadingScreen = () => (
    <div className="fixed inset-0 bg-black z-[1001] flex items-center justify-center overflow-hidden">
      {/* Cinematic reel background */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 via-black to-red-900/20" />
      
      {/* Film reel animation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-96 h-96 relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 border-4 border-red-500/30 rounded-full" />
          <div className="absolute inset-4 border-4 border-red-400/50 rounded-full" />
          <div className="absolute inset-8 border-4 border-red-300/70 rounded-full" />
          
          {/* Film perforations */}
          {Array.from({ length: 24 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-red-500 rounded-full"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) rotate(${i * 15}deg) translateY(-180px)`,
              }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, delay: i * 0.1, repeat: Infinity }}
            />
          ))}
        </motion.div>
      </div>

      {/* Marvel Logo and Content - Perfectly Centered */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-8"
        >
          <SimpleMarvelLogo className="text-6xl" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-red-400 text-xl font-bold tracking-wider mb-6"
        >
          MARVEL MOVIES
        </motion.div>
        
        <motion.div
          className="flex justify-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-red-500 rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 0.6, delay: i * 0.2, repeat: Infinity }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );

  // TV Shows Theme - TV static with retro Marvel Studios intro style
  const TVShowsLoadingScreen = () => (
    <div className="fixed inset-0 bg-black z-[1001] flex items-center justify-center overflow-hidden">
      {/* TV static background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 via-black to-cyan-900/30" />
      
      {/* Static noise effect */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 100 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.1, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
      </div>

      {/* Retro TV frame */}
      <motion.div
        className="absolute w-80 h-52 sm:w-96 sm:h-64 border-8 border-gray-600 rounded-lg"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        style={{ top: '20%' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded" />
        
        {/* Scan lines */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-px bg-blue-400/30"
            style={{ top: `${i * 5}%` }}
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 0.5, delay: i * 0.1, repeat: Infinity }}
          />
        ))}
      </motion.div>

      {/* Marvel Logo and Content - Perfectly Centered */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-8"
        >
          <SimpleMarvelLogo className="text-6xl" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-blue-400 text-xl sm:text-3xl font-bold tracking-wider mb-6"
        >
          MARVEL TV SHOWS
        </motion.div>
        
        <motion.div
          className="flex justify-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-blue-500 rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 0.6, delay: i * 0.2, repeat: Infinity }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );

  // Specials Theme - Spotlight with comic frame zoom
  const SpecialsLoadingScreen = () => (
    <div className="fixed inset-0 bg-black z-[1001] flex items-center justify-center overflow-hidden">
      {/* Spotlight background */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-900/40 via-black to-pink-900/40" />
      
      {/* Spotlight beams */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute w-96 h-96 bg-gradient-to-b from-purple-500/20 to-transparent rounded-full"
          style={{
            left: `${30 + i * 20}%`,
            top: `${20 + i * 10}%`,
          }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
        />
      ))}

      {/* Comic frame zoom effect */}
      <motion.div
        className="absolute w-80 h-80 border-4 border-purple-500 rounded-lg"
        initial={{ scale: 0.1, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1.5, type: "spring" }}
        style={{ top: '15%' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded" />
        
        {/* Comic dots pattern */}
        <div className="absolute inset-0 opacity-30">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, delay: Math.random() * 2, repeat: Infinity }}
            />
          ))}
        </div>
      </motion.div>

      {/* Marvel Logo and Content - Perfectly Centered */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-8"
        >
          <SimpleMarvelLogo className="text-6xl" />
        </motion.div>
        
          <motion.div
          initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-purple-400 text-xl font-bold tracking-wider mb-6"
        >
          SPECIAL PRESENTATIONS
          </motion.div>

          <motion.div
          className="flex justify-center space-x-2"
            initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-purple-500 rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 0.6, delay: i * 0.2, repeat: Infinity }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );

  // Timeline Theme - Glitch/flicker effect with timeline stroke animation
  const TimelineLoadingScreen = () => (
    <div className="fixed inset-0 bg-black z-[1001] flex items-center justify-center overflow-hidden">
      {/* Timeline background */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-900/30 via-black to-red-600/30" />
      
      {/* Central timeline line */}
      <motion.div
        className="absolute left-1/2 top-0 w-1 h-full bg-gradient-to-b from-red-600 via-red-400 to-red-600"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />
      
      {/* Timeline nodes */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 bg-red-500 rounded-full border-2 border-white"
          style={{
            left: '50%',
            top: `${15 + i * 10}%`,
            transform: 'translateX(-50%)',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 + i * 0.2 }}
        />
      ))}

      {/* Glitch effect */}
      <motion.div
        className="absolute inset-0 bg-red-500/10"
        animate={{ opacity: [0, 0.1, 0] }}
        transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 2 }}
      />

      {/* Marvel Logo and Content - Perfectly Centered */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-8"
        >
          <SimpleMarvelLogo className="text-6xl" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-red-400 text-xl font-bold tracking-wider mb-6"
        >
          MCU TIMELINE
          </motion.div>

        <motion.div
          className="flex justify-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-red-500 rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 0.6, delay: i * 0.2, repeat: Infinity }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );

  // Characters Theme - Hero power-up effect
  const CharactersLoadingScreen = () => (
    <div className="fixed inset-0 bg-black z-[1001] flex items-center justify-center overflow-hidden">
      {/* Hero power background */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-900/30 via-black to-red-900/30" />
      
      {/* Power rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute border-2 border-orange-500/50 rounded-full"
              style={{
            width: `${200 + i * 100}px`,
            height: `${200 + i * 100}px`,
              }}
              animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
        />
      ))}

      {/* Energy particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-orange-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{ 
            y: [0, -50, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{ duration: 1.5, delay: Math.random() * 2, repeat: Infinity }}
        />
      ))}

      {/* Marvel Logo and Content - Perfectly Centered */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-8"
        >
          <SimpleMarvelLogo className="text-6xl" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-orange-400 text-xl font-bold tracking-wider mb-6"
        >
          MARVEL CHARACTERS
        </motion.div>
        
        <motion.div
          className="flex justify-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-orange-500 rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 0.6, delay: i * 0.2, repeat: Infinity }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );

  // Default Theme - Original loading screen
  const DefaultLoadingScreen = () => (
    <div className="fixed inset-0 bg-black z-[1001] flex items-center justify-center">
      <div className="flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-8"
        >
          <SimpleMarvelLogo className="text-6xl" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-red-400 text-xl font-bold tracking-wider mb-6"
        >
          MARVEL SHOWCASE
        </motion.div>
        
        <motion.div
          className="flex justify-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-red-500 rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 0.6, delay: i * 0.2, repeat: Infinity }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );

  // Return the appropriate themed loading screen
  switch (theme) {
    case 'movies':
      return <MoviesLoadingScreen />;
    case 'tvshows':
      return <TVShowsLoadingScreen />;
    case 'specials':
      return <SpecialsLoadingScreen />;
    case 'timeline':
      return <TimelineLoadingScreen />;
    case 'characters':
      return <CharactersLoadingScreen />;
    default:
      return <DefaultLoadingScreen />;
  }
};

export default LoadingScreen; 