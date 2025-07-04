import { useState, useEffect } from 'react';
import { mcuTimeline } from '@/data/mcuData';
import MovieCard from '@/components/MovieCard';
import LoadingScreen from '@/components/LoadingScreen';
import FloatingHomeButton from '@/components/FloatingHomeButton';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Play, Calendar, Film, Sparkles, Clock, Star, Zap, Gift, Award, Search, Filter, SortAsc, SortDesc, X, Crown, ArrowUpDown } from 'lucide-react';
import Header from "@/components/Header";

// Filter only Special type content
const specialsData = mcuTimeline.filter(item => item.type === 'Special').sort((a, b) => a.id - b.id);
const phases = Array.from(new Set(specialsData.map(item => item.phase)));
const years = Array.from(new Set(specialsData.map(item => new Date(item.release_date).getFullYear()))).sort((a, b) => b - a);

const SpecialPresentationsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPhase, setSelectedPhase] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'release' | 'title' | 'phase'>('release');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSpecial, setSelectedSpecial] = useState<any | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading time for smooth transition
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Filter and sort specials
  const filteredSpecials = specialsData
    .filter(special => {
      const matchesSearch = special.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          special.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPhase = selectedPhase === 'all' || special.phase === selectedPhase;
      const matchesYear = selectedYear === 'all' || new Date(special.release_date).getFullYear().toString() === selectedYear;
      
      return matchesSearch && matchesPhase && matchesYear;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'phase':
          comparison = a.phase.localeCompare(b.phase);
          break;
        case 'release':
        default:
          comparison = new Date(a.release_date).getTime() - new Date(b.release_date).getTime();
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  // Group filtered specials by phase
  const groupedSpecials = filteredSpecials.reduce((acc, special) => {
    if (!acc[special.phase]) {
      acc[special.phase] = [];
    }
    acc[special.phase].push(special);
    return acc;
  }, {} as Record<string, typeof specialsData>);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedPhase('all');
    setSelectedYear('all');
    setSortBy('release');
    setSortOrder('asc');
  };

  const hasActiveFilters = searchTerm || selectedPhase !== 'all' || selectedYear !== 'all' || sortBy !== 'release' || sortOrder !== 'asc';

  const SpecialCardEnhanced = ({ special, index }: { special: any; index: number }) => (
    <motion.div
      key={special.id}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: 0.1 + (index * 0.1),
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.05,
        y: -8,
        transition: { duration: 0.2 }
      }}
      className="group cursor-pointer"
      onClick={() => setSelectedSpecial(special)}
    >
      <div className="relative">
        <MovieCard
          title={special.title}
          year={new Date(special.release_date).getFullYear().toString()}
          image={`/images/mcu/posters/${special.images.poster}`}
          cast={special.cast}
          phase={special.phase}
          rating={special.rating}
          genre="Special"
        />
        
        {/* Special Badge Overlay */}
        <div className="absolute top-3 left-3 z-10">
          <div className="inline-flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-xs font-medium text-white shadow-lg">
            <Gift className="w-3 h-3" />
            <span>Special</span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // Special Detail Modal
  const SpecialDetailModal = ({ special, onClose }: { special: any; onClose: () => void }) => (
    <AnimatePresence>
      {special && (
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
            className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-purple-500/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative h-64 overflow-hidden rounded-t-2xl">
              <img
                src={`/images/mcu/backdrops/${special.images.backdrop}`}
                alt={special.title}
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
              {/* Special Info Overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <h2 className="text-3xl font-bold text-white mb-2">{special.title}</h2>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4 text-gray-300" />
                    <span className="text-white">{new Date(special.release_date).getFullYear()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Crown className="w-4 h-4 text-purple-400" />
                    <span className="text-white">{special.phase}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Description</h3>
                <p className="text-gray-300 leading-relaxed">{special.description}</p>
              </div>
              {/* Plot */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Plot</h3>
                <p className="text-gray-300 leading-relaxed">{special.plot}</p>
              </div>
              {/* Cast */}
              {special.cast && special.cast.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Cast</h3>
                  <div className="flex flex-wrap gap-2">
                    {special.cast.map((actor: string, idx: number) => (
                      <span key={idx} className="px-3 py-1 bg-purple-500/20 rounded-full text-purple-300 text-sm">
                        {actor}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {/* Director */}
              {special.director && (
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Director</h3>
                  <div className="flex items-center space-x-2 p-2 bg-purple-500/10 rounded-lg">
                    <Film className="w-4 h-4 text-purple-400" />
                    <span className="text-gray-300">{special.director}</span>
                  </div>
                </div>
              )}
              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-1">Release Date</h4>
                  <p className="text-white">{new Date(special.release_date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-1">Phase</h4>
                  <p className="text-white">{special.phase}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-1">Type</h4>
                  <p className="text-white">Special Presentation</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-1">Available On</h4>
                  <p className="text-white">Disney+</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (isLoading) {
    return <LoadingScreen theme="specials" />;
  }

  return (
    <>
      <Header />
      <div className="h-28" />
      <motion.div 
        className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-[#300000] to-black text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20 pointer-events-none" />

        <div className="container mx-auto px-4 py-12 relative">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-br from-white via-purple-500 to-pink-600 bg-clip-text text-transparent uppercase tracking-wider drop-shadow-lg">
              Special Presentations
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Exclusive Marvel content and special releases
            </p>
            
            {/* Stats */}
            <div className="flex justify-center space-x-8 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{filteredSpecials.length}</div>
                <div className="text-sm text-gray-400">Filtered Specials</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{Object.keys(groupedSpecials).length}</div>
                <div className="text-sm text-gray-400">Active Phases</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{specialsData.length}</div>
                <div className="text-sm text-gray-400">Total Specials</div>
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
                  placeholder="Search special presentations, descriptions, phases..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-purple-500/20 rounded-lg focus:outline-none focus:border-purple-500/50 transition-colors text-white placeholder-gray-400"
                />
              </div>

              {/* Enhanced Filter Section */}
              <div className="bg-gradient-to-r from-purple-500/10 via-gray-900/30 to-pink-500/10 border border-purple-500/20 rounded-2xl backdrop-blur-sm p-6">
                {/* Filter Header */}
                <motion.div 
                  className="flex items-center justify-between mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <Gift className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Special Presentation Filters</h3>
                      <p className="text-sm text-gray-400">Discover exclusive Marvel content</p>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => setShowFilters(!showFilters)}
                    className="relative group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center group-hover:border-purple-500/50 transition-all duration-300">
                      <motion.div
                        animate={{ rotate: showFilters ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronLeft className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors" />
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
                      {/* Phase Filter */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <label className="block text-sm font-semibold text-gray-300 mb-3 flex items-center space-x-2">
                          <Crown className="w-4 h-4 text-yellow-400" />
                          <span>MCU Phase</span>
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {['all', ...phases].map(phase => (
                            <motion.button
                              key={phase}
                              onClick={() => setSelectedPhase(phase)}
                              className={`relative group px-4 py-2 rounded-full border transition-all duration-300 ${
                                selectedPhase === phase
                                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-purple-400 text-white shadow-lg shadow-purple-500/25'
                                  : 'bg-gray-800/50 border-gray-600/30 text-gray-300 hover:border-purple-500/50 hover:bg-purple-500/10'
                              }`}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <span className="font-medium">
                                {phase === 'all' ? 'All Phases' : phase}
                              </span>
                              {selectedPhase === phase && (
                                <motion.div
                                  layoutId="phaseActive"
                                  className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full -z-10"
                                  initial={false}
                                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                              )}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>

                      {/* Year Filter */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <label className="block text-sm font-semibold text-gray-300 mb-3 flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-blue-400" />
                          <span>Release Year</span>
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {['all', ...years].map(year => (
                            <motion.button
                              key={year}
                              onClick={() => setSelectedYear(year.toString())}
                              className={`relative group px-4 py-2 rounded-full border transition-all duration-300 ${
                                selectedYear === year.toString()
                                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 border-blue-400 text-white shadow-lg shadow-blue-500/25'
                                  : 'bg-gray-800/50 border-gray-600/30 text-gray-300 hover:border-blue-500/50 hover:bg-blue-500/10'
                              }`}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <span className="font-medium">
                                {year === 'all' ? 'All Years' : year}
                              </span>
                              {selectedYear === year.toString() && (
                                <motion.div
                                  layoutId="yearActive"
                                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full -z-10"
                                  initial={false}
                                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                              )}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>

                      {/* Sort Options */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <label className="block text-sm font-semibold text-gray-300 mb-3 flex items-center space-x-2">
                          <Sparkles className="w-4 h-4 text-orange-400" />
                          <span>Sort Special Presentations</span>
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {[
                            { value: 'release', label: 'Release Date', icon: Calendar },
                            { value: 'title', label: 'Title', icon: Gift },
                            { value: 'phase', label: 'Phase', icon: Crown }
                          ].map(({ value, label, icon: Icon }) => (
                            <motion.button
                              key={value}
                              onClick={() => setSortBy(value as 'release' | 'title' | 'phase')}
                              className={`relative group px-4 py-2 rounded-full border transition-all duration-300 flex items-center space-x-2 ${
                                sortBy === value
                                  ? 'bg-gradient-to-r from-orange-500 to-red-500 border-orange-400 text-white shadow-lg shadow-orange-500/25'
                                  : 'bg-gray-800/50 border-gray-600/30 text-gray-300 hover:border-orange-500/50 hover:bg-orange-500/10'
                              }`}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Icon className="w-4 h-4" />
                              <span className="font-medium">{label}</span>
                              {sortBy === value && (
                                <motion.div
                                  layoutId="sortActive"
                                  className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full -z-10"
                                  initial={false}
                                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                              )}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>

                      {/* Sort Order */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <label className="block text-sm font-semibold text-gray-300 mb-3 flex items-center space-x-2">
                          <ArrowUpDown className="w-4 h-4 text-green-400" />
                          <span>Sort Order</span>
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {[
                            { value: 'asc', label: 'Ascending', icon: SortAsc },
                            { value: 'desc', label: 'Descending', icon: SortDesc }
                          ].map(({ value, label, icon: Icon }) => (
                            <motion.button
                              key={value}
                              onClick={() => setSortOrder(value as 'asc' | 'desc')}
                              className={`relative group px-4 py-2 rounded-full border transition-all duration-300 flex items-center space-x-2 ${
                                sortOrder === value
                                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 border-green-400 text-white shadow-lg shadow-green-500/25'
                                  : 'bg-gray-800/50 border-gray-600/30 text-gray-300 hover:border-green-500/50 hover:bg-green-500/10'
                              }`}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Icon className="w-4 h-4" />
                              <span className="font-medium">{label}</span>
                              {sortOrder === value && (
                                <motion.div
                                  layoutId="orderActive"
                                  className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full -z-10"
                                  initial={false}
                                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                              )}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>

                      {/* Clear Filters */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex justify-center pt-4"
                      >
                        <motion.button
                          onClick={clearFilters}
                          className="group relative px-6 py-3 bg-gradient-to-r from-gray-700/50 to-gray-800/50 border border-gray-600/30 rounded-full text-gray-300 hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 hover:border-purple-500/50 hover:text-white transition-all duration-300 flex items-center space-x-2"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                          <span className="font-medium">Clear All Filters</span>
                        </motion.button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, type: 'spring', stiffness: 80 }}
            className="space-y-8"
          >
            {Object.keys(groupedSpecials).length > 0 ? (
              Object.entries(groupedSpecials).map(([phase, specials], phaseIndex) => (
                <motion.section
                  key={phase}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.6 + (phaseIndex * 0.1), 
                    duration: 0.6, 
                    type: 'spring', 
                    stiffness: 80 
                  }}
                  className="space-y-8"
                >
                  {/* Phase Header */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + (phaseIndex * 0.1) }}
                    className="flex items-center space-x-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-2xl">
                      🎁
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-white">{phase}</h2>
                      <p className="text-gray-400">{specials.length} Special Presentations</p>
                    </div>
                  </motion.div>

                  {/* Specials Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                    {specials.map((special, index) => (
                      <SpecialCardEnhanced key={special.id} special={special} index={index} />
                    ))}
                  </div>
                </motion.section>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center">
                  <Gift className="w-12 h-12 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">No Special Presentations Found</h3>
                <p className="text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-300"
                >
                  Clear All Filters
                </button>
              </motion.div>
            )}
          </motion.div>

          {/* Footer */}
          <footer className="mt-16 text-center text-gray-500 text-sm opacity-80">
            &copy; {new Date().getFullYear()} MarvelShowCase. Not affiliated with Marvel Studios.
          </footer>
          <div className="text-center mt-8 text-xs text-gray-500">
            <span>
              Built with <span className="text-purple-400 animate-pulse">♥</span> by <span className="font-bold text-purple-300">BATMAN</span>
            </span>
          </div>
        </div>
      </motion.div>

      {/* Special Detail Modal */}
      <SpecialDetailModal
        special={selectedSpecial}
        onClose={() => setSelectedSpecial(null)}
      />

      {/* Floating Home Button */}
      <FloatingHomeButton />
    </>
  );
};

export default SpecialPresentationsPage; 