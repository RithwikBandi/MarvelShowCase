import { useState, useEffect } from 'react';
import { mcuTimeline } from '@/data/mcuData';
import MovieCard from '@/components/MovieCard';
import LoadingScreen from '@/components/LoadingScreen';
import FloatingHomeButton from '@/components/FloatingHomeButton';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Play, Calendar, Tv, Sparkles, Clock, Star, Search, Filter, SortAsc, SortDesc, X, Zap, Crown, ArrowUpDown, ChevronDown } from 'lucide-react';
import Header from "@/components/Header";

// Season mapping for shows with multiple seasons
const seasonMapping = {
  'Loki': {
    'Season 1': {
      id: 26,
      title: 'Loki',
      release_date: '2021-06-09',
      phase: 'Phase 4',
      description: 'The God of Mischief steps out of his brother\'s shadow to help fix the broken timeline.',
      plot: 'After stealing the Tesseract during the events of Endgame, Loki finds himself brought before the Time Variance Authority, a bureaucratic organization that monitors the timeline. Faced with being erased from existence due to being a time variant, Loki must help fix the timeline and prevent greater threats. The series explores themes of destiny, identity, and redemption across multiple timelines.',
      images: { poster: 'loki-poster.jpg', backdrop: 'loki-backdrop.jpg' },
      cast: ['Tom Hiddleston', 'Gwyneth Paltrow', 'Owen Wilson', 'Wunmi Mosaku'],
      director: 'Michael Waldron',
      rating: 5
    },
    'Season 2': {
      id: 44,
      title: 'Loki Season 2',
      release_date: '2023-10-05',
      phase: 'Phase 5', // Keep in Phase 5
      description: 'Loki struggles with time-slipping while the TVA faces collapse, threatening the multiverse\'s stability.',
      plot: 'After the events of the first season, Loki finds himself lost in time and experiencing time-slipping, bouncing between past and future uncontrollably. The Time Variance Authority is in disarray following He Who Remains\' death, and the multiverse is spiraling toward chaos. Loki must work with Mobius, Sylvie, and other allies to stabilize the timeline while discovering the true cost of free will and the burden of protecting infinite realities.',
      images: { poster: 'loki-season-2-poster.jpg', backdrop: 'loki-season-2-backdrop.jpg' },
      cast: ['Tom Hiddleston', 'Gwyneth Paltrow', 'Owen Wilson', 'Wunmi Mosaku'],
      director: 'Michael Waldron',
      rating: 5
    }
  },
  'What If...?': {
    'Season 1': {
      id: 28,
      title: 'What If...?',
      release_date: '2021-08-11',
      phase: 'Phase 4',
      description: 'An anthology series exploring alternate timelines in the Marvel Cinematic Universe with different outcomes.',
      plot: 'The series explores alternate timelines in the multiverse that show what would happen if major moments from the Marvel Cinematic Universe occurred differently. Each episode features different characters and scenarios, from T\'Challa becoming Star-Lord to Peggy Carter receiving the super soldier serum. The Watcher observes these realities while maintaining his oath of non-interference, until a greater threat emerges.',
      images: { poster: 'what-if-poster.jpg', backdrop: 'what-if-backdrop.jpg' },
      cast: ['Tom Hiddleston', 'Elizabeth Olsen', 'Paul Bettany'],
      director: 'Kari Skogland',
      rating: 5
    },
    'Season 2': {
      id: 46,
      title: 'What If...? Season 2',
      release_date: '2023-12-22',
      phase: 'Phase 5', // Keep in Phase 5
      description: 'The Watcher returns with new stories exploring alternate realities and possibilities across the multiverse.',
      plot: 'The anthology series returns with new stories that examine alternate timelines in the multiverse where pivotal moments unfold differently. The Watcher continues to observe these realities while grappling with his oath of non-interference. New episodes explore different characters and scenarios, showcasing how small changes can lead to vastly different outcomes. The season builds toward larger multiversal threats that may require the Watcher\'s intervention once again.',
      images: { poster: 'what-if-season-2-poster.jpg', backdrop: 'what-if-season-2-backdrop.jpg' },
      cast: ['Tom Hiddleston', 'Elizabeth Olsen', 'Paul Bettany'],
      director: 'Kari Skogland',
      rating: 5
    }
  }
};

