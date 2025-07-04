import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useRef, useEffect } from 'react';
import { Play, Info, X, GripHorizontal } from 'lucide-react';
import { mcuTimeline } from '@/data/mcuData';

// Group movies by phase
const groupByPhase = () => {
  const phases = mcuTimeline.reduce((acc, movie) => {
    const phase = movie.phase;
    if (!acc[phase]) {
      acc[phase] = {
        id: phase.toLowerCase().replace(' ', '-'),
        name: phase,
        years: '',
        subtitle: '',
        description: '',
        movies: [],
        color: '',
        textColor: '',
        borderColor: '',
        hoverColor: ''
      };
    }
    acc[phase].movies.push(movie);
    return acc;
  }, {} as Record<string, any>);

  // Set phase metadata
  const phaseMetadata = {
    'Phase 1': {
      years: '2008-2012',
      subtitle: 'The Infinity Saga Begins',
      description: 'The beginning of the Marvel Cinematic Universe, introducing Earth\'s mightiest heroes and setting the foundation for the Infinity Saga.',
      color: 'from-red-600/20 to-red-900/20',
      textColor: 'text-red-500',
      borderColor: 'border-red-500/20',
      hoverColor: 'group-hover:from-red-600/30 group-hover:to-red-900/30'
    },
    'Phase 2': {
      years: '2013-2015',
      subtitle: 'Expanding the Universe',
      description: 'The MCU expands beyond Earth, introducing cosmic elements and deeper character development while building towards a greater conflict.',
      color: 'from-blue-600/20 to-blue-900/20',
      textColor: 'text-blue-500',
      borderColor: 'border-blue-500/20',
      hoverColor: 'group-hover:from-blue-600/30 group-hover:to-blue-900/30'
    },
    'Phase 3': {
      years: '2016-2019',
      subtitle: 'The Infinity Saga Concludes',
      description: 'The epic conclusion of the Infinity Saga, featuring the ultimate battle against Thanos and the emotional farewell to beloved characters.',
      color: 'from-purple-600/20 to-purple-900/20',
      textColor: 'text-purple-500',
      borderColor: 'border-purple-500/20',
      hoverColor: 'group-hover:from-purple-600/30 group-hover:to-purple-900/30'
    },
    'Phase 4': {
      years: '2021-2022',
      subtitle: 'The Multiverse Saga Begins',
      description: 'A new era of the MCU explores the aftermath of the Infinity Saga while introducing the concept of the multiverse and new heroes.',
      color: 'from-green-600/20 to-green-900/20',
      textColor: 'text-green-500',
      borderColor: 'border-green-500/20',
      hoverColor: 'group-hover:from-green-600/30 group-hover:to-green-900/30'
    },
    'Phase 5': {
      years: '2023-2025',
      subtitle: 'The Multiverse Expands',
      description: 'The MCU delves deeper into the multiverse while introducing new threats and heroes that will shape the future of the franchise.',
      color: 'from-yellow-600/20 to-yellow-900/20',
      textColor: 'text-yellow-500',
      borderColor: 'border-yellow-500/20',
      hoverColor: 'group-hover:from-yellow-600/30 group-hover:to-yellow-900/30'
    }
  };

  // Apply metadata to phases
  Object.keys(phases).forEach(phaseName => {
    Object.assign(phases[phaseName], phaseMetadata[phaseName]);
  });

  return Object.values(phases);
};

const phases = groupByPhase();

interface PreviewPosition {
  top: number;
  left: number;
}

