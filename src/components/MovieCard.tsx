import { motion } from 'motion/react';
import { Star, Users, Calendar, Film, Crown, Eye } from 'lucide-react';

interface MovieCardProps {
  title: string;
  year: string;
  date?: string;
  image: string;
  rating?: number;
  cast?: string[];
  phase?: string;
  genre?: string;
}

const MovieCard = ({ title, year, date, image, rating, cast, phase, genre }: MovieCardProps) => {
  return (
    <motion.div 
      className="group cursor-pointer"
      initial={{ scale: 1 }}
      whileHover={{ 
        scale: 1.05,
        y: -8,
        transition: { duration: 0.2 }
      }}
    >
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-white/10 backdrop-blur-sm">
        {/* Movie Poster */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Rating Stars */}
          {typeof rating === 'number' && (
            <div className="absolute top-3 right-3">
              <div className="flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-3 h-3 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} 
                  />
                ))}
              </div>
            </div>
          )}

          {/* Phase Badge - Bottom Left */}
          {phase && (
            <div className="absolute bottom-3 left-3">
              <div className="inline-flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-xs font-medium text-white shadow-lg">
                <Crown className="w-3 h-3" />
                <span>{phase}</span>
              </div>
            </div>
          )}

          {/* Genre Badge */}
          {genre && (
            <div className="absolute bottom-3 right-3">
              <div className="inline-flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full text-xs font-medium text-white shadow-lg">
                <Film className="w-3 h-3" />
                <span className="max-w-[80px] truncate">{genre}</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Movie Info */}
        <div className="p-4">
          <h3 className="text-white font-bold text-lg mb-1 group-hover:text-red-400 transition-colors line-clamp-1">
            {title}
          </h3>
          
          <div className="flex items-center space-x-2 text-gray-400 text-sm mb-2">
            <Calendar className="w-4 h-4" />
            <span>{year}</span>
            {date && (
              <>
                <span>•</span>
                <span>{date}</span>
              </>
            )}
          </div>
          
          {/* Cast Preview */}
          {cast && cast.length > 0 && (
            <div className="mb-3">
              <div className="flex items-center space-x-2 text-xs text-gray-400 mb-2">
                <Users className="w-3 h-3" />
                <span className="font-medium">Cast</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {cast.slice(0, 2).map((actor, idx) => (
                  <span 
                    key={idx}
                    className="inline-flex items-center px-2 py-1 bg-red-500/20 rounded-full text-xs text-red-300 font-medium"
                  >
                    {actor}
                  </span>
                ))}
                {cast.length > 2 && (
                  <span className="inline-flex items-center px-2 py-1 bg-gray-500/20 rounded-full text-xs text-gray-300">
                    +{cast.length - 2} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Rating Display */}
          {typeof rating === 'number' && (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-3 h-3 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-500'}`} 
                  />
                ))}
                <span className="text-xs text-gray-400 ml-1">({rating}/5)</span>
              </div>
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
              <span>{year}</span>
              {phase && (
                <>
                  <span>•</span>
                  <span>{phase}</span>
                </>
              )}
            </div>
            <h3 className="text-white font-semibold text-sm line-clamp-2">{title}</h3>
            {cast && cast.length > 0 && (
              <p className="text-gray-300 text-xs line-clamp-2">
                Starring: {cast.slice(0, 3).join(', ')}
                {cast.length > 3 && ` +${cast.length - 3} more`}
              </p>
            )}
            <div className="flex items-center space-x-2 text-xs text-gray-300">
              <Eye className="w-3 h-3" />
              <span>Click to view details</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MovieCard;