// Filter and process TV shows data
const processTVShowsData = () => {
  const baseTVShows = mcuTimeline.filter(item => item.type === 'Series');
  
  // Keep original phases - don't change anything
  return baseTVShows.sort((a, b) => a.id - b.id);
};

const tvShowsData = processTVShowsData();
const phases = Array.from(new Set(tvShowsData.map(item => item.phase)));
const years = Array.from(new Set(tvShowsData.map(item => new Date(item.release_date).getFullYear()))).sort((a, b) => b - a);

// Phase information for empty states
const phaseInfo = {
  'Phase 1': {
    title: 'The Beginning Era',
    description: 'Phase 1 focused on establishing the core Avengers team through individual origin stories.',
    icon: '🛡️',
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20'
  },
  'Phase 2': {
    title: 'The Expansion Era',
    description: 'Phase 2 expanded the universe with new heroes and deeper storylines.',
    icon: '⚡',
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20'
  },
  'Phase 3': {
    title: 'The Climax Era',
    description: 'Phase 3 brought the Infinity Saga to its epic conclusion.',
    icon: '💎',
    color: 'from-purple-500 to-pink-600',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20'
  },
  'Phase 4': {
    title: 'The New Era',
    description: 'Phase 4 introduced new heroes and explored the multiverse.',
    icon: '🌟',
    color: 'from-orange-500 to-red-600',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20'
  },
  'Phase 5': {
    title: 'The Future Era',
    description: 'Phase 5 continues to expand the Marvel Universe with new adventures.',
    icon: '🚀',
    color: 'from-cyan-500 to-blue-600',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/20'
  }
};

const TVShowsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPhase, setSelectedPhase] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'release' | 'title' | 'phase'>('release');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading time for smooth transition
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Filter and sort TV shows
  const filteredTVShows = tvShowsData
    .filter(show => {
      const matchesSearch = show.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          show.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPhase = selectedPhase === 'all' || show.phase === selectedPhase;
      const matchesYear = selectedYear === 'all' || new Date(show.release_date).getFullYear().toString() === selectedYear;
      
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

  // Group filtered TV shows by phase
  const groupedTVShows = filteredTVShows.reduce((acc, show) => {
    if (!acc[show.phase]) {
      acc[show.phase] = [];
    }
    acc[show.phase].push(show);
    return acc;
  }, {} as Record<string, typeof tvShowsData>);

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

  const TVShowCardEnhanced = ({ show, index }: { show: any; index: number }) => (
    <motion.div
      key={show.id}
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
      onClick={() => {
        // Check if this is a Season 2 show and set default season accordingly
        const isSeason2 = show.title.includes('Season 2');
        setSelectedSeason(isSeason2 ? 'Season 2' : 'Season 1');
        setSelectedShow(show);
      }}
    >
      <div className="relative">
        <MovieCard
          title={show.title}
          year={new Date(show.release_date).getFullYear().toString()}
          image={`/images/mcu/posters/${show.images.poster}`}
          cast={show.cast}
          phase={show.phase}
          rating={show.rating}
          genre="TV Series"
        />
        
        {/* TV Show Badge Overlay */}
        <div className="absolute top-3 left-3 z-10">
          <div className="inline-flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-xs font-medium text-white shadow-lg">
            <Tv className="w-3 h-3" />
            <span>Series</span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // TV Show Detail Modal
  const [selectedShow, setSelectedShow] = useState<any | null>(null);
  const [selectedSeason, setSelectedSeason] = useState<string>('Season 1');
  const [showSeasonDropdown, setShowSeasonDropdown] = useState(false);
  
  const TVShowDetailModal = ({ show, onClose }: { show: any; onClose: () => void }) => {
    // Check if this show has multiple seasons
    const showKey = show.title.includes('Season') ? show.title.split(' Season')[0] : show.title;
    const hasMultipleSeasons = seasonMapping[showKey as keyof typeof seasonMapping];
    const currentSeasonData = hasMultipleSeasons ? hasMultipleSeasons[selectedSeason as keyof typeof hasMultipleSeasons] : show;
    
    const handleSeasonChange = (season: string) => {
      setSelectedSeason(season);
      setShowSeasonDropdown(false);
    };

    return (
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1003] flex items-start justify-center p-12"
            onClick={onClose}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-blue-500/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto mt-20"
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative h-64 overflow-hidden rounded-t-2xl">
                <img
                  src={`/images/mcu/backdrops/${currentSeasonData.images.backdrop}`}
                  alt={currentSeasonData.title}
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
                
                {/* Season Dropdown */}
                {hasMultipleSeasons && (
                  <div className="absolute top-4 left-4">
                    <div className="relative">
                      <button
                        onClick={() => setShowSeasonDropdown(!showSeasonDropdown)}
                        className="flex items-center space-x-2 px-3 py-2 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-colors"
                      >
                        <span className="text-sm font-medium">{selectedSeason}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${showSeasonDropdown ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {showSeasonDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute top-full left-0 mt-2 w-32 bg-gray-900/95 backdrop-blur-sm rounded-lg border border-blue-500/20 shadow-xl overflow-hidden"
                        >
                          {Object.keys(hasMultipleSeasons).map((season) => (
                            <button
                              key={season}
                              onClick={() => handleSeasonChange(season)}
                              className={`w-full px-3 py-2 text-left text-sm hover:bg-blue-500/20 transition-colors ${
                                selectedSeason === season ? 'bg-blue-500/30 text-blue-300' : 'text-white'
                              }`}
                            >
                              {season}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  </div>
                )}

                {/* Show Info Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-3xl font-bold text-white mb-2">{currentSeasonData.title}</h2>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4 text-gray-300" />
                      <span className="text-white">{new Date(currentSeasonData.release_date).getFullYear()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Crown className="w-4 h-4 text-blue-400" />
                      <span className="text-white">{currentSeasonData.phase}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Description</h3>
                  <p className="text-gray-300 leading-relaxed">{currentSeasonData.description}</p>
                </div>
                
                {/* Plot */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Plot</h3>
                  <p className="text-gray-300 leading-relaxed">{currentSeasonData.plot}</p>
                </div>
                
                {/* Cast */}
                {currentSeasonData.cast && currentSeasonData.cast.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Cast</h3>
                    <div className="flex flex-wrap gap-2">
                      {currentSeasonData.cast.map((actor: string, idx: number) => (
                        <span key={idx} className="px-3 py-1 bg-blue-500/20 rounded-full text-blue-300 text-sm">
                          {actor}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Director */}
                {currentSeasonData.director && (
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Director</h3>
                    <div className="flex items-center space-x-2 p-2 bg-blue-500/10 rounded-lg">
                      <Tv className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-300">{currentSeasonData.director}</span>
                    </div>
                  </div>
                )}
                
                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-1">Release Date</h4>
                    <p className="text-white">{new Date(currentSeasonData.release_date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-1">Phase</h4>
                    <p className="text-white">{currentSeasonData.phase}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-1">Type</h4>
                    <p className="text-white">TV Series</p>
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
  };

  if (isLoading) {
    return <LoadingScreen theme="tvshows" />;
  }

  // Animated background particles (optional, for depth)
  const particleCount = 12;
  const particles = Array.from({ length: particleCount });

  return (
    <>
      <Header />
      <div className="h-28" />
      <motion.div 
        className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900 via-[#1a1a40] to-black text-white relative overflow-x-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Static Background Overlay (no shading/animation on scroll) */}
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20 pointer-events-none z-0" />
        {/* Optional animated particles for depth */}
        {/*
        <div className="pointer-events-none absolute inset-0 z-0">
          {particles.map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-br from-cyan-600/40 to-blue-500/30 blur-2xl shadow-2xl"
              style={{
                width: `${36 + (i % 4) * 18}px`,
                height: `${36 + (i % 3) * 22}px`,
                left: `${(i * 61) % 100}%`,
                top: `${(i * 41) % 100}%`,
                opacity: 0.14 + (i % 3) * 0.09,
                zIndex: 0,
              }}
              animate={{
                y: [0, (i % 2 === 0 ? 28 : -28), 0],
                x: [0, (i % 2 === 0 ? -18 : 18), 0],
                opacity: [0.14, 0.22, 0.14],
              }}
              transition={{
                duration: 10 + (i % 5),
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                delay: i * 0.4,
              }}
            />
          ))}
        </div>
        */}

        <div className="container mx-auto px-4 py-12 relative z-10">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-br from-white via-cyan-500 to-blue-600 bg-clip-text text-transparent uppercase tracking-wider drop-shadow-lg">
              Marvel TV Shows
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Dive into the Marvel Universe on the small screen
            </p>
            {/* TODO: Upgrade filter/search/sort bar here (next step) */}
          </motion.div>

          {/* Content */}
          <div className="space-y-16">
            {Object.keys(groupedTVShows).length > 0 ? (
              Object.entries(groupedTVShows).map(([phase, shows], phaseIndex) => (
                <motion.section
                  key={phase}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.5 + (phaseIndex * 0.1), 
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
                    transition={{ delay: 0.6 + (phaseIndex * 0.1) }}
                    className="flex items-center space-x-4"
                  >
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${phaseInfo[phase as keyof typeof phaseInfo]?.color} flex items-center justify-center text-2xl`}>
                      {phaseInfo[phase as keyof typeof phaseInfo]?.icon}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-white">{phase}</h2>
                      <p className="text-gray-400">{shows.length} TV Shows</p>
                    </div>
                  </motion.div>

                  {/* TV Shows Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                    {filteredTVShows.length === 0 ? (
                      <div className="col-span-full flex flex-col items-center justify-center py-24">
                        <Tv className="w-12 h-12 text-blue-400 mb-4" />
                        <h3 className="text-2xl font-bold text-white mb-2">No TV Shows Found</h3>
                        <p className="text-gray-400">Try adjusting your filters or search terms.</p>
                      </div>
                    ) : (
                      shows.map((show, idx) => (
                        <TVShowCardEnhanced key={show.id} show={show} index={idx} />
                      ))
                    )}
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
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center">
                  <Tv className="w-12 h-12 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">No TV Shows Found</h3>
                <p className="text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
                >
                  Clear All Filters
                </button>
              </motion.div>
            )}
          </div>

          {/* TV Show Detail Modal */}
          {selectedShow && (
            <TVShowDetailModal 
              show={selectedShow} 
              onClose={() => {
                setSelectedShow(null);
                setSelectedSeason('Season 1');
                setShowSeasonDropdown(false);
              }} 
            />
          )}

          {/* Professional Footer */}
          <footer className="mt-16 text-center text-gray-500 text-sm opacity-80">
            &copy; {new Date().getFullYear()} MarvelShowCase. Not affiliated with Marvel Studios.
          </footer>
          <div className="text-center mt-8 text-xs text-gray-500">
            <span>
              Built with <span className="text-cyan-400 animate-pulse">♥</span> by <span className="font-bold text-cyan-300">BATMAN</span>
            </span>
          </div>
        </div>
      </motion.div>
      {/* Floating Home Button */}
      <FloatingHomeButton />
    </>
  );
};

export default TVShowsPage; 