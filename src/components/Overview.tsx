import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Overview = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1
  });

  return (
    <section ref={ref} className="relative z-0 py-20 sm:py-20 lg:py-24 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-800">
            Welcome to the Marvel Universe
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-4 leading-relaxed">
            Discover the epic saga that has captivated audiences worldwide.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-6 sm:p-6 transform transition-transform duration-500 hover:scale-105"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-4">Epic Storytelling</h3>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Interconnected narratives spanning multiple films and series, creating a rich tapestry of superhero adventures.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-6 sm:p-6 transform transition-transform duration-500 hover:scale-105"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-4">Iconic Characters</h3>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              From beloved superheroes to compelling villains, discover unforgettable characters that have become cultural icons.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-6 sm:p-6 transform transition-transform duration-500 hover:scale-105"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-4">Cinematic Excellence</h3>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Groundbreaking visual effects, compelling action sequences, and emotional storytelling that sets new standards.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 sm:mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-8 text-gray-400">
            <div>
              <span className="block text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-1">30+</span>
              <span className="text-sm sm:text-base">Films</span>
            </div>
            <div className="hidden sm:block h-12 w-px bg-gray-800"></div>
            <div className="sm:hidden w-16 h-px bg-gray-800"></div>
            <div>
              <span className="block text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-1">15+</span>
              <span className="text-sm sm:text-base">Series</span>
            </div>
            <div className="hidden sm:block h-12 w-px bg-gray-800"></div>
            <div className="sm:hidden w-16 h-px bg-gray-800"></div>
            <div>
              <span className="block text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-1">$22B+</span>
              <span className="text-sm sm:text-base">Box Office</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Overview; 