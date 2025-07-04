import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Info, X, Calendar, Clock, Star } from 'lucide-react';
import { mcuTimeline } from '@/data/mcuData';

const MCUCarousel = () => {
  const [selectedMovie, setSelectedMovie] = useState<number | null>(null);
  const [activePhase, setActivePhase] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [isPhaseTransitioning, setIsPhaseTransitioning] = useState(false);

  const phases = Array.from(new Set(mcuTimeline.map(item => item.phase)));
  const currentPhaseMovies = mcuTimeline.filter(item => item.phase === `Phase ${activePhase}`);

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying || isPhaseTransitioning) return;
    
    const timer = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % currentPhaseMovies.length);
    }, 7000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, currentPhaseMovies.length, isPhaseTransitioning]);

  const handleNext = () => {
    if (isPhaseTransitioning) return;
    setIsAutoPlaying(false);
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % currentPhaseMovies.length);
  };

  const handlePrevious = () => {
    if (isPhaseTransitioning) return;
    setIsAutoPlaying(false);
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + currentPhaseMovies.length) % currentPhaseMovies.length);
  };

  const handlePhaseChange = (newPhase: number) => {
    if (newPhase === activePhase || isPhaseTransitioning) return;
    
    setIsPhaseTransitioning(true);
    setActivePhase(newPhase);
    setActiveIndex(0);
    
    // Reset phase transition state after animation completes
    setTimeout(() => {
      setIsPhaseTransitioning(false);
    }, 1000); // Increased duration for more elaborate transition
  };

  const handleMovieClick = (movieId: number, event: React.MouseEvent<HTMLElement>) => {
    if (isPhaseTransitioning) return;
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    setModalPosition({
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height
    });
    setSelectedMovie(movieId);
  };

  // Get visible slides (current, previous, and next)
  const visibleSlides = [
    currentPhaseMovies[(activeIndex - 1 + currentPhaseMovies.length) % currentPhaseMovies.length],
    currentPhaseMovies[activeIndex],
    currentPhaseMovies[(activeIndex + 1) % currentPhaseMovies.length],
  ];

  return (
    <section 
      id="mcu-carousel"
      className="relative w-full min-h-screen bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-5"></div>
        <motion.div 
          className="absolute inset-0 bg-gradient-radial from-red-900/20 via-transparent to-transparent"
          style={{ 
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            mixBlendMode: 'overlay'
          }}
          animate={{
            scale: isPhaseTransitioning ? [1, 1.1, 1] : 1,
            opacity: isPhaseTransitioning ? [0.2, 0.4, 0.2] : 0.2,
            rotateZ: isPhaseTransitioning ? [0, -5, 0] : 0,
          }}
          transition={{ 
            duration: 1,
            ease: [0.4, 0, 0.2, 1],
            times: [0, 0.5, 1]
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative container mx-auto px-6 py-20 sm:py-20 lg:py-24">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-16 sm:mb-16"
        >
          EXPLORE THE TIMELINE
        </motion.h2>

        {/* Phase Selection */}
        <div className="flex justify-center mb-12 sm:mb-12 perspective-[2000px]">
          <motion.div 
            className="flex flex-wrap justify-center gap-3 sm:gap-4"
            animate={{
              rotateX: isPhaseTransitioning ? [0, -15, 0] : 0,
              scale: isPhaseTransitioning ? [1, 0.95, 1] : 1,
              z: isPhaseTransitioning ? [0, -100, 0] : 0
            }}
            transition={{
              duration: 1,
              ease: [0.4, 0, 0.2, 1],
              times: [0, 0.5, 1]
            }}
          >
            {phases.map((phase, index) => (
              <motion.button
                key={phase}
                onClick={() => handlePhaseChange(index + 1)}
                className={`relative px-4 sm:px-4 lg:px-6 py-3 sm:py-2 rounded-full transition-all duration-500 text-sm sm:text-base ${
                  activePhase === index + 1
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                }}
                animate={{
                  rotateY: isPhaseTransitioning && activePhase === index + 1 
                    ? [0, 360, 0] 
                    : 0,
                  scale: activePhase === index + 1 
                    ? isPhaseTransitioning 
                      ? [1.05, 1.15, 1.05]
                      : 1.05
                    : 1,
                  z: activePhase === index + 1 
                    ? isPhaseTransitioning 
                      ? [20, 40, 20]
                      : 20
                    : 0,
                }}
                transition={{
                  duration: 1,
                  ease: [0.4, 0, 0.2, 1],
                  times: [0, 0.5, 1]
                }}
                whileHover={{
                  scale: 1.05,
                  z: 30,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Glow Effect */}
                <motion.div
                  className={`absolute inset-0 rounded-full ${
                    activePhase === index + 1 ? 'bg-red-500' : 'bg-gray-700'
                  }`}
                  animate={{
                    opacity: activePhase === index + 1 
                      ? isPhaseTransitioning 
                        ? [0.5, 0.8, 0.5]
                        : 0.5
                      : 0,
                    scale: activePhase === index + 1 
                      ? isPhaseTransitioning 
                        ? [1, 1.1, 1]
                        : 1
                      : 0.95,
                  }}
                  transition={{ duration: 1 }}
                  style={{
                    filter: 'blur(8px)',
                    zIndex: -1,
                  }}
                />
                
                {phase}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Carousel Container */}
        <div className="relative h-[450px] sm:h-[500px] lg:h-[600px] perspective-[2000px]">
          <AnimatePresence initial={false} mode="sync">
            {visibleSlides.map((content, index) => {
              const isCenter = index === 1;
              const offset = index - 1; // -1, 0, or 1

              return (
                <motion.div
                  key={`${content.id}-${activePhase}`}
                  initial={{
                    scale: 0.95,
                    x: direction >= 0 ? '100%' : '-100%',
                    opacity: 0,
                    filter: 'blur(8px)',
                    zIndex: isCenter ? 2 : 1,
                  }}
                  animate={{
                    scale: isCenter ? 1 : 0.95,
                    x: `${offset * 100}%`,
                    opacity: isCenter ? 1 : 0.5,
                    filter: 'blur(0px)',
                    zIndex: isCenter ? 2 : 1,
                  }}
                  exit={{
                    scale: 0.95,
                    x: direction >= 0 ? '-100%' : '100%',
                    opacity: 0,
                    filter: 'blur(8px)',
                    zIndex: 1,
                  }}
                  transition={{
                    x: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
                    scale: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
                    opacity: { duration: 0.3 },
                    filter: { duration: 0.3 }
                  }}
                  className="absolute top-0 left-0 w-full h-full origin-center cursor-pointer transform-gpu will-change-transform"
                  style={{ 
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden'
                  }}
                  onClick={(e) => handleMovieClick(content.id, e)}
                >
                  <div className="relative w-full h-full rounded-2xl overflow-hidden group">
                    {/* Background Image with transition */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: content.images.slideshow ?
                        `url(/images/mcu/slides/${content.images.slideshow})` :
                        `url(/images/mcu/backdrops/${content.images.backdrop})`
                      }}
                    />
                    
                    {/* Gradient Overlay with transition */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"
                      initial={{ opacity: 0.8 }}
                      animate={{ opacity: isCenter ? 0.8 : 0.9 }}
                      exit={{ opacity: 0.8 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Content */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-end transform transition-transform duration-500">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        transition={{ 
                          duration: 0.3,
                          delay: isCenter ? 0.1 : 0 
                        }}
                        className="space-y-4"
                      >
                        <h3 className="text-4xl font-bold text-white tracking-tight">
                          {content.title}
                        </h3>
                        
                        <div className="flex items-center space-x-4 text-gray-300">
                          <span>{new Date(content.release_date).getFullYear()}</span>
                          <span>•</span>
                          <span>{content.type}</span>
                          <span>•</span>
                          <span>{content.phase}</span>
                        </div>

                        {/* Additional Info (visible on hover) */}
                        <div className="overflow-hidden">
                          <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-gray-300 line-clamp-3 group-hover:line-clamp-none transition-all duration-500"
                          >
                            {content.plot}
                          </motion.div>
                        </div>

                        {/* Action Button */}
                        <button 
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent double triggering
                            handleMovieClick(content.id, e);
                          }}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md flex items-center space-x-2 transition-colors"
                        >
                          <Info size={18} />
                          <span>More Info</span>
                        </button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrevious}
            disabled={isPhaseTransitioning}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            disabled={isPhaseTransitioning}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center items-center space-x-2 mt-8">
          {currentPhaseMovies.map((_, index) => (
            <button
              key={index}
              disabled={isPhaseTransitioning}
              onClick={() => {
                if (!isPhaseTransitioning) {
                  setIsAutoPlaying(false);
                  setDirection(index > activeIndex ? 1 : -1);
                  setActiveIndex(index);
                }
              }}
              className={`w-2 h-2 rounded-full transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                index === activeIndex 
                  ? 'bg-red-500 w-8' 
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Netflix-style Movie Modal */}
      <AnimatePresence>
        {selectedMovie && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
              onClick={() => setSelectedMovie(null)}
            />
            <motion.div
              layoutId={`movie-${selectedMovie}`}
              initial={{
                position: 'fixed',
                top: modalPosition.y,
                left: modalPosition.x,
                width: modalPosition.width,
                height: modalPosition.height,
                zIndex: 51
              }}
              animate={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                width: 'min(90vw, 1200px)',
                height: 'min(85vh, 800px)',
                x: '-50%',
                y: '-50%',
                transition: {
                  type: 'spring',
                  damping: 20,
                  stiffness: 100
                }
              }}
              exit={{
                position: 'fixed',
                top: modalPosition.y,
                left: modalPosition.x,
                width: modalPosition.width,
                height: modalPosition.height,
                opacity: 0,
                transition: {
                  duration: 0.3,
                  ease: 'easeInOut'
                }
              }}
              className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl"
            >
              {(() => {
                const movie = mcuTimeline.find(m => m.id === selectedMovie);
                if (!movie) return null;
                
                return (
                  <div className="relative w-full h-full">
                    {/* Hero Section */}
                    <div className="relative h-[50%] overflow-hidden">
                      <motion.div
                        initial={{ scale: 1.5 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.7 }}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(/images/mcu/backdrops/${movie.images.backdrop})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                      
                      {/* Close Button */}
                      <motion.button
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        onClick={() => setSelectedMovie(null)}
                        className="absolute top-4 right-4 p-2 rounded-full bg-gray-900/50 text-white hover:bg-gray-900/80 transition-colors z-10"
                      >
                        <X size={24} />
                      </motion.button>

                      {/* Movie Logo/Title */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="absolute bottom-0 left-0 p-8 w-full"
                      >
                        <h2 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
                          {movie.title}
                        </h2>
                      </motion.div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8 h-[50%] overflow-y-auto">
                      {/* Movie Info */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center gap-6 text-gray-400 mb-6"
                      >
                        <div className="flex items-center gap-2">
                          <Calendar size={18} />
                          <span>{new Date(movie.release_date).getFullYear()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star size={18} className="text-yellow-500" />
                          <span>{movie.phase}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={18} />
                          <span>{movie.type}</span>
                        </div>
                      </motion.div>

                      {/* Plot */}
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-gray-300 text-lg leading-relaxed mb-8"
                      >
                        {movie.plot}
                      </motion.p>

                      {/* Additional Details */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                      >
                        <div>
                          <h3 className="text-white font-semibold mb-2">Description</h3>
                          <p className="text-gray-400">{movie.description}</p>
                        </div>
                        <div>
                          <h3 className="text-white font-semibold mb-2">Timeline</h3>
                          <p className="text-gray-400">
                            Chronological Order: #{movie.chronological_order}
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MCUCarousel; 