const MCUPhases = () => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrollingDown, setIsScrollingDown] = useState(true);

  // Track scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrollingDown(currentScrollY > lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <section id="mcu-timeline" className="relative py-24 sm:py-24 lg:py-32 bg-black">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />

      <div className="container mx-auto px-6 relative z-20">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ 
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.5,
              ease: [0.25, 0.1, 0.25, 1]
            }
          }}
          className="text-center mb-20 sm:mb-20 lg:mb-24"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-6 tracking-tight">
            THE MCU TIMELINE
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-3xl mx-auto px-4 leading-relaxed">
            Journey through the interconnected phases that built the Marvel Cinematic Universe
          </p>
        </motion.div>

        <div className="space-y-24 sm:space-y-24 lg:space-y-32">
          {phases.map((phase, phaseIndex) => {
            const [ref, inView] = useInView({
              threshold: 0.15,
              triggerOnce: false,
              onChange: (inView, entry) => {
                if (inView && isScrollingDown) {
                  setVisibleSections(prev => new Set(prev).add(phase.id));
                }
              }
            });

            const isVisible = visibleSections.has(phase.id);
            const shouldAnimate = inView && isScrollingDown;

            return (
              <motion.div
                key={phase.id}
                ref={ref}
                initial={{ opacity: 0, y: 50 }}
                animate={shouldAnimate || isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                {/* Phase Card */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ 
                    opacity: shouldAnimate || isVisible ? 1 : 0,
                    y: shouldAnimate || isVisible ? 0 : 50,
                    transition: { duration: 0.5 }
                  }}
                  className="relative mb-16 sm:mb-16"
                >
                  <div className={`relative z-20 p-6 sm:p-6 lg:p-8 rounded-lg backdrop-blur-xl bg-gradient-to-r ${phase.color} 
                    border ${phase.borderColor} shadow-2xl transform transition-transform duration-500 hover:scale-105`}
                  >
                    <h3 className={`text-2xl sm:text-3xl lg:text-4xl font-bold ${phase.textColor} mb-3 sm:mb-2`}>{phase.name}</h3>
                    <p className="text-gray-400 text-base sm:text-lg">{phase.years}</p>
                    <p className="text-white text-lg sm:text-xl mt-3 sm:mt-2">{phase.subtitle}</p>
                    <p className="text-gray-400 mt-4 sm:mt-4 text-sm sm:text-base leading-relaxed">{phase.description}</p>
                    <p className="text-gray-400 mt-3 sm:mt-2 text-sm sm:text-base">{phase.movies.length} Movies & Shows</p>
                  </div>
                </motion.div>

                {/* Movies Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6">
                  {phase.movies.map((movie, movieIndex) => (
                    <motion.div
                      key={movie.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ 
                        opacity: shouldAnimate || isVisible ? 1 : 0,
                        y: shouldAnimate || isVisible ? 0 : 50,
                        transition: {
                          duration: 0.4,
                          delay: shouldAnimate ? (0.2 + (movieIndex * 0.05)) : 0
                        }
                      }}
                      className="relative z-20"
                    >
                      <div 
                        className="relative"
                      >
                        <div
                          className={`w-full rounded-lg p-6 backdrop-blur-sm 
                            bg-gradient-to-br ${phase.color} border ${phase.borderColor}
                            transition-all duration-150 cursor-pointer
                            hover:shadow-xl hover:shadow-black/20
                            before:absolute before:inset-0 before:rounded-lg
                            before:bg-gradient-to-br before:from-white/5 before:to-white/10
                            before:opacity-0 before:transition-opacity before:duration-150
                            hover:before:opacity-100 transform-gpu perspective-1000`}
                          onClick={() => {
                            // Handle movie click
                          }}
                          style={{
                            transformStyle: 'preserve-3d',
                            transition: 'transform 150ms ease-out',
                            willChange: 'transform'
                          }}
                          onMouseEnter={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const x = e.clientX - rect.left;
                            const y = e.clientY - rect.top;
                            const centerX = rect.width / 2;
                            const centerY = rect.height / 2;
                            const rotateX = (y - centerY) / 15;
                            const rotateY = (centerX - x) / 15;
                            
                            e.currentTarget.style.transform = `
                              scale(1.05)
                              perspective(1000px)
                              rotateX(${rotateX}deg)
                              rotateY(${rotateY}deg)
                            `;
                          }}
                          onMouseMove={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const x = e.clientX - rect.left;
                            const y = e.clientY - rect.top;
                            const centerX = rect.width / 2;
                            const centerY = rect.height / 2;
                            const rotateX = (y - centerY) / 15;
                            const rotateY = (centerX - x) / 15;

                            e.currentTarget.style.transform = `
                              scale(1.05)
                              perspective(1000px)
                              rotateX(${rotateX}deg)
                              rotateY(${rotateY}deg)
                            `;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = `
                              scale(1)
                              perspective(1000px)
                              rotateX(0deg)
                              rotateY(0deg)
                            `;
                          }}
                        >
                          <div className="relative z-10">
                            <h4 className="text-white text-lg font-semibold mb-2">{movie.title}</h4>
                            <p className={`${phase.textColor} text-sm`}>{new Date(movie.release_date).getFullYear()}</p>
                            <p className="text-gray-400 text-sm mt-2 line-clamp-2">{movie.description}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Phase Connector */}
                {phaseIndex < phases.length - 1 && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ 
                      height: shouldAnimate || isVisible ? '8rem' : 0,
                      transition: {
                        duration: 0.4,
                        delay: shouldAnimate ? 0.3 : 0
                      }
                    }}
                    className={`absolute left-1/2 -translate-x-1/2 w-px ${phase.borderColor}`}
                    style={{ top: '100%', zIndex: 1 }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Movie Preview Popup */}
      <AnimatePresence>
        {/* Movie preview content */}
      </AnimatePresence>
    </section>
  );
};

export default MCUPhases; 