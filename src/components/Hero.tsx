import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { scrollY } = useScroll();
  const [heroHeight, setHeroHeight] = useState(0);

  // Update hero height on mount and resize
  useEffect(() => {
    const updateHeroHeight = () => {
      if (heroRef.current) {
        setHeroHeight(heroRef.current.offsetHeight);
      }
    };

    updateHeroHeight();
    window.addEventListener('resize', updateHeroHeight);
    return () => window.removeEventListener('resize', updateHeroHeight);
  }, []);

  // Enhanced scroll animations
  const y = useTransform(scrollY, [0, heroHeight], [0, heroHeight * 0.5]);
  const scale = useTransform(scrollY, [0, heroHeight], [1, 1.2]);
  const opacity = useTransform(scrollY, [0, heroHeight * 0.5], [1, 0]);
  const rotate = useTransform(scrollY, [0, heroHeight], [0, -10]);
  const contentY = useTransform(scrollY, [0, heroHeight], [0, heroHeight * 0.3]);
  const contentScale = useTransform(scrollY, [0, heroHeight], [1, 0.8]);
  const perspective = useTransform(scrollY, [0, heroHeight], [1000, 2000]);

  // Preload image
  useEffect(() => {
    const img = new Image();
    img.src = '/images/heroes/marvel-heroes.jpg';
    
    if (img.complete) {
      setIsImageLoaded(true);
    } else {
      img.onload = () => {
        setIsImageLoaded(true);
      };
    }

    return () => {
      img.onload = null;
    };
  }, []);

  // Smooth scroll handler
  const handleExploreClick = () => {
    setIsTransitioning(true);
    const carouselSection = document.getElementById('mcu-carousel');
    
    if (carouselSection) {
      const targetPosition = carouselSection.offsetTop;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1500; // ms
      let start: number | null = null;

      const animation = (currentTime: number) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);

        // Easing function for smooth acceleration and deceleration
        const easeInOutCubic = (t: number) => 
          t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

        window.scrollTo({
          top: startPosition + distance * easeInOutCubic(progress),
          behavior: 'auto' // We're handling the smooth scroll manually
        });

        if (progress < 1) {
          requestAnimationFrame(animation);
        } else {
          setTimeout(() => setIsTransitioning(false), 500);
        }
      };

      requestAnimationFrame(animation);
    }
  };

  return (
    <motion.section 
      ref={heroRef} 
      className="relative min-h-[100vh] h-screen flex items-center justify-center bg-black z-0"
      style={{ 
        perspective,
        transform: 'translate3d(0,0,0)',
        backfaceVisibility: 'hidden',
        willChange: 'transform'
      }}
    >
      {/* Hero Banner */}
      <motion.div 
        className="absolute inset-0 w-full h-full min-h-[100vh]"
        style={{ 
          y,
          scale,
          rotateX: rotate,
          transform: 'translate3d(0,0,0)',
          backfaceVisibility: 'hidden',
          willChange: 'transform'
        }}
      >
        {/* Hidden Image Preloader */}
        <img 
          src="/images/heroes/marvel-heroes.jpg"
          alt=""
          className="hidden"
          loading="eager"
          onLoad={() => setIsImageLoaded(true)}
        />
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: isImageLoaded ? 1 : 0 }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full min-h-[100vh] transform-gpu will-change-transform"
          style={{ 
            backgroundImage: "url('/images/heroes/marvel-heroes.jpg')",
            transform: 'translate3d(0,0,0)',
            backfaceVisibility: 'hidden'
          }}
        />
      </motion.div>

      {/* Dynamic Overlay Gradients */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"
        style={{
          opacity: useTransform(scrollY, [0, heroHeight], [0.7, 0.9]),
          transform: 'translate3d(0,0,0)',
          backfaceVisibility: 'hidden'
        }}
      />
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50"
        style={{
          opacity: useTransform(scrollY, [0, heroHeight], [0.5, 0.8]),
          transform: 'translate3d(0,0,0)',
          backfaceVisibility: 'hidden'
        }}
      />
      
      {/* Static Grid Pattern */}
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-10" style={{ transform: 'translate3d(0,0,0)' }} />

      {/* Content */}
      <motion.div 
        ref={contentRef}
        className="relative container mx-auto px-6 sm:px-6 lg:px-8 text-center transform-gpu"
        style={{ 
          y: contentY,
          scale: contentScale,
          opacity,
          rotateX: useTransform(scrollY, [0, heroHeight], [0, 15]),
          transform: 'translate3d(0,0,0)',
          backfaceVisibility: 'hidden',
          willChange: 'transform'
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isImageLoaded ? 1 : 0, y: isImageLoaded ? 0 : 20 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="py-8 sm:py-0"
        >
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-6 sm:mb-4 sm:mb-6 tracking-tight transform-gpu leading-tight"
            style={{
              rotateX: useTransform(scrollY, [0, heroHeight], [0, -20]),
              y: useTransform(scrollY, [0, heroHeight], [0, -50])
            }}
          >
            MARVEL
            <motion.span 
              className="block text-red-600"
              style={{
                rotateX: useTransform(scrollY, [0, heroHeight], [0, 30])
              }}
            >
              CINEMATIC
            </motion.span>
            UNIVERSE
          </motion.h1>
          <motion.p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-2xl sm:max-w-3xl mx-auto mb-10 sm:mb-8 sm:mb-12 px-4 leading-relaxed"
            style={{
              y: useTransform(scrollY, [0, heroHeight], [0, 30])
            }}
          >
            Explore the epic saga of interconnected movies and TV series that make up the Marvel Cinematic Universe
          </motion.p>
          <motion.div
            className="flex justify-center transform-gpu px-4"
            style={{
              scale: useTransform(scrollY, [0, heroHeight], [1, 0.8]),
              y: useTransform(scrollY, [0, heroHeight], [0, 50])
            }}
          >
            <motion.button 
              onClick={handleExploreClick}
              className="relative px-8 sm:px-6 sm:px-8 py-4 sm:py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold w-full max-w-sm sm:max-w-xs sm:max-w-none focus:outline-none overflow-hidden"
              style={{ background: 'linear-gradient(90deg, #ef4444 0%, #b91c1c 100%)', color: '#fff', boxShadow: '0 4px 24px 0 rgba(239,68,68,0.18)' }}
              whileHover={{
                scale: 1.08,
                boxShadow: '0 8px 32px 0 rgba(239,68,68,0.35)',
              }}
              whileTap={{ scale: 0.97 }}
              disabled={isTransitioning}
              transition={{
                scale: { type: 'spring', stiffness: 180, damping: 18 },
                boxShadow: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
                background: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
              }}
            >
              {/* Animated Glowing Border */}
              <motion.div
                className="absolute inset-0 rounded-full pointer-events-none"
                initial={{ opacity: 0, boxShadow: '0 0 0 0 rgba(239,68,68,0)' }}
                whileHover={{ opacity: 1, boxShadow: '0 0 32px 8px rgba(239,68,68,0.25)' }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                style={{ zIndex: 1 }}
              />
              {/* Animated Gradient Overlay */}
              <motion.div
                className="absolute inset-0 rounded-full pointer-events-none"
                initial={{ opacity: 0, background: 'linear-gradient(90deg, #ef4444 0%, #b91c1c 100%)' }}
                whileHover={{ opacity: 1, background: 'linear-gradient(270deg, #ef4444 0%, #b91c1c 100%)' }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                style={{ zIndex: 2 }}
              />
              {/* Button Text Animation */}
              <motion.span
                className="relative z-10 inline-block font-bold tracking-wide"
                initial={false}
                animate={{ y: 0, opacity: 1 }}
                whileHover={{ y: -4, opacity: 1 }}
                transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
              >
                Explore Timeline
              </motion.span>
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Dynamic Bottom Gradient */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"
        style={{
          opacity: useTransform(scrollY, [0, heroHeight], [0.8, 1]),
          height: useTransform(scrollY, [0, heroHeight], ["8rem", "12rem"])
        }}
      />
    </motion.section>
  );
};

export default Hero; 