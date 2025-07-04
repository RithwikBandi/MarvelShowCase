import { useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Calendar, Film, Tv, Star } from 'lucide-react';
import { type MCUEntry, type TimelineMode } from '@/data/mcuData';
import { useTimeline } from '@/contexts/TimelineContext';

interface TimelineNodeProps {
  item: MCUEntry;
  index: number;
  isLeft: boolean;
  mode: TimelineMode;
  onClick?: (item: MCUEntry) => void;
}

const TimelineNode = ({ item, index, isLeft, mode, onClick }: TimelineNodeProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-100px" });
  const { isTimelineAnimated } = useTimeline();

  // Calculate delays based on index
  const getAnimationDelay = () => {
    if (!isTimelineAnimated) return 999; // Don't animate until timeline is ready
    return 0.2 + (index * 0.1); // Stagger the animations
  };

  const getTypeIcon = (type: string) => {
    switch(type.toLowerCase()) {
      case 'movie':
        return <Film className="w-4 h-4" />;
      case 'series':
        return <Tv className="w-4 h-4" />;
      default:
        return <Star className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const baseDelay = getAnimationDelay();

  return (
    <motion.div
      ref={nodeRef}
      className={`flex ${isLeft ? 'justify-start' : 'justify-end'} mb-8`}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={isInView && isTimelineAnimated ? { 
        opacity: 1, 
        x: 0,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 20,
          delay: baseDelay
        }
      } : {}}>
      <div className={`w-5/6 md:w-2/5 ${isLeft ? 'mr-8' : 'ml-8'} relative`}>
        {/* Branch Connection */}
        <motion.div 
          className="absolute top-1/2 -translate-y-1/2 h-[2px]"
          style={{
            right: isLeft ? '-8rem' : 'auto',
            left: isLeft ? 'auto' : '-8rem',
            width: '8rem'
          }}
          initial={{ opacity: 0 }}
          animate={isInView && isTimelineAnimated ? {
            opacity: 1,
            transition: {
              delay: baseDelay + 0.2,
              duration: 0.3
            }
          } : {}}>
          {/* Branch Line */}
          <motion.div
            className="h-full bg-gradient-to-r from-red-600/80 to-red-900/40"
            initial={{ scaleX: 0 }}
            animate={isInView && isTimelineAnimated ? {
              scaleX: 1,
              transition: {
                delay: baseDelay + 0.2,
                duration: 0.4,
                ease: "easeOut"
              }
            } : {}}
            style={{
              transformOrigin: isLeft ? 'right' : 'left',
              width: '100%'
            }}
          />
          {/* Branch Decorative Elements */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-red-500"
            style={{
              right: isLeft ? '0' : 'auto',
              left: isLeft ? 'auto' : '0'
            }}
            initial={{ scale: 0 }}
            animate={isInView && isTimelineAnimated ? { 
              scale: 1,
              transition: {
                delay: baseDelay + 0.6,
                duration: 0.2
              }
            } : {}}
          />
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-red-500"
            style={{
              left: isLeft ? 'auto' : '0',
              right: isLeft ? '0' : 'auto'
            }}
            initial={{ scale: 0 }}
            animate={isInView && isTimelineAnimated ? { 
              scale: 1,
              transition: {
                delay: baseDelay + 0.6,
                duration: 0.2
              }
            } : {}}
          />
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 rounded-lg p-6 border border-red-600/40 transform-gpu cursor-pointer relative"
          whileHover={{
            y: -5,
            scale: 1.05,
            transition: { 
              duration: 0.2,
              ease: "easeOut"
            }
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => onClick?.(item)}>
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
              {item.title}
            </h3>
            <span className="bg-red-600/90 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
              {getTypeIcon(item.type)}
              <span className="hidden sm:inline">{item.type}</span>
            </span>
          </div>

          {/* Content */}
          <div className="space-y-3">
            <p className="text-sm text-gray-300">{item.description}</p>
            
            {/* Phase Badge */}
            <div className="flex items-center gap-2">
              <span className="text-yellow-500 text-xs">{item.phase}</span>
            </div>

            {/* Info Row */}
            <div className="flex flex-col sm:flex-row justify-between text-sm text-gray-400 gap-2 pt-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(item.release_date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-400">
                  #{mode === 'story' ? item.chronological_order : (item.releaseOrder ?? index + 1)} in {mode} order
                </span>
              </div>
            </div>

            {/* Platforms */}
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-gray-500 pt-2">
                Available on: {item.ott_platforms.join(', ')}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TimelineNode;