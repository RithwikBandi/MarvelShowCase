import { useState, useEffect, useMemo } from 'react';
import { heroImages, type Hero } from '@/data/heroImages';
import LoadingScreen from '@/components/LoadingScreen';
import FloatingHomeButton from '@/components/FloatingHomeButton';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Shield, 
  Zap, 
  Star, 
  Heart, 
  Crown, 
  Sparkles, 
  Users, 
  Award, 
  Search, 
  Filter, 
  X,
  Eye,
  Calendar,
  User,
  Target,
  Flame,
  Zap as Lightning,
  Shield as Armor,
  Brain,
  Sword,
  Crosshair,
  Ghost,
  Skull,
  CheckCircle,
  AlertCircle,
  SortAsc,
  SortDesc,
  ChevronDown
} from 'lucide-react';
import Header from "@/components/Header";

const CharactersPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'firstAppearance'>('name');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading time for smooth transition
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Filter and search logic
  const filteredHeroes = useMemo(() => {
    let filtered = heroImages;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(hero =>
        hero.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hero.realName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hero.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hero.powers.some(power => power.toLowerCase().includes(searchTerm.toLowerCase())) ||
        hero.affiliation.some(aff => aff.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(hero => hero.status === selectedStatus);
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(hero => hero.category === selectedCategory);
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'firstAppearance':
          return a.firstAppearance.localeCompare(b.firstAppearance);
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchTerm, selectedStatus, selectedCategory, sortBy]);

  // Get unique statuses and categories
  const statuses = useMemo(() => ['all', ...Array.from(new Set(heroImages.map(hero => hero.status)))], []);
  const categories = useMemo(() => ['all', ...Array.from(new Set(heroImages.map(hero => hero.category)))], []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'retired': return <AlertCircle className="w-4 h-4 text-yellow-400" />;
      case 'deceased': return <Skull className="w-4 h-4 text-red-400" />;
      default: return <User className="w-4 h-4 text-gray-400" />;
    }
  };

  const getPowerIcon = (power: string) => {
    if (power.includes('Strength')) return <Flame className="w-3 h-3" />;
    if (power.includes('Lightning') || power.includes('Energy')) return <Lightning className="w-3 h-3" />;
    if (power.includes('Armor') || power.includes('Shield')) return <Armor className="w-3 h-3" />;
    if (power.includes('Intelligence') || power.includes('Mystic')) return <Brain className="w-3 h-3" />;
    if (power.includes('Combat') || power.includes('Mastery')) return <Sword className="w-3 h-3" />;
    if (power.includes('Archery') || power.includes('Aim')) return <Crosshair className="w-3 h-3" />;
    return <Zap className="w-3 h-3" />;
  };

  const HeroCardEnhanced = ({ hero, index }: { hero: Hero; index: number }) => (
    <motion.div
      key={hero.name}
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
      onClick={() => setSelectedHero(hero)}
    >
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-white/10 backdrop-blur-sm">
        {/* Hero Image */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={hero.image}
            alt={hero.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Status Badge */}
          <div className="absolute top-3 left-3">
            <div className="inline-flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full text-xs font-medium text-white shadow-lg">
              {getStatusIcon(hero.status)}
              <span className="capitalize">{hero.status}</span>
            </div>
          </div>

          {/* Rating Stars */}
          <div className="absolute top-3 right-3">
            <div className="flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-3 h-3 ${i < hero.rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} 
                />
              ))}
            </div>
          </div>

          {/* Phase Badge */}
          <div className="absolute bottom-3 left-3">
            <div className="inline-flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-xs font-medium text-white shadow-lg">
              <Crown className="w-3 h-3" />
              <span>{hero.phase}</span>
            </div>
          </div>
        </div>
        
        {/* Hero Info */}
        <div className="p-4">
          <h3 className="text-white font-bold text-lg mb-1 group-hover:text-red-400 transition-colors">
            {hero.name}
          </h3>
          {hero.realName && (
            <p className="text-gray-400 text-sm mb-2 font-medium">
              {hero.realName}
            </p>
          )}
          <p className="text-gray-300 text-sm line-clamp-2 mb-3">
            {hero.description}
          </p>
          
          {/* Powers Preview */}
          <div className="flex flex-wrap gap-1 mb-3">
            {hero.powers.slice(0, 3).map((power, idx) => (
              <span 
                key={idx}
                className="inline-flex items-center space-x-1 px-2 py-1 bg-red-500/20 rounded-full text-xs text-red-300"
              >
                {getPowerIcon(power)}
                <span>{power}</span>
              </span>
            ))}
            {hero.powers.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 bg-gray-500/20 rounded-full text-xs text-gray-300">
                +{hero.powers.length - 3} more
              </span>
            )}
          </div>

          {/* Actor Info */}
          {hero.actor && (
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <User className="w-3 h-3" />
              <span>{hero.actor}</span>
            </div>
          )}
        </div>
        
        {/* Hover Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-4"
        >
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs text-gray-300">
              <Calendar className="w-3 h-3" />
              <span>{hero.firstAppearance}</span>
            </div>
            <h3 className="text-white font-semibold text-sm">{hero.name}</h3>
            <p className="text-gray-300 text-xs line-clamp-2">
              {hero.description}
            </p>
            <div className="flex items-center space-x-2 text-xs text-gray-300">
              <Eye className="w-3 h-3" />
              <span>Click to view details</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  // Character Detail Modal
  const CharacterDetailModal = ({ hero, onClose }: { hero: Hero; onClose: () => void }) => {
    const handleClose = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onClose();
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
      // Close modal when clicking on the backdrop (not the modal content)
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
              src={hero.backdrop ? `/images/backdrop/${hero.backdrop}` : hero.image}
              alt={hero.name}
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

            {/* Hero Info Overlay */}
            <div className="absolute bottom-4 left-4 right-4">
              <h2 className="text-3xl font-bold text-white mb-2">{hero.name}</h2>
              {hero.realName && (
                <p className="text-gray-300 text-lg mb-2">{hero.realName}</p>
              )}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {getStatusIcon(hero.status)}
                  <span className="text-white capitalize">{hero.status}</span>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < hero.rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Description */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">About</h3>
              <p className="text-gray-300 leading-relaxed">{hero.description}</p>
            </div>

            {/* Powers */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Powers & Abilities</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {hero.powers.map((power, idx) => (
                  <div key={idx} className="flex items-center space-x-2 p-2 bg-red-500/10 rounded-lg">
                    {getPowerIcon(power)}
                    <span className="text-gray-300 text-sm">{power}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Affiliations */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Affiliations</h3>
              <div className="flex flex-wrap gap-2">
                {hero.affiliation.map((aff, idx) => (
                  <span key={idx} className="px-3 py-1 bg-blue-500/20 rounded-full text-blue-300 text-sm">
                    {aff}
                  </span>
                ))}
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-1">First Appearance</h4>
                <p className="text-white">{hero.firstAppearance}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-1">Phase</h4>
                <p className="text-white">{hero.phase}</p>
              </div>
              {hero.actor && (
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-1">Portrayed By</h4>
                  <p className="text-white">{hero.actor}</p>
                </div>
              )}
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-1">Category</h4>
                <p className="text-white capitalize">{hero.category}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  if (isLoading) {
    return <LoadingScreen theme="characters" />;
  }

  // Animated background particles (simple example)
  const particleCount = 18;
  const particles = Array.from({ length: particleCount });

  // --- Premium Filter/Search/Sort Bar (Marvel Red Theme) ---
  const filterBar = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mb-8 space-y-6"
    >
      {/* Search Bar */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search characters, powers, affiliations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-red-500/20 rounded-lg focus:outline-none focus:border-red-500/50 transition-colors text-white placeholder-gray-400"
        />
      </div>

      {/* Enhanced Filter Section */}
      <div className="bg-gradient-to-r from-red-600/10 via-gray-900/30 to-pink-500/10 border border-red-500/20 rounded-2xl backdrop-blur-sm p-6">
        {/* Filter Header */}
        <motion.div 
          className="flex items-center justify-between mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-pink-500 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Character Filters</h3>
              <p className="text-sm text-gray-400">Discover Marvel's legendary heroes</p>
            </div>
          </div>
          <motion.button
            onClick={() => setShowFilters(!showFilters)}
            className="relative group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500/20 to-pink-500/20 border border-red-500/30 flex items-center justify-center group-hover:border-red-500/50 transition-all duration-300">
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
              {/* Status Filter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <label className="block text-sm font-semibold text-gray-300 mb-3 flex items-center space-x-2">
                  <User className="w-4 h-4 text-blue-400" />
                  <span>Status</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {statuses.map(status => (
                    <motion.button
                      key={status}
                      onClick={() => setSelectedStatus(status)}
                      className={`relative group px-4 py-2 rounded-full border transition-all duration-300 ${
                        selectedStatus === status
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-500 border-blue-400 text-white shadow-lg shadow-blue-500/25'
                          : 'bg-gray-800/50 border-gray-600/30 text-gray-300 hover:border-blue-500/50 hover:bg-blue-500/10'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="font-medium">
                        {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                      {selectedStatus === status && (
                        <motion.div
                          layoutId="statusActive"
                          className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full -z-10"
                          initial={false}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Category Filter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-sm font-semibold text-gray-300 mb-3 flex items-center space-x-2">
                  <Flame className="w-4 h-4 text-red-400" />
                  <span>Category</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <motion.button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`relative group px-4 py-2 rounded-full border transition-all duration-300 ${
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-red-500 to-yellow-500 border-red-400 text-white shadow-lg shadow-red-500/25'
                          : 'bg-gray-800/50 border-gray-600/30 text-gray-300 hover:border-red-500/50 hover:bg-red-500/10'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="font-medium">
                        {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                      </span>
                      {selectedCategory === category && (
                        <motion.div
                          layoutId="categoryActive"
                          className="absolute inset-0 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full -z-10"
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
                transition={{ delay: 0.25 }}
              >
                <label className="block text-sm font-semibold text-gray-300 mb-3 flex items-center space-x-2">
                  <SortAsc className="w-4 h-4 text-orange-400" />
                  <span>Sort Characters</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'name', label: 'Name', icon: User },
                    { value: 'rating', label: 'Rating', icon: Star },
                    { value: 'firstAppearance', label: 'First Appearance', icon: Calendar }
                  ].map(({ value, label, icon: Icon }) => (
                    <motion.button
                      key={value}
                      onClick={() => setSortBy(value as any)}
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
                  {/* Asc/Desc Toggle */}
                  <motion.button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className={`relative group px-4 py-2 rounded-full border transition-all duration-300 flex items-center space-x-2 ${
                      sortOrder === 'asc'
                        ? 'bg-gradient-to-r from-gray-700 to-gray-900 border-gray-500 text-white shadow-lg shadow-gray-500/25'
                        : 'bg-gradient-to-r from-gray-900 to-gray-700 border-gray-500 text-white shadow-lg shadow-gray-500/25'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
                    <span className="font-medium">{sortOrder === 'asc' ? 'Asc' : 'Desc'}</span>
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );

  return (
    <>
      <Header />
      <div className="h-28" />
      {/* Loading Screen for Navigation */}
      <AnimatePresence>
        {selectedHero && (
          <CharacterDetailModal 
            hero={selectedHero} 
            onClose={() => setSelectedHero(null)} 
          />
        )}
      </AnimatePresence>

      <motion.div 
        className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900 via-[#300000] to-black text-white"
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
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-br from-white via-red-500 to-pink-600 bg-clip-text text-transparent uppercase tracking-wider drop-shadow-lg">
              Marvel Characters
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Explore the iconic heroes of the Marvel Cinematic Universe
            </p>
            {filterBar}
          </motion.div>

          {/* Character grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredHeroes.map((hero, idx) => (
              <HeroCardEnhanced key={hero.name} hero={hero} index={idx} />
            ))}
          </div>

          {/* Footer (inside container, after grid) */}
          <footer className="mt-16 text-center text-gray-500 text-sm opacity-80">
            &copy; {new Date().getFullYear()} MarvelShowCase. Not affiliated with Marvel Studios.
          </footer>
          <div className="text-center mt-8 text-xs text-gray-500">
            <span>
              Built with <span className="text-red-500 animate-pulse">♥</span> by <span className="font-bold text-red-400">BATMAN</span>
            </span>
          </div>
        </div>

        {/* Floating Home Button */}
        <FloatingHomeButton />
      </motion.div>
    </>
  );
};

export default CharactersPage; 