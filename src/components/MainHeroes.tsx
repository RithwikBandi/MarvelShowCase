import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';

const heroes = [
  {
    name: 'Iron Man',
    actor: 'Robert Downey Jr.',
    description: 'Genius billionaire Tony Stark, who uses his suit of armor to protect the world.',
    image: '/images/heroes/iron-man-temp.jpg',
    color: 'from-red-600 via-red-500 to-red-700',
    fallbackBg: 'bg-gradient-to-br from-red-700 via-red-600 to-red-800',
    depthColor: 'rgba(185, 28, 28, 0.15)',
    glowColor: '185, 28, 28',
    // Iron Man specific effects
    repulsorEffect: true,
    secondaryGlow: 'rgba(239, 68, 68, 0.2)',
    accentColor: 'rgba(153, 27, 27, 0.3)',
    effectClass: 'repulsor-glow'
  },
  {
    name: 'Captain America',
    actor: 'Chris Evans',
    description: 'Super-soldier Steve Rogers, the First Avenger and symbol of hope.',
    image: '/images/heroes/captain-america-temp.jpg',
    color: 'from-blue-600 to-red-500',
    fallbackBg: 'bg-gradient-to-br from-blue-900 to-red-900',
    depthColor: 'rgba(37, 99, 235, 0.2)',
    glowColor: '37, 99, 235',
    // Shield effect
    shieldEffect: true,
    secondaryGlow: 'rgba(239, 68, 68, 0.2)',
    accentColor: 'rgba(37, 99, 235, 0.4)',
    effectClass: 'shield-glow'
  },
  {
    name: 'Thor',
    actor: 'Chris Hemsworth',
    description: 'The God of Thunder from Asgard, wielding the mighty Mjolnir.',
    image: '/images/heroes/thor-temp.jpg',
    color: 'from-sky-400 to-indigo-600',
    fallbackBg: 'bg-gradient-to-br from-sky-900 to-indigo-900',
    depthColor: 'rgba(56, 189, 248, 0.25)',
    glowColor: '56, 189, 248',
    // Special thunder effect properties
    thunderEffect: true,
    secondaryGlow: 'rgba(125, 211, 252, 0.3)',
    accentColor: 'rgba(2, 132, 199, 0.4)',
    effectClass: 'thunder-glow'
  },
  {
    name: 'Hulk',
    actor: 'Mark Ruffalo',
    description: 'Dr. Bruce Banner, whose anger transforms him into the incredible Hulk.',
    image: '/images/heroes/hulk-temp.jpg',
    color: 'from-green-500 to-green-700',
    fallbackBg: 'bg-gradient-to-br from-green-800 to-green-950',
    depthColor: 'rgba(34, 197, 94, 0.25)',
    glowColor: '34, 197, 94',
    // Hulk specific effects
    gammaEffect: true,
    secondaryGlow: 'rgba(21, 128, 61, 0.3)',
    accentColor: 'rgba(34, 197, 94, 0.4)',
    effectClass: 'gamma-glow'
  },
  {
    name: 'Black Widow',
    actor: 'Scarlett Johansson',
    description: 'Master spy Natasha Romanoff, trained in the Red Room.',
    image: '/images/heroes/black-widow-temp.jpg',
    color: 'from-red-500 to-gray-900',
    fallbackBg: 'bg-gradient-to-br from-red-950 to-gray-950',
    depthColor: 'rgba(239, 68, 68, 0.15)',
    glowColor: '239, 68, 68',
    // Stealth effect
    stealthEffect: true,
    secondaryGlow: 'rgba(23, 23, 23, 0.4)',
    accentColor: 'rgba(239, 68, 68, 0.3)',
    effectClass: 'stealth-glow'
  },
  {
    name: 'Hawkeye',
    actor: 'Jeremy Renner',
    description: 'Master archer Clint Barton, never missing his target.',
    image: '/images/heroes/hawkeye-temp.jpg',
    color: 'from-purple-600 to-gray-800',
    fallbackBg: 'bg-gradient-to-br from-purple-900 to-gray-900',
    depthColor: 'rgba(147, 51, 234, 0.2)',
    glowColor: '147, 51, 234',
    // Precision effect
    precisionEffect: true,
    secondaryGlow: 'rgba(88, 28, 135, 0.3)',
    accentColor: 'rgba(147, 51, 234, 0.3)',
    effectClass: 'precision-glow'
  }
];

