import { useState, useEffect, useMemo } from 'react';
import { mcuTimeline } from '@/data/mcuData';
import MovieCard from '@/components/MovieCard';
import LoadingScreen from '@/components/LoadingScreen';
import FloatingHomeButton from '@/components/FloatingHomeButton';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Play, Calendar, Film, Sparkles, Clock, Star, Search, Filter, SortAsc, SortDesc, X, Zap, Crown, ArrowUpDown, Users, Award, Target, Shield, Flame, Zap as Lightning } from 'lucide-react';
import Header from "@/components/Header";

// Enhanced phase information with genres
const phaseInfo = {
  "Phase 1": {
    title: "The Beginning",
    description: "The foundation of the Marvel Cinematic Universe, introducing Earth's mightiest heroes.",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-gradient-to-br from-blue-500/10 to-blue-600/5",
    borderColor: "border-blue-500/20",
    icon: "⚡",
    genre: "Superhero Origin Stories"
  },
  "Phase 2": {
    title: "The Expansion",
    description: "Heroes face new challenges and the universe expands beyond Earth.",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-gradient-to-br from-purple-500/10 to-purple-600/5",
    borderColor: "border-purple-500/20",
    icon: "🛡️",
    genre: "Cosmic Adventures"
  },
  "Phase 3": {
    title: "The Convergence",
    description: "The ultimate battle approaches as heroes unite against the greatest threat.",
    color: "from-red-500 to-red-600",
    bgColor: "bg-gradient-to-br from-red-500/10 to-red-600/5",
    borderColor: "border-red-500/20",
    icon: "🔥",
    genre: "Epic Team-ups"
  },
  "Phase 4": {
    title: "The New Era",
    description: "A new generation of heroes emerges in a changed world.",
    color: "from-green-500 to-green-600",
    bgColor: "bg-gradient-to-br from-green-500/10 to-green-600/5",
    borderColor: "border-green-500/20",
    icon: "🌟",
    genre: "Multiverse Stories"
  },
  "Phase 5": {
    title: "The Multiverse Saga",
    description: "Reality itself is at stake as heroes navigate the multiverse.",
    color: "from-yellow-500 to-yellow-600",
    bgColor: "bg-gradient-to-br from-yellow-500/10 to-yellow-600/5",
    borderColor: "border-yellow-500/20",
    icon: "🌌",
    genre: "Multiverse Adventures"
  }
};

// Movie genre mapping
const getMovieGenre = (title: string) => {
  if (title.includes('Avengers')) return 'Superhero Team-up';
  if (title.includes('Iron Man')) return 'Tech Superhero';
  if (title.includes('Captain America')) return 'Patriotic Superhero';
  if (title.includes('Thor')) return 'Mythological Superhero';
  if (title.includes('Guardians')) return 'Space Adventure';
  if (title.includes('Spider-Man')) return 'Coming-of-Age Superhero';
  if (title.includes('Black Panther')) return 'Political Superhero';
  if (title.includes('Doctor Strange')) return 'Mystical Superhero';
  if (title.includes('Ant-Man')) return 'Heist Superhero';
  if (title.includes('Captain Marvel')) return 'Space Superhero';
  if (title.includes('Shang-Chi')) return 'Martial Arts Superhero';
  if (title.includes('Eternals')) return 'Cosmic Mythology';
  if (title.includes('Black Widow')) return 'Spy Thriller';
  if (title.includes('Loki')) return 'Time Travel Drama';
  if (title.includes('WandaVision')) return 'Psychological Drama';
  if (title.includes('Falcon')) return 'Political Drama';
  if (title.includes('Hawkeye')) return 'Family Drama';
  if (title.includes('Moon Knight')) return 'Psychological Thriller';
  if (title.includes('Ms. Marvel')) return 'Teen Superhero';
  if (title.includes('She-Hulk')) return 'Legal Comedy';
  if (title.includes('Werewolf')) return 'Horror Superhero';
  if (title.includes('Secret Invasion')) return 'Espionage Thriller';
  if (title.includes('Deadpool')) return 'Comedy Superhero';
  if (title.includes('Fantastic Four')) return 'Family Superhero';
  if (title.includes('X-Men')) return 'Mutant Superhero';
  if (title.includes('Thunderbolts')) return 'Anti-Hero Team';
  if (title.includes('Ironheart')) return 'Tech Innovation';
  if (title.includes('Agatha')) return 'Mystical Drama';
  return 'Superhero Action';
};

const MoviesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPhase, setSelectedPhase] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'title' | 'phase' | 'release'>('release');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<any | null>(null);
  const navigate = useNavigate();

  // Filter only Movie type content
  const moviesData = mcuTimeline.filter(item => item.type === 'Movie');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Filter and sort movies
  const filteredMovies = moviesData
    .filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          movie.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPhase = selectedPhase === 'all' || movie.phase === selectedPhase;
      const matchesYear = selectedYear === 'all' || new Date(movie.release_date).getFullYear().toString() === selectedYear;
      
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

  // Group filtered movies by phase
  const groupedMovies = filteredMovies.reduce((acc, movie) => {
    if (!acc[movie.phase]) {
      acc[movie.phase] = [];
    }
    acc[movie.phase].push(movie);
    return acc;
  }, {} as Record<string, typeof moviesData>);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedPhase('all');
    setSelectedYear('all');
    setSortBy('release');
    setSortOrder('asc');
  };

  const hasActiveFilters = searchTerm || selectedPhase !== 'all' || selectedYear !== 'all' || sortBy !== 'release' || sortOrder !== 'asc';

  const EmptyPhaseCard = ({ phase }: { phase: string }) => {
    const info = phaseInfo[phase as keyof typeof phaseInfo];
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        className={`relative overflow-hidden rounded-2xl ${info.bgColor} ${info.borderColor} border backdrop-blur-sm`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent" />
          <div className="absolute top-4 right-4 text-6xl opacity-20">{info.icon}</div>
        </div>

        <div className="relative p-8 text-center">
          {/* Phase Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center text-3xl border border-white/20"
          >
            {info.icon}
          </motion.div>

          {/* Phase Title */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`text-2xl font-bold mb-3 bg-gradient-to-r ${info.color} bg-clip-text text-transparent`}
          >
            {phase}
          </motion.h3>

          {/* Era Title */}
          <motion.h4
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg font-semibold text-white mb-3"
          >
            {info.title}
          </motion.h4>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-gray-300 text-sm leading-relaxed mb-6"
          >
            {info.description}
          </motion.p>

          {/* Coming Soon Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-white">Coming Soon</span>
          </motion.div>
        </div>
      </motion.div>
    );
  };

  const MovieCardEnhanced = ({ movie, index }: { movie: any; index: number }) => {
    const movieGenre = getMovieGenre(movie.title);
    
    return (
      <motion.div
        key={movie.id}
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
        onClick={() => setSelectedMovie(movie)}
      >
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-white/10 backdrop-blur-sm">
          <MovieCard
            title={movie.title}
            year={new Date(movie.release_date).getFullYear().toString()}
            image={`/images/mcu/posters/${movie.images.poster}`}
            rating={movie.rating}
            cast={movie.cast}
            phase={movie.phase}
            genre={movieGenre}
          />
        </div>
      </motion.div>
    );
  };

  // Movie Detail Modal
  const MovieDetailModal = ({ movie, onClose }: { movie: any; onClose: () => void }) => {
    const handleClose = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onClose();
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
      onClose();
    };

    // Handle escape key
    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    const movieGenre = getMovieGenre(movie.title);

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[1003] flex items-center justify-center p-4"
        onClick={handleBackdropClick}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-red-500/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative h-64 overflow-hidden rounded-t-2xl">
            <img
              src={`/images/mcu/backdrops/${movie.images.backdrop}`}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            {/* Close Button */}
            <button
              onClick={handleClose}
              type="button"
              className="absolute top-4 right-4 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Movie Info Overlay */}
            <div className="absolute bottom-4 left-4 right-4">
              <h2 className="text-3xl font-bold text-white mb-2">{movie.title}</h2>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4 text-gray-300" />
                  <span className="text-white">{new Date(movie.release_date).getFullYear()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Crown className="w-4 h-4 text-blue-400" />
                  <span className="text-white">{movie.phase}</span>
                </div>
                {typeof movie.rating === 'number' && (
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < movie.rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} 
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Plot */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Plot</h3>
              <p className="text-gray-300 leading-relaxed">{movie.plot}</p>
            </div>

            {/* Cast */}
            {movie.cast && movie.cast.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Cast</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.cast.map((actor: string, idx: number) => (
                    <span key={idx} className="px-3 py-1 bg-red-500/20 rounded-full text-red-300 text-sm">
                      {actor}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Director */}
            {movie.director && (
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Director</h3>
                <div className="flex items-center space-x-2 p-2 bg-blue-500/10 rounded-lg">
                  <Film className="w-4 h-4 text-blue-400" />
                  <span className="text-gray-300">{movie.director}</span>
                </div>
              </div>
            )}

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-1">Release Date</h4>
                <p className="text-white">{new Date(movie.release_date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-1">Phase</h4>
                <p className="text-white">{movie.phase}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-1">Genre</h4>
                <p className="text-white">{movieGenre}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-1">Available On</h4>
                <p className="text-white">{movie.ott_platforms.join(', ')}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  if (isLoading) {
    return <LoadingScreen theme="movies" />;
  }

  // Animated background particles (optional, for depth)
  const particleCount = 14;
  const particles = Array.from({ length: particleCount });

  return (
    <>
      <Header />
      <div className="h-28" />
      <motion.div 
        className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900 via-[#1a1a40] to-black text-white relative overflow-x-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Static Background Overlay (no shading/animation on scroll) */}
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20 pointer-events-none z-0" />

        <div className="container mx-auto px-4 py-12 relative z-10">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-br from-white via-blue-500 to-purple-600 bg-clip-text text-transparent uppercase tracking-wider drop-shadow-lg">
              Marvel Movies
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Experience the Marvel Cinematic Universe in cinematic style
            </p>
            {/* TODO: Upgrade filter/search/sort bar here (next step) */}
          </motion.div>

          {/* Stats Section */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="bg-gradient-to-br from-red-500/10 to-red-600/5 rounded-xl p-6 border border-red-500/20 text-center">
              <div className="text-3xl font-bold text-red-400 mb-2">{moviesData.length}</div>
              <div className="text-gray-300 text-sm">Total Movies</div>
            </div>
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-xl p-6 border border-blue-500/20 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">5</div>
              <div className="text-gray-300 text-sm">Phases</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-xl p-6 border border-purple-500/20 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">2008</div>
              <div className="text-gray-300 text-sm">Started</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 rounded-xl p-6 border border-yellow-500/20 text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">∞</div>
              <div className="text-gray-300 text-sm">Possibilities</div>
            </div>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-8 space-y-6"
          >
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search movies, descriptions, cast..."
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
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                    <Filter className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Movie Filters</h3>
                    <p className="text-sm text-gray-400">Discover epic Marvel blockbusters</p>
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
                        {['all', ...Array.from(new Set(moviesData.map(movie => movie.phase)))].map(phase => (
                          <motion.button
                            key={phase}
                            onClick={() => setSelectedPhase(phase)}
                            className={`relative group px-4 py-2 rounded-full border transition-all duration-300 ${
                              selectedPhase === phase
                                ? 'bg-gradient-to-r from-red-500 to-orange-500 border-red-400 text-white shadow-lg shadow-red-500/25'
                                : 'bg-gray-800/50 border-gray-600/30 text-gray-300 hover:border-red-500/50 hover:bg-red-500/10'
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
                                className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full -z-10"
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
                        {['all', ...Array.from(new Set(moviesData.map(movie => new Date(movie.release_date).getFullYear()))).sort((a, b) => b - a)].map(year => (
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
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span>Sort Movies</span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { value: 'release', label: 'Release Date', icon: Calendar },
                          { value: 'title', label: 'Title', icon: Film },
                          { value: 'phase', label: 'Phase', icon: Crown }
                        ].map(({ value, label, icon: Icon }) => (
                          <motion.button
                            key={value}
                            onClick={() => setSortBy(value as 'release' | 'title' | 'phase')}
                            className={`relative group px-4 py-2 rounded-full border transition-all duration-300 flex items-center space-x-2 ${
                              sortBy === value
                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-purple-400 text-white shadow-lg shadow-purple-500/25'
                                : 'bg-gray-800/50 border-gray-600/30 text-gray-300 hover:border-purple-500/50 hover:bg-purple-500/10'
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Icon className="w-4 h-4" />
                            <span className="font-medium">{label}</span>
                            {sortBy === value && (
                              <motion.div
                                layoutId="sortActive"
                                className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full -z-10"
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
                        className="group relative px-6 py-3 bg-gradient-to-r from-gray-700/50 to-gray-800/50 border border-gray-600/30 rounded-full text-gray-300 hover:bg-gradient-to-r hover:from-red-500/20 hover:to-orange-500/20 hover:border-red-500/50 hover:text-white transition-all duration-300 flex items-center space-x-2"
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

          {/* Movies Grid */}
          <div className="space-y-16">
            {Object.keys(groupedMovies).length > 0 ? (
              Object.entries(groupedMovies).map(([phase, movies], phaseIndex) => (
                <motion.section
                  key={phase}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.8 + (phaseIndex * 0.1), 
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
                    transition={{ delay: 0.9 + (phaseIndex * 0.1) }}
                    className="flex items-center space-x-4"
                  >
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${phaseInfo[phase as keyof typeof phaseInfo]?.color} flex items-center justify-center text-2xl`}>
                      {phaseInfo[phase as keyof typeof phaseInfo]?.icon}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-white">{phase}</h2>
                      <p className="text-gray-400">{movies.length} Movies • {phaseInfo[phase as keyof typeof phaseInfo]?.genre}</p>
                    </div>
                  </motion.div>

                  {/* Movies Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
                    {movies.map((movie, index) => (
                      <MovieCardEnhanced key={movie.id} movie={movie} index={index} />
                    ))}
                  </div>
                </motion.section>
              ))
            ) :
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-red-500/20 to-red-600/20 flex items-center justify-center">
                  <Film className="w-12 h-12 text-red-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">No Movies Found</h3>
                <p className="text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300"
                >
                  Clear All Filters
                </button>
              </motion.div>
            }
          </div>

          {/* Movie Detail Modal */}
          <AnimatePresence>
            {selectedMovie && (
              <MovieDetailModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
            )}
          </AnimatePresence>

          {/* Professional Footer */}
          <footer className="mt-16 text-center text-gray-500 text-sm opacity-80">
            &copy; {new Date().getFullYear()} MarvelShowCase. Not affiliated with Marvel Studios.
          </footer>
          <div className="text-center mt-8 text-xs text-gray-500">
            <span>
              Built with <span className="text-blue-500 animate-pulse">♥</span> by <span className="font-bold text-blue-400">BATMAN</span>
            </span>
          </div>
        </div>
      </motion.div>

      {/* Floating Home Button */}
      <FloatingHomeButton />
    </>
  );
};

export default MoviesPage; 