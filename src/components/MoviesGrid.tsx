import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';
import { mcuTimeline } from '@/data/mcuData';

const MOVIES_PER_VIEW = 5;

const MoviesGrid = () => {
  const [activePhase, setActivePhase] = useState(1);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Group movies by phase
  const phases = mcuTimeline.reduce((acc, movie) => {
    const phaseNumber = parseInt(movie.phase.split(' ')[1]);
    if (!acc[phaseNumber]) {
      acc[phaseNumber] = [];
    }
    acc[phaseNumber].push(movie);
    return acc;
  }, {} as Record<number, typeof mcuTimeline>);

  const currentPhaseMovies = phases[activePhase] || [];
  const maxSlides = Math.ceil(currentPhaseMovies.length / MOVIES_PER_VIEW);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    if (slideIndex < maxSlides - 1) {
      setSlideIndex(prev => prev + 1);
    } else if (activePhase < Object.keys(phases).length) {
      setActivePhase(prev => prev + 1);
      setSlideIndex(0);
    }
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    if (slideIndex > 0) {
      setSlideIndex(prev => prev - 1);
    } else if (activePhase > 1) {
      setActivePhase(prev => prev - 1);
      setSlideIndex(Math.ceil(phases[activePhase - 1].length / MOVIES_PER_VIEW) - 1);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [slideIndex, activePhase]);

  const visibleMovies = currentPhaseMovies.slice(
    slideIndex * MOVIES_PER_VIEW,
    (slideIndex + 1) * MOVIES_PER_VIEW
  );

  return (
    <section className="relative bg-black py-16 sm:py-16 overflow-hidden">
      {/* Phase Navigation */}
      <div className="container mx-auto px-6 mb-8 sm:mb-8">
        <div className="flex justify-center gap-3 sm:gap-4">
          {Object.keys(phases).map((phase) => (
            <motion.button
              key={phase}
              onClick={() => {
                setActivePhase(parseInt(phase));
                setSlideIndex(0);
              }}
              className={`px-4 sm:px-4 lg:px-6 py-3 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all
                ${parseInt(phase) === activePhase
                  ? 'bg-red-600 text-white scale-105'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Phase {phase}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Slideshow Container */}
      <div className="container mx-auto px-6 relative">
        {/* Navigation Arrows */}
        {slideIndex > 0 && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 sm:p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
          </motion.button>
        )}
        {slideIndex < maxSlides - 1 && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 sm:p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
          </motion.button>
        )}

        {/* Movies Slideshow */}
        <div className="perspective-[2000px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activePhase}-${slideIndex}`}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-6"
              initial={{ 
                opacity: 0,
                rotateY: 45,
                scale: 0.9,
                z: -200
              }}
              animate={{ 
                opacity: 1,
                rotateY: 0,
                scale: 1,
                z: 0,
                transition: {
                  duration: 0.5,
                  ease: "easeOut"
                }
              }}
              exit={{ 
                opacity: 0,
                rotateY: -45,
                scale: 0.9,
                z: -200
              }}
              transition={{
                duration: 0.5
              }}
            >
              {visibleMovies.map((movie) => (
                <motion.div
                  key={movie.id}
                  className="transform-gpu"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <MovieCard
                    title={movie.title}
                    year={new Date(movie.release_date).getFullYear().toString()}
                    image={`/images/mcu/${movie.images.poster}`}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center gap-2 mt-8 sm:mt-8">
          {Array.from({ length: maxSlides }).map((_, index) => (
            <motion.button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === slideIndex ? 'bg-red-600' : 'bg-gray-600'
              }`}
              onClick={() => setSlideIndex(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoviesGrid;