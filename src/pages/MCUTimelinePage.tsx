import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Clock, Calendar, Film, Tv, Gift, Sparkles, Star, Award, Search, Filter, SortAsc, SortDesc, X, Zap, Crown, ArrowUpDown } from 'lucide-react';
import TimelineToggle from '@/components/TimelineToggle';
import TimelineNode from '@/components/TimelineNode';
import LoadingScreen from '@/components/LoadingScreen';
import FloatingHomeButton from '@/components/FloatingHomeButton';
import { mcuTimeline, type MCUEntry, type TimelineMode } from '@/data/mcuData';
import { TimelineProvider, useTimeline } from '@/contexts/TimelineContext';
import { useInView } from 'framer-motion';
import Header from "@/components/Header";

// Organize data by timeline mode
const mcuData = {
  story: [...mcuTimeline].sort((a, b) => a.chronological_order - b.chronological_order),
  release: [...mcuTimeline]
    .sort((a, b) => new Date(a.release_date).getTime() - new Date(b.release_date).getTime())
    .map((item, index) => ({ ...item, releaseOrder: index + 1 }))
};

// TimelineCard component for safe hook usage
const TimelineCard = ({ item, index, isLeft, mode, onClick }) => {
  return (
    <TimelineNode
      item={item}
      index={index}
      isLeft={isLeft}
      mode={mode}
      onClick={onClick}
    />
  );
};