const MainHeroes = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    initialInView: false,
    rootMargin: '50px 0px'
  });

  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const handleImageLoad = (heroName: string) => {
    setLoadedImages(prev => new Set(prev).add(heroName));
    setFailedImages(prev => {
      const newSet = new Set(prev);
      newSet.delete(heroName);
      return newSet;
    });
  };

  const handleImageError = (heroName: string) => {
    setFailedImages(prev => new Set(prev).add(heroName));
  };

  return (
    <section 
      ref={ref} 
      id="main-heroes"
      className="relative py-20 sm:py-20 lg:py-24 bg-gradient-to-b from-black to-gray-900 overflow-hidden min-h-screen flex items-center"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-radial from-red-900/20 via-transparent to-transparent opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-16 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 sm:mb-4">
            Earth's Mightiest Heroes
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-4 leading-relaxed">
            The original six Avengers who came together to protect Earth from the greatest threats.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-8 perspective-2000"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1]
              }
            }
          }}
        >
          {heroes.map((hero, index) => (
            <motion.div
              key={hero.name}
              variants={{
                hidden: { 
                  opacity: 0,
                  y: 50,
                  rotateX: -10,
                  scale: 0.9
                },
                visible: { 
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  scale: 1,
                  transition: {
                    duration: 0.6,
                    ease: [0.4, 0, 0.2, 1]
                  }
                }
              }}
              className="relative group transform-3d"
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              <div 
                className={`relative rounded-lg overflow-hidden transform-3d transition-all duration-500 ease-out
                         group-hover:scale-[1.02] group-hover:rotate-y-[-5deg] ${hero.effectClass}`}
                style={{
                  transformStyle: 'preserve-3d',
                  boxShadow: `0 0 25px ${hero.depthColor},
                             0 0 15px ${hero.secondaryGlow},
                             0 0 35px ${hero.accentColor},
                             0 0 5px rgba(0, 0, 0, 0.5)`,
                  transition: 'all 0.5s ease-out, box-shadow 0.5s ease-out'
                }}
              >
                {/* Hero Image */}
                <div className="relative h-72 sm:h-80 lg:h-96 overflow-hidden">
                  {failedImages.has(hero.name) ? (
                    <div className={`w-full h-full ${hero.fallbackBg} flex items-center justify-center`}>
                      <div className="text-center">
                        <div className="text-6xl mb-4">{hero.name.charAt(0)}</div>
                        <div className="text-white font-bold text-xl">{hero.name}</div>
                      </div>
                    </div>
                  ) : (
                    <motion.img
                      src={hero.image}
                      alt={hero.name}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      onLoad={() => handleImageLoad(hero.name)}
                      onError={() => handleImageError(hero.name)}
                      style={{
                        transform: 'translate3d(0,0,0)',
                        backfaceVisibility: 'hidden'
                      }}
                    />
                  )}
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Ambient Light Effect */}
                  <div 
                    className="absolute inset-0 ambient-light"
                    style={{
                      background: `radial-gradient(circle at 30% 70%, ${hero.secondaryGlow}, transparent 50%)`,
                      opacity: 0.3,
                      mixBlendMode: 'overlay'
                    }}
                  />
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative z-10"
                  >
                    <h3 className={`text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-2 ${hero.effectClass}-text`}>
                      {hero.name}
                    </h3>
                    <p className="text-gray-300 text-sm sm:text-base mb-3 sm:mb-2">
                      {hero.actor}
                    </p>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                      {hero.description}
                    </p>
                  </motion.div>
                </div>

                {/* Hover Effects */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(to top, ${hero.depthColor}, transparent)`
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MainHeroes; 