const TimelineContent = () => {
  const [timelineMode, setTimelineMode] = useState<TimelineMode>('story');
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTimelineItem, setSelectedTimelineItem] = useState<any | null>(null);
  const { setTimelineAnimated } = useTimeline();
  
  const allData = mcuData[timelineMode];
  const types = Array.from(new Set(allData.map(item => item.type)));

  useEffect(() => {
    // Simulate loading time for smooth transition
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Filter timeline data
  const filteredData = allData
    .filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'all' || item.type === selectedType;
      
      return matchesSearch && matchesType;
    });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedType('all');
  };

  const hasActiveFilters = searchTerm || selectedType !== 'all';

  if (isLoading) {
    return <LoadingScreen theme="timeline" />;
  }

  // Calculate stats for the filtered data
  const stats = {
    total: filteredData.length,
    movies: filteredData.filter(item => item.type === 'Movie').length,
    tvShows: filteredData.filter(item => item.type === 'Series').length,
    specials: filteredData.filter(item => item.type === 'Special').length,
    phases: Array.from(new Set(filteredData.map(item => item.phase))).length
  };

  // Timeline Detail Modal
  const TimelineDetailModal = ({ item, onClose }: { item: any; onClose: () => void }) => (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1003] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-red-500/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative h-64 overflow-hidden rounded-t-2xl">
              <img
                src={`/images/mcu/backdrops/${item.images.backdrop}`}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              {/* Close Button */}
              <button
                onClick={onClose}
                type="button"
                className="absolute top-4 right-4 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              {/* Item Info Overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <h2 className="text-3xl font-bold text-white mb-2">{item.title}</h2>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4 text-gray-300" />
                    <span className="text-white">{new Date(item.release_date).getFullYear()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Crown className="w-4 h-4 text-red-400" />
                    <span className="text-white">{item.phase}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {item.type === 'Movie' ? <Film className="w-4 h-4 text-blue-400" /> : 
                     item.type === 'Series' ? <Tv className="w-4 h-4 text-green-400" /> : 
                     <Star className="w-4 h-4 text-purple-400" />}
                    <span className="text-white">{item.type}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Description</h3>
                <p className="text-gray-300 leading-relaxed">{item.description}</p>
              </div>
              {/* Plot */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Plot</h3>
                <p className="text-gray-300 leading-relaxed">{item.plot}</p>
              </div>
              {/* Cast */}
              {item.cast && item.cast.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Cast</h3>
                  <div className="flex flex-wrap gap-2">
                    {item.cast.map((actor: string, idx: number) => (
                      <span key={idx} className="px-3 py-1 bg-red-500/20 rounded-full text-red-300 text-sm">
                        {actor}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {/* Director */}
              {item.director && (
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Director</h3>
                  <div className="flex items-center space-x-2 p-2 bg-red-500/10 rounded-lg">
                    <Film className="w-4 h-4 text-red-400" />
                    <span className="text-gray-300">{item.director}</span>
                  </div>
                </div>
              )}
              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-1">Release Date</h4>
                  <p className="text-white">{new Date(item.release_date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-1">Phase</h4>
                  <p className="text-white">{item.phase}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-1">Type</h4>
                  <p className="text-white">{item.type}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-1">Available On</h4>
                  <p className="text-white">{item.ott_platforms.join(', ')}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-1">Chronological Order</h4>
                  <p className="text-white">#{item.chronological_order}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-1">Release Order</h4>
                  <p className="text-white">#{item.releaseOrder || 'N/A'}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <Header />
      <div className="h-12" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-[#300000] to-black text-white pt-28 pb-12"
      >
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20 pointer-events-none" />

        {/* Main Content */}
        <div className="container mx-auto px-4 py-6 relative">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-br from-white via-red-500 to-red-900 bg-clip-text text-transparent uppercase tracking-wider drop-shadow-lg">
              MCU Timeline
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Experience the Marvel Cinematic Universe in perfect order
            </p>
            
            {/* Stats */}
            <div className="flex justify-center space-x-8 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">{stats.total}</div>
                <div className="text-sm text-gray-400">Filtered Items</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">{stats.movies}</div>
                <div className="text-sm text-gray-400">Movies</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">{stats.tvShows}</div>
                <div className="text-sm text-gray-400">TV Shows</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">{stats.phases}</div>
                <div className="text-sm text-gray-400">Phases</div>
              </div>
            </div>

            {/* Filter Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8 space-y-6"
            >
              {/* Search Bar */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search timeline items, descriptions, phases..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-red-500/20 rounded-lg focus:outline-none focus:border-red-500/50 transition-colors text-white placeholder-gray-400"
                />
              </div>

              {/* Enhanced Filter Section */}
              <div className="bg-gradient-to-r from-red-500/10 via-gray-900/30 to-orange-500/10 border border-red-500/20 rounded-2xl backdrop-blur-sm p-6">
                {/* Filter Header */}
                <motion.div 
                  className="flex items-center justify-between mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Timeline Filters</h3>
                      <p className="text-sm text-gray-400">Explore the Marvel Universe in perfect order</p>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => setShowFilters(!showFilters)}
                    className="relative group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30 flex items-center justify-center group-hover:border-red-500/50 transition-all duration-300">
                      <motion.div
                        animate={{ rotate: showFilters ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronLeft className="w-5 h-5 text-red-400 group-hover:text-red-300 transition-colors" />
                      </motion.div>
                    </div>
                  </motion.button>
                </motion.div>

                {/* Filters Panel */}
                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-6"
                    >
                      {/* Content Type Filter */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <label className="block text-sm font-semibold text-gray-300 mb-3 flex items-center space-x-2">
                          <Film className="w-4 h-4 text-blue-400" />
                          <span>Content Type</span>
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {['all', ...types].map(type => (
                            <motion.button
                              key={type}
                              onClick={() => setSelectedType(type)}
                              className={`relative group px-4 py-2 rounded-full border transition-all duration-300 ${
                                selectedType === type
                                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 border-blue-400 text-white shadow-lg shadow-blue-500/25'
                                  : 'bg-gray-800/50 border-gray-600/30 text-gray-300 hover:border-blue-500/50 hover:bg-blue-500/10'
                              }`}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <span className="font-medium">
                                {type === 'all' ? 'All Types' : type}
                              </span>
                              {selectedType === type && (
                                <motion.div
                                  layoutId="typeActive"
                                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full -z-10"
                                  initial={false}
                                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                              )}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Timeline Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <TimelineToggle mode={timelineMode} onModeChange={setTimelineMode} />
            </motion.div>
          </motion.div>

          {/* Timeline Container */}
          <motion.div 
            className="relative mx-auto max-w-6xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4, type: 'spring', stiffness: 100 }}
          >
            {/* Central Timeline Line */}
            <motion.div 
              className="absolute left-1/2 transform -translate-x-1/2 w-1.5 bg-gradient-to-b from-red-600 via-red-900 to-red-600 h-full rounded-full shadow-lg"
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 0.8, scaleY: 1 }}
              onAnimationComplete={() => setTimelineAnimated(true)}
              transition={{ duration: 0.6, delay: 0.4 }}
            />
            
            {/* Timeline Glow Effect */}
            <motion.div 
              className="absolute left-1/2 transform -translate-x-1/2 w-8 h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="w-full h-full bg-gradient-to-b from-red-500/20 via-red-600/10 to-red-500/20 blur-sm" />
            </motion.div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={timelineMode}
                initial={{ 
                  opacity: 0,
                  y: 30,
                  rotateX: 5
                }}
                animate={{ 
                  opacity: 1,
                  y: 0,
                  rotateX: 0
                }}
                exit={{ 
                  opacity: 0,
                  y: 30,
                  rotateX: -5
                }}
                transition={{ 
                  duration: 0.3,
                  type: "spring",
                  stiffness: 120,
                  damping: 15
                }}
                style={{ 
                  perspective: 2000,
                  transformStyle: 'preserve-3d'
                }}
                className="space-y-16"
              >
                <div className="space-y-12">
                  {filteredData.map((item, index) => (
                    <TimelineCard
                      key={`${item.id}-${timelineMode}`}
                      item={item}
                      index={index}
                      isLeft={index % 2 === 0}
                      mode={timelineMode}
                      onClick={() => setSelectedTimelineItem(item)}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Footer */}
          <footer className="mt-16 text-center text-gray-500 text-sm opacity-80">
            &copy; {new Date().getFullYear()} MarvelShowCase. Not affiliated with Marvel Studios.
          </footer>
          
          {/* Built with love by BATMAN footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-center mt-8 text-xs text-gray-500"
          >
            <span>
              Built with <span className="text-red-500 animate-pulse">♥</span> by <span className="font-bold text-white">BATMAN</span>
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* Timeline Detail Modal */}
      {selectedTimelineItem && (
        <TimelineDetailModal
          item={selectedTimelineItem}
          onClose={() => setSelectedTimelineItem(null)}
        />
      )}

      {/* Floating Home Button */}
      <FloatingHomeButton />
    </>
  );
};

const MCUTimelinePage = () => {
  return (
    <TimelineProvider>
      <TimelineContent />
    </TimelineProvider>
  );
};

export default MCUTimelinePage;